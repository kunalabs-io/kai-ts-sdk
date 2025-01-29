import * as reified from '../../_framework/reified'
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
  fieldToJSON,
  phantom,
} from '../../_framework/reified'
import {
  FieldsWithTypes,
  composeSuiType,
  compressSuiType,
  parseTypeName,
} from '../../_framework/util'
import { Vector } from '../../_framework/vector'
import { Option } from '../../move-stdlib/option/structs'
import { Balance } from '../../sui/balance/structs'
import { TreasuryCap } from '../../sui/coin/structs'
import { ID, UID } from '../../sui/object/structs'
import { VecMap } from '../../sui/vec-map/structs'
import { PKG_V1, PKG_V4 } from '../index'
import { TimeLockedBalance } from '../time-locked-balance/structs'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== AdminCap =============================== */

export function isAdminCap(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::vault::AdminCap` + '<')
}

export interface AdminCapFields<YT extends PhantomTypeArgument> {
  id: ToField<UID>
}

export type AdminCapReified<YT extends PhantomTypeArgument> = Reified<
  AdminCap<YT>,
  AdminCapFields<YT>
>

export class AdminCap<YT extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::vault::AdminCap`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = AdminCap.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::vault::AdminCap<${PhantomToTypeStr<YT>}>`
  readonly $typeArgs: [PhantomToTypeStr<YT>]
  readonly $isPhantom = AdminCap.$isPhantom

  readonly id: ToField<UID>

  private constructor(typeArgs: [PhantomToTypeStr<YT>], fields: AdminCapFields<YT>) {
    this.$fullTypeName = composeSuiType(
      AdminCap.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::vault::AdminCap<${PhantomToTypeStr<YT>}>`
    this.$typeArgs = typeArgs

    this.id = fields.id
  }

  static reified<YT extends PhantomReified<PhantomTypeArgument>>(
    YT: YT
  ): AdminCapReified<ToPhantomTypeArgument<YT>> {
    return {
      typeName: AdminCap.$typeName,
      fullTypeName: composeSuiType(
        AdminCap.$typeName,
        ...[extractType(YT)]
      ) as `${typeof PKG_V1}::vault::AdminCap<${PhantomToTypeStr<ToPhantomTypeArgument<YT>>}>`,
      typeArgs: [extractType(YT)] as [PhantomToTypeStr<ToPhantomTypeArgument<YT>>],
      isPhantom: AdminCap.$isPhantom,
      reifiedTypeArgs: [YT],
      fromFields: (fields: Record<string, any>) => AdminCap.fromFields(YT, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AdminCap.fromFieldsWithTypes(YT, item),
      fromBcs: (data: Uint8Array) => AdminCap.fromBcs(YT, data),
      bcs: AdminCap.bcs,
      fromJSONField: (field: any) => AdminCap.fromJSONField(YT, field),
      fromJSON: (json: Record<string, any>) => AdminCap.fromJSON(YT, json),
      fromSuiParsedData: (content: SuiParsedData) => AdminCap.fromSuiParsedData(YT, content),
      fromSuiObjectData: (content: SuiObjectData) => AdminCap.fromSuiObjectData(YT, content),
      fetch: async (client: SuiClient, id: string) => AdminCap.fetch(client, YT, id),
      new: (fields: AdminCapFields<ToPhantomTypeArgument<YT>>) => {
        return new AdminCap([extractType(YT)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return AdminCap.reified
  }

  static phantom<YT extends PhantomReified<PhantomTypeArgument>>(
    YT: YT
  ): PhantomReified<ToTypeStr<AdminCap<ToPhantomTypeArgument<YT>>>> {
    return phantom(AdminCap.reified(YT))
  }
  static get p() {
    return AdminCap.phantom
  }

  static get bcs() {
    return bcs.struct('AdminCap', {
      id: UID.bcs,
    })
  }

  static fromFields<YT extends PhantomReified<PhantomTypeArgument>>(
    typeArg: YT,
    fields: Record<string, any>
  ): AdminCap<ToPhantomTypeArgument<YT>> {
    return AdminCap.reified(typeArg).new({ id: decodeFromFields(UID.reified(), fields.id) })
  }

  static fromFieldsWithTypes<YT extends PhantomReified<PhantomTypeArgument>>(
    typeArg: YT,
    item: FieldsWithTypes
  ): AdminCap<ToPhantomTypeArgument<YT>> {
    if (!isAdminCap(item.type)) {
      throw new Error('not a AdminCap type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return AdminCap.reified(typeArg).new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
    })
  }

  static fromBcs<YT extends PhantomReified<PhantomTypeArgument>>(
    typeArg: YT,
    data: Uint8Array
  ): AdminCap<ToPhantomTypeArgument<YT>> {
    return AdminCap.fromFields(typeArg, AdminCap.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<YT extends PhantomReified<PhantomTypeArgument>>(
    typeArg: YT,
    field: any
  ): AdminCap<ToPhantomTypeArgument<YT>> {
    return AdminCap.reified(typeArg).new({ id: decodeFromJSONField(UID.reified(), field.id) })
  }

  static fromJSON<YT extends PhantomReified<PhantomTypeArgument>>(
    typeArg: YT,
    json: Record<string, any>
  ): AdminCap<ToPhantomTypeArgument<YT>> {
    if (json.$typeName !== AdminCap.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(AdminCap.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return AdminCap.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<YT extends PhantomReified<PhantomTypeArgument>>(
    typeArg: YT,
    content: SuiParsedData
  ): AdminCap<ToPhantomTypeArgument<YT>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAdminCap(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AdminCap object`)
    }
    return AdminCap.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<YT extends PhantomReified<PhantomTypeArgument>>(
    typeArg: YT,
    data: SuiObjectData
  ): AdminCap<ToPhantomTypeArgument<YT>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAdminCap(data.bcs.type)) {
        throw new Error(`object at is not a AdminCap object`)
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

      return AdminCap.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AdminCap.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<YT extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: YT,
    id: string
  ): Promise<AdminCap<ToPhantomTypeArgument<YT>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching AdminCap object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isAdminCap(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a AdminCap object`)
    }

    return AdminCap.fromSuiObjectData(typeArg, res.data)
  }
}

/* ============================== DepositEvent =============================== */

export function isDepositEvent(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V4}::vault::DepositEvent` + '<')
}

export interface DepositEventFields<YT extends PhantomTypeArgument> {
  amount: ToField<'u64'>
  lpMinted: ToField<'u64'>
}

export type DepositEventReified<YT extends PhantomTypeArgument> = Reified<
  DepositEvent<YT>,
  DepositEventFields<YT>
>

export class DepositEvent<YT extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V4}::vault::DepositEvent`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = DepositEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V4}::vault::DepositEvent<${PhantomToTypeStr<YT>}>`
  readonly $typeArgs: [PhantomToTypeStr<YT>]
  readonly $isPhantom = DepositEvent.$isPhantom

  readonly amount: ToField<'u64'>
  readonly lpMinted: ToField<'u64'>

  private constructor(typeArgs: [PhantomToTypeStr<YT>], fields: DepositEventFields<YT>) {
    this.$fullTypeName = composeSuiType(
      DepositEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V4}::vault::DepositEvent<${PhantomToTypeStr<YT>}>`
    this.$typeArgs = typeArgs

    this.amount = fields.amount
    this.lpMinted = fields.lpMinted
  }

  static reified<YT extends PhantomReified<PhantomTypeArgument>>(
    YT: YT
  ): DepositEventReified<ToPhantomTypeArgument<YT>> {
    return {
      typeName: DepositEvent.$typeName,
      fullTypeName: composeSuiType(
        DepositEvent.$typeName,
        ...[extractType(YT)]
      ) as `${typeof PKG_V4}::vault::DepositEvent<${PhantomToTypeStr<ToPhantomTypeArgument<YT>>}>`,
      typeArgs: [extractType(YT)] as [PhantomToTypeStr<ToPhantomTypeArgument<YT>>],
      isPhantom: DepositEvent.$isPhantom,
      reifiedTypeArgs: [YT],
      fromFields: (fields: Record<string, any>) => DepositEvent.fromFields(YT, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => DepositEvent.fromFieldsWithTypes(YT, item),
      fromBcs: (data: Uint8Array) => DepositEvent.fromBcs(YT, data),
      bcs: DepositEvent.bcs,
      fromJSONField: (field: any) => DepositEvent.fromJSONField(YT, field),
      fromJSON: (json: Record<string, any>) => DepositEvent.fromJSON(YT, json),
      fromSuiParsedData: (content: SuiParsedData) => DepositEvent.fromSuiParsedData(YT, content),
      fromSuiObjectData: (content: SuiObjectData) => DepositEvent.fromSuiObjectData(YT, content),
      fetch: async (client: SuiClient, id: string) => DepositEvent.fetch(client, YT, id),
      new: (fields: DepositEventFields<ToPhantomTypeArgument<YT>>) => {
        return new DepositEvent([extractType(YT)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return DepositEvent.reified
  }

  static phantom<YT extends PhantomReified<PhantomTypeArgument>>(
    YT: YT
  ): PhantomReified<ToTypeStr<DepositEvent<ToPhantomTypeArgument<YT>>>> {
    return phantom(DepositEvent.reified(YT))
  }
  static get p() {
    return DepositEvent.phantom
  }

  static get bcs() {
    return bcs.struct('DepositEvent', {
      amount: bcs.u64(),
      lp_minted: bcs.u64(),
    })
  }

  static fromFields<YT extends PhantomReified<PhantomTypeArgument>>(
    typeArg: YT,
    fields: Record<string, any>
  ): DepositEvent<ToPhantomTypeArgument<YT>> {
    return DepositEvent.reified(typeArg).new({
      amount: decodeFromFields('u64', fields.amount),
      lpMinted: decodeFromFields('u64', fields.lp_minted),
    })
  }

  static fromFieldsWithTypes<YT extends PhantomReified<PhantomTypeArgument>>(
    typeArg: YT,
    item: FieldsWithTypes
  ): DepositEvent<ToPhantomTypeArgument<YT>> {
    if (!isDepositEvent(item.type)) {
      throw new Error('not a DepositEvent type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return DepositEvent.reified(typeArg).new({
      amount: decodeFromFieldsWithTypes('u64', item.fields.amount),
      lpMinted: decodeFromFieldsWithTypes('u64', item.fields.lp_minted),
    })
  }

  static fromBcs<YT extends PhantomReified<PhantomTypeArgument>>(
    typeArg: YT,
    data: Uint8Array
  ): DepositEvent<ToPhantomTypeArgument<YT>> {
    return DepositEvent.fromFields(typeArg, DepositEvent.bcs.parse(data))
  }

  toJSONField() {
    return {
      amount: this.amount.toString(),
      lpMinted: this.lpMinted.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<YT extends PhantomReified<PhantomTypeArgument>>(
    typeArg: YT,
    field: any
  ): DepositEvent<ToPhantomTypeArgument<YT>> {
    return DepositEvent.reified(typeArg).new({
      amount: decodeFromJSONField('u64', field.amount),
      lpMinted: decodeFromJSONField('u64', field.lpMinted),
    })
  }

  static fromJSON<YT extends PhantomReified<PhantomTypeArgument>>(
    typeArg: YT,
    json: Record<string, any>
  ): DepositEvent<ToPhantomTypeArgument<YT>> {
    if (json.$typeName !== DepositEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(DepositEvent.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return DepositEvent.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<YT extends PhantomReified<PhantomTypeArgument>>(
    typeArg: YT,
    content: SuiParsedData
  ): DepositEvent<ToPhantomTypeArgument<YT>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isDepositEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a DepositEvent object`)
    }
    return DepositEvent.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<YT extends PhantomReified<PhantomTypeArgument>>(
    typeArg: YT,
    data: SuiObjectData
  ): DepositEvent<ToPhantomTypeArgument<YT>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isDepositEvent(data.bcs.type)) {
        throw new Error(`object at is not a DepositEvent object`)
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

      return DepositEvent.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return DepositEvent.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<YT extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: YT,
    id: string
  ): Promise<DepositEvent<ToPhantomTypeArgument<YT>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching DepositEvent object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isDepositEvent(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a DepositEvent object`)
    }

    return DepositEvent.fromSuiObjectData(typeArg, res.data)
  }
}

/* ============================== RebalanceAmounts =============================== */

export function isRebalanceAmounts(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::vault::RebalanceAmounts`
}

export interface RebalanceAmountsFields {
  inner: ToField<VecMap<ID, RebalanceInfo>>
}

export type RebalanceAmountsReified = Reified<RebalanceAmounts, RebalanceAmountsFields>

export class RebalanceAmounts implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::vault::RebalanceAmounts`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = RebalanceAmounts.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::vault::RebalanceAmounts`
  readonly $typeArgs: []
  readonly $isPhantom = RebalanceAmounts.$isPhantom

  readonly inner: ToField<VecMap<ID, RebalanceInfo>>

  private constructor(typeArgs: [], fields: RebalanceAmountsFields) {
    this.$fullTypeName = composeSuiType(
      RebalanceAmounts.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::vault::RebalanceAmounts`
    this.$typeArgs = typeArgs

    this.inner = fields.inner
  }

  static reified(): RebalanceAmountsReified {
    return {
      typeName: RebalanceAmounts.$typeName,
      fullTypeName: composeSuiType(
        RebalanceAmounts.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::vault::RebalanceAmounts`,
      typeArgs: [] as [],
      isPhantom: RebalanceAmounts.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => RebalanceAmounts.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => RebalanceAmounts.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => RebalanceAmounts.fromBcs(data),
      bcs: RebalanceAmounts.bcs,
      fromJSONField: (field: any) => RebalanceAmounts.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => RebalanceAmounts.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => RebalanceAmounts.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => RebalanceAmounts.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => RebalanceAmounts.fetch(client, id),
      new: (fields: RebalanceAmountsFields) => {
        return new RebalanceAmounts([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return RebalanceAmounts.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RebalanceAmounts>> {
    return phantom(RebalanceAmounts.reified())
  }
  static get p() {
    return RebalanceAmounts.phantom()
  }

  static get bcs() {
    return bcs.struct('RebalanceAmounts', {
      inner: VecMap.bcs(ID.bcs, RebalanceInfo.bcs),
    })
  }

  static fromFields(fields: Record<string, any>): RebalanceAmounts {
    return RebalanceAmounts.reified().new({
      inner: decodeFromFields(VecMap.reified(ID.reified(), RebalanceInfo.reified()), fields.inner),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): RebalanceAmounts {
    if (!isRebalanceAmounts(item.type)) {
      throw new Error('not a RebalanceAmounts type')
    }

    return RebalanceAmounts.reified().new({
      inner: decodeFromFieldsWithTypes(
        VecMap.reified(ID.reified(), RebalanceInfo.reified()),
        item.fields.inner
      ),
    })
  }

  static fromBcs(data: Uint8Array): RebalanceAmounts {
    return RebalanceAmounts.fromFields(RebalanceAmounts.bcs.parse(data))
  }

  toJSONField() {
    return {
      inner: this.inner.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): RebalanceAmounts {
    return RebalanceAmounts.reified().new({
      inner: decodeFromJSONField(
        VecMap.reified(ID.reified(), RebalanceInfo.reified()),
        field.inner
      ),
    })
  }

  static fromJSON(json: Record<string, any>): RebalanceAmounts {
    if (json.$typeName !== RebalanceAmounts.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return RebalanceAmounts.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): RebalanceAmounts {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRebalanceAmounts(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a RebalanceAmounts object`)
    }
    return RebalanceAmounts.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): RebalanceAmounts {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRebalanceAmounts(data.bcs.type)) {
        throw new Error(`object at is not a RebalanceAmounts object`)
      }

      return RebalanceAmounts.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RebalanceAmounts.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<RebalanceAmounts> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching RebalanceAmounts object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isRebalanceAmounts(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a RebalanceAmounts object`)
    }

    return RebalanceAmounts.fromSuiObjectData(res.data)
  }
}

/* ============================== RebalanceInfo =============================== */

export function isRebalanceInfo(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::vault::RebalanceInfo`
}

export interface RebalanceInfoFields {
  toRepay: ToField<'u64'>
  canBorrow: ToField<'u64'>
}

export type RebalanceInfoReified = Reified<RebalanceInfo, RebalanceInfoFields>

export class RebalanceInfo implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::vault::RebalanceInfo`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = RebalanceInfo.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::vault::RebalanceInfo`
  readonly $typeArgs: []
  readonly $isPhantom = RebalanceInfo.$isPhantom

  readonly toRepay: ToField<'u64'>
  readonly canBorrow: ToField<'u64'>

  private constructor(typeArgs: [], fields: RebalanceInfoFields) {
    this.$fullTypeName = composeSuiType(
      RebalanceInfo.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::vault::RebalanceInfo`
    this.$typeArgs = typeArgs

    this.toRepay = fields.toRepay
    this.canBorrow = fields.canBorrow
  }

  static reified(): RebalanceInfoReified {
    return {
      typeName: RebalanceInfo.$typeName,
      fullTypeName: composeSuiType(
        RebalanceInfo.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::vault::RebalanceInfo`,
      typeArgs: [] as [],
      isPhantom: RebalanceInfo.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => RebalanceInfo.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => RebalanceInfo.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => RebalanceInfo.fromBcs(data),
      bcs: RebalanceInfo.bcs,
      fromJSONField: (field: any) => RebalanceInfo.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => RebalanceInfo.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => RebalanceInfo.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => RebalanceInfo.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => RebalanceInfo.fetch(client, id),
      new: (fields: RebalanceInfoFields) => {
        return new RebalanceInfo([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return RebalanceInfo.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RebalanceInfo>> {
    return phantom(RebalanceInfo.reified())
  }
  static get p() {
    return RebalanceInfo.phantom()
  }

  static get bcs() {
    return bcs.struct('RebalanceInfo', {
      to_repay: bcs.u64(),
      can_borrow: bcs.u64(),
    })
  }

  static fromFields(fields: Record<string, any>): RebalanceInfo {
    return RebalanceInfo.reified().new({
      toRepay: decodeFromFields('u64', fields.to_repay),
      canBorrow: decodeFromFields('u64', fields.can_borrow),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): RebalanceInfo {
    if (!isRebalanceInfo(item.type)) {
      throw new Error('not a RebalanceInfo type')
    }

    return RebalanceInfo.reified().new({
      toRepay: decodeFromFieldsWithTypes('u64', item.fields.to_repay),
      canBorrow: decodeFromFieldsWithTypes('u64', item.fields.can_borrow),
    })
  }

  static fromBcs(data: Uint8Array): RebalanceInfo {
    return RebalanceInfo.fromFields(RebalanceInfo.bcs.parse(data))
  }

  toJSONField() {
    return {
      toRepay: this.toRepay.toString(),
      canBorrow: this.canBorrow.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): RebalanceInfo {
    return RebalanceInfo.reified().new({
      toRepay: decodeFromJSONField('u64', field.toRepay),
      canBorrow: decodeFromJSONField('u64', field.canBorrow),
    })
  }

  static fromJSON(json: Record<string, any>): RebalanceInfo {
    if (json.$typeName !== RebalanceInfo.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return RebalanceInfo.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): RebalanceInfo {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRebalanceInfo(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a RebalanceInfo object`)
    }
    return RebalanceInfo.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): RebalanceInfo {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRebalanceInfo(data.bcs.type)) {
        throw new Error(`object at is not a RebalanceInfo object`)
      }

      return RebalanceInfo.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RebalanceInfo.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<RebalanceInfo> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching RebalanceInfo object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isRebalanceInfo(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a RebalanceInfo object`)
    }

    return RebalanceInfo.fromSuiObjectData(res.data)
  }
}

/* ============================== StrategyLossEvent =============================== */

export function isStrategyLossEvent(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V4}::vault::StrategyLossEvent` + '<')
}

export interface StrategyLossEventFields<YT extends PhantomTypeArgument> {
  strategyId: ToField<ID>
  toWithdraw: ToField<'u64'>
  withdrawn: ToField<'u64'>
}

export type StrategyLossEventReified<YT extends PhantomTypeArgument> = Reified<
  StrategyLossEvent<YT>,
  StrategyLossEventFields<YT>
>

export class StrategyLossEvent<YT extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V4}::vault::StrategyLossEvent`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = StrategyLossEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V4}::vault::StrategyLossEvent<${PhantomToTypeStr<YT>}>`
  readonly $typeArgs: [PhantomToTypeStr<YT>]
  readonly $isPhantom = StrategyLossEvent.$isPhantom

  readonly strategyId: ToField<ID>
  readonly toWithdraw: ToField<'u64'>
  readonly withdrawn: ToField<'u64'>

  private constructor(typeArgs: [PhantomToTypeStr<YT>], fields: StrategyLossEventFields<YT>) {
    this.$fullTypeName = composeSuiType(
      StrategyLossEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V4}::vault::StrategyLossEvent<${PhantomToTypeStr<YT>}>`
    this.$typeArgs = typeArgs

    this.strategyId = fields.strategyId
    this.toWithdraw = fields.toWithdraw
    this.withdrawn = fields.withdrawn
  }

  static reified<YT extends PhantomReified<PhantomTypeArgument>>(
    YT: YT
  ): StrategyLossEventReified<ToPhantomTypeArgument<YT>> {
    return {
      typeName: StrategyLossEvent.$typeName,
      fullTypeName: composeSuiType(
        StrategyLossEvent.$typeName,
        ...[extractType(YT)]
      ) as `${typeof PKG_V4}::vault::StrategyLossEvent<${PhantomToTypeStr<ToPhantomTypeArgument<YT>>}>`,
      typeArgs: [extractType(YT)] as [PhantomToTypeStr<ToPhantomTypeArgument<YT>>],
      isPhantom: StrategyLossEvent.$isPhantom,
      reifiedTypeArgs: [YT],
      fromFields: (fields: Record<string, any>) => StrategyLossEvent.fromFields(YT, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        StrategyLossEvent.fromFieldsWithTypes(YT, item),
      fromBcs: (data: Uint8Array) => StrategyLossEvent.fromBcs(YT, data),
      bcs: StrategyLossEvent.bcs,
      fromJSONField: (field: any) => StrategyLossEvent.fromJSONField(YT, field),
      fromJSON: (json: Record<string, any>) => StrategyLossEvent.fromJSON(YT, json),
      fromSuiParsedData: (content: SuiParsedData) =>
        StrategyLossEvent.fromSuiParsedData(YT, content),
      fromSuiObjectData: (content: SuiObjectData) =>
        StrategyLossEvent.fromSuiObjectData(YT, content),
      fetch: async (client: SuiClient, id: string) => StrategyLossEvent.fetch(client, YT, id),
      new: (fields: StrategyLossEventFields<ToPhantomTypeArgument<YT>>) => {
        return new StrategyLossEvent([extractType(YT)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return StrategyLossEvent.reified
  }

  static phantom<YT extends PhantomReified<PhantomTypeArgument>>(
    YT: YT
  ): PhantomReified<ToTypeStr<StrategyLossEvent<ToPhantomTypeArgument<YT>>>> {
    return phantom(StrategyLossEvent.reified(YT))
  }
  static get p() {
    return StrategyLossEvent.phantom
  }

  static get bcs() {
    return bcs.struct('StrategyLossEvent', {
      strategy_id: ID.bcs,
      to_withdraw: bcs.u64(),
      withdrawn: bcs.u64(),
    })
  }

  static fromFields<YT extends PhantomReified<PhantomTypeArgument>>(
    typeArg: YT,
    fields: Record<string, any>
  ): StrategyLossEvent<ToPhantomTypeArgument<YT>> {
    return StrategyLossEvent.reified(typeArg).new({
      strategyId: decodeFromFields(ID.reified(), fields.strategy_id),
      toWithdraw: decodeFromFields('u64', fields.to_withdraw),
      withdrawn: decodeFromFields('u64', fields.withdrawn),
    })
  }

  static fromFieldsWithTypes<YT extends PhantomReified<PhantomTypeArgument>>(
    typeArg: YT,
    item: FieldsWithTypes
  ): StrategyLossEvent<ToPhantomTypeArgument<YT>> {
    if (!isStrategyLossEvent(item.type)) {
      throw new Error('not a StrategyLossEvent type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return StrategyLossEvent.reified(typeArg).new({
      strategyId: decodeFromFieldsWithTypes(ID.reified(), item.fields.strategy_id),
      toWithdraw: decodeFromFieldsWithTypes('u64', item.fields.to_withdraw),
      withdrawn: decodeFromFieldsWithTypes('u64', item.fields.withdrawn),
    })
  }

  static fromBcs<YT extends PhantomReified<PhantomTypeArgument>>(
    typeArg: YT,
    data: Uint8Array
  ): StrategyLossEvent<ToPhantomTypeArgument<YT>> {
    return StrategyLossEvent.fromFields(typeArg, StrategyLossEvent.bcs.parse(data))
  }

  toJSONField() {
    return {
      strategyId: this.strategyId,
      toWithdraw: this.toWithdraw.toString(),
      withdrawn: this.withdrawn.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<YT extends PhantomReified<PhantomTypeArgument>>(
    typeArg: YT,
    field: any
  ): StrategyLossEvent<ToPhantomTypeArgument<YT>> {
    return StrategyLossEvent.reified(typeArg).new({
      strategyId: decodeFromJSONField(ID.reified(), field.strategyId),
      toWithdraw: decodeFromJSONField('u64', field.toWithdraw),
      withdrawn: decodeFromJSONField('u64', field.withdrawn),
    })
  }

  static fromJSON<YT extends PhantomReified<PhantomTypeArgument>>(
    typeArg: YT,
    json: Record<string, any>
  ): StrategyLossEvent<ToPhantomTypeArgument<YT>> {
    if (json.$typeName !== StrategyLossEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(StrategyLossEvent.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return StrategyLossEvent.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<YT extends PhantomReified<PhantomTypeArgument>>(
    typeArg: YT,
    content: SuiParsedData
  ): StrategyLossEvent<ToPhantomTypeArgument<YT>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isStrategyLossEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a StrategyLossEvent object`)
    }
    return StrategyLossEvent.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<YT extends PhantomReified<PhantomTypeArgument>>(
    typeArg: YT,
    data: SuiObjectData
  ): StrategyLossEvent<ToPhantomTypeArgument<YT>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isStrategyLossEvent(data.bcs.type)) {
        throw new Error(`object at is not a StrategyLossEvent object`)
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

      return StrategyLossEvent.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return StrategyLossEvent.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<YT extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: YT,
    id: string
  ): Promise<StrategyLossEvent<ToPhantomTypeArgument<YT>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching StrategyLossEvent object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isStrategyLossEvent(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a StrategyLossEvent object`)
    }

    return StrategyLossEvent.fromSuiObjectData(typeArg, res.data)
  }
}

/* ============================== StrategyProfitEvent =============================== */

export function isStrategyProfitEvent(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V4}::vault::StrategyProfitEvent` + '<')
}

export interface StrategyProfitEventFields<YT extends PhantomTypeArgument> {
  strategyId: ToField<ID>
  profit: ToField<'u64'>
  feeAmtYt: ToField<'u64'>
}

export type StrategyProfitEventReified<YT extends PhantomTypeArgument> = Reified<
  StrategyProfitEvent<YT>,
  StrategyProfitEventFields<YT>
>

export class StrategyProfitEvent<YT extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V4}::vault::StrategyProfitEvent`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = StrategyProfitEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V4}::vault::StrategyProfitEvent<${PhantomToTypeStr<YT>}>`
  readonly $typeArgs: [PhantomToTypeStr<YT>]
  readonly $isPhantom = StrategyProfitEvent.$isPhantom

  readonly strategyId: ToField<ID>
  readonly profit: ToField<'u64'>
  readonly feeAmtYt: ToField<'u64'>

  private constructor(typeArgs: [PhantomToTypeStr<YT>], fields: StrategyProfitEventFields<YT>) {
    this.$fullTypeName = composeSuiType(
      StrategyProfitEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V4}::vault::StrategyProfitEvent<${PhantomToTypeStr<YT>}>`
    this.$typeArgs = typeArgs

    this.strategyId = fields.strategyId
    this.profit = fields.profit
    this.feeAmtYt = fields.feeAmtYt
  }

  static reified<YT extends PhantomReified<PhantomTypeArgument>>(
    YT: YT
  ): StrategyProfitEventReified<ToPhantomTypeArgument<YT>> {
    return {
      typeName: StrategyProfitEvent.$typeName,
      fullTypeName: composeSuiType(
        StrategyProfitEvent.$typeName,
        ...[extractType(YT)]
      ) as `${typeof PKG_V4}::vault::StrategyProfitEvent<${PhantomToTypeStr<ToPhantomTypeArgument<YT>>}>`,
      typeArgs: [extractType(YT)] as [PhantomToTypeStr<ToPhantomTypeArgument<YT>>],
      isPhantom: StrategyProfitEvent.$isPhantom,
      reifiedTypeArgs: [YT],
      fromFields: (fields: Record<string, any>) => StrategyProfitEvent.fromFields(YT, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        StrategyProfitEvent.fromFieldsWithTypes(YT, item),
      fromBcs: (data: Uint8Array) => StrategyProfitEvent.fromBcs(YT, data),
      bcs: StrategyProfitEvent.bcs,
      fromJSONField: (field: any) => StrategyProfitEvent.fromJSONField(YT, field),
      fromJSON: (json: Record<string, any>) => StrategyProfitEvent.fromJSON(YT, json),
      fromSuiParsedData: (content: SuiParsedData) =>
        StrategyProfitEvent.fromSuiParsedData(YT, content),
      fromSuiObjectData: (content: SuiObjectData) =>
        StrategyProfitEvent.fromSuiObjectData(YT, content),
      fetch: async (client: SuiClient, id: string) => StrategyProfitEvent.fetch(client, YT, id),
      new: (fields: StrategyProfitEventFields<ToPhantomTypeArgument<YT>>) => {
        return new StrategyProfitEvent([extractType(YT)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return StrategyProfitEvent.reified
  }

  static phantom<YT extends PhantomReified<PhantomTypeArgument>>(
    YT: YT
  ): PhantomReified<ToTypeStr<StrategyProfitEvent<ToPhantomTypeArgument<YT>>>> {
    return phantom(StrategyProfitEvent.reified(YT))
  }
  static get p() {
    return StrategyProfitEvent.phantom
  }

  static get bcs() {
    return bcs.struct('StrategyProfitEvent', {
      strategy_id: ID.bcs,
      profit: bcs.u64(),
      fee_amt_yt: bcs.u64(),
    })
  }

  static fromFields<YT extends PhantomReified<PhantomTypeArgument>>(
    typeArg: YT,
    fields: Record<string, any>
  ): StrategyProfitEvent<ToPhantomTypeArgument<YT>> {
    return StrategyProfitEvent.reified(typeArg).new({
      strategyId: decodeFromFields(ID.reified(), fields.strategy_id),
      profit: decodeFromFields('u64', fields.profit),
      feeAmtYt: decodeFromFields('u64', fields.fee_amt_yt),
    })
  }

  static fromFieldsWithTypes<YT extends PhantomReified<PhantomTypeArgument>>(
    typeArg: YT,
    item: FieldsWithTypes
  ): StrategyProfitEvent<ToPhantomTypeArgument<YT>> {
    if (!isStrategyProfitEvent(item.type)) {
      throw new Error('not a StrategyProfitEvent type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return StrategyProfitEvent.reified(typeArg).new({
      strategyId: decodeFromFieldsWithTypes(ID.reified(), item.fields.strategy_id),
      profit: decodeFromFieldsWithTypes('u64', item.fields.profit),
      feeAmtYt: decodeFromFieldsWithTypes('u64', item.fields.fee_amt_yt),
    })
  }

  static fromBcs<YT extends PhantomReified<PhantomTypeArgument>>(
    typeArg: YT,
    data: Uint8Array
  ): StrategyProfitEvent<ToPhantomTypeArgument<YT>> {
    return StrategyProfitEvent.fromFields(typeArg, StrategyProfitEvent.bcs.parse(data))
  }

  toJSONField() {
    return {
      strategyId: this.strategyId,
      profit: this.profit.toString(),
      feeAmtYt: this.feeAmtYt.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<YT extends PhantomReified<PhantomTypeArgument>>(
    typeArg: YT,
    field: any
  ): StrategyProfitEvent<ToPhantomTypeArgument<YT>> {
    return StrategyProfitEvent.reified(typeArg).new({
      strategyId: decodeFromJSONField(ID.reified(), field.strategyId),
      profit: decodeFromJSONField('u64', field.profit),
      feeAmtYt: decodeFromJSONField('u64', field.feeAmtYt),
    })
  }

  static fromJSON<YT extends PhantomReified<PhantomTypeArgument>>(
    typeArg: YT,
    json: Record<string, any>
  ): StrategyProfitEvent<ToPhantomTypeArgument<YT>> {
    if (json.$typeName !== StrategyProfitEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(StrategyProfitEvent.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return StrategyProfitEvent.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<YT extends PhantomReified<PhantomTypeArgument>>(
    typeArg: YT,
    content: SuiParsedData
  ): StrategyProfitEvent<ToPhantomTypeArgument<YT>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isStrategyProfitEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a StrategyProfitEvent object`)
    }
    return StrategyProfitEvent.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<YT extends PhantomReified<PhantomTypeArgument>>(
    typeArg: YT,
    data: SuiObjectData
  ): StrategyProfitEvent<ToPhantomTypeArgument<YT>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isStrategyProfitEvent(data.bcs.type)) {
        throw new Error(`object at is not a StrategyProfitEvent object`)
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

      return StrategyProfitEvent.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return StrategyProfitEvent.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<YT extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: YT,
    id: string
  ): Promise<StrategyProfitEvent<ToPhantomTypeArgument<YT>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching StrategyProfitEvent object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isStrategyProfitEvent(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a StrategyProfitEvent object`)
    }

    return StrategyProfitEvent.fromSuiObjectData(typeArg, res.data)
  }
}

/* ============================== StrategyRemovalTicket =============================== */

export function isStrategyRemovalTicket(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::vault::StrategyRemovalTicket` + '<')
}

export interface StrategyRemovalTicketFields<
  T extends PhantomTypeArgument,
  YT extends PhantomTypeArgument,
> {
  access: ToField<VaultAccess>
  returnedBalance: ToField<Balance<T>>
}

export type StrategyRemovalTicketReified<
  T extends PhantomTypeArgument,
  YT extends PhantomTypeArgument,
> = Reified<StrategyRemovalTicket<T, YT>, StrategyRemovalTicketFields<T, YT>>

export class StrategyRemovalTicket<T extends PhantomTypeArgument, YT extends PhantomTypeArgument>
  implements StructClass
{
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::vault::StrategyRemovalTicket`
  static readonly $numTypeParams = 2
  static readonly $isPhantom = [true, true] as const

  readonly $typeName = StrategyRemovalTicket.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::vault::StrategyRemovalTicket<${PhantomToTypeStr<T>}, ${PhantomToTypeStr<YT>}>`
  readonly $typeArgs: [PhantomToTypeStr<T>, PhantomToTypeStr<YT>]
  readonly $isPhantom = StrategyRemovalTicket.$isPhantom

  readonly access: ToField<VaultAccess>
  readonly returnedBalance: ToField<Balance<T>>

  private constructor(
    typeArgs: [PhantomToTypeStr<T>, PhantomToTypeStr<YT>],
    fields: StrategyRemovalTicketFields<T, YT>
  ) {
    this.$fullTypeName = composeSuiType(
      StrategyRemovalTicket.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::vault::StrategyRemovalTicket<${PhantomToTypeStr<T>}, ${PhantomToTypeStr<YT>}>`
    this.$typeArgs = typeArgs

    this.access = fields.access
    this.returnedBalance = fields.returnedBalance
  }

  static reified<
    T extends PhantomReified<PhantomTypeArgument>,
    YT extends PhantomReified<PhantomTypeArgument>,
  >(
    T: T,
    YT: YT
  ): StrategyRemovalTicketReified<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<YT>> {
    return {
      typeName: StrategyRemovalTicket.$typeName,
      fullTypeName: composeSuiType(
        StrategyRemovalTicket.$typeName,
        ...[extractType(T), extractType(YT)]
      ) as `${typeof PKG_V1}::vault::StrategyRemovalTicket<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}, ${PhantomToTypeStr<ToPhantomTypeArgument<YT>>}>`,
      typeArgs: [extractType(T), extractType(YT)] as [
        PhantomToTypeStr<ToPhantomTypeArgument<T>>,
        PhantomToTypeStr<ToPhantomTypeArgument<YT>>,
      ],
      isPhantom: StrategyRemovalTicket.$isPhantom,
      reifiedTypeArgs: [T, YT],
      fromFields: (fields: Record<string, any>) =>
        StrategyRemovalTicket.fromFields([T, YT], fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        StrategyRemovalTicket.fromFieldsWithTypes([T, YT], item),
      fromBcs: (data: Uint8Array) => StrategyRemovalTicket.fromBcs([T, YT], data),
      bcs: StrategyRemovalTicket.bcs,
      fromJSONField: (field: any) => StrategyRemovalTicket.fromJSONField([T, YT], field),
      fromJSON: (json: Record<string, any>) => StrategyRemovalTicket.fromJSON([T, YT], json),
      fromSuiParsedData: (content: SuiParsedData) =>
        StrategyRemovalTicket.fromSuiParsedData([T, YT], content),
      fromSuiObjectData: (content: SuiObjectData) =>
        StrategyRemovalTicket.fromSuiObjectData([T, YT], content),
      fetch: async (client: SuiClient, id: string) =>
        StrategyRemovalTicket.fetch(client, [T, YT], id),
      new: (
        fields: StrategyRemovalTicketFields<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<YT>>
      ) => {
        return new StrategyRemovalTicket([extractType(T), extractType(YT)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return StrategyRemovalTicket.reified
  }

  static phantom<
    T extends PhantomReified<PhantomTypeArgument>,
    YT extends PhantomReified<PhantomTypeArgument>,
  >(
    T: T,
    YT: YT
  ): PhantomReified<
    ToTypeStr<StrategyRemovalTicket<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<YT>>>
  > {
    return phantom(StrategyRemovalTicket.reified(T, YT))
  }
  static get p() {
    return StrategyRemovalTicket.phantom
  }

  static get bcs() {
    return bcs.struct('StrategyRemovalTicket', {
      access: VaultAccess.bcs,
      returned_balance: Balance.bcs,
    })
  }

  static fromFields<
    T extends PhantomReified<PhantomTypeArgument>,
    YT extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, YT],
    fields: Record<string, any>
  ): StrategyRemovalTicket<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<YT>> {
    return StrategyRemovalTicket.reified(typeArgs[0], typeArgs[1]).new({
      access: decodeFromFields(VaultAccess.reified(), fields.access),
      returnedBalance: decodeFromFields(Balance.reified(typeArgs[0]), fields.returned_balance),
    })
  }

  static fromFieldsWithTypes<
    T extends PhantomReified<PhantomTypeArgument>,
    YT extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, YT],
    item: FieldsWithTypes
  ): StrategyRemovalTicket<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<YT>> {
    if (!isStrategyRemovalTicket(item.type)) {
      throw new Error('not a StrategyRemovalTicket type')
    }
    assertFieldsWithTypesArgsMatch(item, typeArgs)

    return StrategyRemovalTicket.reified(typeArgs[0], typeArgs[1]).new({
      access: decodeFromFieldsWithTypes(VaultAccess.reified(), item.fields.access),
      returnedBalance: decodeFromFieldsWithTypes(
        Balance.reified(typeArgs[0]),
        item.fields.returned_balance
      ),
    })
  }

  static fromBcs<
    T extends PhantomReified<PhantomTypeArgument>,
    YT extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, YT],
    data: Uint8Array
  ): StrategyRemovalTicket<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<YT>> {
    return StrategyRemovalTicket.fromFields(typeArgs, StrategyRemovalTicket.bcs.parse(data))
  }

  toJSONField() {
    return {
      access: this.access.toJSONField(),
      returnedBalance: this.returnedBalance.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<
    T extends PhantomReified<PhantomTypeArgument>,
    YT extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, YT],
    field: any
  ): StrategyRemovalTicket<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<YT>> {
    return StrategyRemovalTicket.reified(typeArgs[0], typeArgs[1]).new({
      access: decodeFromJSONField(VaultAccess.reified(), field.access),
      returnedBalance: decodeFromJSONField(Balance.reified(typeArgs[0]), field.returnedBalance),
    })
  }

  static fromJSON<
    T extends PhantomReified<PhantomTypeArgument>,
    YT extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, YT],
    json: Record<string, any>
  ): StrategyRemovalTicket<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<YT>> {
    if (json.$typeName !== StrategyRemovalTicket.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(StrategyRemovalTicket.$typeName, ...typeArgs.map(extractType)),
      json.$typeArgs,
      typeArgs
    )

    return StrategyRemovalTicket.fromJSONField(typeArgs, json)
  }

  static fromSuiParsedData<
    T extends PhantomReified<PhantomTypeArgument>,
    YT extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, YT],
    content: SuiParsedData
  ): StrategyRemovalTicket<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<YT>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isStrategyRemovalTicket(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a StrategyRemovalTicket object`
      )
    }
    return StrategyRemovalTicket.fromFieldsWithTypes(typeArgs, content)
  }

  static fromSuiObjectData<
    T extends PhantomReified<PhantomTypeArgument>,
    YT extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, YT],
    data: SuiObjectData
  ): StrategyRemovalTicket<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<YT>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isStrategyRemovalTicket(data.bcs.type)) {
        throw new Error(`object at is not a StrategyRemovalTicket object`)
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

      return StrategyRemovalTicket.fromBcs(typeArgs, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return StrategyRemovalTicket.fromSuiParsedData(typeArgs, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<
    T extends PhantomReified<PhantomTypeArgument>,
    YT extends PhantomReified<PhantomTypeArgument>,
  >(
    client: SuiClient,
    typeArgs: [T, YT],
    id: string
  ): Promise<StrategyRemovalTicket<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<YT>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching StrategyRemovalTicket object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isStrategyRemovalTicket(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a StrategyRemovalTicket object`)
    }

    return StrategyRemovalTicket.fromSuiObjectData(typeArgs, res.data)
  }
}

/* ============================== StrategyState =============================== */

export function isStrategyState(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::vault::StrategyState`
}

export interface StrategyStateFields {
  borrowed: ToField<'u64'>
  targetAllocWeightBps: ToField<'u64'>
  maxBorrow: ToField<Option<'u64'>>
}

export type StrategyStateReified = Reified<StrategyState, StrategyStateFields>

export class StrategyState implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::vault::StrategyState`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = StrategyState.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::vault::StrategyState`
  readonly $typeArgs: []
  readonly $isPhantom = StrategyState.$isPhantom

  readonly borrowed: ToField<'u64'>
  readonly targetAllocWeightBps: ToField<'u64'>
  readonly maxBorrow: ToField<Option<'u64'>>

  private constructor(typeArgs: [], fields: StrategyStateFields) {
    this.$fullTypeName = composeSuiType(
      StrategyState.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::vault::StrategyState`
    this.$typeArgs = typeArgs

    this.borrowed = fields.borrowed
    this.targetAllocWeightBps = fields.targetAllocWeightBps
    this.maxBorrow = fields.maxBorrow
  }

  static reified(): StrategyStateReified {
    return {
      typeName: StrategyState.$typeName,
      fullTypeName: composeSuiType(
        StrategyState.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::vault::StrategyState`,
      typeArgs: [] as [],
      isPhantom: StrategyState.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => StrategyState.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => StrategyState.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => StrategyState.fromBcs(data),
      bcs: StrategyState.bcs,
      fromJSONField: (field: any) => StrategyState.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => StrategyState.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => StrategyState.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => StrategyState.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => StrategyState.fetch(client, id),
      new: (fields: StrategyStateFields) => {
        return new StrategyState([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return StrategyState.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<StrategyState>> {
    return phantom(StrategyState.reified())
  }
  static get p() {
    return StrategyState.phantom()
  }

  static get bcs() {
    return bcs.struct('StrategyState', {
      borrowed: bcs.u64(),
      target_alloc_weight_bps: bcs.u64(),
      max_borrow: Option.bcs(bcs.u64()),
    })
  }

  static fromFields(fields: Record<string, any>): StrategyState {
    return StrategyState.reified().new({
      borrowed: decodeFromFields('u64', fields.borrowed),
      targetAllocWeightBps: decodeFromFields('u64', fields.target_alloc_weight_bps),
      maxBorrow: decodeFromFields(Option.reified('u64'), fields.max_borrow),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): StrategyState {
    if (!isStrategyState(item.type)) {
      throw new Error('not a StrategyState type')
    }

    return StrategyState.reified().new({
      borrowed: decodeFromFieldsWithTypes('u64', item.fields.borrowed),
      targetAllocWeightBps: decodeFromFieldsWithTypes('u64', item.fields.target_alloc_weight_bps),
      maxBorrow: decodeFromFieldsWithTypes(Option.reified('u64'), item.fields.max_borrow),
    })
  }

  static fromBcs(data: Uint8Array): StrategyState {
    return StrategyState.fromFields(StrategyState.bcs.parse(data))
  }

  toJSONField() {
    return {
      borrowed: this.borrowed.toString(),
      targetAllocWeightBps: this.targetAllocWeightBps.toString(),
      maxBorrow: fieldToJSON<Option<'u64'>>(`${Option.$typeName}<u64>`, this.maxBorrow),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): StrategyState {
    return StrategyState.reified().new({
      borrowed: decodeFromJSONField('u64', field.borrowed),
      targetAllocWeightBps: decodeFromJSONField('u64', field.targetAllocWeightBps),
      maxBorrow: decodeFromJSONField(Option.reified('u64'), field.maxBorrow),
    })
  }

  static fromJSON(json: Record<string, any>): StrategyState {
    if (json.$typeName !== StrategyState.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return StrategyState.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): StrategyState {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isStrategyState(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a StrategyState object`)
    }
    return StrategyState.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): StrategyState {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isStrategyState(data.bcs.type)) {
        throw new Error(`object at is not a StrategyState object`)
      }

      return StrategyState.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return StrategyState.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<StrategyState> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching StrategyState object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isStrategyState(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a StrategyState object`)
    }

    return StrategyState.fromSuiObjectData(res.data)
  }
}

/* ============================== StrategyWithdrawInfo =============================== */

export function isStrategyWithdrawInfo(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::vault::StrategyWithdrawInfo` + '<')
}

export interface StrategyWithdrawInfoFields<T extends PhantomTypeArgument> {
  toWithdraw: ToField<'u64'>
  withdrawnBalance: ToField<Balance<T>>
  hasWithdrawn: ToField<'bool'>
}

export type StrategyWithdrawInfoReified<T extends PhantomTypeArgument> = Reified<
  StrategyWithdrawInfo<T>,
  StrategyWithdrawInfoFields<T>
>

export class StrategyWithdrawInfo<T extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::vault::StrategyWithdrawInfo`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = StrategyWithdrawInfo.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::vault::StrategyWithdrawInfo<${PhantomToTypeStr<T>}>`
  readonly $typeArgs: [PhantomToTypeStr<T>]
  readonly $isPhantom = StrategyWithdrawInfo.$isPhantom

  readonly toWithdraw: ToField<'u64'>
  readonly withdrawnBalance: ToField<Balance<T>>
  readonly hasWithdrawn: ToField<'bool'>

  private constructor(typeArgs: [PhantomToTypeStr<T>], fields: StrategyWithdrawInfoFields<T>) {
    this.$fullTypeName = composeSuiType(
      StrategyWithdrawInfo.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::vault::StrategyWithdrawInfo<${PhantomToTypeStr<T>}>`
    this.$typeArgs = typeArgs

    this.toWithdraw = fields.toWithdraw
    this.withdrawnBalance = fields.withdrawnBalance
    this.hasWithdrawn = fields.hasWithdrawn
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): StrategyWithdrawInfoReified<ToPhantomTypeArgument<T>> {
    return {
      typeName: StrategyWithdrawInfo.$typeName,
      fullTypeName: composeSuiType(
        StrategyWithdrawInfo.$typeName,
        ...[extractType(T)]
      ) as `${typeof PKG_V1}::vault::StrategyWithdrawInfo<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`,
      typeArgs: [extractType(T)] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>],
      isPhantom: StrategyWithdrawInfo.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) => StrategyWithdrawInfo.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        StrategyWithdrawInfo.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => StrategyWithdrawInfo.fromBcs(T, data),
      bcs: StrategyWithdrawInfo.bcs,
      fromJSONField: (field: any) => StrategyWithdrawInfo.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => StrategyWithdrawInfo.fromJSON(T, json),
      fromSuiParsedData: (content: SuiParsedData) =>
        StrategyWithdrawInfo.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) =>
        StrategyWithdrawInfo.fromSuiObjectData(T, content),
      fetch: async (client: SuiClient, id: string) => StrategyWithdrawInfo.fetch(client, T, id),
      new: (fields: StrategyWithdrawInfoFields<ToPhantomTypeArgument<T>>) => {
        return new StrategyWithdrawInfo([extractType(T)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return StrategyWithdrawInfo.reified
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): PhantomReified<ToTypeStr<StrategyWithdrawInfo<ToPhantomTypeArgument<T>>>> {
    return phantom(StrategyWithdrawInfo.reified(T))
  }
  static get p() {
    return StrategyWithdrawInfo.phantom
  }

  static get bcs() {
    return bcs.struct('StrategyWithdrawInfo', {
      to_withdraw: bcs.u64(),
      withdrawn_balance: Balance.bcs,
      has_withdrawn: bcs.bool(),
    })
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>
  ): StrategyWithdrawInfo<ToPhantomTypeArgument<T>> {
    return StrategyWithdrawInfo.reified(typeArg).new({
      toWithdraw: decodeFromFields('u64', fields.to_withdraw),
      withdrawnBalance: decodeFromFields(Balance.reified(typeArg), fields.withdrawn_balance),
      hasWithdrawn: decodeFromFields('bool', fields.has_withdrawn),
    })
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes
  ): StrategyWithdrawInfo<ToPhantomTypeArgument<T>> {
    if (!isStrategyWithdrawInfo(item.type)) {
      throw new Error('not a StrategyWithdrawInfo type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return StrategyWithdrawInfo.reified(typeArg).new({
      toWithdraw: decodeFromFieldsWithTypes('u64', item.fields.to_withdraw),
      withdrawnBalance: decodeFromFieldsWithTypes(
        Balance.reified(typeArg),
        item.fields.withdrawn_balance
      ),
      hasWithdrawn: decodeFromFieldsWithTypes('bool', item.fields.has_withdrawn),
    })
  }

  static fromBcs<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: Uint8Array
  ): StrategyWithdrawInfo<ToPhantomTypeArgument<T>> {
    return StrategyWithdrawInfo.fromFields(typeArg, StrategyWithdrawInfo.bcs.parse(data))
  }

  toJSONField() {
    return {
      toWithdraw: this.toWithdraw.toString(),
      withdrawnBalance: this.withdrawnBalance.toJSONField(),
      hasWithdrawn: this.hasWithdrawn,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any
  ): StrategyWithdrawInfo<ToPhantomTypeArgument<T>> {
    return StrategyWithdrawInfo.reified(typeArg).new({
      toWithdraw: decodeFromJSONField('u64', field.toWithdraw),
      withdrawnBalance: decodeFromJSONField(Balance.reified(typeArg), field.withdrawnBalance),
      hasWithdrawn: decodeFromJSONField('bool', field.hasWithdrawn),
    })
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>
  ): StrategyWithdrawInfo<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== StrategyWithdrawInfo.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(StrategyWithdrawInfo.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return StrategyWithdrawInfo.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData
  ): StrategyWithdrawInfo<ToPhantomTypeArgument<T>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isStrategyWithdrawInfo(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a StrategyWithdrawInfo object`
      )
    }
    return StrategyWithdrawInfo.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData
  ): StrategyWithdrawInfo<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isStrategyWithdrawInfo(data.bcs.type)) {
        throw new Error(`object at is not a StrategyWithdrawInfo object`)
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

      return StrategyWithdrawInfo.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return StrategyWithdrawInfo.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T,
    id: string
  ): Promise<StrategyWithdrawInfo<ToPhantomTypeArgument<T>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching StrategyWithdrawInfo object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isStrategyWithdrawInfo(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a StrategyWithdrawInfo object`)
    }

    return StrategyWithdrawInfo.fromSuiObjectData(typeArg, res.data)
  }
}

/* ============================== Vault =============================== */

export function isVault(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::vault::Vault` + '<')
}

export interface VaultFields<T extends PhantomTypeArgument, YT extends PhantomTypeArgument> {
  id: ToField<UID>
  freeBalance: ToField<Balance<T>>
  timeLockedProfit: ToField<TimeLockedBalance<T>>
  lpTreasury: ToField<TreasuryCap<YT>>
  strategies: ToField<VecMap<ID, StrategyState>>
  performanceFeeBalance: ToField<Balance<YT>>
  strategyWithdrawPriorityOrder: ToField<Vector<ID>>
  withdrawTicketIssued: ToField<'bool'>
  tvlCap: ToField<Option<'u64'>>
  profitUnlockDurationSec: ToField<'u64'>
  performanceFeeBps: ToField<'u64'>
  version: ToField<'u64'>
}

export type VaultReified<T extends PhantomTypeArgument, YT extends PhantomTypeArgument> = Reified<
  Vault<T, YT>,
  VaultFields<T, YT>
>

export class Vault<T extends PhantomTypeArgument, YT extends PhantomTypeArgument>
  implements StructClass
{
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::vault::Vault`
  static readonly $numTypeParams = 2
  static readonly $isPhantom = [true, true] as const

  readonly $typeName = Vault.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::vault::Vault<${PhantomToTypeStr<T>}, ${PhantomToTypeStr<YT>}>`
  readonly $typeArgs: [PhantomToTypeStr<T>, PhantomToTypeStr<YT>]
  readonly $isPhantom = Vault.$isPhantom

  readonly id: ToField<UID>
  readonly freeBalance: ToField<Balance<T>>
  readonly timeLockedProfit: ToField<TimeLockedBalance<T>>
  readonly lpTreasury: ToField<TreasuryCap<YT>>
  readonly strategies: ToField<VecMap<ID, StrategyState>>
  readonly performanceFeeBalance: ToField<Balance<YT>>
  readonly strategyWithdrawPriorityOrder: ToField<Vector<ID>>
  readonly withdrawTicketIssued: ToField<'bool'>
  readonly tvlCap: ToField<Option<'u64'>>
  readonly profitUnlockDurationSec: ToField<'u64'>
  readonly performanceFeeBps: ToField<'u64'>
  readonly version: ToField<'u64'>

  private constructor(
    typeArgs: [PhantomToTypeStr<T>, PhantomToTypeStr<YT>],
    fields: VaultFields<T, YT>
  ) {
    this.$fullTypeName = composeSuiType(
      Vault.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::vault::Vault<${PhantomToTypeStr<T>}, ${PhantomToTypeStr<YT>}>`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.freeBalance = fields.freeBalance
    this.timeLockedProfit = fields.timeLockedProfit
    this.lpTreasury = fields.lpTreasury
    this.strategies = fields.strategies
    this.performanceFeeBalance = fields.performanceFeeBalance
    this.strategyWithdrawPriorityOrder = fields.strategyWithdrawPriorityOrder
    this.withdrawTicketIssued = fields.withdrawTicketIssued
    this.tvlCap = fields.tvlCap
    this.profitUnlockDurationSec = fields.profitUnlockDurationSec
    this.performanceFeeBps = fields.performanceFeeBps
    this.version = fields.version
  }

  static reified<
    T extends PhantomReified<PhantomTypeArgument>,
    YT extends PhantomReified<PhantomTypeArgument>,
  >(T: T, YT: YT): VaultReified<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<YT>> {
    return {
      typeName: Vault.$typeName,
      fullTypeName: composeSuiType(
        Vault.$typeName,
        ...[extractType(T), extractType(YT)]
      ) as `${typeof PKG_V1}::vault::Vault<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}, ${PhantomToTypeStr<ToPhantomTypeArgument<YT>>}>`,
      typeArgs: [extractType(T), extractType(YT)] as [
        PhantomToTypeStr<ToPhantomTypeArgument<T>>,
        PhantomToTypeStr<ToPhantomTypeArgument<YT>>,
      ],
      isPhantom: Vault.$isPhantom,
      reifiedTypeArgs: [T, YT],
      fromFields: (fields: Record<string, any>) => Vault.fromFields([T, YT], fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Vault.fromFieldsWithTypes([T, YT], item),
      fromBcs: (data: Uint8Array) => Vault.fromBcs([T, YT], data),
      bcs: Vault.bcs,
      fromJSONField: (field: any) => Vault.fromJSONField([T, YT], field),
      fromJSON: (json: Record<string, any>) => Vault.fromJSON([T, YT], json),
      fromSuiParsedData: (content: SuiParsedData) => Vault.fromSuiParsedData([T, YT], content),
      fromSuiObjectData: (content: SuiObjectData) => Vault.fromSuiObjectData([T, YT], content),
      fetch: async (client: SuiClient, id: string) => Vault.fetch(client, [T, YT], id),
      new: (fields: VaultFields<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<YT>>) => {
        return new Vault([extractType(T), extractType(YT)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return Vault.reified
  }

  static phantom<
    T extends PhantomReified<PhantomTypeArgument>,
    YT extends PhantomReified<PhantomTypeArgument>,
  >(
    T: T,
    YT: YT
  ): PhantomReified<ToTypeStr<Vault<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<YT>>>> {
    return phantom(Vault.reified(T, YT))
  }
  static get p() {
    return Vault.phantom
  }

  static get bcs() {
    return bcs.struct('Vault', {
      id: UID.bcs,
      free_balance: Balance.bcs,
      time_locked_profit: TimeLockedBalance.bcs,
      lp_treasury: TreasuryCap.bcs,
      strategies: VecMap.bcs(ID.bcs, StrategyState.bcs),
      performance_fee_balance: Balance.bcs,
      strategy_withdraw_priority_order: bcs.vector(ID.bcs),
      withdraw_ticket_issued: bcs.bool(),
      tvl_cap: Option.bcs(bcs.u64()),
      profit_unlock_duration_sec: bcs.u64(),
      performance_fee_bps: bcs.u64(),
      version: bcs.u64(),
    })
  }

  static fromFields<
    T extends PhantomReified<PhantomTypeArgument>,
    YT extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, YT],
    fields: Record<string, any>
  ): Vault<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<YT>> {
    return Vault.reified(typeArgs[0], typeArgs[1]).new({
      id: decodeFromFields(UID.reified(), fields.id),
      freeBalance: decodeFromFields(Balance.reified(typeArgs[0]), fields.free_balance),
      timeLockedProfit: decodeFromFields(
        TimeLockedBalance.reified(typeArgs[0]),
        fields.time_locked_profit
      ),
      lpTreasury: decodeFromFields(TreasuryCap.reified(typeArgs[1]), fields.lp_treasury),
      strategies: decodeFromFields(
        VecMap.reified(ID.reified(), StrategyState.reified()),
        fields.strategies
      ),
      performanceFeeBalance: decodeFromFields(
        Balance.reified(typeArgs[1]),
        fields.performance_fee_balance
      ),
      strategyWithdrawPriorityOrder: decodeFromFields(
        reified.vector(ID.reified()),
        fields.strategy_withdraw_priority_order
      ),
      withdrawTicketIssued: decodeFromFields('bool', fields.withdraw_ticket_issued),
      tvlCap: decodeFromFields(Option.reified('u64'), fields.tvl_cap),
      profitUnlockDurationSec: decodeFromFields('u64', fields.profit_unlock_duration_sec),
      performanceFeeBps: decodeFromFields('u64', fields.performance_fee_bps),
      version: decodeFromFields('u64', fields.version),
    })
  }

  static fromFieldsWithTypes<
    T extends PhantomReified<PhantomTypeArgument>,
    YT extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, YT],
    item: FieldsWithTypes
  ): Vault<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<YT>> {
    if (!isVault(item.type)) {
      throw new Error('not a Vault type')
    }
    assertFieldsWithTypesArgsMatch(item, typeArgs)

    return Vault.reified(typeArgs[0], typeArgs[1]).new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      freeBalance: decodeFromFieldsWithTypes(
        Balance.reified(typeArgs[0]),
        item.fields.free_balance
      ),
      timeLockedProfit: decodeFromFieldsWithTypes(
        TimeLockedBalance.reified(typeArgs[0]),
        item.fields.time_locked_profit
      ),
      lpTreasury: decodeFromFieldsWithTypes(
        TreasuryCap.reified(typeArgs[1]),
        item.fields.lp_treasury
      ),
      strategies: decodeFromFieldsWithTypes(
        VecMap.reified(ID.reified(), StrategyState.reified()),
        item.fields.strategies
      ),
      performanceFeeBalance: decodeFromFieldsWithTypes(
        Balance.reified(typeArgs[1]),
        item.fields.performance_fee_balance
      ),
      strategyWithdrawPriorityOrder: decodeFromFieldsWithTypes(
        reified.vector(ID.reified()),
        item.fields.strategy_withdraw_priority_order
      ),
      withdrawTicketIssued: decodeFromFieldsWithTypes('bool', item.fields.withdraw_ticket_issued),
      tvlCap: decodeFromFieldsWithTypes(Option.reified('u64'), item.fields.tvl_cap),
      profitUnlockDurationSec: decodeFromFieldsWithTypes(
        'u64',
        item.fields.profit_unlock_duration_sec
      ),
      performanceFeeBps: decodeFromFieldsWithTypes('u64', item.fields.performance_fee_bps),
      version: decodeFromFieldsWithTypes('u64', item.fields.version),
    })
  }

  static fromBcs<
    T extends PhantomReified<PhantomTypeArgument>,
    YT extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, YT],
    data: Uint8Array
  ): Vault<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<YT>> {
    return Vault.fromFields(typeArgs, Vault.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      freeBalance: this.freeBalance.toJSONField(),
      timeLockedProfit: this.timeLockedProfit.toJSONField(),
      lpTreasury: this.lpTreasury.toJSONField(),
      strategies: this.strategies.toJSONField(),
      performanceFeeBalance: this.performanceFeeBalance.toJSONField(),
      strategyWithdrawPriorityOrder: fieldToJSON<Vector<ID>>(
        `vector<${ID.$typeName}>`,
        this.strategyWithdrawPriorityOrder
      ),
      withdrawTicketIssued: this.withdrawTicketIssued,
      tvlCap: fieldToJSON<Option<'u64'>>(`${Option.$typeName}<u64>`, this.tvlCap),
      profitUnlockDurationSec: this.profitUnlockDurationSec.toString(),
      performanceFeeBps: this.performanceFeeBps.toString(),
      version: this.version.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<
    T extends PhantomReified<PhantomTypeArgument>,
    YT extends PhantomReified<PhantomTypeArgument>,
  >(typeArgs: [T, YT], field: any): Vault<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<YT>> {
    return Vault.reified(typeArgs[0], typeArgs[1]).new({
      id: decodeFromJSONField(UID.reified(), field.id),
      freeBalance: decodeFromJSONField(Balance.reified(typeArgs[0]), field.freeBalance),
      timeLockedProfit: decodeFromJSONField(
        TimeLockedBalance.reified(typeArgs[0]),
        field.timeLockedProfit
      ),
      lpTreasury: decodeFromJSONField(TreasuryCap.reified(typeArgs[1]), field.lpTreasury),
      strategies: decodeFromJSONField(
        VecMap.reified(ID.reified(), StrategyState.reified()),
        field.strategies
      ),
      performanceFeeBalance: decodeFromJSONField(
        Balance.reified(typeArgs[1]),
        field.performanceFeeBalance
      ),
      strategyWithdrawPriorityOrder: decodeFromJSONField(
        reified.vector(ID.reified()),
        field.strategyWithdrawPriorityOrder
      ),
      withdrawTicketIssued: decodeFromJSONField('bool', field.withdrawTicketIssued),
      tvlCap: decodeFromJSONField(Option.reified('u64'), field.tvlCap),
      profitUnlockDurationSec: decodeFromJSONField('u64', field.profitUnlockDurationSec),
      performanceFeeBps: decodeFromJSONField('u64', field.performanceFeeBps),
      version: decodeFromJSONField('u64', field.version),
    })
  }

  static fromJSON<
    T extends PhantomReified<PhantomTypeArgument>,
    YT extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, YT],
    json: Record<string, any>
  ): Vault<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<YT>> {
    if (json.$typeName !== Vault.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(Vault.$typeName, ...typeArgs.map(extractType)),
      json.$typeArgs,
      typeArgs
    )

    return Vault.fromJSONField(typeArgs, json)
  }

  static fromSuiParsedData<
    T extends PhantomReified<PhantomTypeArgument>,
    YT extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, YT],
    content: SuiParsedData
  ): Vault<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<YT>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isVault(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Vault object`)
    }
    return Vault.fromFieldsWithTypes(typeArgs, content)
  }

  static fromSuiObjectData<
    T extends PhantomReified<PhantomTypeArgument>,
    YT extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, YT],
    data: SuiObjectData
  ): Vault<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<YT>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isVault(data.bcs.type)) {
        throw new Error(`object at is not a Vault object`)
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

      return Vault.fromBcs(typeArgs, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Vault.fromSuiParsedData(typeArgs, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<
    T extends PhantomReified<PhantomTypeArgument>,
    YT extends PhantomReified<PhantomTypeArgument>,
  >(
    client: SuiClient,
    typeArgs: [T, YT],
    id: string
  ): Promise<Vault<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<YT>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching Vault object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isVault(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Vault object`)
    }

    return Vault.fromSuiObjectData(typeArgs, res.data)
  }
}

/* ============================== VaultAccess =============================== */

export function isVaultAccess(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::vault::VaultAccess`
}

export interface VaultAccessFields {
  id: ToField<UID>
}

export type VaultAccessReified = Reified<VaultAccess, VaultAccessFields>

export class VaultAccess implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::vault::VaultAccess`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = VaultAccess.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::vault::VaultAccess`
  readonly $typeArgs: []
  readonly $isPhantom = VaultAccess.$isPhantom

  readonly id: ToField<UID>

  private constructor(typeArgs: [], fields: VaultAccessFields) {
    this.$fullTypeName = composeSuiType(
      VaultAccess.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::vault::VaultAccess`
    this.$typeArgs = typeArgs

    this.id = fields.id
  }

  static reified(): VaultAccessReified {
    return {
      typeName: VaultAccess.$typeName,
      fullTypeName: composeSuiType(
        VaultAccess.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::vault::VaultAccess`,
      typeArgs: [] as [],
      isPhantom: VaultAccess.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => VaultAccess.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => VaultAccess.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => VaultAccess.fromBcs(data),
      bcs: VaultAccess.bcs,
      fromJSONField: (field: any) => VaultAccess.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => VaultAccess.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => VaultAccess.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => VaultAccess.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => VaultAccess.fetch(client, id),
      new: (fields: VaultAccessFields) => {
        return new VaultAccess([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return VaultAccess.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<VaultAccess>> {
    return phantom(VaultAccess.reified())
  }
  static get p() {
    return VaultAccess.phantom()
  }

  static get bcs() {
    return bcs.struct('VaultAccess', {
      id: UID.bcs,
    })
  }

  static fromFields(fields: Record<string, any>): VaultAccess {
    return VaultAccess.reified().new({ id: decodeFromFields(UID.reified(), fields.id) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): VaultAccess {
    if (!isVaultAccess(item.type)) {
      throw new Error('not a VaultAccess type')
    }

    return VaultAccess.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
    })
  }

  static fromBcs(data: Uint8Array): VaultAccess {
    return VaultAccess.fromFields(VaultAccess.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): VaultAccess {
    return VaultAccess.reified().new({ id: decodeFromJSONField(UID.reified(), field.id) })
  }

  static fromJSON(json: Record<string, any>): VaultAccess {
    if (json.$typeName !== VaultAccess.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return VaultAccess.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): VaultAccess {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isVaultAccess(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a VaultAccess object`)
    }
    return VaultAccess.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): VaultAccess {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isVaultAccess(data.bcs.type)) {
        throw new Error(`object at is not a VaultAccess object`)
      }

      return VaultAccess.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return VaultAccess.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<VaultAccess> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching VaultAccess object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isVaultAccess(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a VaultAccess object`)
    }

    return VaultAccess.fromSuiObjectData(res.data)
  }
}

/* ============================== WithdrawEvent =============================== */

export function isWithdrawEvent(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V4}::vault::WithdrawEvent` + '<')
}

export interface WithdrawEventFields<YT extends PhantomTypeArgument> {
  amount: ToField<'u64'>
  lpBurned: ToField<'u64'>
}

export type WithdrawEventReified<YT extends PhantomTypeArgument> = Reified<
  WithdrawEvent<YT>,
  WithdrawEventFields<YT>
>

export class WithdrawEvent<YT extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V4}::vault::WithdrawEvent`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = WithdrawEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V4}::vault::WithdrawEvent<${PhantomToTypeStr<YT>}>`
  readonly $typeArgs: [PhantomToTypeStr<YT>]
  readonly $isPhantom = WithdrawEvent.$isPhantom

  readonly amount: ToField<'u64'>
  readonly lpBurned: ToField<'u64'>

  private constructor(typeArgs: [PhantomToTypeStr<YT>], fields: WithdrawEventFields<YT>) {
    this.$fullTypeName = composeSuiType(
      WithdrawEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V4}::vault::WithdrawEvent<${PhantomToTypeStr<YT>}>`
    this.$typeArgs = typeArgs

    this.amount = fields.amount
    this.lpBurned = fields.lpBurned
  }

  static reified<YT extends PhantomReified<PhantomTypeArgument>>(
    YT: YT
  ): WithdrawEventReified<ToPhantomTypeArgument<YT>> {
    return {
      typeName: WithdrawEvent.$typeName,
      fullTypeName: composeSuiType(
        WithdrawEvent.$typeName,
        ...[extractType(YT)]
      ) as `${typeof PKG_V4}::vault::WithdrawEvent<${PhantomToTypeStr<ToPhantomTypeArgument<YT>>}>`,
      typeArgs: [extractType(YT)] as [PhantomToTypeStr<ToPhantomTypeArgument<YT>>],
      isPhantom: WithdrawEvent.$isPhantom,
      reifiedTypeArgs: [YT],
      fromFields: (fields: Record<string, any>) => WithdrawEvent.fromFields(YT, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => WithdrawEvent.fromFieldsWithTypes(YT, item),
      fromBcs: (data: Uint8Array) => WithdrawEvent.fromBcs(YT, data),
      bcs: WithdrawEvent.bcs,
      fromJSONField: (field: any) => WithdrawEvent.fromJSONField(YT, field),
      fromJSON: (json: Record<string, any>) => WithdrawEvent.fromJSON(YT, json),
      fromSuiParsedData: (content: SuiParsedData) => WithdrawEvent.fromSuiParsedData(YT, content),
      fromSuiObjectData: (content: SuiObjectData) => WithdrawEvent.fromSuiObjectData(YT, content),
      fetch: async (client: SuiClient, id: string) => WithdrawEvent.fetch(client, YT, id),
      new: (fields: WithdrawEventFields<ToPhantomTypeArgument<YT>>) => {
        return new WithdrawEvent([extractType(YT)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return WithdrawEvent.reified
  }

  static phantom<YT extends PhantomReified<PhantomTypeArgument>>(
    YT: YT
  ): PhantomReified<ToTypeStr<WithdrawEvent<ToPhantomTypeArgument<YT>>>> {
    return phantom(WithdrawEvent.reified(YT))
  }
  static get p() {
    return WithdrawEvent.phantom
  }

  static get bcs() {
    return bcs.struct('WithdrawEvent', {
      amount: bcs.u64(),
      lp_burned: bcs.u64(),
    })
  }

  static fromFields<YT extends PhantomReified<PhantomTypeArgument>>(
    typeArg: YT,
    fields: Record<string, any>
  ): WithdrawEvent<ToPhantomTypeArgument<YT>> {
    return WithdrawEvent.reified(typeArg).new({
      amount: decodeFromFields('u64', fields.amount),
      lpBurned: decodeFromFields('u64', fields.lp_burned),
    })
  }

  static fromFieldsWithTypes<YT extends PhantomReified<PhantomTypeArgument>>(
    typeArg: YT,
    item: FieldsWithTypes
  ): WithdrawEvent<ToPhantomTypeArgument<YT>> {
    if (!isWithdrawEvent(item.type)) {
      throw new Error('not a WithdrawEvent type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return WithdrawEvent.reified(typeArg).new({
      amount: decodeFromFieldsWithTypes('u64', item.fields.amount),
      lpBurned: decodeFromFieldsWithTypes('u64', item.fields.lp_burned),
    })
  }

  static fromBcs<YT extends PhantomReified<PhantomTypeArgument>>(
    typeArg: YT,
    data: Uint8Array
  ): WithdrawEvent<ToPhantomTypeArgument<YT>> {
    return WithdrawEvent.fromFields(typeArg, WithdrawEvent.bcs.parse(data))
  }

  toJSONField() {
    return {
      amount: this.amount.toString(),
      lpBurned: this.lpBurned.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<YT extends PhantomReified<PhantomTypeArgument>>(
    typeArg: YT,
    field: any
  ): WithdrawEvent<ToPhantomTypeArgument<YT>> {
    return WithdrawEvent.reified(typeArg).new({
      amount: decodeFromJSONField('u64', field.amount),
      lpBurned: decodeFromJSONField('u64', field.lpBurned),
    })
  }

  static fromJSON<YT extends PhantomReified<PhantomTypeArgument>>(
    typeArg: YT,
    json: Record<string, any>
  ): WithdrawEvent<ToPhantomTypeArgument<YT>> {
    if (json.$typeName !== WithdrawEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(WithdrawEvent.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return WithdrawEvent.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<YT extends PhantomReified<PhantomTypeArgument>>(
    typeArg: YT,
    content: SuiParsedData
  ): WithdrawEvent<ToPhantomTypeArgument<YT>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isWithdrawEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a WithdrawEvent object`)
    }
    return WithdrawEvent.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<YT extends PhantomReified<PhantomTypeArgument>>(
    typeArg: YT,
    data: SuiObjectData
  ): WithdrawEvent<ToPhantomTypeArgument<YT>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isWithdrawEvent(data.bcs.type)) {
        throw new Error(`object at is not a WithdrawEvent object`)
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

      return WithdrawEvent.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return WithdrawEvent.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<YT extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: YT,
    id: string
  ): Promise<WithdrawEvent<ToPhantomTypeArgument<YT>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching WithdrawEvent object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isWithdrawEvent(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a WithdrawEvent object`)
    }

    return WithdrawEvent.fromSuiObjectData(typeArg, res.data)
  }
}

/* ============================== WithdrawTicket =============================== */

export function isWithdrawTicket(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::vault::WithdrawTicket` + '<')
}

export interface WithdrawTicketFields<
  T extends PhantomTypeArgument,
  YT extends PhantomTypeArgument,
> {
  toWithdrawFromFreeBalance: ToField<'u64'>
  strategyInfos: ToField<VecMap<ID, StrategyWithdrawInfo<T>>>
  lpToBurn: ToField<Balance<YT>>
}

export type WithdrawTicketReified<
  T extends PhantomTypeArgument,
  YT extends PhantomTypeArgument,
> = Reified<WithdrawTicket<T, YT>, WithdrawTicketFields<T, YT>>

export class WithdrawTicket<T extends PhantomTypeArgument, YT extends PhantomTypeArgument>
  implements StructClass
{
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::vault::WithdrawTicket`
  static readonly $numTypeParams = 2
  static readonly $isPhantom = [true, true] as const

  readonly $typeName = WithdrawTicket.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::vault::WithdrawTicket<${PhantomToTypeStr<T>}, ${PhantomToTypeStr<YT>}>`
  readonly $typeArgs: [PhantomToTypeStr<T>, PhantomToTypeStr<YT>]
  readonly $isPhantom = WithdrawTicket.$isPhantom

  readonly toWithdrawFromFreeBalance: ToField<'u64'>
  readonly strategyInfos: ToField<VecMap<ID, StrategyWithdrawInfo<T>>>
  readonly lpToBurn: ToField<Balance<YT>>

  private constructor(
    typeArgs: [PhantomToTypeStr<T>, PhantomToTypeStr<YT>],
    fields: WithdrawTicketFields<T, YT>
  ) {
    this.$fullTypeName = composeSuiType(
      WithdrawTicket.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::vault::WithdrawTicket<${PhantomToTypeStr<T>}, ${PhantomToTypeStr<YT>}>`
    this.$typeArgs = typeArgs

    this.toWithdrawFromFreeBalance = fields.toWithdrawFromFreeBalance
    this.strategyInfos = fields.strategyInfos
    this.lpToBurn = fields.lpToBurn
  }

  static reified<
    T extends PhantomReified<PhantomTypeArgument>,
    YT extends PhantomReified<PhantomTypeArgument>,
  >(T: T, YT: YT): WithdrawTicketReified<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<YT>> {
    return {
      typeName: WithdrawTicket.$typeName,
      fullTypeName: composeSuiType(
        WithdrawTicket.$typeName,
        ...[extractType(T), extractType(YT)]
      ) as `${typeof PKG_V1}::vault::WithdrawTicket<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}, ${PhantomToTypeStr<ToPhantomTypeArgument<YT>>}>`,
      typeArgs: [extractType(T), extractType(YT)] as [
        PhantomToTypeStr<ToPhantomTypeArgument<T>>,
        PhantomToTypeStr<ToPhantomTypeArgument<YT>>,
      ],
      isPhantom: WithdrawTicket.$isPhantom,
      reifiedTypeArgs: [T, YT],
      fromFields: (fields: Record<string, any>) => WithdrawTicket.fromFields([T, YT], fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        WithdrawTicket.fromFieldsWithTypes([T, YT], item),
      fromBcs: (data: Uint8Array) => WithdrawTicket.fromBcs([T, YT], data),
      bcs: WithdrawTicket.bcs,
      fromJSONField: (field: any) => WithdrawTicket.fromJSONField([T, YT], field),
      fromJSON: (json: Record<string, any>) => WithdrawTicket.fromJSON([T, YT], json),
      fromSuiParsedData: (content: SuiParsedData) =>
        WithdrawTicket.fromSuiParsedData([T, YT], content),
      fromSuiObjectData: (content: SuiObjectData) =>
        WithdrawTicket.fromSuiObjectData([T, YT], content),
      fetch: async (client: SuiClient, id: string) => WithdrawTicket.fetch(client, [T, YT], id),
      new: (fields: WithdrawTicketFields<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<YT>>) => {
        return new WithdrawTicket([extractType(T), extractType(YT)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return WithdrawTicket.reified
  }

  static phantom<
    T extends PhantomReified<PhantomTypeArgument>,
    YT extends PhantomReified<PhantomTypeArgument>,
  >(
    T: T,
    YT: YT
  ): PhantomReified<
    ToTypeStr<WithdrawTicket<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<YT>>>
  > {
    return phantom(WithdrawTicket.reified(T, YT))
  }
  static get p() {
    return WithdrawTicket.phantom
  }

  static get bcs() {
    return bcs.struct('WithdrawTicket', {
      to_withdraw_from_free_balance: bcs.u64(),
      strategy_infos: VecMap.bcs(ID.bcs, StrategyWithdrawInfo.bcs),
      lp_to_burn: Balance.bcs,
    })
  }

  static fromFields<
    T extends PhantomReified<PhantomTypeArgument>,
    YT extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, YT],
    fields: Record<string, any>
  ): WithdrawTicket<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<YT>> {
    return WithdrawTicket.reified(typeArgs[0], typeArgs[1]).new({
      toWithdrawFromFreeBalance: decodeFromFields('u64', fields.to_withdraw_from_free_balance),
      strategyInfos: decodeFromFields(
        VecMap.reified(ID.reified(), StrategyWithdrawInfo.reified(typeArgs[0])),
        fields.strategy_infos
      ),
      lpToBurn: decodeFromFields(Balance.reified(typeArgs[1]), fields.lp_to_burn),
    })
  }

  static fromFieldsWithTypes<
    T extends PhantomReified<PhantomTypeArgument>,
    YT extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, YT],
    item: FieldsWithTypes
  ): WithdrawTicket<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<YT>> {
    if (!isWithdrawTicket(item.type)) {
      throw new Error('not a WithdrawTicket type')
    }
    assertFieldsWithTypesArgsMatch(item, typeArgs)

    return WithdrawTicket.reified(typeArgs[0], typeArgs[1]).new({
      toWithdrawFromFreeBalance: decodeFromFieldsWithTypes(
        'u64',
        item.fields.to_withdraw_from_free_balance
      ),
      strategyInfos: decodeFromFieldsWithTypes(
        VecMap.reified(ID.reified(), StrategyWithdrawInfo.reified(typeArgs[0])),
        item.fields.strategy_infos
      ),
      lpToBurn: decodeFromFieldsWithTypes(Balance.reified(typeArgs[1]), item.fields.lp_to_burn),
    })
  }

  static fromBcs<
    T extends PhantomReified<PhantomTypeArgument>,
    YT extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, YT],
    data: Uint8Array
  ): WithdrawTicket<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<YT>> {
    return WithdrawTicket.fromFields(typeArgs, WithdrawTicket.bcs.parse(data))
  }

  toJSONField() {
    return {
      toWithdrawFromFreeBalance: this.toWithdrawFromFreeBalance.toString(),
      strategyInfos: this.strategyInfos.toJSONField(),
      lpToBurn: this.lpToBurn.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<
    T extends PhantomReified<PhantomTypeArgument>,
    YT extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, YT],
    field: any
  ): WithdrawTicket<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<YT>> {
    return WithdrawTicket.reified(typeArgs[0], typeArgs[1]).new({
      toWithdrawFromFreeBalance: decodeFromJSONField('u64', field.toWithdrawFromFreeBalance),
      strategyInfos: decodeFromJSONField(
        VecMap.reified(ID.reified(), StrategyWithdrawInfo.reified(typeArgs[0])),
        field.strategyInfos
      ),
      lpToBurn: decodeFromJSONField(Balance.reified(typeArgs[1]), field.lpToBurn),
    })
  }

  static fromJSON<
    T extends PhantomReified<PhantomTypeArgument>,
    YT extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, YT],
    json: Record<string, any>
  ): WithdrawTicket<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<YT>> {
    if (json.$typeName !== WithdrawTicket.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(WithdrawTicket.$typeName, ...typeArgs.map(extractType)),
      json.$typeArgs,
      typeArgs
    )

    return WithdrawTicket.fromJSONField(typeArgs, json)
  }

  static fromSuiParsedData<
    T extends PhantomReified<PhantomTypeArgument>,
    YT extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, YT],
    content: SuiParsedData
  ): WithdrawTicket<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<YT>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isWithdrawTicket(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a WithdrawTicket object`)
    }
    return WithdrawTicket.fromFieldsWithTypes(typeArgs, content)
  }

  static fromSuiObjectData<
    T extends PhantomReified<PhantomTypeArgument>,
    YT extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, YT],
    data: SuiObjectData
  ): WithdrawTicket<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<YT>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isWithdrawTicket(data.bcs.type)) {
        throw new Error(`object at is not a WithdrawTicket object`)
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

      return WithdrawTicket.fromBcs(typeArgs, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return WithdrawTicket.fromSuiParsedData(typeArgs, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<
    T extends PhantomReified<PhantomTypeArgument>,
    YT extends PhantomReified<PhantomTypeArgument>,
  >(
    client: SuiClient,
    typeArgs: [T, YT],
    id: string
  ): Promise<WithdrawTicket<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<YT>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching WithdrawTicket object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isWithdrawTicket(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a WithdrawTicket object`)
    }

    return WithdrawTicket.fromSuiObjectData(typeArgs, res.data)
  }
}
