import { bcs } from '@mysten/sui/bcs'
import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import type { SuiObjectData, SuiParsedData } from '@mysten/sui/jsonRpc'
import { fromBase64 } from '@mysten/sui/utils'
import { getTypeOrigin } from '../../../_envs'
import {
  assertFieldsWithTypesArgsMatch,
  assertReifiedTypeArgsMatch,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  extractType,
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
} from '../../../_framework/reified'
import {
  composeSuiType,
  compressSuiType,
  FieldsWithTypes,
  parseTypeName,
} from '../../../_framework/util'

/* ============================== WitnessGenerator =============================== */

export function isWitnessGenerator(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    `${getTypeOrigin('x', 'witness::WitnessGenerator')}::witness::WitnessGenerator` + '<',
  )
}

export interface WitnessGeneratorFields<T extends PhantomTypeArgument> {
  dummyField: ToField<'bool'>
}

export type WitnessGeneratorReified<T extends PhantomTypeArgument> = Reified<
  WitnessGenerator<T>,
  WitnessGeneratorFields<T>
>

export type WitnessGeneratorJSONField<T extends PhantomTypeArgument> = {
  dummyField: boolean
}

export type WitnessGeneratorJSON<T extends PhantomTypeArgument> = {
  $typeName: typeof WitnessGenerator.$typeName
  $typeArgs: [PhantomToTypeStr<T>]
} & WitnessGeneratorJSONField<T>

/** Witness generator */
export class WitnessGenerator<T extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::witness::WitnessGenerator` {
    return `${getTypeOrigin('x', 'witness::WitnessGenerator')}::witness::WitnessGenerator` as const
  }
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName: typeof WitnessGenerator.$typeName = WitnessGenerator.$typeName
  readonly $fullTypeName: `${string}::witness::WitnessGenerator<${PhantomToTypeStr<T>}>`
  readonly $typeArgs: [PhantomToTypeStr<T>]
  readonly $isPhantom: typeof WitnessGenerator.$isPhantom = WitnessGenerator.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [PhantomToTypeStr<T>], fields: WitnessGeneratorFields<T>) {
    this.$fullTypeName = composeSuiType(
      WitnessGenerator.$typeName,
      ...typeArgs,
    ) as `${string}::witness::WitnessGenerator<${PhantomToTypeStr<T>}>`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(
    T: T,
  ): WitnessGeneratorReified<ToPhantomTypeArgument<T>> {
    const reifiedBcs = WitnessGenerator.bcs
    return {
      get typeName() {
        return WitnessGenerator.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          WitnessGenerator.$typeName,
          ...[extractType(T)],
        ) as `${string}::witness::WitnessGenerator<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`
      },
      get typeArgs() {
        return [extractType(T)] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>]
      },
      isPhantom: WitnessGenerator.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) => WitnessGenerator.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => WitnessGenerator.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => WitnessGenerator.fromFields(T, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => WitnessGenerator.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => WitnessGenerator.fromJSON(T, json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        WitnessGenerator.fromCoreObject(T, obj),
      fromSuiParsedData: (content: SuiParsedData) => WitnessGenerator.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) => WitnessGenerator.fromSuiObjectData(T, content),
      fetch: async (client: ClientWithCoreApi, id: string) => WitnessGenerator.fetch(client, T, id),
      new: (fields: WitnessGeneratorFields<ToPhantomTypeArgument<T>>) => {
        return new WitnessGenerator([extractType(T)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof WitnessGenerator.reified {
    return WitnessGenerator.reified
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T,
  ): PhantomReified<ToTypeStr<WitnessGenerator<ToPhantomTypeArgument<T>>>> {
    return phantom(WitnessGenerator.reified(T))
  }

  static get p(): typeof WitnessGenerator.phantom {
    return WitnessGenerator.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('WitnessGenerator', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof WitnessGenerator.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof WitnessGenerator.instantiateBcs> {
    if (!WitnessGenerator.cachedBcs) {
      WitnessGenerator.cachedBcs = WitnessGenerator.instantiateBcs()
    }
    return WitnessGenerator.cachedBcs
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>,
  ): WitnessGenerator<ToPhantomTypeArgument<T>> {
    return WitnessGenerator.reified(typeArg).new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes,
  ): WitnessGenerator<ToPhantomTypeArgument<T>> {
    if (!isWitnessGenerator(item.type)) {
      throw new Error('not a WitnessGenerator type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return WitnessGenerator.reified(typeArg).new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: Uint8Array,
  ): WitnessGenerator<ToPhantomTypeArgument<T>> {
    return WitnessGenerator.fromFields(typeArg, WitnessGenerator.bcs.parse(data))
  }

  toJSONField(): WitnessGeneratorJSONField<T> {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): WitnessGeneratorJSON<T> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any,
  ): WitnessGenerator<ToPhantomTypeArgument<T>> {
    return WitnessGenerator.reified(typeArg).new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>,
  ): WitnessGenerator<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== WitnessGenerator.$typeName) {
      throw new Error(
        `not a WitnessGenerator json object: expected '${WitnessGenerator.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(WitnessGenerator.$typeName, ...[extractType(typeArg)]),
      json.$typeArgs,
      [typeArg],
    )

    return WitnessGenerator.fromJSONField(typeArg, json)
  }

  static fromCoreObject<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    obj: SuiClientTypes.Object<{ content: true }>,
  ): WitnessGenerator<ToPhantomTypeArgument<T>> {
    if (!isWitnessGenerator(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a WitnessGenerator object`)
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

    return WitnessGenerator.fromBcs(typeArg, obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link WitnessGenerator.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData,
  ): WitnessGenerator<ToPhantomTypeArgument<T>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isWitnessGenerator(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a WitnessGenerator object`)
    }
    return WitnessGenerator.fromFieldsWithTypes(typeArg, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link WitnessGenerator.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData,
  ): WitnessGenerator<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isWitnessGenerator(data.bcs.type)) {
        throw new Error(`object at is not a WitnessGenerator object`)
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

      return WitnessGenerator.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return WitnessGenerator.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: ClientWithCoreApi,
    typeArg: T,
    id: string,
  ): Promise<WitnessGenerator<ToPhantomTypeArgument<T>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isWitnessGenerator(object.type)) {
      throw new Error(`object at id ${id} is not a WitnessGenerator object`)
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

    return WitnessGenerator.fromBcs(typeArg, object.content)
  }
}

