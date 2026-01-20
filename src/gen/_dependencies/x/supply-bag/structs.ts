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
import { Bag } from '../../../sui/bag/structs'
import { UID } from '../../../sui/object/structs'

/* ============================== SupplyBag =============================== */

export function isSupplyBag(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('x', 'supply_bag::SupplyBag')}::supply_bag::SupplyBag`
}

export interface SupplyBagFields {
  id: ToField<UID>
  bag: ToField<Bag>
}

export type SupplyBagReified = Reified<SupplyBag, SupplyBagFields>

export type SupplyBagJSONField = {
  id: string
  bag: ToJSON<Bag>
}

export type SupplyBagJSON = {
  $typeName: typeof SupplyBag.$typeName
  $typeArgs: []
} & SupplyBagJSONField

export class SupplyBag implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::supply_bag::SupplyBag` = `${
    getTypeOrigin('x', 'supply_bag::SupplyBag')
  }::supply_bag::SupplyBag` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof SupplyBag.$typeName = SupplyBag.$typeName
  readonly $fullTypeName: `${string}::supply_bag::SupplyBag`
  readonly $typeArgs: []
  readonly $isPhantom: typeof SupplyBag.$isPhantom = SupplyBag.$isPhantom

  readonly id: ToField<UID>
  readonly bag: ToField<Bag>

  private constructor(typeArgs: [], fields: SupplyBagFields) {
    this.$fullTypeName = composeSuiType(
      SupplyBag.$typeName,
      ...typeArgs,
    ) as `${string}::supply_bag::SupplyBag`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.bag = fields.bag
  }

  static reified(): SupplyBagReified {
    const reifiedBcs = SupplyBag.bcs
    return {
      typeName: SupplyBag.$typeName,
      fullTypeName: composeSuiType(
        SupplyBag.$typeName,
        ...[],
      ) as `${string}::supply_bag::SupplyBag`,
      typeArgs: [] as [],
      isPhantom: SupplyBag.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => SupplyBag.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => SupplyBag.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => SupplyBag.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => SupplyBag.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => SupplyBag.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => SupplyBag.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => SupplyBag.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => SupplyBag.fetch(client, id),
      new: (fields: SupplyBagFields) => {
        return new SupplyBag([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): SupplyBagReified {
    return SupplyBag.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<SupplyBag>> {
    return phantom(SupplyBag.reified())
  }

  static get p(): PhantomReified<ToTypeStr<SupplyBag>> {
    return SupplyBag.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('SupplyBag', {
      id: UID.bcs,
      bag: Bag.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof SupplyBag.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof SupplyBag.instantiateBcs> {
    if (!SupplyBag.cachedBcs) {
      SupplyBag.cachedBcs = SupplyBag.instantiateBcs()
    }
    return SupplyBag.cachedBcs
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

  toJSONField(): SupplyBagJSONField {
    return {
      id: this.id,
      bag: this.bag.toJSONField(),
    }
  }

  toJSON(): SupplyBagJSON {
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
      throw new Error(
        `not a SupplyBag json object: expected '${SupplyBag.$typeName}' but got '${json.$typeName}'`,
      )
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

      return SupplyBag.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return SupplyBag.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<SupplyBag> {
    const res = await fetchObjectBcs(client, id)
    if (!isSupplyBag(res.type)) {
      throw new Error(`object at id ${id} is not a SupplyBag object`)
    }

    return SupplyBag.fromBcs(res.bcsBytes)
  }
}
