/**
 * Debt share management system for general-purpose facilities, with fungible debt coin minting.
 *
 * This module provides the core infrastructure for tracking debt obligations in pools or other systems.
 * It implements a share-based system where debt is represented as shares that maintain their
 * proportional value even as the total debt changes due to interest accrual or other mechanisms.
 *
 * In addition to share-based accounting, this module supports minting debt as fungible coins,
 * enabling seamless integration with token-based protocols and facilitating transferability of debt positions.
 *
 * Importantly, this system is designed to prevent losses due to integer arithmetic rounding:
 * whenever fractional values arise from division or share calculations, the rounding is always
 * performed in a way that increases the borrower's debt rather than reducing it. This ensures
 * that the system never underestimates liabilities due to rounding, preserving the solvency
 * and integrity of the protocol.
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

/* ============================== DebtShareBalance =============================== */

export function isDebtShareBalance(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    `${getTypeOrigin('kai-leverage', 'debt::DebtShareBalance')}::debt::DebtShareBalance` + '<',
  )
}

export interface DebtShareBalanceFields<T extends PhantomTypeArgument> {
  valueX64: ToField<'u128'>
}

export type DebtShareBalanceReified<T extends PhantomTypeArgument> = Reified<
  DebtShareBalance<T>,
  DebtShareBalanceFields<T>
>

export type DebtShareBalanceJSONField<T extends PhantomTypeArgument> = {
  valueX64: string
}

export type DebtShareBalanceJSON<T extends PhantomTypeArgument> = {
  $typeName: typeof DebtShareBalance.$typeName
  $typeArgs: [PhantomToTypeStr<T>]
} & DebtShareBalanceJSONField<T>

