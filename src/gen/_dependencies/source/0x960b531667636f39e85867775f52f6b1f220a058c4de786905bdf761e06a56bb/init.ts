import * as usdy from './usdy/structs'
import { StructClassLoader } from '../../../_framework/loader'

export function registerClasses(loader: StructClassLoader) {
  loader.register(usdy.USDY)
}
