import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function bitmap(tx: Transaction, manager: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::tick::bitmap`, arguments: [obj(tx, manager)] })
}

export function createTick(tx: Transaction, index: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::tick::create_tick`, arguments: [obj(tx, index)] })
}

export interface FetchProvidedTicksArgs {
  manager: TransactionObjectInput
  ticks: Array<number | TransactionArgument> | TransactionArgument
}

export function fetchProvidedTicks(tx: Transaction, args: FetchProvidedTicksArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::tick::fetch_provided_ticks`,
    arguments: [obj(tx, args.manager), pure(tx, args.ticks, `vector<u32>`)],
  })
}

export interface GetFeeAndRewardGrowthsInsideArgs {
  manager: TransactionObjectInput
  lowerTickIndex: TransactionObjectInput
  upperTickIndex: TransactionObjectInput
  currentTickIndex: TransactionObjectInput
  feeGrowthGlobalCoinA: bigint | TransactionArgument
  feeGrowthGlobalCoinB: bigint | TransactionArgument
  rewardGrowthsGlobal: Array<bigint | TransactionArgument> | TransactionArgument
}

export function getFeeAndRewardGrowthsInside(
  tx: Transaction,
  args: GetFeeAndRewardGrowthsInsideArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::tick::get_fee_and_reward_growths_inside`,
    arguments: [
      obj(tx, args.manager),
      obj(tx, args.lowerTickIndex),
      obj(tx, args.upperTickIndex),
      obj(tx, args.currentTickIndex),
      pure(tx, args.feeGrowthGlobalCoinA, `u128`),
      pure(tx, args.feeGrowthGlobalCoinB, `u128`),
      pure(tx, args.rewardGrowthsGlobal, `vector<u128>`),
    ],
  })
}

export interface GetFeeAndRewardGrowthsOutsideArgs {
  manager: TransactionObjectInput
  tickIndex: TransactionObjectInput
}

export function getFeeAndRewardGrowthsOutside(
  tx: Transaction,
  args: GetFeeAndRewardGrowthsOutsideArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::tick::get_fee_and_reward_growths_outside`,
    arguments: [obj(tx, args.manager), obj(tx, args.tickIndex)],
  })
}

export interface GetTickFromManagerArgs {
  manager: TransactionObjectInput
  index: TransactionObjectInput
}

export function getTickFromManager(tx: Transaction, args: GetTickFromManagerArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::tick::get_tick_from_manager`,
    arguments: [obj(tx, args.manager), obj(tx, args.index)],
  })
}

export interface GetTickFromTableArgs {
  ticks: TransactionObjectInput
  index: TransactionObjectInput
}

export function getTickFromTable(tx: Transaction, args: GetTickFromTableArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::tick::get_tick_from_table`,
    arguments: [obj(tx, args.ticks), obj(tx, args.index)],
  })
}

export interface IsTickInitializedArgs {
  manager: TransactionObjectInput
  tickIndex: TransactionObjectInput
}

export function isTickInitialized(tx: Transaction, args: IsTickInitializedArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::tick::is_tick_initialized`,
    arguments: [obj(tx, args.manager), obj(tx, args.tickIndex)],
  })
}

export function liquidityGross(tx: Transaction, tick: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::tick::liquidity_gross`,
    arguments: [obj(tx, tick)],
  })
}

export function liquidityNet(tx: Transaction, tick: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::tick::liquidity_net`, arguments: [obj(tx, tick)] })
}

export function sqrtPrice(tx: Transaction, tick: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::tick::sqrt_price`, arguments: [obj(tx, tick)] })
}

export function tickSpacing(tx: Transaction, manager: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::tick::tick_spacing`,
    arguments: [obj(tx, manager)],
  })
}
