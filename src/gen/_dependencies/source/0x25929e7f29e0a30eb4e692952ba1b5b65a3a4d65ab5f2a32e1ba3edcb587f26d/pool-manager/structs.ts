import * as reified from '../../../../_framework/reified'
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
import { TypeName } from '../../../../move-stdlib/type-name/structs'
import { ID, UID } from '../../../../sui/object/structs'
import { Table } from '../../../../sui/table/structs'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64, fromHEX, toHEX } from '@mysten/sui/utils'

/* ============================== PoolCreated =============================== */

export function isPoolCreated(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::pool_manager::PoolCreated`
}

export interface PoolCreatedFields {
  sender: ToField<'address'>
  poolId: ToField<ID>
  coinTypeX: ToField<TypeName>
  coinTypeY: ToField<TypeName>
  feeRate: ToField<'u64'>
  tickSpacing: ToField<'u32'>
}

export type PoolCreatedReified = Reified<PoolCreated, PoolCreatedFields>

export class PoolCreated implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::pool_manager::PoolCreated`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = PoolCreated.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::pool_manager::PoolCreated`
  readonly $typeArgs: []
  readonly $isPhantom = PoolCreated.$isPhantom

  readonly sender: ToField<'address'>
  readonly poolId: ToField<ID>
  readonly coinTypeX: ToField<TypeName>
  readonly coinTypeY: ToField<TypeName>
  readonly feeRate: ToField<'u64'>
  readonly tickSpacing: ToField<'u32'>

  private constructor(typeArgs: [], fields: PoolCreatedFields) {
    this.$fullTypeName = composeSuiType(
      PoolCreated.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::pool_manager::PoolCreated`
    this.$typeArgs = typeArgs

    this.sender = fields.sender
    this.poolId = fields.poolId
    this.coinTypeX = fields.coinTypeX
    this.coinTypeY = fields.coinTypeY
    this.feeRate = fields.feeRate
    this.tickSpacing = fields.tickSpacing
  }

  static reified(): PoolCreatedReified {
    return {
      typeName: PoolCreated.$typeName,
      fullTypeName: composeSuiType(
        PoolCreated.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::pool_manager::PoolCreated`,
      typeArgs: [] as [],
      isPhantom: PoolCreated.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PoolCreated.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PoolCreated.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PoolCreated.fromBcs(data),
      bcs: PoolCreated.bcs,
      fromJSONField: (field: any) => PoolCreated.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PoolCreated.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => PoolCreated.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PoolCreated.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => PoolCreated.fetch(client, id),
      new: (fields: PoolCreatedFields) => {
        return new PoolCreated([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return PoolCreated.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PoolCreated>> {
    return phantom(PoolCreated.reified())
  }
  static get p() {
    return PoolCreated.phantom()
  }

  static get bcs() {
    return bcs.struct('PoolCreated', {
      sender: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      pool_id: ID.bcs,
      coin_type_x: TypeName.bcs,
      coin_type_y: TypeName.bcs,
      fee_rate: bcs.u64(),
      tick_spacing: bcs.u32(),
    })
  }

  static fromFields(fields: Record<string, any>): PoolCreated {
    return PoolCreated.reified().new({
      sender: decodeFromFields('address', fields.sender),
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      coinTypeX: decodeFromFields(TypeName.reified(), fields.coin_type_x),
      coinTypeY: decodeFromFields(TypeName.reified(), fields.coin_type_y),
      feeRate: decodeFromFields('u64', fields.fee_rate),
      tickSpacing: decodeFromFields('u32', fields.tick_spacing),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PoolCreated {
    if (!isPoolCreated(item.type)) {
      throw new Error('not a PoolCreated type')
    }

    return PoolCreated.reified().new({
      sender: decodeFromFieldsWithTypes('address', item.fields.sender),
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      coinTypeX: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.coin_type_x),
      coinTypeY: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.coin_type_y),
      feeRate: decodeFromFieldsWithTypes('u64', item.fields.fee_rate),
      tickSpacing: decodeFromFieldsWithTypes('u32', item.fields.tick_spacing),
    })
  }

  static fromBcs(data: Uint8Array): PoolCreated {
    return PoolCreated.fromFields(PoolCreated.bcs.parse(data))
  }

  toJSONField() {
    return {
      sender: this.sender,
      poolId: this.poolId,
      coinTypeX: this.coinTypeX.toJSONField(),
      coinTypeY: this.coinTypeY.toJSONField(),
      feeRate: this.feeRate.toString(),
      tickSpacing: this.tickSpacing,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PoolCreated {
    return PoolCreated.reified().new({
      sender: decodeFromJSONField('address', field.sender),
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      coinTypeX: decodeFromJSONField(TypeName.reified(), field.coinTypeX),
      coinTypeY: decodeFromJSONField(TypeName.reified(), field.coinTypeY),
      feeRate: decodeFromJSONField('u64', field.feeRate),
      tickSpacing: decodeFromJSONField('u32', field.tickSpacing),
    })
  }

  static fromJSON(json: Record<string, any>): PoolCreated {
    if (json.$typeName !== PoolCreated.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return PoolCreated.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): PoolCreated {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPoolCreated(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PoolCreated object`)
    }
    return PoolCreated.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): PoolCreated {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPoolCreated(data.bcs.type)) {
        throw new Error(`object at is not a PoolCreated object`)
      }

      return PoolCreated.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PoolCreated.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<PoolCreated> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching PoolCreated object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isPoolCreated(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a PoolCreated object`)
    }

    return PoolCreated.fromSuiObjectData(res.data)
  }
}

/* ============================== FeeRateEnabled =============================== */

export function isFeeRateEnabled(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::pool_manager::FeeRateEnabled`
}

