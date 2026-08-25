import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { generic, GenericArg, obj, pure } from '../../_framework/util'
import { Option } from '../../std/option/structs'
import { ID } from '../../sui/object/structs'

export function aDeleverage(tx: Transaction, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::a_deleverage`,
    arguments: [],
  })
}

export function aRebalance(tx: Transaction, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::a_rebalance`,
    arguments: [],
  })
}

export function aRepayBadDebt(tx: Transaction, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::a_repay_bad_debt`,
    arguments: [],
  })
}

export interface PositionConstructorArgs {
  configId: string | TransactionArgument
  lpPosition: GenericArg
  colX: TransactionObjectInput
  colY: TransactionObjectInput
  debtBag: TransactionObjectInput
  collectedFees: TransactionObjectInput
  ownerRewardStash: TransactionObjectInput
}

export function positionConstructor(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: PositionConstructorArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::position_constructor`,
    typeArguments: typeArgs,
    arguments: [
      pure(tx, args.configId, `${ID.$typeName}`),
      generic(tx, `${typeArgs[2]}`, args.lpPosition),
      obj(tx, args.colX),
      obj(tx, args.colY),
      obj(tx, args.debtBag),
      obj(tx, args.collectedFees),
      obj(tx, args.ownerRewardStash),
    ],
  })
}

export function positionDeconstructor(
  tx: Transaction,
  typeArgs: [string, string, string],
  position: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::position_deconstructor`,
    typeArguments: typeArgs,
    arguments: [obj(tx, position)],
  })
}

export function positionShareObject(
  tx: Transaction,
  typeArgs: [string, string, string],
  position: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::position_share_object`,
    typeArguments: typeArgs,
    arguments: [obj(tx, position)],
  })
}

/** Get the position configuration ID. */
export function positionConfigId(
  tx: Transaction,
  typeArgs: [string, string, string],
  position: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::position_config_id`,
    typeArguments: typeArgs,
    arguments: [obj(tx, position)],
  })
}

/** Get reference to the LP position. */
export function lpPosition(
  tx: Transaction,
  typeArgs: [string, string, string],
  position: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::lp_position`,
    typeArguments: typeArgs,
    arguments: [obj(tx, position)],
  })
}

/** Get reference to X token collateral balance. */
export function colX(
  tx: Transaction,
  typeArgs: [string, string, string],
  position: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::col_x`,
    typeArguments: typeArgs,
    arguments: [obj(tx, position)],
  })
}

/** Get reference to Y token collateral balance. */
export function colY(
  tx: Transaction,
  typeArgs: [string, string, string],
  position: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::col_y`,
    typeArguments: typeArgs,
    arguments: [obj(tx, position)],
  })
}

/** Get reference to the position's debt bag. */
export function positionDebtBag(
  tx: Transaction,
  typeArgs: [string, string, string],
  position: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::position_debt_bag`,
    typeArguments: typeArgs,
    arguments: [obj(tx, position)],
  })
}

export function ticketActive(
  tx: Transaction,
  typeArgs: [string, string, string],
  position: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::ticket_active`,
    typeArguments: typeArgs,
    arguments: [obj(tx, position)],
  })
}

export interface SetTicketActiveArgs {
  position: TransactionObjectInput
  value: boolean | TransactionArgument
}

export function setTicketActive(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: SetTicketActiveArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::set_ticket_active`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      pure(tx, args.value, `bool`),
    ],
  })
}

export function lpPositionMut(
  tx: Transaction,
  typeArgs: [string, string, string],
  position: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::lp_position_mut`,
    typeArguments: typeArgs,
    arguments: [obj(tx, position)],
  })
}

export function colXMut(
  tx: Transaction,
  typeArgs: [string, string, string],
  position: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::col_x_mut`,
    typeArguments: typeArgs,
    arguments: [obj(tx, position)],
  })
}

export function colYMut(
  tx: Transaction,
  typeArgs: [string, string, string],
  position: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::col_y_mut`,
    typeArguments: typeArgs,
    arguments: [obj(tx, position)],
  })
}

export function positionDebtBagMut(
  tx: Transaction,
  typeArgs: [string, string, string],
  position: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::position_debt_bag_mut`,
    typeArguments: typeArgs,
    arguments: [obj(tx, position)],
  })
}

export function collectedFees(
  tx: Transaction,
  typeArgs: [string, string, string],
  position: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::collected_fees`,
    typeArguments: typeArgs,
    arguments: [obj(tx, position)],
  })
}

export function collectedFeesMut(
  tx: Transaction,
  typeArgs: [string, string, string],
  position: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::collected_fees_mut`,
    typeArguments: typeArgs,
    arguments: [obj(tx, position)],
  })
}

export function ownerRewardStash(
  tx: Transaction,
  typeArgs: [string, string, string],
  position: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::owner_reward_stash`,
    typeArguments: typeArgs,
    arguments: [obj(tx, position)],
  })
}

export function ownerRewardStashMut(
  tx: Transaction,
  typeArgs: [string, string, string],
  position: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::owner_reward_stash_mut`,
    typeArguments: typeArgs,
    arguments: [obj(tx, position)],
  })
}

export function positionCapConstructor(
  tx: Transaction,
  positionId: string | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::position_cap_constructor`,
    arguments: [pure(tx, positionId, `${ID.$typeName}`)],
  })
}

export function positionCapDeconstructor(
  tx: Transaction,
  cap: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::position_cap_deconstructor`,
    arguments: [obj(tx, cap)],
  })
}

export function pcPositionId(
  tx: Transaction,
  cap: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::pc_position_id`,
    arguments: [obj(tx, cap)],
  })
}

/** Create an empty position configuration with default values. */
export function createEmptyConfig(
  tx: Transaction,
  poolObjectId: string | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::create_empty_config`,
    arguments: [pure(tx, poolObjectId, `${ID.$typeName}`)],
  })
}

/** Get the pool object ID from position config. */
export function poolObjectId(
  tx: Transaction,
  config: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::pool_object_id`,
    arguments: [obj(tx, config)],
  })
}

/** Check if new position creation is allowed. */
export function allowNewPositions(
  tx: Transaction,
  config: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::allow_new_positions`,
    arguments: [obj(tx, config)],
  })
}

export function lendFacilCap(
  tx: Transaction,
  config: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::lend_facil_cap`,
    arguments: [obj(tx, config)],
  })
}

/** Get minimum liquidation start price delta in basis points. */
export function minLiqStartPriceDeltaBps(
  tx: Transaction,
  config: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::min_liq_start_price_delta_bps`,
    arguments: [obj(tx, config)],
  })
}

/** Get minimum initial margin in basis points. */
export function minInitMarginBps(
  tx: Transaction,
  config: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::min_init_margin_bps`,
    arguments: [obj(tx, config)],
  })
}

/** Get allowed oracles bag. */
export function allowedOracles(
  tx: Transaction,
  config: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::allowed_oracles`,
    arguments: [obj(tx, config)],
  })
}

/** Get deleveraging margin threshold in basis points. */
export function deleverageMarginBps(
  tx: Transaction,
  config: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::deleverage_margin_bps`,
    arguments: [obj(tx, config)],
  })
}

/** Get base deleveraging factor in basis points. */
export function baseDeleverageFactorBps(
  tx: Transaction,
  config: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::base_deleverage_factor_bps`,
    arguments: [obj(tx, config)],
  })
}

/** Get liquidation margin threshold in basis points. */
export function liqMarginBps(
  tx: Transaction,
  config: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::liq_margin_bps`,
    arguments: [obj(tx, config)],
  })
}

/** Get base liquidation factor in basis points. */
export function baseLiqFactorBps(
  tx: Transaction,
  config: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::base_liq_factor_bps`,
    arguments: [obj(tx, config)],
  })
}

/** Get liquidation bonus in basis points. */
export function liqBonusBps(
  tx: Transaction,
  config: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::liq_bonus_bps`,
    arguments: [obj(tx, config)],
  })
}

/** Get maximum allowed liquidity per position. */
export function maxPositionL(
  tx: Transaction,
  config: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::max_position_l`,
    arguments: [obj(tx, config)],
  })
}

/** Get maximum global liquidity limit. */
export function maxGlobalL(
  tx: Transaction,
  config: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::max_global_l`,
    arguments: [obj(tx, config)],
  })
}

/** Get current total global liquidity. */
export function currentGlobalL(
  tx: Transaction,
  config: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::current_global_l`,
    arguments: [obj(tx, config)],
  })
}

/** Get rebalancing fee in basis points. */
export function rebalanceFeeBps(
  tx: Transaction,
  config: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::rebalance_fee_bps`,
    arguments: [obj(tx, config)],
  })
}

