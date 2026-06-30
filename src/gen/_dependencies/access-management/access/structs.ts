/**
 * Access Management module for Sui packages.
 * Provides fine-grained, configurable permissions using PackageAdmin, Policy, Rule, and ActionRequest.
 */

import { bcs, BcsType } from '@mysten/sui/bcs'
import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import type { SuiObjectData, SuiParsedData } from '@mysten/sui/jsonRpc'
import { fromBase64, fromHex, toHex } from '@mysten/sui/utils'
import { getTypeOrigin } from '../../../_envs'
import {
  assertFieldsWithTypesArgsMatch,
  assertReifiedTypeArgsMatch,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  extractType,
  fieldToJSON,
  phantom,
  PhantomReified,
  PhantomToTypeStr,
  PhantomTypeArgument,
  Reified,
  StructClass,
  toBcs,
  ToField,
  ToJSON,
  ToPhantomTypeArgument,
  ToTypeArgument,
  ToTypeStr,
  ToTypeStr as ToPhantom,
  TypeArgument,
} from '../../../_framework/reified'
import {
  composeSuiType,
  compressSuiType,
  FieldsWithTypes,
  parseTypeName,
} from '../../../_framework/util'
import { String } from '../../../std/ascii/structs'
import { TypeName } from '../../../std/type-name/structs'
import { ID, UID } from '../../../sui/object/structs'
import { VecMap } from '../../../sui/vec-map/structs'
import { VecSet } from '../../../sui/vec-set/structs'
import { DynamicMap } from '../dynamic-map/structs'

/* ============================== PackageAdmin =============================== */

export function isPackageAdmin(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('access-management', 'access::PackageAdmin')}::access::PackageAdmin`
}

export interface PackageAdminFields {
  id: ToField<UID>
  /** The address string of the package that this admin is for. */
  package: ToField<String>
}

export type PackageAdminReified = Reified<PackageAdmin, PackageAdminFields>

export type PackageAdminJSONField = {
  id: string
  package: string
}

export type PackageAdminJSON = {
  $typeName: typeof PackageAdmin.$typeName
  $typeArgs: []
} & PackageAdminJSONField

/** Represents the administrator for a specific package. */
export class PackageAdmin implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::access::PackageAdmin` {
    return `${
      getTypeOrigin('access-management', 'access::PackageAdmin')
    }::access::PackageAdmin` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof PackageAdmin.$typeName = PackageAdmin.$typeName
  readonly $fullTypeName: `${string}::access::PackageAdmin`
  readonly $typeArgs: []
  readonly $isPhantom: typeof PackageAdmin.$isPhantom = PackageAdmin.$isPhantom

  readonly id: ToField<UID>
  /** The address string of the package that this admin is for. */
  readonly package: ToField<String>

  private constructor(typeArgs: [], fields: PackageAdminFields) {
    this.$fullTypeName = composeSuiType(
      PackageAdmin.$typeName,
      ...typeArgs,
    ) as `${string}::access::PackageAdmin`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.package = fields.package
  }

