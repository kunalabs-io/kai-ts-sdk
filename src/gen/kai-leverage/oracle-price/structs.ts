/**
 * Rail-agnostic oracle price collection for Kai Leverage.
 *
 * Oracle data is reduced to plain numbers at ingestion (`add_*`), so the
 * downstream interface never mentions an oracle package's types and a new
 * oracle rail is a purely additive `add_<rail>` function in an upgrade.
 * Entry points take `&PriceCollection` forever; the caller picks the rail
 * by choosing which `add_*` to call, and the per-market config allowlist
 * (object IDs) decides which price objects actually validate.
 */

import { bcs } from '@mysten/sui/bcs'
import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import type { SuiObjectData, SuiParsedData } from '@mysten/sui/jsonRpc'
import { fromBase64 } from '@mysten/sui/utils'
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
} from '../../_framework/reified'
import { composeSuiType, compressSuiType, FieldsWithTypes } from '../../_framework/util'
import { Option } from '../../std/option/structs'
import { TypeName } from '../../std/type-name/structs'
import { ID } from '../../sui/object/structs'
import { VecMap } from '../../sui/vec-map/structs'

/* ============================== Quote =============================== */

export function isQuote(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('kai-leverage', 'oracle_price::Quote')}::oracle_price::Quote`
}

export interface QuoteFields {
  price: ToField<'u64'>
  /**
   * Dispersion behind the price (Pyth confidence, Switchboard stdev, …).
   * `None` = the rail provides none — deliberately distinct from zero,
   * which would claim perfect confidence. Reserved: not consumed yet.
   */
  conf: ToField<Option<'u64'>>
  expoNeg: ToField<'u64'>
}

export type QuoteReified = Reified<Quote, QuoteFields>

export type QuoteJSONField = {
  price: string
  conf: string | null
  expoNeg: string
}

export type QuoteJSON = {
  $typeName: typeof Quote.$typeName
  $typeArgs: []
} & QuoteJSONField

/**
 * A single oracle price point. `price` is always positive and `expo_neg`
 * is the magnitude of the (always negative) decimal exponent — both
 * enforced at ingestion, so garbage feeds abort at `add_*`, not mid-math.
 */
export class Quote implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::oracle_price::Quote` {
    return `${getTypeOrigin('kai-leverage', 'oracle_price::Quote')}::oracle_price::Quote` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof Quote.$typeName = Quote.$typeName
  readonly $fullTypeName: `${string}::oracle_price::Quote`
  readonly $typeArgs: []
  readonly $isPhantom: typeof Quote.$isPhantom = Quote.$isPhantom

  readonly price: ToField<'u64'>
  /**
   * Dispersion behind the price (Pyth confidence, Switchboard stdev, …).
   * `None` = the rail provides none — deliberately distinct from zero,
   * which would claim perfect confidence. Reserved: not consumed yet.
   */
  readonly conf: ToField<Option<'u64'>>
  readonly expoNeg: ToField<'u64'>

  private constructor(typeArgs: [], fields: QuoteFields) {
    this.$fullTypeName = composeSuiType(
      Quote.$typeName,
      ...typeArgs,
    ) as `${string}::oracle_price::Quote`
    this.$typeArgs = typeArgs

    this.price = fields.price
    this.conf = fields.conf
    this.expoNeg = fields.expoNeg
  }

