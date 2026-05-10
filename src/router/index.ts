export * from './adapter'
export * from './af'
export * from './cetus'
export * as KaiRouter from './kai'

import * as cetus from './kai/cetus-swap'
import * as bluefin from './kai/bluefin-swap'
import * as stSui from './kai/stsui-swap'
export const KaiRouterUtil: {
  cetus: typeof cetus
  bluefin: typeof bluefin
  stSui: typeof stSui
} = {
  cetus: cetus,
  bluefin: bluefin,
  stSui: stSui,
}
