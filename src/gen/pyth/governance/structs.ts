import { bcs } from '@mysten/sui/bcs'
import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import type { SuiObjectData, SuiParsedData } from '@mysten/sui/jsonRpc'
import { fromBase64 } from '@mysten/sui/utils'
import { getTypeOrigin } from '../../_envs'
import {
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  fieldToJSON,
  phantom,
  PhantomReified,
  Reified,
  StructClass,
  ToField,
  ToJSON,
  ToTypeStr,
  vector,
} from '../../_framework/reified'
import { composeSuiType, compressSuiType, FieldsWithTypes } from '../../_framework/util'
import { Vector } from '../../_framework/vector'
import { Bytes32 } from '../../wormhole/bytes32/structs'

/* ============================== WormholeVAAVerificationReceipt =============================== */

export function isWormholeVAAVerificationReceipt(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('pyth', 'governance::WormholeVAAVerificationReceipt')
    }::governance::WormholeVAAVerificationReceipt`
}

export interface WormholeVAAVerificationReceiptFields {
  payload: ToField<Vector<'u8'>>
  digest: ToField<Bytes32>
  sequence: ToField<'u64'>
}

export type WormholeVAAVerificationReceiptReified = Reified<
  WormholeVAAVerificationReceipt,
  WormholeVAAVerificationReceiptFields
>

export type WormholeVAAVerificationReceiptJSONField = {
  payload: number[]
  digest: ToJSON<Bytes32>
  sequence: string
}

export type WormholeVAAVerificationReceiptJSON = {
  $typeName: typeof WormholeVAAVerificationReceipt.$typeName
  $typeArgs: []
} & WormholeVAAVerificationReceiptJSONField

export class WormholeVAAVerificationReceipt implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::governance::WormholeVAAVerificationReceipt` {
    return `${
      getTypeOrigin('pyth', 'governance::WormholeVAAVerificationReceipt')
    }::governance::WormholeVAAVerificationReceipt` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof WormholeVAAVerificationReceipt.$typeName =
    WormholeVAAVerificationReceipt.$typeName
  readonly $fullTypeName: `${string}::governance::WormholeVAAVerificationReceipt`
  readonly $typeArgs: []
  readonly $isPhantom: typeof WormholeVAAVerificationReceipt.$isPhantom =
    WormholeVAAVerificationReceipt.$isPhantom

  readonly payload: ToField<Vector<'u8'>>
  readonly digest: ToField<Bytes32>
  readonly sequence: ToField<'u64'>

  private constructor(typeArgs: [], fields: WormholeVAAVerificationReceiptFields) {
    this.$fullTypeName = composeSuiType(
      WormholeVAAVerificationReceipt.$typeName,
      ...typeArgs,
    ) as `${string}::governance::WormholeVAAVerificationReceipt`
    this.$typeArgs = typeArgs

    this.payload = fields.payload
    this.digest = fields.digest
    this.sequence = fields.sequence
  }

