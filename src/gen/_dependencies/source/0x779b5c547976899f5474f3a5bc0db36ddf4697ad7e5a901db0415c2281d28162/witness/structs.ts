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
} from '../../../../_framework/reified'
import {
  FieldsWithTypes,
  composeSuiType,
  compressSuiType,
  parseTypeName,
} from '../../../../_framework/util'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== WitnessGenerator =============================== */

export function isWitnessGenerator(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::witness::WitnessGenerator` + '<')
}

export interface WitnessGeneratorFields<T0 extends PhantomTypeArgument> {
  dummyField: ToField<'bool'>
}

export type WitnessGeneratorReified<T0 extends PhantomTypeArgument> = Reified<
  WitnessGenerator<T0>,
  WitnessGeneratorFields<T0>
>

export class WitnessGenerator<T0 extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::witness::WitnessGenerator`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = WitnessGenerator.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::witness::WitnessGenerator<${PhantomToTypeStr<T0>}>`
  readonly $typeArgs: [PhantomToTypeStr<T0>]
  readonly $isPhantom = WitnessGenerator.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: WitnessGeneratorFields<T0>) {
    this.$fullTypeName = composeSuiType(
      WitnessGenerator.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::witness::WitnessGenerator<${PhantomToTypeStr<T0>}>`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0
  ): WitnessGeneratorReified<ToPhantomTypeArgument<T0>> {
    const reifiedBcs = WitnessGenerator.bcs
    return {
      typeName: WitnessGenerator.$typeName,
      fullTypeName: composeSuiType(
        WitnessGenerator.$typeName,
        ...[extractType(T0)]
      ) as `${typeof PKG_V1}::witness::WitnessGenerator<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`,
      typeArgs: [extractType(T0)] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>],
      isPhantom: WitnessGenerator.$isPhantom,
      reifiedTypeArgs: [T0],
      fromFields: (fields: Record<string, any>) => WitnessGenerator.fromFields(T0, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        WitnessGenerator.fromFieldsWithTypes(T0, item),
      fromBcs: (data: Uint8Array) => WitnessGenerator.fromFields(T0, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => WitnessGenerator.fromJSONField(T0, field),
      fromJSON: (json: Record<string, any>) => WitnessGenerator.fromJSON(T0, json),
      fromSuiParsedData: (content: SuiParsedData) =>
        WitnessGenerator.fromSuiParsedData(T0, content),
      fromSuiObjectData: (content: SuiObjectData) =>
        WitnessGenerator.fromSuiObjectData(T0, content),
      fetch: async (client: SuiClient, id: string) => WitnessGenerator.fetch(client, T0, id),
      new: (fields: WitnessGeneratorFields<ToPhantomTypeArgument<T0>>) => {
        return new WitnessGenerator([extractType(T0)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return WitnessGenerator.reified
  }

  static phantom<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0
  ): PhantomReified<ToTypeStr<WitnessGenerator<ToPhantomTypeArgument<T0>>>> {
    return phantom(WitnessGenerator.reified(T0))
  }
  static get p() {
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

  static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    fields: Record<string, any>
  ): WitnessGenerator<ToPhantomTypeArgument<T0>> {
    return WitnessGenerator.reified(typeArg).new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    item: FieldsWithTypes
  ): WitnessGenerator<ToPhantomTypeArgument<T0>> {
    if (!isWitnessGenerator(item.type)) {
      throw new Error('not a WitnessGenerator type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return WitnessGenerator.reified(typeArg).new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: Uint8Array
  ): WitnessGenerator<ToPhantomTypeArgument<T0>> {
    return WitnessGenerator.fromFields(typeArg, WitnessGenerator.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    field: any
  ): WitnessGenerator<ToPhantomTypeArgument<T0>> {
    return WitnessGenerator.reified(typeArg).new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    json: Record<string, any>
  ): WitnessGenerator<ToPhantomTypeArgument<T0>> {
    if (json.$typeName !== WitnessGenerator.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(WitnessGenerator.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return WitnessGenerator.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    content: SuiParsedData
  ): WitnessGenerator<ToPhantomTypeArgument<T0>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isWitnessGenerator(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a WitnessGenerator object`)
    }
    return WitnessGenerator.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: SuiObjectData
  ): WitnessGenerator<ToPhantomTypeArgument<T0>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isWitnessGenerator(data.bcs.type)) {
        throw new Error(`object at is not a WitnessGenerator object`)
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

      return WitnessGenerator.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return WitnessGenerator.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T0,
    id: string
  ): Promise<WitnessGenerator<ToPhantomTypeArgument<T0>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching WitnessGenerator object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isWitnessGenerator(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a WitnessGenerator object`)
    }

    return WitnessGenerator.fromSuiObjectData(typeArg, res.data)
  }
}

/* ============================== Witness =============================== */

export function isWitness(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::witness::Witness` + '<')
}

export interface WitnessFields<T0 extends PhantomTypeArgument> {
  dummyField: ToField<'bool'>
}

export type WitnessReified<T0 extends PhantomTypeArgument> = Reified<Witness<T0>, WitnessFields<T0>>

export class Witness<T0 extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::witness::Witness`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = Witness.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::witness::Witness<${PhantomToTypeStr<T0>}>`
  readonly $typeArgs: [PhantomToTypeStr<T0>]
  readonly $isPhantom = Witness.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: WitnessFields<T0>) {
    this.$fullTypeName = composeSuiType(
      Witness.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::witness::Witness<${PhantomToTypeStr<T0>}>`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0
  ): WitnessReified<ToPhantomTypeArgument<T0>> {
    const reifiedBcs = Witness.bcs
    return {
      typeName: Witness.$typeName,
      fullTypeName: composeSuiType(
        Witness.$typeName,
        ...[extractType(T0)]
      ) as `${typeof PKG_V1}::witness::Witness<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`,
      typeArgs: [extractType(T0)] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>],
      isPhantom: Witness.$isPhantom,
      reifiedTypeArgs: [T0],
      fromFields: (fields: Record<string, any>) => Witness.fromFields(T0, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Witness.fromFieldsWithTypes(T0, item),
      fromBcs: (data: Uint8Array) => Witness.fromFields(T0, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Witness.fromJSONField(T0, field),
      fromJSON: (json: Record<string, any>) => Witness.fromJSON(T0, json),
      fromSuiParsedData: (content: SuiParsedData) => Witness.fromSuiParsedData(T0, content),
      fromSuiObjectData: (content: SuiObjectData) => Witness.fromSuiObjectData(T0, content),
      fetch: async (client: SuiClient, id: string) => Witness.fetch(client, T0, id),
      new: (fields: WitnessFields<ToPhantomTypeArgument<T0>>) => {
        return new Witness([extractType(T0)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return Witness.reified
  }

  static phantom<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0
  ): PhantomReified<ToTypeStr<Witness<ToPhantomTypeArgument<T0>>>> {
    return phantom(Witness.reified(T0))
  }
  static get p() {
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

  static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    fields: Record<string, any>
  ): Witness<ToPhantomTypeArgument<T0>> {
    return Witness.reified(typeArg).new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    item: FieldsWithTypes
  ): Witness<ToPhantomTypeArgument<T0>> {
    if (!isWitness(item.type)) {
      throw new Error('not a Witness type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return Witness.reified(typeArg).new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: Uint8Array
  ): Witness<ToPhantomTypeArgument<T0>> {
    return Witness.fromFields(typeArg, Witness.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    field: any
  ): Witness<ToPhantomTypeArgument<T0>> {
    return Witness.reified(typeArg).new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    json: Record<string, any>
  ): Witness<ToPhantomTypeArgument<T0>> {
    if (json.$typeName !== Witness.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(Witness.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return Witness.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    content: SuiParsedData
  ): Witness<ToPhantomTypeArgument<T0>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isWitness(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Witness object`)
    }
    return Witness.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: SuiObjectData
  ): Witness<ToPhantomTypeArgument<T0>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isWitness(data.bcs.type)) {
        throw new Error(`object at is not a Witness object`)
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

      return Witness.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Witness.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T0,
    id: string
  ): Promise<Witness<ToPhantomTypeArgument<T0>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching Witness object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isWitness(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Witness object`)
    }

    return Witness.fromSuiObjectData(typeArg, res.data)
  }
}
