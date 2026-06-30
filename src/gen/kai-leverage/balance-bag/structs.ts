/**
 * Collection for managing heterogeneous token balances.
 *
 * This module provides a type-safe collection that can store balances for multiple
 * coin types simultaneously. It's commonly used in scenarios where a single entity
 * needs to hold and manage various token types, such as collateral management in
 * lending protocols or multi-asset treasury systems.
 *
 * Key properties:
 * - Maintains summary information for efficient queries
 * - Supports partial and full withdrawals by token type
 * - Automatically handles zero-balance cleanup
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
import { TypeName } from '../../std/type-name/structs'
import { Bag } from '../../sui/bag/structs'
import { UID } from '../../sui/object/structs'
import { VecMap } from '../../sui/vec-map/structs'

/* ============================== BalanceBag =============================== */

export function isBalanceBag(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('kai-leverage', 'balance_bag::BalanceBag')}::balance_bag::BalanceBag`
}

export interface BalanceBagFields {
  id: ToField<UID>
  amounts: ToField<VecMap<TypeName, 'u64'>>
  inner: ToField<Bag>
}

export type BalanceBagReified = Reified<BalanceBag, BalanceBagFields>

export type BalanceBagJSONField = {
  id: string
  amounts: ToJSON<VecMap<TypeName, 'u64'>>
  inner: ToJSON<Bag>
}

export type BalanceBagJSON = {
  $typeName: typeof BalanceBag.$typeName
  $typeArgs: []
} & BalanceBagJSONField

/** Collection that stores balances for multiple coin types. */
export class BalanceBag implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::balance_bag::BalanceBag` {
    return `${
      getTypeOrigin('kai-leverage', 'balance_bag::BalanceBag')
    }::balance_bag::BalanceBag` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof BalanceBag.$typeName = BalanceBag.$typeName
  readonly $fullTypeName: `${string}::balance_bag::BalanceBag`
  readonly $typeArgs: []
  readonly $isPhantom: typeof BalanceBag.$isPhantom = BalanceBag.$isPhantom

  readonly id: ToField<UID>
  readonly amounts: ToField<VecMap<TypeName, 'u64'>>
  readonly inner: ToField<Bag>

  private constructor(typeArgs: [], fields: BalanceBagFields) {
    this.$fullTypeName = composeSuiType(
      BalanceBag.$typeName,
      ...typeArgs,
    ) as `${string}::balance_bag::BalanceBag`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.amounts = fields.amounts
    this.inner = fields.inner
  }

  static reified(): BalanceBagReified {
    const reifiedBcs = BalanceBag.bcs
    return {
      get typeName() {
        return BalanceBag.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          BalanceBag.$typeName,
          ...[],
        ) as `${string}::balance_bag::BalanceBag`
      },
      typeArgs: [] as [],
      isPhantom: BalanceBag.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => BalanceBag.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => BalanceBag.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => BalanceBag.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => BalanceBag.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => BalanceBag.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        BalanceBag.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => BalanceBag.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => BalanceBag.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => BalanceBag.fetch(client, id),
      new: (fields: BalanceBagFields) => {
        return new BalanceBag([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): BalanceBagReified {
    return BalanceBag.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<BalanceBag>> {
    return phantom(BalanceBag.reified())
  }

  static get p(): PhantomReified<ToTypeStr<BalanceBag>> {
    return BalanceBag.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('BalanceBag', {
      id: UID.bcs,
      amounts: VecMap.bcs(TypeName.bcs, bcs.u64()),
      inner: Bag.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof BalanceBag.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof BalanceBag.instantiateBcs> {
    if (!BalanceBag.cachedBcs) {
      BalanceBag.cachedBcs = BalanceBag.instantiateBcs()
    }
    return BalanceBag.cachedBcs
  }

  static fromFields(fields: Record<string, any>): BalanceBag {
    return BalanceBag.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      amounts: decodeFromFields(VecMap.reified(TypeName.reified(), 'u64'), fields.amounts),
      inner: decodeFromFields(Bag.reified(), fields.inner),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): BalanceBag {
    if (!isBalanceBag(item.type)) {
      throw new Error('not a BalanceBag type')
    }

    return BalanceBag.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      amounts: decodeFromFieldsWithTypes(
        VecMap.reified(TypeName.reified(), 'u64'),
        item.fields.amounts,
      ),
      inner: decodeFromFieldsWithTypes(Bag.reified(), item.fields.inner),
    })
  }

  static fromBcs(data: Uint8Array): BalanceBag {
    return BalanceBag.fromFields(BalanceBag.bcs.parse(data))
  }

  toJSONField(): BalanceBagJSONField {
    return {
      id: this.id,
      amounts: this.amounts.toJSONField(),
      inner: this.inner.toJSONField(),
    }
  }

  toJSON(): BalanceBagJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): BalanceBag {
    return BalanceBag.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      amounts: decodeFromJSONField(VecMap.reified(TypeName.reified(), 'u64'), field.amounts),
      inner: decodeFromJSONField(Bag.reified(), field.inner),
    })
  }

  static fromJSON(json: Record<string, any>): BalanceBag {
    if (json.$typeName !== BalanceBag.$typeName) {
      throw new Error(
        `not a BalanceBag json object: expected '${BalanceBag.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return BalanceBag.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): BalanceBag {
    if (!isBalanceBag(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a BalanceBag object`)
    }
    return BalanceBag.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link BalanceBag.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): BalanceBag {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isBalanceBag(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a BalanceBag object`)
    }
    return BalanceBag.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link BalanceBag.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): BalanceBag {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isBalanceBag(data.bcs.type)) {
        throw new Error(`object at is not a BalanceBag object`)
      }

      return BalanceBag.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return BalanceBag.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<BalanceBag> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isBalanceBag(object.type)) {
      throw new Error(`object at id ${id} is not a BalanceBag object`)
    }
    return BalanceBag.fromBcs(object.content)
  }
}
