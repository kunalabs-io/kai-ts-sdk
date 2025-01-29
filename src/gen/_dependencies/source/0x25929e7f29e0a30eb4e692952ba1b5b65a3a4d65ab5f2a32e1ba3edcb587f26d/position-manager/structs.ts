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
import { ID, UID } from '../../../../sui/object/structs'
import { I32 } from '../i32/structs'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64, fromHEX, toHEX } from '@mysten/sui/utils'

/* ============================== Collect =============================== */

export function isCollect(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::position_manager::Collect`
}

export interface CollectFields {
  sender: ToField<'address'>
  poolId: ToField<ID>
  positionId: ToField<ID>
  amountX: ToField<'u64'>
  amountY: ToField<'u64'>
}

export type CollectReified = Reified<Collect, CollectFields>

export class Collect implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::position_manager::Collect`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = Collect.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::position_manager::Collect`
  readonly $typeArgs: []
  readonly $isPhantom = Collect.$isPhantom

  readonly sender: ToField<'address'>
  readonly poolId: ToField<ID>
  readonly positionId: ToField<ID>
  readonly amountX: ToField<'u64'>
  readonly amountY: ToField<'u64'>

  private constructor(typeArgs: [], fields: CollectFields) {
    this.$fullTypeName = composeSuiType(
      Collect.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::position_manager::Collect`
    this.$typeArgs = typeArgs

    this.sender = fields.sender
    this.poolId = fields.poolId
    this.positionId = fields.positionId
    this.amountX = fields.amountX
    this.amountY = fields.amountY
  }

  static reified(): CollectReified {
    return {
      typeName: Collect.$typeName,
      fullTypeName: composeSuiType(
        Collect.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::position_manager::Collect`,
      typeArgs: [] as [],
      isPhantom: Collect.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Collect.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Collect.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Collect.fromBcs(data),
      bcs: Collect.bcs,
      fromJSONField: (field: any) => Collect.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Collect.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => Collect.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Collect.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => Collect.fetch(client, id),
      new: (fields: CollectFields) => {
        return new Collect([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return Collect.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Collect>> {
    return phantom(Collect.reified())
  }
  static get p() {
    return Collect.phantom()
  }

  static get bcs() {
    return bcs.struct('Collect', {
      sender: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      pool_id: ID.bcs,
      position_id: ID.bcs,
      amount_x: bcs.u64(),
      amount_y: bcs.u64(),
    })
  }

  static fromFields(fields: Record<string, any>): Collect {
    return Collect.reified().new({
      sender: decodeFromFields('address', fields.sender),
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      positionId: decodeFromFields(ID.reified(), fields.position_id),
      amountX: decodeFromFields('u64', fields.amount_x),
      amountY: decodeFromFields('u64', fields.amount_y),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Collect {
    if (!isCollect(item.type)) {
      throw new Error('not a Collect type')
    }

    return Collect.reified().new({
      sender: decodeFromFieldsWithTypes('address', item.fields.sender),
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      positionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.position_id),
      amountX: decodeFromFieldsWithTypes('u64', item.fields.amount_x),
      amountY: decodeFromFieldsWithTypes('u64', item.fields.amount_y),
    })
  }

  static fromBcs(data: Uint8Array): Collect {
    return Collect.fromFields(Collect.bcs.parse(data))
  }

  toJSONField() {
    return {
      sender: this.sender,
      poolId: this.poolId,
      positionId: this.positionId,
      amountX: this.amountX.toString(),
      amountY: this.amountY.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Collect {
    return Collect.reified().new({
      sender: decodeFromJSONField('address', field.sender),
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      positionId: decodeFromJSONField(ID.reified(), field.positionId),
      amountX: decodeFromJSONField('u64', field.amountX),
      amountY: decodeFromJSONField('u64', field.amountY),
    })
  }

  static fromJSON(json: Record<string, any>): Collect {
    if (json.$typeName !== Collect.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return Collect.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): Collect {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isCollect(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Collect object`)
    }
    return Collect.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): Collect {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isCollect(data.bcs.type)) {
        throw new Error(`object at is not a Collect object`)
      }

      return Collect.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Collect.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<Collect> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching Collect object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isCollect(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Collect object`)
    }

    return Collect.fromSuiObjectData(res.data)
  }
}

/* ============================== Close =============================== */

export function isClose(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::position_manager::Close`
}

