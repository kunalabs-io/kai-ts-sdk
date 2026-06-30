import { bcs } from '@mysten/sui/bcs'
import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import type { SuiObjectData, SuiParsedData } from '@mysten/sui/jsonRpc'
import { fromBase64 } from '@mysten/sui/utils'
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

/* ============================== YWHUSDTE =============================== */

export function isYWHUSDTE(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('kai-ywhusdte-ysui', 'ywhusdte::YWHUSDTE')}::ywhusdte::YWHUSDTE`
}

export interface YWHUSDTEFields {
  dummyField: ToField<'bool'>
}

export type YWHUSDTEReified = Reified<YWHUSDTE, YWHUSDTEFields>

export type YWHUSDTEJSONField = {
  dummyField: boolean
}

export type YWHUSDTEJSON = {
  $typeName: typeof YWHUSDTE.$typeName
  $typeArgs: []
} & YWHUSDTEJSONField

export class YWHUSDTE implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::ywhusdte::YWHUSDTE` {
    return `${
      getTypeOrigin('kai-ywhusdte-ysui', 'ywhusdte::YWHUSDTE')
    }::ywhusdte::YWHUSDTE` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof YWHUSDTE.$typeName = YWHUSDTE.$typeName
  readonly $fullTypeName: `${string}::ywhusdte::YWHUSDTE`
  readonly $typeArgs: []
  readonly $isPhantom: typeof YWHUSDTE.$isPhantom = YWHUSDTE.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: YWHUSDTEFields) {
    this.$fullTypeName = composeSuiType(
      YWHUSDTE.$typeName,
      ...typeArgs,
    ) as `${string}::ywhusdte::YWHUSDTE`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): YWHUSDTEReified {
    const reifiedBcs = YWHUSDTE.bcs
    return {
      get typeName() {
        return YWHUSDTE.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          YWHUSDTE.$typeName,
          ...[],
        ) as `${string}::ywhusdte::YWHUSDTE`
      },
      typeArgs: [] as [],
      isPhantom: YWHUSDTE.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => YWHUSDTE.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => YWHUSDTE.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => YWHUSDTE.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => YWHUSDTE.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => YWHUSDTE.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        YWHUSDTE.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => YWHUSDTE.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => YWHUSDTE.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => YWHUSDTE.fetch(client, id),
      new: (fields: YWHUSDTEFields) => {
        return new YWHUSDTE([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): YWHUSDTEReified {
    return YWHUSDTE.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<YWHUSDTE>> {
    return phantom(YWHUSDTE.reified())
  }

  static get p(): PhantomReified<ToTypeStr<YWHUSDTE>> {
    return YWHUSDTE.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('YWHUSDTE', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof YWHUSDTE.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof YWHUSDTE.instantiateBcs> {
    if (!YWHUSDTE.cachedBcs) {
      YWHUSDTE.cachedBcs = YWHUSDTE.instantiateBcs()
    }
    return YWHUSDTE.cachedBcs
  }

  static fromFields(fields: Record<string, any>): YWHUSDTE {
    return YWHUSDTE.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): YWHUSDTE {
    if (!isYWHUSDTE(item.type)) {
      throw new Error('not a YWHUSDTE type')
    }

    return YWHUSDTE.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): YWHUSDTE {
    return YWHUSDTE.fromFields(YWHUSDTE.bcs.parse(data))
  }

  toJSONField(): YWHUSDTEJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): YWHUSDTEJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): YWHUSDTE {
    return YWHUSDTE.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): YWHUSDTE {
    if (json.$typeName !== YWHUSDTE.$typeName) {
      throw new Error(
        `not a YWHUSDTE json object: expected '${YWHUSDTE.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return YWHUSDTE.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): YWHUSDTE {
    if (!isYWHUSDTE(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a YWHUSDTE object`)
    }
    return YWHUSDTE.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link YWHUSDTE.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): YWHUSDTE {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isYWHUSDTE(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a YWHUSDTE object`)
    }
    return YWHUSDTE.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link YWHUSDTE.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): YWHUSDTE {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isYWHUSDTE(data.bcs.type)) {
        throw new Error(`object at is not a YWHUSDTE object`)
      }

      return YWHUSDTE.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return YWHUSDTE.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<YWHUSDTE> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isYWHUSDTE(object.type)) {
      throw new Error(`object at id ${id} is not a YWHUSDTE object`)
    }
    return YWHUSDTE.fromBcs(object.content)
  }
}
