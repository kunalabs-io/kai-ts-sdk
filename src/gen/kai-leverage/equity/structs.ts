/**
 * Equity share management system for supply pools, with fungible equity coin minting.
 *
 * This module provides the core infrastructure for tracking equity stakes in pools or other systems.
 * It implements a share-based system where equity is represented as shares that maintain their
 * proportional value even as the total pool value changes due to deposits, withdrawals, or yield accrual.
 *
 * In addition to share-based accounting, this module supports minting equity as fungible coins,
 * enabling seamless integration with token-based protocols and facilitating transferability of ownership positions.
 *
 * Importantly, this system is designed to prevent value leakage due to integer arithmetic rounding:
 * whenever fractional values arise from division or share calculations, the rounding is always
 * performed in a way that favors the pool rather than the withdrawing party. This ensures
 * that the system never underestimates liabilities or overestimates ownership due to rounding,
 * preserving the solvency and integrity of the protocol.
 */

import { bcs } from '@mysten/sui/bcs'
import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import type { SuiObjectData, SuiParsedData } from '@mysten/sui/jsonRpc'
import { fromBase64 } from '@mysten/sui/utils'
import { getTypeOrigin } from '../../_envs'
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
} from '../../_framework/reified'
import {
  composeSuiType,
  compressSuiType,
  FieldsWithTypes,
  parseTypeName,
} from '../../_framework/util'
import { TreasuryCap } from '../../sui/coin/structs'

/* ============================== EquityShareBalance =============================== */

export function isEquityShareBalance(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    `${getTypeOrigin('kai-leverage', 'equity::EquityShareBalance')}::equity::EquityShareBalance`
      + '<',
  )
}

export interface EquityShareBalanceFields<T extends PhantomTypeArgument> {
  valueX64: ToField<'u128'>
}

export type EquityShareBalanceReified<T extends PhantomTypeArgument> = Reified<
  EquityShareBalance<T>,
  EquityShareBalanceFields<T>
>

export type EquityShareBalanceJSONField<T extends PhantomTypeArgument> = {
  valueX64: string
}

export type EquityShareBalanceJSON<T extends PhantomTypeArgument> = {
  $typeName: typeof EquityShareBalance.$typeName
  $typeArgs: [PhantomToTypeStr<T>]
} & EquityShareBalanceJSONField<T>

