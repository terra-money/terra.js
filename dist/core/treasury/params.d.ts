import { ParamChange } from '../params/ParamChange';
import { PolicyConstraints } from './PolicyConstraints';
import { Dec } from '../numeric';
export declare type TaxPolicy = ParamChange.Type<'treasury', 'taxpolicy', PolicyConstraints>;
export declare type RewardPolicy = ParamChange.Type<'treasury', 'rewardpolicy', PolicyConstraints>;
export declare type SeigniorageBurdenTarget = ParamChange.Type<'treasury', 'seigniorageburdentarget', Dec>;
export declare type MiningIncrement = ParamChange.Type<'treasury', 'miningincrement', Dec>;
export declare type WindowShort = ParamChange.Type<'treasury', 'windowshort', number>;
export declare type WindowLong = ParamChange.Type<'treasury', 'windowlong', number>;
export declare type WindowProbation = ParamChange.Type<'treasury', 'windowprobation', number>;
export declare type TreasuryParamChange = TaxPolicy | RewardPolicy | SeigniorageBurdenTarget | MiningIncrement | WindowShort | WindowLong | WindowProbation;
export declare namespace TreasuryParamChange {
    type Data = ParamChange.Data.Type<TaxPolicy> | ParamChange.Data.Type<RewardPolicy> | ParamChange.Data.Type<SeigniorageBurdenTarget> | ParamChange.Data.Type<MiningIncrement> | ParamChange.Data.Type<WindowShort> | ParamChange.Data.Type<WindowLong> | ParamChange.Data.Type<WindowProbation>;
}
export interface TreasuryParamChanges {
    treasury?: {
        taxpolicy?: PolicyConstraints;
        rewardpolicy?: PolicyConstraints;
        seigniorageburdentarget?: Dec;
        miningincrement?: Dec;
        windowshort?: number;
        windowlong?: number;
        windowprobation?: number;
    };
}
export declare namespace TreasuryParamChanges {
    const ConversionTable: {
        treasury: {
            taxpolicy: (typeof PolicyConstraints.fromData | ((c: import("../../util/json").JSONSerializable<any>) => any))[];
            rewardpolicy: (typeof PolicyConstraints.fromData | ((c: import("../../util/json").JSONSerializable<any>) => any))[];
            seigniorageburdentarget: (((c: import("decimal.js").default.Value) => Dec) | ((c: any) => string))[];
            miningincrement: (((c: import("decimal.js").default.Value) => Dec) | ((c: any) => string))[];
            windowshort: (((string: string, radix?: number | undefined) => number) | ((c: number) => string))[];
            windowlong: (((string: string, radix?: number | undefined) => number) | ((c: number) => string))[];
            windowprobation: (((string: string, radix?: number | undefined) => number) | ((c: number) => string))[];
        };
    };
}
