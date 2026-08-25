/**
 * Registry for forwarding addresses.
 *
 * A forwarding address is an off-chain-derived alias that forwards deposits to a
 * registered master address at resolution time. This module currently defines only the
 * singleton registry object; registration and resolution APIs are added in later steps.
 */

import { bcs } from '@mysten/sui/bcs'
import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import type { SuiObjectData, SuiParsedData } from '@mysten/sui/jsonRpc'
import { fromBase64 } from '@mysten/sui/utils'
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
import { UID } from '../object/structs'

/* ============================== ForwardingAddressRegistry =============================== */

export function isForwardingAddressRegistry(type: string): boolean {
  type = compressSuiType(type)
  return type === `0x2::forwarding_address::ForwardingAddressRegistry`
}

export interface ForwardingAddressRegistryFields {
  id: ToField<UID>
}

export type ForwardingAddressRegistryReified = Reified<
  ForwardingAddressRegistry,
  ForwardingAddressRegistryFields
>

export type ForwardingAddressRegistryJSONField = {
  id: string
}

export type ForwardingAddressRegistryJSON = {
  $typeName: typeof ForwardingAddressRegistry.$typeName
  $typeArgs: []
} & ForwardingAddressRegistryJSONField

/** Singleton shared object which will hold forwarding address registrations. */
export class ForwardingAddressRegistry implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `0x2::forwarding_address::ForwardingAddressRegistry` =
    `0x2::forwarding_address::ForwardingAddressRegistry` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof ForwardingAddressRegistry.$typeName =
    ForwardingAddressRegistry.$typeName
  readonly $fullTypeName: `0x2::forwarding_address::ForwardingAddressRegistry`
  readonly $typeArgs: []
  readonly $isPhantom: typeof ForwardingAddressRegistry.$isPhantom =
    ForwardingAddressRegistry.$isPhantom

  readonly id: ToField<UID>

  private constructor(typeArgs: [], fields: ForwardingAddressRegistryFields) {
    this.$fullTypeName = composeSuiType(
      ForwardingAddressRegistry.$typeName,
      ...typeArgs,
    ) as `0x2::forwarding_address::ForwardingAddressRegistry`
    this.$typeArgs = typeArgs

    this.id = fields.id
  }

  static reified(): ForwardingAddressRegistryReified {
    const reifiedBcs = ForwardingAddressRegistry.bcs
    return {
      get typeName() {
        return ForwardingAddressRegistry.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          ForwardingAddressRegistry.$typeName,
          ...[],
        ) as `0x2::forwarding_address::ForwardingAddressRegistry`
      },
      typeArgs: [] as [],
      isPhantom: ForwardingAddressRegistry.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ForwardingAddressRegistry.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        ForwardingAddressRegistry.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ForwardingAddressRegistry.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ForwardingAddressRegistry.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ForwardingAddressRegistry.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        ForwardingAddressRegistry.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        ForwardingAddressRegistry.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        ForwardingAddressRegistry.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        ForwardingAddressRegistry.fetch(client, id),
      new: (fields: ForwardingAddressRegistryFields) => {
        return new ForwardingAddressRegistry([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): ForwardingAddressRegistryReified {
    return ForwardingAddressRegistry.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ForwardingAddressRegistry>> {
    return phantom(ForwardingAddressRegistry.reified())
  }

  static get p(): PhantomReified<ToTypeStr<ForwardingAddressRegistry>> {
    return ForwardingAddressRegistry.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ForwardingAddressRegistry', {
      id: UID.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof ForwardingAddressRegistry.instantiateBcs> | null =
    null

  static get bcs(): ReturnType<typeof ForwardingAddressRegistry.instantiateBcs> {
    if (!ForwardingAddressRegistry.cachedBcs) {
      ForwardingAddressRegistry.cachedBcs = ForwardingAddressRegistry.instantiateBcs()
    }
    return ForwardingAddressRegistry.cachedBcs
  }

  static fromFields(fields: Record<string, any>): ForwardingAddressRegistry {
    return ForwardingAddressRegistry.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ForwardingAddressRegistry {
    if (!isForwardingAddressRegistry(item.type)) {
      throw new Error('not a ForwardingAddressRegistry type')
    }

    return ForwardingAddressRegistry.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
    })
  }

  static fromBcs(data: Uint8Array): ForwardingAddressRegistry {
    return ForwardingAddressRegistry.fromFields(ForwardingAddressRegistry.bcs.parse(data))
  }

  toJSONField(): ForwardingAddressRegistryJSONField {
    return {
      id: this.id,
    }
  }

  toJSON(): ForwardingAddressRegistryJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ForwardingAddressRegistry {
    return ForwardingAddressRegistry.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
    })
  }

  static fromJSON(json: Record<string, any>): ForwardingAddressRegistry {
    if (json.$typeName !== ForwardingAddressRegistry.$typeName) {
      throw new Error(
        `not a ForwardingAddressRegistry json object: expected '${ForwardingAddressRegistry.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return ForwardingAddressRegistry.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): ForwardingAddressRegistry {
    if (!isForwardingAddressRegistry(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a ForwardingAddressRegistry object`)
    }
    return ForwardingAddressRegistry.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ForwardingAddressRegistry.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): ForwardingAddressRegistry {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isForwardingAddressRegistry(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a ForwardingAddressRegistry object`,
      )
    }
    return ForwardingAddressRegistry.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ForwardingAddressRegistry.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): ForwardingAddressRegistry {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isForwardingAddressRegistry(data.bcs.type)) {
        throw new Error(`object at is not a ForwardingAddressRegistry object`)
      }

      return ForwardingAddressRegistry.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ForwardingAddressRegistry.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<ForwardingAddressRegistry> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isForwardingAddressRegistry(object.type)) {
      throw new Error(`object at id ${id} is not a ForwardingAddressRegistry object`)
    }
    return ForwardingAddressRegistry.fromBcs(object.content)
  }
}
