import * as klusdc from './klusdc/structs'
import { StructClassLoader } from '../_framework/loader'

export function registerClasses(loader: StructClassLoader) {
  loader.register(klusdc.KLUSDC)
}
