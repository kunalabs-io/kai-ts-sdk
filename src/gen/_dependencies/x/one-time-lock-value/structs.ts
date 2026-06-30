/**
 * ********
 * This module is used to store a value that could
 * only be accessed after a certain epoch, and may expire after a certain epoch.
 * And, the value could be consume only once.
 * *********
 */

import { bcs, BcsType } from '@mysten/sui/bcs'
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
  fieldToJSON,
  phantom,
  PhantomReified,
  Reified,
  StructClass,
  toBcs,
  ToField,
  ToJSON,
  ToTypeArgument,
  ToTypeStr,
  TypeArgument,
} from '../../../_framework/reified'
import {
  composeSuiType,
  compressSuiType,
  FieldsWithTypes,
  parseTypeName,
} from '../../../_framework/util'
import { UID } from '../../../sui/object/structs'

/* ============================== OneTimeLockValue =============================== */

export function isOneTimeLockValue(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    `${
      getTypeOrigin('x', 'one_time_lock_value::OneTimeLockValue')
    }::one_time_lock_value::OneTimeLockValue` + '<',
  )
}

export interface OneTimeLockValueFields<T extends TypeArgument> {
  id: ToField<UID>
  value: ToField<T>
  lockUntilEpoch: ToField<'u64'>
  validBeforeEpoch: ToField<'u64'>
}

export type OneTimeLockValueReified<T extends TypeArgument> = Reified<
  OneTimeLockValue<T>,
  OneTimeLockValueFields<T>
>

export type OneTimeLockValueJSONField<T extends TypeArgument> = {
  id: string
  value: ToJSON<T>
  lockUntilEpoch: string
  validBeforeEpoch: string
}

export type OneTimeLockValueJSON<T extends TypeArgument> = {
  $typeName: typeof OneTimeLockValue.$typeName
  $typeArgs: [ToTypeStr<T>]
} & OneTimeLockValueJSONField<T>

