/**
 * @title A module dedicated for handling the collateral deposit request from user
 * @author Scallop Labs
 */

import { bcs } from '@mysten/sui/bcs'
import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import type { SuiObjectData, SuiParsedData } from '@mysten/sui/jsonRpc'
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
import { composeSuiType, compressSuiType, FieldsWithTypes } from '../../../_framework/util'
import { TypeName } from '../../../std/type-name/structs'
import { ID } from '../../../sui/object/structs'

/* ============================== CollateralDepositEvent =============================== */

export function isCollateralDepositEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('protocol', 'deposit_collateral::CollateralDepositEvent')
    }::deposit_collateral::CollateralDepositEvent`
}

export interface CollateralDepositEventFields {
  provider: ToField<'address'>
  obligation: ToField<ID>
  depositAsset: ToField<TypeName>
  depositAmount: ToField<'u64'>
}

export type CollateralDepositEventReified = Reified<
  CollateralDepositEvent,
  CollateralDepositEventFields
>

export type CollateralDepositEventJSONField = {
  provider: string
  obligation: string
  depositAsset: string
  depositAmount: string
}

export type CollateralDepositEventJSON = {
  $typeName: typeof CollateralDepositEvent.$typeName
  $typeArgs: []
} & CollateralDepositEventJSONField

export class CollateralDepositEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::deposit_collateral::CollateralDepositEvent` {
    return `${
      getTypeOrigin('protocol', 'deposit_collateral::CollateralDepositEvent')
    }::deposit_collateral::CollateralDepositEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof CollateralDepositEvent.$typeName = CollateralDepositEvent.$typeName
  readonly $fullTypeName: `${string}::deposit_collateral::CollateralDepositEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof CollateralDepositEvent.$isPhantom = CollateralDepositEvent.$isPhantom

  readonly provider: ToField<'address'>
  readonly obligation: ToField<ID>
  readonly depositAsset: ToField<TypeName>
  readonly depositAmount: ToField<'u64'>

  private constructor(typeArgs: [], fields: CollateralDepositEventFields) {
    this.$fullTypeName = composeSuiType(
      CollateralDepositEvent.$typeName,
      ...typeArgs,
    ) as `${string}::deposit_collateral::CollateralDepositEvent`
    this.$typeArgs = typeArgs

    this.provider = fields.provider
    this.obligation = fields.obligation
    this.depositAsset = fields.depositAsset
    this.depositAmount = fields.depositAmount
  }

  static reified(): CollateralDepositEventReified {
    const reifiedBcs = CollateralDepositEvent.bcs
    return {
      get typeName() {
        return CollateralDepositEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          CollateralDepositEvent.$typeName,
          ...[],
        ) as `${string}::deposit_collateral::CollateralDepositEvent`
      },
      typeArgs: [] as [],
      isPhantom: CollateralDepositEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => CollateralDepositEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        CollateralDepositEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => CollateralDepositEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => CollateralDepositEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => CollateralDepositEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        CollateralDepositEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        CollateralDepositEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        CollateralDepositEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        CollateralDepositEvent.fetch(client, id),
      new: (fields: CollateralDepositEventFields) => {
        return new CollateralDepositEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): CollateralDepositEventReified {
    return CollateralDepositEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<CollateralDepositEvent>> {
    return phantom(CollateralDepositEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<CollateralDepositEvent>> {
    return CollateralDepositEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('CollateralDepositEvent', {
      provider: bcs.bytes(32).transform({
        input: (val: string) => fromHex(val),
        output: (val: Uint8Array) => toHex(val),
      }),
      obligation: ID.bcs,
      deposit_asset: TypeName.bcs,
      deposit_amount: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof CollateralDepositEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof CollateralDepositEvent.instantiateBcs> {
    if (!CollateralDepositEvent.cachedBcs) {
      CollateralDepositEvent.cachedBcs = CollateralDepositEvent.instantiateBcs()
    }
    return CollateralDepositEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): CollateralDepositEvent {
    return CollateralDepositEvent.reified().new({
      provider: decodeFromFields('address', fields.provider),
      obligation: decodeFromFields(ID.reified(), fields.obligation),
      depositAsset: decodeFromFields(TypeName.reified(), fields.deposit_asset),
      depositAmount: decodeFromFields('u64', fields.deposit_amount),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): CollateralDepositEvent {
    if (!isCollateralDepositEvent(item.type)) {
      throw new Error('not a CollateralDepositEvent type')
    }

    return CollateralDepositEvent.reified().new({
      provider: decodeFromFieldsWithTypes('address', item.fields.provider),
      obligation: decodeFromFieldsWithTypes(ID.reified(), item.fields.obligation),
      depositAsset: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.deposit_asset),
      depositAmount: decodeFromFieldsWithTypes('u64', item.fields.deposit_amount),
    })
  }

  static fromBcs(data: Uint8Array): CollateralDepositEvent {
    return CollateralDepositEvent.fromFields(CollateralDepositEvent.bcs.parse(data))
  }

  toJSONField(): CollateralDepositEventJSONField {
    return {
      provider: this.provider,
      obligation: this.obligation,
      depositAsset: this.depositAsset,
      depositAmount: this.depositAmount.toString(),
    }
  }

  toJSON(): CollateralDepositEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): CollateralDepositEvent {
    return CollateralDepositEvent.reified().new({
      provider: decodeFromJSONField('address', field.provider),
      obligation: decodeFromJSONField(ID.reified(), field.obligation),
      depositAsset: decodeFromJSONField(TypeName.reified(), field.depositAsset),
      depositAmount: decodeFromJSONField('u64', field.depositAmount),
    })
  }

  static fromJSON(json: Record<string, any>): CollateralDepositEvent {
    if (json.$typeName !== CollateralDepositEvent.$typeName) {
      throw new Error(
        `not a CollateralDepositEvent json object: expected '${CollateralDepositEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return CollateralDepositEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): CollateralDepositEvent {
    if (!isCollateralDepositEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a CollateralDepositEvent object`)
    }
    return CollateralDepositEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link CollateralDepositEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): CollateralDepositEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isCollateralDepositEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a CollateralDepositEvent object`,
      )
    }
    return CollateralDepositEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link CollateralDepositEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): CollateralDepositEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isCollateralDepositEvent(data.bcs.type)) {
        throw new Error(`object at is not a CollateralDepositEvent object`)
      }

      return CollateralDepositEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return CollateralDepositEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<CollateralDepositEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isCollateralDepositEvent(object.type)) {
      throw new Error(`object at id ${id} is not a CollateralDepositEvent object`)
    }
    return CollateralDepositEvent.fromBcs(object.content)
  }
}
