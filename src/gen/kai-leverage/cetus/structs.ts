/**
 * Cetus DEX integration for leveraged concentrated liquidity positions.
 *
 * This module provides a complete adapter layer for integrating Kai Leverage
 * with the Cetus concentrated liquidity AMM. It translates between the generic
 * position management interface and Cetus-specific pool operations, handling
 * liquidity provision, fee collection, and reward distribution.
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

/* ============================== AHandleExploitedPosition =============================== */

export function isAHandleExploitedPosition(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('kai-leverage', 'cetus::AHandleExploitedPosition')
    }::cetus::AHandleExploitedPosition`
}

export interface AHandleExploitedPositionFields {
  dummyField: ToField<'bool'>
}

export type AHandleExploitedPositionReified = Reified<
  AHandleExploitedPosition,
  AHandleExploitedPositionFields
>

export type AHandleExploitedPositionJSONField = {
  dummyField: boolean
}

export type AHandleExploitedPositionJSON = {
  $typeName: typeof AHandleExploitedPosition.$typeName
  $typeArgs: []
} & AHandleExploitedPositionJSONField

export class AHandleExploitedPosition implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::cetus::AHandleExploitedPosition` = `${
    getTypeOrigin('kai-leverage', 'cetus::AHandleExploitedPosition')
  }::cetus::AHandleExploitedPosition` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof AHandleExploitedPosition.$typeName = AHandleExploitedPosition.$typeName
  readonly $fullTypeName: `${string}::cetus::AHandleExploitedPosition`
  readonly $typeArgs: []
  readonly $isPhantom: typeof AHandleExploitedPosition.$isPhantom =
    AHandleExploitedPosition.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: AHandleExploitedPositionFields) {
    this.$fullTypeName = composeSuiType(
      AHandleExploitedPosition.$typeName,
      ...typeArgs,
    ) as `${string}::cetus::AHandleExploitedPosition`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): AHandleExploitedPositionReified {
    const reifiedBcs = AHandleExploitedPosition.bcs
    return {
      typeName: AHandleExploitedPosition.$typeName,
      fullTypeName: composeSuiType(
        AHandleExploitedPosition.$typeName,
        ...[],
      ) as `${string}::cetus::AHandleExploitedPosition`,
      typeArgs: [] as [],
      isPhantom: AHandleExploitedPosition.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AHandleExploitedPosition.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        AHandleExploitedPosition.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AHandleExploitedPosition.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AHandleExploitedPosition.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AHandleExploitedPosition.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        AHandleExploitedPosition.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        AHandleExploitedPosition.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) =>
        AHandleExploitedPosition.fetch(client, id),
      new: (fields: AHandleExploitedPositionFields) => {
        return new AHandleExploitedPosition([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): AHandleExploitedPositionReified {
    return AHandleExploitedPosition.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AHandleExploitedPosition>> {
    return phantom(AHandleExploitedPosition.reified())
  }

  static get p(): PhantomReified<ToTypeStr<AHandleExploitedPosition>> {
    return AHandleExploitedPosition.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AHandleExploitedPosition', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof AHandleExploitedPosition.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof AHandleExploitedPosition.instantiateBcs> {
    if (!AHandleExploitedPosition.cachedBcs) {
      AHandleExploitedPosition.cachedBcs = AHandleExploitedPosition.instantiateBcs()
    }
    return AHandleExploitedPosition.cachedBcs
  }

  static fromFields(fields: Record<string, any>): AHandleExploitedPosition {
    return AHandleExploitedPosition.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): AHandleExploitedPosition {
    if (!isAHandleExploitedPosition(item.type)) {
      throw new Error('not a AHandleExploitedPosition type')
    }

    return AHandleExploitedPosition.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): AHandleExploitedPosition {
    return AHandleExploitedPosition.fromFields(AHandleExploitedPosition.bcs.parse(data))
  }

  toJSONField(): AHandleExploitedPositionJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): AHandleExploitedPositionJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AHandleExploitedPosition {
    return AHandleExploitedPosition.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): AHandleExploitedPosition {
    if (json.$typeName !== AHandleExploitedPosition.$typeName) {
      throw new Error(
        `not a AHandleExploitedPosition json object: expected '${AHandleExploitedPosition.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return AHandleExploitedPosition.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): AHandleExploitedPosition {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAHandleExploitedPosition(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a AHandleExploitedPosition object`,
      )
    }
    return AHandleExploitedPosition.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): AHandleExploitedPosition {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAHandleExploitedPosition(data.bcs.type)) {
        throw new Error(`object at is not a AHandleExploitedPosition object`)
      }

      return AHandleExploitedPosition.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AHandleExploitedPosition.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<AHandleExploitedPosition> {
    const res = await fetchObjectBcs(client, id)
    if (!isAHandleExploitedPosition(res.type)) {
      throw new Error(`object at id ${id} is not a AHandleExploitedPosition object`)
    }

    return AHandleExploitedPosition.fromBcs(res.bcsBytes)
  }
}
