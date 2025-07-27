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
  phantom,
} from '../../_framework/reified'
import {
  FieldsWithTypes,
  composeSuiType,
  compressSuiType,
  parseTypeName,
} from '../../_framework/util'
import { Balance } from '../../sui/balance/structs'
import { ID } from '../../sui/object/structs'
import { PKG_V3 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== BatchSwap =============================== */

export function isBatchSwap(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V3}::batch_swap::BatchSwap` + '<')
}

export interface BatchSwapFields<A extends PhantomTypeArgument, B extends PhantomTypeArgument> {
  id: ToField<ID>
  in: ToField<Balance<A>>
  out: ToField<Balance<B>>
  totalIn: ToField<'u64'>
  totalOut: ToField<'u64'>
  numClaims: ToField<'u64'>
  totalClaimed: ToField<'u64'>
  inSwap: ToField<'bool'>
  swapCompleted: ToField<'bool'>
}

export type BatchSwapReified<
  A extends PhantomTypeArgument,
  B extends PhantomTypeArgument,
> = Reified<BatchSwap<A, B>, BatchSwapFields<A, B>>

export class BatchSwap<A extends PhantomTypeArgument, B extends PhantomTypeArgument>
  implements StructClass
{
  __StructClass = true as const

  static readonly $typeName = `${PKG_V3}::batch_swap::BatchSwap`
  static readonly $numTypeParams = 2
  static readonly $isPhantom = [true, true] as const

  readonly $typeName = BatchSwap.$typeName
  readonly $fullTypeName: `${typeof PKG_V3}::batch_swap::BatchSwap<${PhantomToTypeStr<A>}, ${PhantomToTypeStr<B>}>`
  readonly $typeArgs: [PhantomToTypeStr<A>, PhantomToTypeStr<B>]
  readonly $isPhantom = BatchSwap.$isPhantom

  readonly id: ToField<ID>
  readonly in: ToField<Balance<A>>
  readonly out: ToField<Balance<B>>
  readonly totalIn: ToField<'u64'>
  readonly totalOut: ToField<'u64'>
  readonly numClaims: ToField<'u64'>
  readonly totalClaimed: ToField<'u64'>
  readonly inSwap: ToField<'bool'>
  readonly swapCompleted: ToField<'bool'>

  private constructor(
    typeArgs: [PhantomToTypeStr<A>, PhantomToTypeStr<B>],
    fields: BatchSwapFields<A, B>
  ) {
    this.$fullTypeName = composeSuiType(
      BatchSwap.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V3}::batch_swap::BatchSwap<${PhantomToTypeStr<A>}, ${PhantomToTypeStr<B>}>`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.in = fields.in
    this.out = fields.out
    this.totalIn = fields.totalIn
    this.totalOut = fields.totalOut
    this.numClaims = fields.numClaims
    this.totalClaimed = fields.totalClaimed
    this.inSwap = fields.inSwap
    this.swapCompleted = fields.swapCompleted
  }

  static reified<
    A extends PhantomReified<PhantomTypeArgument>,
    B extends PhantomReified<PhantomTypeArgument>,
  >(A: A, B: B): BatchSwapReified<ToPhantomTypeArgument<A>, ToPhantomTypeArgument<B>> {
    const reifiedBcs = BatchSwap.bcs
    return {
      typeName: BatchSwap.$typeName,
      fullTypeName: composeSuiType(
        BatchSwap.$typeName,
        ...[extractType(A), extractType(B)]
      ) as `${typeof PKG_V3}::batch_swap::BatchSwap<${PhantomToTypeStr<ToPhantomTypeArgument<A>>}, ${PhantomToTypeStr<ToPhantomTypeArgument<B>>}>`,
      typeArgs: [extractType(A), extractType(B)] as [
        PhantomToTypeStr<ToPhantomTypeArgument<A>>,
        PhantomToTypeStr<ToPhantomTypeArgument<B>>,
      ],
      isPhantom: BatchSwap.$isPhantom,
      reifiedTypeArgs: [A, B],
      fromFields: (fields: Record<string, any>) => BatchSwap.fromFields([A, B], fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => BatchSwap.fromFieldsWithTypes([A, B], item),
      fromBcs: (data: Uint8Array) => BatchSwap.fromFields([A, B], reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => BatchSwap.fromJSONField([A, B], field),
      fromJSON: (json: Record<string, any>) => BatchSwap.fromJSON([A, B], json),
      fromSuiParsedData: (content: SuiParsedData) => BatchSwap.fromSuiParsedData([A, B], content),
      fromSuiObjectData: (content: SuiObjectData) => BatchSwap.fromSuiObjectData([A, B], content),
      fetch: async (client: SuiClient, id: string) => BatchSwap.fetch(client, [A, B], id),
      new: (fields: BatchSwapFields<ToPhantomTypeArgument<A>, ToPhantomTypeArgument<B>>) => {
        return new BatchSwap([extractType(A), extractType(B)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return BatchSwap.reified
  }

  static phantom<
    A extends PhantomReified<PhantomTypeArgument>,
    B extends PhantomReified<PhantomTypeArgument>,
  >(
    A: A,
    B: B
  ): PhantomReified<ToTypeStr<BatchSwap<ToPhantomTypeArgument<A>, ToPhantomTypeArgument<B>>>> {
    return phantom(BatchSwap.reified(A, B))
  }
  static get p() {
    return BatchSwap.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('BatchSwap', {
      id: ID.bcs,
      in: Balance.bcs,
      out: Balance.bcs,
      total_in: bcs.u64(),
      total_out: bcs.u64(),
      num_claims: bcs.u64(),
      total_claimed: bcs.u64(),
      in_swap: bcs.bool(),
      swap_completed: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof BatchSwap.instantiateBcs> | null = null

  static get bcs() {
    if (!BatchSwap.cachedBcs) {
      BatchSwap.cachedBcs = BatchSwap.instantiateBcs()
    }
    return BatchSwap.cachedBcs
  }

  static fromFields<
    A extends PhantomReified<PhantomTypeArgument>,
    B extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [A, B],
    fields: Record<string, any>
  ): BatchSwap<ToPhantomTypeArgument<A>, ToPhantomTypeArgument<B>> {
    return BatchSwap.reified(typeArgs[0], typeArgs[1]).new({
      id: decodeFromFields(ID.reified(), fields.id),
      in: decodeFromFields(Balance.reified(typeArgs[0]), fields.in),
      out: decodeFromFields(Balance.reified(typeArgs[1]), fields.out),
      totalIn: decodeFromFields('u64', fields.total_in),
      totalOut: decodeFromFields('u64', fields.total_out),
      numClaims: decodeFromFields('u64', fields.num_claims),
      totalClaimed: decodeFromFields('u64', fields.total_claimed),
      inSwap: decodeFromFields('bool', fields.in_swap),
      swapCompleted: decodeFromFields('bool', fields.swap_completed),
    })
  }

  static fromFieldsWithTypes<
    A extends PhantomReified<PhantomTypeArgument>,
    B extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [A, B],
    item: FieldsWithTypes
  ): BatchSwap<ToPhantomTypeArgument<A>, ToPhantomTypeArgument<B>> {
    if (!isBatchSwap(item.type)) {
      throw new Error('not a BatchSwap type')
    }
    assertFieldsWithTypesArgsMatch(item, typeArgs)

    return BatchSwap.reified(typeArgs[0], typeArgs[1]).new({
      id: decodeFromFieldsWithTypes(ID.reified(), item.fields.id),
      in: decodeFromFieldsWithTypes(Balance.reified(typeArgs[0]), item.fields.in),
      out: decodeFromFieldsWithTypes(Balance.reified(typeArgs[1]), item.fields.out),
      totalIn: decodeFromFieldsWithTypes('u64', item.fields.total_in),
      totalOut: decodeFromFieldsWithTypes('u64', item.fields.total_out),
      numClaims: decodeFromFieldsWithTypes('u64', item.fields.num_claims),
      totalClaimed: decodeFromFieldsWithTypes('u64', item.fields.total_claimed),
      inSwap: decodeFromFieldsWithTypes('bool', item.fields.in_swap),
      swapCompleted: decodeFromFieldsWithTypes('bool', item.fields.swap_completed),
    })
  }

  static fromBcs<
    A extends PhantomReified<PhantomTypeArgument>,
    B extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [A, B],
    data: Uint8Array
  ): BatchSwap<ToPhantomTypeArgument<A>, ToPhantomTypeArgument<B>> {
    return BatchSwap.fromFields(typeArgs, BatchSwap.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      in: this.in.toJSONField(),
      out: this.out.toJSONField(),
      totalIn: this.totalIn.toString(),
      totalOut: this.totalOut.toString(),
      numClaims: this.numClaims.toString(),
      totalClaimed: this.totalClaimed.toString(),
      inSwap: this.inSwap,
      swapCompleted: this.swapCompleted,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<
    A extends PhantomReified<PhantomTypeArgument>,
    B extends PhantomReified<PhantomTypeArgument>,
  >(typeArgs: [A, B], field: any): BatchSwap<ToPhantomTypeArgument<A>, ToPhantomTypeArgument<B>> {
    return BatchSwap.reified(typeArgs[0], typeArgs[1]).new({
      id: decodeFromJSONField(ID.reified(), field.id),
      in: decodeFromJSONField(Balance.reified(typeArgs[0]), field.in),
      out: decodeFromJSONField(Balance.reified(typeArgs[1]), field.out),
      totalIn: decodeFromJSONField('u64', field.totalIn),
      totalOut: decodeFromJSONField('u64', field.totalOut),
      numClaims: decodeFromJSONField('u64', field.numClaims),
      totalClaimed: decodeFromJSONField('u64', field.totalClaimed),
      inSwap: decodeFromJSONField('bool', field.inSwap),
      swapCompleted: decodeFromJSONField('bool', field.swapCompleted),
    })
  }

  static fromJSON<
    A extends PhantomReified<PhantomTypeArgument>,
    B extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [A, B],
    json: Record<string, any>
  ): BatchSwap<ToPhantomTypeArgument<A>, ToPhantomTypeArgument<B>> {
    if (json.$typeName !== BatchSwap.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(BatchSwap.$typeName, ...typeArgs.map(extractType)),
      json.$typeArgs,
      typeArgs
    )

    return BatchSwap.fromJSONField(typeArgs, json)
  }

  static fromSuiParsedData<
    A extends PhantomReified<PhantomTypeArgument>,
    B extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [A, B],
    content: SuiParsedData
  ): BatchSwap<ToPhantomTypeArgument<A>, ToPhantomTypeArgument<B>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isBatchSwap(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a BatchSwap object`)
    }
    return BatchSwap.fromFieldsWithTypes(typeArgs, content)
  }

  static fromSuiObjectData<
    A extends PhantomReified<PhantomTypeArgument>,
    B extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [A, B],
    data: SuiObjectData
  ): BatchSwap<ToPhantomTypeArgument<A>, ToPhantomTypeArgument<B>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isBatchSwap(data.bcs.type)) {
        throw new Error(`object at is not a BatchSwap object`)
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

      return BatchSwap.fromBcs(typeArgs, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return BatchSwap.fromSuiParsedData(typeArgs, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<
    A extends PhantomReified<PhantomTypeArgument>,
    B extends PhantomReified<PhantomTypeArgument>,
  >(
    client: SuiClient,
    typeArgs: [A, B],
    id: string
  ): Promise<BatchSwap<ToPhantomTypeArgument<A>, ToPhantomTypeArgument<B>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching BatchSwap object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isBatchSwap(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a BatchSwap object`)
    }

    return BatchSwap.fromSuiObjectData(typeArgs, res.data)
  }
}

/* ============================== BatchSwapClaim =============================== */

export function isBatchSwapClaim(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V3}::batch_swap::BatchSwapClaim`
}

export interface BatchSwapClaimFields {
  batchSwapId: ToField<ID>
  amount: ToField<'u64'>
}

export type BatchSwapClaimReified = Reified<BatchSwapClaim, BatchSwapClaimFields>

export class BatchSwapClaim implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V3}::batch_swap::BatchSwapClaim`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = BatchSwapClaim.$typeName
  readonly $fullTypeName: `${typeof PKG_V3}::batch_swap::BatchSwapClaim`
  readonly $typeArgs: []
  readonly $isPhantom = BatchSwapClaim.$isPhantom

  readonly batchSwapId: ToField<ID>
  readonly amount: ToField<'u64'>

  private constructor(typeArgs: [], fields: BatchSwapClaimFields) {
    this.$fullTypeName = composeSuiType(
      BatchSwapClaim.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V3}::batch_swap::BatchSwapClaim`
    this.$typeArgs = typeArgs

    this.batchSwapId = fields.batchSwapId
    this.amount = fields.amount
  }

  static reified(): BatchSwapClaimReified {
    const reifiedBcs = BatchSwapClaim.bcs
    return {
      typeName: BatchSwapClaim.$typeName,
      fullTypeName: composeSuiType(
        BatchSwapClaim.$typeName,
        ...[]
      ) as `${typeof PKG_V3}::batch_swap::BatchSwapClaim`,
      typeArgs: [] as [],
      isPhantom: BatchSwapClaim.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => BatchSwapClaim.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => BatchSwapClaim.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => BatchSwapClaim.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => BatchSwapClaim.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => BatchSwapClaim.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => BatchSwapClaim.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => BatchSwapClaim.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => BatchSwapClaim.fetch(client, id),
      new: (fields: BatchSwapClaimFields) => {
        return new BatchSwapClaim([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return BatchSwapClaim.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<BatchSwapClaim>> {
    return phantom(BatchSwapClaim.reified())
  }
  static get p() {
    return BatchSwapClaim.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('BatchSwapClaim', {
      batch_swap_id: ID.bcs,
      amount: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof BatchSwapClaim.instantiateBcs> | null = null

  static get bcs() {
    if (!BatchSwapClaim.cachedBcs) {
      BatchSwapClaim.cachedBcs = BatchSwapClaim.instantiateBcs()
    }
    return BatchSwapClaim.cachedBcs
  }

  static fromFields(fields: Record<string, any>): BatchSwapClaim {
    return BatchSwapClaim.reified().new({
      batchSwapId: decodeFromFields(ID.reified(), fields.batch_swap_id),
      amount: decodeFromFields('u64', fields.amount),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): BatchSwapClaim {
    if (!isBatchSwapClaim(item.type)) {
      throw new Error('not a BatchSwapClaim type')
    }

    return BatchSwapClaim.reified().new({
      batchSwapId: decodeFromFieldsWithTypes(ID.reified(), item.fields.batch_swap_id),
      amount: decodeFromFieldsWithTypes('u64', item.fields.amount),
    })
  }

  static fromBcs(data: Uint8Array): BatchSwapClaim {
    return BatchSwapClaim.fromFields(BatchSwapClaim.bcs.parse(data))
  }

  toJSONField() {
    return {
      batchSwapId: this.batchSwapId,
      amount: this.amount.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): BatchSwapClaim {
    return BatchSwapClaim.reified().new({
      batchSwapId: decodeFromJSONField(ID.reified(), field.batchSwapId),
      amount: decodeFromJSONField('u64', field.amount),
    })
  }

  static fromJSON(json: Record<string, any>): BatchSwapClaim {
    if (json.$typeName !== BatchSwapClaim.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return BatchSwapClaim.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): BatchSwapClaim {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isBatchSwapClaim(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a BatchSwapClaim object`)
    }
    return BatchSwapClaim.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): BatchSwapClaim {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isBatchSwapClaim(data.bcs.type)) {
        throw new Error(`object at is not a BatchSwapClaim object`)
      }

      return BatchSwapClaim.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return BatchSwapClaim.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<BatchSwapClaim> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching BatchSwapClaim object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isBatchSwapClaim(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a BatchSwapClaim object`)
    }

    return BatchSwapClaim.fromSuiObjectData(res.data)
  }
}
