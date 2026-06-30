/**
 * The `tick` module is a module that is designed to facilitate the management of `tick` owned by `Pool`.
 * All `tick` related operations of `Pool` are handled by this module.
 */

import { bcs } from '@mysten/sui/bcs'
import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import type { SuiObjectData, SuiParsedData } from '@mysten/sui/jsonRpc'
import { fromBase64 } from '@mysten/sui/utils'
import { SkipList } from '../../_dependencies/move-stl/skip-list/structs'
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
import { composeSuiType, compressSuiType, FieldsWithTypes } from '../../_framework/util'
import { Vector } from '../../_framework/vector'
import { I128 } from '../../integer-mate/i128/structs'
import { I32 } from '../../integer-mate/i32/structs'

/* ============================== TickManager =============================== */

export function isTickManager(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('cetus-clmm', 'tick::TickManager')}::tick::TickManager`
}

export interface TickManagerFields {
  tickSpacing: ToField<'u32'>
  ticks: ToField<SkipList<ToPhantom<Tick>>>
}

export type TickManagerReified = Reified<TickManager, TickManagerFields>

export type TickManagerJSONField = {
  tickSpacing: number
  ticks: ToJSON<SkipList<ToPhantom<Tick>>>
}

export type TickManagerJSON = {
  $typeName: typeof TickManager.$typeName
  $typeArgs: []
} & TickManagerJSONField

/**
 * Manages ticks of a pool using a SkipList data structure.
 * The SkipList provides efficient insertion, deletion and lookup of ticks.
 * Each tick represents a price point in the pool where liquidity can be added or removed.
 * * `tick_spacing` - The spacing between initialized ticks
 * * `ticks` - The SkipList containing all initialized ticks
 */
export class TickManager implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::tick::TickManager` {
    return `${getTypeOrigin('cetus-clmm', 'tick::TickManager')}::tick::TickManager` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof TickManager.$typeName = TickManager.$typeName
  readonly $fullTypeName: `${string}::tick::TickManager`
  readonly $typeArgs: []
  readonly $isPhantom: typeof TickManager.$isPhantom = TickManager.$isPhantom

  readonly tickSpacing: ToField<'u32'>
  readonly ticks: ToField<SkipList<ToPhantom<Tick>>>

  private constructor(typeArgs: [], fields: TickManagerFields) {
    this.$fullTypeName = composeSuiType(
      TickManager.$typeName,
      ...typeArgs,
    ) as `${string}::tick::TickManager`
    this.$typeArgs = typeArgs

    this.tickSpacing = fields.tickSpacing
    this.ticks = fields.ticks
  }

