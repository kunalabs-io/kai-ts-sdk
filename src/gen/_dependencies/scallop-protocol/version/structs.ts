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
import { UID } from '../../../sui/object/structs'

/* ============================== Version =============================== */

export function isVersion(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('scallop-protocol', 'version::Version')}::version::Version`
}

export interface VersionFields {
  id: ToField<UID>
  value: ToField<'u64'>
}

export type VersionReified = Reified<Version, VersionFields>

export type VersionJSONField = {
  id: string
  value: string
}

export type VersionJSON = {
  $typeName: typeof Version.$typeName
  $typeArgs: []
} & VersionJSONField

export class Version implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::version::Version` = `${
    getTypeOrigin('scallop-protocol', 'version::Version')
  }::version::Version` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof Version.$typeName = Version.$typeName
  readonly $fullTypeName: `${string}::version::Version`
  readonly $typeArgs: []
  readonly $isPhantom: typeof Version.$isPhantom = Version.$isPhantom

  readonly id: ToField<UID>
  readonly value: ToField<'u64'>

  private constructor(typeArgs: [], fields: VersionFields) {
    this.$fullTypeName = composeSuiType(
      Version.$typeName,
      ...typeArgs,
    ) as `${string}::version::Version`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.value = fields.value
  }

  static reified(): VersionReified {
    const reifiedBcs = Version.bcs
    return {
      typeName: Version.$typeName,
      fullTypeName: composeSuiType(
        Version.$typeName,
        ...[],
      ) as `${string}::version::Version`,
      typeArgs: [] as [],
      isPhantom: Version.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Version.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Version.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Version.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Version.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Version.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => Version.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Version.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => Version.fetch(client, id),
      new: (fields: VersionFields) => {
        return new Version([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): VersionReified {
    return Version.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Version>> {
    return phantom(Version.reified())
  }

  static get p(): PhantomReified<ToTypeStr<Version>> {
    return Version.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('Version', {
      id: UID.bcs,
      value: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof Version.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof Version.instantiateBcs> {
    if (!Version.cachedBcs) {
      Version.cachedBcs = Version.instantiateBcs()
    }
    return Version.cachedBcs
  }

  static fromFields(fields: Record<string, any>): Version {
    return Version.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      value: decodeFromFields('u64', fields.value),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Version {
    if (!isVersion(item.type)) {
      throw new Error('not a Version type')
    }

    return Version.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      value: decodeFromFieldsWithTypes('u64', item.fields.value),
    })
  }

  static fromBcs(data: Uint8Array): Version {
    return Version.fromFields(Version.bcs.parse(data))
  }

  toJSONField(): VersionJSONField {
    return {
      id: this.id,
      value: this.value.toString(),
    }
  }

  toJSON(): VersionJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Version {
    return Version.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      value: decodeFromJSONField('u64', field.value),
    })
  }

  static fromJSON(json: Record<string, any>): Version {
    if (json.$typeName !== Version.$typeName) {
      throw new Error(
        `not a Version json object: expected '${Version.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return Version.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): Version {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isVersion(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Version object`)
    }
    return Version.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): Version {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isVersion(data.bcs.type)) {
        throw new Error(`object at is not a Version object`)
      }

      return Version.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Version.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<Version> {
    const res = await fetchObjectBcs(client, id)
    if (!isVersion(res.type)) {
      throw new Error(`object at id ${id} is not a Version object`)
    }

    return Version.fromBcs(res.bcsBytes)
  }
}

/* ============================== VersionCap =============================== */

export function isVersionCap(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('scallop-protocol', 'version::VersionCap')}::version::VersionCap`
}

export interface VersionCapFields {
  id: ToField<UID>
}

export type VersionCapReified = Reified<VersionCap, VersionCapFields>

export type VersionCapJSONField = {
  id: string
}

export type VersionCapJSON = {
  $typeName: typeof VersionCap.$typeName
  $typeArgs: []
} & VersionCapJSONField

export class VersionCap implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::version::VersionCap` = `${
    getTypeOrigin('scallop-protocol', 'version::VersionCap')
  }::version::VersionCap` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof VersionCap.$typeName = VersionCap.$typeName
  readonly $fullTypeName: `${string}::version::VersionCap`
  readonly $typeArgs: []
  readonly $isPhantom: typeof VersionCap.$isPhantom = VersionCap.$isPhantom

  readonly id: ToField<UID>

  private constructor(typeArgs: [], fields: VersionCapFields) {
    this.$fullTypeName = composeSuiType(
      VersionCap.$typeName,
      ...typeArgs,
    ) as `${string}::version::VersionCap`
    this.$typeArgs = typeArgs

    this.id = fields.id
  }

  static reified(): VersionCapReified {
    const reifiedBcs = VersionCap.bcs
    return {
      typeName: VersionCap.$typeName,
      fullTypeName: composeSuiType(
        VersionCap.$typeName,
        ...[],
      ) as `${string}::version::VersionCap`,
      typeArgs: [] as [],
      isPhantom: VersionCap.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => VersionCap.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => VersionCap.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => VersionCap.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => VersionCap.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => VersionCap.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => VersionCap.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => VersionCap.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => VersionCap.fetch(client, id),
      new: (fields: VersionCapFields) => {
        return new VersionCap([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): VersionCapReified {
    return VersionCap.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<VersionCap>> {
    return phantom(VersionCap.reified())
  }

  static get p(): PhantomReified<ToTypeStr<VersionCap>> {
    return VersionCap.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('VersionCap', {
      id: UID.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof VersionCap.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof VersionCap.instantiateBcs> {
    if (!VersionCap.cachedBcs) {
      VersionCap.cachedBcs = VersionCap.instantiateBcs()
    }
    return VersionCap.cachedBcs
  }

  static fromFields(fields: Record<string, any>): VersionCap {
    return VersionCap.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): VersionCap {
    if (!isVersionCap(item.type)) {
      throw new Error('not a VersionCap type')
    }

    return VersionCap.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
    })
  }

  static fromBcs(data: Uint8Array): VersionCap {
    return VersionCap.fromFields(VersionCap.bcs.parse(data))
  }

  toJSONField(): VersionCapJSONField {
    return {
      id: this.id,
    }
  }

  toJSON(): VersionCapJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): VersionCap {
    return VersionCap.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
    })
  }

  static fromJSON(json: Record<string, any>): VersionCap {
    if (json.$typeName !== VersionCap.$typeName) {
      throw new Error(
        `not a VersionCap json object: expected '${VersionCap.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return VersionCap.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): VersionCap {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isVersionCap(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a VersionCap object`)
    }
    return VersionCap.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): VersionCap {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isVersionCap(data.bcs.type)) {
        throw new Error(`object at is not a VersionCap object`)
      }

      return VersionCap.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return VersionCap.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<VersionCap> {
    const res = await fetchObjectBcs(client, id)
    if (!isVersionCap(res.type)) {
      throw new Error(`object at id ${id} is not a VersionCap object`)
    }

    return VersionCap.fromBcs(res.bcsBytes)
  }
}
