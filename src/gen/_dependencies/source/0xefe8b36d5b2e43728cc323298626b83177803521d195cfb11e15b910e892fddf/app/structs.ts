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
  phantom,
  ToTypeStr as ToPhantom,
} from '../../../../_framework/reified'
import { FieldsWithTypes, composeSuiType, compressSuiType } from '../../../../_framework/util'
import { UID } from '../../../../sui/object/structs'
import { AcTableCap } from '../../0x779b5c547976899f5474f3a5bc0db36ddf4697ad7e5a901db0415c2281d28162/ac-table/structs'
import { PKG_V1 } from '../index'
import { InterestModels } from '../interest-model/structs'
import { RiskModels } from '../risk-model/structs'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== APP =============================== */

export function isAPP(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::app::APP`
}

export interface APPFields {
  dummyField: ToField<'bool'>
}

export type APPReified = Reified<APP, APPFields>

export class APP implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::app::APP`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = APP.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::app::APP`
  readonly $typeArgs: []
  readonly $isPhantom = APP.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: APPFields) {
    this.$fullTypeName = composeSuiType(APP.$typeName, ...typeArgs) as `${typeof PKG_V1}::app::APP`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): APPReified {
    const reifiedBcs = APP.bcs
    return {
      typeName: APP.$typeName,
      fullTypeName: composeSuiType(APP.$typeName, ...[]) as `${typeof PKG_V1}::app::APP`,
      typeArgs: [] as [],
      isPhantom: APP.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => APP.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => APP.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => APP.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => APP.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => APP.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => APP.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => APP.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => APP.fetch(client, id),
      new: (fields: APPFields) => {
        return new APP([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return APP.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<APP>> {
    return phantom(APP.reified())
  }
  static get p() {
    return APP.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('APP', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof APP.instantiateBcs> | null = null

  static get bcs() {
    if (!APP.cachedBcs) {
      APP.cachedBcs = APP.instantiateBcs()
    }
    return APP.cachedBcs
  }

  static fromFields(fields: Record<string, any>): APP {
    return APP.reified().new({ dummyField: decodeFromFields('bool', fields.dummy_field) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): APP {
    if (!isAPP(item.type)) {
      throw new Error('not a APP type')
    }

    return APP.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): APP {
    return APP.fromFields(APP.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): APP {
    return APP.reified().new({ dummyField: decodeFromJSONField('bool', field.dummyField) })
  }

  static fromJSON(json: Record<string, any>): APP {
    if (json.$typeName !== APP.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return APP.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): APP {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAPP(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a APP object`)
    }
    return APP.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): APP {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAPP(data.bcs.type)) {
        throw new Error(`object at is not a APP object`)
      }

      return APP.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return APP.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<APP> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching APP object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isAPP(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a APP object`)
    }

    return APP.fromSuiObjectData(res.data)
  }
}

/* ============================== AdminCap =============================== */

export function isAdminCap(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::app::AdminCap`
}

export interface AdminCapFields {
  id: ToField<UID>
  interestModelCap: ToField<AcTableCap<ToPhantom<InterestModels>>>
  interestModelChangeDelay: ToField<'u64'>
  riskModelCap: ToField<AcTableCap<ToPhantom<RiskModels>>>
  riskModelChangeDelay: ToField<'u64'>
  limiterChangeDelay: ToField<'u64'>
}

export type AdminCapReified = Reified<AdminCap, AdminCapFields>

