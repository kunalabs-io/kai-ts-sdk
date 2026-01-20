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
import { ID, UID } from '../../sui/object/structs'

/* ============================== PositionLiquiditySnapshot =============================== */

export function isPositionLiquiditySnapshot(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('cetus-clmm', 'position_snapshot::PositionLiquiditySnapshot')
    }::position_snapshot::PositionLiquiditySnapshot`
}

export interface PositionLiquiditySnapshotFields {
  id: ToField<UID>
  currentSqrtPrice: ToField<'u128'>
  removePercent: ToField<'u64'>
  totalValueCut: ToField<'u64'>
  snapshots: ToField<LinkedTable<ID, ToPhantom<PositionSnapshot>>>
}

export type PositionLiquiditySnapshotReified = Reified<
  PositionLiquiditySnapshot,
  PositionLiquiditySnapshotFields
>

export type PositionLiquiditySnapshotJSONField = {
  id: string
  currentSqrtPrice: string
  removePercent: string
  totalValueCut: string
  snapshots: ToJSON<LinkedTable<ID, ToPhantom<PositionSnapshot>>>
}

export type PositionLiquiditySnapshotJSON = {
  $typeName: typeof PositionLiquiditySnapshot.$typeName
  $typeArgs: []
} & PositionLiquiditySnapshotJSONField

/**
 * PositionLiquiditySnapshot struct that stores the snapshot of the position
 * * `id` - The unique identifier for this PositionLiquiditySnapshot object
 * * `current_sqrt_price` - The current sqrt price
 * * `remove_percent` - The remove percent
 * * `total_value_cut` - The total value cut
 * * `snapshots` - A linked table storing the snapshots of the position
 */
export class PositionLiquiditySnapshot implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::position_snapshot::PositionLiquiditySnapshot` = `${
    getTypeOrigin('cetus-clmm', 'position_snapshot::PositionLiquiditySnapshot')
  }::position_snapshot::PositionLiquiditySnapshot` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof PositionLiquiditySnapshot.$typeName =
    PositionLiquiditySnapshot.$typeName
  readonly $fullTypeName: `${string}::position_snapshot::PositionLiquiditySnapshot`
  readonly $typeArgs: []
  readonly $isPhantom: typeof PositionLiquiditySnapshot.$isPhantom =
    PositionLiquiditySnapshot.$isPhantom

  readonly id: ToField<UID>
  readonly currentSqrtPrice: ToField<'u128'>
  readonly removePercent: ToField<'u64'>
  readonly totalValueCut: ToField<'u64'>
  readonly snapshots: ToField<LinkedTable<ID, ToPhantom<PositionSnapshot>>>

  private constructor(typeArgs: [], fields: PositionLiquiditySnapshotFields) {
    this.$fullTypeName = composeSuiType(
      PositionLiquiditySnapshot.$typeName,
      ...typeArgs,
    ) as `${string}::position_snapshot::PositionLiquiditySnapshot`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.currentSqrtPrice = fields.currentSqrtPrice
    this.removePercent = fields.removePercent
    this.totalValueCut = fields.totalValueCut
    this.snapshots = fields.snapshots
  }

  static reified(): PositionLiquiditySnapshotReified {
    const reifiedBcs = PositionLiquiditySnapshot.bcs
    return {
      typeName: PositionLiquiditySnapshot.$typeName,
      fullTypeName: composeSuiType(
        PositionLiquiditySnapshot.$typeName,
        ...[],
      ) as `${string}::position_snapshot::PositionLiquiditySnapshot`,
      typeArgs: [] as [],
      isPhantom: PositionLiquiditySnapshot.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PositionLiquiditySnapshot.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        PositionLiquiditySnapshot.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PositionLiquiditySnapshot.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PositionLiquiditySnapshot.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PositionLiquiditySnapshot.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        PositionLiquiditySnapshot.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        PositionLiquiditySnapshot.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) =>
        PositionLiquiditySnapshot.fetch(client, id),
      new: (fields: PositionLiquiditySnapshotFields) => {
        return new PositionLiquiditySnapshot([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): PositionLiquiditySnapshotReified {
    return PositionLiquiditySnapshot.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PositionLiquiditySnapshot>> {
    return phantom(PositionLiquiditySnapshot.reified())
  }

  static get p(): PhantomReified<ToTypeStr<PositionLiquiditySnapshot>> {
    return PositionLiquiditySnapshot.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('PositionLiquiditySnapshot', {
      id: UID.bcs,
      current_sqrt_price: bcs.u128(),
      remove_percent: bcs.u64(),
      total_value_cut: bcs.u64(),
      snapshots: LinkedTable.bcs(ID.bcs),
    })
  }

  private static cachedBcs: ReturnType<typeof PositionLiquiditySnapshot.instantiateBcs> | null =
    null

  static get bcs(): ReturnType<typeof PositionLiquiditySnapshot.instantiateBcs> {
    if (!PositionLiquiditySnapshot.cachedBcs) {
      PositionLiquiditySnapshot.cachedBcs = PositionLiquiditySnapshot.instantiateBcs()
    }
    return PositionLiquiditySnapshot.cachedBcs
  }

  static fromFields(fields: Record<string, any>): PositionLiquiditySnapshot {
    return PositionLiquiditySnapshot.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      currentSqrtPrice: decodeFromFields('u128', fields.current_sqrt_price),
      removePercent: decodeFromFields('u64', fields.remove_percent),
      totalValueCut: decodeFromFields('u64', fields.total_value_cut),
      snapshots: decodeFromFields(
        LinkedTable.reified(ID.reified(), phantom(PositionSnapshot.reified())),
        fields.snapshots,
      ),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PositionLiquiditySnapshot {
    if (!isPositionLiquiditySnapshot(item.type)) {
      throw new Error('not a PositionLiquiditySnapshot type')
    }

    return PositionLiquiditySnapshot.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      currentSqrtPrice: decodeFromFieldsWithTypes('u128', item.fields.current_sqrt_price),
      removePercent: decodeFromFieldsWithTypes('u64', item.fields.remove_percent),
      totalValueCut: decodeFromFieldsWithTypes('u64', item.fields.total_value_cut),
      snapshots: decodeFromFieldsWithTypes(
        LinkedTable.reified(ID.reified(), phantom(PositionSnapshot.reified())),
        item.fields.snapshots,
      ),
    })
  }

  static fromBcs(data: Uint8Array): PositionLiquiditySnapshot {
    return PositionLiquiditySnapshot.fromFields(PositionLiquiditySnapshot.bcs.parse(data))
  }

  toJSONField(): PositionLiquiditySnapshotJSONField {
    return {
      id: this.id,
      currentSqrtPrice: this.currentSqrtPrice.toString(),
      removePercent: this.removePercent.toString(),
      totalValueCut: this.totalValueCut.toString(),
      snapshots: this.snapshots.toJSONField(),
    }
  }

  toJSON(): PositionLiquiditySnapshotJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PositionLiquiditySnapshot {
    return PositionLiquiditySnapshot.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      currentSqrtPrice: decodeFromJSONField('u128', field.currentSqrtPrice),
      removePercent: decodeFromJSONField('u64', field.removePercent),
      totalValueCut: decodeFromJSONField('u64', field.totalValueCut),
      snapshots: decodeFromJSONField(
        LinkedTable.reified(ID.reified(), phantom(PositionSnapshot.reified())),
        field.snapshots,
      ),
    })
  }

  static fromJSON(json: Record<string, any>): PositionLiquiditySnapshot {
    if (json.$typeName !== PositionLiquiditySnapshot.$typeName) {
      throw new Error(
        `not a PositionLiquiditySnapshot json object: expected '${PositionLiquiditySnapshot.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return PositionLiquiditySnapshot.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): PositionLiquiditySnapshot {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPositionLiquiditySnapshot(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a PositionLiquiditySnapshot object`,
      )
    }
    return PositionLiquiditySnapshot.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): PositionLiquiditySnapshot {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPositionLiquiditySnapshot(data.bcs.type)) {
        throw new Error(`object at is not a PositionLiquiditySnapshot object`)
      }

      return PositionLiquiditySnapshot.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PositionLiquiditySnapshot.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<PositionLiquiditySnapshot> {
    const res = await fetchObjectBcs(client, id)
    if (!isPositionLiquiditySnapshot(res.type)) {
      throw new Error(`object at id ${id} is not a PositionLiquiditySnapshot object`)
    }

    return PositionLiquiditySnapshot.fromBcs(res.bcsBytes)
  }
}