/** Get liquidation fee in basis points. */
export function liqFeeBps(
  tx: Transaction,
  config: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::liq_fee_bps`,
    arguments: [obj(tx, config)],
  })
}

/** Get position creation fee in SUI tokens. */
export function positionCreationFeeSui(
  tx: Transaction,
  config: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::position_creation_fee_sui`,
    arguments: [obj(tx, config)],
  })
}

export interface IncreaseCurrentGlobalLArgs {
  config: TransactionObjectInput
  deltaL: bigint | TransactionArgument
}

export function increaseCurrentGlobalL(
  tx: Transaction,
  args: IncreaseCurrentGlobalLArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::increase_current_global_l`,
    arguments: [
      obj(tx, args.config),
      pure(tx, args.deltaL, `u128`),
    ],
  })
}

export interface DecreaseCurrentGlobalLArgs {
  config: TransactionObjectInput
  deltaL: bigint | TransactionArgument
}

export function decreaseCurrentGlobalL(
  tx: Transaction,
  args: DecreaseCurrentGlobalLArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::decrease_current_global_l`,
    arguments: [
      obj(tx, args.config),
      pure(tx, args.deltaL, `u128`),
    ],
  })
}

export interface SetAllowNewPositionsArgs {
  config: TransactionObjectInput
  value: boolean | TransactionArgument
}

/** Set whether new position creation is allowed. */
export function setAllowNewPositions(
  tx: Transaction,
  args: SetAllowNewPositionsArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::set_allow_new_positions`,
    arguments: [
      obj(tx, args.config),
      pure(tx, args.value, `bool`),
    ],
  })
}

export interface SetMinLiqStartPriceDeltaBpsArgs {
  config: TransactionObjectInput
  value: number | TransactionArgument
}

/** Set minimum liquidation start price delta in basis points. */
export function setMinLiqStartPriceDeltaBps(
  tx: Transaction,
  args: SetMinLiqStartPriceDeltaBpsArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::set_min_liq_start_price_delta_bps`,
    arguments: [
      obj(tx, args.config),
      pure(tx, args.value, `u16`),
    ],
  })
}

export interface SetMinInitMarginBpsArgs {
  config: TransactionObjectInput
  value: number | TransactionArgument
}

/** Set minimum initial margin requirement in basis points. */
export function setMinInitMarginBps(
  tx: Transaction,
  args: SetMinInitMarginBpsArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::set_min_init_margin_bps`,
    arguments: [
      obj(tx, args.config),
      pure(tx, args.value, `u16`),
    ],
  })
}

/** Add empty Pyth configuration to position config. */
export function configAddEmptyPythConfig(
  tx: Transaction,
  config: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::config_add_empty_pyth_config`,
    arguments: [obj(tx, config)],
  })
}

export interface SetPythConfigMaxAgeSecsArgs {
  config: TransactionObjectInput
  maxAgeSecs: bigint | TransactionArgument
}

/** Set maximum age for Pyth price feeds in seconds. */
export function setPythConfigMaxAgeSecs(
  tx: Transaction,
  args: SetPythConfigMaxAgeSecsArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::set_pyth_config_max_age_secs`,
    arguments: [
      obj(tx, args.config),
      pure(tx, args.maxAgeSecs, `u64`),
    ],
  })
}

export interface PythConfigAllowPioArgs {
  config: TransactionObjectInput
  coinType: TransactionObjectInput
  pioId: string | TransactionArgument
}

/** Allow a specific Pyth price info object for a coin type. */
export function pythConfigAllowPio(
  tx: Transaction,
  args: PythConfigAllowPioArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::pyth_config_allow_pio`,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.coinType),
      pure(tx, args.pioId, `${ID.$typeName}`),
    ],
  })
}

export interface PythConfigDisallowPioArgs {
  config: TransactionObjectInput
  coinType: TransactionObjectInput
}

/** Remove allowlist for a specific Pyth price info object. */
export function pythConfigDisallowPio(
  tx: Transaction,
  args: PythConfigDisallowPioArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::pyth_config_disallow_pio`,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.coinType),
    ],
  })
}

/** Add empty oracle price configuration to position config. */
export function configAddEmptyOraclePriceConfig(
  tx: Transaction,
  config: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::config_add_empty_oracle_price_config`,
    arguments: [obj(tx, config)],
  })
}

export interface SetOraclePriceConfigMaxAgeSecsArgs {
  config: TransactionObjectInput
  maxAgeSecs: bigint | TransactionArgument
}

/** Set maximum age for oracle price feeds in seconds. */
export function setOraclePriceConfigMaxAgeSecs(
  tx: Transaction,
  args: SetOraclePriceConfigMaxAgeSecsArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::set_oracle_price_config_max_age_secs`,
    arguments: [
      obj(tx, args.config),
      pure(tx, args.maxAgeSecs, `u64`),
    ],
  })
}

export interface OraclePriceConfigAllowPriceObjectArgs {
  config: TransactionObjectInput
  coinType: TransactionObjectInput
  priceObjectId: string | TransactionArgument
}

/** Allow a specific oracle price info object for a coin type. */
export function oraclePriceConfigAllowPriceObject(
  tx: Transaction,
  args: OraclePriceConfigAllowPriceObjectArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::oracle_price_config_allow_price_object`,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.coinType),
      pure(tx, args.priceObjectId, `${ID.$typeName}`),
    ],
  })
}

export interface OraclePriceConfigDisallowPriceObjectArgs {
  config: TransactionObjectInput
  coinType: TransactionObjectInput
}

/** Remove allowlist for a specific oracle price info object. */
export function oraclePriceConfigDisallowPriceObject(
  tx: Transaction,
  args: OraclePriceConfigDisallowPriceObjectArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::oracle_price_config_disallow_price_object`,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.coinType),
    ],
  })
}

export interface SetDeleverageMarginBpsArgs {
  config: TransactionObjectInput
  value: number | TransactionArgument
}

/** Set deleveraging margin threshold in basis points. */
export function setDeleverageMarginBps(
  tx: Transaction,
  args: SetDeleverageMarginBpsArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::set_deleverage_margin_bps`,
    arguments: [
      obj(tx, args.config),
      pure(tx, args.value, `u16`),
    ],
  })
}

export interface SetBaseDeleverageFactorBpsArgs {
  config: TransactionObjectInput
  value: number | TransactionArgument
}

/** Set base deleveraging factor in basis points. */
export function setBaseDeleverageFactorBps(
  tx: Transaction,
  args: SetBaseDeleverageFactorBpsArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::set_base_deleverage_factor_bps`,
    arguments: [
      obj(tx, args.config),
      pure(tx, args.value, `u16`),
    ],
  })
}

export interface SetLiqMarginBpsArgs {
  config: TransactionObjectInput
  value: number | TransactionArgument
}

/** Set liquidation margin threshold in basis points. */
export function setLiqMarginBps(
  tx: Transaction,
  args: SetLiqMarginBpsArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::set_liq_margin_bps`,
    arguments: [
      obj(tx, args.config),
      pure(tx, args.value, `u16`),
    ],
  })
}

export interface SetBaseLiqFactorBpsArgs {
  config: TransactionObjectInput
  value: number | TransactionArgument
}

/** Set base liquidation factor in basis points. */
export function setBaseLiqFactorBps(
  tx: Transaction,
  args: SetBaseLiqFactorBpsArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::set_base_liq_factor_bps`,
    arguments: [
      obj(tx, args.config),
      pure(tx, args.value, `u16`),
    ],
  })
}

export interface SetLiqBonusBpsArgs {
  config: TransactionObjectInput
  value: number | TransactionArgument
}

/** Set liquidation bonus in basis points. */
export function setLiqBonusBps(
  tx: Transaction,
  args: SetLiqBonusBpsArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::set_liq_bonus_bps`,
    arguments: [
      obj(tx, args.config),
      pure(tx, args.value, `u16`),
    ],
  })
}

export interface SetMaxPositionLArgs {
  config: TransactionObjectInput
  value: bigint | TransactionArgument
}

/** Set maximum liquidity allowed per position. */
export function setMaxPositionL(
  tx: Transaction,
  args: SetMaxPositionLArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::set_max_position_l`,
    arguments: [
      obj(tx, args.config),
      pure(tx, args.value, `u128`),
    ],
  })
}

export interface SetMaxGlobalLArgs {
  config: TransactionObjectInput
  value: bigint | TransactionArgument
}

/** Set maximum global liquidity limit across all positions. */
export function setMaxGlobalL(
  tx: Transaction,
  args: SetMaxGlobalLArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::set_max_global_l`,
    arguments: [
      obj(tx, args.config),
      pure(tx, args.value, `u128`),
    ],
  })
}

