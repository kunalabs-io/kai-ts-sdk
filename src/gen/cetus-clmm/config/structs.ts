/**
 * The global config module is used for manage the `protocol_fee`, acl roles, fee_tiers and package version of the cetus clmmpool protocol.
 * The `protocol_fee` is the protocol fee rate, it will be charged when user swap token.
 * The `fee_tiers` is a map, the key is the tick spacing, the value is the fee rate. the fee_rate can be same for
 * different tick_spacing and can be updated.
 * For different types of pair, we can use different tick spacing. Basically, for stable pair we can use small tick
 * spacing, for volatile pair we can use large tick spacing.
 * the fee generated of a swap is calculated by the following formula:
 * total_fee = fee_rate * swap_in_amount.
 * protocol_fee = total_fee * protocol_fee_rate / 1000000
 * lp_fee = total_fee - protocol_fee
 * Also, the acl roles is managed by this module, the roles is used for control the access of the cetus clmmpool
 * protocol.
 * Currently, we have 5 roles:
 * 1. PoolManager: The pool manager can update pool fee rate, pause and unpause the pool.
 * 2. FeeTierManager: The fee tier manager can add/remove fee tier, update fee tier fee rate.
 * 3. ClaimProtocolFee: The claim protocol fee can claim the protocol fee.
 * 4. PartnerManager: The partner manager can add/remove partner, update partner fee rate.
 * 5. RewarderManager: The rewarder manager can add/remove rewarder, update rewarder fee rate.
 * 6. EmergencyPause: The emergency pause can emergency pause the protocol.
 * The package version is used for upgrade the package, when upgrade the package, we need increase the package version.
 */

import { bcs } from '@mysten/sui/bcs'
import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import type { SuiObjectData, SuiParsedData } from '@mysten/sui/jsonRpc'
import { fromBase64, fromHex, toHex } from '@mysten/sui/utils'
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
import { ID, UID } from '../../sui/object/structs'
import { VecMap } from '../../sui/vec-map/structs'
import { ACL } from '../acl/structs'

/* ============================== AdminCap =============================== */

export function isAdminCap(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('cetus-clmm', 'config::AdminCap')}::config::AdminCap`
}

export interface AdminCapFields {
  id: ToField<UID>
}

export type AdminCapReified = Reified<AdminCap, AdminCapFields>

export type AdminCapJSONField = {
  id: string
}

export type AdminCapJSON = {
  $typeName: typeof AdminCap.$typeName
  $typeArgs: []
} & AdminCapJSONField

/** `AdminCap` is a capability token that grants administrative privileges to its holder. */
export class AdminCap implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::config::AdminCap` {
    return `${getTypeOrigin('cetus-clmm', 'config::AdminCap')}::config::AdminCap` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof AdminCap.$typeName = AdminCap.$typeName
  readonly $fullTypeName: `${string}::config::AdminCap`
  readonly $typeArgs: []
  readonly $isPhantom: typeof AdminCap.$isPhantom = AdminCap.$isPhantom

  readonly id: ToField<UID>

  private constructor(typeArgs: [], fields: AdminCapFields) {
    this.$fullTypeName = composeSuiType(
      AdminCap.$typeName,
      ...typeArgs,
    ) as `${string}::config::AdminCap`
    this.$typeArgs = typeArgs

    this.id = fields.id
  }

  static reified(): AdminCapReified {
    const reifiedBcs = AdminCap.bcs
    return {
      get typeName() {
        return AdminCap.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          AdminCap.$typeName,
          ...[],
        ) as `${string}::config::AdminCap`
      },
      typeArgs: [] as [],
      isPhantom: AdminCap.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AdminCap.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AdminCap.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AdminCap.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AdminCap.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AdminCap.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        AdminCap.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => AdminCap.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AdminCap.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => AdminCap.fetch(client, id),
      new: (fields: AdminCapFields) => {
        return new AdminCap([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): AdminCapReified {
    return AdminCap.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AdminCap>> {
    return phantom(AdminCap.reified())
  }

  static get p(): PhantomReified<ToTypeStr<AdminCap>> {
    return AdminCap.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AdminCap', {
      id: UID.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof AdminCap.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof AdminCap.instantiateBcs> {
    if (!AdminCap.cachedBcs) {
      AdminCap.cachedBcs = AdminCap.instantiateBcs()
    }
    return AdminCap.cachedBcs
  }

  static fromFields(fields: Record<string, any>): AdminCap {
    return AdminCap.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): AdminCap {
    if (!isAdminCap(item.type)) {
      throw new Error('not a AdminCap type')
    }

    return AdminCap.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
    })
  }

  static fromBcs(data: Uint8Array): AdminCap {
    return AdminCap.fromFields(AdminCap.bcs.parse(data))
  }

  toJSONField(): AdminCapJSONField {
    return {
      id: this.id,
    }
  }

  toJSON(): AdminCapJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AdminCap {
    return AdminCap.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
    })
  }

  static fromJSON(json: Record<string, any>): AdminCap {
    if (json.$typeName !== AdminCap.$typeName) {
      throw new Error(
        `not a AdminCap json object: expected '${AdminCap.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return AdminCap.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): AdminCap {
    if (!isAdminCap(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a AdminCap object`)
    }
    return AdminCap.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AdminCap.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): AdminCap {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAdminCap(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AdminCap object`)
    }
    return AdminCap.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AdminCap.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): AdminCap {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAdminCap(data.bcs.type)) {
        throw new Error(`object at is not a AdminCap object`)
      }

      return AdminCap.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AdminCap.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<AdminCap> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isAdminCap(object.type)) {
      throw new Error(`object at id ${id} is not a AdminCap object`)
    }
    return AdminCap.fromBcs(object.content)
  }
}

/* ============================== ProtocolFeeClaimCap =============================== */

export function isProtocolFeeClaimCap(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('cetus-clmm', 'config::ProtocolFeeClaimCap')}::config::ProtocolFeeClaimCap`
}

export interface ProtocolFeeClaimCapFields {
  id: ToField<UID>
}

export type ProtocolFeeClaimCapReified = Reified<ProtocolFeeClaimCap, ProtocolFeeClaimCapFields>

export type ProtocolFeeClaimCapJSONField = {
  id: string
}

export type ProtocolFeeClaimCapJSON = {
  $typeName: typeof ProtocolFeeClaimCap.$typeName
  $typeArgs: []
} & ProtocolFeeClaimCapJSONField

/** This struct is redundant. */
export class ProtocolFeeClaimCap implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::config::ProtocolFeeClaimCap` {
    return `${
      getTypeOrigin('cetus-clmm', 'config::ProtocolFeeClaimCap')
    }::config::ProtocolFeeClaimCap` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof ProtocolFeeClaimCap.$typeName = ProtocolFeeClaimCap.$typeName
  readonly $fullTypeName: `${string}::config::ProtocolFeeClaimCap`
  readonly $typeArgs: []
  readonly $isPhantom: typeof ProtocolFeeClaimCap.$isPhantom = ProtocolFeeClaimCap.$isPhantom

  readonly id: ToField<UID>

  private constructor(typeArgs: [], fields: ProtocolFeeClaimCapFields) {
    this.$fullTypeName = composeSuiType(
      ProtocolFeeClaimCap.$typeName,
      ...typeArgs,
    ) as `${string}::config::ProtocolFeeClaimCap`
    this.$typeArgs = typeArgs

    this.id = fields.id
  }

  static reified(): ProtocolFeeClaimCapReified {
    const reifiedBcs = ProtocolFeeClaimCap.bcs
    return {
      get typeName() {
        return ProtocolFeeClaimCap.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          ProtocolFeeClaimCap.$typeName,
          ...[],
        ) as `${string}::config::ProtocolFeeClaimCap`
      },
      typeArgs: [] as [],
      isPhantom: ProtocolFeeClaimCap.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ProtocolFeeClaimCap.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ProtocolFeeClaimCap.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ProtocolFeeClaimCap.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ProtocolFeeClaimCap.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ProtocolFeeClaimCap.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        ProtocolFeeClaimCap.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => ProtocolFeeClaimCap.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ProtocolFeeClaimCap.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => ProtocolFeeClaimCap.fetch(client, id),
      new: (fields: ProtocolFeeClaimCapFields) => {
        return new ProtocolFeeClaimCap([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): ProtocolFeeClaimCapReified {
    return ProtocolFeeClaimCap.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ProtocolFeeClaimCap>> {
    return phantom(ProtocolFeeClaimCap.reified())
  }

  static get p(): PhantomReified<ToTypeStr<ProtocolFeeClaimCap>> {
    return ProtocolFeeClaimCap.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ProtocolFeeClaimCap', {
      id: UID.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof ProtocolFeeClaimCap.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof ProtocolFeeClaimCap.instantiateBcs> {
    if (!ProtocolFeeClaimCap.cachedBcs) {
      ProtocolFeeClaimCap.cachedBcs = ProtocolFeeClaimCap.instantiateBcs()
    }
    return ProtocolFeeClaimCap.cachedBcs
  }

  static fromFields(fields: Record<string, any>): ProtocolFeeClaimCap {
    return ProtocolFeeClaimCap.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ProtocolFeeClaimCap {
    if (!isProtocolFeeClaimCap(item.type)) {
      throw new Error('not a ProtocolFeeClaimCap type')
    }

    return ProtocolFeeClaimCap.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
    })
  }

  static fromBcs(data: Uint8Array): ProtocolFeeClaimCap {
    return ProtocolFeeClaimCap.fromFields(ProtocolFeeClaimCap.bcs.parse(data))
  }

  toJSONField(): ProtocolFeeClaimCapJSONField {
    return {
      id: this.id,
    }
  }

  toJSON(): ProtocolFeeClaimCapJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ProtocolFeeClaimCap {
    return ProtocolFeeClaimCap.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
    })
  }

  static fromJSON(json: Record<string, any>): ProtocolFeeClaimCap {
    if (json.$typeName !== ProtocolFeeClaimCap.$typeName) {
      throw new Error(
        `not a ProtocolFeeClaimCap json object: expected '${ProtocolFeeClaimCap.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return ProtocolFeeClaimCap.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): ProtocolFeeClaimCap {
    if (!isProtocolFeeClaimCap(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a ProtocolFeeClaimCap object`)
    }
    return ProtocolFeeClaimCap.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ProtocolFeeClaimCap.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): ProtocolFeeClaimCap {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isProtocolFeeClaimCap(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ProtocolFeeClaimCap object`)
    }
    return ProtocolFeeClaimCap.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ProtocolFeeClaimCap.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): ProtocolFeeClaimCap {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isProtocolFeeClaimCap(data.bcs.type)) {
        throw new Error(`object at is not a ProtocolFeeClaimCap object`)
      }

      return ProtocolFeeClaimCap.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ProtocolFeeClaimCap.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<ProtocolFeeClaimCap> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isProtocolFeeClaimCap(object.type)) {
      throw new Error(`object at id ${id} is not a ProtocolFeeClaimCap object`)
    }
    return ProtocolFeeClaimCap.fromBcs(object.content)
  }
}

