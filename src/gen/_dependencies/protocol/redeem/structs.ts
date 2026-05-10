/**
 * @title Module for hanlding withdraw base asset request from user
 * @author Scallop Labs
 * @notice User use sCoin to redeem the underlying asset
 */

import { bcs } from '@mysten/sui/bcs'
import { SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromBase64, fromHex, toHex } from '@mysten/sui/utils'
import { getTypeOrigin } from '../../../_envs'
import {
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  phantom,
  PhantomReified,
  Reified,
  StructClass,
  ToField,
  ToJSON,
  ToTypeStr,
} from '../../../_framework/reified'
import {
  composeSuiType,
  compressSuiType,
  fetchObjectBcs,
  FieldsWithTypes,
  SupportedSuiClient,
} from '../../../_framework/util'
import { TypeName } from '../../../std/type-name/structs'

/* ============================== RedeemEvent =============================== */

export function isRedeemEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('protocol', 'redeem::RedeemEvent')}::redeem::RedeemEvent`
}

export interface RedeemEventFields {
  redeemer: ToField<'address'>
  withdrawAsset: ToField<TypeName>
  withdrawAmount: ToField<'u64'>
  burnAsset: ToField<TypeName>
  burnAmount: ToField<'u64'>
  time: ToField<'u64'>
}

export type RedeemEventReified = Reified<RedeemEvent, RedeemEventFields>

export type RedeemEventJSONField = {
  redeemer: string
  withdrawAsset: string
  withdrawAmount: string
  burnAsset: string
  burnAmount: string
  time: string
}

export type RedeemEventJSON = {
  $typeName: typeof RedeemEvent.$typeName
  $typeArgs: []
} & RedeemEventJSONField

export class RedeemEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::redeem::RedeemEvent` = `${
    getTypeOrigin('protocol', 'redeem::RedeemEvent')
  }::redeem::RedeemEvent` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof RedeemEvent.$typeName = RedeemEvent.$typeName
  readonly $fullTypeName: `${string}::redeem::RedeemEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof RedeemEvent.$isPhantom = RedeemEvent.$isPhantom

  readonly redeemer: ToField<'address'>
  readonly withdrawAsset: ToField<TypeName>
  readonly withdrawAmount: ToField<'u64'>
  readonly burnAsset: ToField<TypeName>
  readonly burnAmount: ToField<'u64'>
  readonly time: ToField<'u64'>

  private constructor(typeArgs: [], fields: RedeemEventFields) {
    this.$fullTypeName = composeSuiType(
      RedeemEvent.$typeName,
      ...typeArgs,
    ) as `${string}::redeem::RedeemEvent`
    this.$typeArgs = typeArgs

    this.redeemer = fields.redeemer
    this.withdrawAsset = fields.withdrawAsset
    this.withdrawAmount = fields.withdrawAmount
    this.burnAsset = fields.burnAsset
    this.burnAmount = fields.burnAmount
    this.time = fields.time
  }

  static reified(): RedeemEventReified {
    const reifiedBcs = RedeemEvent.bcs
    return {
      typeName: RedeemEvent.$typeName,
      fullTypeName: composeSuiType(
        RedeemEvent.$typeName,
        ...[],
      ) as `${string}::redeem::RedeemEvent`,
      typeArgs: [] as [],
      isPhantom: RedeemEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => RedeemEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => RedeemEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => RedeemEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => RedeemEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => RedeemEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => RedeemEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => RedeemEvent.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => RedeemEvent.fetch(client, id),
      new: (fields: RedeemEventFields) => {
        return new RedeemEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): RedeemEventReified {
    return RedeemEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RedeemEvent>> {
    return phantom(RedeemEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<RedeemEvent>> {
    return RedeemEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('RedeemEvent', {
      redeemer: bcs.bytes(32).transform({
        input: (val: string) => fromHex(val),
        output: (val: Uint8Array) => toHex(val),
      }),
      withdraw_asset: TypeName.bcs,
      withdraw_amount: bcs.u64(),
      burn_asset: TypeName.bcs,
      burn_amount: bcs.u64(),
      time: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof RedeemEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof RedeemEvent.instantiateBcs> {
    if (!RedeemEvent.cachedBcs) {
      RedeemEvent.cachedBcs = RedeemEvent.instantiateBcs()
    }
    return RedeemEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): RedeemEvent {
    return RedeemEvent.reified().new({
      redeemer: decodeFromFields('address', fields.redeemer),
      withdrawAsset: decodeFromFields(TypeName.reified(), fields.withdraw_asset),
      withdrawAmount: decodeFromFields('u64', fields.withdraw_amount),
      burnAsset: decodeFromFields(TypeName.reified(), fields.burn_asset),
      burnAmount: decodeFromFields('u64', fields.burn_amount),
      time: decodeFromFields('u64', fields.time),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): RedeemEvent {
    if (!isRedeemEvent(item.type)) {
      throw new Error('not a RedeemEvent type')
    }

    return RedeemEvent.reified().new({
      redeemer: decodeFromFieldsWithTypes('address', item.fields.redeemer),
      withdrawAsset: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.withdraw_asset),
      withdrawAmount: decodeFromFieldsWithTypes('u64', item.fields.withdraw_amount),
      burnAsset: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.burn_asset),
      burnAmount: decodeFromFieldsWithTypes('u64', item.fields.burn_amount),
      time: decodeFromFieldsWithTypes('u64', item.fields.time),
    })
  }

  static fromBcs(data: Uint8Array): RedeemEvent {
    return RedeemEvent.fromFields(RedeemEvent.bcs.parse(data))
  }

  toJSONField(): RedeemEventJSONField {
    return {
      redeemer: this.redeemer,
      withdrawAsset: this.withdrawAsset,
      withdrawAmount: this.withdrawAmount.toString(),
      burnAsset: this.burnAsset,
      burnAmount: this.burnAmount.toString(),
      time: this.time.toString(),
    }
  }

  toJSON(): RedeemEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): RedeemEvent {
    return RedeemEvent.reified().new({
      redeemer: decodeFromJSONField('address', field.redeemer),
      withdrawAsset: decodeFromJSONField(TypeName.reified(), field.withdrawAsset),
      withdrawAmount: decodeFromJSONField('u64', field.withdrawAmount),
      burnAsset: decodeFromJSONField(TypeName.reified(), field.burnAsset),
      burnAmount: decodeFromJSONField('u64', field.burnAmount),
      time: decodeFromJSONField('u64', field.time),
    })
  }

  static fromJSON(json: Record<string, any>): RedeemEvent {
    if (json.$typeName !== RedeemEvent.$typeName) {
      throw new Error(
        `not a RedeemEvent json object: expected '${RedeemEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return RedeemEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): RedeemEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRedeemEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a RedeemEvent object`)
    }
    return RedeemEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): RedeemEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRedeemEvent(data.bcs.type)) {
        throw new Error(`object at is not a RedeemEvent object`)
      }

      return RedeemEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RedeemEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<RedeemEvent> {
    const res = await fetchObjectBcs(client, id)
    if (!isRedeemEvent(res.type)) {
      throw new Error(`object at id ${id} is not a RedeemEvent object`)
    }

    return RedeemEvent.fromBcs(res.bcsBytes)
  }
}
