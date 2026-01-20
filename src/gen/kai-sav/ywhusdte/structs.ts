/**
 * NOTE: This module is deprecated. It was added in an upgrade which means that
 * the init function wasn't called. The related `TreasuryCap` was never created
 * and so wasn't the `Vault`.
 * The corrected package was published at `0xb8dc843a816b51992ee10d2ddc6d28aab4f0a1d651cd7289a7897902eb631613`.
 */

import { bcs } from '@mysten/sui/bcs'
import { SuiObjectData, SuiParsedData } from '@mysten/sui/client'
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
import {
  composeSuiType,
  compressSuiType,
  fetchObjectBcs,
  FieldsWithTypes,
  SupportedSuiClient,
} from '../../_framework/util'

/* ============================== YWHUSDTE =============================== */

export function isYWHUSDTE(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('kai-sav', 'ywhusdte::YWHUSDTE')}::ywhusdte::YWHUSDTE`
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

  static readonly $typeName: `${string}::ywhusdte::YWHUSDTE` = `${
    getTypeOrigin('kai-sav', 'ywhusdte::YWHUSDTE')
  }::ywhusdte::YWHUSDTE` as const
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
      typeName: YWHUSDTE.$typeName,
      fullTypeName: composeSuiType(
        YWHUSDTE.$typeName,
        ...[],
      ) as `${string}::ywhusdte::YWHUSDTE`,
      typeArgs: [] as [],
      isPhantom: YWHUSDTE.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => YWHUSDTE.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => YWHUSDTE.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => YWHUSDTE.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => YWHUSDTE.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => YWHUSDTE.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => YWHUSDTE.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => YWHUSDTE.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => YWHUSDTE.fetch(client, id),
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

  static fromSuiParsedData(content: SuiParsedData): YWHUSDTE {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isYWHUSDTE(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a YWHUSDTE object`)
    }
    return YWHUSDTE.fromFieldsWithTypes(content)
  }

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

  static async fetch(client: SupportedSuiClient, id: string): Promise<YWHUSDTE> {
    const res = await fetchObjectBcs(client, id)
    if (!isYWHUSDTE(res.type)) {
      throw new Error(`object at id ${id} is not a YWHUSDTE object`)
    }

    return YWHUSDTE.fromBcs(res.bcsBytes)
  }
}