export interface SetRebalanceFeeBpsArgs {
  config: TransactionObjectInput
  value: number | TransactionArgument
}

/** Set rebalancing fee in basis points. */
export function setRebalanceFeeBps(
  tx: Transaction,
  args: SetRebalanceFeeBpsArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::set_rebalance_fee_bps`,
    arguments: [
      obj(tx, args.config),
      pure(tx, args.value, `u16`),
    ],
  })
}

export interface SetLiqFeeBpsArgs {
  config: TransactionObjectInput
  value: number | TransactionArgument
}

/** Set liquidation fee in basis points. */
export function setLiqFeeBps(
  tx: Transaction,
  args: SetLiqFeeBpsArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::set_liq_fee_bps`,
    arguments: [
      obj(tx, args.config),
      pure(tx, args.value, `u16`),
    ],
  })
}

export interface SetPositionCreationFeeSuiArgs {
  config: TransactionObjectInput
  value: bigint | TransactionArgument
}

/** Set position creation fee in SUI tokens. */
export function setPositionCreationFeeSui(
  tx: Transaction,
  args: SetPositionCreationFeeSuiArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::set_position_creation_fee_sui`,
    arguments: [
      obj(tx, args.config),
      pure(tx, args.value, `u64`),
    ],
  })
}

export interface UpsertConfigExtensionArgs {
  config: TransactionObjectInput
  key: GenericArg
  newValue: GenericArg
}

export function upsertConfigExtension(
  tx: Transaction,
  typeArgs: [string, string],
  args: UpsertConfigExtensionArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::upsert_config_extension`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      generic(tx, `${typeArgs[0]}`, args.key),
      generic(tx, `${typeArgs[1]}`, args.newValue),
    ],
  })
}

export interface AddConfigExtensionArgs {
  config: TransactionObjectInput
  key: GenericArg
  newValue: GenericArg
}

export function addConfigExtension(
  tx: Transaction,
  typeArgs: [string, string],
  args: AddConfigExtensionArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::add_config_extension`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      generic(tx, `${typeArgs[0]}`, args.key),
      generic(tx, `${typeArgs[1]}`, args.newValue),
    ],
  })
}

export interface HasConfigExtensionArgs {
  config: TransactionObjectInput
  key: GenericArg
}

export function hasConfigExtension(
  tx: Transaction,
  typeArg: string,
  args: HasConfigExtensionArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::has_config_extension`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.config),
      generic(tx, `${typeArg}`, args.key),
    ],
  })
}

export interface BorrowConfigExtensionArgs {
  config: TransactionObjectInput
  key: GenericArg
}

export function borrowConfigExtension(
  tx: Transaction,
  typeArgs: [string, string],
  args: BorrowConfigExtensionArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::borrow_config_extension`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      generic(tx, `${typeArgs[0]}`, args.key),
    ],
  })
}

export interface GetConfigExtensionOrDefaultArgs {
  config: TransactionObjectInput
  key: GenericArg
  defaultValue: GenericArg
}

export function getConfigExtensionOrDefault(
  tx: Transaction,
  typeArgs: [string, string],
  args: GetConfigExtensionOrDefaultArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::get_config_extension_or_default`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      generic(tx, `${typeArgs[0]}`, args.key),
      generic(tx, `${typeArgs[1]}`, args.defaultValue),
    ],
  })
}

export interface ConfigExtensionMutArgs {
  config: TransactionObjectInput
  key: GenericArg
}

export function configExtensionMut(
  tx: Transaction,
  typeArgs: [string, string],
  args: ConfigExtensionMutArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::config_extension_mut`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      generic(tx, `${typeArgs[0]}`, args.key),
    ],
  })
}

export interface SetLiquidationDisabledArgs {
  config: TransactionObjectInput
  disabled: boolean | TransactionArgument
}

/** Enable or disable liquidation operations. */
export function setLiquidationDisabled(
  tx: Transaction,
  args: SetLiquidationDisabledArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::set_liquidation_disabled`,
    arguments: [
      obj(tx, args.config),
      pure(tx, args.disabled, `bool`),
    ],
  })
}

/** Check if liquidation operations are disabled. */
export function liquidationDisabled(
  tx: Transaction,
  config: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::liquidation_disabled`,
    arguments: [obj(tx, config)],
  })
}

export interface SetReductionDisabledArgs {
  config: TransactionObjectInput
  disabled: boolean | TransactionArgument
}

/** Enable or disable position reduction (withdrawal) operations. */
export function setReductionDisabled(
  tx: Transaction,
  args: SetReductionDisabledArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::set_reduction_disabled`,
    arguments: [
      obj(tx, args.config),
      pure(tx, args.disabled, `bool`),
    ],
  })
}

/** Check if position reduction operations are disabled. */
export function reductionDisabled(
  tx: Transaction,
  config: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::reduction_disabled`,
    arguments: [obj(tx, config)],
  })
}

export interface SetAddLiquidityDisabledArgs {
  config: TransactionObjectInput
  disabled: boolean | TransactionArgument
}

/** Enable or disable adding liquidity to positions. */
export function setAddLiquidityDisabled(
  tx: Transaction,
  args: SetAddLiquidityDisabledArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::set_add_liquidity_disabled`,
    arguments: [
      obj(tx, args.config),
      pure(tx, args.disabled, `bool`),
    ],
  })
}

/** Check if adding liquidity to positions is disabled. */
export function addLiquidityDisabled(
  tx: Transaction,
  config: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::add_liquidity_disabled`,
    arguments: [obj(tx, config)],
  })
}

export interface SetOwnerCollectFeeDisabledArgs {
  config: TransactionObjectInput
  disabled: boolean | TransactionArgument
}

/** Enable or disable owner fee collection. */
export function setOwnerCollectFeeDisabled(
  tx: Transaction,
  args: SetOwnerCollectFeeDisabledArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::set_owner_collect_fee_disabled`,
    arguments: [
      obj(tx, args.config),
      pure(tx, args.disabled, `bool`),
    ],
  })
}

/** Check if owner fee collection is disabled. */
export function ownerCollectFeeDisabled(
  tx: Transaction,
  config: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::owner_collect_fee_disabled`,
    arguments: [obj(tx, config)],
  })
}

export interface SetOwnerCollectRewardDisabledArgs {
  config: TransactionObjectInput
  disabled: boolean | TransactionArgument
}

/** Enable or disable owner reward collection. */
export function setOwnerCollectRewardDisabled(
  tx: Transaction,
  args: SetOwnerCollectRewardDisabledArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::set_owner_collect_reward_disabled`,
    arguments: [
      obj(tx, args.config),
      pure(tx, args.disabled, `bool`),
    ],
  })
}

/** Check if owner reward collection is disabled. */
export function ownerCollectRewardDisabled(
  tx: Transaction,
  config: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::owner_collect_reward_disabled`,
    arguments: [obj(tx, config)],
  })
}

export interface SetDeletePositionDisabledArgs {
  config: TransactionObjectInput
  disabled: boolean | TransactionArgument
}

/** Enable or disable position deletion. */
export function setDeletePositionDisabled(
  tx: Transaction,
  args: SetDeletePositionDisabledArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::set_delete_position_disabled`,
    arguments: [
      obj(tx, args.config),
      pure(tx, args.disabled, `bool`),
    ],
  })
}

/** Check if position deletion is disabled. */
export function deletePositionDisabled(
  tx: Transaction,
  config: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::delete_position_disabled`,
    arguments: [obj(tx, config)],
  })
}

export interface AddCreateWithdrawLimiterArgs {
  config: TransactionObjectInput
  rateLimiter: GenericArg
}

/** Add rate limiter for position creation and withdrawal operations. */
export function addCreateWithdrawLimiter(
  tx: Transaction,
  typeArg: string,
  args: AddCreateWithdrawLimiterArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::add_create_withdraw_limiter`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.config),
      generic(tx, `${typeArg}`, args.rateLimiter),
    ],
  })
}

export function hasCreateWithdrawLimiter(
  tx: Transaction,
  config: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::has_create_withdraw_limiter`,
    arguments: [obj(tx, config)],
  })
}

export function borrowCreateWithdrawLimiter(
  tx: Transaction,
  config: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::borrow_create_withdraw_limiter`,
    arguments: [obj(tx, config)],
  })
}

