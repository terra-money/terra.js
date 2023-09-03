import { MsgStoreCode } from './MsgStoreCode';
import { MsgInstantiateContract } from './MsgInstantiateContract';
import { MsgInstantiateContract2 } from './MsgInstantiateContract2';
import { MsgExecuteContract } from './MsgExecuteContract';
import { MsgMigrateContract } from './MsgMigrateContract';
import { MsgUpdateAdmin } from './MsgUpdateAdmin';
import { MsgClearAdmin } from './MsgClearAdmin';

export * from './MsgStoreCode';
export * from './MsgInstantiateContract';
export * from './MsgInstantiateContract2';
export * from './MsgExecuteContract';
export * from './MsgMigrateContract';
export * from './MsgUpdateAdmin';
export * from './MsgClearAdmin';

export type WasmMsg =
  | MsgStoreCode
  | MsgInstantiateContract
  | MsgInstantiateContract2
  | MsgExecuteContract
  | MsgMigrateContract
  | MsgUpdateAdmin
  | MsgClearAdmin;

export namespace WasmMsg {
  export type Amino =
    | MsgStoreCode.Amino
    | MsgInstantiateContract.Amino
    | MsgInstantiateContract2.Amino
    | MsgExecuteContract.Amino
    | MsgMigrateContract.Amino
    | MsgUpdateAdmin.Amino
    | MsgClearAdmin.Amino;
  export type Data =
    | MsgStoreCode.Data
    | MsgInstantiateContract.Data
    | MsgInstantiateContract2.Data
    | MsgExecuteContract.Data
    | MsgMigrateContract.Data
    | MsgUpdateAdmin.Data
    | MsgClearAdmin.Data;
  export type Proto =
    | MsgStoreCode.Proto
    | MsgInstantiateContract.Proto
    | MsgInstantiateContract2.Proto
    | MsgExecuteContract.Proto
    | MsgMigrateContract.Proto
    | MsgUpdateAdmin.Proto
    | MsgClearAdmin.Proto;
}
