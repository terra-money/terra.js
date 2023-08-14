import { MsgGrantAllowance } from './MsgGrantAllowance';
import { MsgRevokeAllowance } from './MsgRevokeAllowance';
export * from './MsgGrantAllowance';
export * from './MsgRevokeAllowance';
export declare type FeeGrantMsg = MsgGrantAllowance | MsgRevokeAllowance;
export declare namespace FeeGrantMsg {
    type Amino = MsgGrantAllowance.Amino | MsgRevokeAllowance.Amino;
    type Data = MsgGrantAllowance.Data | MsgRevokeAllowance.Data;
    type Proto = MsgGrantAllowance.Proto | MsgRevokeAllowance.Proto;
}
