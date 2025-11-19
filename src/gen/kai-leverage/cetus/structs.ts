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
} from '../../_framework/reified'
import { FieldsWithTypes, composeSuiType, compressSuiType } from '../../_framework/util'
import { PKG_V12 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== AHandleExploitedPosition =============================== */

export function isAHandleExploitedPosition(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V12}::cetus::AHandleExploitedPosition`
}

export interface AHandleExploitedPositionFields {
  dummyField: ToField<'bool'>
}

export type AHandleExploitedPositionReified = Reified<
  AHandleExploitedPosition,
  AHandleExploitedPositionFields
>

export class AHandleExploitedPosition implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V12}::cetus::AHandleExploitedPosition`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = AHandleExploitedPosition.$typeName
  readonly $fullTypeName: `${typeof PKG_V12}::cetus::AHandleExploitedPosition`
  readonly $typeArgs: []
  readonly $isPhantom = AHandleExploitedPosition.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: AHandleExploitedPositionFields) {
    this.$fullTypeName = composeSuiType(
      AHandleExploitedPosition.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V12}::cetus::AHandleExploitedPosition`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): AHandleExploitedPositionReified {
    const reifiedBcs = AHandleExploitedPosition.bcs
    return {
      typeName: AHandleExploitedPosition.$typeName,
      fullTypeName: composeSuiType(
        AHandleExploitedPosition.$typeName,
        ...[]
      ) as `${typeof PKG_V12}::cetus::AHandleExploitedPosition`,
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
      fetch: async (client: SuiClient, id: string) => AHandleExploitedPosition.fetch(client, id),
      new: (fields: AHandleExploitedPositionFields) => {
        return new AHandleExploitedPosition([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return AHandleExploitedPosition.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AHandleExploitedPosition>> {
    return phantom(AHandleExploitedPosition.reified())
  }
  static get p() {
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

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AHandleExploitedPosition {
    return AHandleExploitedPosition.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): AHandleExploitedPosition {
    if (json.$typeName !== AHandleExploitedPosition.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return AHandleExploitedPosition.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): AHandleExploitedPosition {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAHandleExploitedPosition(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a AHandleExploitedPosition object`
      )
    }
    return AHandleExploitedPosition.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): AHandleExploitedPosition {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAHandleExploitedPosition(data.bcs.type)) {
        throw new Error(`object at is not a AHandleExploitedPosition object`)
      }

      return AHandleExploitedPosition.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AHandleExploitedPosition.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<AHandleExploitedPosition> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(
        `error fetching AHandleExploitedPosition object at id ${id}: ${res.error.code}`
      )
    }
    if (
      res.data?.bcs?.dataType !== 'moveObject' ||
      !isAHandleExploitedPosition(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a AHandleExploitedPosition object`)
    }

    return AHandleExploitedPosition.fromSuiObjectData(res.data)
  }
}
