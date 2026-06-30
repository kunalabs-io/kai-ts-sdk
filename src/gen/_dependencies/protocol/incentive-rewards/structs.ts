import { bcs } from '@mysten/sui/bcs'
import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import type { SuiObjectData, SuiParsedData } from '@mysten/sui/jsonRpc'
import { fromBase64 } from '@mysten/sui/utils'
import { getTypeOrigin } from '../../../_envs'
import {
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  phantom,
  PhantomReified,
  Reified,
  StructClass,
  ToField,
  ToJSON,
  ToTypeStr,
} from '../../../_framework/reified'
import { composeSuiType, compressSuiType, FieldsWithTypes } from '../../../_framework/util'
import { FixedPoint32 } from '../../../std/fixed-point32/structs'
import { TypeName } from '../../../std/type-name/structs'

/* ============================== RewardFactors =============================== */

export function isRewardFactors(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('protocol', 'incentive_rewards::RewardFactors')
    }::incentive_rewards::RewardFactors`
}

export interface RewardFactorsFields {
  dummyField: ToField<'bool'>
}

export type RewardFactorsReified = Reified<RewardFactors, RewardFactorsFields>

export type RewardFactorsJSONField = {
  dummyField: boolean
}

export type RewardFactorsJSON = {
  $typeName: typeof RewardFactors.$typeName
  $typeArgs: []
} & RewardFactorsJSONField

export class RewardFactors implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::incentive_rewards::RewardFactors` {
    return `${
      getTypeOrigin('protocol', 'incentive_rewards::RewardFactors')
    }::incentive_rewards::RewardFactors` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof RewardFactors.$typeName = RewardFactors.$typeName
  readonly $fullTypeName: `${string}::incentive_rewards::RewardFactors`
  readonly $typeArgs: []
  readonly $isPhantom: typeof RewardFactors.$isPhantom = RewardFactors.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: RewardFactorsFields) {
    this.$fullTypeName = composeSuiType(
      RewardFactors.$typeName,
      ...typeArgs,
    ) as `${string}::incentive_rewards::RewardFactors`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): RewardFactorsReified {
    const reifiedBcs = RewardFactors.bcs
    return {
      get typeName() {
        return RewardFactors.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          RewardFactors.$typeName,
          ...[],
        ) as `${string}::incentive_rewards::RewardFactors`
      },
      typeArgs: [] as [],
      isPhantom: RewardFactors.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => RewardFactors.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => RewardFactors.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => RewardFactors.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => RewardFactors.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => RewardFactors.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        RewardFactors.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => RewardFactors.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => RewardFactors.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => RewardFactors.fetch(client, id),
      new: (fields: RewardFactorsFields) => {
        return new RewardFactors([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): RewardFactorsReified {
    return RewardFactors.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RewardFactors>> {
    return phantom(RewardFactors.reified())
  }

  static get p(): PhantomReified<ToTypeStr<RewardFactors>> {
    return RewardFactors.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('RewardFactors', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof RewardFactors.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof RewardFactors.instantiateBcs> {
    if (!RewardFactors.cachedBcs) {
      RewardFactors.cachedBcs = RewardFactors.instantiateBcs()
    }
    return RewardFactors.cachedBcs
  }

  static fromFields(fields: Record<string, any>): RewardFactors {
    return RewardFactors.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): RewardFactors {
    if (!isRewardFactors(item.type)) {
      throw new Error('not a RewardFactors type')
    }

    return RewardFactors.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): RewardFactors {
    return RewardFactors.fromFields(RewardFactors.bcs.parse(data))
  }

  toJSONField(): RewardFactorsJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): RewardFactorsJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): RewardFactors {
    return RewardFactors.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): RewardFactors {
    if (json.$typeName !== RewardFactors.$typeName) {
      throw new Error(
        `not a RewardFactors json object: expected '${RewardFactors.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return RewardFactors.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): RewardFactors {
    if (!isRewardFactors(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a RewardFactors object`)
    }
    return RewardFactors.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link RewardFactors.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): RewardFactors {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRewardFactors(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a RewardFactors object`)
    }
    return RewardFactors.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link RewardFactors.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): RewardFactors {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRewardFactors(data.bcs.type)) {
        throw new Error(`object at is not a RewardFactors object`)
      }

      return RewardFactors.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RewardFactors.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<RewardFactors> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isRewardFactors(object.type)) {
      throw new Error(`object at id ${id} is not a RewardFactors object`)
    }
    return RewardFactors.fromBcs(object.content)
  }
}

/* ============================== RewardFactor =============================== */

export function isRewardFactor(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('protocol', 'incentive_rewards::RewardFactor')
    }::incentive_rewards::RewardFactor`
}

export interface RewardFactorFields {
  coinType: ToField<TypeName>
  rewardFactor: ToField<FixedPoint32>
}

export type RewardFactorReified = Reified<RewardFactor, RewardFactorFields>

export type RewardFactorJSONField = {
  coinType: string
  rewardFactor: ToJSON<FixedPoint32>
}

export type RewardFactorJSON = {
  $typeName: typeof RewardFactor.$typeName
  $typeArgs: []
} & RewardFactorJSONField

export class RewardFactor implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::incentive_rewards::RewardFactor` {
    return `${
      getTypeOrigin('protocol', 'incentive_rewards::RewardFactor')
    }::incentive_rewards::RewardFactor` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof RewardFactor.$typeName = RewardFactor.$typeName
  readonly $fullTypeName: `${string}::incentive_rewards::RewardFactor`
  readonly $typeArgs: []
  readonly $isPhantom: typeof RewardFactor.$isPhantom = RewardFactor.$isPhantom

  readonly coinType: ToField<TypeName>
  readonly rewardFactor: ToField<FixedPoint32>

  private constructor(typeArgs: [], fields: RewardFactorFields) {
    this.$fullTypeName = composeSuiType(
      RewardFactor.$typeName,
      ...typeArgs,
    ) as `${string}::incentive_rewards::RewardFactor`
    this.$typeArgs = typeArgs

    this.coinType = fields.coinType
    this.rewardFactor = fields.rewardFactor
  }

  static reified(): RewardFactorReified {
    const reifiedBcs = RewardFactor.bcs
    return {
      get typeName() {
        return RewardFactor.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          RewardFactor.$typeName,
          ...[],
        ) as `${string}::incentive_rewards::RewardFactor`
      },
      typeArgs: [] as [],
      isPhantom: RewardFactor.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => RewardFactor.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => RewardFactor.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => RewardFactor.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => RewardFactor.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => RewardFactor.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        RewardFactor.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => RewardFactor.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => RewardFactor.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => RewardFactor.fetch(client, id),
      new: (fields: RewardFactorFields) => {
        return new RewardFactor([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): RewardFactorReified {
    return RewardFactor.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RewardFactor>> {
    return phantom(RewardFactor.reified())
  }

  static get p(): PhantomReified<ToTypeStr<RewardFactor>> {
    return RewardFactor.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('RewardFactor', {
      coin_type: TypeName.bcs,
      reward_factor: FixedPoint32.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof RewardFactor.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof RewardFactor.instantiateBcs> {
    if (!RewardFactor.cachedBcs) {
      RewardFactor.cachedBcs = RewardFactor.instantiateBcs()
    }
    return RewardFactor.cachedBcs
  }

  static fromFields(fields: Record<string, any>): RewardFactor {
    return RewardFactor.reified().new({
      coinType: decodeFromFields(TypeName.reified(), fields.coin_type),
      rewardFactor: decodeFromFields(FixedPoint32.reified(), fields.reward_factor),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): RewardFactor {
    if (!isRewardFactor(item.type)) {
      throw new Error('not a RewardFactor type')
    }

    return RewardFactor.reified().new({
      coinType: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.coin_type),
      rewardFactor: decodeFromFieldsWithTypes(FixedPoint32.reified(), item.fields.reward_factor),
    })
  }

  static fromBcs(data: Uint8Array): RewardFactor {
    return RewardFactor.fromFields(RewardFactor.bcs.parse(data))
  }

  toJSONField(): RewardFactorJSONField {
    return {
      coinType: this.coinType,
      rewardFactor: this.rewardFactor.toJSONField(),
    }
  }

  toJSON(): RewardFactorJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): RewardFactor {
    return RewardFactor.reified().new({
      coinType: decodeFromJSONField(TypeName.reified(), field.coinType),
      rewardFactor: decodeFromJSONField(FixedPoint32.reified(), field.rewardFactor),
    })
  }

  static fromJSON(json: Record<string, any>): RewardFactor {
    if (json.$typeName !== RewardFactor.$typeName) {
      throw new Error(
        `not a RewardFactor json object: expected '${RewardFactor.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return RewardFactor.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): RewardFactor {
    if (!isRewardFactor(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a RewardFactor object`)
    }
    return RewardFactor.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link RewardFactor.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): RewardFactor {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRewardFactor(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a RewardFactor object`)
    }
    return RewardFactor.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link RewardFactor.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): RewardFactor {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRewardFactor(data.bcs.type)) {
        throw new Error(`object at is not a RewardFactor object`)
      }

      return RewardFactor.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RewardFactor.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<RewardFactor> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isRewardFactor(object.type)) {
      throw new Error(`object at id ${id} is not a RewardFactor object`)
    }
    return RewardFactor.fromBcs(object.content)
  }
}
