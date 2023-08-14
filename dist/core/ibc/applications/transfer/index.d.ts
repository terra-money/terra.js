import { MsgTransfer } from './v1/msgs/MsgTransfer';
export * from './v1/msgs/MsgTransfer';
export * from './v2/FungibleTokenPacketData';
export * from './v1/DenomTrace';
export declare type IbcTransferMsg = MsgTransfer;
export declare namespace IbcTransferMsg {
    type Data = MsgTransfer.Data;
    type Amino = MsgTransfer.Amino;
    type Proto = MsgTransfer.Proto;
}