  static reified(): WormholeVAAVerificationReceiptReified {
    const reifiedBcs = WormholeVAAVerificationReceipt.bcs
    return {
      get typeName() {
        return WormholeVAAVerificationReceipt.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          WormholeVAAVerificationReceipt.$typeName,
          ...[],
        ) as `${string}::governance::WormholeVAAVerificationReceipt`
      },
      typeArgs: [] as [],
      isPhantom: WormholeVAAVerificationReceipt.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) =>
        WormholeVAAVerificationReceipt.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        WormholeVAAVerificationReceipt.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) =>
        WormholeVAAVerificationReceipt.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => WormholeVAAVerificationReceipt.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => WormholeVAAVerificationReceipt.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        WormholeVAAVerificationReceipt.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        WormholeVAAVerificationReceipt.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        WormholeVAAVerificationReceipt.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        WormholeVAAVerificationReceipt.fetch(client, id),
      new: (fields: WormholeVAAVerificationReceiptFields) => {
        return new WormholeVAAVerificationReceipt([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): WormholeVAAVerificationReceiptReified {
    return WormholeVAAVerificationReceipt.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<WormholeVAAVerificationReceipt>> {
    return phantom(WormholeVAAVerificationReceipt.reified())
  }

  static get p(): PhantomReified<ToTypeStr<WormholeVAAVerificationReceipt>> {
    return WormholeVAAVerificationReceipt.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('WormholeVAAVerificationReceipt', {
      payload: bcs.vector(bcs.u8()),
      digest: Bytes32.bcs,
      sequence: bcs.u64(),
    })
  }

  private static cachedBcs:
    | ReturnType<typeof WormholeVAAVerificationReceipt.instantiateBcs>
    | null = null

  static get bcs(): ReturnType<typeof WormholeVAAVerificationReceipt.instantiateBcs> {
    if (!WormholeVAAVerificationReceipt.cachedBcs) {
      WormholeVAAVerificationReceipt.cachedBcs = WormholeVAAVerificationReceipt.instantiateBcs()
    }
    return WormholeVAAVerificationReceipt.cachedBcs
  }

  static fromFields(fields: Record<string, any>): WormholeVAAVerificationReceipt {
    return WormholeVAAVerificationReceipt.reified().new({
      payload: decodeFromFields(vector('u8'), fields.payload),
      digest: decodeFromFields(Bytes32.reified(), fields.digest),
      sequence: decodeFromFields('u64', fields.sequence),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): WormholeVAAVerificationReceipt {
    if (!isWormholeVAAVerificationReceipt(item.type)) {
      throw new Error('not a WormholeVAAVerificationReceipt type')
    }

    return WormholeVAAVerificationReceipt.reified().new({
      payload: decodeFromFieldsWithTypes(vector('u8'), item.fields.payload),
      digest: decodeFromFieldsWithTypes(Bytes32.reified(), item.fields.digest),
      sequence: decodeFromFieldsWithTypes('u64', item.fields.sequence),
    })
  }

  static fromBcs(data: Uint8Array): WormholeVAAVerificationReceipt {
    return WormholeVAAVerificationReceipt.fromFields(WormholeVAAVerificationReceipt.bcs.parse(data))
  }

  toJSONField(): WormholeVAAVerificationReceiptJSONField {
    return {
      payload: fieldToJSON<Vector<'u8'>>(`vector<u8>`, this.payload),
      digest: this.digest.toJSONField(),
      sequence: this.sequence.toString(),
    }
  }

  toJSON(): WormholeVAAVerificationReceiptJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): WormholeVAAVerificationReceipt {
    return WormholeVAAVerificationReceipt.reified().new({
      payload: decodeFromJSONField(vector('u8'), field.payload),
      digest: decodeFromJSONField(Bytes32.reified(), field.digest),
      sequence: decodeFromJSONField('u64', field.sequence),
    })
  }

  static fromJSON(json: Record<string, any>): WormholeVAAVerificationReceipt {
    if (json.$typeName !== WormholeVAAVerificationReceipt.$typeName) {
      throw new Error(
        `not a WormholeVAAVerificationReceipt json object: expected '${WormholeVAAVerificationReceipt.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return WormholeVAAVerificationReceipt.fromJSONField(json)
  }

  static fromCoreObject(
    obj: SuiClientTypes.Object<{ content: true }>,
  ): WormholeVAAVerificationReceipt {
    if (!isWormholeVAAVerificationReceipt(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a WormholeVAAVerificationReceipt object`)
    }
    return WormholeVAAVerificationReceipt.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link WormholeVAAVerificationReceipt.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): WormholeVAAVerificationReceipt {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isWormholeVAAVerificationReceipt(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a WormholeVAAVerificationReceipt object`,
      )
    }
    return WormholeVAAVerificationReceipt.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link WormholeVAAVerificationReceipt.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): WormholeVAAVerificationReceipt {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isWormholeVAAVerificationReceipt(data.bcs.type)) {
        throw new Error(`object at is not a WormholeVAAVerificationReceipt object`)
      }

      return WormholeVAAVerificationReceipt.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return WormholeVAAVerificationReceipt.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(
    client: ClientWithCoreApi,
    id: string,
  ): Promise<WormholeVAAVerificationReceipt> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isWormholeVAAVerificationReceipt(object.type)) {
      throw new Error(`object at id ${id} is not a WormholeVAAVerificationReceipt object`)
    }
    return WormholeVAAVerificationReceipt.fromBcs(object.content)
  }
}
