import * as reified from '../../../../_framework/reified'
import {
  PhantomReified,
  Reified,
  StructClass,
  ToField,
  ToTypeStr,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  fieldToJSON,
  phantom,
} from '../../../../_framework/reified'
import { FieldsWithTypes, composeSuiType, compressSuiType } from '../../../../_framework/util'
import { Vector } from '../../../../_framework/vector'
import { VecMap } from '../../../../sui/vec-map/structs'
import { BridgeRoute } from '../chain-ids/structs'
import { PKG_V5 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== TransferLimiter =============================== */

export function isTransferLimiter(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V5}::limiter::TransferLimiter`
}

export interface TransferLimiterFields {
  transferLimits: ToField<VecMap<BridgeRoute, 'u64'>>
  transferRecords: ToField<VecMap<BridgeRoute, TransferRecord>>
}

export type TransferLimiterReified = Reified<TransferLimiter, TransferLimiterFields>

export class TransferLimiter implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V5}::limiter::TransferLimiter`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = TransferLimiter.$typeName
  readonly $fullTypeName: `${typeof PKG_V5}::limiter::TransferLimiter`
  readonly $typeArgs: []
  readonly $isPhantom = TransferLimiter.$isPhantom

  readonly transferLimits: ToField<VecMap<BridgeRoute, 'u64'>>
  readonly transferRecords: ToField<VecMap<BridgeRoute, TransferRecord>>

  private constructor(typeArgs: [], fields: TransferLimiterFields) {
    this.$fullTypeName = composeSuiType(
      TransferLimiter.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V5}::limiter::TransferLimiter`
    this.$typeArgs = typeArgs

    this.transferLimits = fields.transferLimits
    this.transferRecords = fields.transferRecords
  }

  static reified(): TransferLimiterReified {
    return {
      typeName: TransferLimiter.$typeName,
      fullTypeName: composeSuiType(
        TransferLimiter.$typeName,
        ...[]
      ) as `${typeof PKG_V5}::limiter::TransferLimiter`,
      typeArgs: [] as [],
      isPhantom: TransferLimiter.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => TransferLimiter.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => TransferLimiter.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => TransferLimiter.fromBcs(data),
      bcs: TransferLimiter.bcs,
      fromJSONField: (field: any) => TransferLimiter.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => TransferLimiter.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => TransferLimiter.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => TransferLimiter.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => TransferLimiter.fetch(client, id),
      new: (fields: TransferLimiterFields) => {
        return new TransferLimiter([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return TransferLimiter.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<TransferLimiter>> {
    return phantom(TransferLimiter.reified())
  }
  static get p() {
    return TransferLimiter.phantom()
  }

  static get bcs() {
    return bcs.struct('TransferLimiter', {
      transfer_limits: VecMap.bcs(BridgeRoute.bcs, bcs.u64()),
      transfer_records: VecMap.bcs(BridgeRoute.bcs, TransferRecord.bcs),
    })
  }

  static fromFields(fields: Record<string, any>): TransferLimiter {
    return TransferLimiter.reified().new({
      transferLimits: decodeFromFields(
        VecMap.reified(BridgeRoute.reified(), 'u64'),
        fields.transfer_limits
      ),
      transferRecords: decodeFromFields(
        VecMap.reified(BridgeRoute.reified(), TransferRecord.reified()),
        fields.transfer_records
      ),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): TransferLimiter {
    if (!isTransferLimiter(item.type)) {
      throw new Error('not a TransferLimiter type')
    }

    return TransferLimiter.reified().new({
      transferLimits: decodeFromFieldsWithTypes(
        VecMap.reified(BridgeRoute.reified(), 'u64'),
        item.fields.transfer_limits
      ),
      transferRecords: decodeFromFieldsWithTypes(
        VecMap.reified(BridgeRoute.reified(), TransferRecord.reified()),
        item.fields.transfer_records
      ),
    })
  }

  static fromBcs(data: Uint8Array): TransferLimiter {
    return TransferLimiter.fromFields(TransferLimiter.bcs.parse(data))
  }

  toJSONField() {
    return {
      transferLimits: this.transferLimits.toJSONField(),
      transferRecords: this.transferRecords.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): TransferLimiter {
    return TransferLimiter.reified().new({
      transferLimits: decodeFromJSONField(
        VecMap.reified(BridgeRoute.reified(), 'u64'),
        field.transferLimits
      ),
      transferRecords: decodeFromJSONField(
        VecMap.reified(BridgeRoute.reified(), TransferRecord.reified()),
        field.transferRecords
      ),
    })
  }

  static fromJSON(json: Record<string, any>): TransferLimiter {
    if (json.$typeName !== TransferLimiter.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return TransferLimiter.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): TransferLimiter {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isTransferLimiter(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a TransferLimiter object`)
    }
    return TransferLimiter.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): TransferLimiter {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isTransferLimiter(data.bcs.type)) {
        throw new Error(`object at is not a TransferLimiter object`)
      }

      return TransferLimiter.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return TransferLimiter.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<TransferLimiter> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching TransferLimiter object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isTransferLimiter(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a TransferLimiter object`)
    }

    return TransferLimiter.fromSuiObjectData(res.data)
  }
}

/* ============================== TransferRecord =============================== */

export function isTransferRecord(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V5}::limiter::TransferRecord`
}

