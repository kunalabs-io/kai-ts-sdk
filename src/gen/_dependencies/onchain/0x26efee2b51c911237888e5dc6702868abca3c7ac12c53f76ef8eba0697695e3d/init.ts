import * as assetMeta from './asset-meta/structs'
import * as completeTransferWithPayload from './complete-transfer-with-payload/structs'
import * as completeTransfer from './complete-transfer/structs'
import * as createWrapped from './create-wrapped/structs'
import * as migrate from './migrate/structs'
import * as nativeAsset from './native-asset/structs'
import * as normalizedAmount from './normalized-amount/structs'
import * as registerChain from './register-chain/structs'
import * as setup from './setup/structs'
import * as state from './state/structs'
import * as tokenRegistry from './token-registry/structs'
import * as transferTokensWithPayload from './transfer-tokens-with-payload/structs'
import * as transferTokens from './transfer-tokens/structs'
import * as transferWithPayload from './transfer-with-payload/structs'
import * as transfer from './transfer/structs'
import * as upgradeContract from './upgrade-contract/structs'
import * as vaa from './vaa/structs'
import * as versionControl from './version-control/structs'
import * as wrappedAsset from './wrapped-asset/structs'
import { StructClassLoader } from '../../../_framework/loader'

export function registerClasses(loader: StructClassLoader) {
  loader.register(nativeAsset.NativeAsset)
  loader.register(assetMeta.AssetMeta)
  loader.register(normalizedAmount.NormalizedAmount)
  loader.register(wrappedAsset.ForeignInfo)
  loader.register(wrappedAsset.WrappedAsset)
  loader.register(tokenRegistry.TokenRegistry)
  loader.register(tokenRegistry.VerifiedAsset)
  loader.register(tokenRegistry.Key)
  loader.register(tokenRegistry.CoinTypeKey)
  loader.register(versionControl.V__0_2_0)
  loader.register(versionControl.V__DUMMY)
  loader.register(state.LatestOnly)
  loader.register(state.State)
  loader.register(vaa.TokenBridgeMessage)
  loader.register(createWrapped.WrappedAssetSetup)
  loader.register(transfer.Transfer)
  loader.register(completeTransfer.TransferRedeemed)
  loader.register(completeTransfer.RelayerReceipt)
  loader.register(transferWithPayload.TransferWithPayload)
  loader.register(completeTransferWithPayload.RedeemerReceipt)
  loader.register(upgradeContract.GovernanceWitness)
  loader.register(upgradeContract.ContractUpgraded)
  loader.register(upgradeContract.UpgradeContract)
  loader.register(migrate.MigrateComplete)
  loader.register(registerChain.GovernanceWitness)
  loader.register(registerChain.RegisterChain)
  loader.register(setup.DeployerCap)
  loader.register(transferTokens.TransferTicket)
  loader.register(transferTokensWithPayload.TransferTicket)
}
