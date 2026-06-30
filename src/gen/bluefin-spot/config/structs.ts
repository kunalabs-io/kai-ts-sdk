import { bcs } from '@mysten/sui/bcs'
import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import type { SuiObjectData, SuiParsedData } from '@mysten/sui/jsonRpc'
import { fromBase64, fromHex, toHex } from '@mysten/sui/utils'
import { getTypeOrigin } from '../../_envs'
import {
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  fieldToJSON,
  phantom,
  PhantomReified,
  Reified,
  StructClass,
  ToField,
  ToJSON,
  ToTypeStr,
  vector,
} from '../../_framework/reified'
import { composeSuiType, compressSuiType, FieldsWithTypes } from '../../_framework/util'
import { Vector } from '../../_framework/vector'
import { I32 } from '../../integer-mate/i32/structs'
import { UID } from '../../sui/object/structs'

/* ============================== GlobalConfig =============================== */

export function isGlobalConfig(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('bluefin-spot', 'config::GlobalConfig')}::config::GlobalConfig`
}

export interface GlobalConfigFields {
  id: ToField<UID>
  minTick: ToField<I32>
  maxTick: ToField<I32>
  version: ToField<'u64'>
  rewardManagers: ToField<Vector<'address'>>
}

export type GlobalConfigReified = Reified<GlobalConfig, GlobalConfigFields>

export type GlobalConfigJSONField = {
  id: string
  minTick: ToJSON<I32>
  maxTick: ToJSON<I32>
  version: string
  rewardManagers: string[]
}

export type GlobalConfigJSON = {
  $typeName: typeof GlobalConfig.$typeName
  $typeArgs: []
} & GlobalConfigJSONField

/** The protocol's config */
export class GlobalConfig implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::config::GlobalConfig` {
    return `${getTypeOrigin('bluefin-spot', 'config::GlobalConfig')}::config::GlobalConfig` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof GlobalConfig.$typeName = GlobalConfig.$typeName
  readonly $fullTypeName: `${string}::config::GlobalConfig`
  readonly $typeArgs: []
  readonly $isPhantom: typeof GlobalConfig.$isPhantom = GlobalConfig.$isPhantom

  readonly id: ToField<UID>
  readonly minTick: ToField<I32>
  readonly maxTick: ToField<I32>
  readonly version: ToField<'u64'>
  readonly rewardManagers: ToField<Vector<'address'>>

  private constructor(typeArgs: [], fields: GlobalConfigFields) {
    this.$fullTypeName = composeSuiType(
      GlobalConfig.$typeName,
      ...typeArgs,
    ) as `${string}::config::GlobalConfig`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.minTick = fields.minTick
    this.maxTick = fields.maxTick
    this.version = fields.version
    this.rewardManagers = fields.rewardManagers
  }

  static reified(): GlobalConfigReified {
    const reifiedBcs = GlobalConfig.bcs
    return {
      get typeName() {
        return GlobalConfig.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          GlobalConfig.$typeName,
          ...[],
        ) as `${string}::config::GlobalConfig`
      },
      typeArgs: [] as [],
      isPhantom: GlobalConfig.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => GlobalConfig.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => GlobalConfig.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => GlobalConfig.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => GlobalConfig.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => GlobalConfig.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        GlobalConfig.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => GlobalConfig.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => GlobalConfig.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => GlobalConfig.fetch(client, id),
      new: (fields: GlobalConfigFields) => {
        return new GlobalConfig([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): GlobalConfigReified {
    return GlobalConfig.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<GlobalConfig>> {
    return phantom(GlobalConfig.reified())
  }

  static get p(): PhantomReified<ToTypeStr<GlobalConfig>> {
    return GlobalConfig.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('GlobalConfig', {
      id: UID.bcs,
      min_tick: I32.bcs,
      max_tick: I32.bcs,
      version: bcs.u64(),
      reward_managers: bcs.vector(
        bcs.bytes(32).transform({
          input: (val: string) => fromHex(val),
          output: (val: Uint8Array) => toHex(val),
        }),
      ),
    })
  }

  private static cachedBcs: ReturnType<typeof GlobalConfig.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof GlobalConfig.instantiateBcs> {
    if (!GlobalConfig.cachedBcs) {
      GlobalConfig.cachedBcs = GlobalConfig.instantiateBcs()
    }
    return GlobalConfig.cachedBcs
  }

  static fromFields(fields: Record<string, any>): GlobalConfig {
    return GlobalConfig.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      minTick: decodeFromFields(I32.reified(), fields.min_tick),
      maxTick: decodeFromFields(I32.reified(), fields.max_tick),
      version: decodeFromFields('u64', fields.version),
      rewardManagers: decodeFromFields(vector('address'), fields.reward_managers),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): GlobalConfig {
    if (!isGlobalConfig(item.type)) {
      throw new Error('not a GlobalConfig type')
    }

    return GlobalConfig.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      minTick: decodeFromFieldsWithTypes(I32.reified(), item.fields.min_tick),
      maxTick: decodeFromFieldsWithTypes(I32.reified(), item.fields.max_tick),
      version: decodeFromFieldsWithTypes('u64', item.fields.version),
      rewardManagers: decodeFromFieldsWithTypes(vector('address'), item.fields.reward_managers),
    })
  }

  static fromBcs(data: Uint8Array): GlobalConfig {
    return GlobalConfig.fromFields(GlobalConfig.bcs.parse(data))
  }

  toJSONField(): GlobalConfigJSONField {
    return {
      id: this.id,
      minTick: this.minTick.toJSONField(),
      maxTick: this.maxTick.toJSONField(),
      version: this.version.toString(),
      rewardManagers: fieldToJSON<Vector<'address'>>(`vector<address>`, this.rewardManagers),
    }
  }

  toJSON(): GlobalConfigJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): GlobalConfig {
    return GlobalConfig.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      minTick: decodeFromJSONField(I32.reified(), field.minTick),
      maxTick: decodeFromJSONField(I32.reified(), field.maxTick),
      version: decodeFromJSONField('u64', field.version),
      rewardManagers: decodeFromJSONField(vector('address'), field.rewardManagers),
    })
  }

  static fromJSON(json: Record<string, any>): GlobalConfig {
    if (json.$typeName !== GlobalConfig.$typeName) {
      throw new Error(
        `not a GlobalConfig json object: expected '${GlobalConfig.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return GlobalConfig.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): GlobalConfig {
    if (!isGlobalConfig(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a GlobalConfig object`)
    }
    return GlobalConfig.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link GlobalConfig.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): GlobalConfig {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isGlobalConfig(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a GlobalConfig object`)
    }
    return GlobalConfig.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link GlobalConfig.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): GlobalConfig {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isGlobalConfig(data.bcs.type)) {
        throw new Error(`object at is not a GlobalConfig object`)
      }

      return GlobalConfig.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return GlobalConfig.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<GlobalConfig> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isGlobalConfig(object.type)) {
      throw new Error(`object at id ${id} is not a GlobalConfig object`)
    }
    return GlobalConfig.fromBcs(object.content)
  }
}
