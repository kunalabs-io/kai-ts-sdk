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
import { Ownership } from '../ownership/structs'
import { BcsType, bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== AcTable =============================== */

export function isAcTable(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::ac_table::AcTable` + '<')
}

export interface AcTableFields<
  T0 extends PhantomTypeArgument,
  T1 extends TypeArgument,
  T2 extends PhantomTypeArgument,
> {
  id: ToField<UID>
  table: ToField<Table<ToPhantom<T1>, T2>>
  keys: ToField<Option<VecSet<T1>>>
  withKeys: ToField<'bool'>
}

export type AcTableReified<
  T0 extends PhantomTypeArgument,
  T1 extends TypeArgument,
  T2 extends PhantomTypeArgument,
> = Reified<AcTable<T0, T1, T2>, AcTableFields<T0, T1, T2>>

export class AcTable<
  T0 extends PhantomTypeArgument,
  T1 extends TypeArgument,
  T2 extends PhantomTypeArgument,
> implements StructClass
{
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::ac_table::AcTable`
  static readonly $numTypeParams = 3
  static readonly $isPhantom = [true, false, true] as const

  readonly $typeName = AcTable.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::ac_table::AcTable<${PhantomToTypeStr<T0>}, ${ToTypeStr<T1>}, ${PhantomToTypeStr<T2>}>`
  readonly $typeArgs: [PhantomToTypeStr<T0>, ToTypeStr<T1>, PhantomToTypeStr<T2>]
  readonly $isPhantom = AcTable.$isPhantom

  readonly id: ToField<UID>
  readonly table: ToField<Table<ToPhantom<T1>, T2>>
  readonly keys: ToField<Option<VecSet<T1>>>
  readonly withKeys: ToField<'bool'>

  private constructor(
    typeArgs: [PhantomToTypeStr<T0>, ToTypeStr<T1>, PhantomToTypeStr<T2>],
    fields: AcTableFields<T0, T1, T2>
  ) {
    this.$fullTypeName = composeSuiType(
      AcTable.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::ac_table::AcTable<${PhantomToTypeStr<T0>}, ${ToTypeStr<T1>}, ${PhantomToTypeStr<T2>}>`
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
  ): AcTableReified<ToPhantomTypeArgument<T0>, ToTypeArgument<T1>, ToPhantomTypeArgument<T2>> {
    const reifiedBcs = AcTable.bcs(toBcs(T1))
    return {
      typeName: AcTable.$typeName,
      fullTypeName: composeSuiType(
        AcTable.$typeName,
        ...[extractType(T0), extractType(T1), extractType(T2)]
      ) as `${typeof PKG_V1}::ac_table::AcTable<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}, ${ToTypeStr<ToTypeArgument<T1>>}, ${PhantomToTypeStr<ToPhantomTypeArgument<T2>>}>`,
      typeArgs: [extractType(T0), extractType(T1), extractType(T2)] as [
        PhantomToTypeStr<ToPhantomTypeArgument<T0>>,
        ToTypeStr<ToTypeArgument<T1>>,
        PhantomToTypeStr<ToPhantomTypeArgument<T2>>,
      ],
      isPhantom: AcTable.$isPhantom,
      reifiedTypeArgs: [T0, T1, T2],
      fromFields: (fields: Record<string, any>) => AcTable.fromFields([T0, T1, T2], fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        AcTable.fromFieldsWithTypes([T0, T1, T2], item),
      fromBcs: (data: Uint8Array) => AcTable.fromFields([T0, T1, T2], reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AcTable.fromJSONField([T0, T1, T2], field),
      fromJSON: (json: Record<string, any>) => AcTable.fromJSON([T0, T1, T2], json),
      fromSuiParsedData: (content: SuiParsedData) =>
        AcTable.fromSuiParsedData([T0, T1, T2], content),
      fromSuiObjectData: (content: SuiObjectData) =>
        AcTable.fromSuiObjectData([T0, T1, T2], content),
      fetch: async (client: SuiClient, id: string) => AcTable.fetch(client, [T0, T1, T2], id),
      new: (
        fields: AcTableFields<
          ToPhantomTypeArgument<T0>,
          ToTypeArgument<T1>,
          ToPhantomTypeArgument<T2>
        >
      ) => {
        return new AcTable([extractType(T0), extractType(T1), extractType(T2)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return AcTable.reified
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
    ToTypeStr<AcTable<ToPhantomTypeArgument<T0>, ToTypeArgument<T1>, ToPhantomTypeArgument<T2>>>
  > {
    return phantom(AcTable.reified(T0, T1, T2))
  }
  static get p() {
    return AcTable.phantom
  }

  private static instantiateBcs() {
    return <T1 extends BcsType<any>>(T1: T1) =>
      bcs.struct(`AcTable<${T1.name}>`, {
        id: UID.bcs,
        table: Table.bcs,
        keys: Option.bcs(VecSet.bcs(T1)),
        with_keys: bcs.bool(),
      })
  }

  private static cachedBcs: ReturnType<typeof AcTable.instantiateBcs> | null = null

  static get bcs() {
    if (!AcTable.cachedBcs) {
      AcTable.cachedBcs = AcTable.instantiateBcs()
    }
    return AcTable.cachedBcs
  }

  static fromFields<
    T0 extends PhantomReified<PhantomTypeArgument>,
    T1 extends Reified<TypeArgument, any>,
    T2 extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T0, T1, T2],
    fields: Record<string, any>
  ): AcTable<ToPhantomTypeArgument<T0>, ToTypeArgument<T1>, ToPhantomTypeArgument<T2>> {
    return AcTable.reified(typeArgs[0], typeArgs[1], typeArgs[2]).new({
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
  ): AcTable<ToPhantomTypeArgument<T0>, ToTypeArgument<T1>, ToPhantomTypeArgument<T2>> {
    if (!isAcTable(item.type)) {
      throw new Error('not a AcTable type')
    }
    assertFieldsWithTypesArgsMatch(item, typeArgs)

    return AcTable.reified(typeArgs[0], typeArgs[1], typeArgs[2]).new({
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
  ): AcTable<ToPhantomTypeArgument<T0>, ToTypeArgument<T1>, ToPhantomTypeArgument<T2>> {
    return AcTable.fromFields(typeArgs, AcTable.bcs(toBcs(typeArgs[1])).parse(data))
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
  ): AcTable<ToPhantomTypeArgument<T0>, ToTypeArgument<T1>, ToPhantomTypeArgument<T2>> {
    return AcTable.reified(typeArgs[0], typeArgs[1], typeArgs[2]).new({
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
  ): AcTable<ToPhantomTypeArgument<T0>, ToTypeArgument<T1>, ToPhantomTypeArgument<T2>> {
    if (json.$typeName !== AcTable.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(AcTable.$typeName, ...typeArgs.map(extractType)),
      json.$typeArgs,
      typeArgs
    )

    return AcTable.fromJSONField(typeArgs, json)
  }

  static fromSuiParsedData<
    T0 extends PhantomReified<PhantomTypeArgument>,
    T1 extends Reified<TypeArgument, any>,
    T2 extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T0, T1, T2],
    content: SuiParsedData
  ): AcTable<ToPhantomTypeArgument<T0>, ToTypeArgument<T1>, ToPhantomTypeArgument<T2>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAcTable(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AcTable object`)
    }
    return AcTable.fromFieldsWithTypes(typeArgs, content)
  }

  static fromSuiObjectData<
    T0 extends PhantomReified<PhantomTypeArgument>,
    T1 extends Reified<TypeArgument, any>,
    T2 extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T0, T1, T2],
    data: SuiObjectData
  ): AcTable<ToPhantomTypeArgument<T0>, ToTypeArgument<T1>, ToPhantomTypeArgument<T2>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAcTable(data.bcs.type)) {
        throw new Error(`object at is not a AcTable object`)
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

      return AcTable.fromBcs(typeArgs, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AcTable.fromSuiParsedData(typeArgs, data.content)
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
  ): Promise<AcTable<ToPhantomTypeArgument<T0>, ToTypeArgument<T1>, ToPhantomTypeArgument<T2>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching AcTable object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isAcTable(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a AcTable object`)
    }

    return AcTable.fromSuiObjectData(typeArgs, res.data)
  }
}

/* ============================== AcTableOwnership =============================== */

export function isAcTableOwnership(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::ac_table::AcTableOwnership`
}

export interface AcTableOwnershipFields {
  dummyField: ToField<'bool'>
}

export type AcTableOwnershipReified = Reified<AcTableOwnership, AcTableOwnershipFields>

export class AcTableOwnership implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::ac_table::AcTableOwnership`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = AcTableOwnership.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::ac_table::AcTableOwnership`
  readonly $typeArgs: []
  readonly $isPhantom = AcTableOwnership.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: AcTableOwnershipFields) {
    this.$fullTypeName = composeSuiType(
      AcTableOwnership.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::ac_table::AcTableOwnership`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): AcTableOwnershipReified {
    const reifiedBcs = AcTableOwnership.bcs
    return {
      typeName: AcTableOwnership.$typeName,
      fullTypeName: composeSuiType(
        AcTableOwnership.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::ac_table::AcTableOwnership`,
      typeArgs: [] as [],
      isPhantom: AcTableOwnership.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AcTableOwnership.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AcTableOwnership.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AcTableOwnership.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AcTableOwnership.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AcTableOwnership.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => AcTableOwnership.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AcTableOwnership.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => AcTableOwnership.fetch(client, id),
      new: (fields: AcTableOwnershipFields) => {
        return new AcTableOwnership([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return AcTableOwnership.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AcTableOwnership>> {
    return phantom(AcTableOwnership.reified())
  }
  static get p() {
    return AcTableOwnership.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AcTableOwnership', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof AcTableOwnership.instantiateBcs> | null = null

  static get bcs() {
    if (!AcTableOwnership.cachedBcs) {
      AcTableOwnership.cachedBcs = AcTableOwnership.instantiateBcs()
    }
    return AcTableOwnership.cachedBcs
  }

  static fromFields(fields: Record<string, any>): AcTableOwnership {
    return AcTableOwnership.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): AcTableOwnership {
    if (!isAcTableOwnership(item.type)) {
      throw new Error('not a AcTableOwnership type')
    }

    return AcTableOwnership.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): AcTableOwnership {
    return AcTableOwnership.fromFields(AcTableOwnership.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AcTableOwnership {
    return AcTableOwnership.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): AcTableOwnership {
    if (json.$typeName !== AcTableOwnership.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return AcTableOwnership.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): AcTableOwnership {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAcTableOwnership(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AcTableOwnership object`)
    }
    return AcTableOwnership.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): AcTableOwnership {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAcTableOwnership(data.bcs.type)) {
        throw new Error(`object at is not a AcTableOwnership object`)
      }

      return AcTableOwnership.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AcTableOwnership.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<AcTableOwnership> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching AcTableOwnership object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isAcTableOwnership(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a AcTableOwnership object`)
    }

    return AcTableOwnership.fromSuiObjectData(res.data)
  }
}

/* ============================== AcTableCap =============================== */

export function isAcTableCap(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::ac_table::AcTableCap` + '<')
}

export interface AcTableCapFields<T0 extends PhantomTypeArgument> {
  id: ToField<UID>
  ownership: ToField<Ownership<ToPhantom<AcTableOwnership>>>
}

export type AcTableCapReified<T0 extends PhantomTypeArgument> = Reified<
  AcTableCap<T0>,
  AcTableCapFields<T0>
>

export class AcTableCap<T0 extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::ac_table::AcTableCap`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = AcTableCap.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::ac_table::AcTableCap<${PhantomToTypeStr<T0>}>`
  readonly $typeArgs: [PhantomToTypeStr<T0>]
  readonly $isPhantom = AcTableCap.$isPhantom

  readonly id: ToField<UID>
  readonly ownership: ToField<Ownership<ToPhantom<AcTableOwnership>>>

  private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: AcTableCapFields<T0>) {
    this.$fullTypeName = composeSuiType(
      AcTableCap.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::ac_table::AcTableCap<${PhantomToTypeStr<T0>}>`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.ownership = fields.ownership
  }

  static reified<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0
  ): AcTableCapReified<ToPhantomTypeArgument<T0>> {
    const reifiedBcs = AcTableCap.bcs
    return {
      typeName: AcTableCap.$typeName,
      fullTypeName: composeSuiType(
        AcTableCap.$typeName,
        ...[extractType(T0)]
      ) as `${typeof PKG_V1}::ac_table::AcTableCap<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`,
      typeArgs: [extractType(T0)] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>],
      isPhantom: AcTableCap.$isPhantom,
      reifiedTypeArgs: [T0],
      fromFields: (fields: Record<string, any>) => AcTableCap.fromFields(T0, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AcTableCap.fromFieldsWithTypes(T0, item),
      fromBcs: (data: Uint8Array) => AcTableCap.fromFields(T0, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AcTableCap.fromJSONField(T0, field),
      fromJSON: (json: Record<string, any>) => AcTableCap.fromJSON(T0, json),
      fromSuiParsedData: (content: SuiParsedData) => AcTableCap.fromSuiParsedData(T0, content),
      fromSuiObjectData: (content: SuiObjectData) => AcTableCap.fromSuiObjectData(T0, content),
      fetch: async (client: SuiClient, id: string) => AcTableCap.fetch(client, T0, id),
      new: (fields: AcTableCapFields<ToPhantomTypeArgument<T0>>) => {
        return new AcTableCap([extractType(T0)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return AcTableCap.reified
  }

  static phantom<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0
  ): PhantomReified<ToTypeStr<AcTableCap<ToPhantomTypeArgument<T0>>>> {
    return phantom(AcTableCap.reified(T0))
  }
  static get p() {
    return AcTableCap.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('AcTableCap', {
      id: UID.bcs,
      ownership: Ownership.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof AcTableCap.instantiateBcs> | null = null

  static get bcs() {
    if (!AcTableCap.cachedBcs) {
      AcTableCap.cachedBcs = AcTableCap.instantiateBcs()
    }
    return AcTableCap.cachedBcs
  }

  static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    fields: Record<string, any>
  ): AcTableCap<ToPhantomTypeArgument<T0>> {
    return AcTableCap.reified(typeArg).new({
      id: decodeFromFields(UID.reified(), fields.id),
      ownership: decodeFromFields(
        Ownership.reified(reified.phantom(AcTableOwnership.reified())),
        fields.ownership
      ),
    })
  }

  static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    item: FieldsWithTypes
  ): AcTableCap<ToPhantomTypeArgument<T0>> {
    if (!isAcTableCap(item.type)) {
      throw new Error('not a AcTableCap type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return AcTableCap.reified(typeArg).new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      ownership: decodeFromFieldsWithTypes(
        Ownership.reified(reified.phantom(AcTableOwnership.reified())),
        item.fields.ownership
      ),
    })
  }

  static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: Uint8Array
  ): AcTableCap<ToPhantomTypeArgument<T0>> {
    return AcTableCap.fromFields(typeArg, AcTableCap.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      ownership: this.ownership.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    field: any
  ): AcTableCap<ToPhantomTypeArgument<T0>> {
    return AcTableCap.reified(typeArg).new({
      id: decodeFromJSONField(UID.reified(), field.id),
      ownership: decodeFromJSONField(
        Ownership.reified(reified.phantom(AcTableOwnership.reified())),
        field.ownership
      ),
    })
  }

  static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    json: Record<string, any>
  ): AcTableCap<ToPhantomTypeArgument<T0>> {
    if (json.$typeName !== AcTableCap.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(AcTableCap.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return AcTableCap.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    content: SuiParsedData
  ): AcTableCap<ToPhantomTypeArgument<T0>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAcTableCap(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AcTableCap object`)
    }
    return AcTableCap.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: SuiObjectData
  ): AcTableCap<ToPhantomTypeArgument<T0>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAcTableCap(data.bcs.type)) {
        throw new Error(`object at is not a AcTableCap object`)
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

      return AcTableCap.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AcTableCap.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T0,
    id: string
  ): Promise<AcTableCap<ToPhantomTypeArgument<T0>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching AcTableCap object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isAcTableCap(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a AcTableCap object`)
    }

    return AcTableCap.fromSuiObjectData(typeArg, res.data)
  }
}