export function borrowCreateWithdrawLimiterMut(
  tx: Transaction,
  config: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::borrow_create_withdraw_limiter_mut`,
    arguments: [obj(tx, config)],
  })
}

export interface SetMaxCreateWithdrawNetInflowAndOutflowLimitsArgs {
  config: TransactionObjectInput
  maxNetInflowLimit: bigint | TransactionArgument | null
  maxNetOutflowLimit: bigint | TransactionArgument | null
}

/** Set maximum net inflow and outflow limits for rate limiter. */
export function setMaxCreateWithdrawNetInflowAndOutflowLimits(
  tx: Transaction,
  args: SetMaxCreateWithdrawNetInflowAndOutflowLimitsArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::set_max_create_withdraw_net_inflow_and_outflow_limits`,
    arguments: [
      obj(tx, args.config),
      pure(tx, args.maxNetInflowLimit, `${Option.$typeName}<u256>`),
      pure(tx, args.maxNetOutflowLimit, `${Option.$typeName}<u256>`),
    ],
  })
}

export interface DeleverageTicketConstructorArgs {
  positionId: string | TransactionArgument
  canRepayX: boolean | TransactionArgument
  canRepayY: boolean | TransactionArgument
  info: TransactionObjectInput
}

export function deleverageTicketConstructor(
  tx: Transaction,
  args: DeleverageTicketConstructorArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::deleverage_ticket_constructor`,
    arguments: [
      pure(tx, args.positionId, `${ID.$typeName}`),
      pure(tx, args.canRepayX, `bool`),
      pure(tx, args.canRepayY, `bool`),
      obj(tx, args.info),
    ],
  })
}

export function dtPositionId(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::dt_position_id`,
    arguments: [obj(tx, self)],
  })
}

export function dtCanRepayX(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::dt_can_repay_x`,
    arguments: [obj(tx, self)],
  })
}

export function dtCanRepayY(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::dt_can_repay_y`,
    arguments: [obj(tx, self)],
  })
}

export function dtInfo(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::dt_info`,
    arguments: [obj(tx, self)],
  })
}

export interface ReductionRepaymentTicketConstructorArgs {
  sx: TransactionObjectInput
  sy: TransactionObjectInput
  info: TransactionObjectInput
}

export function reductionRepaymentTicketConstructor(
  tx: Transaction,
  typeArgs: [string, string],
  args: ReductionRepaymentTicketConstructorArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::reduction_repayment_ticket_constructor`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.sx),
      obj(tx, args.sy),
      obj(tx, args.info),
    ],
  })
}

export function rrtSx(
  tx: Transaction,
  typeArgs: [string, string],
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::rrt_sx`,
    typeArguments: typeArgs,
    arguments: [obj(tx, self)],
  })
}

export function rrtSy(
  tx: Transaction,
  typeArgs: [string, string],
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::rrt_sy`,
    typeArguments: typeArgs,
    arguments: [obj(tx, self)],
  })
}

export function rrtInfo(
  tx: Transaction,
  typeArgs: [string, string],
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::rrt_info`,
    typeArguments: typeArgs,
    arguments: [obj(tx, self)],
  })
}

export function rrPositionId(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::rr_position_id`,
    arguments: [obj(tx, self)],
  })
}

export interface IncreaseCollectedAmmFeeXArgs {
  self: TransactionObjectInput
  delta: bigint | TransactionArgument
}

export function increaseCollectedAmmFeeX(
  tx: Transaction,
  args: IncreaseCollectedAmmFeeXArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::increase_collected_amm_fee_x`,
    arguments: [
      obj(tx, args.self),
      pure(tx, args.delta, `u64`),
    ],
  })
}

export interface IncreaseCollectedAmmFeeYArgs {
  self: TransactionObjectInput
  delta: bigint | TransactionArgument
}

export function increaseCollectedAmmFeeY(
  tx: Transaction,
  args: IncreaseCollectedAmmFeeYArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::increase_collected_amm_fee_y`,
    arguments: [
      obj(tx, args.self),
      pure(tx, args.delta, `u64`),
    ],
  })
}

export function collectedAmmRewardsMut(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::collected_amm_rewards_mut`,
    arguments: [obj(tx, self)],
  })
}

export interface IncreaseDeltaLArgs {
  self: TransactionObjectInput
  delta: bigint | TransactionArgument
}

export function increaseDeltaL(
  tx: Transaction,
  args: IncreaseDeltaLArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::increase_delta_l`,
    arguments: [
      obj(tx, args.self),
      pure(tx, args.delta, `u128`),
    ],
  })
}

export interface IncreaseDeltaXArgs {
  self: TransactionObjectInput
  delta: bigint | TransactionArgument
}

export function increaseDeltaX(
  tx: Transaction,
  args: IncreaseDeltaXArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::increase_delta_x`,
    arguments: [
      obj(tx, args.self),
      pure(tx, args.delta, `u64`),
    ],
  })
}

export interface IncreaseDeltaYArgs {
  self: TransactionObjectInput
  delta: bigint | TransactionArgument
}

export function increaseDeltaY(
  tx: Transaction,
  args: IncreaseDeltaYArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::increase_delta_y`,
    arguments: [
      obj(tx, args.self),
      pure(tx, args.delta, `u64`),
    ],
  })
}

export function rrCollectedAmmFeeX(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::rr_collected_amm_fee_x`,
    arguments: [obj(tx, self)],
  })
}

export function rrCollectedAmmFeeY(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::rr_collected_amm_fee_y`,
    arguments: [obj(tx, self)],
  })
}

export function rrCollectedAmmRewards(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::rr_collected_amm_rewards`,
    arguments: [obj(tx, self)],
  })
}

export function rrFeesTaken(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::rr_fees_taken`,
    arguments: [obj(tx, self)],
  })
}

export function rrTakenCx(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::rr_taken_cx`,
    arguments: [obj(tx, self)],
  })
}

export function rrTakenCy(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::rr_taken_cy`,
    arguments: [obj(tx, self)],
  })
}

export function rrDeltaL(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::rr_delta_l`,
    arguments: [obj(tx, self)],
  })
}

export function rrDeltaX(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::rr_delta_x`,
    arguments: [obj(tx, self)],
  })
}

export function rrDeltaY(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::rr_delta_y`,
    arguments: [obj(tx, self)],
  })
}

export function rrXRepaid(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::rr_x_repaid`,
    arguments: [obj(tx, self)],
  })
}

export function rrYRepaid(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::rr_y_repaid`,
    arguments: [obj(tx, self)],
  })
}

export function rrAddedCx(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::rr_added_cx`,
    arguments: [obj(tx, self)],
  })
}

export function rrAddedCy(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::rr_added_cy`,
    arguments: [obj(tx, self)],
  })
}

export function rrStashedAmmRewards(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::rr_stashed_amm_rewards`,
    arguments: [obj(tx, self)],
  })
}

export interface NewCreatePositionTicketArgs {
  configId: string | TransactionArgument
  tickA: GenericArg
  tickB: GenericArg
  dx: bigint | TransactionArgument
  dy: bigint | TransactionArgument
  deltaL: bigint | TransactionArgument
  principalX: TransactionObjectInput
  principalY: TransactionObjectInput
  borrowedX: TransactionObjectInput
  borrowedY: TransactionObjectInput
  debtBag: TransactionObjectInput
}

export function newCreatePositionTicket(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: NewCreatePositionTicketArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::new_create_position_ticket`,
    typeArguments: typeArgs,
    arguments: [
      pure(tx, args.configId, `${ID.$typeName}`),
      generic(tx, `${typeArgs[2]}`, args.tickA),
      generic(tx, `${typeArgs[2]}`, args.tickB),
      pure(tx, args.dx, `u64`),
      pure(tx, args.dy, `u64`),
      pure(tx, args.deltaL, `u128`),
      obj(tx, args.principalX),
      obj(tx, args.principalY),
      obj(tx, args.borrowedX),
      obj(tx, args.borrowedY),
      obj(tx, args.debtBag),
    ],
  })
}

export function destroyCreatePositionTicket(
  tx: Transaction,
  typeArgs: [string, string, string],
  ticket: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::destroy_create_position_ticket`,
    typeArguments: typeArgs,
    arguments: [obj(tx, ticket)],
  })
}

export function cptConfigId(
  tx: Transaction,
  typeArgs: [string, string, string],
  ticket: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::cpt_config_id`,
    typeArguments: typeArgs,
    arguments: [obj(tx, ticket)],
  })
}

export function dx(
  tx: Transaction,
  typeArgs: [string, string, string],
  ticket: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::dx`,
    typeArguments: typeArgs,
    arguments: [obj(tx, ticket)],
  })
}

export function dy(
  tx: Transaction,
  typeArgs: [string, string, string],
  ticket: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::dy`,
    typeArguments: typeArgs,
    arguments: [obj(tx, ticket)],
  })
}

export function borrowedX(
  tx: Transaction,
  typeArgs: [string, string, string],
  ticket: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::borrowed_x`,
    typeArguments: typeArgs,
    arguments: [obj(tx, ticket)],
  })
}

