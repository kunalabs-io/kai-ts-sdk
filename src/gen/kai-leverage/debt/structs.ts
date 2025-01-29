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

/* ============================== DebtRegistry =============================== */

export function isDebtRegistry(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::debt::DebtRegistry` + '<')
}

export interface DebtRegistryFields<T extends PhantomTypeArgument> {
  supplyX64: ToField<'u128'>
  liabilityValueX64: ToField<'u128'>
}

export type DebtRegistryReified<T extends PhantomTypeArgument> = Reified<
  DebtRegistry<T>,
  DebtRegistryFields<T>
>

export class DebtRegistry<T extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::debt::DebtRegistry`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = DebtRegistry.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::debt::DebtRegistry<${PhantomToTypeStr<T>}>`
  readonly $typeArgs: [PhantomToTypeStr<T>]
  readonly $isPhantom = DebtRegistry.$isPhantom

  readonly supplyX64: ToField<'u128'>
  readonly liabilityValueX64: ToField<'u128'>

  private constructor(typeArgs: [PhantomToTypeStr<T>], fields: DebtRegistryFields<T>) {
    this.$fullTypeName = composeSuiType(
      DebtRegistry.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::debt::DebtRegistry<${PhantomToTypeStr<T>}>`
    this.$typeArgs = typeArgs

    this.supplyX64 = fields.supplyX64
    this.liabilityValueX64 = fields.liabilityValueX64
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): DebtRegistryReified<ToPhantomTypeArgument<T>> {
    return {
      typeName: DebtRegistry.$typeName,
      fullTypeName: composeSuiType(
        DebtRegistry.$typeName,
        ...[extractType(T)]
      ) as `${typeof PKG_V1}::debt::DebtRegistry<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`,
      typeArgs: [extractType(T)] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>],
      isPhantom: DebtRegistry.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) => DebtRegistry.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => DebtRegistry.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => DebtRegistry.fromBcs(T, data),
      bcs: DebtRegistry.bcs,
      fromJSONField: (field: any) => DebtRegistry.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => DebtRegistry.fromJSON(T, json),
      fromSuiParsedData: (content: SuiParsedData) => DebtRegistry.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) => DebtRegistry.fromSuiObjectData(T, content),
      fetch: async (client: SuiClient, id: string) => DebtRegistry.fetch(client, T, id),
      new: (fields: DebtRegistryFields<ToPhantomTypeArgument<T>>) => {
        return new DebtRegistry([extractType(T)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return DebtRegistry.reified
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): PhantomReified<ToTypeStr<DebtRegistry<ToPhantomTypeArgument<T>>>> {
    return phantom(DebtRegistry.reified(T))
  }
  static get p() {
    return DebtRegistry.phantom
  }

  static get bcs() {
    return bcs.struct('DebtRegistry', {
      supply_x64: bcs.u128(),
      liability_value_x64: bcs.u128(),
    })
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>
  ): DebtRegistry<ToPhantomTypeArgument<T>> {
    return DebtRegistry.reified(typeArg).new({
      supplyX64: decodeFromFields('u128', fields.supply_x64),
      liabilityValueX64: decodeFromFields('u128', fields.liability_value_x64),
    })
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes
  ): DebtRegistry<ToPhantomTypeArgument<T>> {
    if (!isDebtRegistry(item.type)) {
      throw new Error('not a DebtRegistry type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return DebtRegistry.reified(typeArg).new({
      supplyX64: decodeFromFieldsWithTypes('u128', item.fields.supply_x64),
      liabilityValueX64: decodeFromFieldsWithTypes('u128', item.fields.liability_value_x64),
    })
  }

  static fromBcs<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: Uint8Array
  ): DebtRegistry<ToPhantomTypeArgument<T>> {
    return DebtRegistry.fromFields(typeArg, DebtRegistry.bcs.parse(data))
  }

  toJSONField() {
    return {
      supplyX64: this.supplyX64.toString(),
      liabilityValueX64: this.liabilityValueX64.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any
  ): DebtRegistry<ToPhantomTypeArgument<T>> {
    return DebtRegistry.reified(typeArg).new({
      supplyX64: decodeFromJSONField('u128', field.supplyX64),
      liabilityValueX64: decodeFromJSONField('u128', field.liabilityValueX64),
    })
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>
  ): DebtRegistry<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== DebtRegistry.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(DebtRegistry.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return DebtRegistry.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData
  ): DebtRegistry<ToPhantomTypeArgument<T>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isDebtRegistry(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a DebtRegistry object`)
    }
    return DebtRegistry.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData
  ): DebtRegistry<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isDebtRegistry(data.bcs.type)) {
        throw new Error(`object at is not a DebtRegistry object`)
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

      return DebtRegistry.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return DebtRegistry.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T,
    id: string
  ): Promise<DebtRegistry<ToPhantomTypeArgument<T>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching DebtRegistry object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isDebtRegistry(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a DebtRegistry object`)
    }

    return DebtRegistry.fromSuiObjectData(typeArg, res.data)
  }
}

