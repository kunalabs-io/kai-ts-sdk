/**
 * This module implements a mechanism to parse and verify VAAs, which are
 * verified Wormhole messages (messages with Guardian signatures attesting to
 * its observation). Signatures on VAA are checked against an existing Guardian
 * set that exists in the `State` (see `wormhole::state`).
 *
 * A Wormhole integrator is discouraged from integrating `parse_and_verify` in
 * his contract. If there is a breaking change to the `vaa` module, Wormhole
 * will be upgraded to prevent previous build versions of this module to work.
 * If an integrator happened to use `parse_and_verify` in his contract, he will
 * need to be prepared to upgrade his contract to take the change (by building
 * with the latest package implementation).
 *
 * Instead, an integrator is encouraged to execute a transaction block, which
 * executes `parse_and_verify` from the latest Wormhole package ID and to
 * implement his methods that require redeeming a VAA to take `VAA` as an
 * argument.
 *
 * A good example of how this methodology is implemented is how the Token
 * Bridge contract redeems its VAAs.
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
import { Bytes32 } from '../bytes32/structs'
import { ExternalAddress } from '../external-address/structs'

/* ============================== VAA =============================== */

export function isVAA(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('wormhole', 'vaa::VAA')}::vaa::VAA`
}

export interface VAAFields {
  /**
   * Guardian set index of Guardians that attested to observing the
   * Wormhole message.
   */
  guardianSetIndex: ToField<'u32'>
  /** Time when Wormhole message was emitted or observed. */
  timestamp: ToField<'u32'>
  /** A.K.A. Batch ID. */
  nonce: ToField<'u32'>
  /** Wormhole chain ID from which network the message originated from. */
  emitterChain: ToField<'u16'>
  /**
   * Address of contract (standardized to 32 bytes) that produced the
   * message.
   */
  emitterAddress: ToField<ExternalAddress>
  /** Sequence number of emitter's Wormhole message. */
  sequence: ToField<'u64'>
  /** A.K.A. Finality. */
  consistencyLevel: ToField<'u8'>
  /** Arbitrary payload encoding data relevant to receiver. */
  payload: ToField<Vector<'u8'>>
  /** Double Keccak256 hash of message body. */
  digest: ToField<Bytes32>
}

export type VAAReified = Reified<VAA, VAAFields>

export type VAAJSONField = {
  guardianSetIndex: number
  timestamp: number
  nonce: number
  emitterChain: number
  emitterAddress: ToJSON<ExternalAddress>
  sequence: string
  consistencyLevel: number
  payload: number[]
  digest: ToJSON<Bytes32>
}

export type VAAJSON = {
  $typeName: typeof VAA.$typeName
  $typeArgs: []
} & VAAJSONField

/**
 * Container storing verified Wormhole message info. This struct also
 * caches the digest, which is a double Keccak256 hash of the message body.
 */
export class VAA implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::vaa::VAA` = `${
    getTypeOrigin('wormhole', 'vaa::VAA')
  }::vaa::VAA` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof VAA.$typeName = VAA.$typeName
  readonly $fullTypeName: `${string}::vaa::VAA`
  readonly $typeArgs: []
  readonly $isPhantom: typeof VAA.$isPhantom = VAA.$isPhantom

  /**
   * Guardian set index of Guardians that attested to observing the
   * Wormhole message.
   */
  readonly guardianSetIndex: ToField<'u32'>
  /** Time when Wormhole message was emitted or observed. */
  readonly timestamp: ToField<'u32'>
  /** A.K.A. Batch ID. */
  readonly nonce: ToField<'u32'>
  /** Wormhole chain ID from which network the message originated from. */
  readonly emitterChain: ToField<'u16'>
  /**
   * Address of contract (standardized to 32 bytes) that produced the
   * message.
   */
  readonly emitterAddress: ToField<ExternalAddress>
  /** Sequence number of emitter's Wormhole message. */
  readonly sequence: ToField<'u64'>
  /** A.K.A. Finality. */
  readonly consistencyLevel: ToField<'u8'>
  /** Arbitrary payload encoding data relevant to receiver. */
  readonly payload: ToField<Vector<'u8'>>
  /** Double Keccak256 hash of message body. */
  readonly digest: ToField<Bytes32>

  private constructor(typeArgs: [], fields: VAAFields) {
    this.$fullTypeName = composeSuiType(
      VAA.$typeName,
      ...typeArgs,
    ) as `${string}::vaa::VAA`
    this.$typeArgs = typeArgs

    this.guardianSetIndex = fields.guardianSetIndex
    this.timestamp = fields.timestamp
    this.nonce = fields.nonce
    this.emitterChain = fields.emitterChain
    this.emitterAddress = fields.emitterAddress
    this.sequence = fields.sequence
    this.consistencyLevel = fields.consistencyLevel
    this.payload = fields.payload
    this.digest = fields.digest
  }

  static reified(): VAAReified {
    const reifiedBcs = VAA.bcs
    return {
      typeName: VAA.$typeName,
      fullTypeName: composeSuiType(
        VAA.$typeName,
        ...[],
      ) as `${string}::vaa::VAA`,
      typeArgs: [] as [],
      isPhantom: VAA.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => VAA.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => VAA.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => VAA.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => VAA.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => VAA.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => VAA.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => VAA.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => VAA.fetch(client, id),
      new: (fields: VAAFields) => {
        return new VAA([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): VAAReified {
    return VAA.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<VAA>> {
    return phantom(VAA.reified())
  }

  static get p(): PhantomReified<ToTypeStr<VAA>> {
    return VAA.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('VAA', {
      guardian_set_index: bcs.u32(),
      timestamp: bcs.u32(),
      nonce: bcs.u32(),
      emitter_chain: bcs.u16(),
      emitter_address: ExternalAddress.bcs,
      sequence: bcs.u64(),
      consistency_level: bcs.u8(),
      payload: bcs.vector(bcs.u8()),
      digest: Bytes32.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof VAA.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof VAA.instantiateBcs> {
    if (!VAA.cachedBcs) {
      VAA.cachedBcs = VAA.instantiateBcs()
    }
    return VAA.cachedBcs
  }

  static fromFields(fields: Record<string, any>): VAA {
    return VAA.reified().new({
      guardianSetIndex: decodeFromFields('u32', fields.guardian_set_index),
      timestamp: decodeFromFields('u32', fields.timestamp),
      nonce: decodeFromFields('u32', fields.nonce),
      emitterChain: decodeFromFields('u16', fields.emitter_chain),
      emitterAddress: decodeFromFields(ExternalAddress.reified(), fields.emitter_address),
      sequence: decodeFromFields('u64', fields.sequence),
      consistencyLevel: decodeFromFields('u8', fields.consistency_level),
      payload: decodeFromFields(vector('u8'), fields.payload),
      digest: decodeFromFields(Bytes32.reified(), fields.digest),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): VAA {
    if (!isVAA(item.type)) {
      throw new Error('not a VAA type')
    }

    return VAA.reified().new({
      guardianSetIndex: decodeFromFieldsWithTypes('u32', item.fields.guardian_set_index),
      timestamp: decodeFromFieldsWithTypes('u32', item.fields.timestamp),
      nonce: decodeFromFieldsWithTypes('u32', item.fields.nonce),
      emitterChain: decodeFromFieldsWithTypes('u16', item.fields.emitter_chain),
      emitterAddress: decodeFromFieldsWithTypes(
        ExternalAddress.reified(),
        item.fields.emitter_address,
      ),
      sequence: decodeFromFieldsWithTypes('u64', item.fields.sequence),
      consistencyLevel: decodeFromFieldsWithTypes('u8', item.fields.consistency_level),
      payload: decodeFromFieldsWithTypes(vector('u8'), item.fields.payload),
      digest: decodeFromFieldsWithTypes(Bytes32.reified(), item.fields.digest),
    })
  }

  static fromBcs(data: Uint8Array): VAA {
    return VAA.fromFields(VAA.bcs.parse(data))
  }

  toJSONField(): VAAJSONField {
    return {
      guardianSetIndex: this.guardianSetIndex,
      timestamp: this.timestamp,
      nonce: this.nonce,
      emitterChain: this.emitterChain,
      emitterAddress: this.emitterAddress.toJSONField(),
      sequence: this.sequence.toString(),
      consistencyLevel: this.consistencyLevel,
      payload: fieldToJSON<Vector<'u8'>>(`vector<u8>`, this.payload),
      digest: this.digest.toJSONField(),
    }
  }

  toJSON(): VAAJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): VAA {
    return VAA.reified().new({
      guardianSetIndex: decodeFromJSONField('u32', field.guardianSetIndex),
      timestamp: decodeFromJSONField('u32', field.timestamp),
      nonce: decodeFromJSONField('u32', field.nonce),
      emitterChain: decodeFromJSONField('u16', field.emitterChain),
      emitterAddress: decodeFromJSONField(ExternalAddress.reified(), field.emitterAddress),
      sequence: decodeFromJSONField('u64', field.sequence),
      consistencyLevel: decodeFromJSONField('u8', field.consistencyLevel),
      payload: decodeFromJSONField(vector('u8'), field.payload),
      digest: decodeFromJSONField(Bytes32.reified(), field.digest),
    })
  }

  static fromJSON(json: Record<string, any>): VAA {
    if (json.$typeName !== VAA.$typeName) {
      throw new Error(
        `not a VAA json object: expected '${VAA.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return VAA.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): VAA {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isVAA(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a VAA object`)
    }
    return VAA.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): VAA {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isVAA(data.bcs.type)) {
        throw new Error(`object at is not a VAA object`)
      }

      return VAA.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return VAA.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<VAA> {
    const res = await fetchObjectBcs(client, id)
    if (!isVAA(res.type)) {
      throw new Error(`object at id ${id} is not a VAA object`)
    }

    return VAA.fromBcs(res.bcsBytes)
  }
}
