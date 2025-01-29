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
} from '../../_framework/reified'
import {
  FieldsWithTypes,
  composeSuiType,
  compressSuiType,
  parseTypeName,
} from '../../_framework/util'
import { TreasuryCap } from '../../sui/coin/structs'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== EquityRegistry =============================== */

export function isEquityRegistry(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::equity::EquityRegistry` + '<')
}

export interface EquityRegistryFields<T extends PhantomTypeArgument> {
  supplyX64: ToField<'u128'>
  underlyingValueX64: ToField<'u128'>
}

export type EquityRegistryReified<T extends PhantomTypeArgument> = Reified<
  EquityRegistry<T>,
  EquityRegistryFields<T>
>

export class EquityRegistry<T extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::equity::EquityRegistry`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = EquityRegistry.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::equity::EquityRegistry<${PhantomToTypeStr<T>}>`
  readonly $typeArgs: [PhantomToTypeStr<T>]
  readonly $isPhantom = EquityRegistry.$isPhantom

  readonly supplyX64: ToField<'u128'>
  readonly underlyingValueX64: ToField<'u128'>

  private constructor(typeArgs: [PhantomToTypeStr<T>], fields: EquityRegistryFields<T>) {
    this.$fullTypeName = composeSuiType(
      EquityRegistry.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::equity::EquityRegistry<${PhantomToTypeStr<T>}>`
    this.$typeArgs = typeArgs

    this.supplyX64 = fields.supplyX64
    this.underlyingValueX64 = fields.underlyingValueX64
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): EquityRegistryReified<ToPhantomTypeArgument<T>> {
    return {
      typeName: EquityRegistry.$typeName,
      fullTypeName: composeSuiType(
        EquityRegistry.$typeName,
        ...[extractType(T)]
      ) as `${typeof PKG_V1}::equity::EquityRegistry<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`,
      typeArgs: [extractType(T)] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>],
      isPhantom: EquityRegistry.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) => EquityRegistry.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => EquityRegistry.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => EquityRegistry.fromBcs(T, data),
      bcs: EquityRegistry.bcs,
      fromJSONField: (field: any) => EquityRegistry.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => EquityRegistry.fromJSON(T, json),
      fromSuiParsedData: (content: SuiParsedData) => EquityRegistry.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) => EquityRegistry.fromSuiObjectData(T, content),
      fetch: async (client: SuiClient, id: string) => EquityRegistry.fetch(client, T, id),
      new: (fields: EquityRegistryFields<ToPhantomTypeArgument<T>>) => {
        return new EquityRegistry([extractType(T)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return EquityRegistry.reified
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): PhantomReified<ToTypeStr<EquityRegistry<ToPhantomTypeArgument<T>>>> {
    return phantom(EquityRegistry.reified(T))
  }
  static get p() {
    return EquityRegistry.phantom
  }

  static get bcs() {
    return bcs.struct('EquityRegistry', {
      supply_x64: bcs.u128(),
      underlying_value_x64: bcs.u128(),
    })
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>
  ): EquityRegistry<ToPhantomTypeArgument<T>> {
    return EquityRegistry.reified(typeArg).new({
      supplyX64: decodeFromFields('u128', fields.supply_x64),
      underlyingValueX64: decodeFromFields('u128', fields.underlying_value_x64),
    })
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes
  ): EquityRegistry<ToPhantomTypeArgument<T>> {
    if (!isEquityRegistry(item.type)) {
      throw new Error('not a EquityRegistry type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return EquityRegistry.reified(typeArg).new({
      supplyX64: decodeFromFieldsWithTypes('u128', item.fields.supply_x64),
      underlyingValueX64: decodeFromFieldsWithTypes('u128', item.fields.underlying_value_x64),
    })
  }

  static fromBcs<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: Uint8Array
  ): EquityRegistry<ToPhantomTypeArgument<T>> {
    return EquityRegistry.fromFields(typeArg, EquityRegistry.bcs.parse(data))
  }

  toJSONField() {
    return {
      supplyX64: this.supplyX64.toString(),
      underlyingValueX64: this.underlyingValueX64.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any
  ): EquityRegistry<ToPhantomTypeArgument<T>> {
    return EquityRegistry.reified(typeArg).new({
      supplyX64: decodeFromJSONField('u128', field.supplyX64),
      underlyingValueX64: decodeFromJSONField('u128', field.underlyingValueX64),
    })
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>
  ): EquityRegistry<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== EquityRegistry.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(EquityRegistry.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return EquityRegistry.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData
  ): EquityRegistry<ToPhantomTypeArgument<T>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isEquityRegistry(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a EquityRegistry object`)
    }
    return EquityRegistry.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData
  ): EquityRegistry<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isEquityRegistry(data.bcs.type)) {
        throw new Error(`object at is not a EquityRegistry object`)
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

      return EquityRegistry.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return EquityRegistry.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T,
    id: string
  ): Promise<EquityRegistry<ToPhantomTypeArgument<T>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching EquityRegistry object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isEquityRegistry(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a EquityRegistry object`)
    }

    return EquityRegistry.fromSuiObjectData(typeArg, res.data)
  }
}

