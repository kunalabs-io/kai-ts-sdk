import { PUBLISHED_AT } from '..'
import { GenericArg, generic, obj, option, pure } from '../../_framework/util'
import { Url } from '../../sui/url/structs'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function valueX64(tx: Transaction, typeArg: string, share: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::equity::value_x64`,
    typeArguments: [typeArg],
    arguments: [obj(tx, share)],
  })
}

export function supplyX64(tx: Transaction, typeArg: string, registry: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::equity::supply_x64`,
    typeArguments: [typeArg],
    arguments: [obj(tx, registry)],
  })
}

export function underlyingValueX64(
  tx: Transaction,
  typeArg: string,
  registry: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::equity::underlying_value_x64`,
    typeArguments: [typeArg],
    arguments: [obj(tx, registry)],
  })
}

export function borrowRegistry(tx: Transaction, typeArg: string, treasury: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::equity::borrow_registry`,
    typeArguments: [typeArg],
    arguments: [obj(tx, treasury)],
  })
}

export function borrowMutRegistry(
  tx: Transaction,
  typeArg: string,
  treasury: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::equity::borrow_mut_registry`,
    typeArguments: [typeArg],
    arguments: [obj(tx, treasury)],
  })
}

export function borrowTreasuryCap(
  tx: Transaction,
  typeArg: string,
  treasury: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::equity::borrow_treasury_cap`,
    typeArguments: [typeArg],
    arguments: [obj(tx, treasury)],
  })
}

export function createRegistry(tx: Transaction, typeArg: string, t: GenericArg) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::equity::create_registry`,
    typeArguments: [typeArg],
    arguments: [generic(tx, `${typeArg}`, t)],
  })
}

export function createRegistryWithCap(
  tx: Transaction,
  typeArg: string,
  treasuryCap: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::equity::create_registry_with_cap`,
    typeArguments: [typeArg],
    arguments: [obj(tx, treasuryCap)],
  })
}

export interface CreateTreasuryArgs {
  witness: GenericArg
  decimals: number | TransactionArgument
  symbol: Array<number | TransactionArgument> | TransactionArgument
  name: Array<number | TransactionArgument> | TransactionArgument
  description: Array<number | TransactionArgument> | TransactionArgument
  iconUrl: TransactionObjectInput | TransactionArgument | null
}

export function createTreasury(tx: Transaction, typeArg: string, args: CreateTreasuryArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::equity::create_treasury`,
    typeArguments: [typeArg],
    arguments: [
      generic(tx, `${typeArg}`, args.witness),
      pure(tx, args.decimals, `u8`),
      pure(tx, args.symbol, `vector<u8>`),
      pure(tx, args.name, `vector<u8>`),
      pure(tx, args.description, `vector<u8>`),
      option(tx, `${Url.$typeName}`, args.iconUrl),
    ],
  })
}

export function zero(tx: Transaction, typeArg: string) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::equity::zero`,
    typeArguments: [typeArg],
    arguments: [],
  })
}

export interface IncreaseValueAndIssueX64Args {
  registry: TransactionObjectInput
  valueX64: bigint | TransactionArgument
}

export function increaseValueAndIssueX64(
  tx: Transaction,
  typeArg: string,
  args: IncreaseValueAndIssueX64Args
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::equity::increase_value_and_issue_x64`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.registry), pure(tx, args.valueX64, `u128`)],
  })
}

export interface IncreaseValueAndIssueArgs {
  registry: TransactionObjectInput
  value: bigint | TransactionArgument
}

export function increaseValueAndIssue(
  tx: Transaction,
  typeArg: string,
  args: IncreaseValueAndIssueArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::equity::increase_value_and_issue`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.registry), pure(tx, args.value, `u64`)],
  })
}

export interface IncreaseValueX64Args {
  registry: TransactionObjectInput
  valueX64: bigint | TransactionArgument
}

export function increaseValueX64(tx: Transaction, typeArg: string, args: IncreaseValueX64Args) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::equity::increase_value_x64`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.registry), pure(tx, args.valueX64, `u128`)],
  })
}

export interface IncreaseValueArgs {
  registry: TransactionObjectInput
  value: bigint | TransactionArgument
}

export function increaseValue(tx: Transaction, typeArg: string, args: IncreaseValueArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::equity::increase_value`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.registry), pure(tx, args.value, `u64`)],
  })
}

export interface DecreaseValueX64Args {
  registry: TransactionObjectInput
  valueX64: bigint | TransactionArgument
}

export function decreaseValueX64(tx: Transaction, typeArg: string, args: DecreaseValueX64Args) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::equity::decrease_value_x64`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.registry), pure(tx, args.valueX64, `u128`)],
  })
}

export interface DecreaseValueArgs {
  registry: TransactionObjectInput
  value: bigint | TransactionArgument
}

export function decreaseValue(tx: Transaction, typeArg: string, args: DecreaseValueArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::equity::decrease_value`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.registry), pure(tx, args.value, `u64`)],
  })
}