export function borrowedXMut(
  tx: Transaction,
  typeArgs: [string, string, string],
  ticket: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::borrowed_x_mut`,
    typeArguments: typeArgs,
    arguments: [obj(tx, ticket)],
  })
}

export function borrowedY(
  tx: Transaction,
  typeArgs: [string, string, string],
  ticket: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::borrowed_y`,
    typeArguments: typeArgs,
    arguments: [obj(tx, ticket)],
  })
}

export function borrowedYMut(
  tx: Transaction,
  typeArgs: [string, string, string],
  ticket: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::borrowed_y_mut`,
    typeArguments: typeArgs,
    arguments: [obj(tx, ticket)],
  })
}

export function deltaL(
  tx: Transaction,
  typeArgs: [string, string, string],
  ticket: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::delta_l`,
    typeArguments: typeArgs,
    arguments: [obj(tx, ticket)],
  })
}

export function principalX(
  tx: Transaction,
  typeArgs: [string, string, string],
  ticket: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::principal_x`,
    typeArguments: typeArgs,
    arguments: [obj(tx, ticket)],
  })
}

export function principalY(
  tx: Transaction,
  typeArgs: [string, string, string],
  ticket: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::principal_y`,
    typeArguments: typeArgs,
    arguments: [obj(tx, ticket)],
  })
}

export function cptDebtBag(
  tx: Transaction,
  typeArgs: [string, string, string],
  ticket: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::cpt_debt_bag`,
    typeArguments: typeArgs,
    arguments: [obj(tx, ticket)],
  })
}

export function cptDebtBagMut(
  tx: Transaction,
  typeArgs: [string, string, string],
  ticket: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::cpt_debt_bag_mut`,
    typeArguments: typeArgs,
    arguments: [obj(tx, ticket)],
  })
}

export function cptTickA(
  tx: Transaction,
  typeArgs: [string, string, string],
  ticket: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::cpt_tick_a`,
    typeArguments: typeArgs,
    arguments: [obj(tx, ticket)],
  })
}

export function cptTickB(
  tx: Transaction,
  typeArgs: [string, string, string],
  ticket: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::cpt_tick_b`,
    typeArguments: typeArgs,
    arguments: [obj(tx, ticket)],
  })
}

export interface ShareDeletedPositionCollectedFeesArgs {
  positionId: string | TransactionArgument
  balanceBag: TransactionObjectInput
}

export function shareDeletedPositionCollectedFees(
  tx: Transaction,
  args: ShareDeletedPositionCollectedFeesArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::share_deleted_position_collected_fees`,
    arguments: [
      pure(tx, args.positionId, `${ID.$typeName}`),
      obj(tx, args.balanceBag),
    ],
  })
}

export interface EmitPositionCreationInfoArgs {
  positionId: string | TransactionArgument
  configId: string | TransactionArgument
  sqrtPaX64: bigint | TransactionArgument
  sqrtPbX64: bigint | TransactionArgument
  l: bigint | TransactionArgument
  x0: bigint | TransactionArgument
  y0: bigint | TransactionArgument
  cx: bigint | TransactionArgument
  cy: bigint | TransactionArgument
  dx: bigint | TransactionArgument
  dy: bigint | TransactionArgument
  creationFeeAmtSui: bigint | TransactionArgument
}

export function emitPositionCreationInfo(
  tx: Transaction,
  args: EmitPositionCreationInfoArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::emit_position_creation_info`,
    arguments: [
      pure(tx, args.positionId, `${ID.$typeName}`),
      pure(tx, args.configId, `${ID.$typeName}`),
      pure(tx, args.sqrtPaX64, `u128`),
      pure(tx, args.sqrtPbX64, `u128`),
      pure(tx, args.l, `u128`),
      pure(tx, args.x0, `u64`),
      pure(tx, args.y0, `u64`),
      pure(tx, args.cx, `u64`),
      pure(tx, args.cy, `u64`),
      pure(tx, args.dx, `u64`),
      pure(tx, args.dy, `u64`),
      pure(tx, args.creationFeeAmtSui, `u64`),
    ],
  })
}

export interface DeleverageInfoConstructorArgs {
  positionId: string | TransactionArgument
  model: TransactionObjectInput
  oraclePriceX128: bigint | TransactionArgument
  sqrtPoolPriceX64: bigint | TransactionArgument
  deltaL: bigint | TransactionArgument
  deltaX: bigint | TransactionArgument
  deltaY: bigint | TransactionArgument
  xRepaid: bigint | TransactionArgument
  yRepaid: bigint | TransactionArgument
}

export function deleverageInfoConstructor(
  tx: Transaction,
  args: DeleverageInfoConstructorArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::deleverage_info_constructor`,
    arguments: [
      pure(tx, args.positionId, `${ID.$typeName}`),
      obj(tx, args.model),
      pure(tx, args.oraclePriceX128, `u256`),
      pure(tx, args.sqrtPoolPriceX64, `u128`),
      pure(tx, args.deltaL, `u128`),
      pure(tx, args.deltaX, `u64`),
      pure(tx, args.deltaY, `u64`),
      pure(tx, args.xRepaid, `u64`),
      pure(tx, args.yRepaid, `u64`),
    ],
  })
}

export interface SetDeltaLArgs {
  info: TransactionObjectInput
  deltaL: bigint | TransactionArgument
}

export function setDeltaL(
  tx: Transaction,
  args: SetDeltaLArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::set_delta_l`,
    arguments: [
      obj(tx, args.info),
      pure(tx, args.deltaL, `u128`),
    ],
  })
}

export interface SetDeltaXArgs {
  info: TransactionObjectInput
  deltaX: bigint | TransactionArgument
}

export function setDeltaX(
  tx: Transaction,
  args: SetDeltaXArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::set_delta_x`,
    arguments: [
      obj(tx, args.info),
      pure(tx, args.deltaX, `u64`),
    ],
  })
}

export interface SetDeltaYArgs {
  info: TransactionObjectInput
  deltaY: bigint | TransactionArgument
}

export function setDeltaY(
  tx: Transaction,
  args: SetDeltaYArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::set_delta_y`,
    arguments: [
      obj(tx, args.info),
      pure(tx, args.deltaY, `u64`),
    ],
  })
}

export function diPositionId(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::di_position_id`,
    arguments: [obj(tx, self)],
  })
}

export function diModel(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::di_model`,
    arguments: [obj(tx, self)],
  })
}

export function diOraclePriceX128(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::di_oracle_price_x128`,
    arguments: [obj(tx, self)],
  })
}

export function diSqrtPoolPriceX64(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::di_sqrt_pool_price_x64`,
    arguments: [obj(tx, self)],
  })
}

export function diDeltaL(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::di_delta_l`,
    arguments: [obj(tx, self)],
  })
}

export function diDeltaX(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::di_delta_x`,
    arguments: [obj(tx, self)],
  })
}

export function diDeltaY(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::di_delta_y`,
    arguments: [obj(tx, self)],
  })
}

export function diXRepaid(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::di_x_repaid`,
    arguments: [obj(tx, self)],
  })
}

export function diYRepaid(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::di_y_repaid`,
    arguments: [obj(tx, self)],
  })
}

export interface EmitLiquidationInfoArgs {
  positionId: string | TransactionArgument
  model: TransactionObjectInput
  oraclePriceX128: bigint | TransactionArgument
  xRepaid: bigint | TransactionArgument
  yRepaid: bigint | TransactionArgument
  liquidatorRewardX: bigint | TransactionArgument
  liquidatorRewardY: bigint | TransactionArgument
  liquidationFeeX: bigint | TransactionArgument
  liquidationFeeY: bigint | TransactionArgument
}

export function emitLiquidationInfo(
  tx: Transaction,
  args: EmitLiquidationInfoArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::emit_liquidation_info`,
    arguments: [
      pure(tx, args.positionId, `${ID.$typeName}`),
      obj(tx, args.model),
      pure(tx, args.oraclePriceX128, `u256`),
      pure(tx, args.xRepaid, `u64`),
      pure(tx, args.yRepaid, `u64`),
      pure(tx, args.liquidatorRewardX, `u64`),
      pure(tx, args.liquidatorRewardY, `u64`),
      pure(tx, args.liquidationFeeX, `u64`),
      pure(tx, args.liquidationFeeY, `u64`),
    ],
  })
}

