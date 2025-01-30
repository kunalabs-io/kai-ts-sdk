import { Amount } from './amount'
import { COIN as WHUSDCE } from './gen/wh-usd-ce/coin/structs'
import { COIN as WHUSDTE } from './gen/wh-usd-te/coin/structs'
import { extractType, phantom, PhantomReified, PhantomTypeArgument } from './gen/_framework/reified'
import { KLWHUSDCE } from './gen/kai-leverage-supply-pool-init-whusdce/klwhusdce/structs'
import { KLWHUSDTE } from './gen/kai-leverage-supply-pool-init-whusdte/klwhusdte/structs'
import { SUI as SUI_ } from './gen/sui/sui/structs'
import { KLSUI } from './gen/kai-leverage-supply-pool-init-sui/klsui/structs'
import { KLUSDC } from './gen/kai-leverage-supply-pool-init-usdc/klusdc/structs'
import { YWHUSDCE } from './gen/kai/ywhusdce/structs'
import { YWHUSDTE } from './gen/kai-ywh-usd-te-ysui/ywhusdte/structs'
import { YSUI } from './gen/kai-ywh-usd-te-ysui/ysui/structs'
import { YUSDC } from './gen/kai-yusdc/yusdc/structs'
import { compressSuiType } from './gen/_framework/util'
import { KLSUIUSDT } from './gen/kai-leverage-supply-pool-init-sui-usdt/klsuiusdt/structs'
import { KLUSDY } from './gen/kai-leverage-supply-pool-init-usdy/klusdy/structs'

export interface CoinInfoConstructorArgs<T extends PhantomTypeArgument> {
  reified: PhantomReified<T>
  decimals: number
  name: string
  description: string
  symbol: string
  displaySymbol: string
  iconUrl?: string
}

export class CoinInfo<T extends PhantomTypeArgument> {
  readonly p: PhantomReified<T>
  readonly typeName: string
  readonly decimals: number
  readonly name: string
  readonly description: string
  readonly symbol: string
  readonly displaySymbol: string
  readonly iconUrl?: string

  constructor(args: CoinInfoConstructorArgs<T>) {
    this.p = args.reified
    this.typeName = compressSuiType(extractType(args.reified))
    this.decimals = args.decimals
    this.name = args.name
    this.description = args.description
    this.symbol = args.symbol
    this.displaySymbol = args.displaySymbol
    this.iconUrl = args.iconUrl
  }

  newAmount(value: bigint): Amount {
    return Amount.fromInt(value, this.decimals)
  }
}

export const SUI = new CoinInfo({
  reified: SUI_.p,
  decimals: 9,
  name: 'Sui',
  symbol: 'SUI',
  description: '',
  displaySymbol: 'SUI',
  iconUrl:
    'https://coinmeta.polymedia.app/img/coins/0x0000000000000000000000000000000000000000000000000000000000000002-sui-SUI.svg',
})

export const whUSDCe = new CoinInfo({
  reified: WHUSDCE.p,
  decimals: 6,
  name: 'Wormhole USDC',
  description: 'Wormhole Ethereum USDC',
  symbol: 'whUSDC.e',
  displaySymbol: 'wUSDC',
  iconUrl:
    'https://coinmeta.polymedia.app/img/coins/0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf-coin-COIN.webp',
})

export const whUSDTe = new CoinInfo({
  reified: WHUSDTE.p,
  decimals: 6,
  name: 'Wormhole USDT',
  description: 'Wormhole Ethereum USDT',
  symbol: 'whUSDT.e',
  displaySymbol: 'wUSDT',
  iconUrl:
    'https://coinmeta.polymedia.app/img/coins/0xc060006111016b8a020ad5b33834984a437aaa7d3c74c18e09a95d48aceab08c-coin-COIN.webp',
})

export const klwhUSDCe = new CoinInfo({
  reified: KLWHUSDCE.p,
  decimals: 6,
  name: 'Kai Leverage whUSDC.e',
  description: 'Kai Leverage whUSDC.e supply pool equity token',
  symbol: 'klwhUSDCe',
  displaySymbol: 'klUSDC',
})

export const klwhUSDTe = new CoinInfo({
  reified: KLWHUSDTE.p,
  decimals: 6,
  name: 'Kai Leverage whUSDT.e',
  description: 'Kai Leverage whUSDT.e supply pool equity token',
  symbol: 'klwhUSDTe',
  displaySymbol: 'klUSDT',
})

export const klSui = new CoinInfo({
  reified: KLSUI.p,
  decimals: 9,
  name: 'Kai Leverage Sui',
  description: 'Kai Leverage Sui',
  symbol: 'klSUI',
  displaySymbol: 'klSUI',
})

export const klUsdc = new CoinInfo({
  reified: KLUSDC.p,
  decimals: 6,
  name: 'Kai Leverage USDC',
  description: 'Kai Leverage USDC',
  symbol: 'klUSDC',
  displaySymbol: 'klUSDC',
})

export const klSuiUSDT = new CoinInfo({
  reified: KLSUIUSDT.p,
  decimals: 6,
  name: 'Kai Leverage suiUSDT',
  description: 'Kai Leverage suiUSDT',
  symbol: 'klSuiUSDT',
  displaySymbol: 'klSuiUSDT',
})

export const klUSDY = new CoinInfo({
  reified: KLUSDY.p,
  decimals: 6,
  name: 'Kai Leverage USDY',
  description: 'Kai Leverage USDY',
  symbol: 'klUSDY',
  displaySymbol: 'klUSDY',
})

