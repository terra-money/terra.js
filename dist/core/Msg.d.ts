import { BankMsg } from './bank/msgs';
import { DistributionMsg } from './distribution/msgs';
import { FeeGrantMsg } from './feegrant/msgs';
import { GovMsg } from './gov/msgs';
import { MarketMsg } from './market/msgs';
import { MsgAuthMsg } from './authz/msgs';
import { OracleMsg } from './oracle/msgs';
import { SlashingMsg } from './slashing/msgs';
import { StakingMsg } from './staking/msgs';
import { VestingMsg } from './vesting/msgs';
import { WasmMsg } from './wasm/msgs';
import { IbcTransferMsg } from './ibc/applications/transfer';
import { IbcClientMsg } from './ibc/msgs/client';
import { IbcConnectionMsg } from './ibc/msgs/connection';
import { IbcChannelMsg } from './ibc/msgs/channel';
import { CrisisMsg } from './crisis';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
export declare type Msg = BankMsg | DistributionMsg | FeeGrantMsg | GovMsg | MarketMsg | MsgAuthMsg | OracleMsg | SlashingMsg | StakingMsg | VestingMsg | WasmMsg | IbcTransferMsg | IbcClientMsg | IbcConnectionMsg | IbcChannelMsg | CrisisMsg;
export declare namespace Msg {
    type Amino = BankMsg.Amino | DistributionMsg.Amino | FeeGrantMsg.Amino | GovMsg.Amino | MarketMsg.Amino | MsgAuthMsg.Amino | OracleMsg.Amino | SlashingMsg.Amino | StakingMsg.Amino | VestingMsg.Amino | WasmMsg.Amino | IbcTransferMsg.Amino | CrisisMsg.Amino;
    type Data = BankMsg.Data | DistributionMsg.Data | FeeGrantMsg.Data | GovMsg.Data | MarketMsg.Data | MsgAuthMsg.Data | OracleMsg.Data | SlashingMsg.Data | StakingMsg.Data | VestingMsg.Data | WasmMsg.Data | IbcTransferMsg.Data | IbcClientMsg.Data | IbcConnectionMsg.Data | IbcChannelMsg.Data | CrisisMsg.Data;
    type Proto = BankMsg.Proto | DistributionMsg.Proto | FeeGrantMsg.Proto | GovMsg.Proto | MarketMsg.Proto | MsgAuthMsg.Proto | OracleMsg.Proto | SlashingMsg.Proto | StakingMsg.Proto | VestingMsg.Proto | WasmMsg.Proto | IbcTransferMsg.Proto | IbcClientMsg.Proto | IbcConnectionMsg.Proto | IbcChannelMsg.Proto | CrisisMsg.Proto;
    function fromAmino(data: Msg.Amino, isClassic?: boolean): Msg;
    function fromData(data: Msg.Data, isClassic?: boolean): Msg;
    function fromProto(proto: Any, isClassic?: boolean): Msg;
}
