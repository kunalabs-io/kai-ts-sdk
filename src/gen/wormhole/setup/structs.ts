/**
 * This module implements the mechanism to publish the Wormhole contract and
 * initialize `State` as a shared object.
 */

import { bcs } from '@mysten/sui/bcs'
import { SuiObjectData, SuiParsedData } from '@mysten/sui/client'
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
import {
  composeSuiType,
  compressSuiType,
  fetchObjectBcs,
  FieldsWithTypes,
  SupportedSuiClient,
} from '../../_framework/util'
import { UID } from '../../sui/object/structs'

/* ============================== DeployerCap =============================== */

export function isDeployerCap(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('wormhole', 'setup::DeployerCap')}::setup::DeployerCap`
}

export interface DeployerCapFields {
  id: ToField<UID>
}

export type DeployerCapReified = Reified<DeployerCap, DeployerCapFields>

export type DeployerCapJSONField = {
  id: string
}

export type DeployerCapJSON = {
  $typeName: typeof DeployerCap.$typeName
  $typeArgs: []
} & DeployerCapJSONField

/**
 * Capability created at `init`, which will be destroyed once
 * `init_and_share_state` is called. This ensures only the deployer can
 * create the shared `State`.
 */
export class DeployerCap implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::setup::DeployerCap` = `${
    getTypeOrigin('wormhole', 'setup::DeployerCap')
  }::setup::DeployerCap` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof DeployerCap.$typeName = DeployerCap.$typeName
  readonly $fullTypeName: `${string}::setup::DeployerCap`
  readonly $typeArgs: []
  readonly $isPhantom: typeof DeployerCap.$isPhantom = DeployerCap.$isPhantom

  readonly id: ToField<UID>

  private constructor(typeArgs: [], fields: DeployerCapFields) {
    this.$fullTypeName = composeSuiType(
      DeployerCap.$typeName,
      ...typeArgs,
    ) as `${string}::setup::DeployerCap`
    this.$typeArgs = typeArgs

    this.id = fields.id
  }

  static reified(): DeployerCapReified {
    const reifiedBcs = DeployerCap.bcs
    return {
      typeName: DeployerCap.$typeName,
      fullTypeName: composeSuiType(
        DeployerCap.$typeName,
        ...[],
      ) as `${string}::setup::DeployerCap`,
      typeArgs: [] as [],
      isPhantom: DeployerCap.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => DeployerCap.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => DeployerCap.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => DeployerCap.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => DeployerCap.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => DeployerCap.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => DeployerCap.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => DeployerCap.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => DeployerCap.fetch(client, id),
      new: (fields: DeployerCapFields) => {
        return new DeployerCap([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): DeployerCapReified {
    return DeployerCap.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<DeployerCap>> {
    return phantom(DeployerCap.reified())
  }

  static get p(): PhantomReified<ToTypeStr<DeployerCap>> {
    return DeployerCap.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('DeployerCap', {
      id: UID.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof DeployerCap.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof DeployerCap.instantiateBcs> {
    if (!DeployerCap.cachedBcs) {
      DeployerCap.cachedBcs = DeployerCap.instantiateBcs()
    }
    return DeployerCap.cachedBcs
  }

  static fromFields(fields: Record<string, any>): DeployerCap {
    return DeployerCap.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): DeployerCap {
    if (!isDeployerCap(item.type)) {
      throw new Error('not a DeployerCap type')
    }

    return DeployerCap.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
    })
  }

  static fromBcs(data: Uint8Array): DeployerCap {
    return DeployerCap.fromFields(DeployerCap.bcs.parse(data))
  }

  toJSONField(): DeployerCapJSONField {
    return {
      id: this.id,
    }
  }

  toJSON(): DeployerCapJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): DeployerCap {
    return DeployerCap.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
    })
  }

  static fromJSON(json: Record<string, any>): DeployerCap {
    if (json.$typeName !== DeployerCap.$typeName) {
      throw new Error(
        `not a DeployerCap json object: expected '${DeployerCap.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return DeployerCap.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): DeployerCap {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isDeployerCap(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a DeployerCap object`)
    }
    return DeployerCap.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): DeployerCap {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isDeployerCap(data.bcs.type)) {
        throw new Error(`object at is not a DeployerCap object`)
      }

      return DeployerCap.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return DeployerCap.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<DeployerCap> {
    const res = await fetchObjectBcs(client, id)
    if (!isDeployerCap(res.type)) {
      throw new Error(`object at id ${id} is not a DeployerCap object`)
    }

    return DeployerCap.fromBcs(res.bcsBytes)
  }
}
