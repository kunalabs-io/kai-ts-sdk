/**
 * Geometry of a CLMM LP position: price range bounds and liquidity.
 * A micro-leaf shared by position orchestration and model math.
 */

import { bcs } from '@mysten/sui/bcs'
import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import type { SuiObjectData, SuiParsedData } from '@mysten/sui/jsonRpc'
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
import { composeSuiType, compressSuiType, FieldsWithTypes } from '../../_framework/util'

/* ============================== LpShape =============================== */

export function isLpShape(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('kai-leverage', 'lp_shape_clmm::LpShape')}::lp_shape_clmm::LpShape`
}

export interface LpShapeFields {
  sqrtPaX64: ToField<'u128'>
  sqrtPbX64: ToField<'u128'>
  l: ToField<'u128'>
}

export type LpShapeReified = Reified<LpShape, LpShapeFields>

export type LpShapeJSONField = {
  sqrtPaX64: string
  sqrtPbX64: string
  l: string
}

export type LpShapeJSON = {
  $typeName: typeof LpShape.$typeName
  $typeArgs: []
} & LpShapeJSONField

/** Geometry of a CLMM LP position: price range bounds and liquidity. */
export class LpShape implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::lp_shape_clmm::LpShape` {
    return `${
      getTypeOrigin('kai-leverage', 'lp_shape_clmm::LpShape')
    }::lp_shape_clmm::LpShape` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof LpShape.$typeName = LpShape.$typeName
  readonly $fullTypeName: `${string}::lp_shape_clmm::LpShape`
  readonly $typeArgs: []
  readonly $isPhantom: typeof LpShape.$isPhantom = LpShape.$isPhantom

  readonly sqrtPaX64: ToField<'u128'>
  readonly sqrtPbX64: ToField<'u128'>
  readonly l: ToField<'u128'>

  private constructor(typeArgs: [], fields: LpShapeFields) {
    this.$fullTypeName = composeSuiType(
      LpShape.$typeName,
      ...typeArgs,
    ) as `${string}::lp_shape_clmm::LpShape`
    this.$typeArgs = typeArgs

    this.sqrtPaX64 = fields.sqrtPaX64
    this.sqrtPbX64 = fields.sqrtPbX64
    this.l = fields.l
  }

  static reified(): LpShapeReified {
    const reifiedBcs = LpShape.bcs
    return {
      get typeName() {
        return LpShape.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          LpShape.$typeName,
          ...[],
        ) as `${string}::lp_shape_clmm::LpShape`
      },
      typeArgs: [] as [],
      isPhantom: LpShape.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => LpShape.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => LpShape.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => LpShape.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => LpShape.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => LpShape.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        LpShape.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => LpShape.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => LpShape.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => LpShape.fetch(client, id),
      new: (fields: LpShapeFields) => {
        return new LpShape([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): LpShapeReified {
    return LpShape.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<LpShape>> {
    return phantom(LpShape.reified())
  }

  static get p(): PhantomReified<ToTypeStr<LpShape>> {
    return LpShape.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('LpShape', {
      sqrt_pa_x64: bcs.u128(),
      sqrt_pb_x64: bcs.u128(),
      l: bcs.u128(),
    })
  }

  private static cachedBcs: ReturnType<typeof LpShape.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof LpShape.instantiateBcs> {
    if (!LpShape.cachedBcs) {
      LpShape.cachedBcs = LpShape.instantiateBcs()
    }
    return LpShape.cachedBcs
  }

  static fromFields(fields: Record<string, any>): LpShape {
    return LpShape.reified().new({
      sqrtPaX64: decodeFromFields('u128', fields.sqrt_pa_x64),
      sqrtPbX64: decodeFromFields('u128', fields.sqrt_pb_x64),
      l: decodeFromFields('u128', fields.l),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): LpShape {
    if (!isLpShape(item.type)) {
      throw new Error('not a LpShape type')
    }

    return LpShape.reified().new({
      sqrtPaX64: decodeFromFieldsWithTypes('u128', item.fields.sqrt_pa_x64),
      sqrtPbX64: decodeFromFieldsWithTypes('u128', item.fields.sqrt_pb_x64),
      l: decodeFromFieldsWithTypes('u128', item.fields.l),
    })
  }

  static fromBcs(data: Uint8Array): LpShape {
    return LpShape.fromFields(LpShape.bcs.parse(data))
  }

  toJSONField(): LpShapeJSONField {
    return {
      sqrtPaX64: this.sqrtPaX64.toString(),
      sqrtPbX64: this.sqrtPbX64.toString(),
      l: this.l.toString(),
    }
  }

  toJSON(): LpShapeJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): LpShape {
    return LpShape.reified().new({
      sqrtPaX64: decodeFromJSONField('u128', field.sqrtPaX64),
      sqrtPbX64: decodeFromJSONField('u128', field.sqrtPbX64),
      l: decodeFromJSONField('u128', field.l),
    })
  }

  static fromJSON(json: Record<string, any>): LpShape {
    if (json.$typeName !== LpShape.$typeName) {
      throw new Error(
        `not a LpShape json object: expected '${LpShape.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return LpShape.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): LpShape {
    if (!isLpShape(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a LpShape object`)
    }
    return LpShape.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link LpShape.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): LpShape {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isLpShape(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a LpShape object`)
    }
    return LpShape.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link LpShape.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): LpShape {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isLpShape(data.bcs.type)) {
        throw new Error(`object at is not a LpShape object`)
      }

      return LpShape.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return LpShape.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<LpShape> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isLpShape(object.type)) {
      throw new Error(`object at id ${id} is not a LpShape object`)
    }
    return LpShape.fromBcs(object.content)
  }
}
