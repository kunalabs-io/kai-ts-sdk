/**
 * "Partner" is a module of "clmmpool" that defines a "Partner" object. When a partner participates in a swap
 * transaction, they pass this object and will receive a share of the swap fee that belongs to them.
 */

import { bcs } from '@mysten/sui/bcs'
import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import type { SuiObjectData, SuiParsedData } from '@mysten/sui/jsonRpc'
import { fromBase64, fromHex, toHex } from '@mysten/sui/utils'
import { getTypeOrigin } from '../../_envs'
import {
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  phantom,
  PhantomReified,
  Reified,
  StructClass,
  ToField,
  ToJSON,
  ToTypeStr,
} from '../../_framework/reified'
import { composeSuiType, compressSuiType, FieldsWithTypes } from '../../_framework/util'
import { String } from '../../std/string/structs'
import { Bag } from '../../sui/bag/structs'
import { ID, UID } from '../../sui/object/structs'
import { VecMap } from '../../sui/vec-map/structs'

/* ============================== Partners =============================== */

export function isPartners(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('cetus-clmm', 'partner::Partners')}::partner::Partners`
}

export interface PartnersFields {
  id: ToField<UID>
  partners: ToField<VecMap<String, ID>>
}

export type PartnersReified = Reified<Partners, PartnersFields>

export type PartnersJSONField = {
  id: string
  partners: ToJSON<VecMap<String, ID>>
}

export type PartnersJSON = {
  $typeName: typeof Partners.$typeName
  $typeArgs: []
} & PartnersJSONField

/**
 * Partners struct that stores a mapping of partner names to their IDs
 * * `id` - The unique identifier for this Partners object
 * * `partners` - A VecMap storing partner names (as String) mapped to their unique IDs
 */
export class Partners implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::partner::Partners` {
    return `${getTypeOrigin('cetus-clmm', 'partner::Partners')}::partner::Partners` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof Partners.$typeName = Partners.$typeName
  readonly $fullTypeName: `${string}::partner::Partners`
  readonly $typeArgs: []
  readonly $isPhantom: typeof Partners.$isPhantom = Partners.$isPhantom

  readonly id: ToField<UID>
  readonly partners: ToField<VecMap<String, ID>>

  private constructor(typeArgs: [], fields: PartnersFields) {
    this.$fullTypeName = composeSuiType(
      Partners.$typeName,
      ...typeArgs,
    ) as `${string}::partner::Partners`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.partners = fields.partners
  }

  static reified(): PartnersReified {
    const reifiedBcs = Partners.bcs
    return {
      get typeName() {
        return Partners.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          Partners.$typeName,
          ...[],
        ) as `${string}::partner::Partners`
      },
      typeArgs: [] as [],
      isPhantom: Partners.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Partners.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Partners.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Partners.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Partners.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Partners.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        Partners.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => Partners.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Partners.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => Partners.fetch(client, id),
      new: (fields: PartnersFields) => {
        return new Partners([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): PartnersReified {
    return Partners.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Partners>> {
    return phantom(Partners.reified())
  }

  static get p(): PhantomReified<ToTypeStr<Partners>> {
    return Partners.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('Partners', {
      id: UID.bcs,
      partners: VecMap.bcs(String.bcs, ID.bcs),
    })
  }

  private static cachedBcs: ReturnType<typeof Partners.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof Partners.instantiateBcs> {
    if (!Partners.cachedBcs) {
      Partners.cachedBcs = Partners.instantiateBcs()
    }
    return Partners.cachedBcs
  }

  static fromFields(fields: Record<string, any>): Partners {
    return Partners.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      partners: decodeFromFields(VecMap.reified(String.reified(), ID.reified()), fields.partners),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Partners {
    if (!isPartners(item.type)) {
      throw new Error('not a Partners type')
    }

    return Partners.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      partners: decodeFromFieldsWithTypes(
        VecMap.reified(String.reified(), ID.reified()),
        item.fields.partners,
      ),
    })
  }

  static fromBcs(data: Uint8Array): Partners {
    return Partners.fromFields(Partners.bcs.parse(data))
  }

  toJSONField(): PartnersJSONField {
    return {
      id: this.id,
      partners: this.partners.toJSONField(),
    }
  }

  toJSON(): PartnersJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Partners {
    return Partners.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      partners: decodeFromJSONField(VecMap.reified(String.reified(), ID.reified()), field.partners),
    })
  }

  static fromJSON(json: Record<string, any>): Partners {
    if (json.$typeName !== Partners.$typeName) {
      throw new Error(
        `not a Partners json object: expected '${Partners.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return Partners.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): Partners {
    if (!isPartners(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a Partners object`)
    }
    return Partners.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Partners.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): Partners {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPartners(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Partners object`)
    }
    return Partners.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Partners.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): Partners {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPartners(data.bcs.type)) {
        throw new Error(`object at is not a Partners object`)
      }

      return Partners.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Partners.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<Partners> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isPartners(object.type)) {
      throw new Error(`object at id ${id} is not a Partners object`)
    }
    return Partners.fromBcs(object.content)
  }
}

/* ============================== PartnerCap =============================== */

export function isPartnerCap(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('cetus-clmm', 'partner::PartnerCap')}::partner::PartnerCap`
}

export interface PartnerCapFields {
  id: ToField<UID>
  name: ToField<String>
  partnerId: ToField<ID>
}

export type PartnerCapReified = Reified<PartnerCap, PartnerCapFields>

export type PartnerCapJSONField = {
  id: string
  name: string
  partnerId: string
}

export type PartnerCapJSON = {
  $typeName: typeof PartnerCap.$typeName
  $typeArgs: []
} & PartnerCapJSONField

/**
 * PartnerCap is used to claim the parter fee generated when swap from partners which is owned by third parties.
 * * `id` - The unique identifier for this PartnerCap object
 * * `name` - The name of the partner
 * * `partner_id` - The ID of the partner
 */
export class PartnerCap implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::partner::PartnerCap` {
    return `${getTypeOrigin('cetus-clmm', 'partner::PartnerCap')}::partner::PartnerCap` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof PartnerCap.$typeName = PartnerCap.$typeName
  readonly $fullTypeName: `${string}::partner::PartnerCap`
  readonly $typeArgs: []
  readonly $isPhantom: typeof PartnerCap.$isPhantom = PartnerCap.$isPhantom

  readonly id: ToField<UID>
  readonly name: ToField<String>
  readonly partnerId: ToField<ID>

  private constructor(typeArgs: [], fields: PartnerCapFields) {
    this.$fullTypeName = composeSuiType(
      PartnerCap.$typeName,
      ...typeArgs,
    ) as `${string}::partner::PartnerCap`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.name = fields.name
    this.partnerId = fields.partnerId
  }

  static reified(): PartnerCapReified {
    const reifiedBcs = PartnerCap.bcs
    return {
      get typeName() {
        return PartnerCap.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          PartnerCap.$typeName,
          ...[],
        ) as `${string}::partner::PartnerCap`
      },
      typeArgs: [] as [],
      isPhantom: PartnerCap.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PartnerCap.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PartnerCap.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PartnerCap.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PartnerCap.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PartnerCap.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        PartnerCap.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => PartnerCap.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PartnerCap.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => PartnerCap.fetch(client, id),
      new: (fields: PartnerCapFields) => {
        return new PartnerCap([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): PartnerCapReified {
    return PartnerCap.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PartnerCap>> {
    return phantom(PartnerCap.reified())
  }

  static get p(): PhantomReified<ToTypeStr<PartnerCap>> {
    return PartnerCap.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('PartnerCap', {
      id: UID.bcs,
      name: String.bcs,
      partner_id: ID.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof PartnerCap.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof PartnerCap.instantiateBcs> {
    if (!PartnerCap.cachedBcs) {
      PartnerCap.cachedBcs = PartnerCap.instantiateBcs()
    }
    return PartnerCap.cachedBcs
  }

  static fromFields(fields: Record<string, any>): PartnerCap {
    return PartnerCap.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      name: decodeFromFields(String.reified(), fields.name),
      partnerId: decodeFromFields(ID.reified(), fields.partner_id),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PartnerCap {
    if (!isPartnerCap(item.type)) {
      throw new Error('not a PartnerCap type')
    }

    return PartnerCap.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      name: decodeFromFieldsWithTypes(String.reified(), item.fields.name),
      partnerId: decodeFromFieldsWithTypes(ID.reified(), item.fields.partner_id),
    })
  }

  static fromBcs(data: Uint8Array): PartnerCap {
    return PartnerCap.fromFields(PartnerCap.bcs.parse(data))
  }

  toJSONField(): PartnerCapJSONField {
    return {
      id: this.id,
      name: this.name,
      partnerId: this.partnerId,
    }
  }

  toJSON(): PartnerCapJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PartnerCap {
    return PartnerCap.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      name: decodeFromJSONField(String.reified(), field.name),
      partnerId: decodeFromJSONField(ID.reified(), field.partnerId),
    })
  }

  static fromJSON(json: Record<string, any>): PartnerCap {
    if (json.$typeName !== PartnerCap.$typeName) {
      throw new Error(
        `not a PartnerCap json object: expected '${PartnerCap.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return PartnerCap.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): PartnerCap {
    if (!isPartnerCap(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a PartnerCap object`)
    }
    return PartnerCap.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link PartnerCap.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): PartnerCap {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPartnerCap(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PartnerCap object`)
    }
    return PartnerCap.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link PartnerCap.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): PartnerCap {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPartnerCap(data.bcs.type)) {
        throw new Error(`object at is not a PartnerCap object`)
      }

      return PartnerCap.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PartnerCap.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<PartnerCap> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isPartnerCap(object.type)) {
      throw new Error(`object at id ${id} is not a PartnerCap object`)
    }
    return PartnerCap.fromBcs(object.content)
  }
}

