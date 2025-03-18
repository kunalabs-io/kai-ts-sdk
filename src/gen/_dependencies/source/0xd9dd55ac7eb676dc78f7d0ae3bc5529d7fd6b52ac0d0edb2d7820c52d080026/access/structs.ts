import * as reified from '../../../../_framework/reified'
import {
  PhantomReified,
  PhantomToTypeStr,
  PhantomTypeArgument,
  Reified,
  StructClass,
  ToField,
  ToPhantomTypeArgument,
  ToTypeArgument,
  ToTypeStr,
  TypeArgument,
  assertFieldsWithTypesArgsMatch,
  assertReifiedTypeArgsMatch,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  extractType,
  fieldToJSON,
  phantom,
  toBcs,
  ToTypeStr as ToPhantom,
} from '../../../../_framework/reified'
import {
  FieldsWithTypes,
  composeSuiType,
  compressSuiType,
  parseTypeName,
} from '../../../../_framework/util'
import { String } from '../../../../move-stdlib/ascii/structs'
import { TypeName } from '../../../../move-stdlib/type-name/structs'
import { ID, UID } from '../../../../sui/object/structs'
import { VecMap } from '../../../../sui/vec-map/structs'
import { VecSet } from '../../../../sui/vec-set/structs'
import { DynamicMap } from '../dynamic-map/structs'
import { PKG_V1 } from '../index'
import { BcsType, bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64, fromHEX, toHEX } from '@mysten/sui/utils'

/* ============================== ActionRequest =============================== */

export function isActionRequest(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::access::ActionRequest`
}

export interface ActionRequestFields {
  actionName: ToField<TypeName>
  context: ToField<DynamicMap<ToPhantom<String>>>
  approvedConditions: ToField<VecMap<TypeName, 'address'>>
}

export type ActionRequestReified = Reified<ActionRequest, ActionRequestFields>

export class ActionRequest implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::access::ActionRequest`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = ActionRequest.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::access::ActionRequest`
  readonly $typeArgs: []
  readonly $isPhantom = ActionRequest.$isPhantom

  readonly actionName: ToField<TypeName>
  readonly context: ToField<DynamicMap<ToPhantom<String>>>
  readonly approvedConditions: ToField<VecMap<TypeName, 'address'>>

  private constructor(typeArgs: [], fields: ActionRequestFields) {
    this.$fullTypeName = composeSuiType(
      ActionRequest.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::access::ActionRequest`
    this.$typeArgs = typeArgs

    this.actionName = fields.actionName
    this.context = fields.context
    this.approvedConditions = fields.approvedConditions
  }

  static reified(): ActionRequestReified {
    return {
      typeName: ActionRequest.$typeName,
      fullTypeName: composeSuiType(
        ActionRequest.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::access::ActionRequest`,
      typeArgs: [] as [],
      isPhantom: ActionRequest.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ActionRequest.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ActionRequest.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ActionRequest.fromBcs(data),
      bcs: ActionRequest.bcs,
      fromJSONField: (field: any) => ActionRequest.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ActionRequest.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => ActionRequest.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ActionRequest.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => ActionRequest.fetch(client, id),
      new: (fields: ActionRequestFields) => {
        return new ActionRequest([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return ActionRequest.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ActionRequest>> {
    return phantom(ActionRequest.reified())
  }
  static get p() {
    return ActionRequest.phantom()
  }

  static get bcs() {
    return bcs.struct('ActionRequest', {
      action_name: TypeName.bcs,
      context: DynamicMap.bcs,
      approved_conditions: VecMap.bcs(
        TypeName.bcs,
        bcs.bytes(32).transform({
          input: (val: string) => fromHEX(val),
          output: (val: Uint8Array) => toHEX(val),
        })
      ),
    })
  }

  static fromFields(fields: Record<string, any>): ActionRequest {
    return ActionRequest.reified().new({
      actionName: decodeFromFields(TypeName.reified(), fields.action_name),
      context: decodeFromFields(
        DynamicMap.reified(reified.phantom(String.reified())),
        fields.context
      ),
      approvedConditions: decodeFromFields(
        VecMap.reified(TypeName.reified(), 'address'),
        fields.approved_conditions
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
        DynamicMap.reified(reified.phantom(String.reified())),
        item.fields.context
      ),
      approvedConditions: decodeFromFieldsWithTypes(
        VecMap.reified(TypeName.reified(), 'address'),
        item.fields.approved_conditions
      ),
    })
  }

  static fromBcs(data: Uint8Array): ActionRequest {
    return ActionRequest.fromFields(ActionRequest.bcs.parse(data))
  }

  toJSONField() {
    return {
      actionName: this.actionName.toJSONField(),
      context: this.context.toJSONField(),
      approvedConditions: this.approvedConditions.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ActionRequest {
    return ActionRequest.reified().new({
      actionName: decodeFromJSONField(TypeName.reified(), field.actionName),
      context: decodeFromJSONField(
        DynamicMap.reified(reified.phantom(String.reified())),
        field.context
      ),
      approvedConditions: decodeFromJSONField(
        VecMap.reified(TypeName.reified(), 'address'),
        field.approvedConditions
      ),
    })
  }

  static fromJSON(json: Record<string, any>): ActionRequest {
    if (json.$typeName !== ActionRequest.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return ActionRequest.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): ActionRequest {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isActionRequest(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ActionRequest object`)
    }
    return ActionRequest.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): ActionRequest {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isActionRequest(data.bcs.type)) {
        throw new Error(`object at is not a ActionRequest object`)
      }

      return ActionRequest.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ActionRequest.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<ActionRequest> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching ActionRequest object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isActionRequest(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a ActionRequest object`)
    }

    return ActionRequest.fromSuiObjectData(res.data)
  }
}

/* ============================== ConditionWitness =============================== */

export function isConditionWitness(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::access::ConditionWitness` + '<')
}