export interface CalcRedeemX64Args {
  registry: TransactionObjectInput
  shareValueX64: bigint | TransactionArgument
}

export function calcRedeemX64(tx: Transaction, typeArg: string, args: CalcRedeemX64Args) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::equity::calc_redeem_x64`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.registry), pure(tx, args.shareValueX64, `u128`)],
  })
}

export interface RedeemX64Args {
  registry: TransactionObjectInput
  share: TransactionObjectInput
}

export function redeemX64(tx: Transaction, typeArg: string, args: RedeemX64Args) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::equity::redeem_x64`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.registry), obj(tx, args.share)],
  })
}

export interface CalcRedeemLossyArgs {
  registry: TransactionObjectInput
  shareValueX64: bigint | TransactionArgument
}

export function calcRedeemLossy(tx: Transaction, typeArg: string, args: CalcRedeemLossyArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::equity::calc_redeem_lossy`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.registry), pure(tx, args.shareValueX64, `u128`)],
  })
}

export interface RedeemLossyArgs {
  registry: TransactionObjectInput
  share: TransactionObjectInput
}

export function redeemLossy(tx: Transaction, typeArg: string, args: RedeemLossyArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::equity::redeem_lossy`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.registry), obj(tx, args.share)],
  })
}

export interface CalcRedeemForAmountX64Args {
  registry: TransactionObjectInput
  amountX64: bigint | TransactionArgument
}

export function calcRedeemForAmountX64(
  tx: Transaction,
  typeArg: string,
  args: CalcRedeemForAmountX64Args
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::equity::calc_redeem_for_amount_x64`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.registry), pure(tx, args.amountX64, `u128`)],
  })
}

export interface CalcRedeemForAmountArgs {
  registry: TransactionObjectInput
  amount: bigint | TransactionArgument
}

export function calcRedeemForAmount(
  tx: Transaction,
  typeArg: string,
  args: CalcRedeemForAmountArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::equity::calc_redeem_for_amount`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.registry), pure(tx, args.amount, `u64`)],
  })
}

export interface CalcBalanceRedeemForAmountArgs {
  registry: TransactionObjectInput
  amount: bigint | TransactionArgument
}

export function calcBalanceRedeemForAmount(
  tx: Transaction,
  typeArg: string,
  args: CalcBalanceRedeemForAmountArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::equity::calc_balance_redeem_for_amount`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.registry), pure(tx, args.amount, `u64`)],
  })
}

export interface IntoBalanceLossyArgs {
  share: TransactionObjectInput
  treasury: TransactionObjectInput
}

export function intoBalanceLossy(tx: Transaction, typeArg: string, args: IntoBalanceLossyArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::equity::into_balance_lossy`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.share), obj(tx, args.treasury)],
  })
}

export interface IntoBalanceArgs {
  share: TransactionObjectInput
  treasury: TransactionObjectInput
}

export function intoBalance(tx: Transaction, typeArg: string, args: IntoBalanceArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::equity::into_balance`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.share), obj(tx, args.treasury)],
  })
}

export interface FromBalanceArgs {
  treasury: TransactionObjectInput
  balance: TransactionObjectInput
}

export function fromBalance(tx: Transaction, typeArg: string, args: FromBalanceArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::equity::from_balance`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.treasury), obj(tx, args.balance)],
  })
}

export interface SplitX64Args {
  shares: TransactionObjectInput
  amountX64: bigint | TransactionArgument
}

export function splitX64(tx: Transaction, typeArg: string, args: SplitX64Args) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::equity::split_x64`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.shares), pure(tx, args.amountX64, `u128`)],
  })
}

export function withdrawAll(tx: Transaction, typeArg: string, shares: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::equity::withdraw_all`,
    typeArguments: [typeArg],
    arguments: [obj(tx, shares)],
  })
}

export interface SplitArgs {
  share: TransactionObjectInput
  amount: bigint | TransactionArgument
}

export function split(tx: Transaction, typeArg: string, args: SplitArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::equity::split`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.share), pure(tx, args.amount, `u64`)],
  })
}

export interface JoinArgs {
  self: TransactionObjectInput
  other: TransactionObjectInput
}

export function join(tx: Transaction, typeArg: string, args: JoinArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::equity::join`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.self), obj(tx, args.other)],
  })
}

export function destroyZero(tx: Transaction, typeArg: string, shares: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::equity::destroy_zero`,
    typeArguments: [typeArg],
    arguments: [obj(tx, shares)],
  })
}

export function destroyEmptyRegistry(
  tx: Transaction,
  typeArg: string,
  registry: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::equity::destroy_empty_registry`,
    typeArguments: [typeArg],
    arguments: [obj(tx, registry)],
  })
}
