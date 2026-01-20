import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'
import { String } from '../../std/string/structs'
import { ID } from '../../sui/object/structs'

/**
 * Initialize the pool package
 * * `otw` - The object type wrapper
 * * `ctx` - The transaction context
 */
export function init(tx: Transaction, otw: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::init`,
    arguments: [obj(tx, otw)],
  })
}

export interface MintProtocolFeeCollectCapArgs {
  adminCap: TransactionObjectInput
  addr: string | TransactionArgument
}

/**
 * Mint a protocol fee collect cap
 * * `AdminCap` - The admin cap
 * * `address` - The address to mint the cap to
 * * `ctx` - The transaction context
 */
export function mintProtocolFeeCollectCap(
  tx: Transaction,
  args: MintProtocolFeeCollectCapArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::mint_protocol_fee_collect_cap`,
    arguments: [
      obj(tx, args.adminCap),
      pure(tx, args.addr, `address`),
    ],
  })
}

export interface NewArgs {
  tickSpacing: number | TransactionArgument
  initSqrtPrice: bigint | TransactionArgument
  feeRate: bigint | TransactionArgument
  url: string | TransactionArgument
  index: bigint | TransactionArgument
  clock: TransactionObjectInput
}

/**
 * Create a new pool, it only allow call by factory module.
 * * `tick_spacing` - The spacing between initialized ticks
 * * `init_sqrt_price` - The clmmpool's initialize sqrt price
 * * `fee_rate` - The clmmpool's fee rate
 * * `index` - The index of the pool
 * * `clock` - The CLOCK of sui framework
 * * `ctx` - The transaction context
 */
export function new_(
  tx: Transaction,
  typeArgs: [string, string],
  args: NewArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::new`,
    typeArguments: typeArgs,
    arguments: [
      pure(tx, args.tickSpacing, `u32`),
      pure(tx, args.initSqrtPrice, `u128`),
      pure(tx, args.feeRate, `u64`),
      pure(tx, args.url, `${String.$typeName}`),
      pure(tx, args.index, `u64`),
      obj(tx, args.clock),
    ],
  })
}

export interface SetDisplayArgs {
  config: TransactionObjectInput
  publisher: TransactionObjectInput
  name: string | TransactionArgument
  description: string | TransactionArgument
  url: string | TransactionArgument
  link: string | TransactionArgument
  website: string | TransactionArgument
  creator: string | TransactionArgument
}

/**
 * Set display for pool.
 * * `config` - The global config object of clmm package.
 * * `publisher` - The publisher object
 * * `name` - The name of the pool
 * * `description` - The description of the pool
 * * `url` - The URL of the pool
 * * `link` - The link of the pool
 * * `website` - The website of the pool
 * * `creator` - The creator of the pool
 * * `ctx` - The transaction context
 */
export function setDisplay(
  tx: Transaction,
  typeArgs: [string, string],
  args: SetDisplayArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::set_display`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.publisher),
      pure(tx, args.name, `${String.$typeName}`),
      pure(tx, args.description, `${String.$typeName}`),
      pure(tx, args.url, `${String.$typeName}`),
      pure(tx, args.link, `${String.$typeName}`),
      pure(tx, args.website, `${String.$typeName}`),
      pure(tx, args.creator, `${String.$typeName}`),
    ],
  })
}

export interface OpenPositionArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  tickLower: number | TransactionArgument
  tickUpper: number | TransactionArgument
}

/**
 * Open a position
 * * `config` - The global config object of clmm package.
 * * `pool` - The clmmpool object.
 * * `tick_lower` - The lower tick index of position.
 * * `tick_upper` - The upper tick index of position.
 * * `ctx` - The transaction context
 * * Returns the position NFT
 */
export function openPosition(
  tx: Transaction,
  typeArgs: [string, string],
  args: OpenPositionArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::open_position`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      pure(tx, args.tickLower, `u32`),
      pure(tx, args.tickUpper, `u32`),
    ],
  })
}

export interface AddLiquidityArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  positionNft: TransactionObjectInput
  deltaLiquidity: bigint | TransactionArgument
  clock: TransactionObjectInput
}

/**
 * Add liquidity on a position by fix liquidity amount.
 * * `config` - The global config object of clmm package.
 * * `pool` - The clmpool object.
 * * `position_nft` - The position NFT
 * * `delta_liquidity` - The liquidity amount which you want add.
 * * `clock` - The `CLOCK` object
 * * Returns the add liquidity receipt, Flash loan resource for add_liquidity
 */
export function addLiquidity(
  tx: Transaction,
  typeArgs: [string, string],
  args: AddLiquidityArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::add_liquidity`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      obj(tx, args.positionNft),
      pure(tx, args.deltaLiquidity, `u128`),
      obj(tx, args.clock),
    ],
  })
}

export interface AddLiquidityFixCoinArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  positionNft: TransactionObjectInput
  amount: bigint | TransactionArgument
  fixAmountA: boolean | TransactionArgument
  clock: TransactionObjectInput
}

/**
 * Add liquidity on a position by fix coin amount.
 * * `config` - The global config object of clmm package.
 * * `pool` - The clmmpool object.
 * * `position_nft` - The position NFT
 * * `amount` - The coin amount which you want add to position.
 * * `fix_amount_a` - Whether the fix coin type is CoinTypeA
 * * `clock` - The `CLOCK` object
 * * Returns the add liquidity receipt, Flash loan resource for add_liquidity
 */
export function addLiquidityFixCoin(
  tx: Transaction,
  typeArgs: [string, string],
  args: AddLiquidityFixCoinArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::add_liquidity_fix_coin`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      obj(tx, args.positionNft),
      pure(tx, args.amount, `u64`),
      pure(tx, args.fixAmountA, `bool`),
      obj(tx, args.clock),
    ],
  })
}

/**
 * Get the amount that needs to be paid for liquidity.
 * * `receipt` - The refrence of receipt.
 * * Returns the amount of CoinTypeA that need paid for this receipt.
 */
export function addLiquidityPayAmount(
  tx: Transaction,
  typeArgs: [string, string],
  receipt: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::add_liquidity_pay_amount`,
    typeArguments: typeArgs,
    arguments: [obj(tx, receipt)],
  })
}

export interface RepayAddLiquidityArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  balanceA: TransactionObjectInput
  balanceB: TransactionObjectInput
  receipt: TransactionObjectInput
}

/**
 * The cost of increasing liquidity for the position.
 * * `config` - The global config of clmm package.
 * * `pool` - The clmm pool object.
 * * `balance_a` - The balance of which type is CoinTypeA, if no need pay this coin pass `balance<CoinTypeA>Zero()`
 * * `balance_b` - The balance of which type is CoinTypeB, if no need pay this coin pass `balance<CoinTypeA>Zero()`
 * * `receipt` - A flash loan resource that can only delete by this function.
 */
export function repayAddLiquidity(
  tx: Transaction,
  typeArgs: [string, string],
  args: RepayAddLiquidityArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::repay_add_liquidity`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      obj(tx, args.balanceA),
      obj(tx, args.balanceB),
      obj(tx, args.receipt),
    ],
  })
}

export interface RemoveLiquidityArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  positionNft: TransactionObjectInput
  deltaLiquidity: bigint | TransactionArgument
  clock: TransactionObjectInput
}

/**
 * Remove liquidity from a position.
 * * `config` - The global config of clmm package.
 * * `pool` - The clmm pool package.
 * * `delta_liquidity` - The amount of liquidity will be remove.
 * * `clock` - The `Clock` object.
 * * Returns the balance object of CoinTypeA and CoinTypeB.
 */
export function removeLiquidity(
  tx: Transaction,
  typeArgs: [string, string],
  args: RemoveLiquidityArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::remove_liquidity`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      obj(tx, args.positionNft),
      pure(tx, args.deltaLiquidity, `u128`),
      obj(tx, args.clock),
    ],
  })
}

export interface RemoveLiquidityWithSlippageArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  positionNft: TransactionObjectInput
  deltaLiquidity: bigint | TransactionArgument
  minAmountA: bigint | TransactionArgument
  minAmountB: bigint | TransactionArgument
  clock: TransactionObjectInput
}

