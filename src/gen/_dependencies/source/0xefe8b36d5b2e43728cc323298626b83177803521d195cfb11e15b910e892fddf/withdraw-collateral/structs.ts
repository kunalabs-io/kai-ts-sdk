import {
  PhantomReified,
  Reified,
  StructClass,
  ToField,
  ToTypeStr,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  phantom,
} from '../../../../_framework/reified'
import { FieldsWithTypes, composeSuiType, compressSuiType } from '../../../../_framework/util'
import { TypeName } from '../../../../move-stdlib/type-name/structs'
import { ID } from '../../../../sui/object/structs'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64, fromHEX, toHEX } from '@mysten/sui/utils'

/* ============================== CollateralWithdrawEvent =============================== */

export function isCollateralWithdrawEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::withdraw_collateral::CollateralWithdrawEvent`
}

export interface CollateralWithdrawEventFields {
  taker: ToField<'address'>
  obligation: ToField<ID>
  withdrawAsset: ToField<TypeName>
  withdrawAmount: ToField<'u64'>
}

export type CollateralWithdrawEventReified = Reified<
  CollateralWithdrawEvent,
  CollateralWithdrawEventFields
>

export class CollateralWithdrawEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::withdraw_collateral::CollateralWithdrawEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = CollateralWithdrawEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::withdraw_collateral::CollateralWithdrawEvent`
  readonly $typeArgs: []
  readonly $isPhantom = CollateralWithdrawEvent.$isPhantom

  readonly taker: ToField<'address'>
  readonly obligation: ToField<ID>
  readonly withdrawAsset: ToField<TypeName>
  readonly withdrawAmount: ToField<'u64'>

  private constructor(typeArgs: [], fields: CollateralWithdrawEventFields) {
    this.$fullTypeName = composeSuiType(
      CollateralWithdrawEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::withdraw_collateral::CollateralWithdrawEvent`
    this.$typeArgs = typeArgs

    this.taker = fields.taker
    this.obligation = fields.obligation
    this.withdrawAsset = fields.withdrawAsset
    this.withdrawAmount = fields.withdrawAmount
  }

  static reified(): CollateralWithdrawEventReified {
    return {
      typeName: CollateralWithdrawEvent.$typeName,
      fullTypeName: composeSuiType(
        CollateralWithdrawEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::withdraw_collateral::CollateralWithdrawEvent`,
      typeArgs: [] as [],
      isPhantom: CollateralWithdrawEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => CollateralWithdrawEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        CollateralWithdrawEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => CollateralWithdrawEvent.fromBcs(data),
      bcs: CollateralWithdrawEvent.bcs,
      fromJSONField: (field: any) => CollateralWithdrawEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => CollateralWithdrawEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        CollateralWithdrawEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        CollateralWithdrawEvent.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => CollateralWithdrawEvent.fetch(client, id),
      new: (fields: CollateralWithdrawEventFields) => {
        return new CollateralWithdrawEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return CollateralWithdrawEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<CollateralWithdrawEvent>> {
    return phantom(CollateralWithdrawEvent.reified())
  }
  static get p() {
    return CollateralWithdrawEvent.phantom()
  }

  static get bcs() {
    return bcs.struct('CollateralWithdrawEvent', {
      taker: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      obligation: ID.bcs,
      withdraw_asset: TypeName.bcs,
      withdraw_amount: bcs.u64(),
    })
  }

  static fromFields(fields: Record<string, any>): CollateralWithdrawEvent {
    return CollateralWithdrawEvent.reified().new({
      taker: decodeFromFields('address', fields.taker),
      obligation: decodeFromFields(ID.reified(), fields.obligation),
      withdrawAsset: decodeFromFields(TypeName.reified(), fields.withdraw_asset),
      withdrawAmount: decodeFromFields('u64', fields.withdraw_amount),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): CollateralWithdrawEvent {
    if (!isCollateralWithdrawEvent(item.type)) {
      throw new Error('not a CollateralWithdrawEvent type')
    }

    return CollateralWithdrawEvent.reified().new({
      taker: decodeFromFieldsWithTypes('address', item.fields.taker),
      obligation: decodeFromFieldsWithTypes(ID.reified(), item.fields.obligation),
      withdrawAsset: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.withdraw_asset),
      withdrawAmount: decodeFromFieldsWithTypes('u64', item.fields.withdraw_amount),
    })
  }

  static fromBcs(data: Uint8Array): CollateralWithdrawEvent {
    return CollateralWithdrawEvent.fromFields(CollateralWithdrawEvent.bcs.parse(data))
  }

  toJSONField() {
    return {
      taker: this.taker,
      obligation: this.obligation,
      withdrawAsset: this.withdrawAsset.toJSONField(),
      withdrawAmount: this.withdrawAmount.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): CollateralWithdrawEvent {
    return CollateralWithdrawEvent.reified().new({
      taker: decodeFromJSONField('address', field.taker),
      obligation: decodeFromJSONField(ID.reified(), field.obligation),
      withdrawAsset: decodeFromJSONField(TypeName.reified(), field.withdrawAsset),
      withdrawAmount: decodeFromJSONField('u64', field.withdrawAmount),
    })
  }

  static fromJSON(json: Record<string, any>): CollateralWithdrawEvent {
    if (json.$typeName !== CollateralWithdrawEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return CollateralWithdrawEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): CollateralWithdrawEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isCollateralWithdrawEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a CollateralWithdrawEvent object`
      )
    }
    return CollateralWithdrawEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): CollateralWithdrawEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isCollateralWithdrawEvent(data.bcs.type)) {
        throw new Error(`object at is not a CollateralWithdrawEvent object`)
      }

      return CollateralWithdrawEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return CollateralWithdrawEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<CollateralWithdrawEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(
        `error fetching CollateralWithdrawEvent object at id ${id}: ${res.error.code}`
      )
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isCollateralWithdrawEvent(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a CollateralWithdrawEvent object`)
    }

    return CollateralWithdrawEvent.fromSuiObjectData(res.data)
  }
}
