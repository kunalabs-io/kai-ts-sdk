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

/* ============================== BalanceBag =============================== */

export function isBalanceBag(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('x', 'balance_bag::BalanceBag')}::balance_bag::BalanceBag`
}

export interface BalanceBagFields {
  id: ToField<UID>
  bag: ToField<Bag>
}

export type BalanceBagReified = Reified<BalanceBag, BalanceBagFields>

export type BalanceBagJSONField = {
  id: string
  bag: ToJSON<Bag>
}

export type BalanceBagJSON = {
  $typeName: typeof BalanceBag.$typeName
  $typeArgs: []
} & BalanceBagJSONField

export class BalanceBag implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::balance_bag::BalanceBag` = `${
    getTypeOrigin('x', 'balance_bag::BalanceBag')
  }::balance_bag::BalanceBag` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof BalanceBag.$typeName = BalanceBag.$typeName
  readonly $fullTypeName: `${string}::balance_bag::BalanceBag`
  readonly $typeArgs: []
  readonly $isPhantom: typeof BalanceBag.$isPhantom = BalanceBag.$isPhantom

  readonly id: ToField<UID>
  readonly bag: ToField<Bag>

  private constructor(typeArgs: [], fields: BalanceBagFields) {
    this.$fullTypeName = composeSuiType(
      BalanceBag.$typeName,
      ...typeArgs,
    ) as `${string}::balance_bag::BalanceBag`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.bag = fields.bag
  }

  static reified(): BalanceBagReified {
    const reifiedBcs = BalanceBag.bcs
    return {
      typeName: BalanceBag.$typeName,
      fullTypeName: composeSuiType(
        BalanceBag.$typeName,
        ...[],
      ) as `${string}::balance_bag::BalanceBag`,
      typeArgs: [] as [],
      isPhantom: BalanceBag.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => BalanceBag.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => BalanceBag.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => BalanceBag.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => BalanceBag.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => BalanceBag.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => BalanceBag.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => BalanceBag.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => BalanceBag.fetch(client, id),
      new: (fields: BalanceBagFields) => {
        return new BalanceBag([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): BalanceBagReified {
    return BalanceBag.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<BalanceBag>> {
    return phantom(BalanceBag.reified())
  }

  static get p(): PhantomReified<ToTypeStr<BalanceBag>> {
    return BalanceBag.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('BalanceBag', {
      id: UID.bcs,
      bag: Bag.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof BalanceBag.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof BalanceBag.instantiateBcs> {
    if (!BalanceBag.cachedBcs) {
      BalanceBag.cachedBcs = BalanceBag.instantiateBcs()
    }
    return BalanceBag.cachedBcs
  }

  static fromFields(fields: Record<string, any>): BalanceBag {
    return BalanceBag.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      bag: decodeFromFields(Bag.reified(), fields.bag),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): BalanceBag {
    if (!isBalanceBag(item.type)) {
      throw new Error('not a BalanceBag type')
    }

    return BalanceBag.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      bag: decodeFromFieldsWithTypes(Bag.reified(), item.fields.bag),
    })
  }

  static fromBcs(data: Uint8Array): BalanceBag {
    return BalanceBag.fromFields(BalanceBag.bcs.parse(data))
  }

  toJSONField(): BalanceBagJSONField {
    return {
      id: this.id,
      bag: this.bag.toJSONField(),
    }
  }

  toJSON(): BalanceBagJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): BalanceBag {
    return BalanceBag.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      bag: decodeFromJSONField(Bag.reified(), field.bag),
    })
  }

  static fromJSON(json: Record<string, any>): BalanceBag {
    if (json.$typeName !== BalanceBag.$typeName) {
      throw new Error(
        `not a BalanceBag json object: expected '${BalanceBag.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return BalanceBag.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): BalanceBag {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isBalanceBag(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a BalanceBag object`)
    }
    return BalanceBag.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): BalanceBag {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isBalanceBag(data.bcs.type)) {
        throw new Error(`object at is not a BalanceBag object`)
      }

      return BalanceBag.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return BalanceBag.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<BalanceBag> {
    const res = await fetchObjectBcs(client, id)
    if (!isBalanceBag(res.type)) {
      throw new Error(`object at id ${id} is not a BalanceBag object`)
    }

    return BalanceBag.fromBcs(res.bcsBytes)
  }
}
