import { bcs } from '@mysten/sui/bcs'
import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import type { SuiObjectData, SuiParsedData } from '@mysten/sui/jsonRpc'
import { fromBase64 } from '@mysten/sui/utils'
import {
  assertFieldsWithTypesArgsMatch,
  assertReifiedTypeArgsMatch,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  extractType,
  fieldToJSON,
  phantom,
  PhantomReified,
  PhantomToTypeStr,
  PhantomTypeArgument,
  Reified,
  StructClass,
  ToField,
  ToJSON,
  ToPhantomTypeArgument,
  ToTypeStr,
} from '../../_framework/reified'
import {
  composeSuiType,
  compressSuiType,
  FieldsWithTypes,
  parseTypeName,
} from '../../_framework/util'
import { Option } from '../../std/option/structs'
import { String } from '../../std/string/structs'
import { ID, UID } from '../object/structs'
import { VecMap } from '../vec-map/structs'

/* ============================== DisplayRegistry =============================== */

export function isDisplayRegistry(type: string): boolean {
  type = compressSuiType(type)
  return type === `0x2::display_registry::DisplayRegistry`
}

export interface DisplayRegistryFields {
  id: ToField<UID>
}

export type DisplayRegistryReified = Reified<DisplayRegistry, DisplayRegistryFields>

export type DisplayRegistryJSONField = {
  id: string
}

export type DisplayRegistryJSON = {
  $typeName: typeof DisplayRegistry.$typeName
  $typeArgs: []
} & DisplayRegistryJSONField

/**
 * The root of display, to enable derivation of addresses.
 * The address is system-generated at `0xd`
 */