/* ============================== PositionSnapshot =============================== */

export function isPositionSnapshot(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('cetus-clmm', 'position_snapshot::PositionSnapshot')
    }::position_snapshot::PositionSnapshot`
}

export interface PositionSnapshotFields {
  positionId: ToField<ID>
  liquidity: ToField<'u128'>
  tickLowerIndex: ToField<I32>
  tickUpperIndex: ToField<I32>
  feeOwnedA: ToField<'u64'>
  feeOwnedB: ToField<'u64'>
  rewards: ToField<Vector<'u64'>>
  valueCut: ToField<'u64'>
}

export type PositionSnapshotReified = Reified<PositionSnapshot, PositionSnapshotFields>

export type PositionSnapshotJSONField = {
  positionId: string
  liquidity: string
  tickLowerIndex: ToJSON<I32>
  tickUpperIndex: ToJSON<I32>
  feeOwnedA: string
  feeOwnedB: string
  rewards: string[]
  valueCut: string
}

export type PositionSnapshotJSON = {
  $typeName: typeof PositionSnapshot.$typeName
  $typeArgs: []
} & PositionSnapshotJSONField

/**
 * PositionSnapshot of a position
 * * `position_id` - position id
 * * `liquidity` - liquidity of the position
 * * `tick_lower_index` - lower tick index
 * * `tick_upper_index` - upper tick index
 * * `fee_owned_a` - The fee owned by the position a
 * * `fee_owned_b` - The fee owned by the position b
 * * `rewards` - The rewards of the position
 * * `value_cut` - The value cut of the position
 */
export class PositionSnapshot implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::position_snapshot::PositionSnapshot` = `${
    getTypeOrigin('cetus-clmm', 'position_snapshot::PositionSnapshot')
  }::position_snapshot::PositionSnapshot` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof PositionSnapshot.$typeName = PositionSnapshot.$typeName
  readonly $fullTypeName: `${string}::position_snapshot::PositionSnapshot`
  readonly $typeArgs: []
  readonly $isPhantom: typeof PositionSnapshot.$isPhantom = PositionSnapshot.$isPhantom

  readonly positionId: ToField<ID>
  readonly liquidity: ToField<'u128'>
  readonly tickLowerIndex: ToField<I32>
  readonly tickUpperIndex: ToField<I32>
  readonly feeOwnedA: ToField<'u64'>
  readonly feeOwnedB: ToField<'u64'>
  readonly rewards: ToField<Vector<'u64'>>
  readonly valueCut: ToField<'u64'>

  private constructor(typeArgs: [], fields: PositionSnapshotFields) {
    this.$fullTypeName = composeSuiType(
      PositionSnapshot.$typeName,
      ...typeArgs,
    ) as `${string}::position_snapshot::PositionSnapshot`
    this.$typeArgs = typeArgs

    this.positionId = fields.positionId
    this.liquidity = fields.liquidity
    this.tickLowerIndex = fields.tickLowerIndex
    this.tickUpperIndex = fields.tickUpperIndex
    this.feeOwnedA = fields.feeOwnedA
    this.feeOwnedB = fields.feeOwnedB
    this.rewards = fields.rewards
    this.valueCut = fields.valueCut
  }

  static reified(): PositionSnapshotReified {
    const reifiedBcs = PositionSnapshot.bcs
    return {
      typeName: PositionSnapshot.$typeName,
      fullTypeName: composeSuiType(
        PositionSnapshot.$typeName,
        ...[],
      ) as `${string}::position_snapshot::PositionSnapshot`,
      typeArgs: [] as [],
      isPhantom: PositionSnapshot.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PositionSnapshot.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PositionSnapshot.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PositionSnapshot.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PositionSnapshot.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PositionSnapshot.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => PositionSnapshot.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PositionSnapshot.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => PositionSnapshot.fetch(client, id),
      new: (fields: PositionSnapshotFields) => {
        return new PositionSnapshot([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): PositionSnapshotReified {
    return PositionSnapshot.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PositionSnapshot>> {
    return phantom(PositionSnapshot.reified())
  }

  static get p(): PhantomReified<ToTypeStr<PositionSnapshot>> {
    return PositionSnapshot.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('PositionSnapshot', {
      position_id: ID.bcs,
      liquidity: bcs.u128(),
      tick_lower_index: I32.bcs,
      tick_upper_index: I32.bcs,
      fee_owned_a: bcs.u64(),
      fee_owned_b: bcs.u64(),
      rewards: bcs.vector(bcs.u64()),
      value_cut: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof PositionSnapshot.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof PositionSnapshot.instantiateBcs> {
    if (!PositionSnapshot.cachedBcs) {
      PositionSnapshot.cachedBcs = PositionSnapshot.instantiateBcs()
    }
    return PositionSnapshot.cachedBcs
  }

  static fromFields(fields: Record<string, any>): PositionSnapshot {
    return PositionSnapshot.reified().new({
      positionId: decodeFromFields(ID.reified(), fields.position_id),
      liquidity: decodeFromFields('u128', fields.liquidity),
      tickLowerIndex: decodeFromFields(I32.reified(), fields.tick_lower_index),
      tickUpperIndex: decodeFromFields(I32.reified(), fields.tick_upper_index),
      feeOwnedA: decodeFromFields('u64', fields.fee_owned_a),
      feeOwnedB: decodeFromFields('u64', fields.fee_owned_b),
      rewards: decodeFromFields(vector('u64'), fields.rewards),
      valueCut: decodeFromFields('u64', fields.value_cut),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PositionSnapshot {
    if (!isPositionSnapshot(item.type)) {
      throw new Error('not a PositionSnapshot type')
    }

    return PositionSnapshot.reified().new({
      positionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.position_id),
      liquidity: decodeFromFieldsWithTypes('u128', item.fields.liquidity),
      tickLowerIndex: decodeFromFieldsWithTypes(I32.reified(), item.fields.tick_lower_index),
      tickUpperIndex: decodeFromFieldsWithTypes(I32.reified(), item.fields.tick_upper_index),
      feeOwnedA: decodeFromFieldsWithTypes('u64', item.fields.fee_owned_a),
      feeOwnedB: decodeFromFieldsWithTypes('u64', item.fields.fee_owned_b),
      rewards: decodeFromFieldsWithTypes(vector('u64'), item.fields.rewards),
      valueCut: decodeFromFieldsWithTypes('u64', item.fields.value_cut),
    })
  }

  static fromBcs(data: Uint8Array): PositionSnapshot {
    return PositionSnapshot.fromFields(PositionSnapshot.bcs.parse(data))
  }

  toJSONField(): PositionSnapshotJSONField {
    return {
      positionId: this.positionId,
      liquidity: this.liquidity.toString(),
      tickLowerIndex: this.tickLowerIndex.toJSONField(),
      tickUpperIndex: this.tickUpperIndex.toJSONField(),
      feeOwnedA: this.feeOwnedA.toString(),
      feeOwnedB: this.feeOwnedB.toString(),
      rewards: fieldToJSON<Vector<'u64'>>(`vector<u64>`, this.rewards),
      valueCut: this.valueCut.toString(),
    }
  }

  toJSON(): PositionSnapshotJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PositionSnapshot {
    return PositionSnapshot.reified().new({
      positionId: decodeFromJSONField(ID.reified(), field.positionId),
      liquidity: decodeFromJSONField('u128', field.liquidity),
      tickLowerIndex: decodeFromJSONField(I32.reified(), field.tickLowerIndex),
      tickUpperIndex: decodeFromJSONField(I32.reified(), field.tickUpperIndex),
      feeOwnedA: decodeFromJSONField('u64', field.feeOwnedA),
      feeOwnedB: decodeFromJSONField('u64', field.feeOwnedB),
      rewards: decodeFromJSONField(vector('u64'), field.rewards),
      valueCut: decodeFromJSONField('u64', field.valueCut),
    })
  }

  static fromJSON(json: Record<string, any>): PositionSnapshot {
    if (json.$typeName !== PositionSnapshot.$typeName) {
      throw new Error(
        `not a PositionSnapshot json object: expected '${PositionSnapshot.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return PositionSnapshot.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): PositionSnapshot {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPositionSnapshot(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PositionSnapshot object`)
    }
    return PositionSnapshot.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): PositionSnapshot {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPositionSnapshot(data.bcs.type)) {
        throw new Error(`object at is not a PositionSnapshot object`)
      }

      return PositionSnapshot.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PositionSnapshot.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<PositionSnapshot> {
    const res = await fetchObjectBcs(client, id)
    if (!isPositionSnapshot(res.type)) {
      throw new Error(`object at id ${id} is not a PositionSnapshot object`)
    }

    return PositionSnapshot.fromBcs(res.bcsBytes)
  }
}
