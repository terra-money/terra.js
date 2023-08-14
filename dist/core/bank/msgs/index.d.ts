import { MsgSend } from './MsgSend';
import { MsgMultiSend } from './MsgMultiSend';
export * from './MsgSend';
export * from './MsgMultiSend';
export declare type BankMsg = MsgSend | MsgMultiSend;
export declare namespace BankMsg {
    type Amino = MsgSend.Amino | MsgMultiSend.Amino;
    type Data = MsgSend.Data | MsgMultiSend.Data;
    type Proto = MsgSend.Proto | MsgMultiSend.Proto;
}
