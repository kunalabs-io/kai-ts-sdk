import { bcs } from '@mysten/sui/bcs'
import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import type { SuiObjectData, SuiParsedData } from '@mysten/sui/jsonRpc'
import { fromBase64 } from '@mysten/sui/utils'
import { getTypeOrigin } from '../../_envs'
import {
  assertFieldsWithTypesArgsMatch,
  assertReifiedTypeArgsMatch,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  extractType,
  fieldToJSON,
  phantom,
  PhantomReified,
  PhantomToTypeStr,
  PhantomTypeArgument,
  Reified,
  StructClass,
  ToField,
  ToJSON,
  ToPhantomTypeArgument,
  ToTypeStr,
  vector,
} from '../../_framework/reified'
import {
  composeSuiType,
  compressSuiType,
  FieldsWithTypes,
  parseTypeName,
} from '../../_framework/util'
import { Vector } from '../../_framework/vector'
import { FlashSwapReceipt } from '../../bluefin-spot/pool/structs'
import { Option } from '../../std/option/structs'
import { Balance } from '../../sui/balance/structs'
import { ID } from '../../sui/object/structs'
import { BatchSwapClaim } from '../batch-swap/structs'

/* ============================== RebalanceReceipt =============================== */

export function isRebalanceReceipt(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    `${
      getTypeOrigin('kai-leverage-util', 'bluefin_spot::RebalanceReceipt')
    }::bluefin_spot::RebalanceReceipt` + '<',
  )
}

export interface RebalanceReceiptFields<
  X extends PhantomTypeArgument,
  Y extends PhantomTypeArgument,
> {
  positionId: ToField<ID>
  batchSwapToX: ToField<Vector<BatchSwapClaim>>
  batchSwapToY: ToField<Vector<BatchSwapClaim>>
  fX64: ToField<'u128'>
  pX128: ToField<'u256'>
  collectedX: ToField<Balance<X>>
  collectedY: ToField<Balance<Y>>
}

export type RebalanceReceiptReified<X extends PhantomTypeArgument, Y extends PhantomTypeArgument> =
  Reified<RebalanceReceipt<X, Y>, RebalanceReceiptFields<X, Y>>

export type RebalanceReceiptJSONField<
  X extends PhantomTypeArgument,
  Y extends PhantomTypeArgument,
> = {
  positionId: string
  batchSwapToX: ToJSON<BatchSwapClaim>[]
  batchSwapToY: ToJSON<BatchSwapClaim>[]
  fX64: string
  pX128: string
  collectedX: ToJSON<Balance<X>>
  collectedY: ToJSON<Balance<Y>>
}

export type RebalanceReceiptJSON<X extends PhantomTypeArgument, Y extends PhantomTypeArgument> = {
  $typeName: typeof RebalanceReceipt.$typeName
  $typeArgs: [PhantomToTypeStr<X>, PhantomToTypeStr<Y>]
} & RebalanceReceiptJSONField<X, Y>

