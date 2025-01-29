import * as reified from '../../_framework/reified'
import {
  PhantomReified,
  PhantomToTypeStr,
  PhantomTypeArgument,
  Reified,
  StructClass,
  ToField,
  ToPhantomTypeArgument,
  ToTypeStr,
  assertFieldsWithTypesArgsMatch,
  assertReifiedTypeArgsMatch,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  extractType,
  fieldToJSON,
  phantom,
} from '../../_framework/reified'
import {
  FieldsWithTypes,
  composeSuiType,
  compressSuiType,
  parseTypeName,
} from '../../_framework/util'
import { Vector } from '../../_framework/vector'
import { Balance } from '../../sui/balance/structs'
import { ID } from '../../sui/object/structs'
import { BatchSwapClaim } from '../batch-swap/structs'
import { PKG_V5 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== RebalanceReceipt =============================== */

export function isRebalanceReceipt(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V5}::bluefin_spot::RebalanceReceipt` + '<')
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

export type RebalanceReceiptReified<
  X extends PhantomTypeArgument,
  Y extends PhantomTypeArgument,
> = Reified<RebalanceReceipt<X, Y>, RebalanceReceiptFields<X, Y>>

export class RebalanceReceipt<X extends PhantomTypeArgument, Y extends PhantomTypeArgument>
  implements StructClass
{
  __StructClass = true as const

  static readonly $typeName = `${PKG_V5}::bluefin_spot::RebalanceReceipt`
  static readonly $numTypeParams = 2
  static readonly $isPhantom = [true, true] as const

  readonly $typeName = RebalanceReceipt.$typeName
  readonly $fullTypeName: `${typeof PKG_V5}::bluefin_spot::RebalanceReceipt<${PhantomToTypeStr<X>}, ${PhantomToTypeStr<Y>}>`
  readonly $typeArgs: [PhantomToTypeStr<X>, PhantomToTypeStr<Y>]
  readonly $isPhantom = RebalanceReceipt.$isPhantom

  readonly positionId: ToField<ID>
  readonly batchSwapToX: ToField<Vector<BatchSwapClaim>>
  readonly batchSwapToY: ToField<Vector<BatchSwapClaim>>
  readonly fX64: ToField<'u128'>
  readonly pX128: ToField<'u256'>
  readonly collectedX: ToField<Balance<X>>
  readonly collectedY: ToField<Balance<Y>>

  private constructor(
    typeArgs: [PhantomToTypeStr<X>, PhantomToTypeStr<Y>],
    fields: RebalanceReceiptFields<X, Y>
  ) {
    this.$fullTypeName = composeSuiType(
      RebalanceReceipt.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V5}::bluefin_spot::RebalanceReceipt<${PhantomToTypeStr<X>}, ${PhantomToTypeStr<Y>}>`
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
  >(X: X, Y: Y): RebalanceReceiptReified<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>> {
    return {
      typeName: RebalanceReceipt.$typeName,
      fullTypeName: composeSuiType(
        RebalanceReceipt.$typeName,
        ...[extractType(X), extractType(Y)]
      ) as `${typeof PKG_V5}::bluefin_spot::RebalanceReceipt<${PhantomToTypeStr<ToPhantomTypeArgument<X>>}, ${PhantomToTypeStr<ToPhantomTypeArgument<Y>>}>`,
      typeArgs: [extractType(X), extractType(Y)] as [
        PhantomToTypeStr<ToPhantomTypeArgument<X>>,
        PhantomToTypeStr<ToPhantomTypeArgument<Y>>,
      ],
      isPhantom: RebalanceReceipt.$isPhantom,
      reifiedTypeArgs: [X, Y],
      fromFields: (fields: Record<string, any>) => RebalanceReceipt.fromFields([X, Y], fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        RebalanceReceipt.fromFieldsWithTypes([X, Y], item),
      fromBcs: (data: Uint8Array) => RebalanceReceipt.fromBcs([X, Y], data),
      bcs: RebalanceReceipt.bcs,
      fromJSONField: (field: any) => RebalanceReceipt.fromJSONField([X, Y], field),
      fromJSON: (json: Record<string, any>) => RebalanceReceipt.fromJSON([X, Y], json),
      fromSuiParsedData: (content: SuiParsedData) =>
        RebalanceReceipt.fromSuiParsedData([X, Y], content),
      fromSuiObjectData: (content: SuiObjectData) =>
        RebalanceReceipt.fromSuiObjectData([X, Y], content),
      fetch: async (client: SuiClient, id: string) => RebalanceReceipt.fetch(client, [X, Y], id),
      new: (fields: RebalanceReceiptFields<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>>) => {
        return new RebalanceReceipt([extractType(X), extractType(Y)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return RebalanceReceipt.reified
  }

  static phantom<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
  >(
    X: X,
    Y: Y
  ): PhantomReified<
    ToTypeStr<RebalanceReceipt<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>>>
  > {
    return phantom(RebalanceReceipt.reified(X, Y))
  }
  static get p() {
    return RebalanceReceipt.phantom
  }

  static get bcs() {
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

  static fromFields<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [X, Y],
    fields: Record<string, any>
  ): RebalanceReceipt<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>> {
    return RebalanceReceipt.reified(typeArgs[0], typeArgs[1]).new({
      positionId: decodeFromFields(ID.reified(), fields.position_id),
      batchSwapToX: decodeFromFields(
        reified.vector(BatchSwapClaim.reified()),
        fields.batch_swap_to_x
      ),
      batchSwapToY: decodeFromFields(
        reified.vector(BatchSwapClaim.reified()),
        fields.batch_swap_to_y
      ),
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
    item: FieldsWithTypes
  ): RebalanceReceipt<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>> {
    if (!isRebalanceReceipt(item.type)) {
      throw new Error('not a RebalanceReceipt type')
    }
    assertFieldsWithTypesArgsMatch(item, typeArgs)

    return RebalanceReceipt.reified(typeArgs[0], typeArgs[1]).new({
      positionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.position_id),
      batchSwapToX: decodeFromFieldsWithTypes(
        reified.vector(BatchSwapClaim.reified()),
        item.fields.batch_swap_to_x
      ),
      batchSwapToY: decodeFromFieldsWithTypes(
        reified.vector(BatchSwapClaim.reified()),
        item.fields.batch_swap_to_y
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
    data: Uint8Array
  ): RebalanceReceipt<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>> {
    return RebalanceReceipt.fromFields(typeArgs, RebalanceReceipt.bcs.parse(data))
  }

  toJSONField() {
    return {
      positionId: this.positionId,
      batchSwapToX: fieldToJSON<Vector<BatchSwapClaim>>(
        `vector<${BatchSwapClaim.$typeName}>`,
        this.batchSwapToX
      ),
      batchSwapToY: fieldToJSON<Vector<BatchSwapClaim>>(
        `vector<${BatchSwapClaim.$typeName}>`,
        this.batchSwapToY
      ),
      fX64: this.fX64.toString(),
      pX128: this.pX128.toString(),
      collectedX: this.collectedX.toJSONField(),
      collectedY: this.collectedY.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [X, Y],
    field: any
  ): RebalanceReceipt<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>> {
    return RebalanceReceipt.reified(typeArgs[0], typeArgs[1]).new({
      positionId: decodeFromJSONField(ID.reified(), field.positionId),
      batchSwapToX: decodeFromJSONField(
        reified.vector(BatchSwapClaim.reified()),
        field.batchSwapToX
      ),
      batchSwapToY: decodeFromJSONField(
        reified.vector(BatchSwapClaim.reified()),
        field.batchSwapToY
      ),
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
    json: Record<string, any>
  ): RebalanceReceipt<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>> {
    if (json.$typeName !== RebalanceReceipt.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(RebalanceReceipt.$typeName, ...typeArgs.map(extractType)),
      json.$typeArgs,
      typeArgs
    )

    return RebalanceReceipt.fromJSONField(typeArgs, json)
  }

  static fromSuiParsedData<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [X, Y],
    content: SuiParsedData
  ): RebalanceReceipt<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRebalanceReceipt(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a RebalanceReceipt object`)
    }
    return RebalanceReceipt.fromFieldsWithTypes(typeArgs, content)
  }

  static fromSuiObjectData<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [X, Y],
    data: SuiObjectData
  ): RebalanceReceipt<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRebalanceReceipt(data.bcs.type)) {
        throw new Error(`object at is not a RebalanceReceipt object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 2) {
        throw new Error(
          `type argument mismatch: expected 2 type arguments but got ${gotTypeArgs.length}`
        )
      }
      for (let i = 0; i < 2; i++) {
        const gotTypeArg = compressSuiType(gotTypeArgs[i])
        const expectedTypeArg = compressSuiType(extractType(typeArgs[i]))
        if (gotTypeArg !== expectedTypeArg) {
          throw new Error(
            `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`
          )
        }
      }

      return RebalanceReceipt.fromBcs(typeArgs, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RebalanceReceipt.fromSuiParsedData(typeArgs, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
  >(
    client: SuiClient,
    typeArgs: [X, Y],
    id: string
  ): Promise<RebalanceReceipt<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching RebalanceReceipt object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isRebalanceReceipt(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a RebalanceReceipt object`)
    }

    return RebalanceReceipt.fromSuiObjectData(typeArgs, res.data)
  }
}