/** Represents a balance of equity shares in Q64.64 format. */
export class EquityShareBalance<T extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::equity::EquityShareBalance` {
    return `${
      getTypeOrigin('kai-leverage', 'equity::EquityShareBalance')
    }::equity::EquityShareBalance` as const
  }
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName: typeof EquityShareBalance.$typeName = EquityShareBalance.$typeName
  readonly $fullTypeName: `${string}::equity::EquityShareBalance<${PhantomToTypeStr<T>}>`
  readonly $typeArgs: [PhantomToTypeStr<T>]
  readonly $isPhantom: typeof EquityShareBalance.$isPhantom = EquityShareBalance.$isPhantom

  readonly valueX64: ToField<'u128'>

  private constructor(typeArgs: [PhantomToTypeStr<T>], fields: EquityShareBalanceFields<T>) {
    this.$fullTypeName = composeSuiType(
      EquityShareBalance.$typeName,
      ...typeArgs,
    ) as `${string}::equity::EquityShareBalance<${PhantomToTypeStr<T>}>`
    this.$typeArgs = typeArgs

    this.valueX64 = fields.valueX64
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(
    T: T,
  ): EquityShareBalanceReified<ToPhantomTypeArgument<T>> {
    const reifiedBcs = EquityShareBalance.bcs
    return {
      get typeName() {
        return EquityShareBalance.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          EquityShareBalance.$typeName,
          ...[extractType(T)],
        ) as `${string}::equity::EquityShareBalance<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`
      },
      get typeArgs() {
        return [extractType(T)] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>]
      },
      isPhantom: EquityShareBalance.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) => EquityShareBalance.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        EquityShareBalance.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => EquityShareBalance.fromFields(T, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => EquityShareBalance.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => EquityShareBalance.fromJSON(T, json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        EquityShareBalance.fromCoreObject(T, obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        EquityShareBalance.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) =>
        EquityShareBalance.fromSuiObjectData(T, content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        EquityShareBalance.fetch(client, T, id),
      new: (fields: EquityShareBalanceFields<ToPhantomTypeArgument<T>>) => {
        return new EquityShareBalance([extractType(T)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof EquityShareBalance.reified {
    return EquityShareBalance.reified
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T,
  ): PhantomReified<ToTypeStr<EquityShareBalance<ToPhantomTypeArgument<T>>>> {
    return phantom(EquityShareBalance.reified(T))
  }

  static get p(): typeof EquityShareBalance.phantom {
    return EquityShareBalance.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('EquityShareBalance', {
      value_x64: bcs.u128(),
    })
  }

  private static cachedBcs: ReturnType<typeof EquityShareBalance.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof EquityShareBalance.instantiateBcs> {
    if (!EquityShareBalance.cachedBcs) {
      EquityShareBalance.cachedBcs = EquityShareBalance.instantiateBcs()
    }
    return EquityShareBalance.cachedBcs
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>,
  ): EquityShareBalance<ToPhantomTypeArgument<T>> {
    return EquityShareBalance.reified(typeArg).new({
      valueX64: decodeFromFields('u128', fields.value_x64),
    })
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes,
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
    data: Uint8Array,
  ): EquityShareBalance<ToPhantomTypeArgument<T>> {
    return EquityShareBalance.fromFields(typeArg, EquityShareBalance.bcs.parse(data))
  }

  toJSONField(): EquityShareBalanceJSONField<T> {
    return {
      valueX64: this.valueX64.toString(),
    }
  }

  toJSON(): EquityShareBalanceJSON<T> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any,
  ): EquityShareBalance<ToPhantomTypeArgument<T>> {
    return EquityShareBalance.reified(typeArg).new({
      valueX64: decodeFromJSONField('u128', field.valueX64),
    })
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>,
  ): EquityShareBalance<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== EquityShareBalance.$typeName) {
      throw new Error(
        `not a EquityShareBalance json object: expected '${EquityShareBalance.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(EquityShareBalance.$typeName, ...[extractType(typeArg)]),
      json.$typeArgs,
      [typeArg],
    )

    return EquityShareBalance.fromJSONField(typeArg, json)
  }

  static fromCoreObject<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    obj: SuiClientTypes.Object<{ content: true }>,
  ): EquityShareBalance<ToPhantomTypeArgument<T>> {
    if (!isEquityShareBalance(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a EquityShareBalance object`)
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

    return EquityShareBalance.fromBcs(typeArg, obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link EquityShareBalance.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData,
  ): EquityShareBalance<ToPhantomTypeArgument<T>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isEquityShareBalance(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a EquityShareBalance object`)
    }
    return EquityShareBalance.fromFieldsWithTypes(typeArg, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link EquityShareBalance.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData,
  ): EquityShareBalance<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isEquityShareBalance(data.bcs.type)) {
        throw new Error(`object at is not a EquityShareBalance object`)
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

      return EquityShareBalance.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return EquityShareBalance.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: ClientWithCoreApi,
    typeArg: T,
    id: string,
  ): Promise<EquityShareBalance<ToPhantomTypeArgument<T>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isEquityShareBalance(object.type)) {
      throw new Error(`object at id ${id} is not a EquityShareBalance object`)
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

    return EquityShareBalance.fromBcs(typeArg, object.content)
  }
}

/* ============================== EquityRegistry =============================== */

export function isEquityRegistry(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    `${getTypeOrigin('kai-leverage', 'equity::EquityRegistry')}::equity::EquityRegistry` + '<',
  )
}

export interface EquityRegistryFields<T extends PhantomTypeArgument> {
  supplyX64: ToField<'u128'>
  underlyingValueX64: ToField<'u128'>
}

export type EquityRegistryReified<T extends PhantomTypeArgument> = Reified<
  EquityRegistry<T>,
  EquityRegistryFields<T>
>

export type EquityRegistryJSONField<T extends PhantomTypeArgument> = {
  supplyX64: string
  underlyingValueX64: string
}

