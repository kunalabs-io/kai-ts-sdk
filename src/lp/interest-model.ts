import { abs, muldiv } from '../math'

export type Section = { end: bigint; endVal: bigint }

export interface InterestModelConstructorArgs {
  start: bigint
  startVal: bigint
  sections: Array<Section>
}

export class InterestModel {
  readonly start: bigint
  readonly startVal: bigint
  readonly sections: Array<Section>

  constructor(args: InterestModelConstructorArgs) {
    this.start = args.start
    this.startVal = args.startVal
    this.sections = args.sections
  }

  valueAt(x: bigint) {
    if (x < this.start) {
      throw new Error('EOutOfRange')
    }

    const len = this.sections.length
    const lastSection = this.sections[len - 1]
    if (x > lastSection.end) {
      throw new Error('EOutOfRange')
    }

    let csStart = this.start
    let csStartVal = this.startVal
    let cs = this.sections[0]
    let idx = 0
    while (x > cs.end) {
      csStart = cs.end
      csStartVal = cs.endVal
      cs = this.sections[idx + 1]
      idx += 1
    }
    if (x === cs.end) {
      return cs.endVal
    }
    if (csStartVal === cs.endVal) {
      return csStartVal
    }

    const sdy = abs(cs.endVal - csStartVal)
    const sdx = abs(cs.end - csStart)
    const dx = x - csStart

    const dy = muldiv(sdy, dx, sdx)

    if (csStartVal < cs.endVal) {
      return csStartVal + dy
    } else {
      return csStartVal - dy
    }
  }
}
