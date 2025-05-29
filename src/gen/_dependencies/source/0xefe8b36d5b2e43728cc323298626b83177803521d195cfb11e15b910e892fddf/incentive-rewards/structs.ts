import {
  PhantomReified,
  Reified,
  StructClass,
  ToField,
  ToTypeStr,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  phantom,
} from '../../../../_framework/reified'
import { FieldsWithTypes, composeSuiType, compressSuiType } from '../../../../_framework/util'
import { FixedPoint32 } from '../../../../move-stdlib/fixed-point32/structs'
import { TypeName } from '../../../../move-stdlib/type-name/structs'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== RewardFactors =============================== */

export function isRewardFactors(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::incentive_rewards::RewardFactors`
}

export interface RewardFactorsFields {
  dummyField: ToField<'bool'>
}

export type RewardFactorsReified = Reified<RewardFactors, RewardFactorsFields>

export class RewardFactors implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::incentive_rewards::RewardFactors`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = RewardFactors.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::incentive_rewards::RewardFactors`
  readonly $typeArgs: []
  readonly $isPhantom = RewardFactors.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: RewardFactorsFields) {
    this.$fullTypeName = composeSuiType(
      RewardFactors.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::incentive_rewards::RewardFactors`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): RewardFactorsReified {
    return {
      typeName: RewardFactors.$typeName,
      fullTypeName: composeSuiType(
        RewardFactors.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::incentive_rewards::RewardFactors`,
      typeArgs: [] as [],
      isPhantom: RewardFactors.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => RewardFactors.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => RewardFactors.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => RewardFactors.fromBcs(data),
      bcs: RewardFactors.bcs,
      fromJSONField: (field: any) => RewardFactors.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => RewardFactors.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => RewardFactors.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => RewardFactors.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => RewardFactors.fetch(client, id),
      new: (fields: RewardFactorsFields) => {
        return new RewardFactors([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return RewardFactors.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RewardFactors>> {
    return phantom(RewardFactors.reified())
  }
  static get p() {
    return RewardFactors.phantom()
  }

  static get bcs() {
    return bcs.struct('RewardFactors', {
      dummy_field: bcs.bool(),
    })
  }

  static fromFields(fields: Record<string, any>): RewardFactors {
    return RewardFactors.reified().new({ dummyField: decodeFromFields('bool', fields.dummy_field) })
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

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): RewardFactors {
    return RewardFactors.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): RewardFactors {
    if (json.$typeName !== RewardFactors.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return RewardFactors.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): RewardFactors {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRewardFactors(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a RewardFactors object`)
    }
    return RewardFactors.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): RewardFactors {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRewardFactors(data.bcs.type)) {
        throw new Error(`object at is not a RewardFactors object`)
      }

      return RewardFactors.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RewardFactors.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<RewardFactors> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching RewardFactors object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isRewardFactors(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a RewardFactors object`)
    }

    return RewardFactors.fromSuiObjectData(res.data)
  }
}

/* ============================== RewardFactor =============================== */

export function isRewardFactor(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::incentive_rewards::RewardFactor`
}

export interface RewardFactorFields {
  coinType: ToField<TypeName>
  rewardFactor: ToField<FixedPoint32>
}

export type RewardFactorReified = Reified<RewardFactor, RewardFactorFields>

export class RewardFactor implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::incentive_rewards::RewardFactor`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = RewardFactor.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::incentive_rewards::RewardFactor`
  readonly $typeArgs: []
  readonly $isPhantom = RewardFactor.$isPhantom

  readonly coinType: ToField<TypeName>
  readonly rewardFactor: ToField<FixedPoint32>

  private constructor(typeArgs: [], fields: RewardFactorFields) {
    this.$fullTypeName = composeSuiType(
      RewardFactor.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::incentive_rewards::RewardFactor`
    this.$typeArgs = typeArgs

    this.coinType = fields.coinType
    this.rewardFactor = fields.rewardFactor
  }

  static reified(): RewardFactorReified {
    return {
      typeName: RewardFactor.$typeName,
      fullTypeName: composeSuiType(
        RewardFactor.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::incentive_rewards::RewardFactor`,
      typeArgs: [] as [],
      isPhantom: RewardFactor.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => RewardFactor.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => RewardFactor.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => RewardFactor.fromBcs(data),
      bcs: RewardFactor.bcs,
      fromJSONField: (field: any) => RewardFactor.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => RewardFactor.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => RewardFactor.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => RewardFactor.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => RewardFactor.fetch(client, id),
      new: (fields: RewardFactorFields) => {
        return new RewardFactor([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return RewardFactor.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RewardFactor>> {
    return phantom(RewardFactor.reified())
  }
  static get p() {
    return RewardFactor.phantom()
  }

  static get bcs() {
    return bcs.struct('RewardFactor', {
      coin_type: TypeName.bcs,
      reward_factor: FixedPoint32.bcs,
    })
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

  toJSONField() {
    return {
      coinType: this.coinType.toJSONField(),
      rewardFactor: this.rewardFactor.toJSONField(),
    }
  }

  toJSON() {
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
      throw new Error('not a WithTwoGenerics json object')
    }

    return RewardFactor.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): RewardFactor {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRewardFactor(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a RewardFactor object`)
    }
    return RewardFactor.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): RewardFactor {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRewardFactor(data.bcs.type)) {
        throw new Error(`object at is not a RewardFactor object`)
      }

      return RewardFactor.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RewardFactor.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<RewardFactor> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching RewardFactor object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isRewardFactor(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a RewardFactor object`)
    }

    return RewardFactor.fromSuiObjectData(res.data)
  }
}