export interface ConditionWitnessFields<
  Condition extends PhantomTypeArgument,
  Config extends TypeArgument,
> {
  ruleId: ToField<'address'>
  config: ToField<Config>
  policy: ToField<ID>
  entity: ToField<ID>
}

export type ConditionWitnessReified<
  Condition extends PhantomTypeArgument,
  Config extends TypeArgument,
> = Reified<ConditionWitness<Condition, Config>, ConditionWitnessFields<Condition, Config>>

export class ConditionWitness<Condition extends PhantomTypeArgument, Config extends TypeArgument>
  implements StructClass
{
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::access::ConditionWitness`
  static readonly $numTypeParams = 2
  static readonly $isPhantom = [true, false] as const

  readonly $typeName = ConditionWitness.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::access::ConditionWitness<${PhantomToTypeStr<Condition>}, ${ToTypeStr<Config>}>`
  readonly $typeArgs: [PhantomToTypeStr<Condition>, ToTypeStr<Config>]
  readonly $isPhantom = ConditionWitness.$isPhantom

  readonly ruleId: ToField<'address'>
  readonly config: ToField<Config>
  readonly policy: ToField<ID>
  readonly entity: ToField<ID>

  private constructor(
    typeArgs: [PhantomToTypeStr<Condition>, ToTypeStr<Config>],
    fields: ConditionWitnessFields<Condition, Config>
  ) {
    this.$fullTypeName = composeSuiType(
      ConditionWitness.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::access::ConditionWitness<${PhantomToTypeStr<Condition>}, ${ToTypeStr<Config>}>`
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
    Config: Config
  ): ConditionWitnessReified<ToPhantomTypeArgument<Condition>, ToTypeArgument<Config>> {
    return {
      typeName: ConditionWitness.$typeName,
      fullTypeName: composeSuiType(
        ConditionWitness.$typeName,
        ...[extractType(Condition), extractType(Config)]
      ) as `${typeof PKG_V1}::access::ConditionWitness<${PhantomToTypeStr<ToPhantomTypeArgument<Condition>>}, ${ToTypeStr<ToTypeArgument<Config>>}>`,
      typeArgs: [extractType(Condition), extractType(Config)] as [
        PhantomToTypeStr<ToPhantomTypeArgument<Condition>>,
        ToTypeStr<ToTypeArgument<Config>>,
      ],
      isPhantom: ConditionWitness.$isPhantom,
      reifiedTypeArgs: [Condition, Config],
      fromFields: (fields: Record<string, any>) =>
        ConditionWitness.fromFields([Condition, Config], fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        ConditionWitness.fromFieldsWithTypes([Condition, Config], item),
      fromBcs: (data: Uint8Array) => ConditionWitness.fromBcs([Condition, Config], data),
      bcs: ConditionWitness.bcs(toBcs(Config)),
      fromJSONField: (field: any) => ConditionWitness.fromJSONField([Condition, Config], field),
      fromJSON: (json: Record<string, any>) => ConditionWitness.fromJSON([Condition, Config], json),
      fromSuiParsedData: (content: SuiParsedData) =>
        ConditionWitness.fromSuiParsedData([Condition, Config], content),
      fromSuiObjectData: (content: SuiObjectData) =>
        ConditionWitness.fromSuiObjectData([Condition, Config], content),
      fetch: async (client: SuiClient, id: string) =>
        ConditionWitness.fetch(client, [Condition, Config], id),
      new: (
        fields: ConditionWitnessFields<ToPhantomTypeArgument<Condition>, ToTypeArgument<Config>>
      ) => {
        return new ConditionWitness([extractType(Condition), extractType(Config)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return ConditionWitness.reified
  }

  static phantom<
    Condition extends PhantomReified<PhantomTypeArgument>,
    Config extends Reified<TypeArgument, any>,
  >(
    Condition: Condition,
    Config: Config
  ): PhantomReified<
    ToTypeStr<ConditionWitness<ToPhantomTypeArgument<Condition>, ToTypeArgument<Config>>>
  > {
    return phantom(ConditionWitness.reified(Condition, Config))
  }
  static get p() {
    return ConditionWitness.phantom
  }

  static get bcs() {
    return <Config extends BcsType<any>>(Config: Config) =>
      bcs.struct(`ConditionWitness<${Config.name}>`, {
        rule_id: bcs.bytes(32).transform({
          input: (val: string) => fromHEX(val),
          output: (val: Uint8Array) => toHEX(val),
        }),
        config: Config,
        policy: ID.bcs,
        entity: ID.bcs,
      })
  }

  static fromFields<
    Condition extends PhantomReified<PhantomTypeArgument>,
    Config extends Reified<TypeArgument, any>,
  >(
    typeArgs: [Condition, Config],
    fields: Record<string, any>
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
    item: FieldsWithTypes
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
    data: Uint8Array
  ): ConditionWitness<ToPhantomTypeArgument<Condition>, ToTypeArgument<Config>> {
    return ConditionWitness.fromFields(
      typeArgs,
      ConditionWitness.bcs(toBcs(typeArgs[1])).parse(data)
    )
  }

  toJSONField() {
    return {
      ruleId: this.ruleId,
      config: fieldToJSON<Config>(this.$typeArgs[1], this.config),
      policy: this.policy,
      entity: this.entity,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<
    Condition extends PhantomReified<PhantomTypeArgument>,
    Config extends Reified<TypeArgument, any>,
  >(
    typeArgs: [Condition, Config],
    field: any
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
    json: Record<string, any>
  ): ConditionWitness<ToPhantomTypeArgument<Condition>, ToTypeArgument<Config>> {
    if (json.$typeName !== ConditionWitness.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(ConditionWitness.$typeName, ...typeArgs.map(extractType)),
      json.$typeArgs,
      typeArgs
    )

    return ConditionWitness.fromJSONField(typeArgs, json)
  }

  static fromSuiParsedData<
    Condition extends PhantomReified<PhantomTypeArgument>,
    Config extends Reified<TypeArgument, any>,
  >(
    typeArgs: [Condition, Config],
    content: SuiParsedData
  ): ConditionWitness<ToPhantomTypeArgument<Condition>, ToTypeArgument<Config>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isConditionWitness(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ConditionWitness object`)
    }
    return ConditionWitness.fromFieldsWithTypes(typeArgs, content)
  }

  static fromSuiObjectData<
    Condition extends PhantomReified<PhantomTypeArgument>,
    Config extends Reified<TypeArgument, any>,
  >(
    typeArgs: [Condition, Config],
    data: SuiObjectData
  ): ConditionWitness<ToPhantomTypeArgument<Condition>, ToTypeArgument<Config>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isConditionWitness(data.bcs.type)) {
        throw new Error(`object at is not a ConditionWitness object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 2) {
        throw new Error(
          `type argument mismatch: expected 2 type arguments but got ${gotTypeArgs.length}`
        )
      }
      for (let i = 0; i < 2; i++) {
        const gotTypeArg = compressSuiType(gotTypeArgs[i])
        const expectedTypeArg = compressSuiType(extractType(typeArgs[i]))
        if (gotTypeArg !== expectedTypeArg) {
          throw new Error(
            `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`
          )
        }
      }

      return ConditionWitness.fromBcs(typeArgs, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ConditionWitness.fromSuiParsedData(typeArgs, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<
    Condition extends PhantomReified<PhantomTypeArgument>,
    Config extends Reified<TypeArgument, any>,
  >(
    client: SuiClient,
    typeArgs: [Condition, Config],
    id: string
  ): Promise<ConditionWitness<ToPhantomTypeArgument<Condition>, ToTypeArgument<Config>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching ConditionWitness object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isConditionWitness(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a ConditionWitness object`)
    }

    return ConditionWitness.fromSuiObjectData(typeArgs, res.data)
  }
}