export function removeLiquidityWithSlippage(
  tx: Transaction,
  typeArgs: [string, string],
  args: RemoveLiquidityWithSlippageArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::remove_liquidity_with_slippage`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      obj(tx, args.positionNft),
      pure(tx, args.deltaLiquidity, `u128`),
      pure(tx, args.minAmountA, `u64`),
      pure(tx, args.minAmountB, `u64`),
      obj(tx, args.clock),
    ],
  })
}

export interface ClosePositionArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  positionNft: TransactionObjectInput
}

/**
 * Close the position.
 * This operation will destroy the `position`, so before calling it, you need to take away all
 * assets(coin_a,coin_b,rewards) related to this `position`, otherwise it will fail.
 * * `config` - The global config of clmm package.
 * * `pool` - The clmm pool object.
 * * `position` - The position's NFT
 */
export function closePosition(
  tx: Transaction,
  typeArgs: [string, string],
  args: ClosePositionArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::close_position`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      obj(tx, args.positionNft),
    ],
  })
}

export interface CollectFeeArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  positionNft: TransactionObjectInput
  recalculate: boolean | TransactionArgument
}

/**
 * Collect the fee from position.
 * * `config` - The global config of clmm package.
 * * `pool` - The clmm pool object.
 * * `position_nft` - The position's NFT.
 * * `recalcuate` - There are multiple scenarios where, for example, `add_liquidity`/`remove_liquidity`
 * will settle fees. If `collect_fee` and these operations are in the same transaction, and `collect_fee`
 * comes after them, then recalculating will not have any impact on the result. In this case, `recalculate`
 * can be set to `false` to save gas.
 * * Returns the balance object of CoinTypeA and CoinTypeB.
 */
export function collectFee(
  tx: Transaction,
  typeArgs: [string, string],
  args: CollectFeeArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::collect_fee`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      obj(tx, args.positionNft),
      pure(tx, args.recalculate, `bool`),
    ],
  })
}

export interface CollectRewardArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  positionNft: TransactionObjectInput
  vault: TransactionObjectInput
  recalculate: boolean | TransactionArgument
  clock: TransactionObjectInput
}

/**
 * Collect rewarder from position.
 * * `config` - The global config of clmm package.
 * * `pool` - The clmm pool object.
 * * `position_nft` - The position's NFT.
 * * `recalcuate` - This flag is used to specify whether to recalculate the reward for the position,
 * just like the handling fee.
 * * `clock` - The `Clock` object.
 * * Returns the balance object of CoinTypeC.
 */
export function collectReward(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: CollectRewardArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::collect_reward`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      obj(tx, args.positionNft),
      obj(tx, args.vault),
      pure(tx, args.recalculate, `bool`),
      obj(tx, args.clock),
    ],
  })
}

export interface CalculateAndUpdateRewardsArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  positionId: string | TransactionArgument
  clock: TransactionObjectInput
}

/**
 * Calculate the positions's rewards and update it and return its.
 * * `config` - The global config of clmm package.
 * * `pool` - The clmm pool object.
 * * `position_id` - The object id of position's NFT.
 * * `recalcuate` - A flag
 * * `clock` - The `Clock` object.
 * * Returns the vector of reward amounts.
 */
export function calculateAndUpdateRewards(
  tx: Transaction,
  typeArgs: [string, string],
  args: CalculateAndUpdateRewardsArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::calculate_and_update_rewards`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      pure(tx, args.positionId, `${ID.$typeName}`),
      obj(tx, args.clock),
    ],
  })
}

export interface CalculateAndUpdateRewardArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  positionId: string | TransactionArgument
  clock: TransactionObjectInput
}

/**
 * Calculate and update the position's rewards and return one of which reward type is `CoinTypeC`.
 * * `config` - The global config of clmm package.
 * * `pool` - The clmm pool object.
 * * `position_id` - The object id of position's NFT.
 * * `clock` - The `Clock` object.
 * * Returns the pending reward amount.
 */
export function calculateAndUpdateReward(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: CalculateAndUpdateRewardArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::calculate_and_update_reward`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      pure(tx, args.positionId, `${ID.$typeName}`),
      obj(tx, args.clock),
    ],
  })
}

export interface CalculateAndUpdatePointsArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  positionId: string | TransactionArgument
  clock: TransactionObjectInput
}

/**
 * Calculate and update the position's point and return it.
 * * `config` - The global config of clmm package.
 * * `pool` - The clmm pool object.
 * * `position_id` - The object id of position's NFT.
 * * `clock` - The `Clock` object.
 * * Returns the current point of `position`.
 */
export function calculateAndUpdatePoints(
  tx: Transaction,
  typeArgs: [string, string],
  args: CalculateAndUpdatePointsArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::calculate_and_update_points`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      pure(tx, args.positionId, `${ID.$typeName}`),
      obj(tx, args.clock),
    ],
  })
}

export interface CalculateAndUpdateFeeArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  positionId: string | TransactionArgument
}

/**
 * Calculate and update the position's fee and return it.
 * * `config` - The global config of clmm package.
 * * `pool` - The clmm pool object.
 * * `position_id` - The object id of position's NFT.
 * * Returns the fee amount of `CoinTypeA` and `CoinTypeB`.
 */
export function calculateAndUpdateFee(
  tx: Transaction,
  typeArgs: [string, string],
  args: CalculateAndUpdateFeeArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::calculate_and_update_fee`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      pure(tx, args.positionId, `${ID.$typeName}`),
    ],
  })
}

export interface GetPositionAmountsArgs {
  pool: TransactionObjectInput
  positionId: string | TransactionArgument
}

/**
 * Calculate the position's amount_a/amount_b
 * * `pool` - The clmm pool object.
 * * `position_id` - The object id of position's NFT.
 * * Returns the amount of `CoinTypeA` and `CoinTypeB`.
 */
export function getPositionAmounts(
  tx: Transaction,
  typeArgs: [string, string],
  args: GetPositionAmountsArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::get_position_amounts`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      pure(tx, args.positionId, `${ID.$typeName}`),
    ],
  })
}

export interface GetPositionAmountsV2Args {
  pool: TransactionObjectInput
  positionId: string | TransactionArgument
}

/**
 * Calculate the position's amount_a/amount_b
 * * `pool` - The clmm pool object.
 * * `position_id` - The object id of position's NFT.
 * * Returns the amount of `CoinTypeA` and `CoinTypeB`.
 */
export function getPositionAmountsV2(
  tx: Transaction,
  typeArgs: [string, string],
  args: GetPositionAmountsV2Args,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::get_position_amounts_v2`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      pure(tx, args.positionId, `${ID.$typeName}`),
    ],
  })
}

export interface FlashSwapArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  a2B: boolean | TransactionArgument
  byAmountIn: boolean | TransactionArgument
  amount: bigint | TransactionArgument
  sqrtPriceLimit: bigint | TransactionArgument
  clock: TransactionObjectInput
}

/**
 * Flash swap
 * * `config` - The global config of clmm package.
 * * `pool` - The clmm pool object.
 * * `a2b` - One flag, if true, indicates that coin of `CoinTypeA` is exchanged with the coin of `CoinTypeB`,
 * otherwise it indicates that the coin of `CoinTypeB` is exchanged with the coin of `CoinTypeA`.
 * * `by_amount_in` - A flag, if set to true, indicates that the next `amount` parameter specifies
 * the input amount, otherwise it specifies the output amount.
 * * `amount` - The amount that indicates input or output.
 * * `sqrt_price_limit` - Price limit, if the swap causes the price to it value, the swap will stop here and return
 * * `clock` - The `Clock` object.
 */
export function flashSwap(
  tx: Transaction,
  typeArgs: [string, string],
  args: FlashSwapArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::flash_swap`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      pure(tx, args.a2B, `bool`),
      pure(tx, args.byAmountIn, `bool`),
      pure(tx, args.amount, `u64`),
      pure(tx, args.sqrtPriceLimit, `u128`),
      obj(tx, args.clock),
    ],
  })
}

export interface RepayFlashSwapArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  coinA: TransactionObjectInput
  coinB: TransactionObjectInput
  receipt: TransactionObjectInput
}

/**
 * Repay for flash swap
 * * `config` - The global config of clmm package.
 * * `pool` - The clmm pool object.
 * * `coin_a` - The object of `CoinTypeA` will pay for flash_swap,
 * * `coin_b` - The object of `CoinTypeB` will pay for flash_swap,
 * * `receipt` - The receipt which will be destory.
 */
export function repayFlashSwap(
  tx: Transaction,
  typeArgs: [string, string],
  args: RepayFlashSwapArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::repay_flash_swap`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      obj(tx, args.coinA),
      obj(tx, args.coinB),
      obj(tx, args.receipt),
    ],
  })
}

export interface FlashSwapWithPartnerArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  partner: TransactionObjectInput
  a2B: boolean | TransactionArgument
  byAmountIn: boolean | TransactionArgument
  amount: bigint | TransactionArgument
  sqrtPriceLimit: bigint | TransactionArgument
  clock: TransactionObjectInput
}

/**
 * Flash swap with partner, like flash swap but there has a partner object for receive ref fee.
 * * `config` - The global config of clmm package.
 * * `pool` - The clmm pool object.
 * * `partner` - The partner object.
 * * `a2b` - One flag, if true, indicates that coin of `CoinTypeA` is exchanged with the coin of `CoinTypeB`,
 * otherwise it indicates that the coin of `CoinTypeB` is exchanged with the coin of `CoinTypeA`.
 * * `by_amount_in` - A flag, if set to true, indicates that the next `amount` parameter specifies
 * the input amount, otherwise it specifies the output amount.
 * * `amount` - The amount that indicates input or output.
 * * `sqrt_price_limit` - Price limit, if the swap causes the price to it value, the swap will stop here and return
 * * `clock` - The `Clock` object.
 * * Returns the balance object of CoinTypeA and CoinTypeB and the flash swap receipt.
 */
export function flashSwapWithPartner(
  tx: Transaction,
  typeArgs: [string, string],
  args: FlashSwapWithPartnerArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::flash_swap_with_partner`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      obj(tx, args.partner),
      pure(tx, args.a2B, `bool`),
      pure(tx, args.byAmountIn, `bool`),
      pure(tx, args.amount, `u64`),
      pure(tx, args.sqrtPriceLimit, `u128`),
      obj(tx, args.clock),
    ],
  })
}

export interface RepayFlashSwapWithPartnerArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  partner: TransactionObjectInput
  coinA: TransactionObjectInput
  coinB: TransactionObjectInput
  receipt: TransactionObjectInput
}

/**
 * Repay for flash swap with partner for receive ref fee.
 * * `config` - The global config of clmm package.
 * * `pool` - The clmm pool object.
 * * `partner` - The partner object.
 * * `coin_a` - The object of `CoinTypeA` will pay for flash_swap,
 * * `coin_b` - The object of `CoinTypeB` will pay for flash_swap,
 * * `receipt` - The receipt which will be destory.
 */
export function repayFlashSwapWithPartner(
  tx: Transaction,
  typeArgs: [string, string],
  args: RepayFlashSwapWithPartnerArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::repay_flash_swap_with_partner`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      obj(tx, args.partner),
      obj(tx, args.coinA),
      obj(tx, args.coinB),
      obj(tx, args.receipt),
    ],
  })
}

export interface CollectProtocolFeeArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
}

/**
 * Collect the protocol fee by the protocol_feee_claim_authority
 * * `config` - The global config of clmm package.
 * * `pool` - The clmm pool object.
 * * `ctx` - The transaction context.
 * * Returns the protocol fee balance object of `CoinTypeA` and `CoinTypeB`.
 */
export function collectProtocolFee(
  tx: Transaction,
  typeArgs: [string, string],
  args: CollectProtocolFeeArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::collect_protocol_fee`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
    ],
  })
}

export interface CollectProtocolFeeWithCapArgs {
  pool: TransactionObjectInput
  config: TransactionObjectInput
  cap: TransactionObjectInput
}

/**
 * Collect protocol fees from a pool using the protocol fee collect capability
 * This function allows the holder of a ProtocolFeeCollectCap to collect accumulated protocol fees from a pool.
 * After collection, the protocol fee balances in the pool are reset to 0.
 * * `pool` - The pool to collect fees from
 * * `config` - The global config of the CLMM package
 * * `cap` - The protocol fee collect capability proving authorization.
 * * Returns the collected protocol fees of coin type A and coin type B
 */
export function collectProtocolFeeWithCap(
  tx: Transaction,
  typeArgs: [string, string],
  args: CollectProtocolFeeWithCapArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::collect_protocol_fee_with_cap`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      obj(tx, args.config),
      obj(tx, args.cap),
    ],
  })
}

export interface InitializeRewarderArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
}

/**
 * Initialize a `Rewarder` to `Pool` with a reward type of `CoinTypeC`.
 * Only one `Rewarder` per `CoinType` can exist in `Pool`.
 * * `config` - The global config of clmm package.
 * * `pool` - The clmm pool object.
 * * `ctx` - The transaction context.
 */
export function initializeRewarder(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: InitializeRewarderArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::initialize_rewarder`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
    ],
  })
}

export interface UpdateEmissionArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  vault: TransactionObjectInput
  emissionsPerSecond: bigint | TransactionArgument
  clock: TransactionObjectInput
}

/**
 * Update the rewarder emission speed to start the rewarder to generate.
 * * `config` - The global config of clmm package.
 * * `pool` - The clmm pool object.
 * * `vault` - The `RewarderGlobalVault` object which stores all the rewards to be distributed by Rewarders.
 * * `emissions_per_second` - The parameter represents the number of rewards released per second,
 * which is a fixed-point number with a total of 128 bits, with the decimal part occupying 64 bits.
 * If a value of 0 is passed in, it indicates that the Rewarder's reward release will be paused.
 * * `clock` - The `Clock` object.
 * * `ctx` - The transaction context.
 */
export function updateEmission(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: UpdateEmissionArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::update_emission`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      obj(tx, args.vault),
      pure(tx, args.emissionsPerSecond, `u128`),
      obj(tx, args.clock),
    ],
  })
}

export interface UpdatePositionUrlArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  url: string | TransactionArgument
}

/**
 * Update the position nft image url. Just take effect on the new position
 * * `config` - The global config of clmm package.
 * * `pool` - The clmm pool object.
 * * `url` - The new position nft image url.
 * * `ctx` - The transaction context.
 */
export function updatePositionUrl(
  tx: Transaction,
  typeArgs: [string, string],
  args: UpdatePositionUrlArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::update_position_url`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      pure(tx, args.url, `${String.$typeName}`),
    ],
  })
}

export interface UpdateFeeRateArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  feeRate: bigint | TransactionArgument
}

/**
 * Update pool fee rate
 * * `config` - The global config of clmm package.
 * * `pool` - The clmm pool object.
 * * `fee_rate` - The pool new fee rate.
 * * `ctx` - The transaction context.
 */
export function updateFeeRate(
  tx: Transaction,
  typeArgs: [string, string],
  args: UpdateFeeRateArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::update_fee_rate`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      pure(tx, args.feeRate, `u64`),
    ],
  })
}

export interface UpdatePoolArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  coinA: TransactionObjectInput
  coinB: TransactionObjectInput
}

export function updatePool(
  tx: Transaction,
  typeArgs: [string, string],
  args: UpdatePoolArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::update_pool`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      obj(tx, args.coinA),
      obj(tx, args.coinB),
    ],
  })
}

export interface PauseArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
}

/**
 * Pause the pool.
 * For special cases, `pause` is used to pause the `Pool`.
 * `unpause` are disabled.
 * * `config` - The global config of clmm package.
 * * `pool` - The clmm pool object.
 * * `ctx` - The transaction context.
 */
export function pause(
  tx: Transaction,
  typeArgs: [string, string],
  args: PauseArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::pause`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
    ],
  })
}

export interface UnpauseArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
}

/**
 * Unpause the pool.
 * * `config` - The global config of clmm package.
 * * `pool` - The clmm pool object.
 * * `ctx` - The transaction context.
 */
export function unpause(
  tx: Transaction,
  typeArgs: [string, string],
  args: UnpauseArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::unpause`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
    ],
  })
}

export interface FlashLoanArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  loanA: boolean | TransactionArgument
  amount: bigint | TransactionArgument
}

/**
 * Flash loan from pool
 * * `config` - The global config of clmm package.
 * * `pool` - The clmm pool object.
 * * `loan_a` - A flag indicating whether to loan coin A (true) or coin B (false).
 * * `amount` - The amount to loan.
 * * Returns (Balance<CoinTypeA>, Balance<CoinTypeB>, FlashLoanReceipt)
 */
export function flashLoan(
  tx: Transaction,
  typeArgs: [string, string],
  args: FlashLoanArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::flash_loan`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      pure(tx, args.loanA, `bool`),
      pure(tx, args.amount, `u64`),
    ],
  })
}

export interface FlashLoanWithPartnerArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  partner: TransactionObjectInput
  loanA: boolean | TransactionArgument
  amount: bigint | TransactionArgument
  clock: TransactionObjectInput
}

/**
 * Flash loan with partner, like flash loan but there has a partner object for receive ref fee.
 * * `config` - The global config of clmm package.
 * * `pool` - The clmm pool object.
 * * `partner` - The partner object for receiving ref fee.
 * * `loan_a` - A flag indicating whether to loan coin A (true) or coin B (false).
 * * `amount` - The amount to loan.
 * * `clock` - The CLOCK of sui framework, used to get current timestamp.
 * * Returns (Balance<CoinTypeA>, Balance<CoinTypeB>, FlashLoanReceipt)
 */
export function flashLoanWithPartner(
  tx: Transaction,
  typeArgs: [string, string],
  args: FlashLoanWithPartnerArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::flash_loan_with_partner`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      obj(tx, args.partner),
      pure(tx, args.loanA, `bool`),
      pure(tx, args.amount, `u64`),
      obj(tx, args.clock),
    ],
  })
}

export interface RepayFlashLoanArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  balanceA: TransactionObjectInput
  balanceB: TransactionObjectInput
  receipt: TransactionObjectInput
}

/**
 * Repay for flash loan
 * * `config` - The global config of clmm package.
 * * `pool` - The clmm pool object.
 * * `balance_a` - The balance of `CoinTypeA` will pay for flash loan,
 * * `balance_b` - The balance of `CoinTypeB` will pay for flash loan,
 * * `receipt` - The receipt which will be destroyed.
 */
export function repayFlashLoan(
  tx: Transaction,
  typeArgs: [string, string],
  args: RepayFlashLoanArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::repay_flash_loan`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      obj(tx, args.balanceA),
      obj(tx, args.balanceB),
      obj(tx, args.receipt),
    ],
  })
}

export interface RepayFlashLoanWithPartnerArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  partner: TransactionObjectInput
  balanceA: TransactionObjectInput
  balanceB: TransactionObjectInput
  receipt: TransactionObjectInput
}

/**
 * Repay for flash loan with partner for receive ref fee.
 * * `config` - The global config of clmm package.
 * * `pool` - The clmm pool object.
 * * `partner` - The partner object which will receive ref fee
 * * `balance_a` - The balance of `CoinTypeA` will pay for flash loan,
 * * `balance_b` - The balance of `CoinTypeB` will pay for flash loan,
 * * `receipt` - The receipt which will be destroyed.
 */
export function repayFlashLoanWithPartner(
  tx: Transaction,
  typeArgs: [string, string],
  args: RepayFlashLoanWithPartnerArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::repay_flash_loan_with_partner`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      obj(tx, args.partner),
      obj(tx, args.balanceA),
      obj(tx, args.balanceB),
      obj(tx, args.receipt),
    ],
  })
}

export interface InitPositionSnapshotArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  removePercent: bigint | TransactionArgument
}

/**
 * Initialize the position snapshot storage(dynamic field object under pool) for the pool.
 * * `config` - The global config of clmm package.
 * * `pool` - The clmm pool object.
 * * `remove_percent` - The percent of the position to be removed.
 * * `ctx` - The transaction context.
 */
export function initPositionSnapshot(
  tx: Transaction,
  typeArgs: [string, string],
  args: InitPositionSnapshotArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::init_position_snapshot`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      pure(tx, args.removePercent, `u64`),
    ],
  })
}

/**
 * Get the position liquidity snapshot of the pool.
 * * `pool` - The clmm pool object.
 * * Returns the position liquidity snapshot.
 */
export function positionLiquiditySnapshot(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::position_liquidity_snapshot`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

export interface IsAttackedPositionArgs {
  pool: TransactionObjectInput
  positionId: string | TransactionArgument
}

/**
 * Check if the position is attacked.
 * * `pool` - The clmm pool object.
 * * `position_id` - The id of the position.
 * * Returns true if the position is attacked, otherwise false.
 */
export function isAttackedPosition(
  tx: Transaction,
  typeArgs: [string, string],
  args: IsAttackedPositionArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::is_attacked_position`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      pure(tx, args.positionId, `${ID.$typeName}`),
    ],
  })
}

export interface GetPositionSnapshotByPositionIdArgs {
  pool: TransactionObjectInput
  positionId: string | TransactionArgument
}

/**
 * Get the position snapshot by position id.
 * * `pool` - The clmm pool object.
 * * `position_id` - The id of the position.
 * * Returns the position snapshot.
 */
export function getPositionSnapshotByPositionId(
  tx: Transaction,
  typeArgs: [string, string],
  args: GetPositionSnapshotByPositionIdArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::get_position_snapshot_by_position_id`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      pure(tx, args.positionId, `${ID.$typeName}`),
    ],
  })
}

export interface ApplyLiquidityCutArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  positionId: string | TransactionArgument
  cutValue: bigint | TransactionArgument
  clock: TransactionObjectInput
}

/**
 * Applies a proportional cut to the liquidity of a specific position.
 *
 * Due to the inability to fully restore pool funds once,
 * we need to reduce each position’s liquidity by a specified delta before reopening the pool.
 *
 * This function should be called after data recovery and before reopening the pool for trading.
 * The first step is to snapshot the user's position to preserve its state before reduction,
 * which helps support any future liquidation tracking or accounting.
 *
 * * `config` - Global configuration object.
 * * `pool` - The target CLMM pool.
 * * `position_id` - The id of the position to be adjusted.
 * * `cut_value` - The usd value of the position to be cut, only be recorded for future tracking or reconciliation.
 * * `clock` - The current blockchain time context.
 * * `ctx` - The transaction context used for recording state changes.
 * [DEPRECATED] Legacy recovery method used after 2025 incident.
 * No longer in use. Retained only for compatibility. Do not call.
 */
export function applyLiquidityCut(
  tx: Transaction,
  typeArgs: [string, string],
  args: ApplyLiquidityCutArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::apply_liquidity_cut`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      pure(tx, args.positionId, `${ID.$typeName}`),
      pure(tx, args.cutValue, `u64`),
      obj(tx, args.clock),
    ],
  })
}

export interface GovernanceFundInjectionArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  coinA: TransactionObjectInput
  coinB: TransactionObjectInput
}

/**
 * Governance-only function to inject tokens into a CLMM pool as part of post-attack recovery.
 * * `config` - Global configuration object, used to verify governance access.
 * * `pool` - The target pool to receive the injected tokens.
 * * `coin_a` - Token A being injected into the pool.
 * * `coin_b` - Token B being injected into the pool.
 * * `ctx` - Transaction context.
 * [DEPRECATED] Legacy recovery method used after 2025 incident.
 * No longer in use. Retained only for compatibility. Do not call.
 */
export function governanceFundInjection(
  tx: Transaction,
  typeArgs: [string, string],
  args: GovernanceFundInjectionArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::governance_fund_injection`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      obj(tx, args.coinA),
      obj(tx, args.coinB),
    ],
  })
}

export interface GovernanceFundWithdrawalArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  amountA: bigint | TransactionArgument
  amountB: bigint | TransactionArgument
}

/**
 * After the CLMM attack, the pool price must be restored to the current market level.
 * Due to price shifts between the time of the attack and recovery, asset imbalances may occur.
 * This method is intended to withdraw surplus assets post-recovery.
 * * `config` - Global configuration object, used to verify governance access.
 * * `pool` - The target pool to receive the injected tokens.
 * * `amount_a` - The amount of token A to withdraw.
 * * `amount_b` - The amount of token B to withdraw.
 * * `ctx` - Transaction context.
 * [DEPRECATED] Legacy recovery method used after 2025 incident.
 * No longer in use. Retained only for compatibility. Do not call.
 */
export function governanceFundWithdrawal(
  tx: Transaction,
  typeArgs: [string, string],
  args: GovernanceFundWithdrawalArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::governance_fund_withdrawal`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      pure(tx, args.amountA, `u64`),
      pure(tx, args.amountB, `u64`),
    ],
  })
}

export interface EmergencyRemoveMaliciousPositionArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  positionId: string | TransactionArgument
}

/**
 * Removes the malicious PositionInfo and, decrease the specified liquidity from both of its associated ticks in the pool.
 * Here may exsist multiple malicious positions, so this method can be called multiple times.
 * * `config` - Global configuration object, used to verify governance access.
 * * `pool` - The target pool to receive the injected tokens.
 * * `position_id` - The id of the position to be removed.
 * * `ctx` - Transaction context.
 * [DEPRECATED] Legacy recovery method used after 2025 incident.
 * No longer in use. Retained only for compatibility. Do not call.
 */
export function emergencyRemoveMaliciousPosition(
  tx: Transaction,
  typeArgs: [string, string],
  args: EmergencyRemoveMaliciousPositionArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::emergency_remove_malicious_position`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      pure(tx, args.positionId, `${ID.$typeName}`),
    ],
  })
}

export interface EmergencyRestorePoolStateArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  targetSqrtPrice: bigint | TransactionArgument
  currentLiquidity: bigint | TransactionArgument
  clk: TransactionObjectInput
}

/**
 * The purpose of this function is to repair the pool state in an emergency scenario. Specifically, it performs the following steps:
 * - 1. Restores the pool price by swapping to the target_sqrt_price, which should reflect the correct pool price prior to the attack.
 * - 2. Performs a consistency check by verifying that the resulting current_liquidity after the swap matches the expected value passed in,
 * ensuring the pool has been correctly restored to a valid state.
 * * `config` - Global configuration object, used to verify governance access.
 * * `pool` - The target pool to receive the injected tokens.
 * * `target_sqrt_price` - The target sqrt price.
 * * `current_liquidity` - The current liquidity of the pool.
 * * `clk` - The current blockchain time context.
 * * `ctx` - Transaction context.
 * [DEPRECATED] Legacy recovery method used after 2025 incident.
 * No longer in use. Retained only for compatibility. Do not call.
 */
export function emergencyRestorePoolState(
  tx: Transaction,
  typeArgs: [string, string],
  args: EmergencyRestorePoolStateArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::emergency_restore_pool_state`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      pure(tx, args.targetSqrtPrice, `u128`),
      pure(tx, args.currentLiquidity, `u128`),
      obj(tx, args.clk),
    ],
  })
}

export interface GetAmountByLiquidityArgs {
  tickLower: TransactionObjectInput
  tickUpper: TransactionObjectInput
  currentTickIndex: TransactionObjectInput
  currentSqrtPrice: bigint | TransactionArgument
  liquidity: bigint | TransactionArgument
  roundUp: boolean | TransactionArgument
}

/**
 * Get the coin amount by liquidity
 * * `tick_lower` - The lower tick.
 * * `tick_upper` - The upper tick.
 * * `current_tick_index` - The current tick index.
 * * `current_sqrt_price` - The current sqrt price.
 * * `liquidity` - The liquidity.
 * * `round_up` - Whether to round up.
 * * Returns (u64, u64)
 */
export function getAmountByLiquidity(
  tx: Transaction,
  args: GetAmountByLiquidityArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::get_amount_by_liquidity`,
    arguments: [
      obj(tx, args.tickLower),
      obj(tx, args.tickUpper),
      obj(tx, args.currentTickIndex),
      pure(tx, args.currentSqrtPrice, `u128`),
      pure(tx, args.liquidity, `u128`),
      pure(tx, args.roundUp, `bool`),
    ],
  })
}

export interface GetLiquidityFromAmountArgs {
  lowerIndex: TransactionObjectInput
  upperIndex: TransactionObjectInput
  currentTickIndex: TransactionObjectInput
  currentSqrtPrice: bigint | TransactionArgument
  amount: bigint | TransactionArgument
  isFixedA: boolean | TransactionArgument
}

/**
 * Get the liquidity by amount
 * * `lower_index` - The lower tick index.
 * * `upper_index` - The upper tick index.
 * * `current_tick_index` - The current tick index.
 * * `current_sqrt_price` - The current sqrt price.
 * * `amount` - The amount.
 * * `is_fixed_a` - Whether the amount is fixed for coin A.
 */
export function getLiquidityFromAmount(
  tx: Transaction,
  args: GetLiquidityFromAmountArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::get_liquidity_from_amount`,
    arguments: [
      obj(tx, args.lowerIndex),
      obj(tx, args.upperIndex),
      obj(tx, args.currentTickIndex),
      pure(tx, args.currentSqrtPrice, `u128`),
      pure(tx, args.amount, `u64`),
      pure(tx, args.isFixedA, `bool`),
    ],
  })
}

export interface GetFeeInTickRangeArgs {
  pool: TransactionObjectInput
  tickLowerIndex: TransactionObjectInput
  tickUpperIndex: TransactionObjectInput
}

/**
 * Get the fee in tick range.
 * * `pool` - The clmm pool object.
 * * `tick_lower_index` - The lower tick index.
 * * `tick_upper_index` - The upper tick index.
 * * Returns (u128, u128)
 */
export function getFeeInTickRange(
  tx: Transaction,
  typeArgs: [string, string],
  args: GetFeeInTickRangeArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::get_fee_in_tick_range`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      obj(tx, args.tickLowerIndex),
      obj(tx, args.tickUpperIndex),
    ],
  })
}

export interface GetRewardsInTickRangeArgs {
  pool: TransactionObjectInput
  tickLowerIndex: TransactionObjectInput
  tickUpperIndex: TransactionObjectInput
}

/**
 * Get the rewards in tick range.
 * * `pool` - The clmm pool object.
 * * `tick_lower_index` - The lower tick index.
 * * `tick_upper_index` - The upper tick index.
 * * Returns vector<u128>
 */
export function getRewardsInTickRange(
  tx: Transaction,
  typeArgs: [string, string],
  args: GetRewardsInTickRangeArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::get_rewards_in_tick_range`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      obj(tx, args.tickLowerIndex),
      obj(tx, args.tickUpperIndex),
    ],
  })
}

export interface GetPointsInTickRangeArgs {
  pool: TransactionObjectInput
  tickLowerIndex: TransactionObjectInput
  tickUpperIndex: TransactionObjectInput
}

/**
 * Get the points in tick range.
 * * `pool` - The clmm pool object.
 * * `tick_lower_index` - The lower tick index.
 * * `tick_upper_index` - The upper tick index.
 * * Returns u128
 */
export function getPointsInTickRange(
  tx: Transaction,
  typeArgs: [string, string],
  args: GetPointsInTickRangeArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::get_points_in_tick_range`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      obj(tx, args.tickLowerIndex),
      obj(tx, args.tickUpperIndex),
    ],
  })
}

export interface GetFeeRewardsPointsInTickRangeArgs {
  pool: TransactionObjectInput
  tickLowerIndex: TransactionObjectInput
  tickUpperIndex: TransactionObjectInput
}

/**
 * Get the fee, rewards and points in tick range.
 * * `pool` - The clmm pool object.
 * * `tick_lower_index` - The lower tick index.
 * * `tick_upper_index` - The upper tick index.
 * * Returns (u128, u128, vector<u128>, u128)
 */
export function getFeeRewardsPointsInTickRange(
  tx: Transaction,
  typeArgs: [string, string],
  args: GetFeeRewardsPointsInTickRangeArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::get_fee_rewards_points_in_tick_range`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      obj(tx, args.tickLowerIndex),
      obj(tx, args.tickUpperIndex),
    ],
  })
}

export interface FetchTicksArgs {
  pool: TransactionObjectInput
  start: Array<number | TransactionArgument> | TransactionArgument
  limit: bigint | TransactionArgument
}

/**
 * Fetch the ticks.
 * * `pool` - The clmm pool object.
 * * `start` - The start vector.
 * * `limit` - The limit.
 * * Returns vector<Tick>
 */
