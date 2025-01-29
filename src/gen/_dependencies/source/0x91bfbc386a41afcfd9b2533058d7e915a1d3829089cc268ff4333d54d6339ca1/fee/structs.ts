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
import { UID } from '../../../../sui/object/structs'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== Fee =============================== */

export function isFee(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::fee::Fee` + '<')
}

export interface FeeFields<T extends PhantomTypeArgument> {
  id: ToField<UID>
  fee: ToField<'u32'>
  tickSpacing: ToField<'u32'>
}

export type FeeReified<T extends PhantomTypeArgument> = Reified<Fee<T>, FeeFields<T>>

export class Fee<T extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::fee::Fee`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = Fee.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::fee::Fee<${PhantomToTypeStr<T>}>`
  readonly $typeArgs: [PhantomToTypeStr<T>]
  readonly $isPhantom = Fee.$isPhantom

  readonly id: ToField<UID>
  readonly fee: ToField<'u32'>
  readonly tickSpacing: ToField<'u32'>

  private constructor(typeArgs: [PhantomToTypeStr<T>], fields: FeeFields<T>) {
    this.$fullTypeName = composeSuiType(
      Fee.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::fee::Fee<${PhantomToTypeStr<T>}>`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.fee = fields.fee
    this.tickSpacing = fields.tickSpacing
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): FeeReified<ToPhantomTypeArgument<T>> {
    return {
      typeName: Fee.$typeName,
      fullTypeName: composeSuiType(
        Fee.$typeName,
        ...[extractType(T)]
      ) as `${typeof PKG_V1}::fee::Fee<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`,
      typeArgs: [extractType(T)] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>],
      isPhantom: Fee.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) => Fee.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Fee.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => Fee.fromBcs(T, data),
      bcs: Fee.bcs,
      fromJSONField: (field: any) => Fee.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => Fee.fromJSON(T, json),
      fromSuiParsedData: (content: SuiParsedData) => Fee.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) => Fee.fromSuiObjectData(T, content),
      fetch: async (client: SuiClient, id: string) => Fee.fetch(client, T, id),
      new: (fields: FeeFields<ToPhantomTypeArgument<T>>) => {
        return new Fee([extractType(T)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return Fee.reified
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): PhantomReified<ToTypeStr<Fee<ToPhantomTypeArgument<T>>>> {
    return phantom(Fee.reified(T))
  }
  static get p() {
    return Fee.phantom
  }

  static get bcs() {
    return bcs.struct('Fee', {
      id: UID.bcs,
      fee: bcs.u32(),
      tick_spacing: bcs.u32(),
    })
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>
  ): Fee<ToPhantomTypeArgument<T>> {
    return Fee.reified(typeArg).new({
      id: decodeFromFields(UID.reified(), fields.id),
      fee: decodeFromFields('u32', fields.fee),
      tickSpacing: decodeFromFields('u32', fields.tick_spacing),
    })
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes
  ): Fee<ToPhantomTypeArgument<T>> {
    if (!isFee(item.type)) {
      throw new Error('not a Fee type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return Fee.reified(typeArg).new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      fee: decodeFromFieldsWithTypes('u32', item.fields.fee),
      tickSpacing: decodeFromFieldsWithTypes('u32', item.fields.tick_spacing),
    })
  }

  static fromBcs<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: Uint8Array
  ): Fee<ToPhantomTypeArgument<T>> {
    return Fee.fromFields(typeArg, Fee.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      fee: this.fee,
      tickSpacing: this.tickSpacing,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any
  ): Fee<ToPhantomTypeArgument<T>> {
    return Fee.reified(typeArg).new({
      id: decodeFromJSONField(UID.reified(), field.id),
      fee: decodeFromJSONField('u32', field.fee),
      tickSpacing: decodeFromJSONField('u32', field.tickSpacing),
    })
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>
  ): Fee<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== Fee.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(Fee.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return Fee.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData
  ): Fee<ToPhantomTypeArgument<T>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isFee(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Fee object`)
    }
    return Fee.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData
  ): Fee<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isFee(data.bcs.type)) {
        throw new Error(`object at is not a Fee object`)
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

      return Fee.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Fee.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T,
    id: string
  ): Promise<Fee<ToPhantomTypeArgument<T>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching Fee object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isFee(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Fee object`)
    }

    return Fee.fromSuiObjectData(typeArg, res.data)
  }
}