/* ============================== ConfigNone =============================== */

export function isConfigNone(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::access::ConfigNone`
}

export interface ConfigNoneFields {
  dummyField: ToField<'bool'>
}

export type ConfigNoneReified = Reified<ConfigNone, ConfigNoneFields>

export class ConfigNone implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::access::ConfigNone`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = ConfigNone.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::access::ConfigNone`
  readonly $typeArgs: []
  readonly $isPhantom = ConfigNone.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: ConfigNoneFields) {
    this.$fullTypeName = composeSuiType(
      ConfigNone.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::access::ConfigNone`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): ConfigNoneReified {
    return {
      typeName: ConfigNone.$typeName,
      fullTypeName: composeSuiType(
        ConfigNone.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::access::ConfigNone`,
      typeArgs: [] as [],
      isPhantom: ConfigNone.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ConfigNone.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ConfigNone.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ConfigNone.fromBcs(data),
      bcs: ConfigNone.bcs,
      fromJSONField: (field: any) => ConfigNone.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ConfigNone.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => ConfigNone.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ConfigNone.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => ConfigNone.fetch(client, id),
      new: (fields: ConfigNoneFields) => {
        return new ConfigNone([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return ConfigNone.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ConfigNone>> {
    return phantom(ConfigNone.reified())
  }
  static get p() {
    return ConfigNone.phantom()
  }

  static get bcs() {
    return bcs.struct('ConfigNone', {
      dummy_field: bcs.bool(),
    })
  }

  static fromFields(fields: Record<string, any>): ConfigNone {
    return ConfigNone.reified().new({ dummyField: decodeFromFields('bool', fields.dummy_field) })
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

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ConfigNone {
    return ConfigNone.reified().new({ dummyField: decodeFromJSONField('bool', field.dummyField) })
  }

  static fromJSON(json: Record<string, any>): ConfigNone {
    if (json.$typeName !== ConfigNone.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return ConfigNone.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): ConfigNone {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isConfigNone(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ConfigNone object`)
    }
    return ConfigNone.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): ConfigNone {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isConfigNone(data.bcs.type)) {
        throw new Error(`object at is not a ConfigNone object`)
      }

      return ConfigNone.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ConfigNone.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<ConfigNone> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching ConfigNone object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isConfigNone(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a ConfigNone object`)
    }

    return ConfigNone.fromSuiObjectData(res.data)
  }
}

/* ============================== Entity =============================== */

export function isEntity(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::access::Entity`
}

