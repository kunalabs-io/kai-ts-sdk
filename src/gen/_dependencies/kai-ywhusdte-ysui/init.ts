import { StructClassLoader } from '../../_framework/loader'
import * as ysui from './ysui/structs'
import * as ywhusdte from './ywhusdte/structs'

export function registerClasses(loader: StructClassLoader): void {
  loader.register(ysui.YSUI)
  loader.register(ywhusdte.YWHUSDTE)
}