/** Represents a balance of debt shares in Q64.64 format. */
export class DebtShareBalance<T extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::debt::DebtShareBalance` {
    return `${
      getTypeOrigin('kai-leverage', 'debt::DebtShareBalance')
    }::debt::DebtShareBalance` as const
  }
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName: typeof DebtShareBalance.$typeName = DebtShareBalance.$typeName
  readonly $fullTypeName: `${string}::debt::DebtShareBalance<${PhantomToTypeStr<T>}>`
  readonly $typeArgs: [PhantomToTypeStr<T>]
  readonly $isPhantom: typeof DebtShareBalance.$isPhantom = DebtShareBalance.$isPhantom

  readonly valueX64: ToField<'u128'>

  private constructor(typeArgs: [PhantomToTypeStr<T>], fields: DebtShareBalanceFields<T>) {
    this.$fullTypeName = composeSuiType(
      DebtShareBalance.$typeName,
      ...typeArgs,
    ) as `${string}::debt::DebtShareBalance<${PhantomToTypeStr<T>}>`
    this.$typeArgs = typeArgs

    this.valueX64 = fields.valueX64
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(
    T: T,
  ): DebtShareBalanceReified<ToPhantomTypeArgument<T>> {
    const reifiedBcs = DebtShareBalance.bcs
    return {
      get typeName() {
        return DebtShareBalance.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          DebtShareBalance.$typeName,
          ...[extractType(T)],
        ) as `${string}::debt::DebtShareBalance<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`
      },
      get typeArgs() {
        return [extractType(T)] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>]
      },
      isPhantom: DebtShareBalance.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) => DebtShareBalance.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => DebtShareBalance.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => DebtShareBalance.fromFields(T, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => DebtShareBalance.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => DebtShareBalance.fromJSON(T, json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        DebtShareBalance.fromCoreObject(T, obj),
      fromSuiParsedData: (content: SuiParsedData) => DebtShareBalance.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) => DebtShareBalance.fromSuiObjectData(T, content),
      fetch: async (client: ClientWithCoreApi, id: string) => DebtShareBalance.fetch(client, T, id),
      new: (fields: DebtShareBalanceFields<ToPhantomTypeArgument<T>>) => {
        return new DebtShareBalance([extractType(T)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof DebtShareBalance.reified {
    return DebtShareBalance.reified
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T,
  ): PhantomReified<ToTypeStr<DebtShareBalance<ToPhantomTypeArgument<T>>>> {
    return phantom(DebtShareBalance.reified(T))
  }

  static get p(): typeof DebtShareBalance.phantom {
    return DebtShareBalance.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('DebtShareBalance', {
      value_x64: bcs.u128(),
    })
  }

  private static cachedBcs: ReturnType<typeof DebtShareBalance.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof DebtShareBalance.instantiateBcs> {
    if (!DebtShareBalance.cachedBcs) {
      DebtShareBalance.cachedBcs = DebtShareBalance.instantiateBcs()
    }
    return DebtShareBalance.cachedBcs
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>,
  ): DebtShareBalance<ToPhantomTypeArgument<T>> {
    return DebtShareBalance.reified(typeArg).new({
      valueX64: decodeFromFields('u128', fields.value_x64),
    })
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes,
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
    data: Uint8Array,
  ): DebtShareBalance<ToPhantomTypeArgument<T>> {
    return DebtShareBalance.fromFields(typeArg, DebtShareBalance.bcs.parse(data))
  }

  toJSONField(): DebtShareBalanceJSONField<T> {
    return {
      valueX64: this.valueX64.toString(),
    }
  }

  toJSON(): DebtShareBalanceJSON<T> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any,
  ): DebtShareBalance<ToPhantomTypeArgument<T>> {
    return DebtShareBalance.reified(typeArg).new({
      valueX64: decodeFromJSONField('u128', field.valueX64),
    })
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>,
  ): DebtShareBalance<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== DebtShareBalance.$typeName) {
      throw new Error(
        `not a DebtShareBalance json object: expected '${DebtShareBalance.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(DebtShareBalance.$typeName, ...[extractType(typeArg)]),
      json.$typeArgs,
      [typeArg],
    )

    return DebtShareBalance.fromJSONField(typeArg, json)
  }

  static fromCoreObject<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    obj: SuiClientTypes.Object<{ content: true }>,
  ): DebtShareBalance<ToPhantomTypeArgument<T>> {
    if (!isDebtShareBalance(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a DebtShareBalance object`)
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

    return DebtShareBalance.fromBcs(typeArg, obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link DebtShareBalance.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData,
  ): DebtShareBalance<ToPhantomTypeArgument<T>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isDebtShareBalance(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a DebtShareBalance object`)
    }
    return DebtShareBalance.fromFieldsWithTypes(typeArg, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link DebtShareBalance.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData,
  ): DebtShareBalance<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isDebtShareBalance(data.bcs.type)) {
        throw new Error(`object at is not a DebtShareBalance object`)
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

      return DebtShareBalance.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return DebtShareBalance.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: ClientWithCoreApi,
    typeArg: T,
    id: string,
  ): Promise<DebtShareBalance<ToPhantomTypeArgument<T>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isDebtShareBalance(object.type)) {
      throw new Error(`object at id ${id} is not a DebtShareBalance object`)
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

    return DebtShareBalance.fromBcs(typeArg, object.content)
  }
}

/* ============================== DebtRegistry =============================== */

export function isDebtRegistry(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    `${getTypeOrigin('kai-leverage', 'debt::DebtRegistry')}::debt::DebtRegistry` + '<',
  )
}

export interface DebtRegistryFields<T extends PhantomTypeArgument> {
  supplyX64: ToField<'u128'>
  liabilityValueX64: ToField<'u128'>
}

export type DebtRegistryReified<T extends PhantomTypeArgument> = Reified<
  DebtRegistry<T>,
  DebtRegistryFields<T>
>

export type DebtRegistryJSONField<T extends PhantomTypeArgument> = {
  supplyX64: string
  liabilityValueX64: string
}

export type DebtRegistryJSON<T extends PhantomTypeArgument> = {
  $typeName: typeof DebtRegistry.$typeName
  $typeArgs: [PhantomToTypeStr<T>]
} & DebtRegistryJSONField<T>