export interface CloseFields {
  sender: ToField<'address'>
  positionId: ToField<ID>
}

export type CloseReified = Reified<Close, CloseFields>

export class Close implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::position_manager::Close`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = Close.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::position_manager::Close`
  readonly $typeArgs: []
  readonly $isPhantom = Close.$isPhantom

  readonly sender: ToField<'address'>
  readonly positionId: ToField<ID>

  private constructor(typeArgs: [], fields: CloseFields) {
    this.$fullTypeName = composeSuiType(
      Close.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::position_manager::Close`
    this.$typeArgs = typeArgs

    this.sender = fields.sender
    this.positionId = fields.positionId
  }

  static reified(): CloseReified {
    return {
      typeName: Close.$typeName,
      fullTypeName: composeSuiType(
        Close.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::position_manager::Close`,
      typeArgs: [] as [],
      isPhantom: Close.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Close.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Close.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Close.fromBcs(data),
      bcs: Close.bcs,
      fromJSONField: (field: any) => Close.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Close.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => Close.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Close.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => Close.fetch(client, id),
      new: (fields: CloseFields) => {
        return new Close([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return Close.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Close>> {
    return phantom(Close.reified())
  }
  static get p() {
    return Close.phantom()
  }

  static get bcs() {
    return bcs.struct('Close', {
      sender: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      position_id: ID.bcs,
    })
  }

  static fromFields(fields: Record<string, any>): Close {
    return Close.reified().new({
      sender: decodeFromFields('address', fields.sender),
      positionId: decodeFromFields(ID.reified(), fields.position_id),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Close {
    if (!isClose(item.type)) {
      throw new Error('not a Close type')
    }

    return Close.reified().new({
      sender: decodeFromFieldsWithTypes('address', item.fields.sender),
      positionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.position_id),
    })
  }

  static fromBcs(data: Uint8Array): Close {
    return Close.fromFields(Close.bcs.parse(data))
  }

  toJSONField() {
    return {
      sender: this.sender,
      positionId: this.positionId,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Close {
    return Close.reified().new({
      sender: decodeFromJSONField('address', field.sender),
      positionId: decodeFromJSONField(ID.reified(), field.positionId),
    })
  }

  static fromJSON(json: Record<string, any>): Close {
    if (json.$typeName !== Close.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return Close.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): Close {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isClose(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Close object`)
    }
    return Close.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): Close {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isClose(data.bcs.type)) {
        throw new Error(`object at is not a Close object`)
      }

      return Close.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Close.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<Close> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching Close object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isClose(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Close object`)
    }

    return Close.fromSuiObjectData(res.data)
  }
}

/* ============================== DecreaseLiquidity =============================== */

export function isDecreaseLiquidity(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::position_manager::DecreaseLiquidity`
}

export interface DecreaseLiquidityFields {
  sender: ToField<'address'>
  poolId: ToField<ID>
  positionId: ToField<ID>
  liquidity: ToField<'u128'>
  amountX: ToField<'u64'>
  amountY: ToField<'u64'>
}

export type DecreaseLiquidityReified = Reified<DecreaseLiquidity, DecreaseLiquidityFields>

export class DecreaseLiquidity implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::position_manager::DecreaseLiquidity`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = DecreaseLiquidity.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::position_manager::DecreaseLiquidity`
  readonly $typeArgs: []
  readonly $isPhantom = DecreaseLiquidity.$isPhantom

  readonly sender: ToField<'address'>
  readonly poolId: ToField<ID>
  readonly positionId: ToField<ID>
  readonly liquidity: ToField<'u128'>
  readonly amountX: ToField<'u64'>
  readonly amountY: ToField<'u64'>

  private constructor(typeArgs: [], fields: DecreaseLiquidityFields) {
    this.$fullTypeName = composeSuiType(
      DecreaseLiquidity.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::position_manager::DecreaseLiquidity`
    this.$typeArgs = typeArgs

    this.sender = fields.sender
    this.poolId = fields.poolId
    this.positionId = fields.positionId
    this.liquidity = fields.liquidity
    this.amountX = fields.amountX
    this.amountY = fields.amountY
  }

  static reified(): DecreaseLiquidityReified {
    return {
      typeName: DecreaseLiquidity.$typeName,
      fullTypeName: composeSuiType(
        DecreaseLiquidity.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::position_manager::DecreaseLiquidity`,
      typeArgs: [] as [],
      isPhantom: DecreaseLiquidity.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => DecreaseLiquidity.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => DecreaseLiquidity.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => DecreaseLiquidity.fromBcs(data),
      bcs: DecreaseLiquidity.bcs,
      fromJSONField: (field: any) => DecreaseLiquidity.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => DecreaseLiquidity.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => DecreaseLiquidity.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => DecreaseLiquidity.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => DecreaseLiquidity.fetch(client, id),
      new: (fields: DecreaseLiquidityFields) => {
        return new DecreaseLiquidity([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return DecreaseLiquidity.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<DecreaseLiquidity>> {
    return phantom(DecreaseLiquidity.reified())
  }
  static get p() {
    return DecreaseLiquidity.phantom()
  }

  static get bcs() {
    return bcs.struct('DecreaseLiquidity', {
      sender: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      pool_id: ID.bcs,
      position_id: ID.bcs,
      liquidity: bcs.u128(),
      amount_x: bcs.u64(),
      amount_y: bcs.u64(),
    })
  }

  static fromFields(fields: Record<string, any>): DecreaseLiquidity {
    return DecreaseLiquidity.reified().new({
      sender: decodeFromFields('address', fields.sender),
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      positionId: decodeFromFields(ID.reified(), fields.position_id),
      liquidity: decodeFromFields('u128', fields.liquidity),
      amountX: decodeFromFields('u64', fields.amount_x),
      amountY: decodeFromFields('u64', fields.amount_y),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): DecreaseLiquidity {
    if (!isDecreaseLiquidity(item.type)) {
      throw new Error('not a DecreaseLiquidity type')
    }

    return DecreaseLiquidity.reified().new({
      sender: decodeFromFieldsWithTypes('address', item.fields.sender),
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      positionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.position_id),
      liquidity: decodeFromFieldsWithTypes('u128', item.fields.liquidity),
      amountX: decodeFromFieldsWithTypes('u64', item.fields.amount_x),
      amountY: decodeFromFieldsWithTypes('u64', item.fields.amount_y),
    })
  }

  static fromBcs(data: Uint8Array): DecreaseLiquidity {
    return DecreaseLiquidity.fromFields(DecreaseLiquidity.bcs.parse(data))
  }

  toJSONField() {
    return {
      sender: this.sender,
      poolId: this.poolId,
      positionId: this.positionId,
      liquidity: this.liquidity.toString(),
      amountX: this.amountX.toString(),
      amountY: this.amountY.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): DecreaseLiquidity {
    return DecreaseLiquidity.reified().new({
      sender: decodeFromJSONField('address', field.sender),
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      positionId: decodeFromJSONField(ID.reified(), field.positionId),
      liquidity: decodeFromJSONField('u128', field.liquidity),
      amountX: decodeFromJSONField('u64', field.amountX),
      amountY: decodeFromJSONField('u64', field.amountY),
    })
  }

  static fromJSON(json: Record<string, any>): DecreaseLiquidity {
    if (json.$typeName !== DecreaseLiquidity.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return DecreaseLiquidity.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): DecreaseLiquidity {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isDecreaseLiquidity(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a DecreaseLiquidity object`)
    }
    return DecreaseLiquidity.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): DecreaseLiquidity {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isDecreaseLiquidity(data.bcs.type)) {
        throw new Error(`object at is not a DecreaseLiquidity object`)
      }

      return DecreaseLiquidity.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return DecreaseLiquidity.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<DecreaseLiquidity> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching DecreaseLiquidity object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isDecreaseLiquidity(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a DecreaseLiquidity object`)
    }

    return DecreaseLiquidity.fromSuiObjectData(res.data)
  }
}

/* ============================== IncreaseLiquidity =============================== */

export function isIncreaseLiquidity(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::position_manager::IncreaseLiquidity`
}

export interface IncreaseLiquidityFields {
  sender: ToField<'address'>
  poolId: ToField<ID>
  positionId: ToField<ID>
  liquidity: ToField<'u128'>
  amountX: ToField<'u64'>
  amountY: ToField<'u64'>
}

export type IncreaseLiquidityReified = Reified<IncreaseLiquidity, IncreaseLiquidityFields>

export class IncreaseLiquidity implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::position_manager::IncreaseLiquidity`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = IncreaseLiquidity.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::position_manager::IncreaseLiquidity`
  readonly $typeArgs: []
  readonly $isPhantom = IncreaseLiquidity.$isPhantom

  readonly sender: ToField<'address'>
  readonly poolId: ToField<ID>
  readonly positionId: ToField<ID>
  readonly liquidity: ToField<'u128'>
  readonly amountX: ToField<'u64'>
  readonly amountY: ToField<'u64'>

  private constructor(typeArgs: [], fields: IncreaseLiquidityFields) {
    this.$fullTypeName = composeSuiType(
      IncreaseLiquidity.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::position_manager::IncreaseLiquidity`
    this.$typeArgs = typeArgs

    this.sender = fields.sender
    this.poolId = fields.poolId
    this.positionId = fields.positionId
    this.liquidity = fields.liquidity
    this.amountX = fields.amountX
    this.amountY = fields.amountY
  }

  static reified(): IncreaseLiquidityReified {
    return {
      typeName: IncreaseLiquidity.$typeName,
      fullTypeName: composeSuiType(
        IncreaseLiquidity.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::position_manager::IncreaseLiquidity`,
      typeArgs: [] as [],
      isPhantom: IncreaseLiquidity.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => IncreaseLiquidity.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => IncreaseLiquidity.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => IncreaseLiquidity.fromBcs(data),
      bcs: IncreaseLiquidity.bcs,
      fromJSONField: (field: any) => IncreaseLiquidity.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => IncreaseLiquidity.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => IncreaseLiquidity.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => IncreaseLiquidity.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => IncreaseLiquidity.fetch(client, id),
      new: (fields: IncreaseLiquidityFields) => {
        return new IncreaseLiquidity([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return IncreaseLiquidity.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<IncreaseLiquidity>> {
    return phantom(IncreaseLiquidity.reified())
  }
  static get p() {
    return IncreaseLiquidity.phantom()
  }

  static get bcs() {
    return bcs.struct('IncreaseLiquidity', {
      sender: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      pool_id: ID.bcs,
      position_id: ID.bcs,
      liquidity: bcs.u128(),
      amount_x: bcs.u64(),
      amount_y: bcs.u64(),
    })
  }

  static fromFields(fields: Record<string, any>): IncreaseLiquidity {
    return IncreaseLiquidity.reified().new({
      sender: decodeFromFields('address', fields.sender),
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      positionId: decodeFromFields(ID.reified(), fields.position_id),
      liquidity: decodeFromFields('u128', fields.liquidity),
      amountX: decodeFromFields('u64', fields.amount_x),
      amountY: decodeFromFields('u64', fields.amount_y),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): IncreaseLiquidity {
    if (!isIncreaseLiquidity(item.type)) {
      throw new Error('not a IncreaseLiquidity type')
    }

    return IncreaseLiquidity.reified().new({
      sender: decodeFromFieldsWithTypes('address', item.fields.sender),
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      positionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.position_id),
      liquidity: decodeFromFieldsWithTypes('u128', item.fields.liquidity),
      amountX: decodeFromFieldsWithTypes('u64', item.fields.amount_x),
      amountY: decodeFromFieldsWithTypes('u64', item.fields.amount_y),
    })
  }

  static fromBcs(data: Uint8Array): IncreaseLiquidity {
    return IncreaseLiquidity.fromFields(IncreaseLiquidity.bcs.parse(data))
  }

  toJSONField() {
    return {
      sender: this.sender,
      poolId: this.poolId,
      positionId: this.positionId,
      liquidity: this.liquidity.toString(),
      amountX: this.amountX.toString(),
      amountY: this.amountY.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): IncreaseLiquidity {
    return IncreaseLiquidity.reified().new({
      sender: decodeFromJSONField('address', field.sender),
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      positionId: decodeFromJSONField(ID.reified(), field.positionId),
      liquidity: decodeFromJSONField('u128', field.liquidity),
      amountX: decodeFromJSONField('u64', field.amountX),
      amountY: decodeFromJSONField('u64', field.amountY),
    })
  }

  static fromJSON(json: Record<string, any>): IncreaseLiquidity {
    if (json.$typeName !== IncreaseLiquidity.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return IncreaseLiquidity.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): IncreaseLiquidity {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isIncreaseLiquidity(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a IncreaseLiquidity object`)
    }
    return IncreaseLiquidity.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): IncreaseLiquidity {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isIncreaseLiquidity(data.bcs.type)) {
        throw new Error(`object at is not a IncreaseLiquidity object`)
      }

      return IncreaseLiquidity.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return IncreaseLiquidity.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<IncreaseLiquidity> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching IncreaseLiquidity object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isIncreaseLiquidity(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a IncreaseLiquidity object`)
    }

    return IncreaseLiquidity.fromSuiObjectData(res.data)
  }
}

/* ============================== Open =============================== */

export function isOpen(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::position_manager::Open`
}

export interface OpenFields {
  sender: ToField<'address'>
  poolId: ToField<ID>
  positionId: ToField<ID>
  tickLowerIndex: ToField<I32>
  tickUpperIndex: ToField<I32>
}

export type OpenReified = Reified<Open, OpenFields>

export class Open implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::position_manager::Open`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = Open.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::position_manager::Open`
  readonly $typeArgs: []
  readonly $isPhantom = Open.$isPhantom

  readonly sender: ToField<'address'>
  readonly poolId: ToField<ID>
  readonly positionId: ToField<ID>
  readonly tickLowerIndex: ToField<I32>
  readonly tickUpperIndex: ToField<I32>

  private constructor(typeArgs: [], fields: OpenFields) {
    this.$fullTypeName = composeSuiType(
      Open.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::position_manager::Open`
    this.$typeArgs = typeArgs

    this.sender = fields.sender
    this.poolId = fields.poolId
    this.positionId = fields.positionId
    this.tickLowerIndex = fields.tickLowerIndex
    this.tickUpperIndex = fields.tickUpperIndex
  }

  static reified(): OpenReified {
    return {
      typeName: Open.$typeName,
      fullTypeName: composeSuiType(
        Open.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::position_manager::Open`,
      typeArgs: [] as [],
      isPhantom: Open.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Open.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Open.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Open.fromBcs(data),
      bcs: Open.bcs,
      fromJSONField: (field: any) => Open.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Open.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => Open.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Open.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => Open.fetch(client, id),
      new: (fields: OpenFields) => {
        return new Open([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return Open.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Open>> {
    return phantom(Open.reified())
  }
  static get p() {
    return Open.phantom()
  }

  static get bcs() {
    return bcs.struct('Open', {
      sender: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      pool_id: ID.bcs,
      position_id: ID.bcs,
      tick_lower_index: I32.bcs,
      tick_upper_index: I32.bcs,
    })
  }

  static fromFields(fields: Record<string, any>): Open {
    return Open.reified().new({
      sender: decodeFromFields('address', fields.sender),
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      positionId: decodeFromFields(ID.reified(), fields.position_id),
      tickLowerIndex: decodeFromFields(I32.reified(), fields.tick_lower_index),
      tickUpperIndex: decodeFromFields(I32.reified(), fields.tick_upper_index),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Open {
    if (!isOpen(item.type)) {
      throw new Error('not a Open type')
    }

    return Open.reified().new({
      sender: decodeFromFieldsWithTypes('address', item.fields.sender),
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      positionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.position_id),
      tickLowerIndex: decodeFromFieldsWithTypes(I32.reified(), item.fields.tick_lower_index),
      tickUpperIndex: decodeFromFieldsWithTypes(I32.reified(), item.fields.tick_upper_index),
    })
  }

  static fromBcs(data: Uint8Array): Open {
    return Open.fromFields(Open.bcs.parse(data))
  }

  toJSONField() {
    return {
      sender: this.sender,
      poolId: this.poolId,
      positionId: this.positionId,
      tickLowerIndex: this.tickLowerIndex.toJSONField(),
      tickUpperIndex: this.tickUpperIndex.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Open {
    return Open.reified().new({
      sender: decodeFromJSONField('address', field.sender),
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      positionId: decodeFromJSONField(ID.reified(), field.positionId),
      tickLowerIndex: decodeFromJSONField(I32.reified(), field.tickLowerIndex),
      tickUpperIndex: decodeFromJSONField(I32.reified(), field.tickUpperIndex),
    })
  }

  static fromJSON(json: Record<string, any>): Open {
    if (json.$typeName !== Open.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return Open.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): Open {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isOpen(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Open object`)
    }
    return Open.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): Open {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isOpen(data.bcs.type)) {
        throw new Error(`object at is not a Open object`)
      }

      return Open.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Open.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<Open> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching Open object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isOpen(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Open object`)
    }

    return Open.fromSuiObjectData(res.data)
  }
}

/* ============================== PositionRegistry =============================== */

export function isPositionRegistry(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::position_manager::PositionRegistry`
}

export interface PositionRegistryFields {
  id: ToField<UID>
  numPositions: ToField<'u64'>
}

export type PositionRegistryReified = Reified<PositionRegistry, PositionRegistryFields>

export class PositionRegistry implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::position_manager::PositionRegistry`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = PositionRegistry.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::position_manager::PositionRegistry`
  readonly $typeArgs: []
  readonly $isPhantom = PositionRegistry.$isPhantom

  readonly id: ToField<UID>
  readonly numPositions: ToField<'u64'>

  private constructor(typeArgs: [], fields: PositionRegistryFields) {
    this.$fullTypeName = composeSuiType(
      PositionRegistry.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::position_manager::PositionRegistry`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.numPositions = fields.numPositions
  }

  static reified(): PositionRegistryReified {
    return {
      typeName: PositionRegistry.$typeName,
      fullTypeName: composeSuiType(
        PositionRegistry.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::position_manager::PositionRegistry`,
      typeArgs: [] as [],
      isPhantom: PositionRegistry.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PositionRegistry.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PositionRegistry.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PositionRegistry.fromBcs(data),
      bcs: PositionRegistry.bcs,
      fromJSONField: (field: any) => PositionRegistry.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PositionRegistry.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => PositionRegistry.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PositionRegistry.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => PositionRegistry.fetch(client, id),
      new: (fields: PositionRegistryFields) => {
        return new PositionRegistry([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return PositionRegistry.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PositionRegistry>> {
    return phantom(PositionRegistry.reified())
  }
  static get p() {
    return PositionRegistry.phantom()
  }

  static get bcs() {
    return bcs.struct('PositionRegistry', {
      id: UID.bcs,
      num_positions: bcs.u64(),
    })
  }

  static fromFields(fields: Record<string, any>): PositionRegistry {
    return PositionRegistry.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      numPositions: decodeFromFields('u64', fields.num_positions),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PositionRegistry {
    if (!isPositionRegistry(item.type)) {
      throw new Error('not a PositionRegistry type')
    }

    return PositionRegistry.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      numPositions: decodeFromFieldsWithTypes('u64', item.fields.num_positions),
    })
  }

  static fromBcs(data: Uint8Array): PositionRegistry {
    return PositionRegistry.fromFields(PositionRegistry.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      numPositions: this.numPositions.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PositionRegistry {
    return PositionRegistry.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      numPositions: decodeFromJSONField('u64', field.numPositions),
    })
  }

  static fromJSON(json: Record<string, any>): PositionRegistry {
    if (json.$typeName !== PositionRegistry.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return PositionRegistry.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): PositionRegistry {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPositionRegistry(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PositionRegistry object`)
    }
    return PositionRegistry.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): PositionRegistry {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPositionRegistry(data.bcs.type)) {
        throw new Error(`object at is not a PositionRegistry object`)
      }

      return PositionRegistry.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PositionRegistry.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<PositionRegistry> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching PositionRegistry object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isPositionRegistry(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a PositionRegistry object`)
    }

    return PositionRegistry.fromSuiObjectData(res.data)
  }
}
