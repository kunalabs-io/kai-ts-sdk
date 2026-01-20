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
import { ID } from '../../../sui/object/structs'

/* ============================== CollateralWithdrawEvent =============================== */

export function isCollateralWithdrawEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('scallop-protocol', 'withdraw_collateral::CollateralWithdrawEvent')
    }::withdraw_collateral::CollateralWithdrawEvent`
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

export type CollateralWithdrawEventJSONField = {
  taker: string
  obligation: string
  withdrawAsset: string
  withdrawAmount: string
}

export type CollateralWithdrawEventJSON = {
  $typeName: typeof CollateralWithdrawEvent.$typeName
  $typeArgs: []
} & CollateralWithdrawEventJSONField

export class CollateralWithdrawEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::withdraw_collateral::CollateralWithdrawEvent` = `${
    getTypeOrigin('scallop-protocol', 'withdraw_collateral::CollateralWithdrawEvent')
  }::withdraw_collateral::CollateralWithdrawEvent` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof CollateralWithdrawEvent.$typeName = CollateralWithdrawEvent.$typeName
  readonly $fullTypeName: `${string}::withdraw_collateral::CollateralWithdrawEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof CollateralWithdrawEvent.$isPhantom =
    CollateralWithdrawEvent.$isPhantom

  readonly taker: ToField<'address'>
  readonly obligation: ToField<ID>
  readonly withdrawAsset: ToField<TypeName>
  readonly withdrawAmount: ToField<'u64'>

  private constructor(typeArgs: [], fields: CollateralWithdrawEventFields) {
    this.$fullTypeName = composeSuiType(
      CollateralWithdrawEvent.$typeName,
      ...typeArgs,
    ) as `${string}::withdraw_collateral::CollateralWithdrawEvent`
    this.$typeArgs = typeArgs

    this.taker = fields.taker
    this.obligation = fields.obligation
    this.withdrawAsset = fields.withdrawAsset
    this.withdrawAmount = fields.withdrawAmount
  }

  static reified(): CollateralWithdrawEventReified {
    const reifiedBcs = CollateralWithdrawEvent.bcs
    return {
      typeName: CollateralWithdrawEvent.$typeName,
      fullTypeName: composeSuiType(
        CollateralWithdrawEvent.$typeName,
        ...[],
      ) as `${string}::withdraw_collateral::CollateralWithdrawEvent`,
      typeArgs: [] as [],
      isPhantom: CollateralWithdrawEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => CollateralWithdrawEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        CollateralWithdrawEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => CollateralWithdrawEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => CollateralWithdrawEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => CollateralWithdrawEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        CollateralWithdrawEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        CollateralWithdrawEvent.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) =>
        CollateralWithdrawEvent.fetch(client, id),
      new: (fields: CollateralWithdrawEventFields) => {
        return new CollateralWithdrawEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): CollateralWithdrawEventReified {
    return CollateralWithdrawEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<CollateralWithdrawEvent>> {
    return phantom(CollateralWithdrawEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<CollateralWithdrawEvent>> {
    return CollateralWithdrawEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('CollateralWithdrawEvent', {
      taker: bcs.bytes(32).transform({
        input: (val: string) => fromHex(val),
        output: (val: Uint8Array) => toHex(val),
      }),
      obligation: ID.bcs,
      withdraw_asset: TypeName.bcs,
      withdraw_amount: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof CollateralWithdrawEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof CollateralWithdrawEvent.instantiateBcs> {
    if (!CollateralWithdrawEvent.cachedBcs) {
      CollateralWithdrawEvent.cachedBcs = CollateralWithdrawEvent.instantiateBcs()
    }
    return CollateralWithdrawEvent.cachedBcs
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

  toJSONField(): CollateralWithdrawEventJSONField {
    return {
      taker: this.taker,
      obligation: this.obligation,
      withdrawAsset: this.withdrawAsset,
      withdrawAmount: this.withdrawAmount.toString(),
    }
  }

  toJSON(): CollateralWithdrawEventJSON {
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
      throw new Error(
        `not a CollateralWithdrawEvent json object: expected '${CollateralWithdrawEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return CollateralWithdrawEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): CollateralWithdrawEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isCollateralWithdrawEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a CollateralWithdrawEvent object`,
      )
    }
    return CollateralWithdrawEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): CollateralWithdrawEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isCollateralWithdrawEvent(data.bcs.type)) {
        throw new Error(`object at is not a CollateralWithdrawEvent object`)
      }

      return CollateralWithdrawEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return CollateralWithdrawEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<CollateralWithdrawEvent> {
    const res = await fetchObjectBcs(client, id)
    if (!isCollateralWithdrawEvent(res.type)) {
      throw new Error(`object at id ${id} is not a CollateralWithdrawEvent object`)
    }

    return CollateralWithdrawEvent.fromBcs(res.bcsBytes)
  }
}