/* ============================== Partner =============================== */

export function isPartner(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('cetus-clmm', 'partner::Partner')}::partner::Partner`
}

export interface PartnerFields {
  id: ToField<UID>
  name: ToField<String>
  refFeeRate: ToField<'u64'>
  startTime: ToField<'u64'>
  endTime: ToField<'u64'>
  balances: ToField<Bag>
}

export type PartnerReified = Reified<Partner, PartnerFields>

export type PartnerJSONField = {
  id: string
  name: string
  refFeeRate: string
  startTime: string
  endTime: string
  balances: ToJSON<Bag>
}

export type PartnerJSON = {
  $typeName: typeof Partner.$typeName
  $typeArgs: []
} & PartnerJSONField

/**
 * Partner is used to store the partner info.
 * * `id` - The unique identifier for this Partner object
 * * `name` - The name of the partner
 * * `ref_fee_rate` - The reference fee rate for the partner
 * * `start_time` - The start time of the partner's validity period
 * * `end_time` - The end time of the partner's validity period
 * * `balances` - A Bag storing the partner's balances for different coin types
 */
export class Partner implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::partner::Partner` {
    return `${getTypeOrigin('cetus-clmm', 'partner::Partner')}::partner::Partner` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof Partner.$typeName = Partner.$typeName
  readonly $fullTypeName: `${string}::partner::Partner`
  readonly $typeArgs: []
  readonly $isPhantom: typeof Partner.$isPhantom = Partner.$isPhantom

  readonly id: ToField<UID>
  readonly name: ToField<String>
  readonly refFeeRate: ToField<'u64'>
  readonly startTime: ToField<'u64'>
  readonly endTime: ToField<'u64'>
  readonly balances: ToField<Bag>

  private constructor(typeArgs: [], fields: PartnerFields) {
    this.$fullTypeName = composeSuiType(
      Partner.$typeName,
      ...typeArgs,
    ) as `${string}::partner::Partner`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.name = fields.name
    this.refFeeRate = fields.refFeeRate
    this.startTime = fields.startTime
    this.endTime = fields.endTime
    this.balances = fields.balances
  }

