import * as ysui from './ysui/structs'
import * as ywhusdte from './ywhusdte/structs'
import { StructClassLoader } from '../_framework/loader'

export function registerClasses(loader: StructClassLoader) {
  loader.register(ysui.YSUI)
  loader.register(ywhusdte.YWHUSDTE)
}
