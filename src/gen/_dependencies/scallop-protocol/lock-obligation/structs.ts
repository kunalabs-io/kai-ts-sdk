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
import { TypeName } from '../../../std/type-name/structs'
import { ID } from '../../../sui/object/structs'

/* ============================== ObligationUnhealthyUnlocked =============================== */

export function isObligationUnhealthyUnlocked(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('scallop-protocol', 'lock_obligation::ObligationUnhealthyUnlocked')
    }::lock_obligation::ObligationUnhealthyUnlocked`
}

export interface ObligationUnhealthyUnlockedFields {
  obligation: ToField<ID>
  witness: ToField<TypeName>
}

export type ObligationUnhealthyUnlockedReified = Reified<
  ObligationUnhealthyUnlocked,
  ObligationUnhealthyUnlockedFields
>

export type ObligationUnhealthyUnlockedJSONField = {
  obligation: string
  witness: string
}

export type ObligationUnhealthyUnlockedJSON = {
  $typeName: typeof ObligationUnhealthyUnlocked.$typeName
  $typeArgs: []
} & ObligationUnhealthyUnlockedJSONField

export class ObligationUnhealthyUnlocked implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::lock_obligation::ObligationUnhealthyUnlocked` = `${
    getTypeOrigin('scallop-protocol', 'lock_obligation::ObligationUnhealthyUnlocked')
  }::lock_obligation::ObligationUnhealthyUnlocked` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof ObligationUnhealthyUnlocked.$typeName =
    ObligationUnhealthyUnlocked.$typeName
  readonly $fullTypeName: `${string}::lock_obligation::ObligationUnhealthyUnlocked`
  readonly $typeArgs: []
  readonly $isPhantom: typeof ObligationUnhealthyUnlocked.$isPhantom =
    ObligationUnhealthyUnlocked.$isPhantom

  readonly obligation: ToField<ID>
  readonly witness: ToField<TypeName>

  private constructor(typeArgs: [], fields: ObligationUnhealthyUnlockedFields) {
    this.$fullTypeName = composeSuiType(
      ObligationUnhealthyUnlocked.$typeName,
      ...typeArgs,
    ) as `${string}::lock_obligation::ObligationUnhealthyUnlocked`
    this.$typeArgs = typeArgs

    this.obligation = fields.obligation
    this.witness = fields.witness
  }

  static reified(): ObligationUnhealthyUnlockedReified {
    const reifiedBcs = ObligationUnhealthyUnlocked.bcs
    return {
      typeName: ObligationUnhealthyUnlocked.$typeName,
      fullTypeName: composeSuiType(
        ObligationUnhealthyUnlocked.$typeName,
        ...[],
      ) as `${string}::lock_obligation::ObligationUnhealthyUnlocked`,
      typeArgs: [] as [],
      isPhantom: ObligationUnhealthyUnlocked.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ObligationUnhealthyUnlocked.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        ObligationUnhealthyUnlocked.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ObligationUnhealthyUnlocked.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ObligationUnhealthyUnlocked.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ObligationUnhealthyUnlocked.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        ObligationUnhealthyUnlocked.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        ObligationUnhealthyUnlocked.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) =>
        ObligationUnhealthyUnlocked.fetch(client, id),
      new: (fields: ObligationUnhealthyUnlockedFields) => {
        return new ObligationUnhealthyUnlocked([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): ObligationUnhealthyUnlockedReified {
    return ObligationUnhealthyUnlocked.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ObligationUnhealthyUnlocked>> {
    return phantom(ObligationUnhealthyUnlocked.reified())
  }

  static get p(): PhantomReified<ToTypeStr<ObligationUnhealthyUnlocked>> {
    return ObligationUnhealthyUnlocked.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ObligationUnhealthyUnlocked', {
      obligation: ID.bcs,
      witness: TypeName.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof ObligationUnhealthyUnlocked.instantiateBcs> | null =
    null

  static get bcs(): ReturnType<typeof ObligationUnhealthyUnlocked.instantiateBcs> {
    if (!ObligationUnhealthyUnlocked.cachedBcs) {
      ObligationUnhealthyUnlocked.cachedBcs = ObligationUnhealthyUnlocked.instantiateBcs()
    }
    return ObligationUnhealthyUnlocked.cachedBcs
  }

  static fromFields(fields: Record<string, any>): ObligationUnhealthyUnlocked {
    return ObligationUnhealthyUnlocked.reified().new({
      obligation: decodeFromFields(ID.reified(), fields.obligation),
      witness: decodeFromFields(TypeName.reified(), fields.witness),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ObligationUnhealthyUnlocked {
    if (!isObligationUnhealthyUnlocked(item.type)) {
      throw new Error('not a ObligationUnhealthyUnlocked type')
    }

    return ObligationUnhealthyUnlocked.reified().new({
      obligation: decodeFromFieldsWithTypes(ID.reified(), item.fields.obligation),
      witness: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.witness),
    })
  }

  static fromBcs(data: Uint8Array): ObligationUnhealthyUnlocked {
    return ObligationUnhealthyUnlocked.fromFields(ObligationUnhealthyUnlocked.bcs.parse(data))
  }

  toJSONField(): ObligationUnhealthyUnlockedJSONField {
    return {
      obligation: this.obligation,
      witness: this.witness,
    }
  }

  toJSON(): ObligationUnhealthyUnlockedJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ObligationUnhealthyUnlocked {
    return ObligationUnhealthyUnlocked.reified().new({
      obligation: decodeFromJSONField(ID.reified(), field.obligation),
      witness: decodeFromJSONField(TypeName.reified(), field.witness),
    })
  }

  static fromJSON(json: Record<string, any>): ObligationUnhealthyUnlocked {
    if (json.$typeName !== ObligationUnhealthyUnlocked.$typeName) {
      throw new Error(
        `not a ObligationUnhealthyUnlocked json object: expected '${ObligationUnhealthyUnlocked.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return ObligationUnhealthyUnlocked.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): ObligationUnhealthyUnlocked {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isObligationUnhealthyUnlocked(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a ObligationUnhealthyUnlocked object`,
      )
    }
    return ObligationUnhealthyUnlocked.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): ObligationUnhealthyUnlocked {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isObligationUnhealthyUnlocked(data.bcs.type)) {
        throw new Error(`object at is not a ObligationUnhealthyUnlocked object`)
      }

      return ObligationUnhealthyUnlocked.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ObligationUnhealthyUnlocked.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<ObligationUnhealthyUnlocked> {
    const res = await fetchObjectBcs(client, id)
    if (!isObligationUnhealthyUnlocked(res.type)) {
      throw new Error(`object at id ${id} is not a ObligationUnhealthyUnlocked object`)
    }

    return ObligationUnhealthyUnlocked.fromBcs(res.bcsBytes)
  }
}
