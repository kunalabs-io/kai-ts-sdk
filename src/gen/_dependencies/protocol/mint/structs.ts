/**
 * @title Module for hanlding supply base asset request from user
 * @author Scallop Labs
 * @notice User get sCoin after supplying the base asset
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

/* ============================== MintEvent =============================== */

export function isMintEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('protocol', 'mint::MintEvent')}::mint::MintEvent`
}

export interface MintEventFields {
  minter: ToField<'address'>
  depositAsset: ToField<TypeName>
  depositAmount: ToField<'u64'>
  mintAsset: ToField<TypeName>
  mintAmount: ToField<'u64'>
  time: ToField<'u64'>
}

export type MintEventReified = Reified<MintEvent, MintEventFields>

export type MintEventJSONField = {
  minter: string
  depositAsset: string
  depositAmount: string
  mintAsset: string
  mintAmount: string
  time: string
}

export type MintEventJSON = {
  $typeName: typeof MintEvent.$typeName
  $typeArgs: []
} & MintEventJSONField

export class MintEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::mint::MintEvent` {
    return `${getTypeOrigin('protocol', 'mint::MintEvent')}::mint::MintEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof MintEvent.$typeName = MintEvent.$typeName
  readonly $fullTypeName: `${string}::mint::MintEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof MintEvent.$isPhantom = MintEvent.$isPhantom

  readonly minter: ToField<'address'>
  readonly depositAsset: ToField<TypeName>
  readonly depositAmount: ToField<'u64'>
  readonly mintAsset: ToField<TypeName>
  readonly mintAmount: ToField<'u64'>
  readonly time: ToField<'u64'>

  private constructor(typeArgs: [], fields: MintEventFields) {
    this.$fullTypeName = composeSuiType(
      MintEvent.$typeName,
      ...typeArgs,
    ) as `${string}::mint::MintEvent`
    this.$typeArgs = typeArgs

    this.minter = fields.minter
    this.depositAsset = fields.depositAsset
    this.depositAmount = fields.depositAmount
    this.mintAsset = fields.mintAsset
    this.mintAmount = fields.mintAmount
    this.time = fields.time
  }

  static reified(): MintEventReified {
    const reifiedBcs = MintEvent.bcs
    return {
      get typeName() {
        return MintEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          MintEvent.$typeName,
          ...[],
        ) as `${string}::mint::MintEvent`
      },
      typeArgs: [] as [],
      isPhantom: MintEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => MintEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => MintEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => MintEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => MintEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => MintEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        MintEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => MintEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => MintEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => MintEvent.fetch(client, id),
      new: (fields: MintEventFields) => {
        return new MintEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): MintEventReified {
    return MintEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<MintEvent>> {
    return phantom(MintEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<MintEvent>> {
    return MintEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('MintEvent', {
      minter: bcs.bytes(32).transform({
        input: (val: string) => fromHex(val),
        output: (val: Uint8Array) => toHex(val),
      }),
      deposit_asset: TypeName.bcs,
      deposit_amount: bcs.u64(),
      mint_asset: TypeName.bcs,
      mint_amount: bcs.u64(),
      time: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof MintEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof MintEvent.instantiateBcs> {
    if (!MintEvent.cachedBcs) {
      MintEvent.cachedBcs = MintEvent.instantiateBcs()
    }
    return MintEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): MintEvent {
    return MintEvent.reified().new({
      minter: decodeFromFields('address', fields.minter),
      depositAsset: decodeFromFields(TypeName.reified(), fields.deposit_asset),
      depositAmount: decodeFromFields('u64', fields.deposit_amount),
      mintAsset: decodeFromFields(TypeName.reified(), fields.mint_asset),
      mintAmount: decodeFromFields('u64', fields.mint_amount),
      time: decodeFromFields('u64', fields.time),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): MintEvent {
    if (!isMintEvent(item.type)) {
      throw new Error('not a MintEvent type')
    }

    return MintEvent.reified().new({
      minter: decodeFromFieldsWithTypes('address', item.fields.minter),
      depositAsset: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.deposit_asset),
      depositAmount: decodeFromFieldsWithTypes('u64', item.fields.deposit_amount),
      mintAsset: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.mint_asset),
      mintAmount: decodeFromFieldsWithTypes('u64', item.fields.mint_amount),
      time: decodeFromFieldsWithTypes('u64', item.fields.time),
    })
  }

  static fromBcs(data: Uint8Array): MintEvent {
    return MintEvent.fromFields(MintEvent.bcs.parse(data))
  }

  toJSONField(): MintEventJSONField {
    return {
      minter: this.minter,
      depositAsset: this.depositAsset,
      depositAmount: this.depositAmount.toString(),
      mintAsset: this.mintAsset,
      mintAmount: this.mintAmount.toString(),
      time: this.time.toString(),
    }
  }

  toJSON(): MintEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): MintEvent {
    return MintEvent.reified().new({
      minter: decodeFromJSONField('address', field.minter),
      depositAsset: decodeFromJSONField(TypeName.reified(), field.depositAsset),
      depositAmount: decodeFromJSONField('u64', field.depositAmount),
      mintAsset: decodeFromJSONField(TypeName.reified(), field.mintAsset),
      mintAmount: decodeFromJSONField('u64', field.mintAmount),
      time: decodeFromJSONField('u64', field.time),
    })
  }

  static fromJSON(json: Record<string, any>): MintEvent {
    if (json.$typeName !== MintEvent.$typeName) {
      throw new Error(
        `not a MintEvent json object: expected '${MintEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return MintEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): MintEvent {
    if (!isMintEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a MintEvent object`)
    }
    return MintEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link MintEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): MintEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isMintEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a MintEvent object`)
    }
    return MintEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link MintEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): MintEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isMintEvent(data.bcs.type)) {
        throw new Error(`object at is not a MintEvent object`)
      }

      return MintEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return MintEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<MintEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isMintEvent(object.type)) {
      throw new Error(`object at id ${id} is not a MintEvent object`)
    }
    return MintEvent.fromBcs(object.content)
  }
}
