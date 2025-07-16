import * as wal from './wal/structs'
import { StructClassLoader } from '../../../_framework/loader'

export function registerClasses(loader: StructClassLoader) {
  loader.register(wal.WAL)
  loader.register(wal.ProtectedTreasury)
  loader.register(wal.TreasuryCapKey)
}