export interface FeeRateEnabledFields {
  sender: ToField<'address'>
  feeRate: ToField<'u64'>
  tickSpacing: ToField<'u32'>
}

export type FeeRateEnabledReified = Reified<FeeRateEnabled, FeeRateEnabledFields>

export class FeeRateEnabled implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::pool_manager::FeeRateEnabled`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = FeeRateEnabled.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::pool_manager::FeeRateEnabled`
  readonly $typeArgs: []
  readonly $isPhantom = FeeRateEnabled.$isPhantom

  readonly sender: ToField<'address'>
  readonly feeRate: ToField<'u64'>
  readonly tickSpacing: ToField<'u32'>

  private constructor(typeArgs: [], fields: FeeRateEnabledFields) {
    this.$fullTypeName = composeSuiType(
      FeeRateEnabled.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::pool_manager::FeeRateEnabled`
    this.$typeArgs = typeArgs

    this.sender = fields.sender
    this.feeRate = fields.feeRate
    this.tickSpacing = fields.tickSpacing
  }

  static reified(): FeeRateEnabledReified {
    return {
      typeName: FeeRateEnabled.$typeName,
      fullTypeName: composeSuiType(
        FeeRateEnabled.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::pool_manager::FeeRateEnabled`,
      typeArgs: [] as [],
      isPhantom: FeeRateEnabled.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => FeeRateEnabled.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => FeeRateEnabled.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => FeeRateEnabled.fromBcs(data),
      bcs: FeeRateEnabled.bcs,
      fromJSONField: (field: any) => FeeRateEnabled.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => FeeRateEnabled.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => FeeRateEnabled.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => FeeRateEnabled.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => FeeRateEnabled.fetch(client, id),
      new: (fields: FeeRateEnabledFields) => {
        return new FeeRateEnabled([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return FeeRateEnabled.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<FeeRateEnabled>> {
    return phantom(FeeRateEnabled.reified())
  }
  static get p() {
    return FeeRateEnabled.phantom()
  }

  static get bcs() {
    return bcs.struct('FeeRateEnabled', {
      sender: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      fee_rate: bcs.u64(),
      tick_spacing: bcs.u32(),
    })
  }

  static fromFields(fields: Record<string, any>): FeeRateEnabled {
    return FeeRateEnabled.reified().new({
      sender: decodeFromFields('address', fields.sender),
      feeRate: decodeFromFields('u64', fields.fee_rate),
      tickSpacing: decodeFromFields('u32', fields.tick_spacing),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): FeeRateEnabled {
    if (!isFeeRateEnabled(item.type)) {
      throw new Error('not a FeeRateEnabled type')
    }

    return FeeRateEnabled.reified().new({
      sender: decodeFromFieldsWithTypes('address', item.fields.sender),
      feeRate: decodeFromFieldsWithTypes('u64', item.fields.fee_rate),
      tickSpacing: decodeFromFieldsWithTypes('u32', item.fields.tick_spacing),
    })
  }

  static fromBcs(data: Uint8Array): FeeRateEnabled {
    return FeeRateEnabled.fromFields(FeeRateEnabled.bcs.parse(data))
  }

  toJSONField() {
    return {
      sender: this.sender,
      feeRate: this.feeRate.toString(),
      tickSpacing: this.tickSpacing,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): FeeRateEnabled {
    return FeeRateEnabled.reified().new({
      sender: decodeFromJSONField('address', field.sender),
      feeRate: decodeFromJSONField('u64', field.feeRate),
      tickSpacing: decodeFromJSONField('u32', field.tickSpacing),
    })
  }

  static fromJSON(json: Record<string, any>): FeeRateEnabled {
    if (json.$typeName !== FeeRateEnabled.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return FeeRateEnabled.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): FeeRateEnabled {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isFeeRateEnabled(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a FeeRateEnabled object`)
    }
    return FeeRateEnabled.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): FeeRateEnabled {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isFeeRateEnabled(data.bcs.type)) {
        throw new Error(`object at is not a FeeRateEnabled object`)
      }

      return FeeRateEnabled.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return FeeRateEnabled.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<FeeRateEnabled> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching FeeRateEnabled object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isFeeRateEnabled(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a FeeRateEnabled object`)
    }

    return FeeRateEnabled.fromSuiObjectData(res.data)
  }
}

/* ============================== PoolDfKey =============================== */

export function isPoolDfKey(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::pool_manager::PoolDfKey`
}

export interface PoolDfKeyFields {
  coinTypeX: ToField<TypeName>
  coinTypeY: ToField<TypeName>
  feeRate: ToField<'u64'>
}

export type PoolDfKeyReified = Reified<PoolDfKey, PoolDfKeyFields>

export class PoolDfKey implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::pool_manager::PoolDfKey`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = PoolDfKey.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::pool_manager::PoolDfKey`
  readonly $typeArgs: []
  readonly $isPhantom = PoolDfKey.$isPhantom

  readonly coinTypeX: ToField<TypeName>
  readonly coinTypeY: ToField<TypeName>
  readonly feeRate: ToField<'u64'>

  private constructor(typeArgs: [], fields: PoolDfKeyFields) {
    this.$fullTypeName = composeSuiType(
      PoolDfKey.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::pool_manager::PoolDfKey`
    this.$typeArgs = typeArgs

    this.coinTypeX = fields.coinTypeX
    this.coinTypeY = fields.coinTypeY
    this.feeRate = fields.feeRate
  }

  static reified(): PoolDfKeyReified {
    return {
      typeName: PoolDfKey.$typeName,
      fullTypeName: composeSuiType(
        PoolDfKey.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::pool_manager::PoolDfKey`,
      typeArgs: [] as [],
      isPhantom: PoolDfKey.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PoolDfKey.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PoolDfKey.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PoolDfKey.fromBcs(data),
      bcs: PoolDfKey.bcs,
      fromJSONField: (field: any) => PoolDfKey.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PoolDfKey.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => PoolDfKey.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PoolDfKey.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => PoolDfKey.fetch(client, id),
      new: (fields: PoolDfKeyFields) => {
        return new PoolDfKey([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return PoolDfKey.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PoolDfKey>> {
    return phantom(PoolDfKey.reified())
  }
  static get p() {
    return PoolDfKey.phantom()
  }

  static get bcs() {
    return bcs.struct('PoolDfKey', {
      coin_type_x: TypeName.bcs,
      coin_type_y: TypeName.bcs,
      fee_rate: bcs.u64(),
    })
  }

  static fromFields(fields: Record<string, any>): PoolDfKey {
    return PoolDfKey.reified().new({
      coinTypeX: decodeFromFields(TypeName.reified(), fields.coin_type_x),
      coinTypeY: decodeFromFields(TypeName.reified(), fields.coin_type_y),
      feeRate: decodeFromFields('u64', fields.fee_rate),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PoolDfKey {
    if (!isPoolDfKey(item.type)) {
      throw new Error('not a PoolDfKey type')
    }

    return PoolDfKey.reified().new({
      coinTypeX: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.coin_type_x),
      coinTypeY: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.coin_type_y),
      feeRate: decodeFromFieldsWithTypes('u64', item.fields.fee_rate),
    })
  }

  static fromBcs(data: Uint8Array): PoolDfKey {
    return PoolDfKey.fromFields(PoolDfKey.bcs.parse(data))
  }

  toJSONField() {
    return {
      coinTypeX: this.coinTypeX.toJSONField(),
      coinTypeY: this.coinTypeY.toJSONField(),
      feeRate: this.feeRate.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PoolDfKey {
    return PoolDfKey.reified().new({
      coinTypeX: decodeFromJSONField(TypeName.reified(), field.coinTypeX),
      coinTypeY: decodeFromJSONField(TypeName.reified(), field.coinTypeY),
      feeRate: decodeFromJSONField('u64', field.feeRate),
    })
  }

  static fromJSON(json: Record<string, any>): PoolDfKey {
    if (json.$typeName !== PoolDfKey.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return PoolDfKey.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): PoolDfKey {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPoolDfKey(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PoolDfKey object`)
    }
    return PoolDfKey.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): PoolDfKey {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPoolDfKey(data.bcs.type)) {
        throw new Error(`object at is not a PoolDfKey object`)
      }

      return PoolDfKey.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PoolDfKey.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<PoolDfKey> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching PoolDfKey object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isPoolDfKey(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a PoolDfKey object`)
    }

    return PoolDfKey.fromSuiObjectData(res.data)
  }
}

/* ============================== PoolRegistry =============================== */

export function isPoolRegistry(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::pool_manager::PoolRegistry`
}

export interface PoolRegistryFields {
  id: ToField<UID>
  feeAmountTickSpacing: ToField<Table<'u64', 'u32'>>
  numPools: ToField<'u64'>
}

export type PoolRegistryReified = Reified<PoolRegistry, PoolRegistryFields>

export class PoolRegistry implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::pool_manager::PoolRegistry`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = PoolRegistry.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::pool_manager::PoolRegistry`
  readonly $typeArgs: []
  readonly $isPhantom = PoolRegistry.$isPhantom

  readonly id: ToField<UID>
  readonly feeAmountTickSpacing: ToField<Table<'u64', 'u32'>>
  readonly numPools: ToField<'u64'>

  private constructor(typeArgs: [], fields: PoolRegistryFields) {
    this.$fullTypeName = composeSuiType(
      PoolRegistry.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::pool_manager::PoolRegistry`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.feeAmountTickSpacing = fields.feeAmountTickSpacing
    this.numPools = fields.numPools
  }

  static reified(): PoolRegistryReified {
    return {
      typeName: PoolRegistry.$typeName,
      fullTypeName: composeSuiType(
        PoolRegistry.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::pool_manager::PoolRegistry`,
      typeArgs: [] as [],
      isPhantom: PoolRegistry.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PoolRegistry.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PoolRegistry.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PoolRegistry.fromBcs(data),
      bcs: PoolRegistry.bcs,
      fromJSONField: (field: any) => PoolRegistry.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PoolRegistry.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => PoolRegistry.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PoolRegistry.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => PoolRegistry.fetch(client, id),
      new: (fields: PoolRegistryFields) => {
        return new PoolRegistry([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return PoolRegistry.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PoolRegistry>> {
    return phantom(PoolRegistry.reified())
  }
  static get p() {
    return PoolRegistry.phantom()
  }

  static get bcs() {
    return bcs.struct('PoolRegistry', {
      id: UID.bcs,
      fee_amount_tick_spacing: Table.bcs,
      num_pools: bcs.u64(),
    })
  }

  static fromFields(fields: Record<string, any>): PoolRegistry {
    return PoolRegistry.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      feeAmountTickSpacing: decodeFromFields(
        Table.reified(reified.phantom('u64'), reified.phantom('u32')),
        fields.fee_amount_tick_spacing
      ),
      numPools: decodeFromFields('u64', fields.num_pools),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PoolRegistry {
    if (!isPoolRegistry(item.type)) {
      throw new Error('not a PoolRegistry type')
    }

    return PoolRegistry.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      feeAmountTickSpacing: decodeFromFieldsWithTypes(
        Table.reified(reified.phantom('u64'), reified.phantom('u32')),
        item.fields.fee_amount_tick_spacing
      ),
      numPools: decodeFromFieldsWithTypes('u64', item.fields.num_pools),
    })
  }

  static fromBcs(data: Uint8Array): PoolRegistry {
    return PoolRegistry.fromFields(PoolRegistry.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      feeAmountTickSpacing: this.feeAmountTickSpacing.toJSONField(),
      numPools: this.numPools.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PoolRegistry {
    return PoolRegistry.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      feeAmountTickSpacing: decodeFromJSONField(
        Table.reified(reified.phantom('u64'), reified.phantom('u32')),
        field.feeAmountTickSpacing
      ),
      numPools: decodeFromJSONField('u64', field.numPools),
    })
  }

  static fromJSON(json: Record<string, any>): PoolRegistry {
    if (json.$typeName !== PoolRegistry.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return PoolRegistry.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): PoolRegistry {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPoolRegistry(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PoolRegistry object`)
    }
    return PoolRegistry.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): PoolRegistry {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPoolRegistry(data.bcs.type)) {
        throw new Error(`object at is not a PoolRegistry object`)
      }

      return PoolRegistry.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PoolRegistry.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<PoolRegistry> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching PoolRegistry object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isPoolRegistry(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a PoolRegistry object`)
    }

    return PoolRegistry.fromSuiObjectData(res.data)
  }
}
