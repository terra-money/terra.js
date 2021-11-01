import { MsgTransfer } from './MsgTransfer';

export * from './MsgTransfer';

export type CosmosMsg = MsgTransfer;
export namespace CosmosMsg {
  export type Data = MsgTransfer.Data;
}
