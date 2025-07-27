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
} from '../../../../_framework/reified'
import {
  FieldsWithTypes,
  composeSuiType,
  compressSuiType,
  parseTypeName,
} from '../../../../_framework/util'
import { Option } from '../../../../move-stdlib/option/structs'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64, fromHEX, toHEX } from '@mysten/sui/utils'

/* ============================== TwoStepRole =============================== */

export function isTwoStepRole(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::two_step_role::TwoStepRole` + '<')
}

export interface TwoStepRoleFields<T extends PhantomTypeArgument> {
  activeAddress: ToField<'address'>
  pendingAddress: ToField<Option<'address'>>
}

export type TwoStepRoleReified<T extends PhantomTypeArgument> = Reified<
  TwoStepRole<T>,
  TwoStepRoleFields<T>
>

export class TwoStepRole<T extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::two_step_role::TwoStepRole`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = TwoStepRole.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::two_step_role::TwoStepRole<${PhantomToTypeStr<T>}>`
  readonly $typeArgs: [PhantomToTypeStr<T>]
  readonly $isPhantom = TwoStepRole.$isPhantom

  readonly activeAddress: ToField<'address'>
  readonly pendingAddress: ToField<Option<'address'>>

  private constructor(typeArgs: [PhantomToTypeStr<T>], fields: TwoStepRoleFields<T>) {
    this.$fullTypeName = composeSuiType(
      TwoStepRole.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::two_step_role::TwoStepRole<${PhantomToTypeStr<T>}>`
    this.$typeArgs = typeArgs

    this.activeAddress = fields.activeAddress
    this.pendingAddress = fields.pendingAddress
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): TwoStepRoleReified<ToPhantomTypeArgument<T>> {
    const reifiedBcs = TwoStepRole.bcs
    return {
      typeName: TwoStepRole.$typeName,
      fullTypeName: composeSuiType(
        TwoStepRole.$typeName,
        ...[extractType(T)]
      ) as `${typeof PKG_V1}::two_step_role::TwoStepRole<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`,
      typeArgs: [extractType(T)] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>],
      isPhantom: TwoStepRole.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) => TwoStepRole.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => TwoStepRole.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => TwoStepRole.fromFields(T, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => TwoStepRole.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => TwoStepRole.fromJSON(T, json),
      fromSuiParsedData: (content: SuiParsedData) => TwoStepRole.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) => TwoStepRole.fromSuiObjectData(T, content),
      fetch: async (client: SuiClient, id: string) => TwoStepRole.fetch(client, T, id),
      new: (fields: TwoStepRoleFields<ToPhantomTypeArgument<T>>) => {
        return new TwoStepRole([extractType(T)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return TwoStepRole.reified
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): PhantomReified<ToTypeStr<TwoStepRole<ToPhantomTypeArgument<T>>>> {
    return phantom(TwoStepRole.reified(T))
  }
  static get p() {
    return TwoStepRole.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('TwoStepRole', {
      active_address: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      pending_address: Option.bcs(
        bcs.bytes(32).transform({
          input: (val: string) => fromHEX(val),
          output: (val: Uint8Array) => toHEX(val),
        })
      ),
    })
  }

  private static cachedBcs: ReturnType<typeof TwoStepRole.instantiateBcs> | null = null

  static get bcs() {
    if (!TwoStepRole.cachedBcs) {
      TwoStepRole.cachedBcs = TwoStepRole.instantiateBcs()
    }
    return TwoStepRole.cachedBcs
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>
  ): TwoStepRole<ToPhantomTypeArgument<T>> {
    return TwoStepRole.reified(typeArg).new({
      activeAddress: decodeFromFields('address', fields.active_address),
      pendingAddress: decodeFromFields(Option.reified('address'), fields.pending_address),
    })
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes
  ): TwoStepRole<ToPhantomTypeArgument<T>> {
    if (!isTwoStepRole(item.type)) {
      throw new Error('not a TwoStepRole type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return TwoStepRole.reified(typeArg).new({
      activeAddress: decodeFromFieldsWithTypes('address', item.fields.active_address),
      pendingAddress: decodeFromFieldsWithTypes(
        Option.reified('address'),
        item.fields.pending_address
      ),
    })
  }

  static fromBcs<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: Uint8Array
  ): TwoStepRole<ToPhantomTypeArgument<T>> {
    return TwoStepRole.fromFields(typeArg, TwoStepRole.bcs.parse(data))
  }

  toJSONField() {
    return {
      activeAddress: this.activeAddress,
      pendingAddress: fieldToJSON<Option<'address'>>(
        `${Option.$typeName}<address>`,
        this.pendingAddress
      ),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any
  ): TwoStepRole<ToPhantomTypeArgument<T>> {
    return TwoStepRole.reified(typeArg).new({
      activeAddress: decodeFromJSONField('address', field.activeAddress),
      pendingAddress: decodeFromJSONField(Option.reified('address'), field.pendingAddress),
    })
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>
  ): TwoStepRole<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== TwoStepRole.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(TwoStepRole.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return TwoStepRole.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData
  ): TwoStepRole<ToPhantomTypeArgument<T>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isTwoStepRole(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a TwoStepRole object`)
    }
    return TwoStepRole.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData
  ): TwoStepRole<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isTwoStepRole(data.bcs.type)) {
        throw new Error(`object at is not a TwoStepRole object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 1) {
        throw new Error(
          `type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`
        )
      }
      const gotTypeArg = compressSuiType(gotTypeArgs[0])
      const expectedTypeArg = compressSuiType(extractType(typeArg))
      if (gotTypeArg !== compressSuiType(extractType(typeArg))) {
        throw new Error(
          `type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`
        )
      }

      return TwoStepRole.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return TwoStepRole.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T,
    id: string
  ): Promise<TwoStepRole<ToPhantomTypeArgument<T>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching TwoStepRole object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isTwoStepRole(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a TwoStepRole object`)
    }

    return TwoStepRole.fromSuiObjectData(typeArg, res.data)
  }
}

/* ============================== RoleTransferStarted =============================== */

export function isRoleTransferStarted(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::two_step_role::RoleTransferStarted` + '<')
}

