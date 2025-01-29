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
import { TypeName } from '../../../../move-stdlib/type-name/structs'
import { Balance } from '../../../../sui/balance/structs'
import { ID, UID } from '../../../../sui/object/structs'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== SpoolAccount =============================== */

export function isSpoolAccount(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::spool_account::SpoolAccount` + '<')
}

export interface SpoolAccountFields<T0 extends PhantomTypeArgument> {
  id: ToField<UID>
  spoolId: ToField<ID>
  stakeType: ToField<TypeName>
  stakes: ToField<Balance<T0>>
  points: ToField<'u64'>
  totalPoints: ToField<'u64'>
  index: ToField<'u64'>
}

export type SpoolAccountReified<T0 extends PhantomTypeArgument> = Reified<
  SpoolAccount<T0>,
  SpoolAccountFields<T0>
>

export class SpoolAccount<T0 extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::spool_account::SpoolAccount`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = SpoolAccount.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::spool_account::SpoolAccount<${PhantomToTypeStr<T0>}>`
  readonly $typeArgs: [PhantomToTypeStr<T0>]
  readonly $isPhantom = SpoolAccount.$isPhantom

  readonly id: ToField<UID>
  readonly spoolId: ToField<ID>
  readonly stakeType: ToField<TypeName>
  readonly stakes: ToField<Balance<T0>>
  readonly points: ToField<'u64'>
  readonly totalPoints: ToField<'u64'>
  readonly index: ToField<'u64'>

  private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: SpoolAccountFields<T0>) {
    this.$fullTypeName = composeSuiType(
      SpoolAccount.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::spool_account::SpoolAccount<${PhantomToTypeStr<T0>}>`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.spoolId = fields.spoolId
    this.stakeType = fields.stakeType
    this.stakes = fields.stakes
    this.points = fields.points
    this.totalPoints = fields.totalPoints
    this.index = fields.index
  }

  static reified<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0
  ): SpoolAccountReified<ToPhantomTypeArgument<T0>> {
    return {
      typeName: SpoolAccount.$typeName,
      fullTypeName: composeSuiType(
        SpoolAccount.$typeName,
        ...[extractType(T0)]
      ) as `${typeof PKG_V1}::spool_account::SpoolAccount<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`,
      typeArgs: [extractType(T0)] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>],
      isPhantom: SpoolAccount.$isPhantom,
      reifiedTypeArgs: [T0],
      fromFields: (fields: Record<string, any>) => SpoolAccount.fromFields(T0, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => SpoolAccount.fromFieldsWithTypes(T0, item),
      fromBcs: (data: Uint8Array) => SpoolAccount.fromBcs(T0, data),
      bcs: SpoolAccount.bcs,
      fromJSONField: (field: any) => SpoolAccount.fromJSONField(T0, field),
      fromJSON: (json: Record<string, any>) => SpoolAccount.fromJSON(T0, json),
      fromSuiParsedData: (content: SuiParsedData) => SpoolAccount.fromSuiParsedData(T0, content),
      fromSuiObjectData: (content: SuiObjectData) => SpoolAccount.fromSuiObjectData(T0, content),
      fetch: async (client: SuiClient, id: string) => SpoolAccount.fetch(client, T0, id),
      new: (fields: SpoolAccountFields<ToPhantomTypeArgument<T0>>) => {
        return new SpoolAccount([extractType(T0)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return SpoolAccount.reified
  }

  static phantom<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0
  ): PhantomReified<ToTypeStr<SpoolAccount<ToPhantomTypeArgument<T0>>>> {
    return phantom(SpoolAccount.reified(T0))
  }
  static get p() {
    return SpoolAccount.phantom
  }

  static get bcs() {
    return bcs.struct('SpoolAccount', {
      id: UID.bcs,
      spool_id: ID.bcs,
      stake_type: TypeName.bcs,
      stakes: Balance.bcs,
      points: bcs.u64(),
      total_points: bcs.u64(),
      index: bcs.u64(),
    })
  }

  static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    fields: Record<string, any>
  ): SpoolAccount<ToPhantomTypeArgument<T0>> {
    return SpoolAccount.reified(typeArg).new({
      id: decodeFromFields(UID.reified(), fields.id),
      spoolId: decodeFromFields(ID.reified(), fields.spool_id),
      stakeType: decodeFromFields(TypeName.reified(), fields.stake_type),
      stakes: decodeFromFields(Balance.reified(typeArg), fields.stakes),
      points: decodeFromFields('u64', fields.points),
      totalPoints: decodeFromFields('u64', fields.total_points),
      index: decodeFromFields('u64', fields.index),
    })
  }

  static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    item: FieldsWithTypes
  ): SpoolAccount<ToPhantomTypeArgument<T0>> {
    if (!isSpoolAccount(item.type)) {
      throw new Error('not a SpoolAccount type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return SpoolAccount.reified(typeArg).new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      spoolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.spool_id),
      stakeType: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.stake_type),
      stakes: decodeFromFieldsWithTypes(Balance.reified(typeArg), item.fields.stakes),
      points: decodeFromFieldsWithTypes('u64', item.fields.points),
      totalPoints: decodeFromFieldsWithTypes('u64', item.fields.total_points),
      index: decodeFromFieldsWithTypes('u64', item.fields.index),
    })
  }

  static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: Uint8Array
  ): SpoolAccount<ToPhantomTypeArgument<T0>> {
    return SpoolAccount.fromFields(typeArg, SpoolAccount.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      spoolId: this.spoolId,
      stakeType: this.stakeType.toJSONField(),
      stakes: this.stakes.toJSONField(),
      points: this.points.toString(),
      totalPoints: this.totalPoints.toString(),
      index: this.index.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    field: any
  ): SpoolAccount<ToPhantomTypeArgument<T0>> {
    return SpoolAccount.reified(typeArg).new({
      id: decodeFromJSONField(UID.reified(), field.id),
      spoolId: decodeFromJSONField(ID.reified(), field.spoolId),
      stakeType: decodeFromJSONField(TypeName.reified(), field.stakeType),
      stakes: decodeFromJSONField(Balance.reified(typeArg), field.stakes),
      points: decodeFromJSONField('u64', field.points),
      totalPoints: decodeFromJSONField('u64', field.totalPoints),
      index: decodeFromJSONField('u64', field.index),
    })
  }

  static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    json: Record<string, any>
  ): SpoolAccount<ToPhantomTypeArgument<T0>> {
    if (json.$typeName !== SpoolAccount.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(SpoolAccount.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return SpoolAccount.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    content: SuiParsedData
  ): SpoolAccount<ToPhantomTypeArgument<T0>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isSpoolAccount(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a SpoolAccount object`)
    }
    return SpoolAccount.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: SuiObjectData
  ): SpoolAccount<ToPhantomTypeArgument<T0>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isSpoolAccount(data.bcs.type)) {
        throw new Error(`object at is not a SpoolAccount object`)
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

      return SpoolAccount.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return SpoolAccount.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T0,
    id: string
  ): Promise<SpoolAccount<ToPhantomTypeArgument<T0>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching SpoolAccount object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isSpoolAccount(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a SpoolAccount object`)
    }

    return SpoolAccount.fromSuiObjectData(typeArg, res.data)
  }
}
