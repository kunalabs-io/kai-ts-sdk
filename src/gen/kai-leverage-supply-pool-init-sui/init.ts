import * as klsui from './klsui/structs'
import { StructClassLoader } from '../_framework/loader'

export function registerClasses(loader: StructClassLoader) {
  loader.register(klsui.KLSUI)
}