export interface ReductionInfoConstructorArgs {
  positionId: string | TransactionArgument
  model: TransactionObjectInput
  oraclePriceX128: bigint | TransactionArgument
  sqrtPoolPriceX64: bigint | TransactionArgument
  deltaL: bigint | TransactionArgument
  deltaX: bigint | TransactionArgument
  deltaY: bigint | TransactionArgument
  withdrawnX: bigint | TransactionArgument
  withdrawnY: bigint | TransactionArgument
  xRepaid: bigint | TransactionArgument
  yRepaid: bigint | TransactionArgument
}

export function reductionInfoConstructor(
  tx: Transaction,
  args: ReductionInfoConstructorArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::reduction_info_constructor`,
    arguments: [
      pure(tx, args.positionId, `${ID.$typeName}`),
      obj(tx, args.model),
      pure(tx, args.oraclePriceX128, `u256`),
      pure(tx, args.sqrtPoolPriceX64, `u128`),
      pure(tx, args.deltaL, `u128`),
      pure(tx, args.deltaX, `u64`),
      pure(tx, args.deltaY, `u64`),
      pure(tx, args.withdrawnX, `u64`),
      pure(tx, args.withdrawnY, `u64`),
      pure(tx, args.xRepaid, `u64`),
      pure(tx, args.yRepaid, `u64`),
    ],
  })
}

export function riPositionId(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::ri_position_id`,
    arguments: [obj(tx, self)],
  })
}

export function riModel(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::ri_model`,
    arguments: [obj(tx, self)],
  })
}

export function riOraclePriceX128(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::ri_oracle_price_x128`,
    arguments: [obj(tx, self)],
  })
}

export function riSqrtPoolPriceX64(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::ri_sqrt_pool_price_x64`,
    arguments: [obj(tx, self)],
  })
}

export function riDeltaL(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::ri_delta_l`,
    arguments: [obj(tx, self)],
  })
}

export function riDeltaX(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::ri_delta_x`,
    arguments: [obj(tx, self)],
  })
}

export function riDeltaY(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::ri_delta_y`,
    arguments: [obj(tx, self)],
  })
}

export function riWithdrawnX(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::ri_withdrawn_x`,
    arguments: [obj(tx, self)],
  })
}

export function riWithdrawnY(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::ri_withdrawn_y`,
    arguments: [obj(tx, self)],
  })
}

export function riXRepaid(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::ri_x_repaid`,
    arguments: [obj(tx, self)],
  })
}

export function riYRepaid(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::ri_y_repaid`,
    arguments: [obj(tx, self)],
  })
}

export interface AddLiquidityInfoConstructorArgs {
  positionId: string | TransactionArgument
  sqrtPoolPriceX64: bigint | TransactionArgument
  deltaL: bigint | TransactionArgument
  deltaX: bigint | TransactionArgument
  deltaY: bigint | TransactionArgument
}

export function addLiquidityInfoConstructor(
  tx: Transaction,
  args: AddLiquidityInfoConstructorArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::add_liquidity_info_constructor`,
    arguments: [
      pure(tx, args.positionId, `${ID.$typeName}`),
      pure(tx, args.sqrtPoolPriceX64, `u128`),
      pure(tx, args.deltaL, `u128`),
      pure(tx, args.deltaX, `u64`),
      pure(tx, args.deltaY, `u64`),
    ],
  })
}

export function aliEmit(
  tx: Transaction,
  info: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::ali_emit`,
    arguments: [obj(tx, info)],
  })
}

export function aliDeltaL(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::ali_delta_l`,
    arguments: [obj(tx, self)],
  })
}

export function aliDeltaX(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::ali_delta_x`,
    arguments: [obj(tx, self)],
  })
}

export function aliDeltaY(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::ali_delta_y`,
    arguments: [obj(tx, self)],
  })
}

export interface EmitOwnerCollectFeeInfoArgs {
  positionId: string | TransactionArgument
  collectedXAmt: bigint | TransactionArgument
  collectedYAmt: bigint | TransactionArgument
  feeAmtX: bigint | TransactionArgument
  feeAmtY: bigint | TransactionArgument
}

export function emitOwnerCollectFeeInfo(
  tx: Transaction,
  args: EmitOwnerCollectFeeInfoArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::emit_owner_collect_fee_info`,
    arguments: [
      pure(tx, args.positionId, `${ID.$typeName}`),
      pure(tx, args.collectedXAmt, `u64`),
      pure(tx, args.collectedYAmt, `u64`),
      pure(tx, args.feeAmtX, `u64`),
      pure(tx, args.feeAmtY, `u64`),
    ],
  })
}

export interface EmitOwnerCollectRewardInfoArgs {
  positionId: string | TransactionArgument
  collectedRewardAmt: bigint | TransactionArgument
  feeAmt: bigint | TransactionArgument
}

export function emitOwnerCollectRewardInfo(
  tx: Transaction,
  typeArg: string,
  args: EmitOwnerCollectRewardInfoArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::emit_owner_collect_reward_info`,
    typeArguments: [typeArg],
    arguments: [
      pure(tx, args.positionId, `${ID.$typeName}`),
      pure(tx, args.collectedRewardAmt, `u64`),
      pure(tx, args.feeAmt, `u64`),
    ],
  })
}

export interface EmitDeletePositionInfoArgs {
  positionId: string | TransactionArgument
  capId: string | TransactionArgument
}

export function emitDeletePositionInfo(
  tx: Transaction,
  args: EmitDeletePositionInfoArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::emit_delete_position_info`,
    arguments: [
      pure(tx, args.positionId, `${ID.$typeName}`),
      pure(tx, args.capId, `${ID.$typeName}`),
    ],
  })
}

export interface EmitBadDebtRepaidArgs {
  positionId: string | TransactionArgument
  sharesRepaid: bigint | TransactionArgument
  balanceRepaid: bigint | TransactionArgument
}

export function emitBadDebtRepaid(
  tx: Transaction,
  typeArg: string,
  args: EmitBadDebtRepaidArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::emit_bad_debt_repaid`,
    typeArguments: [typeArg],
    arguments: [
      pure(tx, args.positionId, `${ID.$typeName}`),
      pure(tx, args.sharesRepaid, `u128`),
      pure(tx, args.balanceRepaid, `u64`),
    ],
  })
}

export function checkConfigVersion(
  tx: Transaction,
  config: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::check_config_version`,
    arguments: [obj(tx, config)],
  })
}

export function checkPositionVersion(
  tx: Transaction,
  typeArgs: [string, string, string],
  position: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::check_position_version`,
    typeArguments: typeArgs,
    arguments: [obj(tx, position)],
  })
}

export interface CheckVersionsArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
}

export function checkVersions(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: CheckVersionsArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::check_versions`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
    ],
  })
}

/** Migrate position configuration to current module version. */
export function migrateConfig(
  tx: Transaction,
  config: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::migrate_config`,
    arguments: [obj(tx, config)],
  })
}

/** Migrate position to current module version. */
export function migratePosition(
  tx: Transaction,
  typeArgs: [string, string, string],
  position: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::migrate_position`,
    typeArguments: typeArgs,
    arguments: [obj(tx, position)],
  })
}

export interface ValidatePriceInfoArgs {
  config: TransactionObjectInput
  priceInfo: TransactionObjectInput
}

export function validatePriceInfo(
  tx: Transaction,
  args: ValidatePriceInfoArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::validate_price_info`,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.priceInfo),
    ],
  })
}

export interface ValidateDebtInfoArgs {
  config: TransactionObjectInput
  debtInfo: TransactionObjectInput
}

export function validateDebtInfo(
  tx: Transaction,
  args: ValidateDebtInfoArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::validate_debt_info`,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.debtInfo),
    ],
  })
}

export interface CalcBorrowAmtArgs {
  principal: bigint | TransactionArgument
  needForPosition: bigint | TransactionArgument
}

export function calcBorrowAmt(
  tx: Transaction,
  args: CalcBorrowAmtArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::calc_borrow_amt`,
    arguments: [
      pure(tx, args.principal, `u64`),
      pure(tx, args.needForPosition, `u64`),
    ],
  })
}

export interface PriceDeviationIsAcceptableArgs {
  config: TransactionObjectInput
  p0OracleEmaX128: bigint | TransactionArgument
  p0X128: bigint | TransactionArgument
}

export function priceDeviationIsAcceptable(
  tx: Transaction,
  args: PriceDeviationIsAcceptableArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::price_deviation_is_acceptable`,
    arguments: [
      obj(tx, args.config),
      pure(tx, args.p0OracleEmaX128, `u256`),
      pure(tx, args.p0X128, `u256`),
    ],
  })
}

export interface LiqMarginIsValidArgs {
  config: TransactionObjectInput
  model: TransactionObjectInput
  p0MinX128: bigint | TransactionArgument
  p0MaxX128: bigint | TransactionArgument
}

