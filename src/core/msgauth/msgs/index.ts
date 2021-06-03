import { MsgGrantAuthorization } from './MsgGrantAuthorization';
import { MsgRevokeAuthorization } from './MsgRevokeAuthorization';
import { MsgExecAuthorized } from './MsgExecAuthorized';

export * from './MsgGrantAuhorization';
export * from './MsgRevokeAuthorization';
export * from './MsgExecAuthorized';

export type MsgAuthMsg =
  | MsgGrantAuthorization
  | MsgRevokeAuthorization
  | MsgExecAuthorized;

export namespace MsgAuthMsg {
  export type Data =
    | MsgGrantAuthorization.Data
    | MsgRevokeAuthorization.Data
    | MsgExecAuthorized.Data;
}
