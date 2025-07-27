import {
  PhantomReified,
  PhantomToTypeStr,
  PhantomTypeArgument,
  Reified,
  StructClass,
  ToField,
  ToPhantomTypeArgument,
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
import { TypeName } from '../../../../move-stdlib/type-name/structs'
import { Balance } from '../../../../sui/balance/structs'
import { UID } from '../../../../sui/object/structs'
import { VecSet } from '../../../../sui/vec-set/structs'
import { PKG_V7, PKG_V8 } from '../index'
import { BcsType, bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== BorrowReferral =============================== */

export function isBorrowReferral(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V7}::borrow_referral::BorrowReferral` + '<')
}

export interface BorrowReferralFields<T0 extends PhantomTypeArgument, T1 extends TypeArgument> {
  id: ToField<UID>
  borrowFeeDiscount: ToField<'u64'>
  referralShare: ToField<'u64'>
  borrowed: ToField<'u64'>
  referralFee: ToField<Balance<T0>>
  witness: ToField<T1>
}

export type BorrowReferralReified<
  T0 extends PhantomTypeArgument,
  T1 extends TypeArgument,
> = Reified<BorrowReferral<T0, T1>, BorrowReferralFields<T0, T1>>

export class BorrowReferral<T0 extends PhantomTypeArgument, T1 extends TypeArgument>
  implements StructClass
{
  __StructClass = true as const

  static readonly $typeName = `${PKG_V7}::borrow_referral::BorrowReferral`
  static readonly $numTypeParams = 2
  static readonly $isPhantom = [true, false] as const

  readonly $typeName = BorrowReferral.$typeName
  readonly $fullTypeName: `${typeof PKG_V7}::borrow_referral::BorrowReferral<${PhantomToTypeStr<T0>}, ${ToTypeStr<T1>}>`
  readonly $typeArgs: [PhantomToTypeStr<T0>, ToTypeStr<T1>]
  readonly $isPhantom = BorrowReferral.$isPhantom

  readonly id: ToField<UID>
  readonly borrowFeeDiscount: ToField<'u64'>
  readonly referralShare: ToField<'u64'>
  readonly borrowed: ToField<'u64'>
  readonly referralFee: ToField<Balance<T0>>
  readonly witness: ToField<T1>

  private constructor(
    typeArgs: [PhantomToTypeStr<T0>, ToTypeStr<T1>],
    fields: BorrowReferralFields<T0, T1>
  ) {
    this.$fullTypeName = composeSuiType(
      BorrowReferral.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V7}::borrow_referral::BorrowReferral<${PhantomToTypeStr<T0>}, ${ToTypeStr<T1>}>`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.borrowFeeDiscount = fields.borrowFeeDiscount
    this.referralShare = fields.referralShare
    this.borrowed = fields.borrowed
    this.referralFee = fields.referralFee
    this.witness = fields.witness
  }

  static reified<
    T0 extends PhantomReified<PhantomTypeArgument>,
    T1 extends Reified<TypeArgument, any>,
  >(T0: T0, T1: T1): BorrowReferralReified<ToPhantomTypeArgument<T0>, ToTypeArgument<T1>> {
    const reifiedBcs = BorrowReferral.bcs(toBcs(T1))
    return {
      typeName: BorrowReferral.$typeName,
      fullTypeName: composeSuiType(
        BorrowReferral.$typeName,
        ...[extractType(T0), extractType(T1)]
      ) as `${typeof PKG_V7}::borrow_referral::BorrowReferral<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}, ${ToTypeStr<ToTypeArgument<T1>>}>`,
      typeArgs: [extractType(T0), extractType(T1)] as [
        PhantomToTypeStr<ToPhantomTypeArgument<T0>>,
        ToTypeStr<ToTypeArgument<T1>>,
      ],
      isPhantom: BorrowReferral.$isPhantom,
      reifiedTypeArgs: [T0, T1],
      fromFields: (fields: Record<string, any>) => BorrowReferral.fromFields([T0, T1], fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        BorrowReferral.fromFieldsWithTypes([T0, T1], item),
      fromBcs: (data: Uint8Array) => BorrowReferral.fromFields([T0, T1], reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => BorrowReferral.fromJSONField([T0, T1], field),
      fromJSON: (json: Record<string, any>) => BorrowReferral.fromJSON([T0, T1], json),
      fromSuiParsedData: (content: SuiParsedData) =>
        BorrowReferral.fromSuiParsedData([T0, T1], content),
      fromSuiObjectData: (content: SuiObjectData) =>
        BorrowReferral.fromSuiObjectData([T0, T1], content),
      fetch: async (client: SuiClient, id: string) => BorrowReferral.fetch(client, [T0, T1], id),
      new: (fields: BorrowReferralFields<ToPhantomTypeArgument<T0>, ToTypeArgument<T1>>) => {
        return new BorrowReferral([extractType(T0), extractType(T1)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return BorrowReferral.reified
  }

  static phantom<
    T0 extends PhantomReified<PhantomTypeArgument>,
    T1 extends Reified<TypeArgument, any>,
  >(
    T0: T0,
    T1: T1
  ): PhantomReified<ToTypeStr<BorrowReferral<ToPhantomTypeArgument<T0>, ToTypeArgument<T1>>>> {
    return phantom(BorrowReferral.reified(T0, T1))
  }
  static get p() {
    return BorrowReferral.phantom
  }

  private static instantiateBcs() {
    return <T1 extends BcsType<any>>(T1: T1) =>
      bcs.struct(`BorrowReferral<${T1.name}>`, {
        id: UID.bcs,
        borrow_fee_discount: bcs.u64(),
        referral_share: bcs.u64(),
        borrowed: bcs.u64(),
        referral_fee: Balance.bcs,
        witness: T1,
      })
  }

  private static cachedBcs: ReturnType<typeof BorrowReferral.instantiateBcs> | null = null

  static get bcs() {
    if (!BorrowReferral.cachedBcs) {
      BorrowReferral.cachedBcs = BorrowReferral.instantiateBcs()
    }
    return BorrowReferral.cachedBcs
  }

  static fromFields<
    T0 extends PhantomReified<PhantomTypeArgument>,
    T1 extends Reified<TypeArgument, any>,
  >(
    typeArgs: [T0, T1],
    fields: Record<string, any>
  ): BorrowReferral<ToPhantomTypeArgument<T0>, ToTypeArgument<T1>> {
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
    T0 extends PhantomReified<PhantomTypeArgument>,
    T1 extends Reified<TypeArgument, any>,
  >(
    typeArgs: [T0, T1],
    item: FieldsWithTypes
  ): BorrowReferral<ToPhantomTypeArgument<T0>, ToTypeArgument<T1>> {
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
        item.fields.referral_fee
      ),
      witness: decodeFromFieldsWithTypes(typeArgs[1], item.fields.witness),
    })
  }

  static fromBcs<
    T0 extends PhantomReified<PhantomTypeArgument>,
    T1 extends Reified<TypeArgument, any>,
  >(
    typeArgs: [T0, T1],
    data: Uint8Array
  ): BorrowReferral<ToPhantomTypeArgument<T0>, ToTypeArgument<T1>> {
    return BorrowReferral.fromFields(typeArgs, BorrowReferral.bcs(toBcs(typeArgs[1])).parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      borrowFeeDiscount: this.borrowFeeDiscount.toString(),
      referralShare: this.referralShare.toString(),
      borrowed: this.borrowed.toString(),
      referralFee: this.referralFee.toJSONField(),
      witness: fieldToJSON<T1>(this.$typeArgs[1], this.witness),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<
    T0 extends PhantomReified<PhantomTypeArgument>,
    T1 extends Reified<TypeArgument, any>,
  >(typeArgs: [T0, T1], field: any): BorrowReferral<ToPhantomTypeArgument<T0>, ToTypeArgument<T1>> {
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
    T0 extends PhantomReified<PhantomTypeArgument>,
    T1 extends Reified<TypeArgument, any>,
  >(
    typeArgs: [T0, T1],
    json: Record<string, any>
  ): BorrowReferral<ToPhantomTypeArgument<T0>, ToTypeArgument<T1>> {
    if (json.$typeName !== BorrowReferral.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(BorrowReferral.$typeName, ...typeArgs.map(extractType)),
      json.$typeArgs,
      typeArgs
    )

    return BorrowReferral.fromJSONField(typeArgs, json)
  }

  static fromSuiParsedData<
    T0 extends PhantomReified<PhantomTypeArgument>,
    T1 extends Reified<TypeArgument, any>,
  >(
    typeArgs: [T0, T1],
    content: SuiParsedData
  ): BorrowReferral<ToPhantomTypeArgument<T0>, ToTypeArgument<T1>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isBorrowReferral(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a BorrowReferral object`)
    }
    return BorrowReferral.fromFieldsWithTypes(typeArgs, content)
  }

  static fromSuiObjectData<
    T0 extends PhantomReified<PhantomTypeArgument>,
    T1 extends Reified<TypeArgument, any>,
  >(
    typeArgs: [T0, T1],
    data: SuiObjectData
  ): BorrowReferral<ToPhantomTypeArgument<T0>, ToTypeArgument<T1>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isBorrowReferral(data.bcs.type)) {
        throw new Error(`object at is not a BorrowReferral object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 2) {
        throw new Error(
          `type argument mismatch: expected 2 type arguments but got ${gotTypeArgs.length}`
        )
      }
      for (let i = 0; i < 2; i++) {
        const gotTypeArg = compressSuiType(gotTypeArgs[i])
        const expectedTypeArg = compressSuiType(extractType(typeArgs[i]))
        if (gotTypeArg !== expectedTypeArg) {
          throw new Error(
            `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`
          )
        }
      }

      return BorrowReferral.fromBcs(typeArgs, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return BorrowReferral.fromSuiParsedData(typeArgs, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<
    T0 extends PhantomReified<PhantomTypeArgument>,
    T1 extends Reified<TypeArgument, any>,
  >(
    client: SuiClient,
    typeArgs: [T0, T1],
    id: string
  ): Promise<BorrowReferral<ToPhantomTypeArgument<T0>, ToTypeArgument<T1>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching BorrowReferral object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isBorrowReferral(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a BorrowReferral object`)
    }

    return BorrowReferral.fromSuiObjectData(typeArgs, res.data)
  }
}

/* ============================== BorrowReferralCfgKey =============================== */

export function isBorrowReferralCfgKey(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V7}::borrow_referral::BorrowReferralCfgKey` + '<')
}

export interface BorrowReferralCfgKeyFields<T0 extends PhantomTypeArgument> {
  dummyField: ToField<'bool'>
}

export type BorrowReferralCfgKeyReified<T0 extends PhantomTypeArgument> = Reified<
  BorrowReferralCfgKey<T0>,
  BorrowReferralCfgKeyFields<T0>
>

export class BorrowReferralCfgKey<T0 extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V7}::borrow_referral::BorrowReferralCfgKey`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = BorrowReferralCfgKey.$typeName
  readonly $fullTypeName: `${typeof PKG_V7}::borrow_referral::BorrowReferralCfgKey<${PhantomToTypeStr<T0>}>`
  readonly $typeArgs: [PhantomToTypeStr<T0>]
  readonly $isPhantom = BorrowReferralCfgKey.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: BorrowReferralCfgKeyFields<T0>) {
    this.$fullTypeName = composeSuiType(
      BorrowReferralCfgKey.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V7}::borrow_referral::BorrowReferralCfgKey<${PhantomToTypeStr<T0>}>`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0
  ): BorrowReferralCfgKeyReified<ToPhantomTypeArgument<T0>> {
    const reifiedBcs = BorrowReferralCfgKey.bcs
    return {
      typeName: BorrowReferralCfgKey.$typeName,
      fullTypeName: composeSuiType(
        BorrowReferralCfgKey.$typeName,
        ...[extractType(T0)]
      ) as `${typeof PKG_V7}::borrow_referral::BorrowReferralCfgKey<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`,
      typeArgs: [extractType(T0)] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>],
      isPhantom: BorrowReferralCfgKey.$isPhantom,
      reifiedTypeArgs: [T0],
      fromFields: (fields: Record<string, any>) => BorrowReferralCfgKey.fromFields(T0, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        BorrowReferralCfgKey.fromFieldsWithTypes(T0, item),
      fromBcs: (data: Uint8Array) => BorrowReferralCfgKey.fromFields(T0, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => BorrowReferralCfgKey.fromJSONField(T0, field),
      fromJSON: (json: Record<string, any>) => BorrowReferralCfgKey.fromJSON(T0, json),
      fromSuiParsedData: (content: SuiParsedData) =>
        BorrowReferralCfgKey.fromSuiParsedData(T0, content),
      fromSuiObjectData: (content: SuiObjectData) =>
        BorrowReferralCfgKey.fromSuiObjectData(T0, content),
      fetch: async (client: SuiClient, id: string) => BorrowReferralCfgKey.fetch(client, T0, id),
      new: (fields: BorrowReferralCfgKeyFields<ToPhantomTypeArgument<T0>>) => {
        return new BorrowReferralCfgKey([extractType(T0)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return BorrowReferralCfgKey.reified
  }

  static phantom<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0
  ): PhantomReified<ToTypeStr<BorrowReferralCfgKey<ToPhantomTypeArgument<T0>>>> {
    return phantom(BorrowReferralCfgKey.reified(T0))
  }
  static get p() {
    return BorrowReferralCfgKey.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('BorrowReferralCfgKey', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof BorrowReferralCfgKey.instantiateBcs> | null = null

  static get bcs() {
    if (!BorrowReferralCfgKey.cachedBcs) {
      BorrowReferralCfgKey.cachedBcs = BorrowReferralCfgKey.instantiateBcs()
    }
    return BorrowReferralCfgKey.cachedBcs
  }

  static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    fields: Record<string, any>
  ): BorrowReferralCfgKey<ToPhantomTypeArgument<T0>> {
    return BorrowReferralCfgKey.reified(typeArg).new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    item: FieldsWithTypes
  ): BorrowReferralCfgKey<ToPhantomTypeArgument<T0>> {
    if (!isBorrowReferralCfgKey(item.type)) {
      throw new Error('not a BorrowReferralCfgKey type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return BorrowReferralCfgKey.reified(typeArg).new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: Uint8Array
  ): BorrowReferralCfgKey<ToPhantomTypeArgument<T0>> {
    return BorrowReferralCfgKey.fromFields(typeArg, BorrowReferralCfgKey.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    field: any
  ): BorrowReferralCfgKey<ToPhantomTypeArgument<T0>> {
    return BorrowReferralCfgKey.reified(typeArg).new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    json: Record<string, any>
  ): BorrowReferralCfgKey<ToPhantomTypeArgument<T0>> {
    if (json.$typeName !== BorrowReferralCfgKey.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(BorrowReferralCfgKey.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return BorrowReferralCfgKey.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    content: SuiParsedData
  ): BorrowReferralCfgKey<ToPhantomTypeArgument<T0>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isBorrowReferralCfgKey(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a BorrowReferralCfgKey object`
      )
    }
    return BorrowReferralCfgKey.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: SuiObjectData
  ): BorrowReferralCfgKey<ToPhantomTypeArgument<T0>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isBorrowReferralCfgKey(data.bcs.type)) {
        throw new Error(`object at is not a BorrowReferralCfgKey object`)
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

      return BorrowReferralCfgKey.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return BorrowReferralCfgKey.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T0,
    id: string
  ): Promise<BorrowReferralCfgKey<ToPhantomTypeArgument<T0>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching BorrowReferralCfgKey object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isBorrowReferralCfgKey(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a BorrowReferralCfgKey object`)
    }

    return BorrowReferralCfgKey.fromSuiObjectData(typeArg, res.data)
  }
}

/* ============================== BorrowedKey =============================== */

export function isBorrowedKey(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V8}::borrow_referral::BorrowedKey`
}

export interface BorrowedKeyFields {
  dummyField: ToField<'bool'>
}

export type BorrowedKeyReified = Reified<BorrowedKey, BorrowedKeyFields>

export class BorrowedKey implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V8}::borrow_referral::BorrowedKey`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = BorrowedKey.$typeName
  readonly $fullTypeName: `${typeof PKG_V8}::borrow_referral::BorrowedKey`
  readonly $typeArgs: []
  readonly $isPhantom = BorrowedKey.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: BorrowedKeyFields) {
    this.$fullTypeName = composeSuiType(
      BorrowedKey.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V8}::borrow_referral::BorrowedKey`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): BorrowedKeyReified {
    const reifiedBcs = BorrowedKey.bcs
    return {
      typeName: BorrowedKey.$typeName,
      fullTypeName: composeSuiType(
        BorrowedKey.$typeName,
        ...[]
      ) as `${typeof PKG_V8}::borrow_referral::BorrowedKey`,
      typeArgs: [] as [],
      isPhantom: BorrowedKey.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => BorrowedKey.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => BorrowedKey.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => BorrowedKey.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => BorrowedKey.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => BorrowedKey.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => BorrowedKey.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => BorrowedKey.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => BorrowedKey.fetch(client, id),
      new: (fields: BorrowedKeyFields) => {
        return new BorrowedKey([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return BorrowedKey.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<BorrowedKey>> {
    return phantom(BorrowedKey.reified())
  }
  static get p() {
    return BorrowedKey.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('BorrowedKey', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof BorrowedKey.instantiateBcs> | null = null

  static get bcs() {
    if (!BorrowedKey.cachedBcs) {
      BorrowedKey.cachedBcs = BorrowedKey.instantiateBcs()
    }
    return BorrowedKey.cachedBcs
  }

  static fromFields(fields: Record<string, any>): BorrowedKey {
    return BorrowedKey.reified().new({ dummyField: decodeFromFields('bool', fields.dummy_field) })
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

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): BorrowedKey {
    return BorrowedKey.reified().new({ dummyField: decodeFromJSONField('bool', field.dummyField) })
  }

  static fromJSON(json: Record<string, any>): BorrowedKey {
    if (json.$typeName !== BorrowedKey.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return BorrowedKey.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): BorrowedKey {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isBorrowedKey(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a BorrowedKey object`)
    }
    return BorrowedKey.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): BorrowedKey {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isBorrowedKey(data.bcs.type)) {
        throw new Error(`object at is not a BorrowedKey object`)
      }

      return BorrowedKey.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return BorrowedKey.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<BorrowedKey> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching BorrowedKey object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isBorrowedKey(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a BorrowedKey object`)
    }

    return BorrowedKey.fromSuiObjectData(res.data)
  }
}

/* ============================== ReferralFeeKey =============================== */

export function isReferralFeeKey(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V8}::borrow_referral::ReferralFeeKey`
}

export interface ReferralFeeKeyFields {
  dummyField: ToField<'bool'>
}

export type ReferralFeeKeyReified = Reified<ReferralFeeKey, ReferralFeeKeyFields>

export class ReferralFeeKey implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V8}::borrow_referral::ReferralFeeKey`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = ReferralFeeKey.$typeName
  readonly $fullTypeName: `${typeof PKG_V8}::borrow_referral::ReferralFeeKey`
  readonly $typeArgs: []
  readonly $isPhantom = ReferralFeeKey.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: ReferralFeeKeyFields) {
    this.$fullTypeName = composeSuiType(
      ReferralFeeKey.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V8}::borrow_referral::ReferralFeeKey`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): ReferralFeeKeyReified {
    const reifiedBcs = ReferralFeeKey.bcs
    return {
      typeName: ReferralFeeKey.$typeName,
      fullTypeName: composeSuiType(
        ReferralFeeKey.$typeName,
        ...[]
      ) as `${typeof PKG_V8}::borrow_referral::ReferralFeeKey`,
      typeArgs: [] as [],
      isPhantom: ReferralFeeKey.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ReferralFeeKey.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ReferralFeeKey.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ReferralFeeKey.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ReferralFeeKey.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ReferralFeeKey.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => ReferralFeeKey.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ReferralFeeKey.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => ReferralFeeKey.fetch(client, id),
      new: (fields: ReferralFeeKeyFields) => {
        return new ReferralFeeKey([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return ReferralFeeKey.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ReferralFeeKey>> {
    return phantom(ReferralFeeKey.reified())
  }
  static get p() {
    return ReferralFeeKey.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ReferralFeeKey', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof ReferralFeeKey.instantiateBcs> | null = null

  static get bcs() {
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

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ReferralFeeKey {
    return ReferralFeeKey.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): ReferralFeeKey {
    if (json.$typeName !== ReferralFeeKey.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return ReferralFeeKey.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): ReferralFeeKey {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isReferralFeeKey(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ReferralFeeKey object`)
    }
    return ReferralFeeKey.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): ReferralFeeKey {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isReferralFeeKey(data.bcs.type)) {
        throw new Error(`object at is not a ReferralFeeKey object`)
      }

      return ReferralFeeKey.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ReferralFeeKey.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<ReferralFeeKey> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching ReferralFeeKey object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isReferralFeeKey(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a ReferralFeeKey object`)
    }

    return ReferralFeeKey.fromSuiObjectData(res.data)
  }
}

/* ============================== AuthorizedWitnessList =============================== */

export function isAuthorizedWitnessList(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V7}::borrow_referral::AuthorizedWitnessList`
}

export interface AuthorizedWitnessListFields {
  id: ToField<UID>
  witnessList: ToField<VecSet<TypeName>>
}

export type AuthorizedWitnessListReified = Reified<
  AuthorizedWitnessList,
  AuthorizedWitnessListFields
>

export class AuthorizedWitnessList implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V7}::borrow_referral::AuthorizedWitnessList`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = AuthorizedWitnessList.$typeName
  readonly $fullTypeName: `${typeof PKG_V7}::borrow_referral::AuthorizedWitnessList`
  readonly $typeArgs: []
  readonly $isPhantom = AuthorizedWitnessList.$isPhantom

  readonly id: ToField<UID>
  readonly witnessList: ToField<VecSet<TypeName>>

  private constructor(typeArgs: [], fields: AuthorizedWitnessListFields) {
    this.$fullTypeName = composeSuiType(
      AuthorizedWitnessList.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V7}::borrow_referral::AuthorizedWitnessList`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.witnessList = fields.witnessList
  }

  static reified(): AuthorizedWitnessListReified {
    const reifiedBcs = AuthorizedWitnessList.bcs
    return {
      typeName: AuthorizedWitnessList.$typeName,
      fullTypeName: composeSuiType(
        AuthorizedWitnessList.$typeName,
        ...[]
      ) as `${typeof PKG_V7}::borrow_referral::AuthorizedWitnessList`,
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
      fromSuiParsedData: (content: SuiParsedData) =>
        AuthorizedWitnessList.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        AuthorizedWitnessList.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => AuthorizedWitnessList.fetch(client, id),
      new: (fields: AuthorizedWitnessListFields) => {
        return new AuthorizedWitnessList([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return AuthorizedWitnessList.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AuthorizedWitnessList>> {
    return phantom(AuthorizedWitnessList.reified())
  }
  static get p() {
    return AuthorizedWitnessList.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AuthorizedWitnessList', {
      id: UID.bcs,
      witness_list: VecSet.bcs(TypeName.bcs),
    })
  }

  private static cachedBcs: ReturnType<typeof AuthorizedWitnessList.instantiateBcs> | null = null

  static get bcs() {
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
        item.fields.witness_list
      ),
    })
  }

  static fromBcs(data: Uint8Array): AuthorizedWitnessList {
    return AuthorizedWitnessList.fromFields(AuthorizedWitnessList.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      witnessList: this.witnessList.toJSONField(),
    }
  }

  toJSON() {
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
      throw new Error('not a WithTwoGenerics json object')
    }

    return AuthorizedWitnessList.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): AuthorizedWitnessList {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAuthorizedWitnessList(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a AuthorizedWitnessList object`
      )
    }
    return AuthorizedWitnessList.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): AuthorizedWitnessList {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAuthorizedWitnessList(data.bcs.type)) {
        throw new Error(`object at is not a AuthorizedWitnessList object`)
      }

      return AuthorizedWitnessList.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AuthorizedWitnessList.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<AuthorizedWitnessList> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching AuthorizedWitnessList object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isAuthorizedWitnessList(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a AuthorizedWitnessList object`)
    }

    return AuthorizedWitnessList.fromSuiObjectData(res.data)
  }
}
