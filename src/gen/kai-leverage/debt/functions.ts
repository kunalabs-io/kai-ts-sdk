import { PUBLISHED_AT } from '..'
import { GenericArg, generic, obj, option, pure } from '../../_framework/util'
import { Url } from '../../sui/url/structs'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function valueX64(tx: Transaction, typeArg: string, share: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::debt::value_x64`,
    typeArguments: [typeArg],
    arguments: [obj(tx, share)],
  })
}

export function supplyX64(tx: Transaction, typeArg: string, registry: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::debt::supply_x64`,
    typeArguments: [typeArg],
    arguments: [obj(tx, registry)],
  })
}

export function liabilityValueX64(
  tx: Transaction,
  typeArg: string,
  registry: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::debt::liability_value_x64`,
    typeArguments: [typeArg],
    arguments: [obj(tx, registry)],
  })
}

export function borrowRegistry(tx: Transaction, typeArg: string, treasury: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::debt::borrow_registry`,
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
    target: `${PUBLISHED_AT}::debt::borrow_mut_registry`,
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
    target: `${PUBLISHED_AT}::debt::borrow_treasury_cap`,
    typeArguments: [typeArg],
    arguments: [obj(tx, treasury)],
  })
}

export function createRegistry(tx: Transaction, typeArg: string, t: GenericArg) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::debt::create_registry`,
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
    target: `${PUBLISHED_AT}::debt::create_registry_with_cap`,
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
    target: `${PUBLISHED_AT}::debt::create_treasury`,
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
    target: `${PUBLISHED_AT}::debt::zero`,
    typeArguments: [typeArg],
    arguments: [],
  })
}

export interface IncreaseLiabilityAndIssueX64Args {
  registry: TransactionObjectInput
  valueX64: bigint | TransactionArgument
}

export function increaseLiabilityAndIssueX64(
  tx: Transaction,
  typeArg: string,
  args: IncreaseLiabilityAndIssueX64Args
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::debt::increase_liability_and_issue_x64`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.registry), pure(tx, args.valueX64, `u128`)],
  })
}

export interface IncreaseLiabilityAndIssueArgs {
  registry: TransactionObjectInput
  value: bigint | TransactionArgument
}

export function increaseLiabilityAndIssue(
  tx: Transaction,
  typeArg: string,
  args: IncreaseLiabilityAndIssueArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::debt::increase_liability_and_issue`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.registry), pure(tx, args.value, `u64`)],
  })
}

export interface IncreaseLiabilityX64Args {
  registry: TransactionObjectInput
  valueX64: bigint | TransactionArgument
}

export function increaseLiabilityX64(
  tx: Transaction,
  typeArg: string,
  args: IncreaseLiabilityX64Args
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::debt::increase_liability_x64`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.registry), pure(tx, args.valueX64, `u128`)],
  })
}

export interface IncreaseLiabilityArgs {
  registry: TransactionObjectInput
  value: bigint | TransactionArgument
}

export function increaseLiability(tx: Transaction, typeArg: string, args: IncreaseLiabilityArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::debt::increase_liability`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.registry), pure(tx, args.value, `u64`)],
  })
}

export interface DecreaseLiabilityX64Args {
  registry: TransactionObjectInput
  valueX64: bigint | TransactionArgument
}

export function decreaseLiabilityX64(
  tx: Transaction,
  typeArg: string,
  args: DecreaseLiabilityX64Args
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::debt::decrease_liability_x64`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.registry), pure(tx, args.valueX64, `u128`)],
  })
}

export interface DecreaseLiabilityArgs {
  registry: TransactionObjectInput
  value: bigint | TransactionArgument
}

export function decreaseLiability(tx: Transaction, typeArg: string, args: DecreaseLiabilityArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::debt::decrease_liability`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.registry), pure(tx, args.value, `u64`)],
  })
}

export interface CalcRepayX64Args {
  registry: TransactionObjectInput
  shareValueX64: bigint | TransactionArgument
}

export function calcRepayX64(tx: Transaction, typeArg: string, args: CalcRepayX64Args) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::debt::calc_repay_x64`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.registry), pure(tx, args.shareValueX64, `u128`)],
  })
}

export interface RepayX64Args {
  registry: TransactionObjectInput
  share: TransactionObjectInput
}

export function repayX64(tx: Transaction, typeArg: string, args: RepayX64Args) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::debt::repay_x64`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.registry), obj(tx, args.share)],
  })
}

export interface CalcRepayLossyArgs {
  registry: TransactionObjectInput
  shareValueX64: bigint | TransactionArgument
}

export function calcRepayLossy(tx: Transaction, typeArg: string, args: CalcRepayLossyArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::debt::calc_repay_lossy`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.registry), pure(tx, args.shareValueX64, `u128`)],
  })
}

export interface RepayLossyArgs {
  registry: TransactionObjectInput
  share: TransactionObjectInput
}

export function repayLossy(tx: Transaction, typeArg: string, args: RepayLossyArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::debt::repay_lossy`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.registry), obj(tx, args.share)],
  })
}

export interface CalcRepayForAmountX64Args {
  registry: TransactionObjectInput
  amountX64: bigint | TransactionArgument
}

export function calcRepayForAmountX64(
  tx: Transaction,
  typeArg: string,
  args: CalcRepayForAmountX64Args
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::debt::calc_repay_for_amount_x64`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.registry), pure(tx, args.amountX64, `u128`)],
  })
}

export interface CalcRepayForAmountArgs {
  registry: TransactionObjectInput
  amount: bigint | TransactionArgument
}

export function calcRepayForAmount(tx: Transaction, typeArg: string, args: CalcRepayForAmountArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::debt::calc_repay_for_amount`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.registry), pure(tx, args.amount, `u64`)],
  })
}

export interface CalcBalanceRepayForAmountArgs {
  registry: TransactionObjectInput
  amount: bigint | TransactionArgument
}

export function calcBalanceRepayForAmount(
  tx: Transaction,
  typeArg: string,
  args: CalcBalanceRepayForAmountArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::debt::calc_balance_repay_for_amount`,
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
    target: `${PUBLISHED_AT}::debt::into_balance_lossy`,
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
    target: `${PUBLISHED_AT}::debt::into_balance`,
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
    target: `${PUBLISHED_AT}::debt::from_balance`,
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
    target: `${PUBLISHED_AT}::debt::split_x64`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.shares), pure(tx, args.amountX64, `u128`)],
  })
}

export interface SplitArgs {
  shares: TransactionObjectInput
  amount: bigint | TransactionArgument
}

export function split(tx: Transaction, typeArg: string, args: SplitArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::debt::split`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.shares), pure(tx, args.amount, `u64`)],
  })
}

export function withdrawAll(tx: Transaction, typeArg: string, shares: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::debt::withdraw_all`,
    typeArguments: [typeArg],
    arguments: [obj(tx, shares)],
  })
}

export interface JoinArgs {
  self: TransactionObjectInput
  other: TransactionObjectInput
}

export function join(tx: Transaction, typeArg: string, args: JoinArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::debt::join`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.self), obj(tx, args.other)],
  })
}

export function destroyZero(tx: Transaction, typeArg: string, shares: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::debt::destroy_zero`,
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
    target: `${PUBLISHED_AT}::debt::destroy_empty_registry`,
    typeArguments: [typeArg],
    arguments: [obj(tx, registry)],
  })
}
