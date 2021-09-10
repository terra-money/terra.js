import { BankMsg, MsgMultiSend, MsgSend } from './bank/msgs';
import {
  DistributionMsg,
  MsgSetWithdrawAddress,
  MsgWithdrawDelegatorReward,
  MsgWithdrawValidatorCommission,
  MsgFundCommunityPool,
} from './distribution/msgs';
import {
  MsgGrantAllowance,
  MsgRevokeAllowance,
  FeeGrantMsg,
} from './feegrant/msgs';
import { GovMsg, MsgDeposit, MsgSubmitProposal, MsgVote } from './gov/msgs';
import { MarketMsg, MsgSwap, MsgSwapSend } from './market/msgs';
import {
  MsgGrantAuthorization,
  MsgRevokeAuthorization,
  MsgExecAuthorized,
  MsgAuthMsg,
} from './authz/msgs';
import {
  MsgDelegateFeedConsent,
  MsgAggregateExchangeRatePrevote,
  MsgAggregateExchangeRateVote,
  OracleMsg,
} from './oracle/msgs';
import { MsgUnjail, SlashingMsg } from './slashing/msgs';
import {
  MsgBeginRedelegate,
  MsgCreateValidator,
  MsgDelegate,
  MsgEditValidator,
  MsgUndelegate,
  StakingMsg,
} from './staking/msgs';
import {
  MsgStoreCode,
  MsgMigrateCode,
  MsgInstantiateContract,
  MsgExecuteContract,
  MsgMigrateContract,
  MsgUpdateContractAdmin,
  MsgClearContractAdmin,
  WasmMsg,
} from './wasm/msgs';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';

export type Msg =
  | BankMsg
  | DistributionMsg
  | FeeGrantMsg
  | GovMsg
  | MarketMsg
  | MsgAuthMsg
  | OracleMsg
  | SlashingMsg
  | StakingMsg
  | WasmMsg
  | NotSupportedMsg;

export namespace Msg {
  export type Data =
    | BankMsg.Data
    | DistributionMsg.Data
    | FeeGrantMsg.Data
    | GovMsg.Data
    | MarketMsg.Data
    | MsgAuthMsg.Data
    | OracleMsg.Data
    | SlashingMsg.Data
    | StakingMsg.Data
    | WasmMsg.Data;

  export type Proto =
    | BankMsg.Proto
    | DistributionMsg.Proto
    | FeeGrantMsg.Proto
    | GovMsg.Proto
    | MarketMsg.Proto
    | MsgAuthMsg.Proto
    | OracleMsg.Proto
    | SlashingMsg.Proto
    | StakingMsg.Proto
    | WasmMsg.Proto
    | NotSupportedMsg.Proto;

  export function fromData(data: Msg.Data): Msg {
    switch (data.type) {
      // bank
      case 'bank/MsgSend':
        return MsgSend.fromData(data);
      case 'bank/MsgMultiSend':
        return MsgMultiSend.fromData(data);

      // distribution
      case 'distribution/MsgModifyWithdrawAddress':
        return MsgSetWithdrawAddress.fromData(data);
      case 'distribution/MsgWithdrawDelegationReward':
        return MsgWithdrawDelegatorReward.fromData(data);
      case 'distribution/MsgWithdrawValidatorCommission':
        return MsgWithdrawValidatorCommission.fromData(data);
      case 'distribution/MsgFundCommunityPool':
        return MsgFundCommunityPool.fromData(data);

      // feegrant
      case 'feegrant/MsgGrantAllowance':
        return MsgGrantAllowance.fromData(data);
      case 'feegrant/MsgRevokeAllowance':
        return MsgRevokeAllowance.fromData(data);

      // gov
      case 'gov/MsgDeposit':
        return MsgDeposit.fromData(data);
      case 'gov/MsgSubmitProposal':
        return MsgSubmitProposal.fromData(data);
      case 'gov/MsgVote':
        return MsgVote.fromData(data);

      // market
      case 'market/MsgSwap':
        return MsgSwap.fromData(data);
      case 'market/MsgSwapSend':
        return MsgSwapSend.fromData(data);

      // msgauth
      case 'msgauth/MsgGrantAuthorization':
        return MsgGrantAuthorization.fromData(data);
      case 'msgauth/MsgRevokeAuthorization':
        return MsgRevokeAuthorization.fromData(data);
      case 'msgauth/MsgExecAuthorized':
        return MsgExecAuthorized.fromData(data);

      // oracle
      case 'oracle/MsgDelegateFeedConsent':
        return MsgDelegateFeedConsent.fromData(data);
      case 'oracle/MsgAggregateExchangeRatePrevote':
        return MsgAggregateExchangeRatePrevote.fromData(data);
      case 'oracle/MsgAggregateExchangeRateVote':
        return MsgAggregateExchangeRateVote.fromData(data);

      // slashing
      case 'slashing/MsgUnjail':
        return MsgUnjail.fromData(data);

      // staking
      case 'staking/MsgDelegate':
        return MsgDelegate.fromData(data);
      case 'staking/MsgUndelegate':
        return MsgUndelegate.fromData(data);
      case 'staking/MsgBeginRedelegate':
        return MsgBeginRedelegate.fromData(data);
      case 'staking/MsgCreateValidator':
        return MsgCreateValidator.fromData(data);
      case 'staking/MsgEditValidator':
        return MsgEditValidator.fromData(data);

      // wasm
      case 'wasm/MsgStoreCode':
        return MsgStoreCode.fromData(data);
      case 'wasm/MsgMigrateCode':
        return MsgMigrateCode.fromData(data);
      case 'wasm/MsgInstantiateContract':
        return MsgInstantiateContract.fromData(data);
      case 'wasm/MsgExecuteContract':
        return MsgExecuteContract.fromData(data);
      case 'wasm/MsgMigrateContract':
        return MsgMigrateContract.fromData(data);
      case 'wasm/MsgUpdateContractAdmin':
        return MsgUpdateContractAdmin.fromData(data);
      case 'wasm/MsgClearContractAdmin':
        return MsgClearContractAdmin.fromData(data);
      default:
        throw new Error(`unable to parse msg: ${data} unrecognized`);
    }
  }

