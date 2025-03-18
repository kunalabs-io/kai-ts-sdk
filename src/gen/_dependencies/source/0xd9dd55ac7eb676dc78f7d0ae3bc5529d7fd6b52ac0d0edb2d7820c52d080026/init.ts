import * as access from './access/structs'
import * as dynamicMap from './dynamic-map/structs'
import { StructClassLoader } from '../../../_framework/loader'

export function registerClasses(loader: StructClassLoader) {
  loader.register(access.ActionRequest)
  loader.register(access.ConditionWitness)
  loader.register(access.ConfigNone)
  loader.register(access.Entity)
  loader.register(access.PackageAdmin)
  loader.register(access.Policy)
  loader.register(access.Rule)
  loader.register(dynamicMap.DynamicMap)
}