export class AdminCap implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::app::AdminCap`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = AdminCap.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::app::AdminCap`
  readonly $typeArgs: []
  readonly $isPhantom = AdminCap.$isPhantom

  readonly id: ToField<UID>
  readonly interestModelCap: ToField<AcTableCap<ToPhantom<InterestModels>>>
  readonly interestModelChangeDelay: ToField<'u64'>
  readonly riskModelCap: ToField<AcTableCap<ToPhantom<RiskModels>>>
  readonly riskModelChangeDelay: ToField<'u64'>
  readonly limiterChangeDelay: ToField<'u64'>

  private constructor(typeArgs: [], fields: AdminCapFields) {
    this.$fullTypeName = composeSuiType(
      AdminCap.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::app::AdminCap`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.interestModelCap = fields.interestModelCap
    this.interestModelChangeDelay = fields.interestModelChangeDelay
    this.riskModelCap = fields.riskModelCap
    this.riskModelChangeDelay = fields.riskModelChangeDelay
    this.limiterChangeDelay = fields.limiterChangeDelay
  }

  static reified(): AdminCapReified {
    const reifiedBcs = AdminCap.bcs
    return {
      typeName: AdminCap.$typeName,
      fullTypeName: composeSuiType(AdminCap.$typeName, ...[]) as `${typeof PKG_V1}::app::AdminCap`,
      typeArgs: [] as [],
      isPhantom: AdminCap.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AdminCap.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AdminCap.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AdminCap.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AdminCap.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AdminCap.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => AdminCap.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AdminCap.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => AdminCap.fetch(client, id),
      new: (fields: AdminCapFields) => {
        return new AdminCap([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return AdminCap.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AdminCap>> {
    return phantom(AdminCap.reified())
  }
  static get p() {
    return AdminCap.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AdminCap', {
      id: UID.bcs,
      interest_model_cap: AcTableCap.bcs,
      interest_model_change_delay: bcs.u64(),
      risk_model_cap: AcTableCap.bcs,
      risk_model_change_delay: bcs.u64(),
      limiter_change_delay: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof AdminCap.instantiateBcs> | null = null

  static get bcs() {
    if (!AdminCap.cachedBcs) {
      AdminCap.cachedBcs = AdminCap.instantiateBcs()
    }
    return AdminCap.cachedBcs
  }

  static fromFields(fields: Record<string, any>): AdminCap {
    return AdminCap.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      interestModelCap: decodeFromFields(
        AcTableCap.reified(reified.phantom(InterestModels.reified())),
        fields.interest_model_cap
      ),
      interestModelChangeDelay: decodeFromFields('u64', fields.interest_model_change_delay),
      riskModelCap: decodeFromFields(
        AcTableCap.reified(reified.phantom(RiskModels.reified())),
        fields.risk_model_cap
      ),
      riskModelChangeDelay: decodeFromFields('u64', fields.risk_model_change_delay),
      limiterChangeDelay: decodeFromFields('u64', fields.limiter_change_delay),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): AdminCap {
    if (!isAdminCap(item.type)) {
      throw new Error('not a AdminCap type')
    }

    return AdminCap.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      interestModelCap: decodeFromFieldsWithTypes(
        AcTableCap.reified(reified.phantom(InterestModels.reified())),
        item.fields.interest_model_cap
      ),
      interestModelChangeDelay: decodeFromFieldsWithTypes(
        'u64',
        item.fields.interest_model_change_delay
      ),
      riskModelCap: decodeFromFieldsWithTypes(
        AcTableCap.reified(reified.phantom(RiskModels.reified())),
        item.fields.risk_model_cap
      ),
      riskModelChangeDelay: decodeFromFieldsWithTypes('u64', item.fields.risk_model_change_delay),
      limiterChangeDelay: decodeFromFieldsWithTypes('u64', item.fields.limiter_change_delay),
    })
  }

  static fromBcs(data: Uint8Array): AdminCap {
    return AdminCap.fromFields(AdminCap.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      interestModelCap: this.interestModelCap.toJSONField(),
      interestModelChangeDelay: this.interestModelChangeDelay.toString(),
      riskModelCap: this.riskModelCap.toJSONField(),
      riskModelChangeDelay: this.riskModelChangeDelay.toString(),
      limiterChangeDelay: this.limiterChangeDelay.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AdminCap {
    return AdminCap.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      interestModelCap: decodeFromJSONField(
        AcTableCap.reified(reified.phantom(InterestModels.reified())),
        field.interestModelCap
      ),
      interestModelChangeDelay: decodeFromJSONField('u64', field.interestModelChangeDelay),
      riskModelCap: decodeFromJSONField(
        AcTableCap.reified(reified.phantom(RiskModels.reified())),
        field.riskModelCap
      ),
      riskModelChangeDelay: decodeFromJSONField('u64', field.riskModelChangeDelay),
      limiterChangeDelay: decodeFromJSONField('u64', field.limiterChangeDelay),
    })
  }

  static fromJSON(json: Record<string, any>): AdminCap {
    if (json.$typeName !== AdminCap.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return AdminCap.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): AdminCap {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAdminCap(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AdminCap object`)
    }
    return AdminCap.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): AdminCap {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAdminCap(data.bcs.type)) {
        throw new Error(`object at is not a AdminCap object`)
      }

      return AdminCap.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AdminCap.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<AdminCap> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching AdminCap object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isAdminCap(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a AdminCap object`)
    }

    return AdminCap.fromSuiObjectData(res.data)
  }
}
