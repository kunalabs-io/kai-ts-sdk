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

/* ============================== UpdateFee =============================== */

export function isUpdateFee(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('pyth', 'set_update_fee::UpdateFee')}::set_update_fee::UpdateFee`
}

export interface UpdateFeeFields {
  mantissa: ToField<'u64'>
  exponent: ToField<'u64'>
}

export type UpdateFeeReified = Reified<UpdateFee, UpdateFeeFields>

export type UpdateFeeJSONField = {
  mantissa: string
  exponent: string
}

export type UpdateFeeJSON = {
  $typeName: typeof UpdateFee.$typeName
  $typeArgs: []
} & UpdateFeeJSONField

export class UpdateFee implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::set_update_fee::UpdateFee` = `${
    getTypeOrigin('pyth', 'set_update_fee::UpdateFee')
  }::set_update_fee::UpdateFee` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof UpdateFee.$typeName = UpdateFee.$typeName
  readonly $fullTypeName: `${string}::set_update_fee::UpdateFee`
  readonly $typeArgs: []
  readonly $isPhantom: typeof UpdateFee.$isPhantom = UpdateFee.$isPhantom

  readonly mantissa: ToField<'u64'>
  readonly exponent: ToField<'u64'>

  private constructor(typeArgs: [], fields: UpdateFeeFields) {
    this.$fullTypeName = composeSuiType(
      UpdateFee.$typeName,
      ...typeArgs,
    ) as `${string}::set_update_fee::UpdateFee`
    this.$typeArgs = typeArgs

    this.mantissa = fields.mantissa
    this.exponent = fields.exponent
  }

  static reified(): UpdateFeeReified {
    const reifiedBcs = UpdateFee.bcs
    return {
      typeName: UpdateFee.$typeName,
      fullTypeName: composeSuiType(
        UpdateFee.$typeName,
        ...[],
      ) as `${string}::set_update_fee::UpdateFee`,
      typeArgs: [] as [],
      isPhantom: UpdateFee.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => UpdateFee.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => UpdateFee.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => UpdateFee.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => UpdateFee.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => UpdateFee.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => UpdateFee.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => UpdateFee.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => UpdateFee.fetch(client, id),
      new: (fields: UpdateFeeFields) => {
        return new UpdateFee([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): UpdateFeeReified {
    return UpdateFee.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<UpdateFee>> {
    return phantom(UpdateFee.reified())
  }

  static get p(): PhantomReified<ToTypeStr<UpdateFee>> {
    return UpdateFee.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('UpdateFee', {
      mantissa: bcs.u64(),
      exponent: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof UpdateFee.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof UpdateFee.instantiateBcs> {
    if (!UpdateFee.cachedBcs) {
      UpdateFee.cachedBcs = UpdateFee.instantiateBcs()
    }
    return UpdateFee.cachedBcs
  }

  static fromFields(fields: Record<string, any>): UpdateFee {
    return UpdateFee.reified().new({
      mantissa: decodeFromFields('u64', fields.mantissa),
      exponent: decodeFromFields('u64', fields.exponent),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): UpdateFee {
    if (!isUpdateFee(item.type)) {
      throw new Error('not a UpdateFee type')
    }

    return UpdateFee.reified().new({
      mantissa: decodeFromFieldsWithTypes('u64', item.fields.mantissa),
      exponent: decodeFromFieldsWithTypes('u64', item.fields.exponent),
    })
  }

  static fromBcs(data: Uint8Array): UpdateFee {
    return UpdateFee.fromFields(UpdateFee.bcs.parse(data))
  }

  toJSONField(): UpdateFeeJSONField {
    return {
      mantissa: this.mantissa.toString(),
      exponent: this.exponent.toString(),
    }
  }

  toJSON(): UpdateFeeJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): UpdateFee {
    return UpdateFee.reified().new({
      mantissa: decodeFromJSONField('u64', field.mantissa),
      exponent: decodeFromJSONField('u64', field.exponent),
    })
  }

  static fromJSON(json: Record<string, any>): UpdateFee {
    if (json.$typeName !== UpdateFee.$typeName) {
      throw new Error(
        `not a UpdateFee json object: expected '${UpdateFee.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return UpdateFee.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): UpdateFee {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isUpdateFee(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a UpdateFee object`)
    }
    return UpdateFee.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): UpdateFee {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isUpdateFee(data.bcs.type)) {
        throw new Error(`object at is not a UpdateFee object`)
      }

      return UpdateFee.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return UpdateFee.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<UpdateFee> {
    const res = await fetchObjectBcs(client, id)
    if (!isUpdateFee(res.type)) {
      throw new Error(`object at id ${id} is not a UpdateFee object`)
    }

    return UpdateFee.fromBcs(res.bcsBytes)
  }
}