  export function fromProto(proto: Any): Msg {
    switch (proto.typeUrl) {
      // bank
      case '/cosmos.bank.v1beta1.MsgSend':
        return MsgSend.unpackAny(proto);
      case '/cosmos.bank.v1beta1.MsgMultiSend':
        return MsgMultiSend.unpackAny(proto);

      // distribution
      case '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress':
        return MsgSetWithdrawAddress.unpackAny(proto);
      case '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward':
        return MsgWithdrawDelegatorReward.unpackAny(proto);
      case '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission':
        return MsgWithdrawValidatorCommission.unpackAny(proto);
      case '/cosmos.distribution.v1beta1.MsgFundCommunityPool':
        return MsgFundCommunityPool.unpackAny(proto);

      // feegrant
      case '/cosmos.feegrant.v1beta1.MsgGrantAllowance':
        return MsgGrantAllowance.unpackAny(proto);
      case '/cosmos.feegrant.v1beta1.MsgRevokeAllowance':
        return MsgRevokeAllowance.unpackAny(proto);

      // gov
      case '/cosmos.gov.v1beta1.MsgDeposit':
        return MsgDeposit.unpackAny(proto);
      case '/cosmos.gov.v1beta1.MsgSubmitProposal':
        return MsgSubmitProposal.unpackAny(proto);
      case '/cosmos.gov.v1beta1.MsgVote':
        return MsgVote.unpackAny(proto);

      // market
      case '/terra.market.v1beta1.MsgSwap':
        return MsgSwap.unpackAny(proto);
      case '/terra.market.v1beta1.MsgSwapSend':
        return MsgSwapSend.unpackAny(proto);

      // authz
      case '/cosmos.authz.v1beta1.MsgGrant':
        return MsgGrantAuthorization.unpackAny(proto);
      case '/cosmos.authz.v1beta1.MsgRevoke':
        return MsgRevokeAuthorization.unpackAny(proto);
      case '/cosmos.authz.v1beta1.MsgExec':
        return MsgExecAuthorized.unpackAny(proto);

      // oracle
      case '/terra.oracle.v1beta1.MsgDelegateFeedConsent':
        return MsgDelegateFeedConsent.unpackAny(proto);
      case '/terra.oracle.v1beta1.MsgAggregateExchangeRatePrevote':
        return MsgAggregateExchangeRatePrevote.unpackAny(proto);
      case '/terra.oracle.v1beta1.MsgAggregateExchangeRateVote':
        return MsgAggregateExchangeRateVote.unpackAny(proto);

      // slashing
      case '/cosmos.slashing.v1beta1.MsgUnjail':
        return MsgUnjail.unpackAny(proto);

      // staking
      case '/cosmos.staking.v1beta1.MsgDelegate':
        return MsgDelegate.unpackAny(proto);
      case '/cosmos.staking.v1beta1.MsgUndelegate':
        return MsgUndelegate.unpackAny(proto);
      case '/cosmos.staking.v1beta1.MsgBeginRedelegate':
        return MsgBeginRedelegate.unpackAny(proto);
      case '/cosmos.staking.v1beta1.MsgCreateValidator':
        return MsgCreateValidator.unpackAny(proto);
      case '/cosmos.staking.v1beta1.MsgEditValidator':
        return MsgEditValidator.unpackAny(proto);

      // wasm
      case '/terra.wasm.v1beta1.MsgStoreCode':
        return MsgStoreCode.unpackAny(proto);
      case '/terra.wasm.v1beta1.MsgMigrateCode':
        return MsgMigrateCode.unpackAny(proto);
      case '/terra.wasm.v1beta1.MsgInstantiateContract':
        return MsgInstantiateContract.unpackAny(proto);
      case '/terra.wasm.v1beta1.MsgExecuteContract':
        return MsgExecuteContract.unpackAny(proto);
      case '/terra.wasm.v1beta1.MsgMigrateContract':
        return MsgMigrateContract.unpackAny(proto);
      case '/terra.wasm.v1beta1.MsgUpdateContractAdmin':
        return MsgUpdateContractAdmin.unpackAny(proto);
      case '/terra.wasm.v1beta1.MsgClearContractAdmin':
        return MsgClearContractAdmin.unpackAny(proto);
      default:
        return NotSupportedMsg.unpackAny(proto);
    }
  }
}

export class NotSupportedMsg {
  constructor(public typeUrl: string, public value: string) {}

  public static fromProto(msgAny: NotSupportedMsg.Proto): NotSupportedMsg {
    return new NotSupportedMsg(
      msgAny.typeUrl,
      Buffer.from(msgAny.value).toString('base64')
    );
  }

  public toProto(): NotSupportedMsg.Proto {
    return Any.fromPartial({
      typeUrl: this.typeUrl,
      value: Buffer.from(this.value, 'base64'),
    });
  }

  public static unpackAny(msgAny: Any): NotSupportedMsg {
    return NotSupportedMsg.fromProto(msgAny);
  }

  public packAny(): Any {
    return this.toProto();
  }
}

export namespace NotSupportedMsg {
  export type Proto = Any;
}
