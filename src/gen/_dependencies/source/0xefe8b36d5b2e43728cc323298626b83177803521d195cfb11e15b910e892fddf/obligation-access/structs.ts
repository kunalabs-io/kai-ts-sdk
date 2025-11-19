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
import { TypeName } from '../../../../move-stdlib/type-name/structs'
import { UID } from '../../../../sui/object/structs'
import { VecSet } from '../../../../sui/vec-set/structs'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== ObligationAccessStore =============================== */

export function isObligationAccessStore(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::obligation_access::ObligationAccessStore`
}

export interface ObligationAccessStoreFields {
  id: ToField<UID>
  lockKeys: ToField<VecSet<TypeName>>
  rewardKeys: ToField<VecSet<TypeName>>
}

export type ObligationAccessStoreReified = Reified<
  ObligationAccessStore,
  ObligationAccessStoreFields
>

export class ObligationAccessStore implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::obligation_access::ObligationAccessStore`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = ObligationAccessStore.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::obligation_access::ObligationAccessStore`
  readonly $typeArgs: []
  readonly $isPhantom = ObligationAccessStore.$isPhantom

  readonly id: ToField<UID>
  readonly lockKeys: ToField<VecSet<TypeName>>
  readonly rewardKeys: ToField<VecSet<TypeName>>

  private constructor(typeArgs: [], fields: ObligationAccessStoreFields) {
    this.$fullTypeName = composeSuiType(
      ObligationAccessStore.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::obligation_access::ObligationAccessStore`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.lockKeys = fields.lockKeys
    this.rewardKeys = fields.rewardKeys
  }

  static reified(): ObligationAccessStoreReified {
    const reifiedBcs = ObligationAccessStore.bcs
    return {
      typeName: ObligationAccessStore.$typeName,
      fullTypeName: composeSuiType(
        ObligationAccessStore.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::obligation_access::ObligationAccessStore`,
      typeArgs: [] as [],
      isPhantom: ObligationAccessStore.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ObligationAccessStore.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        ObligationAccessStore.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ObligationAccessStore.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ObligationAccessStore.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ObligationAccessStore.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        ObligationAccessStore.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        ObligationAccessStore.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => ObligationAccessStore.fetch(client, id),
      new: (fields: ObligationAccessStoreFields) => {
        return new ObligationAccessStore([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return ObligationAccessStore.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ObligationAccessStore>> {
    return phantom(ObligationAccessStore.reified())
  }
  static get p() {
    return ObligationAccessStore.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ObligationAccessStore', {
      id: UID.bcs,
      lock_keys: VecSet.bcs(TypeName.bcs),
      reward_keys: VecSet.bcs(TypeName.bcs),
    })
  }

  private static cachedBcs: ReturnType<typeof ObligationAccessStore.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof ObligationAccessStore.instantiateBcs> {
    if (!ObligationAccessStore.cachedBcs) {
      ObligationAccessStore.cachedBcs = ObligationAccessStore.instantiateBcs()
    }
    return ObligationAccessStore.cachedBcs
  }

  static fromFields(fields: Record<string, any>): ObligationAccessStore {
    return ObligationAccessStore.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      lockKeys: decodeFromFields(VecSet.reified(TypeName.reified()), fields.lock_keys),
      rewardKeys: decodeFromFields(VecSet.reified(TypeName.reified()), fields.reward_keys),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ObligationAccessStore {
    if (!isObligationAccessStore(item.type)) {
      throw new Error('not a ObligationAccessStore type')
    }

    return ObligationAccessStore.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      lockKeys: decodeFromFieldsWithTypes(
        VecSet.reified(TypeName.reified()),
        item.fields.lock_keys
      ),
      rewardKeys: decodeFromFieldsWithTypes(
        VecSet.reified(TypeName.reified()),
        item.fields.reward_keys
      ),
    })
  }

  static fromBcs(data: Uint8Array): ObligationAccessStore {
    return ObligationAccessStore.fromFields(ObligationAccessStore.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      lockKeys: this.lockKeys.toJSONField(),
      rewardKeys: this.rewardKeys.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ObligationAccessStore {
    return ObligationAccessStore.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      lockKeys: decodeFromJSONField(VecSet.reified(TypeName.reified()), field.lockKeys),
      rewardKeys: decodeFromJSONField(VecSet.reified(TypeName.reified()), field.rewardKeys),
    })
  }

  static fromJSON(json: Record<string, any>): ObligationAccessStore {
    if (json.$typeName !== ObligationAccessStore.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return ObligationAccessStore.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): ObligationAccessStore {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isObligationAccessStore(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a ObligationAccessStore object`
      )
    }
    return ObligationAccessStore.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): ObligationAccessStore {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isObligationAccessStore(data.bcs.type)) {
        throw new Error(`object at is not a ObligationAccessStore object`)
      }

      return ObligationAccessStore.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ObligationAccessStore.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<ObligationAccessStore> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching ObligationAccessStore object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isObligationAccessStore(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a ObligationAccessStore object`)
    }

    return ObligationAccessStore.fromSuiObjectData(res.data)
  }
}
