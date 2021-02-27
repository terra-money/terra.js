import { MsgGrantAuthorization } from './MsgGrantAuthorization';
import { MsgRevokeAuthorization } from './MsgRevokeAuthorization';
import { MsgExecAuthorized } from './MsgExecAuthorized';
export * from './MsgGrantAuthorization';
export * from './MsgRevokeAuthorization';
export * from './MsgExecAuthorized';
export declare type MsgAuthMsg = MsgGrantAuthorization | MsgRevokeAuthorization | MsgExecAuthorized;
export declare namespace MsgAuthMsg {
    type Data = MsgGrantAuthorization.Data | MsgRevokeAuthorization.Data | MsgExecAuthorized.Data;
}