export class OneTimeLockValue<T extends TypeArgument> implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::one_time_lock_value::OneTimeLockValue` {
    return `${
      getTypeOrigin('x', 'one_time_lock_value::OneTimeLockValue')
    }::one_time_lock_value::OneTimeLockValue` as const
  }
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [false] as const

  readonly $typeName: typeof OneTimeLockValue.$typeName = OneTimeLockValue.$typeName
  readonly $fullTypeName: `${string}::one_time_lock_value::OneTimeLockValue<${ToTypeStr<T>}>`
  readonly $typeArgs: [ToTypeStr<T>]
  readonly $isPhantom: typeof OneTimeLockValue.$isPhantom = OneTimeLockValue.$isPhantom

  readonly id: ToField<UID>
  readonly value: ToField<T>
  readonly lockUntilEpoch: ToField<'u64'>
  readonly validBeforeEpoch: ToField<'u64'>

  private constructor(typeArgs: [ToTypeStr<T>], fields: OneTimeLockValueFields<T>) {
    this.$fullTypeName = composeSuiType(
      OneTimeLockValue.$typeName,
      ...typeArgs,
    ) as `${string}::one_time_lock_value::OneTimeLockValue<${ToTypeStr<T>}>`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.value = fields.value
    this.lockUntilEpoch = fields.lockUntilEpoch
    this.validBeforeEpoch = fields.validBeforeEpoch
  }

  static reified<T extends Reified<TypeArgument, any>>(
    T: T,
  ): OneTimeLockValueReified<ToTypeArgument<T>> {
    const reifiedBcs = OneTimeLockValue.bcs(toBcs(T))
    return {
      get typeName() {
        return OneTimeLockValue.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          OneTimeLockValue.$typeName,
          ...[extractType(T)],
        ) as `${string}::one_time_lock_value::OneTimeLockValue<${ToTypeStr<ToTypeArgument<T>>}>`
      },
      get typeArgs() {
        return [extractType(T)] as [ToTypeStr<ToTypeArgument<T>>]
      },
      isPhantom: OneTimeLockValue.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) => OneTimeLockValue.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => OneTimeLockValue.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => OneTimeLockValue.fromFields(T, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => OneTimeLockValue.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => OneTimeLockValue.fromJSON(T, json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        OneTimeLockValue.fromCoreObject(T, obj),
      fromSuiParsedData: (content: SuiParsedData) => OneTimeLockValue.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) => OneTimeLockValue.fromSuiObjectData(T, content),
      fetch: async (client: ClientWithCoreApi, id: string) => OneTimeLockValue.fetch(client, T, id),
      new: (fields: OneTimeLockValueFields<ToTypeArgument<T>>) => {
        return new OneTimeLockValue([extractType(T)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof OneTimeLockValue.reified {
    return OneTimeLockValue.reified
  }

  static phantom<T extends Reified<TypeArgument, any>>(
    T: T,
  ): PhantomReified<ToTypeStr<OneTimeLockValue<ToTypeArgument<T>>>> {
    return phantom(OneTimeLockValue.reified(T))
  }

  static get p(): typeof OneTimeLockValue.phantom {
    return OneTimeLockValue.phantom
  }

  private static instantiateBcs() {
    return <T extends BcsType<any>>(T: T) =>
      bcs.struct(`OneTimeLockValue<${T.name}>`, {
        id: UID.bcs,
        value: T,
        lock_until_epoch: bcs.u64(),
        valid_before_epoch: bcs.u64(),
      })
  }

  private static cachedBcs: ReturnType<typeof OneTimeLockValue.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof OneTimeLockValue.instantiateBcs> {
    if (!OneTimeLockValue.cachedBcs) {
      OneTimeLockValue.cachedBcs = OneTimeLockValue.instantiateBcs()
    }
    return OneTimeLockValue.cachedBcs
  }

  static fromFields<T extends Reified<TypeArgument, any>>(
    typeArg: T,
    fields: Record<string, any>,
  ): OneTimeLockValue<ToTypeArgument<T>> {
    return OneTimeLockValue.reified(typeArg).new({
      id: decodeFromFields(UID.reified(), fields.id),
      value: decodeFromFields(typeArg, fields.value),
      lockUntilEpoch: decodeFromFields('u64', fields.lock_until_epoch),
      validBeforeEpoch: decodeFromFields('u64', fields.valid_before_epoch),
    })
  }

  static fromFieldsWithTypes<T extends Reified<TypeArgument, any>>(
    typeArg: T,
    item: FieldsWithTypes,
  ): OneTimeLockValue<ToTypeArgument<T>> {
    if (!isOneTimeLockValue(item.type)) {
      throw new Error('not a OneTimeLockValue type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return OneTimeLockValue.reified(typeArg).new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      value: decodeFromFieldsWithTypes(typeArg, item.fields.value),
      lockUntilEpoch: decodeFromFieldsWithTypes('u64', item.fields.lock_until_epoch),
      validBeforeEpoch: decodeFromFieldsWithTypes('u64', item.fields.valid_before_epoch),
    })
  }

  static fromBcs<T extends Reified<TypeArgument, any>>(
    typeArg: T,
    data: Uint8Array,
  ): OneTimeLockValue<ToTypeArgument<T>> {
    const typeArgs = [typeArg]
    return OneTimeLockValue.fromFields(typeArg, OneTimeLockValue.bcs(toBcs(typeArg)).parse(data))
  }

  toJSONField(): OneTimeLockValueJSONField<T> {
    return {
      id: this.id,
      value: fieldToJSON<T>(`${this.$typeArgs[0]}`, this.value),
      lockUntilEpoch: this.lockUntilEpoch.toString(),
      validBeforeEpoch: this.validBeforeEpoch.toString(),
    }
  }

  toJSON(): OneTimeLockValueJSON<T> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T extends Reified<TypeArgument, any>>(
    typeArg: T,
    field: any,
  ): OneTimeLockValue<ToTypeArgument<T>> {
    return OneTimeLockValue.reified(typeArg).new({
      id: decodeFromJSONField(UID.reified(), field.id),
      value: decodeFromJSONField(typeArg, field.value),
      lockUntilEpoch: decodeFromJSONField('u64', field.lockUntilEpoch),
      validBeforeEpoch: decodeFromJSONField('u64', field.validBeforeEpoch),
    })
  }

  static fromJSON<T extends Reified<TypeArgument, any>>(
    typeArg: T,
    json: Record<string, any>,
  ): OneTimeLockValue<ToTypeArgument<T>> {
    if (json.$typeName !== OneTimeLockValue.$typeName) {
      throw new Error(
        `not a OneTimeLockValue json object: expected '${OneTimeLockValue.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(OneTimeLockValue.$typeName, ...[extractType(typeArg)]),
      json.$typeArgs,
      [typeArg],
    )

    return OneTimeLockValue.fromJSONField(typeArg, json)
  }

  static fromCoreObject<T extends Reified<TypeArgument, any>>(
    typeArg: T,
    obj: SuiClientTypes.Object<{ content: true }>,
  ): OneTimeLockValue<ToTypeArgument<T>> {
    if (!isOneTimeLockValue(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a OneTimeLockValue object`)
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

    return OneTimeLockValue.fromBcs(typeArg, obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link OneTimeLockValue.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<T extends Reified<TypeArgument, any>>(
    typeArg: T,
    content: SuiParsedData,
  ): OneTimeLockValue<ToTypeArgument<T>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isOneTimeLockValue(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a OneTimeLockValue object`)
    }
    return OneTimeLockValue.fromFieldsWithTypes(typeArg, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link OneTimeLockValue.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<T extends Reified<TypeArgument, any>>(
    typeArg: T,
    data: SuiObjectData,
  ): OneTimeLockValue<ToTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isOneTimeLockValue(data.bcs.type)) {
        throw new Error(`object at is not a OneTimeLockValue object`)
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

      return OneTimeLockValue.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return OneTimeLockValue.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<T extends Reified<TypeArgument, any>>(
    client: ClientWithCoreApi,
    typeArg: T,
    id: string,
  ): Promise<OneTimeLockValue<ToTypeArgument<T>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isOneTimeLockValue(object.type)) {
      throw new Error(`object at id ${id} is not a OneTimeLockValue object`)
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

    return OneTimeLockValue.fromBcs(typeArg, object.content)
  }
}
