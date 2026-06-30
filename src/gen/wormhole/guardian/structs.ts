/** This module implements a `Guardian` that warehouses a 20-byte public key. */

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
import { Bytes20 } from '../bytes20/structs'

/* ============================== Guardian =============================== */

export function isGuardian(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('wormhole', 'guardian::Guardian')}::guardian::Guardian`
}

export interface GuardianFields {
  pubkey: ToField<Bytes20>
}

export type GuardianReified = Reified<Guardian, GuardianFields>

export type GuardianJSONField = {
  pubkey: ToJSON<Bytes20>
}

export type GuardianJSON = {
  $typeName: typeof Guardian.$typeName
  $typeArgs: []
} & GuardianJSONField

/** Container for 20-byte Guardian public key. */
export class Guardian implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::guardian::Guardian` {
    return `${getTypeOrigin('wormhole', 'guardian::Guardian')}::guardian::Guardian` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof Guardian.$typeName = Guardian.$typeName
  readonly $fullTypeName: `${string}::guardian::Guardian`
  readonly $typeArgs: []
  readonly $isPhantom: typeof Guardian.$isPhantom = Guardian.$isPhantom

  readonly pubkey: ToField<Bytes20>

  private constructor(typeArgs: [], fields: GuardianFields) {
    this.$fullTypeName = composeSuiType(
      Guardian.$typeName,
      ...typeArgs,
    ) as `${string}::guardian::Guardian`
    this.$typeArgs = typeArgs

    this.pubkey = fields.pubkey
  }

  static reified(): GuardianReified {
    const reifiedBcs = Guardian.bcs
    return {
      get typeName() {
        return Guardian.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          Guardian.$typeName,
          ...[],
        ) as `${string}::guardian::Guardian`
      },
      typeArgs: [] as [],
      isPhantom: Guardian.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Guardian.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Guardian.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Guardian.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Guardian.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Guardian.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        Guardian.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => Guardian.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Guardian.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => Guardian.fetch(client, id),
      new: (fields: GuardianFields) => {
        return new Guardian([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): GuardianReified {
    return Guardian.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Guardian>> {
    return phantom(Guardian.reified())
  }

  static get p(): PhantomReified<ToTypeStr<Guardian>> {
    return Guardian.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('Guardian', {
      pubkey: Bytes20.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof Guardian.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof Guardian.instantiateBcs> {
    if (!Guardian.cachedBcs) {
      Guardian.cachedBcs = Guardian.instantiateBcs()
    }
    return Guardian.cachedBcs
  }

  static fromFields(fields: Record<string, any>): Guardian {
    return Guardian.reified().new({
      pubkey: decodeFromFields(Bytes20.reified(), fields.pubkey),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Guardian {
    if (!isGuardian(item.type)) {
      throw new Error('not a Guardian type')
    }

    return Guardian.reified().new({
      pubkey: decodeFromFieldsWithTypes(Bytes20.reified(), item.fields.pubkey),
    })
  }

  static fromBcs(data: Uint8Array): Guardian {
    return Guardian.fromFields(Guardian.bcs.parse(data))
  }

  toJSONField(): GuardianJSONField {
    return {
      pubkey: this.pubkey.toJSONField(),
    }
  }

  toJSON(): GuardianJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Guardian {
    return Guardian.reified().new({
      pubkey: decodeFromJSONField(Bytes20.reified(), field.pubkey),
    })
  }

  static fromJSON(json: Record<string, any>): Guardian {
    if (json.$typeName !== Guardian.$typeName) {
      throw new Error(
        `not a Guardian json object: expected '${Guardian.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return Guardian.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): Guardian {
    if (!isGuardian(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a Guardian object`)
    }
    return Guardian.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Guardian.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): Guardian {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isGuardian(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Guardian object`)
    }
    return Guardian.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Guardian.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): Guardian {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isGuardian(data.bcs.type)) {
        throw new Error(`object at is not a Guardian object`)
      }

      return Guardian.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Guardian.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<Guardian> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isGuardian(object.type)) {
      throw new Error(`object at id ${id} is not a Guardian object`)
    }
    return Guardian.fromBcs(object.content)
  }
}
