/**
 * Group operations of BLS12-381.
 * Only available in devnet.
 */

import { bcs } from '@mysten/sui/bcs'
import { SuiObjectData, SuiParsedData } from '@mysten/sui/client'
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
import {
  composeSuiType,
  compressSuiType,
  fetchObjectBcs,
  FieldsWithTypes,
  SupportedSuiClient,
} from '../../_framework/util'

/* ============================== Scalar =============================== */

export function isScalar(type: string): boolean {
  type = compressSuiType(type)
  return type === `0x2::ristretto255::Scalar`
}

export interface ScalarFields {
  dummyField: ToField<'bool'>
}

export type ScalarReified = Reified<Scalar, ScalarFields>

export type ScalarJSONField = {
  dummyField: boolean
}

export type ScalarJSON = {
  $typeName: typeof Scalar.$typeName
  $typeArgs: []
} & ScalarJSONField

export class Scalar implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `0x2::ristretto255::Scalar` = `0x2::ristretto255::Scalar` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof Scalar.$typeName = Scalar.$typeName
  readonly $fullTypeName: `0x2::ristretto255::Scalar`
  readonly $typeArgs: []
  readonly $isPhantom: typeof Scalar.$isPhantom = Scalar.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: ScalarFields) {
    this.$fullTypeName = composeSuiType(
      Scalar.$typeName,
      ...typeArgs,
    ) as `0x2::ristretto255::Scalar`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): ScalarReified {
    const reifiedBcs = Scalar.bcs
    return {
      typeName: Scalar.$typeName,
      fullTypeName: composeSuiType(
        Scalar.$typeName,
        ...[],
      ) as `0x2::ristretto255::Scalar`,
      typeArgs: [] as [],
      isPhantom: Scalar.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Scalar.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Scalar.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Scalar.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Scalar.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Scalar.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => Scalar.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Scalar.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => Scalar.fetch(client, id),
      new: (fields: ScalarFields) => {
        return new Scalar([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): ScalarReified {
    return Scalar.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Scalar>> {
    return phantom(Scalar.reified())
  }

  static get p(): PhantomReified<ToTypeStr<Scalar>> {
    return Scalar.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('Scalar', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof Scalar.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof Scalar.instantiateBcs> {
    if (!Scalar.cachedBcs) {
      Scalar.cachedBcs = Scalar.instantiateBcs()
    }
    return Scalar.cachedBcs
  }

  static fromFields(fields: Record<string, any>): Scalar {
    return Scalar.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Scalar {
    if (!isScalar(item.type)) {
      throw new Error('not a Scalar type')
    }

    return Scalar.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): Scalar {
    return Scalar.fromFields(Scalar.bcs.parse(data))
  }

  toJSONField(): ScalarJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): ScalarJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Scalar {
    return Scalar.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): Scalar {
    if (json.$typeName !== Scalar.$typeName) {
      throw new Error(
        `not a Scalar json object: expected '${Scalar.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return Scalar.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): Scalar {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isScalar(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Scalar object`)
    }
    return Scalar.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): Scalar {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isScalar(data.bcs.type)) {
        throw new Error(`object at is not a Scalar object`)
      }

      return Scalar.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Scalar.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<Scalar> {
    const res = await fetchObjectBcs(client, id)
    if (!isScalar(res.type)) {
      throw new Error(`object at id ${id} is not a Scalar object`)
    }

    return Scalar.fromBcs(res.bcsBytes)
  }
}

/* ============================== G =============================== */

export function isG(type: string): boolean {
  type = compressSuiType(type)
  return type === `0x2::ristretto255::G`
}

export interface GFields {
  dummyField: ToField<'bool'>
}

export type GReified = Reified<G, GFields>

export type GJSONField = {
  dummyField: boolean
}

export type GJSON = {
  $typeName: typeof G.$typeName
  $typeArgs: []
} & GJSONField

export class G implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `0x2::ristretto255::G` = `0x2::ristretto255::G` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof G.$typeName = G.$typeName
  readonly $fullTypeName: `0x2::ristretto255::G`
  readonly $typeArgs: []
  readonly $isPhantom: typeof G.$isPhantom = G.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: GFields) {
    this.$fullTypeName = composeSuiType(
      G.$typeName,
      ...typeArgs,
    ) as `0x2::ristretto255::G`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): GReified {
    const reifiedBcs = G.bcs
    return {
      typeName: G.$typeName,
      fullTypeName: composeSuiType(
        G.$typeName,
        ...[],
      ) as `0x2::ristretto255::G`,
      typeArgs: [] as [],
      isPhantom: G.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => G.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => G.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => G.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => G.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => G.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => G.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => G.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => G.fetch(client, id),
      new: (fields: GFields) => {
        return new G([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): GReified {
    return G.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<G>> {
    return phantom(G.reified())
  }

  static get p(): PhantomReified<ToTypeStr<G>> {
    return G.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('G', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof G.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof G.instantiateBcs> {
    if (!G.cachedBcs) {
      G.cachedBcs = G.instantiateBcs()
    }
    return G.cachedBcs
  }

  static fromFields(fields: Record<string, any>): G {
    return G.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): G {
    if (!isG(item.type)) {
      throw new Error('not a G type')
    }

    return G.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): G {
    return G.fromFields(G.bcs.parse(data))
  }

  toJSONField(): GJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): GJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): G {
    return G.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): G {
    if (json.$typeName !== G.$typeName) {
      throw new Error(`not a G json object: expected '${G.$typeName}' but got '${json.$typeName}'`)
    }

    return G.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): G {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isG(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a G object`)
    }
    return G.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): G {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isG(data.bcs.type)) {
        throw new Error(`object at is not a G object`)
      }

      return G.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return G.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<G> {
    const res = await fetchObjectBcs(client, id)
    if (!isG(res.type)) {
      throw new Error(`object at id ${id} is not a G object`)
    }

    return G.fromBcs(res.bcsBytes)
  }
}
