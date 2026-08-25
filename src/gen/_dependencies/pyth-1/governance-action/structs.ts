import { bcs } from '@mysten/sui/bcs'
import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import type { SuiObjectData, SuiParsedData } from '@mysten/sui/jsonRpc'
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
import { composeSuiType, compressSuiType, FieldsWithTypes } from '../../../_framework/util'

/* ============================== GovernanceAction =============================== */

export function isGovernanceAction(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('pyth-1', 'governance_action::GovernanceAction')
    }::governance_action::GovernanceAction`
}

export interface GovernanceActionFields {
  value: ToField<'u8'>
}

export type GovernanceActionReified = Reified<GovernanceAction, GovernanceActionFields>

export type GovernanceActionJSONField = {
  value: number
}

export type GovernanceActionJSON = {
  $typeName: typeof GovernanceAction.$typeName
  $typeArgs: []
} & GovernanceActionJSONField

export class GovernanceAction implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::governance_action::GovernanceAction` {
    return `${
      getTypeOrigin('pyth-1', 'governance_action::GovernanceAction')
    }::governance_action::GovernanceAction` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof GovernanceAction.$typeName = GovernanceAction.$typeName
  readonly $fullTypeName: `${string}::governance_action::GovernanceAction`
  readonly $typeArgs: []
  readonly $isPhantom: typeof GovernanceAction.$isPhantom = GovernanceAction.$isPhantom

  readonly value: ToField<'u8'>

  private constructor(typeArgs: [], fields: GovernanceActionFields) {
    this.$fullTypeName = composeSuiType(
      GovernanceAction.$typeName,
      ...typeArgs,
    ) as `${string}::governance_action::GovernanceAction`
    this.$typeArgs = typeArgs

    this.value = fields.value
  }

  static reified(): GovernanceActionReified {
    const reifiedBcs = GovernanceAction.bcs
    return {
      get typeName() {
        return GovernanceAction.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          GovernanceAction.$typeName,
          ...[],
        ) as `${string}::governance_action::GovernanceAction`
      },
      typeArgs: [] as [],
      isPhantom: GovernanceAction.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => GovernanceAction.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => GovernanceAction.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => GovernanceAction.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => GovernanceAction.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => GovernanceAction.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        GovernanceAction.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => GovernanceAction.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => GovernanceAction.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => GovernanceAction.fetch(client, id),
      new: (fields: GovernanceActionFields) => {
        return new GovernanceAction([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): GovernanceActionReified {
    return GovernanceAction.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<GovernanceAction>> {
    return phantom(GovernanceAction.reified())
  }

  static get p(): PhantomReified<ToTypeStr<GovernanceAction>> {
    return GovernanceAction.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('GovernanceAction', {
      value: bcs.u8(),
    })
  }

  private static cachedBcs: ReturnType<typeof GovernanceAction.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof GovernanceAction.instantiateBcs> {
    if (!GovernanceAction.cachedBcs) {
      GovernanceAction.cachedBcs = GovernanceAction.instantiateBcs()
    }
    return GovernanceAction.cachedBcs
  }

  static fromFields(fields: Record<string, any>): GovernanceAction {
    return GovernanceAction.reified().new({
      value: decodeFromFields('u8', fields.value),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): GovernanceAction {
    if (!isGovernanceAction(item.type)) {
      throw new Error('not a GovernanceAction type')
    }

    return GovernanceAction.reified().new({
      value: decodeFromFieldsWithTypes('u8', item.fields.value),
    })
  }

  static fromBcs(data: Uint8Array): GovernanceAction {
    return GovernanceAction.fromFields(GovernanceAction.bcs.parse(data))
  }

  toJSONField(): GovernanceActionJSONField {
    return {
      value: this.value,
    }
  }

  toJSON(): GovernanceActionJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): GovernanceAction {
    return GovernanceAction.reified().new({
      value: decodeFromJSONField('u8', field.value),
    })
  }

  static fromJSON(json: Record<string, any>): GovernanceAction {
    if (json.$typeName !== GovernanceAction.$typeName) {
      throw new Error(
        `not a GovernanceAction json object: expected '${GovernanceAction.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return GovernanceAction.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): GovernanceAction {
    if (!isGovernanceAction(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a GovernanceAction object`)
    }
    return GovernanceAction.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link GovernanceAction.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): GovernanceAction {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isGovernanceAction(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a GovernanceAction object`)
    }
    return GovernanceAction.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link GovernanceAction.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): GovernanceAction {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isGovernanceAction(data.bcs.type)) {
        throw new Error(`object at is not a GovernanceAction object`)
      }

      return GovernanceAction.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return GovernanceAction.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<GovernanceAction> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isGovernanceAction(object.type)) {
      throw new Error(`object at id ${id} is not a GovernanceAction object`)
    }
    return GovernanceAction.fromBcs(object.content)
  }
}
