import { Denom } from '../Denom';
import { ParamChange } from '../params/ParamChange';
import { Convert } from '../../util/convert';
import { Dec } from '../numeric';
export type OracleWhitelist = {
  name: Denom;
  tobin_tax: Dec;
}[];

export namespace OracleWhitelist {
  export type Data = {
    name: Denom;
    tobin_tax: string;
  }[];
}

type VotePeriod = ParamChange.Type<'oracle', 'voteperiod', number>;
type VoteThreshold = ParamChange.Type<'oracle', 'votethreshold', Dec>;
type RewardBand = ParamChange.Type<'oracle', 'rewardband', Dec>;
type RewardDistributionWindow = ParamChange.Type<
  'oracle',
  'rewarddistributionwindow',
  number
>;

type Whitelist = ParamChange.Type<'oracle', 'whitelist', OracleWhitelist>;
type SlashFraction = ParamChange.Type<'oracle', 'slashfraction', Dec>;
type SlashWindow = ParamChange.Type<'oracle', 'slashwindow', number>;
type MinValidPerWindow = ParamChange.Type<'oracle', 'minvalidperwindow', Dec>;

export type OracleParamChange =
  | VotePeriod
  | VoteThreshold
  | RewardBand
  | RewardDistributionWindow
  | Whitelist
  | SlashFraction
  | SlashWindow
  | MinValidPerWindow;

export namespace OracleParamChange {
  export type Data =
    | ParamChange.Data.Type<VotePeriod>
    | ParamChange.Data.Type<VoteThreshold>
    | ParamChange.Data.Type<RewardBand>
    | ParamChange.Data.Type<RewardDistributionWindow>
    | ParamChange.Data.Type<Whitelist>
    | ParamChange.Data.Type<SlashFraction>
    | ParamChange.Data.Type<SlashWindow>
    | ParamChange.Data.Type<MinValidPerWindow>;
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

export namespace OracleParamChanges {
  export const ConversionTable = {
    oracle: {
      voteperiod: [Convert.toNumber, Convert.toFixed],
      votethreshold: [Convert.toDec, Convert.toString],
      rewardband: [Convert.toDec, Convert.toString],
      rewarddistributionwindow: [Convert.toNumber, Convert.toFixed],
      whitelist: [Convert.toOracleWhitelist, Convert.serializeOracleWhitelist],
      slashfraction: [Convert.toDec, Convert.toString],
      slashwindow: [Convert.toNumber, Convert.toFixed],
      minvalidperwindow: [Convert.toDec, Convert.toString],
    },
  };
}