/* ============================== EquityShareBalance =============================== */

export function isEquityShareBalance(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::equity::EquityShareBalance` + '<')
}

export interface EquityShareBalanceFields<T extends PhantomTypeArgument> {
  valueX64: ToField<'u128'>
}

export type EquityShareBalanceReified<T extends PhantomTypeArgument> = Reified<
  EquityShareBalance<T>,
  EquityShareBalanceFields<T>
>

export class EquityShareBalance<T extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::equity::EquityShareBalance`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = EquityShareBalance.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::equity::EquityShareBalance<${PhantomToTypeStr<T>}>`
  readonly $typeArgs: [PhantomToTypeStr<T>]
  readonly $isPhantom = EquityShareBalance.$isPhantom

  readonly valueX64: ToField<'u128'>

  private constructor(typeArgs: [PhantomToTypeStr<T>], fields: EquityShareBalanceFields<T>) {
    this.$fullTypeName = composeSuiType(
      EquityShareBalance.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::equity::EquityShareBalance<${PhantomToTypeStr<T>}>`
    this.$typeArgs = typeArgs

    this.valueX64 = fields.valueX64
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): EquityShareBalanceReified<ToPhantomTypeArgument<T>> {
    return {
      typeName: EquityShareBalance.$typeName,
      fullTypeName: composeSuiType(
        EquityShareBalance.$typeName,
        ...[extractType(T)]
      ) as `${typeof PKG_V1}::equity::EquityShareBalance<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`,
      typeArgs: [extractType(T)] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>],
      isPhantom: EquityShareBalance.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) => EquityShareBalance.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        EquityShareBalance.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => EquityShareBalance.fromBcs(T, data),
      bcs: EquityShareBalance.bcs,
      fromJSONField: (field: any) => EquityShareBalance.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => EquityShareBalance.fromJSON(T, json),
      fromSuiParsedData: (content: SuiParsedData) =>
        EquityShareBalance.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) =>
        EquityShareBalance.fromSuiObjectData(T, content),
      fetch: async (client: SuiClient, id: string) => EquityShareBalance.fetch(client, T, id),
      new: (fields: EquityShareBalanceFields<ToPhantomTypeArgument<T>>) => {
        return new EquityShareBalance([extractType(T)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return EquityShareBalance.reified
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): PhantomReified<ToTypeStr<EquityShareBalance<ToPhantomTypeArgument<T>>>> {
    return phantom(EquityShareBalance.reified(T))
  }
  static get p() {
    return EquityShareBalance.phantom
  }

  static get bcs() {
    return bcs.struct('EquityShareBalance', {
      value_x64: bcs.u128(),
    })
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>
  ): EquityShareBalance<ToPhantomTypeArgument<T>> {
    return EquityShareBalance.reified(typeArg).new({
      valueX64: decodeFromFields('u128', fields.value_x64),
    })
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes
  ): EquityShareBalance<ToPhantomTypeArgument<T>> {
    if (!isEquityShareBalance(item.type)) {
      throw new Error('not a EquityShareBalance type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return EquityShareBalance.reified(typeArg).new({
      valueX64: decodeFromFieldsWithTypes('u128', item.fields.value_x64),
    })
  }

  static fromBcs<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: Uint8Array
  ): EquityShareBalance<ToPhantomTypeArgument<T>> {
    return EquityShareBalance.fromFields(typeArg, EquityShareBalance.bcs.parse(data))
  }

  toJSONField() {
    return {
      valueX64: this.valueX64.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any
  ): EquityShareBalance<ToPhantomTypeArgument<T>> {
    return EquityShareBalance.reified(typeArg).new({
      valueX64: decodeFromJSONField('u128', field.valueX64),
    })
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>
  ): EquityShareBalance<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== EquityShareBalance.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(EquityShareBalance.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return EquityShareBalance.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData
  ): EquityShareBalance<ToPhantomTypeArgument<T>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isEquityShareBalance(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a EquityShareBalance object`)
    }
    return EquityShareBalance.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData
  ): EquityShareBalance<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isEquityShareBalance(data.bcs.type)) {
        throw new Error(`object at is not a EquityShareBalance object`)
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

      return EquityShareBalance.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return EquityShareBalance.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T,
    id: string
  ): Promise<EquityShareBalance<ToPhantomTypeArgument<T>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching EquityShareBalance object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isEquityShareBalance(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a EquityShareBalance object`)
    }

    return EquityShareBalance.fromSuiObjectData(typeArg, res.data)
  }
}

/* ============================== EquityTreasury =============================== */

