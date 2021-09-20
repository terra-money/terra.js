import { MsgTransfer } from './MsgTransfer';

export * from './MsgTransfer';

export type IbcTransferMsg = MsgTransfer;
export namespace IbcTransferMsg {
  export type Data = MsgTransfer.Data;
  export type Amino = MsgTransfer.Amino;
  export type Proto = MsgTransfer.Proto;
}
