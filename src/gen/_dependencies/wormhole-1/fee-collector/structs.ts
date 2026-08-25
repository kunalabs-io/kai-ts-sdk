/**
 * This module implements a container that collects fees in SUI denomination.
 * The `FeeCollector` requires that the fee deposited is exactly equal to the
 * `fee_amount` configured.
 */

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
  ToTypeStr as ToPhantom,
} from '../../../_framework/reified'
import { composeSuiType, compressSuiType, FieldsWithTypes } from '../../../_framework/util'
import { Balance } from '../../../sui/balance/structs'
import { SUI } from '../../../sui/sui/structs'

/* ============================== FeeCollector =============================== */

export function isFeeCollector(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('wormhole-1', 'fee_collector::FeeCollector')}::fee_collector::FeeCollector`
}

export interface FeeCollectorFields {
  feeAmount: ToField<'u64'>
  balance: ToField<Balance<ToPhantom<SUI>>>
}

export type FeeCollectorReified = Reified<FeeCollector, FeeCollectorFields>

export type FeeCollectorJSONField = {
  feeAmount: string
  balance: ToJSON<Balance<ToPhantom<SUI>>>
}

export type FeeCollectorJSON = {
  $typeName: typeof FeeCollector.$typeName
  $typeArgs: []
} & FeeCollectorJSONField

/** Container for configured `fee_amount` and `balance` of SUI collected. */
export class FeeCollector implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::fee_collector::FeeCollector` {
    return `${
      getTypeOrigin('wormhole-1', 'fee_collector::FeeCollector')
    }::fee_collector::FeeCollector` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof FeeCollector.$typeName = FeeCollector.$typeName
  readonly $fullTypeName: `${string}::fee_collector::FeeCollector`
  readonly $typeArgs: []
  readonly $isPhantom: typeof FeeCollector.$isPhantom = FeeCollector.$isPhantom

  readonly feeAmount: ToField<'u64'>
  readonly balance: ToField<Balance<ToPhantom<SUI>>>

  private constructor(typeArgs: [], fields: FeeCollectorFields) {
    this.$fullTypeName = composeSuiType(
      FeeCollector.$typeName,
      ...typeArgs,
    ) as `${string}::fee_collector::FeeCollector`
    this.$typeArgs = typeArgs

    this.feeAmount = fields.feeAmount
    this.balance = fields.balance
  }

  static reified(): FeeCollectorReified {
    const reifiedBcs = FeeCollector.bcs
    return {
      get typeName() {
        return FeeCollector.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          FeeCollector.$typeName,
          ...[],
        ) as `${string}::fee_collector::FeeCollector`
      },
      typeArgs: [] as [],
      isPhantom: FeeCollector.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => FeeCollector.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => FeeCollector.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => FeeCollector.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => FeeCollector.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => FeeCollector.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        FeeCollector.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => FeeCollector.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => FeeCollector.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => FeeCollector.fetch(client, id),
      new: (fields: FeeCollectorFields) => {
        return new FeeCollector([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): FeeCollectorReified {
    return FeeCollector.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<FeeCollector>> {
    return phantom(FeeCollector.reified())
  }

  static get p(): PhantomReified<ToTypeStr<FeeCollector>> {
    return FeeCollector.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('FeeCollector', {
      fee_amount: bcs.u64(),
      balance: Balance.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof FeeCollector.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof FeeCollector.instantiateBcs> {
    if (!FeeCollector.cachedBcs) {
      FeeCollector.cachedBcs = FeeCollector.instantiateBcs()
    }
    return FeeCollector.cachedBcs
  }

  static fromFields(fields: Record<string, any>): FeeCollector {
    return FeeCollector.reified().new({
      feeAmount: decodeFromFields('u64', fields.fee_amount),
      balance: decodeFromFields(Balance.reified(phantom(SUI.reified())), fields.balance),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): FeeCollector {
    if (!isFeeCollector(item.type)) {
      throw new Error('not a FeeCollector type')
    }

    return FeeCollector.reified().new({
      feeAmount: decodeFromFieldsWithTypes('u64', item.fields.fee_amount),
      balance: decodeFromFieldsWithTypes(
        Balance.reified(phantom(SUI.reified())),
        item.fields.balance,
      ),
    })
  }

  static fromBcs(data: Uint8Array): FeeCollector {
    return FeeCollector.fromFields(FeeCollector.bcs.parse(data))
  }

  toJSONField(): FeeCollectorJSONField {
    return {
      feeAmount: this.feeAmount.toString(),
      balance: this.balance.toJSONField(),
    }
  }

  toJSON(): FeeCollectorJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): FeeCollector {
    return FeeCollector.reified().new({
      feeAmount: decodeFromJSONField('u64', field.feeAmount),
      balance: decodeFromJSONField(Balance.reified(phantom(SUI.reified())), field.balance),
    })
  }

  static fromJSON(json: Record<string, any>): FeeCollector {
    if (json.$typeName !== FeeCollector.$typeName) {
      throw new Error(
        `not a FeeCollector json object: expected '${FeeCollector.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return FeeCollector.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): FeeCollector {
    if (!isFeeCollector(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a FeeCollector object`)
    }
    return FeeCollector.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link FeeCollector.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): FeeCollector {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isFeeCollector(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a FeeCollector object`)
    }
    return FeeCollector.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link FeeCollector.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): FeeCollector {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isFeeCollector(data.bcs.type)) {
        throw new Error(`object at is not a FeeCollector object`)
      }

      return FeeCollector.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return FeeCollector.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<FeeCollector> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isFeeCollector(object.type)) {
      throw new Error(`object at id ${id} is not a FeeCollector object`)
    }
    return FeeCollector.fromBcs(object.content)
  }
}
