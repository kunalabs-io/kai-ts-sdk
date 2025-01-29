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
import { TreasuryCap } from '../../../../sui/coin/structs'
import { UID } from '../../../../sui/object/structs'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== WrappedAssetSetup =============================== */

export function isWrappedAssetSetup(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::create_wrapped::WrappedAssetSetup` + '<')
}

export interface WrappedAssetSetupFields<
  T0 extends PhantomTypeArgument,
  T1 extends PhantomTypeArgument,
> {
  id: ToField<UID>
  treasuryCap: ToField<TreasuryCap<T0>>
}

export type WrappedAssetSetupReified<
  T0 extends PhantomTypeArgument,
  T1 extends PhantomTypeArgument,
> = Reified<WrappedAssetSetup<T0, T1>, WrappedAssetSetupFields<T0, T1>>

export class WrappedAssetSetup<T0 extends PhantomTypeArgument, T1 extends PhantomTypeArgument>
  implements StructClass
{
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::create_wrapped::WrappedAssetSetup`
  static readonly $numTypeParams = 2
  static readonly $isPhantom = [true, true] as const

  readonly $typeName = WrappedAssetSetup.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::create_wrapped::WrappedAssetSetup<${PhantomToTypeStr<T0>}, ${PhantomToTypeStr<T1>}>`
  readonly $typeArgs: [PhantomToTypeStr<T0>, PhantomToTypeStr<T1>]
  readonly $isPhantom = WrappedAssetSetup.$isPhantom

  readonly id: ToField<UID>
  readonly treasuryCap: ToField<TreasuryCap<T0>>

  private constructor(
    typeArgs: [PhantomToTypeStr<T0>, PhantomToTypeStr<T1>],
    fields: WrappedAssetSetupFields<T0, T1>
  ) {
    this.$fullTypeName = composeSuiType(
      WrappedAssetSetup.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::create_wrapped::WrappedAssetSetup<${PhantomToTypeStr<T0>}, ${PhantomToTypeStr<T1>}>`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.treasuryCap = fields.treasuryCap
  }

  static reified<
    T0 extends PhantomReified<PhantomTypeArgument>,
    T1 extends PhantomReified<PhantomTypeArgument>,
  >(
    T0: T0,
    T1: T1
  ): WrappedAssetSetupReified<ToPhantomTypeArgument<T0>, ToPhantomTypeArgument<T1>> {
    return {
      typeName: WrappedAssetSetup.$typeName,
      fullTypeName: composeSuiType(
        WrappedAssetSetup.$typeName,
        ...[extractType(T0), extractType(T1)]
      ) as `${typeof PKG_V1}::create_wrapped::WrappedAssetSetup<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}, ${PhantomToTypeStr<ToPhantomTypeArgument<T1>>}>`,
      typeArgs: [extractType(T0), extractType(T1)] as [
        PhantomToTypeStr<ToPhantomTypeArgument<T0>>,
        PhantomToTypeStr<ToPhantomTypeArgument<T1>>,
      ],
      isPhantom: WrappedAssetSetup.$isPhantom,
      reifiedTypeArgs: [T0, T1],
      fromFields: (fields: Record<string, any>) => WrappedAssetSetup.fromFields([T0, T1], fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        WrappedAssetSetup.fromFieldsWithTypes([T0, T1], item),
      fromBcs: (data: Uint8Array) => WrappedAssetSetup.fromBcs([T0, T1], data),
      bcs: WrappedAssetSetup.bcs,
      fromJSONField: (field: any) => WrappedAssetSetup.fromJSONField([T0, T1], field),
      fromJSON: (json: Record<string, any>) => WrappedAssetSetup.fromJSON([T0, T1], json),
      fromSuiParsedData: (content: SuiParsedData) =>
        WrappedAssetSetup.fromSuiParsedData([T0, T1], content),
      fromSuiObjectData: (content: SuiObjectData) =>
        WrappedAssetSetup.fromSuiObjectData([T0, T1], content),
      fetch: async (client: SuiClient, id: string) => WrappedAssetSetup.fetch(client, [T0, T1], id),
      new: (
        fields: WrappedAssetSetupFields<ToPhantomTypeArgument<T0>, ToPhantomTypeArgument<T1>>
      ) => {
        return new WrappedAssetSetup([extractType(T0), extractType(T1)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return WrappedAssetSetup.reified
  }

  static phantom<
    T0 extends PhantomReified<PhantomTypeArgument>,
    T1 extends PhantomReified<PhantomTypeArgument>,
  >(
    T0: T0,
    T1: T1
  ): PhantomReified<
    ToTypeStr<WrappedAssetSetup<ToPhantomTypeArgument<T0>, ToPhantomTypeArgument<T1>>>
  > {
    return phantom(WrappedAssetSetup.reified(T0, T1))
  }
  static get p() {
    return WrappedAssetSetup.phantom
  }

  static get bcs() {
    return bcs.struct('WrappedAssetSetup', {
      id: UID.bcs,
      treasury_cap: TreasuryCap.bcs,
    })
  }

  static fromFields<
    T0 extends PhantomReified<PhantomTypeArgument>,
    T1 extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T0, T1],
    fields: Record<string, any>
  ): WrappedAssetSetup<ToPhantomTypeArgument<T0>, ToPhantomTypeArgument<T1>> {
    return WrappedAssetSetup.reified(typeArgs[0], typeArgs[1]).new({
      id: decodeFromFields(UID.reified(), fields.id),
      treasuryCap: decodeFromFields(TreasuryCap.reified(typeArgs[0]), fields.treasury_cap),
    })
  }

  static fromFieldsWithTypes<
    T0 extends PhantomReified<PhantomTypeArgument>,
    T1 extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T0, T1],
    item: FieldsWithTypes
  ): WrappedAssetSetup<ToPhantomTypeArgument<T0>, ToPhantomTypeArgument<T1>> {
    if (!isWrappedAssetSetup(item.type)) {
      throw new Error('not a WrappedAssetSetup type')
    }
    assertFieldsWithTypesArgsMatch(item, typeArgs)

    return WrappedAssetSetup.reified(typeArgs[0], typeArgs[1]).new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      treasuryCap: decodeFromFieldsWithTypes(
        TreasuryCap.reified(typeArgs[0]),
        item.fields.treasury_cap
      ),
    })
  }

  static fromBcs<
    T0 extends PhantomReified<PhantomTypeArgument>,
    T1 extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T0, T1],
    data: Uint8Array
  ): WrappedAssetSetup<ToPhantomTypeArgument<T0>, ToPhantomTypeArgument<T1>> {
    return WrappedAssetSetup.fromFields(typeArgs, WrappedAssetSetup.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      treasuryCap: this.treasuryCap.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<
    T0 extends PhantomReified<PhantomTypeArgument>,
    T1 extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T0, T1],
    field: any
  ): WrappedAssetSetup<ToPhantomTypeArgument<T0>, ToPhantomTypeArgument<T1>> {
    return WrappedAssetSetup.reified(typeArgs[0], typeArgs[1]).new({
      id: decodeFromJSONField(UID.reified(), field.id),
      treasuryCap: decodeFromJSONField(TreasuryCap.reified(typeArgs[0]), field.treasuryCap),
    })
  }

  static fromJSON<
    T0 extends PhantomReified<PhantomTypeArgument>,
    T1 extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T0, T1],
    json: Record<string, any>
  ): WrappedAssetSetup<ToPhantomTypeArgument<T0>, ToPhantomTypeArgument<T1>> {
    if (json.$typeName !== WrappedAssetSetup.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(WrappedAssetSetup.$typeName, ...typeArgs.map(extractType)),
      json.$typeArgs,
      typeArgs
    )

    return WrappedAssetSetup.fromJSONField(typeArgs, json)
  }

  static fromSuiParsedData<
    T0 extends PhantomReified<PhantomTypeArgument>,
    T1 extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T0, T1],
    content: SuiParsedData
  ): WrappedAssetSetup<ToPhantomTypeArgument<T0>, ToPhantomTypeArgument<T1>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isWrappedAssetSetup(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a WrappedAssetSetup object`)
    }
    return WrappedAssetSetup.fromFieldsWithTypes(typeArgs, content)
  }

  static fromSuiObjectData<
    T0 extends PhantomReified<PhantomTypeArgument>,
    T1 extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T0, T1],
    data: SuiObjectData
  ): WrappedAssetSetup<ToPhantomTypeArgument<T0>, ToPhantomTypeArgument<T1>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isWrappedAssetSetup(data.bcs.type)) {
        throw new Error(`object at is not a WrappedAssetSetup object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 2) {
        throw new Error(
          `type argument mismatch: expected 2 type arguments but got ${gotTypeArgs.length}`
        )
      }
      for (let i = 0; i < 2; i++) {
        const gotTypeArg = compressSuiType(gotTypeArgs[i])
        const expectedTypeArg = compressSuiType(extractType(typeArgs[i]))
        if (gotTypeArg !== expectedTypeArg) {
          throw new Error(
            `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`
          )
        }
      }

      return WrappedAssetSetup.fromBcs(typeArgs, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return WrappedAssetSetup.fromSuiParsedData(typeArgs, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<
    T0 extends PhantomReified<PhantomTypeArgument>,
    T1 extends PhantomReified<PhantomTypeArgument>,
  >(
    client: SuiClient,
    typeArgs: [T0, T1],
    id: string
  ): Promise<WrappedAssetSetup<ToPhantomTypeArgument<T0>, ToPhantomTypeArgument<T1>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching WrappedAssetSetup object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isWrappedAssetSetup(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a WrappedAssetSetup object`)
    }

    return WrappedAssetSetup.fromSuiObjectData(typeArgs, res.data)
  }
}
