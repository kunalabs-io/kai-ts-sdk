import { StructClassLoader } from '../../_framework/loader'
import * as admin from './admin/structs'
import * as rewardsPool from './rewards-pool/structs'
import * as spoolAccount from './spool-account/structs'
import * as spool from './spool/structs'
import * as user from './user/structs'

export function registerClasses(loader: StructClassLoader): void {
  loader.register(admin.AdminCap)
  loader.register(admin.CreateSpoolEvent)
  loader.register(admin.UpdateSpoolConfigEvent)
  loader.register(rewardsPool.RewardsPool)
  loader.register(spool.Spool)
  loader.register(spoolAccount.SpoolAccount)
  loader.register(user.CreateSpoolAccountEvent)
  loader.register(user.SpoolAccountUnstakeEvent)
  loader.register(user.SpoolAccountStakeEvent)
  loader.register(user.SpoolAccountRedeemRewardsEvent)
}
