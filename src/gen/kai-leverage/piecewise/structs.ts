import * as reified from '../../_framework/reified'
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
} from '../../_framework/reified'
import { FieldsWithTypes, composeSuiType, compressSuiType } from '../../_framework/util'
import { Vector } from '../../_framework/vector'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== Section =============================== */

export function isSection(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::piecewise::Section`
}

export interface SectionFields {
  end: ToField<'u64'>
  endVal: ToField<'u64'>
}

export type SectionReified = Reified<Section, SectionFields>

export class Section implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::piecewise::Section`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = Section.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::piecewise::Section`
  readonly $typeArgs: []
  readonly $isPhantom = Section.$isPhantom

  readonly end: ToField<'u64'>
  readonly endVal: ToField<'u64'>

  private constructor(typeArgs: [], fields: SectionFields) {
    this.$fullTypeName = composeSuiType(
      Section.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::piecewise::Section`
    this.$typeArgs = typeArgs

    this.end = fields.end
    this.endVal = fields.endVal
  }

  static reified(): SectionReified {
    const reifiedBcs = Section.bcs
    return {
      typeName: Section.$typeName,
      fullTypeName: composeSuiType(
        Section.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::piecewise::Section`,
      typeArgs: [] as [],
      isPhantom: Section.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Section.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Section.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Section.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Section.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Section.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => Section.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Section.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => Section.fetch(client, id),
      new: (fields: SectionFields) => {
        return new Section([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return Section.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Section>> {
    return phantom(Section.reified())
  }
  static get p() {
    return Section.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('Section', {
      end: bcs.u64(),
      end_val: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof Section.instantiateBcs> | null = null

  static get bcs() {
    if (!Section.cachedBcs) {
      Section.cachedBcs = Section.instantiateBcs()
    }
    return Section.cachedBcs
  }

  static fromFields(fields: Record<string, any>): Section {
    return Section.reified().new({
      end: decodeFromFields('u64', fields.end),
      endVal: decodeFromFields('u64', fields.end_val),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Section {
    if (!isSection(item.type)) {
      throw new Error('not a Section type')
    }

    return Section.reified().new({
      end: decodeFromFieldsWithTypes('u64', item.fields.end),
      endVal: decodeFromFieldsWithTypes('u64', item.fields.end_val),
    })
  }

  static fromBcs(data: Uint8Array): Section {
    return Section.fromFields(Section.bcs.parse(data))
  }

  toJSONField() {
    return {
      end: this.end.toString(),
      endVal: this.endVal.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Section {
    return Section.reified().new({
      end: decodeFromJSONField('u64', field.end),
      endVal: decodeFromJSONField('u64', field.endVal),
    })
  }

  static fromJSON(json: Record<string, any>): Section {
    if (json.$typeName !== Section.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return Section.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): Section {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isSection(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Section object`)
    }
    return Section.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): Section {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isSection(data.bcs.type)) {
        throw new Error(`object at is not a Section object`)
      }

      return Section.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Section.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<Section> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching Section object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isSection(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Section object`)
    }

    return Section.fromSuiObjectData(res.data)
  }
}

/* ============================== Piecewise =============================== */

export function isPiecewise(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::piecewise::Piecewise`
}

export interface PiecewiseFields {
  start: ToField<'u64'>
  startVal: ToField<'u64'>
  sections: ToField<Vector<Section>>
}

export type PiecewiseReified = Reified<Piecewise, PiecewiseFields>

export class Piecewise implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::piecewise::Piecewise`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = Piecewise.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::piecewise::Piecewise`
  readonly $typeArgs: []
  readonly $isPhantom = Piecewise.$isPhantom

  readonly start: ToField<'u64'>
  readonly startVal: ToField<'u64'>
  readonly sections: ToField<Vector<Section>>

  private constructor(typeArgs: [], fields: PiecewiseFields) {
    this.$fullTypeName = composeSuiType(
      Piecewise.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::piecewise::Piecewise`
    this.$typeArgs = typeArgs

    this.start = fields.start
    this.startVal = fields.startVal
    this.sections = fields.sections
  }

  static reified(): PiecewiseReified {
    const reifiedBcs = Piecewise.bcs
    return {
      typeName: Piecewise.$typeName,
      fullTypeName: composeSuiType(
        Piecewise.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::piecewise::Piecewise`,
      typeArgs: [] as [],
      isPhantom: Piecewise.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Piecewise.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Piecewise.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Piecewise.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Piecewise.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Piecewise.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => Piecewise.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Piecewise.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => Piecewise.fetch(client, id),
      new: (fields: PiecewiseFields) => {
        return new Piecewise([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return Piecewise.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Piecewise>> {
    return phantom(Piecewise.reified())
  }
  static get p() {
    return Piecewise.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('Piecewise', {
      start: bcs.u64(),
      start_val: bcs.u64(),
      sections: bcs.vector(Section.bcs),
    })
  }

  private static cachedBcs: ReturnType<typeof Piecewise.instantiateBcs> | null = null

  static get bcs() {
    if (!Piecewise.cachedBcs) {
      Piecewise.cachedBcs = Piecewise.instantiateBcs()
    }
    return Piecewise.cachedBcs
  }

  static fromFields(fields: Record<string, any>): Piecewise {
    return Piecewise.reified().new({
      start: decodeFromFields('u64', fields.start),
      startVal: decodeFromFields('u64', fields.start_val),
      sections: decodeFromFields(reified.vector(Section.reified()), fields.sections),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Piecewise {
    if (!isPiecewise(item.type)) {
      throw new Error('not a Piecewise type')
    }

    return Piecewise.reified().new({
      start: decodeFromFieldsWithTypes('u64', item.fields.start),
      startVal: decodeFromFieldsWithTypes('u64', item.fields.start_val),
      sections: decodeFromFieldsWithTypes(reified.vector(Section.reified()), item.fields.sections),
    })
  }

  static fromBcs(data: Uint8Array): Piecewise {
    return Piecewise.fromFields(Piecewise.bcs.parse(data))
  }

  toJSONField() {
    return {
      start: this.start.toString(),
      startVal: this.startVal.toString(),
      sections: fieldToJSON<Vector<Section>>(`vector<${Section.$typeName}>`, this.sections),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Piecewise {
    return Piecewise.reified().new({
      start: decodeFromJSONField('u64', field.start),
      startVal: decodeFromJSONField('u64', field.startVal),
      sections: decodeFromJSONField(reified.vector(Section.reified()), field.sections),
    })
  }

  static fromJSON(json: Record<string, any>): Piecewise {
    if (json.$typeName !== Piecewise.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return Piecewise.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): Piecewise {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPiecewise(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Piecewise object`)
    }
    return Piecewise.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): Piecewise {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPiecewise(data.bcs.type)) {
        throw new Error(`object at is not a Piecewise object`)
      }

      return Piecewise.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Piecewise.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<Piecewise> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching Piecewise object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isPiecewise(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Piecewise object`)
    }

    return Piecewise.fromSuiObjectData(res.data)
  }
}
