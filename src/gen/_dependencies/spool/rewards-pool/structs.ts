import { bcs } from '@mysten/sui/bcs'
import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import type { SuiObjectData, SuiParsedData } from '@mysten/sui/jsonRpc'
import { fromBase64 } from '@mysten/sui/utils'
import { getTypeOrigin } from '../../../_envs'
import {
  assertFieldsWithTypesArgsMatch,
  assertReifiedTypeArgsMatch,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  extractType,
  phantom,
  PhantomReified,
  PhantomToTypeStr,
  PhantomTypeArgument,
  Reified,
  StructClass,
  ToField,
  ToJSON,
  ToPhantomTypeArgument,
  ToTypeStr,
} from '../../../_framework/reified'
import {
  composeSuiType,
  compressSuiType,
  FieldsWithTypes,
  parseTypeName,
} from '../../../_framework/util'
import { Balance } from '../../../sui/balance/structs'
import { ID, UID } from '../../../sui/object/structs'

/* ============================== RewardsPool =============================== */

export function isRewardsPool(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    `${getTypeOrigin('spool', 'rewards_pool::RewardsPool')}::rewards_pool::RewardsPool` + '<',
  )
}

export interface RewardsPoolFields<RewardType extends PhantomTypeArgument> {
  id: ToField<UID>
  spoolId: ToField<ID>
  exchangeRateNumerator: ToField<'u64'>
  exchangeRateDenominator: ToField<'u64'>
  rewards: ToField<Balance<RewardType>>
  claimedRewards: ToField<'u64'>
}

export type RewardsPoolReified<RewardType extends PhantomTypeArgument> = Reified<
  RewardsPool<RewardType>,
  RewardsPoolFields<RewardType>
>

export type RewardsPoolJSONField<RewardType extends PhantomTypeArgument> = {
  id: string
  spoolId: string
  exchangeRateNumerator: string
  exchangeRateDenominator: string
  rewards: ToJSON<Balance<RewardType>>
  claimedRewards: string
}

export type RewardsPoolJSON<RewardType extends PhantomTypeArgument> = {
  $typeName: typeof RewardsPool.$typeName
  $typeArgs: [PhantomToTypeStr<RewardType>]
} & RewardsPoolJSONField<RewardType>