  static reified(): PackageAdminReified {
    const reifiedBcs = PackageAdmin.bcs
    return {
      get typeName() {
        return PackageAdmin.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          PackageAdmin.$typeName,
          ...[],
        ) as `${string}::access::PackageAdmin`
      },
      typeArgs: [] as [],
      isPhantom: PackageAdmin.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PackageAdmin.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PackageAdmin.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PackageAdmin.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PackageAdmin.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PackageAdmin.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        PackageAdmin.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => PackageAdmin.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PackageAdmin.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => PackageAdmin.fetch(client, id),
      new: (fields: PackageAdminFields) => {
        return new PackageAdmin([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): PackageAdminReified {
    return PackageAdmin.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PackageAdmin>> {
    return phantom(PackageAdmin.reified())
  }

  static get p(): PhantomReified<ToTypeStr<PackageAdmin>> {
    return PackageAdmin.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('PackageAdmin', {
      id: UID.bcs,
      package: String.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof PackageAdmin.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof PackageAdmin.instantiateBcs> {
    if (!PackageAdmin.cachedBcs) {
      PackageAdmin.cachedBcs = PackageAdmin.instantiateBcs()
    }
    return PackageAdmin.cachedBcs
  }

  static fromFields(fields: Record<string, any>): PackageAdmin {
    return PackageAdmin.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      package: decodeFromFields(String.reified(), fields.package),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PackageAdmin {
    if (!isPackageAdmin(item.type)) {
      throw new Error('not a PackageAdmin type')
    }

    return PackageAdmin.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      package: decodeFromFieldsWithTypes(String.reified(), item.fields.package),
    })
  }

  static fromBcs(data: Uint8Array): PackageAdmin {
    return PackageAdmin.fromFields(PackageAdmin.bcs.parse(data))
  }

  toJSONField(): PackageAdminJSONField {
    return {
      id: this.id,
      package: this.package,
    }
  }

  toJSON(): PackageAdminJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PackageAdmin {
    return PackageAdmin.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      package: decodeFromJSONField(String.reified(), field.package),
    })
  }

  static fromJSON(json: Record<string, any>): PackageAdmin {
    if (json.$typeName !== PackageAdmin.$typeName) {
      throw new Error(
        `not a PackageAdmin json object: expected '${PackageAdmin.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return PackageAdmin.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): PackageAdmin {
    if (!isPackageAdmin(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a PackageAdmin object`)
    }
    return PackageAdmin.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link PackageAdmin.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): PackageAdmin {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPackageAdmin(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PackageAdmin object`)
    }
    return PackageAdmin.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link PackageAdmin.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): PackageAdmin {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPackageAdmin(data.bcs.type)) {
        throw new Error(`object at is not a PackageAdmin object`)
      }

      return PackageAdmin.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PackageAdmin.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<PackageAdmin> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isPackageAdmin(object.type)) {
      throw new Error(`object at id ${id} is not a PackageAdmin object`)
    }
    return PackageAdmin.fromBcs(object.content)
  }
}

/* ============================== Entity =============================== */

export function isEntity(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('access-management', 'access::Entity')}::access::Entity`
}

export interface EntityFields {
  id: ToField<UID>
}

export type EntityReified = Reified<Entity, EntityFields>

export type EntityJSONField = {
  id: string
}

export type EntityJSON = {
  $typeName: typeof Entity.$typeName
  $typeArgs: []
} & EntityJSONField

/** Represents an entity that can be granted permissions in a policy. */
export class Entity implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::access::Entity` {
    return `${getTypeOrigin('access-management', 'access::Entity')}::access::Entity` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof Entity.$typeName = Entity.$typeName
  readonly $fullTypeName: `${string}::access::Entity`
  readonly $typeArgs: []
  readonly $isPhantom: typeof Entity.$isPhantom = Entity.$isPhantom

  readonly id: ToField<UID>

  private constructor(typeArgs: [], fields: EntityFields) {
    this.$fullTypeName = composeSuiType(
      Entity.$typeName,
      ...typeArgs,
    ) as `${string}::access::Entity`
    this.$typeArgs = typeArgs

    this.id = fields.id
  }

  static reified(): EntityReified {
    const reifiedBcs = Entity.bcs
    return {
      get typeName() {
        return Entity.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          Entity.$typeName,
          ...[],
        ) as `${string}::access::Entity`
      },
      typeArgs: [] as [],
      isPhantom: Entity.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Entity.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Entity.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Entity.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Entity.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Entity.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => Entity.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => Entity.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Entity.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => Entity.fetch(client, id),
      new: (fields: EntityFields) => {
        return new Entity([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): EntityReified {
    return Entity.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Entity>> {
    return phantom(Entity.reified())
  }

  static get p(): PhantomReified<ToTypeStr<Entity>> {
    return Entity.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('Entity', {
      id: UID.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof Entity.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof Entity.instantiateBcs> {
    if (!Entity.cachedBcs) {
      Entity.cachedBcs = Entity.instantiateBcs()
    }
    return Entity.cachedBcs
  }

  static fromFields(fields: Record<string, any>): Entity {
    return Entity.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Entity {
    if (!isEntity(item.type)) {
      throw new Error('not a Entity type')
    }

    return Entity.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
    })
  }

  static fromBcs(data: Uint8Array): Entity {
    return Entity.fromFields(Entity.bcs.parse(data))
  }

  toJSONField(): EntityJSONField {
    return {
      id: this.id,
    }
  }

  toJSON(): EntityJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Entity {
    return Entity.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
    })
  }

  static fromJSON(json: Record<string, any>): Entity {
    if (json.$typeName !== Entity.$typeName) {
      throw new Error(
        `not a Entity json object: expected '${Entity.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return Entity.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): Entity {
    if (!isEntity(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a Entity object`)
    }
    return Entity.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Entity.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): Entity {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isEntity(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Entity object`)
    }
    return Entity.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Entity.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): Entity {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isEntity(data.bcs.type)) {
        throw new Error(`object at is not a Entity object`)
      }

      return Entity.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Entity.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<Entity> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isEntity(object.type)) {
      throw new Error(`object at id ${id} is not a Entity object`)
    }
    return Entity.fromBcs(object.content)
  }
}

/* ============================== Rule =============================== */

export function isRule(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('access-management', 'access::Rule')}::access::Rule`
}

export interface RuleFields {
  /** The set of action type names that are allowed by this rule. */
  actions: ToField<VecSet<TypeName>>
  /** Conditions that must be met for the actions to be allowed. */
  conditions: ToField<VecSet<TypeName>>
  /** A dynamic map from condition type name to its configuration for this rule. */
  conditionConfigs: ToField<DynamicMap<ToPhantom<TypeName>>>
}

export type RuleReified = Reified<Rule, RuleFields>

export type RuleJSONField = {
  actions: ToJSON<VecSet<TypeName>>
  conditions: ToJSON<VecSet<TypeName>>
  conditionConfigs: ToJSON<DynamicMap<ToPhantom<TypeName>>>
}

export type RuleJSON = {
  $typeName: typeof Rule.$typeName
  $typeArgs: []
} & RuleJSONField

/** Represents a rule within a policy, specifying allowed actions and required conditions. */
export class Rule implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::access::Rule` {
    return `${getTypeOrigin('access-management', 'access::Rule')}::access::Rule` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof Rule.$typeName = Rule.$typeName
  readonly $fullTypeName: `${string}::access::Rule`
  readonly $typeArgs: []
  readonly $isPhantom: typeof Rule.$isPhantom = Rule.$isPhantom

  /** The set of action type names that are allowed by this rule. */
  readonly actions: ToField<VecSet<TypeName>>
  /** Conditions that must be met for the actions to be allowed. */
  readonly conditions: ToField<VecSet<TypeName>>
  /** A dynamic map from condition type name to its configuration for this rule. */
  readonly conditionConfigs: ToField<DynamicMap<ToPhantom<TypeName>>>

  private constructor(typeArgs: [], fields: RuleFields) {
    this.$fullTypeName = composeSuiType(
      Rule.$typeName,
      ...typeArgs,
    ) as `${string}::access::Rule`
    this.$typeArgs = typeArgs

    this.actions = fields.actions
    this.conditions = fields.conditions
    this.conditionConfigs = fields.conditionConfigs
  }

  static reified(): RuleReified {
    const reifiedBcs = Rule.bcs
    return {
      get typeName() {
        return Rule.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          Rule.$typeName,
          ...[],
        ) as `${string}::access::Rule`
      },
      typeArgs: [] as [],
      isPhantom: Rule.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Rule.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Rule.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Rule.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Rule.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Rule.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => Rule.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => Rule.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Rule.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => Rule.fetch(client, id),
      new: (fields: RuleFields) => {
        return new Rule([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): RuleReified {
    return Rule.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Rule>> {
    return phantom(Rule.reified())
  }

  static get p(): PhantomReified<ToTypeStr<Rule>> {
    return Rule.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('Rule', {
      actions: VecSet.bcs(TypeName.bcs),
      conditions: VecSet.bcs(TypeName.bcs),
      condition_configs: DynamicMap.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof Rule.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof Rule.instantiateBcs> {
    if (!Rule.cachedBcs) {
      Rule.cachedBcs = Rule.instantiateBcs()
    }
    return Rule.cachedBcs
  }

  static fromFields(fields: Record<string, any>): Rule {
    return Rule.reified().new({
      actions: decodeFromFields(VecSet.reified(TypeName.reified()), fields.actions),
      conditions: decodeFromFields(VecSet.reified(TypeName.reified()), fields.conditions),
      conditionConfigs: decodeFromFields(
        DynamicMap.reified(phantom(TypeName.reified())),
        fields.condition_configs,
      ),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Rule {
    if (!isRule(item.type)) {
      throw new Error('not a Rule type')
    }

    return Rule.reified().new({
      actions: decodeFromFieldsWithTypes(VecSet.reified(TypeName.reified()), item.fields.actions),
      conditions: decodeFromFieldsWithTypes(
        VecSet.reified(TypeName.reified()),
        item.fields.conditions,
      ),
      conditionConfigs: decodeFromFieldsWithTypes(
        DynamicMap.reified(phantom(TypeName.reified())),
        item.fields.condition_configs,
      ),
    })
  }

  static fromBcs(data: Uint8Array): Rule {
    return Rule.fromFields(Rule.bcs.parse(data))
  }

  toJSONField(): RuleJSONField {
    return {
      actions: this.actions.toJSONField(),
      conditions: this.conditions.toJSONField(),
      conditionConfigs: this.conditionConfigs.toJSONField(),
    }
  }

  toJSON(): RuleJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Rule {
    return Rule.reified().new({
      actions: decodeFromJSONField(VecSet.reified(TypeName.reified()), field.actions),
      conditions: decodeFromJSONField(VecSet.reified(TypeName.reified()), field.conditions),
      conditionConfigs: decodeFromJSONField(
        DynamicMap.reified(phantom(TypeName.reified())),
        field.conditionConfigs,
      ),
    })
  }

  static fromJSON(json: Record<string, any>): Rule {
    if (json.$typeName !== Rule.$typeName) {
      throw new Error(
        `not a Rule json object: expected '${Rule.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return Rule.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): Rule {
    if (!isRule(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a Rule object`)
    }
    return Rule.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Rule.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): Rule {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRule(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Rule object`)
    }
    return Rule.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Rule.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): Rule {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRule(data.bcs.type)) {
        throw new Error(`object at is not a Rule object`)
      }

      return Rule.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Rule.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<Rule> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isRule(object.type)) {
      throw new Error(`object at id ${id} is not a Rule object`)
    }
    return Rule.fromBcs(object.content)
  }
}

/* ============================== Policy =============================== */

export function isPolicy(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('access-management', 'access::Policy')}::access::Policy`
}

export interface PolicyFields {
  id: ToField<UID>
  /** The address string of the package this policy applies to. */
  package: ToField<String>
  /** The set of entity IDs that are allowed by this policy. */
  allowedEntities: ToField<VecSet<ID>>
  /** A mapping from rule ID (address) to the corresponding rule definition. */
  rules: ToField<VecMap<'address', Rule>>
  /** Indicates whether the policy is currently enabled. */
  enabled: ToField<'bool'>
  /** The version of the policy, used for upgrade and compatibility checks. */
  version: ToField<'u16'>
}

export type PolicyReified = Reified<Policy, PolicyFields>

export type PolicyJSONField = {
  id: string
  package: string
  allowedEntities: ToJSON<VecSet<ID>>
  rules: ToJSON<VecMap<'address', Rule>>
  enabled: boolean
  version: number
}

export type PolicyJSON = {
  $typeName: typeof Policy.$typeName
  $typeArgs: []
} & PolicyJSONField

/**
 * Represents an access control policy for a package, specifying which entities are allowed,
 * the rules governing actions, and the policy's status and version.
 */
export class Policy implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::access::Policy` {
    return `${getTypeOrigin('access-management', 'access::Policy')}::access::Policy` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof Policy.$typeName = Policy.$typeName
  readonly $fullTypeName: `${string}::access::Policy`
  readonly $typeArgs: []
  readonly $isPhantom: typeof Policy.$isPhantom = Policy.$isPhantom

  readonly id: ToField<UID>
  /** The address string of the package this policy applies to. */
  readonly package: ToField<String>
  /** The set of entity IDs that are allowed by this policy. */
  readonly allowedEntities: ToField<VecSet<ID>>
  /** A mapping from rule ID (address) to the corresponding rule definition. */
  readonly rules: ToField<VecMap<'address', Rule>>
  /** Indicates whether the policy is currently enabled. */
  readonly enabled: ToField<'bool'>
  /** The version of the policy, used for upgrade and compatibility checks. */
  readonly version: ToField<'u16'>

  private constructor(typeArgs: [], fields: PolicyFields) {
    this.$fullTypeName = composeSuiType(
      Policy.$typeName,
      ...typeArgs,
    ) as `${string}::access::Policy`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.package = fields.package
    this.allowedEntities = fields.allowedEntities
    this.rules = fields.rules
    this.enabled = fields.enabled
    this.version = fields.version
  }

  static reified(): PolicyReified {
    const reifiedBcs = Policy.bcs
    return {
      get typeName() {
        return Policy.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          Policy.$typeName,
          ...[],
        ) as `${string}::access::Policy`
      },
      typeArgs: [] as [],
      isPhantom: Policy.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Policy.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Policy.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Policy.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Policy.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Policy.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => Policy.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => Policy.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Policy.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => Policy.fetch(client, id),
      new: (fields: PolicyFields) => {
        return new Policy([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): PolicyReified {
    return Policy.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Policy>> {
    return phantom(Policy.reified())
  }

  static get p(): PhantomReified<ToTypeStr<Policy>> {
    return Policy.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('Policy', {
      id: UID.bcs,
      package: String.bcs,
      allowed_entities: VecSet.bcs(ID.bcs),
      rules: VecMap.bcs(
        bcs.bytes(32).transform({
          input: (val: string) => fromHex(val),
          output: (val: Uint8Array) => toHex(val),
        }),
        Rule.bcs,
      ),
      enabled: bcs.bool(),
      version: bcs.u16(),
    })
  }

  private static cachedBcs: ReturnType<typeof Policy.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof Policy.instantiateBcs> {
    if (!Policy.cachedBcs) {
      Policy.cachedBcs = Policy.instantiateBcs()
    }
    return Policy.cachedBcs
  }

  static fromFields(fields: Record<string, any>): Policy {
    return Policy.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      package: decodeFromFields(String.reified(), fields.package),
      allowedEntities: decodeFromFields(VecSet.reified(ID.reified()), fields.allowed_entities),
      rules: decodeFromFields(VecMap.reified('address', Rule.reified()), fields.rules),
      enabled: decodeFromFields('bool', fields.enabled),
      version: decodeFromFields('u16', fields.version),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Policy {
    if (!isPolicy(item.type)) {
      throw new Error('not a Policy type')
    }

    return Policy.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      package: decodeFromFieldsWithTypes(String.reified(), item.fields.package),
      allowedEntities: decodeFromFieldsWithTypes(
        VecSet.reified(ID.reified()),
        item.fields.allowed_entities,
      ),
      rules: decodeFromFieldsWithTypes(
        VecMap.reified('address', Rule.reified()),
        item.fields.rules,
      ),
      enabled: decodeFromFieldsWithTypes('bool', item.fields.enabled),
      version: decodeFromFieldsWithTypes('u16', item.fields.version),
    })
  }

  static fromBcs(data: Uint8Array): Policy {
    return Policy.fromFields(Policy.bcs.parse(data))
  }

  toJSONField(): PolicyJSONField {
    return {
      id: this.id,
      package: this.package,
      allowedEntities: this.allowedEntities.toJSONField(),
      rules: this.rules.toJSONField(),
      enabled: this.enabled,
      version: this.version,
    }
  }

  toJSON(): PolicyJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Policy {
    return Policy.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      package: decodeFromJSONField(String.reified(), field.package),
      allowedEntities: decodeFromJSONField(VecSet.reified(ID.reified()), field.allowedEntities),
      rules: decodeFromJSONField(VecMap.reified('address', Rule.reified()), field.rules),
      enabled: decodeFromJSONField('bool', field.enabled),
      version: decodeFromJSONField('u16', field.version),
    })
  }

  static fromJSON(json: Record<string, any>): Policy {
    if (json.$typeName !== Policy.$typeName) {
      throw new Error(
        `not a Policy json object: expected '${Policy.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return Policy.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): Policy {
    if (!isPolicy(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a Policy object`)
    }
    return Policy.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Policy.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): Policy {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPolicy(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Policy object`)
    }
    return Policy.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Policy.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): Policy {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPolicy(data.bcs.type)) {
        throw new Error(`object at is not a Policy object`)
      }

      return Policy.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Policy.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<Policy> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isPolicy(object.type)) {
      throw new Error(`object at id ${id} is not a Policy object`)
    }
    return Policy.fromBcs(object.content)
  }
}

/* ============================== ActionRequest =============================== */

export function isActionRequest(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('access-management', 'access::ActionRequest')}::access::ActionRequest`
}

export interface ActionRequestFields {
  /** The type name of the action being requested. */
  actionName: ToField<TypeName>
  /** A dynamic map containing contextual information for the action, keyed by string. */
  context: ToField<DynamicMap<ToPhantom<String>>>
  /**
   * Conditions that have been approved for this request. Maps condition type to
   * to rule id.
   */
  approvedConditions: ToField<VecMap<TypeName, 'address'>>
}

export type ActionRequestReified = Reified<ActionRequest, ActionRequestFields>

export type ActionRequestJSONField = {
  actionName: string
  context: ToJSON<DynamicMap<ToPhantom<String>>>
  approvedConditions: ToJSON<VecMap<TypeName, 'address'>>
}

export type ActionRequestJSON = {
  $typeName: typeof ActionRequest.$typeName
  $typeArgs: []
} & ActionRequestJSONField

/** Represents a request to perform a specific action. */
export class ActionRequest implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::access::ActionRequest` {
    return `${
      getTypeOrigin('access-management', 'access::ActionRequest')
    }::access::ActionRequest` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof ActionRequest.$typeName = ActionRequest.$typeName
  readonly $fullTypeName: `${string}::access::ActionRequest`
  readonly $typeArgs: []
  readonly $isPhantom: typeof ActionRequest.$isPhantom = ActionRequest.$isPhantom

  /** The type name of the action being requested. */
  readonly actionName: ToField<TypeName>
  /** A dynamic map containing contextual information for the action, keyed by string. */
  readonly context: ToField<DynamicMap<ToPhantom<String>>>
  /**
   * Conditions that have been approved for this request. Maps condition type to
   * to rule id.
   */
  readonly approvedConditions: ToField<VecMap<TypeName, 'address'>>

  private constructor(typeArgs: [], fields: ActionRequestFields) {
    this.$fullTypeName = composeSuiType(
      ActionRequest.$typeName,
      ...typeArgs,
    ) as `${string}::access::ActionRequest`
    this.$typeArgs = typeArgs

    this.actionName = fields.actionName
    this.context = fields.context
    this.approvedConditions = fields.approvedConditions
  }

  static reified(): ActionRequestReified {
    const reifiedBcs = ActionRequest.bcs
    return {
      get typeName() {
        return ActionRequest.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          ActionRequest.$typeName,
          ...[],
        ) as `${string}::access::ActionRequest`
      },
      typeArgs: [] as [],
      isPhantom: ActionRequest.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ActionRequest.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ActionRequest.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ActionRequest.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ActionRequest.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ActionRequest.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        ActionRequest.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => ActionRequest.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ActionRequest.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => ActionRequest.fetch(client, id),
      new: (fields: ActionRequestFields) => {
        return new ActionRequest([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): ActionRequestReified {
    return ActionRequest.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ActionRequest>> {
    return phantom(ActionRequest.reified())
  }

  static get p(): PhantomReified<ToTypeStr<ActionRequest>> {
    return ActionRequest.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ActionRequest', {
      action_name: TypeName.bcs,
      context: DynamicMap.bcs,
      approved_conditions: VecMap.bcs(
        TypeName.bcs,
        bcs.bytes(32).transform({
          input: (val: string) => fromHex(val),
          output: (val: Uint8Array) => toHex(val),
        }),
      ),
    })
  }

  private static cachedBcs: ReturnType<typeof ActionRequest.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof ActionRequest.instantiateBcs> {
    if (!ActionRequest.cachedBcs) {
      ActionRequest.cachedBcs = ActionRequest.instantiateBcs()
    }
    return ActionRequest.cachedBcs
  }

  static fromFields(fields: Record<string, any>): ActionRequest {
    return ActionRequest.reified().new({
      actionName: decodeFromFields(TypeName.reified(), fields.action_name),
      context: decodeFromFields(DynamicMap.reified(phantom(String.reified())), fields.context),
      approvedConditions: decodeFromFields(
        VecMap.reified(TypeName.reified(), 'address'),
        fields.approved_conditions,
      ),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ActionRequest {
    if (!isActionRequest(item.type)) {
      throw new Error('not a ActionRequest type')
    }

    return ActionRequest.reified().new({
      actionName: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.action_name),
      context: decodeFromFieldsWithTypes(
        DynamicMap.reified(phantom(String.reified())),
        item.fields.context,
      ),
      approvedConditions: decodeFromFieldsWithTypes(
        VecMap.reified(TypeName.reified(), 'address'),
        item.fields.approved_conditions,
      ),
    })
  }

  static fromBcs(data: Uint8Array): ActionRequest {
    return ActionRequest.fromFields(ActionRequest.bcs.parse(data))
  }

  toJSONField(): ActionRequestJSONField {
    return {
      actionName: this.actionName,
      context: this.context.toJSONField(),
      approvedConditions: this.approvedConditions.toJSONField(),
    }
  }

  toJSON(): ActionRequestJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ActionRequest {
    return ActionRequest.reified().new({
      actionName: decodeFromJSONField(TypeName.reified(), field.actionName),
      context: decodeFromJSONField(DynamicMap.reified(phantom(String.reified())), field.context),
      approvedConditions: decodeFromJSONField(
        VecMap.reified(TypeName.reified(), 'address'),
        field.approvedConditions,
      ),
    })
  }

  static fromJSON(json: Record<string, any>): ActionRequest {
    if (json.$typeName !== ActionRequest.$typeName) {
      throw new Error(
        `not a ActionRequest json object: expected '${ActionRequest.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return ActionRequest.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): ActionRequest {
    if (!isActionRequest(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a ActionRequest object`)
    }
    return ActionRequest.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ActionRequest.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): ActionRequest {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isActionRequest(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ActionRequest object`)
    }
    return ActionRequest.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ActionRequest.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): ActionRequest {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isActionRequest(data.bcs.type)) {
        throw new Error(`object at is not a ActionRequest object`)
      }

      return ActionRequest.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ActionRequest.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<ActionRequest> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isActionRequest(object.type)) {
      throw new Error(`object at id ${id} is not a ActionRequest object`)
    }
    return ActionRequest.fromBcs(object.content)
  }
}

/* ============================== ConditionWitness =============================== */

export function isConditionWitness(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    `${getTypeOrigin('access-management', 'access::ConditionWitness')}::access::ConditionWitness`
      + '<',
  )
}

export interface ConditionWitnessFields<
  Condition extends PhantomTypeArgument,
  Config extends TypeArgument,
> {
  /** Address of the rule containing this condition */
  ruleId: ToField<'address'>
  /** Configuration data for the condition */
  config: ToField<Config>
  /** Policy ID for additional context */
  policy: ToField<ID>
  /** Entity ID for additional context */
  entity: ToField<ID>
}

export type ConditionWitnessReified<
  Condition extends PhantomTypeArgument,
  Config extends TypeArgument,
> = Reified<ConditionWitness<Condition, Config>, ConditionWitnessFields<Condition, Config>>

export type ConditionWitnessJSONField<
  Condition extends PhantomTypeArgument,
  Config extends TypeArgument,
> = {
  ruleId: string
  config: ToJSON<Config>
  policy: string
  entity: string
}

export type ConditionWitnessJSON<
  Condition extends PhantomTypeArgument,
  Config extends TypeArgument,
> = {
  $typeName: typeof ConditionWitness.$typeName
  $typeArgs: [PhantomToTypeStr<Condition>, ToTypeStr<Config>]
} & ConditionWitnessJSONField<Condition, Config>

/**
 * Carries condition configuration and context for condition approval functions.
 *
 * Type Parameters:
 * - `Condition`: The condition type being witnessed
 * - `Config`: Configuration data for the condition
 */
export class ConditionWitness<Condition extends PhantomTypeArgument, Config extends TypeArgument>
  implements StructClass
{
  __StructClass = true as const

  static get $typeName(): `${string}::access::ConditionWitness` {
    return `${
      getTypeOrigin('access-management', 'access::ConditionWitness')
    }::access::ConditionWitness` as const
  }
  static readonly $numTypeParams = 2
  static readonly $isPhantom = [true, false] as const

  readonly $typeName: typeof ConditionWitness.$typeName = ConditionWitness.$typeName
  readonly $fullTypeName: `${string}::access::ConditionWitness<${PhantomToTypeStr<
    Condition
  >}, ${ToTypeStr<Config>}>`
  readonly $typeArgs: [PhantomToTypeStr<Condition>, ToTypeStr<Config>]
  readonly $isPhantom: typeof ConditionWitness.$isPhantom = ConditionWitness.$isPhantom

  /** Address of the rule containing this condition */
  readonly ruleId: ToField<'address'>
  /** Configuration data for the condition */
  readonly config: ToField<Config>
  /** Policy ID for additional context */
  readonly policy: ToField<ID>
  /** Entity ID for additional context */
  readonly entity: ToField<ID>

  private constructor(
    typeArgs: [PhantomToTypeStr<Condition>, ToTypeStr<Config>],
    fields: ConditionWitnessFields<Condition, Config>,
  ) {
    this.$fullTypeName = composeSuiType(
      ConditionWitness.$typeName,
      ...typeArgs,
    ) as `${string}::access::ConditionWitness<${PhantomToTypeStr<Condition>}, ${ToTypeStr<Config>}>`
    this.$typeArgs = typeArgs

    this.ruleId = fields.ruleId
    this.config = fields.config
    this.policy = fields.policy
    this.entity = fields.entity
  }

  static reified<
    Condition extends PhantomReified<PhantomTypeArgument>,
    Config extends Reified<TypeArgument, any>,
  >(
    Condition: Condition,
    Config: Config,
  ): ConditionWitnessReified<ToPhantomTypeArgument<Condition>, ToTypeArgument<Config>> {
    const reifiedBcs = ConditionWitness.bcs(toBcs(Config))
    return {
      get typeName() {
        return ConditionWitness.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          ConditionWitness.$typeName,
          ...[extractType(Condition), extractType(Config)],
        ) as `${string}::access::ConditionWitness<${PhantomToTypeStr<
          ToPhantomTypeArgument<Condition>
        >}, ${ToTypeStr<ToTypeArgument<Config>>}>`
      },
      get typeArgs() {
        return [extractType(Condition), extractType(Config)] as [
          PhantomToTypeStr<ToPhantomTypeArgument<Condition>>,
          ToTypeStr<ToTypeArgument<Config>>,
        ]
      },
      isPhantom: ConditionWitness.$isPhantom,
      reifiedTypeArgs: [Condition, Config],
      fromFields: (fields: Record<string, any>) =>
        ConditionWitness.fromFields([Condition, Config], fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        ConditionWitness.fromFieldsWithTypes([Condition, Config], item),
      fromBcs: (data: Uint8Array) =>
        ConditionWitness.fromFields([Condition, Config], reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ConditionWitness.fromJSONField([Condition, Config], field),
      fromJSON: (json: Record<string, any>) => ConditionWitness.fromJSON([Condition, Config], json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        ConditionWitness.fromCoreObject([Condition, Config], obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        ConditionWitness.fromSuiParsedData([Condition, Config], content),
      fromSuiObjectData: (content: SuiObjectData) =>
        ConditionWitness.fromSuiObjectData([Condition, Config], content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        ConditionWitness.fetch(client, [Condition, Config], id),
      new: (
        fields: ConditionWitnessFields<ToPhantomTypeArgument<Condition>, ToTypeArgument<Config>>,
      ) => {
        return new ConditionWitness([extractType(Condition), extractType(Config)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof ConditionWitness.reified {
    return ConditionWitness.reified
  }

  static phantom<
    Condition extends PhantomReified<PhantomTypeArgument>,
    Config extends Reified<TypeArgument, any>,
  >(
    Condition: Condition,
    Config: Config,
  ): PhantomReified<
    ToTypeStr<ConditionWitness<ToPhantomTypeArgument<Condition>, ToTypeArgument<Config>>>
  > {
    return phantom(ConditionWitness.reified(Condition, Config))
  }

  static get p(): typeof ConditionWitness.phantom {
    return ConditionWitness.phantom
  }

  private static instantiateBcs() {
    return <Config extends BcsType<any>>(Config: Config) =>
      bcs.struct(`ConditionWitness<${Config.name}>`, {
        rule_id: bcs.bytes(32).transform({
          input: (val: string) => fromHex(val),
          output: (val: Uint8Array) => toHex(val),
        }),
        config: Config,
        policy: ID.bcs,
        entity: ID.bcs,
      })
  }

  private static cachedBcs: ReturnType<typeof ConditionWitness.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof ConditionWitness.instantiateBcs> {
    if (!ConditionWitness.cachedBcs) {
      ConditionWitness.cachedBcs = ConditionWitness.instantiateBcs()
    }
    return ConditionWitness.cachedBcs
  }

  static fromFields<
    Condition extends PhantomReified<PhantomTypeArgument>,
    Config extends Reified<TypeArgument, any>,
  >(
    typeArgs: [Condition, Config],
    fields: Record<string, any>,
  ): ConditionWitness<ToPhantomTypeArgument<Condition>, ToTypeArgument<Config>> {
    return ConditionWitness.reified(typeArgs[0], typeArgs[1]).new({
      ruleId: decodeFromFields('address', fields.rule_id),
      config: decodeFromFields(typeArgs[1], fields.config),
      policy: decodeFromFields(ID.reified(), fields.policy),
      entity: decodeFromFields(ID.reified(), fields.entity),
    })
  }

  static fromFieldsWithTypes<
    Condition extends PhantomReified<PhantomTypeArgument>,
    Config extends Reified<TypeArgument, any>,
  >(
    typeArgs: [Condition, Config],
    item: FieldsWithTypes,
  ): ConditionWitness<ToPhantomTypeArgument<Condition>, ToTypeArgument<Config>> {
    if (!isConditionWitness(item.type)) {
      throw new Error('not a ConditionWitness type')
    }
    assertFieldsWithTypesArgsMatch(item, typeArgs)

    return ConditionWitness.reified(typeArgs[0], typeArgs[1]).new({
      ruleId: decodeFromFieldsWithTypes('address', item.fields.rule_id),
      config: decodeFromFieldsWithTypes(typeArgs[1], item.fields.config),
      policy: decodeFromFieldsWithTypes(ID.reified(), item.fields.policy),
      entity: decodeFromFieldsWithTypes(ID.reified(), item.fields.entity),
    })
  }

  static fromBcs<
    Condition extends PhantomReified<PhantomTypeArgument>,
    Config extends Reified<TypeArgument, any>,
  >(
    typeArgs: [Condition, Config],
    data: Uint8Array,
  ): ConditionWitness<ToPhantomTypeArgument<Condition>, ToTypeArgument<Config>> {
    return ConditionWitness.fromFields(
      typeArgs,
      ConditionWitness.bcs(toBcs(typeArgs[1])).parse(data),
    )
  }

  toJSONField(): ConditionWitnessJSONField<Condition, Config> {
    return {
      ruleId: this.ruleId,
      config: fieldToJSON<Config>(`${this.$typeArgs[1]}`, this.config),
      policy: this.policy,
      entity: this.entity,
    }
  }

  toJSON(): ConditionWitnessJSON<Condition, Config> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<
    Condition extends PhantomReified<PhantomTypeArgument>,
    Config extends Reified<TypeArgument, any>,
  >(
    typeArgs: [Condition, Config],
    field: any,
  ): ConditionWitness<ToPhantomTypeArgument<Condition>, ToTypeArgument<Config>> {
    return ConditionWitness.reified(typeArgs[0], typeArgs[1]).new({
      ruleId: decodeFromJSONField('address', field.ruleId),
      config: decodeFromJSONField(typeArgs[1], field.config),
      policy: decodeFromJSONField(ID.reified(), field.policy),
      entity: decodeFromJSONField(ID.reified(), field.entity),
    })
  }

  static fromJSON<
    Condition extends PhantomReified<PhantomTypeArgument>,
    Config extends Reified<TypeArgument, any>,
  >(
    typeArgs: [Condition, Config],
    json: Record<string, any>,
  ): ConditionWitness<ToPhantomTypeArgument<Condition>, ToTypeArgument<Config>> {
    if (json.$typeName !== ConditionWitness.$typeName) {
      throw new Error(
        `not a ConditionWitness json object: expected '${ConditionWitness.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(ConditionWitness.$typeName, ...typeArgs.map(extractType)),
      json.$typeArgs,
      typeArgs,
    )

    return ConditionWitness.fromJSONField(typeArgs, json)
  }

  static fromCoreObject<
    Condition extends PhantomReified<PhantomTypeArgument>,
    Config extends Reified<TypeArgument, any>,
  >(
    typeArgs: [Condition, Config],
    obj: SuiClientTypes.Object<{ content: true }>,
  ): ConditionWitness<ToPhantomTypeArgument<Condition>, ToTypeArgument<Config>> {
    if (!isConditionWitness(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a ConditionWitness object`)
    }

    const gotTypeArgs = parseTypeName(obj.type).typeArgs
    if (gotTypeArgs.length !== 2) {
      throw new Error(
        `type argument mismatch: expected 2 type arguments but got '${gotTypeArgs.length}'`,
      )
    }
    for (let i = 0; i < 2; i++) {
      const gotTypeArg = compressSuiType(gotTypeArgs[i])
      const expectedTypeArg = compressSuiType(extractType(typeArgs[i]))
      if (gotTypeArg !== expectedTypeArg) {
        throw new Error(
          `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
        )
      }
    }

    return ConditionWitness.fromBcs(typeArgs, obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ConditionWitness.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<
    Condition extends PhantomReified<PhantomTypeArgument>,
    Config extends Reified<TypeArgument, any>,
  >(
    typeArgs: [Condition, Config],
    content: SuiParsedData,
  ): ConditionWitness<ToPhantomTypeArgument<Condition>, ToTypeArgument<Config>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isConditionWitness(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ConditionWitness object`)
    }
    return ConditionWitness.fromFieldsWithTypes(typeArgs, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ConditionWitness.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<
    Condition extends PhantomReified<PhantomTypeArgument>,
    Config extends Reified<TypeArgument, any>,
  >(
    typeArgs: [Condition, Config],
    data: SuiObjectData,
  ): ConditionWitness<ToPhantomTypeArgument<Condition>, ToTypeArgument<Config>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isConditionWitness(data.bcs.type)) {
        throw new Error(`object at is not a ConditionWitness object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 2) {
        throw new Error(
          `type argument mismatch: expected 2 type arguments but got '${gotTypeArgs.length}'`,
        )
      }
      for (let i = 0; i < 2; i++) {
        const gotTypeArg = compressSuiType(gotTypeArgs[i])
        const expectedTypeArg = compressSuiType(extractType(typeArgs[i]))
        if (gotTypeArg !== expectedTypeArg) {
          throw new Error(
            `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
          )
        }
      }

      return ConditionWitness.fromBcs(typeArgs, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ConditionWitness.fromSuiParsedData(typeArgs, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<
    Condition extends PhantomReified<PhantomTypeArgument>,
    Config extends Reified<TypeArgument, any>,
  >(
    client: ClientWithCoreApi,
    typeArgs: [Condition, Config],
    id: string,
  ): Promise<ConditionWitness<ToPhantomTypeArgument<Condition>, ToTypeArgument<Config>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isConditionWitness(object.type)) {
      throw new Error(`object at id ${id} is not a ConditionWitness object`)
    }

    const gotTypeArgs = parseTypeName(object.type).typeArgs
    if (gotTypeArgs.length !== 2) {
      throw new Error(
        `type argument mismatch: expected 2 type arguments but got '${gotTypeArgs.length}'`,
      )
    }
    for (let i = 0; i < 2; i++) {
      const gotTypeArg = compressSuiType(gotTypeArgs[i])
      const expectedTypeArg = compressSuiType(extractType(typeArgs[i]))
      if (gotTypeArg !== expectedTypeArg) {
        throw new Error(
          `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
        )
      }
    }

    return ConditionWitness.fromBcs(typeArgs, object.content)
  }
}

/* ============================== ConfigNone =============================== */

export function isConfigNone(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('access-management', 'access::ConfigNone')}::access::ConfigNone`
}

export interface ConfigNoneFields {
  dummyField: ToField<'bool'>
}

export type ConfigNoneReified = Reified<ConfigNone, ConfigNoneFields>

export type ConfigNoneJSONField = {
  dummyField: boolean
}

export type ConfigNoneJSON = {
  $typeName: typeof ConfigNone.$typeName
  $typeArgs: []
} & ConfigNoneJSONField

/** Represents a default configuration for a condition that does not require any additional configuration. */
export class ConfigNone implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::access::ConfigNone` {
    return `${
      getTypeOrigin('access-management', 'access::ConfigNone')
    }::access::ConfigNone` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof ConfigNone.$typeName = ConfigNone.$typeName
  readonly $fullTypeName: `${string}::access::ConfigNone`
  readonly $typeArgs: []
  readonly $isPhantom: typeof ConfigNone.$isPhantom = ConfigNone.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: ConfigNoneFields) {
    this.$fullTypeName = composeSuiType(
      ConfigNone.$typeName,
      ...typeArgs,
    ) as `${string}::access::ConfigNone`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): ConfigNoneReified {
    const reifiedBcs = ConfigNone.bcs
    return {
      get typeName() {
        return ConfigNone.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          ConfigNone.$typeName,
          ...[],
        ) as `${string}::access::ConfigNone`
      },
      typeArgs: [] as [],
      isPhantom: ConfigNone.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ConfigNone.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ConfigNone.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ConfigNone.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ConfigNone.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ConfigNone.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        ConfigNone.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => ConfigNone.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ConfigNone.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => ConfigNone.fetch(client, id),
      new: (fields: ConfigNoneFields) => {
        return new ConfigNone([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): ConfigNoneReified {
    return ConfigNone.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ConfigNone>> {
    return phantom(ConfigNone.reified())
  }

  static get p(): PhantomReified<ToTypeStr<ConfigNone>> {
    return ConfigNone.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ConfigNone', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof ConfigNone.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof ConfigNone.instantiateBcs> {
    if (!ConfigNone.cachedBcs) {
      ConfigNone.cachedBcs = ConfigNone.instantiateBcs()
    }
    return ConfigNone.cachedBcs
  }

  static fromFields(fields: Record<string, any>): ConfigNone {
    return ConfigNone.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ConfigNone {
    if (!isConfigNone(item.type)) {
      throw new Error('not a ConfigNone type')
    }

    return ConfigNone.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): ConfigNone {
    return ConfigNone.fromFields(ConfigNone.bcs.parse(data))
  }

  toJSONField(): ConfigNoneJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): ConfigNoneJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ConfigNone {
    return ConfigNone.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): ConfigNone {
    if (json.$typeName !== ConfigNone.$typeName) {
      throw new Error(
        `not a ConfigNone json object: expected '${ConfigNone.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return ConfigNone.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): ConfigNone {
    if (!isConfigNone(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a ConfigNone object`)
    }
    return ConfigNone.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ConfigNone.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): ConfigNone {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isConfigNone(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ConfigNone object`)
    }
    return ConfigNone.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ConfigNone.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): ConfigNone {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isConfigNone(data.bcs.type)) {
        throw new Error(`object at is not a ConfigNone object`)
      }

      return ConfigNone.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ConfigNone.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<ConfigNone> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isConfigNone(object.type)) {
      throw new Error(`object at id ${id} is not a ConfigNone object`)
    }
    return ConfigNone.fromBcs(object.content)
  }
}
