/**
 * Mathematical model for leveraged CLMM position analysis implementing formal theoretical guarantees.
 *
 * This module implements the mathematical framework from "Concentrated Liquidity with Leverage"
 * ([arXiv:2409.12803](https://arxiv.org/pdf/2409.12803)), providing analytical functions for position
 * valuation, risk assessment, and safety validation with formal mathematical proofs.
 *
 * ## Theoretical Foundation
 *
 * The module implements key mathematical concepts from the paper:
 * - **Position Value**: V_pos(P) = L·f(P, p_a, p_b) where f varies by price range
 * - **Asset Value**: A(P) = V_pos(P) + x_C·P + y_C (total position assets)
 * - **Debt Value**: D(P) = x_D·P + y_D (linear debt evolution)
 * - **Margin Function**: M(P) = A(P)/D(P) with proven monotonicity properties
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

/* ============================== PositionModel =============================== */

export function isPositionModel(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('kai-leverage', 'position_model_clmm::PositionModel')
    }::position_model_clmm::PositionModel`
}

export interface PositionModelFields {
  sqrtPaX64: ToField<'u128'>
  sqrtPbX64: ToField<'u128'>
  l: ToField<'u128'>
  cx: ToField<'u64'>
  cy: ToField<'u64'>
  dx: ToField<'u64'>
  dy: ToField<'u64'>
}

export type PositionModelReified = Reified<PositionModel, PositionModelFields>

export type PositionModelJSONField = {
  sqrtPaX64: string
  sqrtPbX64: string
  l: string
  cx: string
  cy: string
  dx: string
  dy: string
}

export type PositionModelJSON = {
  $typeName: typeof PositionModel.$typeName
  $typeArgs: []
} & PositionModelJSONField

/** Immutable snapshot of a position's parameters. */
export class PositionModel implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::position_model_clmm::PositionModel` = `${
    getTypeOrigin('kai-leverage', 'position_model_clmm::PositionModel')
  }::position_model_clmm::PositionModel` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof PositionModel.$typeName = PositionModel.$typeName
  readonly $fullTypeName: `${string}::position_model_clmm::PositionModel`
  readonly $typeArgs: []
  readonly $isPhantom: typeof PositionModel.$isPhantom = PositionModel.$isPhantom

  readonly sqrtPaX64: ToField<'u128'>
  readonly sqrtPbX64: ToField<'u128'>
  readonly l: ToField<'u128'>
  readonly cx: ToField<'u64'>
  readonly cy: ToField<'u64'>
  readonly dx: ToField<'u64'>
  readonly dy: ToField<'u64'>

  private constructor(typeArgs: [], fields: PositionModelFields) {
    this.$fullTypeName = composeSuiType(
      PositionModel.$typeName,
      ...typeArgs,
    ) as `${string}::position_model_clmm::PositionModel`
    this.$typeArgs = typeArgs

    this.sqrtPaX64 = fields.sqrtPaX64
    this.sqrtPbX64 = fields.sqrtPbX64
    this.l = fields.l
    this.cx = fields.cx
    this.cy = fields.cy
    this.dx = fields.dx
    this.dy = fields.dy
  }

  static reified(): PositionModelReified {
    const reifiedBcs = PositionModel.bcs
    return {
      typeName: PositionModel.$typeName,
      fullTypeName: composeSuiType(
        PositionModel.$typeName,
        ...[],
      ) as `${string}::position_model_clmm::PositionModel`,
      typeArgs: [] as [],
      isPhantom: PositionModel.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PositionModel.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PositionModel.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PositionModel.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PositionModel.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PositionModel.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => PositionModel.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PositionModel.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => PositionModel.fetch(client, id),
      new: (fields: PositionModelFields) => {
        return new PositionModel([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): PositionModelReified {
    return PositionModel.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PositionModel>> {
    return phantom(PositionModel.reified())
  }

  static get p(): PhantomReified<ToTypeStr<PositionModel>> {
    return PositionModel.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('PositionModel', {
      sqrt_pa_x64: bcs.u128(),
      sqrt_pb_x64: bcs.u128(),
      l: bcs.u128(),
      cx: bcs.u64(),
      cy: bcs.u64(),
      dx: bcs.u64(),
      dy: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof PositionModel.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof PositionModel.instantiateBcs> {
    if (!PositionModel.cachedBcs) {
      PositionModel.cachedBcs = PositionModel.instantiateBcs()
    }
    return PositionModel.cachedBcs
  }

  static fromFields(fields: Record<string, any>): PositionModel {
    return PositionModel.reified().new({
      sqrtPaX64: decodeFromFields('u128', fields.sqrt_pa_x64),
      sqrtPbX64: decodeFromFields('u128', fields.sqrt_pb_x64),
      l: decodeFromFields('u128', fields.l),
      cx: decodeFromFields('u64', fields.cx),
      cy: decodeFromFields('u64', fields.cy),
      dx: decodeFromFields('u64', fields.dx),
      dy: decodeFromFields('u64', fields.dy),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PositionModel {
    if (!isPositionModel(item.type)) {
      throw new Error('not a PositionModel type')
    }

    return PositionModel.reified().new({
      sqrtPaX64: decodeFromFieldsWithTypes('u128', item.fields.sqrt_pa_x64),
      sqrtPbX64: decodeFromFieldsWithTypes('u128', item.fields.sqrt_pb_x64),
      l: decodeFromFieldsWithTypes('u128', item.fields.l),
      cx: decodeFromFieldsWithTypes('u64', item.fields.cx),
      cy: decodeFromFieldsWithTypes('u64', item.fields.cy),
      dx: decodeFromFieldsWithTypes('u64', item.fields.dx),
      dy: decodeFromFieldsWithTypes('u64', item.fields.dy),
    })
  }

  static fromBcs(data: Uint8Array): PositionModel {
    return PositionModel.fromFields(PositionModel.bcs.parse(data))
  }

  toJSONField(): PositionModelJSONField {
    return {
      sqrtPaX64: this.sqrtPaX64.toString(),
      sqrtPbX64: this.sqrtPbX64.toString(),
      l: this.l.toString(),
      cx: this.cx.toString(),
      cy: this.cy.toString(),
      dx: this.dx.toString(),
      dy: this.dy.toString(),
    }
  }

  toJSON(): PositionModelJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PositionModel {
    return PositionModel.reified().new({
      sqrtPaX64: decodeFromJSONField('u128', field.sqrtPaX64),
      sqrtPbX64: decodeFromJSONField('u128', field.sqrtPbX64),
      l: decodeFromJSONField('u128', field.l),
      cx: decodeFromJSONField('u64', field.cx),
      cy: decodeFromJSONField('u64', field.cy),
      dx: decodeFromJSONField('u64', field.dx),
      dy: decodeFromJSONField('u64', field.dy),
    })
  }

  static fromJSON(json: Record<string, any>): PositionModel {
    if (json.$typeName !== PositionModel.$typeName) {
      throw new Error(
        `not a PositionModel json object: expected '${PositionModel.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return PositionModel.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): PositionModel {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPositionModel(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PositionModel object`)
    }
    return PositionModel.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): PositionModel {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPositionModel(data.bcs.type)) {
        throw new Error(`object at is not a PositionModel object`)
      }

      return PositionModel.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PositionModel.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<PositionModel> {
    const res = await fetchObjectBcs(client, id)
    if (!isPositionModel(res.type)) {
      throw new Error(`object at id ${id} is not a PositionModel object`)
    }

    return PositionModel.fromBcs(res.bcsBytes)
  }
}
