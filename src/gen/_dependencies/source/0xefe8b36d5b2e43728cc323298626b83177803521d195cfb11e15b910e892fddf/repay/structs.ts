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
import { TypeName } from '../../../../move-stdlib/type-name/structs'
import { ID } from '../../../../sui/object/structs'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64, fromHEX, toHEX } from '@mysten/sui/utils'

/* ============================== RepayEvent =============================== */

export function isRepayEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::repay::RepayEvent`
}

export interface RepayEventFields {
  repayer: ToField<'address'>
  obligation: ToField<ID>
  asset: ToField<TypeName>
  amount: ToField<'u64'>
  time: ToField<'u64'>
}

export type RepayEventReified = Reified<RepayEvent, RepayEventFields>

export class RepayEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::repay::RepayEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = RepayEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::repay::RepayEvent`
  readonly $typeArgs: []
  readonly $isPhantom = RepayEvent.$isPhantom

  readonly repayer: ToField<'address'>
  readonly obligation: ToField<ID>
  readonly asset: ToField<TypeName>
  readonly amount: ToField<'u64'>
  readonly time: ToField<'u64'>

  private constructor(typeArgs: [], fields: RepayEventFields) {
    this.$fullTypeName = composeSuiType(
      RepayEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::repay::RepayEvent`
    this.$typeArgs = typeArgs

    this.repayer = fields.repayer
    this.obligation = fields.obligation
    this.asset = fields.asset
    this.amount = fields.amount
    this.time = fields.time
  }

  static reified(): RepayEventReified {
    const reifiedBcs = RepayEvent.bcs
    return {
      typeName: RepayEvent.$typeName,
      fullTypeName: composeSuiType(
        RepayEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::repay::RepayEvent`,
      typeArgs: [] as [],
      isPhantom: RepayEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => RepayEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => RepayEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => RepayEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => RepayEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => RepayEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => RepayEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => RepayEvent.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => RepayEvent.fetch(client, id),
      new: (fields: RepayEventFields) => {
        return new RepayEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return RepayEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RepayEvent>> {
    return phantom(RepayEvent.reified())
  }
  static get p() {
    return RepayEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('RepayEvent', {
      repayer: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      obligation: ID.bcs,
      asset: TypeName.bcs,
      amount: bcs.u64(),
      time: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof RepayEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof RepayEvent.instantiateBcs> {
    if (!RepayEvent.cachedBcs) {
      RepayEvent.cachedBcs = RepayEvent.instantiateBcs()
    }
    return RepayEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): RepayEvent {
    return RepayEvent.reified().new({
      repayer: decodeFromFields('address', fields.repayer),
      obligation: decodeFromFields(ID.reified(), fields.obligation),
      asset: decodeFromFields(TypeName.reified(), fields.asset),
      amount: decodeFromFields('u64', fields.amount),
      time: decodeFromFields('u64', fields.time),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): RepayEvent {
    if (!isRepayEvent(item.type)) {
      throw new Error('not a RepayEvent type')
    }

    return RepayEvent.reified().new({
      repayer: decodeFromFieldsWithTypes('address', item.fields.repayer),
      obligation: decodeFromFieldsWithTypes(ID.reified(), item.fields.obligation),
      asset: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.asset),
      amount: decodeFromFieldsWithTypes('u64', item.fields.amount),
      time: decodeFromFieldsWithTypes('u64', item.fields.time),
    })
  }

  static fromBcs(data: Uint8Array): RepayEvent {
    return RepayEvent.fromFields(RepayEvent.bcs.parse(data))
  }

  toJSONField() {
    return {
      repayer: this.repayer,
      obligation: this.obligation,
      asset: this.asset.toJSONField(),
      amount: this.amount.toString(),
      time: this.time.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): RepayEvent {
    return RepayEvent.reified().new({
      repayer: decodeFromJSONField('address', field.repayer),
      obligation: decodeFromJSONField(ID.reified(), field.obligation),
      asset: decodeFromJSONField(TypeName.reified(), field.asset),
      amount: decodeFromJSONField('u64', field.amount),
      time: decodeFromJSONField('u64', field.time),
    })
  }

  static fromJSON(json: Record<string, any>): RepayEvent {
    if (json.$typeName !== RepayEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return RepayEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): RepayEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRepayEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a RepayEvent object`)
    }
    return RepayEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): RepayEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRepayEvent(data.bcs.type)) {
        throw new Error(`object at is not a RepayEvent object`)
      }

      return RepayEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RepayEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<RepayEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching RepayEvent object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isRepayEvent(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a RepayEvent object`)
    }

    return RepayEvent.fromSuiObjectData(res.data)
  }
}