export function fetchTicks(
  tx: Transaction,
  typeArgs: [string, string],
  args: FetchTicksArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::fetch_ticks`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      pure(tx, args.start, `vector<u32>`),
      pure(tx, args.limit, `u64`),
    ],
  })
}

export interface FetchPositionsArgs {
  pool: TransactionObjectInput
  start: Array<string | TransactionArgument> | TransactionArgument
  limit: bigint | TransactionArgument
}

/**
 * Fetch the positions.
 * * `pool` - The clmm pool object.
 * * `start` - The start vector.
 * * `limit` - The limit.
 * * Returns vector<PositionInfo>
 */
export function fetchPositions(
  tx: Transaction,
  typeArgs: [string, string],
  args: FetchPositionsArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::fetch_positions`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      pure(tx, args.start, `vector<${ID.$typeName}>`),
      pure(tx, args.limit, `u64`),
    ],
  })
}

export interface CalculateSwapResultArgs {
  pool: TransactionObjectInput
  a2B: boolean | TransactionArgument
  byAmountIn: boolean | TransactionArgument
  amount: bigint | TransactionArgument
}

/**
 * Calculate the swap result.
 * It is used to perform pre-calculation on swap and does not modify any data.
 * * `pool` - The clmm pool object.
 * * `a2b` - The swap direction.
 * * `by_amount_in` - A flag used to determine whether next arg `amount` represents input or output.
 * * `amount` - You want to fix the value of the input or output of a swap pre-calculation.
 * * Returns CalculatedSwapResult
 */
export function calculateSwapResult(
  tx: Transaction,
  typeArgs: [string, string],
  args: CalculateSwapResultArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::calculate_swap_result`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      pure(tx, args.a2B, `bool`),
      pure(tx, args.byAmountIn, `bool`),
      pure(tx, args.amount, `u64`),
    ],
  })
}

/**
 * Get the balances of the pool.
 * * `pool` - The clmm pool object.
 * * Returns (&Balance<CoinTypeA>, &Balance<CoinTypeB>)
 */
export function balances(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::balances`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

/**
 * Get the tick spacing of the pool.
 * * `pool` - The clmm pool object.
 * * Returns u32
 */
export function tickSpacing(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::tick_spacing`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

/**
 * Get the fee rate of the pool.
 * * `pool` - The clmm pool object.
 * * Returns u64
 */
export function feeRate(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::fee_rate`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

/**
 * Get the liquidity of the pool.
 * * `pool` - The clmm pool object.
 * * Returns u128
 */
export function liquidity(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::liquidity`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

/**
 * Get the current sqrt price of the pool.
 * * `pool` - The clmm pool object.
 * * Returns u128
 */
export function currentSqrtPrice(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::current_sqrt_price`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

/**
 * Get the current tick index of the pool.
 * * `pool` - The clmm pool object.
 * * Returns I32
 */
export function currentTickIndex(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::current_tick_index`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

/**
 * Get the fees growth global of the pool.
 * * `pool` - The clmm pool object.
 * * Returns (u128, u128)
 */
export function feesGrowthGlobal(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::fees_growth_global`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

/**
 * Get the protocol fee of the pool.
 * * `pool` - The clmm pool object.
 * * Returns (u64, u64)
 */
export function protocolFee(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::protocol_fee`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

/**
 * Get the tick manager of the pool.
 * * `pool` - The clmm pool object.
 * * Returns &TickManager
 */
export function tickManager(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::tick_manager`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

/**
 * Get the position manager of the pool.
 * * `pool` - The clmm pool object.
 * * Returns &PositionManager
 */
export function positionManager(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::position_manager`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

/**
 * Get the rewarder manager of the pool.
 * * `pool` - The clmm pool object.
 * * Returns &RewarderManager
 */
export function rewarderManager(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::rewarder_manager`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

/**
 * Get the pause state of the pool.
 * * `pool` - The clmm pool object.
 * * Returns bool
 */
export function isPause(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::is_pause`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

/**
 * Get the index of the pool.
 * * `pool` - The clmm pool object.
 * * Returns u64
 */
export function index(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::index`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

/**
 * Get the url of the pool.
 * * `pool` - The clmm pool object.
 * * Returns String
 */
export function url(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::url`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

export interface BorrowTickArgs {
  pool: TransactionObjectInput
  tickIdx: TransactionObjectInput
}

/**
 * Borrow the tick of the pool.
 * * `pool` - The clmm pool object.
 * * `tick_idx` - The tick index.
 * * Returns &Tick
 */
export function borrowTick(
  tx: Transaction,
  typeArgs: [string, string],
  args: BorrowTickArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::borrow_tick`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      obj(tx, args.tickIdx),
    ],
  })
}

export interface BorrowPositionInfoArgs {
  pool: TransactionObjectInput
  positionId: string | TransactionArgument
}

/**
 * Borrow the position info of the pool.
 * * `pool` - The clmm pool object.
 * * `position_id` - The position id.
 * * Returns &PositionInfo
 */
export function borrowPositionInfo(
  tx: Transaction,
  typeArgs: [string, string],
  args: BorrowPositionInfoArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::borrow_position_info`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      pure(tx, args.positionId, `${ID.$typeName}`),
    ],
  })
}

/**
 * Get the swap pay amount
 * * `receipt` - The flash swap receipt.
 * * Returns u64
 */
export function swapPayAmount(
  tx: Transaction,
  typeArgs: [string, string],
  receipt: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::swap_pay_amount`,
    typeArguments: typeArgs,
    arguments: [obj(tx, receipt)],
  })
}

/**
 * Get the ref fee amount
 * * `receipt` - The flash swap receipt.
 * * Returns u64
 */
export function refFeeAmount(
  tx: Transaction,
  typeArgs: [string, string],
  receipt: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::ref_fee_amount`,
    typeArguments: typeArgs,
    arguments: [obj(tx, receipt)],
  })
}

export interface GetPositionFeeArgs {
  pool: TransactionObjectInput
  positionId: string | TransactionArgument
}

/**
 * Get the fee from position
 * * `pool` - The clmm pool object.
 * * `position_id` - The position id.
 * * Returns (u64, u64)
 */
export function getPositionFee(
  tx: Transaction,
  typeArgs: [string, string],
  args: GetPositionFeeArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::get_position_fee`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      pure(tx, args.positionId, `${ID.$typeName}`),
    ],
  })
}

export interface GetPositionPointsArgs {
  pool: TransactionObjectInput
  positionId: string | TransactionArgument
}

/**
 * Get the points from position
 * * `pool` - The clmm pool object.
 * * `position_id` - The position id.
 * * Returns u128
 */
export function getPositionPoints(
  tx: Transaction,
  typeArgs: [string, string],
  args: GetPositionPointsArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::get_position_points`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      pure(tx, args.positionId, `${ID.$typeName}`),
    ],
  })
}

export interface GetPositionRewardsArgs {
  pool: TransactionObjectInput
  positionId: string | TransactionArgument
}

/**
 * Get the rewards amount owned from position
 * * `pool` - The clmm pool object.
 * * `position_id` - The position id.
 * * Returns vector<u64>
 */
export function getPositionRewards(
  tx: Transaction,
  typeArgs: [string, string],
  args: GetPositionRewardsArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::get_position_rewards`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      pure(tx, args.positionId, `${ID.$typeName}`),
    ],
  })
}

export interface GetPositionRewardArgs {
  pool: TransactionObjectInput
  positionId: string | TransactionArgument
}

/**
 * Get the reward amount owned from position
 * * `pool` - The clmm pool object.
 * * `position_id` - The position id.
 * * Returns u64
 */
export function getPositionReward(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: GetPositionRewardArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::get_position_reward`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      pure(tx, args.positionId, `${ID.$typeName}`),
    ],
  })
}

export interface IsPositionExistArgs {
  pool: TransactionObjectInput
  positionId: string | TransactionArgument
}

/**
 * Check if the position exists
 * * `pool` - The clmm pool object.
 * * `position_id` - The position id.
 * * Returns bool
 */
export function isPositionExist(
  tx: Transaction,
  typeArgs: [string, string],
  args: IsPositionExistArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::is_position_exist`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      pure(tx, args.positionId, `${ID.$typeName}`),
    ],
  })
}

/**
 * Get the amount out of the calculated swap result
 * * `calculatedSwapResult` - The calculated swap result.
 * * Returns u64
 */