export interface RoleTransferStartedFields<T extends PhantomTypeArgument> {
  oldAddress: ToField<'address'>
  newAddress: ToField<'address'>
}

export type RoleTransferStartedReified<T extends PhantomTypeArgument> = Reified<
  RoleTransferStarted<T>,
  RoleTransferStartedFields<T>
>

export class RoleTransferStarted<T extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::two_step_role::RoleTransferStarted`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = RoleTransferStarted.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::two_step_role::RoleTransferStarted<${PhantomToTypeStr<T>}>`
  readonly $typeArgs: [PhantomToTypeStr<T>]
  readonly $isPhantom = RoleTransferStarted.$isPhantom

  readonly oldAddress: ToField<'address'>
  readonly newAddress: ToField<'address'>

  private constructor(typeArgs: [PhantomToTypeStr<T>], fields: RoleTransferStartedFields<T>) {
    this.$fullTypeName = composeSuiType(
      RoleTransferStarted.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::two_step_role::RoleTransferStarted<${PhantomToTypeStr<T>}>`
    this.$typeArgs = typeArgs

    this.oldAddress = fields.oldAddress
    this.newAddress = fields.newAddress
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): RoleTransferStartedReified<ToPhantomTypeArgument<T>> {
    const reifiedBcs = RoleTransferStarted.bcs
    return {
      typeName: RoleTransferStarted.$typeName,
      fullTypeName: composeSuiType(
        RoleTransferStarted.$typeName,
        ...[extractType(T)]
      ) as `${typeof PKG_V1}::two_step_role::RoleTransferStarted<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`,
      typeArgs: [extractType(T)] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>],
      isPhantom: RoleTransferStarted.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) => RoleTransferStarted.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        RoleTransferStarted.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => RoleTransferStarted.fromFields(T, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => RoleTransferStarted.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => RoleTransferStarted.fromJSON(T, json),
      fromSuiParsedData: (content: SuiParsedData) =>
        RoleTransferStarted.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) =>
        RoleTransferStarted.fromSuiObjectData(T, content),
      fetch: async (client: SuiClient, id: string) => RoleTransferStarted.fetch(client, T, id),
      new: (fields: RoleTransferStartedFields<ToPhantomTypeArgument<T>>) => {
        return new RoleTransferStarted([extractType(T)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return RoleTransferStarted.reified
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): PhantomReified<ToTypeStr<RoleTransferStarted<ToPhantomTypeArgument<T>>>> {
    return phantom(RoleTransferStarted.reified(T))
  }
  static get p() {
    return RoleTransferStarted.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('RoleTransferStarted', {
      old_address: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      new_address: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
    })
  }

  private static cachedBcs: ReturnType<typeof RoleTransferStarted.instantiateBcs> | null = null

  static get bcs() {
    if (!RoleTransferStarted.cachedBcs) {
      RoleTransferStarted.cachedBcs = RoleTransferStarted.instantiateBcs()
    }
    return RoleTransferStarted.cachedBcs
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>
  ): RoleTransferStarted<ToPhantomTypeArgument<T>> {
    return RoleTransferStarted.reified(typeArg).new({
      oldAddress: decodeFromFields('address', fields.old_address),
      newAddress: decodeFromFields('address', fields.new_address),
    })
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes
  ): RoleTransferStarted<ToPhantomTypeArgument<T>> {
    if (!isRoleTransferStarted(item.type)) {
      throw new Error('not a RoleTransferStarted type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return RoleTransferStarted.reified(typeArg).new({
      oldAddress: decodeFromFieldsWithTypes('address', item.fields.old_address),
      newAddress: decodeFromFieldsWithTypes('address', item.fields.new_address),
    })
  }

  static fromBcs<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: Uint8Array
  ): RoleTransferStarted<ToPhantomTypeArgument<T>> {
    return RoleTransferStarted.fromFields(typeArg, RoleTransferStarted.bcs.parse(data))
  }

  toJSONField() {
    return {
      oldAddress: this.oldAddress,
      newAddress: this.newAddress,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any
  ): RoleTransferStarted<ToPhantomTypeArgument<T>> {
    return RoleTransferStarted.reified(typeArg).new({
      oldAddress: decodeFromJSONField('address', field.oldAddress),
      newAddress: decodeFromJSONField('address', field.newAddress),
    })
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>
  ): RoleTransferStarted<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== RoleTransferStarted.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(RoleTransferStarted.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return RoleTransferStarted.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData
  ): RoleTransferStarted<ToPhantomTypeArgument<T>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRoleTransferStarted(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a RoleTransferStarted object`)
    }
    return RoleTransferStarted.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData
  ): RoleTransferStarted<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRoleTransferStarted(data.bcs.type)) {
        throw new Error(`object at is not a RoleTransferStarted object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 1) {
        throw new Error(
          `type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`
        )
      }
      const gotTypeArg = compressSuiType(gotTypeArgs[0])
      const expectedTypeArg = compressSuiType(extractType(typeArg))
      if (gotTypeArg !== compressSuiType(extractType(typeArg))) {
        throw new Error(
          `type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`
        )
      }

      return RoleTransferStarted.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RoleTransferStarted.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T,
    id: string
  ): Promise<RoleTransferStarted<ToPhantomTypeArgument<T>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching RoleTransferStarted object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isRoleTransferStarted(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a RoleTransferStarted object`)
    }

    return RoleTransferStarted.fromSuiObjectData(typeArg, res.data)
  }
}

