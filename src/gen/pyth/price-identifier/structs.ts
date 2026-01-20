import { bcs } from '@mysten/sui/bcs'
import { SuiObjectData, SuiParsedData } from '@mysten/sui/client'
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
import {
  composeSuiType,
  compressSuiType,
  fetchObjectBcs,
  FieldsWithTypes,
  SupportedSuiClient,
} from '../../_framework/util'
import { Vector } from '../../_framework/vector'

/* ============================== PriceIdentifier =============================== */

export function isPriceIdentifier(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('pyth', 'price_identifier::PriceIdentifier')
    }::price_identifier::PriceIdentifier`
}

export interface PriceIdentifierFields {
  bytes: ToField<Vector<'u8'>>
}

export type PriceIdentifierReified = Reified<PriceIdentifier, PriceIdentifierFields>

export type PriceIdentifierJSONField = {
  bytes: number[]
}

export type PriceIdentifierJSON = {
  $typeName: typeof PriceIdentifier.$typeName
  $typeArgs: []
} & PriceIdentifierJSONField

export class PriceIdentifier implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::price_identifier::PriceIdentifier` = `${
    getTypeOrigin('pyth', 'price_identifier::PriceIdentifier')
  }::price_identifier::PriceIdentifier` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof PriceIdentifier.$typeName = PriceIdentifier.$typeName
  readonly $fullTypeName: `${string}::price_identifier::PriceIdentifier`
  readonly $typeArgs: []
  readonly $isPhantom: typeof PriceIdentifier.$isPhantom = PriceIdentifier.$isPhantom

  readonly bytes: ToField<Vector<'u8'>>

  private constructor(typeArgs: [], fields: PriceIdentifierFields) {
    this.$fullTypeName = composeSuiType(
      PriceIdentifier.$typeName,
      ...typeArgs,
    ) as `${string}::price_identifier::PriceIdentifier`
    this.$typeArgs = typeArgs

    this.bytes = fields.bytes
  }

  static reified(): PriceIdentifierReified {
    const reifiedBcs = PriceIdentifier.bcs
    return {
      typeName: PriceIdentifier.$typeName,
      fullTypeName: composeSuiType(
        PriceIdentifier.$typeName,
        ...[],
      ) as `${string}::price_identifier::PriceIdentifier`,
      typeArgs: [] as [],
      isPhantom: PriceIdentifier.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PriceIdentifier.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PriceIdentifier.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PriceIdentifier.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PriceIdentifier.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PriceIdentifier.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => PriceIdentifier.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PriceIdentifier.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => PriceIdentifier.fetch(client, id),
      new: (fields: PriceIdentifierFields) => {
        return new PriceIdentifier([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): PriceIdentifierReified {
    return PriceIdentifier.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PriceIdentifier>> {
    return phantom(PriceIdentifier.reified())
  }

  static get p(): PhantomReified<ToTypeStr<PriceIdentifier>> {
    return PriceIdentifier.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('PriceIdentifier', {
      bytes: bcs.vector(bcs.u8()),
    })
  }

  private static cachedBcs: ReturnType<typeof PriceIdentifier.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof PriceIdentifier.instantiateBcs> {
    if (!PriceIdentifier.cachedBcs) {
      PriceIdentifier.cachedBcs = PriceIdentifier.instantiateBcs()
    }
    return PriceIdentifier.cachedBcs
  }

  static fromFields(fields: Record<string, any>): PriceIdentifier {
    return PriceIdentifier.reified().new({
      bytes: decodeFromFields(vector('u8'), fields.bytes),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PriceIdentifier {
    if (!isPriceIdentifier(item.type)) {
      throw new Error('not a PriceIdentifier type')
    }

    return PriceIdentifier.reified().new({
      bytes: decodeFromFieldsWithTypes(vector('u8'), item.fields.bytes),
    })
  }

  static fromBcs(data: Uint8Array): PriceIdentifier {
    return PriceIdentifier.fromFields(PriceIdentifier.bcs.parse(data))
  }

  toJSONField(): PriceIdentifierJSONField {
    return {
      bytes: fieldToJSON<Vector<'u8'>>(`vector<u8>`, this.bytes),
    }
  }

  toJSON(): PriceIdentifierJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PriceIdentifier {
    return PriceIdentifier.reified().new({
      bytes: decodeFromJSONField(vector('u8'), field.bytes),
    })
  }

  static fromJSON(json: Record<string, any>): PriceIdentifier {
    if (json.$typeName !== PriceIdentifier.$typeName) {
      throw new Error(
        `not a PriceIdentifier json object: expected '${PriceIdentifier.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return PriceIdentifier.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): PriceIdentifier {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPriceIdentifier(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PriceIdentifier object`)
    }
    return PriceIdentifier.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): PriceIdentifier {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPriceIdentifier(data.bcs.type)) {
        throw new Error(`object at is not a PriceIdentifier object`)
      }

      return PriceIdentifier.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PriceIdentifier.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<PriceIdentifier> {
    const res = await fetchObjectBcs(client, id)
    if (!isPriceIdentifier(res.type)) {
      throw new Error(`object at id ${id} is not a PriceIdentifier object`)
    }

    return PriceIdentifier.fromBcs(res.bcsBytes)
  }
}