export function calculatedSwapResultAmountOut(
  tx: Transaction,
  calculatedSwapResult: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::calculated_swap_result_amount_out`,
    arguments: [obj(tx, calculatedSwapResult)],
  })
}

/**
 * Check if the calculated swap result is exceed
 * * `calculatedSwapResult` - The calculated swap result.
 * * Returns bool
 */
export function calculatedSwapResultIsExceed(
  tx: Transaction,
  calculatedSwapResult: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::calculated_swap_result_is_exceed`,
    arguments: [obj(tx, calculatedSwapResult)],
  })
}

/**
 * Get the amount in of the calculated swap result
 * * `calculatedSwapResult` - The calculated swap result.
 * * Returns u64
 */
export function calculatedSwapResultAmountIn(
  tx: Transaction,
  calculatedSwapResult: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::calculated_swap_result_amount_in`,
    arguments: [obj(tx, calculatedSwapResult)],
  })
}

/**
 * Get the after sqrt price of the calculated swap result
 * * `calculatedSwapResult` - The calculated swap result.
 * * Returns u128
 */
export function calculatedSwapResultAfterSqrtPrice(
  tx: Transaction,
  calculatedSwapResult: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::calculated_swap_result_after_sqrt_price`,
    arguments: [obj(tx, calculatedSwapResult)],
  })
}

/**
 * Get the fee amount of the calculated swap result
 * * `calculatedSwapResult` - The calculated swap result.
 * * Returns u64
 */
export function calculatedSwapResultFeeAmount(
  tx: Transaction,
  calculatedSwapResult: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::calculated_swap_result_fee_amount`,
    arguments: [obj(tx, calculatedSwapResult)],
  })
}

/**
 * Get the step results of the calculated swap result
 * * `calculatedSwapResult` - The calculated swap result.
 * * Returns &vector<SwapStepResult>
 */
export function calculateSwapResultStepResults(
  tx: Transaction,
  calculatedSwapResult: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::calculate_swap_result_step_results`,
    arguments: [obj(tx, calculatedSwapResult)],
  })
}

/**
 * Get the length of the step results of the calculated swap result
 * * `calculatedSwapResult` - The calculated swap result.
 * * Returns u64
 */
export function calculatedSwapResultStepsLength(
  tx: Transaction,
  calculatedSwapResult: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::calculated_swap_result_steps_length`,
    arguments: [obj(tx, calculatedSwapResult)],
  })
}

export interface CalculatedSwapResultStepSwapResultArgs {
  calculatedSwapResult: TransactionObjectInput
  index: bigint | TransactionArgument
}

/**
 * Get the step swap result of the calculated swap result
 * * `calculatedSwapResult` - The calculated swap result.
 * * `index` - The index of the step swap result.
 * * Returns &SwapStepResult
 */
export function calculatedSwapResultStepSwapResult(
  tx: Transaction,
  args: CalculatedSwapResultStepSwapResultArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::calculated_swap_result_step_swap_result`,
    arguments: [
      obj(tx, args.calculatedSwapResult),
      pure(tx, args.index, `u64`),
    ],
  })
}

/**
 * Get the amount in of the step swap result
 * * `stepSwapResult` - The step swap result.
 * * Returns u64
 */
export function stepSwapResultAmountIn(
  tx: Transaction,
  stepSwapResult: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::step_swap_result_amount_in`,
    arguments: [obj(tx, stepSwapResult)],
  })
}

/**
 * Get the amount out of the step swap result
 * * `stepSwapResult` - The step swap result.
 * * Returns u64
 */
export function stepSwapResultAmountOut(
  tx: Transaction,
  stepSwapResult: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::step_swap_result_amount_out`,
    arguments: [obj(tx, stepSwapResult)],
  })
}

/**
 * Get the fee amount of the step swap result
 * * `stepSwapResult` - The step swap result.
 * * Returns u64
 */
export function stepSwapResultFeeAmount(
  tx: Transaction,
  stepSwapResult: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::step_swap_result_fee_amount`,
    arguments: [obj(tx, stepSwapResult)],
  })
}

/**
 * Get the current sqrt price of the step swap result
 * * `stepSwapResult` - The step swap result.
 * * Returns u128
 */
export function stepSwapResultCurrentSqrtPrice(
  tx: Transaction,
  stepSwapResult: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::step_swap_result_current_sqrt_price`,
    arguments: [obj(tx, stepSwapResult)],
  })
}

/**
 * Get the target sqrt price of the step swap result
 * * `stepSwapResult` - The step swap result.
 * * Returns u128
 */
export function stepSwapResultTargetSqrtPrice(
  tx: Transaction,
  stepSwapResult: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::step_swap_result_target_sqrt_price`,
    arguments: [obj(tx, stepSwapResult)],
  })
}

/**
 * Get the current liquidity of the step swap result
 * * `stepSwapResult` - The step swap result.
 * * Returns u128
 */
export function stepSwapResultCurrentLiquidity(
  tx: Transaction,
  stepSwapResult: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::step_swap_result_current_liquidity`,
    arguments: [obj(tx, stepSwapResult)],
  })
}

/**
 * Get the remainder amount of the step swap result
 * * `stepSwapResult` - The step swap result.
 * * Returns u64
 */
export function stepSwapResultRemainderAmount(
  tx: Transaction,
  stepSwapResult: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::step_swap_result_remainder_amount`,
    arguments: [obj(tx, stepSwapResult)],
  })
}

/**
 * Check if the swap is allowed
 * * `pool` - The clmm pool object.
 * * Returns bool
 */
export function isAllowSwap(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::is_allow_swap`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

/**
 * Check if the add liquidity is allowed
 * * `pool` - The clmm pool object.
 * * Returns bool
 */
export function isAllowAddLiquidity(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::is_allow_add_liquidity`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

/**
 * Check if the remove liquidity is allowed
 * * `pool` - The clmm pool object.
 * * Returns bool
 */
export function isAllowRemoveLiquidity(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::is_allow_remove_liquidity`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

/**
 * Check if the flash loan is allowed
 * * `pool` - The clmm pool object.
 * * Returns bool
 */
export function isAllowFlashLoan(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::is_allow_flash_loan`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

/**
 * Check if the collect fee is allowed
 * * `pool` - The clmm pool object.
 * * Returns bool
 */
export function isAllowCollectFee(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::is_allow_collect_fee`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

/**
 * Check if the collect reward is allowed
 * * `pool` - The clmm pool object.
 * * Returns bool
 */
export function isAllowCollectReward(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::is_allow_collect_reward`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

export interface SetPoolStatusArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  disableAddLiquidity: boolean | TransactionArgument
  disableRemoveLiquidity: boolean | TransactionArgument
  disableSwap: boolean | TransactionArgument
  disableFlashLoan: boolean | TransactionArgument
  disableCollectFee: boolean | TransactionArgument
  disableCollectReward: boolean | TransactionArgument
}

/**
 * Set the pool status
 * * `config` - The global config object.
 * * `pool` - The clmm pool object.
 * * `disable_add_liquidity` - The disable add liquidity flag.
 * * `disable_remove_liquidity` - The disable remove liquidity flag.
 * * `disable_swap` - The disable swap flag.
 * * `disable_flash_loan` - The disable flash loan flag.
 * * `disable_collect_fee` - The disable collect fee flag.
 * * `disable_collect_reward` - The disable collect reward flag.
 * * `ctx` - The transaction context.
 */
export function setPoolStatus(
  tx: Transaction,
  typeArgs: [string, string],
  args: SetPoolStatusArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::set_pool_status`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      pure(tx, args.disableAddLiquidity, `bool`),
      pure(tx, args.disableRemoveLiquidity, `bool`),
      pure(tx, args.disableSwap, `bool`),
      pure(tx, args.disableFlashLoan, `bool`),
      pure(tx, args.disableCollectFee, `bool`),
      pure(tx, args.disableCollectReward, `bool`),
    ],
  })
}

export interface AddLiquidityInternalArgs {
  pool: TransactionObjectInput
  positionNft: TransactionObjectInput
  byAmount: boolean | TransactionArgument
  liquidity: bigint | TransactionArgument
  amount: bigint | TransactionArgument
  fixAmountA: boolean | TransactionArgument
  timestamp: bigint | TransactionArgument
}

