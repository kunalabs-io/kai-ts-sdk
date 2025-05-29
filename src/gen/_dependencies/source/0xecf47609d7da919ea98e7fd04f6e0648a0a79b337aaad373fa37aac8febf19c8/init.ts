import * as mintAllowance from './mint-allowance/structs'
import * as roles from './roles/structs'
import * as stablecoin from './stablecoin/structs'
import * as treasury from './treasury/structs'
import { StructClassLoader } from '../../../_framework/loader'

export function registerClasses(loader: StructClassLoader) {
  loader.register(mintAllowance.MintAllowance)
  loader.register(roles.Roles)
  loader.register(roles.OwnerRole)
  loader.register(roles.OwnerKey)
  loader.register(roles.MasterMinterKey)
  loader.register(roles.BlocklisterKey)
  loader.register(roles.PauserKey)
  loader.register(roles.MetadataUpdaterKey)
  loader.register(roles.MasterMinterChanged)
  loader.register(roles.BlocklisterChanged)
  loader.register(roles.PauserChanged)
  loader.register(roles.MetadataUpdaterChanged)
  loader.register(stablecoin.STABLECOIN)
  loader.register(treasury.Treasury)
  loader.register(treasury.MintCap)
  loader.register(treasury.TreasuryCapKey)
  loader.register(treasury.DenyCapKey)
  loader.register(treasury.MintCapCreated)
  loader.register(treasury.ControllerConfigured)
  loader.register(treasury.ControllerRemoved)
  loader.register(treasury.MinterConfigured)
  loader.register(treasury.MinterRemoved)
  loader.register(treasury.MinterAllowanceIncremented)
  loader.register(treasury.Mint)
  loader.register(treasury.Burn)
  loader.register(treasury.Blocklisted)
  loader.register(treasury.Unblocklisted)
  loader.register(treasury.Pause)
  loader.register(treasury.Unpause)
  loader.register(treasury.MetadataUpdated)
  loader.register(treasury.MigrationStarted)
  loader.register(treasury.MigrationAborted)
  loader.register(treasury.MigrationCompleted)
}