export function liqMarginIsValid(
  tx: Transaction,
  args: LiqMarginIsValidArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::liq_margin_is_valid`,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.model),
      pure(tx, args.p0MinX128, `u256`),
      pure(tx, args.p0MaxX128, `u256`),
    ],
  })
}

export interface InitMarginIsValidArgs {
  config: TransactionObjectInput
  model: TransactionObjectInput
  p0MinX128: bigint | TransactionArgument
  p0MaxX128: bigint | TransactionArgument
}

export function initMarginIsValid(
  tx: Transaction,
  args: InitMarginIsValidArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::init_margin_is_valid`,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.model),
      pure(tx, args.p0MinX128, `u256`),
      pure(tx, args.p0MaxX128, `u256`),
    ],
  })
}

export interface PositionModelFromLpShapeArgs {
  position: TransactionObjectInput
  debtInfo: TransactionObjectInput
  shape: TransactionObjectInput
}

/**
 * Build a `PositionModel` snapshot from position state given the LP
 * position's shape (see [lp_shape]).
 */
export function positionModelFromLpShape(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: PositionModelFromLpShapeArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::position_model_from_lp_shape`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.debtInfo),
      obj(tx, args.shape),
    ],
  })
}

export interface GetAmountEmaUsdValue6DecimalsArgs {
  amount: bigint | TransactionArgument
  priceInfo: TransactionObjectInput
  roundUp: boolean | TransactionArgument
}

export function getAmountEmaUsdValue6Decimals(
  tx: Transaction,
  typeArg: string,
  args: GetAmountEmaUsdValue6DecimalsArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::get_amount_ema_usd_value_6_decimals`,
    typeArguments: [typeArg],
    arguments: [
      pure(tx, args.amount, `u64`),
      obj(tx, args.priceInfo),
      pure(tx, args.roundUp, `bool`),
    ],
  })
}

export interface GetBalanceEmaUsdValue6DecimalsArgs {
  balance: TransactionObjectInput
  priceInfo: TransactionObjectInput
  roundUp: boolean | TransactionArgument
}

export function getBalanceEmaUsdValue6Decimals(
  tx: Transaction,
  typeArg: string,
  args: GetBalanceEmaUsdValue6DecimalsArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::get_balance_ema_usd_value_6_decimals`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.balance),
      obj(tx, args.priceInfo),
      pure(tx, args.roundUp, `bool`),
    ],
  })
}

export interface DeleverageTicketRepayXArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  ticket: TransactionObjectInput
  supplyPool: TransactionObjectInput
  clock: TransactionObjectInput
}

/** Repay X debt for deleveraging. */
export function deleverageTicketRepayX(
  tx: Transaction,
  typeArgs: [string, string, string, string],
  args: DeleverageTicketRepayXArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::deleverage_ticket_repay_x`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.ticket),
      obj(tx, args.supplyPool),
      obj(tx, args.clock),
    ],
  })
}

export interface DeleverageTicketRepayYArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  ticket: TransactionObjectInput
  supplyPool: TransactionObjectInput
  clock: TransactionObjectInput
}

/** Repay Y debt for deleveraging. */
export function deleverageTicketRepayY(
  tx: Transaction,
  typeArgs: [string, string, string, string],
  args: DeleverageTicketRepayYArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::deleverage_ticket_repay_y`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.ticket),
      obj(tx, args.supplyPool),
      obj(tx, args.clock),
    ],
  })
}

export interface DestroyDeleverageTicketArgs {
  position: TransactionObjectInput
  ticket: TransactionObjectInput
}

/**
 * Destroys a `DeleverageTicket` after all possible debt repayments have been performed,
 * emits a `DeleverageInfo` event if any deleveraging occurred. This function asserts that
 * the ticket is fully exhausted (i.e., both X and Y repayments are complete).
 *
 * If no deleveraging was performed (i.e., no liquidity removed and no debt repaid),
 * no event is emitted.
 */
export function destroyDeleverageTicket(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: DestroyDeleverageTicketArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::destroy_deleverage_ticket`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.ticket),
    ],
  })
}

export interface CalcLiqFeeFromRewardArgs {
  config: TransactionObjectInput
  rewardAmt: bigint | TransactionArgument
}

export function calcLiqFeeFromReward(
  tx: Transaction,
  args: CalcLiqFeeFromRewardArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::calc_liq_fee_from_reward`,
    arguments: [
      obj(tx, args.config),
      pure(tx, args.rewardAmt, `u64`),
    ],
  })
}

export interface LiquidateColXArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  priceInfo: TransactionObjectInput
  debtInfo: TransactionObjectInput
  repayment: TransactionObjectInput
  supplyPool: TransactionObjectInput
  shape: TransactionObjectInput
  clock: TransactionObjectInput
}

/**
 * Liquidate X collateral by repaying Y debt.
 *
 * This function performs partial liquidation of a position's X collateral
 * in exchange for repaying Y debt. Liquidators receive X tokens as reward
 * for helping restore position health by reducing debt obligations.
 *
 * The LP position's shape is passed in by the wrapper via [lp_shape].
 */
export function liquidateColX(
  tx: Transaction,
  typeArgs: [string, string, string, string],
  args: LiquidateColXArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::liquidate_col_x`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.priceInfo),
      obj(tx, args.debtInfo),
      obj(tx, args.repayment),
      obj(tx, args.supplyPool),
      obj(tx, args.shape),
      obj(tx, args.clock),
    ],
  })
}

export interface LiquidateColYArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  priceInfo: TransactionObjectInput
  debtInfo: TransactionObjectInput
  repayment: TransactionObjectInput
  supplyPool: TransactionObjectInput
  shape: TransactionObjectInput
  clock: TransactionObjectInput
}

/**
 * Liquidate Y collateral by repaying X debt.
 *
 * This function performs partial liquidation of a position's Y collateral
 * in exchange for repaying X debt. Liquidators receive Y tokens as reward
 * for helping restore position health by reducing debt obligations.
 *
 * The LP position's shape is passed in by the wrapper via [lp_shape].
 */
export function liquidateColY(
  tx: Transaction,
  typeArgs: [string, string, string, string],
  args: LiquidateColYArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::liquidate_col_y`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.priceInfo),
      obj(tx, args.debtInfo),
      obj(tx, args.repayment),
      obj(tx, args.supplyPool),
      obj(tx, args.shape),
      obj(tx, args.clock),
    ],
  })
}

export interface RepayBadDebtArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  supplyPool: TransactionObjectInput
  repayment: TransactionObjectInput
  shape: TransactionObjectInput
  clock: TransactionObjectInput
}

/**
 * Handles the repayment of "bad debt" for a position that has no assets but retains outstanding debt.
 *
 * This scenario can occur if a position's assets are fully liquidated but the debt remains.
 * Standard liquidation is not possible here, typically due to the minimum liquidation bonus requirement,
 * making the position under-collateralized and unable to be restored via normal means.
 *
 * This function enables an entity with the `ARepayBadDebt` permission to repay the residual debt,
 * aiding in restoring the solvency of the position and allowing the protocol to manage or close it gracefully.
 *
 * The LP position's shape is passed in by the wrapper via [lp_shape]
 * (structural method calls on the LP type can't be made on an unbound
 * generic).
 */
export function repayBadDebt(
  tx: Transaction,
  typeArgs: [string, string, string, string, string],
  args: RepayBadDebtArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::repay_bad_debt`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.supplyPool),
      obj(tx, args.repayment),
      obj(tx, args.shape),
      obj(tx, args.clock),
    ],
  })
}

export interface ReductionTicketCalcRepayAmtXArgs {
  ticket: TransactionObjectInput
  supplyPool: TransactionObjectInput
  clock: TransactionObjectInput
}

/** Calculate X token repayment amount for reduction ticket. */
export function reductionTicketCalcRepayAmtX(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: ReductionTicketCalcRepayAmtXArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::reduction_ticket_calc_repay_amt_x`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.ticket),
      obj(tx, args.supplyPool),
      obj(tx, args.clock),
    ],
  })
}

export interface ReductionTicketCalcRepayAmtYArgs {
  ticket: TransactionObjectInput
  supplyPool: TransactionObjectInput
  clock: TransactionObjectInput
}

/** Calculate Y token repayment amount for reduction ticket. */
export function reductionTicketCalcRepayAmtY(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: ReductionTicketCalcRepayAmtYArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::reduction_ticket_calc_repay_amt_y`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.ticket),
      obj(tx, args.supplyPool),
      obj(tx, args.clock),
    ],
  })
}

