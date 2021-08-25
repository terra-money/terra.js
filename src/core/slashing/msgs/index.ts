import { MsgUnjail } from './MsgUnjail';

export * from './MsgUnjail';

export type SlashingMsg = MsgUnjail;
export namespace SlashingMsg {
  export type Data = MsgUnjail.Data;
  export type Proto = MsgUnjail.Proto;
}
