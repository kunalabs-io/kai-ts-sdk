/**
 * The `position` module is designed for the convenience of the `Pool`'s position and all `position` related
 * operations are completed by this module. Regarding the `position` of `clmmpool`,
 * there are several points that need to be explained:
 *
 * 1. `clmmpool` specifies the ownership of the `position` through an `Object` named `position_nft`,
 * rather than a wallet address. This means that whoever owns the `position_nft` owns the position it holds.
 * This also means that `clmmpool`'s `position` can be transferred between users freely.
 * 2. `position_nft` records some basic information about the position, but these data do not participate in the
 * related calculations of the position, they are only used for display. The data that actually participates in the
 * calculation is stored in `position_info`, which corresponds one-to-one with `position_nft` and is stored in
 * `PositionManager`. The reason for this design is that in our other contracts, we need to read the information of
 * multiple positions in the `Pool`.
 */

import { bcs } from '@mysten/sui/bcs'
import { SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromBase64 } from '@mysten/sui/utils'
import { LinkedTable } from '../../_dependencies/move-stl/linked-table/structs'
import { getTypeOrigin } from '../../_envs'
import {
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  fieldToJSON,
  phantom,
  PhantomReified,
  Reified,
  StructClass,
  ToField,
  ToJSON,
  ToTypeStr,
  ToTypeStr as ToPhantom,
  vector,
} from '../../_framework/reified'
import {
  composeSuiType,
  compressSuiType,
  fetchObjectBcs,
  FieldsWithTypes,
  SupportedSuiClient,
} from '../../_framework/util'
import { Vector } from '../../_framework/vector'
import { I32 } from '../../integer-mate/i32/structs'
import { String } from '../../std/string/structs'
import { TypeName } from '../../std/type-name/structs'
import { ID, UID } from '../../sui/object/structs'

/* ============================== PositionManager =============================== */

