import * as coinDecimalsRegistry from './coin-decimals-registry/structs'
import { StructClassLoader } from '../../../_framework/loader'

export function registerClasses(loader: StructClassLoader) {
  loader.register(coinDecimalsRegistry.COIN_DECIMALS_REGISTRY)
  loader.register(coinDecimalsRegistry.CoinDecimalsRegistry)
  loader.register(coinDecimalsRegistry.CoinDecimalsRegistered)
}
