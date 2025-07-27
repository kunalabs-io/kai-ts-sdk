import {
  CoinInfo,
  BLUE,
  CETUS,
  SUI,
  suiUSDT,
  USDC,
  whUSDCe,
  whUSDTe,
  USDY,
  DEEP,
  stSUI,
  LBTC,
  wBTC,
  WAL,
  xBTC,
} from '../../coin-info'
import { PhantomTypeArgument } from '../../gen/_framework/reified'

export interface DexInfo {
  coinA: CoinInfo<PhantomTypeArgument>
  coinB: CoinInfo<PhantomTypeArgument>
  poolId: string
  type: 'dex'
  protocol: 'cetus' | 'bluefin'
}

export interface StakingInfo {
  coinA: CoinInfo<PhantomTypeArgument>
  coinB: CoinInfo<PhantomTypeArgument>
  type: 'staking'
  protocol: 'stsui'
}

export type PoolInfo = DexInfo | StakingInfo

export const CETUS_POOL_INFOS: Array<DexInfo> = [
  {
    coinA: whUSDTe,
    coinB: whUSDCe,
    poolId: '0xc8d7a1503dc2f9f5b05449a87d8733593e2f0f3e7bffd90541252782e4d2ca20',
  },
  {
    coinA: whUSDCe,
    coinB: SUI,
    poolId: '0xcf994611fd4c48e277ce3ffd4d4364c914af2c3cbb05f7bf6facd371de688630',
  },
  {
    coinA: whUSDTe,
    coinB: SUI,
    poolId: '0x06d8af9e6afd27262db436f0d37b304a041f710c3ea1fa4c3a9bab36b3569ad3',
  },
  {
    coinA: CETUS,
    coinB: SUI,
    poolId: '0x2e041f3fd93646dcc877f783c1f2b7fa62d30271bdef1f21ef002cebf857bded',
  },
  {
    coinA: USDC,
    coinB: whUSDTe,
    poolId: '0x6bd72983b0b5a77774af8c77567bb593b418ae3cd750a5926814fcd236409aaa',
  },
  {
    coinA: USDC,
    coinB: SUI,
    poolId: '0xb8d7d9e66a60c239e7a60110efcf8de6c705580ed924d0dde141f4a0e2c90105',
  },
  {
    coinA: USDC,
    coinB: suiUSDT,
    poolId: '0xb8a67c149fd1bc7f9aca1541c61e51ba13bdded64c273c278e50850ae3bff073',
  },
  {
    coinA: USDC,
    coinB: USDY,
    poolId: '0xdcd762ad374686fa890fc4f3b9bbfe2a244e713d7bffbfbd1b9221cb290da2ed',
  },
  {
    coinA: DEEP,
    coinB: SUI,
    poolId: '0xe01243f37f712ef87e556afb9b1d03d0fae13f96d324ec912daffc339dfdcbd2',
  },
  {
    coinA: WAL,
    coinB: SUI,
    poolId: '0x72f5c6eef73d77de271886219a2543e7c29a33de19a6c69c5cf1899f729c3f17',
  },
].map(p => ({ ...p, type: 'dex', protocol: 'cetus' }))

export const BLUEFIN_POOL_INFOS: Array<DexInfo> = [
  {
    coinA: SUI,
    coinB: USDC,
    poolId: '0x3b585786b13af1d8ea067ab37101b6513a05d2f90cfe60e8b1d9e1b46a63c4fa',
  },
  {
    coinA: suiUSDT,
    coinB: USDC,
    poolId: '0x0bd95d012d60190a6713ae51f2d833b24ae70c5fb07fcfb41db40f25549878b1',
  },
  {
    coinA: whUSDTe,
    coinB: USDC,
    poolId: '0x0321b68a0fca8c990710d26986ba433d06b351deba9384017cd6175f20466a8f',
  },
  {
    coinA: DEEP,
    coinB: BLUE,
    poolId: '0x4b8271fc4819078e44ee9a0506a824b77464789d57ace355d0562a4776c51840',
  },
  {
    coinA: whUSDCe,
    coinB: USDC,
    poolId: '0x0c89fd0320b406311c05f1ed8c4656b4ab7ed14999a992cc6c878c2fad405140',
  },
  {
    coinA: BLUE,
    coinB: USDC,
    poolId: '0x198c607644a07d500b5b2bd076e54eecd022f471b714f89a336e38749559a496',
  },
  {
    coinA: DEEP,
    coinB: USDC,
    poolId: '0xd5e3a3c7396702d8f358a63ef921cc7c1951f52c6dfc2051cc8772cf7cb9900c',
  },
  {
    coinA: LBTC,
    coinB: wBTC,
    poolId: '0x715959c4a67cc6b8d2d4c0db628618d947a032041453a24c3a5315beb613331a',
  },
  {
    coinA: WAL,
    coinB: SUI,
    poolId: '0xe60bc7ade245b9f35b49686dfab0a18e5ca9176d49bef1b90f60d67d06315ff0',
  },
  {
    coinA: WAL,
    coinB: USDC,
    poolId: '0xbcc6909d2e85c06cf9cbfe5b292da36f5bfa0f314806474bbf6a0bf9744d37ce',
  },
  {
    coinA: SUI,
    coinB: LBTC,
    poolId: '0xa0153768c7ed857ffd8bad4708da873fb7825a6878e5f4c83f5df4c091933e56',
  },
  {
    coinA: wBTC,
    coinB: USDC,
    poolId: '0xf0e4772e80800550368973d1f8ab2c9a7241ace8df8770452ee2bf3e3e67b8a1',
  },
  {
    coinA: xBTC,
    coinB: wBTC,
    poolId: '0x6490f12f357a95dd5cb2415258efc3377a73ef0979a3f785a05ab67351ed4a98',
  },
  {
    coinA: xBTC,
    coinB: USDC,
    poolId: '0x1b0cc1c66185ceb8eccbc807c73243ce957f0053dfa1026149265bb2ff704a07',
  },
].map(p => ({ ...p, type: 'dex', protocol: 'bluefin' }))

export const STAKING_INFOS: Array<StakingInfo> = [
  {
    coinA: stSUI,
    coinB: SUI,
    type: 'staking',
    protocol: 'stsui',
  },
]

export const ALL_POOL_INFOS: Array<PoolInfo> = [
  ...BLUEFIN_POOL_INFOS,
  ...STAKING_INFOS,
  ...CETUS_POOL_INFOS,
]
