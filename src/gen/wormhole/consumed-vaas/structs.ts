import { bcs } from '@mysten/sui/bcs'
import { SuiObjectData, SuiParsedData } from '@mysten/sui/client'
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
import {
  composeSuiType,
  compressSuiType,
  fetchObjectBcs,
  FieldsWithTypes,
  SupportedSuiClient,
} from '../../_framework/util'
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

  static readonly $typeName: `${string}::consumed_vaas::ConsumedVAAs` = `${
    getTypeOrigin('wormhole', 'consumed_vaas::ConsumedVAAs')
  }::consumed_vaas::ConsumedVAAs` as const
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
      typeName: ConsumedVAAs.$typeName,
      fullTypeName: composeSuiType(
        ConsumedVAAs.$typeName,
        ...[],
      ) as `${string}::consumed_vaas::ConsumedVAAs`,
      typeArgs: [] as [],
      isPhantom: ConsumedVAAs.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ConsumedVAAs.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ConsumedVAAs.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ConsumedVAAs.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ConsumedVAAs.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ConsumedVAAs.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => ConsumedVAAs.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ConsumedVAAs.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => ConsumedVAAs.fetch(client, id),
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

  static fromSuiParsedData(content: SuiParsedData): ConsumedVAAs {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isConsumedVAAs(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ConsumedVAAs object`)
    }
    return ConsumedVAAs.fromFieldsWithTypes(content)
  }

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

  static async fetch(client: SupportedSuiClient, id: string): Promise<ConsumedVAAs> {
    const res = await fetchObjectBcs(client, id)
    if (!isConsumedVAAs(res.type)) {
      throw new Error(`object at id ${id} is not a ConsumedVAAs object`)
    }

    return ConsumedVAAs.fromBcs(res.bcsBytes)
  }
}