/* ============================== FeeTier =============================== */

export function isFeeTier(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('cetus-clmm', 'config::FeeTier')}::config::FeeTier`
}

export interface FeeTierFields {
  tickSpacing: ToField<'u32'>
  feeRate: ToField<'u64'>
}

export type FeeTierReified = Reified<FeeTier, FeeTierFields>

export type FeeTierJSONField = {
  tickSpacing: number
  feeRate: string
}

export type FeeTierJSON = {
  $typeName: typeof FeeTier.$typeName
  $typeArgs: []
} & FeeTierJSONField

/**
 * FeeTier represents a fee configuration for a specific tick spacing.
 *
 * # Fields
 * * `tick_spacing` - The spacing between ticks for this fee tier
 * * `fee_rate` - The fee rate charged for trades, denominated in basis points
 */
export class FeeTier implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::config::FeeTier` {
    return `${getTypeOrigin('cetus-clmm', 'config::FeeTier')}::config::FeeTier` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof FeeTier.$typeName = FeeTier.$typeName
  readonly $fullTypeName: `${string}::config::FeeTier`
  readonly $typeArgs: []
  readonly $isPhantom: typeof FeeTier.$isPhantom = FeeTier.$isPhantom

  readonly tickSpacing: ToField<'u32'>
  readonly feeRate: ToField<'u64'>

  private constructor(typeArgs: [], fields: FeeTierFields) {
    this.$fullTypeName = composeSuiType(
      FeeTier.$typeName,
      ...typeArgs,
    ) as `${string}::config::FeeTier`
    this.$typeArgs = typeArgs

    this.tickSpacing = fields.tickSpacing
    this.feeRate = fields.feeRate
  }

