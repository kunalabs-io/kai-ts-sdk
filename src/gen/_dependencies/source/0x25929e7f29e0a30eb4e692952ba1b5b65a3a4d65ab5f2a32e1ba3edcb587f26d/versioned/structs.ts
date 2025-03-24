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
import { UID } from '../../../../sui/object/structs'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== Upgraded =============================== */

export function isUpgraded(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::versioned::Upgraded`
}

export interface UpgradedFields {
  previousVersion: ToField<'u64'>
  newVersion: ToField<'u64'>
}

export type UpgradedReified = Reified<Upgraded, UpgradedFields>

export class Upgraded implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::versioned::Upgraded`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = Upgraded.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::versioned::Upgraded`
  readonly $typeArgs: []
  readonly $isPhantom = Upgraded.$isPhantom

  readonly previousVersion: ToField<'u64'>
  readonly newVersion: ToField<'u64'>

  private constructor(typeArgs: [], fields: UpgradedFields) {
    this.$fullTypeName = composeSuiType(
      Upgraded.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::versioned::Upgraded`
    this.$typeArgs = typeArgs

    this.previousVersion = fields.previousVersion
    this.newVersion = fields.newVersion
  }

  static reified(): UpgradedReified {
    return {
      typeName: Upgraded.$typeName,
      fullTypeName: composeSuiType(
        Upgraded.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::versioned::Upgraded`,
      typeArgs: [] as [],
      isPhantom: Upgraded.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Upgraded.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Upgraded.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Upgraded.fromBcs(data),
      bcs: Upgraded.bcs,
      fromJSONField: (field: any) => Upgraded.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Upgraded.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => Upgraded.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Upgraded.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => Upgraded.fetch(client, id),
      new: (fields: UpgradedFields) => {
        return new Upgraded([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return Upgraded.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Upgraded>> {
    return phantom(Upgraded.reified())
  }
  static get p() {
    return Upgraded.phantom()
  }

  static get bcs() {
    return bcs.struct('Upgraded', {
      previous_version: bcs.u64(),
      new_version: bcs.u64(),
    })
  }

  static fromFields(fields: Record<string, any>): Upgraded {
    return Upgraded.reified().new({
      previousVersion: decodeFromFields('u64', fields.previous_version),
      newVersion: decodeFromFields('u64', fields.new_version),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Upgraded {
    if (!isUpgraded(item.type)) {
      throw new Error('not a Upgraded type')
    }

    return Upgraded.reified().new({
      previousVersion: decodeFromFieldsWithTypes('u64', item.fields.previous_version),
      newVersion: decodeFromFieldsWithTypes('u64', item.fields.new_version),
    })
  }

  static fromBcs(data: Uint8Array): Upgraded {
    return Upgraded.fromFields(Upgraded.bcs.parse(data))
  }

  toJSONField() {
    return {
      previousVersion: this.previousVersion.toString(),
      newVersion: this.newVersion.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Upgraded {
    return Upgraded.reified().new({
      previousVersion: decodeFromJSONField('u64', field.previousVersion),
      newVersion: decodeFromJSONField('u64', field.newVersion),
    })
  }

  static fromJSON(json: Record<string, any>): Upgraded {
    if (json.$typeName !== Upgraded.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return Upgraded.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): Upgraded {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isUpgraded(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Upgraded object`)
    }
    return Upgraded.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): Upgraded {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isUpgraded(data.bcs.type)) {
        throw new Error(`object at is not a Upgraded object`)
      }

      return Upgraded.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Upgraded.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<Upgraded> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching Upgraded object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isUpgraded(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Upgraded object`)
    }

    return Upgraded.fromSuiObjectData(res.data)
  }
}

/* ============================== Versioned =============================== */

export function isVersioned(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::versioned::Versioned`
}

export interface VersionedFields {
  id: ToField<UID>
  version: ToField<'u64'>
}

export type VersionedReified = Reified<Versioned, VersionedFields>

export class Versioned implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::versioned::Versioned`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = Versioned.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::versioned::Versioned`
  readonly $typeArgs: []
  readonly $isPhantom = Versioned.$isPhantom

  readonly id: ToField<UID>
  readonly version: ToField<'u64'>

  private constructor(typeArgs: [], fields: VersionedFields) {
    this.$fullTypeName = composeSuiType(
      Versioned.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::versioned::Versioned`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.version = fields.version
  }

  static reified(): VersionedReified {
    return {
      typeName: Versioned.$typeName,
      fullTypeName: composeSuiType(
        Versioned.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::versioned::Versioned`,
      typeArgs: [] as [],
      isPhantom: Versioned.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Versioned.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Versioned.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Versioned.fromBcs(data),
      bcs: Versioned.bcs,
      fromJSONField: (field: any) => Versioned.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Versioned.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => Versioned.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Versioned.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => Versioned.fetch(client, id),
      new: (fields: VersionedFields) => {
        return new Versioned([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return Versioned.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Versioned>> {
    return phantom(Versioned.reified())
  }
  static get p() {
    return Versioned.phantom()
  }

  static get bcs() {
    return bcs.struct('Versioned', {
      id: UID.bcs,
      version: bcs.u64(),
    })
  }

  static fromFields(fields: Record<string, any>): Versioned {
    return Versioned.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      version: decodeFromFields('u64', fields.version),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Versioned {
    if (!isVersioned(item.type)) {
      throw new Error('not a Versioned type')
    }

    return Versioned.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      version: decodeFromFieldsWithTypes('u64', item.fields.version),
    })
  }

  static fromBcs(data: Uint8Array): Versioned {
    return Versioned.fromFields(Versioned.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      version: this.version.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Versioned {
    return Versioned.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      version: decodeFromJSONField('u64', field.version),
    })
  }

  static fromJSON(json: Record<string, any>): Versioned {
    if (json.$typeName !== Versioned.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return Versioned.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): Versioned {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isVersioned(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Versioned object`)
    }
    return Versioned.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): Versioned {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isVersioned(data.bcs.type)) {
        throw new Error(`object at is not a Versioned object`)
      }

      return Versioned.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Versioned.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<Versioned> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching Versioned object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isVersioned(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Versioned object`)
    }

    return Versioned.fromSuiObjectData(res.data)
  }
}