/* ============================== DebtShareBalance =============================== */

export function isDebtShareBalance(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::debt::DebtShareBalance` + '<')
}

export interface DebtShareBalanceFields<T extends PhantomTypeArgument> {
  valueX64: ToField<'u128'>
}

export type DebtShareBalanceReified<T extends PhantomTypeArgument> = Reified<
  DebtShareBalance<T>,
  DebtShareBalanceFields<T>
>

export class DebtShareBalance<T extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::debt::DebtShareBalance`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = DebtShareBalance.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::debt::DebtShareBalance<${PhantomToTypeStr<T>}>`
  readonly $typeArgs: [PhantomToTypeStr<T>]
  readonly $isPhantom = DebtShareBalance.$isPhantom

  readonly valueX64: ToField<'u128'>

  private constructor(typeArgs: [PhantomToTypeStr<T>], fields: DebtShareBalanceFields<T>) {
    this.$fullTypeName = composeSuiType(
      DebtShareBalance.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::debt::DebtShareBalance<${PhantomToTypeStr<T>}>`
    this.$typeArgs = typeArgs

    this.valueX64 = fields.valueX64
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): DebtShareBalanceReified<ToPhantomTypeArgument<T>> {
    return {
      typeName: DebtShareBalance.$typeName,
      fullTypeName: composeSuiType(
        DebtShareBalance.$typeName,
        ...[extractType(T)]
      ) as `${typeof PKG_V1}::debt::DebtShareBalance<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`,
      typeArgs: [extractType(T)] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>],
      isPhantom: DebtShareBalance.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) => DebtShareBalance.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => DebtShareBalance.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => DebtShareBalance.fromBcs(T, data),
      bcs: DebtShareBalance.bcs,
      fromJSONField: (field: any) => DebtShareBalance.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => DebtShareBalance.fromJSON(T, json),
      fromSuiParsedData: (content: SuiParsedData) => DebtShareBalance.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) => DebtShareBalance.fromSuiObjectData(T, content),
      fetch: async (client: SuiClient, id: string) => DebtShareBalance.fetch(client, T, id),
      new: (fields: DebtShareBalanceFields<ToPhantomTypeArgument<T>>) => {
        return new DebtShareBalance([extractType(T)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return DebtShareBalance.reified
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): PhantomReified<ToTypeStr<DebtShareBalance<ToPhantomTypeArgument<T>>>> {
    return phantom(DebtShareBalance.reified(T))
  }
  static get p() {
    return DebtShareBalance.phantom
  }

  static get bcs() {
    return bcs.struct('DebtShareBalance', {
      value_x64: bcs.u128(),
    })
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>
  ): DebtShareBalance<ToPhantomTypeArgument<T>> {
    return DebtShareBalance.reified(typeArg).new({
      valueX64: decodeFromFields('u128', fields.value_x64),
    })
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes
  ): DebtShareBalance<ToPhantomTypeArgument<T>> {
    if (!isDebtShareBalance(item.type)) {
      throw new Error('not a DebtShareBalance type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return DebtShareBalance.reified(typeArg).new({
      valueX64: decodeFromFieldsWithTypes('u128', item.fields.value_x64),
    })
  }

  static fromBcs<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: Uint8Array
  ): DebtShareBalance<ToPhantomTypeArgument<T>> {
    return DebtShareBalance.fromFields(typeArg, DebtShareBalance.bcs.parse(data))
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
  ): DebtShareBalance<ToPhantomTypeArgument<T>> {
    return DebtShareBalance.reified(typeArg).new({
      valueX64: decodeFromJSONField('u128', field.valueX64),
    })
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>
  ): DebtShareBalance<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== DebtShareBalance.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(DebtShareBalance.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return DebtShareBalance.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData
  ): DebtShareBalance<ToPhantomTypeArgument<T>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isDebtShareBalance(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a DebtShareBalance object`)
    }
    return DebtShareBalance.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData
  ): DebtShareBalance<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isDebtShareBalance(data.bcs.type)) {
        throw new Error(`object at is not a DebtShareBalance object`)
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

      return DebtShareBalance.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return DebtShareBalance.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T,
    id: string
  ): Promise<DebtShareBalance<ToPhantomTypeArgument<T>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching DebtShareBalance object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isDebtShareBalance(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a DebtShareBalance object`)
    }

    return DebtShareBalance.fromSuiObjectData(typeArg, res.data)
  }
}

/* ============================== DebtTreasury =============================== */