export interface EntityFields {
  id: ToField<UID>
}

export type EntityReified = Reified<Entity, EntityFields>

export class Entity implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::access::Entity`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = Entity.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::access::Entity`
  readonly $typeArgs: []
  readonly $isPhantom = Entity.$isPhantom

  readonly id: ToField<UID>

  private constructor(typeArgs: [], fields: EntityFields) {
    this.$fullTypeName = composeSuiType(
      Entity.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::access::Entity`
    this.$typeArgs = typeArgs

    this.id = fields.id
  }

  static reified(): EntityReified {
    return {
      typeName: Entity.$typeName,
      fullTypeName: composeSuiType(Entity.$typeName, ...[]) as `${typeof PKG_V1}::access::Entity`,
      typeArgs: [] as [],
      isPhantom: Entity.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Entity.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Entity.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Entity.fromBcs(data),
      bcs: Entity.bcs,
      fromJSONField: (field: any) => Entity.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Entity.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => Entity.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Entity.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => Entity.fetch(client, id),
      new: (fields: EntityFields) => {
        return new Entity([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return Entity.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Entity>> {
    return phantom(Entity.reified())
  }
  static get p() {
    return Entity.phantom()
  }

  static get bcs() {
    return bcs.struct('Entity', {
      id: UID.bcs,
    })
  }

  static fromFields(fields: Record<string, any>): Entity {
    return Entity.reified().new({ id: decodeFromFields(UID.reified(), fields.id) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Entity {
    if (!isEntity(item.type)) {
      throw new Error('not a Entity type')
    }

    return Entity.reified().new({ id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id) })
  }

  static fromBcs(data: Uint8Array): Entity {
    return Entity.fromFields(Entity.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Entity {
    return Entity.reified().new({ id: decodeFromJSONField(UID.reified(), field.id) })
  }

  static fromJSON(json: Record<string, any>): Entity {
    if (json.$typeName !== Entity.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return Entity.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): Entity {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isEntity(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Entity object`)
    }
    return Entity.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): Entity {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isEntity(data.bcs.type)) {
        throw new Error(`object at is not a Entity object`)
      }

      return Entity.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Entity.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<Entity> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching Entity object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isEntity(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Entity object`)
    }

    return Entity.fromSuiObjectData(res.data)
  }
}

/* ============================== PackageAdmin =============================== */

export function isPackageAdmin(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::access::PackageAdmin`
}