export type EquityRegistryJSON<T extends PhantomTypeArgument> = {
  $typeName: typeof EquityRegistry.$typeName
  $typeArgs: [PhantomToTypeStr<T>]
} & EquityRegistryJSONField<T>

/** Registry tracking total equity shares and underlying asset value. */
export class EquityRegistry<T extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::equity::EquityRegistry` {
    return `${
      getTypeOrigin('kai-leverage', 'equity::EquityRegistry')
    }::equity::EquityRegistry` as const
  }
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName: typeof EquityRegistry.$typeName = EquityRegistry.$typeName
  readonly $fullTypeName: `${string}::equity::EquityRegistry<${PhantomToTypeStr<T>}>`
  readonly $typeArgs: [PhantomToTypeStr<T>]
  readonly $isPhantom: typeof EquityRegistry.$isPhantom = EquityRegistry.$isPhantom

  readonly supplyX64: ToField<'u128'>
  readonly underlyingValueX64: ToField<'u128'>

  private constructor(typeArgs: [PhantomToTypeStr<T>], fields: EquityRegistryFields<T>) {
    this.$fullTypeName = composeSuiType(
      EquityRegistry.$typeName,
      ...typeArgs,
    ) as `${string}::equity::EquityRegistry<${PhantomToTypeStr<T>}>`
    this.$typeArgs = typeArgs

    this.supplyX64 = fields.supplyX64
    this.underlyingValueX64 = fields.underlyingValueX64
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(
    T: T,
  ): EquityRegistryReified<ToPhantomTypeArgument<T>> {
    const reifiedBcs = EquityRegistry.bcs
    return {
      get typeName() {
        return EquityRegistry.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          EquityRegistry.$typeName,
          ...[extractType(T)],
        ) as `${string}::equity::EquityRegistry<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`
      },
      get typeArgs() {
        return [extractType(T)] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>]
      },
      isPhantom: EquityRegistry.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) => EquityRegistry.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => EquityRegistry.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => EquityRegistry.fromFields(T, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => EquityRegistry.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => EquityRegistry.fromJSON(T, json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        EquityRegistry.fromCoreObject(T, obj),
      fromSuiParsedData: (content: SuiParsedData) => EquityRegistry.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) => EquityRegistry.fromSuiObjectData(T, content),
      fetch: async (client: ClientWithCoreApi, id: string) => EquityRegistry.fetch(client, T, id),
      new: (fields: EquityRegistryFields<ToPhantomTypeArgument<T>>) => {
        return new EquityRegistry([extractType(T)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof EquityRegistry.reified {
    return EquityRegistry.reified
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T,
  ): PhantomReified<ToTypeStr<EquityRegistry<ToPhantomTypeArgument<T>>>> {
    return phantom(EquityRegistry.reified(T))
  }

  static get p(): typeof EquityRegistry.phantom {
    return EquityRegistry.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('EquityRegistry', {
      supply_x64: bcs.u128(),
      underlying_value_x64: bcs.u128(),
    })
  }

  private static cachedBcs: ReturnType<typeof EquityRegistry.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof EquityRegistry.instantiateBcs> {
    if (!EquityRegistry.cachedBcs) {
      EquityRegistry.cachedBcs = EquityRegistry.instantiateBcs()
    }
    return EquityRegistry.cachedBcs
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>,
  ): EquityRegistry<ToPhantomTypeArgument<T>> {
    return EquityRegistry.reified(typeArg).new({
      supplyX64: decodeFromFields('u128', fields.supply_x64),
      underlyingValueX64: decodeFromFields('u128', fields.underlying_value_x64),
    })
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes,
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
    data: Uint8Array,
  ): EquityRegistry<ToPhantomTypeArgument<T>> {
    return EquityRegistry.fromFields(typeArg, EquityRegistry.bcs.parse(data))
  }

  toJSONField(): EquityRegistryJSONField<T> {
    return {
      supplyX64: this.supplyX64.toString(),
      underlyingValueX64: this.underlyingValueX64.toString(),
    }
  }

  toJSON(): EquityRegistryJSON<T> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any,
  ): EquityRegistry<ToPhantomTypeArgument<T>> {
    return EquityRegistry.reified(typeArg).new({
      supplyX64: decodeFromJSONField('u128', field.supplyX64),
      underlyingValueX64: decodeFromJSONField('u128', field.underlyingValueX64),
    })
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>,
  ): EquityRegistry<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== EquityRegistry.$typeName) {
      throw new Error(
        `not a EquityRegistry json object: expected '${EquityRegistry.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(EquityRegistry.$typeName, ...[extractType(typeArg)]),
      json.$typeArgs,
      [typeArg],
    )

    return EquityRegistry.fromJSONField(typeArg, json)
  }

  static fromCoreObject<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    obj: SuiClientTypes.Object<{ content: true }>,
  ): EquityRegistry<ToPhantomTypeArgument<T>> {
    if (!isEquityRegistry(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a EquityRegistry object`)
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

    return EquityRegistry.fromBcs(typeArg, obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link EquityRegistry.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData,
  ): EquityRegistry<ToPhantomTypeArgument<T>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isEquityRegistry(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a EquityRegistry object`)
    }
    return EquityRegistry.fromFieldsWithTypes(typeArg, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link EquityRegistry.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData,
  ): EquityRegistry<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isEquityRegistry(data.bcs.type)) {
        throw new Error(`object at is not a EquityRegistry object`)
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

      return EquityRegistry.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return EquityRegistry.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: ClientWithCoreApi,
    typeArg: T,
    id: string,
  ): Promise<EquityRegistry<ToPhantomTypeArgument<T>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isEquityRegistry(object.type)) {
      throw new Error(`object at id ${id} is not a EquityRegistry object`)
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

    return EquityRegistry.fromBcs(typeArg, object.content)
  }
}

