/**
 * This module implements a public method intended to be called after an
 * upgrade has been committed. The purpose is to add one-off migration logic
 * that would alter Token Bridge `State`.
 *
 * Included in migration is the ability to ensure that breaking changes for
 * any of Token Bridge's methods by enforcing the current build version as
 * their required minimum version.
 */

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
import { ID } from '../../../sui/object/structs'

/* ============================== MigrateComplete =============================== */

export function isMigrateComplete(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('token-bridge', 'migrate::MigrateComplete')}::migrate::MigrateComplete`
}

export interface MigrateCompleteFields {
  package: ToField<ID>
}

export type MigrateCompleteReified = Reified<MigrateComplete, MigrateCompleteFields>

export type MigrateCompleteJSONField = {
  package: string
}

export type MigrateCompleteJSON = {
  $typeName: typeof MigrateComplete.$typeName
  $typeArgs: []
} & MigrateCompleteJSONField

/** Event reflecting when `migrate` is successfully executed. */
export class MigrateComplete implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::migrate::MigrateComplete` = `${
    getTypeOrigin('token-bridge', 'migrate::MigrateComplete')
  }::migrate::MigrateComplete` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof MigrateComplete.$typeName = MigrateComplete.$typeName
  readonly $fullTypeName: `${string}::migrate::MigrateComplete`
  readonly $typeArgs: []
  readonly $isPhantom: typeof MigrateComplete.$isPhantom = MigrateComplete.$isPhantom

  readonly package: ToField<ID>

  private constructor(typeArgs: [], fields: MigrateCompleteFields) {
    this.$fullTypeName = composeSuiType(
      MigrateComplete.$typeName,
      ...typeArgs,
    ) as `${string}::migrate::MigrateComplete`
    this.$typeArgs = typeArgs

    this.package = fields.package
  }

  static reified(): MigrateCompleteReified {
    const reifiedBcs = MigrateComplete.bcs
    return {
      typeName: MigrateComplete.$typeName,
      fullTypeName: composeSuiType(
        MigrateComplete.$typeName,
        ...[],
      ) as `${string}::migrate::MigrateComplete`,
      typeArgs: [] as [],
      isPhantom: MigrateComplete.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => MigrateComplete.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => MigrateComplete.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => MigrateComplete.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => MigrateComplete.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => MigrateComplete.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => MigrateComplete.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => MigrateComplete.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => MigrateComplete.fetch(client, id),
      new: (fields: MigrateCompleteFields) => {
        return new MigrateComplete([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): MigrateCompleteReified {
    return MigrateComplete.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<MigrateComplete>> {
    return phantom(MigrateComplete.reified())
  }

  static get p(): PhantomReified<ToTypeStr<MigrateComplete>> {
    return MigrateComplete.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('MigrateComplete', {
      package: ID.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof MigrateComplete.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof MigrateComplete.instantiateBcs> {
    if (!MigrateComplete.cachedBcs) {
      MigrateComplete.cachedBcs = MigrateComplete.instantiateBcs()
    }
    return MigrateComplete.cachedBcs
  }

  static fromFields(fields: Record<string, any>): MigrateComplete {
    return MigrateComplete.reified().new({
      package: decodeFromFields(ID.reified(), fields.package),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): MigrateComplete {
    if (!isMigrateComplete(item.type)) {
      throw new Error('not a MigrateComplete type')
    }

    return MigrateComplete.reified().new({
      package: decodeFromFieldsWithTypes(ID.reified(), item.fields.package),
    })
  }

  static fromBcs(data: Uint8Array): MigrateComplete {
    return MigrateComplete.fromFields(MigrateComplete.bcs.parse(data))
  }

  toJSONField(): MigrateCompleteJSONField {
    return {
      package: this.package,
    }
  }

  toJSON(): MigrateCompleteJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): MigrateComplete {
    return MigrateComplete.reified().new({
      package: decodeFromJSONField(ID.reified(), field.package),
    })
  }

  static fromJSON(json: Record<string, any>): MigrateComplete {
    if (json.$typeName !== MigrateComplete.$typeName) {
      throw new Error(
        `not a MigrateComplete json object: expected '${MigrateComplete.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return MigrateComplete.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): MigrateComplete {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isMigrateComplete(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a MigrateComplete object`)
    }
    return MigrateComplete.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): MigrateComplete {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isMigrateComplete(data.bcs.type)) {
        throw new Error(`object at is not a MigrateComplete object`)
      }

      return MigrateComplete.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return MigrateComplete.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<MigrateComplete> {
    const res = await fetchObjectBcs(client, id)
    if (!isMigrateComplete(res.type)) {
      throw new Error(`object at id ${id} is not a MigrateComplete object`)
    }

    return MigrateComplete.fromBcs(res.bcsBytes)
  }
}
