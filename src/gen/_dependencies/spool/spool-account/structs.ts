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
    `${getTypeOrigin('spool', 'spool_account::SpoolAccount')}::spool_account::SpoolAccount` + '<',
  )
}

export interface SpoolAccountFields<StakeType extends PhantomTypeArgument> {
  id: ToField<UID>
  spoolId: ToField<ID>
  stakeType: ToField<TypeName>
  stakes: ToField<Balance<StakeType>>
  /** the current user point */
  points: ToField<'u64'>
  /** total points that user already got from the pool */
  totalPoints: ToField<'u64'>
  index: ToField<'u64'>
}

export type SpoolAccountReified<StakeType extends PhantomTypeArgument> = Reified<
  SpoolAccount<StakeType>,
  SpoolAccountFields<StakeType>
>

export type SpoolAccountJSONField<StakeType extends PhantomTypeArgument> = {
  id: string
  spoolId: string
  stakeType: string
  stakes: ToJSON<Balance<StakeType>>
  points: string
  totalPoints: string
  index: string
}

export type SpoolAccountJSON<StakeType extends PhantomTypeArgument> = {
  $typeName: typeof SpoolAccount.$typeName
  $typeArgs: [PhantomToTypeStr<StakeType>]
} & SpoolAccountJSONField<StakeType>

export class SpoolAccount<StakeType extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::spool_account::SpoolAccount` = `${
    getTypeOrigin('spool', 'spool_account::SpoolAccount')
  }::spool_account::SpoolAccount` as const
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName: typeof SpoolAccount.$typeName = SpoolAccount.$typeName
  readonly $fullTypeName: `${string}::spool_account::SpoolAccount<${PhantomToTypeStr<StakeType>}>`
  readonly $typeArgs: [PhantomToTypeStr<StakeType>]
  readonly $isPhantom: typeof SpoolAccount.$isPhantom = SpoolAccount.$isPhantom

  readonly id: ToField<UID>
  readonly spoolId: ToField<ID>
  readonly stakeType: ToField<TypeName>
  readonly stakes: ToField<Balance<StakeType>>
  /** the current user point */
  readonly points: ToField<'u64'>
  /** total points that user already got from the pool */
  readonly totalPoints: ToField<'u64'>
  readonly index: ToField<'u64'>

  private constructor(
    typeArgs: [PhantomToTypeStr<StakeType>],
    fields: SpoolAccountFields<StakeType>,
  ) {
    this.$fullTypeName = composeSuiType(
      SpoolAccount.$typeName,
      ...typeArgs,
    ) as `${string}::spool_account::SpoolAccount<${PhantomToTypeStr<StakeType>}>`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.spoolId = fields.spoolId
    this.stakeType = fields.stakeType
    this.stakes = fields.stakes
    this.points = fields.points
    this.totalPoints = fields.totalPoints
    this.index = fields.index
  }

  static reified<StakeType extends PhantomReified<PhantomTypeArgument>>(
    StakeType: StakeType,
  ): SpoolAccountReified<ToPhantomTypeArgument<StakeType>> {
    const reifiedBcs = SpoolAccount.bcs
    return {
      typeName: SpoolAccount.$typeName,
      fullTypeName: composeSuiType(
        SpoolAccount.$typeName,
        ...[extractType(StakeType)],
      ) as `${string}::spool_account::SpoolAccount<${PhantomToTypeStr<
        ToPhantomTypeArgument<StakeType>
      >}>`,
      typeArgs: [extractType(StakeType)] as [PhantomToTypeStr<ToPhantomTypeArgument<StakeType>>],
      isPhantom: SpoolAccount.$isPhantom,
      reifiedTypeArgs: [StakeType],
      fromFields: (fields: Record<string, any>) => SpoolAccount.fromFields(StakeType, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        SpoolAccount.fromFieldsWithTypes(StakeType, item),
      fromBcs: (data: Uint8Array) => SpoolAccount.fromFields(StakeType, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => SpoolAccount.fromJSONField(StakeType, field),
      fromJSON: (json: Record<string, any>) => SpoolAccount.fromJSON(StakeType, json),
      fromSuiParsedData: (content: SuiParsedData) =>
        SpoolAccount.fromSuiParsedData(StakeType, content),
      fromSuiObjectData: (content: SuiObjectData) =>
        SpoolAccount.fromSuiObjectData(StakeType, content),
      fetch: async (client: SupportedSuiClient, id: string) =>
        SpoolAccount.fetch(client, StakeType, id),
      new: (fields: SpoolAccountFields<ToPhantomTypeArgument<StakeType>>) => {
        return new SpoolAccount([extractType(StakeType)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof SpoolAccount.reified {
    return SpoolAccount.reified
  }

  static phantom<StakeType extends PhantomReified<PhantomTypeArgument>>(
    StakeType: StakeType,
  ): PhantomReified<ToTypeStr<SpoolAccount<ToPhantomTypeArgument<StakeType>>>> {
    return phantom(SpoolAccount.reified(StakeType))
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

  static fromFields<StakeType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: StakeType,
    fields: Record<string, any>,
  ): SpoolAccount<ToPhantomTypeArgument<StakeType>> {
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

  static fromFieldsWithTypes<StakeType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: StakeType,
    item: FieldsWithTypes,
  ): SpoolAccount<ToPhantomTypeArgument<StakeType>> {
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

  static fromBcs<StakeType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: StakeType,
    data: Uint8Array,
  ): SpoolAccount<ToPhantomTypeArgument<StakeType>> {
    return SpoolAccount.fromFields(typeArg, SpoolAccount.bcs.parse(data))
  }

  toJSONField(): SpoolAccountJSONField<StakeType> {
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

  toJSON(): SpoolAccountJSON<StakeType> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<StakeType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: StakeType,
    field: any,
  ): SpoolAccount<ToPhantomTypeArgument<StakeType>> {
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

  static fromJSON<StakeType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: StakeType,
    json: Record<string, any>,
  ): SpoolAccount<ToPhantomTypeArgument<StakeType>> {
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

  static fromSuiParsedData<StakeType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: StakeType,
    content: SuiParsedData,
  ): SpoolAccount<ToPhantomTypeArgument<StakeType>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isSpoolAccount(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a SpoolAccount object`)
    }
    return SpoolAccount.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<StakeType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: StakeType,
    data: SuiObjectData,
  ): SpoolAccount<ToPhantomTypeArgument<StakeType>> {
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

  static async fetch<StakeType extends PhantomReified<PhantomTypeArgument>>(
    client: SupportedSuiClient,
    typeArg: StakeType,
    id: string,
  ): Promise<SpoolAccount<ToPhantomTypeArgument<StakeType>>> {
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
