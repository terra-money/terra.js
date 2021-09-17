import { MsgSwap } from './MsgSwap';
export * from './MsgSwap';

import { MsgSwapSend } from './MsgSwapSend';
export * from './MsgSwapSend';

export type MarketMsg = MsgSwap | MsgSwapSend;

export namespace MarketMsg {
  export type Amino = MsgSwap.Amino | MsgSwapSend.Amino;
  export type Data = MsgSwap.Data | MsgSwapSend.Data;
  export type Proto = MsgSwap.Proto | MsgSwapSend.Proto;
}
