# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- CONTRIBUTING.md with contribution guidelines
- CHANGELOG.md to track version history

## [0.24.0] - 2025-01-05

### Changed
- Sync price cache changes

## [0.23.0] - 2024-12-22

### Changed
- Sync changes with upstream protocol

## [0.22.0] - 2024-12-15

### Changed
- Sync changes with upstream protocol

## [0.21.0] - 2024-11-17

### Changed
- Sync changes with upstream protocol

## [0.20.0] - 2024-11-10

### Changed
- Sync changes with upstream protocol

## [0.19.0] - 2024-10-27

### Added
- New Bluefin configuration support

### Changed
- Updated `position.reduceAndMaybeDelete` in README

## [0.18.0] - 2024-10-20

### Changed
- Updated kai-leverage-util published-at to new version

## [0.17.0] - 2024-10-13

### Changed
- Sync changes with upstream protocol

## [0.16.0] - 2024-10-06

### Changed
- Sync changes with upstream protocol

## [0.15.0] - 2024-09-29

### Added
- Liquidation framework README documentation

### Changed
- Ignore positions below certain asset value threshold
- Improved metrics handling when undefined

## [0.13.0] - 2024-09-15

### Changed
- Updated package versions in gen
- Sync changes with Cetus incident fixes

## [0.10.0] - 2024-08-25

### Added
- `calcLiqFromAmountX` and `calcLiqFromAmountY` functions to position-math
- Bluefin DEEP/SUI configuration info

### Changed
- Improved `findVaultInfoById` return type

## [0.9.0] - 2024-08-11

### Added
- `calcEffectiveInterestRate` method to `Position`

### Changed
- Regenerated gen files
- Updated gen.toml for new version of Cetus dependency

## [0.8.0] - 2024-08-04

### Changed
- Upgraded @mysten/sui dependency
- Updated SAV gen import paths
- Regenerated gen files

## [0.7.0] - 2024-07-28

### Fixed
- Withdraw all stashed rewards when closing position

## [0.6.0] - 2024-07-21

### Fixed
- Collect stashed rewards properly
- Fixed USDC icon

### Changed
- Bumped util package ID

## [0.5.0] - 2024-07-14

### Added
- `getAllVaultStats` function

## [0.4.0] - 2024-07-07

### Added
- DEEP vault support
- DEEP-SUI Cetus LP configuration

## [0.3.0] - 2024-06-30

### Added
- Wallet all vault info utility function

### Changed
- Clarified UX and UY in README

## [0.2.0] - 2024-06-23

### Added
- USDY token support

### Changed
- Updated README documentation

## [0.1.0] - 2024-06-16

### Added
- Initial release
- Single Asset Vault support (deposit, withdraw, stats)
- LP Position management (create, reduce, close)
- Position information and calculations
- Reward withdrawal and compounding
- Liquidation framework with position monitoring
- Support for Cetus and Bluefin protocols
- TypeScript bindings for Sui Move contracts
