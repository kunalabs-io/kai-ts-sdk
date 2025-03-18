import * as deep from './deep/structs'
import { StructClassLoader } from '../../../_framework/loader'

export function registerClasses(loader: StructClassLoader) {
  loader.register(deep.DEEP)
  loader.register(deep.ProtectedTreasury)
  loader.register(deep.TreasuryCapKey)
}
