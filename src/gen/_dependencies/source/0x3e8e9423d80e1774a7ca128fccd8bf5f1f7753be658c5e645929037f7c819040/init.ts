import * as lbtc from './lbtc/structs'
import * as treasury from './treasury/structs'
import { StructClassLoader } from '../../../_framework/loader'

export function registerClasses(loader: StructClassLoader) {
  loader.register(lbtc.LBTC)
  loader.register(treasury.ControlledTreasury)
  loader.register(treasury.AdminCap)
  loader.register(treasury.MinterCap)
  loader.register(treasury.PauserCap)
  loader.register(treasury.MintEvent)
  loader.register(treasury.BurnEvent)
  loader.register(treasury.RoleKey)
}
