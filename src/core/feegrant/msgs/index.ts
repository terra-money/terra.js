import { MsgGrantAllowance } from './MsgGrantAllowance';
import { MsgRevokeAllowance } from './MsgRevokeAllowance';

export * from './MsgGrantAllowance';
export * from './MsgRevokeAllowance';

export type FeeGrantMsg = MsgGrantAllowance | MsgRevokeAllowance;

export namespace FeeGrantMsg {
  export type Amino = MsgGrantAllowance.Amino | MsgRevokeAllowance.Amino;
  export type Data = MsgGrantAllowance.Data | MsgRevokeAllowance.Data;
  export type Proto = MsgGrantAllowance.Proto | MsgRevokeAllowance.Proto;
}