  static reified(): FeeTierReified {
    const reifiedBcs = FeeTier.bcs
    return {
      get typeName() {
        return FeeTier.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          FeeTier.$typeName,
          ...[],
        ) as `${string}::config::FeeTier`
      },
      typeArgs: [] as [],
      isPhantom: FeeTier.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => FeeTier.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => FeeTier.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => FeeTier.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => FeeTier.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => FeeTier.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        FeeTier.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => FeeTier.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => FeeTier.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => FeeTier.fetch(client, id),
      new: (fields: FeeTierFields) => {
        return new FeeTier([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): FeeTierReified {
    return FeeTier.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<FeeTier>> {
    return phantom(FeeTier.reified())
  }

  static get p(): PhantomReified<ToTypeStr<FeeTier>> {
    return FeeTier.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('FeeTier', {
      tick_spacing: bcs.u32(),
      fee_rate: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof FeeTier.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof FeeTier.instantiateBcs> {
    if (!FeeTier.cachedBcs) {
      FeeTier.cachedBcs = FeeTier.instantiateBcs()
    }
    return FeeTier.cachedBcs
  }

  static fromFields(fields: Record<string, any>): FeeTier {
    return FeeTier.reified().new({
      tickSpacing: decodeFromFields('u32', fields.tick_spacing),
      feeRate: decodeFromFields('u64', fields.fee_rate),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): FeeTier {
    if (!isFeeTier(item.type)) {
      throw new Error('not a FeeTier type')
    }

    return FeeTier.reified().new({
      tickSpacing: decodeFromFieldsWithTypes('u32', item.fields.tick_spacing),
      feeRate: decodeFromFieldsWithTypes('u64', item.fields.fee_rate),
    })
  }

  static fromBcs(data: Uint8Array): FeeTier {
    return FeeTier.fromFields(FeeTier.bcs.parse(data))
  }

  toJSONField(): FeeTierJSONField {
    return {
      tickSpacing: this.tickSpacing,
      feeRate: this.feeRate.toString(),
    }
  }

  toJSON(): FeeTierJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): FeeTier {
    return FeeTier.reified().new({
      tickSpacing: decodeFromJSONField('u32', field.tickSpacing),
      feeRate: decodeFromJSONField('u64', field.feeRate),
    })
  }

  static fromJSON(json: Record<string, any>): FeeTier {
    if (json.$typeName !== FeeTier.$typeName) {
      throw new Error(
        `not a FeeTier json object: expected '${FeeTier.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return FeeTier.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): FeeTier {
    if (!isFeeTier(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a FeeTier object`)
    }
    return FeeTier.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link FeeTier.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): FeeTier {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isFeeTier(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a FeeTier object`)
    }
    return FeeTier.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link FeeTier.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): FeeTier {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isFeeTier(data.bcs.type)) {
        throw new Error(`object at is not a FeeTier object`)
      }

      return FeeTier.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return FeeTier.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<FeeTier> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isFeeTier(object.type)) {
      throw new Error(`object at id ${id} is not a FeeTier object`)
    }
    return FeeTier.fromBcs(object.content)
  }
}

/* ============================== GlobalConfig =============================== */

export function isGlobalConfig(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('cetus-clmm', 'config::GlobalConfig')}::config::GlobalConfig`
}

export interface GlobalConfigFields {
  id: ToField<UID>
  protocolFeeRate: ToField<'u64'>
  feeTiers: ToField<VecMap<'u32', FeeTier>>
  acl: ToField<ACL>
  packageVersion: ToField<'u64'>
}

export type GlobalConfigReified = Reified<GlobalConfig, GlobalConfigFields>

export type GlobalConfigJSONField = {
  id: string
  protocolFeeRate: string
  feeTiers: ToJSON<VecMap<'u32', FeeTier>>
  acl: ToJSON<ACL>
  packageVersion: string
}

export type GlobalConfigJSON = {
  $typeName: typeof GlobalConfig.$typeName
  $typeArgs: []
} & GlobalConfigJSONField

/**
 * GlobalConfig represents the global configuration for the CLMM protocol.
 *
 * # Fields
 * * `id` - The unique identifier for this configuration
 * * `protocol_fee_rate` - The protocol fee rate, expressed as a basis point value
 * * `fee_tiers` - A map of fee tiers, where the key is the tick spacing and the value is the fee tier configuration
 * * `acl` - The access control list for the protocol
 * * `package_version` - The current package version
 */
export class GlobalConfig implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::config::GlobalConfig` {
    return `${getTypeOrigin('cetus-clmm', 'config::GlobalConfig')}::config::GlobalConfig` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof GlobalConfig.$typeName = GlobalConfig.$typeName
  readonly $fullTypeName: `${string}::config::GlobalConfig`
  readonly $typeArgs: []
  readonly $isPhantom: typeof GlobalConfig.$isPhantom = GlobalConfig.$isPhantom

  readonly id: ToField<UID>
  readonly protocolFeeRate: ToField<'u64'>
  readonly feeTiers: ToField<VecMap<'u32', FeeTier>>
  readonly acl: ToField<ACL>
  readonly packageVersion: ToField<'u64'>

  private constructor(typeArgs: [], fields: GlobalConfigFields) {
    this.$fullTypeName = composeSuiType(
      GlobalConfig.$typeName,
      ...typeArgs,
    ) as `${string}::config::GlobalConfig`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.protocolFeeRate = fields.protocolFeeRate
    this.feeTiers = fields.feeTiers
    this.acl = fields.acl
    this.packageVersion = fields.packageVersion
  }

  static reified(): GlobalConfigReified {
    const reifiedBcs = GlobalConfig.bcs
    return {
      get typeName() {
        return GlobalConfig.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          GlobalConfig.$typeName,
          ...[],
        ) as `${string}::config::GlobalConfig`
      },
      typeArgs: [] as [],
      isPhantom: GlobalConfig.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => GlobalConfig.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => GlobalConfig.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => GlobalConfig.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => GlobalConfig.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => GlobalConfig.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        GlobalConfig.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => GlobalConfig.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => GlobalConfig.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => GlobalConfig.fetch(client, id),
      new: (fields: GlobalConfigFields) => {
        return new GlobalConfig([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): GlobalConfigReified {
    return GlobalConfig.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<GlobalConfig>> {
    return phantom(GlobalConfig.reified())
  }

  static get p(): PhantomReified<ToTypeStr<GlobalConfig>> {
    return GlobalConfig.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('GlobalConfig', {
      id: UID.bcs,
      protocol_fee_rate: bcs.u64(),
      fee_tiers: VecMap.bcs(bcs.u32(), FeeTier.bcs),
      acl: ACL.bcs,
      package_version: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof GlobalConfig.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof GlobalConfig.instantiateBcs> {
    if (!GlobalConfig.cachedBcs) {
      GlobalConfig.cachedBcs = GlobalConfig.instantiateBcs()
    }
    return GlobalConfig.cachedBcs
  }

  static fromFields(fields: Record<string, any>): GlobalConfig {
    return GlobalConfig.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      protocolFeeRate: decodeFromFields('u64', fields.protocol_fee_rate),
      feeTiers: decodeFromFields(VecMap.reified('u32', FeeTier.reified()), fields.fee_tiers),
      acl: decodeFromFields(ACL.reified(), fields.acl),
      packageVersion: decodeFromFields('u64', fields.package_version),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): GlobalConfig {
    if (!isGlobalConfig(item.type)) {
      throw new Error('not a GlobalConfig type')
    }

    return GlobalConfig.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      protocolFeeRate: decodeFromFieldsWithTypes('u64', item.fields.protocol_fee_rate),
      feeTiers: decodeFromFieldsWithTypes(
        VecMap.reified('u32', FeeTier.reified()),
        item.fields.fee_tiers,
      ),
      acl: decodeFromFieldsWithTypes(ACL.reified(), item.fields.acl),
      packageVersion: decodeFromFieldsWithTypes('u64', item.fields.package_version),
    })
  }

  static fromBcs(data: Uint8Array): GlobalConfig {
    return GlobalConfig.fromFields(GlobalConfig.bcs.parse(data))
  }

  toJSONField(): GlobalConfigJSONField {
    return {
      id: this.id,
      protocolFeeRate: this.protocolFeeRate.toString(),
      feeTiers: this.feeTiers.toJSONField(),
      acl: this.acl.toJSONField(),
      packageVersion: this.packageVersion.toString(),
    }
  }

  toJSON(): GlobalConfigJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): GlobalConfig {
    return GlobalConfig.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      protocolFeeRate: decodeFromJSONField('u64', field.protocolFeeRate),
      feeTiers: decodeFromJSONField(VecMap.reified('u32', FeeTier.reified()), field.feeTiers),
      acl: decodeFromJSONField(ACL.reified(), field.acl),
      packageVersion: decodeFromJSONField('u64', field.packageVersion),
    })
  }

  static fromJSON(json: Record<string, any>): GlobalConfig {
    if (json.$typeName !== GlobalConfig.$typeName) {
      throw new Error(
        `not a GlobalConfig json object: expected '${GlobalConfig.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return GlobalConfig.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): GlobalConfig {
    if (!isGlobalConfig(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a GlobalConfig object`)
    }
    return GlobalConfig.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link GlobalConfig.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): GlobalConfig {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isGlobalConfig(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a GlobalConfig object`)
    }
    return GlobalConfig.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link GlobalConfig.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): GlobalConfig {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isGlobalConfig(data.bcs.type)) {
        throw new Error(`object at is not a GlobalConfig object`)
      }

      return GlobalConfig.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return GlobalConfig.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<GlobalConfig> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isGlobalConfig(object.type)) {
      throw new Error(`object at id ${id} is not a GlobalConfig object`)
    }
    return GlobalConfig.fromBcs(object.content)
  }
}

/* ============================== InitConfigEvent =============================== */

export function isInitConfigEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('cetus-clmm', 'config::InitConfigEvent')}::config::InitConfigEvent`
}

export interface InitConfigEventFields {
  adminCapId: ToField<ID>
  globalConfigId: ToField<ID>
}

export type InitConfigEventReified = Reified<InitConfigEvent, InitConfigEventFields>

export type InitConfigEventJSONField = {
  adminCapId: string
  globalConfigId: string
}

export type InitConfigEventJSON = {
  $typeName: typeof InitConfigEvent.$typeName
  $typeArgs: []
} & InitConfigEventJSONField

/**
 * Event emitted when the `GlobalConfig` and `AdminCap` are initialized
 * * `admin_cap_id` - The unique identifier of the admin cap
 * * `global_config_id` - The unique identifier of the global config
 */
export class InitConfigEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::config::InitConfigEvent` {
    return `${
      getTypeOrigin('cetus-clmm', 'config::InitConfigEvent')
    }::config::InitConfigEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof InitConfigEvent.$typeName = InitConfigEvent.$typeName
  readonly $fullTypeName: `${string}::config::InitConfigEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof InitConfigEvent.$isPhantom = InitConfigEvent.$isPhantom

  readonly adminCapId: ToField<ID>
  readonly globalConfigId: ToField<ID>

  private constructor(typeArgs: [], fields: InitConfigEventFields) {
    this.$fullTypeName = composeSuiType(
      InitConfigEvent.$typeName,
      ...typeArgs,
    ) as `${string}::config::InitConfigEvent`
    this.$typeArgs = typeArgs

    this.adminCapId = fields.adminCapId
    this.globalConfigId = fields.globalConfigId
  }

  static reified(): InitConfigEventReified {
    const reifiedBcs = InitConfigEvent.bcs
    return {
      get typeName() {
        return InitConfigEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          InitConfigEvent.$typeName,
          ...[],
        ) as `${string}::config::InitConfigEvent`
      },
      typeArgs: [] as [],
      isPhantom: InitConfigEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => InitConfigEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => InitConfigEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => InitConfigEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => InitConfigEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => InitConfigEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        InitConfigEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => InitConfigEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => InitConfigEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => InitConfigEvent.fetch(client, id),
      new: (fields: InitConfigEventFields) => {
        return new InitConfigEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): InitConfigEventReified {
    return InitConfigEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<InitConfigEvent>> {
    return phantom(InitConfigEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<InitConfigEvent>> {
    return InitConfigEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('InitConfigEvent', {
      admin_cap_id: ID.bcs,
      global_config_id: ID.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof InitConfigEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof InitConfigEvent.instantiateBcs> {
    if (!InitConfigEvent.cachedBcs) {
      InitConfigEvent.cachedBcs = InitConfigEvent.instantiateBcs()
    }
    return InitConfigEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): InitConfigEvent {
    return InitConfigEvent.reified().new({
      adminCapId: decodeFromFields(ID.reified(), fields.admin_cap_id),
      globalConfigId: decodeFromFields(ID.reified(), fields.global_config_id),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): InitConfigEvent {
    if (!isInitConfigEvent(item.type)) {
      throw new Error('not a InitConfigEvent type')
    }

    return InitConfigEvent.reified().new({
      adminCapId: decodeFromFieldsWithTypes(ID.reified(), item.fields.admin_cap_id),
      globalConfigId: decodeFromFieldsWithTypes(ID.reified(), item.fields.global_config_id),
    })
  }

  static fromBcs(data: Uint8Array): InitConfigEvent {
    return InitConfigEvent.fromFields(InitConfigEvent.bcs.parse(data))
  }

  toJSONField(): InitConfigEventJSONField {
    return {
      adminCapId: this.adminCapId,
      globalConfigId: this.globalConfigId,
    }
  }

  toJSON(): InitConfigEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): InitConfigEvent {
    return InitConfigEvent.reified().new({
      adminCapId: decodeFromJSONField(ID.reified(), field.adminCapId),
      globalConfigId: decodeFromJSONField(ID.reified(), field.globalConfigId),
    })
  }

  static fromJSON(json: Record<string, any>): InitConfigEvent {
    if (json.$typeName !== InitConfigEvent.$typeName) {
      throw new Error(
        `not a InitConfigEvent json object: expected '${InitConfigEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return InitConfigEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): InitConfigEvent {
    if (!isInitConfigEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a InitConfigEvent object`)
    }
    return InitConfigEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link InitConfigEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): InitConfigEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isInitConfigEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a InitConfigEvent object`)
    }
    return InitConfigEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link InitConfigEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): InitConfigEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isInitConfigEvent(data.bcs.type)) {
        throw new Error(`object at is not a InitConfigEvent object`)
      }

      return InitConfigEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return InitConfigEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<InitConfigEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isInitConfigEvent(object.type)) {
      throw new Error(`object at id ${id} is not a InitConfigEvent object`)
    }
    return InitConfigEvent.fromBcs(object.content)
  }
}

/* ============================== UpdateFeeRateEvent =============================== */

export function isUpdateFeeRateEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('cetus-clmm', 'config::UpdateFeeRateEvent')}::config::UpdateFeeRateEvent`
}

export interface UpdateFeeRateEventFields {
  oldFeeRate: ToField<'u64'>
  newFeeRate: ToField<'u64'>
}

export type UpdateFeeRateEventReified = Reified<UpdateFeeRateEvent, UpdateFeeRateEventFields>

export type UpdateFeeRateEventJSONField = {
  oldFeeRate: string
  newFeeRate: string
}

export type UpdateFeeRateEventJSON = {
  $typeName: typeof UpdateFeeRateEvent.$typeName
  $typeArgs: []
} & UpdateFeeRateEventJSONField

/**
 * Event emitted when the protocol fee rate is updated
 * * `old_fee_rate` - The old protocol fee rate
 * * `new_fee_rate` - The new protocol fee rate
 */
export class UpdateFeeRateEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::config::UpdateFeeRateEvent` {
    return `${
      getTypeOrigin('cetus-clmm', 'config::UpdateFeeRateEvent')
    }::config::UpdateFeeRateEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof UpdateFeeRateEvent.$typeName = UpdateFeeRateEvent.$typeName
  readonly $fullTypeName: `${string}::config::UpdateFeeRateEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof UpdateFeeRateEvent.$isPhantom = UpdateFeeRateEvent.$isPhantom

  readonly oldFeeRate: ToField<'u64'>
  readonly newFeeRate: ToField<'u64'>

  private constructor(typeArgs: [], fields: UpdateFeeRateEventFields) {
    this.$fullTypeName = composeSuiType(
      UpdateFeeRateEvent.$typeName,
      ...typeArgs,
    ) as `${string}::config::UpdateFeeRateEvent`
    this.$typeArgs = typeArgs

    this.oldFeeRate = fields.oldFeeRate
    this.newFeeRate = fields.newFeeRate
  }

  static reified(): UpdateFeeRateEventReified {
    const reifiedBcs = UpdateFeeRateEvent.bcs
    return {
      get typeName() {
        return UpdateFeeRateEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          UpdateFeeRateEvent.$typeName,
          ...[],
        ) as `${string}::config::UpdateFeeRateEvent`
      },
      typeArgs: [] as [],
      isPhantom: UpdateFeeRateEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => UpdateFeeRateEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => UpdateFeeRateEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => UpdateFeeRateEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => UpdateFeeRateEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => UpdateFeeRateEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        UpdateFeeRateEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => UpdateFeeRateEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => UpdateFeeRateEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => UpdateFeeRateEvent.fetch(client, id),
      new: (fields: UpdateFeeRateEventFields) => {
        return new UpdateFeeRateEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): UpdateFeeRateEventReified {
    return UpdateFeeRateEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<UpdateFeeRateEvent>> {
    return phantom(UpdateFeeRateEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<UpdateFeeRateEvent>> {
    return UpdateFeeRateEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('UpdateFeeRateEvent', {
      old_fee_rate: bcs.u64(),
      new_fee_rate: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof UpdateFeeRateEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof UpdateFeeRateEvent.instantiateBcs> {
    if (!UpdateFeeRateEvent.cachedBcs) {
      UpdateFeeRateEvent.cachedBcs = UpdateFeeRateEvent.instantiateBcs()
    }
    return UpdateFeeRateEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): UpdateFeeRateEvent {
    return UpdateFeeRateEvent.reified().new({
      oldFeeRate: decodeFromFields('u64', fields.old_fee_rate),
      newFeeRate: decodeFromFields('u64', fields.new_fee_rate),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): UpdateFeeRateEvent {
    if (!isUpdateFeeRateEvent(item.type)) {
      throw new Error('not a UpdateFeeRateEvent type')
    }

    return UpdateFeeRateEvent.reified().new({
      oldFeeRate: decodeFromFieldsWithTypes('u64', item.fields.old_fee_rate),
      newFeeRate: decodeFromFieldsWithTypes('u64', item.fields.new_fee_rate),
    })
  }

  static fromBcs(data: Uint8Array): UpdateFeeRateEvent {
    return UpdateFeeRateEvent.fromFields(UpdateFeeRateEvent.bcs.parse(data))
  }

  toJSONField(): UpdateFeeRateEventJSONField {
    return {
      oldFeeRate: this.oldFeeRate.toString(),
      newFeeRate: this.newFeeRate.toString(),
    }
  }

  toJSON(): UpdateFeeRateEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): UpdateFeeRateEvent {
    return UpdateFeeRateEvent.reified().new({
      oldFeeRate: decodeFromJSONField('u64', field.oldFeeRate),
      newFeeRate: decodeFromJSONField('u64', field.newFeeRate),
    })
  }

  static fromJSON(json: Record<string, any>): UpdateFeeRateEvent {
    if (json.$typeName !== UpdateFeeRateEvent.$typeName) {
      throw new Error(
        `not a UpdateFeeRateEvent json object: expected '${UpdateFeeRateEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return UpdateFeeRateEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): UpdateFeeRateEvent {
    if (!isUpdateFeeRateEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a UpdateFeeRateEvent object`)
    }
    return UpdateFeeRateEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link UpdateFeeRateEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): UpdateFeeRateEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isUpdateFeeRateEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a UpdateFeeRateEvent object`)
    }
    return UpdateFeeRateEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link UpdateFeeRateEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): UpdateFeeRateEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isUpdateFeeRateEvent(data.bcs.type)) {
        throw new Error(`object at is not a UpdateFeeRateEvent object`)
      }

      return UpdateFeeRateEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return UpdateFeeRateEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<UpdateFeeRateEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isUpdateFeeRateEvent(object.type)) {
      throw new Error(`object at id ${id} is not a UpdateFeeRateEvent object`)
    }
    return UpdateFeeRateEvent.fromBcs(object.content)
  }
}

/* ============================== AddFeeTierEvent =============================== */

export function isAddFeeTierEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('cetus-clmm', 'config::AddFeeTierEvent')}::config::AddFeeTierEvent`
}

export interface AddFeeTierEventFields {
  tickSpacing: ToField<'u32'>
  feeRate: ToField<'u64'>
}

export type AddFeeTierEventReified = Reified<AddFeeTierEvent, AddFeeTierEventFields>

export type AddFeeTierEventJSONField = {
  tickSpacing: number
  feeRate: string
}

export type AddFeeTierEventJSON = {
  $typeName: typeof AddFeeTierEvent.$typeName
  $typeArgs: []
} & AddFeeTierEventJSONField

/**
 * Event emitted when a fee tier is added
 * * `tick_spacing` - The tick spacing of the fee tier
 * * `fee_rate` - The fee rate of the fee tier
 */
export class AddFeeTierEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::config::AddFeeTierEvent` {
    return `${
      getTypeOrigin('cetus-clmm', 'config::AddFeeTierEvent')
    }::config::AddFeeTierEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof AddFeeTierEvent.$typeName = AddFeeTierEvent.$typeName
  readonly $fullTypeName: `${string}::config::AddFeeTierEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof AddFeeTierEvent.$isPhantom = AddFeeTierEvent.$isPhantom

  readonly tickSpacing: ToField<'u32'>
  readonly feeRate: ToField<'u64'>

  private constructor(typeArgs: [], fields: AddFeeTierEventFields) {
    this.$fullTypeName = composeSuiType(
      AddFeeTierEvent.$typeName,
      ...typeArgs,
    ) as `${string}::config::AddFeeTierEvent`
    this.$typeArgs = typeArgs

    this.tickSpacing = fields.tickSpacing
    this.feeRate = fields.feeRate
  }

  static reified(): AddFeeTierEventReified {
    const reifiedBcs = AddFeeTierEvent.bcs
    return {
      get typeName() {
        return AddFeeTierEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          AddFeeTierEvent.$typeName,
          ...[],
        ) as `${string}::config::AddFeeTierEvent`
      },
      typeArgs: [] as [],
      isPhantom: AddFeeTierEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AddFeeTierEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AddFeeTierEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AddFeeTierEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AddFeeTierEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AddFeeTierEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        AddFeeTierEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => AddFeeTierEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AddFeeTierEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => AddFeeTierEvent.fetch(client, id),
      new: (fields: AddFeeTierEventFields) => {
        return new AddFeeTierEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): AddFeeTierEventReified {
    return AddFeeTierEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AddFeeTierEvent>> {
    return phantom(AddFeeTierEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<AddFeeTierEvent>> {
    return AddFeeTierEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AddFeeTierEvent', {
      tick_spacing: bcs.u32(),
      fee_rate: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof AddFeeTierEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof AddFeeTierEvent.instantiateBcs> {
    if (!AddFeeTierEvent.cachedBcs) {
      AddFeeTierEvent.cachedBcs = AddFeeTierEvent.instantiateBcs()
    }
    return AddFeeTierEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): AddFeeTierEvent {
    return AddFeeTierEvent.reified().new({
      tickSpacing: decodeFromFields('u32', fields.tick_spacing),
      feeRate: decodeFromFields('u64', fields.fee_rate),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): AddFeeTierEvent {
    if (!isAddFeeTierEvent(item.type)) {
      throw new Error('not a AddFeeTierEvent type')
    }

    return AddFeeTierEvent.reified().new({
      tickSpacing: decodeFromFieldsWithTypes('u32', item.fields.tick_spacing),
      feeRate: decodeFromFieldsWithTypes('u64', item.fields.fee_rate),
    })
  }

  static fromBcs(data: Uint8Array): AddFeeTierEvent {
    return AddFeeTierEvent.fromFields(AddFeeTierEvent.bcs.parse(data))
  }

  toJSONField(): AddFeeTierEventJSONField {
    return {
      tickSpacing: this.tickSpacing,
      feeRate: this.feeRate.toString(),
    }
  }

  toJSON(): AddFeeTierEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AddFeeTierEvent {
    return AddFeeTierEvent.reified().new({
      tickSpacing: decodeFromJSONField('u32', field.tickSpacing),
      feeRate: decodeFromJSONField('u64', field.feeRate),
    })
  }

  static fromJSON(json: Record<string, any>): AddFeeTierEvent {
    if (json.$typeName !== AddFeeTierEvent.$typeName) {
      throw new Error(
        `not a AddFeeTierEvent json object: expected '${AddFeeTierEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return AddFeeTierEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): AddFeeTierEvent {
    if (!isAddFeeTierEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a AddFeeTierEvent object`)
    }
    return AddFeeTierEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AddFeeTierEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): AddFeeTierEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAddFeeTierEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AddFeeTierEvent object`)
    }
    return AddFeeTierEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AddFeeTierEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): AddFeeTierEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAddFeeTierEvent(data.bcs.type)) {
        throw new Error(`object at is not a AddFeeTierEvent object`)
      }

      return AddFeeTierEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AddFeeTierEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<AddFeeTierEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isAddFeeTierEvent(object.type)) {
      throw new Error(`object at id ${id} is not a AddFeeTierEvent object`)
    }
    return AddFeeTierEvent.fromBcs(object.content)
  }
}

/* ============================== UpdateFeeTierEvent =============================== */

export function isUpdateFeeTierEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('cetus-clmm', 'config::UpdateFeeTierEvent')}::config::UpdateFeeTierEvent`
}

export interface UpdateFeeTierEventFields {
  tickSpacing: ToField<'u32'>
  oldFeeRate: ToField<'u64'>
  newFeeRate: ToField<'u64'>
}

export type UpdateFeeTierEventReified = Reified<UpdateFeeTierEvent, UpdateFeeTierEventFields>

export type UpdateFeeTierEventJSONField = {
  tickSpacing: number
  oldFeeRate: string
  newFeeRate: string
}

export type UpdateFeeTierEventJSON = {
  $typeName: typeof UpdateFeeTierEvent.$typeName
  $typeArgs: []
} & UpdateFeeTierEventJSONField

/**
 * Event emitted when a fee tier is updated
 * * `tick_spacing` - The tick spacing of the fee tier
 * * `old_fee_rate` - The old fee rate of the fee tier
 * * `new_fee_rate` - The new fee rate of the fee tier
 */
export class UpdateFeeTierEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::config::UpdateFeeTierEvent` {
    return `${
      getTypeOrigin('cetus-clmm', 'config::UpdateFeeTierEvent')
    }::config::UpdateFeeTierEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof UpdateFeeTierEvent.$typeName = UpdateFeeTierEvent.$typeName
  readonly $fullTypeName: `${string}::config::UpdateFeeTierEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof UpdateFeeTierEvent.$isPhantom = UpdateFeeTierEvent.$isPhantom

  readonly tickSpacing: ToField<'u32'>
  readonly oldFeeRate: ToField<'u64'>
  readonly newFeeRate: ToField<'u64'>

  private constructor(typeArgs: [], fields: UpdateFeeTierEventFields) {
    this.$fullTypeName = composeSuiType(
      UpdateFeeTierEvent.$typeName,
      ...typeArgs,
    ) as `${string}::config::UpdateFeeTierEvent`
    this.$typeArgs = typeArgs

    this.tickSpacing = fields.tickSpacing
    this.oldFeeRate = fields.oldFeeRate
    this.newFeeRate = fields.newFeeRate
  }

  static reified(): UpdateFeeTierEventReified {
    const reifiedBcs = UpdateFeeTierEvent.bcs
    return {
      get typeName() {
        return UpdateFeeTierEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          UpdateFeeTierEvent.$typeName,
          ...[],
        ) as `${string}::config::UpdateFeeTierEvent`
      },
      typeArgs: [] as [],
      isPhantom: UpdateFeeTierEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => UpdateFeeTierEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => UpdateFeeTierEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => UpdateFeeTierEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => UpdateFeeTierEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => UpdateFeeTierEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        UpdateFeeTierEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => UpdateFeeTierEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => UpdateFeeTierEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => UpdateFeeTierEvent.fetch(client, id),
      new: (fields: UpdateFeeTierEventFields) => {
        return new UpdateFeeTierEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): UpdateFeeTierEventReified {
    return UpdateFeeTierEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<UpdateFeeTierEvent>> {
    return phantom(UpdateFeeTierEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<UpdateFeeTierEvent>> {
    return UpdateFeeTierEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('UpdateFeeTierEvent', {
      tick_spacing: bcs.u32(),
      old_fee_rate: bcs.u64(),
      new_fee_rate: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof UpdateFeeTierEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof UpdateFeeTierEvent.instantiateBcs> {
    if (!UpdateFeeTierEvent.cachedBcs) {
      UpdateFeeTierEvent.cachedBcs = UpdateFeeTierEvent.instantiateBcs()
    }
    return UpdateFeeTierEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): UpdateFeeTierEvent {
    return UpdateFeeTierEvent.reified().new({
      tickSpacing: decodeFromFields('u32', fields.tick_spacing),
      oldFeeRate: decodeFromFields('u64', fields.old_fee_rate),
      newFeeRate: decodeFromFields('u64', fields.new_fee_rate),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): UpdateFeeTierEvent {
    if (!isUpdateFeeTierEvent(item.type)) {
      throw new Error('not a UpdateFeeTierEvent type')
    }

    return UpdateFeeTierEvent.reified().new({
      tickSpacing: decodeFromFieldsWithTypes('u32', item.fields.tick_spacing),
      oldFeeRate: decodeFromFieldsWithTypes('u64', item.fields.old_fee_rate),
      newFeeRate: decodeFromFieldsWithTypes('u64', item.fields.new_fee_rate),
    })
  }

  static fromBcs(data: Uint8Array): UpdateFeeTierEvent {
    return UpdateFeeTierEvent.fromFields(UpdateFeeTierEvent.bcs.parse(data))
  }

  toJSONField(): UpdateFeeTierEventJSONField {
    return {
      tickSpacing: this.tickSpacing,
      oldFeeRate: this.oldFeeRate.toString(),
      newFeeRate: this.newFeeRate.toString(),
    }
  }

  toJSON(): UpdateFeeTierEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): UpdateFeeTierEvent {
    return UpdateFeeTierEvent.reified().new({
      tickSpacing: decodeFromJSONField('u32', field.tickSpacing),
      oldFeeRate: decodeFromJSONField('u64', field.oldFeeRate),
      newFeeRate: decodeFromJSONField('u64', field.newFeeRate),
    })
  }

  static fromJSON(json: Record<string, any>): UpdateFeeTierEvent {
    if (json.$typeName !== UpdateFeeTierEvent.$typeName) {
      throw new Error(
        `not a UpdateFeeTierEvent json object: expected '${UpdateFeeTierEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return UpdateFeeTierEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): UpdateFeeTierEvent {
    if (!isUpdateFeeTierEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a UpdateFeeTierEvent object`)
    }
    return UpdateFeeTierEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link UpdateFeeTierEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): UpdateFeeTierEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isUpdateFeeTierEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a UpdateFeeTierEvent object`)
    }
    return UpdateFeeTierEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link UpdateFeeTierEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): UpdateFeeTierEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isUpdateFeeTierEvent(data.bcs.type)) {
        throw new Error(`object at is not a UpdateFeeTierEvent object`)
      }

      return UpdateFeeTierEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return UpdateFeeTierEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<UpdateFeeTierEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isUpdateFeeTierEvent(object.type)) {
      throw new Error(`object at id ${id} is not a UpdateFeeTierEvent object`)
    }
    return UpdateFeeTierEvent.fromBcs(object.content)
  }
}

/* ============================== DeleteFeeTierEvent =============================== */

export function isDeleteFeeTierEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('cetus-clmm', 'config::DeleteFeeTierEvent')}::config::DeleteFeeTierEvent`
}

export interface DeleteFeeTierEventFields {
  tickSpacing: ToField<'u32'>
  feeRate: ToField<'u64'>
}

export type DeleteFeeTierEventReified = Reified<DeleteFeeTierEvent, DeleteFeeTierEventFields>

export type DeleteFeeTierEventJSONField = {
  tickSpacing: number
  feeRate: string
}

export type DeleteFeeTierEventJSON = {
  $typeName: typeof DeleteFeeTierEvent.$typeName
  $typeArgs: []
} & DeleteFeeTierEventJSONField

/**
 * Event emitted when a fee tier is deleted
 * * `tick_spacing` - The tick spacing of the fee tier
 * * `fee_rate` - The fee rate of the fee tier
 */
export class DeleteFeeTierEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::config::DeleteFeeTierEvent` {
    return `${
      getTypeOrigin('cetus-clmm', 'config::DeleteFeeTierEvent')
    }::config::DeleteFeeTierEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof DeleteFeeTierEvent.$typeName = DeleteFeeTierEvent.$typeName
  readonly $fullTypeName: `${string}::config::DeleteFeeTierEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof DeleteFeeTierEvent.$isPhantom = DeleteFeeTierEvent.$isPhantom

  readonly tickSpacing: ToField<'u32'>
  readonly feeRate: ToField<'u64'>

  private constructor(typeArgs: [], fields: DeleteFeeTierEventFields) {
    this.$fullTypeName = composeSuiType(
      DeleteFeeTierEvent.$typeName,
      ...typeArgs,
    ) as `${string}::config::DeleteFeeTierEvent`
    this.$typeArgs = typeArgs

    this.tickSpacing = fields.tickSpacing
    this.feeRate = fields.feeRate
  }

  static reified(): DeleteFeeTierEventReified {
    const reifiedBcs = DeleteFeeTierEvent.bcs
    return {
      get typeName() {
        return DeleteFeeTierEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          DeleteFeeTierEvent.$typeName,
          ...[],
        ) as `${string}::config::DeleteFeeTierEvent`
      },
      typeArgs: [] as [],
      isPhantom: DeleteFeeTierEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => DeleteFeeTierEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => DeleteFeeTierEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => DeleteFeeTierEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => DeleteFeeTierEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => DeleteFeeTierEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        DeleteFeeTierEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => DeleteFeeTierEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => DeleteFeeTierEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => DeleteFeeTierEvent.fetch(client, id),
      new: (fields: DeleteFeeTierEventFields) => {
        return new DeleteFeeTierEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): DeleteFeeTierEventReified {
    return DeleteFeeTierEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<DeleteFeeTierEvent>> {
    return phantom(DeleteFeeTierEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<DeleteFeeTierEvent>> {
    return DeleteFeeTierEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('DeleteFeeTierEvent', {
      tick_spacing: bcs.u32(),
      fee_rate: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof DeleteFeeTierEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof DeleteFeeTierEvent.instantiateBcs> {
    if (!DeleteFeeTierEvent.cachedBcs) {
      DeleteFeeTierEvent.cachedBcs = DeleteFeeTierEvent.instantiateBcs()
    }
    return DeleteFeeTierEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): DeleteFeeTierEvent {
    return DeleteFeeTierEvent.reified().new({
      tickSpacing: decodeFromFields('u32', fields.tick_spacing),
      feeRate: decodeFromFields('u64', fields.fee_rate),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): DeleteFeeTierEvent {
    if (!isDeleteFeeTierEvent(item.type)) {
      throw new Error('not a DeleteFeeTierEvent type')
    }

    return DeleteFeeTierEvent.reified().new({
      tickSpacing: decodeFromFieldsWithTypes('u32', item.fields.tick_spacing),
      feeRate: decodeFromFieldsWithTypes('u64', item.fields.fee_rate),
    })
  }

  static fromBcs(data: Uint8Array): DeleteFeeTierEvent {
    return DeleteFeeTierEvent.fromFields(DeleteFeeTierEvent.bcs.parse(data))
  }

  toJSONField(): DeleteFeeTierEventJSONField {
    return {
      tickSpacing: this.tickSpacing,
      feeRate: this.feeRate.toString(),
    }
  }

  toJSON(): DeleteFeeTierEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): DeleteFeeTierEvent {
    return DeleteFeeTierEvent.reified().new({
      tickSpacing: decodeFromJSONField('u32', field.tickSpacing),
      feeRate: decodeFromJSONField('u64', field.feeRate),
    })
  }

  static fromJSON(json: Record<string, any>): DeleteFeeTierEvent {
    if (json.$typeName !== DeleteFeeTierEvent.$typeName) {
      throw new Error(
        `not a DeleteFeeTierEvent json object: expected '${DeleteFeeTierEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return DeleteFeeTierEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): DeleteFeeTierEvent {
    if (!isDeleteFeeTierEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a DeleteFeeTierEvent object`)
    }
    return DeleteFeeTierEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link DeleteFeeTierEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): DeleteFeeTierEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isDeleteFeeTierEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a DeleteFeeTierEvent object`)
    }
    return DeleteFeeTierEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link DeleteFeeTierEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): DeleteFeeTierEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isDeleteFeeTierEvent(data.bcs.type)) {
        throw new Error(`object at is not a DeleteFeeTierEvent object`)
      }

      return DeleteFeeTierEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return DeleteFeeTierEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<DeleteFeeTierEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isDeleteFeeTierEvent(object.type)) {
      throw new Error(`object at id ${id} is not a DeleteFeeTierEvent object`)
    }
    return DeleteFeeTierEvent.fromBcs(object.content)
  }
}

/* ============================== SetRolesEvent =============================== */

export function isSetRolesEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('cetus-clmm', 'config::SetRolesEvent')}::config::SetRolesEvent`
}

export interface SetRolesEventFields {
  member: ToField<'address'>
  roles: ToField<'u128'>
}

export type SetRolesEventReified = Reified<SetRolesEvent, SetRolesEventFields>

export type SetRolesEventJSONField = {
  member: string
  roles: string
}

export type SetRolesEventJSON = {
  $typeName: typeof SetRolesEvent.$typeName
  $typeArgs: []
} & SetRolesEventJSONField

/**
 * Event emitted when roles are set
 * * `member` - The address of the member
 * * `roles` - The roles of the member
 */
export class SetRolesEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::config::SetRolesEvent` {
    return `${getTypeOrigin('cetus-clmm', 'config::SetRolesEvent')}::config::SetRolesEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof SetRolesEvent.$typeName = SetRolesEvent.$typeName
  readonly $fullTypeName: `${string}::config::SetRolesEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof SetRolesEvent.$isPhantom = SetRolesEvent.$isPhantom

  readonly member: ToField<'address'>
  readonly roles: ToField<'u128'>

  private constructor(typeArgs: [], fields: SetRolesEventFields) {
    this.$fullTypeName = composeSuiType(
      SetRolesEvent.$typeName,
      ...typeArgs,
    ) as `${string}::config::SetRolesEvent`
    this.$typeArgs = typeArgs

    this.member = fields.member
    this.roles = fields.roles
  }

  static reified(): SetRolesEventReified {
    const reifiedBcs = SetRolesEvent.bcs
    return {
      get typeName() {
        return SetRolesEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          SetRolesEvent.$typeName,
          ...[],
        ) as `${string}::config::SetRolesEvent`
      },
      typeArgs: [] as [],
      isPhantom: SetRolesEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => SetRolesEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => SetRolesEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => SetRolesEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => SetRolesEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => SetRolesEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        SetRolesEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => SetRolesEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => SetRolesEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => SetRolesEvent.fetch(client, id),
      new: (fields: SetRolesEventFields) => {
        return new SetRolesEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): SetRolesEventReified {
    return SetRolesEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<SetRolesEvent>> {
    return phantom(SetRolesEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<SetRolesEvent>> {
    return SetRolesEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('SetRolesEvent', {
      member: bcs.bytes(32).transform({
        input: (val: string) => fromHex(val),
        output: (val: Uint8Array) => toHex(val),
      }),
      roles: bcs.u128(),
    })
  }

  private static cachedBcs: ReturnType<typeof SetRolesEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof SetRolesEvent.instantiateBcs> {
    if (!SetRolesEvent.cachedBcs) {
      SetRolesEvent.cachedBcs = SetRolesEvent.instantiateBcs()
    }
    return SetRolesEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): SetRolesEvent {
    return SetRolesEvent.reified().new({
      member: decodeFromFields('address', fields.member),
      roles: decodeFromFields('u128', fields.roles),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): SetRolesEvent {
    if (!isSetRolesEvent(item.type)) {
      throw new Error('not a SetRolesEvent type')
    }

    return SetRolesEvent.reified().new({
      member: decodeFromFieldsWithTypes('address', item.fields.member),
      roles: decodeFromFieldsWithTypes('u128', item.fields.roles),
    })
  }

  static fromBcs(data: Uint8Array): SetRolesEvent {
    return SetRolesEvent.fromFields(SetRolesEvent.bcs.parse(data))
  }

  toJSONField(): SetRolesEventJSONField {
    return {
      member: this.member,
      roles: this.roles.toString(),
    }
  }

  toJSON(): SetRolesEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): SetRolesEvent {
    return SetRolesEvent.reified().new({
      member: decodeFromJSONField('address', field.member),
      roles: decodeFromJSONField('u128', field.roles),
    })
  }

  static fromJSON(json: Record<string, any>): SetRolesEvent {
    if (json.$typeName !== SetRolesEvent.$typeName) {
      throw new Error(
        `not a SetRolesEvent json object: expected '${SetRolesEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return SetRolesEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): SetRolesEvent {
    if (!isSetRolesEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a SetRolesEvent object`)
    }
    return SetRolesEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link SetRolesEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): SetRolesEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isSetRolesEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a SetRolesEvent object`)
    }
    return SetRolesEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link SetRolesEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): SetRolesEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isSetRolesEvent(data.bcs.type)) {
        throw new Error(`object at is not a SetRolesEvent object`)
      }

      return SetRolesEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return SetRolesEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<SetRolesEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isSetRolesEvent(object.type)) {
      throw new Error(`object at id ${id} is not a SetRolesEvent object`)
    }
    return SetRolesEvent.fromBcs(object.content)
  }
}

/* ============================== AddRoleEvent =============================== */

export function isAddRoleEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('cetus-clmm', 'config::AddRoleEvent')}::config::AddRoleEvent`
}

export interface AddRoleEventFields {
  member: ToField<'address'>
  role: ToField<'u8'>
}

export type AddRoleEventReified = Reified<AddRoleEvent, AddRoleEventFields>

export type AddRoleEventJSONField = {
  member: string
  role: number
}

export type AddRoleEventJSON = {
  $typeName: typeof AddRoleEvent.$typeName
  $typeArgs: []
} & AddRoleEventJSONField

/**
 * Event emitted when a role is added to a member
 * * `member` - The address of the member
 * * `role` - The role that was added
 */
export class AddRoleEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::config::AddRoleEvent` {
    return `${getTypeOrigin('cetus-clmm', 'config::AddRoleEvent')}::config::AddRoleEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof AddRoleEvent.$typeName = AddRoleEvent.$typeName
  readonly $fullTypeName: `${string}::config::AddRoleEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof AddRoleEvent.$isPhantom = AddRoleEvent.$isPhantom

  readonly member: ToField<'address'>
  readonly role: ToField<'u8'>

  private constructor(typeArgs: [], fields: AddRoleEventFields) {
    this.$fullTypeName = composeSuiType(
      AddRoleEvent.$typeName,
      ...typeArgs,
    ) as `${string}::config::AddRoleEvent`
    this.$typeArgs = typeArgs

    this.member = fields.member
    this.role = fields.role
  }

  static reified(): AddRoleEventReified {
    const reifiedBcs = AddRoleEvent.bcs
    return {
      get typeName() {
        return AddRoleEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          AddRoleEvent.$typeName,
          ...[],
        ) as `${string}::config::AddRoleEvent`
      },
      typeArgs: [] as [],
      isPhantom: AddRoleEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AddRoleEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AddRoleEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AddRoleEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AddRoleEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AddRoleEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        AddRoleEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => AddRoleEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AddRoleEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => AddRoleEvent.fetch(client, id),
      new: (fields: AddRoleEventFields) => {
        return new AddRoleEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): AddRoleEventReified {
    return AddRoleEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AddRoleEvent>> {
    return phantom(AddRoleEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<AddRoleEvent>> {
    return AddRoleEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AddRoleEvent', {
      member: bcs.bytes(32).transform({
        input: (val: string) => fromHex(val),
        output: (val: Uint8Array) => toHex(val),
      }),
      role: bcs.u8(),
    })
  }

  private static cachedBcs: ReturnType<typeof AddRoleEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof AddRoleEvent.instantiateBcs> {
    if (!AddRoleEvent.cachedBcs) {
      AddRoleEvent.cachedBcs = AddRoleEvent.instantiateBcs()
    }
    return AddRoleEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): AddRoleEvent {
    return AddRoleEvent.reified().new({
      member: decodeFromFields('address', fields.member),
      role: decodeFromFields('u8', fields.role),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): AddRoleEvent {
    if (!isAddRoleEvent(item.type)) {
      throw new Error('not a AddRoleEvent type')
    }

    return AddRoleEvent.reified().new({
      member: decodeFromFieldsWithTypes('address', item.fields.member),
      role: decodeFromFieldsWithTypes('u8', item.fields.role),
    })
  }

  static fromBcs(data: Uint8Array): AddRoleEvent {
    return AddRoleEvent.fromFields(AddRoleEvent.bcs.parse(data))
  }

  toJSONField(): AddRoleEventJSONField {
    return {
      member: this.member,
      role: this.role,
    }
  }

  toJSON(): AddRoleEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AddRoleEvent {
    return AddRoleEvent.reified().new({
      member: decodeFromJSONField('address', field.member),
      role: decodeFromJSONField('u8', field.role),
    })
  }

  static fromJSON(json: Record<string, any>): AddRoleEvent {
    if (json.$typeName !== AddRoleEvent.$typeName) {
      throw new Error(
        `not a AddRoleEvent json object: expected '${AddRoleEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return AddRoleEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): AddRoleEvent {
    if (!isAddRoleEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a AddRoleEvent object`)
    }
    return AddRoleEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AddRoleEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): AddRoleEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAddRoleEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AddRoleEvent object`)
    }
    return AddRoleEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AddRoleEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): AddRoleEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAddRoleEvent(data.bcs.type)) {
        throw new Error(`object at is not a AddRoleEvent object`)
      }

      return AddRoleEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AddRoleEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<AddRoleEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isAddRoleEvent(object.type)) {
      throw new Error(`object at id ${id} is not a AddRoleEvent object`)
    }
    return AddRoleEvent.fromBcs(object.content)
  }
}

/* ============================== RemoveRoleEvent =============================== */

export function isRemoveRoleEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('cetus-clmm', 'config::RemoveRoleEvent')}::config::RemoveRoleEvent`
}

export interface RemoveRoleEventFields {
  member: ToField<'address'>
  role: ToField<'u8'>
}

export type RemoveRoleEventReified = Reified<RemoveRoleEvent, RemoveRoleEventFields>

export type RemoveRoleEventJSONField = {
  member: string
  role: number
}

export type RemoveRoleEventJSON = {
  $typeName: typeof RemoveRoleEvent.$typeName
  $typeArgs: []
} & RemoveRoleEventJSONField

/**
 * Event emitted when a role is removed from a member
 * * `member` - The address of the member
 * * `role` - The role that was removed
 */
export class RemoveRoleEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::config::RemoveRoleEvent` {
    return `${
      getTypeOrigin('cetus-clmm', 'config::RemoveRoleEvent')
    }::config::RemoveRoleEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof RemoveRoleEvent.$typeName = RemoveRoleEvent.$typeName
  readonly $fullTypeName: `${string}::config::RemoveRoleEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof RemoveRoleEvent.$isPhantom = RemoveRoleEvent.$isPhantom

  readonly member: ToField<'address'>
  readonly role: ToField<'u8'>

  private constructor(typeArgs: [], fields: RemoveRoleEventFields) {
    this.$fullTypeName = composeSuiType(
      RemoveRoleEvent.$typeName,
      ...typeArgs,
    ) as `${string}::config::RemoveRoleEvent`
    this.$typeArgs = typeArgs

    this.member = fields.member
    this.role = fields.role
  }

  static reified(): RemoveRoleEventReified {
    const reifiedBcs = RemoveRoleEvent.bcs
    return {
      get typeName() {
        return RemoveRoleEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          RemoveRoleEvent.$typeName,
          ...[],
        ) as `${string}::config::RemoveRoleEvent`
      },
      typeArgs: [] as [],
      isPhantom: RemoveRoleEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => RemoveRoleEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => RemoveRoleEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => RemoveRoleEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => RemoveRoleEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => RemoveRoleEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        RemoveRoleEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => RemoveRoleEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => RemoveRoleEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => RemoveRoleEvent.fetch(client, id),
      new: (fields: RemoveRoleEventFields) => {
        return new RemoveRoleEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): RemoveRoleEventReified {
    return RemoveRoleEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RemoveRoleEvent>> {
    return phantom(RemoveRoleEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<RemoveRoleEvent>> {
    return RemoveRoleEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('RemoveRoleEvent', {
      member: bcs.bytes(32).transform({
        input: (val: string) => fromHex(val),
        output: (val: Uint8Array) => toHex(val),
      }),
      role: bcs.u8(),
    })
  }

  private static cachedBcs: ReturnType<typeof RemoveRoleEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof RemoveRoleEvent.instantiateBcs> {
    if (!RemoveRoleEvent.cachedBcs) {
      RemoveRoleEvent.cachedBcs = RemoveRoleEvent.instantiateBcs()
    }
    return RemoveRoleEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): RemoveRoleEvent {
    return RemoveRoleEvent.reified().new({
      member: decodeFromFields('address', fields.member),
      role: decodeFromFields('u8', fields.role),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): RemoveRoleEvent {
    if (!isRemoveRoleEvent(item.type)) {
      throw new Error('not a RemoveRoleEvent type')
    }

    return RemoveRoleEvent.reified().new({
      member: decodeFromFieldsWithTypes('address', item.fields.member),
      role: decodeFromFieldsWithTypes('u8', item.fields.role),
    })
  }

  static fromBcs(data: Uint8Array): RemoveRoleEvent {
    return RemoveRoleEvent.fromFields(RemoveRoleEvent.bcs.parse(data))
  }

  toJSONField(): RemoveRoleEventJSONField {
    return {
      member: this.member,
      role: this.role,
    }
  }

  toJSON(): RemoveRoleEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): RemoveRoleEvent {
    return RemoveRoleEvent.reified().new({
      member: decodeFromJSONField('address', field.member),
      role: decodeFromJSONField('u8', field.role),
    })
  }

  static fromJSON(json: Record<string, any>): RemoveRoleEvent {
    if (json.$typeName !== RemoveRoleEvent.$typeName) {
      throw new Error(
        `not a RemoveRoleEvent json object: expected '${RemoveRoleEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return RemoveRoleEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): RemoveRoleEvent {
    if (!isRemoveRoleEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a RemoveRoleEvent object`)
    }
    return RemoveRoleEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link RemoveRoleEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): RemoveRoleEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRemoveRoleEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a RemoveRoleEvent object`)
    }
    return RemoveRoleEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link RemoveRoleEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): RemoveRoleEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRemoveRoleEvent(data.bcs.type)) {
        throw new Error(`object at is not a RemoveRoleEvent object`)
      }

      return RemoveRoleEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RemoveRoleEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<RemoveRoleEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isRemoveRoleEvent(object.type)) {
      throw new Error(`object at id ${id} is not a RemoveRoleEvent object`)
    }
    return RemoveRoleEvent.fromBcs(object.content)
  }
}

/* ============================== RemoveMemberEvent =============================== */

export function isRemoveMemberEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('cetus-clmm', 'config::RemoveMemberEvent')}::config::RemoveMemberEvent`
}

export interface RemoveMemberEventFields {
  member: ToField<'address'>
}

export type RemoveMemberEventReified = Reified<RemoveMemberEvent, RemoveMemberEventFields>

export type RemoveMemberEventJSONField = {
  member: string
}

export type RemoveMemberEventJSON = {
  $typeName: typeof RemoveMemberEvent.$typeName
  $typeArgs: []
} & RemoveMemberEventJSONField

/**
 * Event emitted when a member is removed from the ACL
 * * `member` - The address of the member
 */
export class RemoveMemberEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::config::RemoveMemberEvent` {
    return `${
      getTypeOrigin('cetus-clmm', 'config::RemoveMemberEvent')
    }::config::RemoveMemberEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof RemoveMemberEvent.$typeName = RemoveMemberEvent.$typeName
  readonly $fullTypeName: `${string}::config::RemoveMemberEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof RemoveMemberEvent.$isPhantom = RemoveMemberEvent.$isPhantom

  readonly member: ToField<'address'>

  private constructor(typeArgs: [], fields: RemoveMemberEventFields) {
    this.$fullTypeName = composeSuiType(
      RemoveMemberEvent.$typeName,
      ...typeArgs,
    ) as `${string}::config::RemoveMemberEvent`
    this.$typeArgs = typeArgs

    this.member = fields.member
  }

  static reified(): RemoveMemberEventReified {
    const reifiedBcs = RemoveMemberEvent.bcs
    return {
      get typeName() {
        return RemoveMemberEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          RemoveMemberEvent.$typeName,
          ...[],
        ) as `${string}::config::RemoveMemberEvent`
      },
      typeArgs: [] as [],
      isPhantom: RemoveMemberEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => RemoveMemberEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => RemoveMemberEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => RemoveMemberEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => RemoveMemberEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => RemoveMemberEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        RemoveMemberEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => RemoveMemberEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => RemoveMemberEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => RemoveMemberEvent.fetch(client, id),
      new: (fields: RemoveMemberEventFields) => {
        return new RemoveMemberEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): RemoveMemberEventReified {
    return RemoveMemberEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RemoveMemberEvent>> {
    return phantom(RemoveMemberEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<RemoveMemberEvent>> {
    return RemoveMemberEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('RemoveMemberEvent', {
      member: bcs.bytes(32).transform({
        input: (val: string) => fromHex(val),
        output: (val: Uint8Array) => toHex(val),
      }),
    })
  }

  private static cachedBcs: ReturnType<typeof RemoveMemberEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof RemoveMemberEvent.instantiateBcs> {
    if (!RemoveMemberEvent.cachedBcs) {
      RemoveMemberEvent.cachedBcs = RemoveMemberEvent.instantiateBcs()
    }
    return RemoveMemberEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): RemoveMemberEvent {
    return RemoveMemberEvent.reified().new({
      member: decodeFromFields('address', fields.member),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): RemoveMemberEvent {
    if (!isRemoveMemberEvent(item.type)) {
      throw new Error('not a RemoveMemberEvent type')
    }

    return RemoveMemberEvent.reified().new({
      member: decodeFromFieldsWithTypes('address', item.fields.member),
    })
  }

  static fromBcs(data: Uint8Array): RemoveMemberEvent {
    return RemoveMemberEvent.fromFields(RemoveMemberEvent.bcs.parse(data))
  }

  toJSONField(): RemoveMemberEventJSONField {
    return {
      member: this.member,
    }
  }

  toJSON(): RemoveMemberEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): RemoveMemberEvent {
    return RemoveMemberEvent.reified().new({
      member: decodeFromJSONField('address', field.member),
    })
  }

  static fromJSON(json: Record<string, any>): RemoveMemberEvent {
    if (json.$typeName !== RemoveMemberEvent.$typeName) {
      throw new Error(
        `not a RemoveMemberEvent json object: expected '${RemoveMemberEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return RemoveMemberEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): RemoveMemberEvent {
    if (!isRemoveMemberEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a RemoveMemberEvent object`)
    }
    return RemoveMemberEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link RemoveMemberEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): RemoveMemberEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRemoveMemberEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a RemoveMemberEvent object`)
    }
    return RemoveMemberEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link RemoveMemberEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): RemoveMemberEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRemoveMemberEvent(data.bcs.type)) {
        throw new Error(`object at is not a RemoveMemberEvent object`)
      }

      return RemoveMemberEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RemoveMemberEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<RemoveMemberEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isRemoveMemberEvent(object.type)) {
      throw new Error(`object at id ${id} is not a RemoveMemberEvent object`)
    }
    return RemoveMemberEvent.fromBcs(object.content)
  }
}

/* ============================== SetPackageVersion =============================== */

export function isSetPackageVersion(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('cetus-clmm', 'config::SetPackageVersion')}::config::SetPackageVersion`
}

export interface SetPackageVersionFields {
  newVersion: ToField<'u64'>
  oldVersion: ToField<'u64'>
}

export type SetPackageVersionReified = Reified<SetPackageVersion, SetPackageVersionFields>

export type SetPackageVersionJSONField = {
  newVersion: string
  oldVersion: string
}

export type SetPackageVersionJSON = {
  $typeName: typeof SetPackageVersion.$typeName
  $typeArgs: []
} & SetPackageVersionJSONField

/**
 * Event emitted when the package version is updated
 * * `new_version` - The new package version
 * * `old_version` - The old package version
 */
export class SetPackageVersion implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::config::SetPackageVersion` {
    return `${
      getTypeOrigin('cetus-clmm', 'config::SetPackageVersion')
    }::config::SetPackageVersion` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof SetPackageVersion.$typeName = SetPackageVersion.$typeName
  readonly $fullTypeName: `${string}::config::SetPackageVersion`
  readonly $typeArgs: []
  readonly $isPhantom: typeof SetPackageVersion.$isPhantom = SetPackageVersion.$isPhantom

  readonly newVersion: ToField<'u64'>
  readonly oldVersion: ToField<'u64'>

  private constructor(typeArgs: [], fields: SetPackageVersionFields) {
    this.$fullTypeName = composeSuiType(
      SetPackageVersion.$typeName,
      ...typeArgs,
    ) as `${string}::config::SetPackageVersion`
    this.$typeArgs = typeArgs

    this.newVersion = fields.newVersion
    this.oldVersion = fields.oldVersion
  }

  static reified(): SetPackageVersionReified {
    const reifiedBcs = SetPackageVersion.bcs
    return {
      get typeName() {
        return SetPackageVersion.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          SetPackageVersion.$typeName,
          ...[],
        ) as `${string}::config::SetPackageVersion`
      },
      typeArgs: [] as [],
      isPhantom: SetPackageVersion.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => SetPackageVersion.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => SetPackageVersion.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => SetPackageVersion.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => SetPackageVersion.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => SetPackageVersion.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        SetPackageVersion.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => SetPackageVersion.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => SetPackageVersion.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => SetPackageVersion.fetch(client, id),
      new: (fields: SetPackageVersionFields) => {
        return new SetPackageVersion([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): SetPackageVersionReified {
    return SetPackageVersion.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<SetPackageVersion>> {
    return phantom(SetPackageVersion.reified())
  }

  static get p(): PhantomReified<ToTypeStr<SetPackageVersion>> {
    return SetPackageVersion.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('SetPackageVersion', {
      new_version: bcs.u64(),
      old_version: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof SetPackageVersion.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof SetPackageVersion.instantiateBcs> {
    if (!SetPackageVersion.cachedBcs) {
      SetPackageVersion.cachedBcs = SetPackageVersion.instantiateBcs()
    }
    return SetPackageVersion.cachedBcs
  }

  static fromFields(fields: Record<string, any>): SetPackageVersion {
    return SetPackageVersion.reified().new({
      newVersion: decodeFromFields('u64', fields.new_version),
      oldVersion: decodeFromFields('u64', fields.old_version),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): SetPackageVersion {
    if (!isSetPackageVersion(item.type)) {
      throw new Error('not a SetPackageVersion type')
    }

    return SetPackageVersion.reified().new({
      newVersion: decodeFromFieldsWithTypes('u64', item.fields.new_version),
      oldVersion: decodeFromFieldsWithTypes('u64', item.fields.old_version),
    })
  }

  static fromBcs(data: Uint8Array): SetPackageVersion {
    return SetPackageVersion.fromFields(SetPackageVersion.bcs.parse(data))
  }

  toJSONField(): SetPackageVersionJSONField {
    return {
      newVersion: this.newVersion.toString(),
      oldVersion: this.oldVersion.toString(),
    }
  }

  toJSON(): SetPackageVersionJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): SetPackageVersion {
    return SetPackageVersion.reified().new({
      newVersion: decodeFromJSONField('u64', field.newVersion),
      oldVersion: decodeFromJSONField('u64', field.oldVersion),
    })
  }

  static fromJSON(json: Record<string, any>): SetPackageVersion {
    if (json.$typeName !== SetPackageVersion.$typeName) {
      throw new Error(
        `not a SetPackageVersion json object: expected '${SetPackageVersion.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return SetPackageVersion.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): SetPackageVersion {
    if (!isSetPackageVersion(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a SetPackageVersion object`)
    }
    return SetPackageVersion.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link SetPackageVersion.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): SetPackageVersion {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isSetPackageVersion(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a SetPackageVersion object`)
    }
    return SetPackageVersion.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link SetPackageVersion.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): SetPackageVersion {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isSetPackageVersion(data.bcs.type)) {
        throw new Error(`object at is not a SetPackageVersion object`)
      }

      return SetPackageVersion.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return SetPackageVersion.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<SetPackageVersion> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isSetPackageVersion(object.type)) {
      throw new Error(`object at id ${id} is not a SetPackageVersion object`)
    }
    return SetPackageVersion.fromBcs(object.content)
  }
}
