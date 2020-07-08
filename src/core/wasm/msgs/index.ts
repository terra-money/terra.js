import { MsgStoreCode } from './MsgStoreCode';
import { MsgInstantiateContract } from './MsgInstantiateContract';
import { MsgExecuteContract } from './MsgExecuteContract';
import { MsgMigrateContract } from './MsgMigrateContract';
import { MsgUpdateContractOwner } from './MsgUpdateContractOwner';

export * from './MsgStoreCode';
export * from './MsgInstantiateContract';
export * from './MsgExecuteContract';
export * from './MsgMigrateContract';
export * from './MsgUpdateContractOwner';

export type WasmMsg =
  | MsgStoreCode
  | MsgInstantiateContract
  | MsgExecuteContract
  | MsgMigrateContract
  | MsgUpdateContractOwner;

export namespace WasmMsg {
  export type Data =
    | MsgStoreCode.Data
    | MsgInstantiateContract.Data
    | MsgExecuteContract.Data
    | MsgMigrateContract.Data
    | MsgUpdateContractOwner.Data;
}
