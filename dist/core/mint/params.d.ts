import { Denom } from '../Denom';
import { ParamChange } from '../params/ParamChange';
import { Dec } from '../numeric';
declare type MintDenom = ParamChange.Type<'mint', 'MintDenom', Denom>;
declare type InflationRateChange = ParamChange.Type<'mint', 'InflationRateChange', Dec>;
declare type InflationMax = ParamChange.Type<'mint', 'InflationMax', Dec>;
declare type InflationMin = ParamChange.Type<'mint', 'InflationMin', Dec>;
declare type GoalBonded = ParamChange.Type<'mint', 'GoalBonded', Dec>;
declare type BlocksPerYear = ParamChange.Type<'mint', 'BlocksPerYear', number>;
export declare type MintParamChange = MintDenom | InflationRateChange | InflationMax | InflationMin | GoalBonded | BlocksPerYear;
export declare namespace MintParamChange {
    type Data = ParamChange.Data.Type<MintDenom> | ParamChange.Data.Type<InflationRateChange> | ParamChange.Data.Type<InflationMax> | ParamChange.Data.Type<InflationMin> | ParamChange.Data.Type<GoalBonded> | ParamChange.Data.Type<BlocksPerYear>;
}
export interface MintParamChanges {
    mint?: {
        MintDenom?: Denom;
        InflationRateChange?: Dec;
        InflationMax?: Dec;
        InflationMin?: Dec;
        GoalBonded?: Dec;
        BlocksPerYear?: number;
    };
}
export declare namespace MintParamChanges {
    const ConversionTable: {
        mint: {
            MintDenom: ((c: any) => any)[];
            InflationRateChange: (((c: import("decimal.js").default.Value) => Dec) | ((c: any) => string))[];
            InflationMax: (((c: import("decimal.js").default.Value) => Dec) | ((c: any) => string))[];
            InflationMin: (((c: import("decimal.js").default.Value) => Dec) | ((c: any) => string))[];
            GoalBonded: (((c: import("decimal.js").default.Value) => Dec) | ((c: any) => string))[];
            BlocksPerYear: (((string: string, radix?: number | undefined) => number) | ((c: number) => string))[];
        };
    };
}
export {};
