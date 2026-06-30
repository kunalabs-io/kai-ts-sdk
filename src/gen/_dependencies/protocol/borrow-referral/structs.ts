/**
 * @title An extention which let external authorized package to customize the referral fee & borrow fee discount for user
 * @author Scallop Labs
 * @dev Create a `BorrowReferral` object, pass it to borrow function, the discount will be applied to the borrower,
 * and the referral revenue will be put into the `referral_revenue` field of the BorrowReferral object.
 * Later in the authorized package will be responsible for distributing the referral revenue to the referrer.
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
  PhantomToTypeStr,
  PhantomTypeArgument,
  Reified,
  StructClass,
  toBcs,
  ToField,
  ToJSON,
  ToPhantomTypeArgument,
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
import { TypeName } from '../../../std/type-name/structs'
import { Balance } from '../../../sui/balance/structs'
import { UID } from '../../../sui/object/structs'
import { VecSet } from '../../../sui/vec-set/structs'

/* ============================== BorrowReferral =============================== */

export function isBorrowReferral(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    `${
      getTypeOrigin('protocol', 'borrow_referral::BorrowReferral')
    }::borrow_referral::BorrowReferral` + '<',
  )
}

export interface BorrowReferralFields<
  CoinType extends PhantomTypeArgument,
  Witness extends TypeArgument,
> {
  id: ToField<UID>
  borrowFeeDiscount: ToField<'u64'>
  referralShare: ToField<'u64'>
  borrowed: ToField<'u64'>
  referralFee: ToField<Balance<CoinType>>
  witness: ToField<Witness>
}

export type BorrowReferralReified<
  CoinType extends PhantomTypeArgument,
  Witness extends TypeArgument,
> = Reified<BorrowReferral<CoinType, Witness>, BorrowReferralFields<CoinType, Witness>>

export type BorrowReferralJSONField<
  CoinType extends PhantomTypeArgument,
  Witness extends TypeArgument,
> = {
  id: string
  borrowFeeDiscount: string
  referralShare: string
  borrowed: string
  referralFee: ToJSON<Balance<CoinType>>
  witness: ToJSON<Witness>
}

export type BorrowReferralJSON<CoinType extends PhantomTypeArgument, Witness extends TypeArgument> =
  & {
    $typeName: typeof BorrowReferral.$typeName
    $typeArgs: [PhantomToTypeStr<CoinType>, ToTypeStr<Witness>]
  }
  & BorrowReferralJSONField<CoinType, Witness>

