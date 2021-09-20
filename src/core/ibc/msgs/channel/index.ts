import { MsgChannelOpenInit } from './MsgChannelOpenInit';
import { MsgChannelOpenTry } from './MsgChannelOpenTry';
import { MsgChannelOpenConfirm } from './MsgChannelOpenConfirm';
import { MsgChannelOpenAck } from './MsgChannelOpenAck';
import { MsgChannelCloseInit } from './MsgChannelCloseInit';
import { MsgChannelCloseConfirm } from './MsgChannelCloseConfirm';
import { MsgRecvPacket } from './MsgRecvPacket';
import { MsgAcknowledgement } from './MsgRecvAcknowledgement';
import { MsgTimeout } from './MsgTimeout';
import { MsgTimeoutOnClose } from './MsgTimeoutClose';

export * from './MsgChannelOpenInit';
export * from './MsgChannelOpenTry';
export * from './MsgChannelOpenConfirm';
export * from './MsgChannelOpenAck';
export * from './MsgChannelCloseInit';
export * from './MsgChannelCloseConfirm';
export * from './MsgRecvPacket';
export * from './MsgRecvAcknowledgement';
export * from './MsgTimeout';
export * from './MsgTimeoutClose';

export type IbcChannelMsg =
  | MsgChannelOpenInit
  | MsgChannelOpenTry
  | MsgChannelOpenConfirm
  | MsgChannelOpenAck
  | MsgChannelCloseInit
  | MsgChannelCloseConfirm
  | MsgRecvPacket
  | MsgAcknowledgement
  | MsgTimeout
  | MsgTimeoutOnClose;

export namespace IbcChannelMsg {
  export type Amino =
    | MsgChannelOpenInit.Amino
    | MsgChannelOpenTry.Amino
    | MsgChannelOpenConfirm.Amino
    | MsgChannelOpenAck.Amino
    | MsgChannelCloseInit.Amino
    | MsgChannelCloseConfirm.Amino
    | MsgRecvPacket.Amino
    | MsgAcknowledgement.Amino
    | MsgTimeout.Amino
    | MsgTimeoutOnClose.Amino;

  export type Data =
    | MsgChannelOpenInit.Data
    | MsgChannelOpenTry.Data
    | MsgChannelOpenConfirm.Data
    | MsgChannelOpenAck.Data
    | MsgChannelCloseInit.Data
    | MsgChannelCloseConfirm.Data
    | MsgRecvPacket.Data
    | MsgAcknowledgement.Data
    | MsgTimeout.Data
    | MsgTimeoutOnClose.Data;

  export type Proto =
    | MsgChannelOpenInit.Proto
    | MsgChannelOpenTry.Proto
    | MsgChannelOpenConfirm.Proto
    | MsgChannelOpenAck.Proto
    | MsgChannelCloseInit.Proto
    | MsgChannelCloseConfirm.Proto
    | MsgRecvPacket.Proto
    | MsgAcknowledgement.Proto
    | MsgTimeout.Proto
    | MsgTimeoutOnClose.Proto;
}