export class RebalanceReceipt<X extends PhantomTypeArgument, Y extends PhantomTypeArgument>
  implements StructClass
{
  __StructClass = true as const

  static get $typeName(): `${string}::bluefin_spot::RebalanceReceipt` {
    return `${
      getTypeOrigin('kai-leverage-util', 'bluefin_spot::RebalanceReceipt')
    }::bluefin_spot::RebalanceReceipt` as const
  }
  static readonly $numTypeParams = 2
  static readonly $isPhantom = [true, true] as const

  readonly $typeName: typeof RebalanceReceipt.$typeName = RebalanceReceipt.$typeName
  readonly $fullTypeName: `${string}::bluefin_spot::RebalanceReceipt<${PhantomToTypeStr<
    X
  >}, ${PhantomToTypeStr<Y>}>`
  readonly $typeArgs: [PhantomToTypeStr<X>, PhantomToTypeStr<Y>]
  readonly $isPhantom: typeof RebalanceReceipt.$isPhantom = RebalanceReceipt.$isPhantom

  readonly positionId: ToField<ID>
  readonly batchSwapToX: ToField<Vector<BatchSwapClaim>>
  readonly batchSwapToY: ToField<Vector<BatchSwapClaim>>
  readonly fX64: ToField<'u128'>
  readonly pX128: ToField<'u256'>
  readonly collectedX: ToField<Balance<X>>
  readonly collectedY: ToField<Balance<Y>>

  private constructor(
    typeArgs: [PhantomToTypeStr<X>, PhantomToTypeStr<Y>],
    fields: RebalanceReceiptFields<X, Y>,
  ) {
    this.$fullTypeName = composeSuiType(
      RebalanceReceipt.$typeName,
      ...typeArgs,
    ) as `${string}::bluefin_spot::RebalanceReceipt<${PhantomToTypeStr<X>}, ${PhantomToTypeStr<Y>}>`
    this.$typeArgs = typeArgs

    this.positionId = fields.positionId
    this.batchSwapToX = fields.batchSwapToX
    this.batchSwapToY = fields.batchSwapToY
    this.fX64 = fields.fX64
    this.pX128 = fields.pX128
    this.collectedX = fields.collectedX
    this.collectedY = fields.collectedY
  }

  static reified<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
  >(
    X: X,
    Y: Y,
  ): RebalanceReceiptReified<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>> {
    const reifiedBcs = RebalanceReceipt.bcs
    return {
      get typeName() {
        return RebalanceReceipt.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          RebalanceReceipt.$typeName,
          ...[extractType(X), extractType(Y)],
        ) as `${string}::bluefin_spot::RebalanceReceipt<${PhantomToTypeStr<
          ToPhantomTypeArgument<X>
        >}, ${PhantomToTypeStr<ToPhantomTypeArgument<Y>>}>`
      },
      get typeArgs() {
        return [extractType(X), extractType(Y)] as [
          PhantomToTypeStr<ToPhantomTypeArgument<X>>,
          PhantomToTypeStr<ToPhantomTypeArgument<Y>>,
        ]
      },
      isPhantom: RebalanceReceipt.$isPhantom,
      reifiedTypeArgs: [X, Y],
      fromFields: (fields: Record<string, any>) => RebalanceReceipt.fromFields([X, Y], fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        RebalanceReceipt.fromFieldsWithTypes([X, Y], item),
      fromBcs: (data: Uint8Array) => RebalanceReceipt.fromFields([X, Y], reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => RebalanceReceipt.fromJSONField([X, Y], field),
      fromJSON: (json: Record<string, any>) => RebalanceReceipt.fromJSON([X, Y], json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        RebalanceReceipt.fromCoreObject([X, Y], obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        RebalanceReceipt.fromSuiParsedData([X, Y], content),
      fromSuiObjectData: (content: SuiObjectData) =>
        RebalanceReceipt.fromSuiObjectData([X, Y], content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        RebalanceReceipt.fetch(client, [X, Y], id),
      new: (fields: RebalanceReceiptFields<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>>) => {
        return new RebalanceReceipt([extractType(X), extractType(Y)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof RebalanceReceipt.reified {
    return RebalanceReceipt.reified
  }

  static phantom<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
  >(
    X: X,
    Y: Y,
  ): PhantomReified<
    ToTypeStr<RebalanceReceipt<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>>>
  > {
    return phantom(RebalanceReceipt.reified(X, Y))
  }

  static get p(): typeof RebalanceReceipt.phantom {
    return RebalanceReceipt.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('RebalanceReceipt', {
      position_id: ID.bcs,
      batch_swap_to_x: bcs.vector(BatchSwapClaim.bcs),
      batch_swap_to_y: bcs.vector(BatchSwapClaim.bcs),
      f_x64: bcs.u128(),
      p_x128: bcs.u256(),
      collected_x: Balance.bcs,
      collected_y: Balance.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof RebalanceReceipt.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof RebalanceReceipt.instantiateBcs> {
    if (!RebalanceReceipt.cachedBcs) {
      RebalanceReceipt.cachedBcs = RebalanceReceipt.instantiateBcs()
    }
    return RebalanceReceipt.cachedBcs
  }

  static fromFields<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [X, Y],
    fields: Record<string, any>,
  ): RebalanceReceipt<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>> {
    return RebalanceReceipt.reified(typeArgs[0], typeArgs[1]).new({
      positionId: decodeFromFields(ID.reified(), fields.position_id),
      batchSwapToX: decodeFromFields(vector(BatchSwapClaim.reified()), fields.batch_swap_to_x),
      batchSwapToY: decodeFromFields(vector(BatchSwapClaim.reified()), fields.batch_swap_to_y),
      fX64: decodeFromFields('u128', fields.f_x64),
      pX128: decodeFromFields('u256', fields.p_x128),
      collectedX: decodeFromFields(Balance.reified(typeArgs[0]), fields.collected_x),
      collectedY: decodeFromFields(Balance.reified(typeArgs[1]), fields.collected_y),
    })
  }

  static fromFieldsWithTypes<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [X, Y],
    item: FieldsWithTypes,
  ): RebalanceReceipt<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>> {
    if (!isRebalanceReceipt(item.type)) {
      throw new Error('not a RebalanceReceipt type')
    }
    assertFieldsWithTypesArgsMatch(item, typeArgs)

    return RebalanceReceipt.reified(typeArgs[0], typeArgs[1]).new({
      positionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.position_id),
      batchSwapToX: decodeFromFieldsWithTypes(
        vector(BatchSwapClaim.reified()),
        item.fields.batch_swap_to_x,
      ),
      batchSwapToY: decodeFromFieldsWithTypes(
        vector(BatchSwapClaim.reified()),
        item.fields.batch_swap_to_y,
      ),
      fX64: decodeFromFieldsWithTypes('u128', item.fields.f_x64),
      pX128: decodeFromFieldsWithTypes('u256', item.fields.p_x128),
      collectedX: decodeFromFieldsWithTypes(Balance.reified(typeArgs[0]), item.fields.collected_x),
      collectedY: decodeFromFieldsWithTypes(Balance.reified(typeArgs[1]), item.fields.collected_y),
    })
  }

  static fromBcs<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [X, Y],
    data: Uint8Array,
  ): RebalanceReceipt<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>> {
    return RebalanceReceipt.fromFields(typeArgs, RebalanceReceipt.bcs.parse(data))
  }

  toJSONField(): RebalanceReceiptJSONField<X, Y> {
    return {
      positionId: this.positionId,
      batchSwapToX: fieldToJSON<Vector<BatchSwapClaim>>(
        `vector<${BatchSwapClaim.$typeName}>`,
        this.batchSwapToX,
      ),
      batchSwapToY: fieldToJSON<Vector<BatchSwapClaim>>(
        `vector<${BatchSwapClaim.$typeName}>`,
        this.batchSwapToY,
      ),
      fX64: this.fX64.toString(),
      pX128: this.pX128.toString(),
      collectedX: this.collectedX.toJSONField(),
      collectedY: this.collectedY.toJSONField(),
    }
  }

  toJSON(): RebalanceReceiptJSON<X, Y> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [X, Y],
    field: any,
  ): RebalanceReceipt<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>> {
    return RebalanceReceipt.reified(typeArgs[0], typeArgs[1]).new({
      positionId: decodeFromJSONField(ID.reified(), field.positionId),
      batchSwapToX: decodeFromJSONField(vector(BatchSwapClaim.reified()), field.batchSwapToX),
      batchSwapToY: decodeFromJSONField(vector(BatchSwapClaim.reified()), field.batchSwapToY),
      fX64: decodeFromJSONField('u128', field.fX64),
      pX128: decodeFromJSONField('u256', field.pX128),
      collectedX: decodeFromJSONField(Balance.reified(typeArgs[0]), field.collectedX),
      collectedY: decodeFromJSONField(Balance.reified(typeArgs[1]), field.collectedY),
    })
  }

  static fromJSON<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [X, Y],
    json: Record<string, any>,
  ): RebalanceReceipt<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>> {
    if (json.$typeName !== RebalanceReceipt.$typeName) {
      throw new Error(
        `not a RebalanceReceipt json object: expected '${RebalanceReceipt.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(RebalanceReceipt.$typeName, ...typeArgs.map(extractType)),
      json.$typeArgs,
      typeArgs,
    )

    return RebalanceReceipt.fromJSONField(typeArgs, json)
  }

  static fromCoreObject<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [X, Y],
    obj: SuiClientTypes.Object<{ content: true }>,
  ): RebalanceReceipt<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>> {
    if (!isRebalanceReceipt(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a RebalanceReceipt object`)
    }

    const gotTypeArgs = parseTypeName(obj.type).typeArgs
    if (gotTypeArgs.length !== 2) {
      throw new Error(
        `type argument mismatch: expected 2 type arguments but got '${gotTypeArgs.length}'`,
      )
    }
    for (let i = 0; i < 2; i++) {
      const gotTypeArg = compressSuiType(gotTypeArgs[i])
      const expectedTypeArg = compressSuiType(extractType(typeArgs[i]))
      if (gotTypeArg !== expectedTypeArg) {
        throw new Error(
          `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
        )
      }
    }

    return RebalanceReceipt.fromBcs(typeArgs, obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link RebalanceReceipt.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [X, Y],
    content: SuiParsedData,
  ): RebalanceReceipt<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRebalanceReceipt(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a RebalanceReceipt object`)
    }
    return RebalanceReceipt.fromFieldsWithTypes(typeArgs, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link RebalanceReceipt.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [X, Y],
    data: SuiObjectData,
  ): RebalanceReceipt<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRebalanceReceipt(data.bcs.type)) {
        throw new Error(`object at is not a RebalanceReceipt object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 2) {
        throw new Error(
          `type argument mismatch: expected 2 type arguments but got '${gotTypeArgs.length}'`,
        )
      }
      for (let i = 0; i < 2; i++) {
        const gotTypeArg = compressSuiType(gotTypeArgs[i])
        const expectedTypeArg = compressSuiType(extractType(typeArgs[i]))
        if (gotTypeArg !== expectedTypeArg) {
          throw new Error(
            `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
          )
        }
      }

      return RebalanceReceipt.fromBcs(typeArgs, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RebalanceReceipt.fromSuiParsedData(typeArgs, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
  >(
    client: ClientWithCoreApi,
    typeArgs: [X, Y],
    id: string,
  ): Promise<RebalanceReceipt<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isRebalanceReceipt(object.type)) {
      throw new Error(`object at id ${id} is not a RebalanceReceipt object`)
    }

    const gotTypeArgs = parseTypeName(object.type).typeArgs
    if (gotTypeArgs.length !== 2) {
      throw new Error(
        `type argument mismatch: expected 2 type arguments but got '${gotTypeArgs.length}'`,
      )
    }
    for (let i = 0; i < 2; i++) {
      const gotTypeArg = compressSuiType(gotTypeArgs[i])
      const expectedTypeArg = compressSuiType(extractType(typeArgs[i]))
      if (gotTypeArg !== expectedTypeArg) {
        throw new Error(
          `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
        )
      }
    }

    return RebalanceReceipt.fromBcs(typeArgs, object.content)
  }
}

/* ============================== WrappedFlashSwapReceipt =============================== */

export function isWrappedFlashSwapReceipt(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    `${
      getTypeOrigin('kai-leverage-util', 'bluefin_spot::WrappedFlashSwapReceipt')
    }::bluefin_spot::WrappedFlashSwapReceipt` + '<',
  )
}

export interface WrappedFlashSwapReceiptFields<
  A extends PhantomTypeArgument,
  B extends PhantomTypeArgument,
> {
  inner: ToField<Option<FlashSwapReceipt<A, B>>>
}

export type WrappedFlashSwapReceiptReified<
  A extends PhantomTypeArgument,
  B extends PhantomTypeArgument,
> = Reified<WrappedFlashSwapReceipt<A, B>, WrappedFlashSwapReceiptFields<A, B>>

export type WrappedFlashSwapReceiptJSONField<
  A extends PhantomTypeArgument,
  B extends PhantomTypeArgument,
> = {
  inner: ToJSON<FlashSwapReceipt<A, B>> | null
}

export type WrappedFlashSwapReceiptJSON<
  A extends PhantomTypeArgument,
  B extends PhantomTypeArgument,
> = {
  $typeName: typeof WrappedFlashSwapReceipt.$typeName
  $typeArgs: [PhantomToTypeStr<A>, PhantomToTypeStr<B>]
} & WrappedFlashSwapReceiptJSONField<A, B>

/**
 * Wrapper for FlashSwapReceipt to allow for optional receipts to handle the case where amount is 0
 * without aborting
 */
export class WrappedFlashSwapReceipt<A extends PhantomTypeArgument, B extends PhantomTypeArgument>
  implements StructClass
{
  __StructClass = true as const

  static get $typeName(): `${string}::bluefin_spot::WrappedFlashSwapReceipt` {
    return `${
      getTypeOrigin('kai-leverage-util', 'bluefin_spot::WrappedFlashSwapReceipt')
    }::bluefin_spot::WrappedFlashSwapReceipt` as const
  }
  static readonly $numTypeParams = 2
  static readonly $isPhantom = [true, true] as const

  readonly $typeName: typeof WrappedFlashSwapReceipt.$typeName = WrappedFlashSwapReceipt.$typeName
  readonly $fullTypeName: `${string}::bluefin_spot::WrappedFlashSwapReceipt<${PhantomToTypeStr<
    A
  >}, ${PhantomToTypeStr<B>}>`
  readonly $typeArgs: [PhantomToTypeStr<A>, PhantomToTypeStr<B>]
  readonly $isPhantom: typeof WrappedFlashSwapReceipt.$isPhantom =
    WrappedFlashSwapReceipt.$isPhantom

  readonly inner: ToField<Option<FlashSwapReceipt<A, B>>>

  private constructor(
    typeArgs: [PhantomToTypeStr<A>, PhantomToTypeStr<B>],
    fields: WrappedFlashSwapReceiptFields<A, B>,
  ) {
    this.$fullTypeName = composeSuiType(
      WrappedFlashSwapReceipt.$typeName,
      ...typeArgs,
    ) as `${string}::bluefin_spot::WrappedFlashSwapReceipt<${PhantomToTypeStr<
      A
    >}, ${PhantomToTypeStr<B>}>`
    this.$typeArgs = typeArgs

    this.inner = fields.inner
  }

  static reified<
    A extends PhantomReified<PhantomTypeArgument>,
    B extends PhantomReified<PhantomTypeArgument>,
  >(
    A: A,
    B: B,
  ): WrappedFlashSwapReceiptReified<ToPhantomTypeArgument<A>, ToPhantomTypeArgument<B>> {
    const reifiedBcs = WrappedFlashSwapReceipt.bcs
    return {
      get typeName() {
        return WrappedFlashSwapReceipt.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          WrappedFlashSwapReceipt.$typeName,
          ...[extractType(A), extractType(B)],
        ) as `${string}::bluefin_spot::WrappedFlashSwapReceipt<${PhantomToTypeStr<
          ToPhantomTypeArgument<A>
        >}, ${PhantomToTypeStr<ToPhantomTypeArgument<B>>}>`
      },
      get typeArgs() {
        return [extractType(A), extractType(B)] as [
          PhantomToTypeStr<ToPhantomTypeArgument<A>>,
          PhantomToTypeStr<ToPhantomTypeArgument<B>>,
        ]
      },
      isPhantom: WrappedFlashSwapReceipt.$isPhantom,
      reifiedTypeArgs: [A, B],
      fromFields: (fields: Record<string, any>) =>
        WrappedFlashSwapReceipt.fromFields([A, B], fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        WrappedFlashSwapReceipt.fromFieldsWithTypes([A, B], item),
      fromBcs: (data: Uint8Array) =>
        WrappedFlashSwapReceipt.fromFields([A, B], reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => WrappedFlashSwapReceipt.fromJSONField([A, B], field),
      fromJSON: (json: Record<string, any>) => WrappedFlashSwapReceipt.fromJSON([A, B], json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        WrappedFlashSwapReceipt.fromCoreObject([A, B], obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        WrappedFlashSwapReceipt.fromSuiParsedData([A, B], content),
      fromSuiObjectData: (content: SuiObjectData) =>
        WrappedFlashSwapReceipt.fromSuiObjectData([A, B], content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        WrappedFlashSwapReceipt.fetch(client, [A, B], id),
      new: (
        fields: WrappedFlashSwapReceiptFields<ToPhantomTypeArgument<A>, ToPhantomTypeArgument<B>>,
      ) => {
        return new WrappedFlashSwapReceipt([extractType(A), extractType(B)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof WrappedFlashSwapReceipt.reified {
    return WrappedFlashSwapReceipt.reified
  }

  static phantom<
    A extends PhantomReified<PhantomTypeArgument>,
    B extends PhantomReified<PhantomTypeArgument>,
  >(
    A: A,
    B: B,
  ): PhantomReified<
    ToTypeStr<WrappedFlashSwapReceipt<ToPhantomTypeArgument<A>, ToPhantomTypeArgument<B>>>
  > {
    return phantom(WrappedFlashSwapReceipt.reified(A, B))
  }

  static get p(): typeof WrappedFlashSwapReceipt.phantom {
    return WrappedFlashSwapReceipt.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('WrappedFlashSwapReceipt', {
      inner: Option.bcs(FlashSwapReceipt.bcs),
    })
  }

  private static cachedBcs: ReturnType<typeof WrappedFlashSwapReceipt.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof WrappedFlashSwapReceipt.instantiateBcs> {
    if (!WrappedFlashSwapReceipt.cachedBcs) {
      WrappedFlashSwapReceipt.cachedBcs = WrappedFlashSwapReceipt.instantiateBcs()
    }
    return WrappedFlashSwapReceipt.cachedBcs
  }

  static fromFields<
    A extends PhantomReified<PhantomTypeArgument>,
    B extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [A, B],
    fields: Record<string, any>,
  ): WrappedFlashSwapReceipt<ToPhantomTypeArgument<A>, ToPhantomTypeArgument<B>> {
    return WrappedFlashSwapReceipt.reified(typeArgs[0], typeArgs[1]).new({
      inner: decodeFromFields(
        Option.reified(FlashSwapReceipt.reified(typeArgs[0], typeArgs[1])),
        fields.inner,
      ),
    })
  }

  static fromFieldsWithTypes<
    A extends PhantomReified<PhantomTypeArgument>,
    B extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [A, B],
    item: FieldsWithTypes,
  ): WrappedFlashSwapReceipt<ToPhantomTypeArgument<A>, ToPhantomTypeArgument<B>> {
    if (!isWrappedFlashSwapReceipt(item.type)) {
      throw new Error('not a WrappedFlashSwapReceipt type')
    }
    assertFieldsWithTypesArgsMatch(item, typeArgs)

    return WrappedFlashSwapReceipt.reified(typeArgs[0], typeArgs[1]).new({
      inner: decodeFromFieldsWithTypes(
        Option.reified(FlashSwapReceipt.reified(typeArgs[0], typeArgs[1])),
        item.fields.inner,
      ),
    })
  }

  static fromBcs<
    A extends PhantomReified<PhantomTypeArgument>,
    B extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [A, B],
    data: Uint8Array,
  ): WrappedFlashSwapReceipt<ToPhantomTypeArgument<A>, ToPhantomTypeArgument<B>> {
    return WrappedFlashSwapReceipt.fromFields(typeArgs, WrappedFlashSwapReceipt.bcs.parse(data))
  }

  toJSONField(): WrappedFlashSwapReceiptJSONField<A, B> {
    return {
      inner: fieldToJSON<Option<FlashSwapReceipt<A, B>>>(
        `${Option.$typeName}<${FlashSwapReceipt.$typeName}<${this.$typeArgs[0]}, ${
          this.$typeArgs[1]
        }>>`,
        this.inner,
      ),
    }
  }

  toJSON(): WrappedFlashSwapReceiptJSON<A, B> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<
    A extends PhantomReified<PhantomTypeArgument>,
    B extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [A, B],
    field: any,
  ): WrappedFlashSwapReceipt<ToPhantomTypeArgument<A>, ToPhantomTypeArgument<B>> {
    return WrappedFlashSwapReceipt.reified(typeArgs[0], typeArgs[1]).new({
      inner: decodeFromJSONField(
        Option.reified(FlashSwapReceipt.reified(typeArgs[0], typeArgs[1])),
        field.inner,
      ),
    })
  }

  static fromJSON<
    A extends PhantomReified<PhantomTypeArgument>,
    B extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [A, B],
    json: Record<string, any>,
  ): WrappedFlashSwapReceipt<ToPhantomTypeArgument<A>, ToPhantomTypeArgument<B>> {
    if (json.$typeName !== WrappedFlashSwapReceipt.$typeName) {
      throw new Error(
        `not a WrappedFlashSwapReceipt json object: expected '${WrappedFlashSwapReceipt.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(WrappedFlashSwapReceipt.$typeName, ...typeArgs.map(extractType)),
      json.$typeArgs,
      typeArgs,
    )

    return WrappedFlashSwapReceipt.fromJSONField(typeArgs, json)
  }

  static fromCoreObject<
    A extends PhantomReified<PhantomTypeArgument>,
    B extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [A, B],
    obj: SuiClientTypes.Object<{ content: true }>,
  ): WrappedFlashSwapReceipt<ToPhantomTypeArgument<A>, ToPhantomTypeArgument<B>> {
    if (!isWrappedFlashSwapReceipt(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a WrappedFlashSwapReceipt object`)
    }

    const gotTypeArgs = parseTypeName(obj.type).typeArgs
    if (gotTypeArgs.length !== 2) {
      throw new Error(
        `type argument mismatch: expected 2 type arguments but got '${gotTypeArgs.length}'`,
      )
    }
    for (let i = 0; i < 2; i++) {
      const gotTypeArg = compressSuiType(gotTypeArgs[i])
      const expectedTypeArg = compressSuiType(extractType(typeArgs[i]))
      if (gotTypeArg !== expectedTypeArg) {
        throw new Error(
          `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
        )
      }
    }

    return WrappedFlashSwapReceipt.fromBcs(typeArgs, obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link WrappedFlashSwapReceipt.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<
    A extends PhantomReified<PhantomTypeArgument>,
    B extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [A, B],
    content: SuiParsedData,
  ): WrappedFlashSwapReceipt<ToPhantomTypeArgument<A>, ToPhantomTypeArgument<B>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isWrappedFlashSwapReceipt(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a WrappedFlashSwapReceipt object`,
      )
    }
    return WrappedFlashSwapReceipt.fromFieldsWithTypes(typeArgs, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link WrappedFlashSwapReceipt.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<
    A extends PhantomReified<PhantomTypeArgument>,
    B extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [A, B],
    data: SuiObjectData,
  ): WrappedFlashSwapReceipt<ToPhantomTypeArgument<A>, ToPhantomTypeArgument<B>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isWrappedFlashSwapReceipt(data.bcs.type)) {
        throw new Error(`object at is not a WrappedFlashSwapReceipt object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 2) {
        throw new Error(
          `type argument mismatch: expected 2 type arguments but got '${gotTypeArgs.length}'`,
        )
      }
      for (let i = 0; i < 2; i++) {
        const gotTypeArg = compressSuiType(gotTypeArgs[i])
        const expectedTypeArg = compressSuiType(extractType(typeArgs[i]))
        if (gotTypeArg !== expectedTypeArg) {
          throw new Error(
            `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
          )
        }
      }

      return WrappedFlashSwapReceipt.fromBcs(typeArgs, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return WrappedFlashSwapReceipt.fromSuiParsedData(typeArgs, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<
    A extends PhantomReified<PhantomTypeArgument>,
    B extends PhantomReified<PhantomTypeArgument>,
  >(
    client: ClientWithCoreApi,
    typeArgs: [A, B],
    id: string,
  ): Promise<WrappedFlashSwapReceipt<ToPhantomTypeArgument<A>, ToPhantomTypeArgument<B>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isWrappedFlashSwapReceipt(object.type)) {
      throw new Error(`object at id ${id} is not a WrappedFlashSwapReceipt object`)
    }

    const gotTypeArgs = parseTypeName(object.type).typeArgs
    if (gotTypeArgs.length !== 2) {
      throw new Error(
        `type argument mismatch: expected 2 type arguments but got '${gotTypeArgs.length}'`,
      )
    }
    for (let i = 0; i < 2; i++) {
      const gotTypeArg = compressSuiType(gotTypeArgs[i])
      const expectedTypeArg = compressSuiType(extractType(typeArgs[i]))
      if (gotTypeArg !== expectedTypeArg) {
        throw new Error(
          `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
        )
      }
    }

    return WrappedFlashSwapReceipt.fromBcs(typeArgs, object.content)
  }
}
