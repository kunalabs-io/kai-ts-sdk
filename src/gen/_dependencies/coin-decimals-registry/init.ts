import { StructClassLoader } from '../../_framework/loader'
import * as coinDecimalsRegistry from './coin-decimals-registry/structs'

export function registerClasses(loader: StructClassLoader): void {
  loader.register(coinDecimalsRegistry.COIN_DECIMALS_REGISTRY)
  loader.register(coinDecimalsRegistry.CoinDecimalsRegistry)
  loader.register(coinDecimalsRegistry.CoinDecimalsRegistered)
}
