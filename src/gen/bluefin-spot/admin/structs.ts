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
} from '../../_framework/reified'
import { FieldsWithTypes, composeSuiType, compressSuiType } from '../../_framework/util'
import { UID } from '../../sui/object/structs'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== AdminCap =============================== */

export function isAdminCap(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::admin::AdminCap`
}

export interface AdminCapFields {
  id: ToField<UID>
}

export type AdminCapReified = Reified<AdminCap, AdminCapFields>

export class AdminCap implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::admin::AdminCap`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = AdminCap.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::admin::AdminCap`
  readonly $typeArgs: []
  readonly $isPhantom = AdminCap.$isPhantom

  readonly id: ToField<UID>

  private constructor(typeArgs: [], fields: AdminCapFields) {
    this.$fullTypeName = composeSuiType(
      AdminCap.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::admin::AdminCap`
    this.$typeArgs = typeArgs

    this.id = fields.id
  }

  static reified(): AdminCapReified {
    const reifiedBcs = AdminCap.bcs
    return {
      typeName: AdminCap.$typeName,
      fullTypeName: composeSuiType(
        AdminCap.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::admin::AdminCap`,
      typeArgs: [] as [],
      isPhantom: AdminCap.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AdminCap.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AdminCap.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AdminCap.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AdminCap.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AdminCap.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => AdminCap.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AdminCap.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => AdminCap.fetch(client, id),
      new: (fields: AdminCapFields) => {
        return new AdminCap([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return AdminCap.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AdminCap>> {
    return phantom(AdminCap.reified())
  }
  static get p() {
    return AdminCap.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AdminCap', {
      id: UID.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof AdminCap.instantiateBcs> | null = null

  static get bcs() {
    if (!AdminCap.cachedBcs) {
      AdminCap.cachedBcs = AdminCap.instantiateBcs()
    }
    return AdminCap.cachedBcs
  }

  static fromFields(fields: Record<string, any>): AdminCap {
    return AdminCap.reified().new({ id: decodeFromFields(UID.reified(), fields.id) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): AdminCap {
    if (!isAdminCap(item.type)) {
      throw new Error('not a AdminCap type')
    }

    return AdminCap.reified().new({ id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id) })
  }

  static fromBcs(data: Uint8Array): AdminCap {
    return AdminCap.fromFields(AdminCap.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AdminCap {
    return AdminCap.reified().new({ id: decodeFromJSONField(UID.reified(), field.id) })
  }

  static fromJSON(json: Record<string, any>): AdminCap {
    if (json.$typeName !== AdminCap.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return AdminCap.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): AdminCap {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAdminCap(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AdminCap object`)
    }
    return AdminCap.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): AdminCap {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAdminCap(data.bcs.type)) {
        throw new Error(`object at is not a AdminCap object`)
      }

      return AdminCap.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AdminCap.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<AdminCap> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching AdminCap object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isAdminCap(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a AdminCap object`)
    }

    return AdminCap.fromSuiObjectData(res.data)
  }
}

/* ============================== ProtocolFeeCap =============================== */

export function isProtocolFeeCap(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::admin::ProtocolFeeCap`
}

export interface ProtocolFeeCapFields {
  id: ToField<UID>
}

export type ProtocolFeeCapReified = Reified<ProtocolFeeCap, ProtocolFeeCapFields>

export class ProtocolFeeCap implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::admin::ProtocolFeeCap`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = ProtocolFeeCap.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::admin::ProtocolFeeCap`
  readonly $typeArgs: []
  readonly $isPhantom = ProtocolFeeCap.$isPhantom

  readonly id: ToField<UID>

  private constructor(typeArgs: [], fields: ProtocolFeeCapFields) {
    this.$fullTypeName = composeSuiType(
      ProtocolFeeCap.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::admin::ProtocolFeeCap`
    this.$typeArgs = typeArgs

    this.id = fields.id
  }

  static reified(): ProtocolFeeCapReified {
    const reifiedBcs = ProtocolFeeCap.bcs
    return {
      typeName: ProtocolFeeCap.$typeName,
      fullTypeName: composeSuiType(
        ProtocolFeeCap.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::admin::ProtocolFeeCap`,
      typeArgs: [] as [],
      isPhantom: ProtocolFeeCap.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ProtocolFeeCap.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ProtocolFeeCap.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ProtocolFeeCap.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ProtocolFeeCap.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ProtocolFeeCap.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => ProtocolFeeCap.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ProtocolFeeCap.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => ProtocolFeeCap.fetch(client, id),
      new: (fields: ProtocolFeeCapFields) => {
        return new ProtocolFeeCap([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return ProtocolFeeCap.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ProtocolFeeCap>> {
    return phantom(ProtocolFeeCap.reified())
  }
  static get p() {
    return ProtocolFeeCap.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ProtocolFeeCap', {
      id: UID.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof ProtocolFeeCap.instantiateBcs> | null = null

  static get bcs() {
    if (!ProtocolFeeCap.cachedBcs) {
      ProtocolFeeCap.cachedBcs = ProtocolFeeCap.instantiateBcs()
    }
    return ProtocolFeeCap.cachedBcs
  }

  static fromFields(fields: Record<string, any>): ProtocolFeeCap {
    return ProtocolFeeCap.reified().new({ id: decodeFromFields(UID.reified(), fields.id) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ProtocolFeeCap {
    if (!isProtocolFeeCap(item.type)) {
      throw new Error('not a ProtocolFeeCap type')
    }

    return ProtocolFeeCap.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
    })
  }

  static fromBcs(data: Uint8Array): ProtocolFeeCap {
    return ProtocolFeeCap.fromFields(ProtocolFeeCap.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ProtocolFeeCap {
    return ProtocolFeeCap.reified().new({ id: decodeFromJSONField(UID.reified(), field.id) })
  }

  static fromJSON(json: Record<string, any>): ProtocolFeeCap {
    if (json.$typeName !== ProtocolFeeCap.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return ProtocolFeeCap.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): ProtocolFeeCap {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isProtocolFeeCap(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ProtocolFeeCap object`)
    }
    return ProtocolFeeCap.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): ProtocolFeeCap {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isProtocolFeeCap(data.bcs.type)) {
        throw new Error(`object at is not a ProtocolFeeCap object`)
      }

      return ProtocolFeeCap.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ProtocolFeeCap.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<ProtocolFeeCap> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching ProtocolFeeCap object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isProtocolFeeCap(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a ProtocolFeeCap object`)
    }

    return ProtocolFeeCap.fromSuiObjectData(res.data)
  }
}
