import { bcs } from '@mysten/sui/bcs'
import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import type { SuiObjectData, SuiParsedData } from '@mysten/sui/jsonRpc'
import { fromBase64 } from '@mysten/sui/utils'
import { getTypeOrigin } from '../../../_envs'
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
} from '../../../_framework/reified'
import { composeSuiType, compressSuiType, FieldsWithTypes } from '../../../_framework/util'

/* ============================== PriceStatus =============================== */

export function isPriceStatus(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('pyth-1', 'price_status::PriceStatus')}::price_status::PriceStatus`
}

export interface PriceStatusFields {
  status: ToField<'u64'>
}

export type PriceStatusReified = Reified<PriceStatus, PriceStatusFields>

export type PriceStatusJSONField = {
  status: string
}

export type PriceStatusJSON = {
  $typeName: typeof PriceStatus.$typeName
  $typeArgs: []
} & PriceStatusJSONField

/**
 * PriceStatus represents the availability status of a price feed.
 * Prices should only be used if they have a status of trading.
 */
export class PriceStatus implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::price_status::PriceStatus` {
    return `${
      getTypeOrigin('pyth-1', 'price_status::PriceStatus')
    }::price_status::PriceStatus` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof PriceStatus.$typeName = PriceStatus.$typeName
  readonly $fullTypeName: `${string}::price_status::PriceStatus`
  readonly $typeArgs: []
  readonly $isPhantom: typeof PriceStatus.$isPhantom = PriceStatus.$isPhantom

  readonly status: ToField<'u64'>

  private constructor(typeArgs: [], fields: PriceStatusFields) {
    this.$fullTypeName = composeSuiType(
      PriceStatus.$typeName,
      ...typeArgs,
    ) as `${string}::price_status::PriceStatus`
    this.$typeArgs = typeArgs

    this.status = fields.status
  }

  static reified(): PriceStatusReified {
    const reifiedBcs = PriceStatus.bcs
    return {
      get typeName() {
        return PriceStatus.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          PriceStatus.$typeName,
          ...[],
        ) as `${string}::price_status::PriceStatus`
      },
      typeArgs: [] as [],
      isPhantom: PriceStatus.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PriceStatus.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PriceStatus.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PriceStatus.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PriceStatus.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PriceStatus.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        PriceStatus.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => PriceStatus.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PriceStatus.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => PriceStatus.fetch(client, id),
      new: (fields: PriceStatusFields) => {
        return new PriceStatus([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): PriceStatusReified {
    return PriceStatus.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PriceStatus>> {
    return phantom(PriceStatus.reified())
  }

  static get p(): PhantomReified<ToTypeStr<PriceStatus>> {
    return PriceStatus.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('PriceStatus', {
      status: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof PriceStatus.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof PriceStatus.instantiateBcs> {
    if (!PriceStatus.cachedBcs) {
      PriceStatus.cachedBcs = PriceStatus.instantiateBcs()
    }
    return PriceStatus.cachedBcs
  }

  static fromFields(fields: Record<string, any>): PriceStatus {
    return PriceStatus.reified().new({
      status: decodeFromFields('u64', fields.status),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PriceStatus {
    if (!isPriceStatus(item.type)) {
      throw new Error('not a PriceStatus type')
    }

    return PriceStatus.reified().new({
      status: decodeFromFieldsWithTypes('u64', item.fields.status),
    })
  }

  static fromBcs(data: Uint8Array): PriceStatus {
    return PriceStatus.fromFields(PriceStatus.bcs.parse(data))
  }

  toJSONField(): PriceStatusJSONField {
    return {
      status: this.status.toString(),
    }
  }

  toJSON(): PriceStatusJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PriceStatus {
    return PriceStatus.reified().new({
      status: decodeFromJSONField('u64', field.status),
    })
  }

  static fromJSON(json: Record<string, any>): PriceStatus {
    if (json.$typeName !== PriceStatus.$typeName) {
      throw new Error(
        `not a PriceStatus json object: expected '${PriceStatus.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return PriceStatus.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): PriceStatus {
    if (!isPriceStatus(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a PriceStatus object`)
    }
    return PriceStatus.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link PriceStatus.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): PriceStatus {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPriceStatus(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PriceStatus object`)
    }
    return PriceStatus.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link PriceStatus.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): PriceStatus {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPriceStatus(data.bcs.type)) {
        throw new Error(`object at is not a PriceStatus object`)
      }

      return PriceStatus.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PriceStatus.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<PriceStatus> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isPriceStatus(object.type)) {
      throw new Error(`object at id ${id} is not a PriceStatus object`)
    }
    return PriceStatus.fromBcs(object.content)
  }
}
