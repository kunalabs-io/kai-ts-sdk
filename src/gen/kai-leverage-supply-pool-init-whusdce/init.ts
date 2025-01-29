import * as klwhusdce from './klwhusdce/structs'
import { StructClassLoader } from '../_framework/loader'

export function registerClasses(loader: StructClassLoader) {
  loader.register(klwhusdce.KLWHUSDCE)
}
