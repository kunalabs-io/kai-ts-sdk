import * as whitelist from './whitelist/structs'
import { StructClassLoader } from '../../../_framework/loader'

export function registerClasses(loader: StructClassLoader) {
  loader.register(whitelist.AllowAllEvent)
  loader.register(whitelist.AllowAllKey)
  loader.register(whitelist.RejectAllEvent)
  loader.register(whitelist.RejectAllKey)
  loader.register(whitelist.SwitchToWhitelistModeEvent)
  loader.register(whitelist.WhitelistAddEvent)
  loader.register(whitelist.WhitelistKey)
  loader.register(whitelist.WhitelistRemoveEvent)
}
