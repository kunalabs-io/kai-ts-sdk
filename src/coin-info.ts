import { Amount } from './amount'
import { extractType, phantom, PhantomReified, PhantomTypeArgument } from './gen/_framework/reified'
import { compressSuiType } from './gen/_framework/util'

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
  reified: phantom('0x2::sui::SUI'),
  decimals: 9,
  name: 'Sui',
  symbol: 'SUI',
  description: '',
  displaySymbol: 'SUI',
  iconUrl:
    'https://coinmeta.polymedia.app/img/coins/0x0000000000000000000000000000000000000000000000000000000000000002-sui-SUI.svg',
})

export const whUSDCe = new CoinInfo({
  reified: phantom(
    '0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN'
  ),
  decimals: 6,
  name: 'Wormhole USDC',
  description: 'Wormhole Ethereum USDC',
  symbol: 'whUSDC.e',
  displaySymbol: 'wUSDC',
  iconUrl:
    'https://coinmeta.polymedia.app/img/coins/0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf-coin-COIN.webp',
})

export const whUSDTe = new CoinInfo({
  reified: phantom(
    '0xc060006111016b8a020ad5b33834984a437aaa7d3c74c18e09a95d48aceab08c::coin::COIN'
  ),
  decimals: 6,
  name: 'Wormhole USDT',
  description: 'Wormhole Ethereum USDT',
  symbol: 'whUSDT.e',
  displaySymbol: 'wUSDT',
  iconUrl:
    'https://coinmeta.polymedia.app/img/coins/0xc060006111016b8a020ad5b33834984a437aaa7d3c74c18e09a95d48aceab08c-coin-COIN.webp',
})

export const klwhUSDCe = new CoinInfo({
  reified: phantom(
    '0x27fc520bfa9a98ca098b8f484c445f865fcb0efd79c8e4c5274cd6515282fd14::klwhusdce::KLWHUSDCE'
  ),
  decimals: 6,
  name: 'Kai Leverage whUSDC.e',
  description: 'Kai Leverage whUSDC.e supply pool equity token',
  symbol: 'klwhUSDCe',
  displaySymbol: 'klUSDC',
})

export const klwhUSDTe = new CoinInfo({
  reified: phantom(
    '0x358b47a13abe067fe4054e414f4ee1d1524236cc60ffc716ec10931c5dbec795::klwhusdte::KLWHUSDTE'
  ),
  decimals: 6,
  name: 'Kai Leverage whUSDT.e',
  description: 'Kai Leverage whUSDT.e supply pool equity token',
  symbol: 'klwhUSDTe',
  displaySymbol: 'klUSDT',
})

export const klSui = new CoinInfo({
  reified: phantom(
    '0x19163b40d52e67e20992f1b74c7376d30616ba966c8174e0990c58074d56eb8d::klsui::KLSUI'
  ),
  decimals: 9,
  name: 'Kai Leverage Sui',
  description: 'Kai Leverage Sui',
  symbol: 'klSUI',
  displaySymbol: 'klSUI',
})

export const paused_klUsdc = new CoinInfo({
  reified: phantom(
    '0xa47906ee2160b8d1d89591a2bb37ed71053bfb3ed1b39581f03358950a91ca79::klusdc::KLUSDC'
  ),
  decimals: 6,
  name: 'Kai Leverage USDC',
  description: 'Kai Leverage USDC',
  symbol: 'klUSDC',
  displaySymbol: 'klUSDC',
})

export const paused_klSuiUSDT = new CoinInfo({
  reified: phantom(
    '0xfd3e54e465577273b7eb211212a01ca17418c667aec490eaf7fa5592bfd799f8::klsuiusdt::KLSUIUSDT'
  ),
  decimals: 6,
  name: 'Kai Leverage suiUSDT',
  description: 'Kai Leverage suiUSDT',
  symbol: 'klSuiUSDT',
  displaySymbol: 'klSuiUSDT',
})

