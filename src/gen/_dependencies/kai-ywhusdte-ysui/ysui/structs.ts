import { bcs } from '@mysten/sui/bcs'
import { SuiObjectData, SuiParsedData } from '@mysten/sui/client'
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
import {
  composeSuiType,
  compressSuiType,
  fetchObjectBcs,
  FieldsWithTypes,
  SupportedSuiClient,
} from '../../../_framework/util'

/* ============================== YSUI =============================== */

export function isYSUI(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('kai-ywhusdte-ysui', 'ysui::YSUI')}::ysui::YSUI`
}

export interface YSUIFields {
  dummyField: ToField<'bool'>
}

export type YSUIReified = Reified<YSUI, YSUIFields>

export type YSUIJSONField = {
  dummyField: boolean
}

export type YSUIJSON = {
  $typeName: typeof YSUI.$typeName
  $typeArgs: []
} & YSUIJSONField

export class YSUI implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::ysui::YSUI` = `${
    getTypeOrigin('kai-ywhusdte-ysui', 'ysui::YSUI')
  }::ysui::YSUI` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof YSUI.$typeName = YSUI.$typeName
  readonly $fullTypeName: `${string}::ysui::YSUI`
  readonly $typeArgs: []
  readonly $isPhantom: typeof YSUI.$isPhantom = YSUI.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: YSUIFields) {
    this.$fullTypeName = composeSuiType(
      YSUI.$typeName,
      ...typeArgs,
    ) as `${string}::ysui::YSUI`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): YSUIReified {
    const reifiedBcs = YSUI.bcs
    return {
      typeName: YSUI.$typeName,
      fullTypeName: composeSuiType(
        YSUI.$typeName,
        ...[],
      ) as `${string}::ysui::YSUI`,
      typeArgs: [] as [],
      isPhantom: YSUI.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => YSUI.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => YSUI.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => YSUI.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => YSUI.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => YSUI.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => YSUI.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => YSUI.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => YSUI.fetch(client, id),
      new: (fields: YSUIFields) => {
        return new YSUI([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): YSUIReified {
    return YSUI.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<YSUI>> {
    return phantom(YSUI.reified())
  }

  static get p(): PhantomReified<ToTypeStr<YSUI>> {
    return YSUI.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('YSUI', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof YSUI.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof YSUI.instantiateBcs> {
    if (!YSUI.cachedBcs) {
      YSUI.cachedBcs = YSUI.instantiateBcs()
    }
    return YSUI.cachedBcs
  }

  static fromFields(fields: Record<string, any>): YSUI {
    return YSUI.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): YSUI {
    if (!isYSUI(item.type)) {
      throw new Error('not a YSUI type')
    }

    return YSUI.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): YSUI {
    return YSUI.fromFields(YSUI.bcs.parse(data))
  }

  toJSONField(): YSUIJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): YSUIJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): YSUI {
    return YSUI.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): YSUI {
    if (json.$typeName !== YSUI.$typeName) {
      throw new Error(
        `not a YSUI json object: expected '${YSUI.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return YSUI.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): YSUI {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isYSUI(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a YSUI object`)
    }
    return YSUI.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): YSUI {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isYSUI(data.bcs.type)) {
        throw new Error(`object at is not a YSUI object`)
      }

      return YSUI.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return YSUI.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<YSUI> {
    const res = await fetchObjectBcs(client, id)
    if (!isYSUI(res.type)) {
      throw new Error(`object at id ${id} is not a YSUI object`)
    }

    return YSUI.fromBcs(res.bcsBytes)
  }
}
