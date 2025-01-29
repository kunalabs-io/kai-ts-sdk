import {
  PhantomReified,
  Reified,
  StructClass,
  ToField,
  ToTypeStr,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  phantom,
} from '../../../../_framework/reified'
import { FieldsWithTypes, composeSuiType, compressSuiType } from '../../../../_framework/util'
import { ID } from '../../../../sui/object/structs'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64, fromHEX, toHEX } from '@mysten/sui/utils'

/* ============================== ObligationCreatedEvent =============================== */

export function isObligationCreatedEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::open_obligation::ObligationCreatedEvent`
}

export interface ObligationCreatedEventFields {
  sender: ToField<'address'>
  obligation: ToField<ID>
  obligationKey: ToField<ID>
}

export type ObligationCreatedEventReified = Reified<
  ObligationCreatedEvent,
  ObligationCreatedEventFields
>

export class ObligationCreatedEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::open_obligation::ObligationCreatedEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = ObligationCreatedEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::open_obligation::ObligationCreatedEvent`
  readonly $typeArgs: []
  readonly $isPhantom = ObligationCreatedEvent.$isPhantom

  readonly sender: ToField<'address'>
  readonly obligation: ToField<ID>
  readonly obligationKey: ToField<ID>

  private constructor(typeArgs: [], fields: ObligationCreatedEventFields) {
    this.$fullTypeName = composeSuiType(
      ObligationCreatedEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::open_obligation::ObligationCreatedEvent`
    this.$typeArgs = typeArgs

    this.sender = fields.sender
    this.obligation = fields.obligation
    this.obligationKey = fields.obligationKey
  }

  static reified(): ObligationCreatedEventReified {
    return {
      typeName: ObligationCreatedEvent.$typeName,
      fullTypeName: composeSuiType(
        ObligationCreatedEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::open_obligation::ObligationCreatedEvent`,
      typeArgs: [] as [],
      isPhantom: ObligationCreatedEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ObligationCreatedEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        ObligationCreatedEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ObligationCreatedEvent.fromBcs(data),
      bcs: ObligationCreatedEvent.bcs,
      fromJSONField: (field: any) => ObligationCreatedEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ObligationCreatedEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        ObligationCreatedEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        ObligationCreatedEvent.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => ObligationCreatedEvent.fetch(client, id),
      new: (fields: ObligationCreatedEventFields) => {
        return new ObligationCreatedEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return ObligationCreatedEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ObligationCreatedEvent>> {
    return phantom(ObligationCreatedEvent.reified())
  }
  static get p() {
    return ObligationCreatedEvent.phantom()
  }

  static get bcs() {
    return bcs.struct('ObligationCreatedEvent', {
      sender: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      obligation: ID.bcs,
      obligation_key: ID.bcs,
    })
  }

  static fromFields(fields: Record<string, any>): ObligationCreatedEvent {
    return ObligationCreatedEvent.reified().new({
      sender: decodeFromFields('address', fields.sender),
      obligation: decodeFromFields(ID.reified(), fields.obligation),
      obligationKey: decodeFromFields(ID.reified(), fields.obligation_key),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ObligationCreatedEvent {
    if (!isObligationCreatedEvent(item.type)) {
      throw new Error('not a ObligationCreatedEvent type')
    }

    return ObligationCreatedEvent.reified().new({
      sender: decodeFromFieldsWithTypes('address', item.fields.sender),
      obligation: decodeFromFieldsWithTypes(ID.reified(), item.fields.obligation),
      obligationKey: decodeFromFieldsWithTypes(ID.reified(), item.fields.obligation_key),
    })
  }

  static fromBcs(data: Uint8Array): ObligationCreatedEvent {
    return ObligationCreatedEvent.fromFields(ObligationCreatedEvent.bcs.parse(data))
  }

  toJSONField() {
    return {
      sender: this.sender,
      obligation: this.obligation,
      obligationKey: this.obligationKey,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ObligationCreatedEvent {
    return ObligationCreatedEvent.reified().new({
      sender: decodeFromJSONField('address', field.sender),
      obligation: decodeFromJSONField(ID.reified(), field.obligation),
      obligationKey: decodeFromJSONField(ID.reified(), field.obligationKey),
    })
  }

  static fromJSON(json: Record<string, any>): ObligationCreatedEvent {
    if (json.$typeName !== ObligationCreatedEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return ObligationCreatedEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): ObligationCreatedEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isObligationCreatedEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a ObligationCreatedEvent object`
      )
    }
    return ObligationCreatedEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): ObligationCreatedEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isObligationCreatedEvent(data.bcs.type)) {
        throw new Error(`object at is not a ObligationCreatedEvent object`)
      }

      return ObligationCreatedEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ObligationCreatedEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<ObligationCreatedEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching ObligationCreatedEvent object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isObligationCreatedEvent(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a ObligationCreatedEvent object`)
    }

    return ObligationCreatedEvent.fromSuiObjectData(res.data)
  }
}

/* ============================== ObligationHotPotato =============================== */

export function isObligationHotPotato(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::open_obligation::ObligationHotPotato`
}

export interface ObligationHotPotatoFields {
  obligationId: ToField<ID>
}

export type ObligationHotPotatoReified = Reified<ObligationHotPotato, ObligationHotPotatoFields>

export class ObligationHotPotato implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::open_obligation::ObligationHotPotato`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = ObligationHotPotato.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::open_obligation::ObligationHotPotato`
  readonly $typeArgs: []
  readonly $isPhantom = ObligationHotPotato.$isPhantom

  readonly obligationId: ToField<ID>

  private constructor(typeArgs: [], fields: ObligationHotPotatoFields) {
    this.$fullTypeName = composeSuiType(
      ObligationHotPotato.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::open_obligation::ObligationHotPotato`
    this.$typeArgs = typeArgs

    this.obligationId = fields.obligationId
  }

  static reified(): ObligationHotPotatoReified {
    return {
      typeName: ObligationHotPotato.$typeName,
      fullTypeName: composeSuiType(
        ObligationHotPotato.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::open_obligation::ObligationHotPotato`,
      typeArgs: [] as [],
      isPhantom: ObligationHotPotato.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ObligationHotPotato.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ObligationHotPotato.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ObligationHotPotato.fromBcs(data),
      bcs: ObligationHotPotato.bcs,
      fromJSONField: (field: any) => ObligationHotPotato.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ObligationHotPotato.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => ObligationHotPotato.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ObligationHotPotato.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => ObligationHotPotato.fetch(client, id),
      new: (fields: ObligationHotPotatoFields) => {
        return new ObligationHotPotato([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return ObligationHotPotato.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ObligationHotPotato>> {
    return phantom(ObligationHotPotato.reified())
  }
  static get p() {
    return ObligationHotPotato.phantom()
  }

  static get bcs() {
    return bcs.struct('ObligationHotPotato', {
      obligation_id: ID.bcs,
    })
  }

  static fromFields(fields: Record<string, any>): ObligationHotPotato {
    return ObligationHotPotato.reified().new({
      obligationId: decodeFromFields(ID.reified(), fields.obligation_id),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ObligationHotPotato {
    if (!isObligationHotPotato(item.type)) {
      throw new Error('not a ObligationHotPotato type')
    }

    return ObligationHotPotato.reified().new({
      obligationId: decodeFromFieldsWithTypes(ID.reified(), item.fields.obligation_id),
    })
  }

  static fromBcs(data: Uint8Array): ObligationHotPotato {
    return ObligationHotPotato.fromFields(ObligationHotPotato.bcs.parse(data))
  }

  toJSONField() {
    return {
      obligationId: this.obligationId,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ObligationHotPotato {
    return ObligationHotPotato.reified().new({
      obligationId: decodeFromJSONField(ID.reified(), field.obligationId),
    })
  }

  static fromJSON(json: Record<string, any>): ObligationHotPotato {
    if (json.$typeName !== ObligationHotPotato.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return ObligationHotPotato.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): ObligationHotPotato {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isObligationHotPotato(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ObligationHotPotato object`)
    }
    return ObligationHotPotato.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): ObligationHotPotato {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isObligationHotPotato(data.bcs.type)) {
        throw new Error(`object at is not a ObligationHotPotato object`)
      }

      return ObligationHotPotato.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ObligationHotPotato.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<ObligationHotPotato> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching ObligationHotPotato object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isObligationHotPotato(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a ObligationHotPotato object`)
    }

    return ObligationHotPotato.fromSuiObjectData(res.data)
  }
}
