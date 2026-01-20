import { StructClassLoader } from '../../_framework/loader'
import * as coin from './coin/structs'

export function registerClasses(loader: StructClassLoader): void {
  loader.register(coin.COIN)
}
