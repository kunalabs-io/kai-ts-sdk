/**
 * Piecewise-linear function implementation for modeling interest rate curves.
 *
 * This module provides utilities for creating and evaluating piecewise-linear functions,
 * commonly used in DeFi protocols for modeling interest rates that change based on
 * utilization levels or other parameters.
 */

import { bcs } from '@mysten/sui/bcs'
import { SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromBase64 } from '@mysten/sui/utils'
import { getTypeOrigin } from '../../_envs'
import {
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  fieldToJSON,
  phantom,
  PhantomReified,
  Reified,
  StructClass,
  ToField,
  ToJSON,
  ToTypeStr,
  vector,
} from '../../_framework/reified'
import {
  composeSuiType,
  compressSuiType,
  fetchObjectBcs,
  FieldsWithTypes,
  SupportedSuiClient,
} from '../../_framework/util'
import { Vector } from '../../_framework/vector'

/* ============================== Section =============================== */

export function isSection(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('kai-leverage', 'piecewise::Section')}::piecewise::Section`
}

export interface SectionFields {
  end: ToField<'u64'>
  endVal: ToField<'u64'>
}

export type SectionReified = Reified<Section, SectionFields>

export type SectionJSONField = {
  end: string
  endVal: string
}

export type SectionJSON = {
  $typeName: typeof Section.$typeName
  $typeArgs: []
} & SectionJSONField

/** A single piece of a piecewise-linear function. */
export class Section implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::piecewise::Section` = `${
    getTypeOrigin('kai-leverage', 'piecewise::Section')
  }::piecewise::Section` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof Section.$typeName = Section.$typeName
  readonly $fullTypeName: `${string}::piecewise::Section`
  readonly $typeArgs: []
  readonly $isPhantom: typeof Section.$isPhantom = Section.$isPhantom

  readonly end: ToField<'u64'>
  readonly endVal: ToField<'u64'>

  private constructor(typeArgs: [], fields: SectionFields) {
    this.$fullTypeName = composeSuiType(
      Section.$typeName,
      ...typeArgs,
    ) as `${string}::piecewise::Section`
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
        ...[],
      ) as `${string}::piecewise::Section`,
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
      fetch: async (client: SupportedSuiClient, id: string) => Section.fetch(client, id),
      new: (fields: SectionFields) => {
        return new Section([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): SectionReified {
    return Section.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Section>> {
    return phantom(Section.reified())
  }

  static get p(): PhantomReified<ToTypeStr<Section>> {
    return Section.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('Section', {
      end: bcs.u64(),
      end_val: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof Section.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof Section.instantiateBcs> {
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

  toJSONField(): SectionJSONField {
    return {
      end: this.end.toString(),
      endVal: this.endVal.toString(),
    }
  }

  toJSON(): SectionJSON {
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
      throw new Error(
        `not a Section json object: expected '${Section.$typeName}' but got '${json.$typeName}'`,
      )
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

      return Section.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Section.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<Section> {
    const res = await fetchObjectBcs(client, id)
    if (!isSection(res.type)) {
      throw new Error(`object at id ${id} is not a Section object`)
    }

    return Section.fromBcs(res.bcsBytes)
  }
}

/* ============================== Piecewise =============================== */

export function isPiecewise(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('kai-leverage', 'piecewise::Piecewise')}::piecewise::Piecewise`
}

export interface PiecewiseFields {
  start: ToField<'u64'>
  startVal: ToField<'u64'>
  sections: ToField<Vector<Section>>
}

export type PiecewiseReified = Reified<Piecewise, PiecewiseFields>

export type PiecewiseJSONField = {
  start: string
  startVal: string
  sections: ToJSON<Section>[]
}

export type PiecewiseJSON = {
  $typeName: typeof Piecewise.$typeName
  $typeArgs: []
} & PiecewiseJSONField

/** A piecewise-linear function defined by a start point and sections. */
export class Piecewise implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::piecewise::Piecewise` = `${
    getTypeOrigin('kai-leverage', 'piecewise::Piecewise')
  }::piecewise::Piecewise` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof Piecewise.$typeName = Piecewise.$typeName
  readonly $fullTypeName: `${string}::piecewise::Piecewise`
  readonly $typeArgs: []
  readonly $isPhantom: typeof Piecewise.$isPhantom = Piecewise.$isPhantom

  readonly start: ToField<'u64'>
  readonly startVal: ToField<'u64'>
  readonly sections: ToField<Vector<Section>>

  private constructor(typeArgs: [], fields: PiecewiseFields) {
    this.$fullTypeName = composeSuiType(
      Piecewise.$typeName,
      ...typeArgs,
    ) as `${string}::piecewise::Piecewise`
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
        ...[],
      ) as `${string}::piecewise::Piecewise`,
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
      fetch: async (client: SupportedSuiClient, id: string) => Piecewise.fetch(client, id),
      new: (fields: PiecewiseFields) => {
        return new Piecewise([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): PiecewiseReified {
    return Piecewise.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Piecewise>> {
    return phantom(Piecewise.reified())
  }

  static get p(): PhantomReified<ToTypeStr<Piecewise>> {
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

  static get bcs(): ReturnType<typeof Piecewise.instantiateBcs> {
    if (!Piecewise.cachedBcs) {
      Piecewise.cachedBcs = Piecewise.instantiateBcs()
    }
    return Piecewise.cachedBcs
  }

  static fromFields(fields: Record<string, any>): Piecewise {
    return Piecewise.reified().new({
      start: decodeFromFields('u64', fields.start),
      startVal: decodeFromFields('u64', fields.start_val),
      sections: decodeFromFields(vector(Section.reified()), fields.sections),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Piecewise {
    if (!isPiecewise(item.type)) {
      throw new Error('not a Piecewise type')
    }

    return Piecewise.reified().new({
      start: decodeFromFieldsWithTypes('u64', item.fields.start),
      startVal: decodeFromFieldsWithTypes('u64', item.fields.start_val),
      sections: decodeFromFieldsWithTypes(vector(Section.reified()), item.fields.sections),
    })
  }

  static fromBcs(data: Uint8Array): Piecewise {
    return Piecewise.fromFields(Piecewise.bcs.parse(data))
  }

  toJSONField(): PiecewiseJSONField {
    return {
      start: this.start.toString(),
      startVal: this.startVal.toString(),
      sections: fieldToJSON<Vector<Section>>(`vector<${Section.$typeName}>`, this.sections),
    }
  }

  toJSON(): PiecewiseJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Piecewise {
    return Piecewise.reified().new({
      start: decodeFromJSONField('u64', field.start),
      startVal: decodeFromJSONField('u64', field.startVal),
      sections: decodeFromJSONField(vector(Section.reified()), field.sections),
    })
  }

  static fromJSON(json: Record<string, any>): Piecewise {
    if (json.$typeName !== Piecewise.$typeName) {
      throw new Error(
        `not a Piecewise json object: expected '${Piecewise.$typeName}' but got '${json.$typeName}'`,
      )
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

      return Piecewise.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Piecewise.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<Piecewise> {
    const res = await fetchObjectBcs(client, id)
    if (!isPiecewise(res.type)) {
      throw new Error(`object at id ${id} is not a Piecewise object`)
    }

    return Piecewise.fromBcs(res.bcsBytes)
  }
}