export function isDebtTreasury(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::debt::DebtTreasury` + '<')
}

export interface DebtTreasuryFields<T extends PhantomTypeArgument> {
  registry: ToField<DebtRegistry<T>>
  cap: ToField<TreasuryCap<T>>
}

export type DebtTreasuryReified<T extends PhantomTypeArgument> = Reified<
  DebtTreasury<T>,
  DebtTreasuryFields<T>
>

export class DebtTreasury<T extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::debt::DebtTreasury`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = DebtTreasury.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::debt::DebtTreasury<${PhantomToTypeStr<T>}>`
  readonly $typeArgs: [PhantomToTypeStr<T>]
  readonly $isPhantom = DebtTreasury.$isPhantom

  readonly registry: ToField<DebtRegistry<T>>
  readonly cap: ToField<TreasuryCap<T>>

  private constructor(typeArgs: [PhantomToTypeStr<T>], fields: DebtTreasuryFields<T>) {
    this.$fullTypeName = composeSuiType(
      DebtTreasury.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::debt::DebtTreasury<${PhantomToTypeStr<T>}>`
    this.$typeArgs = typeArgs

    this.registry = fields.registry
    this.cap = fields.cap
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): DebtTreasuryReified<ToPhantomTypeArgument<T>> {
    return {
      typeName: DebtTreasury.$typeName,
      fullTypeName: composeSuiType(
        DebtTreasury.$typeName,
        ...[extractType(T)]
      ) as `${typeof PKG_V1}::debt::DebtTreasury<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`,
      typeArgs: [extractType(T)] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>],
      isPhantom: DebtTreasury.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) => DebtTreasury.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => DebtTreasury.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => DebtTreasury.fromBcs(T, data),
      bcs: DebtTreasury.bcs,
      fromJSONField: (field: any) => DebtTreasury.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => DebtTreasury.fromJSON(T, json),
      fromSuiParsedData: (content: SuiParsedData) => DebtTreasury.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) => DebtTreasury.fromSuiObjectData(T, content),
      fetch: async (client: SuiClient, id: string) => DebtTreasury.fetch(client, T, id),
      new: (fields: DebtTreasuryFields<ToPhantomTypeArgument<T>>) => {
        return new DebtTreasury([extractType(T)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return DebtTreasury.reified
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): PhantomReified<ToTypeStr<DebtTreasury<ToPhantomTypeArgument<T>>>> {
    return phantom(DebtTreasury.reified(T))
  }
  static get p() {
    return DebtTreasury.phantom
  }

  static get bcs() {
    return bcs.struct('DebtTreasury', {
      registry: DebtRegistry.bcs,
      cap: TreasuryCap.bcs,
    })
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>
  ): DebtTreasury<ToPhantomTypeArgument<T>> {
    return DebtTreasury.reified(typeArg).new({
      registry: decodeFromFields(DebtRegistry.reified(typeArg), fields.registry),
      cap: decodeFromFields(TreasuryCap.reified(typeArg), fields.cap),
    })
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes
  ): DebtTreasury<ToPhantomTypeArgument<T>> {
    if (!isDebtTreasury(item.type)) {
      throw new Error('not a DebtTreasury type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return DebtTreasury.reified(typeArg).new({
      registry: decodeFromFieldsWithTypes(DebtRegistry.reified(typeArg), item.fields.registry),
      cap: decodeFromFieldsWithTypes(TreasuryCap.reified(typeArg), item.fields.cap),
    })
  }

  static fromBcs<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: Uint8Array
  ): DebtTreasury<ToPhantomTypeArgument<T>> {
    return DebtTreasury.fromFields(typeArg, DebtTreasury.bcs.parse(data))
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
  ): DebtTreasury<ToPhantomTypeArgument<T>> {
    return DebtTreasury.reified(typeArg).new({
      registry: decodeFromJSONField(DebtRegistry.reified(typeArg), field.registry),
      cap: decodeFromJSONField(TreasuryCap.reified(typeArg), field.cap),
    })
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>
  ): DebtTreasury<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== DebtTreasury.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(DebtTreasury.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return DebtTreasury.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData
  ): DebtTreasury<ToPhantomTypeArgument<T>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isDebtTreasury(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a DebtTreasury object`)
    }
    return DebtTreasury.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData
  ): DebtTreasury<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isDebtTreasury(data.bcs.type)) {
        throw new Error(`object at is not a DebtTreasury object`)
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

      return DebtTreasury.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return DebtTreasury.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T,
    id: string
  ): Promise<DebtTreasury<ToPhantomTypeArgument<T>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching DebtTreasury object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isDebtTreasury(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a DebtTreasury object`)
    }

    return DebtTreasury.fromSuiObjectData(typeArg, res.data)
  }
}
