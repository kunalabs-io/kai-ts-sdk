import * as bytes20 from './bytes20/structs'
import * as bytes32 from './bytes32/structs'
import * as consumedVaas from './consumed-vaas/structs'
import * as cursor from './cursor/structs'
import * as emitter from './emitter/structs'
import * as externalAddress from './external-address/structs'
import * as feeCollector from './fee-collector/structs'
import * as governanceMessage from './governance-message/structs'
import * as guardianSet from './guardian-set/structs'
import * as guardianSignature from './guardian-signature/structs'
import * as guardian from './guardian/structs'
import * as migrate from './migrate/structs'
import * as packageUtils from './package-utils/structs'
import * as publishMessage from './publish-message/structs'
import * as setFee from './set-fee/structs'
import * as set from './set/structs'
import * as setup from './setup/structs'
import * as state from './state/structs'
import * as transferFee from './transfer-fee/structs'
import * as updateGuardianSet from './update-guardian-set/structs'
import * as upgradeContract from './upgrade-contract/structs'
import * as vaa from './vaa/structs'
import * as versionControl from './version-control/structs'
import { StructClassLoader } from '../_framework/loader'

export function registerClasses(loader: StructClassLoader) {
  loader.register(versionControl.V__0_2_0)
  loader.register(versionControl.V__DUMMY)
  loader.register(cursor.Cursor)
  loader.register(bytes32.Bytes32)
  loader.register(packageUtils.CurrentVersion)
  loader.register(packageUtils.CurrentPackage)
  loader.register(packageUtils.PendingPackage)
  loader.register(packageUtils.PackageInfo)
  loader.register(guardianSignature.GuardianSignature)
  loader.register(bytes20.Bytes20)
  loader.register(guardian.Guardian)
  loader.register(guardianSet.GuardianSet)
  loader.register(feeCollector.FeeCollector)
  loader.register(externalAddress.ExternalAddress)
  loader.register(set.Empty)
  loader.register(set.Set)
  loader.register(consumedVaas.ConsumedVAAs)
  loader.register(state.LatestOnly)
  loader.register(state.State)
  loader.register(emitter.EmitterCreated)
  loader.register(emitter.EmitterDestroyed)
  loader.register(emitter.EmitterCap)
  loader.register(publishMessage.WormholeMessage)
  loader.register(publishMessage.MessageTicket)
  loader.register(vaa.VAA)
  loader.register(governanceMessage.DecreeTicket)
  loader.register(governanceMessage.DecreeReceipt)
  loader.register(upgradeContract.GovernanceWitness)
  loader.register(upgradeContract.ContractUpgraded)
  loader.register(upgradeContract.UpgradeContract)
  loader.register(migrate.MigrateComplete)
  loader.register(setFee.GovernanceWitness)
  loader.register(setFee.SetFee)
  loader.register(setup.DeployerCap)
  loader.register(transferFee.GovernanceWitness)
  loader.register(transferFee.TransferFee)
  loader.register(updateGuardianSet.GovernanceWitness)
  loader.register(updateGuardianSet.GuardianSetAdded)
  loader.register(updateGuardianSet.UpdateGuardianSet)
}
