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
  vector,
} from '../../_framework/reified'
import { composeSuiType, compressSuiType, FieldsWithTypes } from '../../_framework/util'
import { Vector } from '../../_framework/vector'
import { PriceInfo } from '../price-info/structs'

/* ============================== BatchPriceAttestation =============================== */

export function isBatchPriceAttestation(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('pyth', 'batch_price_attestation::BatchPriceAttestation')
    }::batch_price_attestation::BatchPriceAttestation`
}

export interface BatchPriceAttestationFields {
  header: ToField<Header>
  attestationSize: ToField<'u64'>
  attestationCount: ToField<'u64'>
  priceInfos: ToField<Vector<PriceInfo>>
}

export type BatchPriceAttestationReified = Reified<
  BatchPriceAttestation,
  BatchPriceAttestationFields
>

export type BatchPriceAttestationJSONField = {
  header: ToJSON<Header>
  attestationSize: string
  attestationCount: string
  priceInfos: ToJSON<PriceInfo>[]
}

export type BatchPriceAttestationJSON = {
  $typeName: typeof BatchPriceAttestation.$typeName
  $typeArgs: []
} & BatchPriceAttestationJSONField

/** @notice This struct is based on the legacy wormhole attester implementation in pythnet_sdk */
export class BatchPriceAttestation implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::batch_price_attestation::BatchPriceAttestation` {
    return `${
      getTypeOrigin('pyth', 'batch_price_attestation::BatchPriceAttestation')
    }::batch_price_attestation::BatchPriceAttestation` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof BatchPriceAttestation.$typeName = BatchPriceAttestation.$typeName
  readonly $fullTypeName: `${string}::batch_price_attestation::BatchPriceAttestation`
  readonly $typeArgs: []
  readonly $isPhantom: typeof BatchPriceAttestation.$isPhantom = BatchPriceAttestation.$isPhantom

  readonly header: ToField<Header>
  readonly attestationSize: ToField<'u64'>
  readonly attestationCount: ToField<'u64'>
  readonly priceInfos: ToField<Vector<PriceInfo>>

  private constructor(typeArgs: [], fields: BatchPriceAttestationFields) {
    this.$fullTypeName = composeSuiType(
      BatchPriceAttestation.$typeName,
      ...typeArgs,
    ) as `${string}::batch_price_attestation::BatchPriceAttestation`
    this.$typeArgs = typeArgs

    this.header = fields.header
    this.attestationSize = fields.attestationSize
    this.attestationCount = fields.attestationCount
    this.priceInfos = fields.priceInfos
  }

