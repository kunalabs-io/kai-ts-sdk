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
  ToTypeStr as ToPhantom,
} from '../../_framework/reified'
import { composeSuiType, compressSuiType, FieldsWithTypes } from '../../_framework/util'
import { Bytes32 } from '../bytes32/structs'
import { Set } from '../set/structs'

/* ============================== ConsumedVAAs =============================== */

export function isConsumedVAAs(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('wormhole', 'consumed_vaas::ConsumedVAAs')}::consumed_vaas::ConsumedVAAs`
}

export interface ConsumedVAAsFields {
  hashes: ToField<Set<ToPhantom<Bytes32>>>
}

export type ConsumedVAAsReified = Reified<ConsumedVAAs, ConsumedVAAsFields>

export type ConsumedVAAsJSONField = {
  hashes: ToJSON<Set<ToPhantom<Bytes32>>>
}

export type ConsumedVAAsJSON = {
  $typeName: typeof ConsumedVAAs.$typeName
  $typeArgs: []
} & ConsumedVAAsJSONField

/**
 * Container storing VAA hashes (digests). This will be checked against in
 * `parse_verify_and_consume` so a particular VAA cannot be replayed. It
 * is up to the integrator to have this container live in his contract
 * in order to take advantage of this no-replay protection. Or an
 * integrator can implement his own method to prevent replay.
 */
export class ConsumedVAAs implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::consumed_vaas::ConsumedVAAs` {
    return `${
      getTypeOrigin('wormhole', 'consumed_vaas::ConsumedVAAs')
    }::consumed_vaas::ConsumedVAAs` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof ConsumedVAAs.$typeName = ConsumedVAAs.$typeName
  readonly $fullTypeName: `${string}::consumed_vaas::ConsumedVAAs`
  readonly $typeArgs: []
  readonly $isPhantom: typeof ConsumedVAAs.$isPhantom = ConsumedVAAs.$isPhantom

  readonly hashes: ToField<Set<ToPhantom<Bytes32>>>

  private constructor(typeArgs: [], fields: ConsumedVAAsFields) {
    this.$fullTypeName = composeSuiType(
      ConsumedVAAs.$typeName,
      ...typeArgs,
    ) as `${string}::consumed_vaas::ConsumedVAAs`
    this.$typeArgs = typeArgs

    this.hashes = fields.hashes
  }

  static reified(): ConsumedVAAsReified {
    const reifiedBcs = ConsumedVAAs.bcs
    return {
      get typeName() {
        return ConsumedVAAs.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          ConsumedVAAs.$typeName,
          ...[],
        ) as `${string}::consumed_vaas::ConsumedVAAs`
      },
      typeArgs: [] as [],
      isPhantom: ConsumedVAAs.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ConsumedVAAs.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ConsumedVAAs.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ConsumedVAAs.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ConsumedVAAs.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ConsumedVAAs.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        ConsumedVAAs.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => ConsumedVAAs.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ConsumedVAAs.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => ConsumedVAAs.fetch(client, id),
      new: (fields: ConsumedVAAsFields) => {
        return new ConsumedVAAs([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): ConsumedVAAsReified {
    return ConsumedVAAs.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ConsumedVAAs>> {
    return phantom(ConsumedVAAs.reified())
  }

  static get p(): PhantomReified<ToTypeStr<ConsumedVAAs>> {
    return ConsumedVAAs.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ConsumedVAAs', {
      hashes: Set.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof ConsumedVAAs.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof ConsumedVAAs.instantiateBcs> {
    if (!ConsumedVAAs.cachedBcs) {
      ConsumedVAAs.cachedBcs = ConsumedVAAs.instantiateBcs()
    }
    return ConsumedVAAs.cachedBcs
  }

  static fromFields(fields: Record<string, any>): ConsumedVAAs {
    return ConsumedVAAs.reified().new({
      hashes: decodeFromFields(Set.reified(phantom(Bytes32.reified())), fields.hashes),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ConsumedVAAs {
    if (!isConsumedVAAs(item.type)) {
      throw new Error('not a ConsumedVAAs type')
    }

    return ConsumedVAAs.reified().new({
      hashes: decodeFromFieldsWithTypes(
        Set.reified(phantom(Bytes32.reified())),
        item.fields.hashes,
      ),
    })
  }

  static fromBcs(data: Uint8Array): ConsumedVAAs {
    return ConsumedVAAs.fromFields(ConsumedVAAs.bcs.parse(data))
  }

  toJSONField(): ConsumedVAAsJSONField {
    return {
      hashes: this.hashes.toJSONField(),
    }
  }

  toJSON(): ConsumedVAAsJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ConsumedVAAs {
    return ConsumedVAAs.reified().new({
      hashes: decodeFromJSONField(Set.reified(phantom(Bytes32.reified())), field.hashes),
    })
  }

  static fromJSON(json: Record<string, any>): ConsumedVAAs {
    if (json.$typeName !== ConsumedVAAs.$typeName) {
      throw new Error(
        `not a ConsumedVAAs json object: expected '${ConsumedVAAs.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return ConsumedVAAs.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): ConsumedVAAs {
    if (!isConsumedVAAs(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a ConsumedVAAs object`)
    }
    return ConsumedVAAs.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ConsumedVAAs.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): ConsumedVAAs {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isConsumedVAAs(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ConsumedVAAs object`)
    }
    return ConsumedVAAs.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ConsumedVAAs.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): ConsumedVAAs {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isConsumedVAAs(data.bcs.type)) {
        throw new Error(`object at is not a ConsumedVAAs object`)
      }

      return ConsumedVAAs.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ConsumedVAAs.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<ConsumedVAAs> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isConsumedVAAs(object.type)) {
      throw new Error(`object at id ${id} is not a ConsumedVAAs object`)
    }
    return ConsumedVAAs.fromBcs(object.content)
  }
}