export function isPositionManager(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('cetus-clmm', 'position::PositionManager')}::position::PositionManager`
}

export interface PositionManagerFields {
  tickSpacing: ToField<'u32'>
  positionIndex: ToField<'u64'>
  positions: ToField<LinkedTable<ID, ToPhantom<PositionInfo>>>
}

export type PositionManagerReified = Reified<PositionManager, PositionManagerFields>

export type PositionManagerJSONField = {
  tickSpacing: number
  positionIndex: string
  positions: ToJSON<LinkedTable<ID, ToPhantom<PositionInfo>>>
}

export type PositionManagerJSON = {
  $typeName: typeof PositionManager.$typeName
  $typeArgs: []
} & PositionManagerJSONField

/**
 * The position manager for Cetus CLMM pools
 * * `tick_spacing` - The tick spacing for this position manager
 * * `position_index` - The index counter for positions
 * * `positions` - A linked table mapping position IDs to their PositionInfo
 */
export class PositionManager implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::position::PositionManager` = `${
    getTypeOrigin('cetus-clmm', 'position::PositionManager')
  }::position::PositionManager` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof PositionManager.$typeName = PositionManager.$typeName
  readonly $fullTypeName: `${string}::position::PositionManager`
  readonly $typeArgs: []
  readonly $isPhantom: typeof PositionManager.$isPhantom = PositionManager.$isPhantom

  readonly tickSpacing: ToField<'u32'>
  readonly positionIndex: ToField<'u64'>
  readonly positions: ToField<LinkedTable<ID, ToPhantom<PositionInfo>>>

  private constructor(typeArgs: [], fields: PositionManagerFields) {
    this.$fullTypeName = composeSuiType(
      PositionManager.$typeName,
      ...typeArgs,
    ) as `${string}::position::PositionManager`
    this.$typeArgs = typeArgs

    this.tickSpacing = fields.tickSpacing
    this.positionIndex = fields.positionIndex
    this.positions = fields.positions
  }

  static reified(): PositionManagerReified {
    const reifiedBcs = PositionManager.bcs
    return {
      typeName: PositionManager.$typeName,
      fullTypeName: composeSuiType(
        PositionManager.$typeName,
        ...[],
      ) as `${string}::position::PositionManager`,
      typeArgs: [] as [],
      isPhantom: PositionManager.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PositionManager.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PositionManager.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PositionManager.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PositionManager.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PositionManager.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => PositionManager.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PositionManager.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => PositionManager.fetch(client, id),
      new: (fields: PositionManagerFields) => {
        return new PositionManager([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): PositionManagerReified {
    return PositionManager.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PositionManager>> {
    return phantom(PositionManager.reified())
  }

  static get p(): PhantomReified<ToTypeStr<PositionManager>> {
    return PositionManager.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('PositionManager', {
      tick_spacing: bcs.u32(),
      position_index: bcs.u64(),
      positions: LinkedTable.bcs(ID.bcs),
    })
  }

  private static cachedBcs: ReturnType<typeof PositionManager.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof PositionManager.instantiateBcs> {
    if (!PositionManager.cachedBcs) {
      PositionManager.cachedBcs = PositionManager.instantiateBcs()
    }
    return PositionManager.cachedBcs
  }

  static fromFields(fields: Record<string, any>): PositionManager {
    return PositionManager.reified().new({
      tickSpacing: decodeFromFields('u32', fields.tick_spacing),
      positionIndex: decodeFromFields('u64', fields.position_index),
      positions: decodeFromFields(
        LinkedTable.reified(ID.reified(), phantom(PositionInfo.reified())),
        fields.positions,
      ),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PositionManager {
    if (!isPositionManager(item.type)) {
      throw new Error('not a PositionManager type')
    }

    return PositionManager.reified().new({
      tickSpacing: decodeFromFieldsWithTypes('u32', item.fields.tick_spacing),
      positionIndex: decodeFromFieldsWithTypes('u64', item.fields.position_index),
      positions: decodeFromFieldsWithTypes(
        LinkedTable.reified(ID.reified(), phantom(PositionInfo.reified())),
        item.fields.positions,
      ),
    })
  }

  static fromBcs(data: Uint8Array): PositionManager {
    return PositionManager.fromFields(PositionManager.bcs.parse(data))
  }

  toJSONField(): PositionManagerJSONField {
    return {
      tickSpacing: this.tickSpacing,
      positionIndex: this.positionIndex.toString(),
      positions: this.positions.toJSONField(),
    }
  }

  toJSON(): PositionManagerJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PositionManager {
    return PositionManager.reified().new({
      tickSpacing: decodeFromJSONField('u32', field.tickSpacing),
      positionIndex: decodeFromJSONField('u64', field.positionIndex),
      positions: decodeFromJSONField(
        LinkedTable.reified(ID.reified(), phantom(PositionInfo.reified())),
        field.positions,
      ),
    })
  }

  static fromJSON(json: Record<string, any>): PositionManager {
    if (json.$typeName !== PositionManager.$typeName) {
      throw new Error(
        `not a PositionManager json object: expected '${PositionManager.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return PositionManager.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): PositionManager {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPositionManager(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PositionManager object`)
    }
    return PositionManager.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): PositionManager {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPositionManager(data.bcs.type)) {
        throw new Error(`object at is not a PositionManager object`)
      }

      return PositionManager.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PositionManager.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<PositionManager> {
    const res = await fetchObjectBcs(client, id)
    if (!isPositionManager(res.type)) {
      throw new Error(`object at id ${id} is not a PositionManager object`)
    }

    return PositionManager.fromBcs(res.bcsBytes)
  }
}

/* ============================== POSITION =============================== */

export function isPOSITION(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('cetus-clmm', 'position::POSITION')}::position::POSITION`
}

export interface POSITIONFields {
  dummyField: ToField<'bool'>
}

export type POSITIONReified = Reified<POSITION, POSITIONFields>

export type POSITIONJSONField = {
  dummyField: boolean
}

export type POSITIONJSON = {
  $typeName: typeof POSITION.$typeName
  $typeArgs: []
} & POSITIONJSONField

export class POSITION implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::position::POSITION` = `${
    getTypeOrigin('cetus-clmm', 'position::POSITION')
  }::position::POSITION` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof POSITION.$typeName = POSITION.$typeName
  readonly $fullTypeName: `${string}::position::POSITION`
  readonly $typeArgs: []
  readonly $isPhantom: typeof POSITION.$isPhantom = POSITION.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: POSITIONFields) {
    this.$fullTypeName = composeSuiType(
      POSITION.$typeName,
      ...typeArgs,
    ) as `${string}::position::POSITION`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): POSITIONReified {
    const reifiedBcs = POSITION.bcs
    return {
      typeName: POSITION.$typeName,
      fullTypeName: composeSuiType(
        POSITION.$typeName,
        ...[],
      ) as `${string}::position::POSITION`,
      typeArgs: [] as [],
      isPhantom: POSITION.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => POSITION.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => POSITION.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => POSITION.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => POSITION.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => POSITION.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => POSITION.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => POSITION.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => POSITION.fetch(client, id),
      new: (fields: POSITIONFields) => {
        return new POSITION([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): POSITIONReified {
    return POSITION.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<POSITION>> {
    return phantom(POSITION.reified())
  }

  static get p(): PhantomReified<ToTypeStr<POSITION>> {
    return POSITION.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('POSITION', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof POSITION.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof POSITION.instantiateBcs> {
    if (!POSITION.cachedBcs) {
      POSITION.cachedBcs = POSITION.instantiateBcs()
    }
    return POSITION.cachedBcs
  }

  static fromFields(fields: Record<string, any>): POSITION {
    return POSITION.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): POSITION {
    if (!isPOSITION(item.type)) {
      throw new Error('not a POSITION type')
    }

    return POSITION.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): POSITION {
    return POSITION.fromFields(POSITION.bcs.parse(data))
  }

  toJSONField(): POSITIONJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): POSITIONJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): POSITION {
    return POSITION.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): POSITION {
    if (json.$typeName !== POSITION.$typeName) {
      throw new Error(
        `not a POSITION json object: expected '${POSITION.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return POSITION.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): POSITION {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPOSITION(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a POSITION object`)
    }
    return POSITION.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): POSITION {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPOSITION(data.bcs.type)) {
        throw new Error(`object at is not a POSITION object`)
      }

      return POSITION.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return POSITION.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<POSITION> {
    const res = await fetchObjectBcs(client, id)
    if (!isPOSITION(res.type)) {
      throw new Error(`object at id ${id} is not a POSITION object`)
    }

    return POSITION.fromBcs(res.bcsBytes)
  }
}

/* ============================== Position =============================== */

export function isPosition(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('cetus-clmm', 'position::Position')}::position::Position`
}

export interface PositionFields {
  id: ToField<UID>
  pool: ToField<ID>
  index: ToField<'u64'>
  coinTypeA: ToField<TypeName>
  coinTypeB: ToField<TypeName>
  name: ToField<String>
  description: ToField<String>
  url: ToField<String>
  tickLowerIndex: ToField<I32>
  tickUpperIndex: ToField<I32>
  liquidity: ToField<'u128'>
}

export type PositionReified = Reified<Position, PositionFields>

export type PositionJSONField = {
  id: string
  pool: string
  index: string
  coinTypeA: string
  coinTypeB: string
  name: string
  description: string
  url: string
  tickLowerIndex: ToJSON<I32>
  tickUpperIndex: ToJSON<I32>
  liquidity: string
}

export type PositionJSON = {
  $typeName: typeof Position.$typeName
  $typeArgs: []
} & PositionJSONField

/**
 * The Cetus clmmpool's position NFT.
 * * `id` - The unique identifier for this Position object
 * * `pool` - The pool ID
 * * `index` - The position index
 * * `coin_type_a` - The type name of coin A
 * * `coin_type_b` - The type name of coin B
 * * `name` - The name of the position
 * * `description` - The description of the position
 * * `url` - The URL of the position
 * * `tick_lower_index` - The lower tick index
 * * `tick_upper_index` - The upper tick index
 * * `liquidity` - The liquidity of the position
 */
export class Position implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::position::Position` = `${
    getTypeOrigin('cetus-clmm', 'position::Position')
  }::position::Position` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof Position.$typeName = Position.$typeName
  readonly $fullTypeName: `${string}::position::Position`
  readonly $typeArgs: []
  readonly $isPhantom: typeof Position.$isPhantom = Position.$isPhantom

  readonly id: ToField<UID>
  readonly pool: ToField<ID>
  readonly index: ToField<'u64'>
  readonly coinTypeA: ToField<TypeName>
  readonly coinTypeB: ToField<TypeName>
  readonly name: ToField<String>
  readonly description: ToField<String>
  readonly url: ToField<String>
  readonly tickLowerIndex: ToField<I32>
  readonly tickUpperIndex: ToField<I32>
  readonly liquidity: ToField<'u128'>

  private constructor(typeArgs: [], fields: PositionFields) {
    this.$fullTypeName = composeSuiType(
      Position.$typeName,
      ...typeArgs,
    ) as `${string}::position::Position`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.pool = fields.pool
    this.index = fields.index
    this.coinTypeA = fields.coinTypeA
    this.coinTypeB = fields.coinTypeB
    this.name = fields.name
    this.description = fields.description
    this.url = fields.url
    this.tickLowerIndex = fields.tickLowerIndex
    this.tickUpperIndex = fields.tickUpperIndex
    this.liquidity = fields.liquidity
  }

  static reified(): PositionReified {
    const reifiedBcs = Position.bcs
    return {
      typeName: Position.$typeName,
      fullTypeName: composeSuiType(
        Position.$typeName,
        ...[],
      ) as `${string}::position::Position`,
      typeArgs: [] as [],
      isPhantom: Position.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Position.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Position.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Position.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Position.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Position.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => Position.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Position.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => Position.fetch(client, id),
      new: (fields: PositionFields) => {
        return new Position([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): PositionReified {
    return Position.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Position>> {
    return phantom(Position.reified())
  }

  static get p(): PhantomReified<ToTypeStr<Position>> {
    return Position.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('Position', {
      id: UID.bcs,
      pool: ID.bcs,
      index: bcs.u64(),
      coin_type_a: TypeName.bcs,
      coin_type_b: TypeName.bcs,
      name: String.bcs,
      description: String.bcs,
      url: String.bcs,
      tick_lower_index: I32.bcs,
      tick_upper_index: I32.bcs,
      liquidity: bcs.u128(),
    })
  }

  private static cachedBcs: ReturnType<typeof Position.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof Position.instantiateBcs> {
    if (!Position.cachedBcs) {
      Position.cachedBcs = Position.instantiateBcs()
    }
    return Position.cachedBcs
  }

  static fromFields(fields: Record<string, any>): Position {
    return Position.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      pool: decodeFromFields(ID.reified(), fields.pool),
      index: decodeFromFields('u64', fields.index),
      coinTypeA: decodeFromFields(TypeName.reified(), fields.coin_type_a),
      coinTypeB: decodeFromFields(TypeName.reified(), fields.coin_type_b),
      name: decodeFromFields(String.reified(), fields.name),
      description: decodeFromFields(String.reified(), fields.description),
      url: decodeFromFields(String.reified(), fields.url),
      tickLowerIndex: decodeFromFields(I32.reified(), fields.tick_lower_index),
      tickUpperIndex: decodeFromFields(I32.reified(), fields.tick_upper_index),
      liquidity: decodeFromFields('u128', fields.liquidity),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Position {
    if (!isPosition(item.type)) {
      throw new Error('not a Position type')
    }

    return Position.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      pool: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool),
      index: decodeFromFieldsWithTypes('u64', item.fields.index),
      coinTypeA: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.coin_type_a),
      coinTypeB: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.coin_type_b),
      name: decodeFromFieldsWithTypes(String.reified(), item.fields.name),
      description: decodeFromFieldsWithTypes(String.reified(), item.fields.description),
      url: decodeFromFieldsWithTypes(String.reified(), item.fields.url),
      tickLowerIndex: decodeFromFieldsWithTypes(I32.reified(), item.fields.tick_lower_index),
      tickUpperIndex: decodeFromFieldsWithTypes(I32.reified(), item.fields.tick_upper_index),
      liquidity: decodeFromFieldsWithTypes('u128', item.fields.liquidity),
    })
  }

  static fromBcs(data: Uint8Array): Position {
    return Position.fromFields(Position.bcs.parse(data))
  }

  toJSONField(): PositionJSONField {
    return {
      id: this.id,
      pool: this.pool,
      index: this.index.toString(),
      coinTypeA: this.coinTypeA,
      coinTypeB: this.coinTypeB,
      name: this.name,
      description: this.description,
      url: this.url,
      tickLowerIndex: this.tickLowerIndex.toJSONField(),
      tickUpperIndex: this.tickUpperIndex.toJSONField(),
      liquidity: this.liquidity.toString(),
    }
  }

  toJSON(): PositionJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Position {
    return Position.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      pool: decodeFromJSONField(ID.reified(), field.pool),
      index: decodeFromJSONField('u64', field.index),
      coinTypeA: decodeFromJSONField(TypeName.reified(), field.coinTypeA),
      coinTypeB: decodeFromJSONField(TypeName.reified(), field.coinTypeB),
      name: decodeFromJSONField(String.reified(), field.name),
      description: decodeFromJSONField(String.reified(), field.description),
      url: decodeFromJSONField(String.reified(), field.url),
      tickLowerIndex: decodeFromJSONField(I32.reified(), field.tickLowerIndex),
      tickUpperIndex: decodeFromJSONField(I32.reified(), field.tickUpperIndex),
      liquidity: decodeFromJSONField('u128', field.liquidity),
    })
  }

  static fromJSON(json: Record<string, any>): Position {
    if (json.$typeName !== Position.$typeName) {
      throw new Error(
        `not a Position json object: expected '${Position.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return Position.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): Position {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPosition(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Position object`)
    }
    return Position.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): Position {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPosition(data.bcs.type)) {
        throw new Error(`object at is not a Position object`)
      }

      return Position.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Position.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<Position> {
    const res = await fetchObjectBcs(client, id)
    if (!isPosition(res.type)) {
      throw new Error(`object at id ${id} is not a Position object`)
    }

    return Position.fromBcs(res.bcsBytes)
  }
}

/* ============================== PositionInfo =============================== */

export function isPositionInfo(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('cetus-clmm', 'position::PositionInfo')}::position::PositionInfo`
}

export interface PositionInfoFields {
  positionId: ToField<ID>
  liquidity: ToField<'u128'>
  tickLowerIndex: ToField<I32>
  tickUpperIndex: ToField<I32>
  feeGrowthInsideA: ToField<'u128'>
  feeGrowthInsideB: ToField<'u128'>
  feeOwnedA: ToField<'u64'>
  feeOwnedB: ToField<'u64'>
  pointsOwned: ToField<'u128'>
  pointsGrowthInside: ToField<'u128'>
  rewards: ToField<Vector<PositionReward>>
}

export type PositionInfoReified = Reified<PositionInfo, PositionInfoFields>

export type PositionInfoJSONField = {
  positionId: string
  liquidity: string
  tickLowerIndex: ToJSON<I32>
  tickUpperIndex: ToJSON<I32>
  feeGrowthInsideA: string
  feeGrowthInsideB: string
  feeOwnedA: string
  feeOwnedB: string
  pointsOwned: string
  pointsGrowthInside: string
  rewards: ToJSON<PositionReward>[]
}

export type PositionInfoJSON = {
  $typeName: typeof PositionInfo.$typeName
  $typeArgs: []
} & PositionInfoJSONField

/**
 * The PositionInfo struct that stores the position info
 * * `position_id` - The unique identifier for this PositionInfo object
 * * `liquidity` - The liquidity of the position
 * * `tick_lower_index` - The lower tick index
 * * `tick_upper_index` - The upper tick index
 * * `fee_growth_inside_a` - The fee growth inside of coin A
 * * `fee_growth_inside_b` - The fee growth inside of coin B
 * * `fee_owned_a` - The fee owned of coin A
 * * `fee_owned_b` - The fee owned of coin B
 * * `points_owned` - The points owned of the position
 * * `points_growth_inside` - The points growth inside of the position
 * * `rewards` - The rewards of the position
 */
export class PositionInfo implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::position::PositionInfo` = `${
    getTypeOrigin('cetus-clmm', 'position::PositionInfo')
  }::position::PositionInfo` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof PositionInfo.$typeName = PositionInfo.$typeName
  readonly $fullTypeName: `${string}::position::PositionInfo`
  readonly $typeArgs: []
  readonly $isPhantom: typeof PositionInfo.$isPhantom = PositionInfo.$isPhantom

  readonly positionId: ToField<ID>
  readonly liquidity: ToField<'u128'>
  readonly tickLowerIndex: ToField<I32>
  readonly tickUpperIndex: ToField<I32>
  readonly feeGrowthInsideA: ToField<'u128'>
  readonly feeGrowthInsideB: ToField<'u128'>
  readonly feeOwnedA: ToField<'u64'>
  readonly feeOwnedB: ToField<'u64'>
  readonly pointsOwned: ToField<'u128'>
  readonly pointsGrowthInside: ToField<'u128'>
  readonly rewards: ToField<Vector<PositionReward>>

  private constructor(typeArgs: [], fields: PositionInfoFields) {
    this.$fullTypeName = composeSuiType(
      PositionInfo.$typeName,
      ...typeArgs,
    ) as `${string}::position::PositionInfo`
    this.$typeArgs = typeArgs

    this.positionId = fields.positionId
    this.liquidity = fields.liquidity
    this.tickLowerIndex = fields.tickLowerIndex
    this.tickUpperIndex = fields.tickUpperIndex
    this.feeGrowthInsideA = fields.feeGrowthInsideA
    this.feeGrowthInsideB = fields.feeGrowthInsideB
    this.feeOwnedA = fields.feeOwnedA
    this.feeOwnedB = fields.feeOwnedB
    this.pointsOwned = fields.pointsOwned
    this.pointsGrowthInside = fields.pointsGrowthInside
    this.rewards = fields.rewards
  }

  static reified(): PositionInfoReified {
    const reifiedBcs = PositionInfo.bcs
    return {
      typeName: PositionInfo.$typeName,
      fullTypeName: composeSuiType(
        PositionInfo.$typeName,
        ...[],
      ) as `${string}::position::PositionInfo`,
      typeArgs: [] as [],
      isPhantom: PositionInfo.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PositionInfo.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PositionInfo.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PositionInfo.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PositionInfo.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PositionInfo.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => PositionInfo.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PositionInfo.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => PositionInfo.fetch(client, id),
      new: (fields: PositionInfoFields) => {
        return new PositionInfo([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): PositionInfoReified {
    return PositionInfo.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PositionInfo>> {
    return phantom(PositionInfo.reified())
  }

  static get p(): PhantomReified<ToTypeStr<PositionInfo>> {
    return PositionInfo.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('PositionInfo', {
      position_id: ID.bcs,
      liquidity: bcs.u128(),
      tick_lower_index: I32.bcs,
      tick_upper_index: I32.bcs,
      fee_growth_inside_a: bcs.u128(),
      fee_growth_inside_b: bcs.u128(),
      fee_owned_a: bcs.u64(),
      fee_owned_b: bcs.u64(),
      points_owned: bcs.u128(),
      points_growth_inside: bcs.u128(),
      rewards: bcs.vector(PositionReward.bcs),
    })
  }

  private static cachedBcs: ReturnType<typeof PositionInfo.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof PositionInfo.instantiateBcs> {
    if (!PositionInfo.cachedBcs) {
      PositionInfo.cachedBcs = PositionInfo.instantiateBcs()
    }
    return PositionInfo.cachedBcs
  }

  static fromFields(fields: Record<string, any>): PositionInfo {
    return PositionInfo.reified().new({
      positionId: decodeFromFields(ID.reified(), fields.position_id),
      liquidity: decodeFromFields('u128', fields.liquidity),
      tickLowerIndex: decodeFromFields(I32.reified(), fields.tick_lower_index),
      tickUpperIndex: decodeFromFields(I32.reified(), fields.tick_upper_index),
      feeGrowthInsideA: decodeFromFields('u128', fields.fee_growth_inside_a),
      feeGrowthInsideB: decodeFromFields('u128', fields.fee_growth_inside_b),
      feeOwnedA: decodeFromFields('u64', fields.fee_owned_a),
      feeOwnedB: decodeFromFields('u64', fields.fee_owned_b),
      pointsOwned: decodeFromFields('u128', fields.points_owned),
      pointsGrowthInside: decodeFromFields('u128', fields.points_growth_inside),
      rewards: decodeFromFields(vector(PositionReward.reified()), fields.rewards),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PositionInfo {
    if (!isPositionInfo(item.type)) {
      throw new Error('not a PositionInfo type')
    }

    return PositionInfo.reified().new({
      positionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.position_id),
      liquidity: decodeFromFieldsWithTypes('u128', item.fields.liquidity),
      tickLowerIndex: decodeFromFieldsWithTypes(I32.reified(), item.fields.tick_lower_index),
      tickUpperIndex: decodeFromFieldsWithTypes(I32.reified(), item.fields.tick_upper_index),
      feeGrowthInsideA: decodeFromFieldsWithTypes('u128', item.fields.fee_growth_inside_a),
      feeGrowthInsideB: decodeFromFieldsWithTypes('u128', item.fields.fee_growth_inside_b),
      feeOwnedA: decodeFromFieldsWithTypes('u64', item.fields.fee_owned_a),
      feeOwnedB: decodeFromFieldsWithTypes('u64', item.fields.fee_owned_b),
      pointsOwned: decodeFromFieldsWithTypes('u128', item.fields.points_owned),
      pointsGrowthInside: decodeFromFieldsWithTypes('u128', item.fields.points_growth_inside),
      rewards: decodeFromFieldsWithTypes(vector(PositionReward.reified()), item.fields.rewards),
    })
  }

  static fromBcs(data: Uint8Array): PositionInfo {
    return PositionInfo.fromFields(PositionInfo.bcs.parse(data))
  }

  toJSONField(): PositionInfoJSONField {
    return {
      positionId: this.positionId,
      liquidity: this.liquidity.toString(),
      tickLowerIndex: this.tickLowerIndex.toJSONField(),
      tickUpperIndex: this.tickUpperIndex.toJSONField(),
      feeGrowthInsideA: this.feeGrowthInsideA.toString(),
      feeGrowthInsideB: this.feeGrowthInsideB.toString(),
      feeOwnedA: this.feeOwnedA.toString(),
      feeOwnedB: this.feeOwnedB.toString(),
      pointsOwned: this.pointsOwned.toString(),
      pointsGrowthInside: this.pointsGrowthInside.toString(),
      rewards: fieldToJSON<Vector<PositionReward>>(
        `vector<${PositionReward.$typeName}>`,
        this.rewards,
      ),
    }
  }

  toJSON(): PositionInfoJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PositionInfo {
    return PositionInfo.reified().new({
      positionId: decodeFromJSONField(ID.reified(), field.positionId),
      liquidity: decodeFromJSONField('u128', field.liquidity),
      tickLowerIndex: decodeFromJSONField(I32.reified(), field.tickLowerIndex),
      tickUpperIndex: decodeFromJSONField(I32.reified(), field.tickUpperIndex),
      feeGrowthInsideA: decodeFromJSONField('u128', field.feeGrowthInsideA),
      feeGrowthInsideB: decodeFromJSONField('u128', field.feeGrowthInsideB),
      feeOwnedA: decodeFromJSONField('u64', field.feeOwnedA),
      feeOwnedB: decodeFromJSONField('u64', field.feeOwnedB),
      pointsOwned: decodeFromJSONField('u128', field.pointsOwned),
      pointsGrowthInside: decodeFromJSONField('u128', field.pointsGrowthInside),
      rewards: decodeFromJSONField(vector(PositionReward.reified()), field.rewards),
    })
  }

  static fromJSON(json: Record<string, any>): PositionInfo {
    if (json.$typeName !== PositionInfo.$typeName) {
      throw new Error(
        `not a PositionInfo json object: expected '${PositionInfo.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return PositionInfo.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): PositionInfo {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPositionInfo(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PositionInfo object`)
    }
    return PositionInfo.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): PositionInfo {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPositionInfo(data.bcs.type)) {
        throw new Error(`object at is not a PositionInfo object`)
      }

      return PositionInfo.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PositionInfo.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<PositionInfo> {
    const res = await fetchObjectBcs(client, id)
    if (!isPositionInfo(res.type)) {
      throw new Error(`object at id ${id} is not a PositionInfo object`)
    }

    return PositionInfo.fromBcs(res.bcsBytes)
  }
}

/* ============================== PositionReward =============================== */

export function isPositionReward(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('cetus-clmm', 'position::PositionReward')}::position::PositionReward`
}

export interface PositionRewardFields {
  growthInside: ToField<'u128'>
  amountOwned: ToField<'u64'>
}

export type PositionRewardReified = Reified<PositionReward, PositionRewardFields>

export type PositionRewardJSONField = {
  growthInside: string
  amountOwned: string
}

export type PositionRewardJSON = {
  $typeName: typeof PositionReward.$typeName
  $typeArgs: []
} & PositionRewardJSONField

/**
 * The Position's rewarder
 * * `growth_inside` - The growth inside of the reward
 * * `amount_owned` - The amount owned of the reward
 */
export class PositionReward implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::position::PositionReward` = `${
    getTypeOrigin('cetus-clmm', 'position::PositionReward')
  }::position::PositionReward` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof PositionReward.$typeName = PositionReward.$typeName
  readonly $fullTypeName: `${string}::position::PositionReward`
  readonly $typeArgs: []
  readonly $isPhantom: typeof PositionReward.$isPhantom = PositionReward.$isPhantom

  readonly growthInside: ToField<'u128'>
  readonly amountOwned: ToField<'u64'>

  private constructor(typeArgs: [], fields: PositionRewardFields) {
    this.$fullTypeName = composeSuiType(
      PositionReward.$typeName,
      ...typeArgs,
    ) as `${string}::position::PositionReward`
    this.$typeArgs = typeArgs

    this.growthInside = fields.growthInside
    this.amountOwned = fields.amountOwned
  }

  static reified(): PositionRewardReified {
    const reifiedBcs = PositionReward.bcs
    return {
      typeName: PositionReward.$typeName,
      fullTypeName: composeSuiType(
        PositionReward.$typeName,
        ...[],
      ) as `${string}::position::PositionReward`,
      typeArgs: [] as [],
      isPhantom: PositionReward.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PositionReward.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PositionReward.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PositionReward.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PositionReward.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PositionReward.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => PositionReward.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PositionReward.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => PositionReward.fetch(client, id),
      new: (fields: PositionRewardFields) => {
        return new PositionReward([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): PositionRewardReified {
    return PositionReward.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PositionReward>> {
    return phantom(PositionReward.reified())
  }

  static get p(): PhantomReified<ToTypeStr<PositionReward>> {
    return PositionReward.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('PositionReward', {
      growth_inside: bcs.u128(),
      amount_owned: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof PositionReward.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof PositionReward.instantiateBcs> {
    if (!PositionReward.cachedBcs) {
      PositionReward.cachedBcs = PositionReward.instantiateBcs()
    }
    return PositionReward.cachedBcs
  }

  static fromFields(fields: Record<string, any>): PositionReward {
    return PositionReward.reified().new({
      growthInside: decodeFromFields('u128', fields.growth_inside),
      amountOwned: decodeFromFields('u64', fields.amount_owned),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PositionReward {
    if (!isPositionReward(item.type)) {
      throw new Error('not a PositionReward type')
    }

    return PositionReward.reified().new({
      growthInside: decodeFromFieldsWithTypes('u128', item.fields.growth_inside),
      amountOwned: decodeFromFieldsWithTypes('u64', item.fields.amount_owned),
    })
  }

  static fromBcs(data: Uint8Array): PositionReward {
    return PositionReward.fromFields(PositionReward.bcs.parse(data))
  }

  toJSONField(): PositionRewardJSONField {
    return {
      growthInside: this.growthInside.toString(),
      amountOwned: this.amountOwned.toString(),
    }
  }

  toJSON(): PositionRewardJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PositionReward {
    return PositionReward.reified().new({
      growthInside: decodeFromJSONField('u128', field.growthInside),
      amountOwned: decodeFromJSONField('u64', field.amountOwned),
    })
  }

  static fromJSON(json: Record<string, any>): PositionReward {
    if (json.$typeName !== PositionReward.$typeName) {
      throw new Error(
        `not a PositionReward json object: expected '${PositionReward.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return PositionReward.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): PositionReward {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPositionReward(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PositionReward object`)
    }
    return PositionReward.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): PositionReward {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPositionReward(data.bcs.type)) {
        throw new Error(`object at is not a PositionReward object`)
      }

      return PositionReward.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PositionReward.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<PositionReward> {
    const res = await fetchObjectBcs(client, id)
    if (!isPositionReward(res.type)) {
      throw new Error(`object at id ${id} is not a PositionReward object`)
    }

    return PositionReward.fromBcs(res.bcsBytes)
  }
}
