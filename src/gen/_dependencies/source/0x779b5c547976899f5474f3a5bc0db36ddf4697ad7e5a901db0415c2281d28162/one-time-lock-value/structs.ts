import {
  PhantomReified,
  Reified,
  StructClass,
  ToField,
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
} from '../../../../_framework/reified'
import {
  FieldsWithTypes,
  composeSuiType,
  compressSuiType,
  parseTypeName,
} from '../../../../_framework/util'
import { UID } from '../../../../sui/object/structs'
import { PKG_V1 } from '../index'
import { BcsType, bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== OneTimeLockValue =============================== */

export function isOneTimeLockValue(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::one_time_lock_value::OneTimeLockValue` + '<')
}

export interface OneTimeLockValueFields<T0 extends TypeArgument> {
  id: ToField<UID>
  value: ToField<T0>
  lockUntilEpoch: ToField<'u64'>
  validBeforeEpoch: ToField<'u64'>
}

export type OneTimeLockValueReified<T0 extends TypeArgument> = Reified<
  OneTimeLockValue<T0>,
  OneTimeLockValueFields<T0>
>

export class OneTimeLockValue<T0 extends TypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::one_time_lock_value::OneTimeLockValue`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [false] as const

  readonly $typeName = OneTimeLockValue.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::one_time_lock_value::OneTimeLockValue<${ToTypeStr<T0>}>`
  readonly $typeArgs: [ToTypeStr<T0>]
  readonly $isPhantom = OneTimeLockValue.$isPhantom

  readonly id: ToField<UID>
  readonly value: ToField<T0>
  readonly lockUntilEpoch: ToField<'u64'>
  readonly validBeforeEpoch: ToField<'u64'>

  private constructor(typeArgs: [ToTypeStr<T0>], fields: OneTimeLockValueFields<T0>) {
    this.$fullTypeName = composeSuiType(
      OneTimeLockValue.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::one_time_lock_value::OneTimeLockValue<${ToTypeStr<T0>}>`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.value = fields.value
    this.lockUntilEpoch = fields.lockUntilEpoch
    this.validBeforeEpoch = fields.validBeforeEpoch
  }

  static reified<T0 extends Reified<TypeArgument, any>>(
    T0: T0
  ): OneTimeLockValueReified<ToTypeArgument<T0>> {
    const reifiedBcs = OneTimeLockValue.bcs(toBcs(T0))
    return {
      typeName: OneTimeLockValue.$typeName,
      fullTypeName: composeSuiType(
        OneTimeLockValue.$typeName,
        ...[extractType(T0)]
      ) as `${typeof PKG_V1}::one_time_lock_value::OneTimeLockValue<${ToTypeStr<ToTypeArgument<T0>>}>`,
      typeArgs: [extractType(T0)] as [ToTypeStr<ToTypeArgument<T0>>],
      isPhantom: OneTimeLockValue.$isPhantom,
      reifiedTypeArgs: [T0],
      fromFields: (fields: Record<string, any>) => OneTimeLockValue.fromFields(T0, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        OneTimeLockValue.fromFieldsWithTypes(T0, item),
      fromBcs: (data: Uint8Array) => OneTimeLockValue.fromFields(T0, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => OneTimeLockValue.fromJSONField(T0, field),
      fromJSON: (json: Record<string, any>) => OneTimeLockValue.fromJSON(T0, json),
      fromSuiParsedData: (content: SuiParsedData) =>
        OneTimeLockValue.fromSuiParsedData(T0, content),
      fromSuiObjectData: (content: SuiObjectData) =>
        OneTimeLockValue.fromSuiObjectData(T0, content),
      fetch: async (client: SuiClient, id: string) => OneTimeLockValue.fetch(client, T0, id),
      new: (fields: OneTimeLockValueFields<ToTypeArgument<T0>>) => {
        return new OneTimeLockValue([extractType(T0)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return OneTimeLockValue.reified
  }

  static phantom<T0 extends Reified<TypeArgument, any>>(
    T0: T0
  ): PhantomReified<ToTypeStr<OneTimeLockValue<ToTypeArgument<T0>>>> {
    return phantom(OneTimeLockValue.reified(T0))
  }
  static get p() {
    return OneTimeLockValue.phantom
  }

  private static instantiateBcs() {
    return <T0 extends BcsType<any>>(T0: T0) =>
      bcs.struct(`OneTimeLockValue<${T0.name}>`, {
        id: UID.bcs,
        value: T0,
        lock_until_epoch: bcs.u64(),
        valid_before_epoch: bcs.u64(),
      })
  }

  private static cachedBcs: ReturnType<typeof OneTimeLockValue.instantiateBcs> | null = null

  static get bcs() {
    if (!OneTimeLockValue.cachedBcs) {
      OneTimeLockValue.cachedBcs = OneTimeLockValue.instantiateBcs()
    }
    return OneTimeLockValue.cachedBcs
  }

  static fromFields<T0 extends Reified<TypeArgument, any>>(
    typeArg: T0,
    fields: Record<string, any>
  ): OneTimeLockValue<ToTypeArgument<T0>> {
    return OneTimeLockValue.reified(typeArg).new({
      id: decodeFromFields(UID.reified(), fields.id),
      value: decodeFromFields(typeArg, fields.value),
      lockUntilEpoch: decodeFromFields('u64', fields.lock_until_epoch),
      validBeforeEpoch: decodeFromFields('u64', fields.valid_before_epoch),
    })
  }

  static fromFieldsWithTypes<T0 extends Reified<TypeArgument, any>>(
    typeArg: T0,
    item: FieldsWithTypes
  ): OneTimeLockValue<ToTypeArgument<T0>> {
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

  static fromBcs<T0 extends Reified<TypeArgument, any>>(
    typeArg: T0,
    data: Uint8Array
  ): OneTimeLockValue<ToTypeArgument<T0>> {
    const typeArgs = [typeArg]

    return OneTimeLockValue.fromFields(
      typeArg,
      OneTimeLockValue.bcs(toBcs(typeArgs[0])).parse(data)
    )
  }

  toJSONField() {
    return {
      id: this.id,
      value: fieldToJSON<T0>(this.$typeArgs[0], this.value),
      lockUntilEpoch: this.lockUntilEpoch.toString(),
      validBeforeEpoch: this.validBeforeEpoch.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T0 extends Reified<TypeArgument, any>>(
    typeArg: T0,
    field: any
  ): OneTimeLockValue<ToTypeArgument<T0>> {
    return OneTimeLockValue.reified(typeArg).new({
      id: decodeFromJSONField(UID.reified(), field.id),
      value: decodeFromJSONField(typeArg, field.value),
      lockUntilEpoch: decodeFromJSONField('u64', field.lockUntilEpoch),
      validBeforeEpoch: decodeFromJSONField('u64', field.validBeforeEpoch),
    })
  }

  static fromJSON<T0 extends Reified<TypeArgument, any>>(
    typeArg: T0,
    json: Record<string, any>
  ): OneTimeLockValue<ToTypeArgument<T0>> {
    if (json.$typeName !== OneTimeLockValue.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(OneTimeLockValue.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return OneTimeLockValue.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T0 extends Reified<TypeArgument, any>>(
    typeArg: T0,
    content: SuiParsedData
  ): OneTimeLockValue<ToTypeArgument<T0>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isOneTimeLockValue(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a OneTimeLockValue object`)
    }
    return OneTimeLockValue.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T0 extends Reified<TypeArgument, any>>(
    typeArg: T0,
    data: SuiObjectData
  ): OneTimeLockValue<ToTypeArgument<T0>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isOneTimeLockValue(data.bcs.type)) {
        throw new Error(`object at is not a OneTimeLockValue object`)
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

      return OneTimeLockValue.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return OneTimeLockValue.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<T0 extends Reified<TypeArgument, any>>(
    client: SuiClient,
    typeArg: T0,
    id: string
  ): Promise<OneTimeLockValue<ToTypeArgument<T0>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching OneTimeLockValue object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isOneTimeLockValue(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a OneTimeLockValue object`)
    }

    return OneTimeLockValue.fromSuiObjectData(typeArg, res.data)
  }
}
