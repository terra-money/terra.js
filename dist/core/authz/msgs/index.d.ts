import { MsgGrantAuthorization } from './MsgGrantAuthorization';
import { MsgRevokeAuthorization } from './MsgRevokeAuthorization';
import { MsgExecAuthorized } from './MsgExecAuthorized';
export * from './MsgGrantAuthorization';
export * from './MsgRevokeAuthorization';
export * from './MsgExecAuthorized';
export declare type MsgAuthMsg = MsgGrantAuthorization | MsgRevokeAuthorization | MsgExecAuthorized;
export declare namespace MsgAuthMsg {
    type Amino = MsgGrantAuthorization.Amino | MsgRevokeAuthorization.Amino | MsgExecAuthorized.Amino;
    type Data = MsgGrantAuthorization.Data | MsgRevokeAuthorization.Data | MsgExecAuthorized.Data;
    type Proto = MsgGrantAuthorization.Proto | MsgRevokeAuthorization.Proto | MsgExecAuthorized.Proto;
}
