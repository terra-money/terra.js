import { Denom } from '../Denom';
import { ParamChange } from '../params/ParamChange';
declare type UnbondingTime = ParamChange.Type<'staking', 'UnbondingTime', number>;
declare type MaxValidators = ParamChange.Type<'staking', 'MaxValidators', number>;
declare type MaxEntries = ParamChange.Type<'staking', 'KeyMaxEntries', // lol wtf
number>;
declare type BondDenom = ParamChange.Type<'staking', 'BondDenom', Denom>;
export declare type StakingParamChange = UnbondingTime | MaxValidators | MaxEntries | BondDenom;
export declare namespace StakingParamChange {
    type Data = ParamChange.Data.Type<UnbondingTime> | ParamChange.Data.Type<MaxValidators> | ParamChange.Data.Type<MaxEntries> | ParamChange.Data.Type<BondDenom>;
}
export interface StakingParamChanges {
    staking?: {
        UnbondingTime?: number;
        MaxValidators?: number;
        KeyMaxEntries?: number;
        BondDenom?: Denom;
    };
}
export declare namespace StakingParamChanges {
    const ConversionTable: {
        staking: {
            UnbondingTime: (((string: string, radix?: number | undefined) => number) | ((c: number) => string))[];
            MaxValidators: ((string: string, radix?: number | undefined) => number)[];
            KeyMaxEntries: ((string: string, radix?: number | undefined) => number)[];
            BondDenom: ((c: any) => any)[];
        };
    };
}
export {};
