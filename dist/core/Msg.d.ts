import { BankMsg } from './bank/msgs';
import { DistributionMsg } from './distribution/msgs';
import { GovMsg } from './gov/msgs';
import { MarketMsg } from './market/msgs';
import { MsgAuthMsg } from './msgauth/msgs';
import { OracleMsg } from './oracle/msgs';
import { SlashingMsg } from './slashing/msgs';
import { StakingMsg } from './staking/msgs';
import { WasmMsg } from './wasm/msgs';
export declare type Msg = BankMsg | DistributionMsg | GovMsg | MarketMsg | MsgAuthMsg | OracleMsg | SlashingMsg | StakingMsg | WasmMsg;
export declare namespace Msg {
    type Data = BankMsg.Data | DistributionMsg.Data | GovMsg.Data | MarketMsg.Data | MsgAuthMsg.Data | OracleMsg.Data | SlashingMsg.Data | StakingMsg.Data | WasmMsg.Data;
    function fromData(data: Msg.Data): Msg;
}
