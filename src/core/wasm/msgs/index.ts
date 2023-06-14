import { MsgStoreCode } from './MsgStoreCode';
import { MsgInstantiateContract } from './MsgInstantiateContract';
import { MsgExecuteContract } from './MsgExecuteContract';
import { MsgMigrateContract } from './MsgMigrateContract';
import { MsgUpdateContractAdmin } from './MsgUpdateContractAdmin';
import { MsgClearContractAdmin } from './MsgClearContractAdmin';

export * from './MsgStoreCode';
export * from './MsgInstantiateContract';
export * from './MsgExecuteContract';
export * from './MsgMigrateContract';
export * from './MsgUpdateContractAdmin';
export * from './MsgClearContractAdmin';

export type WasmMsg =
  | MsgStoreCode
  | MsgInstantiateContract
  | MsgExecuteContract
  | MsgMigrateContract
  | MsgUpdateContractAdmin
  | MsgClearContractAdmin;

export namespace WasmMsg {
  export type Amino =
    | MsgStoreCode.Amino
    | MsgInstantiateContract.Amino
    | MsgExecuteContract.Amino
    | MsgMigrateContract.Amino
    | MsgUpdateContractAdmin.Amino
    | MsgClearContractAdmin.Amino;
  export type Data =
    | MsgStoreCode.Data
    | MsgInstantiateContract.Data
    | MsgExecuteContract.Data
    | MsgMigrateContract.Data
    | MsgUpdateContractAdmin.Data
    | MsgClearContractAdmin.Data;
  export type Proto =
    | MsgStoreCode.Proto
    | MsgInstantiateContract.Proto
    | MsgExecuteContract.Proto
    | MsgMigrateContract.Proto
    | MsgUpdateContractAdmin.Proto
    | MsgClearContractAdmin.Proto;
}
