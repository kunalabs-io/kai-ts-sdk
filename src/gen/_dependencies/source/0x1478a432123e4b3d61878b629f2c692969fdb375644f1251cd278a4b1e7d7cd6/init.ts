import * as priceFeed from './price-feed/structs'
import * as priceUpdatePolicy from './price-update-policy/structs'
import * as xOracle from './x-oracle/structs'
import { StructClassLoader } from '../../../_framework/loader'

export function registerClasses(loader: StructClassLoader) {
  loader.register(priceFeed.PriceFeed)
  loader.register(priceUpdatePolicy.PriceUpdatePolicy)
  loader.register(priceUpdatePolicy.PriceUpdatePolicyCap)
  loader.register(priceUpdatePolicy.PriceUpdateRequest)
  loader.register(xOracle.XOracle)
  loader.register(xOracle.XOraclePolicyCap)
  loader.register(xOracle.XOraclePriceUpdateRequest)
  loader.register(xOracle.X_ORACLE)
}