export class DisplayRegistry implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `0x2::display_registry::DisplayRegistry` =
    `0x2::display_registry::DisplayRegistry` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof DisplayRegistry.$typeName = DisplayRegistry.$typeName
  readonly $fullTypeName: `0x2::display_registry::DisplayRegistry`
  readonly $typeArgs: []
  readonly $isPhantom: typeof DisplayRegistry.$isPhantom = DisplayRegistry.$isPhantom

  readonly id: ToField<UID>

  private constructor(typeArgs: [], fields: DisplayRegistryFields) {
    this.$fullTypeName = composeSuiType(
      DisplayRegistry.$typeName,
      ...typeArgs,
    ) as `0x2::display_registry::DisplayRegistry`
    this.$typeArgs = typeArgs

    this.id = fields.id
  }

  static reified(): DisplayRegistryReified {
    const reifiedBcs = DisplayRegistry.bcs
    return {
      get typeName() {
        return DisplayRegistry.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          DisplayRegistry.$typeName,
          ...[],
        ) as `0x2::display_registry::DisplayRegistry`
      },
      typeArgs: [] as [],
      isPhantom: DisplayRegistry.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => DisplayRegistry.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => DisplayRegistry.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => DisplayRegistry.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => DisplayRegistry.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => DisplayRegistry.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        DisplayRegistry.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => DisplayRegistry.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => DisplayRegistry.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => DisplayRegistry.fetch(client, id),
      new: (fields: DisplayRegistryFields) => {
        return new DisplayRegistry([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): DisplayRegistryReified {
    return DisplayRegistry.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<DisplayRegistry>> {
    return phantom(DisplayRegistry.reified())
  }

  static get p(): PhantomReified<ToTypeStr<DisplayRegistry>> {
    return DisplayRegistry.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('DisplayRegistry', {
      id: UID.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof DisplayRegistry.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof DisplayRegistry.instantiateBcs> {
    if (!DisplayRegistry.cachedBcs) {
      DisplayRegistry.cachedBcs = DisplayRegistry.instantiateBcs()
    }
    return DisplayRegistry.cachedBcs
  }

  static fromFields(fields: Record<string, any>): DisplayRegistry {
    return DisplayRegistry.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): DisplayRegistry {
    if (!isDisplayRegistry(item.type)) {
      throw new Error('not a DisplayRegistry type')
    }

    return DisplayRegistry.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
    })
  }

  static fromBcs(data: Uint8Array): DisplayRegistry {
    return DisplayRegistry.fromFields(DisplayRegistry.bcs.parse(data))
  }

  toJSONField(): DisplayRegistryJSONField {
    return {
      id: this.id,
    }
  }

  toJSON(): DisplayRegistryJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): DisplayRegistry {
    return DisplayRegistry.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
    })
  }

  static fromJSON(json: Record<string, any>): DisplayRegistry {
    if (json.$typeName !== DisplayRegistry.$typeName) {
      throw new Error(
        `not a DisplayRegistry json object: expected '${DisplayRegistry.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return DisplayRegistry.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): DisplayRegistry {
    if (!isDisplayRegistry(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a DisplayRegistry object`)
    }
    return DisplayRegistry.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link DisplayRegistry.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): DisplayRegistry {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isDisplayRegistry(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a DisplayRegistry object`)
    }
    return DisplayRegistry.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link DisplayRegistry.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): DisplayRegistry {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isDisplayRegistry(data.bcs.type)) {
        throw new Error(`object at is not a DisplayRegistry object`)
      }

      return DisplayRegistry.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return DisplayRegistry.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<DisplayRegistry> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isDisplayRegistry(object.type)) {
      throw new Error(`object at id ${id} is not a DisplayRegistry object`)
    }
    return DisplayRegistry.fromBcs(object.content)
  }
}

/* ============================== SystemMigrationCap =============================== */

export function isSystemMigrationCap(type: string): boolean {
  type = compressSuiType(type)
  return type === `0x2::display_registry::SystemMigrationCap`
}

export interface SystemMigrationCapFields {
  id: ToField<UID>
}

export type SystemMigrationCapReified = Reified<SystemMigrationCap, SystemMigrationCapFields>

export type SystemMigrationCapJSONField = {
  id: string
}

export type SystemMigrationCapJSON = {
  $typeName: typeof SystemMigrationCap.$typeName
  $typeArgs: []
} & SystemMigrationCapJSONField

/** A singleton capability object to enable migrating all V1 displays into V2. */
export class SystemMigrationCap implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `0x2::display_registry::SystemMigrationCap` =
    `0x2::display_registry::SystemMigrationCap` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof SystemMigrationCap.$typeName = SystemMigrationCap.$typeName
  readonly $fullTypeName: `0x2::display_registry::SystemMigrationCap`
  readonly $typeArgs: []
  readonly $isPhantom: typeof SystemMigrationCap.$isPhantom = SystemMigrationCap.$isPhantom

  readonly id: ToField<UID>

  private constructor(typeArgs: [], fields: SystemMigrationCapFields) {
    this.$fullTypeName = composeSuiType(
      SystemMigrationCap.$typeName,
      ...typeArgs,
    ) as `0x2::display_registry::SystemMigrationCap`
    this.$typeArgs = typeArgs

    this.id = fields.id
  }

  static reified(): SystemMigrationCapReified {
    const reifiedBcs = SystemMigrationCap.bcs
    return {
      get typeName() {
        return SystemMigrationCap.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          SystemMigrationCap.$typeName,
          ...[],
        ) as `0x2::display_registry::SystemMigrationCap`
      },
      typeArgs: [] as [],
      isPhantom: SystemMigrationCap.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => SystemMigrationCap.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => SystemMigrationCap.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => SystemMigrationCap.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => SystemMigrationCap.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => SystemMigrationCap.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        SystemMigrationCap.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => SystemMigrationCap.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => SystemMigrationCap.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => SystemMigrationCap.fetch(client, id),
      new: (fields: SystemMigrationCapFields) => {
        return new SystemMigrationCap([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): SystemMigrationCapReified {
    return SystemMigrationCap.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<SystemMigrationCap>> {
    return phantom(SystemMigrationCap.reified())
  }

  static get p(): PhantomReified<ToTypeStr<SystemMigrationCap>> {
    return SystemMigrationCap.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('SystemMigrationCap', {
      id: UID.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof SystemMigrationCap.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof SystemMigrationCap.instantiateBcs> {
    if (!SystemMigrationCap.cachedBcs) {
      SystemMigrationCap.cachedBcs = SystemMigrationCap.instantiateBcs()
    }
    return SystemMigrationCap.cachedBcs
  }

  static fromFields(fields: Record<string, any>): SystemMigrationCap {
    return SystemMigrationCap.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): SystemMigrationCap {
    if (!isSystemMigrationCap(item.type)) {
      throw new Error('not a SystemMigrationCap type')
    }

    return SystemMigrationCap.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
    })
  }

  static fromBcs(data: Uint8Array): SystemMigrationCap {
    return SystemMigrationCap.fromFields(SystemMigrationCap.bcs.parse(data))
  }

  toJSONField(): SystemMigrationCapJSONField {
    return {
      id: this.id,
    }
  }

  toJSON(): SystemMigrationCapJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): SystemMigrationCap {
    return SystemMigrationCap.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
    })
  }

  static fromJSON(json: Record<string, any>): SystemMigrationCap {
    if (json.$typeName !== SystemMigrationCap.$typeName) {
      throw new Error(
        `not a SystemMigrationCap json object: expected '${SystemMigrationCap.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return SystemMigrationCap.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): SystemMigrationCap {
    if (!isSystemMigrationCap(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a SystemMigrationCap object`)
    }
    return SystemMigrationCap.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link SystemMigrationCap.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): SystemMigrationCap {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isSystemMigrationCap(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a SystemMigrationCap object`)
    }
    return SystemMigrationCap.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link SystemMigrationCap.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): SystemMigrationCap {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isSystemMigrationCap(data.bcs.type)) {
        throw new Error(`object at is not a SystemMigrationCap object`)
      }

      return SystemMigrationCap.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return SystemMigrationCap.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<SystemMigrationCap> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isSystemMigrationCap(object.type)) {
      throw new Error(`object at id ${id} is not a SystemMigrationCap object`)
    }
    return SystemMigrationCap.fromBcs(object.content)
  }
}

