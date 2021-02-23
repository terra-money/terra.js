import { Denom } from '../Denom';
import { ParamChange } from '../params/ParamChange';
import { Dec } from '../numeric';
export declare type OracleWhitelist = {
    name: Denom;
    tobin_tax: Dec;
}[];
export declare namespace OracleWhitelist {
    type Data = {
        name: Denom;
        tobin_tax: string;
    }[];
}
declare type VotePeriod = ParamChange.Type<'oracle', 'voteperiod', number>;
declare type VoteThreshold = ParamChange.Type<'oracle', 'votethreshold', Dec>;
declare type RewardBand = ParamChange.Type<'oracle', 'rewardband', Dec>;
declare type RewardDistributionWindow = ParamChange.Type<'oracle', 'rewarddistributionwindow', number>;
declare type Whitelist = ParamChange.Type<'oracle', 'whitelist', OracleWhitelist>;
declare type SlashFraction = ParamChange.Type<'oracle', 'slashfraction', Dec>;
declare type SlashWindow = ParamChange.Type<'oracle', 'slashwindow', number>;
declare type MinValidPerWindow = ParamChange.Type<'oracle', 'minvalidperwindow', Dec>;
export declare type OracleParamChange = VotePeriod | VoteThreshold | RewardBand | RewardDistributionWindow | Whitelist | SlashFraction | SlashWindow | MinValidPerWindow;
export declare namespace OracleParamChange {
    type Data = ParamChange.Data.Type<VotePeriod> | ParamChange.Data.Type<VoteThreshold> | ParamChange.Data.Type<RewardBand> | ParamChange.Data.Type<RewardDistributionWindow> | ParamChange.Data.Type<Whitelist> | ParamChange.Data.Type<SlashFraction> | ParamChange.Data.Type<SlashWindow> | ParamChange.Data.Type<MinValidPerWindow>;
}
export interface OracleParamChanges {
    oracle?: {
        voteperiod?: number;
        votethreshold?: Dec;
        rewardband?: Dec;
        rewarddistributionwindow?: number;
        whitelist?: OracleWhitelist;
        slashfraction?: Dec;
        slashwindow?: number;
        minvalidperwindow?: Dec;
    };
}
export declare namespace OracleParamChanges {
    const ConversionTable: {
        oracle: {
            voteperiod: (((string: string, radix?: number | undefined) => number) | ((c: number) => string))[];
            votethreshold: (((c: import("decimal.js").default.Value) => Dec) | ((c: any) => string))[];
            rewardband: (((c: import("decimal.js").default.Value) => Dec) | ((c: any) => string))[];
            rewarddistributionwindow: (((string: string, radix?: number | undefined) => number) | ((c: number) => string))[];
            whitelist: (((c: OracleWhitelist.Data) => OracleWhitelist) | ((c: OracleWhitelist) => OracleWhitelist.Data))[];
            slashfraction: (((c: import("decimal.js").default.Value) => Dec) | ((c: any) => string))[];
            slashwindow: (((string: string, radix?: number | undefined) => number) | ((c: number) => string))[];
            minvalidperwindow: (((c: import("decimal.js").default.Value) => Dec) | ((c: any) => string))[];
        };
    };
}
export {};
