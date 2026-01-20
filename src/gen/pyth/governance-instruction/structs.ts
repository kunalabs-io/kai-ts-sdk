import { bcs } from '@mysten/sui/bcs'
import { SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromBase64 } from '@mysten/sui/utils'
import { getTypeOrigin } from '../../_envs'
import {
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  fieldToJSON,
  phantom,
  PhantomReified,
  Reified,
  StructClass,
  ToField,
  ToJSON,
  ToTypeStr,
  vector,
} from '../../_framework/reified'
import {
  composeSuiType,
  compressSuiType,
  fetchObjectBcs,
  FieldsWithTypes,
  SupportedSuiClient,
} from '../../_framework/util'
import { Vector } from '../../_framework/vector'
import { GovernanceAction } from '../governance-action/structs'

/* ============================== GovernanceInstruction =============================== */

export function isGovernanceInstruction(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('pyth', 'governance_instruction::GovernanceInstruction')
    }::governance_instruction::GovernanceInstruction`
}

export interface GovernanceInstructionFields {
  module: ToField<'u8'>
  action: ToField<GovernanceAction>
  targetChainId: ToField<'u64'>
  payload: ToField<Vector<'u8'>>
}

export type GovernanceInstructionReified = Reified<
  GovernanceInstruction,
  GovernanceInstructionFields
>

export type GovernanceInstructionJSONField = {
  module: number
  action: ToJSON<GovernanceAction>
  targetChainId: string
  payload: number[]
}

export type GovernanceInstructionJSON = {
  $typeName: typeof GovernanceInstruction.$typeName
  $typeArgs: []
} & GovernanceInstructionJSONField

export class GovernanceInstruction implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::governance_instruction::GovernanceInstruction` = `${
    getTypeOrigin('pyth', 'governance_instruction::GovernanceInstruction')
  }::governance_instruction::GovernanceInstruction` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof GovernanceInstruction.$typeName = GovernanceInstruction.$typeName
  readonly $fullTypeName: `${string}::governance_instruction::GovernanceInstruction`
  readonly $typeArgs: []
  readonly $isPhantom: typeof GovernanceInstruction.$isPhantom = GovernanceInstruction.$isPhantom

  readonly module: ToField<'u8'>
  readonly action: ToField<GovernanceAction>
  readonly targetChainId: ToField<'u64'>
  readonly payload: ToField<Vector<'u8'>>

  private constructor(typeArgs: [], fields: GovernanceInstructionFields) {
    this.$fullTypeName = composeSuiType(
      GovernanceInstruction.$typeName,
      ...typeArgs,
    ) as `${string}::governance_instruction::GovernanceInstruction`
    this.$typeArgs = typeArgs

    this.module = fields.module
    this.action = fields.action
    this.targetChainId = fields.targetChainId
    this.payload = fields.payload
  }

  static reified(): GovernanceInstructionReified {
    const reifiedBcs = GovernanceInstruction.bcs
    return {
      typeName: GovernanceInstruction.$typeName,
      fullTypeName: composeSuiType(
        GovernanceInstruction.$typeName,
        ...[],
      ) as `${string}::governance_instruction::GovernanceInstruction`,
      typeArgs: [] as [],
      isPhantom: GovernanceInstruction.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => GovernanceInstruction.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        GovernanceInstruction.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => GovernanceInstruction.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => GovernanceInstruction.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => GovernanceInstruction.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        GovernanceInstruction.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        GovernanceInstruction.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) =>
        GovernanceInstruction.fetch(client, id),
      new: (fields: GovernanceInstructionFields) => {
        return new GovernanceInstruction([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): GovernanceInstructionReified {
    return GovernanceInstruction.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<GovernanceInstruction>> {
    return phantom(GovernanceInstruction.reified())
  }

  static get p(): PhantomReified<ToTypeStr<GovernanceInstruction>> {
    return GovernanceInstruction.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('GovernanceInstruction', {
      module_: bcs.u8(),
      action: GovernanceAction.bcs,
      target_chain_id: bcs.u64(),
      payload: bcs.vector(bcs.u8()),
    })
  }

  private static cachedBcs: ReturnType<typeof GovernanceInstruction.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof GovernanceInstruction.instantiateBcs> {
    if (!GovernanceInstruction.cachedBcs) {
      GovernanceInstruction.cachedBcs = GovernanceInstruction.instantiateBcs()
    }
    return GovernanceInstruction.cachedBcs
  }

  static fromFields(fields: Record<string, any>): GovernanceInstruction {
    return GovernanceInstruction.reified().new({
      module: decodeFromFields('u8', fields.module_),
      action: decodeFromFields(GovernanceAction.reified(), fields.action),
      targetChainId: decodeFromFields('u64', fields.target_chain_id),
      payload: decodeFromFields(vector('u8'), fields.payload),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): GovernanceInstruction {
    if (!isGovernanceInstruction(item.type)) {
      throw new Error('not a GovernanceInstruction type')
    }

    return GovernanceInstruction.reified().new({
      module: decodeFromFieldsWithTypes('u8', item.fields.module_),
      action: decodeFromFieldsWithTypes(GovernanceAction.reified(), item.fields.action),
      targetChainId: decodeFromFieldsWithTypes('u64', item.fields.target_chain_id),
      payload: decodeFromFieldsWithTypes(vector('u8'), item.fields.payload),
    })
  }

  static fromBcs(data: Uint8Array): GovernanceInstruction {
    return GovernanceInstruction.fromFields(GovernanceInstruction.bcs.parse(data))
  }

  toJSONField(): GovernanceInstructionJSONField {
    return {
      module: this.module,
      action: this.action.toJSONField(),
      targetChainId: this.targetChainId.toString(),
      payload: fieldToJSON<Vector<'u8'>>(`vector<u8>`, this.payload),
    }
  }

  toJSON(): GovernanceInstructionJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): GovernanceInstruction {
    return GovernanceInstruction.reified().new({
      module: decodeFromJSONField('u8', field.module),
      action: decodeFromJSONField(GovernanceAction.reified(), field.action),
      targetChainId: decodeFromJSONField('u64', field.targetChainId),
      payload: decodeFromJSONField(vector('u8'), field.payload),
    })
  }

  static fromJSON(json: Record<string, any>): GovernanceInstruction {
    if (json.$typeName !== GovernanceInstruction.$typeName) {
      throw new Error(
        `not a GovernanceInstruction json object: expected '${GovernanceInstruction.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return GovernanceInstruction.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): GovernanceInstruction {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isGovernanceInstruction(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a GovernanceInstruction object`,
      )
    }
    return GovernanceInstruction.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): GovernanceInstruction {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isGovernanceInstruction(data.bcs.type)) {
        throw new Error(`object at is not a GovernanceInstruction object`)
      }

      return GovernanceInstruction.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return GovernanceInstruction.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<GovernanceInstruction> {
    const res = await fetchObjectBcs(client, id)
    if (!isGovernanceInstruction(res.type)) {
      throw new Error(`object at id ${id} is not a GovernanceInstruction object`)
    }

    return GovernanceInstruction.fromBcs(res.bcsBytes)
  }
}
