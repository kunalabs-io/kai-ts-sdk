/**
 * This module implements a custom type for a 32-byte standardized address,
 * which is meant to represent an address from any other network.
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
  phantom,
  PhantomReified,
  Reified,
  StructClass,
  ToField,
  ToJSON,
  ToTypeStr,
} from '../../_framework/reified'
import { composeSuiType, compressSuiType, FieldsWithTypes } from '../../_framework/util'
import { Bytes32 } from '../bytes32/structs'

/* ============================== ExternalAddress =============================== */

export function isExternalAddress(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('wormhole', 'external_address::ExternalAddress')
    }::external_address::ExternalAddress`
}

export interface ExternalAddressFields {
  value: ToField<Bytes32>
}

export type ExternalAddressReified = Reified<ExternalAddress, ExternalAddressFields>

export type ExternalAddressJSONField = {
  value: ToJSON<Bytes32>
}

export type ExternalAddressJSON = {
  $typeName: typeof ExternalAddress.$typeName
  $typeArgs: []
} & ExternalAddressJSONField

/** Container for `Bytes32`. */
export class ExternalAddress implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::external_address::ExternalAddress` {
    return `${
      getTypeOrigin('wormhole', 'external_address::ExternalAddress')
    }::external_address::ExternalAddress` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof ExternalAddress.$typeName = ExternalAddress.$typeName
  readonly $fullTypeName: `${string}::external_address::ExternalAddress`
  readonly $typeArgs: []
  readonly $isPhantom: typeof ExternalAddress.$isPhantom = ExternalAddress.$isPhantom

  readonly value: ToField<Bytes32>

  private constructor(typeArgs: [], fields: ExternalAddressFields) {
    this.$fullTypeName = composeSuiType(
      ExternalAddress.$typeName,
      ...typeArgs,
    ) as `${string}::external_address::ExternalAddress`
    this.$typeArgs = typeArgs

    this.value = fields.value
  }

  static reified(): ExternalAddressReified {
    const reifiedBcs = ExternalAddress.bcs
    return {
      get typeName() {
        return ExternalAddress.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          ExternalAddress.$typeName,
          ...[],
        ) as `${string}::external_address::ExternalAddress`
      },
      typeArgs: [] as [],
      isPhantom: ExternalAddress.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ExternalAddress.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ExternalAddress.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ExternalAddress.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ExternalAddress.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ExternalAddress.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        ExternalAddress.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => ExternalAddress.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ExternalAddress.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => ExternalAddress.fetch(client, id),
      new: (fields: ExternalAddressFields) => {
        return new ExternalAddress([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): ExternalAddressReified {
    return ExternalAddress.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ExternalAddress>> {
    return phantom(ExternalAddress.reified())
  }

  static get p(): PhantomReified<ToTypeStr<ExternalAddress>> {
    return ExternalAddress.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ExternalAddress', {
      value: Bytes32.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof ExternalAddress.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof ExternalAddress.instantiateBcs> {
    if (!ExternalAddress.cachedBcs) {
      ExternalAddress.cachedBcs = ExternalAddress.instantiateBcs()
    }
    return ExternalAddress.cachedBcs
  }

  static fromFields(fields: Record<string, any>): ExternalAddress {
    return ExternalAddress.reified().new({
      value: decodeFromFields(Bytes32.reified(), fields.value),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ExternalAddress {
    if (!isExternalAddress(item.type)) {
      throw new Error('not a ExternalAddress type')
    }

    return ExternalAddress.reified().new({
      value: decodeFromFieldsWithTypes(Bytes32.reified(), item.fields.value),
    })
  }

  static fromBcs(data: Uint8Array): ExternalAddress {
    return ExternalAddress.fromFields(ExternalAddress.bcs.parse(data))
  }

  toJSONField(): ExternalAddressJSONField {
    return {
      value: this.value.toJSONField(),
    }
  }

  toJSON(): ExternalAddressJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ExternalAddress {
    return ExternalAddress.reified().new({
      value: decodeFromJSONField(Bytes32.reified(), field.value),
    })
  }

  static fromJSON(json: Record<string, any>): ExternalAddress {
    if (json.$typeName !== ExternalAddress.$typeName) {
      throw new Error(
        `not a ExternalAddress json object: expected '${ExternalAddress.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return ExternalAddress.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): ExternalAddress {
    if (!isExternalAddress(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a ExternalAddress object`)
    }
    return ExternalAddress.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ExternalAddress.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): ExternalAddress {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isExternalAddress(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ExternalAddress object`)
    }
    return ExternalAddress.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ExternalAddress.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): ExternalAddress {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isExternalAddress(data.bcs.type)) {
        throw new Error(`object at is not a ExternalAddress object`)
      }

      return ExternalAddress.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ExternalAddress.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<ExternalAddress> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isExternalAddress(object.type)) {
      throw new Error(`object at id ${id} is not a ExternalAddress object`)
    }
    return ExternalAddress.fromBcs(object.content)
  }
}