/* ============================== RoleTransferred =============================== */

export function isRoleTransferred(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::two_step_role::RoleTransferred` + '<')
}

export interface RoleTransferredFields<T extends PhantomTypeArgument> {
  oldAddress: ToField<'address'>
  newAddress: ToField<'address'>
}

export type RoleTransferredReified<T extends PhantomTypeArgument> = Reified<
  RoleTransferred<T>,
  RoleTransferredFields<T>
>

export class RoleTransferred<T extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::two_step_role::RoleTransferred`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = RoleTransferred.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::two_step_role::RoleTransferred<${PhantomToTypeStr<T>}>`
  readonly $typeArgs: [PhantomToTypeStr<T>]
  readonly $isPhantom = RoleTransferred.$isPhantom

  readonly oldAddress: ToField<'address'>
  readonly newAddress: ToField<'address'>

  private constructor(typeArgs: [PhantomToTypeStr<T>], fields: RoleTransferredFields<T>) {
    this.$fullTypeName = composeSuiType(
      RoleTransferred.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::two_step_role::RoleTransferred<${PhantomToTypeStr<T>}>`
    this.$typeArgs = typeArgs

    this.oldAddress = fields.oldAddress
    this.newAddress = fields.newAddress
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): RoleTransferredReified<ToPhantomTypeArgument<T>> {
    const reifiedBcs = RoleTransferred.bcs
    return {
      typeName: RoleTransferred.$typeName,
      fullTypeName: composeSuiType(
        RoleTransferred.$typeName,
        ...[extractType(T)]
      ) as `${typeof PKG_V1}::two_step_role::RoleTransferred<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`,
      typeArgs: [extractType(T)] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>],
      isPhantom: RoleTransferred.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) => RoleTransferred.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => RoleTransferred.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => RoleTransferred.fromFields(T, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => RoleTransferred.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => RoleTransferred.fromJSON(T, json),
      fromSuiParsedData: (content: SuiParsedData) => RoleTransferred.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) => RoleTransferred.fromSuiObjectData(T, content),
      fetch: async (client: SuiClient, id: string) => RoleTransferred.fetch(client, T, id),
      new: (fields: RoleTransferredFields<ToPhantomTypeArgument<T>>) => {
        return new RoleTransferred([extractType(T)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return RoleTransferred.reified
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): PhantomReified<ToTypeStr<RoleTransferred<ToPhantomTypeArgument<T>>>> {
    return phantom(RoleTransferred.reified(T))
  }
  static get p() {
    return RoleTransferred.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('RoleTransferred', {
      old_address: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      new_address: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
    })
  }

  private static cachedBcs: ReturnType<typeof RoleTransferred.instantiateBcs> | null = null

  static get bcs() {
    if (!RoleTransferred.cachedBcs) {
      RoleTransferred.cachedBcs = RoleTransferred.instantiateBcs()
    }
    return RoleTransferred.cachedBcs
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>
  ): RoleTransferred<ToPhantomTypeArgument<T>> {
    return RoleTransferred.reified(typeArg).new({
      oldAddress: decodeFromFields('address', fields.old_address),
      newAddress: decodeFromFields('address', fields.new_address),
    })
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes
  ): RoleTransferred<ToPhantomTypeArgument<T>> {
    if (!isRoleTransferred(item.type)) {
      throw new Error('not a RoleTransferred type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return RoleTransferred.reified(typeArg).new({
      oldAddress: decodeFromFieldsWithTypes('address', item.fields.old_address),
      newAddress: decodeFromFieldsWithTypes('address', item.fields.new_address),
    })
  }

  static fromBcs<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: Uint8Array
  ): RoleTransferred<ToPhantomTypeArgument<T>> {
    return RoleTransferred.fromFields(typeArg, RoleTransferred.bcs.parse(data))
  }

  toJSONField() {
    return {
      oldAddress: this.oldAddress,
      newAddress: this.newAddress,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any
  ): RoleTransferred<ToPhantomTypeArgument<T>> {
    return RoleTransferred.reified(typeArg).new({
      oldAddress: decodeFromJSONField('address', field.oldAddress),
      newAddress: decodeFromJSONField('address', field.newAddress),
    })
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>
  ): RoleTransferred<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== RoleTransferred.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(RoleTransferred.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return RoleTransferred.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData
  ): RoleTransferred<ToPhantomTypeArgument<T>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRoleTransferred(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a RoleTransferred object`)
    }
    return RoleTransferred.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData
  ): RoleTransferred<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRoleTransferred(data.bcs.type)) {
        throw new Error(`object at is not a RoleTransferred object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 1) {
        throw new Error(
          `type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`
        )
      }
      const gotTypeArg = compressSuiType(gotTypeArgs[0])
      const expectedTypeArg = compressSuiType(extractType(typeArg))
      if (gotTypeArg !== compressSuiType(extractType(typeArg))) {
        throw new Error(
          `type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`
        )
      }

      return RoleTransferred.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RoleTransferred.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T,
    id: string
  ): Promise<RoleTransferred<ToPhantomTypeArgument<T>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching RoleTransferred object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isRoleTransferred(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a RoleTransferred object`)
    }

    return RoleTransferred.fromSuiObjectData(typeArg, res.data)
  }
}