export function isEquityTreasury(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::equity::EquityTreasury` + '<')
}

export interface EquityTreasuryFields<T extends PhantomTypeArgument> {
  registry: ToField<EquityRegistry<T>>
  cap: ToField<TreasuryCap<T>>
}

export type EquityTreasuryReified<T extends PhantomTypeArgument> = Reified<
  EquityTreasury<T>,
  EquityTreasuryFields<T>
>

export class EquityTreasury<T extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::equity::EquityTreasury`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = EquityTreasury.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::equity::EquityTreasury<${PhantomToTypeStr<T>}>`
  readonly $typeArgs: [PhantomToTypeStr<T>]
  readonly $isPhantom = EquityTreasury.$isPhantom

  readonly registry: ToField<EquityRegistry<T>>
  readonly cap: ToField<TreasuryCap<T>>

  private constructor(typeArgs: [PhantomToTypeStr<T>], fields: EquityTreasuryFields<T>) {
    this.$fullTypeName = composeSuiType(
      EquityTreasury.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::equity::EquityTreasury<${PhantomToTypeStr<T>}>`
    this.$typeArgs = typeArgs

    this.registry = fields.registry
    this.cap = fields.cap
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): EquityTreasuryReified<ToPhantomTypeArgument<T>> {
    return {
      typeName: EquityTreasury.$typeName,
      fullTypeName: composeSuiType(
        EquityTreasury.$typeName,
        ...[extractType(T)]
      ) as `${typeof PKG_V1}::equity::EquityTreasury<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`,
      typeArgs: [extractType(T)] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>],
      isPhantom: EquityTreasury.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) => EquityTreasury.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => EquityTreasury.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => EquityTreasury.fromBcs(T, data),
      bcs: EquityTreasury.bcs,
      fromJSONField: (field: any) => EquityTreasury.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => EquityTreasury.fromJSON(T, json),
      fromSuiParsedData: (content: SuiParsedData) => EquityTreasury.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) => EquityTreasury.fromSuiObjectData(T, content),
      fetch: async (client: SuiClient, id: string) => EquityTreasury.fetch(client, T, id),
      new: (fields: EquityTreasuryFields<ToPhantomTypeArgument<T>>) => {
        return new EquityTreasury([extractType(T)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return EquityTreasury.reified
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): PhantomReified<ToTypeStr<EquityTreasury<ToPhantomTypeArgument<T>>>> {
    return phantom(EquityTreasury.reified(T))
  }
  static get p() {
    return EquityTreasury.phantom
  }

  static get bcs() {
    return bcs.struct('EquityTreasury', {
      registry: EquityRegistry.bcs,
      cap: TreasuryCap.bcs,
    })
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>
  ): EquityTreasury<ToPhantomTypeArgument<T>> {
    return EquityTreasury.reified(typeArg).new({
      registry: decodeFromFields(EquityRegistry.reified(typeArg), fields.registry),
      cap: decodeFromFields(TreasuryCap.reified(typeArg), fields.cap),
    })
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes
  ): EquityTreasury<ToPhantomTypeArgument<T>> {
    if (!isEquityTreasury(item.type)) {
      throw new Error('not a EquityTreasury type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return EquityTreasury.reified(typeArg).new({
      registry: decodeFromFieldsWithTypes(EquityRegistry.reified(typeArg), item.fields.registry),
      cap: decodeFromFieldsWithTypes(TreasuryCap.reified(typeArg), item.fields.cap),
    })
  }

  static fromBcs<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: Uint8Array
  ): EquityTreasury<ToPhantomTypeArgument<T>> {
    return EquityTreasury.fromFields(typeArg, EquityTreasury.bcs.parse(data))
  }

  toJSONField() {
    return {
      registry: this.registry.toJSONField(),
      cap: this.cap.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any
  ): EquityTreasury<ToPhantomTypeArgument<T>> {
    return EquityTreasury.reified(typeArg).new({
      registry: decodeFromJSONField(EquityRegistry.reified(typeArg), field.registry),
      cap: decodeFromJSONField(TreasuryCap.reified(typeArg), field.cap),
    })
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>
  ): EquityTreasury<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== EquityTreasury.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(EquityTreasury.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return EquityTreasury.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData
  ): EquityTreasury<ToPhantomTypeArgument<T>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isEquityTreasury(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a EquityTreasury object`)
    }
    return EquityTreasury.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData
  ): EquityTreasury<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isEquityTreasury(data.bcs.type)) {
        throw new Error(`object at is not a EquityTreasury object`)
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

      return EquityTreasury.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return EquityTreasury.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T,
    id: string
  ): Promise<EquityTreasury<ToPhantomTypeArgument<T>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching EquityTreasury object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isEquityTreasury(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a EquityTreasury object`)
    }

    return EquityTreasury.fromSuiObjectData(typeArg, res.data)
  }
}