/* ============================== EquityTreasury =============================== */

export function isEquityTreasury(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    `${getTypeOrigin('kai-leverage', 'equity::EquityTreasury')}::equity::EquityTreasury` + '<',
  )
}

export interface EquityTreasuryFields<T extends PhantomTypeArgument> {
  registry: ToField<EquityRegistry<T>>
  cap: ToField<TreasuryCap<T>>
}

export type EquityTreasuryReified<T extends PhantomTypeArgument> = Reified<
  EquityTreasury<T>,
  EquityTreasuryFields<T>
>

export type EquityTreasuryJSONField<T extends PhantomTypeArgument> = {
  registry: ToJSON<EquityRegistry<T>>
  cap: ToJSON<TreasuryCap<T>>
}

export type EquityTreasuryJSON<T extends PhantomTypeArgument> = {
  $typeName: typeof EquityTreasury.$typeName
  $typeArgs: [PhantomToTypeStr<T>]
} & EquityTreasuryJSONField<T>

/** Treasury combining equity registry with coin minting capability. */
export class EquityTreasury<T extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::equity::EquityTreasury` {
    return `${
      getTypeOrigin('kai-leverage', 'equity::EquityTreasury')
    }::equity::EquityTreasury` as const
  }
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName: typeof EquityTreasury.$typeName = EquityTreasury.$typeName
  readonly $fullTypeName: `${string}::equity::EquityTreasury<${PhantomToTypeStr<T>}>`
  readonly $typeArgs: [PhantomToTypeStr<T>]
  readonly $isPhantom: typeof EquityTreasury.$isPhantom = EquityTreasury.$isPhantom

  readonly registry: ToField<EquityRegistry<T>>
  readonly cap: ToField<TreasuryCap<T>>

  private constructor(typeArgs: [PhantomToTypeStr<T>], fields: EquityTreasuryFields<T>) {
    this.$fullTypeName = composeSuiType(
      EquityTreasury.$typeName,
      ...typeArgs,
    ) as `${string}::equity::EquityTreasury<${PhantomToTypeStr<T>}>`
    this.$typeArgs = typeArgs

    this.registry = fields.registry
    this.cap = fields.cap
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(
    T: T,
  ): EquityTreasuryReified<ToPhantomTypeArgument<T>> {
    const reifiedBcs = EquityTreasury.bcs
    return {
      get typeName() {
        return EquityTreasury.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          EquityTreasury.$typeName,
          ...[extractType(T)],
        ) as `${string}::equity::EquityTreasury<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`
      },
      get typeArgs() {
        return [extractType(T)] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>]
      },
      isPhantom: EquityTreasury.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) => EquityTreasury.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => EquityTreasury.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => EquityTreasury.fromFields(T, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => EquityTreasury.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => EquityTreasury.fromJSON(T, json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        EquityTreasury.fromCoreObject(T, obj),
      fromSuiParsedData: (content: SuiParsedData) => EquityTreasury.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) => EquityTreasury.fromSuiObjectData(T, content),
      fetch: async (client: ClientWithCoreApi, id: string) => EquityTreasury.fetch(client, T, id),
      new: (fields: EquityTreasuryFields<ToPhantomTypeArgument<T>>) => {
        return new EquityTreasury([extractType(T)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof EquityTreasury.reified {
    return EquityTreasury.reified
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T,
  ): PhantomReified<ToTypeStr<EquityTreasury<ToPhantomTypeArgument<T>>>> {
    return phantom(EquityTreasury.reified(T))
  }

  static get p(): typeof EquityTreasury.phantom {
    return EquityTreasury.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('EquityTreasury', {
      registry: EquityRegistry.bcs,
      cap: TreasuryCap.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof EquityTreasury.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof EquityTreasury.instantiateBcs> {
    if (!EquityTreasury.cachedBcs) {
      EquityTreasury.cachedBcs = EquityTreasury.instantiateBcs()
    }
    return EquityTreasury.cachedBcs
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>,
  ): EquityTreasury<ToPhantomTypeArgument<T>> {
    return EquityTreasury.reified(typeArg).new({
      registry: decodeFromFields(EquityRegistry.reified(typeArg), fields.registry),
      cap: decodeFromFields(TreasuryCap.reified(typeArg), fields.cap),
    })
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes,
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
    data: Uint8Array,
  ): EquityTreasury<ToPhantomTypeArgument<T>> {
    return EquityTreasury.fromFields(typeArg, EquityTreasury.bcs.parse(data))
  }

  toJSONField(): EquityTreasuryJSONField<T> {
    return {
      registry: this.registry.toJSONField(),
      cap: this.cap.toJSONField(),
    }
  }

  toJSON(): EquityTreasuryJSON<T> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any,
  ): EquityTreasury<ToPhantomTypeArgument<T>> {
    return EquityTreasury.reified(typeArg).new({
      registry: decodeFromJSONField(EquityRegistry.reified(typeArg), field.registry),
      cap: decodeFromJSONField(TreasuryCap.reified(typeArg), field.cap),
    })
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>,
  ): EquityTreasury<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== EquityTreasury.$typeName) {
      throw new Error(
        `not a EquityTreasury json object: expected '${EquityTreasury.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(EquityTreasury.$typeName, ...[extractType(typeArg)]),
      json.$typeArgs,
      [typeArg],
    )

    return EquityTreasury.fromJSONField(typeArg, json)
  }

  static fromCoreObject<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    obj: SuiClientTypes.Object<{ content: true }>,
  ): EquityTreasury<ToPhantomTypeArgument<T>> {
    if (!isEquityTreasury(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a EquityTreasury object`)
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

    return EquityTreasury.fromBcs(typeArg, obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link EquityTreasury.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData,
  ): EquityTreasury<ToPhantomTypeArgument<T>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isEquityTreasury(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a EquityTreasury object`)
    }
    return EquityTreasury.fromFieldsWithTypes(typeArg, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link EquityTreasury.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData,
  ): EquityTreasury<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isEquityTreasury(data.bcs.type)) {
        throw new Error(`object at is not a EquityTreasury object`)
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

      return EquityTreasury.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return EquityTreasury.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: ClientWithCoreApi,
    typeArg: T,
    id: string,
  ): Promise<EquityTreasury<ToPhantomTypeArgument<T>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isEquityTreasury(object.type)) {
      throw new Error(`object at id ${id} is not a EquityTreasury object`)
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

    return EquityTreasury.fromBcs(typeArg, object.content)
  }
}
