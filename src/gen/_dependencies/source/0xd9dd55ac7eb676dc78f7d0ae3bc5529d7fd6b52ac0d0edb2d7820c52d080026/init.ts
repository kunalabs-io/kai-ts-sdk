import * as access from './access/structs'
import * as dynamicMap from './dynamic-map/structs'
import { StructClassLoader } from '../../../_framework/loader'

export function registerClasses(loader: StructClassLoader) {
  loader.register(dynamicMap.DynamicMap)
  loader.register(access.Rule)
  loader.register(access.ActionRequest)
  loader.register(access.ConditionWitness)
  loader.register(access.ConfigNone)
  loader.register(access.Entity)
  loader.register(access.PackageAdmin)
  loader.register(access.Policy)
}
