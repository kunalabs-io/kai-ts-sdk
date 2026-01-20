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

/* ============================== StalePriceThreshold =============================== */

export function isStalePriceThreshold(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('pyth', 'set_stale_price_threshold::StalePriceThreshold')
    }::set_stale_price_threshold::StalePriceThreshold`
}

export interface StalePriceThresholdFields {
  threshold: ToField<'u64'>
}

export type StalePriceThresholdReified = Reified<StalePriceThreshold, StalePriceThresholdFields>

export type StalePriceThresholdJSONField = {
  threshold: string
}

export type StalePriceThresholdJSON = {
  $typeName: typeof StalePriceThreshold.$typeName
  $typeArgs: []
} & StalePriceThresholdJSONField

export class StalePriceThreshold implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::set_stale_price_threshold::StalePriceThreshold` = `${
    getTypeOrigin('pyth', 'set_stale_price_threshold::StalePriceThreshold')
  }::set_stale_price_threshold::StalePriceThreshold` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof StalePriceThreshold.$typeName = StalePriceThreshold.$typeName
  readonly $fullTypeName: `${string}::set_stale_price_threshold::StalePriceThreshold`
  readonly $typeArgs: []
  readonly $isPhantom: typeof StalePriceThreshold.$isPhantom = StalePriceThreshold.$isPhantom

  readonly threshold: ToField<'u64'>

  private constructor(typeArgs: [], fields: StalePriceThresholdFields) {
    this.$fullTypeName = composeSuiType(
      StalePriceThreshold.$typeName,
      ...typeArgs,
    ) as `${string}::set_stale_price_threshold::StalePriceThreshold`
    this.$typeArgs = typeArgs

    this.threshold = fields.threshold
  }

  static reified(): StalePriceThresholdReified {
    const reifiedBcs = StalePriceThreshold.bcs
    return {
      typeName: StalePriceThreshold.$typeName,
      fullTypeName: composeSuiType(
        StalePriceThreshold.$typeName,
        ...[],
      ) as `${string}::set_stale_price_threshold::StalePriceThreshold`,
      typeArgs: [] as [],
      isPhantom: StalePriceThreshold.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => StalePriceThreshold.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => StalePriceThreshold.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => StalePriceThreshold.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => StalePriceThreshold.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => StalePriceThreshold.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => StalePriceThreshold.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => StalePriceThreshold.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) =>
        StalePriceThreshold.fetch(client, id),
      new: (fields: StalePriceThresholdFields) => {
        return new StalePriceThreshold([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): StalePriceThresholdReified {
    return StalePriceThreshold.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<StalePriceThreshold>> {
    return phantom(StalePriceThreshold.reified())
  }

  static get p(): PhantomReified<ToTypeStr<StalePriceThreshold>> {
    return StalePriceThreshold.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('StalePriceThreshold', {
      threshold: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof StalePriceThreshold.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof StalePriceThreshold.instantiateBcs> {
    if (!StalePriceThreshold.cachedBcs) {
      StalePriceThreshold.cachedBcs = StalePriceThreshold.instantiateBcs()
    }
    return StalePriceThreshold.cachedBcs
  }

  static fromFields(fields: Record<string, any>): StalePriceThreshold {
    return StalePriceThreshold.reified().new({
      threshold: decodeFromFields('u64', fields.threshold),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): StalePriceThreshold {
    if (!isStalePriceThreshold(item.type)) {
      throw new Error('not a StalePriceThreshold type')
    }

    return StalePriceThreshold.reified().new({
      threshold: decodeFromFieldsWithTypes('u64', item.fields.threshold),
    })
  }

  static fromBcs(data: Uint8Array): StalePriceThreshold {
    return StalePriceThreshold.fromFields(StalePriceThreshold.bcs.parse(data))
  }

  toJSONField(): StalePriceThresholdJSONField {
    return {
      threshold: this.threshold.toString(),
    }
  }

  toJSON(): StalePriceThresholdJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): StalePriceThreshold {
    return StalePriceThreshold.reified().new({
      threshold: decodeFromJSONField('u64', field.threshold),
    })
  }

  static fromJSON(json: Record<string, any>): StalePriceThreshold {
    if (json.$typeName !== StalePriceThreshold.$typeName) {
      throw new Error(
        `not a StalePriceThreshold json object: expected '${StalePriceThreshold.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return StalePriceThreshold.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): StalePriceThreshold {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isStalePriceThreshold(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a StalePriceThreshold object`)
    }
    return StalePriceThreshold.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): StalePriceThreshold {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isStalePriceThreshold(data.bcs.type)) {
        throw new Error(`object at is not a StalePriceThreshold object`)
      }

      return StalePriceThreshold.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return StalePriceThreshold.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<StalePriceThreshold> {
    const res = await fetchObjectBcs(client, id)
    if (!isStalePriceThreshold(res.type)) {
      throw new Error(`object at id ${id} is not a StalePriceThreshold object`)
    }

    return StalePriceThreshold.fromBcs(res.bcsBytes)
  }
}