/* ============================== Display =============================== */

export function isDisplay(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`0x2::display_registry::Display` + '<')
}

export interface DisplayFields<T extends PhantomTypeArgument> {
  id: ToField<UID>
  /** All the (key,value) entries for a given display object. */
  fields: ToField<VecMap<String, String>>
  /** The capability object ID. It's `Option` because legacy Displays will need claiming. */
  capId: ToField<Option<ID>>
}

export type DisplayReified<T extends PhantomTypeArgument> = Reified<Display<T>, DisplayFields<T>>

export type DisplayJSONField<T extends PhantomTypeArgument> = {
  id: string
  fields: ToJSON<VecMap<String, String>>
  capId: string | null
}

export type DisplayJSON<T extends PhantomTypeArgument> = {
  $typeName: typeof Display.$typeName
  $typeArgs: [PhantomToTypeStr<T>]
} & DisplayJSONField<T>

/** This is the struct that holds the display values for a type T. */
export class Display<T extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `0x2::display_registry::Display` =
    `0x2::display_registry::Display` as const
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName: typeof Display.$typeName = Display.$typeName
  readonly $fullTypeName: `0x2::display_registry::Display<${PhantomToTypeStr<T>}>`
  readonly $typeArgs: [PhantomToTypeStr<T>]
  readonly $isPhantom: typeof Display.$isPhantom = Display.$isPhantom

  readonly id: ToField<UID>
  /** All the (key,value) entries for a given display object. */
  readonly fields: ToField<VecMap<String, String>>
  /** The capability object ID. It's `Option` because legacy Displays will need claiming. */
  readonly capId: ToField<Option<ID>>

  private constructor(typeArgs: [PhantomToTypeStr<T>], fields: DisplayFields<T>) {
    this.$fullTypeName = composeSuiType(
      Display.$typeName,
      ...typeArgs,
    ) as `0x2::display_registry::Display<${PhantomToTypeStr<T>}>`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.fields = fields.fields
    this.capId = fields.capId
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(
    T: T,
  ): DisplayReified<ToPhantomTypeArgument<T>> {
    const reifiedBcs = Display.bcs
    return {
      get typeName() {
        return Display.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          Display.$typeName,
          ...[extractType(T)],
        ) as `0x2::display_registry::Display<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`
      },
      get typeArgs() {
        return [extractType(T)] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>]
      },
      isPhantom: Display.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) => Display.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Display.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => Display.fromFields(T, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Display.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => Display.fromJSON(T, json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        Display.fromCoreObject(T, obj),
      fromSuiParsedData: (content: SuiParsedData) => Display.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) => Display.fromSuiObjectData(T, content),
      fetch: async (client: ClientWithCoreApi, id: string) => Display.fetch(client, T, id),
      new: (fields: DisplayFields<ToPhantomTypeArgument<T>>) => {
        return new Display([extractType(T)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof Display.reified {
    return Display.reified
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T,
  ): PhantomReified<ToTypeStr<Display<ToPhantomTypeArgument<T>>>> {
    return phantom(Display.reified(T))
  }

  static get p(): typeof Display.phantom {
    return Display.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('Display', {
      id: UID.bcs,
      fields: VecMap.bcs(String.bcs, String.bcs),
      cap_id: Option.bcs(ID.bcs),
    })
  }

  private static cachedBcs: ReturnType<typeof Display.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof Display.instantiateBcs> {
    if (!Display.cachedBcs) {
      Display.cachedBcs = Display.instantiateBcs()
    }
    return Display.cachedBcs
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>,
  ): Display<ToPhantomTypeArgument<T>> {
    return Display.reified(typeArg).new({
      id: decodeFromFields(UID.reified(), fields.id),
      fields: decodeFromFields(VecMap.reified(String.reified(), String.reified()), fields.fields),
      capId: decodeFromFields(Option.reified(ID.reified()), fields.cap_id),
    })
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes,
  ): Display<ToPhantomTypeArgument<T>> {
    if (!isDisplay(item.type)) {
      throw new Error('not a Display type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return Display.reified(typeArg).new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      fields: decodeFromFieldsWithTypes(
        VecMap.reified(String.reified(), String.reified()),
        item.fields.fields,
      ),
      capId: decodeFromFieldsWithTypes(Option.reified(ID.reified()), item.fields.cap_id),
    })
  }

  static fromBcs<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: Uint8Array,
  ): Display<ToPhantomTypeArgument<T>> {
    return Display.fromFields(typeArg, Display.bcs.parse(data))
  }

  toJSONField(): DisplayJSONField<T> {
    return {
      id: this.id,
      fields: this.fields.toJSONField(),
      capId: fieldToJSON<Option<ID>>(`${Option.$typeName}<${ID.$typeName}>`, this.capId),
    }
  }

  toJSON(): DisplayJSON<T> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any,
  ): Display<ToPhantomTypeArgument<T>> {
    return Display.reified(typeArg).new({
      id: decodeFromJSONField(UID.reified(), field.id),
      fields: decodeFromJSONField(VecMap.reified(String.reified(), String.reified()), field.fields),
      capId: decodeFromJSONField(Option.reified(ID.reified()), field.capId),
    })
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>,
  ): Display<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== Display.$typeName) {
      throw new Error(
        `not a Display json object: expected '${Display.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(Display.$typeName, ...[extractType(typeArg)]),
      json.$typeArgs,
      [typeArg],
    )

    return Display.fromJSONField(typeArg, json)
  }

  static fromCoreObject<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    obj: SuiClientTypes.Object<{ content: true }>,
  ): Display<ToPhantomTypeArgument<T>> {
    if (!isDisplay(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a Display object`)
    }

    const gotTypeArgs = parseTypeName(obj.type).typeArgs
    if (gotTypeArgs.length !== 1) {
      throw new Error(
        `type argument mismatch: expected 1 type arguments but got '${gotTypeArgs.length}'`,
      )
    }
    for (let i = 0; i < 1; i++) {
      const gotTypeArg = compressSuiType(gotTypeArgs[i])
      const expectedTypeArg = compressSuiType(extractType([typeArg][i]))
      if (gotTypeArg !== expectedTypeArg) {
        throw new Error(
          `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
        )
      }
    }

    return Display.fromBcs(typeArg, obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Display.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData,
  ): Display<ToPhantomTypeArgument<T>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isDisplay(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Display object`)
    }
    return Display.fromFieldsWithTypes(typeArg, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Display.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData,
  ): Display<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isDisplay(data.bcs.type)) {
        throw new Error(`object at is not a Display object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 1) {
        throw new Error(
          `type argument mismatch: expected 1 type arguments but got '${gotTypeArgs.length}'`,
        )
      }
      for (let i = 0; i < 1; i++) {
        const gotTypeArg = compressSuiType(gotTypeArgs[i])
        const expectedTypeArg = compressSuiType(extractType([typeArg][i]))
        if (gotTypeArg !== expectedTypeArg) {
          throw new Error(
            `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
          )
        }
      }

      return Display.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Display.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: ClientWithCoreApi,
    typeArg: T,
    id: string,
  ): Promise<Display<ToPhantomTypeArgument<T>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isDisplay(object.type)) {
      throw new Error(`object at id ${id} is not a Display object`)
    }

    const gotTypeArgs = parseTypeName(object.type).typeArgs
    if (gotTypeArgs.length !== 1) {
      throw new Error(
        `type argument mismatch: expected 1 type arguments but got '${gotTypeArgs.length}'`,
      )
    }
    for (let i = 0; i < 1; i++) {
      const gotTypeArg = compressSuiType(gotTypeArgs[i])
      const expectedTypeArg = compressSuiType(extractType([typeArg][i]))
      if (gotTypeArg !== expectedTypeArg) {
        throw new Error(
          `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
        )
      }
    }

    return Display.fromBcs(typeArg, object.content)
  }
}

/* ============================== DisplayCap =============================== */

export function isDisplayCap(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`0x2::display_registry::DisplayCap` + '<')
}

export interface DisplayCapFields<T extends PhantomTypeArgument> {
  id: ToField<UID>
}

export type DisplayCapReified<T extends PhantomTypeArgument> = Reified<
  DisplayCap<T>,
  DisplayCapFields<T>
>

export type DisplayCapJSONField<T extends PhantomTypeArgument> = {
  id: string
}

export type DisplayCapJSON<T extends PhantomTypeArgument> = {
  $typeName: typeof DisplayCap.$typeName
  $typeArgs: [PhantomToTypeStr<T>]
} & DisplayCapJSONField<T>

/** The capability object that is used to manage the display. */
export class DisplayCap<T extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `0x2::display_registry::DisplayCap` =
    `0x2::display_registry::DisplayCap` as const
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName: typeof DisplayCap.$typeName = DisplayCap.$typeName
  readonly $fullTypeName: `0x2::display_registry::DisplayCap<${PhantomToTypeStr<T>}>`
  readonly $typeArgs: [PhantomToTypeStr<T>]
  readonly $isPhantom: typeof DisplayCap.$isPhantom = DisplayCap.$isPhantom

  readonly id: ToField<UID>

  private constructor(typeArgs: [PhantomToTypeStr<T>], fields: DisplayCapFields<T>) {
    this.$fullTypeName = composeSuiType(
      DisplayCap.$typeName,
      ...typeArgs,
    ) as `0x2::display_registry::DisplayCap<${PhantomToTypeStr<T>}>`
    this.$typeArgs = typeArgs

    this.id = fields.id
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(
    T: T,
  ): DisplayCapReified<ToPhantomTypeArgument<T>> {
    const reifiedBcs = DisplayCap.bcs
    return {
      get typeName() {
        return DisplayCap.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          DisplayCap.$typeName,
          ...[extractType(T)],
        ) as `0x2::display_registry::DisplayCap<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`
      },
      get typeArgs() {
        return [extractType(T)] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>]
      },
      isPhantom: DisplayCap.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) => DisplayCap.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => DisplayCap.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => DisplayCap.fromFields(T, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => DisplayCap.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => DisplayCap.fromJSON(T, json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        DisplayCap.fromCoreObject(T, obj),
      fromSuiParsedData: (content: SuiParsedData) => DisplayCap.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) => DisplayCap.fromSuiObjectData(T, content),
      fetch: async (client: ClientWithCoreApi, id: string) => DisplayCap.fetch(client, T, id),
      new: (fields: DisplayCapFields<ToPhantomTypeArgument<T>>) => {
        return new DisplayCap([extractType(T)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof DisplayCap.reified {
    return DisplayCap.reified
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T,
  ): PhantomReified<ToTypeStr<DisplayCap<ToPhantomTypeArgument<T>>>> {
    return phantom(DisplayCap.reified(T))
  }

  static get p(): typeof DisplayCap.phantom {
    return DisplayCap.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('DisplayCap', {
      id: UID.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof DisplayCap.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof DisplayCap.instantiateBcs> {
    if (!DisplayCap.cachedBcs) {
      DisplayCap.cachedBcs = DisplayCap.instantiateBcs()
    }
    return DisplayCap.cachedBcs
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>,
  ): DisplayCap<ToPhantomTypeArgument<T>> {
    return DisplayCap.reified(typeArg).new({
      id: decodeFromFields(UID.reified(), fields.id),
    })
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes,
  ): DisplayCap<ToPhantomTypeArgument<T>> {
    if (!isDisplayCap(item.type)) {
      throw new Error('not a DisplayCap type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return DisplayCap.reified(typeArg).new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
    })
  }

  static fromBcs<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: Uint8Array,
  ): DisplayCap<ToPhantomTypeArgument<T>> {
    return DisplayCap.fromFields(typeArg, DisplayCap.bcs.parse(data))
  }

  toJSONField(): DisplayCapJSONField<T> {
    return {
      id: this.id,
    }
  }

  toJSON(): DisplayCapJSON<T> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any,
  ): DisplayCap<ToPhantomTypeArgument<T>> {
    return DisplayCap.reified(typeArg).new({
      id: decodeFromJSONField(UID.reified(), field.id),
    })
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>,
  ): DisplayCap<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== DisplayCap.$typeName) {
      throw new Error(
        `not a DisplayCap json object: expected '${DisplayCap.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(DisplayCap.$typeName, ...[extractType(typeArg)]),
      json.$typeArgs,
      [typeArg],
    )

    return DisplayCap.fromJSONField(typeArg, json)
  }

  static fromCoreObject<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    obj: SuiClientTypes.Object<{ content: true }>,
  ): DisplayCap<ToPhantomTypeArgument<T>> {
    if (!isDisplayCap(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a DisplayCap object`)
    }

    const gotTypeArgs = parseTypeName(obj.type).typeArgs
    if (gotTypeArgs.length !== 1) {
      throw new Error(
        `type argument mismatch: expected 1 type arguments but got '${gotTypeArgs.length}'`,
      )
    }
    for (let i = 0; i < 1; i++) {
      const gotTypeArg = compressSuiType(gotTypeArgs[i])
      const expectedTypeArg = compressSuiType(extractType([typeArg][i]))
      if (gotTypeArg !== expectedTypeArg) {
        throw new Error(
          `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
        )
      }
    }

    return DisplayCap.fromBcs(typeArg, obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link DisplayCap.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData,
  ): DisplayCap<ToPhantomTypeArgument<T>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isDisplayCap(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a DisplayCap object`)
    }
    return DisplayCap.fromFieldsWithTypes(typeArg, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link DisplayCap.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData,
  ): DisplayCap<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isDisplayCap(data.bcs.type)) {
        throw new Error(`object at is not a DisplayCap object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 1) {
        throw new Error(
          `type argument mismatch: expected 1 type arguments but got '${gotTypeArgs.length}'`,
        )
      }
      for (let i = 0; i < 1; i++) {
        const gotTypeArg = compressSuiType(gotTypeArgs[i])
        const expectedTypeArg = compressSuiType(extractType([typeArg][i]))
        if (gotTypeArg !== expectedTypeArg) {
          throw new Error(
            `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
          )
        }
      }

      return DisplayCap.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return DisplayCap.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: ClientWithCoreApi,
    typeArg: T,
    id: string,
  ): Promise<DisplayCap<ToPhantomTypeArgument<T>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isDisplayCap(object.type)) {
      throw new Error(`object at id ${id} is not a DisplayCap object`)
    }

    const gotTypeArgs = parseTypeName(object.type).typeArgs
    if (gotTypeArgs.length !== 1) {
      throw new Error(
        `type argument mismatch: expected 1 type arguments but got '${gotTypeArgs.length}'`,
      )
    }
    for (let i = 0; i < 1; i++) {
      const gotTypeArg = compressSuiType(gotTypeArgs[i])
      const expectedTypeArg = compressSuiType(extractType([typeArg][i]))
      if (gotTypeArg !== expectedTypeArg) {
        throw new Error(
          `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
        )
      }
    }

    return DisplayCap.fromBcs(typeArg, object.content)
  }
}

