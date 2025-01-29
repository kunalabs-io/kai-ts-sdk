import * as yusdc from './yusdc/structs'
import { StructClassLoader } from '../_framework/loader'

export function registerClasses(loader: StructClassLoader) {
  loader.register(yusdc.YUSDC)
}
