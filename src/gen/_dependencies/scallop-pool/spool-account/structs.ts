import { bcs } from '@mysten/sui/bcs'
import { SuiObjectData, SuiParsedData } from '@mysten/sui/client'
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
  fetchObjectBcs,
  FieldsWithTypes,
  parseTypeName,
  SupportedSuiClient,
} from '../../../_framework/util'
import { TypeName } from '../../../std/type-name/structs'
import { Balance } from '../../../sui/balance/structs'
import { ID, UID } from '../../../sui/object/structs'

/* ============================== SpoolAccount =============================== */

export function isSpoolAccount(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    `${getTypeOrigin('scallop-pool', 'spool_account::SpoolAccount')}::spool_account::SpoolAccount`
      + '<',
  )
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

export type SpoolAccountJSONField<T0 extends PhantomTypeArgument> = {
  id: string
  spoolId: string
  stakeType: string
  stakes: ToJSON<Balance<T0>>
  points: string
  totalPoints: string
  index: string
}

export type SpoolAccountJSON<T0 extends PhantomTypeArgument> = {
  $typeName: typeof SpoolAccount.$typeName
  $typeArgs: [PhantomToTypeStr<T0>]
} & SpoolAccountJSONField<T0>

export class SpoolAccount<T0 extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::spool_account::SpoolAccount` = `${
    getTypeOrigin('scallop-pool', 'spool_account::SpoolAccount')
  }::spool_account::SpoolAccount` as const
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName: typeof SpoolAccount.$typeName = SpoolAccount.$typeName
  readonly $fullTypeName: `${string}::spool_account::SpoolAccount<${PhantomToTypeStr<T0>}>`
  readonly $typeArgs: [PhantomToTypeStr<T0>]
  readonly $isPhantom: typeof SpoolAccount.$isPhantom = SpoolAccount.$isPhantom

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
      ...typeArgs,
    ) as `${string}::spool_account::SpoolAccount<${PhantomToTypeStr<T0>}>`
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
    T0: T0,
  ): SpoolAccountReified<ToPhantomTypeArgument<T0>> {
    const reifiedBcs = SpoolAccount.bcs
    return {
      typeName: SpoolAccount.$typeName,
      fullTypeName: composeSuiType(
        SpoolAccount.$typeName,
        ...[extractType(T0)],
      ) as `${string}::spool_account::SpoolAccount<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`,
      typeArgs: [extractType(T0)] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>],
      isPhantom: SpoolAccount.$isPhantom,
      reifiedTypeArgs: [T0],
      fromFields: (fields: Record<string, any>) => SpoolAccount.fromFields(T0, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => SpoolAccount.fromFieldsWithTypes(T0, item),
      fromBcs: (data: Uint8Array) => SpoolAccount.fromFields(T0, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => SpoolAccount.fromJSONField(T0, field),
      fromJSON: (json: Record<string, any>) => SpoolAccount.fromJSON(T0, json),
      fromSuiParsedData: (content: SuiParsedData) => SpoolAccount.fromSuiParsedData(T0, content),
      fromSuiObjectData: (content: SuiObjectData) => SpoolAccount.fromSuiObjectData(T0, content),
      fetch: async (client: SupportedSuiClient, id: string) => SpoolAccount.fetch(client, T0, id),
      new: (fields: SpoolAccountFields<ToPhantomTypeArgument<T0>>) => {
        return new SpoolAccount([extractType(T0)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof SpoolAccount.reified {
    return SpoolAccount.reified
  }

  static phantom<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0,
  ): PhantomReified<ToTypeStr<SpoolAccount<ToPhantomTypeArgument<T0>>>> {
    return phantom(SpoolAccount.reified(T0))
  }

  static get p(): typeof SpoolAccount.phantom {
    return SpoolAccount.phantom
  }

  private static instantiateBcs() {
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

  private static cachedBcs: ReturnType<typeof SpoolAccount.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof SpoolAccount.instantiateBcs> {
    if (!SpoolAccount.cachedBcs) {
      SpoolAccount.cachedBcs = SpoolAccount.instantiateBcs()
    }
    return SpoolAccount.cachedBcs
  }

  static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    fields: Record<string, any>,
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
    item: FieldsWithTypes,
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
    data: Uint8Array,
  ): SpoolAccount<ToPhantomTypeArgument<T0>> {
    return SpoolAccount.fromFields(typeArg, SpoolAccount.bcs.parse(data))
  }

  toJSONField(): SpoolAccountJSONField<T0> {
    return {
      id: this.id,
      spoolId: this.spoolId,
      stakeType: this.stakeType,
      stakes: this.stakes.toJSONField(),
      points: this.points.toString(),
      totalPoints: this.totalPoints.toString(),
      index: this.index.toString(),
    }
  }

  toJSON(): SpoolAccountJSON<T0> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    field: any,
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
    json: Record<string, any>,
  ): SpoolAccount<ToPhantomTypeArgument<T0>> {
    if (json.$typeName !== SpoolAccount.$typeName) {
      throw new Error(
        `not a SpoolAccount json object: expected '${SpoolAccount.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(SpoolAccount.$typeName, ...[extractType(typeArg)]),
      json.$typeArgs,
      [typeArg],
    )

    return SpoolAccount.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    content: SuiParsedData,
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
    data: SuiObjectData,
  ): SpoolAccount<ToPhantomTypeArgument<T0>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isSpoolAccount(data.bcs.type)) {
        throw new Error(`object at is not a SpoolAccount object`)
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

      return SpoolAccount.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return SpoolAccount.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>(
    client: SupportedSuiClient,
    typeArg: T0,
    id: string,
  ): Promise<SpoolAccount<ToPhantomTypeArgument<T0>>> {
    const res = await fetchObjectBcs(client, id)
    if (!isSpoolAccount(res.type)) {
      throw new Error(`object at id ${id} is not a SpoolAccount object`)
    }

    const gotTypeArgs = parseTypeName(res.type).typeArgs
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

    return SpoolAccount.fromBcs(typeArg, res.bcsBytes)
  }
}
