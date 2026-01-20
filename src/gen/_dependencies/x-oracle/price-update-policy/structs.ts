import { bcs } from '@mysten/sui/bcs'
import { SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromBase64 } from '@mysten/sui/utils'
import { getTypeOrigin } from '../../../_envs'
import {
  assertFieldsWithTypesArgsMatch,
  assertReifiedTypeArgsMatch,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  extractType,
  fieldToJSON,
  phantom,
  PhantomReified,
  PhantomToTypeStr,
  PhantomTypeArgument,
  Reified,
  StructClass,
  ToField,
  ToJSON,
  ToPhantomTypeArgument,
  ToTypeStr,
  vector,
} from '../../../_framework/reified'
import {
  composeSuiType,
  compressSuiType,
  fetchObjectBcs,
  FieldsWithTypes,
  parseTypeName,
  SupportedSuiClient,
} from '../../../_framework/util'
import { Vector } from '../../../_framework/vector'
import { TypeName } from '../../../std/type-name/structs'
import { ID, UID } from '../../../sui/object/structs'
import { VecSet } from '../../../sui/vec-set/structs'
import { PriceFeed } from '../price-feed/structs'

/* ============================== PriceUpdateRequest =============================== */

export function isPriceUpdateRequest(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    `${
      getTypeOrigin('x-oracle', 'price_update_policy::PriceUpdateRequest')
    }::price_update_policy::PriceUpdateRequest` + '<',
  )
}

export interface PriceUpdateRequestFields<T0 extends PhantomTypeArgument> {
  for: ToField<ID>
  receipts: ToField<VecSet<TypeName>>
  priceFeeds: ToField<Vector<PriceFeed>>
}

export type PriceUpdateRequestReified<T0 extends PhantomTypeArgument> = Reified<
  PriceUpdateRequest<T0>,
  PriceUpdateRequestFields<T0>
>

export type PriceUpdateRequestJSONField<T0 extends PhantomTypeArgument> = {
  for: string
  receipts: ToJSON<VecSet<TypeName>>
  priceFeeds: ToJSON<PriceFeed>[]
}

export type PriceUpdateRequestJSON<T0 extends PhantomTypeArgument> = {
  $typeName: typeof PriceUpdateRequest.$typeName
  $typeArgs: [PhantomToTypeStr<T0>]
} & PriceUpdateRequestJSONField<T0>