  static reified(): PartnerReified {
    const reifiedBcs = Partner.bcs
    return {
      get typeName() {
        return Partner.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          Partner.$typeName,
          ...[],
        ) as `${string}::partner::Partner`
      },
      typeArgs: [] as [],
      isPhantom: Partner.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Partner.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Partner.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Partner.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Partner.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Partner.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        Partner.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => Partner.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Partner.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => Partner.fetch(client, id),
      new: (fields: PartnerFields) => {
        return new Partner([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): PartnerReified {
    return Partner.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Partner>> {
    return phantom(Partner.reified())
  }

  static get p(): PhantomReified<ToTypeStr<Partner>> {
    return Partner.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('Partner', {
      id: UID.bcs,
      name: String.bcs,
      ref_fee_rate: bcs.u64(),
      start_time: bcs.u64(),
      end_time: bcs.u64(),
      balances: Bag.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof Partner.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof Partner.instantiateBcs> {
    if (!Partner.cachedBcs) {
      Partner.cachedBcs = Partner.instantiateBcs()
    }
    return Partner.cachedBcs
  }

  static fromFields(fields: Record<string, any>): Partner {
    return Partner.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      name: decodeFromFields(String.reified(), fields.name),
      refFeeRate: decodeFromFields('u64', fields.ref_fee_rate),
      startTime: decodeFromFields('u64', fields.start_time),
      endTime: decodeFromFields('u64', fields.end_time),
      balances: decodeFromFields(Bag.reified(), fields.balances),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Partner {
    if (!isPartner(item.type)) {
      throw new Error('not a Partner type')
    }

    return Partner.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      name: decodeFromFieldsWithTypes(String.reified(), item.fields.name),
      refFeeRate: decodeFromFieldsWithTypes('u64', item.fields.ref_fee_rate),
      startTime: decodeFromFieldsWithTypes('u64', item.fields.start_time),
      endTime: decodeFromFieldsWithTypes('u64', item.fields.end_time),
      balances: decodeFromFieldsWithTypes(Bag.reified(), item.fields.balances),
    })
  }

  static fromBcs(data: Uint8Array): Partner {
    return Partner.fromFields(Partner.bcs.parse(data))
  }

  toJSONField(): PartnerJSONField {
    return {
      id: this.id,
      name: this.name,
      refFeeRate: this.refFeeRate.toString(),
      startTime: this.startTime.toString(),
      endTime: this.endTime.toString(),
      balances: this.balances.toJSONField(),
    }
  }

  toJSON(): PartnerJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Partner {
    return Partner.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      name: decodeFromJSONField(String.reified(), field.name),
      refFeeRate: decodeFromJSONField('u64', field.refFeeRate),
      startTime: decodeFromJSONField('u64', field.startTime),
      endTime: decodeFromJSONField('u64', field.endTime),
      balances: decodeFromJSONField(Bag.reified(), field.balances),
    })
  }

  static fromJSON(json: Record<string, any>): Partner {
    if (json.$typeName !== Partner.$typeName) {
      throw new Error(
        `not a Partner json object: expected '${Partner.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return Partner.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): Partner {
    if (!isPartner(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a Partner object`)
    }
    return Partner.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Partner.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): Partner {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPartner(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Partner object`)
    }
    return Partner.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Partner.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): Partner {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPartner(data.bcs.type)) {
        throw new Error(`object at is not a Partner object`)
      }

      return Partner.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Partner.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<Partner> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isPartner(object.type)) {
      throw new Error(`object at id ${id} is not a Partner object`)
    }
    return Partner.fromBcs(object.content)
  }
}

/* ============================== InitPartnerEvent =============================== */

export function isInitPartnerEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('cetus-clmm', 'partner::InitPartnerEvent')}::partner::InitPartnerEvent`
}

export interface InitPartnerEventFields {
  partnersId: ToField<ID>
}

export type InitPartnerEventReified = Reified<InitPartnerEvent, InitPartnerEventFields>

export type InitPartnerEventJSONField = {
  partnersId: string
}

export type InitPartnerEventJSON = {
  $typeName: typeof InitPartnerEvent.$typeName
  $typeArgs: []
} & InitPartnerEventJSONField

/**
 * Emit when publish the module.
 * * `partners_id` - The unique identifier for this Partners object
 */
export class InitPartnerEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::partner::InitPartnerEvent` {
    return `${
      getTypeOrigin('cetus-clmm', 'partner::InitPartnerEvent')
    }::partner::InitPartnerEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof InitPartnerEvent.$typeName = InitPartnerEvent.$typeName
  readonly $fullTypeName: `${string}::partner::InitPartnerEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof InitPartnerEvent.$isPhantom = InitPartnerEvent.$isPhantom

  readonly partnersId: ToField<ID>

  private constructor(typeArgs: [], fields: InitPartnerEventFields) {
    this.$fullTypeName = composeSuiType(
      InitPartnerEvent.$typeName,
      ...typeArgs,
    ) as `${string}::partner::InitPartnerEvent`
    this.$typeArgs = typeArgs

    this.partnersId = fields.partnersId
  }

  static reified(): InitPartnerEventReified {
    const reifiedBcs = InitPartnerEvent.bcs
    return {
      get typeName() {
        return InitPartnerEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          InitPartnerEvent.$typeName,
          ...[],
        ) as `${string}::partner::InitPartnerEvent`
      },
      typeArgs: [] as [],
      isPhantom: InitPartnerEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => InitPartnerEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => InitPartnerEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => InitPartnerEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => InitPartnerEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => InitPartnerEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        InitPartnerEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => InitPartnerEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => InitPartnerEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => InitPartnerEvent.fetch(client, id),
      new: (fields: InitPartnerEventFields) => {
        return new InitPartnerEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): InitPartnerEventReified {
    return InitPartnerEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<InitPartnerEvent>> {
    return phantom(InitPartnerEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<InitPartnerEvent>> {
    return InitPartnerEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('InitPartnerEvent', {
      partners_id: ID.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof InitPartnerEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof InitPartnerEvent.instantiateBcs> {
    if (!InitPartnerEvent.cachedBcs) {
      InitPartnerEvent.cachedBcs = InitPartnerEvent.instantiateBcs()
    }
    return InitPartnerEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): InitPartnerEvent {
    return InitPartnerEvent.reified().new({
      partnersId: decodeFromFields(ID.reified(), fields.partners_id),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): InitPartnerEvent {
    if (!isInitPartnerEvent(item.type)) {
      throw new Error('not a InitPartnerEvent type')
    }

    return InitPartnerEvent.reified().new({
      partnersId: decodeFromFieldsWithTypes(ID.reified(), item.fields.partners_id),
    })
  }

  static fromBcs(data: Uint8Array): InitPartnerEvent {
    return InitPartnerEvent.fromFields(InitPartnerEvent.bcs.parse(data))
  }

  toJSONField(): InitPartnerEventJSONField {
    return {
      partnersId: this.partnersId,
    }
  }

  toJSON(): InitPartnerEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): InitPartnerEvent {
    return InitPartnerEvent.reified().new({
      partnersId: decodeFromJSONField(ID.reified(), field.partnersId),
    })
  }

  static fromJSON(json: Record<string, any>): InitPartnerEvent {
    if (json.$typeName !== InitPartnerEvent.$typeName) {
      throw new Error(
        `not a InitPartnerEvent json object: expected '${InitPartnerEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return InitPartnerEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): InitPartnerEvent {
    if (!isInitPartnerEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a InitPartnerEvent object`)
    }
    return InitPartnerEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link InitPartnerEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): InitPartnerEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isInitPartnerEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a InitPartnerEvent object`)
    }
    return InitPartnerEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link InitPartnerEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): InitPartnerEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isInitPartnerEvent(data.bcs.type)) {
        throw new Error(`object at is not a InitPartnerEvent object`)
      }

      return InitPartnerEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return InitPartnerEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<InitPartnerEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isInitPartnerEvent(object.type)) {
      throw new Error(`object at id ${id} is not a InitPartnerEvent object`)
    }
    return InitPartnerEvent.fromBcs(object.content)
  }
}