/**
 * Registry tracking total debt shares and liability value.
 *
 * Note that `liability_value_x64` can be zero while `supply_x64` is not. `repay_lossy` rounds
 * the repaid amount up and credits the overpayment to the remaining borrowers by reducing the
 * total liability; when that overpayment exceeds what is left, the liability is pinned at zero
 * while sub-unit shares are still outstanding. Code must not treat a zero liability as proof
 * that the registry is empty -- `supply_x64` is the authoritative signal for that.
 */
export class DebtRegistry<T extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::debt::DebtRegistry` {
    return `${getTypeOrigin('kai-leverage', 'debt::DebtRegistry')}::debt::DebtRegistry` as const
  }
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName: typeof DebtRegistry.$typeName = DebtRegistry.$typeName
  readonly $fullTypeName: `${string}::debt::DebtRegistry<${PhantomToTypeStr<T>}>`
  readonly $typeArgs: [PhantomToTypeStr<T>]
  readonly $isPhantom: typeof DebtRegistry.$isPhantom = DebtRegistry.$isPhantom

  readonly supplyX64: ToField<'u128'>
  readonly liabilityValueX64: ToField<'u128'>

  private constructor(typeArgs: [PhantomToTypeStr<T>], fields: DebtRegistryFields<T>) {
    this.$fullTypeName = composeSuiType(
      DebtRegistry.$typeName,
      ...typeArgs,
    ) as `${string}::debt::DebtRegistry<${PhantomToTypeStr<T>}>`
    this.$typeArgs = typeArgs

    this.supplyX64 = fields.supplyX64
    this.liabilityValueX64 = fields.liabilityValueX64
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(
    T: T,
  ): DebtRegistryReified<ToPhantomTypeArgument<T>> {
    const reifiedBcs = DebtRegistry.bcs
    return {
      get typeName() {
        return DebtRegistry.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          DebtRegistry.$typeName,
          ...[extractType(T)],
        ) as `${string}::debt::DebtRegistry<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`
      },
      get typeArgs() {
        return [extractType(T)] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>]
      },
      isPhantom: DebtRegistry.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) => DebtRegistry.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => DebtRegistry.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => DebtRegistry.fromFields(T, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => DebtRegistry.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => DebtRegistry.fromJSON(T, json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        DebtRegistry.fromCoreObject(T, obj),
      fromSuiParsedData: (content: SuiParsedData) => DebtRegistry.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) => DebtRegistry.fromSuiObjectData(T, content),
      fetch: async (client: ClientWithCoreApi, id: string) => DebtRegistry.fetch(client, T, id),
      new: (fields: DebtRegistryFields<ToPhantomTypeArgument<T>>) => {
        return new DebtRegistry([extractType(T)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof DebtRegistry.reified {
    return DebtRegistry.reified
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T,
  ): PhantomReified<ToTypeStr<DebtRegistry<ToPhantomTypeArgument<T>>>> {
    return phantom(DebtRegistry.reified(T))
  }

  static get p(): typeof DebtRegistry.phantom {
    return DebtRegistry.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('DebtRegistry', {
      supply_x64: bcs.u128(),
      liability_value_x64: bcs.u128(),
    })
  }

  private static cachedBcs: ReturnType<typeof DebtRegistry.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof DebtRegistry.instantiateBcs> {
    if (!DebtRegistry.cachedBcs) {
      DebtRegistry.cachedBcs = DebtRegistry.instantiateBcs()
    }
    return DebtRegistry.cachedBcs
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>,
  ): DebtRegistry<ToPhantomTypeArgument<T>> {
    return DebtRegistry.reified(typeArg).new({
      supplyX64: decodeFromFields('u128', fields.supply_x64),
      liabilityValueX64: decodeFromFields('u128', fields.liability_value_x64),
    })
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes,
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
    data: Uint8Array,
  ): DebtRegistry<ToPhantomTypeArgument<T>> {
    return DebtRegistry.fromFields(typeArg, DebtRegistry.bcs.parse(data))
  }

  toJSONField(): DebtRegistryJSONField<T> {
    return {
      supplyX64: this.supplyX64.toString(),
      liabilityValueX64: this.liabilityValueX64.toString(),
    }
  }

  toJSON(): DebtRegistryJSON<T> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any,
  ): DebtRegistry<ToPhantomTypeArgument<T>> {
    return DebtRegistry.reified(typeArg).new({
      supplyX64: decodeFromJSONField('u128', field.supplyX64),
      liabilityValueX64: decodeFromJSONField('u128', field.liabilityValueX64),
    })
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>,
  ): DebtRegistry<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== DebtRegistry.$typeName) {
      throw new Error(
        `not a DebtRegistry json object: expected '${DebtRegistry.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(DebtRegistry.$typeName, ...[extractType(typeArg)]),
      json.$typeArgs,
      [typeArg],
    )

    return DebtRegistry.fromJSONField(typeArg, json)
  }

  static fromCoreObject<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    obj: SuiClientTypes.Object<{ content: true }>,
  ): DebtRegistry<ToPhantomTypeArgument<T>> {
    if (!isDebtRegistry(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a DebtRegistry object`)
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

    return DebtRegistry.fromBcs(typeArg, obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link DebtRegistry.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData,
  ): DebtRegistry<ToPhantomTypeArgument<T>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isDebtRegistry(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a DebtRegistry object`)
    }
    return DebtRegistry.fromFieldsWithTypes(typeArg, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link DebtRegistry.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData,
  ): DebtRegistry<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isDebtRegistry(data.bcs.type)) {
        throw new Error(`object at is not a DebtRegistry object`)
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

      return DebtRegistry.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return DebtRegistry.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: ClientWithCoreApi,
    typeArg: T,
    id: string,
  ): Promise<DebtRegistry<ToPhantomTypeArgument<T>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isDebtRegistry(object.type)) {
      throw new Error(`object at id ${id} is not a DebtRegistry object`)
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

    return DebtRegistry.fromBcs(typeArg, object.content)
  }
}

