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
import { Bag } from '../../../../sui/bag/structs'
import { UID } from '../../../../sui/object/structs'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== SupplyBag =============================== */

export function isSupplyBag(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::supply_bag::SupplyBag`
}

export interface SupplyBagFields {
  id: ToField<UID>
  bag: ToField<Bag>
}

export type SupplyBagReified = Reified<SupplyBag, SupplyBagFields>

export class SupplyBag implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::supply_bag::SupplyBag`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = SupplyBag.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::supply_bag::SupplyBag`
  readonly $typeArgs: []
  readonly $isPhantom = SupplyBag.$isPhantom

  readonly id: ToField<UID>
  readonly bag: ToField<Bag>

  private constructor(typeArgs: [], fields: SupplyBagFields) {
    this.$fullTypeName = composeSuiType(
      SupplyBag.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::supply_bag::SupplyBag`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.bag = fields.bag
  }

  static reified(): SupplyBagReified {
    return {
      typeName: SupplyBag.$typeName,
      fullTypeName: composeSuiType(
        SupplyBag.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::supply_bag::SupplyBag`,
      typeArgs: [] as [],
      isPhantom: SupplyBag.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => SupplyBag.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => SupplyBag.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => SupplyBag.fromBcs(data),
      bcs: SupplyBag.bcs,
      fromJSONField: (field: any) => SupplyBag.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => SupplyBag.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => SupplyBag.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => SupplyBag.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => SupplyBag.fetch(client, id),
      new: (fields: SupplyBagFields) => {
        return new SupplyBag([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return SupplyBag.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<SupplyBag>> {
    return phantom(SupplyBag.reified())
  }
  static get p() {
    return SupplyBag.phantom()
  }

  static get bcs() {
    return bcs.struct('SupplyBag', {
      id: UID.bcs,
      bag: Bag.bcs,
    })
  }

  static fromFields(fields: Record<string, any>): SupplyBag {
    return SupplyBag.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      bag: decodeFromFields(Bag.reified(), fields.bag),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): SupplyBag {
    if (!isSupplyBag(item.type)) {
      throw new Error('not a SupplyBag type')
    }

    return SupplyBag.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      bag: decodeFromFieldsWithTypes(Bag.reified(), item.fields.bag),
    })
  }

  static fromBcs(data: Uint8Array): SupplyBag {
    return SupplyBag.fromFields(SupplyBag.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      bag: this.bag.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): SupplyBag {
    return SupplyBag.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      bag: decodeFromJSONField(Bag.reified(), field.bag),
    })
  }

  static fromJSON(json: Record<string, any>): SupplyBag {
    if (json.$typeName !== SupplyBag.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return SupplyBag.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): SupplyBag {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isSupplyBag(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a SupplyBag object`)
    }
    return SupplyBag.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): SupplyBag {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isSupplyBag(data.bcs.type)) {
        throw new Error(`object at is not a SupplyBag object`)
      }

      return SupplyBag.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return SupplyBag.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<SupplyBag> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching SupplyBag object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isSupplyBag(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a SupplyBag object`)
    }

    return SupplyBag.fromSuiObjectData(res.data)
  }
}
