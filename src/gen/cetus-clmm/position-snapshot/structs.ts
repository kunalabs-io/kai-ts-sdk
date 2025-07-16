import * as reified from '../../_framework/reified'
import { LinkedTable } from '../../_dependencies/source/0xbe21a06129308e0495431d12286127897aff07a8ade3970495a4404d97f9eaaa/linked-table/structs'
import {
  PhantomReified,
  Reified,
  StructClass,
  ToField,
  ToTypeStr,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  fieldToJSON,
  phantom,
  ToTypeStr as ToPhantom,
} from '../../_framework/reified'
import { FieldsWithTypes, composeSuiType, compressSuiType } from '../../_framework/util'
import { Vector } from '../../_framework/vector'
import { I32 } from '../../integer-mate/i32/structs'
import { ID, UID } from '../../sui/object/structs'
import { PKG_V12 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== PositionLiquiditySnapshot =============================== */

export function isPositionLiquiditySnapshot(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V12}::position_snapshot::PositionLiquiditySnapshot`
}

export interface PositionLiquiditySnapshotFields {
  id: ToField<UID>
  currentSqrtPrice: ToField<'u128'>
  removePercent: ToField<'u64'>
  totalValueCutted: ToField<'u64'>
  snapshots: ToField<LinkedTable<ID, ToPhantom<PositionSnapshot>>>
}

export type PositionLiquiditySnapshotReified = Reified<
  PositionLiquiditySnapshot,
  PositionLiquiditySnapshotFields
>

export class PositionLiquiditySnapshot implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V12}::position_snapshot::PositionLiquiditySnapshot`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = PositionLiquiditySnapshot.$typeName
  readonly $fullTypeName: `${typeof PKG_V12}::position_snapshot::PositionLiquiditySnapshot`
  readonly $typeArgs: []
  readonly $isPhantom = PositionLiquiditySnapshot.$isPhantom

  readonly id: ToField<UID>
  readonly currentSqrtPrice: ToField<'u128'>
  readonly removePercent: ToField<'u64'>
  readonly totalValueCutted: ToField<'u64'>
  readonly snapshots: ToField<LinkedTable<ID, ToPhantom<PositionSnapshot>>>

  private constructor(typeArgs: [], fields: PositionLiquiditySnapshotFields) {
    this.$fullTypeName = composeSuiType(
      PositionLiquiditySnapshot.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V12}::position_snapshot::PositionLiquiditySnapshot`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.currentSqrtPrice = fields.currentSqrtPrice
    this.removePercent = fields.removePercent
    this.totalValueCutted = fields.totalValueCutted
    this.snapshots = fields.snapshots
  }

  static reified(): PositionLiquiditySnapshotReified {
    return {
      typeName: PositionLiquiditySnapshot.$typeName,
      fullTypeName: composeSuiType(
        PositionLiquiditySnapshot.$typeName,
        ...[]
      ) as `${typeof PKG_V12}::position_snapshot::PositionLiquiditySnapshot`,
      typeArgs: [] as [],
      isPhantom: PositionLiquiditySnapshot.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PositionLiquiditySnapshot.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        PositionLiquiditySnapshot.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PositionLiquiditySnapshot.fromBcs(data),
      bcs: PositionLiquiditySnapshot.bcs,
      fromJSONField: (field: any) => PositionLiquiditySnapshot.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PositionLiquiditySnapshot.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        PositionLiquiditySnapshot.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        PositionLiquiditySnapshot.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => PositionLiquiditySnapshot.fetch(client, id),
      new: (fields: PositionLiquiditySnapshotFields) => {
        return new PositionLiquiditySnapshot([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return PositionLiquiditySnapshot.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PositionLiquiditySnapshot>> {
    return phantom(PositionLiquiditySnapshot.reified())
  }
  static get p() {
    return PositionLiquiditySnapshot.phantom()
  }

  static get bcs() {
    return bcs.struct('PositionLiquiditySnapshot', {
      id: UID.bcs,
      current_sqrt_price: bcs.u128(),
      remove_percent: bcs.u64(),
      total_value_cutted: bcs.u64(),
      snapshots: LinkedTable.bcs(ID.bcs),
    })
  }

  static fromFields(fields: Record<string, any>): PositionLiquiditySnapshot {
    return PositionLiquiditySnapshot.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      currentSqrtPrice: decodeFromFields('u128', fields.current_sqrt_price),
      removePercent: decodeFromFields('u64', fields.remove_percent),
      totalValueCutted: decodeFromFields('u64', fields.total_value_cutted),
      snapshots: decodeFromFields(
        LinkedTable.reified(ID.reified(), reified.phantom(PositionSnapshot.reified())),
        fields.snapshots
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
      totalValueCutted: decodeFromFieldsWithTypes('u64', item.fields.total_value_cutted),
      snapshots: decodeFromFieldsWithTypes(
        LinkedTable.reified(ID.reified(), reified.phantom(PositionSnapshot.reified())),
        item.fields.snapshots
      ),
    })
  }

  static fromBcs(data: Uint8Array): PositionLiquiditySnapshot {
    return PositionLiquiditySnapshot.fromFields(PositionLiquiditySnapshot.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      currentSqrtPrice: this.currentSqrtPrice.toString(),
      removePercent: this.removePercent.toString(),
      totalValueCutted: this.totalValueCutted.toString(),
      snapshots: this.snapshots.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PositionLiquiditySnapshot {
    return PositionLiquiditySnapshot.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      currentSqrtPrice: decodeFromJSONField('u128', field.currentSqrtPrice),
      removePercent: decodeFromJSONField('u64', field.removePercent),
      totalValueCutted: decodeFromJSONField('u64', field.totalValueCutted),
      snapshots: decodeFromJSONField(
        LinkedTable.reified(ID.reified(), reified.phantom(PositionSnapshot.reified())),
        field.snapshots
      ),
    })
  }

  static fromJSON(json: Record<string, any>): PositionLiquiditySnapshot {
    if (json.$typeName !== PositionLiquiditySnapshot.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return PositionLiquiditySnapshot.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): PositionLiquiditySnapshot {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPositionLiquiditySnapshot(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a PositionLiquiditySnapshot object`
      )
    }
    return PositionLiquiditySnapshot.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): PositionLiquiditySnapshot {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPositionLiquiditySnapshot(data.bcs.type)) {
        throw new Error(`object at is not a PositionLiquiditySnapshot object`)
      }

      return PositionLiquiditySnapshot.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PositionLiquiditySnapshot.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<PositionLiquiditySnapshot> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(
        `error fetching PositionLiquiditySnapshot object at id ${id}: ${res.error.code}`
      )
    }
    if (
      res.data?.bcs?.dataType !== 'moveObject' ||
      !isPositionLiquiditySnapshot(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a PositionLiquiditySnapshot object`)
    }

    return PositionLiquiditySnapshot.fromSuiObjectData(res.data)
  }
}

/* ============================== PositionSnapshot =============================== */

export function isPositionSnapshot(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V12}::position_snapshot::PositionSnapshot`
}

export interface PositionSnapshotFields {
  positionId: ToField<ID>
  liquidity: ToField<'u128'>
  tickLowerIndex: ToField<I32>
  tickUpperIndex: ToField<I32>
  feeOwnedA: ToField<'u64'>
  feeOwnedB: ToField<'u64'>
  rewards: ToField<Vector<'u64'>>
  valueCutted: ToField<'u64'>
}

export type PositionSnapshotReified = Reified<PositionSnapshot, PositionSnapshotFields>

export class PositionSnapshot implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V12}::position_snapshot::PositionSnapshot`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = PositionSnapshot.$typeName
  readonly $fullTypeName: `${typeof PKG_V12}::position_snapshot::PositionSnapshot`
  readonly $typeArgs: []
  readonly $isPhantom = PositionSnapshot.$isPhantom

  readonly positionId: ToField<ID>
  readonly liquidity: ToField<'u128'>
  readonly tickLowerIndex: ToField<I32>
  readonly tickUpperIndex: ToField<I32>
  readonly feeOwnedA: ToField<'u64'>
  readonly feeOwnedB: ToField<'u64'>
  readonly rewards: ToField<Vector<'u64'>>
  readonly valueCutted: ToField<'u64'>

  private constructor(typeArgs: [], fields: PositionSnapshotFields) {
    this.$fullTypeName = composeSuiType(
      PositionSnapshot.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V12}::position_snapshot::PositionSnapshot`
    this.$typeArgs = typeArgs

    this.positionId = fields.positionId
    this.liquidity = fields.liquidity
    this.tickLowerIndex = fields.tickLowerIndex
    this.tickUpperIndex = fields.tickUpperIndex
    this.feeOwnedA = fields.feeOwnedA
    this.feeOwnedB = fields.feeOwnedB
    this.rewards = fields.rewards
    this.valueCutted = fields.valueCutted
  }

  static reified(): PositionSnapshotReified {
    return {
      typeName: PositionSnapshot.$typeName,
      fullTypeName: composeSuiType(
        PositionSnapshot.$typeName,
        ...[]
      ) as `${typeof PKG_V12}::position_snapshot::PositionSnapshot`,
      typeArgs: [] as [],
      isPhantom: PositionSnapshot.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PositionSnapshot.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PositionSnapshot.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PositionSnapshot.fromBcs(data),
      bcs: PositionSnapshot.bcs,
      fromJSONField: (field: any) => PositionSnapshot.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PositionSnapshot.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => PositionSnapshot.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PositionSnapshot.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => PositionSnapshot.fetch(client, id),
      new: (fields: PositionSnapshotFields) => {
        return new PositionSnapshot([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return PositionSnapshot.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PositionSnapshot>> {
    return phantom(PositionSnapshot.reified())
  }
  static get p() {
    return PositionSnapshot.phantom()
  }

  static get bcs() {
    return bcs.struct('PositionSnapshot', {
      position_id: ID.bcs,
      liquidity: bcs.u128(),
      tick_lower_index: I32.bcs,
      tick_upper_index: I32.bcs,
      fee_owned_a: bcs.u64(),
      fee_owned_b: bcs.u64(),
      rewards: bcs.vector(bcs.u64()),
      value_cutted: bcs.u64(),
    })
  }

  static fromFields(fields: Record<string, any>): PositionSnapshot {
    return PositionSnapshot.reified().new({
      positionId: decodeFromFields(ID.reified(), fields.position_id),
      liquidity: decodeFromFields('u128', fields.liquidity),
      tickLowerIndex: decodeFromFields(I32.reified(), fields.tick_lower_index),
      tickUpperIndex: decodeFromFields(I32.reified(), fields.tick_upper_index),
      feeOwnedA: decodeFromFields('u64', fields.fee_owned_a),
      feeOwnedB: decodeFromFields('u64', fields.fee_owned_b),
      rewards: decodeFromFields(reified.vector('u64'), fields.rewards),
      valueCutted: decodeFromFields('u64', fields.value_cutted),
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
      rewards: decodeFromFieldsWithTypes(reified.vector('u64'), item.fields.rewards),
      valueCutted: decodeFromFieldsWithTypes('u64', item.fields.value_cutted),
    })
  }

  static fromBcs(data: Uint8Array): PositionSnapshot {
    return PositionSnapshot.fromFields(PositionSnapshot.bcs.parse(data))
  }

  toJSONField() {
    return {
      positionId: this.positionId,
      liquidity: this.liquidity.toString(),
      tickLowerIndex: this.tickLowerIndex.toJSONField(),
      tickUpperIndex: this.tickUpperIndex.toJSONField(),
      feeOwnedA: this.feeOwnedA.toString(),
      feeOwnedB: this.feeOwnedB.toString(),
      rewards: fieldToJSON<Vector<'u64'>>(`vector<u64>`, this.rewards),
      valueCutted: this.valueCutted.toString(),
    }
  }

  toJSON() {
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
      rewards: decodeFromJSONField(reified.vector('u64'), field.rewards),
      valueCutted: decodeFromJSONField('u64', field.valueCutted),
    })
  }

  static fromJSON(json: Record<string, any>): PositionSnapshot {
    if (json.$typeName !== PositionSnapshot.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
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

      return PositionSnapshot.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PositionSnapshot.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<PositionSnapshot> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching PositionSnapshot object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isPositionSnapshot(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a PositionSnapshot object`)
    }

    return PositionSnapshot.fromSuiObjectData(res.data)
  }
}
