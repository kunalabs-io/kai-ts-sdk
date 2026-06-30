/**
 * @title Module for hanlding withdraw collateral request from user
 * @author Scallop Labs
 * @notice User can withdarw collateral as long as the obligation risk level is lower than 1
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

/* ============================== RepayEvent =============================== */

export function isRepayEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('protocol', 'repay::RepayEvent')}::repay::RepayEvent`
}

export interface RepayEventFields {
  repayer: ToField<'address'>
  obligation: ToField<ID>
  asset: ToField<TypeName>
  amount: ToField<'u64'>
  time: ToField<'u64'>
}

export type RepayEventReified = Reified<RepayEvent, RepayEventFields>

export type RepayEventJSONField = {
  repayer: string
  obligation: string
  asset: string
  amount: string
  time: string
}

export type RepayEventJSON = {
  $typeName: typeof RepayEvent.$typeName
  $typeArgs: []
} & RepayEventJSONField

export class RepayEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::repay::RepayEvent` {
    return `${getTypeOrigin('protocol', 'repay::RepayEvent')}::repay::RepayEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof RepayEvent.$typeName = RepayEvent.$typeName
  readonly $fullTypeName: `${string}::repay::RepayEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof RepayEvent.$isPhantom = RepayEvent.$isPhantom

  readonly repayer: ToField<'address'>
  readonly obligation: ToField<ID>
  readonly asset: ToField<TypeName>
  readonly amount: ToField<'u64'>
  readonly time: ToField<'u64'>

  private constructor(typeArgs: [], fields: RepayEventFields) {
    this.$fullTypeName = composeSuiType(
      RepayEvent.$typeName,
      ...typeArgs,
    ) as `${string}::repay::RepayEvent`
    this.$typeArgs = typeArgs

    this.repayer = fields.repayer
    this.obligation = fields.obligation
    this.asset = fields.asset
    this.amount = fields.amount
    this.time = fields.time
  }

  static reified(): RepayEventReified {
    const reifiedBcs = RepayEvent.bcs
    return {
      get typeName() {
        return RepayEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          RepayEvent.$typeName,
          ...[],
        ) as `${string}::repay::RepayEvent`
      },
      typeArgs: [] as [],
      isPhantom: RepayEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => RepayEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => RepayEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => RepayEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => RepayEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => RepayEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        RepayEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => RepayEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => RepayEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => RepayEvent.fetch(client, id),
      new: (fields: RepayEventFields) => {
        return new RepayEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): RepayEventReified {
    return RepayEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RepayEvent>> {
    return phantom(RepayEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<RepayEvent>> {
    return RepayEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('RepayEvent', {
      repayer: bcs.bytes(32).transform({
        input: (val: string) => fromHex(val),
        output: (val: Uint8Array) => toHex(val),
      }),
      obligation: ID.bcs,
      asset: TypeName.bcs,
      amount: bcs.u64(),
      time: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof RepayEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof RepayEvent.instantiateBcs> {
    if (!RepayEvent.cachedBcs) {
      RepayEvent.cachedBcs = RepayEvent.instantiateBcs()
    }
    return RepayEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): RepayEvent {
    return RepayEvent.reified().new({
      repayer: decodeFromFields('address', fields.repayer),
      obligation: decodeFromFields(ID.reified(), fields.obligation),
      asset: decodeFromFields(TypeName.reified(), fields.asset),
      amount: decodeFromFields('u64', fields.amount),
      time: decodeFromFields('u64', fields.time),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): RepayEvent {
    if (!isRepayEvent(item.type)) {
      throw new Error('not a RepayEvent type')
    }

    return RepayEvent.reified().new({
      repayer: decodeFromFieldsWithTypes('address', item.fields.repayer),
      obligation: decodeFromFieldsWithTypes(ID.reified(), item.fields.obligation),
      asset: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.asset),
      amount: decodeFromFieldsWithTypes('u64', item.fields.amount),
      time: decodeFromFieldsWithTypes('u64', item.fields.time),
    })
  }

  static fromBcs(data: Uint8Array): RepayEvent {
    return RepayEvent.fromFields(RepayEvent.bcs.parse(data))
  }

  toJSONField(): RepayEventJSONField {
    return {
      repayer: this.repayer,
      obligation: this.obligation,
      asset: this.asset,
      amount: this.amount.toString(),
      time: this.time.toString(),
    }
  }

  toJSON(): RepayEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): RepayEvent {
    return RepayEvent.reified().new({
      repayer: decodeFromJSONField('address', field.repayer),
      obligation: decodeFromJSONField(ID.reified(), field.obligation),
      asset: decodeFromJSONField(TypeName.reified(), field.asset),
      amount: decodeFromJSONField('u64', field.amount),
      time: decodeFromJSONField('u64', field.time),
    })
  }

  static fromJSON(json: Record<string, any>): RepayEvent {
    if (json.$typeName !== RepayEvent.$typeName) {
      throw new Error(
        `not a RepayEvent json object: expected '${RepayEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return RepayEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): RepayEvent {
    if (!isRepayEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a RepayEvent object`)
    }
    return RepayEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link RepayEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): RepayEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRepayEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a RepayEvent object`)
    }
    return RepayEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link RepayEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): RepayEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRepayEvent(data.bcs.type)) {
        throw new Error(`object at is not a RepayEvent object`)
      }

      return RepayEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RepayEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<RepayEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isRepayEvent(object.type)) {
      throw new Error(`object at id ${id} is not a RepayEvent object`)
    }
    return RepayEvent.fromBcs(object.content)
  }
}
