/**
 * The previous version of the contract sent the fees to a recipient address but this state is not used anymore
 * This module is kept for backward compatibility
 */

import { bcs } from '@mysten/sui/bcs'
import { SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromBase64, fromHex, toHex } from '@mysten/sui/utils'
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

/* ============================== PythFeeRecipient =============================== */

export function isPythFeeRecipient(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('pyth', 'set_fee_recipient::PythFeeRecipient')
    }::set_fee_recipient::PythFeeRecipient`
}

export interface PythFeeRecipientFields {
  recipient: ToField<'address'>
}

export type PythFeeRecipientReified = Reified<PythFeeRecipient, PythFeeRecipientFields>

export type PythFeeRecipientJSONField = {
  recipient: string
}

export type PythFeeRecipientJSON = {
  $typeName: typeof PythFeeRecipient.$typeName
  $typeArgs: []
} & PythFeeRecipientJSONField

export class PythFeeRecipient implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::set_fee_recipient::PythFeeRecipient` = `${
    getTypeOrigin('pyth', 'set_fee_recipient::PythFeeRecipient')
  }::set_fee_recipient::PythFeeRecipient` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof PythFeeRecipient.$typeName = PythFeeRecipient.$typeName
  readonly $fullTypeName: `${string}::set_fee_recipient::PythFeeRecipient`
  readonly $typeArgs: []
  readonly $isPhantom: typeof PythFeeRecipient.$isPhantom = PythFeeRecipient.$isPhantom

  readonly recipient: ToField<'address'>

  private constructor(typeArgs: [], fields: PythFeeRecipientFields) {
    this.$fullTypeName = composeSuiType(
      PythFeeRecipient.$typeName,
      ...typeArgs,
    ) as `${string}::set_fee_recipient::PythFeeRecipient`
    this.$typeArgs = typeArgs

    this.recipient = fields.recipient
  }

  static reified(): PythFeeRecipientReified {
    const reifiedBcs = PythFeeRecipient.bcs
    return {
      typeName: PythFeeRecipient.$typeName,
      fullTypeName: composeSuiType(
        PythFeeRecipient.$typeName,
        ...[],
      ) as `${string}::set_fee_recipient::PythFeeRecipient`,
      typeArgs: [] as [],
      isPhantom: PythFeeRecipient.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PythFeeRecipient.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PythFeeRecipient.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PythFeeRecipient.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PythFeeRecipient.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PythFeeRecipient.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => PythFeeRecipient.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PythFeeRecipient.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => PythFeeRecipient.fetch(client, id),
      new: (fields: PythFeeRecipientFields) => {
        return new PythFeeRecipient([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): PythFeeRecipientReified {
    return PythFeeRecipient.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PythFeeRecipient>> {
    return phantom(PythFeeRecipient.reified())
  }

  static get p(): PhantomReified<ToTypeStr<PythFeeRecipient>> {
    return PythFeeRecipient.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('PythFeeRecipient', {
      recipient: bcs.bytes(32).transform({
        input: (val: string) => fromHex(val),
        output: (val: Uint8Array) => toHex(val),
      }),
    })
  }

  private static cachedBcs: ReturnType<typeof PythFeeRecipient.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof PythFeeRecipient.instantiateBcs> {
    if (!PythFeeRecipient.cachedBcs) {
      PythFeeRecipient.cachedBcs = PythFeeRecipient.instantiateBcs()
    }
    return PythFeeRecipient.cachedBcs
  }

  static fromFields(fields: Record<string, any>): PythFeeRecipient {
    return PythFeeRecipient.reified().new({
      recipient: decodeFromFields('address', fields.recipient),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PythFeeRecipient {
    if (!isPythFeeRecipient(item.type)) {
      throw new Error('not a PythFeeRecipient type')
    }

    return PythFeeRecipient.reified().new({
      recipient: decodeFromFieldsWithTypes('address', item.fields.recipient),
    })
  }

  static fromBcs(data: Uint8Array): PythFeeRecipient {
    return PythFeeRecipient.fromFields(PythFeeRecipient.bcs.parse(data))
  }

  toJSONField(): PythFeeRecipientJSONField {
    return {
      recipient: this.recipient,
    }
  }

  toJSON(): PythFeeRecipientJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PythFeeRecipient {
    return PythFeeRecipient.reified().new({
      recipient: decodeFromJSONField('address', field.recipient),
    })
  }

  static fromJSON(json: Record<string, any>): PythFeeRecipient {
    if (json.$typeName !== PythFeeRecipient.$typeName) {
      throw new Error(
        `not a PythFeeRecipient json object: expected '${PythFeeRecipient.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return PythFeeRecipient.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): PythFeeRecipient {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPythFeeRecipient(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PythFeeRecipient object`)
    }
    return PythFeeRecipient.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): PythFeeRecipient {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPythFeeRecipient(data.bcs.type)) {
        throw new Error(`object at is not a PythFeeRecipient object`)
      }

      return PythFeeRecipient.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PythFeeRecipient.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<PythFeeRecipient> {
    const res = await fetchObjectBcs(client, id)
    if (!isPythFeeRecipient(res.type)) {
      throw new Error(`object at id ${id} is not a PythFeeRecipient object`)
    }

    return PythFeeRecipient.fromBcs(res.bcsBytes)
  }
}