/* ============================== CreatePartnerEvent =============================== */

export function isCreatePartnerEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('cetus-clmm', 'partner::CreatePartnerEvent')}::partner::CreatePartnerEvent`
}

export interface CreatePartnerEventFields {
  recipient: ToField<'address'>
  partnerId: ToField<ID>
  partnerCapId: ToField<ID>
  refFeeRate: ToField<'u64'>
  name: ToField<String>
  startTime: ToField<'u64'>
  endTime: ToField<'u64'>
}

export type CreatePartnerEventReified = Reified<CreatePartnerEvent, CreatePartnerEventFields>

export type CreatePartnerEventJSONField = {
  recipient: string
  partnerId: string
  partnerCapId: string
  refFeeRate: string
  name: string
  startTime: string
  endTime: string
}

export type CreatePartnerEventJSON = {
  $typeName: typeof CreatePartnerEvent.$typeName
  $typeArgs: []
} & CreatePartnerEventJSONField

/**
 * Emit when create partner.
 * * `recipient` - The address of the recipient
 * * `partner_id` - The unique identifier for this Partner object
 * * `partner_cap_id` - The unique identifier for this PartnerCap object
 * * `ref_fee_rate` - The reference fee rate for the partner
 * * `name` - The name of the partner
 * * `start_time` - The start time of the partner's validity period
 * * `end_time` - The end time of the partner's validity period
 */
export class CreatePartnerEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::partner::CreatePartnerEvent` {
    return `${
      getTypeOrigin('cetus-clmm', 'partner::CreatePartnerEvent')
    }::partner::CreatePartnerEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof CreatePartnerEvent.$typeName = CreatePartnerEvent.$typeName
  readonly $fullTypeName: `${string}::partner::CreatePartnerEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof CreatePartnerEvent.$isPhantom = CreatePartnerEvent.$isPhantom

  readonly recipient: ToField<'address'>
  readonly partnerId: ToField<ID>
  readonly partnerCapId: ToField<ID>
  readonly refFeeRate: ToField<'u64'>
  readonly name: ToField<String>
  readonly startTime: ToField<'u64'>
  readonly endTime: ToField<'u64'>

  private constructor(typeArgs: [], fields: CreatePartnerEventFields) {
    this.$fullTypeName = composeSuiType(
      CreatePartnerEvent.$typeName,
      ...typeArgs,
    ) as `${string}::partner::CreatePartnerEvent`
    this.$typeArgs = typeArgs

    this.recipient = fields.recipient
    this.partnerId = fields.partnerId
    this.partnerCapId = fields.partnerCapId
    this.refFeeRate = fields.refFeeRate
    this.name = fields.name
    this.startTime = fields.startTime
    this.endTime = fields.endTime
  }

