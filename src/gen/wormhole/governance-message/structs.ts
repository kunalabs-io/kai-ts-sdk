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
import { Bytes32 } from '../bytes32/structs'
import { ExternalAddress } from '../external-address/structs'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== DecreeTicket =============================== */

export function isDecreeTicket(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::governance_message::DecreeTicket` + '<')
}

export interface DecreeTicketFields<T0 extends PhantomTypeArgument> {
  governanceChain: ToField<'u16'>
  governanceContract: ToField<ExternalAddress>
  moduleName: ToField<Bytes32>
  action: ToField<'u8'>
  global: ToField<'bool'>
}

export type DecreeTicketReified<T0 extends PhantomTypeArgument> = Reified<
  DecreeTicket<T0>,
  DecreeTicketFields<T0>
>

export class DecreeTicket<T0 extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::governance_message::DecreeTicket`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = DecreeTicket.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::governance_message::DecreeTicket<${PhantomToTypeStr<T0>}>`
  readonly $typeArgs: [PhantomToTypeStr<T0>]
  readonly $isPhantom = DecreeTicket.$isPhantom

  readonly governanceChain: ToField<'u16'>
  readonly governanceContract: ToField<ExternalAddress>
  readonly moduleName: ToField<Bytes32>
  readonly action: ToField<'u8'>
  readonly global: ToField<'bool'>

  private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: DecreeTicketFields<T0>) {
    this.$fullTypeName = composeSuiType(
      DecreeTicket.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::governance_message::DecreeTicket<${PhantomToTypeStr<T0>}>`
    this.$typeArgs = typeArgs

    this.governanceChain = fields.governanceChain
    this.governanceContract = fields.governanceContract
    this.moduleName = fields.moduleName
    this.action = fields.action
    this.global = fields.global
  }

  static reified<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0
  ): DecreeTicketReified<ToPhantomTypeArgument<T0>> {
    const reifiedBcs = DecreeTicket.bcs
    return {
      typeName: DecreeTicket.$typeName,
      fullTypeName: composeSuiType(
        DecreeTicket.$typeName,
        ...[extractType(T0)]
      ) as `${typeof PKG_V1}::governance_message::DecreeTicket<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`,
      typeArgs: [extractType(T0)] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>],
      isPhantom: DecreeTicket.$isPhantom,
      reifiedTypeArgs: [T0],
      fromFields: (fields: Record<string, any>) => DecreeTicket.fromFields(T0, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => DecreeTicket.fromFieldsWithTypes(T0, item),
      fromBcs: (data: Uint8Array) => DecreeTicket.fromFields(T0, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => DecreeTicket.fromJSONField(T0, field),
      fromJSON: (json: Record<string, any>) => DecreeTicket.fromJSON(T0, json),
      fromSuiParsedData: (content: SuiParsedData) => DecreeTicket.fromSuiParsedData(T0, content),
      fromSuiObjectData: (content: SuiObjectData) => DecreeTicket.fromSuiObjectData(T0, content),
      fetch: async (client: SuiClient, id: string) => DecreeTicket.fetch(client, T0, id),
      new: (fields: DecreeTicketFields<ToPhantomTypeArgument<T0>>) => {
        return new DecreeTicket([extractType(T0)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return DecreeTicket.reified
  }

  static phantom<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0
  ): PhantomReified<ToTypeStr<DecreeTicket<ToPhantomTypeArgument<T0>>>> {
    return phantom(DecreeTicket.reified(T0))
  }
  static get p() {
    return DecreeTicket.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('DecreeTicket', {
      governance_chain: bcs.u16(),
      governance_contract: ExternalAddress.bcs,
      module_name: Bytes32.bcs,
      action: bcs.u8(),
      global: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof DecreeTicket.instantiateBcs> | null = null

  static get bcs() {
    if (!DecreeTicket.cachedBcs) {
      DecreeTicket.cachedBcs = DecreeTicket.instantiateBcs()
    }
    return DecreeTicket.cachedBcs
  }

  static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    fields: Record<string, any>
  ): DecreeTicket<ToPhantomTypeArgument<T0>> {
    return DecreeTicket.reified(typeArg).new({
      governanceChain: decodeFromFields('u16', fields.governance_chain),
      governanceContract: decodeFromFields(ExternalAddress.reified(), fields.governance_contract),
      moduleName: decodeFromFields(Bytes32.reified(), fields.module_name),
      action: decodeFromFields('u8', fields.action),
      global: decodeFromFields('bool', fields.global),
    })
  }

  static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    item: FieldsWithTypes
  ): DecreeTicket<ToPhantomTypeArgument<T0>> {
    if (!isDecreeTicket(item.type)) {
      throw new Error('not a DecreeTicket type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return DecreeTicket.reified(typeArg).new({
      governanceChain: decodeFromFieldsWithTypes('u16', item.fields.governance_chain),
      governanceContract: decodeFromFieldsWithTypes(
        ExternalAddress.reified(),
        item.fields.governance_contract
      ),
      moduleName: decodeFromFieldsWithTypes(Bytes32.reified(), item.fields.module_name),
      action: decodeFromFieldsWithTypes('u8', item.fields.action),
      global: decodeFromFieldsWithTypes('bool', item.fields.global),
    })
  }

  static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: Uint8Array
  ): DecreeTicket<ToPhantomTypeArgument<T0>> {
    return DecreeTicket.fromFields(typeArg, DecreeTicket.bcs.parse(data))
  }

  toJSONField() {
    return {
      governanceChain: this.governanceChain,
      governanceContract: this.governanceContract.toJSONField(),
      moduleName: this.moduleName.toJSONField(),
      action: this.action,
      global: this.global,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    field: any
  ): DecreeTicket<ToPhantomTypeArgument<T0>> {
    return DecreeTicket.reified(typeArg).new({
      governanceChain: decodeFromJSONField('u16', field.governanceChain),
      governanceContract: decodeFromJSONField(ExternalAddress.reified(), field.governanceContract),
      moduleName: decodeFromJSONField(Bytes32.reified(), field.moduleName),
      action: decodeFromJSONField('u8', field.action),
      global: decodeFromJSONField('bool', field.global),
    })
  }

  static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    json: Record<string, any>
  ): DecreeTicket<ToPhantomTypeArgument<T0>> {
    if (json.$typeName !== DecreeTicket.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(DecreeTicket.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return DecreeTicket.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    content: SuiParsedData
  ): DecreeTicket<ToPhantomTypeArgument<T0>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isDecreeTicket(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a DecreeTicket object`)
    }
    return DecreeTicket.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: SuiObjectData
  ): DecreeTicket<ToPhantomTypeArgument<T0>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isDecreeTicket(data.bcs.type)) {
        throw new Error(`object at is not a DecreeTicket object`)
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

      return DecreeTicket.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return DecreeTicket.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T0,
    id: string
  ): Promise<DecreeTicket<ToPhantomTypeArgument<T0>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching DecreeTicket object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isDecreeTicket(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a DecreeTicket object`)
    }

    return DecreeTicket.fromSuiObjectData(typeArg, res.data)
  }
}

/* ============================== DecreeReceipt =============================== */

export function isDecreeReceipt(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::governance_message::DecreeReceipt` + '<')
}

export interface DecreeReceiptFields<T0 extends PhantomTypeArgument> {
  payload: ToField<Vector<'u8'>>
  digest: ToField<Bytes32>
  sequence: ToField<'u64'>
}

export type DecreeReceiptReified<T0 extends PhantomTypeArgument> = Reified<
  DecreeReceipt<T0>,
  DecreeReceiptFields<T0>
>

export class DecreeReceipt<T0 extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::governance_message::DecreeReceipt`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = DecreeReceipt.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::governance_message::DecreeReceipt<${PhantomToTypeStr<T0>}>`
  readonly $typeArgs: [PhantomToTypeStr<T0>]
  readonly $isPhantom = DecreeReceipt.$isPhantom

  readonly payload: ToField<Vector<'u8'>>
  readonly digest: ToField<Bytes32>
  readonly sequence: ToField<'u64'>

  private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: DecreeReceiptFields<T0>) {
    this.$fullTypeName = composeSuiType(
      DecreeReceipt.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::governance_message::DecreeReceipt<${PhantomToTypeStr<T0>}>`
    this.$typeArgs = typeArgs

    this.payload = fields.payload
    this.digest = fields.digest
    this.sequence = fields.sequence
  }

  static reified<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0
  ): DecreeReceiptReified<ToPhantomTypeArgument<T0>> {
    const reifiedBcs = DecreeReceipt.bcs
    return {
      typeName: DecreeReceipt.$typeName,
      fullTypeName: composeSuiType(
        DecreeReceipt.$typeName,
        ...[extractType(T0)]
      ) as `${typeof PKG_V1}::governance_message::DecreeReceipt<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`,
      typeArgs: [extractType(T0)] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>],
      isPhantom: DecreeReceipt.$isPhantom,
      reifiedTypeArgs: [T0],
      fromFields: (fields: Record<string, any>) => DecreeReceipt.fromFields(T0, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => DecreeReceipt.fromFieldsWithTypes(T0, item),
      fromBcs: (data: Uint8Array) => DecreeReceipt.fromFields(T0, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => DecreeReceipt.fromJSONField(T0, field),
      fromJSON: (json: Record<string, any>) => DecreeReceipt.fromJSON(T0, json),
      fromSuiParsedData: (content: SuiParsedData) => DecreeReceipt.fromSuiParsedData(T0, content),
      fromSuiObjectData: (content: SuiObjectData) => DecreeReceipt.fromSuiObjectData(T0, content),
      fetch: async (client: SuiClient, id: string) => DecreeReceipt.fetch(client, T0, id),
      new: (fields: DecreeReceiptFields<ToPhantomTypeArgument<T0>>) => {
        return new DecreeReceipt([extractType(T0)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return DecreeReceipt.reified
  }

  static phantom<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0
  ): PhantomReified<ToTypeStr<DecreeReceipt<ToPhantomTypeArgument<T0>>>> {
    return phantom(DecreeReceipt.reified(T0))
  }
  static get p() {
    return DecreeReceipt.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('DecreeReceipt', {
      payload: bcs.vector(bcs.u8()),
      digest: Bytes32.bcs,
      sequence: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof DecreeReceipt.instantiateBcs> | null = null

  static get bcs() {
    if (!DecreeReceipt.cachedBcs) {
      DecreeReceipt.cachedBcs = DecreeReceipt.instantiateBcs()
    }
    return DecreeReceipt.cachedBcs
  }

  static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    fields: Record<string, any>
  ): DecreeReceipt<ToPhantomTypeArgument<T0>> {
    return DecreeReceipt.reified(typeArg).new({
      payload: decodeFromFields(reified.vector('u8'), fields.payload),
      digest: decodeFromFields(Bytes32.reified(), fields.digest),
      sequence: decodeFromFields('u64', fields.sequence),
    })
  }

  static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    item: FieldsWithTypes
  ): DecreeReceipt<ToPhantomTypeArgument<T0>> {
    if (!isDecreeReceipt(item.type)) {
      throw new Error('not a DecreeReceipt type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return DecreeReceipt.reified(typeArg).new({
      payload: decodeFromFieldsWithTypes(reified.vector('u8'), item.fields.payload),
      digest: decodeFromFieldsWithTypes(Bytes32.reified(), item.fields.digest),
      sequence: decodeFromFieldsWithTypes('u64', item.fields.sequence),
    })
  }

  static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: Uint8Array
  ): DecreeReceipt<ToPhantomTypeArgument<T0>> {
    return DecreeReceipt.fromFields(typeArg, DecreeReceipt.bcs.parse(data))
  }

  toJSONField() {
    return {
      payload: fieldToJSON<Vector<'u8'>>(`vector<u8>`, this.payload),
      digest: this.digest.toJSONField(),
      sequence: this.sequence.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    field: any
  ): DecreeReceipt<ToPhantomTypeArgument<T0>> {
    return DecreeReceipt.reified(typeArg).new({
      payload: decodeFromJSONField(reified.vector('u8'), field.payload),
      digest: decodeFromJSONField(Bytes32.reified(), field.digest),
      sequence: decodeFromJSONField('u64', field.sequence),
    })
  }

  static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    json: Record<string, any>
  ): DecreeReceipt<ToPhantomTypeArgument<T0>> {
    if (json.$typeName !== DecreeReceipt.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(DecreeReceipt.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return DecreeReceipt.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    content: SuiParsedData
  ): DecreeReceipt<ToPhantomTypeArgument<T0>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isDecreeReceipt(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a DecreeReceipt object`)
    }
    return DecreeReceipt.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: SuiObjectData
  ): DecreeReceipt<ToPhantomTypeArgument<T0>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isDecreeReceipt(data.bcs.type)) {
        throw new Error(`object at is not a DecreeReceipt object`)
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

      return DecreeReceipt.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return DecreeReceipt.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T0,
    id: string
  ): Promise<DecreeReceipt<ToPhantomTypeArgument<T0>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching DecreeReceipt object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isDecreeReceipt(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a DecreeReceipt object`)
    }

    return DecreeReceipt.fromSuiObjectData(typeArg, res.data)
  }
}