  static reified(): BatchPriceAttestationReified {
    const reifiedBcs = BatchPriceAttestation.bcs
    return {
      get typeName() {
        return BatchPriceAttestation.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          BatchPriceAttestation.$typeName,
          ...[],
        ) as `${string}::batch_price_attestation::BatchPriceAttestation`
      },
      typeArgs: [] as [],
      isPhantom: BatchPriceAttestation.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => BatchPriceAttestation.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        BatchPriceAttestation.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => BatchPriceAttestation.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => BatchPriceAttestation.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => BatchPriceAttestation.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        BatchPriceAttestation.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        BatchPriceAttestation.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        BatchPriceAttestation.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        BatchPriceAttestation.fetch(client, id),
      new: (fields: BatchPriceAttestationFields) => {
        return new BatchPriceAttestation([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): BatchPriceAttestationReified {
    return BatchPriceAttestation.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<BatchPriceAttestation>> {
    return phantom(BatchPriceAttestation.reified())
  }

  static get p(): PhantomReified<ToTypeStr<BatchPriceAttestation>> {
    return BatchPriceAttestation.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('BatchPriceAttestation', {
      header: Header.bcs,
      attestation_size: bcs.u64(),
      attestation_count: bcs.u64(),
      price_infos: bcs.vector(PriceInfo.bcs),
    })
  }

  private static cachedBcs: ReturnType<typeof BatchPriceAttestation.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof BatchPriceAttestation.instantiateBcs> {
    if (!BatchPriceAttestation.cachedBcs) {
      BatchPriceAttestation.cachedBcs = BatchPriceAttestation.instantiateBcs()
    }
    return BatchPriceAttestation.cachedBcs
  }

  static fromFields(fields: Record<string, any>): BatchPriceAttestation {
    return BatchPriceAttestation.reified().new({
      header: decodeFromFields(Header.reified(), fields.header),
      attestationSize: decodeFromFields('u64', fields.attestation_size),
      attestationCount: decodeFromFields('u64', fields.attestation_count),
      priceInfos: decodeFromFields(vector(PriceInfo.reified()), fields.price_infos),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): BatchPriceAttestation {
    if (!isBatchPriceAttestation(item.type)) {
      throw new Error('not a BatchPriceAttestation type')
    }

    return BatchPriceAttestation.reified().new({
      header: decodeFromFieldsWithTypes(Header.reified(), item.fields.header),
      attestationSize: decodeFromFieldsWithTypes('u64', item.fields.attestation_size),
      attestationCount: decodeFromFieldsWithTypes('u64', item.fields.attestation_count),
      priceInfos: decodeFromFieldsWithTypes(vector(PriceInfo.reified()), item.fields.price_infos),
    })
  }

  static fromBcs(data: Uint8Array): BatchPriceAttestation {
    return BatchPriceAttestation.fromFields(BatchPriceAttestation.bcs.parse(data))
  }

  toJSONField(): BatchPriceAttestationJSONField {
    return {
      header: this.header.toJSONField(),
      attestationSize: this.attestationSize.toString(),
      attestationCount: this.attestationCount.toString(),
      priceInfos: fieldToJSON<Vector<PriceInfo>>(`vector<${PriceInfo.$typeName}>`, this.priceInfos),
    }
  }

  toJSON(): BatchPriceAttestationJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): BatchPriceAttestation {
    return BatchPriceAttestation.reified().new({
      header: decodeFromJSONField(Header.reified(), field.header),
      attestationSize: decodeFromJSONField('u64', field.attestationSize),
      attestationCount: decodeFromJSONField('u64', field.attestationCount),
      priceInfos: decodeFromJSONField(vector(PriceInfo.reified()), field.priceInfos),
    })
  }

  static fromJSON(json: Record<string, any>): BatchPriceAttestation {
    if (json.$typeName !== BatchPriceAttestation.$typeName) {
      throw new Error(
        `not a BatchPriceAttestation json object: expected '${BatchPriceAttestation.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return BatchPriceAttestation.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): BatchPriceAttestation {
    if (!isBatchPriceAttestation(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a BatchPriceAttestation object`)
    }
    return BatchPriceAttestation.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link BatchPriceAttestation.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): BatchPriceAttestation {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isBatchPriceAttestation(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a BatchPriceAttestation object`,
      )
    }
    return BatchPriceAttestation.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link BatchPriceAttestation.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): BatchPriceAttestation {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isBatchPriceAttestation(data.bcs.type)) {
        throw new Error(`object at is not a BatchPriceAttestation object`)
      }

      return BatchPriceAttestation.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return BatchPriceAttestation.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<BatchPriceAttestation> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isBatchPriceAttestation(object.type)) {
      throw new Error(`object at id ${id} is not a BatchPriceAttestation object`)
    }
    return BatchPriceAttestation.fromBcs(object.content)
  }
}

/* ============================== Header =============================== */

export function isHeader(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('pyth', 'batch_price_attestation::Header')
    }::batch_price_attestation::Header`
}

export interface HeaderFields {
  magic: ToField<'u64'>
  versionMajor: ToField<'u64'>
  versionMinor: ToField<'u64'>
  headerSize: ToField<'u64'>
  payloadId: ToField<'u8'>
}

export type HeaderReified = Reified<Header, HeaderFields>

export type HeaderJSONField = {
  magic: string
  versionMajor: string
  versionMinor: string
  headerSize: string
  payloadId: number
}

export type HeaderJSON = {
  $typeName: typeof Header.$typeName
  $typeArgs: []
} & HeaderJSONField

export class Header implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::batch_price_attestation::Header` {
    return `${
      getTypeOrigin('pyth', 'batch_price_attestation::Header')
    }::batch_price_attestation::Header` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof Header.$typeName = Header.$typeName
  readonly $fullTypeName: `${string}::batch_price_attestation::Header`
  readonly $typeArgs: []
  readonly $isPhantom: typeof Header.$isPhantom = Header.$isPhantom

  readonly magic: ToField<'u64'>
  readonly versionMajor: ToField<'u64'>
  readonly versionMinor: ToField<'u64'>
  readonly headerSize: ToField<'u64'>
  readonly payloadId: ToField<'u8'>

  private constructor(typeArgs: [], fields: HeaderFields) {
    this.$fullTypeName = composeSuiType(
      Header.$typeName,
      ...typeArgs,
    ) as `${string}::batch_price_attestation::Header`
    this.$typeArgs = typeArgs

    this.magic = fields.magic
    this.versionMajor = fields.versionMajor
    this.versionMinor = fields.versionMinor
    this.headerSize = fields.headerSize
    this.payloadId = fields.payloadId
  }

  static reified(): HeaderReified {
    const reifiedBcs = Header.bcs
    return {
      get typeName() {
        return Header.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          Header.$typeName,
          ...[],
        ) as `${string}::batch_price_attestation::Header`
      },
      typeArgs: [] as [],
      isPhantom: Header.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Header.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Header.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Header.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Header.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Header.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => Header.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => Header.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Header.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => Header.fetch(client, id),
      new: (fields: HeaderFields) => {
        return new Header([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): HeaderReified {
    return Header.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Header>> {
    return phantom(Header.reified())
  }

  static get p(): PhantomReified<ToTypeStr<Header>> {
    return Header.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('Header', {
      magic: bcs.u64(),
      version_major: bcs.u64(),
      version_minor: bcs.u64(),
      header_size: bcs.u64(),
      payload_id: bcs.u8(),
    })
  }

  private static cachedBcs: ReturnType<typeof Header.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof Header.instantiateBcs> {
    if (!Header.cachedBcs) {
      Header.cachedBcs = Header.instantiateBcs()
    }
    return Header.cachedBcs
  }

  static fromFields(fields: Record<string, any>): Header {
    return Header.reified().new({
      magic: decodeFromFields('u64', fields.magic),
      versionMajor: decodeFromFields('u64', fields.version_major),
      versionMinor: decodeFromFields('u64', fields.version_minor),
      headerSize: decodeFromFields('u64', fields.header_size),
      payloadId: decodeFromFields('u8', fields.payload_id),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Header {
    if (!isHeader(item.type)) {
      throw new Error('not a Header type')
    }

    return Header.reified().new({
      magic: decodeFromFieldsWithTypes('u64', item.fields.magic),
      versionMajor: decodeFromFieldsWithTypes('u64', item.fields.version_major),
      versionMinor: decodeFromFieldsWithTypes('u64', item.fields.version_minor),
      headerSize: decodeFromFieldsWithTypes('u64', item.fields.header_size),
      payloadId: decodeFromFieldsWithTypes('u8', item.fields.payload_id),
    })
  }

  static fromBcs(data: Uint8Array): Header {
    return Header.fromFields(Header.bcs.parse(data))
  }

  toJSONField(): HeaderJSONField {
    return {
      magic: this.magic.toString(),
      versionMajor: this.versionMajor.toString(),
      versionMinor: this.versionMinor.toString(),
      headerSize: this.headerSize.toString(),
      payloadId: this.payloadId,
    }
  }

  toJSON(): HeaderJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Header {
    return Header.reified().new({
      magic: decodeFromJSONField('u64', field.magic),
      versionMajor: decodeFromJSONField('u64', field.versionMajor),
      versionMinor: decodeFromJSONField('u64', field.versionMinor),
      headerSize: decodeFromJSONField('u64', field.headerSize),
      payloadId: decodeFromJSONField('u8', field.payloadId),
    })
  }

  static fromJSON(json: Record<string, any>): Header {
    if (json.$typeName !== Header.$typeName) {
      throw new Error(
        `not a Header json object: expected '${Header.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return Header.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): Header {
    if (!isHeader(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a Header object`)
    }
    return Header.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Header.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): Header {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isHeader(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Header object`)
    }
    return Header.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Header.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): Header {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isHeader(data.bcs.type)) {
        throw new Error(`object at is not a Header object`)
      }

      return Header.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Header.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<Header> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isHeader(object.type)) {
      throw new Error(`object at id ${id} is not a Header object`)
    }
    return Header.fromBcs(object.content)
  }
}
