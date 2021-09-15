import { ParamChange } from '../params/ParamChange';
import { Convert } from '../../util/convert';
import { Dec } from '../numeric';

type CommunityTax = ParamChange.Type<'distribution', 'communitytax', Dec>;

type BaseProposerReward = ParamChange.Type<
  'distribution',
  'baseproposerreward',
  Dec
>;
type BonusProposerReward = ParamChange.Type<
  'distribution',
  'bonusproposerreward',
  Dec
>;

type WithdrawAddrEnabled = ParamChange.Type<
  'distribution',
  'withdrawaddrenabled',
  boolean
>;

export type DistributionParamChange =
  | CommunityTax
  | BaseProposerReward
  | BonusProposerReward
  | WithdrawAddrEnabled;

export namespace DistributionParamChange {
  export type Data =
    | ParamChange.Data.Type<CommunityTax>
    | ParamChange.Data.Type<BaseProposerReward>
    | ParamChange.Data.Type<BonusProposerReward>
    | ParamChange.Data.Type<WithdrawAddrEnabled>;
}

export type DistributionParamChanges = {
  distribution?: {
    communitytax?: string;
    baseproposerreward?: string;
    bonusproposerreward?: string;
    withdrawaddrenabled?: boolean;
  };
};
