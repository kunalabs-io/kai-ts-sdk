import { StructClassLoader } from '../../_framework/loader'
import * as batchPriceAttestation from './batch-price-attestation/structs'
import * as contractUpgrade from './contract-upgrade/structs'
import * as dataSource from './data-source/structs'
import * as event from './event/structs'
import * as governanceAction from './governance-action/structs'
import * as governanceInstruction from './governance-instruction/structs'
import * as governance from './governance/structs'
import * as hotPotatoVector from './hot-potato-vector/structs'
import * as i64 from './i64/structs'
import * as migrate from './migrate/structs'
import * as priceFeed from './price-feed/structs'
import * as priceIdentifier from './price-identifier/structs'
import * as priceInfo from './price-info/structs'
import * as priceStatus from './price-status/structs'
import * as price from './price/structs'
import * as setDataSources from './set-data-sources/structs'
import * as setFeeRecipient from './set-fee-recipient/structs'
import * as setGovernanceDataSource from './set-governance-data-source/structs'
import * as setStalePriceThreshold from './set-stale-price-threshold/structs'
import * as setUpdateFee from './set-update-fee/structs'
import * as set from './set/structs'
import * as setup from './setup/structs'
import * as state from './state/structs'
import * as versionControl from './version-control/structs'

export function registerClasses(loader: StructClassLoader): void {
  loader.register(batchPriceAttestation.BatchPriceAttestation)
  loader.register(batchPriceAttestation.Header)
  loader.register(contractUpgrade.ContractUpgraded)
  loader.register(contractUpgrade.UpgradeContract)
  loader.register(dataSource.DataSource)
  loader.register(event.PythInitializationEvent)
  loader.register(event.PriceFeedUpdateEvent)
  loader.register(governance.WormholeVAAVerificationReceipt)
  loader.register(governanceAction.GovernanceAction)
  loader.register(governanceInstruction.GovernanceInstruction)
  loader.register(hotPotatoVector.HotPotatoVector)
  loader.register(i64.I64)
  loader.register(migrate.MigrateComplete)
  loader.register(price.Price)
  loader.register(priceFeed.PriceFeed)
  loader.register(priceIdentifier.PriceIdentifier)
  loader.register(priceInfo.PriceInfoObject)
  loader.register(priceInfo.PriceInfo)
  loader.register(priceStatus.PriceStatus)
  loader.register(set.Unit)
  loader.register(set.Set)
  loader.register(setDataSources.DataSources)
  loader.register(setFeeRecipient.PythFeeRecipient)
  loader.register(setGovernanceDataSource.GovernanceDataSource)
  loader.register(setStalePriceThreshold.StalePriceThreshold)
  loader.register(setUpdateFee.UpdateFee)
  loader.register(setup.DeployerCap)
  loader.register(state.LatestOnly)
  loader.register(state.State)
  loader.register(state.CurrentDigest)
  loader.register(versionControl.V__0_1_2)
  loader.register(versionControl.V__0_1_1)
  loader.register(versionControl.V__DUMMY)
}
