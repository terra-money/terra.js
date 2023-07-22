import { MsgRegisterInterchainAccount } from './v1/controller/msgs/MsgRegisterInterchainAccount';
import { MsgSendTx } from './v1/controller/msgs/MsgSendTx';

export { Params as ControllerParams } from './v1/controller/Params';
export { Params as HostParams } from './v1/host/Params';

export * from './v1/InterchainAccount';
export * from './v1/Metadata';
export * from './v1/InterchainAccountPacketData';
export * from './v1/controller/msgs/MsgRegisterInterchainAccount';
export * from './v1/controller/msgs/MsgSendTx';

export type IbcInterchainAccountsMsg = MsgRegisterInterchainAccount | MsgSendTx;

export namespace IbcInterchainAccountsMsg {
  export type Data = MsgRegisterInterchainAccount.Data | MsgSendTx.Data;
  export type Proto = MsgRegisterInterchainAccount.Proto | MsgSendTx.Proto;
}