export function addLiquidityInternal(
  tx: Transaction,
  typeArgs: [string, string],
  args: AddLiquidityInternalArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::add_liquidity_internal`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      obj(tx, args.positionNft),
      pure(tx, args.byAmount, `bool`),
      pure(tx, args.liquidity, `u128`),
      pure(tx, args.amount, `u64`),
      pure(tx, args.fixAmountA, `bool`),
      pure(tx, args.timestamp, `u64`),
    ],
  })
}

export interface FlashSwapInternalArgs {
  pool: TransactionObjectInput
  config: TransactionObjectInput
  partnerId: string | TransactionArgument
  refFeeRate: bigint | TransactionArgument
  a2B: boolean | TransactionArgument
  byAmountIn: boolean | TransactionArgument
  amount: bigint | TransactionArgument
  sqrtPriceLimit: bigint | TransactionArgument
  clock: TransactionObjectInput
}

/** Swap output coin and flash loan resource. */
export function flashSwapInternal(
  tx: Transaction,
  typeArgs: [string, string],
  args: FlashSwapInternalArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::flash_swap_internal`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      obj(tx, args.config),
      pure(tx, args.partnerId, `${ID.$typeName}`),
      pure(tx, args.refFeeRate, `u64`),
      pure(tx, args.a2B, `bool`),
      pure(tx, args.byAmountIn, `bool`),
      pure(tx, args.amount, `u64`),
      pure(tx, args.sqrtPriceLimit, `u128`),
      obj(tx, args.clock),
    ],
  })
}

export interface FlashLoanInternalArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  partnerId: string | TransactionArgument
  refFeeRate: bigint | TransactionArgument
  loanA: boolean | TransactionArgument
  amount: bigint | TransactionArgument
}

/**
 * Internal function for flash loan
 * * `config` - The global config object.
 * * `pool` - The clmm pool object.
 * * `partner_id` - The partner object id for receiving ref fee.
 * * `ref_fee_rate` - The ref fee rate for partner.
 * * `loan_a` - A flag indicating whether to loan coin A (true) or coin B (false).
 * * `amount` - The amount to loan.
 * * Returns (Balance<CoinTypeA>, Balance<CoinTypeB>, FlashLoanReceipt)
 */
export function flashLoanInternal(
  tx: Transaction,
  typeArgs: [string, string],
  args: FlashLoanInternalArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::flash_loan_internal`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      pure(tx, args.partnerId, `${ID.$typeName}`),
      pure(tx, args.refFeeRate, `u64`),
      pure(tx, args.loanA, `bool`),
      pure(tx, args.amount, `u64`),
    ],
  })
}

export interface SwapInPoolArgs {
  pool: TransactionObjectInput
  a2B: boolean | TransactionArgument
  byAmountIn: boolean | TransactionArgument
  sqrtPriceLimit: bigint | TransactionArgument
  amount: bigint | TransactionArgument
  protocolFeeRate: bigint | TransactionArgument
  refFeeRate: bigint | TransactionArgument
}

/**
 * Swap in pool
 * * `pool` - The clmm pool object.
 * * `a2b` - The swap direction.
 * * `by_amount_in` - A flag used to determine whether next arg `amount` represents input or output.
 * * `sqrt_price_limit` - The sqrt price limit.
 * * `amount` - The amount to swap.
 * * `protocol_fee_rate` - The protocol fee rate.
 * * `ref_fee_rate` - The ref fee rate.
 * * Returns SwapResult
 */
export function swapInPool(
  tx: Transaction,
  typeArgs: [string, string],
  args: SwapInPoolArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::swap_in_pool`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      pure(tx, args.a2B, `bool`),
      pure(tx, args.byAmountIn, `bool`),
      pure(tx, args.sqrtPriceLimit, `u128`),
      pure(tx, args.amount, `u64`),
      pure(tx, args.protocolFeeRate, `u64`),
      pure(tx, args.refFeeRate, `u64`),
    ],
  })
}

export interface UpdateSwapResultArgs {
  result: TransactionObjectInput
  amountIn: bigint | TransactionArgument
  amountOut: bigint | TransactionArgument
  feeAmount: bigint | TransactionArgument
}

/**
 * Update the swap result
 * * `result` - The swap result.
 * * `amount_in` - The amount in.
 * * `amount_out` - The amount out.
 * * `fee_amount` - The fee amount.
 */
export function updateSwapResult(tx: Transaction, args: UpdateSwapResultArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::update_swap_result`,
    arguments: [
      obj(tx, args.result),
      pure(tx, args.amountIn, `u64`),
      pure(tx, args.amountOut, `u64`),
      pure(tx, args.feeAmount, `u64`),
    ],
  })
}

export interface UpdatePoolFeeArgs {
  pool: TransactionObjectInput
  feeAmount: bigint | TransactionArgument
  protocolFeeRate: bigint | TransactionArgument
  a2B: boolean | TransactionArgument
}

/**
 * Update the pool's fee_growth_global_[a/b] and return protocol_fee.
 * * `pool` - The clmm pool object.
 * * `fee_amount` - The fee amount.
 * * `protocol_fee_rate` - The protocol fee rate.
 * * `a2b` - The swap direction.
 * * Returns u64
 */
export function updatePoolFee(
  tx: Transaction,
  typeArgs: [string, string],
  args: UpdatePoolFeeArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::update_pool_fee`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      pure(tx, args.feeAmount, `u64`),
      pure(tx, args.protocolFeeRate, `u64`),
      pure(tx, args.a2B, `bool`),
    ],
  })
}

export interface UpdateFlashLoanFeeArgs {
  pool: TransactionObjectInput
  feeAmount: bigint | TransactionArgument
  protocolFeeRate: bigint | TransactionArgument
  loanA: boolean | TransactionArgument
}

/**
 * Update the flash loan fee
 * * `pool` - The clmm pool object.
 * * `fee_amount` - The fee amount.
 * * `protocol_fee_rate` - The protocol fee rate.
 * * `loan_a` - A flag indicating whether to loan coin A (true) or coin B (false).
 * * Returns u64
 */
export function updateFlashLoanFee(
  tx: Transaction,
  typeArgs: [string, string],
  args: UpdateFlashLoanFeeArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::update_flash_loan_fee`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      pure(tx, args.feeAmount, `u64`),
      pure(tx, args.protocolFeeRate, `u64`),
      pure(tx, args.loanA, `bool`),
    ],
  })
}

export interface UpdateFeeGrowthArgs {
  pool: TransactionObjectInput
  feeAmount: bigint | TransactionArgument
  protocolFeeRate: bigint | TransactionArgument
  isCoinA: boolean | TransactionArgument
}

/**
 * Update the fee growth, internal function
 * * `pool` - The clmm pool object.
 * * `fee_amount` - The fee amount.
 * * `protocol_fee_rate` - The protocol fee rate.
 * * `is_coin_a` - A flag indicating whether to update coin A (true) or coin B (false).
 * * Returns u64
 */
export function updateFeeGrowth(
  tx: Transaction,
  typeArgs: [string, string],
  args: UpdateFeeGrowthArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::update_fee_growth`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      pure(tx, args.feeAmount, `u64`),
      pure(tx, args.protocolFeeRate, `u64`),
      pure(tx, args.isCoinA, `bool`),
    ],
  })
}

/**
 * Collect protocol fee internal
 * * `pool` - The clmm pool object.
 * * Returns the balance object of CoinTypeA and CoinTypeB.
 */
export function collectProtocolFeeInternal(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::collect_protocol_fee_internal`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

export function markPendingAddLiquidity(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::mark_pending_add_liquidity`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

export function clearPendingAddLiquidity(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::clear_pending_add_liquidity`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

export function assertNoPendingAddLiquidity(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::assert_no_pending_add_liquidity`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

export interface CheckRemainerAmountSubArgs {
  remainerAmount: bigint | TransactionArgument
  amount: bigint | TransactionArgument
}

/**
 * Check the remainer amount sub
 * * `remainer_amount` - The remainer amount.
 * * `amount` - The amount.
 * * Returns u64
 */
export function checkRemainerAmountSub(
  tx: Transaction,
  args: CheckRemainerAmountSubArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::check_remainer_amount_sub`,
    arguments: [
      pure(tx, args.remainerAmount, `u64`),
      pure(tx, args.amount, `u64`),
    ],
  })
}

/**
 * Get the default swap result
 * * Returns SwapResult
 */
export function defaultSwapResult(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::pool::default_swap_result`,
    arguments: [],
  })
}
