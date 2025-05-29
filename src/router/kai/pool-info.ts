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
    coinA: BLUE,
    coinB: SUI,
    poolId: '0x040dc6a93bd4f26ea9507c70f19eb1a060fd5cb9c3718db372f4ae711ffbbb29',
  },
  {
    coinA: USDC,
    coinB: suiUSDT,
    poolId: '0x7df346f8ef98ad20869ff6d2fc7c43c00403a524987509091b39ce61dde00957',
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
    coinB: SUI,
    poolId: '0x1b06371d74082856a1be71760cf49f6a377d050eb57afd017f203e89b09c89a2',
  },
  {
    coinA: whUSDCe,
    coinB: USDC,
    poolId: '0x0c89fd0320b406311c05f1ed8c4656b4ab7ed14999a992cc6c878c2fad405140',
  },
  {
    coinA: BLUE,
    coinB: USDC,
    poolId: '0x682f4b17874ec47723bb527cf21e18b630eba0699d10781740cd0a7964dc6b19',
  },
  {
    coinA: DEEP,
    coinB: USDC,
    poolId: '0xd5e3a3c7396702d8f358a63ef921cc7c1951f52c6dfc2051cc8772cf7cb9900c',
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
  ...CETUS_POOL_INFOS,
  ...BLUEFIN_POOL_INFOS,
  ...STAKING_INFOS,
]
