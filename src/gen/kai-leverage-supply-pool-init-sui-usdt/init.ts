import * as klsuiusdt from './klsuiusdt/structs'
import { StructClassLoader } from '../_framework/loader'

export function registerClasses(loader: StructClassLoader) {
  loader.register(klsuiusdt.KLSUIUSDT)
}