export interface TransferRecordFields {
  hourHead: ToField<'u64'>
  hourTail: ToField<'u64'>
  perHourAmounts: ToField<Vector<'u64'>>
  totalAmount: ToField<'u64'>
}

export type TransferRecordReified = Reified<TransferRecord, TransferRecordFields>

export class TransferRecord implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V5}::limiter::TransferRecord`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = TransferRecord.$typeName
  readonly $fullTypeName: `${typeof PKG_V5}::limiter::TransferRecord`
  readonly $typeArgs: []
  readonly $isPhantom = TransferRecord.$isPhantom

  readonly hourHead: ToField<'u64'>
  readonly hourTail: ToField<'u64'>
  readonly perHourAmounts: ToField<Vector<'u64'>>
  readonly totalAmount: ToField<'u64'>

  private constructor(typeArgs: [], fields: TransferRecordFields) {
    this.$fullTypeName = composeSuiType(
      TransferRecord.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V5}::limiter::TransferRecord`
    this.$typeArgs = typeArgs

    this.hourHead = fields.hourHead
    this.hourTail = fields.hourTail
    this.perHourAmounts = fields.perHourAmounts
    this.totalAmount = fields.totalAmount
  }

  static reified(): TransferRecordReified {
    return {
      typeName: TransferRecord.$typeName,
      fullTypeName: composeSuiType(
        TransferRecord.$typeName,
        ...[]
      ) as `${typeof PKG_V5}::limiter::TransferRecord`,
      typeArgs: [] as [],
      isPhantom: TransferRecord.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => TransferRecord.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => TransferRecord.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => TransferRecord.fromBcs(data),
      bcs: TransferRecord.bcs,
      fromJSONField: (field: any) => TransferRecord.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => TransferRecord.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => TransferRecord.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => TransferRecord.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => TransferRecord.fetch(client, id),
      new: (fields: TransferRecordFields) => {
        return new TransferRecord([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return TransferRecord.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<TransferRecord>> {
    return phantom(TransferRecord.reified())
  }
  static get p() {
    return TransferRecord.phantom()
  }

  static get bcs() {
    return bcs.struct('TransferRecord', {
      hour_head: bcs.u64(),
      hour_tail: bcs.u64(),
      per_hour_amounts: bcs.vector(bcs.u64()),
      total_amount: bcs.u64(),
    })
  }

  static fromFields(fields: Record<string, any>): TransferRecord {
    return TransferRecord.reified().new({
      hourHead: decodeFromFields('u64', fields.hour_head),
      hourTail: decodeFromFields('u64', fields.hour_tail),
      perHourAmounts: decodeFromFields(reified.vector('u64'), fields.per_hour_amounts),
      totalAmount: decodeFromFields('u64', fields.total_amount),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): TransferRecord {
    if (!isTransferRecord(item.type)) {
      throw new Error('not a TransferRecord type')
    }

    return TransferRecord.reified().new({
      hourHead: decodeFromFieldsWithTypes('u64', item.fields.hour_head),
      hourTail: decodeFromFieldsWithTypes('u64', item.fields.hour_tail),
      perHourAmounts: decodeFromFieldsWithTypes(
        reified.vector('u64'),
        item.fields.per_hour_amounts
      ),
      totalAmount: decodeFromFieldsWithTypes('u64', item.fields.total_amount),
    })
  }

  static fromBcs(data: Uint8Array): TransferRecord {
    return TransferRecord.fromFields(TransferRecord.bcs.parse(data))
  }

  toJSONField() {
    return {
      hourHead: this.hourHead.toString(),
      hourTail: this.hourTail.toString(),
      perHourAmounts: fieldToJSON<Vector<'u64'>>(`vector<u64>`, this.perHourAmounts),
      totalAmount: this.totalAmount.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): TransferRecord {
    return TransferRecord.reified().new({
      hourHead: decodeFromJSONField('u64', field.hourHead),
      hourTail: decodeFromJSONField('u64', field.hourTail),
      perHourAmounts: decodeFromJSONField(reified.vector('u64'), field.perHourAmounts),
      totalAmount: decodeFromJSONField('u64', field.totalAmount),
    })
  }

  static fromJSON(json: Record<string, any>): TransferRecord {
    if (json.$typeName !== TransferRecord.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return TransferRecord.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): TransferRecord {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isTransferRecord(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a TransferRecord object`)
    }
    return TransferRecord.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): TransferRecord {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isTransferRecord(data.bcs.type)) {
        throw new Error(`object at is not a TransferRecord object`)
      }

      return TransferRecord.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return TransferRecord.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<TransferRecord> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching TransferRecord object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isTransferRecord(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a TransferRecord object`)
    }

    return TransferRecord.fromSuiObjectData(res.data)
  }
}

/* ============================== UpdateRouteLimitEvent =============================== */

export function isUpdateRouteLimitEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V5}::limiter::UpdateRouteLimitEvent`
}

export interface UpdateRouteLimitEventFields {
  sendingChain: ToField<'u8'>
  receivingChain: ToField<'u8'>
  newLimit: ToField<'u64'>
}

export type UpdateRouteLimitEventReified = Reified<
  UpdateRouteLimitEvent,
  UpdateRouteLimitEventFields
>

export class UpdateRouteLimitEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V5}::limiter::UpdateRouteLimitEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = UpdateRouteLimitEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V5}::limiter::UpdateRouteLimitEvent`
  readonly $typeArgs: []
  readonly $isPhantom = UpdateRouteLimitEvent.$isPhantom

  readonly sendingChain: ToField<'u8'>
  readonly receivingChain: ToField<'u8'>
  readonly newLimit: ToField<'u64'>

  private constructor(typeArgs: [], fields: UpdateRouteLimitEventFields) {
    this.$fullTypeName = composeSuiType(
      UpdateRouteLimitEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V5}::limiter::UpdateRouteLimitEvent`
    this.$typeArgs = typeArgs

    this.sendingChain = fields.sendingChain
    this.receivingChain = fields.receivingChain
    this.newLimit = fields.newLimit
  }

  static reified(): UpdateRouteLimitEventReified {
    return {
      typeName: UpdateRouteLimitEvent.$typeName,
      fullTypeName: composeSuiType(
        UpdateRouteLimitEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V5}::limiter::UpdateRouteLimitEvent`,
      typeArgs: [] as [],
      isPhantom: UpdateRouteLimitEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => UpdateRouteLimitEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        UpdateRouteLimitEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => UpdateRouteLimitEvent.fromBcs(data),
      bcs: UpdateRouteLimitEvent.bcs,
      fromJSONField: (field: any) => UpdateRouteLimitEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => UpdateRouteLimitEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        UpdateRouteLimitEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        UpdateRouteLimitEvent.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => UpdateRouteLimitEvent.fetch(client, id),
      new: (fields: UpdateRouteLimitEventFields) => {
        return new UpdateRouteLimitEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return UpdateRouteLimitEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<UpdateRouteLimitEvent>> {
    return phantom(UpdateRouteLimitEvent.reified())
  }
  static get p() {
    return UpdateRouteLimitEvent.phantom()
  }

  static get bcs() {
    return bcs.struct('UpdateRouteLimitEvent', {
      sending_chain: bcs.u8(),
      receiving_chain: bcs.u8(),
      new_limit: bcs.u64(),
    })
  }

  static fromFields(fields: Record<string, any>): UpdateRouteLimitEvent {
    return UpdateRouteLimitEvent.reified().new({
      sendingChain: decodeFromFields('u8', fields.sending_chain),
      receivingChain: decodeFromFields('u8', fields.receiving_chain),
      newLimit: decodeFromFields('u64', fields.new_limit),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): UpdateRouteLimitEvent {
    if (!isUpdateRouteLimitEvent(item.type)) {
      throw new Error('not a UpdateRouteLimitEvent type')
    }

    return UpdateRouteLimitEvent.reified().new({
      sendingChain: decodeFromFieldsWithTypes('u8', item.fields.sending_chain),
      receivingChain: decodeFromFieldsWithTypes('u8', item.fields.receiving_chain),
      newLimit: decodeFromFieldsWithTypes('u64', item.fields.new_limit),
    })
  }

  static fromBcs(data: Uint8Array): UpdateRouteLimitEvent {
    return UpdateRouteLimitEvent.fromFields(UpdateRouteLimitEvent.bcs.parse(data))
  }

  toJSONField() {
    return {
      sendingChain: this.sendingChain,
      receivingChain: this.receivingChain,
      newLimit: this.newLimit.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): UpdateRouteLimitEvent {
    return UpdateRouteLimitEvent.reified().new({
      sendingChain: decodeFromJSONField('u8', field.sendingChain),
      receivingChain: decodeFromJSONField('u8', field.receivingChain),
      newLimit: decodeFromJSONField('u64', field.newLimit),
    })
  }

  static fromJSON(json: Record<string, any>): UpdateRouteLimitEvent {
    if (json.$typeName !== UpdateRouteLimitEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return UpdateRouteLimitEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): UpdateRouteLimitEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isUpdateRouteLimitEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a UpdateRouteLimitEvent object`
      )
    }
    return UpdateRouteLimitEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): UpdateRouteLimitEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isUpdateRouteLimitEvent(data.bcs.type)) {
        throw new Error(`object at is not a UpdateRouteLimitEvent object`)
      }

      return UpdateRouteLimitEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return UpdateRouteLimitEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<UpdateRouteLimitEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching UpdateRouteLimitEvent object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isUpdateRouteLimitEvent(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a UpdateRouteLimitEvent object`)
    }

    return UpdateRouteLimitEvent.fromSuiObjectData(res.data)
  }
}
