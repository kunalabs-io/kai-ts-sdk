// Shared on-chain infrastructure objects that the leverage SDK builds
// transactions against — the DEXes (Cetus, Bluefin) and the oracle stack
// (Pyth, Wormhole). These are *environment-scoped* addresses, the same
// category as package `publishedAt` addresses: on mainnet they're the
// canonical deployments; on testnet or a fresh local validator they live at
// different object IDs.
//
// High-level SDK methods resolve these from the active infra via
// `getActiveProtocolInfra()` rather than hardcoding the mainnet values, so the
// same code path works against any chain once the active infra is set with
// `setActiveProtocolInfra()`. Mirrors the active-env mechanism behind
// `getPublishedAt`.
//
// The individual named constants below remain exported (public API) for code
// that genuinely targets mainnet — e.g. services and GraphQL queries against
// mainnet checkpoints — where a fixed literal is clearer than the active
// lookup. They also seed `MAINNET_PROTOCOL_INFRA` so the literals live in one
// place.

/** Cetus CLMM `GlobalConfig` shared object (mainnet). */
export const CETUS_GLOBAL_CONFIG_ID =
  '0xdaa46292632c3c4d8f31f23ea0f9b36a28ff3677e9684980e4438403a67a3d8f'
/** Cetus rewarder `GlobalVault` shared object (mainnet). */
export const CETUS_REWARDER_GLOBAL_VAULT =
  '0xce7bceef26d3ad1f6d9b6f13a953f053e6ed3ca77907516481ce99ae8e588f2b'
/** Bluefin spot `GlobalConfig` shared object (mainnet). */
export const BLUEFIN_GLOBAL_CONFIG_ID =
  '0x03db251ba509a8d5d8777b6338836082335d93eecbdd09a11e190a1cff51c352'
/**
 * Pyth Pro `State` shared object (mainnet). Belongs to the pro-compatible pyth
 * package `0x55300367a2d40813727ccac4ecee977a39fb9cdb46f2e6b2c354b9798f5de2c0`
 * (the `pyth` package in gen); the legacy pyth `State`
 * (`0x1f9310238ee9298fb703c3419030b35b22bb1cc37113e3bb5007c99aec79e5b8`) is no
 * longer used.
 */
export const PYTH_STATE_ID = '0x03719fae774ddab3cfcaa53bbc046f0cbe21410019b6280811bf3f9f4b05839d'
/**
 * Wormhole `State` shared object (mainnet) of the simple-majority wormhole
 * deployment `0x99de5c967d8206ef4b75c0afab3df2a59eb02b05c282821db803831008ac25b4`
 * that the Pyth Pro package verifies VAAs against; the classic wormhole `State`
 * (`0xaeab97f96cf9877fee2883315d459552b2b921edc16d7ceac6eab944dd88919c`) is no
 * longer used.
 */
export const WORMHOLE_STATE_ID =
  '0xdbca52b9fb4f712e25f61f974586d93ac541bcf8389564f0323bb07215168b5c'

export interface ProtocolInfra {
  /** Cetus CLMM `GlobalConfig` shared object. */
  cetusGlobalConfig: string
  /** Cetus rewarder `GlobalVault` shared object. */
  cetusRewarderGlobalVault: string
  /** Bluefin spot `GlobalConfig` shared object. */
  bluefinGlobalConfig: string
  /** Pyth `State` shared object. */
  pythState: string
  /** Wormhole `State` shared object. */
  wormholeState: string
}

/** The canonical mainnet protocol infrastructure addresses. */
export const MAINNET_PROTOCOL_INFRA: ProtocolInfra = {
  cetusGlobalConfig: CETUS_GLOBAL_CONFIG_ID,
  cetusRewarderGlobalVault: CETUS_REWARDER_GLOBAL_VAULT,
  bluefinGlobalConfig: BLUEFIN_GLOBAL_CONFIG_ID,
  pythState: PYTH_STATE_ID,
  wormholeState: WORMHOLE_STATE_ID,
}

// Process-global active infra, defaulting to mainnet. Same model as the active
// environment: a single target per process. Tests / non-mainnet consumers call
// `setActiveProtocolInfra` after activating their env.
let activeProtocolInfra: ProtocolInfra = MAINNET_PROTOCOL_INFRA

/** Set the active protocol infrastructure addresses for subsequent SDK calls. */
export function setActiveProtocolInfra(infra: ProtocolInfra): void {
  activeProtocolInfra = infra
}

/** Get the currently-active protocol infrastructure addresses (defaults to mainnet). */
export function getActiveProtocolInfra(): ProtocolInfra {
  return activeProtocolInfra
}
