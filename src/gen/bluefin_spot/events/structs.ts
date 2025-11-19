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
} from '../../_framework/reified'
import { FieldsWithTypes, composeSuiType, compressSuiType } from '../../_framework/util'
import { I128 } from '../../integer-mate/i128/structs'
import { I32 } from '../../integer-mate/i32/structs'
import { String } from '../../move-stdlib/string/structs'
import { ID } from '../../sui/object/structs'
import { PKG_V1, PKG_V2, PKG_V4, PKG_V7, PKG_V8 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64, fromHEX, toHEX } from '@mysten/sui/utils'

/* ============================== AdminCapTransferred =============================== */

export function isAdminCapTransferred(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::events::AdminCapTransferred`
}

export interface AdminCapTransferredFields {
  owner: ToField<'address'>
}

export type AdminCapTransferredReified = Reified<AdminCapTransferred, AdminCapTransferredFields>

export class AdminCapTransferred implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::events::AdminCapTransferred`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = AdminCapTransferred.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::events::AdminCapTransferred`
  readonly $typeArgs: []
  readonly $isPhantom = AdminCapTransferred.$isPhantom

  readonly owner: ToField<'address'>

  private constructor(typeArgs: [], fields: AdminCapTransferredFields) {
    this.$fullTypeName = composeSuiType(
      AdminCapTransferred.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::events::AdminCapTransferred`
    this.$typeArgs = typeArgs

    this.owner = fields.owner
  }

  static reified(): AdminCapTransferredReified {
    const reifiedBcs = AdminCapTransferred.bcs
    return {
      typeName: AdminCapTransferred.$typeName,
      fullTypeName: composeSuiType(
        AdminCapTransferred.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::events::AdminCapTransferred`,
      typeArgs: [] as [],
      isPhantom: AdminCapTransferred.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AdminCapTransferred.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AdminCapTransferred.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AdminCapTransferred.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AdminCapTransferred.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AdminCapTransferred.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => AdminCapTransferred.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AdminCapTransferred.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => AdminCapTransferred.fetch(client, id),
      new: (fields: AdminCapTransferredFields) => {
        return new AdminCapTransferred([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return AdminCapTransferred.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AdminCapTransferred>> {
    return phantom(AdminCapTransferred.reified())
  }
  static get p() {
    return AdminCapTransferred.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AdminCapTransferred', {
      owner: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
    })
  }

  private static cachedBcs: ReturnType<typeof AdminCapTransferred.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof AdminCapTransferred.instantiateBcs> {
    if (!AdminCapTransferred.cachedBcs) {
      AdminCapTransferred.cachedBcs = AdminCapTransferred.instantiateBcs()
    }
    return AdminCapTransferred.cachedBcs
  }

  static fromFields(fields: Record<string, any>): AdminCapTransferred {
    return AdminCapTransferred.reified().new({ owner: decodeFromFields('address', fields.owner) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): AdminCapTransferred {
    if (!isAdminCapTransferred(item.type)) {
      throw new Error('not a AdminCapTransferred type')
    }

    return AdminCapTransferred.reified().new({
      owner: decodeFromFieldsWithTypes('address', item.fields.owner),
    })
  }

  static fromBcs(data: Uint8Array): AdminCapTransferred {
    return AdminCapTransferred.fromFields(AdminCapTransferred.bcs.parse(data))
  }

  toJSONField() {
    return {
      owner: this.owner,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AdminCapTransferred {
    return AdminCapTransferred.reified().new({ owner: decodeFromJSONField('address', field.owner) })
  }

  static fromJSON(json: Record<string, any>): AdminCapTransferred {
    if (json.$typeName !== AdminCapTransferred.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return AdminCapTransferred.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): AdminCapTransferred {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAdminCapTransferred(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AdminCapTransferred object`)
    }
    return AdminCapTransferred.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): AdminCapTransferred {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAdminCapTransferred(data.bcs.type)) {
        throw new Error(`object at is not a AdminCapTransferred object`)
      }

      return AdminCapTransferred.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AdminCapTransferred.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<AdminCapTransferred> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching AdminCapTransferred object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isAdminCapTransferred(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a AdminCapTransferred object`)
    }

    return AdminCapTransferred.fromSuiObjectData(res.data)
  }
}

/* ============================== ProtocolFeeCapTransferred =============================== */

export function isProtocolFeeCapTransferred(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::events::ProtocolFeeCapTransferred`
}

export interface ProtocolFeeCapTransferredFields {
  owner: ToField<'address'>
}

export type ProtocolFeeCapTransferredReified = Reified<
  ProtocolFeeCapTransferred,
  ProtocolFeeCapTransferredFields
>

