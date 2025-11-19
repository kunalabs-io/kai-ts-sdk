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
import { UID } from '../../../../sui/object/structs'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== Spool =============================== */

export function isSpool(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::spool::Spool`
}

export interface SpoolFields {
  id: ToField<UID>
  stakeType: ToField<TypeName>
  distributedPointPerPeriod: ToField<'u64'>
  pointDistributionTime: ToField<'u64'>
  distributedPoint: ToField<'u64'>
  maxDistributedPoint: ToField<'u64'>
  maxStakes: ToField<'u64'>
  index: ToField<'u64'>
  stakes: ToField<'u64'>
  lastUpdate: ToField<'u64'>
  createdAt: ToField<'u64'>
}

export type SpoolReified = Reified<Spool, SpoolFields>

export class Spool implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::spool::Spool`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = Spool.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::spool::Spool`
  readonly $typeArgs: []
  readonly $isPhantom = Spool.$isPhantom

  readonly id: ToField<UID>
  readonly stakeType: ToField<TypeName>
  readonly distributedPointPerPeriod: ToField<'u64'>
  readonly pointDistributionTime: ToField<'u64'>
  readonly distributedPoint: ToField<'u64'>
  readonly maxDistributedPoint: ToField<'u64'>
  readonly maxStakes: ToField<'u64'>
  readonly index: ToField<'u64'>
  readonly stakes: ToField<'u64'>
  readonly lastUpdate: ToField<'u64'>
  readonly createdAt: ToField<'u64'>

  private constructor(typeArgs: [], fields: SpoolFields) {
    this.$fullTypeName = composeSuiType(
      Spool.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::spool::Spool`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.stakeType = fields.stakeType
    this.distributedPointPerPeriod = fields.distributedPointPerPeriod
    this.pointDistributionTime = fields.pointDistributionTime
    this.distributedPoint = fields.distributedPoint
    this.maxDistributedPoint = fields.maxDistributedPoint
    this.maxStakes = fields.maxStakes
    this.index = fields.index
    this.stakes = fields.stakes
    this.lastUpdate = fields.lastUpdate
    this.createdAt = fields.createdAt
  }

  static reified(): SpoolReified {
    const reifiedBcs = Spool.bcs
    return {
      typeName: Spool.$typeName,
      fullTypeName: composeSuiType(Spool.$typeName, ...[]) as `${typeof PKG_V1}::spool::Spool`,
      typeArgs: [] as [],
      isPhantom: Spool.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Spool.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Spool.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Spool.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Spool.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Spool.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => Spool.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Spool.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => Spool.fetch(client, id),
      new: (fields: SpoolFields) => {
        return new Spool([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return Spool.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Spool>> {
    return phantom(Spool.reified())
  }
  static get p() {
    return Spool.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('Spool', {
      id: UID.bcs,
      stake_type: TypeName.bcs,
      distributed_point_per_period: bcs.u64(),
      point_distribution_time: bcs.u64(),
      distributed_point: bcs.u64(),
      max_distributed_point: bcs.u64(),
      max_stakes: bcs.u64(),
      index: bcs.u64(),
      stakes: bcs.u64(),
      last_update: bcs.u64(),
      created_at: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof Spool.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof Spool.instantiateBcs> {
    if (!Spool.cachedBcs) {
      Spool.cachedBcs = Spool.instantiateBcs()
    }
    return Spool.cachedBcs
  }

  static fromFields(fields: Record<string, any>): Spool {
    return Spool.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      stakeType: decodeFromFields(TypeName.reified(), fields.stake_type),
      distributedPointPerPeriod: decodeFromFields('u64', fields.distributed_point_per_period),
      pointDistributionTime: decodeFromFields('u64', fields.point_distribution_time),
      distributedPoint: decodeFromFields('u64', fields.distributed_point),
      maxDistributedPoint: decodeFromFields('u64', fields.max_distributed_point),
      maxStakes: decodeFromFields('u64', fields.max_stakes),
      index: decodeFromFields('u64', fields.index),
      stakes: decodeFromFields('u64', fields.stakes),
      lastUpdate: decodeFromFields('u64', fields.last_update),
      createdAt: decodeFromFields('u64', fields.created_at),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Spool {
    if (!isSpool(item.type)) {
      throw new Error('not a Spool type')
    }

    return Spool.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      stakeType: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.stake_type),
      distributedPointPerPeriod: decodeFromFieldsWithTypes(
        'u64',
        item.fields.distributed_point_per_period
      ),
      pointDistributionTime: decodeFromFieldsWithTypes('u64', item.fields.point_distribution_time),
      distributedPoint: decodeFromFieldsWithTypes('u64', item.fields.distributed_point),
      maxDistributedPoint: decodeFromFieldsWithTypes('u64', item.fields.max_distributed_point),
      maxStakes: decodeFromFieldsWithTypes('u64', item.fields.max_stakes),
      index: decodeFromFieldsWithTypes('u64', item.fields.index),
      stakes: decodeFromFieldsWithTypes('u64', item.fields.stakes),
      lastUpdate: decodeFromFieldsWithTypes('u64', item.fields.last_update),
      createdAt: decodeFromFieldsWithTypes('u64', item.fields.created_at),
    })
  }

  static fromBcs(data: Uint8Array): Spool {
    return Spool.fromFields(Spool.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      stakeType: this.stakeType.toJSONField(),
      distributedPointPerPeriod: this.distributedPointPerPeriod.toString(),
      pointDistributionTime: this.pointDistributionTime.toString(),
      distributedPoint: this.distributedPoint.toString(),
      maxDistributedPoint: this.maxDistributedPoint.toString(),
      maxStakes: this.maxStakes.toString(),
      index: this.index.toString(),
      stakes: this.stakes.toString(),
      lastUpdate: this.lastUpdate.toString(),
      createdAt: this.createdAt.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Spool {
    return Spool.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      stakeType: decodeFromJSONField(TypeName.reified(), field.stakeType),
      distributedPointPerPeriod: decodeFromJSONField('u64', field.distributedPointPerPeriod),
      pointDistributionTime: decodeFromJSONField('u64', field.pointDistributionTime),
      distributedPoint: decodeFromJSONField('u64', field.distributedPoint),
      maxDistributedPoint: decodeFromJSONField('u64', field.maxDistributedPoint),
      maxStakes: decodeFromJSONField('u64', field.maxStakes),
      index: decodeFromJSONField('u64', field.index),
      stakes: decodeFromJSONField('u64', field.stakes),
      lastUpdate: decodeFromJSONField('u64', field.lastUpdate),
      createdAt: decodeFromJSONField('u64', field.createdAt),
    })
  }

  static fromJSON(json: Record<string, any>): Spool {
    if (json.$typeName !== Spool.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return Spool.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): Spool {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isSpool(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Spool object`)
    }
    return Spool.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): Spool {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isSpool(data.bcs.type)) {
        throw new Error(`object at is not a Spool object`)
      }

      return Spool.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Spool.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<Spool> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching Spool object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isSpool(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Spool object`)
    }

    return Spool.fromSuiObjectData(res.data)
  }
}
