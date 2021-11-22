import { MsgSend } from './MsgSend';
import { MsgMultiSend } from './MsgMultiSend';

export * from './MsgSend';
export * from './MsgMultiSend';

export type BankMsg = MsgSend | MsgMultiSend;
export namespace BankMsg {
  export type Amino = MsgSend.Amino | MsgMultiSend.Amino;
  export type Data = MsgSend.Data | MsgMultiSend.Data;
  export type Proto = MsgSend.Proto | MsgMultiSend.Proto;
}
