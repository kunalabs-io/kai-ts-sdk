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
  phantom,
} from '../../../../_framework/reified'
import {
  FieldsWithTypes,
  composeSuiType,
  compressSuiType,
  parseTypeName,
} from '../../../../_framework/util'
import { UID } from '../../../../sui/object/structs'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== DynamicMap =============================== */

export function isDynamicMap(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::dynamic_map::DynamicMap` + '<')
}

export interface DynamicMapFields<K extends PhantomTypeArgument> {
  id: ToField<UID>
  size: ToField<'u64'>
}

export type DynamicMapReified<K extends PhantomTypeArgument> = Reified<
  DynamicMap<K>,
  DynamicMapFields<K>
>

export class DynamicMap<K extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::dynamic_map::DynamicMap`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = DynamicMap.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::dynamic_map::DynamicMap<${PhantomToTypeStr<K>}>`
  readonly $typeArgs: [PhantomToTypeStr<K>]
  readonly $isPhantom = DynamicMap.$isPhantom

  readonly id: ToField<UID>
  readonly size: ToField<'u64'>

  private constructor(typeArgs: [PhantomToTypeStr<K>], fields: DynamicMapFields<K>) {
    this.$fullTypeName = composeSuiType(
      DynamicMap.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::dynamic_map::DynamicMap<${PhantomToTypeStr<K>}>`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.size = fields.size
  }

  static reified<K extends PhantomReified<PhantomTypeArgument>>(
    K: K
  ): DynamicMapReified<ToPhantomTypeArgument<K>> {
    const reifiedBcs = DynamicMap.bcs
    return {
      typeName: DynamicMap.$typeName,
      fullTypeName: composeSuiType(
        DynamicMap.$typeName,
        ...[extractType(K)]
      ) as `${typeof PKG_V1}::dynamic_map::DynamicMap<${PhantomToTypeStr<ToPhantomTypeArgument<K>>}>`,
      typeArgs: [extractType(K)] as [PhantomToTypeStr<ToPhantomTypeArgument<K>>],
      isPhantom: DynamicMap.$isPhantom,
      reifiedTypeArgs: [K],
      fromFields: (fields: Record<string, any>) => DynamicMap.fromFields(K, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => DynamicMap.fromFieldsWithTypes(K, item),
      fromBcs: (data: Uint8Array) => DynamicMap.fromFields(K, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => DynamicMap.fromJSONField(K, field),
      fromJSON: (json: Record<string, any>) => DynamicMap.fromJSON(K, json),
      fromSuiParsedData: (content: SuiParsedData) => DynamicMap.fromSuiParsedData(K, content),
      fromSuiObjectData: (content: SuiObjectData) => DynamicMap.fromSuiObjectData(K, content),
      fetch: async (client: SuiClient, id: string) => DynamicMap.fetch(client, K, id),
      new: (fields: DynamicMapFields<ToPhantomTypeArgument<K>>) => {
        return new DynamicMap([extractType(K)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return DynamicMap.reified
  }

  static phantom<K extends PhantomReified<PhantomTypeArgument>>(
    K: K
  ): PhantomReified<ToTypeStr<DynamicMap<ToPhantomTypeArgument<K>>>> {
    return phantom(DynamicMap.reified(K))
  }
  static get p() {
    return DynamicMap.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('DynamicMap', {
      id: UID.bcs,
      size: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof DynamicMap.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof DynamicMap.instantiateBcs> {
    if (!DynamicMap.cachedBcs) {
      DynamicMap.cachedBcs = DynamicMap.instantiateBcs()
    }
    return DynamicMap.cachedBcs
  }

  static fromFields<K extends PhantomReified<PhantomTypeArgument>>(
    typeArg: K,
    fields: Record<string, any>
  ): DynamicMap<ToPhantomTypeArgument<K>> {
    return DynamicMap.reified(typeArg).new({
      id: decodeFromFields(UID.reified(), fields.id),
      size: decodeFromFields('u64', fields.size),
    })
  }

  static fromFieldsWithTypes<K extends PhantomReified<PhantomTypeArgument>>(
    typeArg: K,
    item: FieldsWithTypes
  ): DynamicMap<ToPhantomTypeArgument<K>> {
    if (!isDynamicMap(item.type)) {
      throw new Error('not a DynamicMap type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return DynamicMap.reified(typeArg).new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      size: decodeFromFieldsWithTypes('u64', item.fields.size),
    })
  }

  static fromBcs<K extends PhantomReified<PhantomTypeArgument>>(
    typeArg: K,
    data: Uint8Array
  ): DynamicMap<ToPhantomTypeArgument<K>> {
    return DynamicMap.fromFields(typeArg, DynamicMap.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      size: this.size.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<K extends PhantomReified<PhantomTypeArgument>>(
    typeArg: K,
    field: any
  ): DynamicMap<ToPhantomTypeArgument<K>> {
    return DynamicMap.reified(typeArg).new({
      id: decodeFromJSONField(UID.reified(), field.id),
      size: decodeFromJSONField('u64', field.size),
    })
  }

  static fromJSON<K extends PhantomReified<PhantomTypeArgument>>(
    typeArg: K,
    json: Record<string, any>
  ): DynamicMap<ToPhantomTypeArgument<K>> {
    if (json.$typeName !== DynamicMap.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(DynamicMap.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return DynamicMap.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<K extends PhantomReified<PhantomTypeArgument>>(
    typeArg: K,
    content: SuiParsedData
  ): DynamicMap<ToPhantomTypeArgument<K>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isDynamicMap(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a DynamicMap object`)
    }
    return DynamicMap.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<K extends PhantomReified<PhantomTypeArgument>>(
    typeArg: K,
    data: SuiObjectData
  ): DynamicMap<ToPhantomTypeArgument<K>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isDynamicMap(data.bcs.type)) {
        throw new Error(`object at is not a DynamicMap object`)
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

      return DynamicMap.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return DynamicMap.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<K extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: K,
    id: string
  ): Promise<DynamicMap<ToPhantomTypeArgument<K>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching DynamicMap object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isDynamicMap(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a DynamicMap object`)
    }

    return DynamicMap.fromSuiObjectData(typeArg, res.data)
  }
}