export interface ReductionTicketRepayXArgs {
  ticket: TransactionObjectInput
  supplyPool: TransactionObjectInput
  balance: TransactionObjectInput
  clock: TransactionObjectInput
}

/** Repay X debt for reduction ticket. */
export function reductionTicketRepayX(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: ReductionTicketRepayXArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::reduction_ticket_repay_x`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.ticket),
      obj(tx, args.supplyPool),
      obj(tx, args.balance),
      obj(tx, args.clock),
    ],
  })
}

export interface ReductionTicketRepayYArgs {
  ticket: TransactionObjectInput
  supplyPool: TransactionObjectInput
  balance: TransactionObjectInput
  clock: TransactionObjectInput
}

/** Repay Y debt for reduction ticket. */
export function reductionTicketRepayY(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: ReductionTicketRepayYArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::reduction_ticket_repay_y`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.ticket),
      obj(tx, args.supplyPool),
      obj(tx, args.balance),
      obj(tx, args.clock),
    ],
  })
}

/** Destroy exhausted reduction ticket and emit event. */
export function destroyReductionTicket(
  tx: Transaction,
  typeArgs: [string, string],
  ticket: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::destroy_reduction_ticket`,
    typeArguments: typeArgs,
    arguments: [obj(tx, ticket)],
  })
}

export interface AddCollateralXArgs {
  position: TransactionObjectInput
  cap: TransactionObjectInput
  balance: TransactionObjectInput
}

/** Add X token collateral to position. */
export function addCollateralX(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: AddCollateralXArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::add_collateral_x`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.cap),
      obj(tx, args.balance),
    ],
  })
}

export interface AddCollateralYArgs {
  position: TransactionObjectInput
  cap: TransactionObjectInput
  balance: TransactionObjectInput
}

/** Add Y token collateral to position. */
export function addCollateralY(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: AddCollateralYArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::add_collateral_y`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.cap),
      obj(tx, args.balance),
    ],
  })
}

export interface RepayDebtXArgs {
  position: TransactionObjectInput
  cap: TransactionObjectInput
  balance: TransactionObjectInput
  supplyPool: TransactionObjectInput
  clock: TransactionObjectInput
}

/** Repay as much X token debt as possible using the available balance. */
export function repayDebtX(
  tx: Transaction,
  typeArgs: [string, string, string, string],
  args: RepayDebtXArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::repay_debt_x`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.cap),
      obj(tx, args.balance),
      obj(tx, args.supplyPool),
      obj(tx, args.clock),
    ],
  })
}

export interface RepayDebtYArgs {
  position: TransactionObjectInput
  cap: TransactionObjectInput
  balance: TransactionObjectInput
  supplyPool: TransactionObjectInput
  clock: TransactionObjectInput
}

/** Repay as much Y token debt as possible using the available balance. */
export function repayDebtY(
  tx: Transaction,
  typeArgs: [string, string, string, string],
  args: RepayDebtYArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::position_core_clmm::repay_debt_y`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.cap),
      obj(tx, args.balance),
      obj(tx, args.supplyPool),
      obj(tx, args.clock),
    ],
  })
}

export interface OwnerTakeStashedRewardsArgs {
  position: TransactionObjectInput
  cap: TransactionObjectInput
  amount: bigint | TransactionArgument | null
}

/** Withdraw stashed rewards from position. */
export function ownerTakeStashedRewards(
  tx: Transaction,
  typeArgs: [string, string, string, string],
  args: OwnerTakeStashedRewardsArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::owner_take_stashed_rewards`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.cap),
      pure(tx, args.amount, `${Option.$typeName}<u64>`),
    ],
  })
}

export interface CreateRebalanceReceiptArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
}

/** Create rebalance receipt for tracking position rebalancing operations. */
export function createRebalanceReceipt(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: CreateRebalanceReceiptArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::create_rebalance_receipt`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
    ],
  })
}

export interface AddAmountToMapArgs {
  map: TransactionObjectInput
  amount: bigint | TransactionArgument
}

export function addAmountToMap(
  tx: Transaction,
  typeArg: string,
  args: AddAmountToMapArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::add_amount_to_map`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.map),
      pure(tx, args.amount, `u64`),
    ],
  })
}

export interface TakeRebalanceFeeArgs {
  position: TransactionObjectInput
  feeBps: number | TransactionArgument
  balance: TransactionObjectInput
  receipt: TransactionObjectInput
}

export function takeRebalanceFee(
  tx: Transaction,
  typeArgs: [string, string, string, string],
  args: TakeRebalanceFeeArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::take_rebalance_fee`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      pure(tx, args.feeBps, `u16`),
      obj(tx, args.balance),
      obj(tx, args.receipt),
    ],
  })
}

export interface RebalanceRepayDebtXArgs {
  position: TransactionObjectInput
  balance: TransactionObjectInput
  receipt: TransactionObjectInput
  supplyPool: TransactionObjectInput
  clock: TransactionObjectInput
}

/** Repay X debt during rebalancing and update receipt. */
export function rebalanceRepayDebtX(
  tx: Transaction,
  typeArgs: [string, string, string, string],
  args: RebalanceRepayDebtXArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::rebalance_repay_debt_x`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.balance),
      obj(tx, args.receipt),
      obj(tx, args.supplyPool),
      obj(tx, args.clock),
    ],
  })
}

export interface RebalanceRepayDebtYArgs {
  position: TransactionObjectInput
  balance: TransactionObjectInput
  receipt: TransactionObjectInput
  supplyPool: TransactionObjectInput
  clock: TransactionObjectInput
}

/** Repay Y debt during rebalancing and update receipt. */
export function rebalanceRepayDebtY(
  tx: Transaction,
  typeArgs: [string, string, string, string],
  args: RebalanceRepayDebtYArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::rebalance_repay_debt_y`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.balance),
      obj(tx, args.receipt),
      obj(tx, args.supplyPool),
      obj(tx, args.clock),
    ],
  })
}

export interface RebalanceStashRewardsArgs {
  position: TransactionObjectInput
  receipt: TransactionObjectInput
  rewards: TransactionObjectInput
}

/** Stash rewards in position during rebalancing. */
export function rebalanceStashRewards(
  tx: Transaction,
  typeArgs: [string, string, string, string],
  args: RebalanceStashRewardsArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::rebalance_stash_rewards`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.receipt),
      obj(tx, args.rewards),
    ],
  })
}

export interface ConsumeRebalanceReceiptArgs {
  position: TransactionObjectInput
  receipt: TransactionObjectInput
}

/** Consume rebalance receipt and emit comprehensive rebalancing event. */
export function consumeRebalanceReceipt(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: ConsumeRebalanceReceiptArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::consume_rebalance_receipt`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.receipt),
    ],
  })
}

export interface CollectProtocolFeesArgs {
  position: TransactionObjectInput
  amount: bigint | TransactionArgument | null
}

/** Collect protocol fees from position. */
export function collectProtocolFees(
  tx: Transaction,
  typeArgs: [string, string, string, string],
  args: CollectProtocolFeesArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::collect_protocol_fees`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      pure(tx, args.amount, `${Option.$typeName}<u64>`),
    ],
  })
}

/** Collect fees from deleted position. */
export function collectDeletedPositionFees(
  tx: Transaction,
  fees: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::collect_deleted_position_fees`,
    arguments: [obj(tx, fees)],
  })
}

export interface CalcLiquidateColXArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  priceInfo: TransactionObjectInput
  debtInfo: TransactionObjectInput
  maxRepaymentAmtY: bigint | TransactionArgument
  shape: TransactionObjectInput
}

/**
 * Calculate the required amounts to liquidate X collateral by repaying Y debt.
 *
 * The LP position's shape is passed in by the wrapper via [lp_shape].
 */
export function calcLiquidateColX(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: CalcLiquidateColXArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::calc_liquidate_col_x`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.priceInfo),
      obj(tx, args.debtInfo),
      pure(tx, args.maxRepaymentAmtY, `u64`),
      obj(tx, args.shape),
    ],
  })
}

export interface CalcLiquidateColYArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  priceInfo: TransactionObjectInput
  debtInfo: TransactionObjectInput
  maxRepaymentAmtX: bigint | TransactionArgument
  shape: TransactionObjectInput
}

/**
 * Calculate the required amounts to liquidate Y collateral by repaying X debt.
 *
 * The LP position's shape is passed in by the wrapper via [lp_shape].
 */
export function calcLiquidateColY(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: CalcLiquidateColYArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::position_core_clmm::calc_liquidate_col_y`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.priceInfo),
      obj(tx, args.debtInfo),
      pure(tx, args.maxRepaymentAmtX, `u64`),
      obj(tx, args.shape),
    ],
  })
}
