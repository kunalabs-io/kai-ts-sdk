/**
 * Published-at addresses of the kai-leverage packages that pass the on-chain
 * version gates at a given checkpoint, for pinning checkpoint-consistent
 * (historical) dev-inspects.
 *
 * The newest package published as of a checkpoint (UpgradeCap resolution) is
 * NOT a safe pin: between a package publish and its config-migration ceremony
 * the configs still carry the previous version, and the new package's version
 * gate aborts every read (bit us at the pyth-pro cutover: v19 published at cp
 * 314942018, configs migrated to v5 at cp 314961231 — every historical
 * dev-inspect in the gap aborted). The config's on-chain `version` at the
 * target checkpoint is the authoritative discriminator of which package's
 * version gate accepts the state.
 *
 * Within an era, only a package that already existed at the checkpoint can be
 * executed there: the historical dev-inspect service resolves packages, like
 * every other object, as of the target checkpoint. So each era lists all of
 * its packages with their publish checkpoints and
 * {@link getKaiLeveragePublishedAt} picks the newest one published at or
 * before the checkpoint (bit us at the cetus clmm v14 re-link: v20 published
 * at cp 320578328 while the interval being advanced ended at cp 320462422).
 *
 * Maintenance (enforced by package-eras.test.ts):
 * - On a kai-leverage upgrade that bumps `CONFIG_VERSION`, add an era with
 *   the new version.
 * - On an upgrade that does NOT bump `CONFIG_VERSION`, prepend the new
 *   package to the latest era (any package whose `CONFIG_VERSION` matches is
 *   a valid pin; prefer the newest).
 *
 * Ceremony rules no client-side pin can compensate for:
 * - A `POSITION_VERSION` bump must be paired with a `CONFIG_VERSION` bump, so
 *   the config version stays a total discriminator of package eras.
 * - Position migrates must land in the same tx as the config migrates (or
 *   immediate follow-ups): at a checkpoint where the config is migrated but a
 *   position isn't, no package passes both version gates and the position is
 *   unreadable.
 *
 * Historical eras were populated 2026-08-26 from on-chain evidence (per-version
 * bytecode disassembly of the migrate/check constants + the migration ceremony
 * txs); publish checkpoints from the package upgrade chain. Era boundaries are
 * the ceremony checkpoints, and each era's pin also matches the position
 * version live during it (config/position versions were driven by a single
 * constant until the v17 split left positions at 3).
 *
 * Two mixed windows where NO pin fully works (object set mid-migration):
 * - cp 154261345–154861644 (2025-06-08/09): config 1→2 ran in two waves ~39h
 *   apart with the position 1→2 campaign in between; protocol was halted.
 * - cp 172313245–172313415 (~40s): config 2→3 landed before the position
 *   batches.
 * See {@link KAI_LEVERAGE_DEAD_WINDOWS} for windows a dependency's version
 * gate closes.
 */

export interface KaiLeveragePackageVersion {
  /** kai-leverage package version (UpgradeCap version). */
  version: number
  /** Address the package version was published at. */
  publishedAt: string
  /** Checkpoint of the publish / upgrade tx. */
  publishedAtCheckpoint: number
}

/**
 * kai-leverage packages by the on-chain `PositionConfig.version` (era) whose
 * version gate they pass, newest first.
 */
export const KAI_LEVERAGE_PACKAGE_ERAS: ReadonlyMap<number, readonly KaiLeveragePackageVersion[]> =
  new Map([
    // Era 1: cp 71016696–154261345 (pkg v1–v10)
    [
      1,
      [
        {
          version: 10,
          publishedAt: '0x8e0d78aecb4488da5a6f8c089106934d756a91b757b0f9404b03f966288cd7cb',
          publishedAtCheckpoint: 153842547,
        },
        {
          version: 9,
          publishedAt: '0x014ecd52a8a8e5c9283250c5fae31dfcd755dda2febe077ef578c6091fd7f420',
          publishedAtCheckpoint: 148308138,
        },
        {
          version: 8,
          publishedAt: '0x3243f917288858e2c4fcfd2a937dda02b29384cc13d3063a720969c331920e45',
          publishedAtCheckpoint: 126210273,
        },
        {
          version: 7,
          publishedAt: '0x606f09f90233f7ccb01e49b1f53eea566f2e0713d0ff5717fe46cae83babdc1e',
          publishedAtCheckpoint: 113688578,
        },
        {
          version: 6,
          publishedAt: '0xe6079b606e2c6ea73511f1c22f31c2312e3610a3916908174b415147a37040d8',
          publishedAtCheckpoint: 107139757,
        },
        {
          version: 5,
          publishedAt: '0x9fd1f3955e4f9b943fd0812e3a4e3629c163ca772be7438e79b85d7734a580b6',
          publishedAtCheckpoint: 101262821,
        },
        {
          version: 4,
          publishedAt: '0x3c5784759be384704d164c58e7f22afce5bdca6723f1a4d25c8fd8be6ad782dd',
          publishedAtCheckpoint: 95496221,
        },
        {
          version: 3,
          publishedAt: '0x0f6e43ba7dc3fdb1dad3fcc5b7d431b6527aa1bf877a1b24d6865becfa14f8d1',
          publishedAtCheckpoint: 92533913,
        },
        {
          version: 2,
          publishedAt: '0x910af25860c605272f1be30dcea26df1f4470b1b76803c4bbdf7bcc0d985409e',
          publishedAtCheckpoint: 71068681,
        },
        {
          version: 1,
          publishedAt: '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
          publishedAtCheckpoint: 71016696,
        },
      ],
    ],
    // Era 2: cp 154861644–172313245 (pkg v11–v15)
    [
      2,
      [
        {
          version: 15,
          publishedAt: '0x48a52929e1b289e9ff351f5ba7de5db0b16dc2c4c6fa1528de94b841ba6b924b',
          publishedAtCheckpoint: 171498851,
        },
        {
          version: 14,
          publishedAt: '0xdc0ec513ffa60ed67534393f885504222a12ca067313b4511ad26b7f17a0eded',
          publishedAtCheckpoint: 167731603,
        },
        {
          version: 13,
          publishedAt: '0x80a8b7b277a0414652973f0ac947af0a4490ec047b5dafabe389028d008d7368',
          publishedAtCheckpoint: 167228508,
        },
        {
          version: 12,
          publishedAt: '0x7afd8492de6e367d17c6a3056393ecf5544489eaf0234affcf2f5e9fff9240e3',
          publishedAtCheckpoint: 154456711,
        },
        {
          version: 11,
          publishedAt: '0x49691904e57eff80e1409e6c71f643fecb5b7eeec97a1b4b97205a7317bed12a',
          publishedAtCheckpoint: 154258709,
        },
      ],
    ],
    // Era 3: cp 172313245–213826867 (pkg v16)
    [
      3,
      [
        {
          version: 16,
          publishedAt: '0xd98a76e61b2499856e1958291b2c170a02e6c43d555d18f2f2f7d2741736481b',
          publishedAtCheckpoint: 172231262,
        },
      ],
    ],
    // Era 4: cp 213826867–314961231 (pkg v17–v18, pyth core rail)
    [
      4,
      [
        {
          version: 18,
          publishedAt: '0xf259194ebadf4a68c7dd0103483aa6c6e0e058597c02c390a398092892192f6f',
          publishedAtCheckpoint: 222069964,
        },
        {
          version: 17,
          publishedAt: '0x75d4514b2022c7edda6dd311c8a9b6f226e270d893cc3c0e863a60e51d6d9499',
          publishedAtCheckpoint: 213637090,
        },
      ],
    ],
    // Era 5: cp 314961231– (pkg v19–v20, pyth pro rail; v20 = cetus clmm v14 re-link)
    [
      5,
      [
        {
          version: 20,
          publishedAt: '0x9dc365fd6716a2f4d567f0e0423e0d42d85d3a10038542166d95bf8c7406a508',
          publishedAtCheckpoint: 320578328,
        },
        {
          version: 19,
          publishedAt: '0x634794be3a538c645f9afbb8f652455a665df57e8ccaca69de879c1feb08d908',
          publishedAtCheckpoint: 314942018,
        },
      ],
    ],
  ])

