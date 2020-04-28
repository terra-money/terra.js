import { ParamChange } from '..';
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
    communitytax?: Dec;
    baseproposerreward?: Dec;
    bonusproposerreward?: Dec;
    withdrawaddrenabled?: boolean;
  };
};

export namespace DistributionParamChanges {
  export const ConversionTable = {
    distribution: {
      communitytax: [Convert.toDec, Convert.toString],
      baseproposerreward: [Convert.toDec, Convert.toString],
      bonusproposerreward: [Convert.toDec, Convert.toString],
      withdrawaddrenabled: [Convert.id, Convert.id],
    },
  };
}
