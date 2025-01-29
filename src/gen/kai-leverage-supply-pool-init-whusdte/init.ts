import * as klwhusdte from './klwhusdte/structs'
import { StructClassLoader } from '../_framework/loader'

export function registerClasses(loader: StructClassLoader) {
  loader.register(klwhusdte.KLWHUSDTE)
}
