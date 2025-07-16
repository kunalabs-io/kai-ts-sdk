import {
  PhantomReified,
  Reified,
  StructClass,
  ToField,
  ToTypeStr,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  phantom,
} from '../../../../_framework/reified'
import { FieldsWithTypes, composeSuiType, compressSuiType } from '../../../../_framework/util'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== BTC =============================== */

export function isBTC(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::btc::BTC`
}

export interface BTCFields {
  dummyField: ToField<'bool'>
}

export type BTCReified = Reified<BTC, BTCFields>

export class BTC implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::btc::BTC`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = BTC.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::btc::BTC`
  readonly $typeArgs: []
  readonly $isPhantom = BTC.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: BTCFields) {
    this.$fullTypeName = composeSuiType(BTC.$typeName, ...typeArgs) as `${typeof PKG_V1}::btc::BTC`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): BTCReified {
    return {
      typeName: BTC.$typeName,
      fullTypeName: composeSuiType(BTC.$typeName, ...[]) as `${typeof PKG_V1}::btc::BTC`,
      typeArgs: [] as [],
      isPhantom: BTC.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => BTC.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => BTC.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => BTC.fromBcs(data),
      bcs: BTC.bcs,
      fromJSONField: (field: any) => BTC.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => BTC.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => BTC.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => BTC.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => BTC.fetch(client, id),
      new: (fields: BTCFields) => {
        return new BTC([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return BTC.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<BTC>> {
    return phantom(BTC.reified())
  }
  static get p() {
    return BTC.phantom()
  }

  static get bcs() {
    return bcs.struct('BTC', {
      dummy_field: bcs.bool(),
    })
  }

  static fromFields(fields: Record<string, any>): BTC {
    return BTC.reified().new({ dummyField: decodeFromFields('bool', fields.dummy_field) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): BTC {
    if (!isBTC(item.type)) {
      throw new Error('not a BTC type')
    }

    return BTC.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): BTC {
    return BTC.fromFields(BTC.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): BTC {
    return BTC.reified().new({ dummyField: decodeFromJSONField('bool', field.dummyField) })
  }

  static fromJSON(json: Record<string, any>): BTC {
    if (json.$typeName !== BTC.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return BTC.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): BTC {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isBTC(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a BTC object`)
    }
    return BTC.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): BTC {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isBTC(data.bcs.type)) {
        throw new Error(`object at is not a BTC object`)
      }

      return BTC.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return BTC.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<BTC> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching BTC object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isBTC(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a BTC object`)
    }

    return BTC.fromSuiObjectData(res.data)
  }
}
