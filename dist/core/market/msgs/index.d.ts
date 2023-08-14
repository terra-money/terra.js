import { MsgSwap } from './MsgSwap';
export * from './MsgSwap';
import { MsgSwapSend } from './MsgSwapSend';
export * from './MsgSwapSend';
export declare type MarketMsg = MsgSwap | MsgSwapSend;
export declare namespace MarketMsg {
    type Amino = MsgSwap.Amino | MsgSwapSend.Amino;
    type Data = MsgSwap.Data | MsgSwapSend.Data;
    type Proto = MsgSwap.Proto | MsgSwapSend.Proto;
}