export class PriceUpdateRequest<T0 extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::price_update_policy::PriceUpdateRequest` = `${
    getTypeOrigin('x-oracle', 'price_update_policy::PriceUpdateRequest')
  }::price_update_policy::PriceUpdateRequest` as const
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName: typeof PriceUpdateRequest.$typeName = PriceUpdateRequest.$typeName
  readonly $fullTypeName: `${string}::price_update_policy::PriceUpdateRequest<${PhantomToTypeStr<
    T0
  >}>`
  readonly $typeArgs: [PhantomToTypeStr<T0>]
  readonly $isPhantom: typeof PriceUpdateRequest.$isPhantom = PriceUpdateRequest.$isPhantom

  readonly for: ToField<ID>
  readonly receipts: ToField<VecSet<TypeName>>
  readonly priceFeeds: ToField<Vector<PriceFeed>>

  private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: PriceUpdateRequestFields<T0>) {
    this.$fullTypeName = composeSuiType(
      PriceUpdateRequest.$typeName,
      ...typeArgs,
    ) as `${string}::price_update_policy::PriceUpdateRequest<${PhantomToTypeStr<T0>}>`
    this.$typeArgs = typeArgs

    this.for = fields.for
    this.receipts = fields.receipts
    this.priceFeeds = fields.priceFeeds
  }

  static reified<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0,
  ): PriceUpdateRequestReified<ToPhantomTypeArgument<T0>> {
    const reifiedBcs = PriceUpdateRequest.bcs
    return {
      typeName: PriceUpdateRequest.$typeName,
      fullTypeName: composeSuiType(
        PriceUpdateRequest.$typeName,
        ...[extractType(T0)],
      ) as `${string}::price_update_policy::PriceUpdateRequest<${PhantomToTypeStr<
        ToPhantomTypeArgument<T0>
      >}>`,
      typeArgs: [extractType(T0)] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>],
      isPhantom: PriceUpdateRequest.$isPhantom,
      reifiedTypeArgs: [T0],
      fromFields: (fields: Record<string, any>) => PriceUpdateRequest.fromFields(T0, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        PriceUpdateRequest.fromFieldsWithTypes(T0, item),
      fromBcs: (data: Uint8Array) => PriceUpdateRequest.fromFields(T0, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PriceUpdateRequest.fromJSONField(T0, field),
      fromJSON: (json: Record<string, any>) => PriceUpdateRequest.fromJSON(T0, json),
      fromSuiParsedData: (content: SuiParsedData) =>
        PriceUpdateRequest.fromSuiParsedData(T0, content),
      fromSuiObjectData: (content: SuiObjectData) =>
        PriceUpdateRequest.fromSuiObjectData(T0, content),
      fetch: async (client: SupportedSuiClient, id: string) =>
        PriceUpdateRequest.fetch(client, T0, id),
      new: (fields: PriceUpdateRequestFields<ToPhantomTypeArgument<T0>>) => {
        return new PriceUpdateRequest([extractType(T0)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof PriceUpdateRequest.reified {
    return PriceUpdateRequest.reified
  }

  static phantom<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0,
  ): PhantomReified<ToTypeStr<PriceUpdateRequest<ToPhantomTypeArgument<T0>>>> {
    return phantom(PriceUpdateRequest.reified(T0))
  }

  static get p(): typeof PriceUpdateRequest.phantom {
    return PriceUpdateRequest.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('PriceUpdateRequest', {
      for: ID.bcs,
      receipts: VecSet.bcs(TypeName.bcs),
      price_feeds: bcs.vector(PriceFeed.bcs),
    })
  }

  private static cachedBcs: ReturnType<typeof PriceUpdateRequest.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof PriceUpdateRequest.instantiateBcs> {
    if (!PriceUpdateRequest.cachedBcs) {
      PriceUpdateRequest.cachedBcs = PriceUpdateRequest.instantiateBcs()
    }
    return PriceUpdateRequest.cachedBcs
  }

  static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    fields: Record<string, any>,
  ): PriceUpdateRequest<ToPhantomTypeArgument<T0>> {
    return PriceUpdateRequest.reified(typeArg).new({
      for: decodeFromFields(ID.reified(), fields.for),
      receipts: decodeFromFields(VecSet.reified(TypeName.reified()), fields.receipts),
      priceFeeds: decodeFromFields(vector(PriceFeed.reified()), fields.price_feeds),
    })
  }

  static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    item: FieldsWithTypes,
  ): PriceUpdateRequest<ToPhantomTypeArgument<T0>> {
    if (!isPriceUpdateRequest(item.type)) {
      throw new Error('not a PriceUpdateRequest type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return PriceUpdateRequest.reified(typeArg).new({
      for: decodeFromFieldsWithTypes(ID.reified(), item.fields.for),
      receipts: decodeFromFieldsWithTypes(VecSet.reified(TypeName.reified()), item.fields.receipts),
      priceFeeds: decodeFromFieldsWithTypes(vector(PriceFeed.reified()), item.fields.price_feeds),
    })
  }

  static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: Uint8Array,
  ): PriceUpdateRequest<ToPhantomTypeArgument<T0>> {
    return PriceUpdateRequest.fromFields(typeArg, PriceUpdateRequest.bcs.parse(data))
  }

  toJSONField(): PriceUpdateRequestJSONField<T0> {
    return {
      for: this.for,
      receipts: this.receipts.toJSONField(),
      priceFeeds: fieldToJSON<Vector<PriceFeed>>(`vector<${PriceFeed.$typeName}>`, this.priceFeeds),
    }
  }

  toJSON(): PriceUpdateRequestJSON<T0> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    field: any,
  ): PriceUpdateRequest<ToPhantomTypeArgument<T0>> {
    return PriceUpdateRequest.reified(typeArg).new({
      for: decodeFromJSONField(ID.reified(), field.for),
      receipts: decodeFromJSONField(VecSet.reified(TypeName.reified()), field.receipts),
      priceFeeds: decodeFromJSONField(vector(PriceFeed.reified()), field.priceFeeds),
    })
  }

  static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    json: Record<string, any>,
  ): PriceUpdateRequest<ToPhantomTypeArgument<T0>> {
    if (json.$typeName !== PriceUpdateRequest.$typeName) {
      throw new Error(
        `not a PriceUpdateRequest json object: expected '${PriceUpdateRequest.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(PriceUpdateRequest.$typeName, ...[extractType(typeArg)]),
      json.$typeArgs,
      [typeArg],
    )

    return PriceUpdateRequest.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    content: SuiParsedData,
  ): PriceUpdateRequest<ToPhantomTypeArgument<T0>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPriceUpdateRequest(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PriceUpdateRequest object`)
    }
    return PriceUpdateRequest.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: SuiObjectData,
  ): PriceUpdateRequest<ToPhantomTypeArgument<T0>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPriceUpdateRequest(data.bcs.type)) {
        throw new Error(`object at is not a PriceUpdateRequest object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 1) {
        throw new Error(
          `type argument mismatch: expected 1 type arguments but got '${gotTypeArgs.length}'`,
        )
      }
      for (let i = 0; i < 1; i++) {
        const gotTypeArg = compressSuiType(gotTypeArgs[i])
        const expectedTypeArg = compressSuiType(extractType([typeArg][i]))
        if (gotTypeArg !== expectedTypeArg) {
          throw new Error(
            `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
          )
        }
      }

      return PriceUpdateRequest.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PriceUpdateRequest.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>(
    client: SupportedSuiClient,
    typeArg: T0,
    id: string,
  ): Promise<PriceUpdateRequest<ToPhantomTypeArgument<T0>>> {
    const res = await fetchObjectBcs(client, id)
    if (!isPriceUpdateRequest(res.type)) {
      throw new Error(`object at id ${id} is not a PriceUpdateRequest object`)
    }

    const gotTypeArgs = parseTypeName(res.type).typeArgs
    if (gotTypeArgs.length !== 1) {
      throw new Error(
        `type argument mismatch: expected 1 type arguments but got '${gotTypeArgs.length}'`,
      )
    }
    for (let i = 0; i < 1; i++) {
      const gotTypeArg = compressSuiType(gotTypeArgs[i])
      const expectedTypeArg = compressSuiType(extractType([typeArg][i]))
      if (gotTypeArg !== expectedTypeArg) {
        throw new Error(
          `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
        )
      }
    }

    return PriceUpdateRequest.fromBcs(typeArg, res.bcsBytes)
  }
}