  static reified(): CreatePartnerEventReified {
    const reifiedBcs = CreatePartnerEvent.bcs
    return {
      get typeName() {
        return CreatePartnerEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          CreatePartnerEvent.$typeName,
          ...[],
        ) as `${string}::partner::CreatePartnerEvent`
      },
      typeArgs: [] as [],
      isPhantom: CreatePartnerEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => CreatePartnerEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => CreatePartnerEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => CreatePartnerEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => CreatePartnerEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => CreatePartnerEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        CreatePartnerEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => CreatePartnerEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => CreatePartnerEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => CreatePartnerEvent.fetch(client, id),
      new: (fields: CreatePartnerEventFields) => {
        return new CreatePartnerEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): CreatePartnerEventReified {
    return CreatePartnerEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<CreatePartnerEvent>> {
    return phantom(CreatePartnerEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<CreatePartnerEvent>> {
    return CreatePartnerEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('CreatePartnerEvent', {
      recipient: bcs.bytes(32).transform({
        input: (val: string) => fromHex(val),
        output: (val: Uint8Array) => toHex(val),
      }),
      partner_id: ID.bcs,
      partner_cap_id: ID.bcs,
      ref_fee_rate: bcs.u64(),
      name: String.bcs,
      start_time: bcs.u64(),
      end_time: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof CreatePartnerEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof CreatePartnerEvent.instantiateBcs> {
    if (!CreatePartnerEvent.cachedBcs) {
      CreatePartnerEvent.cachedBcs = CreatePartnerEvent.instantiateBcs()
    }
    return CreatePartnerEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): CreatePartnerEvent {
    return CreatePartnerEvent.reified().new({
      recipient: decodeFromFields('address', fields.recipient),
      partnerId: decodeFromFields(ID.reified(), fields.partner_id),
      partnerCapId: decodeFromFields(ID.reified(), fields.partner_cap_id),
      refFeeRate: decodeFromFields('u64', fields.ref_fee_rate),
      name: decodeFromFields(String.reified(), fields.name),
      startTime: decodeFromFields('u64', fields.start_time),
      endTime: decodeFromFields('u64', fields.end_time),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): CreatePartnerEvent {
    if (!isCreatePartnerEvent(item.type)) {
      throw new Error('not a CreatePartnerEvent type')
    }

    return CreatePartnerEvent.reified().new({
      recipient: decodeFromFieldsWithTypes('address', item.fields.recipient),
      partnerId: decodeFromFieldsWithTypes(ID.reified(), item.fields.partner_id),
      partnerCapId: decodeFromFieldsWithTypes(ID.reified(), item.fields.partner_cap_id),
      refFeeRate: decodeFromFieldsWithTypes('u64', item.fields.ref_fee_rate),
      name: decodeFromFieldsWithTypes(String.reified(), item.fields.name),
      startTime: decodeFromFieldsWithTypes('u64', item.fields.start_time),
      endTime: decodeFromFieldsWithTypes('u64', item.fields.end_time),
    })
  }

  static fromBcs(data: Uint8Array): CreatePartnerEvent {
    return CreatePartnerEvent.fromFields(CreatePartnerEvent.bcs.parse(data))
  }

  toJSONField(): CreatePartnerEventJSONField {
    return {
      recipient: this.recipient,
      partnerId: this.partnerId,
      partnerCapId: this.partnerCapId,
      refFeeRate: this.refFeeRate.toString(),
      name: this.name,
      startTime: this.startTime.toString(),
      endTime: this.endTime.toString(),
    }
  }

  toJSON(): CreatePartnerEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): CreatePartnerEvent {
    return CreatePartnerEvent.reified().new({
      recipient: decodeFromJSONField('address', field.recipient),
      partnerId: decodeFromJSONField(ID.reified(), field.partnerId),
      partnerCapId: decodeFromJSONField(ID.reified(), field.partnerCapId),
      refFeeRate: decodeFromJSONField('u64', field.refFeeRate),
      name: decodeFromJSONField(String.reified(), field.name),
      startTime: decodeFromJSONField('u64', field.startTime),
      endTime: decodeFromJSONField('u64', field.endTime),
    })
  }

  static fromJSON(json: Record<string, any>): CreatePartnerEvent {
    if (json.$typeName !== CreatePartnerEvent.$typeName) {
      throw new Error(
        `not a CreatePartnerEvent json object: expected '${CreatePartnerEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return CreatePartnerEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): CreatePartnerEvent {
    if (!isCreatePartnerEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a CreatePartnerEvent object`)
    }
    return CreatePartnerEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link CreatePartnerEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): CreatePartnerEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isCreatePartnerEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a CreatePartnerEvent object`)
    }
    return CreatePartnerEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link CreatePartnerEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): CreatePartnerEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isCreatePartnerEvent(data.bcs.type)) {
        throw new Error(`object at is not a CreatePartnerEvent object`)
      }

      return CreatePartnerEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return CreatePartnerEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<CreatePartnerEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isCreatePartnerEvent(object.type)) {
      throw new Error(`object at id ${id} is not a CreatePartnerEvent object`)
    }
    return CreatePartnerEvent.fromBcs(object.content)
  }
}

/* ============================== UpdateRefFeeRateEvent =============================== */

export function isUpdateRefFeeRateEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('cetus-clmm', 'partner::UpdateRefFeeRateEvent')
    }::partner::UpdateRefFeeRateEvent`
}

export interface UpdateRefFeeRateEventFields {
  partnerId: ToField<ID>
  oldFeeRate: ToField<'u64'>
  newFeeRate: ToField<'u64'>
}

export type UpdateRefFeeRateEventReified = Reified<
  UpdateRefFeeRateEvent,
  UpdateRefFeeRateEventFields
>

export type UpdateRefFeeRateEventJSONField = {
  partnerId: string
  oldFeeRate: string
  newFeeRate: string
}

export type UpdateRefFeeRateEventJSON = {
  $typeName: typeof UpdateRefFeeRateEvent.$typeName
  $typeArgs: []
} & UpdateRefFeeRateEventJSONField

/**
 * Emit when update partner ref fee rate.
 * * `partner_id` - The unique identifier for this Partner object
 * * `old_fee_rate` - The old reference fee rate for the partner
 * * `new_fee_rate` - The new reference fee rate for the partner
 */
export class UpdateRefFeeRateEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::partner::UpdateRefFeeRateEvent` {
    return `${
      getTypeOrigin('cetus-clmm', 'partner::UpdateRefFeeRateEvent')
    }::partner::UpdateRefFeeRateEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof UpdateRefFeeRateEvent.$typeName = UpdateRefFeeRateEvent.$typeName
  readonly $fullTypeName: `${string}::partner::UpdateRefFeeRateEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof UpdateRefFeeRateEvent.$isPhantom = UpdateRefFeeRateEvent.$isPhantom

  readonly partnerId: ToField<ID>
  readonly oldFeeRate: ToField<'u64'>
  readonly newFeeRate: ToField<'u64'>

  private constructor(typeArgs: [], fields: UpdateRefFeeRateEventFields) {
    this.$fullTypeName = composeSuiType(
      UpdateRefFeeRateEvent.$typeName,
      ...typeArgs,
    ) as `${string}::partner::UpdateRefFeeRateEvent`
    this.$typeArgs = typeArgs

    this.partnerId = fields.partnerId
    this.oldFeeRate = fields.oldFeeRate
    this.newFeeRate = fields.newFeeRate
  }

  static reified(): UpdateRefFeeRateEventReified {
    const reifiedBcs = UpdateRefFeeRateEvent.bcs
    return {
      get typeName() {
        return UpdateRefFeeRateEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          UpdateRefFeeRateEvent.$typeName,
          ...[],
        ) as `${string}::partner::UpdateRefFeeRateEvent`
      },
      typeArgs: [] as [],
      isPhantom: UpdateRefFeeRateEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => UpdateRefFeeRateEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        UpdateRefFeeRateEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => UpdateRefFeeRateEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => UpdateRefFeeRateEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => UpdateRefFeeRateEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        UpdateRefFeeRateEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        UpdateRefFeeRateEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        UpdateRefFeeRateEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        UpdateRefFeeRateEvent.fetch(client, id),
      new: (fields: UpdateRefFeeRateEventFields) => {
        return new UpdateRefFeeRateEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): UpdateRefFeeRateEventReified {
    return UpdateRefFeeRateEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<UpdateRefFeeRateEvent>> {
    return phantom(UpdateRefFeeRateEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<UpdateRefFeeRateEvent>> {
    return UpdateRefFeeRateEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('UpdateRefFeeRateEvent', {
      partner_id: ID.bcs,
      old_fee_rate: bcs.u64(),
      new_fee_rate: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof UpdateRefFeeRateEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof UpdateRefFeeRateEvent.instantiateBcs> {
    if (!UpdateRefFeeRateEvent.cachedBcs) {
      UpdateRefFeeRateEvent.cachedBcs = UpdateRefFeeRateEvent.instantiateBcs()
    }
    return UpdateRefFeeRateEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): UpdateRefFeeRateEvent {
    return UpdateRefFeeRateEvent.reified().new({
      partnerId: decodeFromFields(ID.reified(), fields.partner_id),
      oldFeeRate: decodeFromFields('u64', fields.old_fee_rate),
      newFeeRate: decodeFromFields('u64', fields.new_fee_rate),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): UpdateRefFeeRateEvent {
    if (!isUpdateRefFeeRateEvent(item.type)) {
      throw new Error('not a UpdateRefFeeRateEvent type')
    }

    return UpdateRefFeeRateEvent.reified().new({
      partnerId: decodeFromFieldsWithTypes(ID.reified(), item.fields.partner_id),
      oldFeeRate: decodeFromFieldsWithTypes('u64', item.fields.old_fee_rate),
      newFeeRate: decodeFromFieldsWithTypes('u64', item.fields.new_fee_rate),
    })
  }

  static fromBcs(data: Uint8Array): UpdateRefFeeRateEvent {
    return UpdateRefFeeRateEvent.fromFields(UpdateRefFeeRateEvent.bcs.parse(data))
  }

  toJSONField(): UpdateRefFeeRateEventJSONField {
    return {
      partnerId: this.partnerId,
      oldFeeRate: this.oldFeeRate.toString(),
      newFeeRate: this.newFeeRate.toString(),
    }
  }

  toJSON(): UpdateRefFeeRateEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): UpdateRefFeeRateEvent {
    return UpdateRefFeeRateEvent.reified().new({
      partnerId: decodeFromJSONField(ID.reified(), field.partnerId),
      oldFeeRate: decodeFromJSONField('u64', field.oldFeeRate),
      newFeeRate: decodeFromJSONField('u64', field.newFeeRate),
    })
  }

  static fromJSON(json: Record<string, any>): UpdateRefFeeRateEvent {
    if (json.$typeName !== UpdateRefFeeRateEvent.$typeName) {
      throw new Error(
        `not a UpdateRefFeeRateEvent json object: expected '${UpdateRefFeeRateEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return UpdateRefFeeRateEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): UpdateRefFeeRateEvent {
    if (!isUpdateRefFeeRateEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a UpdateRefFeeRateEvent object`)
    }
    return UpdateRefFeeRateEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link UpdateRefFeeRateEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): UpdateRefFeeRateEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isUpdateRefFeeRateEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a UpdateRefFeeRateEvent object`,
      )
    }
    return UpdateRefFeeRateEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link UpdateRefFeeRateEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): UpdateRefFeeRateEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isUpdateRefFeeRateEvent(data.bcs.type)) {
        throw new Error(`object at is not a UpdateRefFeeRateEvent object`)
      }

      return UpdateRefFeeRateEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return UpdateRefFeeRateEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<UpdateRefFeeRateEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isUpdateRefFeeRateEvent(object.type)) {
      throw new Error(`object at id ${id} is not a UpdateRefFeeRateEvent object`)
    }
    return UpdateRefFeeRateEvent.fromBcs(object.content)
  }
}

/* ============================== UpdateTimeRangeEvent =============================== */

export function isUpdateTimeRangeEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('cetus-clmm', 'partner::UpdateTimeRangeEvent')
    }::partner::UpdateTimeRangeEvent`
}

export interface UpdateTimeRangeEventFields {
  partnerId: ToField<ID>
  startTime: ToField<'u64'>
  endTime: ToField<'u64'>
}

export type UpdateTimeRangeEventReified = Reified<UpdateTimeRangeEvent, UpdateTimeRangeEventFields>

export type UpdateTimeRangeEventJSONField = {
  partnerId: string
  startTime: string
  endTime: string
}

export type UpdateTimeRangeEventJSON = {
  $typeName: typeof UpdateTimeRangeEvent.$typeName
  $typeArgs: []
} & UpdateTimeRangeEventJSONField

/**
 * Emit when update partner time range.
 * * `partner_id` - The unique identifier for this Partner object
 * * `start_time` - The start time of the partner's validity period
 * * `end_time` - The end time of the partner's validity period
 */
export class UpdateTimeRangeEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::partner::UpdateTimeRangeEvent` {
    return `${
      getTypeOrigin('cetus-clmm', 'partner::UpdateTimeRangeEvent')
    }::partner::UpdateTimeRangeEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof UpdateTimeRangeEvent.$typeName = UpdateTimeRangeEvent.$typeName
  readonly $fullTypeName: `${string}::partner::UpdateTimeRangeEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof UpdateTimeRangeEvent.$isPhantom = UpdateTimeRangeEvent.$isPhantom