export const klUSDY = new CoinInfo({
  reified: phantom(
    '0xcc89168df227621ceab8f2309f134fef00606cc056b61c598a776847367b8e36::klusdy::KLUSDY'
  ),
  decimals: 6,
  name: 'Kai Leverage USDY',
  description: 'Kai Leverage USDY',
  symbol: 'klUSDY',
  displaySymbol: 'klUSDY',
})

export const klDEEP = new CoinInfo({
  reified: phantom(
    '0x8fc45d22b3fc276662811e0bada806a3a5f4cb63cd095c418b98df4e8b389f3f::kldeep::KLDEEP'
  ),
  decimals: 6,
  name: 'Kai Leverage DEEP',
  description: 'Kai Leverage DEEP',
  symbol: 'klDEEP',
  displaySymbol: 'klDEEP',
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

export const klUSDC = new CoinInfo({
  reified: phantom(
    '0x3f110dd8b324ce4c5df8b344b7d71bdd939083a9ea6f454161667dba872f99d6::klusdc::KLUSDC'
  ),
  decimals: 6,
  name: 'Kai Leverage USDC',
  description: 'Kai Leverage USDC',
  symbol: 'klUSDC-2',
  displaySymbol: 'klUSDC',
})

export const klSuiUSDT = new CoinInfo({
  reified: phantom(
    '0x36caf1b10c52057f0f34b42baf53cdb9171ad7ce74f1360a9f94acdcad727ae4::klsuiusdt::KLSUIUSDT'
  ),
  decimals: 6,
  name: 'Kai Leverage suiUSDT',
  description: 'Kai Leverage suiUSDT',
  symbol: 'klSuiUSDT-2',
  displaySymbol: 'klSuiUSDT',
})

export const klWAL = new CoinInfo({
  reified: phantom(
    '0x59b208a81be1ed6f1d596d971abf358401304dfbacce30c8ffc637ba5b68f13::klwal::KLWAL'
  ),
  decimals: 9,
  name: 'Kai Leverage WAL',
  description: 'Kai Leverage WAL Supply Pool LP Token',
  symbol: 'klWAL',
  displaySymbol: 'klWAL',
})

export const klWBTC = new CoinInfo({
  reified: phantom(
    '0x4acb21bc82d09db099d89a5cf48f433d34fbc46c04fc7b79dda0b27e7f32fb20::klwbtc::KLWBTC'
  ),
  decimals: 8,
  name: 'Kai Leverage WBTC',
  description: 'Kai Leverage WBTC Supply Pool LP Token',
  symbol: 'klWBTC',
  displaySymbol: 'klWBTC',
})

export const klLBTC = new CoinInfo({
  reified: phantom(
    '0x390b72b290b407c1835c33442cbbdd68c24aeb84397ffdb953994456d020e2fd::kllbtc::KLLBTC'
  ),
  decimals: 8,
  name: 'Kai Leverage LBTC',
  description: 'Kai Leverage LBTC Supply Pool LP Token',
  symbol: 'klLBTC',
  displaySymbol: 'klLBTC',
})

export const klXBTC = new CoinInfo({
  reified: phantom(
    '0x439536b0ed9ffa4ead507ec35ae2bdc759a8bb7abe30fafea68a06af54476d75::klxbtc::KLXBTC'
  ),
  decimals: 8,
  name: 'Kai Leverage xBTC',
  description: 'Kai Leverage xBTC Supply Pool LP Token',
  symbol: 'klxBTC',
  displaySymbol: 'klxBTC',
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
    'https://coinmeta.polymedia.app/img/coins/0xdba34672e30cb065b1f93e3ab55318768fd6fef66c15942c9f7cb846e2f900e7-usdc-USDC.svg',
})

export const yWHUSDCe = new CoinInfo({
  reified: phantom(
    '0x1c389a85310b47e7630a9361d4e71025bc35e4999d3a645949b1b68b26f2273::ywhusdce::YWHUSDCE'
  ),
  decimals: 6,
  name: 'ywhUSDC.e',
  description: 'Kai whUSDC.e vault yield bearing token',
  symbol: 'ywhUSDC.e',
  displaySymbol: 'ywUSDC',
})

export const yWHUSDTe = new CoinInfo({
  reified: phantom(
    '0xb8dc843a816b51992ee10d2ddc6d28aab4f0a1d651cd7289a7897902eb631613::ywhusdte::YWHUSDTE'
  ),
  decimals: 6,
  name: 'ywhUSDT.e',
  description: 'Kai whUSDT.e vault yield bearing token',
  symbol: 'ywhUSDT.e',
  displaySymbol: 'yUSDT',
})

export const ySUI = new CoinInfo({
  reified: phantom(
    '0xb8dc843a816b51992ee10d2ddc6d28aab4f0a1d651cd7289a7897902eb631613::ysui::YSUI'
  ),
  decimals: 9,
  name: 'ySUI',
  description: 'Kai SUI vault yield bearing token',
  symbol: 'ySUI',
  displaySymbol: 'ySUI',
})

export const paused_yUSDC = new CoinInfo({
  reified: phantom(
    '0xa4184b1a5829e7cced8e51e8e385b16d02642634cd3e72a50d31cdf4a78bfd5c::yusdc::YUSDC'
  ),
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

export const paused_ysuiUSDT = new CoinInfo({
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

export const yDEEP = new CoinInfo({
  reified: phantom(
    '0x5b2fa5c76309a417ccd14a65f036b8d1ff4e76a143ed878a47fdecfe0b09860e::ydeep::YDEEP'
  ),
  decimals: 6,
  name: 'Kai vault DEEP',
  description: 'Kai vault DEEP',
  symbol: 'yDEEP',
  displaySymbol: 'yDEEP',
})

export const yUSDC = new CoinInfo({
  reified: phantom(
    '0x7ea359636b36e7c027c2cd71adedaf19be658e1477d9e71368a0b3824a0a27ff::yusdc::YUSDC'
  ),
  decimals: 6,
  name: 'yUSDC',
  description: 'Kai USDC vault yield bearing token',
  symbol: 'yUSDC',
  displaySymbol: 'yUSDC',
})

export const ysuiUSDT = new CoinInfo({
  reified: phantom(
    '0x36bc697c1dba827a4bf7fa3bfc9f1b0953fe09b91c4b4c103efa0b086e03d923::ysuiusdt::YSUIUSDT'
  ),
  decimals: 6,
  name: 'Kai vault suiUSDT',
  description: 'Kai vault suiUSDT',
  symbol: 'ysuiUSDT',
  displaySymbol: 'ysuiUSDT',
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

export const DEEP = new CoinInfo({
  reified: phantom(
    '0xdeeb7a4662eec9f2f3def03fb937a663dddaa2e215b8078a284d026b7946c270::deep::DEEP'
  ),
  decimals: 6,
  name: 'DeepBook Token',
  description:
    'The DEEP token secures the DeepBook protocol, the premier wholesale liquidity venue for on-chain trading.',
  symbol: 'DEEP',
  displaySymbol: 'DEEP',
  iconUrl:
    'https://coinmeta.polymedia.app/img/coins/0xdeeb7a4662eec9f2f3def03fb937a663dddaa2e215b8078a284d026b7946c270-deep-DEEP.svg',
})

export const WAL = new CoinInfo({
  reified: phantom('0x356a26eb9e012a68958082340d4c4116e7f55615cf27affcff209cf0ae544f59::wal::WAL'),
  decimals: 9,
  name: 'WAL',
  description: 'The native token for the Walrus protocol.',
  symbol: 'WAL',
  displaySymbol: 'WAL',
  iconUrl:
    'https://coinmeta.polymedia.app/img/coins/0x356a26eb9e012a68958082340d4c4116e7f55615cf27affcff209cf0ae544f59-wal-WAL.svg',
})

export const wBTC = new CoinInfo({
  reified: phantom('0xaafb102dd0902f5055cadecd687fb5b71ca82ef0e0285d90afde828ec58ca96b::btc::BTC'),
  decimals: 8,
  name: 'Wrapped Bitcoin',
  description: 'wBTC by Sui',
  symbol: 'wBTC',
  displaySymbol: 'wBTC',
  iconUrl:
    'https://coinmeta.polymedia.app/img/coins/0xaafb102dd0902f5055cadecd687fb5b71ca82ef0e0285d90afde828ec58ca96b-btc-BTC.webp',
})

export const LBTC = new CoinInfo({
  reified: phantom(
    '0x3e8e9423d80e1774a7ca128fccd8bf5f1f7753be658c5e645929037f7c819040::lbtc::LBTC'
  ),
  decimals: 8,
  name: 'Lombard Staked BTC',
  description:
    'Lombard connects Bitcoin to DeFi through LBTC, the Universal Liquid Bitcoin Standard. Backed 1:1 by BTC, LBTC is yield-bearing, cross-chain, and enables BTC holders to earn Babylon staking yields, trade, borrow, lend, and yield farm.',
  symbol: 'LBTC',
  displaySymbol: 'LBTC',
  iconUrl: 'https://www.lombard.finance/lbtc/LBTC.png',
})

export const xBTC = new CoinInfo({
  reified: phantom(
    '0x876a4b7bce8aeaef60464c11f4026903e9afacab79b9b142686158aa86560b50::xbtc::XBTC'
  ),
  decimals: 8,
  name: 'OKX Wrapped BTC',
  description: 'A wrapped BTC that is backed 1:1 by Bitcoin (BTC) securely held by OKX',
  symbol: 'xBTC',
  displaySymbol: 'xBTC',
  iconUrl: 'https://static.coinall.ltd/cdn/oksupport/common/20250512-095503.72e1f41d9b9a06.png',
})

export const yWAL = new CoinInfo({
  reified: phantom(
    '0xdab19711df7a4eefc633b9426e15d23305c6815eed775247e477599c706ede98::ywal::YWAL'
  ),
  decimals: 9,
  name: 'yWAL',
  description: 'Kai WAL vault yield bearing token',
  symbol: 'yWAL',
  displaySymbol: 'yWAL',
})

export const yWBTC = new CoinInfo({
  reified: phantom(
    '0xe4ff5fcc935fddaf808e27017c994b9cd75eaac81cec4bd2b4b8fdeb05a71e07::ywbtc::YWBTC'
  ),
  decimals: 8,
  name: 'yWBTC',
  description: 'Kai WBTC vault yield bearing token',
  symbol: 'yWBTC',
  displaySymbol: 'yWBTC',
})

export const yLBTC = new CoinInfo({
  reified: phantom(
    '0x3e83d9c798902dbcde72b9ede9fa2997ea43b302f83e4894aa793e6791e95c9f::ylbtc::YLBTC'
  ),
  decimals: 8,
  name: 'yLBTC',
  description: 'Kai LBTC vault yield bearing token',
  symbol: 'yLBTC',
  displaySymbol: 'yLBTC',
})

export const yXBTC = new CoinInfo({
  reified: phantom(
    '0xfc39a879b5a8772f682f1202cc5a8a3d93654cbb9e716b96bda7e5832af0e0eb::yxbtc::YXBTC'
  ),
  decimals: 8,
  name: 'yXBTC',
  description: 'Kai xBTC vault yield bearing token',
  symbol: 'yXBTC',
  displaySymbol: 'yXBTC',
})

export const COIN_INFOS = [
  SUI,
  whUSDCe,
  whUSDTe,
  klwhUSDCe,
  klwhUSDTe,
  klSui,
  paused_klUsdc,
  paused_klSuiUSDT,
  klUSDC,
  klSuiUSDT,
  klWAL,
  klWBTC,
  klLBTC,
  klXBTC,
  CETUS,
  USDC,
  yWHUSDCe,
  yWHUSDTe,
  ySUI,
  paused_yUSDC,
  paused_ysuiUSDT,
  ysuiUSDT,
  yUSDC,
  BLUE,
  suiUSDT,
  stSUI,
  USDY,
  klUSDY,
  yUSDY,
  DEEP,
  klDEEP,
  yDEEP,
  WAL,
  wBTC,
  LBTC,
  xBTC,
  yWAL,
  yWBTC,
  yLBTC,
  yXBTC,
]

export const COIN_INFO_MAP = new Map(COIN_INFOS.map(c => [compressSuiType(c.typeName), c]))