/**
 * Newest published-at of each era. A checkpoint-agnostic pin: only valid at
 * checkpoints at or after that package's publish. Prefer
 * {@link getKaiLeveragePublishedAt} for historical work.
 */
export const KAI_LEVERAGE_PUBLISHED_AT_BY_CONFIG_VERSION: ReadonlyMap<number, string> = new Map(
  Array.from(KAI_LEVERAGE_PACKAGE_ERAS, ([configVersion, packages]) => [
    configVersion,
    packages[0].publishedAt,
  ])
)

/**
 * The newest kai-leverage package that passes the version gate of a config at
 * `configVersion` and already existed at `checkpoint`. Returns `undefined` for
 * an era the map does not cover. If the checkpoint predates every package of
 * the era (impossible for a config that is at that version), the era's oldest
 * package is returned.
 */
export function getKaiLeveragePublishedAt(
  configVersion: number,
  checkpoint: number
): string | undefined {
  const packages = KAI_LEVERAGE_PACKAGE_ERAS.get(configVersion)
  if (!packages) return undefined
  const pkg = packages.find(p => p.publishedAtCheckpoint <= checkpoint)
  return (pkg ?? packages[packages.length - 1]).publishedAt
}

export type KaiLeverageDex = 'cetus' | 'bluefin'

export interface KaiLeverageDeadWindow {
  /** First checkpoint at which no package passes (inclusive). */
  startCheckpoint: number
  /** First checkpoint at which a package passes again (exclusive). */
  endCheckpoint: number
  /** Positions on this DEX are unreadable in the window; others are unaffected. */
  dex: KaiLeverageDex
  reason: string
}

/**
 * Checkpoint windows where NO kai-leverage package can execute a DEX code
 * path: the DEX flipped its own on-chain version gate, and the kai-leverage
 * package re-linked against the new DEX version did not exist yet. Every
 * dev-inspect touching that DEX aborts (or fails to resolve the package) at
 * these checkpoints, so callers have to skip them rather than retry.
 *
 * Positions on that DEX cannot have DEX-touching events inside the window
 * either — every such tx aborted on chain — so skipping a snapshot there loses
 * nothing that could have been computed.
 */
export const KAI_LEVERAGE_DEAD_WINDOWS: readonly KaiLeverageDeadWindow[] = [
  {
    // Cetus set GlobalConfig.package_version 12 -> 14 (tx CC8Ep1omF6wAnL75
    // ioaCPRsy8F7DoeR8ekQGBheVtyUE); v19 links cetus clmm v13 and aborts with
    // EPackageVersionDeprecate, v20 (cetus clmm v14) was published at cp
    // 320578328.
    startCheckpoint: 320460079,
    endCheckpoint: 320578328,
    dex: 'cetus',
    reason: 'cetus clmm package_version 12 -> 14; kai-leverage v20 re-link not yet published',
  },
]

/** Whether `checkpoint` falls in a dead window for `dex` (any DEX if omitted). */
export function isKaiLeverageDeadWindow(checkpoint: number, dex?: KaiLeverageDex): boolean {
  return KAI_LEVERAGE_DEAD_WINDOWS.some(
    w =>
      (dex === undefined || w.dex === dex) &&
      checkpoint >= w.startCheckpoint &&
      checkpoint < w.endCheckpoint
  )
}
