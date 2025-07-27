import {
  PhantomReified,
  PhantomToTypeStr,
  PhantomTypeArgument,
  Reified,
  StructClass,
  ToField,
  ToPhantomTypeArgument,
  ToTypeStr,
  assertFieldsWithTypesArgsMatch,
  assertReifiedTypeArgsMatch,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  extractType,
  phantom,
} from '../../../../_framework/reified'
import {
  FieldsWithTypes,
  composeSuiType,
  compressSuiType,
  parseTypeName,
} from '../../../../_framework/util'
import { Balance } from '../../../../sui/balance/structs'
import { ID, UID } from '../../../../sui/object/structs'
import { PKG_V1, PKG_V2 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64, fromHEX, toHEX } from '@mysten/sui/utils'

/* ============================== RewardsPool =============================== */

export function isRewardsPool(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::rewards_pool::RewardsPool` + '<')
}

export interface RewardsPoolFields<T0 extends PhantomTypeArgument> {
  id: ToField<UID>
  spoolId: ToField<ID>
  exchangeRateNumerator: ToField<'u64'>
  exchangeRateDenominator: ToField<'u64'>
  rewards: ToField<Balance<T0>>
  claimedRewards: ToField<'u64'>
}

export type RewardsPoolReified<T0 extends PhantomTypeArgument> = Reified<
  RewardsPool<T0>,
  RewardsPoolFields<T0>
>

export class RewardsPool<T0 extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::rewards_pool::RewardsPool`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = RewardsPool.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::rewards_pool::RewardsPool<${PhantomToTypeStr<T0>}>`
  readonly $typeArgs: [PhantomToTypeStr<T0>]
  readonly $isPhantom = RewardsPool.$isPhantom

  readonly id: ToField<UID>
  readonly spoolId: ToField<ID>
  readonly exchangeRateNumerator: ToField<'u64'>
  readonly exchangeRateDenominator: ToField<'u64'>
  readonly rewards: ToField<Balance<T0>>
  readonly claimedRewards: ToField<'u64'>

  private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: RewardsPoolFields<T0>) {
    this.$fullTypeName = composeSuiType(
      RewardsPool.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::rewards_pool::RewardsPool<${PhantomToTypeStr<T0>}>`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.spoolId = fields.spoolId
    this.exchangeRateNumerator = fields.exchangeRateNumerator
    this.exchangeRateDenominator = fields.exchangeRateDenominator
    this.rewards = fields.rewards
    this.claimedRewards = fields.claimedRewards
  }

  static reified<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0
  ): RewardsPoolReified<ToPhantomTypeArgument<T0>> {
    const reifiedBcs = RewardsPool.bcs
    return {
      typeName: RewardsPool.$typeName,
      fullTypeName: composeSuiType(
        RewardsPool.$typeName,
        ...[extractType(T0)]
      ) as `${typeof PKG_V1}::rewards_pool::RewardsPool<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`,
      typeArgs: [extractType(T0)] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>],
      isPhantom: RewardsPool.$isPhantom,
      reifiedTypeArgs: [T0],
      fromFields: (fields: Record<string, any>) => RewardsPool.fromFields(T0, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => RewardsPool.fromFieldsWithTypes(T0, item),
      fromBcs: (data: Uint8Array) => RewardsPool.fromFields(T0, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => RewardsPool.fromJSONField(T0, field),
      fromJSON: (json: Record<string, any>) => RewardsPool.fromJSON(T0, json),
      fromSuiParsedData: (content: SuiParsedData) => RewardsPool.fromSuiParsedData(T0, content),
      fromSuiObjectData: (content: SuiObjectData) => RewardsPool.fromSuiObjectData(T0, content),
      fetch: async (client: SuiClient, id: string) => RewardsPool.fetch(client, T0, id),
      new: (fields: RewardsPoolFields<ToPhantomTypeArgument<T0>>) => {
        return new RewardsPool([extractType(T0)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return RewardsPool.reified
  }

  static phantom<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0
  ): PhantomReified<ToTypeStr<RewardsPool<ToPhantomTypeArgument<T0>>>> {
    return phantom(RewardsPool.reified(T0))
  }
  static get p() {
    return RewardsPool.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('RewardsPool', {
      id: UID.bcs,
      spool_id: ID.bcs,
      exchange_rate_numerator: bcs.u64(),
      exchange_rate_denominator: bcs.u64(),
      rewards: Balance.bcs,
      claimed_rewards: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof RewardsPool.instantiateBcs> | null = null

  static get bcs() {
    if (!RewardsPool.cachedBcs) {
      RewardsPool.cachedBcs = RewardsPool.instantiateBcs()
    }
    return RewardsPool.cachedBcs
  }

  static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    fields: Record<string, any>
  ): RewardsPool<ToPhantomTypeArgument<T0>> {
    return RewardsPool.reified(typeArg).new({
      id: decodeFromFields(UID.reified(), fields.id),
      spoolId: decodeFromFields(ID.reified(), fields.spool_id),
      exchangeRateNumerator: decodeFromFields('u64', fields.exchange_rate_numerator),
      exchangeRateDenominator: decodeFromFields('u64', fields.exchange_rate_denominator),
      rewards: decodeFromFields(Balance.reified(typeArg), fields.rewards),
      claimedRewards: decodeFromFields('u64', fields.claimed_rewards),
    })
  }

  static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    item: FieldsWithTypes
  ): RewardsPool<ToPhantomTypeArgument<T0>> {
    if (!isRewardsPool(item.type)) {
      throw new Error('not a RewardsPool type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return RewardsPool.reified(typeArg).new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      spoolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.spool_id),
      exchangeRateNumerator: decodeFromFieldsWithTypes('u64', item.fields.exchange_rate_numerator),
      exchangeRateDenominator: decodeFromFieldsWithTypes(
        'u64',
        item.fields.exchange_rate_denominator
      ),
      rewards: decodeFromFieldsWithTypes(Balance.reified(typeArg), item.fields.rewards),
      claimedRewards: decodeFromFieldsWithTypes('u64', item.fields.claimed_rewards),
    })
  }

  static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: Uint8Array
  ): RewardsPool<ToPhantomTypeArgument<T0>> {
    return RewardsPool.fromFields(typeArg, RewardsPool.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      spoolId: this.spoolId,
      exchangeRateNumerator: this.exchangeRateNumerator.toString(),
      exchangeRateDenominator: this.exchangeRateDenominator.toString(),
      rewards: this.rewards.toJSONField(),
      claimedRewards: this.claimedRewards.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    field: any
  ): RewardsPool<ToPhantomTypeArgument<T0>> {
    return RewardsPool.reified(typeArg).new({
      id: decodeFromJSONField(UID.reified(), field.id),
      spoolId: decodeFromJSONField(ID.reified(), field.spoolId),
      exchangeRateNumerator: decodeFromJSONField('u64', field.exchangeRateNumerator),
      exchangeRateDenominator: decodeFromJSONField('u64', field.exchangeRateDenominator),
      rewards: decodeFromJSONField(Balance.reified(typeArg), field.rewards),
      claimedRewards: decodeFromJSONField('u64', field.claimedRewards),
    })
  }

  static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    json: Record<string, any>
  ): RewardsPool<ToPhantomTypeArgument<T0>> {
    if (json.$typeName !== RewardsPool.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(RewardsPool.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return RewardsPool.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    content: SuiParsedData
  ): RewardsPool<ToPhantomTypeArgument<T0>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRewardsPool(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a RewardsPool object`)
    }
    return RewardsPool.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: SuiObjectData
  ): RewardsPool<ToPhantomTypeArgument<T0>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRewardsPool(data.bcs.type)) {
        throw new Error(`object at is not a RewardsPool object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 1) {
        throw new Error(
          `type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`
        )
      }
      const gotTypeArg = compressSuiType(gotTypeArgs[0])
      const expectedTypeArg = compressSuiType(extractType(typeArg))
      if (gotTypeArg !== compressSuiType(extractType(typeArg))) {
        throw new Error(
          `type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`
        )
      }

      return RewardsPool.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RewardsPool.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T0,
    id: string
  ): Promise<RewardsPool<ToPhantomTypeArgument<T0>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching RewardsPool object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isRewardsPool(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a RewardsPool object`)
    }

    return RewardsPool.fromSuiObjectData(typeArg, res.data)
  }
}

/* ============================== RewardsPoolFeeKey =============================== */

export function isRewardsPoolFeeKey(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V2}::rewards_pool::RewardsPoolFeeKey`
}

export interface RewardsPoolFeeKeyFields {
  dummyField: ToField<'bool'>
}

export type RewardsPoolFeeKeyReified = Reified<RewardsPoolFeeKey, RewardsPoolFeeKeyFields>

export class RewardsPoolFeeKey implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V2}::rewards_pool::RewardsPoolFeeKey`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = RewardsPoolFeeKey.$typeName
  readonly $fullTypeName: `${typeof PKG_V2}::rewards_pool::RewardsPoolFeeKey`
  readonly $typeArgs: []
  readonly $isPhantom = RewardsPoolFeeKey.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: RewardsPoolFeeKeyFields) {
    this.$fullTypeName = composeSuiType(
      RewardsPoolFeeKey.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V2}::rewards_pool::RewardsPoolFeeKey`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): RewardsPoolFeeKeyReified {
    const reifiedBcs = RewardsPoolFeeKey.bcs
    return {
      typeName: RewardsPoolFeeKey.$typeName,
      fullTypeName: composeSuiType(
        RewardsPoolFeeKey.$typeName,
        ...[]
      ) as `${typeof PKG_V2}::rewards_pool::RewardsPoolFeeKey`,
      typeArgs: [] as [],
      isPhantom: RewardsPoolFeeKey.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => RewardsPoolFeeKey.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => RewardsPoolFeeKey.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => RewardsPoolFeeKey.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => RewardsPoolFeeKey.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => RewardsPoolFeeKey.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => RewardsPoolFeeKey.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => RewardsPoolFeeKey.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => RewardsPoolFeeKey.fetch(client, id),
      new: (fields: RewardsPoolFeeKeyFields) => {
        return new RewardsPoolFeeKey([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return RewardsPoolFeeKey.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RewardsPoolFeeKey>> {
    return phantom(RewardsPoolFeeKey.reified())
  }
  static get p() {
    return RewardsPoolFeeKey.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('RewardsPoolFeeKey', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof RewardsPoolFeeKey.instantiateBcs> | null = null

  static get bcs() {
    if (!RewardsPoolFeeKey.cachedBcs) {
      RewardsPoolFeeKey.cachedBcs = RewardsPoolFeeKey.instantiateBcs()
    }
    return RewardsPoolFeeKey.cachedBcs
  }

  static fromFields(fields: Record<string, any>): RewardsPoolFeeKey {
    return RewardsPoolFeeKey.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): RewardsPoolFeeKey {
    if (!isRewardsPoolFeeKey(item.type)) {
      throw new Error('not a RewardsPoolFeeKey type')
    }

    return RewardsPoolFeeKey.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): RewardsPoolFeeKey {
    return RewardsPoolFeeKey.fromFields(RewardsPoolFeeKey.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): RewardsPoolFeeKey {
    return RewardsPoolFeeKey.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): RewardsPoolFeeKey {
    if (json.$typeName !== RewardsPoolFeeKey.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return RewardsPoolFeeKey.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): RewardsPoolFeeKey {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRewardsPoolFeeKey(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a RewardsPoolFeeKey object`)
    }
    return RewardsPoolFeeKey.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): RewardsPoolFeeKey {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRewardsPoolFeeKey(data.bcs.type)) {
        throw new Error(`object at is not a RewardsPoolFeeKey object`)
      }

      return RewardsPoolFeeKey.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RewardsPoolFeeKey.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<RewardsPoolFeeKey> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching RewardsPoolFeeKey object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isRewardsPoolFeeKey(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a RewardsPoolFeeKey object`)
    }

    return RewardsPoolFeeKey.fromSuiObjectData(res.data)
  }
}

/* ============================== RewardsPoolFee =============================== */

export function isRewardsPoolFee(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V2}::rewards_pool::RewardsPoolFee`
}

export interface RewardsPoolFeeFields {
  feeRateNumerator: ToField<'u64'>
  feeRateDenominator: ToField<'u64'>
  recipient: ToField<'address'>
}

export type RewardsPoolFeeReified = Reified<RewardsPoolFee, RewardsPoolFeeFields>

export class RewardsPoolFee implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V2}::rewards_pool::RewardsPoolFee`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = RewardsPoolFee.$typeName
  readonly $fullTypeName: `${typeof PKG_V2}::rewards_pool::RewardsPoolFee`
  readonly $typeArgs: []
  readonly $isPhantom = RewardsPoolFee.$isPhantom

  readonly feeRateNumerator: ToField<'u64'>
  readonly feeRateDenominator: ToField<'u64'>
  readonly recipient: ToField<'address'>

  private constructor(typeArgs: [], fields: RewardsPoolFeeFields) {
    this.$fullTypeName = composeSuiType(
      RewardsPoolFee.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V2}::rewards_pool::RewardsPoolFee`
    this.$typeArgs = typeArgs

    this.feeRateNumerator = fields.feeRateNumerator
    this.feeRateDenominator = fields.feeRateDenominator
    this.recipient = fields.recipient
  }

  static reified(): RewardsPoolFeeReified {
    const reifiedBcs = RewardsPoolFee.bcs
    return {
      typeName: RewardsPoolFee.$typeName,
      fullTypeName: composeSuiType(
        RewardsPoolFee.$typeName,
        ...[]
      ) as `${typeof PKG_V2}::rewards_pool::RewardsPoolFee`,
      typeArgs: [] as [],
      isPhantom: RewardsPoolFee.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => RewardsPoolFee.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => RewardsPoolFee.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => RewardsPoolFee.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => RewardsPoolFee.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => RewardsPoolFee.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => RewardsPoolFee.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => RewardsPoolFee.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => RewardsPoolFee.fetch(client, id),
      new: (fields: RewardsPoolFeeFields) => {
        return new RewardsPoolFee([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return RewardsPoolFee.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RewardsPoolFee>> {
    return phantom(RewardsPoolFee.reified())
  }
  static get p() {
    return RewardsPoolFee.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('RewardsPoolFee', {
      fee_rate_numerator: bcs.u64(),
      fee_rate_denominator: bcs.u64(),
      recipient: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
    })
  }

  private static cachedBcs: ReturnType<typeof RewardsPoolFee.instantiateBcs> | null = null

  static get bcs() {
    if (!RewardsPoolFee.cachedBcs) {
      RewardsPoolFee.cachedBcs = RewardsPoolFee.instantiateBcs()
    }
    return RewardsPoolFee.cachedBcs
  }

  static fromFields(fields: Record<string, any>): RewardsPoolFee {
    return RewardsPoolFee.reified().new({
      feeRateNumerator: decodeFromFields('u64', fields.fee_rate_numerator),
      feeRateDenominator: decodeFromFields('u64', fields.fee_rate_denominator),
      recipient: decodeFromFields('address', fields.recipient),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): RewardsPoolFee {
    if (!isRewardsPoolFee(item.type)) {
      throw new Error('not a RewardsPoolFee type')
    }

    return RewardsPoolFee.reified().new({
      feeRateNumerator: decodeFromFieldsWithTypes('u64', item.fields.fee_rate_numerator),
      feeRateDenominator: decodeFromFieldsWithTypes('u64', item.fields.fee_rate_denominator),
      recipient: decodeFromFieldsWithTypes('address', item.fields.recipient),
    })
  }

  static fromBcs(data: Uint8Array): RewardsPoolFee {
    return RewardsPoolFee.fromFields(RewardsPoolFee.bcs.parse(data))
  }

  toJSONField() {
    return {
      feeRateNumerator: this.feeRateNumerator.toString(),
      feeRateDenominator: this.feeRateDenominator.toString(),
      recipient: this.recipient,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): RewardsPoolFee {
    return RewardsPoolFee.reified().new({
      feeRateNumerator: decodeFromJSONField('u64', field.feeRateNumerator),
      feeRateDenominator: decodeFromJSONField('u64', field.feeRateDenominator),
      recipient: decodeFromJSONField('address', field.recipient),
    })
  }

  static fromJSON(json: Record<string, any>): RewardsPoolFee {
    if (json.$typeName !== RewardsPoolFee.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return RewardsPoolFee.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): RewardsPoolFee {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRewardsPoolFee(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a RewardsPoolFee object`)
    }
    return RewardsPoolFee.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): RewardsPoolFee {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRewardsPoolFee(data.bcs.type)) {
        throw new Error(`object at is not a RewardsPoolFee object`)
      }

      return RewardsPoolFee.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RewardsPoolFee.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<RewardsPoolFee> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching RewardsPoolFee object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isRewardsPoolFee(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a RewardsPoolFee object`)
    }

    return RewardsPoolFee.fromSuiObjectData(res.data)
  }
}

/* ============================== RewardsPoolRewardsBalanceKey =============================== */

export function isRewardsPoolRewardsBalanceKey(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V2}::rewards_pool::RewardsPoolRewardsBalanceKey`
}

export interface RewardsPoolRewardsBalanceKeyFields {
  dummyField: ToField<'bool'>
}

export type RewardsPoolRewardsBalanceKeyReified = Reified<
  RewardsPoolRewardsBalanceKey,
  RewardsPoolRewardsBalanceKeyFields
>

export class RewardsPoolRewardsBalanceKey implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V2}::rewards_pool::RewardsPoolRewardsBalanceKey`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = RewardsPoolRewardsBalanceKey.$typeName
  readonly $fullTypeName: `${typeof PKG_V2}::rewards_pool::RewardsPoolRewardsBalanceKey`
  readonly $typeArgs: []
  readonly $isPhantom = RewardsPoolRewardsBalanceKey.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: RewardsPoolRewardsBalanceKeyFields) {
    this.$fullTypeName = composeSuiType(
      RewardsPoolRewardsBalanceKey.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V2}::rewards_pool::RewardsPoolRewardsBalanceKey`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): RewardsPoolRewardsBalanceKeyReified {
    const reifiedBcs = RewardsPoolRewardsBalanceKey.bcs
    return {
      typeName: RewardsPoolRewardsBalanceKey.$typeName,
      fullTypeName: composeSuiType(
        RewardsPoolRewardsBalanceKey.$typeName,
        ...[]
      ) as `${typeof PKG_V2}::rewards_pool::RewardsPoolRewardsBalanceKey`,
      typeArgs: [] as [],
      isPhantom: RewardsPoolRewardsBalanceKey.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => RewardsPoolRewardsBalanceKey.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        RewardsPoolRewardsBalanceKey.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) =>
        RewardsPoolRewardsBalanceKey.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => RewardsPoolRewardsBalanceKey.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => RewardsPoolRewardsBalanceKey.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        RewardsPoolRewardsBalanceKey.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        RewardsPoolRewardsBalanceKey.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) =>
        RewardsPoolRewardsBalanceKey.fetch(client, id),
      new: (fields: RewardsPoolRewardsBalanceKeyFields) => {
        return new RewardsPoolRewardsBalanceKey([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return RewardsPoolRewardsBalanceKey.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RewardsPoolRewardsBalanceKey>> {
    return phantom(RewardsPoolRewardsBalanceKey.reified())
  }
  static get p() {
    return RewardsPoolRewardsBalanceKey.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('RewardsPoolRewardsBalanceKey', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof RewardsPoolRewardsBalanceKey.instantiateBcs> | null =
    null

  static get bcs() {
    if (!RewardsPoolRewardsBalanceKey.cachedBcs) {
      RewardsPoolRewardsBalanceKey.cachedBcs = RewardsPoolRewardsBalanceKey.instantiateBcs()
    }
    return RewardsPoolRewardsBalanceKey.cachedBcs
  }

  static fromFields(fields: Record<string, any>): RewardsPoolRewardsBalanceKey {
    return RewardsPoolRewardsBalanceKey.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): RewardsPoolRewardsBalanceKey {
    if (!isRewardsPoolRewardsBalanceKey(item.type)) {
      throw new Error('not a RewardsPoolRewardsBalanceKey type')
    }

    return RewardsPoolRewardsBalanceKey.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): RewardsPoolRewardsBalanceKey {
    return RewardsPoolRewardsBalanceKey.fromFields(RewardsPoolRewardsBalanceKey.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): RewardsPoolRewardsBalanceKey {
    return RewardsPoolRewardsBalanceKey.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): RewardsPoolRewardsBalanceKey {
    if (json.$typeName !== RewardsPoolRewardsBalanceKey.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return RewardsPoolRewardsBalanceKey.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): RewardsPoolRewardsBalanceKey {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRewardsPoolRewardsBalanceKey(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a RewardsPoolRewardsBalanceKey object`
      )
    }
    return RewardsPoolRewardsBalanceKey.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): RewardsPoolRewardsBalanceKey {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRewardsPoolRewardsBalanceKey(data.bcs.type)) {
        throw new Error(`object at is not a RewardsPoolRewardsBalanceKey object`)
      }

      return RewardsPoolRewardsBalanceKey.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RewardsPoolRewardsBalanceKey.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<RewardsPoolRewardsBalanceKey> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(
        `error fetching RewardsPoolRewardsBalanceKey object at id ${id}: ${res.error.code}`
      )
    }
    if (
      res.data?.bcs?.dataType !== 'moveObject' ||
      !isRewardsPoolRewardsBalanceKey(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a RewardsPoolRewardsBalanceKey object`)
    }

    return RewardsPoolRewardsBalanceKey.fromSuiObjectData(res.data)
  }
}