/* ============================== PriceUpdatePolicy =============================== */

export function isPriceUpdatePolicy(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('x-oracle', 'price_update_policy::PriceUpdatePolicy')
    }::price_update_policy::PriceUpdatePolicy`
}

export interface PriceUpdatePolicyFields {
  id: ToField<UID>
  rules: ToField<VecSet<TypeName>>
}

export type PriceUpdatePolicyReified = Reified<PriceUpdatePolicy, PriceUpdatePolicyFields>

export type PriceUpdatePolicyJSONField = {
  id: string
  rules: ToJSON<VecSet<TypeName>>
}

export type PriceUpdatePolicyJSON = {
  $typeName: typeof PriceUpdatePolicy.$typeName
  $typeArgs: []
} & PriceUpdatePolicyJSONField

export class PriceUpdatePolicy implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::price_update_policy::PriceUpdatePolicy` = `${
    getTypeOrigin('x-oracle', 'price_update_policy::PriceUpdatePolicy')
  }::price_update_policy::PriceUpdatePolicy` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof PriceUpdatePolicy.$typeName = PriceUpdatePolicy.$typeName
  readonly $fullTypeName: `${string}::price_update_policy::PriceUpdatePolicy`
  readonly $typeArgs: []
  readonly $isPhantom: typeof PriceUpdatePolicy.$isPhantom = PriceUpdatePolicy.$isPhantom

  readonly id: ToField<UID>
  readonly rules: ToField<VecSet<TypeName>>

  private constructor(typeArgs: [], fields: PriceUpdatePolicyFields) {
    this.$fullTypeName = composeSuiType(
      PriceUpdatePolicy.$typeName,
      ...typeArgs,
    ) as `${string}::price_update_policy::PriceUpdatePolicy`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.rules = fields.rules
  }

  static reified(): PriceUpdatePolicyReified {
    const reifiedBcs = PriceUpdatePolicy.bcs
    return {
      typeName: PriceUpdatePolicy.$typeName,
      fullTypeName: composeSuiType(
        PriceUpdatePolicy.$typeName,
        ...[],
      ) as `${string}::price_update_policy::PriceUpdatePolicy`,
      typeArgs: [] as [],
      isPhantom: PriceUpdatePolicy.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PriceUpdatePolicy.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PriceUpdatePolicy.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PriceUpdatePolicy.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PriceUpdatePolicy.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PriceUpdatePolicy.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => PriceUpdatePolicy.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PriceUpdatePolicy.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => PriceUpdatePolicy.fetch(client, id),
      new: (fields: PriceUpdatePolicyFields) => {
        return new PriceUpdatePolicy([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): PriceUpdatePolicyReified {
    return PriceUpdatePolicy.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PriceUpdatePolicy>> {
    return phantom(PriceUpdatePolicy.reified())
  }

  static get p(): PhantomReified<ToTypeStr<PriceUpdatePolicy>> {
    return PriceUpdatePolicy.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('PriceUpdatePolicy', {
      id: UID.bcs,
      rules: VecSet.bcs(TypeName.bcs),
    })
  }

  private static cachedBcs: ReturnType<typeof PriceUpdatePolicy.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof PriceUpdatePolicy.instantiateBcs> {
    if (!PriceUpdatePolicy.cachedBcs) {
      PriceUpdatePolicy.cachedBcs = PriceUpdatePolicy.instantiateBcs()
    }
    return PriceUpdatePolicy.cachedBcs
  }

  static fromFields(fields: Record<string, any>): PriceUpdatePolicy {
    return PriceUpdatePolicy.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      rules: decodeFromFields(VecSet.reified(TypeName.reified()), fields.rules),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PriceUpdatePolicy {
    if (!isPriceUpdatePolicy(item.type)) {
      throw new Error('not a PriceUpdatePolicy type')
    }

    return PriceUpdatePolicy.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      rules: decodeFromFieldsWithTypes(VecSet.reified(TypeName.reified()), item.fields.rules),
    })
  }

  static fromBcs(data: Uint8Array): PriceUpdatePolicy {
    return PriceUpdatePolicy.fromFields(PriceUpdatePolicy.bcs.parse(data))
  }

  toJSONField(): PriceUpdatePolicyJSONField {
    return {
      id: this.id,
      rules: this.rules.toJSONField(),
    }
  }

  toJSON(): PriceUpdatePolicyJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PriceUpdatePolicy {
    return PriceUpdatePolicy.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      rules: decodeFromJSONField(VecSet.reified(TypeName.reified()), field.rules),
    })
  }

  static fromJSON(json: Record<string, any>): PriceUpdatePolicy {
    if (json.$typeName !== PriceUpdatePolicy.$typeName) {
      throw new Error(
        `not a PriceUpdatePolicy json object: expected '${PriceUpdatePolicy.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return PriceUpdatePolicy.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): PriceUpdatePolicy {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPriceUpdatePolicy(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PriceUpdatePolicy object`)
    }
    return PriceUpdatePolicy.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): PriceUpdatePolicy {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPriceUpdatePolicy(data.bcs.type)) {
        throw new Error(`object at is not a PriceUpdatePolicy object`)
      }

      return PriceUpdatePolicy.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PriceUpdatePolicy.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<PriceUpdatePolicy> {
    const res = await fetchObjectBcs(client, id)
    if (!isPriceUpdatePolicy(res.type)) {
      throw new Error(`object at id ${id} is not a PriceUpdatePolicy object`)
    }

    return PriceUpdatePolicy.fromBcs(res.bcsBytes)
  }
}

/* ============================== PriceUpdatePolicyCap =============================== */

export function isPriceUpdatePolicyCap(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('x-oracle', 'price_update_policy::PriceUpdatePolicyCap')
    }::price_update_policy::PriceUpdatePolicyCap`
}

export interface PriceUpdatePolicyCapFields {
  id: ToField<UID>
  for: ToField<ID>
}

export type PriceUpdatePolicyCapReified = Reified<PriceUpdatePolicyCap, PriceUpdatePolicyCapFields>

export type PriceUpdatePolicyCapJSONField = {
  id: string
  for: string
}

export type PriceUpdatePolicyCapJSON = {
  $typeName: typeof PriceUpdatePolicyCap.$typeName
  $typeArgs: []
} & PriceUpdatePolicyCapJSONField

export class PriceUpdatePolicyCap implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::price_update_policy::PriceUpdatePolicyCap` = `${
    getTypeOrigin('x-oracle', 'price_update_policy::PriceUpdatePolicyCap')
  }::price_update_policy::PriceUpdatePolicyCap` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof PriceUpdatePolicyCap.$typeName = PriceUpdatePolicyCap.$typeName
  readonly $fullTypeName: `${string}::price_update_policy::PriceUpdatePolicyCap`
  readonly $typeArgs: []
  readonly $isPhantom: typeof PriceUpdatePolicyCap.$isPhantom = PriceUpdatePolicyCap.$isPhantom

  readonly id: ToField<UID>
  readonly for: ToField<ID>

  private constructor(typeArgs: [], fields: PriceUpdatePolicyCapFields) {
    this.$fullTypeName = composeSuiType(
      PriceUpdatePolicyCap.$typeName,
      ...typeArgs,
    ) as `${string}::price_update_policy::PriceUpdatePolicyCap`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.for = fields.for
  }

  static reified(): PriceUpdatePolicyCapReified {
    const reifiedBcs = PriceUpdatePolicyCap.bcs
    return {
      typeName: PriceUpdatePolicyCap.$typeName,
      fullTypeName: composeSuiType(
        PriceUpdatePolicyCap.$typeName,
        ...[],
      ) as `${string}::price_update_policy::PriceUpdatePolicyCap`,
      typeArgs: [] as [],
      isPhantom: PriceUpdatePolicyCap.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PriceUpdatePolicyCap.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        PriceUpdatePolicyCap.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PriceUpdatePolicyCap.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PriceUpdatePolicyCap.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PriceUpdatePolicyCap.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        PriceUpdatePolicyCap.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        PriceUpdatePolicyCap.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) =>
        PriceUpdatePolicyCap.fetch(client, id),
      new: (fields: PriceUpdatePolicyCapFields) => {
        return new PriceUpdatePolicyCap([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): PriceUpdatePolicyCapReified {
    return PriceUpdatePolicyCap.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PriceUpdatePolicyCap>> {
    return phantom(PriceUpdatePolicyCap.reified())
  }

  static get p(): PhantomReified<ToTypeStr<PriceUpdatePolicyCap>> {
    return PriceUpdatePolicyCap.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('PriceUpdatePolicyCap', {
      id: UID.bcs,
      for: ID.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof PriceUpdatePolicyCap.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof PriceUpdatePolicyCap.instantiateBcs> {
    if (!PriceUpdatePolicyCap.cachedBcs) {
      PriceUpdatePolicyCap.cachedBcs = PriceUpdatePolicyCap.instantiateBcs()
    }
    return PriceUpdatePolicyCap.cachedBcs
  }

  static fromFields(fields: Record<string, any>): PriceUpdatePolicyCap {
    return PriceUpdatePolicyCap.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      for: decodeFromFields(ID.reified(), fields.for),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PriceUpdatePolicyCap {
    if (!isPriceUpdatePolicyCap(item.type)) {
      throw new Error('not a PriceUpdatePolicyCap type')
    }

    return PriceUpdatePolicyCap.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      for: decodeFromFieldsWithTypes(ID.reified(), item.fields.for),
    })
  }

  static fromBcs(data: Uint8Array): PriceUpdatePolicyCap {
    return PriceUpdatePolicyCap.fromFields(PriceUpdatePolicyCap.bcs.parse(data))
  }

  toJSONField(): PriceUpdatePolicyCapJSONField {
    return {
      id: this.id,
      for: this.for,
    }
  }

  toJSON(): PriceUpdatePolicyCapJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PriceUpdatePolicyCap {
    return PriceUpdatePolicyCap.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      for: decodeFromJSONField(ID.reified(), field.for),
    })
  }

  static fromJSON(json: Record<string, any>): PriceUpdatePolicyCap {
    if (json.$typeName !== PriceUpdatePolicyCap.$typeName) {
      throw new Error(
        `not a PriceUpdatePolicyCap json object: expected '${PriceUpdatePolicyCap.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return PriceUpdatePolicyCap.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): PriceUpdatePolicyCap {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPriceUpdatePolicyCap(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a PriceUpdatePolicyCap object`,
      )
    }
    return PriceUpdatePolicyCap.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): PriceUpdatePolicyCap {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPriceUpdatePolicyCap(data.bcs.type)) {
        throw new Error(`object at is not a PriceUpdatePolicyCap object`)
      }

      return PriceUpdatePolicyCap.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PriceUpdatePolicyCap.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<PriceUpdatePolicyCap> {
    const res = await fetchObjectBcs(client, id)
    if (!isPriceUpdatePolicyCap(res.type)) {
      throw new Error(`object at id ${id} is not a PriceUpdatePolicyCap object`)
    }

    return PriceUpdatePolicyCap.fromBcs(res.bcsBytes)
  }
}