/* ============================== DebtTreasury =============================== */

export function isDebtTreasury(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    `${getTypeOrigin('kai-leverage', 'debt::DebtTreasury')}::debt::DebtTreasury` + '<',
  )
}

export interface DebtTreasuryFields<T extends PhantomTypeArgument> {
  registry: ToField<DebtRegistry<T>>
  cap: ToField<TreasuryCap<T>>
}

export type DebtTreasuryReified<T extends PhantomTypeArgument> = Reified<
  DebtTreasury<T>,
  DebtTreasuryFields<T>
>

export type DebtTreasuryJSONField<T extends PhantomTypeArgument> = {
  registry: ToJSON<DebtRegistry<T>>
  cap: ToJSON<TreasuryCap<T>>
}

export type DebtTreasuryJSON<T extends PhantomTypeArgument> = {
  $typeName: typeof DebtTreasury.$typeName
  $typeArgs: [PhantomToTypeStr<T>]
} & DebtTreasuryJSONField<T>

/** Treasury combining debt registry with coin minting capability. */
export class DebtTreasury<T extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::debt::DebtTreasury` {
    return `${getTypeOrigin('kai-leverage', 'debt::DebtTreasury')}::debt::DebtTreasury` as const
  }
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName: typeof DebtTreasury.$typeName = DebtTreasury.$typeName
  readonly $fullTypeName: `${string}::debt::DebtTreasury<${PhantomToTypeStr<T>}>`
  readonly $typeArgs: [PhantomToTypeStr<T>]
  readonly $isPhantom: typeof DebtTreasury.$isPhantom = DebtTreasury.$isPhantom

  readonly registry: ToField<DebtRegistry<T>>
  readonly cap: ToField<TreasuryCap<T>>

  private constructor(typeArgs: [PhantomToTypeStr<T>], fields: DebtTreasuryFields<T>) {
    this.$fullTypeName = composeSuiType(
      DebtTreasury.$typeName,
      ...typeArgs,
    ) as `${string}::debt::DebtTreasury<${PhantomToTypeStr<T>}>`
    this.$typeArgs = typeArgs

    this.registry = fields.registry
    this.cap = fields.cap
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(
    T: T,
  ): DebtTreasuryReified<ToPhantomTypeArgument<T>> {
    const reifiedBcs = DebtTreasury.bcs
    return {
      get typeName() {
        return DebtTreasury.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          DebtTreasury.$typeName,
          ...[extractType(T)],
        ) as `${string}::debt::DebtTreasury<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`
      },
      get typeArgs() {
        return [extractType(T)] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>]
      },
      isPhantom: DebtTreasury.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) => DebtTreasury.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => DebtTreasury.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => DebtTreasury.fromFields(T, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => DebtTreasury.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => DebtTreasury.fromJSON(T, json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        DebtTreasury.fromCoreObject(T, obj),
      fromSuiParsedData: (content: SuiParsedData) => DebtTreasury.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) => DebtTreasury.fromSuiObjectData(T, content),
      fetch: async (client: ClientWithCoreApi, id: string) => DebtTreasury.fetch(client, T, id),
      new: (fields: DebtTreasuryFields<ToPhantomTypeArgument<T>>) => {
        return new DebtTreasury([extractType(T)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof DebtTreasury.reified {
    return DebtTreasury.reified
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T,
  ): PhantomReified<ToTypeStr<DebtTreasury<ToPhantomTypeArgument<T>>>> {
    return phantom(DebtTreasury.reified(T))
  }

  static get p(): typeof DebtTreasury.phantom {
    return DebtTreasury.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('DebtTreasury', {
      registry: DebtRegistry.bcs,
      cap: TreasuryCap.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof DebtTreasury.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof DebtTreasury.instantiateBcs> {
    if (!DebtTreasury.cachedBcs) {
      DebtTreasury.cachedBcs = DebtTreasury.instantiateBcs()
    }
    return DebtTreasury.cachedBcs
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>,
  ): DebtTreasury<ToPhantomTypeArgument<T>> {
    return DebtTreasury.reified(typeArg).new({
      registry: decodeFromFields(DebtRegistry.reified(typeArg), fields.registry),
      cap: decodeFromFields(TreasuryCap.reified(typeArg), fields.cap),
    })
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes,
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
    data: Uint8Array,
  ): DebtTreasury<ToPhantomTypeArgument<T>> {
    return DebtTreasury.fromFields(typeArg, DebtTreasury.bcs.parse(data))
  }

  toJSONField(): DebtTreasuryJSONField<T> {
    return {
      registry: this.registry.toJSONField(),
      cap: this.cap.toJSONField(),
    }
  }

  toJSON(): DebtTreasuryJSON<T> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any,
  ): DebtTreasury<ToPhantomTypeArgument<T>> {
    return DebtTreasury.reified(typeArg).new({
      registry: decodeFromJSONField(DebtRegistry.reified(typeArg), field.registry),
      cap: decodeFromJSONField(TreasuryCap.reified(typeArg), field.cap),
    })
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>,
  ): DebtTreasury<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== DebtTreasury.$typeName) {
      throw new Error(
        `not a DebtTreasury json object: expected '${DebtTreasury.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(DebtTreasury.$typeName, ...[extractType(typeArg)]),
      json.$typeArgs,
      [typeArg],
    )

    return DebtTreasury.fromJSONField(typeArg, json)
  }

  static fromCoreObject<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    obj: SuiClientTypes.Object<{ content: true }>,
  ): DebtTreasury<ToPhantomTypeArgument<T>> {
    if (!isDebtTreasury(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a DebtTreasury object`)
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

    return DebtTreasury.fromBcs(typeArg, obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link DebtTreasury.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData,
  ): DebtTreasury<ToPhantomTypeArgument<T>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isDebtTreasury(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a DebtTreasury object`)
    }
    return DebtTreasury.fromFieldsWithTypes(typeArg, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link DebtTreasury.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData,
  ): DebtTreasury<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isDebtTreasury(data.bcs.type)) {
        throw new Error(`object at is not a DebtTreasury object`)
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

      return DebtTreasury.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return DebtTreasury.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: ClientWithCoreApi,
    typeArg: T,
    id: string,
  ): Promise<DebtTreasury<ToPhantomTypeArgument<T>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isDebtTreasury(object.type)) {
      throw new Error(`object at id ${id} is not a DebtTreasury object`)
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

    return DebtTreasury.fromBcs(typeArg, object.content)
  }
}
