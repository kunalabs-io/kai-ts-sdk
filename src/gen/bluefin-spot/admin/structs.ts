import { bcs } from '@mysten/sui/bcs'
import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import type { SuiObjectData, SuiParsedData } from '@mysten/sui/jsonRpc'
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
import { composeSuiType, compressSuiType, FieldsWithTypes } from '../../_framework/util'
import { UID } from '../../sui/object/structs'

/* ============================== AdminCap =============================== */

export function isAdminCap(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('bluefin-spot', 'admin::AdminCap')}::admin::AdminCap`
}

export interface AdminCapFields {
  id: ToField<UID>
}

export type AdminCapReified = Reified<AdminCap, AdminCapFields>

export type AdminCapJSONField = {
  id: string
}

export type AdminCapJSON = {
  $typeName: typeof AdminCap.$typeName
  $typeArgs: []
} & AdminCapJSONField

/** The holder of the cap is the admin of the protocol */
export class AdminCap implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::admin::AdminCap` {
    return `${getTypeOrigin('bluefin-spot', 'admin::AdminCap')}::admin::AdminCap` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof AdminCap.$typeName = AdminCap.$typeName
  readonly $fullTypeName: `${string}::admin::AdminCap`
  readonly $typeArgs: []
  readonly $isPhantom: typeof AdminCap.$isPhantom = AdminCap.$isPhantom

  readonly id: ToField<UID>

  private constructor(typeArgs: [], fields: AdminCapFields) {
    this.$fullTypeName = composeSuiType(
      AdminCap.$typeName,
      ...typeArgs,
    ) as `${string}::admin::AdminCap`
    this.$typeArgs = typeArgs

    this.id = fields.id
  }

