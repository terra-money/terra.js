import { MsgGrantAuthorization } from './MsgGrantAuthorization';
export * from './MsgGrantAuthorization';

import { MsgRevokeAuthorization } from './MsgRevokeAuthorization';
export * from './MsgRevokeAuthorization';

import { MsgExecAuthorized } from './MsgExecAuthorized';
export * from './MsgExecAuthorized';

export type MsgAuthMsg =
  | MsgExecAuthorized
  | MsgGrantAuthorization
  | MsgRevokeAuthorization;

export namespace MsgAuthMsg {
  export type Data =
    | MsgGrantAuthorization.Data
    | MsgRevokeAuthorization.Data
    | MsgExecAuthorized.Data;
}
