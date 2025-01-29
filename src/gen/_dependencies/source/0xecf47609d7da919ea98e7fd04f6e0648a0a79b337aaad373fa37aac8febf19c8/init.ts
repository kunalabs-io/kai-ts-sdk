import * as mintAllowance from './mint-allowance/structs'
import * as roles from './roles/structs'
import * as stablecoin from './stablecoin/structs'
import * as treasury from './treasury/structs'
import { StructClassLoader } from '../../../_framework/loader'

export function registerClasses(loader: StructClassLoader) {
  loader.register(roles.BlocklisterChanged)
  loader.register(roles.BlocklisterKey)
  loader.register(roles.MasterMinterChanged)
  loader.register(roles.MasterMinterKey)
  loader.register(roles.MetadataUpdaterChanged)
  loader.register(roles.MetadataUpdaterKey)
  loader.register(roles.OwnerKey)
  loader.register(roles.OwnerRole)
  loader.register(roles.PauserChanged)
  loader.register(roles.PauserKey)
  loader.register(roles.Roles)
  loader.register(mintAllowance.MintAllowance)
  loader.register(treasury.Blocklisted)
  loader.register(treasury.Burn)
  loader.register(treasury.ControllerConfigured)
  loader.register(treasury.ControllerRemoved)
  loader.register(treasury.DenyCapKey)
  loader.register(treasury.MetadataUpdated)
  loader.register(treasury.MigrationAborted)
  loader.register(treasury.MigrationCompleted)
  loader.register(treasury.MigrationStarted)
  loader.register(treasury.Mint)
  loader.register(treasury.MintCap)
  loader.register(treasury.MintCapCreated)
  loader.register(treasury.MinterAllowanceIncremented)
  loader.register(treasury.MinterConfigured)
  loader.register(treasury.MinterRemoved)
  loader.register(treasury.Pause)
  loader.register(treasury.Treasury)
  loader.register(treasury.TreasuryCapKey)
  loader.register(treasury.Unblocklisted)
  loader.register(treasury.Unpause)
  loader.register(stablecoin.STABLECOIN)
}
