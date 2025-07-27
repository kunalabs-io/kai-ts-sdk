import * as xbtc from './xbtc/structs'
import { StructClassLoader } from '../../../_framework/loader'

export function registerClasses(loader: StructClassLoader) {
  loader.register(xbtc.XBTC)
  loader.register(xbtc.XBTCReceiver)
  loader.register(xbtc.MintEvent)
  loader.register(xbtc.BurnEvent)
  loader.register(xbtc.AddDenyListEvent)
  loader.register(xbtc.RemoveDenyListEvent)
  loader.register(xbtc.BatchAddDenyListEvent)
  loader.register(xbtc.BatchRemoveDenyListEvent)
  loader.register(xbtc.PauseEvent)
  loader.register(xbtc.SetReceiverEvent)
  loader.register(xbtc.TransferMinterRoleEvent)
  loader.register(xbtc.TransferDenylisterRoleEvent)
}
