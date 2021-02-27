import { MsgDelegate } from './MsgDelegate';
import { MsgUndelegate } from './MsgUndelegate';
import { MsgBeginRedelegate } from './MsgBeginRedelegate';
import { MsgCreateValidator } from './MsgCreateValidator';
import { MsgEditValidator } from './MsgEditValidator';
export * from './MsgDelegate';
export * from './MsgUndelegate';
export * from './MsgBeginRedelegate';
export * from './MsgCreateValidator';
export * from './MsgEditValidator';
export declare type StakingMsg = MsgDelegate | MsgUndelegate | MsgBeginRedelegate | MsgCreateValidator | MsgEditValidator;
export declare namespace StakingMsg {
    type Data = MsgDelegate.Data | MsgUndelegate.Data | MsgBeginRedelegate.Data | MsgCreateValidator.Data | MsgEditValidator.Data;
}
