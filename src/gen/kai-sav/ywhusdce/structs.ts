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

/* ============================== YWHUSDCE =============================== */

export function isYWHUSDCE(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('kai-sav', 'ywhusdce::YWHUSDCE')}::ywhusdce::YWHUSDCE`
}

export interface YWHUSDCEFields {
  dummyField: ToField<'bool'>
}

export type YWHUSDCEReified = Reified<YWHUSDCE, YWHUSDCEFields>

export type YWHUSDCEJSONField = {
  dummyField: boolean
}

export type YWHUSDCEJSON = {
  $typeName: typeof YWHUSDCE.$typeName
  $typeArgs: []
} & YWHUSDCEJSONField

export class YWHUSDCE implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::ywhusdce::YWHUSDCE` = `${
    getTypeOrigin('kai-sav', 'ywhusdce::YWHUSDCE')
  }::ywhusdce::YWHUSDCE` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof YWHUSDCE.$typeName = YWHUSDCE.$typeName
  readonly $fullTypeName: `${string}::ywhusdce::YWHUSDCE`
  readonly $typeArgs: []
  readonly $isPhantom: typeof YWHUSDCE.$isPhantom = YWHUSDCE.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: YWHUSDCEFields) {
    this.$fullTypeName = composeSuiType(
      YWHUSDCE.$typeName,
      ...typeArgs,
    ) as `${string}::ywhusdce::YWHUSDCE`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): YWHUSDCEReified {
    const reifiedBcs = YWHUSDCE.bcs
    return {
      typeName: YWHUSDCE.$typeName,
      fullTypeName: composeSuiType(
        YWHUSDCE.$typeName,
        ...[],
      ) as `${string}::ywhusdce::YWHUSDCE`,
      typeArgs: [] as [],
      isPhantom: YWHUSDCE.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => YWHUSDCE.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => YWHUSDCE.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => YWHUSDCE.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => YWHUSDCE.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => YWHUSDCE.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => YWHUSDCE.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => YWHUSDCE.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => YWHUSDCE.fetch(client, id),
      new: (fields: YWHUSDCEFields) => {
        return new YWHUSDCE([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): YWHUSDCEReified {
    return YWHUSDCE.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<YWHUSDCE>> {
    return phantom(YWHUSDCE.reified())
  }

  static get p(): PhantomReified<ToTypeStr<YWHUSDCE>> {
    return YWHUSDCE.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('YWHUSDCE', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof YWHUSDCE.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof YWHUSDCE.instantiateBcs> {
    if (!YWHUSDCE.cachedBcs) {
      YWHUSDCE.cachedBcs = YWHUSDCE.instantiateBcs()
    }
    return YWHUSDCE.cachedBcs
  }

  static fromFields(fields: Record<string, any>): YWHUSDCE {
    return YWHUSDCE.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): YWHUSDCE {
    if (!isYWHUSDCE(item.type)) {
      throw new Error('not a YWHUSDCE type')
    }

    return YWHUSDCE.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): YWHUSDCE {
    return YWHUSDCE.fromFields(YWHUSDCE.bcs.parse(data))
  }

  toJSONField(): YWHUSDCEJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): YWHUSDCEJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): YWHUSDCE {
    return YWHUSDCE.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): YWHUSDCE {
    if (json.$typeName !== YWHUSDCE.$typeName) {
      throw new Error(
        `not a YWHUSDCE json object: expected '${YWHUSDCE.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return YWHUSDCE.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): YWHUSDCE {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isYWHUSDCE(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a YWHUSDCE object`)
    }
    return YWHUSDCE.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): YWHUSDCE {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isYWHUSDCE(data.bcs.type)) {
        throw new Error(`object at is not a YWHUSDCE object`)
      }

      return YWHUSDCE.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return YWHUSDCE.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<YWHUSDCE> {
    const res = await fetchObjectBcs(client, id)
    if (!isYWHUSDCE(res.type)) {
      throw new Error(`object at id ${id} is not a YWHUSDCE object`)
    }

    return YWHUSDCE.fromBcs(res.bcsBytes)
  }
}
