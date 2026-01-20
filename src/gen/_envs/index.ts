// Re-export environment configs
export * from './mainnet'

// Import internal functions and env configs
import { registerEnv, setActiveEnv } from '../_framework/env'
import { mainnetEnv } from './mainnet'

// Initialize environments (runs once on first import)
let initialized = false
if (!initialized) {
  registerEnv('mainnet', mainnetEnv)
  setActiveEnv('mainnet')
  initialized = true
}

// Re-export public API from _framework/env
export {
  getActiveEnv,
  getActiveEnvName,
  getDependencyConfig,
  getOriginalId,
  getPackageConfig,
  getPublishedAt,
  getRegisteredEnvs,
  getTypeOrigin,
  setActiveEnv,
  setActiveEnvWithConfig,
} from '../_framework/env'
export type { EnvConfig, PackageConfig } from '../_framework/env'
