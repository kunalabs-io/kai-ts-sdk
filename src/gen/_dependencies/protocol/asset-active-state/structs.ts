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
import { TypeName } from '../../../std/type-name/structs'
import { WitTable } from '../../x/wit-table/structs'

/* ============================== BaseAssetActiveStates =============================== */

export function isBaseAssetActiveStates(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('protocol', 'asset_active_state::BaseAssetActiveStates')
    }::asset_active_state::BaseAssetActiveStates`
}

export interface BaseAssetActiveStatesFields {
  dummyField: ToField<'bool'>
}

export type BaseAssetActiveStatesReified = Reified<
  BaseAssetActiveStates,
  BaseAssetActiveStatesFields
>

export type BaseAssetActiveStatesJSONField = {
  dummyField: boolean
}

export type BaseAssetActiveStatesJSON = {
  $typeName: typeof BaseAssetActiveStates.$typeName
  $typeArgs: []
} & BaseAssetActiveStatesJSONField

export class BaseAssetActiveStates implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::asset_active_state::BaseAssetActiveStates` = `${
    getTypeOrigin('protocol', 'asset_active_state::BaseAssetActiveStates')
  }::asset_active_state::BaseAssetActiveStates` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof BaseAssetActiveStates.$typeName = BaseAssetActiveStates.$typeName
  readonly $fullTypeName: `${string}::asset_active_state::BaseAssetActiveStates`
  readonly $typeArgs: []
  readonly $isPhantom: typeof BaseAssetActiveStates.$isPhantom = BaseAssetActiveStates.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: BaseAssetActiveStatesFields) {
    this.$fullTypeName = composeSuiType(
      BaseAssetActiveStates.$typeName,
      ...typeArgs,
    ) as `${string}::asset_active_state::BaseAssetActiveStates`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): BaseAssetActiveStatesReified {
    const reifiedBcs = BaseAssetActiveStates.bcs
    return {
      typeName: BaseAssetActiveStates.$typeName,
      fullTypeName: composeSuiType(
        BaseAssetActiveStates.$typeName,
        ...[],
      ) as `${string}::asset_active_state::BaseAssetActiveStates`,
      typeArgs: [] as [],
      isPhantom: BaseAssetActiveStates.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => BaseAssetActiveStates.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        BaseAssetActiveStates.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => BaseAssetActiveStates.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => BaseAssetActiveStates.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => BaseAssetActiveStates.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        BaseAssetActiveStates.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        BaseAssetActiveStates.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) =>
        BaseAssetActiveStates.fetch(client, id),
      new: (fields: BaseAssetActiveStatesFields) => {
        return new BaseAssetActiveStates([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): BaseAssetActiveStatesReified {
    return BaseAssetActiveStates.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<BaseAssetActiveStates>> {
    return phantom(BaseAssetActiveStates.reified())
  }

  static get p(): PhantomReified<ToTypeStr<BaseAssetActiveStates>> {
    return BaseAssetActiveStates.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('BaseAssetActiveStates', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof BaseAssetActiveStates.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof BaseAssetActiveStates.instantiateBcs> {
    if (!BaseAssetActiveStates.cachedBcs) {
      BaseAssetActiveStates.cachedBcs = BaseAssetActiveStates.instantiateBcs()
    }
    return BaseAssetActiveStates.cachedBcs
  }

  static fromFields(fields: Record<string, any>): BaseAssetActiveStates {
    return BaseAssetActiveStates.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): BaseAssetActiveStates {
    if (!isBaseAssetActiveStates(item.type)) {
      throw new Error('not a BaseAssetActiveStates type')
    }

    return BaseAssetActiveStates.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): BaseAssetActiveStates {
    return BaseAssetActiveStates.fromFields(BaseAssetActiveStates.bcs.parse(data))
  }

  toJSONField(): BaseAssetActiveStatesJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): BaseAssetActiveStatesJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): BaseAssetActiveStates {
    return BaseAssetActiveStates.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): BaseAssetActiveStates {
    if (json.$typeName !== BaseAssetActiveStates.$typeName) {
      throw new Error(
        `not a BaseAssetActiveStates json object: expected '${BaseAssetActiveStates.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return BaseAssetActiveStates.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): BaseAssetActiveStates {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isBaseAssetActiveStates(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a BaseAssetActiveStates object`,
      )
    }
    return BaseAssetActiveStates.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): BaseAssetActiveStates {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isBaseAssetActiveStates(data.bcs.type)) {
        throw new Error(`object at is not a BaseAssetActiveStates object`)
      }

      return BaseAssetActiveStates.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return BaseAssetActiveStates.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<BaseAssetActiveStates> {
    const res = await fetchObjectBcs(client, id)
    if (!isBaseAssetActiveStates(res.type)) {
      throw new Error(`object at id ${id} is not a BaseAssetActiveStates object`)
    }

    return BaseAssetActiveStates.fromBcs(res.bcsBytes)
  }
}

/* ============================== CollateralActiveStates =============================== */

export function isCollateralActiveStates(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('protocol', 'asset_active_state::CollateralActiveStates')
    }::asset_active_state::CollateralActiveStates`
}

export interface CollateralActiveStatesFields {
  dummyField: ToField<'bool'>
}

export type CollateralActiveStatesReified = Reified<
  CollateralActiveStates,
  CollateralActiveStatesFields
>

export type CollateralActiveStatesJSONField = {
  dummyField: boolean
}

export type CollateralActiveStatesJSON = {
  $typeName: typeof CollateralActiveStates.$typeName
  $typeArgs: []
} & CollateralActiveStatesJSONField

export class CollateralActiveStates implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::asset_active_state::CollateralActiveStates` = `${
    getTypeOrigin('protocol', 'asset_active_state::CollateralActiveStates')
  }::asset_active_state::CollateralActiveStates` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof CollateralActiveStates.$typeName = CollateralActiveStates.$typeName
  readonly $fullTypeName: `${string}::asset_active_state::CollateralActiveStates`
  readonly $typeArgs: []
  readonly $isPhantom: typeof CollateralActiveStates.$isPhantom = CollateralActiveStates.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: CollateralActiveStatesFields) {
    this.$fullTypeName = composeSuiType(
      CollateralActiveStates.$typeName,
      ...typeArgs,
    ) as `${string}::asset_active_state::CollateralActiveStates`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): CollateralActiveStatesReified {
    const reifiedBcs = CollateralActiveStates.bcs
    return {
      typeName: CollateralActiveStates.$typeName,
      fullTypeName: composeSuiType(
        CollateralActiveStates.$typeName,
        ...[],
      ) as `${string}::asset_active_state::CollateralActiveStates`,
      typeArgs: [] as [],
      isPhantom: CollateralActiveStates.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => CollateralActiveStates.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        CollateralActiveStates.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => CollateralActiveStates.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => CollateralActiveStates.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => CollateralActiveStates.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        CollateralActiveStates.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        CollateralActiveStates.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) =>
        CollateralActiveStates.fetch(client, id),
      new: (fields: CollateralActiveStatesFields) => {
        return new CollateralActiveStates([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): CollateralActiveStatesReified {
    return CollateralActiveStates.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<CollateralActiveStates>> {
    return phantom(CollateralActiveStates.reified())
  }

  static get p(): PhantomReified<ToTypeStr<CollateralActiveStates>> {
    return CollateralActiveStates.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('CollateralActiveStates', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof CollateralActiveStates.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof CollateralActiveStates.instantiateBcs> {
    if (!CollateralActiveStates.cachedBcs) {
      CollateralActiveStates.cachedBcs = CollateralActiveStates.instantiateBcs()
    }
    return CollateralActiveStates.cachedBcs
  }

  static fromFields(fields: Record<string, any>): CollateralActiveStates {
    return CollateralActiveStates.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): CollateralActiveStates {
    if (!isCollateralActiveStates(item.type)) {
      throw new Error('not a CollateralActiveStates type')
    }

    return CollateralActiveStates.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): CollateralActiveStates {
    return CollateralActiveStates.fromFields(CollateralActiveStates.bcs.parse(data))
  }

  toJSONField(): CollateralActiveStatesJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): CollateralActiveStatesJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): CollateralActiveStates {
    return CollateralActiveStates.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): CollateralActiveStates {
    if (json.$typeName !== CollateralActiveStates.$typeName) {
      throw new Error(
        `not a CollateralActiveStates json object: expected '${CollateralActiveStates.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return CollateralActiveStates.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): CollateralActiveStates {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isCollateralActiveStates(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a CollateralActiveStates object`,
      )
    }
    return CollateralActiveStates.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): CollateralActiveStates {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isCollateralActiveStates(data.bcs.type)) {
        throw new Error(`object at is not a CollateralActiveStates object`)
      }

      return CollateralActiveStates.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return CollateralActiveStates.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<CollateralActiveStates> {
    const res = await fetchObjectBcs(client, id)
    if (!isCollateralActiveStates(res.type)) {
      throw new Error(`object at id ${id} is not a CollateralActiveStates object`)
    }

    return CollateralActiveStates.fromBcs(res.bcsBytes)
  }
}

/* ============================== AssetActiveStates =============================== */

export function isAssetActiveStates(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('protocol', 'asset_active_state::AssetActiveStates')
    }::asset_active_state::AssetActiveStates`
}

export interface AssetActiveStatesFields {
  base: ToField<WitTable<ToPhantom<BaseAssetActiveStates>, TypeName, 'bool'>>
  collateral: ToField<WitTable<ToPhantom<CollateralActiveStates>, TypeName, 'bool'>>
}

export type AssetActiveStatesReified = Reified<AssetActiveStates, AssetActiveStatesFields>

export type AssetActiveStatesJSONField = {
  base: ToJSON<WitTable<ToPhantom<BaseAssetActiveStates>, TypeName, 'bool'>>
  collateral: ToJSON<WitTable<ToPhantom<CollateralActiveStates>, TypeName, 'bool'>>
}

export type AssetActiveStatesJSON = {
  $typeName: typeof AssetActiveStates.$typeName
  $typeArgs: []
} & AssetActiveStatesJSONField

export class AssetActiveStates implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::asset_active_state::AssetActiveStates` = `${
    getTypeOrigin('protocol', 'asset_active_state::AssetActiveStates')
  }::asset_active_state::AssetActiveStates` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof AssetActiveStates.$typeName = AssetActiveStates.$typeName
  readonly $fullTypeName: `${string}::asset_active_state::AssetActiveStates`
  readonly $typeArgs: []
  readonly $isPhantom: typeof AssetActiveStates.$isPhantom = AssetActiveStates.$isPhantom

  readonly base: ToField<WitTable<ToPhantom<BaseAssetActiveStates>, TypeName, 'bool'>>
  readonly collateral: ToField<WitTable<ToPhantom<CollateralActiveStates>, TypeName, 'bool'>>

  private constructor(typeArgs: [], fields: AssetActiveStatesFields) {
    this.$fullTypeName = composeSuiType(
      AssetActiveStates.$typeName,
      ...typeArgs,
    ) as `${string}::asset_active_state::AssetActiveStates`
    this.$typeArgs = typeArgs

    this.base = fields.base
    this.collateral = fields.collateral
  }

  static reified(): AssetActiveStatesReified {
    const reifiedBcs = AssetActiveStates.bcs
    return {
      typeName: AssetActiveStates.$typeName,
      fullTypeName: composeSuiType(
        AssetActiveStates.$typeName,
        ...[],
      ) as `${string}::asset_active_state::AssetActiveStates`,
      typeArgs: [] as [],
      isPhantom: AssetActiveStates.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AssetActiveStates.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AssetActiveStates.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AssetActiveStates.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AssetActiveStates.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AssetActiveStates.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => AssetActiveStates.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AssetActiveStates.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => AssetActiveStates.fetch(client, id),
      new: (fields: AssetActiveStatesFields) => {
        return new AssetActiveStates([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): AssetActiveStatesReified {
    return AssetActiveStates.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AssetActiveStates>> {
    return phantom(AssetActiveStates.reified())
  }

  static get p(): PhantomReified<ToTypeStr<AssetActiveStates>> {
    return AssetActiveStates.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AssetActiveStates', {
      base: WitTable.bcs(TypeName.bcs),
      collateral: WitTable.bcs(TypeName.bcs),
    })
  }

  private static cachedBcs: ReturnType<typeof AssetActiveStates.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof AssetActiveStates.instantiateBcs> {
    if (!AssetActiveStates.cachedBcs) {
      AssetActiveStates.cachedBcs = AssetActiveStates.instantiateBcs()
    }
    return AssetActiveStates.cachedBcs
  }

  static fromFields(fields: Record<string, any>): AssetActiveStates {
    return AssetActiveStates.reified().new({
      base: decodeFromFields(
        WitTable.reified(
          phantom(BaseAssetActiveStates.reified()),
          TypeName.reified(),
          phantom('bool'),
        ),
        fields.base,
      ),
      collateral: decodeFromFields(
        WitTable.reified(
          phantom(CollateralActiveStates.reified()),
          TypeName.reified(),
          phantom('bool'),
        ),
        fields.collateral,
      ),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): AssetActiveStates {
    if (!isAssetActiveStates(item.type)) {
      throw new Error('not a AssetActiveStates type')
    }

    return AssetActiveStates.reified().new({
      base: decodeFromFieldsWithTypes(
        WitTable.reified(
          phantom(BaseAssetActiveStates.reified()),
          TypeName.reified(),
          phantom('bool'),
        ),
        item.fields.base,
      ),
      collateral: decodeFromFieldsWithTypes(
        WitTable.reified(
          phantom(CollateralActiveStates.reified()),
          TypeName.reified(),
          phantom('bool'),
        ),
        item.fields.collateral,
      ),
    })
  }

  static fromBcs(data: Uint8Array): AssetActiveStates {
    return AssetActiveStates.fromFields(AssetActiveStates.bcs.parse(data))
  }

  toJSONField(): AssetActiveStatesJSONField {
    return {
      base: this.base.toJSONField(),
      collateral: this.collateral.toJSONField(),
    }
  }

  toJSON(): AssetActiveStatesJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AssetActiveStates {
    return AssetActiveStates.reified().new({
      base: decodeFromJSONField(
        WitTable.reified(
          phantom(BaseAssetActiveStates.reified()),
          TypeName.reified(),
          phantom('bool'),
        ),
        field.base,
      ),
      collateral: decodeFromJSONField(
        WitTable.reified(
          phantom(CollateralActiveStates.reified()),
          TypeName.reified(),
          phantom('bool'),
        ),
        field.collateral,
      ),
    })
  }

  static fromJSON(json: Record<string, any>): AssetActiveStates {
    if (json.$typeName !== AssetActiveStates.$typeName) {
      throw new Error(
        `not a AssetActiveStates json object: expected '${AssetActiveStates.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return AssetActiveStates.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): AssetActiveStates {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAssetActiveStates(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AssetActiveStates object`)
    }
    return AssetActiveStates.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): AssetActiveStates {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAssetActiveStates(data.bcs.type)) {
        throw new Error(`object at is not a AssetActiveStates object`)
      }

      return AssetActiveStates.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AssetActiveStates.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<AssetActiveStates> {
    const res = await fetchObjectBcs(client, id)
    if (!isAssetActiveStates(res.type)) {
      throw new Error(`object at id ${id} is not a AssetActiveStates object`)
    }

    return AssetActiveStates.fromBcs(res.bcsBytes)
  }
}
