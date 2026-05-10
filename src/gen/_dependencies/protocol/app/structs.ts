import { bcs } from '@mysten/sui/bcs'
import { SuiObjectData, SuiParsedData } from '@mysten/sui/client'
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
import {
  composeSuiType,
  compressSuiType,
  fetchObjectBcs,
  FieldsWithTypes,
  SupportedSuiClient,
} from '../../../_framework/util'
import { UID } from '../../../sui/object/structs'
import { AcTableCap } from '../../x/ac-table/structs'
import { InterestModels } from '../interest-model/structs'
import { RiskModels } from '../risk-model/structs'

/* ============================== APP =============================== */

export function isAPP(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('protocol', 'app::APP')}::app::APP`
}

export interface APPFields {
  dummyField: ToField<'bool'>
}

export type APPReified = Reified<APP, APPFields>

export type APPJSONField = {
  dummyField: boolean
}

export type APPJSON = {
  $typeName: typeof APP.$typeName
  $typeArgs: []
} & APPJSONField

/** OTW */
export class APP implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::app::APP` = `${
    getTypeOrigin('protocol', 'app::APP')
  }::app::APP` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof APP.$typeName = APP.$typeName
  readonly $fullTypeName: `${string}::app::APP`
  readonly $typeArgs: []
  readonly $isPhantom: typeof APP.$isPhantom = APP.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: APPFields) {
    this.$fullTypeName = composeSuiType(
      APP.$typeName,
      ...typeArgs,
    ) as `${string}::app::APP`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): APPReified {
    const reifiedBcs = APP.bcs
    return {
      typeName: APP.$typeName,
      fullTypeName: composeSuiType(
        APP.$typeName,
        ...[],
      ) as `${string}::app::APP`,
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
      fetch: async (client: SupportedSuiClient, id: string) => APP.fetch(client, id),
      new: (fields: APPFields) => {
        return new APP([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): APPReified {
    return APP.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<APP>> {
    return phantom(APP.reified())
  }

  static get p(): PhantomReified<ToTypeStr<APP>> {
    return APP.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('APP', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof APP.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof APP.instantiateBcs> {
    if (!APP.cachedBcs) {
      APP.cachedBcs = APP.instantiateBcs()
    }
    return APP.cachedBcs
  }

  static fromFields(fields: Record<string, any>): APP {
    return APP.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
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

  toJSONField(): APPJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): APPJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): APP {
    return APP.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): APP {
    if (json.$typeName !== APP.$typeName) {
      throw new Error(
        `not a APP json object: expected '${APP.$typeName}' but got '${json.$typeName}'`,
      )
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

      return APP.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return APP.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<APP> {
    const res = await fetchObjectBcs(client, id)
    if (!isAPP(res.type)) {
      throw new Error(`object at id ${id} is not a APP object`)
    }

    return APP.fromBcs(res.bcsBytes)
  }
}

/* ============================== AdminCap =============================== */

export function isAdminCap(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('protocol', 'app::AdminCap')}::app::AdminCap`
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

export type AdminCapJSONField = {
  id: string
  interestModelCap: ToJSON<AcTableCap<ToPhantom<InterestModels>>>
  interestModelChangeDelay: string
  riskModelCap: ToJSON<AcTableCap<ToPhantom<RiskModels>>>
  riskModelChangeDelay: string
  limiterChangeDelay: string
}

export type AdminCapJSON = {
  $typeName: typeof AdminCap.$typeName
  $typeArgs: []
} & AdminCapJSONField

export class AdminCap implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::app::AdminCap` = `${
    getTypeOrigin('protocol', 'app::AdminCap')
  }::app::AdminCap` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof AdminCap.$typeName = AdminCap.$typeName
  readonly $fullTypeName: `${string}::app::AdminCap`
  readonly $typeArgs: []
  readonly $isPhantom: typeof AdminCap.$isPhantom = AdminCap.$isPhantom

  readonly id: ToField<UID>
  readonly interestModelCap: ToField<AcTableCap<ToPhantom<InterestModels>>>
  readonly interestModelChangeDelay: ToField<'u64'>
  readonly riskModelCap: ToField<AcTableCap<ToPhantom<RiskModels>>>
  readonly riskModelChangeDelay: ToField<'u64'>
  readonly limiterChangeDelay: ToField<'u64'>

  private constructor(typeArgs: [], fields: AdminCapFields) {
    this.$fullTypeName = composeSuiType(
      AdminCap.$typeName,
      ...typeArgs,
    ) as `${string}::app::AdminCap`
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
      fullTypeName: composeSuiType(
        AdminCap.$typeName,
        ...[],
      ) as `${string}::app::AdminCap`,
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
      fetch: async (client: SupportedSuiClient, id: string) => AdminCap.fetch(client, id),
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
      interest_model_cap: AcTableCap.bcs,
      interest_model_change_delay: bcs.u64(),
      risk_model_cap: AcTableCap.bcs,
      risk_model_change_delay: bcs.u64(),
      limiter_change_delay: bcs.u64(),
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
      interestModelCap: decodeFromFields(
        AcTableCap.reified(phantom(InterestModels.reified())),
        fields.interest_model_cap,
      ),
      interestModelChangeDelay: decodeFromFields('u64', fields.interest_model_change_delay),
      riskModelCap: decodeFromFields(
        AcTableCap.reified(phantom(RiskModels.reified())),
        fields.risk_model_cap,
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
        AcTableCap.reified(phantom(InterestModels.reified())),
        item.fields.interest_model_cap,
      ),
      interestModelChangeDelay: decodeFromFieldsWithTypes(
        'u64',
        item.fields.interest_model_change_delay,
      ),
      riskModelCap: decodeFromFieldsWithTypes(
        AcTableCap.reified(phantom(RiskModels.reified())),
        item.fields.risk_model_cap,
      ),
      riskModelChangeDelay: decodeFromFieldsWithTypes('u64', item.fields.risk_model_change_delay),
      limiterChangeDelay: decodeFromFieldsWithTypes('u64', item.fields.limiter_change_delay),
    })
  }

  static fromBcs(data: Uint8Array): AdminCap {
    return AdminCap.fromFields(AdminCap.bcs.parse(data))
  }

  toJSONField(): AdminCapJSONField {
    return {
      id: this.id,
      interestModelCap: this.interestModelCap.toJSONField(),
      interestModelChangeDelay: this.interestModelChangeDelay.toString(),
      riskModelCap: this.riskModelCap.toJSONField(),
      riskModelChangeDelay: this.riskModelChangeDelay.toString(),
      limiterChangeDelay: this.limiterChangeDelay.toString(),
    }
  }

  toJSON(): AdminCapJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AdminCap {
    return AdminCap.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      interestModelCap: decodeFromJSONField(
        AcTableCap.reified(phantom(InterestModels.reified())),
        field.interestModelCap,
      ),
      interestModelChangeDelay: decodeFromJSONField('u64', field.interestModelChangeDelay),
      riskModelCap: decodeFromJSONField(
        AcTableCap.reified(phantom(RiskModels.reified())),
        field.riskModelCap,
      ),
      riskModelChangeDelay: decodeFromJSONField('u64', field.riskModelChangeDelay),
      limiterChangeDelay: decodeFromJSONField('u64', field.limiterChangeDelay),
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

      return AdminCap.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AdminCap.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<AdminCap> {
    const res = await fetchObjectBcs(client, id)
    if (!isAdminCap(res.type)) {
      throw new Error(`object at id ${id} is not a AdminCap object`)
    }

    return AdminCap.fromBcs(res.bcsBytes)
  }
}
