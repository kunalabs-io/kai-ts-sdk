/**
 * This module implements methods that create a specific coin type reflecting a
 * wrapped (foreign) asset, whose metadata is encoded in a VAA sent from
 * another network.
 *
 * Wrapped assets are created in two steps.
 * 1. `prepare_registration`: This method creates a new `TreasuryCap` for a
 * given coin type and wraps an encoded asset metadata VAA. We require a
 * one-time witness (OTW) to throw an explicit error (even though it is
 * redundant with what `create_currency` requires). This coin will
 * be published using this method, meaning the `init` method in that
 * untrusted package will have the asset's decimals hard-coded for its
 * coin metadata. A `WrappedAssetSetup` object is transferred to the
 * transaction sender.
 * 2. `complete_registration`: This method destroys the `WrappedAssetSetup`
 * object by unpacking its `TreasuryCap`, which will be warehoused in the
 * `TokenRegistry`. The shared coin metadata object will be updated to
 * reflect the contents of the encoded asset metadata payload.
 *
 * Wrapped asset metadata can also be updated with a new asset metadata VAA.
 * By calling `update_attestation`, Token Bridge verifies that the specific
 * coin type is registered and agrees with the encoded asset metadata's
 * canonical token info. `ForeignInfo` and the coin's metadata will be updated
 * based on the encoded asset metadata payload.
 *
 * See `state` and `wrapped_asset` modules for more details.
 *
 * References:
 * https://examples.sui.io/basics/one-time-witness.html
 */

import { bcs } from '@mysten/sui/bcs'
import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import type { SuiObjectData, SuiParsedData } from '@mysten/sui/jsonRpc'
import { fromBase64 } from '@mysten/sui/utils'
import { getTypeOrigin } from '../../../_envs'
import {
  assertFieldsWithTypesArgsMatch,
  assertReifiedTypeArgsMatch,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  extractType,
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
} from '../../../_framework/reified'
import {
  composeSuiType,
  compressSuiType,
  FieldsWithTypes,
  parseTypeName,
} from '../../../_framework/util'
import { TreasuryCap } from '../../../sui/coin/structs'
import { UID } from '../../../sui/object/structs'

/* ============================== WrappedAssetSetup =============================== */

export function isWrappedAssetSetup(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    `${
      getTypeOrigin('token-bridge', 'create_wrapped::WrappedAssetSetup')
    }::create_wrapped::WrappedAssetSetup` + '<',
  )
}

export interface WrappedAssetSetupFields<
  CoinType extends PhantomTypeArgument,
  Version extends PhantomTypeArgument,
> {
  id: ToField<UID>
  treasuryCap: ToField<TreasuryCap<CoinType>>
}

export type WrappedAssetSetupReified<
  CoinType extends PhantomTypeArgument,
  Version extends PhantomTypeArgument,
> = Reified<WrappedAssetSetup<CoinType, Version>, WrappedAssetSetupFields<CoinType, Version>>

export type WrappedAssetSetupJSONField<
  CoinType extends PhantomTypeArgument,
  Version extends PhantomTypeArgument,
> = {
  id: string
  treasuryCap: ToJSON<TreasuryCap<CoinType>>
}

export type WrappedAssetSetupJSON<
  CoinType extends PhantomTypeArgument,
  Version extends PhantomTypeArgument,
> = {
  $typeName: typeof WrappedAssetSetup.$typeName
  $typeArgs: [PhantomToTypeStr<CoinType>, PhantomToTypeStr<Version>]
} & WrappedAssetSetupJSONField<CoinType, Version>

/**
 * Container holding new coin type's `TreasuryCap` and encoded asset metadata
 * VAA, which are required to complete this asset's registration.
 */
export class WrappedAssetSetup<
  CoinType extends PhantomTypeArgument,
  Version extends PhantomTypeArgument,
> implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::create_wrapped::WrappedAssetSetup` {
    return `${
      getTypeOrigin('token-bridge', 'create_wrapped::WrappedAssetSetup')
    }::create_wrapped::WrappedAssetSetup` as const
  }
  static readonly $numTypeParams = 2
  static readonly $isPhantom = [true, true] as const

  readonly $typeName: typeof WrappedAssetSetup.$typeName = WrappedAssetSetup.$typeName
  readonly $fullTypeName: `${string}::create_wrapped::WrappedAssetSetup<${PhantomToTypeStr<
    CoinType
  >}, ${PhantomToTypeStr<Version>}>`
  readonly $typeArgs: [PhantomToTypeStr<CoinType>, PhantomToTypeStr<Version>]
  readonly $isPhantom: typeof WrappedAssetSetup.$isPhantom = WrappedAssetSetup.$isPhantom

  readonly id: ToField<UID>
  readonly treasuryCap: ToField<TreasuryCap<CoinType>>

  private constructor(
    typeArgs: [PhantomToTypeStr<CoinType>, PhantomToTypeStr<Version>],
    fields: WrappedAssetSetupFields<CoinType, Version>,
  ) {
    this.$fullTypeName = composeSuiType(
      WrappedAssetSetup.$typeName,
      ...typeArgs,
    ) as `${string}::create_wrapped::WrappedAssetSetup<${PhantomToTypeStr<
      CoinType
    >}, ${PhantomToTypeStr<Version>}>`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.treasuryCap = fields.treasuryCap
  }

  static reified<
    CoinType extends PhantomReified<PhantomTypeArgument>,
    Version extends PhantomReified<PhantomTypeArgument>,
  >(
    CoinType: CoinType,
    Version: Version,
  ): WrappedAssetSetupReified<ToPhantomTypeArgument<CoinType>, ToPhantomTypeArgument<Version>> {
    const reifiedBcs = WrappedAssetSetup.bcs
    return {
      get typeName() {
        return WrappedAssetSetup.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          WrappedAssetSetup.$typeName,
          ...[extractType(CoinType), extractType(Version)],
        ) as `${string}::create_wrapped::WrappedAssetSetup<${PhantomToTypeStr<
          ToPhantomTypeArgument<CoinType>
        >}, ${PhantomToTypeStr<ToPhantomTypeArgument<Version>>}>`
      },
      get typeArgs() {
        return [extractType(CoinType), extractType(Version)] as [
          PhantomToTypeStr<ToPhantomTypeArgument<CoinType>>,
          PhantomToTypeStr<ToPhantomTypeArgument<Version>>,
        ]
      },
      isPhantom: WrappedAssetSetup.$isPhantom,
      reifiedTypeArgs: [CoinType, Version],
      fromFields: (fields: Record<string, any>) =>
        WrappedAssetSetup.fromFields([CoinType, Version], fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        WrappedAssetSetup.fromFieldsWithTypes([CoinType, Version], item),
      fromBcs: (data: Uint8Array) =>
        WrappedAssetSetup.fromFields([CoinType, Version], reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => WrappedAssetSetup.fromJSONField([CoinType, Version], field),
      fromJSON: (json: Record<string, any>) =>
        WrappedAssetSetup.fromJSON([CoinType, Version], json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        WrappedAssetSetup.fromCoreObject([CoinType, Version], obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        WrappedAssetSetup.fromSuiParsedData([CoinType, Version], content),
      fromSuiObjectData: (content: SuiObjectData) =>
        WrappedAssetSetup.fromSuiObjectData([CoinType, Version], content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        WrappedAssetSetup.fetch(client, [CoinType, Version], id),
      new: (
        fields: WrappedAssetSetupFields<
          ToPhantomTypeArgument<CoinType>,
          ToPhantomTypeArgument<Version>
        >,
      ) => {
        return new WrappedAssetSetup([extractType(CoinType), extractType(Version)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof WrappedAssetSetup.reified {
    return WrappedAssetSetup.reified
  }

  static phantom<
    CoinType extends PhantomReified<PhantomTypeArgument>,
    Version extends PhantomReified<PhantomTypeArgument>,
  >(
    CoinType: CoinType,
    Version: Version,
  ): PhantomReified<
    ToTypeStr<WrappedAssetSetup<ToPhantomTypeArgument<CoinType>, ToPhantomTypeArgument<Version>>>
  > {
    return phantom(WrappedAssetSetup.reified(CoinType, Version))
  }

  static get p(): typeof WrappedAssetSetup.phantom {
    return WrappedAssetSetup.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('WrappedAssetSetup', {
      id: UID.bcs,
      treasury_cap: TreasuryCap.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof WrappedAssetSetup.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof WrappedAssetSetup.instantiateBcs> {
    if (!WrappedAssetSetup.cachedBcs) {
      WrappedAssetSetup.cachedBcs = WrappedAssetSetup.instantiateBcs()
    }
    return WrappedAssetSetup.cachedBcs
  }

  static fromFields<
    CoinType extends PhantomReified<PhantomTypeArgument>,
    Version extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [CoinType, Version],
    fields: Record<string, any>,
  ): WrappedAssetSetup<ToPhantomTypeArgument<CoinType>, ToPhantomTypeArgument<Version>> {
    return WrappedAssetSetup.reified(typeArgs[0], typeArgs[1]).new({
      id: decodeFromFields(UID.reified(), fields.id),
      treasuryCap: decodeFromFields(TreasuryCap.reified(typeArgs[0]), fields.treasury_cap),
    })
  }

  static fromFieldsWithTypes<
    CoinType extends PhantomReified<PhantomTypeArgument>,
    Version extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [CoinType, Version],
    item: FieldsWithTypes,
  ): WrappedAssetSetup<ToPhantomTypeArgument<CoinType>, ToPhantomTypeArgument<Version>> {
    if (!isWrappedAssetSetup(item.type)) {
      throw new Error('not a WrappedAssetSetup type')
    }
    assertFieldsWithTypesArgsMatch(item, typeArgs)

    return WrappedAssetSetup.reified(typeArgs[0], typeArgs[1]).new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      treasuryCap: decodeFromFieldsWithTypes(
        TreasuryCap.reified(typeArgs[0]),
        item.fields.treasury_cap,
      ),
    })
  }

  static fromBcs<
    CoinType extends PhantomReified<PhantomTypeArgument>,
    Version extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [CoinType, Version],
    data: Uint8Array,
  ): WrappedAssetSetup<ToPhantomTypeArgument<CoinType>, ToPhantomTypeArgument<Version>> {
    return WrappedAssetSetup.fromFields(typeArgs, WrappedAssetSetup.bcs.parse(data))
  }

  toJSONField(): WrappedAssetSetupJSONField<CoinType, Version> {
    return {
      id: this.id,
      treasuryCap: this.treasuryCap.toJSONField(),
    }
  }

  toJSON(): WrappedAssetSetupJSON<CoinType, Version> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<
    CoinType extends PhantomReified<PhantomTypeArgument>,
    Version extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [CoinType, Version],
    field: any,
  ): WrappedAssetSetup<ToPhantomTypeArgument<CoinType>, ToPhantomTypeArgument<Version>> {
    return WrappedAssetSetup.reified(typeArgs[0], typeArgs[1]).new({
      id: decodeFromJSONField(UID.reified(), field.id),
      treasuryCap: decodeFromJSONField(TreasuryCap.reified(typeArgs[0]), field.treasuryCap),
    })
  }

  static fromJSON<
    CoinType extends PhantomReified<PhantomTypeArgument>,
    Version extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [CoinType, Version],
    json: Record<string, any>,
  ): WrappedAssetSetup<ToPhantomTypeArgument<CoinType>, ToPhantomTypeArgument<Version>> {
    if (json.$typeName !== WrappedAssetSetup.$typeName) {
      throw new Error(
        `not a WrappedAssetSetup json object: expected '${WrappedAssetSetup.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(WrappedAssetSetup.$typeName, ...typeArgs.map(extractType)),
      json.$typeArgs,
      typeArgs,
    )

    return WrappedAssetSetup.fromJSONField(typeArgs, json)
  }

  static fromCoreObject<
    CoinType extends PhantomReified<PhantomTypeArgument>,
    Version extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [CoinType, Version],
    obj: SuiClientTypes.Object<{ content: true }>,
  ): WrappedAssetSetup<ToPhantomTypeArgument<CoinType>, ToPhantomTypeArgument<Version>> {
    if (!isWrappedAssetSetup(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a WrappedAssetSetup object`)
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

    return WrappedAssetSetup.fromBcs(typeArgs, obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link WrappedAssetSetup.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<
    CoinType extends PhantomReified<PhantomTypeArgument>,
    Version extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [CoinType, Version],
    content: SuiParsedData,
  ): WrappedAssetSetup<ToPhantomTypeArgument<CoinType>, ToPhantomTypeArgument<Version>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isWrappedAssetSetup(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a WrappedAssetSetup object`)
    }
    return WrappedAssetSetup.fromFieldsWithTypes(typeArgs, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link WrappedAssetSetup.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<
    CoinType extends PhantomReified<PhantomTypeArgument>,
    Version extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [CoinType, Version],
    data: SuiObjectData,
  ): WrappedAssetSetup<ToPhantomTypeArgument<CoinType>, ToPhantomTypeArgument<Version>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isWrappedAssetSetup(data.bcs.type)) {
        throw new Error(`object at is not a WrappedAssetSetup object`)
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

      return WrappedAssetSetup.fromBcs(typeArgs, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return WrappedAssetSetup.fromSuiParsedData(typeArgs, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<
    CoinType extends PhantomReified<PhantomTypeArgument>,
    Version extends PhantomReified<PhantomTypeArgument>,
  >(
    client: ClientWithCoreApi,
    typeArgs: [CoinType, Version],
    id: string,
  ): Promise<WrappedAssetSetup<ToPhantomTypeArgument<CoinType>, ToPhantomTypeArgument<Version>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isWrappedAssetSetup(object.type)) {
      throw new Error(`object at id ${id} is not a WrappedAssetSetup object`)
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

    return WrappedAssetSetup.fromBcs(typeArgs, object.content)
  }
}
