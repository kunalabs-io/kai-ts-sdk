import * as twoStepRole from './two-step-role/structs'
import * as upgradeService from './upgrade-service/structs'
import { StructClassLoader } from '../../../_framework/loader'

export function registerClasses(loader: StructClassLoader) {
  loader.register(twoStepRole.TwoStepRole)
  loader.register(twoStepRole.RoleTransferStarted)
  loader.register(twoStepRole.RoleTransferred)
  loader.register(upgradeService.UpgradeService)
  loader.register(upgradeService.UpgradeCapKey)
  loader.register(upgradeService.AdminRole)
  loader.register(upgradeService.UpgradeCapDeposited)
  loader.register(upgradeService.UpgradeCapExtracted)
  loader.register(upgradeService.UpgradeServiceDestroyed)
  loader.register(upgradeService.AuthorizeUpgrade)
  loader.register(upgradeService.CommitUpgrade)
}
