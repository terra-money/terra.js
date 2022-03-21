import { MsgVerifyInvariant } from './MsgVerifyInvariant';

export * from './MsgVerifyInvariant';

export type CrisisMsg = MsgVerifyInvariant;
export namespace CrisisMsg {
  export type Amino = MsgVerifyInvariant.Amino;
  export type Data = MsgVerifyInvariant.Data;
  export type Proto = MsgVerifyInvariant.Proto;
}
