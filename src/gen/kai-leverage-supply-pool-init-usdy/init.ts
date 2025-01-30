import * as klusdy from './klusdy/structs'
import { StructClassLoader } from '../_framework/loader'

export function registerClasses(loader: StructClassLoader) {
  loader.register(klusdy.KLUSDY)
}