  readonly partnerId: ToField<ID>
  readonly startTime: ToField<'u64'>
  readonly endTime: ToField<'u64'>

  private constructor(typeArgs: [], fields: UpdateTimeRangeEventFields) {
    this.$fullTypeName = composeSuiType(
      UpdateTimeRangeEvent.$typeName,
      ...typeArgs,
    ) as `${string}::partner::UpdateTimeRangeEvent`
    this.$typeArgs = typeArgs

    this.partnerId = fields.partnerId
    this.startTime = fields.startTime
    this.endTime = fields.endTime
  }

  static reified(): UpdateTimeRangeEventReified {
    const reifiedBcs = UpdateTimeRangeEvent.bcs
    return {
      get typeName() {
        return UpdateTimeRangeEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          UpdateTimeRangeEvent.$typeName,
          ...[],
        ) as `${string}::partner::UpdateTimeRangeEvent`
      },
      typeArgs: [] as [],
      isPhantom: UpdateTimeRangeEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => UpdateTimeRangeEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        UpdateTimeRangeEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => UpdateTimeRangeEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => UpdateTimeRangeEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => UpdateTimeRangeEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        UpdateTimeRangeEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        UpdateTimeRangeEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        UpdateTimeRangeEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        UpdateTimeRangeEvent.fetch(client, id),
      new: (fields: UpdateTimeRangeEventFields) => {
        return new UpdateTimeRangeEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): UpdateTimeRangeEventReified {
    return UpdateTimeRangeEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<UpdateTimeRangeEvent>> {
    return phantom(UpdateTimeRangeEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<UpdateTimeRangeEvent>> {
    return UpdateTimeRangeEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('UpdateTimeRangeEvent', {
      partner_id: ID.bcs,
      start_time: bcs.u64(),
      end_time: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof UpdateTimeRangeEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof UpdateTimeRangeEvent.instantiateBcs> {
    if (!UpdateTimeRangeEvent.cachedBcs) {
      UpdateTimeRangeEvent.cachedBcs = UpdateTimeRangeEvent.instantiateBcs()
    }
    return UpdateTimeRangeEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): UpdateTimeRangeEvent {
    return UpdateTimeRangeEvent.reified().new({
      partnerId: decodeFromFields(ID.reified(), fields.partner_id),
      startTime: decodeFromFields('u64', fields.start_time),
      endTime: decodeFromFields('u64', fields.end_time),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): UpdateTimeRangeEvent {
    if (!isUpdateTimeRangeEvent(item.type)) {
      throw new Error('not a UpdateTimeRangeEvent type')
    }

    return UpdateTimeRangeEvent.reified().new({
      partnerId: decodeFromFieldsWithTypes(ID.reified(), item.fields.partner_id),
      startTime: decodeFromFieldsWithTypes('u64', item.fields.start_time),
      endTime: decodeFromFieldsWithTypes('u64', item.fields.end_time),
    })
  }

  static fromBcs(data: Uint8Array): UpdateTimeRangeEvent {
    return UpdateTimeRangeEvent.fromFields(UpdateTimeRangeEvent.bcs.parse(data))
  }

  toJSONField(): UpdateTimeRangeEventJSONField {
    return {
      partnerId: this.partnerId,
      startTime: this.startTime.toString(),
      endTime: this.endTime.toString(),
    }
  }

  toJSON(): UpdateTimeRangeEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): UpdateTimeRangeEvent {
    return UpdateTimeRangeEvent.reified().new({
      partnerId: decodeFromJSONField(ID.reified(), field.partnerId),
      startTime: decodeFromJSONField('u64', field.startTime),
      endTime: decodeFromJSONField('u64', field.endTime),
    })
  }

  static fromJSON(json: Record<string, any>): UpdateTimeRangeEvent {
    if (json.$typeName !== UpdateTimeRangeEvent.$typeName) {
      throw new Error(
        `not a UpdateTimeRangeEvent json object: expected '${UpdateTimeRangeEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return UpdateTimeRangeEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): UpdateTimeRangeEvent {
    if (!isUpdateTimeRangeEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a UpdateTimeRangeEvent object`)
    }
    return UpdateTimeRangeEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link UpdateTimeRangeEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): UpdateTimeRangeEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isUpdateTimeRangeEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a UpdateTimeRangeEvent object`,
      )
    }
    return UpdateTimeRangeEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link UpdateTimeRangeEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): UpdateTimeRangeEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isUpdateTimeRangeEvent(data.bcs.type)) {
        throw new Error(`object at is not a UpdateTimeRangeEvent object`)
      }

      return UpdateTimeRangeEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return UpdateTimeRangeEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<UpdateTimeRangeEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isUpdateTimeRangeEvent(object.type)) {
      throw new Error(`object at id ${id} is not a UpdateTimeRangeEvent object`)
    }
    return UpdateTimeRangeEvent.fromBcs(object.content)
  }
}

/* ============================== ReceiveRefFeeEvent =============================== */

export function isReceiveRefFeeEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('cetus-clmm', 'partner::ReceiveRefFeeEvent')}::partner::ReceiveRefFeeEvent`
}

export interface ReceiveRefFeeEventFields {
  partnerId: ToField<ID>
  amount: ToField<'u64'>
  typeName: ToField<String>
}

export type ReceiveRefFeeEventReified = Reified<ReceiveRefFeeEvent, ReceiveRefFeeEventFields>

export type ReceiveRefFeeEventJSONField = {
  partnerId: string
  amount: string
  typeName: string
}

export type ReceiveRefFeeEventJSON = {
  $typeName: typeof ReceiveRefFeeEvent.$typeName
  $typeArgs: []
} & ReceiveRefFeeEventJSONField

/**
 * Emit when receive ref fee.
 * * `partner_id` - The unique identifier for this Partner object
 * * `amount` - The amount of the fee
 * * `type_name` - The type name of the fee
 */
export class ReceiveRefFeeEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::partner::ReceiveRefFeeEvent` {
    return `${
      getTypeOrigin('cetus-clmm', 'partner::ReceiveRefFeeEvent')
    }::partner::ReceiveRefFeeEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof ReceiveRefFeeEvent.$typeName = ReceiveRefFeeEvent.$typeName
  readonly $fullTypeName: `${string}::partner::ReceiveRefFeeEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof ReceiveRefFeeEvent.$isPhantom = ReceiveRefFeeEvent.$isPhantom

  readonly partnerId: ToField<ID>
  readonly amount: ToField<'u64'>
  readonly typeName: ToField<String>

  private constructor(typeArgs: [], fields: ReceiveRefFeeEventFields) {
    this.$fullTypeName = composeSuiType(
      ReceiveRefFeeEvent.$typeName,
      ...typeArgs,
    ) as `${string}::partner::ReceiveRefFeeEvent`
    this.$typeArgs = typeArgs

    this.partnerId = fields.partnerId
    this.amount = fields.amount
    this.typeName = fields.typeName
  }

  static reified(): ReceiveRefFeeEventReified {
    const reifiedBcs = ReceiveRefFeeEvent.bcs
    return {
      get typeName() {
        return ReceiveRefFeeEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          ReceiveRefFeeEvent.$typeName,
          ...[],
        ) as `${string}::partner::ReceiveRefFeeEvent`
      },
      typeArgs: [] as [],
      isPhantom: ReceiveRefFeeEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ReceiveRefFeeEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ReceiveRefFeeEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ReceiveRefFeeEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ReceiveRefFeeEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ReceiveRefFeeEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        ReceiveRefFeeEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => ReceiveRefFeeEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ReceiveRefFeeEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => ReceiveRefFeeEvent.fetch(client, id),
      new: (fields: ReceiveRefFeeEventFields) => {
        return new ReceiveRefFeeEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): ReceiveRefFeeEventReified {
    return ReceiveRefFeeEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ReceiveRefFeeEvent>> {
    return phantom(ReceiveRefFeeEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<ReceiveRefFeeEvent>> {
    return ReceiveRefFeeEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ReceiveRefFeeEvent', {
      partner_id: ID.bcs,
      amount: bcs.u64(),
      type_name: String.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof ReceiveRefFeeEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof ReceiveRefFeeEvent.instantiateBcs> {
    if (!ReceiveRefFeeEvent.cachedBcs) {
      ReceiveRefFeeEvent.cachedBcs = ReceiveRefFeeEvent.instantiateBcs()
    }
    return ReceiveRefFeeEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): ReceiveRefFeeEvent {
    return ReceiveRefFeeEvent.reified().new({
      partnerId: decodeFromFields(ID.reified(), fields.partner_id),
      amount: decodeFromFields('u64', fields.amount),
      typeName: decodeFromFields(String.reified(), fields.type_name),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ReceiveRefFeeEvent {
    if (!isReceiveRefFeeEvent(item.type)) {
      throw new Error('not a ReceiveRefFeeEvent type')
    }

    return ReceiveRefFeeEvent.reified().new({
      partnerId: decodeFromFieldsWithTypes(ID.reified(), item.fields.partner_id),
      amount: decodeFromFieldsWithTypes('u64', item.fields.amount),
      typeName: decodeFromFieldsWithTypes(String.reified(), item.fields.type_name),
    })
  }

  static fromBcs(data: Uint8Array): ReceiveRefFeeEvent {
    return ReceiveRefFeeEvent.fromFields(ReceiveRefFeeEvent.bcs.parse(data))
  }

  toJSONField(): ReceiveRefFeeEventJSONField {
    return {
      partnerId: this.partnerId,
      amount: this.amount.toString(),
      typeName: this.typeName,
    }
  }

  toJSON(): ReceiveRefFeeEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ReceiveRefFeeEvent {
    return ReceiveRefFeeEvent.reified().new({
      partnerId: decodeFromJSONField(ID.reified(), field.partnerId),
      amount: decodeFromJSONField('u64', field.amount),
      typeName: decodeFromJSONField(String.reified(), field.typeName),
    })
  }

  static fromJSON(json: Record<string, any>): ReceiveRefFeeEvent {
    if (json.$typeName !== ReceiveRefFeeEvent.$typeName) {
      throw new Error(
        `not a ReceiveRefFeeEvent json object: expected '${ReceiveRefFeeEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return ReceiveRefFeeEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): ReceiveRefFeeEvent {
    if (!isReceiveRefFeeEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a ReceiveRefFeeEvent object`)
    }
    return ReceiveRefFeeEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ReceiveRefFeeEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): ReceiveRefFeeEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isReceiveRefFeeEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ReceiveRefFeeEvent object`)
    }
    return ReceiveRefFeeEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ReceiveRefFeeEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): ReceiveRefFeeEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isReceiveRefFeeEvent(data.bcs.type)) {
        throw new Error(`object at is not a ReceiveRefFeeEvent object`)
      }

      return ReceiveRefFeeEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ReceiveRefFeeEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<ReceiveRefFeeEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isReceiveRefFeeEvent(object.type)) {
      throw new Error(`object at id ${id} is not a ReceiveRefFeeEvent object`)
    }
    return ReceiveRefFeeEvent.fromBcs(object.content)
  }
}

/* ============================== ClaimRefFeeEvent =============================== */

export function isClaimRefFeeEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('cetus-clmm', 'partner::ClaimRefFeeEvent')}::partner::ClaimRefFeeEvent`
}

export interface ClaimRefFeeEventFields {
  partnerId: ToField<ID>
  amount: ToField<'u64'>
  typeName: ToField<String>
}

export type ClaimRefFeeEventReified = Reified<ClaimRefFeeEvent, ClaimRefFeeEventFields>

export type ClaimRefFeeEventJSONField = {
  partnerId: string
  amount: string
  typeName: string
}

export type ClaimRefFeeEventJSON = {
  $typeName: typeof ClaimRefFeeEvent.$typeName
  $typeArgs: []
} & ClaimRefFeeEventJSONField

/**
 * Emit when claim ref fee.
 * * `partner_id` - The unique identifier for this Partner object
 * * `amount` - The amount of the fee
 * * `type_name` - The type name of the fee
 */
export class ClaimRefFeeEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::partner::ClaimRefFeeEvent` {
    return `${
      getTypeOrigin('cetus-clmm', 'partner::ClaimRefFeeEvent')
    }::partner::ClaimRefFeeEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof ClaimRefFeeEvent.$typeName = ClaimRefFeeEvent.$typeName
  readonly $fullTypeName: `${string}::partner::ClaimRefFeeEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof ClaimRefFeeEvent.$isPhantom = ClaimRefFeeEvent.$isPhantom