export const CETUS = new CoinInfo({
  reified: phantom(
    '0x06864a6f921804860930db6ddbe2e16acdf8504495ea7481637a1c8b9a8fe54b::cetus::CETUS'
  ),
  decimals: 9,
  name: 'Cetus Token',
  description: 'CETUS is the native token of Cetus Protocol.',
  symbol: 'CETUS',
  displaySymbol: 'CETUS',
  iconUrl:
    'https://coinmeta.polymedia.app/img/coins/0x06864a6f921804860930db6ddbe2e16acdf8504495ea7481637a1c8b9a8fe54b-cetus-CETUS.webp',
})

export const USDC = new CoinInfo({
  reified: phantom(
    '0xdba34672e30cb065b1f93e3ab55318768fd6fef66c15942c9f7cb846e2f900e7::usdc::USDC'
  ),
  decimals: 6,
  name: 'USDC',
  description:
    'USDC is a US dollar-backed stablecoin issued by Circle. USDC is designed to provide a faster, safer, and more efficient way to send, spend, and exchange money around the world.',
  symbol: 'USDC',
  displaySymbol: 'USDC',
  iconUrl:
    'https://coinmeta.polymedia.app/img/coins/0xdba34672e30cb065b1f93e3ab55318768fd6fef66c15942c9f7cb846e2f900e7-usdc-USDC.webp',
})

export const yWHUSDCe = new CoinInfo({
  reified: YWHUSDCE.p,
  decimals: 6,
  name: 'ywhUSDC.e',
  description: 'Kai whUSDC.e vault yield bearing token',
  symbol: 'ywhUSDC.e',
  displaySymbol: 'ywUSDC',
})

export const yWHUSDTe = new CoinInfo({
  reified: YWHUSDTE.p,
  decimals: 6,
  name: 'ywhUSDT.e',
  description: 'Kai whUSDT.e vault yield bearing token',
  symbol: 'ywhUSDT.e',
  displaySymbol: 'yUSDT',
})

export const ySUI = new CoinInfo({
  reified: YSUI.p,
  decimals: 9,
  name: 'ySUI',
  description: 'Kai SUI vault yield bearing token',
  symbol: 'ySUI',
  displaySymbol: 'ySUI',
})

export const yUSDC = new CoinInfo({
  reified: YUSDC.p,
  decimals: 6,
  name: 'yUSDC',
  description: 'Kai USDC vault yield bearing token',
  symbol: 'yUSDC',
  displaySymbol: 'yUSDC',
})

export const BLUE = new CoinInfo({
  reified: phantom(
    '0xe1b45a0e641b9955a20aa0ad1c1f4ad86aad8afb07296d4085e349a50e90bdca::blue::BLUE'
  ),
  decimals: 9,
  name: 'Bluefin',
  description: '',
  symbol: 'BLUE',
  displaySymbol: 'BLUE',
  iconUrl: 'https://trade.bluefin.io/tokens/BLUE.svg',
})

export const suiUSDT = new CoinInfo({
  reified: phantom(
    '0x375f70cf2ae4c00bf37117d0c85a2c71545e6ee05c4a5c7d282cd66a4504b068::usdt::USDT'
  ),
  decimals: 6,
  name: 'Sui bridged USDT',
  description: 'Sui bridged USDT',
  symbol: 'suiUSDT',
  displaySymbol: 'suiUSDT',
  iconUrl:
    'https://coinmeta.polymedia.app/img/coins/0xc060006111016b8a020ad5b33834984a437aaa7d3c74c18e09a95d48aceab08c-coin-COIN.webp',
})

export const ysuiUSDT = new CoinInfo({
  reified: phantom(
    '0xaa1365f35a163f785b2a660b97831298dc145a3bc71e993407a5991722974e70::ysuiusdt::YSUIUSDT'
  ),
  decimals: 6,
  name: 'Kai vault suiUSDT',
  description: 'Kai vault suiUSDT',
  symbol: 'ysuiUSDT',
  displaySymbol: 'ysuiUSDT',
})

export const yUSDY = new CoinInfo({
  reified: phantom(
    '0xdd7108db1a209d23d8a25dda78bdca4547b755094305971ed4064dfe5cdfa026::yusdy::YUSDY'
  ),
  decimals: 6,
  name: 'Kai vault USDY',
  description: 'Kai vault USDY',
  symbol: 'yUSDY',
  displaySymbol: 'yUSDY',
})

export const stSUI = new CoinInfo({
  reified: phantom(
    '0xd1b72982e40348d069bb1ff701e634c117bb5f741f44dff91e472d3b01461e55::stsui::STSUI'
  ),
  decimals: 9,
  name: 'AlphaFi Staked SUI',
  description: 'AlphaFi Staked SUI',
  symbol: 'stSUI',
  displaySymbol: 'stSUI',
  iconUrl: 'https://images.alphafi.xyz/stSUI.png',
})

export const USDY = new CoinInfo({
  reified: phantom(
    '0x960b531667636f39e85867775f52f6b1f220a058c4de786905bdf761e06a56bb::usdy::USDY'
  ),
  decimals: 6,
  name: 'Ondo US Dollar Yield',
  description: 'Ondo US Dollar Yield',
  symbol: 'USDY',
  displaySymbol: 'USDY',
  iconUrl: 'https://ondo.finance/images/tokens/usdy.svg',
})

export const COIN_INFOS = [
  SUI,
  whUSDCe,
  whUSDTe,
  klwhUSDCe,
  klwhUSDTe,
  klSui,
  klUsdc,
  klSuiUSDT,
  CETUS,
  USDC,
  yWHUSDCe,
  yWHUSDTe,
  ySUI,
  yUSDC,
  ysuiUSDT,
  BLUE,
  suiUSDT,
  stSUI,
  USDY,
  klUSDY,
  yUSDY,
]

export const COIN_INFO_MAP = new Map(COIN_INFOS.map(c => [compressSuiType(c.typeName), c]))
