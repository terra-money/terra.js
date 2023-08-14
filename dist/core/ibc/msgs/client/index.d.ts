import { MsgCreateClient } from './MsgCreateClient';
import { MsgSubmitMisbehaviour } from './MsgSubmitMisbehaviour';
import { MsgUpdateClient } from './MsgUpdateClient';
import { MsgUpgradeClient } from './MsgUpgradeClient';
export * from './MsgCreateClient';
export * from './MsgUpdateClient';
export * from './MsgUpgradeClient';
export * from './MsgSubmitMisbehaviour';
export declare type IbcClientMsg = MsgCreateClient | MsgUpdateClient | MsgUpgradeClient | MsgSubmitMisbehaviour;
export declare namespace IbcClientMsg {
    type Data = MsgCreateClient.Data | MsgUpdateClient.Data | MsgUpgradeClient.Data | MsgSubmitMisbehaviour.Data;
    type Proto = MsgCreateClient.Proto | MsgUpdateClient.Proto | MsgUpgradeClient.Proto | MsgSubmitMisbehaviour.Proto;
}
