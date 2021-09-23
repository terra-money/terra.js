import { MsgConnectionOpenAck } from './MsgConnectionOpenAck';
import { MsgConnectionOpenConfirm } from './MsgConnectionOpenConfirm';
import { MsgConnectionOpenInit } from './MsgConnectionOpenInit';
import { MsgConnectionOpenTry } from './MsgConnectionOpenTry';

export * from './MsgConnectionOpenInit';
export * from './MsgConnectionOpenTry';
export * from './MsgConnectionOpenConfirm';
export * from './MsgConnectionOpenAck';

export type IbcConnectionMsg =
  | MsgConnectionOpenInit
  | MsgConnectionOpenTry
  | MsgConnectionOpenConfirm
  | MsgConnectionOpenAck;

export namespace IbcConnectionMsg {
  export type Data =
    | MsgConnectionOpenInit.Data
    | MsgConnectionOpenTry.Data
    | MsgConnectionOpenConfirm.Data
    | MsgConnectionOpenAck.Data;
  export type Proto =
    | MsgConnectionOpenInit.Proto
    | MsgConnectionOpenTry.Proto
    | MsgConnectionOpenConfirm.Proto
    | MsgConnectionOpenAck.Proto;
}
