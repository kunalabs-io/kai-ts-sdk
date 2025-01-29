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
import { EquityTreasury } from '../../../../kai-leverage/equity/structs'
import { UID } from '../../../../sui/object/structs'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== PoolCreationTicket =============================== */

export function isPoolCreationTicket(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::init::PoolCreationTicket` + '<')
}

export interface PoolCreationTicketFields<
  T extends PhantomTypeArgument,
  ST extends PhantomTypeArgument,
> {
  id: ToField<UID>
  treasury: ToField<EquityTreasury<ST>>
}

export type PoolCreationTicketReified<
  T extends PhantomTypeArgument,
  ST extends PhantomTypeArgument,
> = Reified<PoolCreationTicket<T, ST>, PoolCreationTicketFields<T, ST>>

export class PoolCreationTicket<T extends PhantomTypeArgument, ST extends PhantomTypeArgument>
  implements StructClass
{
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::init::PoolCreationTicket`
  static readonly $numTypeParams = 2
  static readonly $isPhantom = [true, true] as const

  readonly $typeName = PoolCreationTicket.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::init::PoolCreationTicket<${PhantomToTypeStr<T>}, ${PhantomToTypeStr<ST>}>`
  readonly $typeArgs: [PhantomToTypeStr<T>, PhantomToTypeStr<ST>]
  readonly $isPhantom = PoolCreationTicket.$isPhantom

  readonly id: ToField<UID>
  readonly treasury: ToField<EquityTreasury<ST>>

  private constructor(
    typeArgs: [PhantomToTypeStr<T>, PhantomToTypeStr<ST>],
    fields: PoolCreationTicketFields<T, ST>
  ) {
    this.$fullTypeName = composeSuiType(
      PoolCreationTicket.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::init::PoolCreationTicket<${PhantomToTypeStr<T>}, ${PhantomToTypeStr<ST>}>`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.treasury = fields.treasury
  }

  static reified<
    T extends PhantomReified<PhantomTypeArgument>,
    ST extends PhantomReified<PhantomTypeArgument>,
  >(T: T, ST: ST): PoolCreationTicketReified<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<ST>> {
    return {
      typeName: PoolCreationTicket.$typeName,
      fullTypeName: composeSuiType(
        PoolCreationTicket.$typeName,
        ...[extractType(T), extractType(ST)]
      ) as `${typeof PKG_V1}::init::PoolCreationTicket<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}, ${PhantomToTypeStr<ToPhantomTypeArgument<ST>>}>`,
      typeArgs: [extractType(T), extractType(ST)] as [
        PhantomToTypeStr<ToPhantomTypeArgument<T>>,
        PhantomToTypeStr<ToPhantomTypeArgument<ST>>,
      ],
      isPhantom: PoolCreationTicket.$isPhantom,
      reifiedTypeArgs: [T, ST],
      fromFields: (fields: Record<string, any>) => PoolCreationTicket.fromFields([T, ST], fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        PoolCreationTicket.fromFieldsWithTypes([T, ST], item),
      fromBcs: (data: Uint8Array) => PoolCreationTicket.fromBcs([T, ST], data),
      bcs: PoolCreationTicket.bcs,
      fromJSONField: (field: any) => PoolCreationTicket.fromJSONField([T, ST], field),
      fromJSON: (json: Record<string, any>) => PoolCreationTicket.fromJSON([T, ST], json),
      fromSuiParsedData: (content: SuiParsedData) =>
        PoolCreationTicket.fromSuiParsedData([T, ST], content),
      fromSuiObjectData: (content: SuiObjectData) =>
        PoolCreationTicket.fromSuiObjectData([T, ST], content),
      fetch: async (client: SuiClient, id: string) => PoolCreationTicket.fetch(client, [T, ST], id),
      new: (
        fields: PoolCreationTicketFields<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<ST>>
      ) => {
        return new PoolCreationTicket([extractType(T), extractType(ST)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return PoolCreationTicket.reified
  }

  static phantom<
    T extends PhantomReified<PhantomTypeArgument>,
    ST extends PhantomReified<PhantomTypeArgument>,
  >(
    T: T,
    ST: ST
  ): PhantomReified<
    ToTypeStr<PoolCreationTicket<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<ST>>>
  > {
    return phantom(PoolCreationTicket.reified(T, ST))
  }
  static get p() {
    return PoolCreationTicket.phantom
  }

  static get bcs() {
    return bcs.struct('PoolCreationTicket', {
      id: UID.bcs,
      treasury: EquityTreasury.bcs,
    })
  }

  static fromFields<
    T extends PhantomReified<PhantomTypeArgument>,
    ST extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, ST],
    fields: Record<string, any>
  ): PoolCreationTicket<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<ST>> {
    return PoolCreationTicket.reified(typeArgs[0], typeArgs[1]).new({
      id: decodeFromFields(UID.reified(), fields.id),
      treasury: decodeFromFields(EquityTreasury.reified(typeArgs[1]), fields.treasury),
    })
  }

  static fromFieldsWithTypes<
    T extends PhantomReified<PhantomTypeArgument>,
    ST extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, ST],
    item: FieldsWithTypes
  ): PoolCreationTicket<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<ST>> {
    if (!isPoolCreationTicket(item.type)) {
      throw new Error('not a PoolCreationTicket type')
    }
    assertFieldsWithTypesArgsMatch(item, typeArgs)

    return PoolCreationTicket.reified(typeArgs[0], typeArgs[1]).new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      treasury: decodeFromFieldsWithTypes(
        EquityTreasury.reified(typeArgs[1]),
        item.fields.treasury
      ),
    })
  }

  static fromBcs<
    T extends PhantomReified<PhantomTypeArgument>,
    ST extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, ST],
    data: Uint8Array
  ): PoolCreationTicket<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<ST>> {
    return PoolCreationTicket.fromFields(typeArgs, PoolCreationTicket.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      treasury: this.treasury.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<
    T extends PhantomReified<PhantomTypeArgument>,
    ST extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, ST],
    field: any
  ): PoolCreationTicket<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<ST>> {
    return PoolCreationTicket.reified(typeArgs[0], typeArgs[1]).new({
      id: decodeFromJSONField(UID.reified(), field.id),
      treasury: decodeFromJSONField(EquityTreasury.reified(typeArgs[1]), field.treasury),
    })
  }

  static fromJSON<
    T extends PhantomReified<PhantomTypeArgument>,
    ST extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, ST],
    json: Record<string, any>
  ): PoolCreationTicket<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<ST>> {
    if (json.$typeName !== PoolCreationTicket.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(PoolCreationTicket.$typeName, ...typeArgs.map(extractType)),
      json.$typeArgs,
      typeArgs
    )

    return PoolCreationTicket.fromJSONField(typeArgs, json)
  }

  static fromSuiParsedData<
    T extends PhantomReified<PhantomTypeArgument>,
    ST extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, ST],
    content: SuiParsedData
  ): PoolCreationTicket<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<ST>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPoolCreationTicket(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PoolCreationTicket object`)
    }
    return PoolCreationTicket.fromFieldsWithTypes(typeArgs, content)
  }

  static fromSuiObjectData<
    T extends PhantomReified<PhantomTypeArgument>,
    ST extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, ST],
    data: SuiObjectData
  ): PoolCreationTicket<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<ST>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPoolCreationTicket(data.bcs.type)) {
        throw new Error(`object at is not a PoolCreationTicket object`)
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

      return PoolCreationTicket.fromBcs(typeArgs, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PoolCreationTicket.fromSuiParsedData(typeArgs, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<
    T extends PhantomReified<PhantomTypeArgument>,
    ST extends PhantomReified<PhantomTypeArgument>,
  >(
    client: SuiClient,
    typeArgs: [T, ST],
    id: string
  ): Promise<PoolCreationTicket<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<ST>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching PoolCreationTicket object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isPoolCreationTicket(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a PoolCreationTicket object`)
    }

    return PoolCreationTicket.fromSuiObjectData(typeArgs, res.data)
  }
}
