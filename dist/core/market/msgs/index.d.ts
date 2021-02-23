import { MsgSwap } from './MsgSwap';
export * from './MsgSwap';
import { MsgSwapSend } from './MsgSwapSend';
export * from './MsgSwapSend';
export declare type MarketMsg = MsgSwap | MsgSwapSend;
export declare namespace MarketMsg {
    type Data = MsgSwap.Data | MsgSwapSend.Data;
}
