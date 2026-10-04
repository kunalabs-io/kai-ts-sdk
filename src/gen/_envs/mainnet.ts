import type { EnvConfig } from '../_framework/env'

export const mainnetEnv: EnvConfig = {
  packages: {
    'std': {
      originalId: '0x1',
      publishedAt: '0x1',
      typeOrigins: {
        'ascii::Char': '0x1',
        'ascii::String': '0x1',
        'bit_vector::BitVector': '0x1',
        'fixed_point32::FixedPoint32': '0x1',
        'internal::Permit': '0x1',
        'option::Option': '0x1',
        'string::String': '0x1',
        'type_name::TypeName': '0x1',
        'uq32_32::UQ32_32': '0x1',
        'uq64_64::UQ64_64': '0x1',
      },
    },
    'sui': {
      originalId: '0x2',
      publishedAt: '0x2',
      typeOrigins: {
        'accumulator::AccumulatorRoot': '0x2',
        'accumulator::Key': '0x2',
        'accumulator::U128': '0x2',
        'accumulator_metadata::AccumulatorObjectCountKey': '0x2',
        'accumulator_metadata::Metadata': '0x2',
        'accumulator_metadata::MetadataKey': '0x2',
        'accumulator_metadata::Owner': '0x2',
        'accumulator_metadata::OwnerKey': '0x2',
        'accumulator_settlement::EventStreamHead': '0x2',
        'address_alias::AddressAliasState': '0x2',
        'address_alias::AddressAliases': '0x2',
        'address_alias::AliasKey': '0x2',
        'authenticator_state::ActiveJwk': '0x2',
        'authenticator_state::AuthenticatorState': '0x2',
        'authenticator_state::AuthenticatorStateInner': '0x2',
        'authenticator_state::JWK': '0x2',
        'authenticator_state::JwkId': '0x2',
        'bag::Bag': '0x2',
        'balance::Balance': '0x2',
        'balance::Supply': '0x2',
        'bcs::BCS': '0x2',
        'bls12381::G1': '0x2',
        'bls12381::G2': '0x2',
        'bls12381::GT': '0x2',
        'bls12381::Scalar': '0x2',
        'bls12381::UncompressedG1': '0x2',
        'borrow::Borrow': '0x2',
        'borrow::Referent': '0x2',
        'clock::Clock': '0x2',
        'coin::Coin': '0x2',
        'coin::CoinMetadata': '0x2',
        'coin::CurrencyCreated': '0x2',
        'coin::DenyCap': '0x2',
        'coin::DenyCapV2': '0x2',
        'coin::RegulatedCoinMetadata': '0x2',
        'coin::TreasuryCap': '0x2',
        'coin_registry::Borrow': '0x2',
        'coin_registry::CoinRegistry': '0x2',
        'coin_registry::Currency': '0x2',
        'coin_registry::CurrencyInitializer': '0x2',
        'coin_registry::CurrencyKey': '0x2',
        'coin_registry::ExtraField': '0x2',
        'coin_registry::LegacyMetadataKey': '0x2',
        'coin_registry::MetadataCap': '0x2',
        'coin_registry::MetadataCapState': '0x2',
        'coin_registry::RegulatedState': '0x2',
        'coin_registry::SupplyState': '0x2',
        'config::Config': '0x2',
        'config::Setting': '0x2',
        'config::SettingData': '0x2',
        'deny_list::AddressKey': '0x2',
        'deny_list::ConfigKey': '0x2',
        'deny_list::ConfigWriteCap': '0x2',
        'deny_list::DenyList': '0x2',
        'deny_list::GlobalPauseKey': '0x2',
        'deny_list::PerTypeConfigCreated': '0x2',
        'deny_list::PerTypeList': '0x2',
        'derived_object::Claimed': '0x2',
        'derived_object::ClaimedStatus': '0x2',
        'derived_object::DerivedObjectKey': '0x2',
        'display::Display': '0x2',
        'display::DisplayCreated': '0x2',
        'display::VersionUpdated': '0x2',
        'display_registry::Display': '0x2',
        'display_registry::DisplayCap': '0x2',
        'display_registry::DisplayKey': '0x2',
        'display_registry::DisplayRegistry': '0x2',
        'display_registry::SystemMigrationCap': '0x2',
        'dynamic_field::Field': '0x2',
        'dynamic_object_field::Wrapper': '0x2',
        'forwarding_address::ForwardingAddressRegistry': '0x2',
        'funds_accumulator::Withdrawal': '0x2',
        'groth16::Curve': '0x2',
        'groth16::PreparedVerifyingKey': '0x2',
        'groth16::ProofPoints': '0x2',
        'groth16::PublicProofInputs': '0x2',
        'group_ops::Element': '0x2',
        'kiosk::Borrow': '0x2',
        'kiosk::Item': '0x2',
        'kiosk::ItemDelisted': '0x2',
        'kiosk::ItemListed': '0x2',
        'kiosk::ItemPurchased': '0x2',
        'kiosk::Kiosk': '0x2',
        'kiosk::KioskOwnerCap': '0x2',
        'kiosk::Listing': '0x2',
        'kiosk::Lock': '0x2',
        'kiosk::PurchaseCap': '0x2',
        'kiosk_extension::Extension': '0x2',
        'kiosk_extension::ExtensionKey': '0x2',
        'linked_table::LinkedTable': '0x2',
        'linked_table::Node': '0x2',
        'nitro_attestation::NitroAttestationDocument': '0x2',
        'nitro_attestation::PCREntry': '0x2',
        'object::ID': '0x2',
        'object::UID': '0x2',
        'object_bag::ObjectBag': '0x2',
        'object_table::ObjectTable': '0x2',
        'package::Publisher': '0x2',
        'package::UpgradeCap': '0x2',
        'package::UpgradeReceipt': '0x2',
        'package::UpgradeTicket': '0x2',
        'party::Party': '0x2',
        'party::Permissions': '0x2',
        'priority_queue::Entry': '0x2',
        'priority_queue::PriorityQueue': '0x2',
        'random::Random': '0x2',
        'random::RandomGenerator': '0x2',
        'random::RandomInner': '0x2',
        'ristretto255::G': '0x2',
        'ristretto255::Scalar': '0x2',
        'scratch::BorrowMarker': '0x2',
        'scratch::BorrowMarkerKey': '0x2',
        'scratch::Permit': '0x2',
        'sui::SUI': '0x2',
        'table::Table': '0x2',
        'table_vec::TableVec': '0x2',
        'token::ActionRequest': '0x2',
        'token::RuleKey': '0x2',
        'token::Token': '0x2',
        'token::TokenPolicy': '0x2',
        'token::TokenPolicyCap': '0x2',
        'token::TokenPolicyCreated': '0x2',
        'transfer::Receiving': '0x2',
        'transfer_policy::RuleKey': '0x2',
        'transfer_policy::TransferPolicy': '0x2',
        'transfer_policy::TransferPolicyCap': '0x2',
        'transfer_policy::TransferPolicyCreated': '0x2',
        'transfer_policy::TransferPolicyDestroyed': '0x2',
        'transfer_policy::TransferRequest': '0x2',
        'tx_context::TxContext': '0x2',
        'url::Url': '0x2',
        'vec_map::Entry': '0x2',
        'vec_map::VecMap': '0x2',
        'vec_set::VecSet': '0x2',
        'versioned::VersionChangeCap': '0x2',
        'versioned::Versioned': '0x2',
        'zklogin_verified_id::VerifiedID': '0x2',
        'zklogin_verified_issuer::VerifiedIssuer': '0x2',
      },
    },
    'kai-sav': {
      originalId: '0x1c389a85310b47e7630a9361d4e71025bc35e4999d3a645949b1b68b26f2273',
      publishedAt: '0xcf5d0f55b02304f03b99a89372567a4072c944ceb718764c502b34c7b8dfd6ae',
      typeOrigins: {
        'kai_leverage_supply_pool::AdminCap':
          '0xe1e61a4b2c25bbc965f40fb895d9d6b9ebe327b9f3e34eb84b1c8dfc7df574ce',
        'kai_leverage_supply_pool::IncentiveInjectInfo':
          '0xe1e61a4b2c25bbc965f40fb895d9d6b9ebe327b9f3e34eb84b1c8dfc7df574ce',
        'kai_leverage_supply_pool::Strategy':
          '0xe1e61a4b2c25bbc965f40fb895d9d6b9ebe327b9f3e34eb84b1c8dfc7df574ce',
        'scallop_sui::AdminCap':
          '0x7a0269c65d5d156963ed0250c81baf16c4d1d56cb6c1738743770409298dc010',
        'scallop_sui::Strategy':
          '0x7a0269c65d5d156963ed0250c81baf16c4d1d56cb6c1738743770409298dc010',
        'scallop_sui_proper::AdminCap':
          '0xaf110d3f48cd524ba378c05c56330c2a6afde183a14abff8a731268163ff6618',
        'scallop_sui_proper::Strategy':
          '0xaf110d3f48cd524ba378c05c56330c2a6afde183a14abff8a731268163ff6618',
        'scallop_whusdce::AdminCap':
          '0x1c389a85310b47e7630a9361d4e71025bc35e4999d3a645949b1b68b26f2273',
        'scallop_whusdce::Strategy':
          '0x1c389a85310b47e7630a9361d4e71025bc35e4999d3a645949b1b68b26f2273',
        'scallop_whusdte::AdminCap':
          '0x7a0269c65d5d156963ed0250c81baf16c4d1d56cb6c1738743770409298dc010',
        'scallop_whusdte::Strategy':
          '0x7a0269c65d5d156963ed0250c81baf16c4d1d56cb6c1738743770409298dc010',
        'scallop_whusdte_proper::AdminCap':
          '0xaf110d3f48cd524ba378c05c56330c2a6afde183a14abff8a731268163ff6618',
        'scallop_whusdte_proper::Strategy':
          '0xaf110d3f48cd524ba378c05c56330c2a6afde183a14abff8a731268163ff6618',
        'time_locked_balance::TimeLockedBalance':
          '0x1c389a85310b47e7630a9361d4e71025bc35e4999d3a645949b1b68b26f2273',
        'vault::AdminCap': '0x1c389a85310b47e7630a9361d4e71025bc35e4999d3a645949b1b68b26f2273',
        'vault::DepositEvent': '0x7a0269c65d5d156963ed0250c81baf16c4d1d56cb6c1738743770409298dc010',
        'vault::RebalanceAmounts':
          '0x1c389a85310b47e7630a9361d4e71025bc35e4999d3a645949b1b68b26f2273',
        'vault::RebalanceInfo': '0x1c389a85310b47e7630a9361d4e71025bc35e4999d3a645949b1b68b26f2273',
        'vault::StrategyLossEvent':
          '0x7a0269c65d5d156963ed0250c81baf16c4d1d56cb6c1738743770409298dc010',
        'vault::StrategyProfitEvent':
          '0x7a0269c65d5d156963ed0250c81baf16c4d1d56cb6c1738743770409298dc010',
        'vault::StrategyRemovalTicket':
          '0x1c389a85310b47e7630a9361d4e71025bc35e4999d3a645949b1b68b26f2273',
        'vault::StrategyState': '0x1c389a85310b47e7630a9361d4e71025bc35e4999d3a645949b1b68b26f2273',
        'vault::StrategyWithdrawInfo':
          '0x1c389a85310b47e7630a9361d4e71025bc35e4999d3a645949b1b68b26f2273',
        'vault::Vault': '0x1c389a85310b47e7630a9361d4e71025bc35e4999d3a645949b1b68b26f2273',
        'vault::VaultAccess': '0x1c389a85310b47e7630a9361d4e71025bc35e4999d3a645949b1b68b26f2273',
        'vault::WithdrawEvent':
          '0x7a0269c65d5d156963ed0250c81baf16c4d1d56cb6c1738743770409298dc010',
        'vault::WithdrawTicket':
          '0x1c389a85310b47e7630a9361d4e71025bc35e4999d3a645949b1b68b26f2273',
        'ysui::YSUI': '0x7a0269c65d5d156963ed0250c81baf16c4d1d56cb6c1738743770409298dc010',
        'ywhusdce::YWHUSDCE': '0x1c389a85310b47e7630a9361d4e71025bc35e4999d3a645949b1b68b26f2273',
        'ywhusdte::YWHUSDTE': '0x7a0269c65d5d156963ed0250c81baf16c4d1d56cb6c1738743770409298dc010',
      },
    },
    'kai-leverage-util': {
      originalId: '0x1e8e36d73a53f7eaeba0d9913714c4727b6b667eede79ea2d5c7af14fa94d2a4',
      publishedAt: '0xd58a330f151e79ba09692494212cf688754bcfda034c11a6d97b0c176a4b6552',
      typeOrigins: {
        'batch_swap::BatchSwap':
          '0xd7f2af9b0c736ce49b1a5aad829e620cc6b743da419a5d09ff5f1a86cedfb5bd',
        'batch_swap::BatchSwapClaim':
          '0xd7f2af9b0c736ce49b1a5aad829e620cc6b743da419a5d09ff5f1a86cedfb5bd',
        'bluefin_spot::RebalanceReceipt':
          '0xceb1846391e7985be91e33c258290908cb44db8a73b6bb7a6e61d09ff39799e9',
        'bluefin_spot::WrappedFlashSwapReceipt':
          '0x1adbcaecaee925a4a4ea11f9ea02d14445ef0f6f6f00e049e2fa7f276508a3eb',
        'cetus::RebalanceReceipt':
          '0xd7f2af9b0c736ce49b1a5aad829e620cc6b743da419a5d09ff5f1a86cedfb5bd',
        'cetus::WrappedFlashSwapReceipt':
          '0x1e8e36d73a53f7eaeba0d9913714c4727b6b667eede79ea2d5c7af14fa94d2a4',
      },
    },
    'cetus-clmm': {
      originalId: '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
      publishedAt: '0x25ebb9a7c50eb17b3fa9c5a30fb8b5ad8f97caaf4928943acbcff7153dfee5e3',
      typeOrigins: {
        'acl::ACL': '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'acl::Member': '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'config::AddFeeTierEvent':
          '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'config::AddRoleEvent':
          '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'config::AdminCap': '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'config::DeleteFeeTierEvent':
          '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'config::FeeTier': '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'config::GlobalConfig':
          '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'config::InitConfigEvent':
          '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'config::ProtocolFeeClaimCap':
          '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'config::RemoveMemberEvent':
          '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'config::RemoveRoleEvent':
          '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'config::SetPackageVersion':
          '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'config::SetRolesEvent':
          '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'config::UpdateFeeRateEvent':
          '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'config::UpdateFeeTierEvent':
          '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'factory::AddAllowedListEvent':
          '0x157468379cfe5616c063ae39a889dd184ad48350d3e08f8d9b4ade22b8e3fb61',
        'factory::AddAllowedPairConfigEvent':
          '0x157468379cfe5616c063ae39a889dd184ad48350d3e08f8d9b4ade22b8e3fb61',
        'factory::AddDeniedListEvent':
          '0x157468379cfe5616c063ae39a889dd184ad48350d3e08f8d9b4ade22b8e3fb61',
        'factory::CreatePoolEvent':
          '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'factory::DenyCoinList':
          '0x157468379cfe5616c063ae39a889dd184ad48350d3e08f8d9b4ade22b8e3fb61',
        'factory::InitFactoryEvent':
          '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'factory::InitPermissionPairManagerEvent':
          '0x157468379cfe5616c063ae39a889dd184ad48350d3e08f8d9b4ade22b8e3fb61',
        'factory::MintPoolCreationCap':
          '0x157468379cfe5616c063ae39a889dd184ad48350d3e08f8d9b4ade22b8e3fb61',
        'factory::MintPoolCreationCapByAdmin':
          '0x157468379cfe5616c063ae39a889dd184ad48350d3e08f8d9b4ade22b8e3fb61',
        'factory::PermissionPairManager':
          '0x157468379cfe5616c063ae39a889dd184ad48350d3e08f8d9b4ade22b8e3fb61',
        'factory::PoolCreationCap':
          '0x157468379cfe5616c063ae39a889dd184ad48350d3e08f8d9b4ade22b8e3fb61',
        'factory::PoolKey': '0x157468379cfe5616c063ae39a889dd184ad48350d3e08f8d9b4ade22b8e3fb61',
        'factory::PoolSimpleInfo':
          '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'factory::Pools': '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'factory::RegisterPermissionPairEvent':
          '0x157468379cfe5616c063ae39a889dd184ad48350d3e08f8d9b4ade22b8e3fb61',
        'factory::RemoveAllowedListEvent':
          '0x157468379cfe5616c063ae39a889dd184ad48350d3e08f8d9b4ade22b8e3fb61',
        'factory::RemoveAllowedPairConfigEvent':
          '0x157468379cfe5616c063ae39a889dd184ad48350d3e08f8d9b4ade22b8e3fb61',
        'factory::RemoveDeniedListEvent':
          '0x157468379cfe5616c063ae39a889dd184ad48350d3e08f8d9b4ade22b8e3fb61',
        'factory::UnregisterPermissionPairEvent':
          '0x157468379cfe5616c063ae39a889dd184ad48350d3e08f8d9b4ade22b8e3fb61',
        'partner::ClaimRefFeeEvent':
          '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'partner::CreatePartnerEvent':
          '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'partner::InitPartnerEvent':
          '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'partner::Partner': '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'partner::PartnerCap': '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'partner::Partners': '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'partner::ReceiveRefFeeEvent':
          '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'partner::UpdateRefFeeRateEvent':
          '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'partner::UpdateTimeRangeEvent':
          '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'pool::AddLiquidityEvent':
          '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'pool::AddLiquidityReceipt':
          '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'pool::AddLiquidityV2Event':
          '0xdb5cd62a06c79695bfc9982eb08534706d3752fe123b48e0144f480209b3117f',
        'pool::AddRewarderEvent':
          '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'pool::CalculatedSwapResult':
          '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'pool::ClosePositionEvent':
          '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'pool::CollectFeeEvent':
          '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'pool::CollectProtocolFeeEvent':
          '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'pool::CollectRewardEvent':
          '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'pool::CollectRewardV2Event':
          '0xdc67d6de3f00051c505da10d8f6fbab3b3ec21ec65f0dc22a2f36c13fc102110',
        'pool::FlashLoanEvent':
          '0xc6faf3703b0e8ba9ed06b7851134bbbe7565eb35ff823fd78432baa4cbeaa12e',
        'pool::FlashLoanReceipt':
          '0xc6faf3703b0e8ba9ed06b7851134bbbe7565eb35ff823fd78432baa4cbeaa12e',
        'pool::FlashSwapReceipt':
          '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'pool::OpenPositionEvent':
          '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'pool::POOL': '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'pool::Pool': '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'pool::PoolStatus': '0x75b2e9ecad34944b8d0c874e568c90db0cf9437f0d7392abfd4cb902972f3e40',
        'pool::ProtocolFeeCollectCap':
          '0x75b2e9ecad34944b8d0c874e568c90db0cf9437f0d7392abfd4cb902972f3e40',
        'pool::RemoveLiquidityEvent':
          '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'pool::RemoveLiquidityV2Event':
          '0xdb5cd62a06c79695bfc9982eb08534706d3752fe123b48e0144f480209b3117f',
        'pool::Status': '0x75b2e9ecad34944b8d0c874e568c90db0cf9437f0d7392abfd4cb902972f3e40',
        'pool::SwapEvent': '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'pool::SwapResult': '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'pool::SwapStepResult':
          '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'pool::UpdateEmissionEvent':
          '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'pool::UpdateFeeRateEvent':
          '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'pool::UpdatePoolStatusEvent':
          '0x75b2e9ecad34944b8d0c874e568c90db0cf9437f0d7392abfd4cb902972f3e40',
        'position::POSITION': '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'position::Position': '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'position::PositionInfo':
          '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'position::PositionManager':
          '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'position::PositionReward':
          '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'position_snapshot::PositionLiquiditySnapshot':
          '0x75b2e9ecad34944b8d0c874e568c90db0cf9437f0d7392abfd4cb902972f3e40',
        'position_snapshot::PositionSnapshot':
          '0x75b2e9ecad34944b8d0c874e568c90db0cf9437f0d7392abfd4cb902972f3e40',
        'rewarder::DepositEvent':
          '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'rewarder::EmergentWithdrawEvent':
          '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'rewarder::Rewarder': '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'rewarder::RewarderGlobalVault':
          '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'rewarder::RewarderInitEvent':
          '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'rewarder::RewarderManager':
          '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'tick::Tick': '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        'tick::TickManager': '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
      },
    },
    'bluefin-spot': {
      originalId: '0x3492c874c1e3b3e2984e8c41b589e642d4d0a5d6459e5a9cfc2d52fd7c89c267',
      publishedAt: '0xd075338d105482f1527cbfd363d6413558f184dec36d9138a70261e87f486e9c',
      typeOrigins: {
        'admin::AdminCap': '0x3492c874c1e3b3e2984e8c41b589e642d4d0a5d6459e5a9cfc2d52fd7c89c267',
        'admin::ProtocolFeeCap':
          '0x3492c874c1e3b3e2984e8c41b589e642d4d0a5d6459e5a9cfc2d52fd7c89c267',
        'config::GlobalConfig':
          '0x3492c874c1e3b3e2984e8c41b589e642d4d0a5d6459e5a9cfc2d52fd7c89c267',
        'events::AdminCapTransferred':
          '0x3492c874c1e3b3e2984e8c41b589e642d4d0a5d6459e5a9cfc2d52fd7c89c267',
        'events::AssetSwap': '0x3492c874c1e3b3e2984e8c41b589e642d4d0a5d6459e5a9cfc2d52fd7c89c267',
        'events::FlashSwap': '0x3492c874c1e3b3e2984e8c41b589e642d4d0a5d6459e5a9cfc2d52fd7c89c267',
        'events::LiquidityProvided':
          '0x3492c874c1e3b3e2984e8c41b589e642d4d0a5d6459e5a9cfc2d52fd7c89c267',
        'events::LiquidityRemoved':
          '0x3492c874c1e3b3e2984e8c41b589e642d4d0a5d6459e5a9cfc2d52fd7c89c267',
        'events::ObservationCardinalityUpdated':
          '0xf1962ddb76a7f9968b4e597278d3cc717a00620cc421b00e3429c5c071eba26a',
        'events::PoolCreated': '0x3492c874c1e3b3e2984e8c41b589e642d4d0a5d6459e5a9cfc2d52fd7c89c267',
        'events::PoolCreationFeeClaimed':
          '0xa31282fc0a0ad50cf5f20908cfbb1539a143f5a38912eb8823a8dd6cbf98bc44',
        'events::PoolCreationFeePaid':
          '0xa31282fc0a0ad50cf5f20908cfbb1539a143f5a38912eb8823a8dd6cbf98bc44',
        'events::PoolCreationFeeUpdate':
          '0xa31282fc0a0ad50cf5f20908cfbb1539a143f5a38912eb8823a8dd6cbf98bc44',
        'events::PoolIconUrlUpdate':
          '0x5d029d551d589105a9589e47ef75ffaa43e6d9d1d844745867db2a56e18f65e1',
        'events::PoolManagerUpdate':
          '0xf1962ddb76a7f9968b4e597278d3cc717a00620cc421b00e3429c5c071eba26a',
        'events::PoolPauseStatusUpdate':
          '0xf1962ddb76a7f9968b4e597278d3cc717a00620cc421b00e3429c5c071eba26a',
        'events::PoolRewardReservesIncreased':
          '0x702301e7c6ca527a6f6a83f12c5edf2dcd6ec7a23fb5318ec86d88282eab7057',
        'events::PoolTickUpdate':
          '0xf1962ddb76a7f9968b4e597278d3cc717a00620cc421b00e3429c5c071eba26a',
        'events::PositionClosed':
          '0x3492c874c1e3b3e2984e8c41b589e642d4d0a5d6459e5a9cfc2d52fd7c89c267',
        'events::PositionOpened':
          '0x3492c874c1e3b3e2984e8c41b589e642d4d0a5d6459e5a9cfc2d52fd7c89c267',
        'events::ProtocolFeeCapTransferred':
          '0x3492c874c1e3b3e2984e8c41b589e642d4d0a5d6459e5a9cfc2d52fd7c89c267',
        'events::ProtocolFeeCollected':
          '0x3492c874c1e3b3e2984e8c41b589e642d4d0a5d6459e5a9cfc2d52fd7c89c267',
        'events::ProtocolFeeShareUpdated':
          '0xf1962ddb76a7f9968b4e597278d3cc717a00620cc421b00e3429c5c071eba26a',
        'events::RewardsManagerUpdate':
          '0xf1962ddb76a7f9968b4e597278d3cc717a00620cc421b00e3429c5c071eba26a',
        'events::SupportedVersionUpdate':
          '0xbc70b10012a01c00fda8957dbaa1f2b83683414f55e22341792b081fdffa9baa',
        'events::TickUpdate': '0xbc70b10012a01c00fda8957dbaa1f2b83683414f55e22341792b081fdffa9baa',
        'events::UpdatePoolRewardEmissionEvent':
          '0x3492c874c1e3b3e2984e8c41b589e642d4d0a5d6459e5a9cfc2d52fd7c89c267',
        'events::UserFeeCollected':
          '0x3492c874c1e3b3e2984e8c41b589e642d4d0a5d6459e5a9cfc2d52fd7c89c267',
        'events::UserRewardCollected':
          '0x3492c874c1e3b3e2984e8c41b589e642d4d0a5d6459e5a9cfc2d52fd7c89c267',
        'oracle::Observation': '0x3492c874c1e3b3e2984e8c41b589e642d4d0a5d6459e5a9cfc2d52fd7c89c267',
        'oracle::ObservationManager':
          '0x3492c874c1e3b3e2984e8c41b589e642d4d0a5d6459e5a9cfc2d52fd7c89c267',
        'pool::FlashSwapReceipt':
          '0x3492c874c1e3b3e2984e8c41b589e642d4d0a5d6459e5a9cfc2d52fd7c89c267',
        'pool::Pool': '0x3492c874c1e3b3e2984e8c41b589e642d4d0a5d6459e5a9cfc2d52fd7c89c267',
        'pool::PoolRewardInfo':
          '0x3492c874c1e3b3e2984e8c41b589e642d4d0a5d6459e5a9cfc2d52fd7c89c267',
        'pool::SwapResult': '0x3492c874c1e3b3e2984e8c41b589e642d4d0a5d6459e5a9cfc2d52fd7c89c267',
        'pool::SwapStepResult':
          '0x3492c874c1e3b3e2984e8c41b589e642d4d0a5d6459e5a9cfc2d52fd7c89c267',
        'position::POSITION': '0x3492c874c1e3b3e2984e8c41b589e642d4d0a5d6459e5a9cfc2d52fd7c89c267',
        'position::Position': '0x3492c874c1e3b3e2984e8c41b589e642d4d0a5d6459e5a9cfc2d52fd7c89c267',
        'position::PositionRewardInfo':
          '0x3492c874c1e3b3e2984e8c41b589e642d4d0a5d6459e5a9cfc2d52fd7c89c267',
        'tick::TickInfo': '0x3492c874c1e3b3e2984e8c41b589e642d4d0a5d6459e5a9cfc2d52fd7c89c267',
        'tick::TickManager': '0x3492c874c1e3b3e2984e8c41b589e642d4d0a5d6459e5a9cfc2d52fd7c89c267',
      },
    },
    'kai-leverage': {
      originalId: '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
      publishedAt: '0x9dc365fd6716a2f4d567f0e0423e0d42d85d3a10038542166d95bf8c7406a508',
      typeOrigins: {
        'access_init::ACCESS_INIT':
          '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'balance_bag::BalanceBag':
          '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'cetus::AHandleExploitedPosition':
          '0x7afd8492de6e367d17c6a3056393ecf5544489eaf0234affcf2f5e9fff9240e3',
        'debt::DebtRegistry': '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'debt::DebtShareBalance':
          '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'debt::DebtTreasury': '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'debt_bag::DebtBag': '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'debt_bag::Info': '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'debt_bag::Key': '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'debt_info::DebtInfo': '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'debt_info::DebtInfoEntry':
          '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'debt_info::ValidatedDebtInfo':
          '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'equity::EquityRegistry':
          '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'equity::EquityShareBalance':
          '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'equity::EquityTreasury':
          '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'lp_shape_clmm::LpShape':
          '0x634794be3a538c645f9afbb8f652455a665df57e8ccaca69de879c1feb08d908',
        'oracle_price::PriceCollection':
          '0x634794be3a538c645f9afbb8f652455a665df57e8ccaca69de879c1feb08d908',
        'oracle_price::PriceData':
          '0x634794be3a538c645f9afbb8f652455a665df57e8ccaca69de879c1feb08d908',
        'oracle_price::Quote': '0x634794be3a538c645f9afbb8f652455a665df57e8ccaca69de879c1feb08d908',
        'oracle_price::ValidatedPrices':
          '0x634794be3a538c645f9afbb8f652455a665df57e8ccaca69de879c1feb08d908',
        'piecewise::Piecewise':
          '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'piecewise::Section': '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'position_core_clmm::ACollectProtocolFees':
          '0xf6e43ba7dc3fdb1dad3fcc5b7d431b6527aa1bf877a1b24d6865becfa14f8d1',
        'position_core_clmm::ACreateConfig':
          '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'position_core_clmm::ADeleverage':
          '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'position_core_clmm::AMigrate':
          '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'position_core_clmm::AModifyConfig':
          '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'position_core_clmm::ARebalance':
          '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'position_core_clmm::ARepayBadDebt':
          '0xd98a76e61b2499856e1958291b2c170a02e6c43d555d18f2f2f7d2741736481b',
        'position_core_clmm::AddCollateralInfo':
          '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'position_core_clmm::AddLiquidityDisabledKey':
          '0x49691904e57eff80e1409e6c71f643fecb5b7eeec97a1b4b97205a7317bed12a',
        'position_core_clmm::AddLiquidityInfo':
          '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'position_core_clmm::BadDebtRepaid':
          '0xd98a76e61b2499856e1958291b2c170a02e6c43d555d18f2f2f7d2741736481b',
        'position_core_clmm::CollectProtocolFeesInfo':
          '0xf6e43ba7dc3fdb1dad3fcc5b7d431b6527aa1bf877a1b24d6865becfa14f8d1',
        'position_core_clmm::CreatePositionTicket':
          '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'position_core_clmm::DeletePositionDisabledKey':
          '0x49691904e57eff80e1409e6c71f643fecb5b7eeec97a1b4b97205a7317bed12a',
        'position_core_clmm::DeletePositionInfo':
          '0xf6e43ba7dc3fdb1dad3fcc5b7d431b6527aa1bf877a1b24d6865becfa14f8d1',
        'position_core_clmm::DeletedPositionCollectedFees':
          '0xf6e43ba7dc3fdb1dad3fcc5b7d431b6527aa1bf877a1b24d6865becfa14f8d1',
        'position_core_clmm::DeletedPositionCollectedFeesInfo':
          '0xf6e43ba7dc3fdb1dad3fcc5b7d431b6527aa1bf877a1b24d6865becfa14f8d1',
        'position_core_clmm::DeleverageInfo':
          '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'position_core_clmm::DeleverageTicket':
          '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'position_core_clmm::LiquidationDisabledKey':
          '0x49691904e57eff80e1409e6c71f643fecb5b7eeec97a1b4b97205a7317bed12a',
        'position_core_clmm::LiquidationInfo':
          '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'position_core_clmm::OraclePriceConfig':
          '0x634794be3a538c645f9afbb8f652455a665df57e8ccaca69de879c1feb08d908',
        'position_core_clmm::OwnerCollectFeeDisabledKey':
          '0x49691904e57eff80e1409e6c71f643fecb5b7eeec97a1b4b97205a7317bed12a',
        'position_core_clmm::OwnerCollectFeeInfo':
          '0xf6e43ba7dc3fdb1dad3fcc5b7d431b6527aa1bf877a1b24d6865becfa14f8d1',
        'position_core_clmm::OwnerCollectRewardDisabledKey':
          '0x49691904e57eff80e1409e6c71f643fecb5b7eeec97a1b4b97205a7317bed12a',
        'position_core_clmm::OwnerCollectRewardInfo':
          '0xf6e43ba7dc3fdb1dad3fcc5b7d431b6527aa1bf877a1b24d6865becfa14f8d1',
        'position_core_clmm::OwnerTakeStashedRewardsInfo':
          '0xf6e43ba7dc3fdb1dad3fcc5b7d431b6527aa1bf877a1b24d6865becfa14f8d1',
        'position_core_clmm::Position':
          '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'position_core_clmm::PositionCap':
          '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'position_core_clmm::PositionConfig':
          '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'position_core_clmm::PositionCreateWithdrawLimiterKey':
          '0x75d4514b2022c7edda6dd311c8a9b6f226e270d893cc3c0e863a60e51d6d9499',
        'position_core_clmm::PositionCreationInfo':
          '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'position_core_clmm::PythConfig':
          '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'position_core_clmm::RebalanceInfo':
          '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'position_core_clmm::RebalanceReceipt':
          '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'position_core_clmm::ReductionDisabledKey':
          '0x49691904e57eff80e1409e6c71f643fecb5b7eeec97a1b4b97205a7317bed12a',
        'position_core_clmm::ReductionInfo':
          '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'position_core_clmm::ReductionRepaymentTicket':
          '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'position_core_clmm::RepayDebtInfo':
          '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'position_model_clmm::PositionModel':
          '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'pyth::PythPriceInfo': '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'pyth::ValidatedPythPriceInfo':
          '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'supply_pool::AConfigFees':
          '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'supply_pool::AConfigLendFacil':
          '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'supply_pool::ACreatePool':
          '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'supply_pool::ADeposit':
          '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'supply_pool::AMigrate':
          '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'supply_pool::ATakeFees':
          '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'supply_pool::FacilDebtBag':
          '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'supply_pool::FacilDebtShare':
          '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'supply_pool::LendFacilCap':
          '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'supply_pool::LendFacilInfo':
          '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'supply_pool::SupplyInfo':
          '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'supply_pool::SupplyPool':
          '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
        'supply_pool::WithdrawInfo':
          '0x51e0ccce48f0763f98f1cb4856847c2e1531adacada99cdd7626ab999db57523',
      },
    },
    'pyth': {
      originalId: '0x55300367a2d40813727ccac4ecee977a39fb9cdb46f2e6b2c354b9798f5de2c0',
      publishedAt: '0x55300367a2d40813727ccac4ecee977a39fb9cdb46f2e6b2c354b9798f5de2c0',
      typeOrigins: {
        'batch_price_attestation::BatchPriceAttestation':
          '0x55300367a2d40813727ccac4ecee977a39fb9cdb46f2e6b2c354b9798f5de2c0',
        'batch_price_attestation::Header':
          '0x55300367a2d40813727ccac4ecee977a39fb9cdb46f2e6b2c354b9798f5de2c0',
        'contract_upgrade::ContractUpgraded':
          '0x55300367a2d40813727ccac4ecee977a39fb9cdb46f2e6b2c354b9798f5de2c0',
        'contract_upgrade::UpgradeContract':
          '0x55300367a2d40813727ccac4ecee977a39fb9cdb46f2e6b2c354b9798f5de2c0',
        'data_source::DataSource':
          '0x55300367a2d40813727ccac4ecee977a39fb9cdb46f2e6b2c354b9798f5de2c0',
        'event::PriceFeedUpdateEvent':
          '0x55300367a2d40813727ccac4ecee977a39fb9cdb46f2e6b2c354b9798f5de2c0',
        'event::PythInitializationEvent':
          '0x55300367a2d40813727ccac4ecee977a39fb9cdb46f2e6b2c354b9798f5de2c0',
        'governance::WormholeVAAVerificationReceipt':
          '0x55300367a2d40813727ccac4ecee977a39fb9cdb46f2e6b2c354b9798f5de2c0',
        'governance_action::GovernanceAction':
          '0x55300367a2d40813727ccac4ecee977a39fb9cdb46f2e6b2c354b9798f5de2c0',
        'governance_instruction::GovernanceInstruction':
          '0x55300367a2d40813727ccac4ecee977a39fb9cdb46f2e6b2c354b9798f5de2c0',
        'hot_potato_vector::HotPotatoVector':
          '0x55300367a2d40813727ccac4ecee977a39fb9cdb46f2e6b2c354b9798f5de2c0',
        'i64::I64': '0x55300367a2d40813727ccac4ecee977a39fb9cdb46f2e6b2c354b9798f5de2c0',
        'migrate::MigrateComplete':
          '0x55300367a2d40813727ccac4ecee977a39fb9cdb46f2e6b2c354b9798f5de2c0',
        'price::Price': '0x55300367a2d40813727ccac4ecee977a39fb9cdb46f2e6b2c354b9798f5de2c0',
        'price_feed::PriceFeed':
          '0x55300367a2d40813727ccac4ecee977a39fb9cdb46f2e6b2c354b9798f5de2c0',
        'price_identifier::PriceIdentifier':
          '0x55300367a2d40813727ccac4ecee977a39fb9cdb46f2e6b2c354b9798f5de2c0',
        'price_info::PriceInfo':
          '0x55300367a2d40813727ccac4ecee977a39fb9cdb46f2e6b2c354b9798f5de2c0',
        'price_info::PriceInfoObject':
          '0x55300367a2d40813727ccac4ecee977a39fb9cdb46f2e6b2c354b9798f5de2c0',
        'price_status::PriceStatus':
          '0x55300367a2d40813727ccac4ecee977a39fb9cdb46f2e6b2c354b9798f5de2c0',
        'set::Set': '0x55300367a2d40813727ccac4ecee977a39fb9cdb46f2e6b2c354b9798f5de2c0',
        'set::Unit': '0x55300367a2d40813727ccac4ecee977a39fb9cdb46f2e6b2c354b9798f5de2c0',
        'set_data_sources::DataSources':
          '0x55300367a2d40813727ccac4ecee977a39fb9cdb46f2e6b2c354b9798f5de2c0',
        'set_fee_recipient::PythFeeRecipient':
          '0x55300367a2d40813727ccac4ecee977a39fb9cdb46f2e6b2c354b9798f5de2c0',
        'set_governance_data_source::GovernanceDataSource':
          '0x55300367a2d40813727ccac4ecee977a39fb9cdb46f2e6b2c354b9798f5de2c0',
        'set_stale_price_threshold::StalePriceThreshold':
          '0x55300367a2d40813727ccac4ecee977a39fb9cdb46f2e6b2c354b9798f5de2c0',
        'set_update_fee::UpdateFee':
          '0x55300367a2d40813727ccac4ecee977a39fb9cdb46f2e6b2c354b9798f5de2c0',
        'setup::DeployerCap': '0x55300367a2d40813727ccac4ecee977a39fb9cdb46f2e6b2c354b9798f5de2c0',
        'state::CurrentDigest':
          '0x55300367a2d40813727ccac4ecee977a39fb9cdb46f2e6b2c354b9798f5de2c0',
        'state::LatestOnly': '0x55300367a2d40813727ccac4ecee977a39fb9cdb46f2e6b2c354b9798f5de2c0',
        'state::State': '0x55300367a2d40813727ccac4ecee977a39fb9cdb46f2e6b2c354b9798f5de2c0',
        'version_control::V__0_1_1':
          '0x55300367a2d40813727ccac4ecee977a39fb9cdb46f2e6b2c354b9798f5de2c0',
        'version_control::V__0_1_2':
          '0x55300367a2d40813727ccac4ecee977a39fb9cdb46f2e6b2c354b9798f5de2c0',
        'version_control::V__DUMMY':
          '0x55300367a2d40813727ccac4ecee977a39fb9cdb46f2e6b2c354b9798f5de2c0',
      },
    },
    'integer-mate': {
      originalId: '0x714a63a0dba6da4f017b42d5d0fb78867f18bcde904868e51d951a5a6f5b7f57',
      publishedAt: '0xdfaadf86be9af246900d1e3f3b996cf549e7948e662a9977bdd7646d8fa3a778',
      typeOrigins: {
        'i128::I128': '0x714a63a0dba6da4f017b42d5d0fb78867f18bcde904868e51d951a5a6f5b7f57',
        'i32::I32': '0x714a63a0dba6da4f017b42d5d0fb78867f18bcde904868e51d951a5a6f5b7f57',
        'i64::I64': '0x714a63a0dba6da4f017b42d5d0fb78867f18bcde904868e51d951a5a6f5b7f57',
      },
    },
    'cetus-integrate': {
      originalId: '0x996c4d9480708fb8b92aa7acf819fb0497b5ec8e65ba06601cae2fb6db3312c3',
      publishedAt: '0xfbb32ac0fa89a3cb0c56c745b688c6d2a53ac8e43447119ad822763997ffb9c3',
      typeOrigins: {
        'expect_swap::ExpectSwapResult':
          '0x996c4d9480708fb8b92aa7acf819fb0497b5ec8e65ba06601cae2fb6db3312c3',
        'expect_swap::ExpectSwapResultEvent':
          '0x996c4d9480708fb8b92aa7acf819fb0497b5ec8e65ba06601cae2fb6db3312c3',
        'expect_swap::SwapResult':
          '0x996c4d9480708fb8b92aa7acf819fb0497b5ec8e65ba06601cae2fb6db3312c3',
        'expect_swap::SwapStepResult':
          '0x996c4d9480708fb8b92aa7acf819fb0497b5ec8e65ba06601cae2fb6db3312c3',
        'fetcher_script::CalculatedSwapResultEvent':
          '0x996c4d9480708fb8b92aa7acf819fb0497b5ec8e65ba06601cae2fb6db3312c3',
        'fetcher_script::FetchPoolsEvent':
          '0x996c4d9480708fb8b92aa7acf819fb0497b5ec8e65ba06601cae2fb6db3312c3',
        'fetcher_script::FetchPositionFeesEvent':
          '0x45d8b5727430ccbc1202de8fd841ca23d3c49a6ef7968286d6266e1ac2c9b4a3',
        'fetcher_script::FetchPositionPointsEvent':
          '0x45d8b5727430ccbc1202de8fd841ca23d3c49a6ef7968286d6266e1ac2c9b4a3',
        'fetcher_script::FetchPositionRewardsEvent':
          '0x996c4d9480708fb8b92aa7acf819fb0497b5ec8e65ba06601cae2fb6db3312c3',
        'fetcher_script::FetchPositionsEvent':
          '0x996c4d9480708fb8b92aa7acf819fb0497b5ec8e65ba06601cae2fb6db3312c3',
        'fetcher_script::FetchTicksResultEvent':
          '0x996c4d9480708fb8b92aa7acf819fb0497b5ec8e65ba06601cae2fb6db3312c3',
        'router::CalculatedRouterSwapResult':
          '0x996c4d9480708fb8b92aa7acf819fb0497b5ec8e65ba06601cae2fb6db3312c3',
        'router::CalculatedRouterSwapResultEvent':
          '0x996c4d9480708fb8b92aa7acf819fb0497b5ec8e65ba06601cae2fb6db3312c3',
      },
    },
    'wormhole': {
      originalId: '0x99de5c967d8206ef4b75c0afab3df2a59eb02b05c282821db803831008ac25b4',
      publishedAt: '0x99de5c967d8206ef4b75c0afab3df2a59eb02b05c282821db803831008ac25b4',
      typeOrigins: {
        'bytes20::Bytes20': '0x99de5c967d8206ef4b75c0afab3df2a59eb02b05c282821db803831008ac25b4',
        'bytes32::Bytes32': '0x99de5c967d8206ef4b75c0afab3df2a59eb02b05c282821db803831008ac25b4',
        'consumed_vaas::ConsumedVAAs':
          '0x99de5c967d8206ef4b75c0afab3df2a59eb02b05c282821db803831008ac25b4',
        'cursor::Cursor': '0x99de5c967d8206ef4b75c0afab3df2a59eb02b05c282821db803831008ac25b4',
        'emitter::EmitterCap': '0x99de5c967d8206ef4b75c0afab3df2a59eb02b05c282821db803831008ac25b4',
        'emitter::EmitterCreated':
          '0x99de5c967d8206ef4b75c0afab3df2a59eb02b05c282821db803831008ac25b4',
        'emitter::EmitterDestroyed':
          '0x99de5c967d8206ef4b75c0afab3df2a59eb02b05c282821db803831008ac25b4',
        'external_address::ExternalAddress':
          '0x99de5c967d8206ef4b75c0afab3df2a59eb02b05c282821db803831008ac25b4',
        'fee_collector::FeeCollector':
          '0x99de5c967d8206ef4b75c0afab3df2a59eb02b05c282821db803831008ac25b4',
        'governance_message::DecreeReceipt':
          '0x99de5c967d8206ef4b75c0afab3df2a59eb02b05c282821db803831008ac25b4',
        'governance_message::DecreeTicket':
          '0x99de5c967d8206ef4b75c0afab3df2a59eb02b05c282821db803831008ac25b4',
        'guardian::Guardian': '0x99de5c967d8206ef4b75c0afab3df2a59eb02b05c282821db803831008ac25b4',
        'guardian_set::GuardianSet':
          '0x99de5c967d8206ef4b75c0afab3df2a59eb02b05c282821db803831008ac25b4',
        'guardian_signature::GuardianSignature':
          '0x99de5c967d8206ef4b75c0afab3df2a59eb02b05c282821db803831008ac25b4',
        'migrate::MigrateComplete':
          '0x99de5c967d8206ef4b75c0afab3df2a59eb02b05c282821db803831008ac25b4',
        'package_utils::CurrentPackage':
          '0x99de5c967d8206ef4b75c0afab3df2a59eb02b05c282821db803831008ac25b4',
        'package_utils::CurrentVersion':
          '0x99de5c967d8206ef4b75c0afab3df2a59eb02b05c282821db803831008ac25b4',
        'package_utils::PackageInfo':
          '0x99de5c967d8206ef4b75c0afab3df2a59eb02b05c282821db803831008ac25b4',
        'package_utils::PendingPackage':
          '0x99de5c967d8206ef4b75c0afab3df2a59eb02b05c282821db803831008ac25b4',
        'publish_message::MessageTicket':
          '0x99de5c967d8206ef4b75c0afab3df2a59eb02b05c282821db803831008ac25b4',
        'publish_message::WormholeMessage':
          '0x99de5c967d8206ef4b75c0afab3df2a59eb02b05c282821db803831008ac25b4',
        'set::Empty': '0x99de5c967d8206ef4b75c0afab3df2a59eb02b05c282821db803831008ac25b4',
        'set::Set': '0x99de5c967d8206ef4b75c0afab3df2a59eb02b05c282821db803831008ac25b4',
        'set_fee::GovernanceWitness':
          '0x99de5c967d8206ef4b75c0afab3df2a59eb02b05c282821db803831008ac25b4',
        'set_fee::SetFee': '0x99de5c967d8206ef4b75c0afab3df2a59eb02b05c282821db803831008ac25b4',
        'setup::DeployerCap': '0x99de5c967d8206ef4b75c0afab3df2a59eb02b05c282821db803831008ac25b4',
        'state::LatestOnly': '0x99de5c967d8206ef4b75c0afab3df2a59eb02b05c282821db803831008ac25b4',
        'state::State': '0x99de5c967d8206ef4b75c0afab3df2a59eb02b05c282821db803831008ac25b4',
        'transfer_fee::GovernanceWitness':
          '0x99de5c967d8206ef4b75c0afab3df2a59eb02b05c282821db803831008ac25b4',
        'transfer_fee::TransferFee':
          '0x99de5c967d8206ef4b75c0afab3df2a59eb02b05c282821db803831008ac25b4',
        'update_guardian_set::GovernanceWitness':
          '0x99de5c967d8206ef4b75c0afab3df2a59eb02b05c282821db803831008ac25b4',
        'update_guardian_set::GuardianSetAdded':
          '0x99de5c967d8206ef4b75c0afab3df2a59eb02b05c282821db803831008ac25b4',
        'update_guardian_set::UpdateGuardianSet':
          '0x99de5c967d8206ef4b75c0afab3df2a59eb02b05c282821db803831008ac25b4',
        'upgrade_contract::ContractUpgraded':
          '0x99de5c967d8206ef4b75c0afab3df2a59eb02b05c282821db803831008ac25b4',
        'upgrade_contract::GovernanceWitness':
          '0x99de5c967d8206ef4b75c0afab3df2a59eb02b05c282821db803831008ac25b4',
        'upgrade_contract::UpgradeContract':
          '0x99de5c967d8206ef4b75c0afab3df2a59eb02b05c282821db803831008ac25b4',
        'vaa::VAA': '0x99de5c967d8206ef4b75c0afab3df2a59eb02b05c282821db803831008ac25b4',
        'version_control::V__0_2_0':
          '0x99de5c967d8206ef4b75c0afab3df2a59eb02b05c282821db803831008ac25b4',
        'version_control::V__DUMMY':
          '0x99de5c967d8206ef4b75c0afab3df2a59eb02b05c282821db803831008ac25b4',
      },
    },
  },
  dependencies: {
    'integer-library': {
      originalId: '0x3637b7b60978ef4389124f7683456f0050ab015a0590d52b6e6cadb342af34a',
      publishedAt: '0xab5e63352d0f05881bdfa1631cc0f7fc1669175a00d608828a924df481a9e4bd',
      typeOrigins: {
        'i128::I128': '0x3637b7b60978ef4389124f7683456f0050ab015a0590d52b6e6cadb342af34a',
        'i32::I32': '0x3637b7b60978ef4389124f7683456f0050ab015a0590d52b6e6cadb342af34a',
        'i64::I64': '0x3637b7b60978ef4389124f7683456f0050ab015a0590d52b6e6cadb342af34a',
      },
    },
    'access-management': {
      originalId: '0xd9dd55ac7eb676dc78f7d0ae3bc5529d7fd6b52ac0d0edb2d7820c52d080026',
      publishedAt: '0x6f57ba9757d97ac3ad435c0cf4ab93413654d7af44fc723b1091c5dc2c83d1ae',
      typeOrigins: {
        'access::ActionRequest':
          '0xd9dd55ac7eb676dc78f7d0ae3bc5529d7fd6b52ac0d0edb2d7820c52d080026',
        'access::ConditionWitness':
          '0xd9dd55ac7eb676dc78f7d0ae3bc5529d7fd6b52ac0d0edb2d7820c52d080026',
        'access::ConfigNone': '0xd9dd55ac7eb676dc78f7d0ae3bc5529d7fd6b52ac0d0edb2d7820c52d080026',
        'access::Entity': '0xd9dd55ac7eb676dc78f7d0ae3bc5529d7fd6b52ac0d0edb2d7820c52d080026',
        'access::PackageAdmin': '0xd9dd55ac7eb676dc78f7d0ae3bc5529d7fd6b52ac0d0edb2d7820c52d080026',
        'access::Policy': '0xd9dd55ac7eb676dc78f7d0ae3bc5529d7fd6b52ac0d0edb2d7820c52d080026',
        'access::Rule': '0xd9dd55ac7eb676dc78f7d0ae3bc5529d7fd6b52ac0d0edb2d7820c52d080026',
        'dynamic_map::DynamicMap':
          '0xd9dd55ac7eb676dc78f7d0ae3bc5529d7fd6b52ac0d0edb2d7820c52d080026',
      },
    },
    'cetus-farming': {
      originalId: '0x11ea791d82b5742cc8cab0bf7946035c97d9001d7c3803a93f119753da66f526',
      publishedAt: '0x1829f473437d24456825662e5bba97924194b5008dcbb59f6b6a6eb2a5d1a2de',
      typeOrigins: {
        'acl::ACL': '0x11ea791d82b5742cc8cab0bf7946035c97d9001d7c3803a93f119753da66f526',
        'acl::Member': '0x11ea791d82b5742cc8cab0bf7946035c97d9001d7c3803a93f119753da66f526',
        'config::AddOperatorEvent':
          '0x11ea791d82b5742cc8cab0bf7946035c97d9001d7c3803a93f119753da66f526',
        'config::AddRoleEvent':
          '0x11ea791d82b5742cc8cab0bf7946035c97d9001d7c3803a93f119753da66f526',
        'config::AdminCap': '0x11ea791d82b5742cc8cab0bf7946035c97d9001d7c3803a93f119753da66f526',
        'config::GlobalConfig':
          '0x11ea791d82b5742cc8cab0bf7946035c97d9001d7c3803a93f119753da66f526',
        'config::InitConfigEvent':
          '0x11ea791d82b5742cc8cab0bf7946035c97d9001d7c3803a93f119753da66f526',
        'config::OperatorCap': '0x11ea791d82b5742cc8cab0bf7946035c97d9001d7c3803a93f119753da66f526',
        'config::RemoveMemberEvent':
          '0x11ea791d82b5742cc8cab0bf7946035c97d9001d7c3803a93f119753da66f526',
        'config::RemoveRoleEvent':
          '0x11ea791d82b5742cc8cab0bf7946035c97d9001d7c3803a93f119753da66f526',
        'config::SetPackageVersion':
          '0x11ea791d82b5742cc8cab0bf7946035c97d9001d7c3803a93f119753da66f526',
        'config::SetRolesEvent':
          '0x11ea791d82b5742cc8cab0bf7946035c97d9001d7c3803a93f119753da66f526',
        'pool::AccumulatedPositionRewardsEvent':
          '0x11ea791d82b5742cc8cab0bf7946035c97d9001d7c3803a93f119753da66f526',
        'pool::AddLiquidityEvent':
          '0x11ea791d82b5742cc8cab0bf7946035c97d9001d7c3803a93f119753da66f526',
        'pool::AddLiquidityFixCoinEvent':
          '0x11ea791d82b5742cc8cab0bf7946035c97d9001d7c3803a93f119753da66f526',
        'pool::AddRewardEvent':
          '0x11ea791d82b5742cc8cab0bf7946035c97d9001d7c3803a93f119753da66f526',
        'pool::CreatePoolEvent':
          '0x11ea791d82b5742cc8cab0bf7946035c97d9001d7c3803a93f119753da66f526',
        'pool::DepositEvent': '0x11ea791d82b5742cc8cab0bf7946035c97d9001d7c3803a93f119753da66f526',
        'pool::HarvestEvent': '0x11ea791d82b5742cc8cab0bf7946035c97d9001d7c3803a93f119753da66f526',
        'pool::MigrateInvalidPoolPositionsEvent':
          '0xb5d821af5d3d4d40f1f1890502d73e3d7f61edb75e664ff8e827fa01a006f39f',
        'pool::POOL': '0x11ea791d82b5742cc8cab0bf7946035c97d9001d7c3803a93f119753da66f526',
        'pool::Pool': '0x11ea791d82b5742cc8cab0bf7946035c97d9001d7c3803a93f119753da66f526',
        'pool::PoolInvalidPositions':
          '0xb5d821af5d3d4d40f1f1890502d73e3d7f61edb75e664ff8e827fa01a006f39f',
        'pool::PositionRewardInfo':
          '0x11ea791d82b5742cc8cab0bf7946035c97d9001d7c3803a93f119753da66f526',
        'pool::RemoveLiquidityEvent':
          '0x11ea791d82b5742cc8cab0bf7946035c97d9001d7c3803a93f119753da66f526',
        'pool::UpdateEffectiveTickRangeEvent':
          '0x11ea791d82b5742cc8cab0bf7946035c97d9001d7c3803a93f119753da66f526',
        'pool::UpdatePoolAllocatePointEvent':
          '0x11ea791d82b5742cc8cab0bf7946035c97d9001d7c3803a93f119753da66f526',
        'pool::WithdrawEvent': '0x11ea791d82b5742cc8cab0bf7946035c97d9001d7c3803a93f119753da66f526',
        'pool::WrappedPositionInfo':
          '0x11ea791d82b5742cc8cab0bf7946035c97d9001d7c3803a93f119753da66f526',
        'pool::WrappedPositionNFT':
          '0x11ea791d82b5742cc8cab0bf7946035c97d9001d7c3803a93f119753da66f526',
        'rewarder::CreateRewarderEvent':
          '0x11ea791d82b5742cc8cab0bf7946035c97d9001d7c3803a93f119753da66f526',
        'rewarder::DepositEvent':
          '0x11ea791d82b5742cc8cab0bf7946035c97d9001d7c3803a93f119753da66f526',
        'rewarder::EmergentWithdrawEvent':
          '0xc1e5ff41b4a935959894e5c91f702ca5ac41533b00d53d92067e0203a63c686',
        'rewarder::InitRewarderManagerEvent':
          '0x11ea791d82b5742cc8cab0bf7946035c97d9001d7c3803a93f119753da66f526',
        'rewarder::PoolRewarderInfo':
          '0x11ea791d82b5742cc8cab0bf7946035c97d9001d7c3803a93f119753da66f526',
        'rewarder::Rewarder': '0x11ea791d82b5742cc8cab0bf7946035c97d9001d7c3803a93f119753da66f526',
        'rewarder::RewarderManager':
          '0x11ea791d82b5742cc8cab0bf7946035c97d9001d7c3803a93f119753da66f526',
        'rewarder::UpdateRewarderEvent':
          '0x11ea791d82b5742cc8cab0bf7946035c97d9001d7c3803a93f119753da66f526',
      },
    },
    'whitelist': {
      originalId: '0x1318fdc90319ec9c24df1456d960a447521b0a658316155895014a6e39b5482f',
      publishedAt: '0x1318fdc90319ec9c24df1456d960a447521b0a658316155895014a6e39b5482f',
      typeOrigins: {
        'whitelist::AllowAllEvent':
          '0x1318fdc90319ec9c24df1456d960a447521b0a658316155895014a6e39b5482f',
        'whitelist::AllowAllKey':
          '0x1318fdc90319ec9c24df1456d960a447521b0a658316155895014a6e39b5482f',
        'whitelist::RejectAllEvent':
          '0x1318fdc90319ec9c24df1456d960a447521b0a658316155895014a6e39b5482f',
        'whitelist::RejectAllKey':
          '0x1318fdc90319ec9c24df1456d960a447521b0a658316155895014a6e39b5482f',
        'whitelist::SwitchToWhitelistModeEvent':
          '0x1318fdc90319ec9c24df1456d960a447521b0a658316155895014a6e39b5482f',
        'whitelist::WhitelistAddEvent':
          '0x1318fdc90319ec9c24df1456d960a447521b0a658316155895014a6e39b5482f',
        'whitelist::WhitelistKey':
          '0x1318fdc90319ec9c24df1456d960a447521b0a658316155895014a6e39b5482f',
        'whitelist::WhitelistRemoveEvent':
          '0x1318fdc90319ec9c24df1456d960a447521b0a658316155895014a6e39b5482f',
      },
    },
    'x-oracle': {
      originalId: '0x1478a432123e4b3d61878b629f2c692969fdb375644f1251cd278a4b1e7d7cd6',
      publishedAt: '0x1478a432123e4b3d61878b629f2c692969fdb375644f1251cd278a4b1e7d7cd6',
      typeOrigins: {
        'price_feed::PriceFeed':
          '0x1478a432123e4b3d61878b629f2c692969fdb375644f1251cd278a4b1e7d7cd6',
        'price_update_policy::PriceUpdatePolicy':
          '0x1478a432123e4b3d61878b629f2c692969fdb375644f1251cd278a4b1e7d7cd6',
        'price_update_policy::PriceUpdatePolicyCap':
          '0x1478a432123e4b3d61878b629f2c692969fdb375644f1251cd278a4b1e7d7cd6',
        'price_update_policy::PriceUpdatePolicyRulesKey':
          '0x897ebc619bdb4c3d9e8d86fb85b86cfd5d861b1696d26175c55ed14903a372f6',
        'price_update_policy::PriceUpdateRequest':
          '0x1478a432123e4b3d61878b629f2c692969fdb375644f1251cd278a4b1e7d7cd6',
        'x_oracle::XOracle': '0x1478a432123e4b3d61878b629f2c692969fdb375644f1251cd278a4b1e7d7cd6',
        'x_oracle::XOraclePolicyCap':
          '0x1478a432123e4b3d61878b629f2c692969fdb375644f1251cd278a4b1e7d7cd6',
        'x_oracle::XOraclePriceUpdateRequest':
          '0x1478a432123e4b3d61878b629f2c692969fdb375644f1251cd278a4b1e7d7cd6',
        'x_oracle::X_ORACLE': '0x1478a432123e4b3d61878b629f2c692969fdb375644f1251cd278a4b1e7d7cd6',
      },
    },
    'token-bridge': {
      originalId: '0x26efee2b51c911237888e5dc6702868abca3c7ac12c53f76ef8eba0697695e3d',
      publishedAt: '0x26efee2b51c911237888e5dc6702868abca3c7ac12c53f76ef8eba0697695e3d',
      typeOrigins: {
        'asset_meta::AssetMeta':
          '0x26efee2b51c911237888e5dc6702868abca3c7ac12c53f76ef8eba0697695e3d',
        'complete_transfer::RelayerReceipt':
          '0x26efee2b51c911237888e5dc6702868abca3c7ac12c53f76ef8eba0697695e3d',
        'complete_transfer::TransferRedeemed':
          '0x26efee2b51c911237888e5dc6702868abca3c7ac12c53f76ef8eba0697695e3d',
        'complete_transfer_with_payload::RedeemerReceipt':
          '0x26efee2b51c911237888e5dc6702868abca3c7ac12c53f76ef8eba0697695e3d',
        'create_wrapped::WrappedAssetSetup':
          '0x26efee2b51c911237888e5dc6702868abca3c7ac12c53f76ef8eba0697695e3d',
        'migrate::MigrateComplete':
          '0x26efee2b51c911237888e5dc6702868abca3c7ac12c53f76ef8eba0697695e3d',
        'native_asset::NativeAsset':
          '0x26efee2b51c911237888e5dc6702868abca3c7ac12c53f76ef8eba0697695e3d',
        'normalized_amount::NormalizedAmount':
          '0x26efee2b51c911237888e5dc6702868abca3c7ac12c53f76ef8eba0697695e3d',
        'register_chain::GovernanceWitness':
          '0x26efee2b51c911237888e5dc6702868abca3c7ac12c53f76ef8eba0697695e3d',
        'register_chain::RegisterChain':
          '0x26efee2b51c911237888e5dc6702868abca3c7ac12c53f76ef8eba0697695e3d',
        'setup::DeployerCap': '0x26efee2b51c911237888e5dc6702868abca3c7ac12c53f76ef8eba0697695e3d',
        'state::LatestOnly': '0x26efee2b51c911237888e5dc6702868abca3c7ac12c53f76ef8eba0697695e3d',
        'state::State': '0x26efee2b51c911237888e5dc6702868abca3c7ac12c53f76ef8eba0697695e3d',
        'token_registry::CoinTypeKey':
          '0x26efee2b51c911237888e5dc6702868abca3c7ac12c53f76ef8eba0697695e3d',
        'token_registry::Key': '0x26efee2b51c911237888e5dc6702868abca3c7ac12c53f76ef8eba0697695e3d',
        'token_registry::TokenRegistry':
          '0x26efee2b51c911237888e5dc6702868abca3c7ac12c53f76ef8eba0697695e3d',
        'token_registry::VerifiedAsset':
          '0x26efee2b51c911237888e5dc6702868abca3c7ac12c53f76ef8eba0697695e3d',
        'transfer::Transfer': '0x26efee2b51c911237888e5dc6702868abca3c7ac12c53f76ef8eba0697695e3d',
        'transfer_tokens::TransferTicket':
          '0x26efee2b51c911237888e5dc6702868abca3c7ac12c53f76ef8eba0697695e3d',
        'transfer_tokens_with_payload::TransferTicket':
          '0x26efee2b51c911237888e5dc6702868abca3c7ac12c53f76ef8eba0697695e3d',
        'transfer_with_payload::TransferWithPayload':
          '0x26efee2b51c911237888e5dc6702868abca3c7ac12c53f76ef8eba0697695e3d',
        'upgrade_contract::ContractUpgraded':
          '0x26efee2b51c911237888e5dc6702868abca3c7ac12c53f76ef8eba0697695e3d',
        'upgrade_contract::GovernanceWitness':
          '0x26efee2b51c911237888e5dc6702868abca3c7ac12c53f76ef8eba0697695e3d',
        'upgrade_contract::UpgradeContract':
          '0x26efee2b51c911237888e5dc6702868abca3c7ac12c53f76ef8eba0697695e3d',
        'vaa::TokenBridgeMessage':
          '0x26efee2b51c911237888e5dc6702868abca3c7ac12c53f76ef8eba0697695e3d',
        'version_control::V__0_2_0':
          '0x26efee2b51c911237888e5dc6702868abca3c7ac12c53f76ef8eba0697695e3d',
        'version_control::V__DUMMY':
          '0x26efee2b51c911237888e5dc6702868abca3c7ac12c53f76ef8eba0697695e3d',
        'wrapped_asset::ForeignInfo':
          '0x26efee2b51c911237888e5dc6702868abca3c7ac12c53f76ef8eba0697695e3d',
        'wrapped_asset::WrappedAsset':
          '0x26efee2b51c911237888e5dc6702868abca3c7ac12c53f76ef8eba0697695e3d',
      },
    },
    'wormhole-1': {
      originalId: '0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a',
      publishedAt: '0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a',
      typeOrigins: {
        'bytes20::Bytes20': '0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a',
        'bytes32::Bytes32': '0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a',
        'consumed_vaas::ConsumedVAAs':
          '0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a',
        'cursor::Cursor': '0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a',
        'emitter::EmitterCap': '0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a',
        'emitter::EmitterCreated':
          '0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a',
        'emitter::EmitterDestroyed':
          '0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a',
        'external_address::ExternalAddress':
          '0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a',
        'fee_collector::FeeCollector':
          '0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a',
        'governance_message::DecreeReceipt':
          '0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a',
        'governance_message::DecreeTicket':
          '0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a',
        'guardian::Guardian': '0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a',
        'guardian_set::GuardianSet':
          '0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a',
        'guardian_signature::GuardianSignature':
          '0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a',
        'migrate::MigrateComplete':
          '0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a',
        'package_utils::CurrentPackage':
          '0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a',
        'package_utils::CurrentVersion':
          '0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a',
        'package_utils::PackageInfo':
          '0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a',
        'package_utils::PendingPackage':
          '0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a',
        'publish_message::MessageTicket':
          '0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a',
        'publish_message::WormholeMessage':
          '0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a',
        'set::Empty': '0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a',
        'set::Set': '0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a',
        'set_fee::GovernanceWitness':
          '0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a',
        'set_fee::SetFee': '0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a',
        'setup::DeployerCap': '0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a',
        'state::LatestOnly': '0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a',
        'state::State': '0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a',
        'transfer_fee::GovernanceWitness':
          '0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a',
        'transfer_fee::TransferFee':
          '0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a',
        'update_guardian_set::GovernanceWitness':
          '0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a',
        'update_guardian_set::GuardianSetAdded':
          '0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a',
        'update_guardian_set::UpdateGuardianSet':
          '0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a',
        'upgrade_contract::ContractUpgraded':
          '0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a',
        'upgrade_contract::GovernanceWitness':
          '0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a',
        'upgrade_contract::UpgradeContract':
          '0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a',
        'vaa::VAA': '0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a',
        'version_control::V__0_2_0':
          '0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a',
        'version_control::V__DUMMY':
          '0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a',
      },
    },
    'whusdce': {
      originalId: '0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf',
      publishedAt: '0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf',
      typeOrigins: {
        'coin::COIN': '0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf',
      },
    },
    'x': {
      originalId: '0x779b5c547976899f5474f3a5bc0db36ddf4697ad7e5a901db0415c2281d28162',
      publishedAt: '0x779b5c547976899f5474f3a5bc0db36ddf4697ad7e5a901db0415c2281d28162',
      typeOrigins: {
        'ac_table::AcTable': '0x779b5c547976899f5474f3a5bc0db36ddf4697ad7e5a901db0415c2281d28162',
        'ac_table::AcTableCap':
          '0x779b5c547976899f5474f3a5bc0db36ddf4697ad7e5a901db0415c2281d28162',
        'ac_table::AcTableOwnership':
          '0x779b5c547976899f5474f3a5bc0db36ddf4697ad7e5a901db0415c2281d28162',
        'balance_bag::BalanceBag':
          '0x779b5c547976899f5474f3a5bc0db36ddf4697ad7e5a901db0415c2281d28162',
        'one_time_lock_value::OneTimeLockValue':
          '0x779b5c547976899f5474f3a5bc0db36ddf4697ad7e5a901db0415c2281d28162',
        'ownership::Ownership':
          '0x779b5c547976899f5474f3a5bc0db36ddf4697ad7e5a901db0415c2281d28162',
        'supply_bag::SupplyBag':
          '0x779b5c547976899f5474f3a5bc0db36ddf4697ad7e5a901db0415c2281d28162',
        'wit_table::WitTable': '0x779b5c547976899f5474f3a5bc0db36ddf4697ad7e5a901db0415c2281d28162',
        'witness::Witness': '0x779b5c547976899f5474f3a5bc0db36ddf4697ad7e5a901db0415c2281d28162',
        'witness::WitnessGenerator':
          '0x779b5c547976899f5474f3a5bc0db36ddf4697ad7e5a901db0415c2281d28162',
      },
    },
    'pyth-1': {
      originalId: '0x8d97f1cd6ac663735be08d1d2b6d02a159e711586461306ce60a2b7a6a565a9e',
      publishedAt: '0x4e20ddf36af412a4096f9014f4a565af9e812db9a05cc40254846cf6ed0ad91',
      typeOrigins: {
        'batch_price_attestation::BatchPriceAttestation':
          '0x8d97f1cd6ac663735be08d1d2b6d02a159e711586461306ce60a2b7a6a565a9e',
        'batch_price_attestation::Header':
          '0x8d97f1cd6ac663735be08d1d2b6d02a159e711586461306ce60a2b7a6a565a9e',
        'contract_upgrade::ContractUpgraded':
          '0x8d97f1cd6ac663735be08d1d2b6d02a159e711586461306ce60a2b7a6a565a9e',
        'contract_upgrade::UpgradeContract':
          '0x8d97f1cd6ac663735be08d1d2b6d02a159e711586461306ce60a2b7a6a565a9e',
        'data_source::DataSource':
          '0x8d97f1cd6ac663735be08d1d2b6d02a159e711586461306ce60a2b7a6a565a9e',
        'event::PriceFeedUpdateEvent':
          '0x8d97f1cd6ac663735be08d1d2b6d02a159e711586461306ce60a2b7a6a565a9e',
        'event::PythInitializationEvent':
          '0x8d97f1cd6ac663735be08d1d2b6d02a159e711586461306ce60a2b7a6a565a9e',
        'governance::WormholeVAAVerificationReceipt':
          '0x8d97f1cd6ac663735be08d1d2b6d02a159e711586461306ce60a2b7a6a565a9e',
        'governance_action::GovernanceAction':
          '0x8d97f1cd6ac663735be08d1d2b6d02a159e711586461306ce60a2b7a6a565a9e',
        'governance_instruction::GovernanceInstruction':
          '0x8d97f1cd6ac663735be08d1d2b6d02a159e711586461306ce60a2b7a6a565a9e',
        'hot_potato_vector::HotPotatoVector':
          '0x8d97f1cd6ac663735be08d1d2b6d02a159e711586461306ce60a2b7a6a565a9e',
        'i64::I64': '0x8d97f1cd6ac663735be08d1d2b6d02a159e711586461306ce60a2b7a6a565a9e',
        'migrate::MigrateComplete':
          '0x8d97f1cd6ac663735be08d1d2b6d02a159e711586461306ce60a2b7a6a565a9e',
        'price::Price': '0x8d97f1cd6ac663735be08d1d2b6d02a159e711586461306ce60a2b7a6a565a9e',
        'price_feed::PriceFeed':
          '0x8d97f1cd6ac663735be08d1d2b6d02a159e711586461306ce60a2b7a6a565a9e',
        'price_identifier::PriceIdentifier':
          '0x8d97f1cd6ac663735be08d1d2b6d02a159e711586461306ce60a2b7a6a565a9e',
        'price_info::PriceInfo':
          '0x8d97f1cd6ac663735be08d1d2b6d02a159e711586461306ce60a2b7a6a565a9e',
        'price_info::PriceInfoObject':
          '0x8d97f1cd6ac663735be08d1d2b6d02a159e711586461306ce60a2b7a6a565a9e',
        'price_status::PriceStatus':
          '0x8d97f1cd6ac663735be08d1d2b6d02a159e711586461306ce60a2b7a6a565a9e',
        'set::Set': '0x8d97f1cd6ac663735be08d1d2b6d02a159e711586461306ce60a2b7a6a565a9e',
        'set::Unit': '0x8d97f1cd6ac663735be08d1d2b6d02a159e711586461306ce60a2b7a6a565a9e',
        'set_data_sources::DataSources':
          '0x8d97f1cd6ac663735be08d1d2b6d02a159e711586461306ce60a2b7a6a565a9e',
        'set_fee_recipient::PythFeeRecipient':
          '0x8d97f1cd6ac663735be08d1d2b6d02a159e711586461306ce60a2b7a6a565a9e',
        'set_governance_data_source::GovernanceDataSource':
          '0x8d97f1cd6ac663735be08d1d2b6d02a159e711586461306ce60a2b7a6a565a9e',
        'set_stale_price_threshold::StalePriceThreshold':
          '0x8d97f1cd6ac663735be08d1d2b6d02a159e711586461306ce60a2b7a6a565a9e',
        'set_update_fee::UpdateFee':
          '0x8d97f1cd6ac663735be08d1d2b6d02a159e711586461306ce60a2b7a6a565a9e',
        'setup::DeployerCap': '0x8d97f1cd6ac663735be08d1d2b6d02a159e711586461306ce60a2b7a6a565a9e',
        'state::CurrentDigest':
          '0x8d97f1cd6ac663735be08d1d2b6d02a159e711586461306ce60a2b7a6a565a9e',
        'state::LatestOnly': '0x8d97f1cd6ac663735be08d1d2b6d02a159e711586461306ce60a2b7a6a565a9e',
        'state::State': '0x8d97f1cd6ac663735be08d1d2b6d02a159e711586461306ce60a2b7a6a565a9e',
        'version_control::V__0_1_1':
          '0x8d97f1cd6ac663735be08d1d2b6d02a159e711586461306ce60a2b7a6a565a9e',
        'version_control::V__0_1_2':
          '0x4e20ddf36af412a4096f9014f4a565af9e812db9a05cc40254846cf6ed0ad91',
        'version_control::V__DUMMY':
          '0x8d97f1cd6ac663735be08d1d2b6d02a159e711586461306ce60a2b7a6a565a9e',
      },
    },
    'math': {
      originalId: '0xad013d5fde39e15eabda32b3dbdafd67dac32b798ce63237c27a8f73339b9b6f',
      publishedAt: '0xad013d5fde39e15eabda32b3dbdafd67dac32b798ce63237c27a8f73339b9b6f',
      typeOrigins: {},
    },
    'kai-ywhusdte-ysui': {
      originalId: '0xb8dc843a816b51992ee10d2ddc6d28aab4f0a1d651cd7289a7897902eb631613',
      publishedAt: '0xb8dc843a816b51992ee10d2ddc6d28aab4f0a1d651cd7289a7897902eb631613',
      typeOrigins: {
        'ysui::YSUI': '0xb8dc843a816b51992ee10d2ddc6d28aab4f0a1d651cd7289a7897902eb631613',
        'ywhusdte::YWHUSDTE': '0xb8dc843a816b51992ee10d2ddc6d28aab4f0a1d651cd7289a7897902eb631613',
      },
    },
    'move-stl': {
      originalId: '0xbe21a06129308e0495431d12286127897aff07a8ade3970495a4404d97f9eaaa',
      publishedAt: '0x8569b7efebec65c73b9dc15c5ac2a9542870d286fa79a3feedffbaa94ed53002',
      typeOrigins: {
        'linked_table::LinkedTable':
          '0xbe21a06129308e0495431d12286127897aff07a8ade3970495a4404d97f9eaaa',
        'linked_table::Node': '0xbe21a06129308e0495431d12286127897aff07a8ade3970495a4404d97f9eaaa',
        'option_u128::OptionU128':
          '0x7118b0382949f8321e995203c59eb60f0d48657d74234946d32b2bf7126ec80d',
        'option_u64::OptionU64':
          '0xbe21a06129308e0495431d12286127897aff07a8ade3970495a4404d97f9eaaa',
        'random::Random': '0xbe21a06129308e0495431d12286127897aff07a8ade3970495a4404d97f9eaaa',
        'skip_list::Item': '0xbe21a06129308e0495431d12286127897aff07a8ade3970495a4404d97f9eaaa',
        'skip_list::Node': '0xbe21a06129308e0495431d12286127897aff07a8ade3970495a4404d97f9eaaa',
        'skip_list::SkipList': '0xbe21a06129308e0495431d12286127897aff07a8ade3970495a4404d97f9eaaa',
        'skip_list_u128::Item':
          '0x7118b0382949f8321e995203c59eb60f0d48657d74234946d32b2bf7126ec80d',
        'skip_list_u128::SkipList':
          '0x7118b0382949f8321e995203c59eb60f0d48657d74234946d32b2bf7126ec80d',
        'skip_list_u128::SkipListNode':
          '0x7118b0382949f8321e995203c59eb60f0d48657d74234946d32b2bf7126ec80d',
      },
    },
    'whusdte': {
      originalId: '0xc060006111016b8a020ad5b33834984a437aaa7d3c74c18e09a95d48aceab08c',
      publishedAt: '0xc060006111016b8a020ad5b33834984a437aaa7d3c74c18e09a95d48aceab08c',
      typeOrigins: {
        'coin::COIN': '0xc060006111016b8a020ad5b33834984a437aaa7d3c74c18e09a95d48aceab08c',
      },
    },
    'coin-decimals-registry': {
      originalId: '0xca5a5a62f01c79a104bf4d31669e29daa387f325c241de4edbe30986a9bc8b0d',
      publishedAt: '0xca5a5a62f01c79a104bf4d31669e29daa387f325c241de4edbe30986a9bc8b0d',
      typeOrigins: {
        'coin_decimals_registry::COIN_DECIMALS_REGISTRY':
          '0xca5a5a62f01c79a104bf4d31669e29daa387f325c241de4edbe30986a9bc8b0d',
        'coin_decimals_registry::CoinDecimalsRegistered':
          '0xca5a5a62f01c79a104bf4d31669e29daa387f325c241de4edbe30986a9bc8b0d',
        'coin_decimals_registry::CoinDecimalsRegistry':
          '0xca5a5a62f01c79a104bf4d31669e29daa387f325c241de4edbe30986a9bc8b0d',
      },
    },
    'rate-limiter': {
      originalId: '0xe829c047cf805d54bde8ff2390883004d4557193d33bac516f3232105a2f2bb2',
      publishedAt: '0xe829c047cf805d54bde8ff2390883004d4557193d33bac516f3232105a2f2bb2',
      typeOrigins: {
        'net_sliding_sum_limiter::NetSlidingSumLimiter':
          '0xe829c047cf805d54bde8ff2390883004d4557193d33bac516f3232105a2f2bb2',
        'ring_aggregator::RingAggregator':
          '0xe829c047cf805d54bde8ff2390883004d4557193d33bac516f3232105a2f2bb2',
        'sliding_sum_limiter::SlidingSumLimiter':
          '0xe829c047cf805d54bde8ff2390883004d4557193d33bac516f3232105a2f2bb2',
      },
    },
    'spool': {
      originalId: '0xe87f1b2d498106a2c61421cec75b7b5c5e348512b0dc263949a0e7a3c256571a',
      publishedAt: '0xec1ac7f4d01c5bf178ff4e62e523e7df7721453d81d4904a42a0ffc2686c843d',
      typeOrigins: {
        'admin::AddSpoolPointEvent':
          '0x472fc7d4c3534a8ec8c2f5d7a557a43050eab057aaab853e8910968ddc84fc9f',
        'admin::AdminCap': '0xe87f1b2d498106a2c61421cec75b7b5c5e348512b0dc263949a0e7a3c256571a',
        'admin::CreateSpoolEvent':
          '0xe87f1b2d498106a2c61421cec75b7b5c5e348512b0dc263949a0e7a3c256571a',
        'admin::UpdateSpoolConfigEvent':
          '0xe87f1b2d498106a2c61421cec75b7b5c5e348512b0dc263949a0e7a3c256571a',
        'rewards_pool::RewardsPool':
          '0xe87f1b2d498106a2c61421cec75b7b5c5e348512b0dc263949a0e7a3c256571a',
        'rewards_pool::RewardsPoolFee':
          '0xec1ac7f4d01c5bf178ff4e62e523e7df7721453d81d4904a42a0ffc2686c843d',
        'rewards_pool::RewardsPoolFeeKey':
          '0xec1ac7f4d01c5bf178ff4e62e523e7df7721453d81d4904a42a0ffc2686c843d',
        'rewards_pool::RewardsPoolRewardsBalanceKey':
          '0xec1ac7f4d01c5bf178ff4e62e523e7df7721453d81d4904a42a0ffc2686c843d',
        'spool::Spool': '0xe87f1b2d498106a2c61421cec75b7b5c5e348512b0dc263949a0e7a3c256571a',
        'spool_account::SpoolAccount':
          '0xe87f1b2d498106a2c61421cec75b7b5c5e348512b0dc263949a0e7a3c256571a',
        'user::CreateSpoolAccountEvent':
          '0xe87f1b2d498106a2c61421cec75b7b5c5e348512b0dc263949a0e7a3c256571a',
        'user::SpoolAccountRedeemRewardsEvent':
          '0xe87f1b2d498106a2c61421cec75b7b5c5e348512b0dc263949a0e7a3c256571a',
        'user::SpoolAccountRedeemRewardsEventV2':
          '0xec1ac7f4d01c5bf178ff4e62e523e7df7721453d81d4904a42a0ffc2686c843d',
        'user::SpoolAccountStakeEvent':
          '0xe87f1b2d498106a2c61421cec75b7b5c5e348512b0dc263949a0e7a3c256571a',
        'user::SpoolAccountUnstakeEvent':
          '0xe87f1b2d498106a2c61421cec75b7b5c5e348512b0dc263949a0e7a3c256571a',
      },
    },
    'protocol': {
      originalId: '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
      publishedAt: '0xc2596018248934aa86b3065390bf69ba5f7007e34df7e4032b736eb256f82f1c',
      typeOrigins: {
        'apm::MinPriceHistory':
          '0xd384ded6b9e7f4d2c4c9007b0291ef88fbfed8e709bce83d2da69de2d79d013d',
        'app::APP': '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'app::AdminCap': '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'app::FreezeProtocolEvent':
          '0xd384ded6b9e7f4d2c4c9007b0291ef88fbfed8e709bce83d2da69de2d79d013d',
        'app::TakeBorrowFeeEvent':
          '0x83bbe0b3985c5e3857803e2678899b03f3c4a31be75006ab03faf268c014ce41',
        'app::TakeRevenueEvent':
          '0xe7dbb371a9595631f7964b7ece42255ad0e738cc85fe6da26c7221b220f01af6',
        'asset_active_state::AssetActiveStates':
          '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'asset_active_state::BaseAssetActiveStates':
          '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'asset_active_state::CollateralActiveStates':
          '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'borrow::BorrowEvent': '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'borrow::BorrowEventV2':
          '0xc38f849e81cfe46d4e4320f508ea7dda42934a329d5a6571bb4c3cb6ea63f5da',
        'borrow::BorrowEventV3':
          '0x6e641f0dca8aedab3101d047e96439178f16301bf0b57fe8745086ff1195eb3e',
        'borrow_dynamics::BorrowDynamic':
          '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'borrow_dynamics::BorrowDynamics':
          '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'borrow_referral::AuthorizedWitnessList':
          '0x6e641f0dca8aedab3101d047e96439178f16301bf0b57fe8745086ff1195eb3e',
        'borrow_referral::BorrowReferral':
          '0x6e641f0dca8aedab3101d047e96439178f16301bf0b57fe8745086ff1195eb3e',
        'borrow_referral::BorrowReferralCfgKey':
          '0x6e641f0dca8aedab3101d047e96439178f16301bf0b57fe8745086ff1195eb3e',
        'borrow_referral::BorrowedKey':
          '0x32243989d7363f209bbfc54112db408b24a01b27a3b0b3928e541daa18b2d5eb',
        'borrow_referral::ReferralFeeKey':
          '0x32243989d7363f209bbfc54112db408b24a01b27a3b0b3928e541daa18b2d5eb',
        'collateral_stats::CollateralStat':
          '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'collateral_stats::CollateralStats':
          '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'deposit_collateral::CollateralDepositEvent':
          '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'flash_loan::BorrowFlashLoanEvent':
          '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'flash_loan::BorrowFlashLoanV2Event':
          '0x6e641f0dca8aedab3101d047e96439178f16301bf0b57fe8745086ff1195eb3e',
        'flash_loan::RepayFlashLoanEvent':
          '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'flash_loan::RepayFlashLoanV2Event':
          '0x6e641f0dca8aedab3101d047e96439178f16301bf0b57fe8745086ff1195eb3e',
        'incentive_rewards::RewardFactor':
          '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'incentive_rewards::RewardFactors':
          '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'interest_model::InterestModel':
          '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'interest_model::InterestModelAdded':
          '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'interest_model::InterestModelChangeCreated':
          '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'interest_model::InterestModels':
          '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'limiter::Limiter': '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'limiter::LimiterLimitChangeAppliedEvent':
          '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'limiter::LimiterParamsChangeAppliedEvent':
          '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'limiter::LimiterUpdateLimitChange':
          '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'limiter::LimiterUpdateLimitChangeCreatedEvent':
          '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'limiter::LimiterUpdateParamsChange':
          '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'limiter::LimiterUpdateParamsChangeCreatedEvent':
          '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'limiter::Limiters': '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'limiter::Segment': '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'liquidate::LiquidateEvent':
          '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'liquidate::LiquidateEventV2':
          '0x6e641f0dca8aedab3101d047e96439178f16301bf0b57fe8745086ff1195eb3e',
        'lock_obligation::ObligationForceUnlocked':
          '0xd384ded6b9e7f4d2c4c9007b0291ef88fbfed8e709bce83d2da69de2d79d013d',
        'lock_obligation::ObligationUnhealthyUnlocked':
          '0x94395cb33657aff9d8e0b278db498acaab50bad2160d28d4fad1be21687c3357',
        'market::Market': '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'market_dynamic_keys::ApmThresholdKey':
          '0xd384ded6b9e7f4d2c4c9007b0291ef88fbfed8e709bce83d2da69de2d79d013d',
        'market_dynamic_keys::BorrowFeeKey':
          '0xc38f849e81cfe46d4e4320f508ea7dda42934a329d5a6571bb4c3cb6ea63f5da',
        'market_dynamic_keys::BorrowFeeRecipientKey':
          '0xc38f849e81cfe46d4e4320f508ea7dda42934a329d5a6571bb4c3cb6ea63f5da',
        'market_dynamic_keys::BorrowLimitKey':
          '0xe7dbb371a9595631f7964b7ece42255ad0e738cc85fe6da26c7221b220f01af6',
        'market_dynamic_keys::IsolatedAssetKey':
          '0xe7dbb371a9595631f7964b7ece42255ad0e738cc85fe6da26c7221b220f01af6',
        'market_dynamic_keys::MinCollateralAmountKey':
          '0xd384ded6b9e7f4d2c4c9007b0291ef88fbfed8e709bce83d2da69de2d79d013d',
        'market_dynamic_keys::MinPriceHistoryKey':
          '0xd384ded6b9e7f4d2c4c9007b0291ef88fbfed8e709bce83d2da69de2d79d013d',
        'market_dynamic_keys::PauseAuthorityRegistryKey':
          '0xd384ded6b9e7f4d2c4c9007b0291ef88fbfed8e709bce83d2da69de2d79d013d',
        'market_dynamic_keys::SupplyLimitKey':
          '0x6e641f0dca8aedab3101d047e96439178f16301bf0b57fe8745086ff1195eb3e',
        'mint::MintEvent': '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'obligation::Obligation':
          '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'obligation::ObligationKey':
          '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'obligation::ObligationLocked':
          '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'obligation::ObligationOwnership':
          '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'obligation::ObligationRewardsPointRedeemed':
          '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'obligation::ObligationUnlocked':
          '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'obligation_access::ObligationAccessStore':
          '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'obligation_collaterals::Collateral':
          '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'obligation_collaterals::ObligationCollaterals':
          '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'obligation_debts::Debt':
          '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'obligation_debts::ObligationDebts':
          '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'open_obligation::ObligationCreatedEvent':
          '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'open_obligation::ObligationHotPotato':
          '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'redeem::RedeemEvent': '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'repay::RepayEvent': '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'reserve::BalanceSheet':
          '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'reserve::BalanceSheets':
          '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'reserve::BorrowFeeVaultKey':
          '0x83bbe0b3985c5e3857803e2678899b03f3c4a31be75006ab03faf268c014ce41',
        'reserve::FlashLoan': '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'reserve::FlashLoanFees':
          '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'reserve::MarketCoin': '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'reserve::MarketCoinPriceTableKey':
          '0xd384ded6b9e7f4d2c4c9007b0291ef88fbfed8e709bce83d2da69de2d79d013d',
        'reserve::Reserve': '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'risk_model::RiskModel':
          '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'risk_model::RiskModelAdded':
          '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'risk_model::RiskModelChangeCreated':
          '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'risk_model::RiskModels':
          '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'version::Version': '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'version::VersionCap': '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
        'withdraw_collateral::CollateralWithdrawEvent':
          '0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf',
      },
    },
  },
}