export interface PackageAdminFields {
  id: ToField<UID>
  package: ToField<String>
}

export type PackageAdminReified = Reified<PackageAdmin, PackageAdminFields>

export class PackageAdmin implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::access::PackageAdmin`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = PackageAdmin.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::access::PackageAdmin`
  readonly $typeArgs: []
  readonly $isPhantom = PackageAdmin.$isPhantom

  readonly id: ToField<UID>
  readonly package: ToField<String>

  private constructor(typeArgs: [], fields: PackageAdminFields) {
    this.$fullTypeName = composeSuiType(
      PackageAdmin.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::access::PackageAdmin`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.package = fields.package
  }

  static reified(): PackageAdminReified {
    return {
      typeName: PackageAdmin.$typeName,
      fullTypeName: composeSuiType(
        PackageAdmin.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::access::PackageAdmin`,
      typeArgs: [] as [],
      isPhantom: PackageAdmin.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PackageAdmin.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PackageAdmin.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PackageAdmin.fromBcs(data),
      bcs: PackageAdmin.bcs,
      fromJSONField: (field: any) => PackageAdmin.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PackageAdmin.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => PackageAdmin.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PackageAdmin.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => PackageAdmin.fetch(client, id),
      new: (fields: PackageAdminFields) => {
        return new PackageAdmin([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return PackageAdmin.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PackageAdmin>> {
    return phantom(PackageAdmin.reified())
  }
  static get p() {
    return PackageAdmin.phantom()
  }

  static get bcs() {
    return bcs.struct('PackageAdmin', {
      id: UID.bcs,
      package: String.bcs,
    })
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

  toJSONField() {
    return {
      id: this.id,
      package: this.package,
    }
  }

  toJSON() {
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
      throw new Error('not a WithTwoGenerics json object')
    }

    return PackageAdmin.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): PackageAdmin {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPackageAdmin(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PackageAdmin object`)
    }
    return PackageAdmin.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): PackageAdmin {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPackageAdmin(data.bcs.type)) {
        throw new Error(`object at is not a PackageAdmin object`)
      }

      return PackageAdmin.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PackageAdmin.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<PackageAdmin> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching PackageAdmin object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isPackageAdmin(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a PackageAdmin object`)
    }

    return PackageAdmin.fromSuiObjectData(res.data)
  }
}

/* ============================== Policy =============================== */

export function isPolicy(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::access::Policy`
}

export interface PolicyFields {
  id: ToField<UID>
  package: ToField<String>
  allowedEntities: ToField<VecSet<ID>>
  rules: ToField<VecMap<'address', Rule>>
  enabled: ToField<'bool'>
  version: ToField<'u16'>
}

export type PolicyReified = Reified<Policy, PolicyFields>

export class Policy implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::access::Policy`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = Policy.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::access::Policy`
  readonly $typeArgs: []
  readonly $isPhantom = Policy.$isPhantom

  readonly id: ToField<UID>
  readonly package: ToField<String>
  readonly allowedEntities: ToField<VecSet<ID>>
  readonly rules: ToField<VecMap<'address', Rule>>
  readonly enabled: ToField<'bool'>
  readonly version: ToField<'u16'>

  private constructor(typeArgs: [], fields: PolicyFields) {
    this.$fullTypeName = composeSuiType(
      Policy.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::access::Policy`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.package = fields.package
    this.allowedEntities = fields.allowedEntities
    this.rules = fields.rules
    this.enabled = fields.enabled
    this.version = fields.version
  }

  static reified(): PolicyReified {
    return {
      typeName: Policy.$typeName,
      fullTypeName: composeSuiType(Policy.$typeName, ...[]) as `${typeof PKG_V1}::access::Policy`,
      typeArgs: [] as [],
      isPhantom: Policy.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Policy.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Policy.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Policy.fromBcs(data),
      bcs: Policy.bcs,
      fromJSONField: (field: any) => Policy.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Policy.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => Policy.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Policy.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => Policy.fetch(client, id),
      new: (fields: PolicyFields) => {
        return new Policy([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return Policy.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Policy>> {
    return phantom(Policy.reified())
  }
  static get p() {
    return Policy.phantom()
  }

  static get bcs() {
    return bcs.struct('Policy', {
      id: UID.bcs,
      package: String.bcs,
      allowed_entities: VecSet.bcs(ID.bcs),
      rules: VecMap.bcs(
        bcs.bytes(32).transform({
          input: (val: string) => fromHEX(val),
          output: (val: Uint8Array) => toHEX(val),
        }),
        Rule.bcs
      ),
      enabled: bcs.bool(),
      version: bcs.u16(),
    })
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
        item.fields.allowed_entities
      ),
      rules: decodeFromFieldsWithTypes(
        VecMap.reified('address', Rule.reified()),
        item.fields.rules
      ),
      enabled: decodeFromFieldsWithTypes('bool', item.fields.enabled),
      version: decodeFromFieldsWithTypes('u16', item.fields.version),
    })
  }

  static fromBcs(data: Uint8Array): Policy {
    return Policy.fromFields(Policy.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      package: this.package,
      allowedEntities: this.allowedEntities.toJSONField(),
      rules: this.rules.toJSONField(),
      enabled: this.enabled,
      version: this.version,
    }
  }

  toJSON() {
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
      throw new Error('not a WithTwoGenerics json object')
    }

    return Policy.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): Policy {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPolicy(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Policy object`)
    }
    return Policy.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): Policy {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPolicy(data.bcs.type)) {
        throw new Error(`object at is not a Policy object`)
      }

      return Policy.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Policy.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<Policy> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching Policy object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isPolicy(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Policy object`)
    }

    return Policy.fromSuiObjectData(res.data)
  }
}

/* ============================== Rule =============================== */

export function isRule(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::access::Rule`
}

export interface RuleFields {
  actions: ToField<VecSet<TypeName>>
  conditions: ToField<VecSet<TypeName>>
  conditionConfigs: ToField<DynamicMap<ToPhantom<TypeName>>>
}

export type RuleReified = Reified<Rule, RuleFields>

export class Rule implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::access::Rule`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = Rule.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::access::Rule`
  readonly $typeArgs: []
  readonly $isPhantom = Rule.$isPhantom

  readonly actions: ToField<VecSet<TypeName>>
  readonly conditions: ToField<VecSet<TypeName>>
  readonly conditionConfigs: ToField<DynamicMap<ToPhantom<TypeName>>>

  private constructor(typeArgs: [], fields: RuleFields) {
    this.$fullTypeName = composeSuiType(
      Rule.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::access::Rule`
    this.$typeArgs = typeArgs

    this.actions = fields.actions
    this.conditions = fields.conditions
    this.conditionConfigs = fields.conditionConfigs
  }

  static reified(): RuleReified {
    return {
      typeName: Rule.$typeName,
      fullTypeName: composeSuiType(Rule.$typeName, ...[]) as `${typeof PKG_V1}::access::Rule`,
      typeArgs: [] as [],
      isPhantom: Rule.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Rule.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Rule.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Rule.fromBcs(data),
      bcs: Rule.bcs,
      fromJSONField: (field: any) => Rule.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Rule.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => Rule.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Rule.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => Rule.fetch(client, id),
      new: (fields: RuleFields) => {
        return new Rule([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return Rule.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Rule>> {
    return phantom(Rule.reified())
  }
  static get p() {
    return Rule.phantom()
  }

  static get bcs() {
    return bcs.struct('Rule', {
      actions: VecSet.bcs(TypeName.bcs),
      conditions: VecSet.bcs(TypeName.bcs),
      condition_configs: DynamicMap.bcs,
    })
  }

  static fromFields(fields: Record<string, any>): Rule {
    return Rule.reified().new({
      actions: decodeFromFields(VecSet.reified(TypeName.reified()), fields.actions),
      conditions: decodeFromFields(VecSet.reified(TypeName.reified()), fields.conditions),
      conditionConfigs: decodeFromFields(
        DynamicMap.reified(reified.phantom(TypeName.reified())),
        fields.condition_configs
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
        item.fields.conditions
      ),
      conditionConfigs: decodeFromFieldsWithTypes(
        DynamicMap.reified(reified.phantom(TypeName.reified())),
        item.fields.condition_configs
      ),
    })
  }

  static fromBcs(data: Uint8Array): Rule {
    return Rule.fromFields(Rule.bcs.parse(data))
  }

  toJSONField() {
    return {
      actions: this.actions.toJSONField(),
      conditions: this.conditions.toJSONField(),
      conditionConfigs: this.conditionConfigs.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Rule {
    return Rule.reified().new({
      actions: decodeFromJSONField(VecSet.reified(TypeName.reified()), field.actions),
      conditions: decodeFromJSONField(VecSet.reified(TypeName.reified()), field.conditions),
      conditionConfigs: decodeFromJSONField(
        DynamicMap.reified(reified.phantom(TypeName.reified())),
        field.conditionConfigs
      ),
    })
  }

  static fromJSON(json: Record<string, any>): Rule {
    if (json.$typeName !== Rule.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return Rule.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): Rule {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRule(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Rule object`)
    }
    return Rule.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): Rule {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRule(data.bcs.type)) {
        throw new Error(`object at is not a Rule object`)
      }

      return Rule.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Rule.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<Rule> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching Rule object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isRule(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Rule object`)
    }

    return Rule.fromSuiObjectData(res.data)
  }
}
