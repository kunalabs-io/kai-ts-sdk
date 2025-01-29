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

/* ============================== NormalizedAmount =============================== */

export function isNormalizedAmount(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::normalized_amount::NormalizedAmount`
}

export interface NormalizedAmountFields {
  value: ToField<'u64'>
}

export type NormalizedAmountReified = Reified<NormalizedAmount, NormalizedAmountFields>

export class NormalizedAmount implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::normalized_amount::NormalizedAmount`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = NormalizedAmount.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::normalized_amount::NormalizedAmount`
  readonly $typeArgs: []
  readonly $isPhantom = NormalizedAmount.$isPhantom

  readonly value: ToField<'u64'>

  private constructor(typeArgs: [], fields: NormalizedAmountFields) {
    this.$fullTypeName = composeSuiType(
      NormalizedAmount.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::normalized_amount::NormalizedAmount`
    this.$typeArgs = typeArgs

    this.value = fields.value
  }

  static reified(): NormalizedAmountReified {
    return {
      typeName: NormalizedAmount.$typeName,
      fullTypeName: composeSuiType(
        NormalizedAmount.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::normalized_amount::NormalizedAmount`,
      typeArgs: [] as [],
      isPhantom: NormalizedAmount.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => NormalizedAmount.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => NormalizedAmount.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => NormalizedAmount.fromBcs(data),
      bcs: NormalizedAmount.bcs,
      fromJSONField: (field: any) => NormalizedAmount.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => NormalizedAmount.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => NormalizedAmount.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => NormalizedAmount.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => NormalizedAmount.fetch(client, id),
      new: (fields: NormalizedAmountFields) => {
        return new NormalizedAmount([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return NormalizedAmount.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<NormalizedAmount>> {
    return phantom(NormalizedAmount.reified())
  }
  static get p() {
    return NormalizedAmount.phantom()
  }

  static get bcs() {
    return bcs.struct('NormalizedAmount', {
      value: bcs.u64(),
    })
  }

  static fromFields(fields: Record<string, any>): NormalizedAmount {
    return NormalizedAmount.reified().new({ value: decodeFromFields('u64', fields.value) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): NormalizedAmount {
    if (!isNormalizedAmount(item.type)) {
      throw new Error('not a NormalizedAmount type')
    }

    return NormalizedAmount.reified().new({
      value: decodeFromFieldsWithTypes('u64', item.fields.value),
    })
  }

  static fromBcs(data: Uint8Array): NormalizedAmount {
    return NormalizedAmount.fromFields(NormalizedAmount.bcs.parse(data))
  }

  toJSONField() {
    return {
      value: this.value.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): NormalizedAmount {
    return NormalizedAmount.reified().new({ value: decodeFromJSONField('u64', field.value) })
  }

  static fromJSON(json: Record<string, any>): NormalizedAmount {
    if (json.$typeName !== NormalizedAmount.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return NormalizedAmount.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): NormalizedAmount {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isNormalizedAmount(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a NormalizedAmount object`)
    }
    return NormalizedAmount.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): NormalizedAmount {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isNormalizedAmount(data.bcs.type)) {
        throw new Error(`object at is not a NormalizedAmount object`)
      }

      return NormalizedAmount.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return NormalizedAmount.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<NormalizedAmount> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching NormalizedAmount object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isNormalizedAmount(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a NormalizedAmount object`)
    }

    return NormalizedAmount.fromSuiObjectData(res.data)
  }
}