/* ============================== DisplayKey =============================== */

export function isDisplayKey(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`0x2::display_registry::DisplayKey` + '<')
}

export interface DisplayKeyFields<T extends PhantomTypeArgument> {
  dummyField: ToField<'bool'>
}

export type DisplayKeyReified<T extends PhantomTypeArgument> = Reified<
  DisplayKey<T>,
  DisplayKeyFields<T>
>

export type DisplayKeyJSONField<T extends PhantomTypeArgument> = {
  dummyField: boolean
}

export type DisplayKeyJSON<T extends PhantomTypeArgument> = {
  $typeName: typeof DisplayKey.$typeName
  $typeArgs: [PhantomToTypeStr<T>]
} & DisplayKeyJSONField<T>

/** The key used for deriving the instance of `Display`. */
export class DisplayKey<T extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `0x2::display_registry::DisplayKey` =
    `0x2::display_registry::DisplayKey` as const
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName: typeof DisplayKey.$typeName = DisplayKey.$typeName
  readonly $fullTypeName: `0x2::display_registry::DisplayKey<${PhantomToTypeStr<T>}>`
  readonly $typeArgs: [PhantomToTypeStr<T>]
  readonly $isPhantom: typeof DisplayKey.$isPhantom = DisplayKey.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [PhantomToTypeStr<T>], fields: DisplayKeyFields<T>) {
    this.$fullTypeName = composeSuiType(
      DisplayKey.$typeName,
      ...typeArgs,
    ) as `0x2::display_registry::DisplayKey<${PhantomToTypeStr<T>}>`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(
    T: T,
  ): DisplayKeyReified<ToPhantomTypeArgument<T>> {
    const reifiedBcs = DisplayKey.bcs
    return {
      get typeName() {
        return DisplayKey.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          DisplayKey.$typeName,
          ...[extractType(T)],
        ) as `0x2::display_registry::DisplayKey<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`
      },
      get typeArgs() {
        return [extractType(T)] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>]
      },
      isPhantom: DisplayKey.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) => DisplayKey.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => DisplayKey.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => DisplayKey.fromFields(T, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => DisplayKey.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => DisplayKey.fromJSON(T, json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        DisplayKey.fromCoreObject(T, obj),
      fromSuiParsedData: (content: SuiParsedData) => DisplayKey.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) => DisplayKey.fromSuiObjectData(T, content),
      fetch: async (client: ClientWithCoreApi, id: string) => DisplayKey.fetch(client, T, id),
      new: (fields: DisplayKeyFields<ToPhantomTypeArgument<T>>) => {
        return new DisplayKey([extractType(T)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof DisplayKey.reified {
    return DisplayKey.reified
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T,
  ): PhantomReified<ToTypeStr<DisplayKey<ToPhantomTypeArgument<T>>>> {
    return phantom(DisplayKey.reified(T))
  }

  static get p(): typeof DisplayKey.phantom {
    return DisplayKey.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('DisplayKey', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof DisplayKey.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof DisplayKey.instantiateBcs> {
    if (!DisplayKey.cachedBcs) {
      DisplayKey.cachedBcs = DisplayKey.instantiateBcs()
    }
    return DisplayKey.cachedBcs
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>,
  ): DisplayKey<ToPhantomTypeArgument<T>> {
    return DisplayKey.reified(typeArg).new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes,
  ): DisplayKey<ToPhantomTypeArgument<T>> {
    if (!isDisplayKey(item.type)) {
      throw new Error('not a DisplayKey type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return DisplayKey.reified(typeArg).new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: Uint8Array,
  ): DisplayKey<ToPhantomTypeArgument<T>> {
    return DisplayKey.fromFields(typeArg, DisplayKey.bcs.parse(data))
  }

  toJSONField(): DisplayKeyJSONField<T> {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): DisplayKeyJSON<T> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any,
  ): DisplayKey<ToPhantomTypeArgument<T>> {
    return DisplayKey.reified(typeArg).new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>,
  ): DisplayKey<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== DisplayKey.$typeName) {
      throw new Error(
        `not a DisplayKey json object: expected '${DisplayKey.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(DisplayKey.$typeName, ...[extractType(typeArg)]),
      json.$typeArgs,
      [typeArg],
    )

    return DisplayKey.fromJSONField(typeArg, json)
  }

  static fromCoreObject<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    obj: SuiClientTypes.Object<{ content: true }>,
  ): DisplayKey<ToPhantomTypeArgument<T>> {
    if (!isDisplayKey(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a DisplayKey object`)
    }

    const gotTypeArgs = parseTypeName(obj.type).typeArgs
    if (gotTypeArgs.length !== 1) {
      throw new Error(
        `type argument mismatch: expected 1 type arguments but got '${gotTypeArgs.length}'`,
      )
    }
    for (let i = 0; i < 1; i++) {
      const gotTypeArg = compressSuiType(gotTypeArgs[i])
      const expectedTypeArg = compressSuiType(extractType([typeArg][i]))
      if (gotTypeArg !== expectedTypeArg) {
        throw new Error(
          `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
        )
      }
    }

    return DisplayKey.fromBcs(typeArg, obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link DisplayKey.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData,
  ): DisplayKey<ToPhantomTypeArgument<T>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isDisplayKey(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a DisplayKey object`)
    }
    return DisplayKey.fromFieldsWithTypes(typeArg, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link DisplayKey.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData,
  ): DisplayKey<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isDisplayKey(data.bcs.type)) {
        throw new Error(`object at is not a DisplayKey object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 1) {
        throw new Error(
          `type argument mismatch: expected 1 type arguments but got '${gotTypeArgs.length}'`,
        )
      }
      for (let i = 0; i < 1; i++) {
        const gotTypeArg = compressSuiType(gotTypeArgs[i])
        const expectedTypeArg = compressSuiType(extractType([typeArg][i]))
        if (gotTypeArg !== expectedTypeArg) {
          throw new Error(
            `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
          )
        }
      }

      return DisplayKey.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return DisplayKey.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: ClientWithCoreApi,
    typeArg: T,
    id: string,
  ): Promise<DisplayKey<ToPhantomTypeArgument<T>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isDisplayKey(object.type)) {
      throw new Error(`object at id ${id} is not a DisplayKey object`)
    }

    const gotTypeArgs = parseTypeName(object.type).typeArgs
    if (gotTypeArgs.length !== 1) {
      throw new Error(
        `type argument mismatch: expected 1 type arguments but got '${gotTypeArgs.length}'`,
      )
    }
    for (let i = 0; i < 1; i++) {
      const gotTypeArg = compressSuiType(gotTypeArgs[i])
      const expectedTypeArg = compressSuiType(extractType([typeArg][i]))
      if (gotTypeArg !== expectedTypeArg) {
        throw new Error(
          `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
        )
      }
    }

    return DisplayKey.fromBcs(typeArg, object.content)
  }
}