export class RewardsPool<RewardType extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::rewards_pool::RewardsPool` {
    return `${
      getTypeOrigin('spool', 'rewards_pool::RewardsPool')
    }::rewards_pool::RewardsPool` as const
  }
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName: typeof RewardsPool.$typeName = RewardsPool.$typeName
  readonly $fullTypeName: `${string}::rewards_pool::RewardsPool<${PhantomToTypeStr<RewardType>}>`
  readonly $typeArgs: [PhantomToTypeStr<RewardType>]
  readonly $isPhantom: typeof RewardsPool.$isPhantom = RewardsPool.$isPhantom

  readonly id: ToField<UID>
  readonly spoolId: ToField<ID>
  readonly exchangeRateNumerator: ToField<'u64'>
  readonly exchangeRateDenominator: ToField<'u64'>
  readonly rewards: ToField<Balance<RewardType>>
  readonly claimedRewards: ToField<'u64'>

  private constructor(
    typeArgs: [PhantomToTypeStr<RewardType>],
    fields: RewardsPoolFields<RewardType>,
  ) {
    this.$fullTypeName = composeSuiType(
      RewardsPool.$typeName,
      ...typeArgs,
    ) as `${string}::rewards_pool::RewardsPool<${PhantomToTypeStr<RewardType>}>`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.spoolId = fields.spoolId
    this.exchangeRateNumerator = fields.exchangeRateNumerator
    this.exchangeRateDenominator = fields.exchangeRateDenominator
    this.rewards = fields.rewards
    this.claimedRewards = fields.claimedRewards
  }

  static reified<RewardType extends PhantomReified<PhantomTypeArgument>>(
    RewardType: RewardType,
  ): RewardsPoolReified<ToPhantomTypeArgument<RewardType>> {
    const reifiedBcs = RewardsPool.bcs
    return {
      get typeName() {
        return RewardsPool.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          RewardsPool.$typeName,
          ...[extractType(RewardType)],
        ) as `${string}::rewards_pool::RewardsPool<${PhantomToTypeStr<
          ToPhantomTypeArgument<RewardType>
        >}>`
      },
      get typeArgs() {
        return [extractType(RewardType)] as [PhantomToTypeStr<ToPhantomTypeArgument<RewardType>>]
      },
      isPhantom: RewardsPool.$isPhantom,
      reifiedTypeArgs: [RewardType],
      fromFields: (fields: Record<string, any>) => RewardsPool.fromFields(RewardType, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        RewardsPool.fromFieldsWithTypes(RewardType, item),
      fromBcs: (data: Uint8Array) => RewardsPool.fromFields(RewardType, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => RewardsPool.fromJSONField(RewardType, field),
      fromJSON: (json: Record<string, any>) => RewardsPool.fromJSON(RewardType, json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        RewardsPool.fromCoreObject(RewardType, obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        RewardsPool.fromSuiParsedData(RewardType, content),
      fromSuiObjectData: (content: SuiObjectData) =>
        RewardsPool.fromSuiObjectData(RewardType, content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        RewardsPool.fetch(client, RewardType, id),
      new: (fields: RewardsPoolFields<ToPhantomTypeArgument<RewardType>>) => {
        return new RewardsPool([extractType(RewardType)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof RewardsPool.reified {
    return RewardsPool.reified
  }

  static phantom<RewardType extends PhantomReified<PhantomTypeArgument>>(
    RewardType: RewardType,
  ): PhantomReified<ToTypeStr<RewardsPool<ToPhantomTypeArgument<RewardType>>>> {
    return phantom(RewardsPool.reified(RewardType))
  }

  static get p(): typeof RewardsPool.phantom {
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

  static get bcs(): ReturnType<typeof RewardsPool.instantiateBcs> {
    if (!RewardsPool.cachedBcs) {
      RewardsPool.cachedBcs = RewardsPool.instantiateBcs()
    }
    return RewardsPool.cachedBcs
  }

  static fromFields<RewardType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: RewardType,
    fields: Record<string, any>,
  ): RewardsPool<ToPhantomTypeArgument<RewardType>> {
    return RewardsPool.reified(typeArg).new({
      id: decodeFromFields(UID.reified(), fields.id),
      spoolId: decodeFromFields(ID.reified(), fields.spool_id),
      exchangeRateNumerator: decodeFromFields('u64', fields.exchange_rate_numerator),
      exchangeRateDenominator: decodeFromFields('u64', fields.exchange_rate_denominator),
      rewards: decodeFromFields(Balance.reified(typeArg), fields.rewards),
      claimedRewards: decodeFromFields('u64', fields.claimed_rewards),
    })
  }

  static fromFieldsWithTypes<RewardType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: RewardType,
    item: FieldsWithTypes,
  ): RewardsPool<ToPhantomTypeArgument<RewardType>> {
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
        item.fields.exchange_rate_denominator,
      ),
      rewards: decodeFromFieldsWithTypes(Balance.reified(typeArg), item.fields.rewards),
      claimedRewards: decodeFromFieldsWithTypes('u64', item.fields.claimed_rewards),
    })
  }

  static fromBcs<RewardType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: RewardType,
    data: Uint8Array,
  ): RewardsPool<ToPhantomTypeArgument<RewardType>> {
    return RewardsPool.fromFields(typeArg, RewardsPool.bcs.parse(data))
  }

  toJSONField(): RewardsPoolJSONField<RewardType> {
    return {
      id: this.id,
      spoolId: this.spoolId,
      exchangeRateNumerator: this.exchangeRateNumerator.toString(),
      exchangeRateDenominator: this.exchangeRateDenominator.toString(),
      rewards: this.rewards.toJSONField(),
      claimedRewards: this.claimedRewards.toString(),
    }
  }

  toJSON(): RewardsPoolJSON<RewardType> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<RewardType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: RewardType,
    field: any,
  ): RewardsPool<ToPhantomTypeArgument<RewardType>> {
    return RewardsPool.reified(typeArg).new({
      id: decodeFromJSONField(UID.reified(), field.id),
      spoolId: decodeFromJSONField(ID.reified(), field.spoolId),
      exchangeRateNumerator: decodeFromJSONField('u64', field.exchangeRateNumerator),
      exchangeRateDenominator: decodeFromJSONField('u64', field.exchangeRateDenominator),
      rewards: decodeFromJSONField(Balance.reified(typeArg), field.rewards),
      claimedRewards: decodeFromJSONField('u64', field.claimedRewards),
    })
  }

  static fromJSON<RewardType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: RewardType,
    json: Record<string, any>,
  ): RewardsPool<ToPhantomTypeArgument<RewardType>> {
    if (json.$typeName !== RewardsPool.$typeName) {
      throw new Error(
        `not a RewardsPool json object: expected '${RewardsPool.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(RewardsPool.$typeName, ...[extractType(typeArg)]),
      json.$typeArgs,
      [typeArg],
    )

    return RewardsPool.fromJSONField(typeArg, json)
  }

  static fromCoreObject<RewardType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: RewardType,
    obj: SuiClientTypes.Object<{ content: true }>,
  ): RewardsPool<ToPhantomTypeArgument<RewardType>> {
    if (!isRewardsPool(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a RewardsPool object`)
    }

    const gotTypeArgs = parseTypeName(obj.type).typeArgs
    if (gotTypeArgs.length !== 1) {
      throw new Error(
        `type argument mismatch: expected 1 type arguments but got '${gotTypeArgs.length}'`,
      )
    }
    for (let i = 0; i < 1; i++) {
      const gotTypeArg = compressSuiType(gotTypeArgs[i])
      const expectedTypeArg = compressSuiType(extractType([typeArg][i]))
      if (gotTypeArg !== expectedTypeArg) {
        throw new Error(
          `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
        )
      }
    }

    return RewardsPool.fromBcs(typeArg, obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link RewardsPool.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<RewardType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: RewardType,
    content: SuiParsedData,
  ): RewardsPool<ToPhantomTypeArgument<RewardType>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRewardsPool(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a RewardsPool object`)
    }
    return RewardsPool.fromFieldsWithTypes(typeArg, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link RewardsPool.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<RewardType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: RewardType,
    data: SuiObjectData,
  ): RewardsPool<ToPhantomTypeArgument<RewardType>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRewardsPool(data.bcs.type)) {
        throw new Error(`object at is not a RewardsPool object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 1) {
        throw new Error(
          `type argument mismatch: expected 1 type arguments but got '${gotTypeArgs.length}'`,
        )
      }
      for (let i = 0; i < 1; i++) {
        const gotTypeArg = compressSuiType(gotTypeArgs[i])
        const expectedTypeArg = compressSuiType(extractType([typeArg][i]))
        if (gotTypeArg !== expectedTypeArg) {
          throw new Error(
            `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
          )
        }
      }

      return RewardsPool.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RewardsPool.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<RewardType extends PhantomReified<PhantomTypeArgument>>(
    client: ClientWithCoreApi,
    typeArg: RewardType,
    id: string,
  ): Promise<RewardsPool<ToPhantomTypeArgument<RewardType>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isRewardsPool(object.type)) {
      throw new Error(`object at id ${id} is not a RewardsPool object`)
    }

    const gotTypeArgs = parseTypeName(object.type).typeArgs
    if (gotTypeArgs.length !== 1) {
      throw new Error(
        `type argument mismatch: expected 1 type arguments but got '${gotTypeArgs.length}'`,
      )
    }
    for (let i = 0; i < 1; i++) {
      const gotTypeArg = compressSuiType(gotTypeArgs[i])
      const expectedTypeArg = compressSuiType(extractType([typeArg][i]))
      if (gotTypeArg !== expectedTypeArg) {
        throw new Error(
          `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
        )
      }
    }

    return RewardsPool.fromBcs(typeArg, object.content)
  }
}