  readonly partnerId: ToField<ID>
  readonly amount: ToField<'u64'>
  readonly typeName: ToField<String>

  private constructor(typeArgs: [], fields: ClaimRefFeeEventFields) {
    this.$fullTypeName = composeSuiType(
      ClaimRefFeeEvent.$typeName,
      ...typeArgs,
    ) as `${string}::partner::ClaimRefFeeEvent`
    this.$typeArgs = typeArgs

    this.partnerId = fields.partnerId
    this.amount = fields.amount
    this.typeName = fields.typeName
  }

  static reified(): ClaimRefFeeEventReified {
    const reifiedBcs = ClaimRefFeeEvent.bcs
    return {
      get typeName() {
        return ClaimRefFeeEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          ClaimRefFeeEvent.$typeName,
          ...[],
        ) as `${string}::partner::ClaimRefFeeEvent`
      },
      typeArgs: [] as [],
      isPhantom: ClaimRefFeeEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ClaimRefFeeEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ClaimRefFeeEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ClaimRefFeeEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ClaimRefFeeEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ClaimRefFeeEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        ClaimRefFeeEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => ClaimRefFeeEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ClaimRefFeeEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => ClaimRefFeeEvent.fetch(client, id),
      new: (fields: ClaimRefFeeEventFields) => {
        return new ClaimRefFeeEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): ClaimRefFeeEventReified {
    return ClaimRefFeeEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ClaimRefFeeEvent>> {
    return phantom(ClaimRefFeeEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<ClaimRefFeeEvent>> {
    return ClaimRefFeeEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ClaimRefFeeEvent', {
      partner_id: ID.bcs,
      amount: bcs.u64(),
      type_name: String.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof ClaimRefFeeEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof ClaimRefFeeEvent.instantiateBcs> {
    if (!ClaimRefFeeEvent.cachedBcs) {
      ClaimRefFeeEvent.cachedBcs = ClaimRefFeeEvent.instantiateBcs()
    }
    return ClaimRefFeeEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): ClaimRefFeeEvent {
    return ClaimRefFeeEvent.reified().new({
      partnerId: decodeFromFields(ID.reified(), fields.partner_id),
      amount: decodeFromFields('u64', fields.amount),
      typeName: decodeFromFields(String.reified(), fields.type_name),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ClaimRefFeeEvent {
    if (!isClaimRefFeeEvent(item.type)) {
      throw new Error('not a ClaimRefFeeEvent type')
    }

    return ClaimRefFeeEvent.reified().new({
      partnerId: decodeFromFieldsWithTypes(ID.reified(), item.fields.partner_id),
      amount: decodeFromFieldsWithTypes('u64', item.fields.amount),
      typeName: decodeFromFieldsWithTypes(String.reified(), item.fields.type_name),
    })
  }

  static fromBcs(data: Uint8Array): ClaimRefFeeEvent {
    return ClaimRefFeeEvent.fromFields(ClaimRefFeeEvent.bcs.parse(data))
  }

  toJSONField(): ClaimRefFeeEventJSONField {
    return {
      partnerId: this.partnerId,
      amount: this.amount.toString(),
      typeName: this.typeName,
    }
  }

  toJSON(): ClaimRefFeeEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ClaimRefFeeEvent {
    return ClaimRefFeeEvent.reified().new({
      partnerId: decodeFromJSONField(ID.reified(), field.partnerId),
      amount: decodeFromJSONField('u64', field.amount),
      typeName: decodeFromJSONField(String.reified(), field.typeName),
    })
  }

  static fromJSON(json: Record<string, any>): ClaimRefFeeEvent {
    if (json.$typeName !== ClaimRefFeeEvent.$typeName) {
      throw new Error(
        `not a ClaimRefFeeEvent json object: expected '${ClaimRefFeeEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return ClaimRefFeeEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): ClaimRefFeeEvent {
    if (!isClaimRefFeeEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a ClaimRefFeeEvent object`)
    }
    return ClaimRefFeeEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ClaimRefFeeEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): ClaimRefFeeEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isClaimRefFeeEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ClaimRefFeeEvent object`)
    }
    return ClaimRefFeeEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ClaimRefFeeEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): ClaimRefFeeEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isClaimRefFeeEvent(data.bcs.type)) {
        throw new Error(`object at is not a ClaimRefFeeEvent object`)
      }

      return ClaimRefFeeEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ClaimRefFeeEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<ClaimRefFeeEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isClaimRefFeeEvent(object.type)) {
      throw new Error(`object at id ${id} is not a ClaimRefFeeEvent object`)
    }
    return ClaimRefFeeEvent.fromBcs(object.content)
  }
}
