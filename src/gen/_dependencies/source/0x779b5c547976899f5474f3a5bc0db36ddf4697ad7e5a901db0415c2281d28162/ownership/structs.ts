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
import { ID, UID } from '../../../../sui/object/structs'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== Ownership =============================== */

export function isOwnership(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::ownership::Ownership` + '<')
}

export interface OwnershipFields<T0 extends PhantomTypeArgument> {
  id: ToField<UID>
  of: ToField<ID>
}

export type OwnershipReified<T0 extends PhantomTypeArgument> = Reified<
  Ownership<T0>,
  OwnershipFields<T0>
>

export class Ownership<T0 extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::ownership::Ownership`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = Ownership.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::ownership::Ownership<${PhantomToTypeStr<T0>}>`
  readonly $typeArgs: [PhantomToTypeStr<T0>]
  readonly $isPhantom = Ownership.$isPhantom

  readonly id: ToField<UID>
  readonly of: ToField<ID>

  private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: OwnershipFields<T0>) {
    this.$fullTypeName = composeSuiType(
      Ownership.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::ownership::Ownership<${PhantomToTypeStr<T0>}>`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.of = fields.of
  }

  static reified<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0
  ): OwnershipReified<ToPhantomTypeArgument<T0>> {
    const reifiedBcs = Ownership.bcs
    return {
      typeName: Ownership.$typeName,
      fullTypeName: composeSuiType(
        Ownership.$typeName,
        ...[extractType(T0)]
      ) as `${typeof PKG_V1}::ownership::Ownership<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`,
      typeArgs: [extractType(T0)] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>],
      isPhantom: Ownership.$isPhantom,
      reifiedTypeArgs: [T0],
      fromFields: (fields: Record<string, any>) => Ownership.fromFields(T0, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Ownership.fromFieldsWithTypes(T0, item),
      fromBcs: (data: Uint8Array) => Ownership.fromFields(T0, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Ownership.fromJSONField(T0, field),
      fromJSON: (json: Record<string, any>) => Ownership.fromJSON(T0, json),
      fromSuiParsedData: (content: SuiParsedData) => Ownership.fromSuiParsedData(T0, content),
      fromSuiObjectData: (content: SuiObjectData) => Ownership.fromSuiObjectData(T0, content),
      fetch: async (client: SuiClient, id: string) => Ownership.fetch(client, T0, id),
      new: (fields: OwnershipFields<ToPhantomTypeArgument<T0>>) => {
        return new Ownership([extractType(T0)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return Ownership.reified
  }

  static phantom<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0
  ): PhantomReified<ToTypeStr<Ownership<ToPhantomTypeArgument<T0>>>> {
    return phantom(Ownership.reified(T0))
  }
  static get p() {
    return Ownership.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('Ownership', {
      id: UID.bcs,
      of: ID.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof Ownership.instantiateBcs> | null = null

  static get bcs() {
    if (!Ownership.cachedBcs) {
      Ownership.cachedBcs = Ownership.instantiateBcs()
    }
    return Ownership.cachedBcs
  }

  static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    fields: Record<string, any>
  ): Ownership<ToPhantomTypeArgument<T0>> {
    return Ownership.reified(typeArg).new({
      id: decodeFromFields(UID.reified(), fields.id),
      of: decodeFromFields(ID.reified(), fields.of),
    })
  }

  static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    item: FieldsWithTypes
  ): Ownership<ToPhantomTypeArgument<T0>> {
    if (!isOwnership(item.type)) {
      throw new Error('not a Ownership type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return Ownership.reified(typeArg).new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      of: decodeFromFieldsWithTypes(ID.reified(), item.fields.of),
    })
  }

  static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: Uint8Array
  ): Ownership<ToPhantomTypeArgument<T0>> {
    return Ownership.fromFields(typeArg, Ownership.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      of: this.of,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    field: any
  ): Ownership<ToPhantomTypeArgument<T0>> {
    return Ownership.reified(typeArg).new({
      id: decodeFromJSONField(UID.reified(), field.id),
      of: decodeFromJSONField(ID.reified(), field.of),
    })
  }

  static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    json: Record<string, any>
  ): Ownership<ToPhantomTypeArgument<T0>> {
    if (json.$typeName !== Ownership.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(Ownership.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return Ownership.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    content: SuiParsedData
  ): Ownership<ToPhantomTypeArgument<T0>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isOwnership(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Ownership object`)
    }
    return Ownership.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: SuiObjectData
  ): Ownership<ToPhantomTypeArgument<T0>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isOwnership(data.bcs.type)) {
        throw new Error(`object at is not a Ownership object`)
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

      return Ownership.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Ownership.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T0,
    id: string
  ): Promise<Ownership<ToPhantomTypeArgument<T0>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching Ownership object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isOwnership(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Ownership object`)
    }

    return Ownership.fromSuiObjectData(typeArg, res.data)
  }
}