export class BorrowReferral<CoinType extends PhantomTypeArgument, Witness extends TypeArgument>
  implements StructClass
{
  __StructClass = true as const

  static get $typeName(): `${string}::borrow_referral::BorrowReferral` {
    return `${
      getTypeOrigin('protocol', 'borrow_referral::BorrowReferral')
    }::borrow_referral::BorrowReferral` as const
  }
  static readonly $numTypeParams = 2
  static readonly $isPhantom = [true, false] as const

  readonly $typeName: typeof BorrowReferral.$typeName = BorrowReferral.$typeName
  readonly $fullTypeName: `${string}::borrow_referral::BorrowReferral<${PhantomToTypeStr<
    CoinType
  >}, ${ToTypeStr<Witness>}>`
  readonly $typeArgs: [PhantomToTypeStr<CoinType>, ToTypeStr<Witness>]
  readonly $isPhantom: typeof BorrowReferral.$isPhantom = BorrowReferral.$isPhantom

  readonly id: ToField<UID>
  readonly borrowFeeDiscount: ToField<'u64'>
  readonly referralShare: ToField<'u64'>
  readonly borrowed: ToField<'u64'>
  readonly referralFee: ToField<Balance<CoinType>>
  readonly witness: ToField<Witness>

  private constructor(
    typeArgs: [PhantomToTypeStr<CoinType>, ToTypeStr<Witness>],
    fields: BorrowReferralFields<CoinType, Witness>,
  ) {
    this.$fullTypeName = composeSuiType(
      BorrowReferral.$typeName,
      ...typeArgs,
    ) as `${string}::borrow_referral::BorrowReferral<${PhantomToTypeStr<CoinType>}, ${ToTypeStr<
      Witness
    >}>`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.borrowFeeDiscount = fields.borrowFeeDiscount
    this.referralShare = fields.referralShare
    this.borrowed = fields.borrowed
    this.referralFee = fields.referralFee
    this.witness = fields.witness
  }

  static reified<
    CoinType extends PhantomReified<PhantomTypeArgument>,
    Witness extends Reified<TypeArgument, any>,
  >(
    CoinType: CoinType,
    Witness: Witness,
  ): BorrowReferralReified<ToPhantomTypeArgument<CoinType>, ToTypeArgument<Witness>> {
    const reifiedBcs = BorrowReferral.bcs(toBcs(Witness))
    return {
      get typeName() {
        return BorrowReferral.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          BorrowReferral.$typeName,
          ...[extractType(CoinType), extractType(Witness)],
        ) as `${string}::borrow_referral::BorrowReferral<${PhantomToTypeStr<
          ToPhantomTypeArgument<CoinType>
        >}, ${ToTypeStr<ToTypeArgument<Witness>>}>`
      },
      get typeArgs() {
        return [extractType(CoinType), extractType(Witness)] as [
          PhantomToTypeStr<ToPhantomTypeArgument<CoinType>>,
          ToTypeStr<ToTypeArgument<Witness>>,
        ]
      },
      isPhantom: BorrowReferral.$isPhantom,
      reifiedTypeArgs: [CoinType, Witness],
      fromFields: (fields: Record<string, any>) =>
        BorrowReferral.fromFields([CoinType, Witness], fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        BorrowReferral.fromFieldsWithTypes([CoinType, Witness], item),
      fromBcs: (data: Uint8Array) =>
        BorrowReferral.fromFields([CoinType, Witness], reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => BorrowReferral.fromJSONField([CoinType, Witness], field),
      fromJSON: (json: Record<string, any>) => BorrowReferral.fromJSON([CoinType, Witness], json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        BorrowReferral.fromCoreObject([CoinType, Witness], obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        BorrowReferral.fromSuiParsedData([CoinType, Witness], content),
      fromSuiObjectData: (content: SuiObjectData) =>
        BorrowReferral.fromSuiObjectData([CoinType, Witness], content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        BorrowReferral.fetch(client, [CoinType, Witness], id),
      new: (
        fields: BorrowReferralFields<ToPhantomTypeArgument<CoinType>, ToTypeArgument<Witness>>,
      ) => {
        return new BorrowReferral([extractType(CoinType), extractType(Witness)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof BorrowReferral.reified {
    return BorrowReferral.reified
  }

  static phantom<
    CoinType extends PhantomReified<PhantomTypeArgument>,
    Witness extends Reified<TypeArgument, any>,
  >(
    CoinType: CoinType,
    Witness: Witness,
  ): PhantomReified<
    ToTypeStr<BorrowReferral<ToPhantomTypeArgument<CoinType>, ToTypeArgument<Witness>>>
  > {
    return phantom(BorrowReferral.reified(CoinType, Witness))
  }

  static get p(): typeof BorrowReferral.phantom {
    return BorrowReferral.phantom
  }

  private static instantiateBcs() {
    return <Witness extends BcsType<any>>(Witness: Witness) =>
      bcs.struct(`BorrowReferral<${Witness.name}>`, {
        id: UID.bcs,
        borrow_fee_discount: bcs.u64(),
        referral_share: bcs.u64(),
        borrowed: bcs.u64(),
        referral_fee: Balance.bcs,
        witness: Witness,
      })
  }

  private static cachedBcs: ReturnType<typeof BorrowReferral.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof BorrowReferral.instantiateBcs> {
    if (!BorrowReferral.cachedBcs) {
      BorrowReferral.cachedBcs = BorrowReferral.instantiateBcs()
    }
    return BorrowReferral.cachedBcs
  }

  static fromFields<
    CoinType extends PhantomReified<PhantomTypeArgument>,
    Witness extends Reified<TypeArgument, any>,
  >(
    typeArgs: [CoinType, Witness],
    fields: Record<string, any>,
  ): BorrowReferral<ToPhantomTypeArgument<CoinType>, ToTypeArgument<Witness>> {
    return BorrowReferral.reified(typeArgs[0], typeArgs[1]).new({
      id: decodeFromFields(UID.reified(), fields.id),
      borrowFeeDiscount: decodeFromFields('u64', fields.borrow_fee_discount),
      referralShare: decodeFromFields('u64', fields.referral_share),
      borrowed: decodeFromFields('u64', fields.borrowed),
      referralFee: decodeFromFields(Balance.reified(typeArgs[0]), fields.referral_fee),
      witness: decodeFromFields(typeArgs[1], fields.witness),
    })
  }

  static fromFieldsWithTypes<
    CoinType extends PhantomReified<PhantomTypeArgument>,
    Witness extends Reified<TypeArgument, any>,
  >(
    typeArgs: [CoinType, Witness],
    item: FieldsWithTypes,
  ): BorrowReferral<ToPhantomTypeArgument<CoinType>, ToTypeArgument<Witness>> {
    if (!isBorrowReferral(item.type)) {
      throw new Error('not a BorrowReferral type')
    }
    assertFieldsWithTypesArgsMatch(item, typeArgs)

    return BorrowReferral.reified(typeArgs[0], typeArgs[1]).new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      borrowFeeDiscount: decodeFromFieldsWithTypes('u64', item.fields.borrow_fee_discount),
      referralShare: decodeFromFieldsWithTypes('u64', item.fields.referral_share),
      borrowed: decodeFromFieldsWithTypes('u64', item.fields.borrowed),
      referralFee: decodeFromFieldsWithTypes(
        Balance.reified(typeArgs[0]),
        item.fields.referral_fee,
      ),
      witness: decodeFromFieldsWithTypes(typeArgs[1], item.fields.witness),
    })
  }

  static fromBcs<
    CoinType extends PhantomReified<PhantomTypeArgument>,
    Witness extends Reified<TypeArgument, any>,
  >(
    typeArgs: [CoinType, Witness],
    data: Uint8Array,
  ): BorrowReferral<ToPhantomTypeArgument<CoinType>, ToTypeArgument<Witness>> {
    return BorrowReferral.fromFields(typeArgs, BorrowReferral.bcs(toBcs(typeArgs[1])).parse(data))
  }

  toJSONField(): BorrowReferralJSONField<CoinType, Witness> {
    return {
      id: this.id,
      borrowFeeDiscount: this.borrowFeeDiscount.toString(),
      referralShare: this.referralShare.toString(),
      borrowed: this.borrowed.toString(),
      referralFee: this.referralFee.toJSONField(),
      witness: fieldToJSON<Witness>(`${this.$typeArgs[1]}`, this.witness),
    }
  }

  toJSON(): BorrowReferralJSON<CoinType, Witness> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<
    CoinType extends PhantomReified<PhantomTypeArgument>,
    Witness extends Reified<TypeArgument, any>,
  >(
    typeArgs: [CoinType, Witness],
    field: any,
  ): BorrowReferral<ToPhantomTypeArgument<CoinType>, ToTypeArgument<Witness>> {
    return BorrowReferral.reified(typeArgs[0], typeArgs[1]).new({
      id: decodeFromJSONField(UID.reified(), field.id),
      borrowFeeDiscount: decodeFromJSONField('u64', field.borrowFeeDiscount),
      referralShare: decodeFromJSONField('u64', field.referralShare),
      borrowed: decodeFromJSONField('u64', field.borrowed),
      referralFee: decodeFromJSONField(Balance.reified(typeArgs[0]), field.referralFee),
      witness: decodeFromJSONField(typeArgs[1], field.witness),
    })
  }

  static fromJSON<
    CoinType extends PhantomReified<PhantomTypeArgument>,
    Witness extends Reified<TypeArgument, any>,
  >(
    typeArgs: [CoinType, Witness],
    json: Record<string, any>,
  ): BorrowReferral<ToPhantomTypeArgument<CoinType>, ToTypeArgument<Witness>> {
    if (json.$typeName !== BorrowReferral.$typeName) {
      throw new Error(
        `not a BorrowReferral json object: expected '${BorrowReferral.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(BorrowReferral.$typeName, ...typeArgs.map(extractType)),
      json.$typeArgs,
      typeArgs,
    )

    return BorrowReferral.fromJSONField(typeArgs, json)
  }

  static fromCoreObject<
    CoinType extends PhantomReified<PhantomTypeArgument>,
    Witness extends Reified<TypeArgument, any>,
  >(
    typeArgs: [CoinType, Witness],
    obj: SuiClientTypes.Object<{ content: true }>,
  ): BorrowReferral<ToPhantomTypeArgument<CoinType>, ToTypeArgument<Witness>> {
    if (!isBorrowReferral(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a BorrowReferral object`)
    }

    const gotTypeArgs = parseTypeName(obj.type).typeArgs
    if (gotTypeArgs.length !== 2) {
      throw new Error(
        `type argument mismatch: expected 2 type arguments but got '${gotTypeArgs.length}'`,
      )
    }
    for (let i = 0; i < 2; i++) {
      const gotTypeArg = compressSuiType(gotTypeArgs[i])
      const expectedTypeArg = compressSuiType(extractType(typeArgs[i]))
      if (gotTypeArg !== expectedTypeArg) {
        throw new Error(
          `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
        )
      }
    }

    return BorrowReferral.fromBcs(typeArgs, obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link BorrowReferral.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<
    CoinType extends PhantomReified<PhantomTypeArgument>,
    Witness extends Reified<TypeArgument, any>,
  >(
    typeArgs: [CoinType, Witness],
    content: SuiParsedData,
  ): BorrowReferral<ToPhantomTypeArgument<CoinType>, ToTypeArgument<Witness>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isBorrowReferral(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a BorrowReferral object`)
    }
    return BorrowReferral.fromFieldsWithTypes(typeArgs, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link BorrowReferral.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<
    CoinType extends PhantomReified<PhantomTypeArgument>,
    Witness extends Reified<TypeArgument, any>,
  >(
    typeArgs: [CoinType, Witness],
    data: SuiObjectData,
  ): BorrowReferral<ToPhantomTypeArgument<CoinType>, ToTypeArgument<Witness>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isBorrowReferral(data.bcs.type)) {
        throw new Error(`object at is not a BorrowReferral object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 2) {
        throw new Error(
          `type argument mismatch: expected 2 type arguments but got '${gotTypeArgs.length}'`,
        )
      }
      for (let i = 0; i < 2; i++) {
        const gotTypeArg = compressSuiType(gotTypeArgs[i])
        const expectedTypeArg = compressSuiType(extractType(typeArgs[i]))
        if (gotTypeArg !== expectedTypeArg) {
          throw new Error(
            `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
          )
        }
      }

      return BorrowReferral.fromBcs(typeArgs, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return BorrowReferral.fromSuiParsedData(typeArgs, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<
    CoinType extends PhantomReified<PhantomTypeArgument>,
    Witness extends Reified<TypeArgument, any>,
  >(
    client: ClientWithCoreApi,
    typeArgs: [CoinType, Witness],
    id: string,
  ): Promise<BorrowReferral<ToPhantomTypeArgument<CoinType>, ToTypeArgument<Witness>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isBorrowReferral(object.type)) {
      throw new Error(`object at id ${id} is not a BorrowReferral object`)
    }

    const gotTypeArgs = parseTypeName(object.type).typeArgs
    if (gotTypeArgs.length !== 2) {
      throw new Error(
        `type argument mismatch: expected 2 type arguments but got '${gotTypeArgs.length}'`,
      )
    }
    for (let i = 0; i < 2; i++) {
      const gotTypeArg = compressSuiType(gotTypeArgs[i])
      const expectedTypeArg = compressSuiType(extractType(typeArgs[i]))
      if (gotTypeArg !== expectedTypeArg) {
        throw new Error(
          `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
        )
      }
    }

    return BorrowReferral.fromBcs(typeArgs, object.content)
  }
}

/* ============================== BorrowReferralCfgKey =============================== */

export function isBorrowReferralCfgKey(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    `${
      getTypeOrigin('protocol', 'borrow_referral::BorrowReferralCfgKey')
    }::borrow_referral::BorrowReferralCfgKey` + '<',
  )
}

export interface BorrowReferralCfgKeyFields<Cfg extends PhantomTypeArgument> {
  dummyField: ToField<'bool'>
}

export type BorrowReferralCfgKeyReified<Cfg extends PhantomTypeArgument> = Reified<
  BorrowReferralCfgKey<Cfg>,
  BorrowReferralCfgKeyFields<Cfg>
>

export type BorrowReferralCfgKeyJSONField<Cfg extends PhantomTypeArgument> = {
  dummyField: boolean
}

export type BorrowReferralCfgKeyJSON<Cfg extends PhantomTypeArgument> = {
  $typeName: typeof BorrowReferralCfgKey.$typeName
  $typeArgs: [PhantomToTypeStr<Cfg>]
} & BorrowReferralCfgKeyJSONField<Cfg>

export class BorrowReferralCfgKey<Cfg extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::borrow_referral::BorrowReferralCfgKey` {
    return `${
      getTypeOrigin('protocol', 'borrow_referral::BorrowReferralCfgKey')
    }::borrow_referral::BorrowReferralCfgKey` as const
  }
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName: typeof BorrowReferralCfgKey.$typeName = BorrowReferralCfgKey.$typeName
  readonly $fullTypeName: `${string}::borrow_referral::BorrowReferralCfgKey<${PhantomToTypeStr<
    Cfg
  >}>`
  readonly $typeArgs: [PhantomToTypeStr<Cfg>]
  readonly $isPhantom: typeof BorrowReferralCfgKey.$isPhantom = BorrowReferralCfgKey.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [PhantomToTypeStr<Cfg>], fields: BorrowReferralCfgKeyFields<Cfg>) {
    this.$fullTypeName = composeSuiType(
      BorrowReferralCfgKey.$typeName,
      ...typeArgs,
    ) as `${string}::borrow_referral::BorrowReferralCfgKey<${PhantomToTypeStr<Cfg>}>`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified<Cfg extends PhantomReified<PhantomTypeArgument>>(
    Cfg: Cfg,
  ): BorrowReferralCfgKeyReified<ToPhantomTypeArgument<Cfg>> {
    const reifiedBcs = BorrowReferralCfgKey.bcs
    return {
      get typeName() {
        return BorrowReferralCfgKey.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          BorrowReferralCfgKey.$typeName,
          ...[extractType(Cfg)],
        ) as `${string}::borrow_referral::BorrowReferralCfgKey<${PhantomToTypeStr<
          ToPhantomTypeArgument<Cfg>
        >}>`
      },
      get typeArgs() {
        return [extractType(Cfg)] as [PhantomToTypeStr<ToPhantomTypeArgument<Cfg>>]
      },
      isPhantom: BorrowReferralCfgKey.$isPhantom,
      reifiedTypeArgs: [Cfg],
      fromFields: (fields: Record<string, any>) => BorrowReferralCfgKey.fromFields(Cfg, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        BorrowReferralCfgKey.fromFieldsWithTypes(Cfg, item),
      fromBcs: (data: Uint8Array) => BorrowReferralCfgKey.fromFields(Cfg, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => BorrowReferralCfgKey.fromJSONField(Cfg, field),
      fromJSON: (json: Record<string, any>) => BorrowReferralCfgKey.fromJSON(Cfg, json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        BorrowReferralCfgKey.fromCoreObject(Cfg, obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        BorrowReferralCfgKey.fromSuiParsedData(Cfg, content),
      fromSuiObjectData: (content: SuiObjectData) =>
        BorrowReferralCfgKey.fromSuiObjectData(Cfg, content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        BorrowReferralCfgKey.fetch(client, Cfg, id),
      new: (fields: BorrowReferralCfgKeyFields<ToPhantomTypeArgument<Cfg>>) => {
        return new BorrowReferralCfgKey([extractType(Cfg)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof BorrowReferralCfgKey.reified {
    return BorrowReferralCfgKey.reified
  }

  static phantom<Cfg extends PhantomReified<PhantomTypeArgument>>(
    Cfg: Cfg,
  ): PhantomReified<ToTypeStr<BorrowReferralCfgKey<ToPhantomTypeArgument<Cfg>>>> {
    return phantom(BorrowReferralCfgKey.reified(Cfg))
  }

  static get p(): typeof BorrowReferralCfgKey.phantom {
    return BorrowReferralCfgKey.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('BorrowReferralCfgKey', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof BorrowReferralCfgKey.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof BorrowReferralCfgKey.instantiateBcs> {
    if (!BorrowReferralCfgKey.cachedBcs) {
      BorrowReferralCfgKey.cachedBcs = BorrowReferralCfgKey.instantiateBcs()
    }
    return BorrowReferralCfgKey.cachedBcs
  }

  static fromFields<Cfg extends PhantomReified<PhantomTypeArgument>>(
    typeArg: Cfg,
    fields: Record<string, any>,
  ): BorrowReferralCfgKey<ToPhantomTypeArgument<Cfg>> {
    return BorrowReferralCfgKey.reified(typeArg).new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes<Cfg extends PhantomReified<PhantomTypeArgument>>(
    typeArg: Cfg,
    item: FieldsWithTypes,
  ): BorrowReferralCfgKey<ToPhantomTypeArgument<Cfg>> {
    if (!isBorrowReferralCfgKey(item.type)) {
      throw new Error('not a BorrowReferralCfgKey type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return BorrowReferralCfgKey.reified(typeArg).new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs<Cfg extends PhantomReified<PhantomTypeArgument>>(
    typeArg: Cfg,
    data: Uint8Array,
  ): BorrowReferralCfgKey<ToPhantomTypeArgument<Cfg>> {
    return BorrowReferralCfgKey.fromFields(typeArg, BorrowReferralCfgKey.bcs.parse(data))
  }

  toJSONField(): BorrowReferralCfgKeyJSONField<Cfg> {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): BorrowReferralCfgKeyJSON<Cfg> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<Cfg extends PhantomReified<PhantomTypeArgument>>(
    typeArg: Cfg,
    field: any,
  ): BorrowReferralCfgKey<ToPhantomTypeArgument<Cfg>> {
    return BorrowReferralCfgKey.reified(typeArg).new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON<Cfg extends PhantomReified<PhantomTypeArgument>>(
    typeArg: Cfg,
    json: Record<string, any>,
  ): BorrowReferralCfgKey<ToPhantomTypeArgument<Cfg>> {
    if (json.$typeName !== BorrowReferralCfgKey.$typeName) {
      throw new Error(
        `not a BorrowReferralCfgKey json object: expected '${BorrowReferralCfgKey.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(BorrowReferralCfgKey.$typeName, ...[extractType(typeArg)]),
      json.$typeArgs,
      [typeArg],
    )

    return BorrowReferralCfgKey.fromJSONField(typeArg, json)
  }

  static fromCoreObject<Cfg extends PhantomReified<PhantomTypeArgument>>(
    typeArg: Cfg,
    obj: SuiClientTypes.Object<{ content: true }>,
  ): BorrowReferralCfgKey<ToPhantomTypeArgument<Cfg>> {
    if (!isBorrowReferralCfgKey(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a BorrowReferralCfgKey object`)
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

    return BorrowReferralCfgKey.fromBcs(typeArg, obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link BorrowReferralCfgKey.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<Cfg extends PhantomReified<PhantomTypeArgument>>(
    typeArg: Cfg,
    content: SuiParsedData,
  ): BorrowReferralCfgKey<ToPhantomTypeArgument<Cfg>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isBorrowReferralCfgKey(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a BorrowReferralCfgKey object`,
      )
    }
    return BorrowReferralCfgKey.fromFieldsWithTypes(typeArg, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link BorrowReferralCfgKey.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<Cfg extends PhantomReified<PhantomTypeArgument>>(
    typeArg: Cfg,
    data: SuiObjectData,
  ): BorrowReferralCfgKey<ToPhantomTypeArgument<Cfg>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isBorrowReferralCfgKey(data.bcs.type)) {
        throw new Error(`object at is not a BorrowReferralCfgKey object`)
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

      return BorrowReferralCfgKey.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return BorrowReferralCfgKey.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<Cfg extends PhantomReified<PhantomTypeArgument>>(
    client: ClientWithCoreApi,
    typeArg: Cfg,
    id: string,
  ): Promise<BorrowReferralCfgKey<ToPhantomTypeArgument<Cfg>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isBorrowReferralCfgKey(object.type)) {
      throw new Error(`object at id ${id} is not a BorrowReferralCfgKey object`)
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

    return BorrowReferralCfgKey.fromBcs(typeArg, object.content)
  }
}

/* ============================== BorrowedKey =============================== */

export function isBorrowedKey(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('protocol', 'borrow_referral::BorrowedKey')}::borrow_referral::BorrowedKey`
}

export interface BorrowedKeyFields {
  dummyField: ToField<'bool'>
}

export type BorrowedKeyReified = Reified<BorrowedKey, BorrowedKeyFields>

export type BorrowedKeyJSONField = {
  dummyField: boolean
}

export type BorrowedKeyJSON = {
  $typeName: typeof BorrowedKey.$typeName
  $typeArgs: []
} & BorrowedKeyJSONField

export class BorrowedKey implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::borrow_referral::BorrowedKey` {
    return `${
      getTypeOrigin('protocol', 'borrow_referral::BorrowedKey')
    }::borrow_referral::BorrowedKey` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof BorrowedKey.$typeName = BorrowedKey.$typeName
  readonly $fullTypeName: `${string}::borrow_referral::BorrowedKey`
  readonly $typeArgs: []
  readonly $isPhantom: typeof BorrowedKey.$isPhantom = BorrowedKey.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: BorrowedKeyFields) {
    this.$fullTypeName = composeSuiType(
      BorrowedKey.$typeName,
      ...typeArgs,
    ) as `${string}::borrow_referral::BorrowedKey`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): BorrowedKeyReified {
    const reifiedBcs = BorrowedKey.bcs
    return {
      get typeName() {
        return BorrowedKey.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          BorrowedKey.$typeName,
          ...[],
        ) as `${string}::borrow_referral::BorrowedKey`
      },
      typeArgs: [] as [],
      isPhantom: BorrowedKey.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => BorrowedKey.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => BorrowedKey.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => BorrowedKey.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => BorrowedKey.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => BorrowedKey.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        BorrowedKey.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => BorrowedKey.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => BorrowedKey.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => BorrowedKey.fetch(client, id),
      new: (fields: BorrowedKeyFields) => {
        return new BorrowedKey([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): BorrowedKeyReified {
    return BorrowedKey.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<BorrowedKey>> {
    return phantom(BorrowedKey.reified())
  }

  static get p(): PhantomReified<ToTypeStr<BorrowedKey>> {
    return BorrowedKey.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('BorrowedKey', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof BorrowedKey.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof BorrowedKey.instantiateBcs> {
    if (!BorrowedKey.cachedBcs) {
      BorrowedKey.cachedBcs = BorrowedKey.instantiateBcs()
    }
    return BorrowedKey.cachedBcs
  }

  static fromFields(fields: Record<string, any>): BorrowedKey {
    return BorrowedKey.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): BorrowedKey {
    if (!isBorrowedKey(item.type)) {
      throw new Error('not a BorrowedKey type')
    }

    return BorrowedKey.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): BorrowedKey {
    return BorrowedKey.fromFields(BorrowedKey.bcs.parse(data))
  }

  toJSONField(): BorrowedKeyJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): BorrowedKeyJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): BorrowedKey {
    return BorrowedKey.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): BorrowedKey {
    if (json.$typeName !== BorrowedKey.$typeName) {
      throw new Error(
        `not a BorrowedKey json object: expected '${BorrowedKey.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return BorrowedKey.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): BorrowedKey {
    if (!isBorrowedKey(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a BorrowedKey object`)
    }
    return BorrowedKey.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link BorrowedKey.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): BorrowedKey {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isBorrowedKey(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a BorrowedKey object`)
    }
    return BorrowedKey.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link BorrowedKey.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): BorrowedKey {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isBorrowedKey(data.bcs.type)) {
        throw new Error(`object at is not a BorrowedKey object`)
      }

      return BorrowedKey.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return BorrowedKey.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<BorrowedKey> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isBorrowedKey(object.type)) {
      throw new Error(`object at id ${id} is not a BorrowedKey object`)
    }
    return BorrowedKey.fromBcs(object.content)
  }
}

/* ============================== ReferralFeeKey =============================== */

export function isReferralFeeKey(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('protocol', 'borrow_referral::ReferralFeeKey')
    }::borrow_referral::ReferralFeeKey`
}

export interface ReferralFeeKeyFields {
  dummyField: ToField<'bool'>
}

export type ReferralFeeKeyReified = Reified<ReferralFeeKey, ReferralFeeKeyFields>

export type ReferralFeeKeyJSONField = {
  dummyField: boolean
}

export type ReferralFeeKeyJSON = {
  $typeName: typeof ReferralFeeKey.$typeName
  $typeArgs: []
} & ReferralFeeKeyJSONField

export class ReferralFeeKey implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::borrow_referral::ReferralFeeKey` {
    return `${
      getTypeOrigin('protocol', 'borrow_referral::ReferralFeeKey')
    }::borrow_referral::ReferralFeeKey` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof ReferralFeeKey.$typeName = ReferralFeeKey.$typeName
  readonly $fullTypeName: `${string}::borrow_referral::ReferralFeeKey`
  readonly $typeArgs: []
  readonly $isPhantom: typeof ReferralFeeKey.$isPhantom = ReferralFeeKey.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: ReferralFeeKeyFields) {
    this.$fullTypeName = composeSuiType(
      ReferralFeeKey.$typeName,
      ...typeArgs,
    ) as `${string}::borrow_referral::ReferralFeeKey`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): ReferralFeeKeyReified {
    const reifiedBcs = ReferralFeeKey.bcs
    return {
      get typeName() {
        return ReferralFeeKey.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          ReferralFeeKey.$typeName,
          ...[],
        ) as `${string}::borrow_referral::ReferralFeeKey`
      },
      typeArgs: [] as [],
      isPhantom: ReferralFeeKey.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ReferralFeeKey.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ReferralFeeKey.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ReferralFeeKey.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ReferralFeeKey.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ReferralFeeKey.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        ReferralFeeKey.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => ReferralFeeKey.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ReferralFeeKey.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => ReferralFeeKey.fetch(client, id),
      new: (fields: ReferralFeeKeyFields) => {
        return new ReferralFeeKey([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): ReferralFeeKeyReified {
    return ReferralFeeKey.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ReferralFeeKey>> {
    return phantom(ReferralFeeKey.reified())
  }

  static get p(): PhantomReified<ToTypeStr<ReferralFeeKey>> {
    return ReferralFeeKey.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ReferralFeeKey', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof ReferralFeeKey.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof ReferralFeeKey.instantiateBcs> {
    if (!ReferralFeeKey.cachedBcs) {
      ReferralFeeKey.cachedBcs = ReferralFeeKey.instantiateBcs()
    }
    return ReferralFeeKey.cachedBcs
  }

  static fromFields(fields: Record<string, any>): ReferralFeeKey {
    return ReferralFeeKey.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ReferralFeeKey {
    if (!isReferralFeeKey(item.type)) {
      throw new Error('not a ReferralFeeKey type')
    }

    return ReferralFeeKey.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): ReferralFeeKey {
    return ReferralFeeKey.fromFields(ReferralFeeKey.bcs.parse(data))
  }

  toJSONField(): ReferralFeeKeyJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): ReferralFeeKeyJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ReferralFeeKey {
    return ReferralFeeKey.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): ReferralFeeKey {
    if (json.$typeName !== ReferralFeeKey.$typeName) {
      throw new Error(
        `not a ReferralFeeKey json object: expected '${ReferralFeeKey.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return ReferralFeeKey.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): ReferralFeeKey {
    if (!isReferralFeeKey(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a ReferralFeeKey object`)
    }
    return ReferralFeeKey.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ReferralFeeKey.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): ReferralFeeKey {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isReferralFeeKey(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ReferralFeeKey object`)
    }
    return ReferralFeeKey.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ReferralFeeKey.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): ReferralFeeKey {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isReferralFeeKey(data.bcs.type)) {
        throw new Error(`object at is not a ReferralFeeKey object`)
      }

      return ReferralFeeKey.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ReferralFeeKey.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<ReferralFeeKey> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isReferralFeeKey(object.type)) {
      throw new Error(`object at id ${id} is not a ReferralFeeKey object`)
    }
    return ReferralFeeKey.fromBcs(object.content)
  }
}

/* ============================== AuthorizedWitnessList =============================== */

export function isAuthorizedWitnessList(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('protocol', 'borrow_referral::AuthorizedWitnessList')
    }::borrow_referral::AuthorizedWitnessList`
}

export interface AuthorizedWitnessListFields {
  id: ToField<UID>
  witnessList: ToField<VecSet<TypeName>>
}

export type AuthorizedWitnessListReified = Reified<
  AuthorizedWitnessList,
  AuthorizedWitnessListFields
>

export type AuthorizedWitnessListJSONField = {
  id: string
  witnessList: ToJSON<VecSet<TypeName>>
}

export type AuthorizedWitnessListJSON = {
  $typeName: typeof AuthorizedWitnessList.$typeName
  $typeArgs: []
} & AuthorizedWitnessListJSONField

export class AuthorizedWitnessList implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::borrow_referral::AuthorizedWitnessList` {
    return `${
      getTypeOrigin('protocol', 'borrow_referral::AuthorizedWitnessList')
    }::borrow_referral::AuthorizedWitnessList` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof AuthorizedWitnessList.$typeName = AuthorizedWitnessList.$typeName
  readonly $fullTypeName: `${string}::borrow_referral::AuthorizedWitnessList`
  readonly $typeArgs: []
  readonly $isPhantom: typeof AuthorizedWitnessList.$isPhantom = AuthorizedWitnessList.$isPhantom

  readonly id: ToField<UID>
  readonly witnessList: ToField<VecSet<TypeName>>

  private constructor(typeArgs: [], fields: AuthorizedWitnessListFields) {
    this.$fullTypeName = composeSuiType(
      AuthorizedWitnessList.$typeName,
      ...typeArgs,
    ) as `${string}::borrow_referral::AuthorizedWitnessList`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.witnessList = fields.witnessList
  }

  static reified(): AuthorizedWitnessListReified {
    const reifiedBcs = AuthorizedWitnessList.bcs
    return {
      get typeName() {
        return AuthorizedWitnessList.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          AuthorizedWitnessList.$typeName,
          ...[],
        ) as `${string}::borrow_referral::AuthorizedWitnessList`
      },
      typeArgs: [] as [],
      isPhantom: AuthorizedWitnessList.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AuthorizedWitnessList.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        AuthorizedWitnessList.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AuthorizedWitnessList.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AuthorizedWitnessList.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AuthorizedWitnessList.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        AuthorizedWitnessList.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        AuthorizedWitnessList.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        AuthorizedWitnessList.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        AuthorizedWitnessList.fetch(client, id),
      new: (fields: AuthorizedWitnessListFields) => {
        return new AuthorizedWitnessList([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): AuthorizedWitnessListReified {
    return AuthorizedWitnessList.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AuthorizedWitnessList>> {
    return phantom(AuthorizedWitnessList.reified())
  }

  static get p(): PhantomReified<ToTypeStr<AuthorizedWitnessList>> {
    return AuthorizedWitnessList.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AuthorizedWitnessList', {
      id: UID.bcs,
      witness_list: VecSet.bcs(TypeName.bcs),
    })
  }

  private static cachedBcs: ReturnType<typeof AuthorizedWitnessList.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof AuthorizedWitnessList.instantiateBcs> {
    if (!AuthorizedWitnessList.cachedBcs) {
      AuthorizedWitnessList.cachedBcs = AuthorizedWitnessList.instantiateBcs()
    }
    return AuthorizedWitnessList.cachedBcs
  }

  static fromFields(fields: Record<string, any>): AuthorizedWitnessList {
    return AuthorizedWitnessList.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      witnessList: decodeFromFields(VecSet.reified(TypeName.reified()), fields.witness_list),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): AuthorizedWitnessList {
    if (!isAuthorizedWitnessList(item.type)) {
      throw new Error('not a AuthorizedWitnessList type')
    }

    return AuthorizedWitnessList.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      witnessList: decodeFromFieldsWithTypes(
        VecSet.reified(TypeName.reified()),
        item.fields.witness_list,
      ),
    })
  }

  static fromBcs(data: Uint8Array): AuthorizedWitnessList {
    return AuthorizedWitnessList.fromFields(AuthorizedWitnessList.bcs.parse(data))
  }

  toJSONField(): AuthorizedWitnessListJSONField {
    return {
      id: this.id,
      witnessList: this.witnessList.toJSONField(),
    }
  }

  toJSON(): AuthorizedWitnessListJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AuthorizedWitnessList {
    return AuthorizedWitnessList.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      witnessList: decodeFromJSONField(VecSet.reified(TypeName.reified()), field.witnessList),
    })
  }

  static fromJSON(json: Record<string, any>): AuthorizedWitnessList {
    if (json.$typeName !== AuthorizedWitnessList.$typeName) {
      throw new Error(
        `not a AuthorizedWitnessList json object: expected '${AuthorizedWitnessList.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return AuthorizedWitnessList.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): AuthorizedWitnessList {
    if (!isAuthorizedWitnessList(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a AuthorizedWitnessList object`)
    }
    return AuthorizedWitnessList.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AuthorizedWitnessList.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): AuthorizedWitnessList {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAuthorizedWitnessList(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a AuthorizedWitnessList object`,
      )
    }
    return AuthorizedWitnessList.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AuthorizedWitnessList.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): AuthorizedWitnessList {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAuthorizedWitnessList(data.bcs.type)) {
        throw new Error(`object at is not a AuthorizedWitnessList object`)
      }

      return AuthorizedWitnessList.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AuthorizedWitnessList.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<AuthorizedWitnessList> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isAuthorizedWitnessList(object.type)) {
      throw new Error(`object at id ${id} is not a AuthorizedWitnessList object`)
    }
    return AuthorizedWitnessList.fromBcs(object.content)
  }
}
