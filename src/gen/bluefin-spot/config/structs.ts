import * as reified from '../../_framework/reified'
import {
  PhantomReified,
  Reified,
  StructClass,
  ToField,
  ToTypeStr,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  fieldToJSON,
  phantom,
} from '../../_framework/reified'
import { FieldsWithTypes, composeSuiType, compressSuiType } from '../../_framework/util'
import { Vector } from '../../_framework/vector'
import { I32 } from '../../integer-mate/i32/structs'
import { UID } from '../../sui/object/structs'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64, fromHEX, toHEX } from '@mysten/sui/utils'

/* ============================== GlobalConfig =============================== */

export function isGlobalConfig(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::config::GlobalConfig`
}

export interface GlobalConfigFields {
  id: ToField<UID>
  minTick: ToField<I32>
  maxTick: ToField<I32>
  version: ToField<'u64'>
  rewardManagers: ToField<Vector<'address'>>
}

export type GlobalConfigReified = Reified<GlobalConfig, GlobalConfigFields>

export class GlobalConfig implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::config::GlobalConfig`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = GlobalConfig.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::config::GlobalConfig`
  readonly $typeArgs: []
  readonly $isPhantom = GlobalConfig.$isPhantom

  readonly id: ToField<UID>
  readonly minTick: ToField<I32>
  readonly maxTick: ToField<I32>
  readonly version: ToField<'u64'>
  readonly rewardManagers: ToField<Vector<'address'>>

  private constructor(typeArgs: [], fields: GlobalConfigFields) {
    this.$fullTypeName = composeSuiType(
      GlobalConfig.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::config::GlobalConfig`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.minTick = fields.minTick
    this.maxTick = fields.maxTick
    this.version = fields.version
    this.rewardManagers = fields.rewardManagers
  }

  static reified(): GlobalConfigReified {
    return {
      typeName: GlobalConfig.$typeName,
      fullTypeName: composeSuiType(
        GlobalConfig.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::config::GlobalConfig`,
      typeArgs: [] as [],
      isPhantom: GlobalConfig.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => GlobalConfig.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => GlobalConfig.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => GlobalConfig.fromBcs(data),
      bcs: GlobalConfig.bcs,
      fromJSONField: (field: any) => GlobalConfig.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => GlobalConfig.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => GlobalConfig.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => GlobalConfig.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => GlobalConfig.fetch(client, id),
      new: (fields: GlobalConfigFields) => {
        return new GlobalConfig([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return GlobalConfig.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<GlobalConfig>> {
    return phantom(GlobalConfig.reified())
  }
  static get p() {
    return GlobalConfig.phantom()
  }

  static get bcs() {
    return bcs.struct('GlobalConfig', {
      id: UID.bcs,
      min_tick: I32.bcs,
      max_tick: I32.bcs,
      version: bcs.u64(),
      reward_managers: bcs.vector(
        bcs.bytes(32).transform({
          input: (val: string) => fromHEX(val),
          output: (val: Uint8Array) => toHEX(val),
        })
      ),
    })
  }

  static fromFields(fields: Record<string, any>): GlobalConfig {
    return GlobalConfig.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      minTick: decodeFromFields(I32.reified(), fields.min_tick),
      maxTick: decodeFromFields(I32.reified(), fields.max_tick),
      version: decodeFromFields('u64', fields.version),
      rewardManagers: decodeFromFields(reified.vector('address'), fields.reward_managers),
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
      rewardManagers: decodeFromFieldsWithTypes(
        reified.vector('address'),
        item.fields.reward_managers
      ),
    })
  }

  static fromBcs(data: Uint8Array): GlobalConfig {
    return GlobalConfig.fromFields(GlobalConfig.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      minTick: this.minTick.toJSONField(),
      maxTick: this.maxTick.toJSONField(),
      version: this.version.toString(),
      rewardManagers: fieldToJSON<Vector<'address'>>(`vector<address>`, this.rewardManagers),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): GlobalConfig {
    return GlobalConfig.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      minTick: decodeFromJSONField(I32.reified(), field.minTick),
      maxTick: decodeFromJSONField(I32.reified(), field.maxTick),
      version: decodeFromJSONField('u64', field.version),
      rewardManagers: decodeFromJSONField(reified.vector('address'), field.rewardManagers),
    })
  }

  static fromJSON(json: Record<string, any>): GlobalConfig {
    if (json.$typeName !== GlobalConfig.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return GlobalConfig.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): GlobalConfig {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isGlobalConfig(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a GlobalConfig object`)
    }
    return GlobalConfig.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): GlobalConfig {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isGlobalConfig(data.bcs.type)) {
        throw new Error(`object at is not a GlobalConfig object`)
      }

      return GlobalConfig.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return GlobalConfig.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<GlobalConfig> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching GlobalConfig object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isGlobalConfig(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a GlobalConfig object`)
    }

    return GlobalConfig.fromSuiObjectData(res.data)
  }
}
