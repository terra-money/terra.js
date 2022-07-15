import { MsgTransfer } from './v1/msgs/MsgTransfer';

export * from './v1/msgs/MsgTransfer';
export * from './v2/FungibleTokenPacketData';
export * from './v1/DenomTrace';

export type IbcTransferMsg = MsgTransfer;
export namespace IbcTransferMsg {
  export type Data = MsgTransfer.Data;
  export type Amino = MsgTransfer.Amino;
  export type Proto = MsgTransfer.Proto;
}
