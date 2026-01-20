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

/* ============================== COIN =============================== */

export function isCOIN(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('whusdte', 'coin::COIN')}::coin::COIN`
}

export interface COINFields {
  dummyField: ToField<'bool'>
}

export type COINReified = Reified<COIN, COINFields>

export type COINJSONField = {
  dummyField: boolean
}

export type COINJSON = {
  $typeName: typeof COIN.$typeName
  $typeArgs: []
} & COINJSONField

export class COIN implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::coin::COIN` = `${
    getTypeOrigin('whusdte', 'coin::COIN')
  }::coin::COIN` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof COIN.$typeName = COIN.$typeName
  readonly $fullTypeName: `${string}::coin::COIN`
  readonly $typeArgs: []
  readonly $isPhantom: typeof COIN.$isPhantom = COIN.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: COINFields) {
    this.$fullTypeName = composeSuiType(
      COIN.$typeName,
      ...typeArgs,
    ) as `${string}::coin::COIN`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): COINReified {
    const reifiedBcs = COIN.bcs
    return {
      typeName: COIN.$typeName,
      fullTypeName: composeSuiType(
        COIN.$typeName,
        ...[],
      ) as `${string}::coin::COIN`,
      typeArgs: [] as [],
      isPhantom: COIN.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => COIN.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => COIN.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => COIN.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => COIN.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => COIN.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => COIN.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => COIN.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => COIN.fetch(client, id),
      new: (fields: COINFields) => {
        return new COIN([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): COINReified {
    return COIN.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<COIN>> {
    return phantom(COIN.reified())
  }

  static get p(): PhantomReified<ToTypeStr<COIN>> {
    return COIN.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('COIN', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof COIN.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof COIN.instantiateBcs> {
    if (!COIN.cachedBcs) {
      COIN.cachedBcs = COIN.instantiateBcs()
    }
    return COIN.cachedBcs
  }

  static fromFields(fields: Record<string, any>): COIN {
    return COIN.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): COIN {
    if (!isCOIN(item.type)) {
      throw new Error('not a COIN type')
    }

    return COIN.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): COIN {
    return COIN.fromFields(COIN.bcs.parse(data))
  }

  toJSONField(): COINJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): COINJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): COIN {
    return COIN.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): COIN {
    if (json.$typeName !== COIN.$typeName) {
      throw new Error(
        `not a COIN json object: expected '${COIN.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return COIN.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): COIN {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isCOIN(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a COIN object`)
    }
    return COIN.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): COIN {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isCOIN(data.bcs.type)) {
        throw new Error(`object at is not a COIN object`)
      }

      return COIN.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return COIN.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<COIN> {
    const res = await fetchObjectBcs(client, id)
    if (!isCOIN(res.type)) {
      throw new Error(`object at id ${id} is not a COIN object`)
    }

    return COIN.fromBcs(res.bcsBytes)
  }
}
