import * as batchSwap from './batch-swap/structs'
import * as bluefinSpot from './bluefin-spot/structs'
import * as cetus from './cetus/structs'
import { StructClassLoader } from '../_framework/loader'

export function registerClasses(loader: StructClassLoader) {
  loader.register(batchSwap.BatchSwap)
  loader.register(batchSwap.BatchSwapClaim)
  loader.register(bluefinSpot.RebalanceReceipt)
  loader.register(bluefinSpot.WrappedFlashSwapReceipt)
  loader.register(cetus.RebalanceReceipt)
  loader.register(cetus.WrappedFlashSwapReceipt)
}
