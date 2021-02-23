import { ParamChange } from '..';
import { Dec } from '../numeric';
declare type CommunityTax = ParamChange.Type<'distribution', 'communitytax', Dec>;
declare type BaseProposerReward = ParamChange.Type<'distribution', 'baseproposerreward', Dec>;
declare type BonusProposerReward = ParamChange.Type<'distribution', 'bonusproposerreward', Dec>;
declare type WithdrawAddrEnabled = ParamChange.Type<'distribution', 'withdrawaddrenabled', boolean>;
export declare type DistributionParamChange = CommunityTax | BaseProposerReward | BonusProposerReward | WithdrawAddrEnabled;
export declare namespace DistributionParamChange {
    type Data = ParamChange.Data.Type<CommunityTax> | ParamChange.Data.Type<BaseProposerReward> | ParamChange.Data.Type<BonusProposerReward> | ParamChange.Data.Type<WithdrawAddrEnabled>;
}
export declare type DistributionParamChanges = {
    distribution?: {
        communitytax?: Dec;
        baseproposerreward?: Dec;
        bonusproposerreward?: Dec;
        withdrawaddrenabled?: boolean;
    };
};
export declare namespace DistributionParamChanges {
    const ConversionTable: {
        distribution: {
            communitytax: (((c: import("decimal.js").default.Value) => Dec) | ((c: any) => string))[];
            baseproposerreward: (((c: import("decimal.js").default.Value) => Dec) | ((c: any) => string))[];
            bonusproposerreward: (((c: import("decimal.js").default.Value) => Dec) | ((c: any) => string))[];
            withdrawaddrenabled: ((c: any) => any)[];
        };
    };
}
export {};
