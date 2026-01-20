import { StructClassLoader } from '../../_framework/loader'
import * as access from './access/structs'
import * as dynamicMap from './dynamic-map/structs'

export function registerClasses(loader: StructClassLoader): void {
  loader.register(access.PackageAdmin)
  loader.register(access.Entity)
  loader.register(access.Rule)
  loader.register(access.Policy)
  loader.register(access.ActionRequest)
  loader.register(access.ConditionWitness)
  loader.register(access.ConfigNone)
  loader.register(dynamicMap.DynamicMap)
}
