import { MsgStoreCode } from './MsgStoreCode';
import { MsgInstantiateContract } from './MsgInstantiateContract';
import { MsgExecuteContract } from './MsgExecuteContract';

export * from './MsgStoreCode';
export * from './MsgInstantiateContract';
export * from './MsgExecuteContract';

export type WASMMsg =
  | MsgStoreCode
  | MsgInstantiateContract
  | MsgExecuteContract;

export namespace WASMMsg {
  export type Data =
    | MsgStoreCode.Data
    | MsgInstantiateContract.Data
    | MsgExecuteContract.Data;
}