  static reified(): TickManagerReified {
    const reifiedBcs = TickManager.bcs
    return {
      get typeName() {
        return TickManager.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          TickManager.$typeName,
          ...[],
        ) as `${string}::tick::TickManager`
      },
      typeArgs: [] as [],
      isPhantom: TickManager.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => TickManager.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => TickManager.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => TickManager.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => TickManager.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => TickManager.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        TickManager.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => TickManager.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => TickManager.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => TickManager.fetch(client, id),
      new: (fields: TickManagerFields) => {
        return new TickManager([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): TickManagerReified {
    return TickManager.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<TickManager>> {
    return phantom(TickManager.reified())
  }

  static get p(): PhantomReified<ToTypeStr<TickManager>> {
    return TickManager.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('TickManager', {
      tick_spacing: bcs.u32(),
      ticks: SkipList.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof TickManager.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof TickManager.instantiateBcs> {
    if (!TickManager.cachedBcs) {
      TickManager.cachedBcs = TickManager.instantiateBcs()
    }
    return TickManager.cachedBcs
  }

  static fromFields(fields: Record<string, any>): TickManager {
    return TickManager.reified().new({
      tickSpacing: decodeFromFields('u32', fields.tick_spacing),
      ticks: decodeFromFields(SkipList.reified(phantom(Tick.reified())), fields.ticks),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): TickManager {
    if (!isTickManager(item.type)) {
      throw new Error('not a TickManager type')
    }

    return TickManager.reified().new({
      tickSpacing: decodeFromFieldsWithTypes('u32', item.fields.tick_spacing),
      ticks: decodeFromFieldsWithTypes(
        SkipList.reified(phantom(Tick.reified())),
        item.fields.ticks,
      ),
    })
  }

  static fromBcs(data: Uint8Array): TickManager {
    return TickManager.fromFields(TickManager.bcs.parse(data))
  }

  toJSONField(): TickManagerJSONField {
    return {
      tickSpacing: this.tickSpacing,
      ticks: this.ticks.toJSONField(),
    }
  }

  toJSON(): TickManagerJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): TickManager {
    return TickManager.reified().new({
      tickSpacing: decodeFromJSONField('u32', field.tickSpacing),
      ticks: decodeFromJSONField(SkipList.reified(phantom(Tick.reified())), field.ticks),
    })
  }

  static fromJSON(json: Record<string, any>): TickManager {
    if (json.$typeName !== TickManager.$typeName) {
      throw new Error(
        `not a TickManager json object: expected '${TickManager.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return TickManager.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): TickManager {
    if (!isTickManager(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a TickManager object`)
    }
    return TickManager.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link TickManager.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): TickManager {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isTickManager(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a TickManager object`)
    }
    return TickManager.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link TickManager.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): TickManager {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isTickManager(data.bcs.type)) {
        throw new Error(`object at is not a TickManager object`)
      }

      return TickManager.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return TickManager.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<TickManager> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isTickManager(object.type)) {
      throw new Error(`object at id ${id} is not a TickManager object`)
    }
    return TickManager.fromBcs(object.content)
  }
}

/* ============================== Tick =============================== */

export function isTick(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('cetus-clmm', 'tick::Tick')}::tick::Tick`
}

export interface TickFields {
  index: ToField<I32>
  sqrtPrice: ToField<'u128'>
  liquidityNet: ToField<I128>
  liquidityGross: ToField<'u128'>
  feeGrowthOutsideA: ToField<'u128'>
  feeGrowthOutsideB: ToField<'u128'>
  pointsGrowthOutside: ToField<'u128'>
  rewardsGrowthOutside: ToField<Vector<'u128'>>
}

export type TickReified = Reified<Tick, TickFields>

export type TickJSONField = {
  index: ToJSON<I32>
  sqrtPrice: string
  liquidityNet: ToJSON<I128>
  liquidityGross: string
  feeGrowthOutsideA: string
  feeGrowthOutsideB: string
  pointsGrowthOutside: string
  rewardsGrowthOutside: string[]
}

export type TickJSON = {
  $typeName: typeof Tick.$typeName
  $typeArgs: []
} & TickJSONField

/**
 * Represents the state of a tick in the pool.
 * * `index` - The tick index
 * * `sqrt_price` - The sqrt price at this tick
 * * `liquidity_net` - The net liquidity change when crossing this tick
 * * `liquidity_gross` - The total liquidity at this tick
 * * `fee_growth_outside_a` - The fee growth of token A outside this tick
 * * `fee_growth_outside_b` - The fee growth of token B outside this tick
 * * `points_growth_outside` - The points growth outside this tick
 * * `rewards_growth_outside` - The rewards growth outside this tick
 */
export class Tick implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::tick::Tick` {
    return `${getTypeOrigin('cetus-clmm', 'tick::Tick')}::tick::Tick` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof Tick.$typeName = Tick.$typeName
  readonly $fullTypeName: `${string}::tick::Tick`
  readonly $typeArgs: []
  readonly $isPhantom: typeof Tick.$isPhantom = Tick.$isPhantom

  readonly index: ToField<I32>
  readonly sqrtPrice: ToField<'u128'>
  readonly liquidityNet: ToField<I128>
  readonly liquidityGross: ToField<'u128'>
  readonly feeGrowthOutsideA: ToField<'u128'>
  readonly feeGrowthOutsideB: ToField<'u128'>
  readonly pointsGrowthOutside: ToField<'u128'>
  readonly rewardsGrowthOutside: ToField<Vector<'u128'>>

  private constructor(typeArgs: [], fields: TickFields) {
    this.$fullTypeName = composeSuiType(
      Tick.$typeName,
      ...typeArgs,
    ) as `${string}::tick::Tick`
    this.$typeArgs = typeArgs

    this.index = fields.index
    this.sqrtPrice = fields.sqrtPrice
    this.liquidityNet = fields.liquidityNet
    this.liquidityGross = fields.liquidityGross
    this.feeGrowthOutsideA = fields.feeGrowthOutsideA
    this.feeGrowthOutsideB = fields.feeGrowthOutsideB
    this.pointsGrowthOutside = fields.pointsGrowthOutside
    this.rewardsGrowthOutside = fields.rewardsGrowthOutside
  }

  static reified(): TickReified {
    const reifiedBcs = Tick.bcs
    return {
      get typeName() {
        return Tick.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          Tick.$typeName,
          ...[],
        ) as `${string}::tick::Tick`
      },
      typeArgs: [] as [],
      isPhantom: Tick.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Tick.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Tick.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Tick.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Tick.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Tick.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => Tick.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => Tick.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Tick.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => Tick.fetch(client, id),
      new: (fields: TickFields) => {
        return new Tick([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): TickReified {
    return Tick.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Tick>> {
    return phantom(Tick.reified())
  }

  static get p(): PhantomReified<ToTypeStr<Tick>> {
    return Tick.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('Tick', {
      index: I32.bcs,
      sqrt_price: bcs.u128(),
      liquidity_net: I128.bcs,
      liquidity_gross: bcs.u128(),
      fee_growth_outside_a: bcs.u128(),
      fee_growth_outside_b: bcs.u128(),
      points_growth_outside: bcs.u128(),
      rewards_growth_outside: bcs.vector(bcs.u128()),
    })
  }

  private static cachedBcs: ReturnType<typeof Tick.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof Tick.instantiateBcs> {
    if (!Tick.cachedBcs) {
      Tick.cachedBcs = Tick.instantiateBcs()
    }
    return Tick.cachedBcs
  }

  static fromFields(fields: Record<string, any>): Tick {
    return Tick.reified().new({
      index: decodeFromFields(I32.reified(), fields.index),
      sqrtPrice: decodeFromFields('u128', fields.sqrt_price),
      liquidityNet: decodeFromFields(I128.reified(), fields.liquidity_net),
      liquidityGross: decodeFromFields('u128', fields.liquidity_gross),
      feeGrowthOutsideA: decodeFromFields('u128', fields.fee_growth_outside_a),
      feeGrowthOutsideB: decodeFromFields('u128', fields.fee_growth_outside_b),
      pointsGrowthOutside: decodeFromFields('u128', fields.points_growth_outside),
      rewardsGrowthOutside: decodeFromFields(vector('u128'), fields.rewards_growth_outside),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Tick {
    if (!isTick(item.type)) {
      throw new Error('not a Tick type')
    }

    return Tick.reified().new({
      index: decodeFromFieldsWithTypes(I32.reified(), item.fields.index),
      sqrtPrice: decodeFromFieldsWithTypes('u128', item.fields.sqrt_price),
      liquidityNet: decodeFromFieldsWithTypes(I128.reified(), item.fields.liquidity_net),
      liquidityGross: decodeFromFieldsWithTypes('u128', item.fields.liquidity_gross),
      feeGrowthOutsideA: decodeFromFieldsWithTypes('u128', item.fields.fee_growth_outside_a),
      feeGrowthOutsideB: decodeFromFieldsWithTypes('u128', item.fields.fee_growth_outside_b),
      pointsGrowthOutside: decodeFromFieldsWithTypes('u128', item.fields.points_growth_outside),
      rewardsGrowthOutside: decodeFromFieldsWithTypes(
        vector('u128'),
        item.fields.rewards_growth_outside,
      ),
    })
  }

  static fromBcs(data: Uint8Array): Tick {
    return Tick.fromFields(Tick.bcs.parse(data))
  }

  toJSONField(): TickJSONField {
    return {
      index: this.index.toJSONField(),
      sqrtPrice: this.sqrtPrice.toString(),
      liquidityNet: this.liquidityNet.toJSONField(),
      liquidityGross: this.liquidityGross.toString(),
      feeGrowthOutsideA: this.feeGrowthOutsideA.toString(),
      feeGrowthOutsideB: this.feeGrowthOutsideB.toString(),
      pointsGrowthOutside: this.pointsGrowthOutside.toString(),
      rewardsGrowthOutside: fieldToJSON<Vector<'u128'>>(`vector<u128>`, this.rewardsGrowthOutside),
    }
  }

  toJSON(): TickJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Tick {
    return Tick.reified().new({
      index: decodeFromJSONField(I32.reified(), field.index),
      sqrtPrice: decodeFromJSONField('u128', field.sqrtPrice),
      liquidityNet: decodeFromJSONField(I128.reified(), field.liquidityNet),
      liquidityGross: decodeFromJSONField('u128', field.liquidityGross),
      feeGrowthOutsideA: decodeFromJSONField('u128', field.feeGrowthOutsideA),
      feeGrowthOutsideB: decodeFromJSONField('u128', field.feeGrowthOutsideB),
      pointsGrowthOutside: decodeFromJSONField('u128', field.pointsGrowthOutside),
      rewardsGrowthOutside: decodeFromJSONField(vector('u128'), field.rewardsGrowthOutside),
    })
  }

  static fromJSON(json: Record<string, any>): Tick {
    if (json.$typeName !== Tick.$typeName) {
      throw new Error(
        `not a Tick json object: expected '${Tick.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return Tick.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): Tick {
    if (!isTick(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a Tick object`)
    }
    return Tick.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Tick.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): Tick {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isTick(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Tick object`)
    }
    return Tick.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Tick.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): Tick {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isTick(data.bcs.type)) {
        throw new Error(`object at is not a Tick object`)
      }

      return Tick.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Tick.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<Tick> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isTick(object.type)) {
      throw new Error(`object at id ${id} is not a Tick object`)
    }
    return Tick.fromBcs(object.content)
  }
}
