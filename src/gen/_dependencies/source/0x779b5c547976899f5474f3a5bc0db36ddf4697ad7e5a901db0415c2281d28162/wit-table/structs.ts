import * as reified from '../../../../_framework/reified'
import {
  PhantomReified,
  PhantomToTypeStr,
  PhantomTypeArgument,
  Reified,
  StructClass,
  ToField,
  ToPhantomTypeArgument,
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
  ToTypeStr as ToPhantom,
} from '../../../../_framework/reified'
import {
  FieldsWithTypes,
  composeSuiType,
  compressSuiType,
  parseTypeName,
} from '../../../../_framework/util'
import { Option } from '../../../../move-stdlib/option/structs'
import { UID } from '../../../../sui/object/structs'
import { Table } from '../../../../sui/table/structs'
import { VecSet } from '../../../../sui/vec-set/structs'
import { PKG_V1 } from '../index'
import { BcsType, bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== WitTable =============================== */

export function isWitTable(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::wit_table::WitTable` + '<')
}

export interface WitTableFields<
  T0 extends PhantomTypeArgument,
  T1 extends TypeArgument,
  T2 extends PhantomTypeArgument,
> {
  id: ToField<UID>
  table: ToField<Table<ToPhantom<T1>, T2>>
  keys: ToField<Option<VecSet<T1>>>
  withKeys: ToField<'bool'>
}

export type WitTableReified<
  T0 extends PhantomTypeArgument,
  T1 extends TypeArgument,
  T2 extends PhantomTypeArgument,
> = Reified<WitTable<T0, T1, T2>, WitTableFields<T0, T1, T2>>

export class WitTable<
  T0 extends PhantomTypeArgument,
  T1 extends TypeArgument,
  T2 extends PhantomTypeArgument,
> implements StructClass
{
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::wit_table::WitTable`
  static readonly $numTypeParams = 3
  static readonly $isPhantom = [true, false, true] as const

  readonly $typeName = WitTable.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::wit_table::WitTable<${PhantomToTypeStr<T0>}, ${ToTypeStr<T1>}, ${PhantomToTypeStr<T2>}>`
  readonly $typeArgs: [PhantomToTypeStr<T0>, ToTypeStr<T1>, PhantomToTypeStr<T2>]
  readonly $isPhantom = WitTable.$isPhantom

  readonly id: ToField<UID>
  readonly table: ToField<Table<ToPhantom<T1>, T2>>
  readonly keys: ToField<Option<VecSet<T1>>>
  readonly withKeys: ToField<'bool'>

  private constructor(
    typeArgs: [PhantomToTypeStr<T0>, ToTypeStr<T1>, PhantomToTypeStr<T2>],
    fields: WitTableFields<T0, T1, T2>
  ) {
    this.$fullTypeName = composeSuiType(
      WitTable.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::wit_table::WitTable<${PhantomToTypeStr<T0>}, ${ToTypeStr<T1>}, ${PhantomToTypeStr<T2>}>`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.table = fields.table
    this.keys = fields.keys
    this.withKeys = fields.withKeys
  }

  static reified<
    T0 extends PhantomReified<PhantomTypeArgument>,
    T1 extends Reified<TypeArgument, any>,
    T2 extends PhantomReified<PhantomTypeArgument>,
  >(
    T0: T0,
    T1: T1,
    T2: T2
  ): WitTableReified<ToPhantomTypeArgument<T0>, ToTypeArgument<T1>, ToPhantomTypeArgument<T2>> {
    return {
      typeName: WitTable.$typeName,
      fullTypeName: composeSuiType(
        WitTable.$typeName,
        ...[extractType(T0), extractType(T1), extractType(T2)]
      ) as `${typeof PKG_V1}::wit_table::WitTable<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}, ${ToTypeStr<ToTypeArgument<T1>>}, ${PhantomToTypeStr<ToPhantomTypeArgument<T2>>}>`,
      typeArgs: [extractType(T0), extractType(T1), extractType(T2)] as [
        PhantomToTypeStr<ToPhantomTypeArgument<T0>>,
        ToTypeStr<ToTypeArgument<T1>>,
        PhantomToTypeStr<ToPhantomTypeArgument<T2>>,
      ],
      isPhantom: WitTable.$isPhantom,
      reifiedTypeArgs: [T0, T1, T2],
      fromFields: (fields: Record<string, any>) => WitTable.fromFields([T0, T1, T2], fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        WitTable.fromFieldsWithTypes([T0, T1, T2], item),
      fromBcs: (data: Uint8Array) => WitTable.fromBcs([T0, T1, T2], data),
      bcs: WitTable.bcs(toBcs(T1)),
      fromJSONField: (field: any) => WitTable.fromJSONField([T0, T1, T2], field),
      fromJSON: (json: Record<string, any>) => WitTable.fromJSON([T0, T1, T2], json),
      fromSuiParsedData: (content: SuiParsedData) =>
        WitTable.fromSuiParsedData([T0, T1, T2], content),
      fromSuiObjectData: (content: SuiObjectData) =>
        WitTable.fromSuiObjectData([T0, T1, T2], content),
      fetch: async (client: SuiClient, id: string) => WitTable.fetch(client, [T0, T1, T2], id),
      new: (
        fields: WitTableFields<
          ToPhantomTypeArgument<T0>,
          ToTypeArgument<T1>,
          ToPhantomTypeArgument<T2>
        >
      ) => {
        return new WitTable([extractType(T0), extractType(T1), extractType(T2)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return WitTable.reified
  }

  static phantom<
    T0 extends PhantomReified<PhantomTypeArgument>,
    T1 extends Reified<TypeArgument, any>,
    T2 extends PhantomReified<PhantomTypeArgument>,
  >(
    T0: T0,
    T1: T1,
    T2: T2
  ): PhantomReified<
    ToTypeStr<WitTable<ToPhantomTypeArgument<T0>, ToTypeArgument<T1>, ToPhantomTypeArgument<T2>>>
  > {
    return phantom(WitTable.reified(T0, T1, T2))
  }
  static get p() {
    return WitTable.phantom
  }

  static get bcs() {
    return <T1 extends BcsType<any>>(T1: T1) =>
      bcs.struct(`WitTable<${T1.name}>`, {
        id: UID.bcs,
        table: Table.bcs,
        keys: Option.bcs(VecSet.bcs(T1)),
        with_keys: bcs.bool(),
      })
  }

  static fromFields<
    T0 extends PhantomReified<PhantomTypeArgument>,
    T1 extends Reified<TypeArgument, any>,
    T2 extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T0, T1, T2],
    fields: Record<string, any>
  ): WitTable<ToPhantomTypeArgument<T0>, ToTypeArgument<T1>, ToPhantomTypeArgument<T2>> {
    return WitTable.reified(typeArgs[0], typeArgs[1], typeArgs[2]).new({
      id: decodeFromFields(UID.reified(), fields.id),
      table: decodeFromFields(
        Table.reified(reified.phantom(typeArgs[1]), typeArgs[2]),
        fields.table
      ),
      keys: decodeFromFields(Option.reified(VecSet.reified(typeArgs[1])), fields.keys),
      withKeys: decodeFromFields('bool', fields.with_keys),
    })
  }

  static fromFieldsWithTypes<
    T0 extends PhantomReified<PhantomTypeArgument>,
    T1 extends Reified<TypeArgument, any>,
    T2 extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T0, T1, T2],
    item: FieldsWithTypes
  ): WitTable<ToPhantomTypeArgument<T0>, ToTypeArgument<T1>, ToPhantomTypeArgument<T2>> {
    if (!isWitTable(item.type)) {
      throw new Error('not a WitTable type')
    }
    assertFieldsWithTypesArgsMatch(item, typeArgs)

    return WitTable.reified(typeArgs[0], typeArgs[1], typeArgs[2]).new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      table: decodeFromFieldsWithTypes(
        Table.reified(reified.phantom(typeArgs[1]), typeArgs[2]),
        item.fields.table
      ),
      keys: decodeFromFieldsWithTypes(
        Option.reified(VecSet.reified(typeArgs[1])),
        item.fields.keys
      ),
      withKeys: decodeFromFieldsWithTypes('bool', item.fields.with_keys),
    })
  }

  static fromBcs<
    T0 extends PhantomReified<PhantomTypeArgument>,
    T1 extends Reified<TypeArgument, any>,
    T2 extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T0, T1, T2],
    data: Uint8Array
  ): WitTable<ToPhantomTypeArgument<T0>, ToTypeArgument<T1>, ToPhantomTypeArgument<T2>> {
    return WitTable.fromFields(typeArgs, WitTable.bcs(toBcs(typeArgs[1])).parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      table: this.table.toJSONField(),
      keys: fieldToJSON<Option<VecSet<T1>>>(
        `${Option.$typeName}<${VecSet.$typeName}<${this.$typeArgs[1]}>>`,
        this.keys
      ),
      withKeys: this.withKeys,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<
    T0 extends PhantomReified<PhantomTypeArgument>,
    T1 extends Reified<TypeArgument, any>,
    T2 extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T0, T1, T2],
    field: any
  ): WitTable<ToPhantomTypeArgument<T0>, ToTypeArgument<T1>, ToPhantomTypeArgument<T2>> {
    return WitTable.reified(typeArgs[0], typeArgs[1], typeArgs[2]).new({
      id: decodeFromJSONField(UID.reified(), field.id),
      table: decodeFromJSONField(
        Table.reified(reified.phantom(typeArgs[1]), typeArgs[2]),
        field.table
      ),
      keys: decodeFromJSONField(Option.reified(VecSet.reified(typeArgs[1])), field.keys),
      withKeys: decodeFromJSONField('bool', field.withKeys),
    })
  }

  static fromJSON<
    T0 extends PhantomReified<PhantomTypeArgument>,
    T1 extends Reified<TypeArgument, any>,
    T2 extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T0, T1, T2],
    json: Record<string, any>
  ): WitTable<ToPhantomTypeArgument<T0>, ToTypeArgument<T1>, ToPhantomTypeArgument<T2>> {
    if (json.$typeName !== WitTable.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(WitTable.$typeName, ...typeArgs.map(extractType)),
      json.$typeArgs,
      typeArgs
    )

    return WitTable.fromJSONField(typeArgs, json)
  }

  static fromSuiParsedData<
    T0 extends PhantomReified<PhantomTypeArgument>,
    T1 extends Reified<TypeArgument, any>,
    T2 extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T0, T1, T2],
    content: SuiParsedData
  ): WitTable<ToPhantomTypeArgument<T0>, ToTypeArgument<T1>, ToPhantomTypeArgument<T2>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isWitTable(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a WitTable object`)
    }
    return WitTable.fromFieldsWithTypes(typeArgs, content)
  }

  static fromSuiObjectData<
    T0 extends PhantomReified<PhantomTypeArgument>,
    T1 extends Reified<TypeArgument, any>,
    T2 extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T0, T1, T2],
    data: SuiObjectData
  ): WitTable<ToPhantomTypeArgument<T0>, ToTypeArgument<T1>, ToPhantomTypeArgument<T2>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isWitTable(data.bcs.type)) {
        throw new Error(`object at is not a WitTable object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 3) {
        throw new Error(
          `type argument mismatch: expected 3 type arguments but got ${gotTypeArgs.length}`
        )
      }
      for (let i = 0; i < 3; i++) {
        const gotTypeArg = compressSuiType(gotTypeArgs[i])
        const expectedTypeArg = compressSuiType(extractType(typeArgs[i]))
        if (gotTypeArg !== expectedTypeArg) {
          throw new Error(
            `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`
          )
        }
      }

      return WitTable.fromBcs(typeArgs, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return WitTable.fromSuiParsedData(typeArgs, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<
    T0 extends PhantomReified<PhantomTypeArgument>,
    T1 extends Reified<TypeArgument, any>,
    T2 extends PhantomReified<PhantomTypeArgument>,
  >(
    client: SuiClient,
    typeArgs: [T0, T1, T2],
    id: string
  ): Promise<WitTable<ToPhantomTypeArgument<T0>, ToTypeArgument<T1>, ToPhantomTypeArgument<T2>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching WitTable object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isWitTable(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a WitTable object`)
    }

    return WitTable.fromSuiObjectData(typeArgs, res.data)
  }
}
