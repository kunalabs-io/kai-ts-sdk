/** Access management initialization for the Kai Leverage package */

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

/* ============================== ACCESS_INIT =============================== */

export function isACCESS_INIT(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('kai-leverage', 'access_init::ACCESS_INIT')}::access_init::ACCESS_INIT`
}

export interface ACCESS_INITFields {
  dummyField: ToField<'bool'>
}

export type ACCESS_INITReified = Reified<ACCESS_INIT, ACCESS_INITFields>

export type ACCESS_INITJSONField = {
  dummyField: boolean
}

export type ACCESS_INITJSON = {
  $typeName: typeof ACCESS_INIT.$typeName
  $typeArgs: []
} & ACCESS_INITJSONField

export class ACCESS_INIT implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::access_init::ACCESS_INIT` = `${
    getTypeOrigin('kai-leverage', 'access_init::ACCESS_INIT')
  }::access_init::ACCESS_INIT` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof ACCESS_INIT.$typeName = ACCESS_INIT.$typeName
  readonly $fullTypeName: `${string}::access_init::ACCESS_INIT`
  readonly $typeArgs: []
  readonly $isPhantom: typeof ACCESS_INIT.$isPhantom = ACCESS_INIT.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: ACCESS_INITFields) {
    this.$fullTypeName = composeSuiType(
      ACCESS_INIT.$typeName,
      ...typeArgs,
    ) as `${string}::access_init::ACCESS_INIT`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): ACCESS_INITReified {
    const reifiedBcs = ACCESS_INIT.bcs
    return {
      typeName: ACCESS_INIT.$typeName,
      fullTypeName: composeSuiType(
        ACCESS_INIT.$typeName,
        ...[],
      ) as `${string}::access_init::ACCESS_INIT`,
      typeArgs: [] as [],
      isPhantom: ACCESS_INIT.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ACCESS_INIT.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ACCESS_INIT.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ACCESS_INIT.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ACCESS_INIT.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ACCESS_INIT.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => ACCESS_INIT.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ACCESS_INIT.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => ACCESS_INIT.fetch(client, id),
      new: (fields: ACCESS_INITFields) => {
        return new ACCESS_INIT([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): ACCESS_INITReified {
    return ACCESS_INIT.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ACCESS_INIT>> {
    return phantom(ACCESS_INIT.reified())
  }

  static get p(): PhantomReified<ToTypeStr<ACCESS_INIT>> {
    return ACCESS_INIT.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ACCESS_INIT', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof ACCESS_INIT.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof ACCESS_INIT.instantiateBcs> {
    if (!ACCESS_INIT.cachedBcs) {
      ACCESS_INIT.cachedBcs = ACCESS_INIT.instantiateBcs()
    }
    return ACCESS_INIT.cachedBcs
  }

  static fromFields(fields: Record<string, any>): ACCESS_INIT {
    return ACCESS_INIT.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ACCESS_INIT {
    if (!isACCESS_INIT(item.type)) {
      throw new Error('not a ACCESS_INIT type')
    }

    return ACCESS_INIT.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): ACCESS_INIT {
    return ACCESS_INIT.fromFields(ACCESS_INIT.bcs.parse(data))
  }

  toJSONField(): ACCESS_INITJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): ACCESS_INITJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ACCESS_INIT {
    return ACCESS_INIT.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): ACCESS_INIT {
    if (json.$typeName !== ACCESS_INIT.$typeName) {
      throw new Error(
        `not a ACCESS_INIT json object: expected '${ACCESS_INIT.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return ACCESS_INIT.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): ACCESS_INIT {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isACCESS_INIT(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ACCESS_INIT object`)
    }
    return ACCESS_INIT.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): ACCESS_INIT {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isACCESS_INIT(data.bcs.type)) {
        throw new Error(`object at is not a ACCESS_INIT object`)
      }

      return ACCESS_INIT.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ACCESS_INIT.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<ACCESS_INIT> {
    const res = await fetchObjectBcs(client, id)
    if (!isACCESS_INIT(res.type)) {
      throw new Error(`object at id ${id} is not a ACCESS_INIT object`)
    }

    return ACCESS_INIT.fromBcs(res.bcsBytes)
  }
}
