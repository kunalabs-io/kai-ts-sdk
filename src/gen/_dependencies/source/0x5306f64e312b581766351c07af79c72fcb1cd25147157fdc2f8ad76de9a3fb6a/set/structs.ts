import * as reified from '../../../../_framework/reified'
import {
  PhantomReified,
  PhantomToTypeStr,
  PhantomTypeArgument,
  Reified,
  StructClass,
  ToField,
  ToPhantomTypeArgument,
  ToTypeStr,
  assertFieldsWithTypesArgsMatch,
  assertReifiedTypeArgsMatch,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  extractType,
  phantom,
  ToTypeStr as ToPhantom,
} from '../../../../_framework/reified'
import {
  FieldsWithTypes,
  composeSuiType,
  compressSuiType,
  parseTypeName,
} from '../../../../_framework/util'
import { Table } from '../../../../sui/table/structs'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== Empty =============================== */

export function isEmpty(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::set::Empty`
}

export interface EmptyFields {
  dummyField: ToField<'bool'>
}

export type EmptyReified = Reified<Empty, EmptyFields>

export class Empty implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::set::Empty`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = Empty.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::set::Empty`
  readonly $typeArgs: []
  readonly $isPhantom = Empty.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: EmptyFields) {
    this.$fullTypeName = composeSuiType(
      Empty.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::set::Empty`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): EmptyReified {
    const reifiedBcs = Empty.bcs
    return {
      typeName: Empty.$typeName,
      fullTypeName: composeSuiType(Empty.$typeName, ...[]) as `${typeof PKG_V1}::set::Empty`,
      typeArgs: [] as [],
      isPhantom: Empty.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Empty.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Empty.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Empty.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Empty.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Empty.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => Empty.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Empty.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => Empty.fetch(client, id),
      new: (fields: EmptyFields) => {
        return new Empty([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return Empty.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Empty>> {
    return phantom(Empty.reified())
  }
  static get p() {
    return Empty.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('Empty', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof Empty.instantiateBcs> | null = null

  static get bcs() {
    if (!Empty.cachedBcs) {
      Empty.cachedBcs = Empty.instantiateBcs()
    }
    return Empty.cachedBcs
  }

  static fromFields(fields: Record<string, any>): Empty {
    return Empty.reified().new({ dummyField: decodeFromFields('bool', fields.dummy_field) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Empty {
    if (!isEmpty(item.type)) {
      throw new Error('not a Empty type')
    }

    return Empty.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): Empty {
    return Empty.fromFields(Empty.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Empty {
    return Empty.reified().new({ dummyField: decodeFromJSONField('bool', field.dummyField) })
  }

  static fromJSON(json: Record<string, any>): Empty {
    if (json.$typeName !== Empty.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return Empty.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): Empty {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isEmpty(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Empty object`)
    }
    return Empty.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): Empty {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isEmpty(data.bcs.type)) {
        throw new Error(`object at is not a Empty object`)
      }

      return Empty.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Empty.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<Empty> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching Empty object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isEmpty(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Empty object`)
    }

    return Empty.fromSuiObjectData(res.data)
  }
}

/* ============================== Set =============================== */

export function isSet(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::set::Set` + '<')
}

export interface SetFields<T0 extends PhantomTypeArgument> {
  items: ToField<Table<T0, ToPhantom<Empty>>>
}

export type SetReified<T0 extends PhantomTypeArgument> = Reified<Set<T0>, SetFields<T0>>

export class Set<T0 extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::set::Set`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = Set.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::set::Set<${PhantomToTypeStr<T0>}>`
  readonly $typeArgs: [PhantomToTypeStr<T0>]
  readonly $isPhantom = Set.$isPhantom

  readonly items: ToField<Table<T0, ToPhantom<Empty>>>

  private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: SetFields<T0>) {
    this.$fullTypeName = composeSuiType(
      Set.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::set::Set<${PhantomToTypeStr<T0>}>`
    this.$typeArgs = typeArgs

    this.items = fields.items
  }

  static reified<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0
  ): SetReified<ToPhantomTypeArgument<T0>> {
    const reifiedBcs = Set.bcs
    return {
      typeName: Set.$typeName,
      fullTypeName: composeSuiType(
        Set.$typeName,
        ...[extractType(T0)]
      ) as `${typeof PKG_V1}::set::Set<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`,
      typeArgs: [extractType(T0)] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>],
      isPhantom: Set.$isPhantom,
      reifiedTypeArgs: [T0],
      fromFields: (fields: Record<string, any>) => Set.fromFields(T0, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Set.fromFieldsWithTypes(T0, item),
      fromBcs: (data: Uint8Array) => Set.fromFields(T0, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Set.fromJSONField(T0, field),
      fromJSON: (json: Record<string, any>) => Set.fromJSON(T0, json),
      fromSuiParsedData: (content: SuiParsedData) => Set.fromSuiParsedData(T0, content),
      fromSuiObjectData: (content: SuiObjectData) => Set.fromSuiObjectData(T0, content),
      fetch: async (client: SuiClient, id: string) => Set.fetch(client, T0, id),
      new: (fields: SetFields<ToPhantomTypeArgument<T0>>) => {
        return new Set([extractType(T0)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return Set.reified
  }

  static phantom<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0
  ): PhantomReified<ToTypeStr<Set<ToPhantomTypeArgument<T0>>>> {
    return phantom(Set.reified(T0))
  }
  static get p() {
    return Set.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('Set', {
      items: Table.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof Set.instantiateBcs> | null = null

  static get bcs() {
    if (!Set.cachedBcs) {
      Set.cachedBcs = Set.instantiateBcs()
    }
    return Set.cachedBcs
  }

  static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    fields: Record<string, any>
  ): Set<ToPhantomTypeArgument<T0>> {
    return Set.reified(typeArg).new({
      items: decodeFromFields(
        Table.reified(typeArg, reified.phantom(Empty.reified())),
        fields.items
      ),
    })
  }

  static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    item: FieldsWithTypes
  ): Set<ToPhantomTypeArgument<T0>> {
    if (!isSet(item.type)) {
      throw new Error('not a Set type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return Set.reified(typeArg).new({
      items: decodeFromFieldsWithTypes(
        Table.reified(typeArg, reified.phantom(Empty.reified())),
        item.fields.items
      ),
    })
  }

  static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: Uint8Array
  ): Set<ToPhantomTypeArgument<T0>> {
    return Set.fromFields(typeArg, Set.bcs.parse(data))
  }

  toJSONField() {
    return {
      items: this.items.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    field: any
  ): Set<ToPhantomTypeArgument<T0>> {
    return Set.reified(typeArg).new({
      items: decodeFromJSONField(
        Table.reified(typeArg, reified.phantom(Empty.reified())),
        field.items
      ),
    })
  }

  static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    json: Record<string, any>
  ): Set<ToPhantomTypeArgument<T0>> {
    if (json.$typeName !== Set.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(Set.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return Set.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    content: SuiParsedData
  ): Set<ToPhantomTypeArgument<T0>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isSet(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Set object`)
    }
    return Set.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: SuiObjectData
  ): Set<ToPhantomTypeArgument<T0>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isSet(data.bcs.type)) {
        throw new Error(`object at is not a Set object`)
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

      return Set.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Set.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T0,
    id: string
  ): Promise<Set<ToPhantomTypeArgument<T0>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching Set object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isSet(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Set object`)
    }

    return Set.fromSuiObjectData(typeArg, res.data)
  }
}
