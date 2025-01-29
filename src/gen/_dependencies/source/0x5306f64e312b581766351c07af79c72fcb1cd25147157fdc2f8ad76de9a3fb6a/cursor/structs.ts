import * as reified from '../../../../_framework/reified'
import {
  PhantomReified,
  Reified,
  StructClass,
  ToField,
  ToTypeArgument,
  ToTypeStr,
  TypeArgument,
  assertFieldsWithTypesArgsMatch,
  assertReifiedTypeArgsMatch,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  extractType,
  fieldToJSON,
  phantom,
  toBcs,
} from '../../../../_framework/reified'
import {
  FieldsWithTypes,
  composeSuiType,
  compressSuiType,
  parseTypeName,
} from '../../../../_framework/util'
import { Vector } from '../../../../_framework/vector'
import { PKG_V1 } from '../index'
import { BcsType, bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== Cursor =============================== */

export function isCursor(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::cursor::Cursor` + '<')
}

export interface CursorFields<T0 extends TypeArgument> {
  data: ToField<Vector<T0>>
}

export type CursorReified<T0 extends TypeArgument> = Reified<Cursor<T0>, CursorFields<T0>>

export class Cursor<T0 extends TypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::cursor::Cursor`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [false] as const

  readonly $typeName = Cursor.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::cursor::Cursor<${ToTypeStr<T0>}>`
  readonly $typeArgs: [ToTypeStr<T0>]
  readonly $isPhantom = Cursor.$isPhantom

  readonly data: ToField<Vector<T0>>

  private constructor(typeArgs: [ToTypeStr<T0>], fields: CursorFields<T0>) {
    this.$fullTypeName = composeSuiType(
      Cursor.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::cursor::Cursor<${ToTypeStr<T0>}>`
    this.$typeArgs = typeArgs

    this.data = fields.data
  }

  static reified<T0 extends Reified<TypeArgument, any>>(T0: T0): CursorReified<ToTypeArgument<T0>> {
    return {
      typeName: Cursor.$typeName,
      fullTypeName: composeSuiType(
        Cursor.$typeName,
        ...[extractType(T0)]
      ) as `${typeof PKG_V1}::cursor::Cursor<${ToTypeStr<ToTypeArgument<T0>>}>`,
      typeArgs: [extractType(T0)] as [ToTypeStr<ToTypeArgument<T0>>],
      isPhantom: Cursor.$isPhantom,
      reifiedTypeArgs: [T0],
      fromFields: (fields: Record<string, any>) => Cursor.fromFields(T0, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Cursor.fromFieldsWithTypes(T0, item),
      fromBcs: (data: Uint8Array) => Cursor.fromBcs(T0, data),
      bcs: Cursor.bcs(toBcs(T0)),
      fromJSONField: (field: any) => Cursor.fromJSONField(T0, field),
      fromJSON: (json: Record<string, any>) => Cursor.fromJSON(T0, json),
      fromSuiParsedData: (content: SuiParsedData) => Cursor.fromSuiParsedData(T0, content),
      fromSuiObjectData: (content: SuiObjectData) => Cursor.fromSuiObjectData(T0, content),
      fetch: async (client: SuiClient, id: string) => Cursor.fetch(client, T0, id),
      new: (fields: CursorFields<ToTypeArgument<T0>>) => {
        return new Cursor([extractType(T0)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return Cursor.reified
  }

  static phantom<T0 extends Reified<TypeArgument, any>>(
    T0: T0
  ): PhantomReified<ToTypeStr<Cursor<ToTypeArgument<T0>>>> {
    return phantom(Cursor.reified(T0))
  }
  static get p() {
    return Cursor.phantom
  }

  static get bcs() {
    return <T0 extends BcsType<any>>(T0: T0) =>
      bcs.struct(`Cursor<${T0.name}>`, {
        data: bcs.vector(T0),
      })
  }

  static fromFields<T0 extends Reified<TypeArgument, any>>(
    typeArg: T0,
    fields: Record<string, any>
  ): Cursor<ToTypeArgument<T0>> {
    return Cursor.reified(typeArg).new({
      data: decodeFromFields(reified.vector(typeArg), fields.data),
    })
  }

  static fromFieldsWithTypes<T0 extends Reified<TypeArgument, any>>(
    typeArg: T0,
    item: FieldsWithTypes
  ): Cursor<ToTypeArgument<T0>> {
    if (!isCursor(item.type)) {
      throw new Error('not a Cursor type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return Cursor.reified(typeArg).new({
      data: decodeFromFieldsWithTypes(reified.vector(typeArg), item.fields.data),
    })
  }

  static fromBcs<T0 extends Reified<TypeArgument, any>>(
    typeArg: T0,
    data: Uint8Array
  ): Cursor<ToTypeArgument<T0>> {
    const typeArgs = [typeArg]

    return Cursor.fromFields(typeArg, Cursor.bcs(toBcs(typeArgs[0])).parse(data))
  }

  toJSONField() {
    return {
      data: fieldToJSON<Vector<T0>>(`vector<${this.$typeArgs[0]}>`, this.data),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T0 extends Reified<TypeArgument, any>>(
    typeArg: T0,
    field: any
  ): Cursor<ToTypeArgument<T0>> {
    return Cursor.reified(typeArg).new({
      data: decodeFromJSONField(reified.vector(typeArg), field.data),
    })
  }

  static fromJSON<T0 extends Reified<TypeArgument, any>>(
    typeArg: T0,
    json: Record<string, any>
  ): Cursor<ToTypeArgument<T0>> {
    if (json.$typeName !== Cursor.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(Cursor.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return Cursor.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T0 extends Reified<TypeArgument, any>>(
    typeArg: T0,
    content: SuiParsedData
  ): Cursor<ToTypeArgument<T0>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isCursor(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Cursor object`)
    }
    return Cursor.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T0 extends Reified<TypeArgument, any>>(
    typeArg: T0,
    data: SuiObjectData
  ): Cursor<ToTypeArgument<T0>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isCursor(data.bcs.type)) {
        throw new Error(`object at is not a Cursor object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 1) {
        throw new Error(
          `type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`
        )
      }
      const gotTypeArg = compressSuiType(gotTypeArgs[0])
      const expectedTypeArg = compressSuiType(extractType(typeArg))
      if (gotTypeArg !== compressSuiType(extractType(typeArg))) {
        throw new Error(
          `type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`
        )
      }

      return Cursor.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Cursor.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<T0 extends Reified<TypeArgument, any>>(
    client: SuiClient,
    typeArg: T0,
    id: string
  ): Promise<Cursor<ToTypeArgument<T0>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching Cursor object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isCursor(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Cursor object`)
    }

    return Cursor.fromSuiObjectData(typeArg, res.data)
  }
}
