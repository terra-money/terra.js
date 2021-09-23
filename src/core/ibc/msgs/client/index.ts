import { MsgCreateClient } from './MsgCreateClient';
import { MsgSubmitMisbehaviour } from './MsgSubmitMisbehaviour';
import { MsgUpdateClient } from './MsgUpdateClient';
import { MsgUpgradeClient } from './MsgUpgradeClient';

export * from './MsgCreateClient';
export * from './MsgUpdateClient';
export * from './MsgUpgradeClient';
export * from './MsgSubmitMisbehaviour';

export type IbcClientMsg =
  | MsgCreateClient
  | MsgUpdateClient
  | MsgUpgradeClient
  | MsgSubmitMisbehaviour;

export namespace IbcClientMsg {
  export type Data =
    | MsgCreateClient.Data
    | MsgUpdateClient.Data
    | MsgUpgradeClient.Data
    | MsgSubmitMisbehaviour.Data;
  export type Proto =
    | MsgCreateClient.Proto
    | MsgUpdateClient.Proto
    | MsgUpgradeClient.Proto
    | MsgSubmitMisbehaviour.Proto;
}
