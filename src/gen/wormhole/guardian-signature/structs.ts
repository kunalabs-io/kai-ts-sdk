/**
 * This module implements a custom type representing a Guardian's signature
 * with recovery ID of a particular hashed VAA message body. The components of
 * `GuardianSignature` are used to perform public key recovery using ECDSA.
 */

import { bcs } from '@mysten/sui/bcs'
import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import type { SuiObjectData, SuiParsedData } from '@mysten/sui/jsonRpc'
import { fromBase64 } from '@mysten/sui/utils'
import { getTypeOrigin } from '../../_envs'
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
} from '../../_framework/reified'
import { composeSuiType, compressSuiType, FieldsWithTypes } from '../../_framework/util'
import { Bytes32 } from '../bytes32/structs'

/* ============================== GuardianSignature =============================== */

export function isGuardianSignature(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('wormhole', 'guardian_signature::GuardianSignature')
    }::guardian_signature::GuardianSignature`
}

export interface GuardianSignatureFields {
  r: ToField<Bytes32>
  s: ToField<Bytes32>
  recoveryId: ToField<'u8'>
  index: ToField<'u8'>
}

export type GuardianSignatureReified = Reified<GuardianSignature, GuardianSignatureFields>

export type GuardianSignatureJSONField = {
  r: ToJSON<Bytes32>
  s: ToJSON<Bytes32>
  recoveryId: number
  index: number
}

export type GuardianSignatureJSON = {
  $typeName: typeof GuardianSignature.$typeName
  $typeArgs: []
} & GuardianSignatureJSONField

/** Container for elliptic curve signature parameters and Guardian index. */
export class GuardianSignature implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::guardian_signature::GuardianSignature` {
    return `${
      getTypeOrigin('wormhole', 'guardian_signature::GuardianSignature')
    }::guardian_signature::GuardianSignature` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof GuardianSignature.$typeName = GuardianSignature.$typeName
  readonly $fullTypeName: `${string}::guardian_signature::GuardianSignature`
  readonly $typeArgs: []
  readonly $isPhantom: typeof GuardianSignature.$isPhantom = GuardianSignature.$isPhantom

  readonly r: ToField<Bytes32>
  readonly s: ToField<Bytes32>
  readonly recoveryId: ToField<'u8'>
  readonly index: ToField<'u8'>

  private constructor(typeArgs: [], fields: GuardianSignatureFields) {
    this.$fullTypeName = composeSuiType(
      GuardianSignature.$typeName,
      ...typeArgs,
    ) as `${string}::guardian_signature::GuardianSignature`
    this.$typeArgs = typeArgs

    this.r = fields.r
    this.s = fields.s
    this.recoveryId = fields.recoveryId
    this.index = fields.index
  }

  static reified(): GuardianSignatureReified {
    const reifiedBcs = GuardianSignature.bcs
    return {
      get typeName() {
        return GuardianSignature.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          GuardianSignature.$typeName,
          ...[],
        ) as `${string}::guardian_signature::GuardianSignature`
      },
      typeArgs: [] as [],
      isPhantom: GuardianSignature.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => GuardianSignature.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => GuardianSignature.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => GuardianSignature.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => GuardianSignature.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => GuardianSignature.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        GuardianSignature.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => GuardianSignature.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => GuardianSignature.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => GuardianSignature.fetch(client, id),
      new: (fields: GuardianSignatureFields) => {
        return new GuardianSignature([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): GuardianSignatureReified {
    return GuardianSignature.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<GuardianSignature>> {
    return phantom(GuardianSignature.reified())
  }

  static get p(): PhantomReified<ToTypeStr<GuardianSignature>> {
    return GuardianSignature.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('GuardianSignature', {
      r: Bytes32.bcs,
      s: Bytes32.bcs,
      recovery_id: bcs.u8(),
      index: bcs.u8(),
    })
  }

  private static cachedBcs: ReturnType<typeof GuardianSignature.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof GuardianSignature.instantiateBcs> {
    if (!GuardianSignature.cachedBcs) {
      GuardianSignature.cachedBcs = GuardianSignature.instantiateBcs()
    }
    return GuardianSignature.cachedBcs
  }

  static fromFields(fields: Record<string, any>): GuardianSignature {
    return GuardianSignature.reified().new({
      r: decodeFromFields(Bytes32.reified(), fields.r),
      s: decodeFromFields(Bytes32.reified(), fields.s),
      recoveryId: decodeFromFields('u8', fields.recovery_id),
      index: decodeFromFields('u8', fields.index),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): GuardianSignature {
    if (!isGuardianSignature(item.type)) {
      throw new Error('not a GuardianSignature type')
    }

    return GuardianSignature.reified().new({
      r: decodeFromFieldsWithTypes(Bytes32.reified(), item.fields.r),
      s: decodeFromFieldsWithTypes(Bytes32.reified(), item.fields.s),
      recoveryId: decodeFromFieldsWithTypes('u8', item.fields.recovery_id),
      index: decodeFromFieldsWithTypes('u8', item.fields.index),
    })
  }

  static fromBcs(data: Uint8Array): GuardianSignature {
    return GuardianSignature.fromFields(GuardianSignature.bcs.parse(data))
  }

  toJSONField(): GuardianSignatureJSONField {
    return {
      r: this.r.toJSONField(),
      s: this.s.toJSONField(),
      recoveryId: this.recoveryId,
      index: this.index,
    }
  }

  toJSON(): GuardianSignatureJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): GuardianSignature {
    return GuardianSignature.reified().new({
      r: decodeFromJSONField(Bytes32.reified(), field.r),
      s: decodeFromJSONField(Bytes32.reified(), field.s),
      recoveryId: decodeFromJSONField('u8', field.recoveryId),
      index: decodeFromJSONField('u8', field.index),
    })
  }

  static fromJSON(json: Record<string, any>): GuardianSignature {
    if (json.$typeName !== GuardianSignature.$typeName) {
      throw new Error(
        `not a GuardianSignature json object: expected '${GuardianSignature.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return GuardianSignature.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): GuardianSignature {
    if (!isGuardianSignature(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a GuardianSignature object`)
    }
    return GuardianSignature.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link GuardianSignature.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): GuardianSignature {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isGuardianSignature(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a GuardianSignature object`)
    }
    return GuardianSignature.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link GuardianSignature.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): GuardianSignature {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isGuardianSignature(data.bcs.type)) {
        throw new Error(`object at is not a GuardianSignature object`)
      }

      return GuardianSignature.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return GuardianSignature.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<GuardianSignature> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isGuardianSignature(object.type)) {
      throw new Error(`object at id ${id} is not a GuardianSignature object`)
    }
    return GuardianSignature.fromBcs(object.content)
  }
}