/* ============================== Witness =============================== */

export function isWitness(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${getTypeOrigin('x', 'witness::Witness')}::witness::Witness` + '<')
}

export interface WitnessFields<T extends PhantomTypeArgument> {
  dummyField: ToField<'bool'>
}

export type WitnessReified<T extends PhantomTypeArgument> = Reified<Witness<T>, WitnessFields<T>>

export type WitnessJSONField<T extends PhantomTypeArgument> = {
  dummyField: boolean
}

export type WitnessJSON<T extends PhantomTypeArgument> = {
  $typeName: typeof Witness.$typeName
  $typeArgs: [PhantomToTypeStr<T>]
} & WitnessJSONField<T>

/** Delegated witness of a generic type. The type `T` can be any type. */
export class Witness<T extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::witness::Witness` {
    return `${getTypeOrigin('x', 'witness::Witness')}::witness::Witness` as const
  }
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName: typeof Witness.$typeName = Witness.$typeName
  readonly $fullTypeName: `${string}::witness::Witness<${PhantomToTypeStr<T>}>`
  readonly $typeArgs: [PhantomToTypeStr<T>]
  readonly $isPhantom: typeof Witness.$isPhantom = Witness.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [PhantomToTypeStr<T>], fields: WitnessFields<T>) {
    this.$fullTypeName = composeSuiType(
      Witness.$typeName,
      ...typeArgs,
    ) as `${string}::witness::Witness<${PhantomToTypeStr<T>}>`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(
    T: T,
  ): WitnessReified<ToPhantomTypeArgument<T>> {
    const reifiedBcs = Witness.bcs
    return {
      get typeName() {
        return Witness.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          Witness.$typeName,
          ...[extractType(T)],
        ) as `${string}::witness::Witness<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`
      },
      get typeArgs() {
        return [extractType(T)] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>]
      },
      isPhantom: Witness.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) => Witness.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Witness.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => Witness.fromFields(T, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Witness.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => Witness.fromJSON(T, json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        Witness.fromCoreObject(T, obj),
      fromSuiParsedData: (content: SuiParsedData) => Witness.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) => Witness.fromSuiObjectData(T, content),
      fetch: async (client: ClientWithCoreApi, id: string) => Witness.fetch(client, T, id),
      new: (fields: WitnessFields<ToPhantomTypeArgument<T>>) => {
        return new Witness([extractType(T)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof Witness.reified {
    return Witness.reified
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T,
  ): PhantomReified<ToTypeStr<Witness<ToPhantomTypeArgument<T>>>> {
    return phantom(Witness.reified(T))
  }

  static get p(): typeof Witness.phantom {
    return Witness.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('Witness', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof Witness.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof Witness.instantiateBcs> {
    if (!Witness.cachedBcs) {
      Witness.cachedBcs = Witness.instantiateBcs()
    }
    return Witness.cachedBcs
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>,
  ): Witness<ToPhantomTypeArgument<T>> {
    return Witness.reified(typeArg).new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes,
  ): Witness<ToPhantomTypeArgument<T>> {
    if (!isWitness(item.type)) {
      throw new Error('not a Witness type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return Witness.reified(typeArg).new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: Uint8Array,
  ): Witness<ToPhantomTypeArgument<T>> {
    return Witness.fromFields(typeArg, Witness.bcs.parse(data))
  }

  toJSONField(): WitnessJSONField<T> {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): WitnessJSON<T> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any,
  ): Witness<ToPhantomTypeArgument<T>> {
    return Witness.reified(typeArg).new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>,
  ): Witness<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== Witness.$typeName) {
      throw new Error(
        `not a Witness json object: expected '${Witness.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(Witness.$typeName, ...[extractType(typeArg)]),
      json.$typeArgs,
      [typeArg],
    )

    return Witness.fromJSONField(typeArg, json)
  }

  static fromCoreObject<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    obj: SuiClientTypes.Object<{ content: true }>,
  ): Witness<ToPhantomTypeArgument<T>> {
    if (!isWitness(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a Witness object`)
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

    return Witness.fromBcs(typeArg, obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Witness.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData,
  ): Witness<ToPhantomTypeArgument<T>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isWitness(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Witness object`)
    }
    return Witness.fromFieldsWithTypes(typeArg, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Witness.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData,
  ): Witness<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isWitness(data.bcs.type)) {
        throw new Error(`object at is not a Witness object`)
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

      return Witness.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Witness.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: ClientWithCoreApi,
    typeArg: T,
    id: string,
  ): Promise<Witness<ToPhantomTypeArgument<T>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isWitness(object.type)) {
      throw new Error(`object at id ${id} is not a Witness object`)
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

    return Witness.fromBcs(typeArg, object.content)
  }
}