export class ProtocolFeeCapTransferred implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::events::ProtocolFeeCapTransferred`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = ProtocolFeeCapTransferred.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::events::ProtocolFeeCapTransferred`
  readonly $typeArgs: []
  readonly $isPhantom = ProtocolFeeCapTransferred.$isPhantom

  readonly owner: ToField<'address'>

  private constructor(typeArgs: [], fields: ProtocolFeeCapTransferredFields) {
    this.$fullTypeName = composeSuiType(
      ProtocolFeeCapTransferred.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::events::ProtocolFeeCapTransferred`
    this.$typeArgs = typeArgs

    this.owner = fields.owner
  }

  static reified(): ProtocolFeeCapTransferredReified {
    const reifiedBcs = ProtocolFeeCapTransferred.bcs
    return {
      typeName: ProtocolFeeCapTransferred.$typeName,
      fullTypeName: composeSuiType(
        ProtocolFeeCapTransferred.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::events::ProtocolFeeCapTransferred`,
      typeArgs: [] as [],
      isPhantom: ProtocolFeeCapTransferred.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ProtocolFeeCapTransferred.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        ProtocolFeeCapTransferred.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ProtocolFeeCapTransferred.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ProtocolFeeCapTransferred.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ProtocolFeeCapTransferred.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        ProtocolFeeCapTransferred.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        ProtocolFeeCapTransferred.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => ProtocolFeeCapTransferred.fetch(client, id),
      new: (fields: ProtocolFeeCapTransferredFields) => {
        return new ProtocolFeeCapTransferred([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return ProtocolFeeCapTransferred.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ProtocolFeeCapTransferred>> {
    return phantom(ProtocolFeeCapTransferred.reified())
  }
  static get p() {
    return ProtocolFeeCapTransferred.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ProtocolFeeCapTransferred', {
      owner: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
    })
  }

  private static cachedBcs: ReturnType<typeof ProtocolFeeCapTransferred.instantiateBcs> | null =
    null

  static get bcs(): ReturnType<typeof ProtocolFeeCapTransferred.instantiateBcs> {
    if (!ProtocolFeeCapTransferred.cachedBcs) {
      ProtocolFeeCapTransferred.cachedBcs = ProtocolFeeCapTransferred.instantiateBcs()
    }
    return ProtocolFeeCapTransferred.cachedBcs
  }

  static fromFields(fields: Record<string, any>): ProtocolFeeCapTransferred {
    return ProtocolFeeCapTransferred.reified().new({
      owner: decodeFromFields('address', fields.owner),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ProtocolFeeCapTransferred {
    if (!isProtocolFeeCapTransferred(item.type)) {
      throw new Error('not a ProtocolFeeCapTransferred type')
    }

    return ProtocolFeeCapTransferred.reified().new({
      owner: decodeFromFieldsWithTypes('address', item.fields.owner),
    })
  }

  static fromBcs(data: Uint8Array): ProtocolFeeCapTransferred {
    return ProtocolFeeCapTransferred.fromFields(ProtocolFeeCapTransferred.bcs.parse(data))
  }

  toJSONField() {
    return {
      owner: this.owner,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ProtocolFeeCapTransferred {
    return ProtocolFeeCapTransferred.reified().new({
      owner: decodeFromJSONField('address', field.owner),
    })
  }

  static fromJSON(json: Record<string, any>): ProtocolFeeCapTransferred {
    if (json.$typeName !== ProtocolFeeCapTransferred.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return ProtocolFeeCapTransferred.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): ProtocolFeeCapTransferred {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isProtocolFeeCapTransferred(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a ProtocolFeeCapTransferred object`
      )
    }
    return ProtocolFeeCapTransferred.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): ProtocolFeeCapTransferred {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isProtocolFeeCapTransferred(data.bcs.type)) {
        throw new Error(`object at is not a ProtocolFeeCapTransferred object`)
      }

      return ProtocolFeeCapTransferred.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ProtocolFeeCapTransferred.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<ProtocolFeeCapTransferred> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(
        `error fetching ProtocolFeeCapTransferred object at id ${id}: ${res.error.code}`
      )
    }
    if (
      res.data?.bcs?.dataType !== 'moveObject' ||
      !isProtocolFeeCapTransferred(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a ProtocolFeeCapTransferred object`)
    }

    return ProtocolFeeCapTransferred.fromSuiObjectData(res.data)
  }
}

/* ============================== PoolCreated =============================== */

export function isPoolCreated(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::events::PoolCreated`
}

export interface PoolCreatedFields {
  id: ToField<ID>
  coinA: ToField<String>
  coinASymbol: ToField<String>
  coinADecimals: ToField<'u8'>
  coinAUrl: ToField<String>
  coinB: ToField<String>
  coinBSymbol: ToField<String>
  coinBDecimals: ToField<'u8'>
  coinBUrl: ToField<String>
  currentSqrtPrice: ToField<'u128'>
  currentTickIndex: ToField<I32>
  tickSpacing: ToField<'u32'>
  feeRate: ToField<'u64'>
  protocolFeeShare: ToField<'u64'>
}

export type PoolCreatedReified = Reified<PoolCreated, PoolCreatedFields>

export class PoolCreated implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::events::PoolCreated`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = PoolCreated.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::events::PoolCreated`
  readonly $typeArgs: []
  readonly $isPhantom = PoolCreated.$isPhantom

  readonly id: ToField<ID>
  readonly coinA: ToField<String>
  readonly coinASymbol: ToField<String>
  readonly coinADecimals: ToField<'u8'>
  readonly coinAUrl: ToField<String>
  readonly coinB: ToField<String>
  readonly coinBSymbol: ToField<String>
  readonly coinBDecimals: ToField<'u8'>
  readonly coinBUrl: ToField<String>
  readonly currentSqrtPrice: ToField<'u128'>
  readonly currentTickIndex: ToField<I32>
  readonly tickSpacing: ToField<'u32'>
  readonly feeRate: ToField<'u64'>
  readonly protocolFeeShare: ToField<'u64'>

  private constructor(typeArgs: [], fields: PoolCreatedFields) {
    this.$fullTypeName = composeSuiType(
      PoolCreated.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::events::PoolCreated`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.coinA = fields.coinA
    this.coinASymbol = fields.coinASymbol
    this.coinADecimals = fields.coinADecimals
    this.coinAUrl = fields.coinAUrl
    this.coinB = fields.coinB
    this.coinBSymbol = fields.coinBSymbol
    this.coinBDecimals = fields.coinBDecimals
    this.coinBUrl = fields.coinBUrl
    this.currentSqrtPrice = fields.currentSqrtPrice
    this.currentTickIndex = fields.currentTickIndex
    this.tickSpacing = fields.tickSpacing
    this.feeRate = fields.feeRate
    this.protocolFeeShare = fields.protocolFeeShare
  }

  static reified(): PoolCreatedReified {
    const reifiedBcs = PoolCreated.bcs
    return {
      typeName: PoolCreated.$typeName,
      fullTypeName: composeSuiType(
        PoolCreated.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::events::PoolCreated`,
      typeArgs: [] as [],
      isPhantom: PoolCreated.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PoolCreated.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PoolCreated.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PoolCreated.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
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

  private static instantiateBcs() {
    return bcs.struct('PoolCreated', {
      id: ID.bcs,
      coin_a: String.bcs,
      coin_a_symbol: String.bcs,
      coin_a_decimals: bcs.u8(),
      coin_a_url: String.bcs,
      coin_b: String.bcs,
      coin_b_symbol: String.bcs,
      coin_b_decimals: bcs.u8(),
      coin_b_url: String.bcs,
      current_sqrt_price: bcs.u128(),
      current_tick_index: I32.bcs,
      tick_spacing: bcs.u32(),
      fee_rate: bcs.u64(),
      protocol_fee_share: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof PoolCreated.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof PoolCreated.instantiateBcs> {
    if (!PoolCreated.cachedBcs) {
      PoolCreated.cachedBcs = PoolCreated.instantiateBcs()
    }
    return PoolCreated.cachedBcs
  }

  static fromFields(fields: Record<string, any>): PoolCreated {
    return PoolCreated.reified().new({
      id: decodeFromFields(ID.reified(), fields.id),
      coinA: decodeFromFields(String.reified(), fields.coin_a),
      coinASymbol: decodeFromFields(String.reified(), fields.coin_a_symbol),
      coinADecimals: decodeFromFields('u8', fields.coin_a_decimals),
      coinAUrl: decodeFromFields(String.reified(), fields.coin_a_url),
      coinB: decodeFromFields(String.reified(), fields.coin_b),
      coinBSymbol: decodeFromFields(String.reified(), fields.coin_b_symbol),
      coinBDecimals: decodeFromFields('u8', fields.coin_b_decimals),
      coinBUrl: decodeFromFields(String.reified(), fields.coin_b_url),
      currentSqrtPrice: decodeFromFields('u128', fields.current_sqrt_price),
      currentTickIndex: decodeFromFields(I32.reified(), fields.current_tick_index),
      tickSpacing: decodeFromFields('u32', fields.tick_spacing),
      feeRate: decodeFromFields('u64', fields.fee_rate),
      protocolFeeShare: decodeFromFields('u64', fields.protocol_fee_share),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PoolCreated {
    if (!isPoolCreated(item.type)) {
      throw new Error('not a PoolCreated type')
    }

    return PoolCreated.reified().new({
      id: decodeFromFieldsWithTypes(ID.reified(), item.fields.id),
      coinA: decodeFromFieldsWithTypes(String.reified(), item.fields.coin_a),
      coinASymbol: decodeFromFieldsWithTypes(String.reified(), item.fields.coin_a_symbol),
      coinADecimals: decodeFromFieldsWithTypes('u8', item.fields.coin_a_decimals),
      coinAUrl: decodeFromFieldsWithTypes(String.reified(), item.fields.coin_a_url),
      coinB: decodeFromFieldsWithTypes(String.reified(), item.fields.coin_b),
      coinBSymbol: decodeFromFieldsWithTypes(String.reified(), item.fields.coin_b_symbol),
      coinBDecimals: decodeFromFieldsWithTypes('u8', item.fields.coin_b_decimals),
      coinBUrl: decodeFromFieldsWithTypes(String.reified(), item.fields.coin_b_url),
      currentSqrtPrice: decodeFromFieldsWithTypes('u128', item.fields.current_sqrt_price),
      currentTickIndex: decodeFromFieldsWithTypes(I32.reified(), item.fields.current_tick_index),
      tickSpacing: decodeFromFieldsWithTypes('u32', item.fields.tick_spacing),
      feeRate: decodeFromFieldsWithTypes('u64', item.fields.fee_rate),
      protocolFeeShare: decodeFromFieldsWithTypes('u64', item.fields.protocol_fee_share),
    })
  }

  static fromBcs(data: Uint8Array): PoolCreated {
    return PoolCreated.fromFields(PoolCreated.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      coinA: this.coinA,
      coinASymbol: this.coinASymbol,
      coinADecimals: this.coinADecimals,
      coinAUrl: this.coinAUrl,
      coinB: this.coinB,
      coinBSymbol: this.coinBSymbol,
      coinBDecimals: this.coinBDecimals,
      coinBUrl: this.coinBUrl,
      currentSqrtPrice: this.currentSqrtPrice.toString(),
      currentTickIndex: this.currentTickIndex.toJSONField(),
      tickSpacing: this.tickSpacing,
      feeRate: this.feeRate.toString(),
      protocolFeeShare: this.protocolFeeShare.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PoolCreated {
    return PoolCreated.reified().new({
      id: decodeFromJSONField(ID.reified(), field.id),
      coinA: decodeFromJSONField(String.reified(), field.coinA),
      coinASymbol: decodeFromJSONField(String.reified(), field.coinASymbol),
      coinADecimals: decodeFromJSONField('u8', field.coinADecimals),
      coinAUrl: decodeFromJSONField(String.reified(), field.coinAUrl),
      coinB: decodeFromJSONField(String.reified(), field.coinB),
      coinBSymbol: decodeFromJSONField(String.reified(), field.coinBSymbol),
      coinBDecimals: decodeFromJSONField('u8', field.coinBDecimals),
      coinBUrl: decodeFromJSONField(String.reified(), field.coinBUrl),
      currentSqrtPrice: decodeFromJSONField('u128', field.currentSqrtPrice),
      currentTickIndex: decodeFromJSONField(I32.reified(), field.currentTickIndex),
      tickSpacing: decodeFromJSONField('u32', field.tickSpacing),
      feeRate: decodeFromJSONField('u64', field.feeRate),
      protocolFeeShare: decodeFromJSONField('u64', field.protocolFeeShare),
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

/* ============================== PositionOpened =============================== */

export function isPositionOpened(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::events::PositionOpened`
}

export interface PositionOpenedFields {
  poolId: ToField<ID>
  positionId: ToField<ID>
  tickLower: ToField<I32>
  tickUpper: ToField<I32>
}

export type PositionOpenedReified = Reified<PositionOpened, PositionOpenedFields>

export class PositionOpened implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::events::PositionOpened`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = PositionOpened.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::events::PositionOpened`
  readonly $typeArgs: []
  readonly $isPhantom = PositionOpened.$isPhantom

  readonly poolId: ToField<ID>
  readonly positionId: ToField<ID>
  readonly tickLower: ToField<I32>
  readonly tickUpper: ToField<I32>

  private constructor(typeArgs: [], fields: PositionOpenedFields) {
    this.$fullTypeName = composeSuiType(
      PositionOpened.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::events::PositionOpened`
    this.$typeArgs = typeArgs

    this.poolId = fields.poolId
    this.positionId = fields.positionId
    this.tickLower = fields.tickLower
    this.tickUpper = fields.tickUpper
  }

  static reified(): PositionOpenedReified {
    const reifiedBcs = PositionOpened.bcs
    return {
      typeName: PositionOpened.$typeName,
      fullTypeName: composeSuiType(
        PositionOpened.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::events::PositionOpened`,
      typeArgs: [] as [],
      isPhantom: PositionOpened.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PositionOpened.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PositionOpened.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PositionOpened.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PositionOpened.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PositionOpened.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => PositionOpened.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PositionOpened.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => PositionOpened.fetch(client, id),
      new: (fields: PositionOpenedFields) => {
        return new PositionOpened([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return PositionOpened.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PositionOpened>> {
    return phantom(PositionOpened.reified())
  }
  static get p() {
    return PositionOpened.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('PositionOpened', {
      pool_id: ID.bcs,
      position_id: ID.bcs,
      tick_lower: I32.bcs,
      tick_upper: I32.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof PositionOpened.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof PositionOpened.instantiateBcs> {
    if (!PositionOpened.cachedBcs) {
      PositionOpened.cachedBcs = PositionOpened.instantiateBcs()
    }
    return PositionOpened.cachedBcs
  }

  static fromFields(fields: Record<string, any>): PositionOpened {
    return PositionOpened.reified().new({
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      positionId: decodeFromFields(ID.reified(), fields.position_id),
      tickLower: decodeFromFields(I32.reified(), fields.tick_lower),
      tickUpper: decodeFromFields(I32.reified(), fields.tick_upper),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PositionOpened {
    if (!isPositionOpened(item.type)) {
      throw new Error('not a PositionOpened type')
    }

    return PositionOpened.reified().new({
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      positionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.position_id),
      tickLower: decodeFromFieldsWithTypes(I32.reified(), item.fields.tick_lower),
      tickUpper: decodeFromFieldsWithTypes(I32.reified(), item.fields.tick_upper),
    })
  }

  static fromBcs(data: Uint8Array): PositionOpened {
    return PositionOpened.fromFields(PositionOpened.bcs.parse(data))
  }

  toJSONField() {
    return {
      poolId: this.poolId,
      positionId: this.positionId,
      tickLower: this.tickLower.toJSONField(),
      tickUpper: this.tickUpper.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PositionOpened {
    return PositionOpened.reified().new({
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      positionId: decodeFromJSONField(ID.reified(), field.positionId),
      tickLower: decodeFromJSONField(I32.reified(), field.tickLower),
      tickUpper: decodeFromJSONField(I32.reified(), field.tickUpper),
    })
  }

  static fromJSON(json: Record<string, any>): PositionOpened {
    if (json.$typeName !== PositionOpened.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return PositionOpened.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): PositionOpened {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPositionOpened(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PositionOpened object`)
    }
    return PositionOpened.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): PositionOpened {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPositionOpened(data.bcs.type)) {
        throw new Error(`object at is not a PositionOpened object`)
      }

      return PositionOpened.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PositionOpened.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<PositionOpened> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching PositionOpened object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isPositionOpened(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a PositionOpened object`)
    }

    return PositionOpened.fromSuiObjectData(res.data)
  }
}

/* ============================== PositionClosed =============================== */

export function isPositionClosed(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::events::PositionClosed`
}

export interface PositionClosedFields {
  poolId: ToField<ID>
  positionId: ToField<ID>
  tickLower: ToField<I32>
  tickUpper: ToField<I32>
}

export type PositionClosedReified = Reified<PositionClosed, PositionClosedFields>

export class PositionClosed implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::events::PositionClosed`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = PositionClosed.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::events::PositionClosed`
  readonly $typeArgs: []
  readonly $isPhantom = PositionClosed.$isPhantom

  readonly poolId: ToField<ID>
  readonly positionId: ToField<ID>
  readonly tickLower: ToField<I32>
  readonly tickUpper: ToField<I32>

  private constructor(typeArgs: [], fields: PositionClosedFields) {
    this.$fullTypeName = composeSuiType(
      PositionClosed.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::events::PositionClosed`
    this.$typeArgs = typeArgs

    this.poolId = fields.poolId
    this.positionId = fields.positionId
    this.tickLower = fields.tickLower
    this.tickUpper = fields.tickUpper
  }

  static reified(): PositionClosedReified {
    const reifiedBcs = PositionClosed.bcs
    return {
      typeName: PositionClosed.$typeName,
      fullTypeName: composeSuiType(
        PositionClosed.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::events::PositionClosed`,
      typeArgs: [] as [],
      isPhantom: PositionClosed.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PositionClosed.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PositionClosed.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PositionClosed.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PositionClosed.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PositionClosed.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => PositionClosed.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PositionClosed.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => PositionClosed.fetch(client, id),
      new: (fields: PositionClosedFields) => {
        return new PositionClosed([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return PositionClosed.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PositionClosed>> {
    return phantom(PositionClosed.reified())
  }
  static get p() {
    return PositionClosed.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('PositionClosed', {
      pool_id: ID.bcs,
      position_id: ID.bcs,
      tick_lower: I32.bcs,
      tick_upper: I32.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof PositionClosed.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof PositionClosed.instantiateBcs> {
    if (!PositionClosed.cachedBcs) {
      PositionClosed.cachedBcs = PositionClosed.instantiateBcs()
    }
    return PositionClosed.cachedBcs
  }

  static fromFields(fields: Record<string, any>): PositionClosed {
    return PositionClosed.reified().new({
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      positionId: decodeFromFields(ID.reified(), fields.position_id),
      tickLower: decodeFromFields(I32.reified(), fields.tick_lower),
      tickUpper: decodeFromFields(I32.reified(), fields.tick_upper),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PositionClosed {
    if (!isPositionClosed(item.type)) {
      throw new Error('not a PositionClosed type')
    }

    return PositionClosed.reified().new({
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      positionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.position_id),
      tickLower: decodeFromFieldsWithTypes(I32.reified(), item.fields.tick_lower),
      tickUpper: decodeFromFieldsWithTypes(I32.reified(), item.fields.tick_upper),
    })
  }

  static fromBcs(data: Uint8Array): PositionClosed {
    return PositionClosed.fromFields(PositionClosed.bcs.parse(data))
  }

  toJSONField() {
    return {
      poolId: this.poolId,
      positionId: this.positionId,
      tickLower: this.tickLower.toJSONField(),
      tickUpper: this.tickUpper.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PositionClosed {
    return PositionClosed.reified().new({
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      positionId: decodeFromJSONField(ID.reified(), field.positionId),
      tickLower: decodeFromJSONField(I32.reified(), field.tickLower),
      tickUpper: decodeFromJSONField(I32.reified(), field.tickUpper),
    })
  }

  static fromJSON(json: Record<string, any>): PositionClosed {
    if (json.$typeName !== PositionClosed.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return PositionClosed.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): PositionClosed {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPositionClosed(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PositionClosed object`)
    }
    return PositionClosed.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): PositionClosed {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPositionClosed(data.bcs.type)) {
        throw new Error(`object at is not a PositionClosed object`)
      }

      return PositionClosed.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PositionClosed.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<PositionClosed> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching PositionClosed object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isPositionClosed(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a PositionClosed object`)
    }

    return PositionClosed.fromSuiObjectData(res.data)
  }
}

/* ============================== AssetSwap =============================== */

export function isAssetSwap(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::events::AssetSwap`
}

export interface AssetSwapFields {
  poolId: ToField<ID>
  a2B: ToField<'bool'>
  amountIn: ToField<'u64'>
  amountOut: ToField<'u64'>
  poolCoinAAmount: ToField<'u64'>
  poolCoinBAmount: ToField<'u64'>
  fee: ToField<'u64'>
  beforeLiquidity: ToField<'u128'>
  afterLiquidity: ToField<'u128'>
  beforeSqrtPrice: ToField<'u128'>
  afterSqrtPrice: ToField<'u128'>
  currentTick: ToField<I32>
  exceeded: ToField<'bool'>
  sequenceNumber: ToField<'u128'>
}

export type AssetSwapReified = Reified<AssetSwap, AssetSwapFields>

export class AssetSwap implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::events::AssetSwap`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = AssetSwap.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::events::AssetSwap`
  readonly $typeArgs: []
  readonly $isPhantom = AssetSwap.$isPhantom

  readonly poolId: ToField<ID>
  readonly a2B: ToField<'bool'>
  readonly amountIn: ToField<'u64'>
  readonly amountOut: ToField<'u64'>
  readonly poolCoinAAmount: ToField<'u64'>
  readonly poolCoinBAmount: ToField<'u64'>
  readonly fee: ToField<'u64'>
  readonly beforeLiquidity: ToField<'u128'>
  readonly afterLiquidity: ToField<'u128'>
  readonly beforeSqrtPrice: ToField<'u128'>
  readonly afterSqrtPrice: ToField<'u128'>
  readonly currentTick: ToField<I32>
  readonly exceeded: ToField<'bool'>
  readonly sequenceNumber: ToField<'u128'>

  private constructor(typeArgs: [], fields: AssetSwapFields) {
    this.$fullTypeName = composeSuiType(
      AssetSwap.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::events::AssetSwap`
    this.$typeArgs = typeArgs

    this.poolId = fields.poolId
    this.a2B = fields.a2B
    this.amountIn = fields.amountIn
    this.amountOut = fields.amountOut
    this.poolCoinAAmount = fields.poolCoinAAmount
    this.poolCoinBAmount = fields.poolCoinBAmount
    this.fee = fields.fee
    this.beforeLiquidity = fields.beforeLiquidity
    this.afterLiquidity = fields.afterLiquidity
    this.beforeSqrtPrice = fields.beforeSqrtPrice
    this.afterSqrtPrice = fields.afterSqrtPrice
    this.currentTick = fields.currentTick
    this.exceeded = fields.exceeded
    this.sequenceNumber = fields.sequenceNumber
  }

  static reified(): AssetSwapReified {
    const reifiedBcs = AssetSwap.bcs
    return {
      typeName: AssetSwap.$typeName,
      fullTypeName: composeSuiType(
        AssetSwap.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::events::AssetSwap`,
      typeArgs: [] as [],
      isPhantom: AssetSwap.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AssetSwap.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AssetSwap.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AssetSwap.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AssetSwap.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AssetSwap.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => AssetSwap.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AssetSwap.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => AssetSwap.fetch(client, id),
      new: (fields: AssetSwapFields) => {
        return new AssetSwap([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return AssetSwap.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AssetSwap>> {
    return phantom(AssetSwap.reified())
  }
  static get p() {
    return AssetSwap.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AssetSwap', {
      pool_id: ID.bcs,
      a2b: bcs.bool(),
      amount_in: bcs.u64(),
      amount_out: bcs.u64(),
      pool_coin_a_amount: bcs.u64(),
      pool_coin_b_amount: bcs.u64(),
      fee: bcs.u64(),
      before_liquidity: bcs.u128(),
      after_liquidity: bcs.u128(),
      before_sqrt_price: bcs.u128(),
      after_sqrt_price: bcs.u128(),
      current_tick: I32.bcs,
      exceeded: bcs.bool(),
      sequence_number: bcs.u128(),
    })
  }

  private static cachedBcs: ReturnType<typeof AssetSwap.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof AssetSwap.instantiateBcs> {
    if (!AssetSwap.cachedBcs) {
      AssetSwap.cachedBcs = AssetSwap.instantiateBcs()
    }
    return AssetSwap.cachedBcs
  }

  static fromFields(fields: Record<string, any>): AssetSwap {
    return AssetSwap.reified().new({
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      a2B: decodeFromFields('bool', fields.a2b),
      amountIn: decodeFromFields('u64', fields.amount_in),
      amountOut: decodeFromFields('u64', fields.amount_out),
      poolCoinAAmount: decodeFromFields('u64', fields.pool_coin_a_amount),
      poolCoinBAmount: decodeFromFields('u64', fields.pool_coin_b_amount),
      fee: decodeFromFields('u64', fields.fee),
      beforeLiquidity: decodeFromFields('u128', fields.before_liquidity),
      afterLiquidity: decodeFromFields('u128', fields.after_liquidity),
      beforeSqrtPrice: decodeFromFields('u128', fields.before_sqrt_price),
      afterSqrtPrice: decodeFromFields('u128', fields.after_sqrt_price),
      currentTick: decodeFromFields(I32.reified(), fields.current_tick),
      exceeded: decodeFromFields('bool', fields.exceeded),
      sequenceNumber: decodeFromFields('u128', fields.sequence_number),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): AssetSwap {
    if (!isAssetSwap(item.type)) {
      throw new Error('not a AssetSwap type')
    }

    return AssetSwap.reified().new({
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      a2B: decodeFromFieldsWithTypes('bool', item.fields.a2b),
      amountIn: decodeFromFieldsWithTypes('u64', item.fields.amount_in),
      amountOut: decodeFromFieldsWithTypes('u64', item.fields.amount_out),
      poolCoinAAmount: decodeFromFieldsWithTypes('u64', item.fields.pool_coin_a_amount),
      poolCoinBAmount: decodeFromFieldsWithTypes('u64', item.fields.pool_coin_b_amount),
      fee: decodeFromFieldsWithTypes('u64', item.fields.fee),
      beforeLiquidity: decodeFromFieldsWithTypes('u128', item.fields.before_liquidity),
      afterLiquidity: decodeFromFieldsWithTypes('u128', item.fields.after_liquidity),
      beforeSqrtPrice: decodeFromFieldsWithTypes('u128', item.fields.before_sqrt_price),
      afterSqrtPrice: decodeFromFieldsWithTypes('u128', item.fields.after_sqrt_price),
      currentTick: decodeFromFieldsWithTypes(I32.reified(), item.fields.current_tick),
      exceeded: decodeFromFieldsWithTypes('bool', item.fields.exceeded),
      sequenceNumber: decodeFromFieldsWithTypes('u128', item.fields.sequence_number),
    })
  }

  static fromBcs(data: Uint8Array): AssetSwap {
    return AssetSwap.fromFields(AssetSwap.bcs.parse(data))
  }

  toJSONField() {
    return {
      poolId: this.poolId,
      a2B: this.a2B,
      amountIn: this.amountIn.toString(),
      amountOut: this.amountOut.toString(),
      poolCoinAAmount: this.poolCoinAAmount.toString(),
      poolCoinBAmount: this.poolCoinBAmount.toString(),
      fee: this.fee.toString(),
      beforeLiquidity: this.beforeLiquidity.toString(),
      afterLiquidity: this.afterLiquidity.toString(),
      beforeSqrtPrice: this.beforeSqrtPrice.toString(),
      afterSqrtPrice: this.afterSqrtPrice.toString(),
      currentTick: this.currentTick.toJSONField(),
      exceeded: this.exceeded,
      sequenceNumber: this.sequenceNumber.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AssetSwap {
    return AssetSwap.reified().new({
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      a2B: decodeFromJSONField('bool', field.a2B),
      amountIn: decodeFromJSONField('u64', field.amountIn),
      amountOut: decodeFromJSONField('u64', field.amountOut),
      poolCoinAAmount: decodeFromJSONField('u64', field.poolCoinAAmount),
      poolCoinBAmount: decodeFromJSONField('u64', field.poolCoinBAmount),
      fee: decodeFromJSONField('u64', field.fee),
      beforeLiquidity: decodeFromJSONField('u128', field.beforeLiquidity),
      afterLiquidity: decodeFromJSONField('u128', field.afterLiquidity),
      beforeSqrtPrice: decodeFromJSONField('u128', field.beforeSqrtPrice),
      afterSqrtPrice: decodeFromJSONField('u128', field.afterSqrtPrice),
      currentTick: decodeFromJSONField(I32.reified(), field.currentTick),
      exceeded: decodeFromJSONField('bool', field.exceeded),
      sequenceNumber: decodeFromJSONField('u128', field.sequenceNumber),
    })
  }

  static fromJSON(json: Record<string, any>): AssetSwap {
    if (json.$typeName !== AssetSwap.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return AssetSwap.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): AssetSwap {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAssetSwap(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AssetSwap object`)
    }
    return AssetSwap.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): AssetSwap {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAssetSwap(data.bcs.type)) {
        throw new Error(`object at is not a AssetSwap object`)
      }

      return AssetSwap.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AssetSwap.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<AssetSwap> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching AssetSwap object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isAssetSwap(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a AssetSwap object`)
    }

    return AssetSwap.fromSuiObjectData(res.data)
  }
}

/* ============================== FlashSwap =============================== */

export function isFlashSwap(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::events::FlashSwap`
}

export interface FlashSwapFields {
  poolId: ToField<ID>
  a2B: ToField<'bool'>
  amountIn: ToField<'u64'>
  amountOut: ToField<'u64'>
  fee: ToField<'u64'>
  beforeLiquidity: ToField<'u128'>
  afterLiquidity: ToField<'u128'>
  beforeSqrtPrice: ToField<'u128'>
  afterSqrtPrice: ToField<'u128'>
  currentTick: ToField<I32>
  exceeded: ToField<'bool'>
  sequenceNumber: ToField<'u128'>
}

export type FlashSwapReified = Reified<FlashSwap, FlashSwapFields>

export class FlashSwap implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::events::FlashSwap`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = FlashSwap.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::events::FlashSwap`
  readonly $typeArgs: []
  readonly $isPhantom = FlashSwap.$isPhantom

  readonly poolId: ToField<ID>
  readonly a2B: ToField<'bool'>
  readonly amountIn: ToField<'u64'>
  readonly amountOut: ToField<'u64'>
  readonly fee: ToField<'u64'>
  readonly beforeLiquidity: ToField<'u128'>
  readonly afterLiquidity: ToField<'u128'>
  readonly beforeSqrtPrice: ToField<'u128'>
  readonly afterSqrtPrice: ToField<'u128'>
  readonly currentTick: ToField<I32>
  readonly exceeded: ToField<'bool'>
  readonly sequenceNumber: ToField<'u128'>

  private constructor(typeArgs: [], fields: FlashSwapFields) {
    this.$fullTypeName = composeSuiType(
      FlashSwap.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::events::FlashSwap`
    this.$typeArgs = typeArgs

    this.poolId = fields.poolId
    this.a2B = fields.a2B
    this.amountIn = fields.amountIn
    this.amountOut = fields.amountOut
    this.fee = fields.fee
    this.beforeLiquidity = fields.beforeLiquidity
    this.afterLiquidity = fields.afterLiquidity
    this.beforeSqrtPrice = fields.beforeSqrtPrice
    this.afterSqrtPrice = fields.afterSqrtPrice
    this.currentTick = fields.currentTick
    this.exceeded = fields.exceeded
    this.sequenceNumber = fields.sequenceNumber
  }

  static reified(): FlashSwapReified {
    const reifiedBcs = FlashSwap.bcs
    return {
      typeName: FlashSwap.$typeName,
      fullTypeName: composeSuiType(
        FlashSwap.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::events::FlashSwap`,
      typeArgs: [] as [],
      isPhantom: FlashSwap.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => FlashSwap.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => FlashSwap.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => FlashSwap.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => FlashSwap.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => FlashSwap.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => FlashSwap.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => FlashSwap.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => FlashSwap.fetch(client, id),
      new: (fields: FlashSwapFields) => {
        return new FlashSwap([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return FlashSwap.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<FlashSwap>> {
    return phantom(FlashSwap.reified())
  }
  static get p() {
    return FlashSwap.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('FlashSwap', {
      pool_id: ID.bcs,
      a2b: bcs.bool(),
      amount_in: bcs.u64(),
      amount_out: bcs.u64(),
      fee: bcs.u64(),
      before_liquidity: bcs.u128(),
      after_liquidity: bcs.u128(),
      before_sqrt_price: bcs.u128(),
      after_sqrt_price: bcs.u128(),
      current_tick: I32.bcs,
      exceeded: bcs.bool(),
      sequence_number: bcs.u128(),
    })
  }

  private static cachedBcs: ReturnType<typeof FlashSwap.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof FlashSwap.instantiateBcs> {
    if (!FlashSwap.cachedBcs) {
      FlashSwap.cachedBcs = FlashSwap.instantiateBcs()
    }
    return FlashSwap.cachedBcs
  }

  static fromFields(fields: Record<string, any>): FlashSwap {
    return FlashSwap.reified().new({
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      a2B: decodeFromFields('bool', fields.a2b),
      amountIn: decodeFromFields('u64', fields.amount_in),
      amountOut: decodeFromFields('u64', fields.amount_out),
      fee: decodeFromFields('u64', fields.fee),
      beforeLiquidity: decodeFromFields('u128', fields.before_liquidity),
      afterLiquidity: decodeFromFields('u128', fields.after_liquidity),
      beforeSqrtPrice: decodeFromFields('u128', fields.before_sqrt_price),
      afterSqrtPrice: decodeFromFields('u128', fields.after_sqrt_price),
      currentTick: decodeFromFields(I32.reified(), fields.current_tick),
      exceeded: decodeFromFields('bool', fields.exceeded),
      sequenceNumber: decodeFromFields('u128', fields.sequence_number),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): FlashSwap {
    if (!isFlashSwap(item.type)) {
      throw new Error('not a FlashSwap type')
    }

    return FlashSwap.reified().new({
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      a2B: decodeFromFieldsWithTypes('bool', item.fields.a2b),
      amountIn: decodeFromFieldsWithTypes('u64', item.fields.amount_in),
      amountOut: decodeFromFieldsWithTypes('u64', item.fields.amount_out),
      fee: decodeFromFieldsWithTypes('u64', item.fields.fee),
      beforeLiquidity: decodeFromFieldsWithTypes('u128', item.fields.before_liquidity),
      afterLiquidity: decodeFromFieldsWithTypes('u128', item.fields.after_liquidity),
      beforeSqrtPrice: decodeFromFieldsWithTypes('u128', item.fields.before_sqrt_price),
      afterSqrtPrice: decodeFromFieldsWithTypes('u128', item.fields.after_sqrt_price),
      currentTick: decodeFromFieldsWithTypes(I32.reified(), item.fields.current_tick),
      exceeded: decodeFromFieldsWithTypes('bool', item.fields.exceeded),
      sequenceNumber: decodeFromFieldsWithTypes('u128', item.fields.sequence_number),
    })
  }

  static fromBcs(data: Uint8Array): FlashSwap {
    return FlashSwap.fromFields(FlashSwap.bcs.parse(data))
  }

  toJSONField() {
    return {
      poolId: this.poolId,
      a2B: this.a2B,
      amountIn: this.amountIn.toString(),
      amountOut: this.amountOut.toString(),
      fee: this.fee.toString(),
      beforeLiquidity: this.beforeLiquidity.toString(),
      afterLiquidity: this.afterLiquidity.toString(),
      beforeSqrtPrice: this.beforeSqrtPrice.toString(),
      afterSqrtPrice: this.afterSqrtPrice.toString(),
      currentTick: this.currentTick.toJSONField(),
      exceeded: this.exceeded,
      sequenceNumber: this.sequenceNumber.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): FlashSwap {
    return FlashSwap.reified().new({
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      a2B: decodeFromJSONField('bool', field.a2B),
      amountIn: decodeFromJSONField('u64', field.amountIn),
      amountOut: decodeFromJSONField('u64', field.amountOut),
      fee: decodeFromJSONField('u64', field.fee),
      beforeLiquidity: decodeFromJSONField('u128', field.beforeLiquidity),
      afterLiquidity: decodeFromJSONField('u128', field.afterLiquidity),
      beforeSqrtPrice: decodeFromJSONField('u128', field.beforeSqrtPrice),
      afterSqrtPrice: decodeFromJSONField('u128', field.afterSqrtPrice),
      currentTick: decodeFromJSONField(I32.reified(), field.currentTick),
      exceeded: decodeFromJSONField('bool', field.exceeded),
      sequenceNumber: decodeFromJSONField('u128', field.sequenceNumber),
    })
  }

  static fromJSON(json: Record<string, any>): FlashSwap {
    if (json.$typeName !== FlashSwap.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return FlashSwap.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): FlashSwap {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isFlashSwap(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a FlashSwap object`)
    }
    return FlashSwap.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): FlashSwap {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isFlashSwap(data.bcs.type)) {
        throw new Error(`object at is not a FlashSwap object`)
      }

      return FlashSwap.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return FlashSwap.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<FlashSwap> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching FlashSwap object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isFlashSwap(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a FlashSwap object`)
    }

    return FlashSwap.fromSuiObjectData(res.data)
  }
}

/* ============================== ProtocolFeeCollected =============================== */

export function isProtocolFeeCollected(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::events::ProtocolFeeCollected`
}

export interface ProtocolFeeCollectedFields {
  poolId: ToField<ID>
  sender: ToField<'address'>
  destination: ToField<'address'>
  coinAAmount: ToField<'u64'>
  coinBAmount: ToField<'u64'>
  poolCoinAAmount: ToField<'u64'>
  poolCoinBAmount: ToField<'u64'>
  sequenceNumber: ToField<'u128'>
}

export type ProtocolFeeCollectedReified = Reified<ProtocolFeeCollected, ProtocolFeeCollectedFields>

export class ProtocolFeeCollected implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::events::ProtocolFeeCollected`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = ProtocolFeeCollected.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::events::ProtocolFeeCollected`
  readonly $typeArgs: []
  readonly $isPhantom = ProtocolFeeCollected.$isPhantom

  readonly poolId: ToField<ID>
  readonly sender: ToField<'address'>
  readonly destination: ToField<'address'>
  readonly coinAAmount: ToField<'u64'>
  readonly coinBAmount: ToField<'u64'>
  readonly poolCoinAAmount: ToField<'u64'>
  readonly poolCoinBAmount: ToField<'u64'>
  readonly sequenceNumber: ToField<'u128'>

  private constructor(typeArgs: [], fields: ProtocolFeeCollectedFields) {
    this.$fullTypeName = composeSuiType(
      ProtocolFeeCollected.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::events::ProtocolFeeCollected`
    this.$typeArgs = typeArgs

    this.poolId = fields.poolId
    this.sender = fields.sender
    this.destination = fields.destination
    this.coinAAmount = fields.coinAAmount
    this.coinBAmount = fields.coinBAmount
    this.poolCoinAAmount = fields.poolCoinAAmount
    this.poolCoinBAmount = fields.poolCoinBAmount
    this.sequenceNumber = fields.sequenceNumber
  }

  static reified(): ProtocolFeeCollectedReified {
    const reifiedBcs = ProtocolFeeCollected.bcs
    return {
      typeName: ProtocolFeeCollected.$typeName,
      fullTypeName: composeSuiType(
        ProtocolFeeCollected.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::events::ProtocolFeeCollected`,
      typeArgs: [] as [],
      isPhantom: ProtocolFeeCollected.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ProtocolFeeCollected.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        ProtocolFeeCollected.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ProtocolFeeCollected.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ProtocolFeeCollected.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ProtocolFeeCollected.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        ProtocolFeeCollected.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        ProtocolFeeCollected.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => ProtocolFeeCollected.fetch(client, id),
      new: (fields: ProtocolFeeCollectedFields) => {
        return new ProtocolFeeCollected([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return ProtocolFeeCollected.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ProtocolFeeCollected>> {
    return phantom(ProtocolFeeCollected.reified())
  }
  static get p() {
    return ProtocolFeeCollected.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ProtocolFeeCollected', {
      pool_id: ID.bcs,
      sender: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      destination: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      coin_a_amount: bcs.u64(),
      coin_b_amount: bcs.u64(),
      pool_coin_a_amount: bcs.u64(),
      pool_coin_b_amount: bcs.u64(),
      sequence_number: bcs.u128(),
    })
  }

  private static cachedBcs: ReturnType<typeof ProtocolFeeCollected.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof ProtocolFeeCollected.instantiateBcs> {
    if (!ProtocolFeeCollected.cachedBcs) {
      ProtocolFeeCollected.cachedBcs = ProtocolFeeCollected.instantiateBcs()
    }
    return ProtocolFeeCollected.cachedBcs
  }

  static fromFields(fields: Record<string, any>): ProtocolFeeCollected {
    return ProtocolFeeCollected.reified().new({
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      sender: decodeFromFields('address', fields.sender),
      destination: decodeFromFields('address', fields.destination),
      coinAAmount: decodeFromFields('u64', fields.coin_a_amount),
      coinBAmount: decodeFromFields('u64', fields.coin_b_amount),
      poolCoinAAmount: decodeFromFields('u64', fields.pool_coin_a_amount),
      poolCoinBAmount: decodeFromFields('u64', fields.pool_coin_b_amount),
      sequenceNumber: decodeFromFields('u128', fields.sequence_number),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ProtocolFeeCollected {
    if (!isProtocolFeeCollected(item.type)) {
      throw new Error('not a ProtocolFeeCollected type')
    }

    return ProtocolFeeCollected.reified().new({
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      sender: decodeFromFieldsWithTypes('address', item.fields.sender),
      destination: decodeFromFieldsWithTypes('address', item.fields.destination),
      coinAAmount: decodeFromFieldsWithTypes('u64', item.fields.coin_a_amount),
      coinBAmount: decodeFromFieldsWithTypes('u64', item.fields.coin_b_amount),
      poolCoinAAmount: decodeFromFieldsWithTypes('u64', item.fields.pool_coin_a_amount),
      poolCoinBAmount: decodeFromFieldsWithTypes('u64', item.fields.pool_coin_b_amount),
      sequenceNumber: decodeFromFieldsWithTypes('u128', item.fields.sequence_number),
    })
  }

  static fromBcs(data: Uint8Array): ProtocolFeeCollected {
    return ProtocolFeeCollected.fromFields(ProtocolFeeCollected.bcs.parse(data))
  }

  toJSONField() {
    return {
      poolId: this.poolId,
      sender: this.sender,
      destination: this.destination,
      coinAAmount: this.coinAAmount.toString(),
      coinBAmount: this.coinBAmount.toString(),
      poolCoinAAmount: this.poolCoinAAmount.toString(),
      poolCoinBAmount: this.poolCoinBAmount.toString(),
      sequenceNumber: this.sequenceNumber.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ProtocolFeeCollected {
    return ProtocolFeeCollected.reified().new({
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      sender: decodeFromJSONField('address', field.sender),
      destination: decodeFromJSONField('address', field.destination),
      coinAAmount: decodeFromJSONField('u64', field.coinAAmount),
      coinBAmount: decodeFromJSONField('u64', field.coinBAmount),
      poolCoinAAmount: decodeFromJSONField('u64', field.poolCoinAAmount),
      poolCoinBAmount: decodeFromJSONField('u64', field.poolCoinBAmount),
      sequenceNumber: decodeFromJSONField('u128', field.sequenceNumber),
    })
  }

  static fromJSON(json: Record<string, any>): ProtocolFeeCollected {
    if (json.$typeName !== ProtocolFeeCollected.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return ProtocolFeeCollected.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): ProtocolFeeCollected {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isProtocolFeeCollected(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a ProtocolFeeCollected object`
      )
    }
    return ProtocolFeeCollected.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): ProtocolFeeCollected {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isProtocolFeeCollected(data.bcs.type)) {
        throw new Error(`object at is not a ProtocolFeeCollected object`)
      }

      return ProtocolFeeCollected.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ProtocolFeeCollected.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<ProtocolFeeCollected> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching ProtocolFeeCollected object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isProtocolFeeCollected(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a ProtocolFeeCollected object`)
    }

    return ProtocolFeeCollected.fromSuiObjectData(res.data)
  }
}

/* ============================== UserFeeCollected =============================== */

export function isUserFeeCollected(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::events::UserFeeCollected`
}

export interface UserFeeCollectedFields {
  poolId: ToField<ID>
  positionId: ToField<ID>
  coinAAmount: ToField<'u64'>
  coinBAmount: ToField<'u64'>
  poolCoinAAmount: ToField<'u64'>
  poolCoinBAmount: ToField<'u64'>
  sequenceNumber: ToField<'u128'>
}

export type UserFeeCollectedReified = Reified<UserFeeCollected, UserFeeCollectedFields>

export class UserFeeCollected implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::events::UserFeeCollected`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = UserFeeCollected.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::events::UserFeeCollected`
  readonly $typeArgs: []
  readonly $isPhantom = UserFeeCollected.$isPhantom

  readonly poolId: ToField<ID>
  readonly positionId: ToField<ID>
  readonly coinAAmount: ToField<'u64'>
  readonly coinBAmount: ToField<'u64'>
  readonly poolCoinAAmount: ToField<'u64'>
  readonly poolCoinBAmount: ToField<'u64'>
  readonly sequenceNumber: ToField<'u128'>

  private constructor(typeArgs: [], fields: UserFeeCollectedFields) {
    this.$fullTypeName = composeSuiType(
      UserFeeCollected.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::events::UserFeeCollected`
    this.$typeArgs = typeArgs

    this.poolId = fields.poolId
    this.positionId = fields.positionId
    this.coinAAmount = fields.coinAAmount
    this.coinBAmount = fields.coinBAmount
    this.poolCoinAAmount = fields.poolCoinAAmount
    this.poolCoinBAmount = fields.poolCoinBAmount
    this.sequenceNumber = fields.sequenceNumber
  }

  static reified(): UserFeeCollectedReified {
    const reifiedBcs = UserFeeCollected.bcs
    return {
      typeName: UserFeeCollected.$typeName,
      fullTypeName: composeSuiType(
        UserFeeCollected.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::events::UserFeeCollected`,
      typeArgs: [] as [],
      isPhantom: UserFeeCollected.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => UserFeeCollected.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => UserFeeCollected.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => UserFeeCollected.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => UserFeeCollected.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => UserFeeCollected.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => UserFeeCollected.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => UserFeeCollected.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => UserFeeCollected.fetch(client, id),
      new: (fields: UserFeeCollectedFields) => {
        return new UserFeeCollected([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return UserFeeCollected.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<UserFeeCollected>> {
    return phantom(UserFeeCollected.reified())
  }
  static get p() {
    return UserFeeCollected.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('UserFeeCollected', {
      pool_id: ID.bcs,
      position_id: ID.bcs,
      coin_a_amount: bcs.u64(),
      coin_b_amount: bcs.u64(),
      pool_coin_a_amount: bcs.u64(),
      pool_coin_b_amount: bcs.u64(),
      sequence_number: bcs.u128(),
    })
  }

  private static cachedBcs: ReturnType<typeof UserFeeCollected.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof UserFeeCollected.instantiateBcs> {
    if (!UserFeeCollected.cachedBcs) {
      UserFeeCollected.cachedBcs = UserFeeCollected.instantiateBcs()
    }
    return UserFeeCollected.cachedBcs
  }

  static fromFields(fields: Record<string, any>): UserFeeCollected {
    return UserFeeCollected.reified().new({
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      positionId: decodeFromFields(ID.reified(), fields.position_id),
      coinAAmount: decodeFromFields('u64', fields.coin_a_amount),
      coinBAmount: decodeFromFields('u64', fields.coin_b_amount),
      poolCoinAAmount: decodeFromFields('u64', fields.pool_coin_a_amount),
      poolCoinBAmount: decodeFromFields('u64', fields.pool_coin_b_amount),
      sequenceNumber: decodeFromFields('u128', fields.sequence_number),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): UserFeeCollected {
    if (!isUserFeeCollected(item.type)) {
      throw new Error('not a UserFeeCollected type')
    }

    return UserFeeCollected.reified().new({
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      positionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.position_id),
      coinAAmount: decodeFromFieldsWithTypes('u64', item.fields.coin_a_amount),
      coinBAmount: decodeFromFieldsWithTypes('u64', item.fields.coin_b_amount),
      poolCoinAAmount: decodeFromFieldsWithTypes('u64', item.fields.pool_coin_a_amount),
      poolCoinBAmount: decodeFromFieldsWithTypes('u64', item.fields.pool_coin_b_amount),
      sequenceNumber: decodeFromFieldsWithTypes('u128', item.fields.sequence_number),
    })
  }

  static fromBcs(data: Uint8Array): UserFeeCollected {
    return UserFeeCollected.fromFields(UserFeeCollected.bcs.parse(data))
  }

  toJSONField() {
    return {
      poolId: this.poolId,
      positionId: this.positionId,
      coinAAmount: this.coinAAmount.toString(),
      coinBAmount: this.coinBAmount.toString(),
      poolCoinAAmount: this.poolCoinAAmount.toString(),
      poolCoinBAmount: this.poolCoinBAmount.toString(),
      sequenceNumber: this.sequenceNumber.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): UserFeeCollected {
    return UserFeeCollected.reified().new({
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      positionId: decodeFromJSONField(ID.reified(), field.positionId),
      coinAAmount: decodeFromJSONField('u64', field.coinAAmount),
      coinBAmount: decodeFromJSONField('u64', field.coinBAmount),
      poolCoinAAmount: decodeFromJSONField('u64', field.poolCoinAAmount),
      poolCoinBAmount: decodeFromJSONField('u64', field.poolCoinBAmount),
      sequenceNumber: decodeFromJSONField('u128', field.sequenceNumber),
    })
  }

  static fromJSON(json: Record<string, any>): UserFeeCollected {
    if (json.$typeName !== UserFeeCollected.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return UserFeeCollected.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): UserFeeCollected {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isUserFeeCollected(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a UserFeeCollected object`)
    }
    return UserFeeCollected.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): UserFeeCollected {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isUserFeeCollected(data.bcs.type)) {
        throw new Error(`object at is not a UserFeeCollected object`)
      }

      return UserFeeCollected.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return UserFeeCollected.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<UserFeeCollected> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching UserFeeCollected object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isUserFeeCollected(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a UserFeeCollected object`)
    }

    return UserFeeCollected.fromSuiObjectData(res.data)
  }
}

/* ============================== UserRewardCollected =============================== */

export function isUserRewardCollected(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::events::UserRewardCollected`
}

export interface UserRewardCollectedFields {
  poolId: ToField<ID>
  positionId: ToField<ID>
  rewardType: ToField<String>
  rewardSymbol: ToField<String>
  rewardDecimals: ToField<'u8'>
  rewardAmount: ToField<'u64'>
  sequenceNumber: ToField<'u128'>
}

export type UserRewardCollectedReified = Reified<UserRewardCollected, UserRewardCollectedFields>

export class UserRewardCollected implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::events::UserRewardCollected`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = UserRewardCollected.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::events::UserRewardCollected`
  readonly $typeArgs: []
  readonly $isPhantom = UserRewardCollected.$isPhantom

  readonly poolId: ToField<ID>
  readonly positionId: ToField<ID>
  readonly rewardType: ToField<String>
  readonly rewardSymbol: ToField<String>
  readonly rewardDecimals: ToField<'u8'>
  readonly rewardAmount: ToField<'u64'>
  readonly sequenceNumber: ToField<'u128'>

  private constructor(typeArgs: [], fields: UserRewardCollectedFields) {
    this.$fullTypeName = composeSuiType(
      UserRewardCollected.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::events::UserRewardCollected`
    this.$typeArgs = typeArgs

    this.poolId = fields.poolId
    this.positionId = fields.positionId
    this.rewardType = fields.rewardType
    this.rewardSymbol = fields.rewardSymbol
    this.rewardDecimals = fields.rewardDecimals
    this.rewardAmount = fields.rewardAmount
    this.sequenceNumber = fields.sequenceNumber
  }

  static reified(): UserRewardCollectedReified {
    const reifiedBcs = UserRewardCollected.bcs
    return {
      typeName: UserRewardCollected.$typeName,
      fullTypeName: composeSuiType(
        UserRewardCollected.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::events::UserRewardCollected`,
      typeArgs: [] as [],
      isPhantom: UserRewardCollected.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => UserRewardCollected.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => UserRewardCollected.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => UserRewardCollected.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => UserRewardCollected.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => UserRewardCollected.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => UserRewardCollected.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => UserRewardCollected.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => UserRewardCollected.fetch(client, id),
      new: (fields: UserRewardCollectedFields) => {
        return new UserRewardCollected([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return UserRewardCollected.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<UserRewardCollected>> {
    return phantom(UserRewardCollected.reified())
  }
  static get p() {
    return UserRewardCollected.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('UserRewardCollected', {
      pool_id: ID.bcs,
      position_id: ID.bcs,
      reward_type: String.bcs,
      reward_symbol: String.bcs,
      reward_decimals: bcs.u8(),
      reward_amount: bcs.u64(),
      sequence_number: bcs.u128(),
    })
  }

  private static cachedBcs: ReturnType<typeof UserRewardCollected.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof UserRewardCollected.instantiateBcs> {
    if (!UserRewardCollected.cachedBcs) {
      UserRewardCollected.cachedBcs = UserRewardCollected.instantiateBcs()
    }
    return UserRewardCollected.cachedBcs
  }

  static fromFields(fields: Record<string, any>): UserRewardCollected {
    return UserRewardCollected.reified().new({
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      positionId: decodeFromFields(ID.reified(), fields.position_id),
      rewardType: decodeFromFields(String.reified(), fields.reward_type),
      rewardSymbol: decodeFromFields(String.reified(), fields.reward_symbol),
      rewardDecimals: decodeFromFields('u8', fields.reward_decimals),
      rewardAmount: decodeFromFields('u64', fields.reward_amount),
      sequenceNumber: decodeFromFields('u128', fields.sequence_number),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): UserRewardCollected {
    if (!isUserRewardCollected(item.type)) {
      throw new Error('not a UserRewardCollected type')
    }

    return UserRewardCollected.reified().new({
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      positionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.position_id),
      rewardType: decodeFromFieldsWithTypes(String.reified(), item.fields.reward_type),
      rewardSymbol: decodeFromFieldsWithTypes(String.reified(), item.fields.reward_symbol),
      rewardDecimals: decodeFromFieldsWithTypes('u8', item.fields.reward_decimals),
      rewardAmount: decodeFromFieldsWithTypes('u64', item.fields.reward_amount),
      sequenceNumber: decodeFromFieldsWithTypes('u128', item.fields.sequence_number),
    })
  }

  static fromBcs(data: Uint8Array): UserRewardCollected {
    return UserRewardCollected.fromFields(UserRewardCollected.bcs.parse(data))
  }

  toJSONField() {
    return {
      poolId: this.poolId,
      positionId: this.positionId,
      rewardType: this.rewardType,
      rewardSymbol: this.rewardSymbol,
      rewardDecimals: this.rewardDecimals,
      rewardAmount: this.rewardAmount.toString(),
      sequenceNumber: this.sequenceNumber.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): UserRewardCollected {
    return UserRewardCollected.reified().new({
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      positionId: decodeFromJSONField(ID.reified(), field.positionId),
      rewardType: decodeFromJSONField(String.reified(), field.rewardType),
      rewardSymbol: decodeFromJSONField(String.reified(), field.rewardSymbol),
      rewardDecimals: decodeFromJSONField('u8', field.rewardDecimals),
      rewardAmount: decodeFromJSONField('u64', field.rewardAmount),
      sequenceNumber: decodeFromJSONField('u128', field.sequenceNumber),
    })
  }

  static fromJSON(json: Record<string, any>): UserRewardCollected {
    if (json.$typeName !== UserRewardCollected.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return UserRewardCollected.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): UserRewardCollected {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isUserRewardCollected(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a UserRewardCollected object`)
    }
    return UserRewardCollected.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): UserRewardCollected {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isUserRewardCollected(data.bcs.type)) {
        throw new Error(`object at is not a UserRewardCollected object`)
      }

      return UserRewardCollected.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return UserRewardCollected.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<UserRewardCollected> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching UserRewardCollected object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isUserRewardCollected(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a UserRewardCollected object`)
    }

    return UserRewardCollected.fromSuiObjectData(res.data)
  }
}

/* ============================== LiquidityProvided =============================== */

export function isLiquidityProvided(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::events::LiquidityProvided`
}

export interface LiquidityProvidedFields {
  poolId: ToField<ID>
  positionId: ToField<ID>
  coinAAmount: ToField<'u64'>
  coinBAmount: ToField<'u64'>
  poolCoinAAmount: ToField<'u64'>
  poolCoinBAmount: ToField<'u64'>
  liquidity: ToField<'u128'>
  beforeLiquidity: ToField<'u128'>
  afterLiquidity: ToField<'u128'>
  currentSqrtPrice: ToField<'u128'>
  currentTickIndex: ToField<I32>
  lowerTick: ToField<I32>
  upperTick: ToField<I32>
  sequenceNumber: ToField<'u128'>
}

export type LiquidityProvidedReified = Reified<LiquidityProvided, LiquidityProvidedFields>

export class LiquidityProvided implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::events::LiquidityProvided`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = LiquidityProvided.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::events::LiquidityProvided`
  readonly $typeArgs: []
  readonly $isPhantom = LiquidityProvided.$isPhantom

  readonly poolId: ToField<ID>
  readonly positionId: ToField<ID>
  readonly coinAAmount: ToField<'u64'>
  readonly coinBAmount: ToField<'u64'>
  readonly poolCoinAAmount: ToField<'u64'>
  readonly poolCoinBAmount: ToField<'u64'>
  readonly liquidity: ToField<'u128'>
  readonly beforeLiquidity: ToField<'u128'>
  readonly afterLiquidity: ToField<'u128'>
  readonly currentSqrtPrice: ToField<'u128'>
  readonly currentTickIndex: ToField<I32>
  readonly lowerTick: ToField<I32>
  readonly upperTick: ToField<I32>
  readonly sequenceNumber: ToField<'u128'>

  private constructor(typeArgs: [], fields: LiquidityProvidedFields) {
    this.$fullTypeName = composeSuiType(
      LiquidityProvided.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::events::LiquidityProvided`
    this.$typeArgs = typeArgs

    this.poolId = fields.poolId
    this.positionId = fields.positionId
    this.coinAAmount = fields.coinAAmount
    this.coinBAmount = fields.coinBAmount
    this.poolCoinAAmount = fields.poolCoinAAmount
    this.poolCoinBAmount = fields.poolCoinBAmount
    this.liquidity = fields.liquidity
    this.beforeLiquidity = fields.beforeLiquidity
    this.afterLiquidity = fields.afterLiquidity
    this.currentSqrtPrice = fields.currentSqrtPrice
    this.currentTickIndex = fields.currentTickIndex
    this.lowerTick = fields.lowerTick
    this.upperTick = fields.upperTick
    this.sequenceNumber = fields.sequenceNumber
  }

  static reified(): LiquidityProvidedReified {
    const reifiedBcs = LiquidityProvided.bcs
    return {
      typeName: LiquidityProvided.$typeName,
      fullTypeName: composeSuiType(
        LiquidityProvided.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::events::LiquidityProvided`,
      typeArgs: [] as [],
      isPhantom: LiquidityProvided.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => LiquidityProvided.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => LiquidityProvided.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => LiquidityProvided.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => LiquidityProvided.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => LiquidityProvided.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => LiquidityProvided.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => LiquidityProvided.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => LiquidityProvided.fetch(client, id),
      new: (fields: LiquidityProvidedFields) => {
        return new LiquidityProvided([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return LiquidityProvided.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<LiquidityProvided>> {
    return phantom(LiquidityProvided.reified())
  }
  static get p() {
    return LiquidityProvided.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('LiquidityProvided', {
      pool_id: ID.bcs,
      position_id: ID.bcs,
      coin_a_amount: bcs.u64(),
      coin_b_amount: bcs.u64(),
      pool_coin_a_amount: bcs.u64(),
      pool_coin_b_amount: bcs.u64(),
      liquidity: bcs.u128(),
      before_liquidity: bcs.u128(),
      after_liquidity: bcs.u128(),
      current_sqrt_price: bcs.u128(),
      current_tick_index: I32.bcs,
      lower_tick: I32.bcs,
      upper_tick: I32.bcs,
      sequence_number: bcs.u128(),
    })
  }

  private static cachedBcs: ReturnType<typeof LiquidityProvided.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof LiquidityProvided.instantiateBcs> {
    if (!LiquidityProvided.cachedBcs) {
      LiquidityProvided.cachedBcs = LiquidityProvided.instantiateBcs()
    }
    return LiquidityProvided.cachedBcs
  }

  static fromFields(fields: Record<string, any>): LiquidityProvided {
    return LiquidityProvided.reified().new({
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      positionId: decodeFromFields(ID.reified(), fields.position_id),
      coinAAmount: decodeFromFields('u64', fields.coin_a_amount),
      coinBAmount: decodeFromFields('u64', fields.coin_b_amount),
      poolCoinAAmount: decodeFromFields('u64', fields.pool_coin_a_amount),
      poolCoinBAmount: decodeFromFields('u64', fields.pool_coin_b_amount),
      liquidity: decodeFromFields('u128', fields.liquidity),
      beforeLiquidity: decodeFromFields('u128', fields.before_liquidity),
      afterLiquidity: decodeFromFields('u128', fields.after_liquidity),
      currentSqrtPrice: decodeFromFields('u128', fields.current_sqrt_price),
      currentTickIndex: decodeFromFields(I32.reified(), fields.current_tick_index),
      lowerTick: decodeFromFields(I32.reified(), fields.lower_tick),
      upperTick: decodeFromFields(I32.reified(), fields.upper_tick),
      sequenceNumber: decodeFromFields('u128', fields.sequence_number),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): LiquidityProvided {
    if (!isLiquidityProvided(item.type)) {
      throw new Error('not a LiquidityProvided type')
    }

    return LiquidityProvided.reified().new({
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      positionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.position_id),
      coinAAmount: decodeFromFieldsWithTypes('u64', item.fields.coin_a_amount),
      coinBAmount: decodeFromFieldsWithTypes('u64', item.fields.coin_b_amount),
      poolCoinAAmount: decodeFromFieldsWithTypes('u64', item.fields.pool_coin_a_amount),
      poolCoinBAmount: decodeFromFieldsWithTypes('u64', item.fields.pool_coin_b_amount),
      liquidity: decodeFromFieldsWithTypes('u128', item.fields.liquidity),
      beforeLiquidity: decodeFromFieldsWithTypes('u128', item.fields.before_liquidity),
      afterLiquidity: decodeFromFieldsWithTypes('u128', item.fields.after_liquidity),
      currentSqrtPrice: decodeFromFieldsWithTypes('u128', item.fields.current_sqrt_price),
      currentTickIndex: decodeFromFieldsWithTypes(I32.reified(), item.fields.current_tick_index),
      lowerTick: decodeFromFieldsWithTypes(I32.reified(), item.fields.lower_tick),
      upperTick: decodeFromFieldsWithTypes(I32.reified(), item.fields.upper_tick),
      sequenceNumber: decodeFromFieldsWithTypes('u128', item.fields.sequence_number),
    })
  }

  static fromBcs(data: Uint8Array): LiquidityProvided {
    return LiquidityProvided.fromFields(LiquidityProvided.bcs.parse(data))
  }

  toJSONField() {
    return {
      poolId: this.poolId,
      positionId: this.positionId,
      coinAAmount: this.coinAAmount.toString(),
      coinBAmount: this.coinBAmount.toString(),
      poolCoinAAmount: this.poolCoinAAmount.toString(),
      poolCoinBAmount: this.poolCoinBAmount.toString(),
      liquidity: this.liquidity.toString(),
      beforeLiquidity: this.beforeLiquidity.toString(),
      afterLiquidity: this.afterLiquidity.toString(),
      currentSqrtPrice: this.currentSqrtPrice.toString(),
      currentTickIndex: this.currentTickIndex.toJSONField(),
      lowerTick: this.lowerTick.toJSONField(),
      upperTick: this.upperTick.toJSONField(),
      sequenceNumber: this.sequenceNumber.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): LiquidityProvided {
    return LiquidityProvided.reified().new({
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      positionId: decodeFromJSONField(ID.reified(), field.positionId),
      coinAAmount: decodeFromJSONField('u64', field.coinAAmount),
      coinBAmount: decodeFromJSONField('u64', field.coinBAmount),
      poolCoinAAmount: decodeFromJSONField('u64', field.poolCoinAAmount),
      poolCoinBAmount: decodeFromJSONField('u64', field.poolCoinBAmount),
      liquidity: decodeFromJSONField('u128', field.liquidity),
      beforeLiquidity: decodeFromJSONField('u128', field.beforeLiquidity),
      afterLiquidity: decodeFromJSONField('u128', field.afterLiquidity),
      currentSqrtPrice: decodeFromJSONField('u128', field.currentSqrtPrice),
      currentTickIndex: decodeFromJSONField(I32.reified(), field.currentTickIndex),
      lowerTick: decodeFromJSONField(I32.reified(), field.lowerTick),
      upperTick: decodeFromJSONField(I32.reified(), field.upperTick),
      sequenceNumber: decodeFromJSONField('u128', field.sequenceNumber),
    })
  }

  static fromJSON(json: Record<string, any>): LiquidityProvided {
    if (json.$typeName !== LiquidityProvided.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return LiquidityProvided.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): LiquidityProvided {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isLiquidityProvided(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a LiquidityProvided object`)
    }
    return LiquidityProvided.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): LiquidityProvided {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isLiquidityProvided(data.bcs.type)) {
        throw new Error(`object at is not a LiquidityProvided object`)
      }

      return LiquidityProvided.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return LiquidityProvided.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<LiquidityProvided> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching LiquidityProvided object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isLiquidityProvided(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a LiquidityProvided object`)
    }

    return LiquidityProvided.fromSuiObjectData(res.data)
  }
}

/* ============================== LiquidityRemoved =============================== */

export function isLiquidityRemoved(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::events::LiquidityRemoved`
}

export interface LiquidityRemovedFields {
  poolId: ToField<ID>
  positionId: ToField<ID>
  coinAAmount: ToField<'u64'>
  coinBAmount: ToField<'u64'>
  poolCoinAAmount: ToField<'u64'>
  poolCoinBAmount: ToField<'u64'>
  liquidity: ToField<'u128'>
  beforeLiquidity: ToField<'u128'>
  afterLiquidity: ToField<'u128'>
  currentSqrtPrice: ToField<'u128'>
  currentTickIndex: ToField<I32>
  lowerTick: ToField<I32>
  upperTick: ToField<I32>
  sequenceNumber: ToField<'u128'>
}

export type LiquidityRemovedReified = Reified<LiquidityRemoved, LiquidityRemovedFields>

export class LiquidityRemoved implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::events::LiquidityRemoved`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = LiquidityRemoved.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::events::LiquidityRemoved`
  readonly $typeArgs: []
  readonly $isPhantom = LiquidityRemoved.$isPhantom

  readonly poolId: ToField<ID>
  readonly positionId: ToField<ID>
  readonly coinAAmount: ToField<'u64'>
  readonly coinBAmount: ToField<'u64'>
  readonly poolCoinAAmount: ToField<'u64'>
  readonly poolCoinBAmount: ToField<'u64'>
  readonly liquidity: ToField<'u128'>
  readonly beforeLiquidity: ToField<'u128'>
  readonly afterLiquidity: ToField<'u128'>
  readonly currentSqrtPrice: ToField<'u128'>
  readonly currentTickIndex: ToField<I32>
  readonly lowerTick: ToField<I32>
  readonly upperTick: ToField<I32>
  readonly sequenceNumber: ToField<'u128'>

  private constructor(typeArgs: [], fields: LiquidityRemovedFields) {
    this.$fullTypeName = composeSuiType(
      LiquidityRemoved.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::events::LiquidityRemoved`
    this.$typeArgs = typeArgs

    this.poolId = fields.poolId
    this.positionId = fields.positionId
    this.coinAAmount = fields.coinAAmount
    this.coinBAmount = fields.coinBAmount
    this.poolCoinAAmount = fields.poolCoinAAmount
    this.poolCoinBAmount = fields.poolCoinBAmount
    this.liquidity = fields.liquidity
    this.beforeLiquidity = fields.beforeLiquidity
    this.afterLiquidity = fields.afterLiquidity
    this.currentSqrtPrice = fields.currentSqrtPrice
    this.currentTickIndex = fields.currentTickIndex
    this.lowerTick = fields.lowerTick
    this.upperTick = fields.upperTick
    this.sequenceNumber = fields.sequenceNumber
  }

  static reified(): LiquidityRemovedReified {
    const reifiedBcs = LiquidityRemoved.bcs
    return {
      typeName: LiquidityRemoved.$typeName,
      fullTypeName: composeSuiType(
        LiquidityRemoved.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::events::LiquidityRemoved`,
      typeArgs: [] as [],
      isPhantom: LiquidityRemoved.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => LiquidityRemoved.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => LiquidityRemoved.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => LiquidityRemoved.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => LiquidityRemoved.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => LiquidityRemoved.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => LiquidityRemoved.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => LiquidityRemoved.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => LiquidityRemoved.fetch(client, id),
      new: (fields: LiquidityRemovedFields) => {
        return new LiquidityRemoved([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return LiquidityRemoved.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<LiquidityRemoved>> {
    return phantom(LiquidityRemoved.reified())
  }
  static get p() {
    return LiquidityRemoved.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('LiquidityRemoved', {
      pool_id: ID.bcs,
      position_id: ID.bcs,
      coin_a_amount: bcs.u64(),
      coin_b_amount: bcs.u64(),
      pool_coin_a_amount: bcs.u64(),
      pool_coin_b_amount: bcs.u64(),
      liquidity: bcs.u128(),
      before_liquidity: bcs.u128(),
      after_liquidity: bcs.u128(),
      current_sqrt_price: bcs.u128(),
      current_tick_index: I32.bcs,
      lower_tick: I32.bcs,
      upper_tick: I32.bcs,
      sequence_number: bcs.u128(),
    })
  }

  private static cachedBcs: ReturnType<typeof LiquidityRemoved.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof LiquidityRemoved.instantiateBcs> {
    if (!LiquidityRemoved.cachedBcs) {
      LiquidityRemoved.cachedBcs = LiquidityRemoved.instantiateBcs()
    }
    return LiquidityRemoved.cachedBcs
  }

  static fromFields(fields: Record<string, any>): LiquidityRemoved {
    return LiquidityRemoved.reified().new({
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      positionId: decodeFromFields(ID.reified(), fields.position_id),
      coinAAmount: decodeFromFields('u64', fields.coin_a_amount),
      coinBAmount: decodeFromFields('u64', fields.coin_b_amount),
      poolCoinAAmount: decodeFromFields('u64', fields.pool_coin_a_amount),
      poolCoinBAmount: decodeFromFields('u64', fields.pool_coin_b_amount),
      liquidity: decodeFromFields('u128', fields.liquidity),
      beforeLiquidity: decodeFromFields('u128', fields.before_liquidity),
      afterLiquidity: decodeFromFields('u128', fields.after_liquidity),
      currentSqrtPrice: decodeFromFields('u128', fields.current_sqrt_price),
      currentTickIndex: decodeFromFields(I32.reified(), fields.current_tick_index),
      lowerTick: decodeFromFields(I32.reified(), fields.lower_tick),
      upperTick: decodeFromFields(I32.reified(), fields.upper_tick),
      sequenceNumber: decodeFromFields('u128', fields.sequence_number),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): LiquidityRemoved {
    if (!isLiquidityRemoved(item.type)) {
      throw new Error('not a LiquidityRemoved type')
    }

    return LiquidityRemoved.reified().new({
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      positionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.position_id),
      coinAAmount: decodeFromFieldsWithTypes('u64', item.fields.coin_a_amount),
      coinBAmount: decodeFromFieldsWithTypes('u64', item.fields.coin_b_amount),
      poolCoinAAmount: decodeFromFieldsWithTypes('u64', item.fields.pool_coin_a_amount),
      poolCoinBAmount: decodeFromFieldsWithTypes('u64', item.fields.pool_coin_b_amount),
      liquidity: decodeFromFieldsWithTypes('u128', item.fields.liquidity),
      beforeLiquidity: decodeFromFieldsWithTypes('u128', item.fields.before_liquidity),
      afterLiquidity: decodeFromFieldsWithTypes('u128', item.fields.after_liquidity),
      currentSqrtPrice: decodeFromFieldsWithTypes('u128', item.fields.current_sqrt_price),
      currentTickIndex: decodeFromFieldsWithTypes(I32.reified(), item.fields.current_tick_index),
      lowerTick: decodeFromFieldsWithTypes(I32.reified(), item.fields.lower_tick),
      upperTick: decodeFromFieldsWithTypes(I32.reified(), item.fields.upper_tick),
      sequenceNumber: decodeFromFieldsWithTypes('u128', item.fields.sequence_number),
    })
  }

  static fromBcs(data: Uint8Array): LiquidityRemoved {
    return LiquidityRemoved.fromFields(LiquidityRemoved.bcs.parse(data))
  }

  toJSONField() {
    return {
      poolId: this.poolId,
      positionId: this.positionId,
      coinAAmount: this.coinAAmount.toString(),
      coinBAmount: this.coinBAmount.toString(),
      poolCoinAAmount: this.poolCoinAAmount.toString(),
      poolCoinBAmount: this.poolCoinBAmount.toString(),
      liquidity: this.liquidity.toString(),
      beforeLiquidity: this.beforeLiquidity.toString(),
      afterLiquidity: this.afterLiquidity.toString(),
      currentSqrtPrice: this.currentSqrtPrice.toString(),
      currentTickIndex: this.currentTickIndex.toJSONField(),
      lowerTick: this.lowerTick.toJSONField(),
      upperTick: this.upperTick.toJSONField(),
      sequenceNumber: this.sequenceNumber.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): LiquidityRemoved {
    return LiquidityRemoved.reified().new({
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      positionId: decodeFromJSONField(ID.reified(), field.positionId),
      coinAAmount: decodeFromJSONField('u64', field.coinAAmount),
      coinBAmount: decodeFromJSONField('u64', field.coinBAmount),
      poolCoinAAmount: decodeFromJSONField('u64', field.poolCoinAAmount),
      poolCoinBAmount: decodeFromJSONField('u64', field.poolCoinBAmount),
      liquidity: decodeFromJSONField('u128', field.liquidity),
      beforeLiquidity: decodeFromJSONField('u128', field.beforeLiquidity),
      afterLiquidity: decodeFromJSONField('u128', field.afterLiquidity),
      currentSqrtPrice: decodeFromJSONField('u128', field.currentSqrtPrice),
      currentTickIndex: decodeFromJSONField(I32.reified(), field.currentTickIndex),
      lowerTick: decodeFromJSONField(I32.reified(), field.lowerTick),
      upperTick: decodeFromJSONField(I32.reified(), field.upperTick),
      sequenceNumber: decodeFromJSONField('u128', field.sequenceNumber),
    })
  }

  static fromJSON(json: Record<string, any>): LiquidityRemoved {
    if (json.$typeName !== LiquidityRemoved.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return LiquidityRemoved.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): LiquidityRemoved {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isLiquidityRemoved(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a LiquidityRemoved object`)
    }
    return LiquidityRemoved.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): LiquidityRemoved {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isLiquidityRemoved(data.bcs.type)) {
        throw new Error(`object at is not a LiquidityRemoved object`)
      }

      return LiquidityRemoved.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return LiquidityRemoved.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<LiquidityRemoved> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching LiquidityRemoved object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isLiquidityRemoved(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a LiquidityRemoved object`)
    }

    return LiquidityRemoved.fromSuiObjectData(res.data)
  }
}

/* ============================== UpdatePoolRewardEmissionEvent =============================== */

export function isUpdatePoolRewardEmissionEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::events::UpdatePoolRewardEmissionEvent`
}

export interface UpdatePoolRewardEmissionEventFields {
  poolId: ToField<ID>
  rewardCoinSymbol: ToField<String>
  rewardCoinType: ToField<String>
  rewardCoinDecimals: ToField<'u8'>
  totalReward: ToField<'u64'>
  endedAtSeconds: ToField<'u64'>
  lastUpdateTime: ToField<'u64'>
  rewardPerSeconds: ToField<'u128'>
  sequenceNumber: ToField<'u128'>
}

export type UpdatePoolRewardEmissionEventReified = Reified<
  UpdatePoolRewardEmissionEvent,
  UpdatePoolRewardEmissionEventFields
>

export class UpdatePoolRewardEmissionEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::events::UpdatePoolRewardEmissionEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = UpdatePoolRewardEmissionEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::events::UpdatePoolRewardEmissionEvent`
  readonly $typeArgs: []
  readonly $isPhantom = UpdatePoolRewardEmissionEvent.$isPhantom

  readonly poolId: ToField<ID>
  readonly rewardCoinSymbol: ToField<String>
  readonly rewardCoinType: ToField<String>
  readonly rewardCoinDecimals: ToField<'u8'>
  readonly totalReward: ToField<'u64'>
  readonly endedAtSeconds: ToField<'u64'>
  readonly lastUpdateTime: ToField<'u64'>
  readonly rewardPerSeconds: ToField<'u128'>
  readonly sequenceNumber: ToField<'u128'>

  private constructor(typeArgs: [], fields: UpdatePoolRewardEmissionEventFields) {
    this.$fullTypeName = composeSuiType(
      UpdatePoolRewardEmissionEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::events::UpdatePoolRewardEmissionEvent`
    this.$typeArgs = typeArgs

    this.poolId = fields.poolId
    this.rewardCoinSymbol = fields.rewardCoinSymbol
    this.rewardCoinType = fields.rewardCoinType
    this.rewardCoinDecimals = fields.rewardCoinDecimals
    this.totalReward = fields.totalReward
    this.endedAtSeconds = fields.endedAtSeconds
    this.lastUpdateTime = fields.lastUpdateTime
    this.rewardPerSeconds = fields.rewardPerSeconds
    this.sequenceNumber = fields.sequenceNumber
  }

  static reified(): UpdatePoolRewardEmissionEventReified {
    const reifiedBcs = UpdatePoolRewardEmissionEvent.bcs
    return {
      typeName: UpdatePoolRewardEmissionEvent.$typeName,
      fullTypeName: composeSuiType(
        UpdatePoolRewardEmissionEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::events::UpdatePoolRewardEmissionEvent`,
      typeArgs: [] as [],
      isPhantom: UpdatePoolRewardEmissionEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => UpdatePoolRewardEmissionEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        UpdatePoolRewardEmissionEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) =>
        UpdatePoolRewardEmissionEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => UpdatePoolRewardEmissionEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => UpdatePoolRewardEmissionEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        UpdatePoolRewardEmissionEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        UpdatePoolRewardEmissionEvent.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) =>
        UpdatePoolRewardEmissionEvent.fetch(client, id),
      new: (fields: UpdatePoolRewardEmissionEventFields) => {
        return new UpdatePoolRewardEmissionEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return UpdatePoolRewardEmissionEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<UpdatePoolRewardEmissionEvent>> {
    return phantom(UpdatePoolRewardEmissionEvent.reified())
  }
  static get p() {
    return UpdatePoolRewardEmissionEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('UpdatePoolRewardEmissionEvent', {
      pool_id: ID.bcs,
      reward_coin_symbol: String.bcs,
      reward_coin_type: String.bcs,
      reward_coin_decimals: bcs.u8(),
      total_reward: bcs.u64(),
      ended_at_seconds: bcs.u64(),
      last_update_time: bcs.u64(),
      reward_per_seconds: bcs.u128(),
      sequence_number: bcs.u128(),
    })
  }

  private static cachedBcs: ReturnType<typeof UpdatePoolRewardEmissionEvent.instantiateBcs> | null =
    null

  static get bcs(): ReturnType<typeof UpdatePoolRewardEmissionEvent.instantiateBcs> {
    if (!UpdatePoolRewardEmissionEvent.cachedBcs) {
      UpdatePoolRewardEmissionEvent.cachedBcs = UpdatePoolRewardEmissionEvent.instantiateBcs()
    }
    return UpdatePoolRewardEmissionEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): UpdatePoolRewardEmissionEvent {
    return UpdatePoolRewardEmissionEvent.reified().new({
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      rewardCoinSymbol: decodeFromFields(String.reified(), fields.reward_coin_symbol),
      rewardCoinType: decodeFromFields(String.reified(), fields.reward_coin_type),
      rewardCoinDecimals: decodeFromFields('u8', fields.reward_coin_decimals),
      totalReward: decodeFromFields('u64', fields.total_reward),
      endedAtSeconds: decodeFromFields('u64', fields.ended_at_seconds),
      lastUpdateTime: decodeFromFields('u64', fields.last_update_time),
      rewardPerSeconds: decodeFromFields('u128', fields.reward_per_seconds),
      sequenceNumber: decodeFromFields('u128', fields.sequence_number),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): UpdatePoolRewardEmissionEvent {
    if (!isUpdatePoolRewardEmissionEvent(item.type)) {
      throw new Error('not a UpdatePoolRewardEmissionEvent type')
    }

    return UpdatePoolRewardEmissionEvent.reified().new({
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      rewardCoinSymbol: decodeFromFieldsWithTypes(String.reified(), item.fields.reward_coin_symbol),
      rewardCoinType: decodeFromFieldsWithTypes(String.reified(), item.fields.reward_coin_type),
      rewardCoinDecimals: decodeFromFieldsWithTypes('u8', item.fields.reward_coin_decimals),
      totalReward: decodeFromFieldsWithTypes('u64', item.fields.total_reward),
      endedAtSeconds: decodeFromFieldsWithTypes('u64', item.fields.ended_at_seconds),
      lastUpdateTime: decodeFromFieldsWithTypes('u64', item.fields.last_update_time),
      rewardPerSeconds: decodeFromFieldsWithTypes('u128', item.fields.reward_per_seconds),
      sequenceNumber: decodeFromFieldsWithTypes('u128', item.fields.sequence_number),
    })
  }

  static fromBcs(data: Uint8Array): UpdatePoolRewardEmissionEvent {
    return UpdatePoolRewardEmissionEvent.fromFields(UpdatePoolRewardEmissionEvent.bcs.parse(data))
  }

  toJSONField() {
    return {
      poolId: this.poolId,
      rewardCoinSymbol: this.rewardCoinSymbol,
      rewardCoinType: this.rewardCoinType,
      rewardCoinDecimals: this.rewardCoinDecimals,
      totalReward: this.totalReward.toString(),
      endedAtSeconds: this.endedAtSeconds.toString(),
      lastUpdateTime: this.lastUpdateTime.toString(),
      rewardPerSeconds: this.rewardPerSeconds.toString(),
      sequenceNumber: this.sequenceNumber.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): UpdatePoolRewardEmissionEvent {
    return UpdatePoolRewardEmissionEvent.reified().new({
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      rewardCoinSymbol: decodeFromJSONField(String.reified(), field.rewardCoinSymbol),
      rewardCoinType: decodeFromJSONField(String.reified(), field.rewardCoinType),
      rewardCoinDecimals: decodeFromJSONField('u8', field.rewardCoinDecimals),
      totalReward: decodeFromJSONField('u64', field.totalReward),
      endedAtSeconds: decodeFromJSONField('u64', field.endedAtSeconds),
      lastUpdateTime: decodeFromJSONField('u64', field.lastUpdateTime),
      rewardPerSeconds: decodeFromJSONField('u128', field.rewardPerSeconds),
      sequenceNumber: decodeFromJSONField('u128', field.sequenceNumber),
    })
  }

  static fromJSON(json: Record<string, any>): UpdatePoolRewardEmissionEvent {
    if (json.$typeName !== UpdatePoolRewardEmissionEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return UpdatePoolRewardEmissionEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): UpdatePoolRewardEmissionEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isUpdatePoolRewardEmissionEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a UpdatePoolRewardEmissionEvent object`
      )
    }
    return UpdatePoolRewardEmissionEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): UpdatePoolRewardEmissionEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isUpdatePoolRewardEmissionEvent(data.bcs.type)) {
        throw new Error(`object at is not a UpdatePoolRewardEmissionEvent object`)
      }

      return UpdatePoolRewardEmissionEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return UpdatePoolRewardEmissionEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<UpdatePoolRewardEmissionEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(
        `error fetching UpdatePoolRewardEmissionEvent object at id ${id}: ${res.error.code}`
      )
    }
    if (
      res.data?.bcs?.dataType !== 'moveObject' ||
      !isUpdatePoolRewardEmissionEvent(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a UpdatePoolRewardEmissionEvent object`)
    }

    return UpdatePoolRewardEmissionEvent.fromSuiObjectData(res.data)
  }
}

/* ============================== SupportedVersionUpdate =============================== */

export function isSupportedVersionUpdate(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V2}::events::SupportedVersionUpdate`
}

export interface SupportedVersionUpdateFields {
  oldVersion: ToField<'u64'>
  newVersion: ToField<'u64'>
}

export type SupportedVersionUpdateReified = Reified<
  SupportedVersionUpdate,
  SupportedVersionUpdateFields
>

export class SupportedVersionUpdate implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V2}::events::SupportedVersionUpdate`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = SupportedVersionUpdate.$typeName
  readonly $fullTypeName: `${typeof PKG_V2}::events::SupportedVersionUpdate`
  readonly $typeArgs: []
  readonly $isPhantom = SupportedVersionUpdate.$isPhantom

  readonly oldVersion: ToField<'u64'>
  readonly newVersion: ToField<'u64'>

  private constructor(typeArgs: [], fields: SupportedVersionUpdateFields) {
    this.$fullTypeName = composeSuiType(
      SupportedVersionUpdate.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V2}::events::SupportedVersionUpdate`
    this.$typeArgs = typeArgs

    this.oldVersion = fields.oldVersion
    this.newVersion = fields.newVersion
  }

  static reified(): SupportedVersionUpdateReified {
    const reifiedBcs = SupportedVersionUpdate.bcs
    return {
      typeName: SupportedVersionUpdate.$typeName,
      fullTypeName: composeSuiType(
        SupportedVersionUpdate.$typeName,
        ...[]
      ) as `${typeof PKG_V2}::events::SupportedVersionUpdate`,
      typeArgs: [] as [],
      isPhantom: SupportedVersionUpdate.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => SupportedVersionUpdate.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        SupportedVersionUpdate.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => SupportedVersionUpdate.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => SupportedVersionUpdate.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => SupportedVersionUpdate.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        SupportedVersionUpdate.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        SupportedVersionUpdate.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => SupportedVersionUpdate.fetch(client, id),
      new: (fields: SupportedVersionUpdateFields) => {
        return new SupportedVersionUpdate([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return SupportedVersionUpdate.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<SupportedVersionUpdate>> {
    return phantom(SupportedVersionUpdate.reified())
  }
  static get p() {
    return SupportedVersionUpdate.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('SupportedVersionUpdate', {
      old_version: bcs.u64(),
      new_version: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof SupportedVersionUpdate.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof SupportedVersionUpdate.instantiateBcs> {
    if (!SupportedVersionUpdate.cachedBcs) {
      SupportedVersionUpdate.cachedBcs = SupportedVersionUpdate.instantiateBcs()
    }
    return SupportedVersionUpdate.cachedBcs
  }

  static fromFields(fields: Record<string, any>): SupportedVersionUpdate {
    return SupportedVersionUpdate.reified().new({
      oldVersion: decodeFromFields('u64', fields.old_version),
      newVersion: decodeFromFields('u64', fields.new_version),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): SupportedVersionUpdate {
    if (!isSupportedVersionUpdate(item.type)) {
      throw new Error('not a SupportedVersionUpdate type')
    }

    return SupportedVersionUpdate.reified().new({
      oldVersion: decodeFromFieldsWithTypes('u64', item.fields.old_version),
      newVersion: decodeFromFieldsWithTypes('u64', item.fields.new_version),
    })
  }

  static fromBcs(data: Uint8Array): SupportedVersionUpdate {
    return SupportedVersionUpdate.fromFields(SupportedVersionUpdate.bcs.parse(data))
  }

  toJSONField() {
    return {
      oldVersion: this.oldVersion.toString(),
      newVersion: this.newVersion.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): SupportedVersionUpdate {
    return SupportedVersionUpdate.reified().new({
      oldVersion: decodeFromJSONField('u64', field.oldVersion),
      newVersion: decodeFromJSONField('u64', field.newVersion),
    })
  }

  static fromJSON(json: Record<string, any>): SupportedVersionUpdate {
    if (json.$typeName !== SupportedVersionUpdate.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return SupportedVersionUpdate.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): SupportedVersionUpdate {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isSupportedVersionUpdate(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a SupportedVersionUpdate object`
      )
    }
    return SupportedVersionUpdate.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): SupportedVersionUpdate {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isSupportedVersionUpdate(data.bcs.type)) {
        throw new Error(`object at is not a SupportedVersionUpdate object`)
      }

      return SupportedVersionUpdate.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return SupportedVersionUpdate.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<SupportedVersionUpdate> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching SupportedVersionUpdate object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isSupportedVersionUpdate(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a SupportedVersionUpdate object`)
    }

    return SupportedVersionUpdate.fromSuiObjectData(res.data)
  }
}

/* ============================== TickUpdate =============================== */

export function isTickUpdate(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V2}::events::TickUpdate`
}

export interface TickUpdateFields {
  index: ToField<I32>
  liquidityGross: ToField<'u128'>
  liquidityNet: ToField<I128>
}

export type TickUpdateReified = Reified<TickUpdate, TickUpdateFields>

export class TickUpdate implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V2}::events::TickUpdate`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = TickUpdate.$typeName
  readonly $fullTypeName: `${typeof PKG_V2}::events::TickUpdate`
  readonly $typeArgs: []
  readonly $isPhantom = TickUpdate.$isPhantom

  readonly index: ToField<I32>
  readonly liquidityGross: ToField<'u128'>
  readonly liquidityNet: ToField<I128>

  private constructor(typeArgs: [], fields: TickUpdateFields) {
    this.$fullTypeName = composeSuiType(
      TickUpdate.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V2}::events::TickUpdate`
    this.$typeArgs = typeArgs

    this.index = fields.index
    this.liquidityGross = fields.liquidityGross
    this.liquidityNet = fields.liquidityNet
  }

  static reified(): TickUpdateReified {
    const reifiedBcs = TickUpdate.bcs
    return {
      typeName: TickUpdate.$typeName,
      fullTypeName: composeSuiType(
        TickUpdate.$typeName,
        ...[]
      ) as `${typeof PKG_V2}::events::TickUpdate`,
      typeArgs: [] as [],
      isPhantom: TickUpdate.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => TickUpdate.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => TickUpdate.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => TickUpdate.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => TickUpdate.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => TickUpdate.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => TickUpdate.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => TickUpdate.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => TickUpdate.fetch(client, id),
      new: (fields: TickUpdateFields) => {
        return new TickUpdate([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return TickUpdate.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<TickUpdate>> {
    return phantom(TickUpdate.reified())
  }
  static get p() {
    return TickUpdate.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('TickUpdate', {
      index: I32.bcs,
      liquidity_gross: bcs.u128(),
      liquidity_net: I128.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof TickUpdate.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof TickUpdate.instantiateBcs> {
    if (!TickUpdate.cachedBcs) {
      TickUpdate.cachedBcs = TickUpdate.instantiateBcs()
    }
    return TickUpdate.cachedBcs
  }

  static fromFields(fields: Record<string, any>): TickUpdate {
    return TickUpdate.reified().new({
      index: decodeFromFields(I32.reified(), fields.index),
      liquidityGross: decodeFromFields('u128', fields.liquidity_gross),
      liquidityNet: decodeFromFields(I128.reified(), fields.liquidity_net),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): TickUpdate {
    if (!isTickUpdate(item.type)) {
      throw new Error('not a TickUpdate type')
    }

    return TickUpdate.reified().new({
      index: decodeFromFieldsWithTypes(I32.reified(), item.fields.index),
      liquidityGross: decodeFromFieldsWithTypes('u128', item.fields.liquidity_gross),
      liquidityNet: decodeFromFieldsWithTypes(I128.reified(), item.fields.liquidity_net),
    })
  }

  static fromBcs(data: Uint8Array): TickUpdate {
    return TickUpdate.fromFields(TickUpdate.bcs.parse(data))
  }

  toJSONField() {
    return {
      index: this.index.toJSONField(),
      liquidityGross: this.liquidityGross.toString(),
      liquidityNet: this.liquidityNet.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): TickUpdate {
    return TickUpdate.reified().new({
      index: decodeFromJSONField(I32.reified(), field.index),
      liquidityGross: decodeFromJSONField('u128', field.liquidityGross),
      liquidityNet: decodeFromJSONField(I128.reified(), field.liquidityNet),
    })
  }

  static fromJSON(json: Record<string, any>): TickUpdate {
    if (json.$typeName !== TickUpdate.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return TickUpdate.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): TickUpdate {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isTickUpdate(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a TickUpdate object`)
    }
    return TickUpdate.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): TickUpdate {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isTickUpdate(data.bcs.type)) {
        throw new Error(`object at is not a TickUpdate object`)
      }

      return TickUpdate.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return TickUpdate.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<TickUpdate> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching TickUpdate object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isTickUpdate(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a TickUpdate object`)
    }

    return TickUpdate.fromSuiObjectData(res.data)
  }
}

/* ============================== PoolPauseStatusUpdate =============================== */

export function isPoolPauseStatusUpdate(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V4}::events::PoolPauseStatusUpdate`
}

export interface PoolPauseStatusUpdateFields {
  poolId: ToField<ID>
  status: ToField<'bool'>
  sequenceNumber: ToField<'u128'>
}

export type PoolPauseStatusUpdateReified = Reified<
  PoolPauseStatusUpdate,
  PoolPauseStatusUpdateFields
>

export class PoolPauseStatusUpdate implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V4}::events::PoolPauseStatusUpdate`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = PoolPauseStatusUpdate.$typeName
  readonly $fullTypeName: `${typeof PKG_V4}::events::PoolPauseStatusUpdate`
  readonly $typeArgs: []
  readonly $isPhantom = PoolPauseStatusUpdate.$isPhantom

  readonly poolId: ToField<ID>
  readonly status: ToField<'bool'>
  readonly sequenceNumber: ToField<'u128'>

  private constructor(typeArgs: [], fields: PoolPauseStatusUpdateFields) {
    this.$fullTypeName = composeSuiType(
      PoolPauseStatusUpdate.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V4}::events::PoolPauseStatusUpdate`
    this.$typeArgs = typeArgs

    this.poolId = fields.poolId
    this.status = fields.status
    this.sequenceNumber = fields.sequenceNumber
  }

  static reified(): PoolPauseStatusUpdateReified {
    const reifiedBcs = PoolPauseStatusUpdate.bcs
    return {
      typeName: PoolPauseStatusUpdate.$typeName,
      fullTypeName: composeSuiType(
        PoolPauseStatusUpdate.$typeName,
        ...[]
      ) as `${typeof PKG_V4}::events::PoolPauseStatusUpdate`,
      typeArgs: [] as [],
      isPhantom: PoolPauseStatusUpdate.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PoolPauseStatusUpdate.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        PoolPauseStatusUpdate.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PoolPauseStatusUpdate.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PoolPauseStatusUpdate.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PoolPauseStatusUpdate.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        PoolPauseStatusUpdate.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        PoolPauseStatusUpdate.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => PoolPauseStatusUpdate.fetch(client, id),
      new: (fields: PoolPauseStatusUpdateFields) => {
        return new PoolPauseStatusUpdate([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return PoolPauseStatusUpdate.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PoolPauseStatusUpdate>> {
    return phantom(PoolPauseStatusUpdate.reified())
  }
  static get p() {
    return PoolPauseStatusUpdate.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('PoolPauseStatusUpdate', {
      pool_id: ID.bcs,
      status: bcs.bool(),
      sequence_number: bcs.u128(),
    })
  }

  private static cachedBcs: ReturnType<typeof PoolPauseStatusUpdate.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof PoolPauseStatusUpdate.instantiateBcs> {
    if (!PoolPauseStatusUpdate.cachedBcs) {
      PoolPauseStatusUpdate.cachedBcs = PoolPauseStatusUpdate.instantiateBcs()
    }
    return PoolPauseStatusUpdate.cachedBcs
  }

  static fromFields(fields: Record<string, any>): PoolPauseStatusUpdate {
    return PoolPauseStatusUpdate.reified().new({
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      status: decodeFromFields('bool', fields.status),
      sequenceNumber: decodeFromFields('u128', fields.sequence_number),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PoolPauseStatusUpdate {
    if (!isPoolPauseStatusUpdate(item.type)) {
      throw new Error('not a PoolPauseStatusUpdate type')
    }

    return PoolPauseStatusUpdate.reified().new({
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      status: decodeFromFieldsWithTypes('bool', item.fields.status),
      sequenceNumber: decodeFromFieldsWithTypes('u128', item.fields.sequence_number),
    })
  }

  static fromBcs(data: Uint8Array): PoolPauseStatusUpdate {
    return PoolPauseStatusUpdate.fromFields(PoolPauseStatusUpdate.bcs.parse(data))
  }

  toJSONField() {
    return {
      poolId: this.poolId,
      status: this.status,
      sequenceNumber: this.sequenceNumber.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PoolPauseStatusUpdate {
    return PoolPauseStatusUpdate.reified().new({
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      status: decodeFromJSONField('bool', field.status),
      sequenceNumber: decodeFromJSONField('u128', field.sequenceNumber),
    })
  }

  static fromJSON(json: Record<string, any>): PoolPauseStatusUpdate {
    if (json.$typeName !== PoolPauseStatusUpdate.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return PoolPauseStatusUpdate.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): PoolPauseStatusUpdate {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPoolPauseStatusUpdate(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a PoolPauseStatusUpdate object`
      )
    }
    return PoolPauseStatusUpdate.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): PoolPauseStatusUpdate {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPoolPauseStatusUpdate(data.bcs.type)) {
        throw new Error(`object at is not a PoolPauseStatusUpdate object`)
      }

      return PoolPauseStatusUpdate.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PoolPauseStatusUpdate.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<PoolPauseStatusUpdate> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching PoolPauseStatusUpdate object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isPoolPauseStatusUpdate(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a PoolPauseStatusUpdate object`)
    }

    return PoolPauseStatusUpdate.fromSuiObjectData(res.data)
  }
}

/* ============================== RewardsManagerUpdate =============================== */

export function isRewardsManagerUpdate(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V4}::events::RewardsManagerUpdate`
}

export interface RewardsManagerUpdateFields {
  manager: ToField<'address'>
  isActive: ToField<'bool'>
}

export type RewardsManagerUpdateReified = Reified<RewardsManagerUpdate, RewardsManagerUpdateFields>

export class RewardsManagerUpdate implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V4}::events::RewardsManagerUpdate`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = RewardsManagerUpdate.$typeName
  readonly $fullTypeName: `${typeof PKG_V4}::events::RewardsManagerUpdate`
  readonly $typeArgs: []
  readonly $isPhantom = RewardsManagerUpdate.$isPhantom

  readonly manager: ToField<'address'>
  readonly isActive: ToField<'bool'>

  private constructor(typeArgs: [], fields: RewardsManagerUpdateFields) {
    this.$fullTypeName = composeSuiType(
      RewardsManagerUpdate.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V4}::events::RewardsManagerUpdate`
    this.$typeArgs = typeArgs

    this.manager = fields.manager
    this.isActive = fields.isActive
  }

  static reified(): RewardsManagerUpdateReified {
    const reifiedBcs = RewardsManagerUpdate.bcs
    return {
      typeName: RewardsManagerUpdate.$typeName,
      fullTypeName: composeSuiType(
        RewardsManagerUpdate.$typeName,
        ...[]
      ) as `${typeof PKG_V4}::events::RewardsManagerUpdate`,
      typeArgs: [] as [],
      isPhantom: RewardsManagerUpdate.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => RewardsManagerUpdate.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        RewardsManagerUpdate.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => RewardsManagerUpdate.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => RewardsManagerUpdate.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => RewardsManagerUpdate.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        RewardsManagerUpdate.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        RewardsManagerUpdate.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => RewardsManagerUpdate.fetch(client, id),
      new: (fields: RewardsManagerUpdateFields) => {
        return new RewardsManagerUpdate([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return RewardsManagerUpdate.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RewardsManagerUpdate>> {
    return phantom(RewardsManagerUpdate.reified())
  }
  static get p() {
    return RewardsManagerUpdate.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('RewardsManagerUpdate', {
      manager: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      is_active: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof RewardsManagerUpdate.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof RewardsManagerUpdate.instantiateBcs> {
    if (!RewardsManagerUpdate.cachedBcs) {
      RewardsManagerUpdate.cachedBcs = RewardsManagerUpdate.instantiateBcs()
    }
    return RewardsManagerUpdate.cachedBcs
  }

  static fromFields(fields: Record<string, any>): RewardsManagerUpdate {
    return RewardsManagerUpdate.reified().new({
      manager: decodeFromFields('address', fields.manager),
      isActive: decodeFromFields('bool', fields.is_active),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): RewardsManagerUpdate {
    if (!isRewardsManagerUpdate(item.type)) {
      throw new Error('not a RewardsManagerUpdate type')
    }

    return RewardsManagerUpdate.reified().new({
      manager: decodeFromFieldsWithTypes('address', item.fields.manager),
      isActive: decodeFromFieldsWithTypes('bool', item.fields.is_active),
    })
  }

  static fromBcs(data: Uint8Array): RewardsManagerUpdate {
    return RewardsManagerUpdate.fromFields(RewardsManagerUpdate.bcs.parse(data))
  }

  toJSONField() {
    return {
      manager: this.manager,
      isActive: this.isActive,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): RewardsManagerUpdate {
    return RewardsManagerUpdate.reified().new({
      manager: decodeFromJSONField('address', field.manager),
      isActive: decodeFromJSONField('bool', field.isActive),
    })
  }

  static fromJSON(json: Record<string, any>): RewardsManagerUpdate {
    if (json.$typeName !== RewardsManagerUpdate.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return RewardsManagerUpdate.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): RewardsManagerUpdate {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRewardsManagerUpdate(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a RewardsManagerUpdate object`
      )
    }
    return RewardsManagerUpdate.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): RewardsManagerUpdate {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRewardsManagerUpdate(data.bcs.type)) {
        throw new Error(`object at is not a RewardsManagerUpdate object`)
      }

      return RewardsManagerUpdate.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RewardsManagerUpdate.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<RewardsManagerUpdate> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching RewardsManagerUpdate object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isRewardsManagerUpdate(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a RewardsManagerUpdate object`)
    }

    return RewardsManagerUpdate.fromSuiObjectData(res.data)
  }
}

/* ============================== PoolTickUpdate =============================== */

export function isPoolTickUpdate(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V4}::events::PoolTickUpdate`
}

export interface PoolTickUpdateFields {
  pool: ToField<ID>
  index: ToField<I32>
  liquidityGross: ToField<'u128'>
  liquidityNet: ToField<I128>
}

export type PoolTickUpdateReified = Reified<PoolTickUpdate, PoolTickUpdateFields>

export class PoolTickUpdate implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V4}::events::PoolTickUpdate`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = PoolTickUpdate.$typeName
  readonly $fullTypeName: `${typeof PKG_V4}::events::PoolTickUpdate`
  readonly $typeArgs: []
  readonly $isPhantom = PoolTickUpdate.$isPhantom

  readonly pool: ToField<ID>
  readonly index: ToField<I32>
  readonly liquidityGross: ToField<'u128'>
  readonly liquidityNet: ToField<I128>

  private constructor(typeArgs: [], fields: PoolTickUpdateFields) {
    this.$fullTypeName = composeSuiType(
      PoolTickUpdate.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V4}::events::PoolTickUpdate`
    this.$typeArgs = typeArgs

    this.pool = fields.pool
    this.index = fields.index
    this.liquidityGross = fields.liquidityGross
    this.liquidityNet = fields.liquidityNet
  }

  static reified(): PoolTickUpdateReified {
    const reifiedBcs = PoolTickUpdate.bcs
    return {
      typeName: PoolTickUpdate.$typeName,
      fullTypeName: composeSuiType(
        PoolTickUpdate.$typeName,
        ...[]
      ) as `${typeof PKG_V4}::events::PoolTickUpdate`,
      typeArgs: [] as [],
      isPhantom: PoolTickUpdate.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PoolTickUpdate.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PoolTickUpdate.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PoolTickUpdate.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PoolTickUpdate.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PoolTickUpdate.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => PoolTickUpdate.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PoolTickUpdate.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => PoolTickUpdate.fetch(client, id),
      new: (fields: PoolTickUpdateFields) => {
        return new PoolTickUpdate([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return PoolTickUpdate.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PoolTickUpdate>> {
    return phantom(PoolTickUpdate.reified())
  }
  static get p() {
    return PoolTickUpdate.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('PoolTickUpdate', {
      pool: ID.bcs,
      index: I32.bcs,
      liquidity_gross: bcs.u128(),
      liquidity_net: I128.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof PoolTickUpdate.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof PoolTickUpdate.instantiateBcs> {
    if (!PoolTickUpdate.cachedBcs) {
      PoolTickUpdate.cachedBcs = PoolTickUpdate.instantiateBcs()
    }
    return PoolTickUpdate.cachedBcs
  }

  static fromFields(fields: Record<string, any>): PoolTickUpdate {
    return PoolTickUpdate.reified().new({
      pool: decodeFromFields(ID.reified(), fields.pool),
      index: decodeFromFields(I32.reified(), fields.index),
      liquidityGross: decodeFromFields('u128', fields.liquidity_gross),
      liquidityNet: decodeFromFields(I128.reified(), fields.liquidity_net),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PoolTickUpdate {
    if (!isPoolTickUpdate(item.type)) {
      throw new Error('not a PoolTickUpdate type')
    }

    return PoolTickUpdate.reified().new({
      pool: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool),
      index: decodeFromFieldsWithTypes(I32.reified(), item.fields.index),
      liquidityGross: decodeFromFieldsWithTypes('u128', item.fields.liquidity_gross),
      liquidityNet: decodeFromFieldsWithTypes(I128.reified(), item.fields.liquidity_net),
    })
  }

  static fromBcs(data: Uint8Array): PoolTickUpdate {
    return PoolTickUpdate.fromFields(PoolTickUpdate.bcs.parse(data))
  }

  toJSONField() {
    return {
      pool: this.pool,
      index: this.index.toJSONField(),
      liquidityGross: this.liquidityGross.toString(),
      liquidityNet: this.liquidityNet.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PoolTickUpdate {
    return PoolTickUpdate.reified().new({
      pool: decodeFromJSONField(ID.reified(), field.pool),
      index: decodeFromJSONField(I32.reified(), field.index),
      liquidityGross: decodeFromJSONField('u128', field.liquidityGross),
      liquidityNet: decodeFromJSONField(I128.reified(), field.liquidityNet),
    })
  }

  static fromJSON(json: Record<string, any>): PoolTickUpdate {
    if (json.$typeName !== PoolTickUpdate.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return PoolTickUpdate.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): PoolTickUpdate {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPoolTickUpdate(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PoolTickUpdate object`)
    }
    return PoolTickUpdate.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): PoolTickUpdate {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPoolTickUpdate(data.bcs.type)) {
        throw new Error(`object at is not a PoolTickUpdate object`)
      }

      return PoolTickUpdate.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PoolTickUpdate.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<PoolTickUpdate> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching PoolTickUpdate object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isPoolTickUpdate(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a PoolTickUpdate object`)
    }

    return PoolTickUpdate.fromSuiObjectData(res.data)
  }
}

/* ============================== ProtocolFeeShareUpdated =============================== */

export function isProtocolFeeShareUpdated(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V4}::events::ProtocolFeeShareUpdated`
}

export interface ProtocolFeeShareUpdatedFields {
  pool: ToField<ID>
  previousProtocolFeeShare: ToField<'u64'>
  currentProtocolFeeShare: ToField<'u64'>
  sequenceNumber: ToField<'u128'>
}

export type ProtocolFeeShareUpdatedReified = Reified<
  ProtocolFeeShareUpdated,
  ProtocolFeeShareUpdatedFields
>

export class ProtocolFeeShareUpdated implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V4}::events::ProtocolFeeShareUpdated`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = ProtocolFeeShareUpdated.$typeName
  readonly $fullTypeName: `${typeof PKG_V4}::events::ProtocolFeeShareUpdated`
  readonly $typeArgs: []
  readonly $isPhantom = ProtocolFeeShareUpdated.$isPhantom

  readonly pool: ToField<ID>
  readonly previousProtocolFeeShare: ToField<'u64'>
  readonly currentProtocolFeeShare: ToField<'u64'>
  readonly sequenceNumber: ToField<'u128'>

  private constructor(typeArgs: [], fields: ProtocolFeeShareUpdatedFields) {
    this.$fullTypeName = composeSuiType(
      ProtocolFeeShareUpdated.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V4}::events::ProtocolFeeShareUpdated`
    this.$typeArgs = typeArgs

    this.pool = fields.pool
    this.previousProtocolFeeShare = fields.previousProtocolFeeShare
    this.currentProtocolFeeShare = fields.currentProtocolFeeShare
    this.sequenceNumber = fields.sequenceNumber
  }

  static reified(): ProtocolFeeShareUpdatedReified {
    const reifiedBcs = ProtocolFeeShareUpdated.bcs
    return {
      typeName: ProtocolFeeShareUpdated.$typeName,
      fullTypeName: composeSuiType(
        ProtocolFeeShareUpdated.$typeName,
        ...[]
      ) as `${typeof PKG_V4}::events::ProtocolFeeShareUpdated`,
      typeArgs: [] as [],
      isPhantom: ProtocolFeeShareUpdated.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ProtocolFeeShareUpdated.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        ProtocolFeeShareUpdated.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ProtocolFeeShareUpdated.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ProtocolFeeShareUpdated.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ProtocolFeeShareUpdated.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        ProtocolFeeShareUpdated.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        ProtocolFeeShareUpdated.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => ProtocolFeeShareUpdated.fetch(client, id),
      new: (fields: ProtocolFeeShareUpdatedFields) => {
        return new ProtocolFeeShareUpdated([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return ProtocolFeeShareUpdated.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ProtocolFeeShareUpdated>> {
    return phantom(ProtocolFeeShareUpdated.reified())
  }
  static get p() {
    return ProtocolFeeShareUpdated.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ProtocolFeeShareUpdated', {
      pool: ID.bcs,
      previous_protocol_fee_share: bcs.u64(),
      current_protocol_fee_share: bcs.u64(),
      sequence_number: bcs.u128(),
    })
  }

  private static cachedBcs: ReturnType<typeof ProtocolFeeShareUpdated.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof ProtocolFeeShareUpdated.instantiateBcs> {
    if (!ProtocolFeeShareUpdated.cachedBcs) {
      ProtocolFeeShareUpdated.cachedBcs = ProtocolFeeShareUpdated.instantiateBcs()
    }
    return ProtocolFeeShareUpdated.cachedBcs
  }

  static fromFields(fields: Record<string, any>): ProtocolFeeShareUpdated {
    return ProtocolFeeShareUpdated.reified().new({
      pool: decodeFromFields(ID.reified(), fields.pool),
      previousProtocolFeeShare: decodeFromFields('u64', fields.previous_protocol_fee_share),
      currentProtocolFeeShare: decodeFromFields('u64', fields.current_protocol_fee_share),
      sequenceNumber: decodeFromFields('u128', fields.sequence_number),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ProtocolFeeShareUpdated {
    if (!isProtocolFeeShareUpdated(item.type)) {
      throw new Error('not a ProtocolFeeShareUpdated type')
    }

    return ProtocolFeeShareUpdated.reified().new({
      pool: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool),
      previousProtocolFeeShare: decodeFromFieldsWithTypes(
        'u64',
        item.fields.previous_protocol_fee_share
      ),
      currentProtocolFeeShare: decodeFromFieldsWithTypes(
        'u64',
        item.fields.current_protocol_fee_share
      ),
      sequenceNumber: decodeFromFieldsWithTypes('u128', item.fields.sequence_number),
    })
  }

  static fromBcs(data: Uint8Array): ProtocolFeeShareUpdated {
    return ProtocolFeeShareUpdated.fromFields(ProtocolFeeShareUpdated.bcs.parse(data))
  }

  toJSONField() {
    return {
      pool: this.pool,
      previousProtocolFeeShare: this.previousProtocolFeeShare.toString(),
      currentProtocolFeeShare: this.currentProtocolFeeShare.toString(),
      sequenceNumber: this.sequenceNumber.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ProtocolFeeShareUpdated {
    return ProtocolFeeShareUpdated.reified().new({
      pool: decodeFromJSONField(ID.reified(), field.pool),
      previousProtocolFeeShare: decodeFromJSONField('u64', field.previousProtocolFeeShare),
      currentProtocolFeeShare: decodeFromJSONField('u64', field.currentProtocolFeeShare),
      sequenceNumber: decodeFromJSONField('u128', field.sequenceNumber),
    })
  }

  static fromJSON(json: Record<string, any>): ProtocolFeeShareUpdated {
    if (json.$typeName !== ProtocolFeeShareUpdated.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return ProtocolFeeShareUpdated.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): ProtocolFeeShareUpdated {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isProtocolFeeShareUpdated(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a ProtocolFeeShareUpdated object`
      )
    }
    return ProtocolFeeShareUpdated.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): ProtocolFeeShareUpdated {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isProtocolFeeShareUpdated(data.bcs.type)) {
        throw new Error(`object at is not a ProtocolFeeShareUpdated object`)
      }

      return ProtocolFeeShareUpdated.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ProtocolFeeShareUpdated.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<ProtocolFeeShareUpdated> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(
        `error fetching ProtocolFeeShareUpdated object at id ${id}: ${res.error.code}`
      )
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isProtocolFeeShareUpdated(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a ProtocolFeeShareUpdated object`)
    }

    return ProtocolFeeShareUpdated.fromSuiObjectData(res.data)
  }
}

/* ============================== ObservationCardinalityUpdated =============================== */

export function isObservationCardinalityUpdated(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V4}::events::ObservationCardinalityUpdated`
}

export interface ObservationCardinalityUpdatedFields {
  pool: ToField<ID>
  previousObservationCardinality: ToField<'u64'>
  currentObservationCardinality: ToField<'u64'>
  sequenceNumber: ToField<'u128'>
}

export type ObservationCardinalityUpdatedReified = Reified<
  ObservationCardinalityUpdated,
  ObservationCardinalityUpdatedFields
>

export class ObservationCardinalityUpdated implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V4}::events::ObservationCardinalityUpdated`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = ObservationCardinalityUpdated.$typeName
  readonly $fullTypeName: `${typeof PKG_V4}::events::ObservationCardinalityUpdated`
  readonly $typeArgs: []
  readonly $isPhantom = ObservationCardinalityUpdated.$isPhantom

  readonly pool: ToField<ID>
  readonly previousObservationCardinality: ToField<'u64'>
  readonly currentObservationCardinality: ToField<'u64'>
  readonly sequenceNumber: ToField<'u128'>

  private constructor(typeArgs: [], fields: ObservationCardinalityUpdatedFields) {
    this.$fullTypeName = composeSuiType(
      ObservationCardinalityUpdated.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V4}::events::ObservationCardinalityUpdated`
    this.$typeArgs = typeArgs

    this.pool = fields.pool
    this.previousObservationCardinality = fields.previousObservationCardinality
    this.currentObservationCardinality = fields.currentObservationCardinality
    this.sequenceNumber = fields.sequenceNumber
  }

  static reified(): ObservationCardinalityUpdatedReified {
    const reifiedBcs = ObservationCardinalityUpdated.bcs
    return {
      typeName: ObservationCardinalityUpdated.$typeName,
      fullTypeName: composeSuiType(
        ObservationCardinalityUpdated.$typeName,
        ...[]
      ) as `${typeof PKG_V4}::events::ObservationCardinalityUpdated`,
      typeArgs: [] as [],
      isPhantom: ObservationCardinalityUpdated.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ObservationCardinalityUpdated.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        ObservationCardinalityUpdated.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) =>
        ObservationCardinalityUpdated.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ObservationCardinalityUpdated.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ObservationCardinalityUpdated.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        ObservationCardinalityUpdated.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        ObservationCardinalityUpdated.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) =>
        ObservationCardinalityUpdated.fetch(client, id),
      new: (fields: ObservationCardinalityUpdatedFields) => {
        return new ObservationCardinalityUpdated([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return ObservationCardinalityUpdated.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ObservationCardinalityUpdated>> {
    return phantom(ObservationCardinalityUpdated.reified())
  }
  static get p() {
    return ObservationCardinalityUpdated.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ObservationCardinalityUpdated', {
      pool: ID.bcs,
      previous_observation_cardinality: bcs.u64(),
      current_observation_cardinality: bcs.u64(),
      sequence_number: bcs.u128(),
    })
  }

  private static cachedBcs: ReturnType<typeof ObservationCardinalityUpdated.instantiateBcs> | null =
    null

  static get bcs(): ReturnType<typeof ObservationCardinalityUpdated.instantiateBcs> {
    if (!ObservationCardinalityUpdated.cachedBcs) {
      ObservationCardinalityUpdated.cachedBcs = ObservationCardinalityUpdated.instantiateBcs()
    }
    return ObservationCardinalityUpdated.cachedBcs
  }

  static fromFields(fields: Record<string, any>): ObservationCardinalityUpdated {
    return ObservationCardinalityUpdated.reified().new({
      pool: decodeFromFields(ID.reified(), fields.pool),
      previousObservationCardinality: decodeFromFields(
        'u64',
        fields.previous_observation_cardinality
      ),
      currentObservationCardinality: decodeFromFields(
        'u64',
        fields.current_observation_cardinality
      ),
      sequenceNumber: decodeFromFields('u128', fields.sequence_number),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ObservationCardinalityUpdated {
    if (!isObservationCardinalityUpdated(item.type)) {
      throw new Error('not a ObservationCardinalityUpdated type')
    }

    return ObservationCardinalityUpdated.reified().new({
      pool: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool),
      previousObservationCardinality: decodeFromFieldsWithTypes(
        'u64',
        item.fields.previous_observation_cardinality
      ),
      currentObservationCardinality: decodeFromFieldsWithTypes(
        'u64',
        item.fields.current_observation_cardinality
      ),
      sequenceNumber: decodeFromFieldsWithTypes('u128', item.fields.sequence_number),
    })
  }

  static fromBcs(data: Uint8Array): ObservationCardinalityUpdated {
    return ObservationCardinalityUpdated.fromFields(ObservationCardinalityUpdated.bcs.parse(data))
  }

  toJSONField() {
    return {
      pool: this.pool,
      previousObservationCardinality: this.previousObservationCardinality.toString(),
      currentObservationCardinality: this.currentObservationCardinality.toString(),
      sequenceNumber: this.sequenceNumber.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ObservationCardinalityUpdated {
    return ObservationCardinalityUpdated.reified().new({
      pool: decodeFromJSONField(ID.reified(), field.pool),
      previousObservationCardinality: decodeFromJSONField(
        'u64',
        field.previousObservationCardinality
      ),
      currentObservationCardinality: decodeFromJSONField(
        'u64',
        field.currentObservationCardinality
      ),
      sequenceNumber: decodeFromJSONField('u128', field.sequenceNumber),
    })
  }

  static fromJSON(json: Record<string, any>): ObservationCardinalityUpdated {
    if (json.$typeName !== ObservationCardinalityUpdated.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return ObservationCardinalityUpdated.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): ObservationCardinalityUpdated {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isObservationCardinalityUpdated(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a ObservationCardinalityUpdated object`
      )
    }
    return ObservationCardinalityUpdated.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): ObservationCardinalityUpdated {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isObservationCardinalityUpdated(data.bcs.type)) {
        throw new Error(`object at is not a ObservationCardinalityUpdated object`)
      }

      return ObservationCardinalityUpdated.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ObservationCardinalityUpdated.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<ObservationCardinalityUpdated> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(
        `error fetching ObservationCardinalityUpdated object at id ${id}: ${res.error.code}`
      )
    }
    if (
      res.data?.bcs?.dataType !== 'moveObject' ||
      !isObservationCardinalityUpdated(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a ObservationCardinalityUpdated object`)
    }

    return ObservationCardinalityUpdated.fromSuiObjectData(res.data)
  }
}

/* ============================== PoolManagerUpdate =============================== */

export function isPoolManagerUpdate(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V4}::events::PoolManagerUpdate`
}

export interface PoolManagerUpdateFields {
  poolId: ToField<ID>
  newManager: ToField<'address'>
  sequenceNumber: ToField<'u128'>
}

export type PoolManagerUpdateReified = Reified<PoolManagerUpdate, PoolManagerUpdateFields>

export class PoolManagerUpdate implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V4}::events::PoolManagerUpdate`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = PoolManagerUpdate.$typeName
  readonly $fullTypeName: `${typeof PKG_V4}::events::PoolManagerUpdate`
  readonly $typeArgs: []
  readonly $isPhantom = PoolManagerUpdate.$isPhantom

  readonly poolId: ToField<ID>
  readonly newManager: ToField<'address'>
  readonly sequenceNumber: ToField<'u128'>

  private constructor(typeArgs: [], fields: PoolManagerUpdateFields) {
    this.$fullTypeName = composeSuiType(
      PoolManagerUpdate.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V4}::events::PoolManagerUpdate`
    this.$typeArgs = typeArgs

    this.poolId = fields.poolId
    this.newManager = fields.newManager
    this.sequenceNumber = fields.sequenceNumber
  }

  static reified(): PoolManagerUpdateReified {
    const reifiedBcs = PoolManagerUpdate.bcs
    return {
      typeName: PoolManagerUpdate.$typeName,
      fullTypeName: composeSuiType(
        PoolManagerUpdate.$typeName,
        ...[]
      ) as `${typeof PKG_V4}::events::PoolManagerUpdate`,
      typeArgs: [] as [],
      isPhantom: PoolManagerUpdate.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PoolManagerUpdate.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PoolManagerUpdate.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PoolManagerUpdate.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PoolManagerUpdate.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PoolManagerUpdate.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => PoolManagerUpdate.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PoolManagerUpdate.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => PoolManagerUpdate.fetch(client, id),
      new: (fields: PoolManagerUpdateFields) => {
        return new PoolManagerUpdate([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return PoolManagerUpdate.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PoolManagerUpdate>> {
    return phantom(PoolManagerUpdate.reified())
  }
  static get p() {
    return PoolManagerUpdate.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('PoolManagerUpdate', {
      pool_id: ID.bcs,
      new_manager: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      sequence_number: bcs.u128(),
    })
  }

  private static cachedBcs: ReturnType<typeof PoolManagerUpdate.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof PoolManagerUpdate.instantiateBcs> {
    if (!PoolManagerUpdate.cachedBcs) {
      PoolManagerUpdate.cachedBcs = PoolManagerUpdate.instantiateBcs()
    }
    return PoolManagerUpdate.cachedBcs
  }

  static fromFields(fields: Record<string, any>): PoolManagerUpdate {
    return PoolManagerUpdate.reified().new({
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      newManager: decodeFromFields('address', fields.new_manager),
      sequenceNumber: decodeFromFields('u128', fields.sequence_number),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PoolManagerUpdate {
    if (!isPoolManagerUpdate(item.type)) {
      throw new Error('not a PoolManagerUpdate type')
    }

    return PoolManagerUpdate.reified().new({
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      newManager: decodeFromFieldsWithTypes('address', item.fields.new_manager),
      sequenceNumber: decodeFromFieldsWithTypes('u128', item.fields.sequence_number),
    })
  }

  static fromBcs(data: Uint8Array): PoolManagerUpdate {
    return PoolManagerUpdate.fromFields(PoolManagerUpdate.bcs.parse(data))
  }

  toJSONField() {
    return {
      poolId: this.poolId,
      newManager: this.newManager,
      sequenceNumber: this.sequenceNumber.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PoolManagerUpdate {
    return PoolManagerUpdate.reified().new({
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      newManager: decodeFromJSONField('address', field.newManager),
      sequenceNumber: decodeFromJSONField('u128', field.sequenceNumber),
    })
  }

  static fromJSON(json: Record<string, any>): PoolManagerUpdate {
    if (json.$typeName !== PoolManagerUpdate.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return PoolManagerUpdate.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): PoolManagerUpdate {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPoolManagerUpdate(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PoolManagerUpdate object`)
    }
    return PoolManagerUpdate.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): PoolManagerUpdate {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPoolManagerUpdate(data.bcs.type)) {
        throw new Error(`object at is not a PoolManagerUpdate object`)
      }

      return PoolManagerUpdate.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PoolManagerUpdate.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<PoolManagerUpdate> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching PoolManagerUpdate object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isPoolManagerUpdate(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a PoolManagerUpdate object`)
    }

    return PoolManagerUpdate.fromSuiObjectData(res.data)
  }
}

/* ============================== PoolCreationFeeUpdate =============================== */

export function isPoolCreationFeeUpdate(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V7}::events::PoolCreationFeeUpdate`
}

export interface PoolCreationFeeUpdateFields {
  coinType: ToField<String>
  previousFeeAmount: ToField<'u64'>
  currentFeeAmount: ToField<'u64'>
}

export type PoolCreationFeeUpdateReified = Reified<
  PoolCreationFeeUpdate,
  PoolCreationFeeUpdateFields
>

export class PoolCreationFeeUpdate implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V7}::events::PoolCreationFeeUpdate`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = PoolCreationFeeUpdate.$typeName
  readonly $fullTypeName: `${typeof PKG_V7}::events::PoolCreationFeeUpdate`
  readonly $typeArgs: []
  readonly $isPhantom = PoolCreationFeeUpdate.$isPhantom

  readonly coinType: ToField<String>
  readonly previousFeeAmount: ToField<'u64'>
  readonly currentFeeAmount: ToField<'u64'>

  private constructor(typeArgs: [], fields: PoolCreationFeeUpdateFields) {
    this.$fullTypeName = composeSuiType(
      PoolCreationFeeUpdate.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V7}::events::PoolCreationFeeUpdate`
    this.$typeArgs = typeArgs

    this.coinType = fields.coinType
    this.previousFeeAmount = fields.previousFeeAmount
    this.currentFeeAmount = fields.currentFeeAmount
  }

  static reified(): PoolCreationFeeUpdateReified {
    const reifiedBcs = PoolCreationFeeUpdate.bcs
    return {
      typeName: PoolCreationFeeUpdate.$typeName,
      fullTypeName: composeSuiType(
        PoolCreationFeeUpdate.$typeName,
        ...[]
      ) as `${typeof PKG_V7}::events::PoolCreationFeeUpdate`,
      typeArgs: [] as [],
      isPhantom: PoolCreationFeeUpdate.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PoolCreationFeeUpdate.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        PoolCreationFeeUpdate.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PoolCreationFeeUpdate.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PoolCreationFeeUpdate.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PoolCreationFeeUpdate.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        PoolCreationFeeUpdate.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        PoolCreationFeeUpdate.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => PoolCreationFeeUpdate.fetch(client, id),
      new: (fields: PoolCreationFeeUpdateFields) => {
        return new PoolCreationFeeUpdate([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return PoolCreationFeeUpdate.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PoolCreationFeeUpdate>> {
    return phantom(PoolCreationFeeUpdate.reified())
  }
  static get p() {
    return PoolCreationFeeUpdate.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('PoolCreationFeeUpdate', {
      coin_type: String.bcs,
      previous_fee_amount: bcs.u64(),
      current_fee_amount: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof PoolCreationFeeUpdate.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof PoolCreationFeeUpdate.instantiateBcs> {
    if (!PoolCreationFeeUpdate.cachedBcs) {
      PoolCreationFeeUpdate.cachedBcs = PoolCreationFeeUpdate.instantiateBcs()
    }
    return PoolCreationFeeUpdate.cachedBcs
  }

  static fromFields(fields: Record<string, any>): PoolCreationFeeUpdate {
    return PoolCreationFeeUpdate.reified().new({
      coinType: decodeFromFields(String.reified(), fields.coin_type),
      previousFeeAmount: decodeFromFields('u64', fields.previous_fee_amount),
      currentFeeAmount: decodeFromFields('u64', fields.current_fee_amount),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PoolCreationFeeUpdate {
    if (!isPoolCreationFeeUpdate(item.type)) {
      throw new Error('not a PoolCreationFeeUpdate type')
    }

    return PoolCreationFeeUpdate.reified().new({
      coinType: decodeFromFieldsWithTypes(String.reified(), item.fields.coin_type),
      previousFeeAmount: decodeFromFieldsWithTypes('u64', item.fields.previous_fee_amount),
      currentFeeAmount: decodeFromFieldsWithTypes('u64', item.fields.current_fee_amount),
    })
  }

  static fromBcs(data: Uint8Array): PoolCreationFeeUpdate {
    return PoolCreationFeeUpdate.fromFields(PoolCreationFeeUpdate.bcs.parse(data))
  }

  toJSONField() {
    return {
      coinType: this.coinType,
      previousFeeAmount: this.previousFeeAmount.toString(),
      currentFeeAmount: this.currentFeeAmount.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PoolCreationFeeUpdate {
    return PoolCreationFeeUpdate.reified().new({
      coinType: decodeFromJSONField(String.reified(), field.coinType),
      previousFeeAmount: decodeFromJSONField('u64', field.previousFeeAmount),
      currentFeeAmount: decodeFromJSONField('u64', field.currentFeeAmount),
    })
  }

  static fromJSON(json: Record<string, any>): PoolCreationFeeUpdate {
    if (json.$typeName !== PoolCreationFeeUpdate.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return PoolCreationFeeUpdate.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): PoolCreationFeeUpdate {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPoolCreationFeeUpdate(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a PoolCreationFeeUpdate object`
      )
    }
    return PoolCreationFeeUpdate.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): PoolCreationFeeUpdate {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPoolCreationFeeUpdate(data.bcs.type)) {
        throw new Error(`object at is not a PoolCreationFeeUpdate object`)
      }

      return PoolCreationFeeUpdate.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PoolCreationFeeUpdate.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<PoolCreationFeeUpdate> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching PoolCreationFeeUpdate object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isPoolCreationFeeUpdate(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a PoolCreationFeeUpdate object`)
    }

    return PoolCreationFeeUpdate.fromSuiObjectData(res.data)
  }
}

/* ============================== PoolCreationFeePaid =============================== */

export function isPoolCreationFeePaid(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V7}::events::PoolCreationFeePaid`
}

export interface PoolCreationFeePaidFields {
  pool: ToField<ID>
  creator: ToField<'address'>
  coinType: ToField<String>
  feeAmount: ToField<'u64'>
  totalAccruedFee: ToField<'u64'>
}

export type PoolCreationFeePaidReified = Reified<PoolCreationFeePaid, PoolCreationFeePaidFields>

export class PoolCreationFeePaid implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V7}::events::PoolCreationFeePaid`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = PoolCreationFeePaid.$typeName
  readonly $fullTypeName: `${typeof PKG_V7}::events::PoolCreationFeePaid`
  readonly $typeArgs: []
  readonly $isPhantom = PoolCreationFeePaid.$isPhantom

  readonly pool: ToField<ID>
  readonly creator: ToField<'address'>
  readonly coinType: ToField<String>
  readonly feeAmount: ToField<'u64'>
  readonly totalAccruedFee: ToField<'u64'>

  private constructor(typeArgs: [], fields: PoolCreationFeePaidFields) {
    this.$fullTypeName = composeSuiType(
      PoolCreationFeePaid.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V7}::events::PoolCreationFeePaid`
    this.$typeArgs = typeArgs

    this.pool = fields.pool
    this.creator = fields.creator
    this.coinType = fields.coinType
    this.feeAmount = fields.feeAmount
    this.totalAccruedFee = fields.totalAccruedFee
  }

  static reified(): PoolCreationFeePaidReified {
    const reifiedBcs = PoolCreationFeePaid.bcs
    return {
      typeName: PoolCreationFeePaid.$typeName,
      fullTypeName: composeSuiType(
        PoolCreationFeePaid.$typeName,
        ...[]
      ) as `${typeof PKG_V7}::events::PoolCreationFeePaid`,
      typeArgs: [] as [],
      isPhantom: PoolCreationFeePaid.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PoolCreationFeePaid.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PoolCreationFeePaid.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PoolCreationFeePaid.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PoolCreationFeePaid.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PoolCreationFeePaid.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => PoolCreationFeePaid.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PoolCreationFeePaid.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => PoolCreationFeePaid.fetch(client, id),
      new: (fields: PoolCreationFeePaidFields) => {
        return new PoolCreationFeePaid([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return PoolCreationFeePaid.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PoolCreationFeePaid>> {
    return phantom(PoolCreationFeePaid.reified())
  }
  static get p() {
    return PoolCreationFeePaid.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('PoolCreationFeePaid', {
      pool: ID.bcs,
      creator: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      coin_type: String.bcs,
      fee_amount: bcs.u64(),
      total_accrued_fee: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof PoolCreationFeePaid.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof PoolCreationFeePaid.instantiateBcs> {
    if (!PoolCreationFeePaid.cachedBcs) {
      PoolCreationFeePaid.cachedBcs = PoolCreationFeePaid.instantiateBcs()
    }
    return PoolCreationFeePaid.cachedBcs
  }

  static fromFields(fields: Record<string, any>): PoolCreationFeePaid {
    return PoolCreationFeePaid.reified().new({
      pool: decodeFromFields(ID.reified(), fields.pool),
      creator: decodeFromFields('address', fields.creator),
      coinType: decodeFromFields(String.reified(), fields.coin_type),
      feeAmount: decodeFromFields('u64', fields.fee_amount),
      totalAccruedFee: decodeFromFields('u64', fields.total_accrued_fee),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PoolCreationFeePaid {
    if (!isPoolCreationFeePaid(item.type)) {
      throw new Error('not a PoolCreationFeePaid type')
    }

    return PoolCreationFeePaid.reified().new({
      pool: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool),
      creator: decodeFromFieldsWithTypes('address', item.fields.creator),
      coinType: decodeFromFieldsWithTypes(String.reified(), item.fields.coin_type),
      feeAmount: decodeFromFieldsWithTypes('u64', item.fields.fee_amount),
      totalAccruedFee: decodeFromFieldsWithTypes('u64', item.fields.total_accrued_fee),
    })
  }

  static fromBcs(data: Uint8Array): PoolCreationFeePaid {
    return PoolCreationFeePaid.fromFields(PoolCreationFeePaid.bcs.parse(data))
  }

  toJSONField() {
    return {
      pool: this.pool,
      creator: this.creator,
      coinType: this.coinType,
      feeAmount: this.feeAmount.toString(),
      totalAccruedFee: this.totalAccruedFee.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PoolCreationFeePaid {
    return PoolCreationFeePaid.reified().new({
      pool: decodeFromJSONField(ID.reified(), field.pool),
      creator: decodeFromJSONField('address', field.creator),
      coinType: decodeFromJSONField(String.reified(), field.coinType),
      feeAmount: decodeFromJSONField('u64', field.feeAmount),
      totalAccruedFee: decodeFromJSONField('u64', field.totalAccruedFee),
    })
  }

  static fromJSON(json: Record<string, any>): PoolCreationFeePaid {
    if (json.$typeName !== PoolCreationFeePaid.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return PoolCreationFeePaid.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): PoolCreationFeePaid {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPoolCreationFeePaid(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PoolCreationFeePaid object`)
    }
    return PoolCreationFeePaid.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): PoolCreationFeePaid {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPoolCreationFeePaid(data.bcs.type)) {
        throw new Error(`object at is not a PoolCreationFeePaid object`)
      }

      return PoolCreationFeePaid.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PoolCreationFeePaid.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<PoolCreationFeePaid> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching PoolCreationFeePaid object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isPoolCreationFeePaid(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a PoolCreationFeePaid object`)
    }

    return PoolCreationFeePaid.fromSuiObjectData(res.data)
  }
}

/* ============================== PoolCreationFeeClaimed =============================== */

export function isPoolCreationFeeClaimed(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V7}::events::PoolCreationFeeClaimed`
}

export interface PoolCreationFeeClaimedFields {
  coinType: ToField<String>
  amount: ToField<'u64'>
  destination: ToField<'address'>
  accruedFeeBefore: ToField<'u64'>
  accruedFeeAfter: ToField<'u64'>
}

export type PoolCreationFeeClaimedReified = Reified<
  PoolCreationFeeClaimed,
  PoolCreationFeeClaimedFields
>

export class PoolCreationFeeClaimed implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V7}::events::PoolCreationFeeClaimed`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = PoolCreationFeeClaimed.$typeName
  readonly $fullTypeName: `${typeof PKG_V7}::events::PoolCreationFeeClaimed`
  readonly $typeArgs: []
  readonly $isPhantom = PoolCreationFeeClaimed.$isPhantom

  readonly coinType: ToField<String>
  readonly amount: ToField<'u64'>
  readonly destination: ToField<'address'>
  readonly accruedFeeBefore: ToField<'u64'>
  readonly accruedFeeAfter: ToField<'u64'>

  private constructor(typeArgs: [], fields: PoolCreationFeeClaimedFields) {
    this.$fullTypeName = composeSuiType(
      PoolCreationFeeClaimed.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V7}::events::PoolCreationFeeClaimed`
    this.$typeArgs = typeArgs

    this.coinType = fields.coinType
    this.amount = fields.amount
    this.destination = fields.destination
    this.accruedFeeBefore = fields.accruedFeeBefore
    this.accruedFeeAfter = fields.accruedFeeAfter
  }

  static reified(): PoolCreationFeeClaimedReified {
    const reifiedBcs = PoolCreationFeeClaimed.bcs
    return {
      typeName: PoolCreationFeeClaimed.$typeName,
      fullTypeName: composeSuiType(
        PoolCreationFeeClaimed.$typeName,
        ...[]
      ) as `${typeof PKG_V7}::events::PoolCreationFeeClaimed`,
      typeArgs: [] as [],
      isPhantom: PoolCreationFeeClaimed.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PoolCreationFeeClaimed.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        PoolCreationFeeClaimed.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PoolCreationFeeClaimed.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PoolCreationFeeClaimed.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PoolCreationFeeClaimed.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        PoolCreationFeeClaimed.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        PoolCreationFeeClaimed.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => PoolCreationFeeClaimed.fetch(client, id),
      new: (fields: PoolCreationFeeClaimedFields) => {
        return new PoolCreationFeeClaimed([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return PoolCreationFeeClaimed.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PoolCreationFeeClaimed>> {
    return phantom(PoolCreationFeeClaimed.reified())
  }
  static get p() {
    return PoolCreationFeeClaimed.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('PoolCreationFeeClaimed', {
      coin_type: String.bcs,
      amount: bcs.u64(),
      destination: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      accrued_fee_before: bcs.u64(),
      accrued_fee_after: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof PoolCreationFeeClaimed.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof PoolCreationFeeClaimed.instantiateBcs> {
    if (!PoolCreationFeeClaimed.cachedBcs) {
      PoolCreationFeeClaimed.cachedBcs = PoolCreationFeeClaimed.instantiateBcs()
    }
    return PoolCreationFeeClaimed.cachedBcs
  }

  static fromFields(fields: Record<string, any>): PoolCreationFeeClaimed {
    return PoolCreationFeeClaimed.reified().new({
      coinType: decodeFromFields(String.reified(), fields.coin_type),
      amount: decodeFromFields('u64', fields.amount),
      destination: decodeFromFields('address', fields.destination),
      accruedFeeBefore: decodeFromFields('u64', fields.accrued_fee_before),
      accruedFeeAfter: decodeFromFields('u64', fields.accrued_fee_after),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PoolCreationFeeClaimed {
    if (!isPoolCreationFeeClaimed(item.type)) {
      throw new Error('not a PoolCreationFeeClaimed type')
    }

    return PoolCreationFeeClaimed.reified().new({
      coinType: decodeFromFieldsWithTypes(String.reified(), item.fields.coin_type),
      amount: decodeFromFieldsWithTypes('u64', item.fields.amount),
      destination: decodeFromFieldsWithTypes('address', item.fields.destination),
      accruedFeeBefore: decodeFromFieldsWithTypes('u64', item.fields.accrued_fee_before),
      accruedFeeAfter: decodeFromFieldsWithTypes('u64', item.fields.accrued_fee_after),
    })
  }

  static fromBcs(data: Uint8Array): PoolCreationFeeClaimed {
    return PoolCreationFeeClaimed.fromFields(PoolCreationFeeClaimed.bcs.parse(data))
  }

  toJSONField() {
    return {
      coinType: this.coinType,
      amount: this.amount.toString(),
      destination: this.destination,
      accruedFeeBefore: this.accruedFeeBefore.toString(),
      accruedFeeAfter: this.accruedFeeAfter.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PoolCreationFeeClaimed {
    return PoolCreationFeeClaimed.reified().new({
      coinType: decodeFromJSONField(String.reified(), field.coinType),
      amount: decodeFromJSONField('u64', field.amount),
      destination: decodeFromJSONField('address', field.destination),
      accruedFeeBefore: decodeFromJSONField('u64', field.accruedFeeBefore),
      accruedFeeAfter: decodeFromJSONField('u64', field.accruedFeeAfter),
    })
  }

  static fromJSON(json: Record<string, any>): PoolCreationFeeClaimed {
    if (json.$typeName !== PoolCreationFeeClaimed.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return PoolCreationFeeClaimed.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): PoolCreationFeeClaimed {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPoolCreationFeeClaimed(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a PoolCreationFeeClaimed object`
      )
    }
    return PoolCreationFeeClaimed.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): PoolCreationFeeClaimed {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPoolCreationFeeClaimed(data.bcs.type)) {
        throw new Error(`object at is not a PoolCreationFeeClaimed object`)
      }

      return PoolCreationFeeClaimed.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PoolCreationFeeClaimed.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<PoolCreationFeeClaimed> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching PoolCreationFeeClaimed object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isPoolCreationFeeClaimed(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a PoolCreationFeeClaimed object`)
    }

    return PoolCreationFeeClaimed.fromSuiObjectData(res.data)
  }
}

/* ============================== PoolRewardReservesIncreased =============================== */

export function isPoolRewardReservesIncreased(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V8}::events::PoolRewardReservesIncreased`
}

export interface PoolRewardReservesIncreasedFields {
  pool: ToField<ID>
  rewardCoinType: ToField<String>
  amount: ToField<'u64'>
  reservesBefore: ToField<'u64'>
  reversAfter: ToField<'u64'>
}

export type PoolRewardReservesIncreasedReified = Reified<
  PoolRewardReservesIncreased,
  PoolRewardReservesIncreasedFields
>

export class PoolRewardReservesIncreased implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V8}::events::PoolRewardReservesIncreased`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = PoolRewardReservesIncreased.$typeName
  readonly $fullTypeName: `${typeof PKG_V8}::events::PoolRewardReservesIncreased`
  readonly $typeArgs: []
  readonly $isPhantom = PoolRewardReservesIncreased.$isPhantom

  readonly pool: ToField<ID>
  readonly rewardCoinType: ToField<String>
  readonly amount: ToField<'u64'>
  readonly reservesBefore: ToField<'u64'>
  readonly reversAfter: ToField<'u64'>

  private constructor(typeArgs: [], fields: PoolRewardReservesIncreasedFields) {
    this.$fullTypeName = composeSuiType(
      PoolRewardReservesIncreased.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V8}::events::PoolRewardReservesIncreased`
    this.$typeArgs = typeArgs

    this.pool = fields.pool
    this.rewardCoinType = fields.rewardCoinType
    this.amount = fields.amount
    this.reservesBefore = fields.reservesBefore
    this.reversAfter = fields.reversAfter
  }

  static reified(): PoolRewardReservesIncreasedReified {
    const reifiedBcs = PoolRewardReservesIncreased.bcs
    return {
      typeName: PoolRewardReservesIncreased.$typeName,
      fullTypeName: composeSuiType(
        PoolRewardReservesIncreased.$typeName,
        ...[]
      ) as `${typeof PKG_V8}::events::PoolRewardReservesIncreased`,
      typeArgs: [] as [],
      isPhantom: PoolRewardReservesIncreased.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PoolRewardReservesIncreased.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        PoolRewardReservesIncreased.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PoolRewardReservesIncreased.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PoolRewardReservesIncreased.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PoolRewardReservesIncreased.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        PoolRewardReservesIncreased.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        PoolRewardReservesIncreased.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => PoolRewardReservesIncreased.fetch(client, id),
      new: (fields: PoolRewardReservesIncreasedFields) => {
        return new PoolRewardReservesIncreased([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return PoolRewardReservesIncreased.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PoolRewardReservesIncreased>> {
    return phantom(PoolRewardReservesIncreased.reified())
  }
  static get p() {
    return PoolRewardReservesIncreased.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('PoolRewardReservesIncreased', {
      pool: ID.bcs,
      reward_coin_type: String.bcs,
      amount: bcs.u64(),
      reserves_before: bcs.u64(),
      revers_after: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof PoolRewardReservesIncreased.instantiateBcs> | null =
    null

  static get bcs(): ReturnType<typeof PoolRewardReservesIncreased.instantiateBcs> {
    if (!PoolRewardReservesIncreased.cachedBcs) {
      PoolRewardReservesIncreased.cachedBcs = PoolRewardReservesIncreased.instantiateBcs()
    }
    return PoolRewardReservesIncreased.cachedBcs
  }

  static fromFields(fields: Record<string, any>): PoolRewardReservesIncreased {
    return PoolRewardReservesIncreased.reified().new({
      pool: decodeFromFields(ID.reified(), fields.pool),
      rewardCoinType: decodeFromFields(String.reified(), fields.reward_coin_type),
      amount: decodeFromFields('u64', fields.amount),
      reservesBefore: decodeFromFields('u64', fields.reserves_before),
      reversAfter: decodeFromFields('u64', fields.revers_after),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PoolRewardReservesIncreased {
    if (!isPoolRewardReservesIncreased(item.type)) {
      throw new Error('not a PoolRewardReservesIncreased type')
    }

    return PoolRewardReservesIncreased.reified().new({
      pool: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool),
      rewardCoinType: decodeFromFieldsWithTypes(String.reified(), item.fields.reward_coin_type),
      amount: decodeFromFieldsWithTypes('u64', item.fields.amount),
      reservesBefore: decodeFromFieldsWithTypes('u64', item.fields.reserves_before),
      reversAfter: decodeFromFieldsWithTypes('u64', item.fields.revers_after),
    })
  }

  static fromBcs(data: Uint8Array): PoolRewardReservesIncreased {
    return PoolRewardReservesIncreased.fromFields(PoolRewardReservesIncreased.bcs.parse(data))
  }

  toJSONField() {
    return {
      pool: this.pool,
      rewardCoinType: this.rewardCoinType,
      amount: this.amount.toString(),
      reservesBefore: this.reservesBefore.toString(),
      reversAfter: this.reversAfter.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PoolRewardReservesIncreased {
    return PoolRewardReservesIncreased.reified().new({
      pool: decodeFromJSONField(ID.reified(), field.pool),
      rewardCoinType: decodeFromJSONField(String.reified(), field.rewardCoinType),
      amount: decodeFromJSONField('u64', field.amount),
      reservesBefore: decodeFromJSONField('u64', field.reservesBefore),
      reversAfter: decodeFromJSONField('u64', field.reversAfter),
    })
  }

  static fromJSON(json: Record<string, any>): PoolRewardReservesIncreased {
    if (json.$typeName !== PoolRewardReservesIncreased.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return PoolRewardReservesIncreased.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): PoolRewardReservesIncreased {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPoolRewardReservesIncreased(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a PoolRewardReservesIncreased object`
      )
    }
    return PoolRewardReservesIncreased.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): PoolRewardReservesIncreased {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPoolRewardReservesIncreased(data.bcs.type)) {
        throw new Error(`object at is not a PoolRewardReservesIncreased object`)
      }

      return PoolRewardReservesIncreased.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PoolRewardReservesIncreased.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<PoolRewardReservesIncreased> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(
        `error fetching PoolRewardReservesIncreased object at id ${id}: ${res.error.code}`
      )
    }
    if (
      res.data?.bcs?.dataType !== 'moveObject' ||
      !isPoolRewardReservesIncreased(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a PoolRewardReservesIncreased object`)
    }

    return PoolRewardReservesIncreased.fromSuiObjectData(res.data)
  }
}

/* ============================== PoolIconUrlUpdate =============================== */

export function isPoolIconUrlUpdate(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::events::PoolIconUrlUpdate`
}

export interface PoolIconUrlUpdateFields {
  poolId: ToField<ID>
  iconUrl: ToField<String>
  sequenceNumber: ToField<'u128'>
}

export type PoolIconUrlUpdateReified = Reified<PoolIconUrlUpdate, PoolIconUrlUpdateFields>

export class PoolIconUrlUpdate implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::events::PoolIconUrlUpdate`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = PoolIconUrlUpdate.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::events::PoolIconUrlUpdate`
  readonly $typeArgs: []
  readonly $isPhantom = PoolIconUrlUpdate.$isPhantom

  readonly poolId: ToField<ID>
  readonly iconUrl: ToField<String>
  readonly sequenceNumber: ToField<'u128'>

  private constructor(typeArgs: [], fields: PoolIconUrlUpdateFields) {
    this.$fullTypeName = composeSuiType(
      PoolIconUrlUpdate.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::events::PoolIconUrlUpdate`
    this.$typeArgs = typeArgs

    this.poolId = fields.poolId
    this.iconUrl = fields.iconUrl
    this.sequenceNumber = fields.sequenceNumber
  }

  static reified(): PoolIconUrlUpdateReified {
    const reifiedBcs = PoolIconUrlUpdate.bcs
    return {
      typeName: PoolIconUrlUpdate.$typeName,
      fullTypeName: composeSuiType(
        PoolIconUrlUpdate.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::events::PoolIconUrlUpdate`,
      typeArgs: [] as [],
      isPhantom: PoolIconUrlUpdate.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PoolIconUrlUpdate.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PoolIconUrlUpdate.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PoolIconUrlUpdate.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PoolIconUrlUpdate.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PoolIconUrlUpdate.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => PoolIconUrlUpdate.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PoolIconUrlUpdate.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => PoolIconUrlUpdate.fetch(client, id),
      new: (fields: PoolIconUrlUpdateFields) => {
        return new PoolIconUrlUpdate([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return PoolIconUrlUpdate.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PoolIconUrlUpdate>> {
    return phantom(PoolIconUrlUpdate.reified())
  }
  static get p() {
    return PoolIconUrlUpdate.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('PoolIconUrlUpdate', {
      pool_id: ID.bcs,
      icon_url: String.bcs,
      sequence_number: bcs.u128(),
    })
  }

  private static cachedBcs: ReturnType<typeof PoolIconUrlUpdate.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof PoolIconUrlUpdate.instantiateBcs> {
    if (!PoolIconUrlUpdate.cachedBcs) {
      PoolIconUrlUpdate.cachedBcs = PoolIconUrlUpdate.instantiateBcs()
    }
    return PoolIconUrlUpdate.cachedBcs
  }

  static fromFields(fields: Record<string, any>): PoolIconUrlUpdate {
    return PoolIconUrlUpdate.reified().new({
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      iconUrl: decodeFromFields(String.reified(), fields.icon_url),
      sequenceNumber: decodeFromFields('u128', fields.sequence_number),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PoolIconUrlUpdate {
    if (!isPoolIconUrlUpdate(item.type)) {
      throw new Error('not a PoolIconUrlUpdate type')
    }

    return PoolIconUrlUpdate.reified().new({
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      iconUrl: decodeFromFieldsWithTypes(String.reified(), item.fields.icon_url),
      sequenceNumber: decodeFromFieldsWithTypes('u128', item.fields.sequence_number),
    })
  }

  static fromBcs(data: Uint8Array): PoolIconUrlUpdate {
    return PoolIconUrlUpdate.fromFields(PoolIconUrlUpdate.bcs.parse(data))
  }

  toJSONField() {
    return {
      poolId: this.poolId,
      iconUrl: this.iconUrl,
      sequenceNumber: this.sequenceNumber.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PoolIconUrlUpdate {
    return PoolIconUrlUpdate.reified().new({
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      iconUrl: decodeFromJSONField(String.reified(), field.iconUrl),
      sequenceNumber: decodeFromJSONField('u128', field.sequenceNumber),
    })
  }

  static fromJSON(json: Record<string, any>): PoolIconUrlUpdate {
    if (json.$typeName !== PoolIconUrlUpdate.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return PoolIconUrlUpdate.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): PoolIconUrlUpdate {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPoolIconUrlUpdate(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PoolIconUrlUpdate object`)
    }
    return PoolIconUrlUpdate.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): PoolIconUrlUpdate {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPoolIconUrlUpdate(data.bcs.type)) {
        throw new Error(`object at is not a PoolIconUrlUpdate object`)
      }

      return PoolIconUrlUpdate.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PoolIconUrlUpdate.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<PoolIconUrlUpdate> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching PoolIconUrlUpdate object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isPoolIconUrlUpdate(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a PoolIconUrlUpdate object`)
    }

    return PoolIconUrlUpdate.fromSuiObjectData(res.data)
  }
}