  static reified(): AdminCapReified {
    const reifiedBcs = AdminCap.bcs
    return {
      get typeName() {
        return AdminCap.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          AdminCap.$typeName,
          ...[],
        ) as `${string}::admin::AdminCap`
      },
      typeArgs: [] as [],
      isPhantom: AdminCap.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AdminCap.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AdminCap.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AdminCap.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AdminCap.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AdminCap.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        AdminCap.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => AdminCap.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AdminCap.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => AdminCap.fetch(client, id),
      new: (fields: AdminCapFields) => {
        return new AdminCap([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): AdminCapReified {
    return AdminCap.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AdminCap>> {
    return phantom(AdminCap.reified())
  }

  static get p(): PhantomReified<ToTypeStr<AdminCap>> {
    return AdminCap.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AdminCap', {
      id: UID.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof AdminCap.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof AdminCap.instantiateBcs> {
    if (!AdminCap.cachedBcs) {
      AdminCap.cachedBcs = AdminCap.instantiateBcs()
    }
    return AdminCap.cachedBcs
  }

  static fromFields(fields: Record<string, any>): AdminCap {
    return AdminCap.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): AdminCap {
    if (!isAdminCap(item.type)) {
      throw new Error('not a AdminCap type')
    }

    return AdminCap.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
    })
  }

  static fromBcs(data: Uint8Array): AdminCap {
    return AdminCap.fromFields(AdminCap.bcs.parse(data))
  }

  toJSONField(): AdminCapJSONField {
    return {
      id: this.id,
    }
  }

  toJSON(): AdminCapJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AdminCap {
    return AdminCap.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
    })
  }

  static fromJSON(json: Record<string, any>): AdminCap {
    if (json.$typeName !== AdminCap.$typeName) {
      throw new Error(
        `not a AdminCap json object: expected '${AdminCap.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return AdminCap.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): AdminCap {
    if (!isAdminCap(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a AdminCap object`)
    }
    return AdminCap.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AdminCap.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): AdminCap {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAdminCap(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AdminCap object`)
    }
    return AdminCap.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AdminCap.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): AdminCap {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAdminCap(data.bcs.type)) {
        throw new Error(`object at is not a AdminCap object`)
      }

      return AdminCap.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AdminCap.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<AdminCap> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isAdminCap(object.type)) {
      throw new Error(`object at id ${id} is not a AdminCap object`)
    }
    return AdminCap.fromBcs(object.content)
  }
}

/* ============================== ProtocolFeeCap =============================== */

export function isProtocolFeeCap(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('bluefin-spot', 'admin::ProtocolFeeCap')}::admin::ProtocolFeeCap`
}

export interface ProtocolFeeCapFields {
  id: ToField<UID>
}

export type ProtocolFeeCapReified = Reified<ProtocolFeeCap, ProtocolFeeCapFields>

export type ProtocolFeeCapJSONField = {
  id: string
}

export type ProtocolFeeCapJSON = {
  $typeName: typeof ProtocolFeeCap.$typeName
  $typeArgs: []
} & ProtocolFeeCapJSONField

/** The holder of the cap can withdraw protocol fee from the pools */
export class ProtocolFeeCap implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::admin::ProtocolFeeCap` {
    return `${
      getTypeOrigin('bluefin-spot', 'admin::ProtocolFeeCap')
    }::admin::ProtocolFeeCap` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof ProtocolFeeCap.$typeName = ProtocolFeeCap.$typeName
  readonly $fullTypeName: `${string}::admin::ProtocolFeeCap`
  readonly $typeArgs: []
  readonly $isPhantom: typeof ProtocolFeeCap.$isPhantom = ProtocolFeeCap.$isPhantom

  readonly id: ToField<UID>

  private constructor(typeArgs: [], fields: ProtocolFeeCapFields) {
    this.$fullTypeName = composeSuiType(
      ProtocolFeeCap.$typeName,
      ...typeArgs,
    ) as `${string}::admin::ProtocolFeeCap`
    this.$typeArgs = typeArgs

    this.id = fields.id
  }

  static reified(): ProtocolFeeCapReified {
    const reifiedBcs = ProtocolFeeCap.bcs
    return {
      get typeName() {
        return ProtocolFeeCap.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          ProtocolFeeCap.$typeName,
          ...[],
        ) as `${string}::admin::ProtocolFeeCap`
      },
      typeArgs: [] as [],
      isPhantom: ProtocolFeeCap.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ProtocolFeeCap.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ProtocolFeeCap.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ProtocolFeeCap.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ProtocolFeeCap.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ProtocolFeeCap.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        ProtocolFeeCap.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => ProtocolFeeCap.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ProtocolFeeCap.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => ProtocolFeeCap.fetch(client, id),
      new: (fields: ProtocolFeeCapFields) => {
        return new ProtocolFeeCap([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): ProtocolFeeCapReified {
    return ProtocolFeeCap.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ProtocolFeeCap>> {
    return phantom(ProtocolFeeCap.reified())
  }

  static get p(): PhantomReified<ToTypeStr<ProtocolFeeCap>> {
    return ProtocolFeeCap.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ProtocolFeeCap', {
      id: UID.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof ProtocolFeeCap.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof ProtocolFeeCap.instantiateBcs> {
    if (!ProtocolFeeCap.cachedBcs) {
      ProtocolFeeCap.cachedBcs = ProtocolFeeCap.instantiateBcs()
    }
    return ProtocolFeeCap.cachedBcs
  }

  static fromFields(fields: Record<string, any>): ProtocolFeeCap {
    return ProtocolFeeCap.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
    })
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

  toJSONField(): ProtocolFeeCapJSONField {
    return {
      id: this.id,
    }
  }

  toJSON(): ProtocolFeeCapJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ProtocolFeeCap {
    return ProtocolFeeCap.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
    })
  }

  static fromJSON(json: Record<string, any>): ProtocolFeeCap {
    if (json.$typeName !== ProtocolFeeCap.$typeName) {
      throw new Error(
        `not a ProtocolFeeCap json object: expected '${ProtocolFeeCap.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return ProtocolFeeCap.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): ProtocolFeeCap {
    if (!isProtocolFeeCap(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a ProtocolFeeCap object`)
    }
    return ProtocolFeeCap.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ProtocolFeeCap.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): ProtocolFeeCap {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isProtocolFeeCap(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ProtocolFeeCap object`)
    }
    return ProtocolFeeCap.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ProtocolFeeCap.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): ProtocolFeeCap {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isProtocolFeeCap(data.bcs.type)) {
        throw new Error(`object at is not a ProtocolFeeCap object`)
      }

      return ProtocolFeeCap.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ProtocolFeeCap.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<ProtocolFeeCap> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isProtocolFeeCap(object.type)) {
      throw new Error(`object at id ${id} is not a ProtocolFeeCap object`)
    }
    return ProtocolFeeCap.fromBcs(object.content)
  }
}
