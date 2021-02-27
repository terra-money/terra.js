import { ParamChange } from '..';
import { Dec } from '../numeric';
declare type PoolRecoveryPeriod = ParamChange.Type<'market', 'poolrecoveryperiod', number>;
declare type BasePool = ParamChange.Type<'market', 'basepool', Dec>;
declare type MinStabilitySpread = ParamChange.Type<'market', 'minstabilityspread', Dec>;
export declare type MarketParamChange = PoolRecoveryPeriod | BasePool | MinStabilitySpread;
export declare namespace MarketParamChange {
    type Data = ParamChange.Data.Type<PoolRecoveryPeriod> | ParamChange.Data.Type<BasePool> | ParamChange.Data.Type<MinStabilitySpread>;
}
export interface MarketParamChanges {
    market?: {
        poolrecoveryperiod?: number;
        basepool?: Dec;
        minstabilityspread?: Dec;
    };
}
export declare namespace MarketParamChanges {
    const ConversionTable: {
        market: {
            poolrecoveryperiod: (((string: string, radix?: number | undefined) => number) | ((c: number) => string))[];
            basepool: (((c: import("decimal.js").default.Value) => Dec) | ((c: any) => string))[];
            minstabilityspread: (((c: import("decimal.js").default.Value) => Dec) | ((c: any) => string))[];
        };
    };
}
export {};