  static reified(): QuoteReified {
    const reifiedBcs = Quote.bcs
    return {
      get typeName() {
        return Quote.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          Quote.$typeName,
          ...[],
        ) as `${string}::oracle_price::Quote`
      },
      typeArgs: [] as [],
      isPhantom: Quote.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Quote.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Quote.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Quote.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Quote.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Quote.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => Quote.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => Quote.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Quote.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => Quote.fetch(client, id),
      new: (fields: QuoteFields) => {
        return new Quote([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): QuoteReified {
    return Quote.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Quote>> {
    return phantom(Quote.reified())
  }

  static get p(): PhantomReified<ToTypeStr<Quote>> {
    return Quote.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('Quote', {
      price: bcs.u64(),
      conf: Option.bcs(bcs.u64()),
      expo_neg: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof Quote.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof Quote.instantiateBcs> {
    if (!Quote.cachedBcs) {
      Quote.cachedBcs = Quote.instantiateBcs()
    }
    return Quote.cachedBcs
  }

  static fromFields(fields: Record<string, any>): Quote {
    return Quote.reified().new({
      price: decodeFromFields('u64', fields.price),
      conf: decodeFromFields(Option.reified('u64'), fields.conf),
      expoNeg: decodeFromFields('u64', fields.expo_neg),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Quote {
    if (!isQuote(item.type)) {
      throw new Error('not a Quote type')
    }

    return Quote.reified().new({
      price: decodeFromFieldsWithTypes('u64', item.fields.price),
      conf: decodeFromFieldsWithTypes(Option.reified('u64'), item.fields.conf),
      expoNeg: decodeFromFieldsWithTypes('u64', item.fields.expo_neg),
    })
  }

  static fromBcs(data: Uint8Array): Quote {
    return Quote.fromFields(Quote.bcs.parse(data))
  }

  toJSONField(): QuoteJSONField {
    return {
      price: this.price.toString(),
      conf: fieldToJSON<Option<'u64'>>(`${Option.$typeName}<u64>`, this.conf),
      expoNeg: this.expoNeg.toString(),
    }
  }

  toJSON(): QuoteJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Quote {
    return Quote.reified().new({
      price: decodeFromJSONField('u64', field.price),
      conf: decodeFromJSONField(Option.reified('u64'), field.conf),
      expoNeg: decodeFromJSONField('u64', field.expoNeg),
    })
  }

  static fromJSON(json: Record<string, any>): Quote {
    if (json.$typeName !== Quote.$typeName) {
      throw new Error(
        `not a Quote json object: expected '${Quote.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return Quote.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): Quote {
    if (!isQuote(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a Quote object`)
    }
    return Quote.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Quote.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): Quote {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isQuote(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Quote object`)
    }
    return Quote.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Quote.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): Quote {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isQuote(data.bcs.type)) {
        throw new Error(`object at is not a Quote object`)
      }

      return Quote.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Quote.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<Quote> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isQuote(object.type)) {
      throw new Error(`object at id ${id} is not a Quote object`)
    }
    return Quote.fromBcs(object.content)
  }
}

/* ============================== PriceData =============================== */

export function isPriceData(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('kai-leverage', 'oracle_price::PriceData')}::oracle_price::PriceData`
}

export interface PriceDataFields {
  spot: ToField<Quote>
  /**
   * Manipulation-resistant reference price (Pyth fills this with EMA).
   * The *role*, not the provenance. `None` = the rail provides none;
   * consumers abort rather than silently substituting spot — adopting a
   * rail without native smoothing is a risk-policy decision taken in
   * config and code, never a silent fill at ingestion.
   */
  smoothed: ToField<Option<Quote>>
  timestampSec: ToField<'u64'>
}

export type PriceDataReified = Reified<PriceData, PriceDataFields>

export type PriceDataJSONField = {
  spot: ToJSON<Quote>
  smoothed: ToJSON<Quote> | null
  timestampSec: string
}

export type PriceDataJSON = {
  $typeName: typeof PriceData.$typeName
  $typeArgs: []
} & PriceDataJSONField

/** Price data for one oracle price object, reduced to plain numbers. */
export class PriceData implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::oracle_price::PriceData` {
    return `${
      getTypeOrigin('kai-leverage', 'oracle_price::PriceData')
    }::oracle_price::PriceData` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof PriceData.$typeName = PriceData.$typeName
  readonly $fullTypeName: `${string}::oracle_price::PriceData`
  readonly $typeArgs: []
  readonly $isPhantom: typeof PriceData.$isPhantom = PriceData.$isPhantom

  readonly spot: ToField<Quote>
  /**
   * Manipulation-resistant reference price (Pyth fills this with EMA).
   * The *role*, not the provenance. `None` = the rail provides none;
   * consumers abort rather than silently substituting spot — adopting a
   * rail without native smoothing is a risk-policy decision taken in
   * config and code, never a silent fill at ingestion.
   */
  readonly smoothed: ToField<Option<Quote>>
  readonly timestampSec: ToField<'u64'>

  private constructor(typeArgs: [], fields: PriceDataFields) {
    this.$fullTypeName = composeSuiType(
      PriceData.$typeName,
      ...typeArgs,
    ) as `${string}::oracle_price::PriceData`
    this.$typeArgs = typeArgs

    this.spot = fields.spot
    this.smoothed = fields.smoothed
    this.timestampSec = fields.timestampSec
  }

  static reified(): PriceDataReified {
    const reifiedBcs = PriceData.bcs
    return {
      get typeName() {
        return PriceData.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          PriceData.$typeName,
          ...[],
        ) as `${string}::oracle_price::PriceData`
      },
      typeArgs: [] as [],
      isPhantom: PriceData.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PriceData.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PriceData.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PriceData.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PriceData.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PriceData.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        PriceData.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => PriceData.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PriceData.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => PriceData.fetch(client, id),
      new: (fields: PriceDataFields) => {
        return new PriceData([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): PriceDataReified {
    return PriceData.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PriceData>> {
    return phantom(PriceData.reified())
  }

  static get p(): PhantomReified<ToTypeStr<PriceData>> {
    return PriceData.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('PriceData', {
      spot: Quote.bcs,
      smoothed: Option.bcs(Quote.bcs),
      timestamp_sec: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof PriceData.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof PriceData.instantiateBcs> {
    if (!PriceData.cachedBcs) {
      PriceData.cachedBcs = PriceData.instantiateBcs()
    }
    return PriceData.cachedBcs
  }

  static fromFields(fields: Record<string, any>): PriceData {
    return PriceData.reified().new({
      spot: decodeFromFields(Quote.reified(), fields.spot),
      smoothed: decodeFromFields(Option.reified(Quote.reified()), fields.smoothed),
      timestampSec: decodeFromFields('u64', fields.timestamp_sec),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PriceData {
    if (!isPriceData(item.type)) {
      throw new Error('not a PriceData type')
    }

    return PriceData.reified().new({
      spot: decodeFromFieldsWithTypes(Quote.reified(), item.fields.spot),
      smoothed: decodeFromFieldsWithTypes(Option.reified(Quote.reified()), item.fields.smoothed),
      timestampSec: decodeFromFieldsWithTypes('u64', item.fields.timestamp_sec),
    })
  }

  static fromBcs(data: Uint8Array): PriceData {
    return PriceData.fromFields(PriceData.bcs.parse(data))
  }

  toJSONField(): PriceDataJSONField {
    return {
      spot: this.spot.toJSONField(),
      smoothed: fieldToJSON<Option<Quote>>(
        `${Option.$typeName}<${Quote.$typeName}>`,
        this.smoothed,
      ),
      timestampSec: this.timestampSec.toString(),
    }
  }

  toJSON(): PriceDataJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PriceData {
    return PriceData.reified().new({
      spot: decodeFromJSONField(Quote.reified(), field.spot),
      smoothed: decodeFromJSONField(Option.reified(Quote.reified()), field.smoothed),
      timestampSec: decodeFromJSONField('u64', field.timestampSec),
    })
  }

  static fromJSON(json: Record<string, any>): PriceData {
    if (json.$typeName !== PriceData.$typeName) {
      throw new Error(
        `not a PriceData json object: expected '${PriceData.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return PriceData.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): PriceData {
    if (!isPriceData(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a PriceData object`)
    }
    return PriceData.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link PriceData.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): PriceData {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPriceData(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PriceData object`)
    }
    return PriceData.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link PriceData.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): PriceData {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPriceData(data.bcs.type)) {
        throw new Error(`object at is not a PriceData object`)
      }

      return PriceData.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PriceData.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<PriceData> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isPriceData(object.type)) {
      throw new Error(`object at id ${id} is not a PriceData object`)
    }
    return PriceData.fromBcs(object.content)
  }
}

/* ============================== PriceCollection =============================== */

export function isPriceCollection(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('kai-leverage', 'oracle_price::PriceCollection')
    }::oracle_price::PriceCollection`
}

export interface PriceCollectionFields {
  map: ToField<VecMap<ID, PriceData>>
  decimals: ToField<VecMap<TypeName, 'u8'>>
  createdAtSec: ToField<'u64'>
}

export type PriceCollectionReified = Reified<PriceCollection, PriceCollectionFields>

export type PriceCollectionJSONField = {
  map: ToJSON<VecMap<ID, PriceData>>
  decimals: ToJSON<VecMap<TypeName, 'u8'>>
  createdAtSec: string
}

export type PriceCollectionJSON = {
  $typeName: typeof PriceCollection.$typeName
  $typeArgs: []
} & PriceCollectionJSONField

/**
 * Collection of oracle price data, keyed by the on-chain price object's ID
 * (which is what config allowlists reference). Coin decimals ride along as
 * caller-supplied evidence sourced from the system coin registry.
 */
export class PriceCollection implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::oracle_price::PriceCollection` {
    return `${
      getTypeOrigin('kai-leverage', 'oracle_price::PriceCollection')
    }::oracle_price::PriceCollection` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof PriceCollection.$typeName = PriceCollection.$typeName
  readonly $fullTypeName: `${string}::oracle_price::PriceCollection`
  readonly $typeArgs: []
  readonly $isPhantom: typeof PriceCollection.$isPhantom = PriceCollection.$isPhantom

  readonly map: ToField<VecMap<ID, PriceData>>
  readonly decimals: ToField<VecMap<TypeName, 'u8'>>
  readonly createdAtSec: ToField<'u64'>

  private constructor(typeArgs: [], fields: PriceCollectionFields) {
    this.$fullTypeName = composeSuiType(
      PriceCollection.$typeName,
      ...typeArgs,
    ) as `${string}::oracle_price::PriceCollection`
    this.$typeArgs = typeArgs

    this.map = fields.map
    this.decimals = fields.decimals
    this.createdAtSec = fields.createdAtSec
  }

  static reified(): PriceCollectionReified {
    const reifiedBcs = PriceCollection.bcs
    return {
      get typeName() {
        return PriceCollection.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          PriceCollection.$typeName,
          ...[],
        ) as `${string}::oracle_price::PriceCollection`
      },
      typeArgs: [] as [],
      isPhantom: PriceCollection.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PriceCollection.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PriceCollection.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PriceCollection.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PriceCollection.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PriceCollection.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        PriceCollection.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => PriceCollection.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PriceCollection.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => PriceCollection.fetch(client, id),
      new: (fields: PriceCollectionFields) => {
        return new PriceCollection([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): PriceCollectionReified {
    return PriceCollection.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PriceCollection>> {
    return phantom(PriceCollection.reified())
  }

  static get p(): PhantomReified<ToTypeStr<PriceCollection>> {
    return PriceCollection.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('PriceCollection', {
      map: VecMap.bcs(ID.bcs, PriceData.bcs),
      decimals: VecMap.bcs(TypeName.bcs, bcs.u8()),
      created_at_sec: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof PriceCollection.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof PriceCollection.instantiateBcs> {
    if (!PriceCollection.cachedBcs) {
      PriceCollection.cachedBcs = PriceCollection.instantiateBcs()
    }
    return PriceCollection.cachedBcs
  }

  static fromFields(fields: Record<string, any>): PriceCollection {
    return PriceCollection.reified().new({
      map: decodeFromFields(VecMap.reified(ID.reified(), PriceData.reified()), fields.map),
      decimals: decodeFromFields(VecMap.reified(TypeName.reified(), 'u8'), fields.decimals),
      createdAtSec: decodeFromFields('u64', fields.created_at_sec),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PriceCollection {
    if (!isPriceCollection(item.type)) {
      throw new Error('not a PriceCollection type')
    }

    return PriceCollection.reified().new({
      map: decodeFromFieldsWithTypes(
        VecMap.reified(ID.reified(), PriceData.reified()),
        item.fields.map,
      ),
      decimals: decodeFromFieldsWithTypes(
        VecMap.reified(TypeName.reified(), 'u8'),
        item.fields.decimals,
      ),
      createdAtSec: decodeFromFieldsWithTypes('u64', item.fields.created_at_sec),
    })
  }

  static fromBcs(data: Uint8Array): PriceCollection {
    return PriceCollection.fromFields(PriceCollection.bcs.parse(data))
  }

  toJSONField(): PriceCollectionJSONField {
    return {
      map: this.map.toJSONField(),
      decimals: this.decimals.toJSONField(),
      createdAtSec: this.createdAtSec.toString(),
    }
  }

  toJSON(): PriceCollectionJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PriceCollection {
    return PriceCollection.reified().new({
      map: decodeFromJSONField(VecMap.reified(ID.reified(), PriceData.reified()), field.map),
      decimals: decodeFromJSONField(VecMap.reified(TypeName.reified(), 'u8'), field.decimals),
      createdAtSec: decodeFromJSONField('u64', field.createdAtSec),
    })
  }

  static fromJSON(json: Record<string, any>): PriceCollection {
    if (json.$typeName !== PriceCollection.$typeName) {
      throw new Error(
        `not a PriceCollection json object: expected '${PriceCollection.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return PriceCollection.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): PriceCollection {
    if (!isPriceCollection(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a PriceCollection object`)
    }
    return PriceCollection.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link PriceCollection.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): PriceCollection {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPriceCollection(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PriceCollection object`)
    }
    return PriceCollection.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link PriceCollection.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): PriceCollection {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPriceCollection(data.bcs.type)) {
        throw new Error(`object at is not a PriceCollection object`)
      }

      return PriceCollection.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PriceCollection.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<PriceCollection> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isPriceCollection(object.type)) {
      throw new Error(`object at id ${id} is not a PriceCollection object`)
    }
    return PriceCollection.fromBcs(object.content)
  }
}

/* ============================== ValidatedPrices =============================== */

export function isValidatedPrices(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('kai-leverage', 'oracle_price::ValidatedPrices')
    }::oracle_price::ValidatedPrices`
}

export interface ValidatedPricesFields {
  map: ToField<VecMap<TypeName, PriceData>>
  decimals: ToField<VecMap<TypeName, 'u8'>>
  currentTsSec: ToField<'u64'>
  maxAgeSecs: ToField<'u64'>
}

export type ValidatedPricesReified = Reified<ValidatedPrices, ValidatedPricesFields>

export type ValidatedPricesJSONField = {
  map: ToJSON<VecMap<TypeName, PriceData>>
  decimals: ToJSON<VecMap<TypeName, 'u8'>>
  currentTsSec: string
  maxAgeSecs: string
}

export type ValidatedPricesJSON = {
  $typeName: typeof ValidatedPrices.$typeName
  $typeArgs: []
} & ValidatedPricesJSONField

/**
 * Validated price set, keyed by coin type — the only thing position math
 * accepts. Constructible solely via `validate`.
 */
export class ValidatedPrices implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::oracle_price::ValidatedPrices` {
    return `${
      getTypeOrigin('kai-leverage', 'oracle_price::ValidatedPrices')
    }::oracle_price::ValidatedPrices` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof ValidatedPrices.$typeName = ValidatedPrices.$typeName
  readonly $fullTypeName: `${string}::oracle_price::ValidatedPrices`
  readonly $typeArgs: []
  readonly $isPhantom: typeof ValidatedPrices.$isPhantom = ValidatedPrices.$isPhantom

  readonly map: ToField<VecMap<TypeName, PriceData>>
  readonly decimals: ToField<VecMap<TypeName, 'u8'>>
  readonly currentTsSec: ToField<'u64'>
  readonly maxAgeSecs: ToField<'u64'>

  private constructor(typeArgs: [], fields: ValidatedPricesFields) {
    this.$fullTypeName = composeSuiType(
      ValidatedPrices.$typeName,
      ...typeArgs,
    ) as `${string}::oracle_price::ValidatedPrices`
    this.$typeArgs = typeArgs

    this.map = fields.map
    this.decimals = fields.decimals
    this.currentTsSec = fields.currentTsSec
    this.maxAgeSecs = fields.maxAgeSecs
  }

  static reified(): ValidatedPricesReified {
    const reifiedBcs = ValidatedPrices.bcs
    return {
      get typeName() {
        return ValidatedPrices.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          ValidatedPrices.$typeName,
          ...[],
        ) as `${string}::oracle_price::ValidatedPrices`
      },
      typeArgs: [] as [],
      isPhantom: ValidatedPrices.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ValidatedPrices.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ValidatedPrices.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ValidatedPrices.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ValidatedPrices.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ValidatedPrices.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        ValidatedPrices.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => ValidatedPrices.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ValidatedPrices.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => ValidatedPrices.fetch(client, id),
      new: (fields: ValidatedPricesFields) => {
        return new ValidatedPrices([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): ValidatedPricesReified {
    return ValidatedPrices.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ValidatedPrices>> {
    return phantom(ValidatedPrices.reified())
  }

  static get p(): PhantomReified<ToTypeStr<ValidatedPrices>> {
    return ValidatedPrices.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ValidatedPrices', {
      map: VecMap.bcs(TypeName.bcs, PriceData.bcs),
      decimals: VecMap.bcs(TypeName.bcs, bcs.u8()),
      current_ts_sec: bcs.u64(),
      max_age_secs: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof ValidatedPrices.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof ValidatedPrices.instantiateBcs> {
    if (!ValidatedPrices.cachedBcs) {
      ValidatedPrices.cachedBcs = ValidatedPrices.instantiateBcs()
    }
    return ValidatedPrices.cachedBcs
  }

  static fromFields(fields: Record<string, any>): ValidatedPrices {
    return ValidatedPrices.reified().new({
      map: decodeFromFields(VecMap.reified(TypeName.reified(), PriceData.reified()), fields.map),
      decimals: decodeFromFields(VecMap.reified(TypeName.reified(), 'u8'), fields.decimals),
      currentTsSec: decodeFromFields('u64', fields.current_ts_sec),
      maxAgeSecs: decodeFromFields('u64', fields.max_age_secs),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ValidatedPrices {
    if (!isValidatedPrices(item.type)) {
      throw new Error('not a ValidatedPrices type')
    }

    return ValidatedPrices.reified().new({
      map: decodeFromFieldsWithTypes(
        VecMap.reified(TypeName.reified(), PriceData.reified()),
        item.fields.map,
      ),
      decimals: decodeFromFieldsWithTypes(
        VecMap.reified(TypeName.reified(), 'u8'),
        item.fields.decimals,
      ),
      currentTsSec: decodeFromFieldsWithTypes('u64', item.fields.current_ts_sec),
      maxAgeSecs: decodeFromFieldsWithTypes('u64', item.fields.max_age_secs),
    })
  }

  static fromBcs(data: Uint8Array): ValidatedPrices {
    return ValidatedPrices.fromFields(ValidatedPrices.bcs.parse(data))
  }

  toJSONField(): ValidatedPricesJSONField {
    return {
      map: this.map.toJSONField(),
      decimals: this.decimals.toJSONField(),
      currentTsSec: this.currentTsSec.toString(),
      maxAgeSecs: this.maxAgeSecs.toString(),
    }
  }

  toJSON(): ValidatedPricesJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ValidatedPrices {
    return ValidatedPrices.reified().new({
      map: decodeFromJSONField(VecMap.reified(TypeName.reified(), PriceData.reified()), field.map),
      decimals: decodeFromJSONField(VecMap.reified(TypeName.reified(), 'u8'), field.decimals),
      currentTsSec: decodeFromJSONField('u64', field.currentTsSec),
      maxAgeSecs: decodeFromJSONField('u64', field.maxAgeSecs),
    })
  }

  static fromJSON(json: Record<string, any>): ValidatedPrices {
    if (json.$typeName !== ValidatedPrices.$typeName) {
      throw new Error(
        `not a ValidatedPrices json object: expected '${ValidatedPrices.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return ValidatedPrices.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): ValidatedPrices {
    if (!isValidatedPrices(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a ValidatedPrices object`)
    }
    return ValidatedPrices.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ValidatedPrices.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): ValidatedPrices {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isValidatedPrices(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ValidatedPrices object`)
    }
    return ValidatedPrices.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ValidatedPrices.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): ValidatedPrices {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isValidatedPrices(data.bcs.type)) {
        throw new Error(`object at is not a ValidatedPrices object`)
      }

      return ValidatedPrices.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ValidatedPrices.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<ValidatedPrices> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isValidatedPrices(object.type)) {
      throw new Error(`object at id ${id} is not a ValidatedPrices object`)
    }
    return ValidatedPrices.fromBcs(object.content)
  }
}
