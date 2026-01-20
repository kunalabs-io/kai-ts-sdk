import { StructClassLoader } from '../../_framework/loader'
import * as netSlidingSumLimiter from './net-sliding-sum-limiter/structs'
import * as ringAggregator from './ring-aggregator/structs'
import * as slidingSumLimiter from './sliding-sum-limiter/structs'

export function registerClasses(loader: StructClassLoader): void {
  loader.register(netSlidingSumLimiter.NetSlidingSumLimiter)
  loader.register(ringAggregator.RingAggregator)
  loader.register(slidingSumLimiter.SlidingSumLimiter)
}
