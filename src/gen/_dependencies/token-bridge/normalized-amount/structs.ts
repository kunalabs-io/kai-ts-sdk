/**
 * This module implements a container that stores the token transfer amount
 * encoded in a Token Bridge message. These amounts are capped at 8 decimals.
 * This means that any amount of a coin whose metadata defines its decimals
 * as some value greater than 8, the encoded amount will be normalized to
 * eight decimals (which will lead to some residual amount after the transfer).
 * For inbound transfers, this amount will be denormalized (scaled by the same
 * decimal difference).
 */

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

/* ============================== NormalizedAmount =============================== */

export function isNormalizedAmount(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('token-bridge', 'normalized_amount::NormalizedAmount')
    }::normalized_amount::NormalizedAmount`
}

export interface NormalizedAmountFields {
  value: ToField<'u64'>
}

export type NormalizedAmountReified = Reified<NormalizedAmount, NormalizedAmountFields>

export type NormalizedAmountJSONField = {
  value: string
}

export type NormalizedAmountJSON = {
  $typeName: typeof NormalizedAmount.$typeName
  $typeArgs: []
} & NormalizedAmountJSONField

/** Container holding the value decoded from a Token Bridge transfer. */
export class NormalizedAmount implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::normalized_amount::NormalizedAmount` {
    return `${
      getTypeOrigin('token-bridge', 'normalized_amount::NormalizedAmount')
    }::normalized_amount::NormalizedAmount` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof NormalizedAmount.$typeName = NormalizedAmount.$typeName
  readonly $fullTypeName: `${string}::normalized_amount::NormalizedAmount`
  readonly $typeArgs: []
  readonly $isPhantom: typeof NormalizedAmount.$isPhantom = NormalizedAmount.$isPhantom

  readonly value: ToField<'u64'>

  private constructor(typeArgs: [], fields: NormalizedAmountFields) {
    this.$fullTypeName = composeSuiType(
      NormalizedAmount.$typeName,
      ...typeArgs,
    ) as `${string}::normalized_amount::NormalizedAmount`
    this.$typeArgs = typeArgs

    this.value = fields.value
  }

  static reified(): NormalizedAmountReified {
    const reifiedBcs = NormalizedAmount.bcs
    return {
      get typeName() {
        return NormalizedAmount.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          NormalizedAmount.$typeName,
          ...[],
        ) as `${string}::normalized_amount::NormalizedAmount`
      },
      typeArgs: [] as [],
      isPhantom: NormalizedAmount.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => NormalizedAmount.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => NormalizedAmount.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => NormalizedAmount.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => NormalizedAmount.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => NormalizedAmount.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        NormalizedAmount.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => NormalizedAmount.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => NormalizedAmount.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => NormalizedAmount.fetch(client, id),
      new: (fields: NormalizedAmountFields) => {
        return new NormalizedAmount([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): NormalizedAmountReified {
    return NormalizedAmount.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<NormalizedAmount>> {
    return phantom(NormalizedAmount.reified())
  }

  static get p(): PhantomReified<ToTypeStr<NormalizedAmount>> {
    return NormalizedAmount.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('NormalizedAmount', {
      value: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof NormalizedAmount.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof NormalizedAmount.instantiateBcs> {
    if (!NormalizedAmount.cachedBcs) {
      NormalizedAmount.cachedBcs = NormalizedAmount.instantiateBcs()
    }
    return NormalizedAmount.cachedBcs
  }

  static fromFields(fields: Record<string, any>): NormalizedAmount {
    return NormalizedAmount.reified().new({
      value: decodeFromFields('u64', fields.value),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): NormalizedAmount {
    if (!isNormalizedAmount(item.type)) {
      throw new Error('not a NormalizedAmount type')
    }

    return NormalizedAmount.reified().new({
      value: decodeFromFieldsWithTypes('u64', item.fields.value),
    })
  }

  static fromBcs(data: Uint8Array): NormalizedAmount {
    return NormalizedAmount.fromFields(NormalizedAmount.bcs.parse(data))
  }

  toJSONField(): NormalizedAmountJSONField {
    return {
      value: this.value.toString(),
    }
  }

  toJSON(): NormalizedAmountJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): NormalizedAmount {
    return NormalizedAmount.reified().new({
      value: decodeFromJSONField('u64', field.value),
    })
  }

  static fromJSON(json: Record<string, any>): NormalizedAmount {
    if (json.$typeName !== NormalizedAmount.$typeName) {
      throw new Error(
        `not a NormalizedAmount json object: expected '${NormalizedAmount.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return NormalizedAmount.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): NormalizedAmount {
    if (!isNormalizedAmount(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a NormalizedAmount object`)
    }
    return NormalizedAmount.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link NormalizedAmount.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): NormalizedAmount {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isNormalizedAmount(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a NormalizedAmount object`)
    }
    return NormalizedAmount.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link NormalizedAmount.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): NormalizedAmount {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isNormalizedAmount(data.bcs.type)) {
        throw new Error(`object at is not a NormalizedAmount object`)
      }

      return NormalizedAmount.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return NormalizedAmount.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<NormalizedAmount> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isNormalizedAmount(object.type)) {
      throw new Error(`object at id ${id} is not a NormalizedAmount object`)
    }
    return NormalizedAmount.fromBcs(object.content)
  }
}
