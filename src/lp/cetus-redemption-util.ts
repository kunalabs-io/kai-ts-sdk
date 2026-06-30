import { ClientWithCoreApi } from '@mysten/sui/client'
import { Position as CetusPosition } from '../gen/cetus-clmm/position/structs'
import { normalizeSuiAddress } from '@mysten/sui/utils'
import { Transaction } from '@mysten/sui/transactions'
import { bcs } from '@mysten/sui/bcs'
import { Amount } from '../amount'
import { Position } from './position'
import { PositionConfigInfo } from './config'
import { PhantomTypeArgument } from '../gen/_framework/reified'
import { TypeArgument } from '../gen/_framework/reified'

import { CETUS } from '../coin-info'
import { isAttackedPosition } from '../gen/cetus-clmm/pool/functions'
import { destructExploitedPositionAndReturnLp } from '../gen/kai-leverage/cetus/functions'

const AFFECTED_CONFIG_IDS = [
  '0x2d52e5fe8af24f2c750250fca6ce5d595d22287f12d29c6ffbae490f5650478d',
  '0xc64d5b0102b85b823d8f8ae5685ea1c153d1c18dcf13a4719798fdf591a9a1b9',
  '0xd6a055c8143f2bb97fdcb34f91ac723708d71473e7dff670a9a2218cc91eab16',
  '0x60161ddff3225cad16905d659d938007c3d6baa8f64e27fc6f503cee05d0feca',
  '0x570b46aa3b355305d36e1921c6a5070c76b51e56859b0bde0b6bc0598a89381d',
  '0x92515fe20eb5c0510f42df2ab67f49ca41633571a038edfc180bd83bb9b01011',
]

export function configIsAffected(
  config: PositionConfigInfo<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>
): boolean {
  return AFFECTED_CONFIG_IDS.includes(config.configId)
}

export async function positionIsCut(
  client: ClientWithCoreApi,
  position: Position<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>
): Promise<boolean> {
  const tx = new Transaction()
  tx.setSender(normalizeSuiAddress('0x0'))

  const typeArguments = [position.X.typeName, position.Y.typeName] as [string, string]
  isAttackedPosition(tx, typeArguments, {
    pool: position.configInfo.poolObjectId,
    positionId: position.data.lpPosition.id,
  })

  const sim = await client.core.simulateTransaction({
    transaction: tx,
    include: { commandResults: true },
    checksEnabled: false,
  })

  return bcs.bool().parse(sim.commandResults![0].returnValues[0].bcs)
}

export async function getCetusRedemptionAmount(
  client: ClientWithCoreApi,
  position: Position<PhantomTypeArgument, PhantomTypeArgument, CetusPosition>
): Promise<Amount> {
  const vesterPackageId = '0x9d2f067d3b9d19ac0f8d2e5c2c393b1760232083e42005b2e5df39c06064d522'
  const vesterId = '0xe255c47472470c03bbefb1fc883459c2b978d3ad29aa8ee0c8c1ec9753fa7d01'

  const tx = new Transaction()
  tx.moveCall({
    target: `${vesterPackageId}::clmm_vester::get_position_vesting`,
    typeArguments: [position.X.typeName, position.Y.typeName],
    arguments: [
      tx.object(vesterId),
      tx.object(position.configInfo.poolObjectId),
      tx.pure.id(position.data.lpPosition.id),
    ],
  })
  tx.setSender(normalizeSuiAddress('0x0'))

  try {
    const sim = await client.core.simulateTransaction({
      transaction: tx,
      include: { commandResults: true },
      checksEnabled: false,
    })

    const data = sim.commandResults![0].returnValues[0].bcs

    const ID = bcs.fixedArray(32, bcs.u8())
    const PositionVesting = bcs.struct('PositionVesting', {
      positionId: ID,
      cetusAmount: bcs.u64(),
      redeemedCetusAmount: bcs.u64(),
    })

    const positionVesting = PositionVesting.parse(data)

    return CETUS.newAmount(BigInt(positionVesting.cetusAmount))
  } catch (error) {
    const isExploited = await positionIsCut(client, position)
    if (isExploited) {
      throw error
    } else {
      return CETUS.newAmount(0n)
    }
  }
}

export function destructCetusPositionAndTransferLp(
  position: Position<PhantomTypeArgument, PhantomTypeArgument, CetusPosition>,
  tx: Transaction,
  positionCapId: string,
  sender: string
): void {
  const lp = destructExploitedPositionAndReturnLp(tx, [position.X.typeName, position.Y.typeName], {
    position: position.id,
    config: position.configInfo.configId,
    cap: positionCapId,
    cetusPool: position.configInfo.poolObjectId,
  })
  tx.transferObjects([lp], sender)
}
