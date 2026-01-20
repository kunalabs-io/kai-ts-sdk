/**
 * Fork @https://github.com/pentagonxyz/movemate.git
 *
 * `acl` is a simple access control module, where `member` represents a member and `role` represents a type
 * of permission. A member can have multiple permissions.
 */

import { bcs } from '@mysten/sui/bcs'
import { SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromBase64, fromHex, toHex } from '@mysten/sui/utils'
import { LinkedTable } from '../../_dependencies/move-stl/linked-table/structs'
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
import {
  composeSuiType,
  compressSuiType,
  fetchObjectBcs,
  FieldsWithTypes,
  SupportedSuiClient,
} from '../../_framework/util'

/* ============================== ACL =============================== */

export function isACL(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('cetus-clmm', 'acl::ACL')}::acl::ACL`
}

export interface ACLFields {
  permissions: ToField<LinkedTable<'address', 'u128'>>
}

export type ACLReified = Reified<ACL, ACLFields>

export type ACLJSONField = {
  permissions: ToJSON<LinkedTable<'address', 'u128'>>
}

export type ACLJSON = {
  $typeName: typeof ACL.$typeName
  $typeArgs: []
} & ACLJSONField

/**
 * ACL (Access Control List) struct that manages permissions for members
 * Contains a mapping of addresses to their permission bitmasks
 * Each bit in the permission bitmask represents a specific role/permission
 * The first 128 bits are available for different roles
 */
export class ACL implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::acl::ACL` = `${
    getTypeOrigin('cetus-clmm', 'acl::ACL')
  }::acl::ACL` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof ACL.$typeName = ACL.$typeName
  readonly $fullTypeName: `${string}::acl::ACL`
  readonly $typeArgs: []
  readonly $isPhantom: typeof ACL.$isPhantom = ACL.$isPhantom

  readonly permissions: ToField<LinkedTable<'address', 'u128'>>

  private constructor(typeArgs: [], fields: ACLFields) {
    this.$fullTypeName = composeSuiType(
      ACL.$typeName,
      ...typeArgs,
    ) as `${string}::acl::ACL`
    this.$typeArgs = typeArgs

    this.permissions = fields.permissions
  }

  static reified(): ACLReified {
    const reifiedBcs = ACL.bcs
    return {
      typeName: ACL.$typeName,
      fullTypeName: composeSuiType(
        ACL.$typeName,
        ...[],
      ) as `${string}::acl::ACL`,
      typeArgs: [] as [],
      isPhantom: ACL.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ACL.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ACL.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ACL.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ACL.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ACL.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => ACL.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ACL.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => ACL.fetch(client, id),
      new: (fields: ACLFields) => {
        return new ACL([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): ACLReified {
    return ACL.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ACL>> {
    return phantom(ACL.reified())
  }

  static get p(): PhantomReified<ToTypeStr<ACL>> {
    return ACL.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ACL', {
      permissions: LinkedTable.bcs(
        bcs.bytes(32).transform({
          input: (val: string) => fromHex(val),
          output: (val: Uint8Array) => toHex(val),
        }),
      ),
    })
  }

  private static cachedBcs: ReturnType<typeof ACL.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof ACL.instantiateBcs> {
    if (!ACL.cachedBcs) {
      ACL.cachedBcs = ACL.instantiateBcs()
    }
    return ACL.cachedBcs
  }

  static fromFields(fields: Record<string, any>): ACL {
    return ACL.reified().new({
      permissions: decodeFromFields(
        LinkedTable.reified('address', phantom('u128')),
        fields.permissions,
      ),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ACL {
    if (!isACL(item.type)) {
      throw new Error('not a ACL type')
    }

    return ACL.reified().new({
      permissions: decodeFromFieldsWithTypes(
        LinkedTable.reified('address', phantom('u128')),
        item.fields.permissions,
      ),
    })
  }

  static fromBcs(data: Uint8Array): ACL {
    return ACL.fromFields(ACL.bcs.parse(data))
  }

  toJSONField(): ACLJSONField {
    return {
      permissions: this.permissions.toJSONField(),
    }
  }

  toJSON(): ACLJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ACL {
    return ACL.reified().new({
      permissions: decodeFromJSONField(
        LinkedTable.reified('address', phantom('u128')),
        field.permissions,
      ),
    })
  }

  static fromJSON(json: Record<string, any>): ACL {
    if (json.$typeName !== ACL.$typeName) {
      throw new Error(
        `not a ACL json object: expected '${ACL.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return ACL.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): ACL {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isACL(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ACL object`)
    }
    return ACL.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): ACL {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isACL(data.bcs.type)) {
        throw new Error(`object at is not a ACL object`)
      }

      return ACL.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ACL.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<ACL> {
    const res = await fetchObjectBcs(client, id)
    if (!isACL(res.type)) {
      throw new Error(`object at id ${id} is not a ACL object`)
    }

    return ACL.fromBcs(res.bcsBytes)
  }
}

/* ============================== Member =============================== */

export function isMember(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('cetus-clmm', 'acl::Member')}::acl::Member`
}

export interface MemberFields {
  address: ToField<'address'>
  permission: ToField<'u128'>
}

export type MemberReified = Reified<Member, MemberFields>

export type MemberJSONField = {
  address: string
  permission: string
}

export type MemberJSON = {
  $typeName: typeof Member.$typeName
  $typeArgs: []
} & MemberJSONField

/**
 * Member struct representing a member in the ACL system
 * * `address` - The address of the member
 * * `permission` - A bitmask of the member's permissions, where each bit represents a specific role
 */
export class Member implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::acl::Member` = `${
    getTypeOrigin('cetus-clmm', 'acl::Member')
  }::acl::Member` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof Member.$typeName = Member.$typeName
  readonly $fullTypeName: `${string}::acl::Member`
  readonly $typeArgs: []
  readonly $isPhantom: typeof Member.$isPhantom = Member.$isPhantom

  readonly address: ToField<'address'>
  readonly permission: ToField<'u128'>

  private constructor(typeArgs: [], fields: MemberFields) {
    this.$fullTypeName = composeSuiType(
      Member.$typeName,
      ...typeArgs,
    ) as `${string}::acl::Member`
    this.$typeArgs = typeArgs

    this.address = fields.address
    this.permission = fields.permission
  }

  static reified(): MemberReified {
    const reifiedBcs = Member.bcs
    return {
      typeName: Member.$typeName,
      fullTypeName: composeSuiType(
        Member.$typeName,
        ...[],
      ) as `${string}::acl::Member`,
      typeArgs: [] as [],
      isPhantom: Member.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Member.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Member.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Member.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Member.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Member.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => Member.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Member.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => Member.fetch(client, id),
      new: (fields: MemberFields) => {
        return new Member([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): MemberReified {
    return Member.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Member>> {
    return phantom(Member.reified())
  }

  static get p(): PhantomReified<ToTypeStr<Member>> {
    return Member.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('Member', {
      address: bcs.bytes(32).transform({
        input: (val: string) => fromHex(val),
        output: (val: Uint8Array) => toHex(val),
      }),
      permission: bcs.u128(),
    })
  }

  private static cachedBcs: ReturnType<typeof Member.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof Member.instantiateBcs> {
    if (!Member.cachedBcs) {
      Member.cachedBcs = Member.instantiateBcs()
    }
    return Member.cachedBcs
  }

  static fromFields(fields: Record<string, any>): Member {
    return Member.reified().new({
      address: decodeFromFields('address', fields.address),
      permission: decodeFromFields('u128', fields.permission),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Member {
    if (!isMember(item.type)) {
      throw new Error('not a Member type')
    }

    return Member.reified().new({
      address: decodeFromFieldsWithTypes('address', item.fields.address),
      permission: decodeFromFieldsWithTypes('u128', item.fields.permission),
    })
  }

  static fromBcs(data: Uint8Array): Member {
    return Member.fromFields(Member.bcs.parse(data))
  }

  toJSONField(): MemberJSONField {
    return {
      address: this.address,
      permission: this.permission.toString(),
    }
  }

  toJSON(): MemberJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Member {
    return Member.reified().new({
      address: decodeFromJSONField('address', field.address),
      permission: decodeFromJSONField('u128', field.permission),
    })
  }

  static fromJSON(json: Record<string, any>): Member {
    if (json.$typeName !== Member.$typeName) {
      throw new Error(
        `not a Member json object: expected '${Member.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return Member.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): Member {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isMember(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Member object`)
    }
    return Member.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): Member {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isMember(data.bcs.type)) {
        throw new Error(`object at is not a Member object`)
      }

      return Member.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Member.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<Member> {
    const res = await fetchObjectBcs(client, id)
    if (!isMember(res.type)) {
      throw new Error(`object at id ${id} is not a Member object`)
    }

    return Member.fromBcs(res.bcsBytes)
  }
}
