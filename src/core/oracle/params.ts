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

type VotePeriod = ParamChange.Type<'oracle', 'VotePeriod', number>;
type VoteThreshold = ParamChange.Type<'oracle', 'VoteThreshold', Dec>;
type RewardBand = ParamChange.Type<'oracle', 'RewardBand', Dec>;
type RewardDistributionWindow = ParamChange.Type<
  'oracle',
  'RewardDistributionWindow',
  number
>;

type Whitelist = ParamChange.Type<'oracle', 'Whitelist', OracleWhitelist>;
type SlashFraction = ParamChange.Type<'oracle', 'SlashFraction', Dec>;
type SlashWindow = ParamChange.Type<'oracle', 'SlashWindow', number>;
type MinValidPerWindow = ParamChange.Type<'oracle', 'MinValidPerWindow', Dec>;

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
    VotePeriod?: number;
    VoteThreshold?: Dec;
    RewardBand?: Dec;
    RewardDistributionWindow?: number;
    Whitelist?: OracleWhitelist;
    SlashFraction?: Dec;
    SlashWindow?: number;
    MinValidPerWindow?: Dec;
  };
}

export namespace OracleParamChanges {
  export const ConversionTable = {
    oracle: {
      VotePeriod: [Convert.toNumber, Convert.toFixed],
      VoteThreshold: [Convert.toDec, Convert.toString],
      RewardBand: [Convert.toDec, Convert.toString],
      RewardDistributionWindow: [Convert.toNumber, Convert.toFixed],
      Whitelist: [
        (c: OracleWhitelist.Data): OracleWhitelist =>
          c.map(v => ({
            name: v.name,
            tobin_tax: new Dec(v.tobin_tax),
          })),
        (c: OracleWhitelist): OracleWhitelist.Data =>
          c.map(v => ({
            name: v.name,
            tobin_tax: v.tobin_tax.toString(),
          })),
      ],
      SlashFraction: [Convert.toDec, Convert.toString],
      SlashWindow: [Convert.toNumber, Convert.toFixed],
      MinValidPerWindow: [Convert.toDec, Convert.toString],
    },
  };
}
