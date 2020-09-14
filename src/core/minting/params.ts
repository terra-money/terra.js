import { Denom } from '../Denom';
import { ParamChange } from '../params/ParamChange';
import { Convert } from '../../util/convert';
import { Dec } from '../numeric';

type MintDenom = ParamChange.Type<'minting', 'MintDenom', Denom>;
type InflationRateChange = ParamChange.Type<
  'minting',
  'InflationRateChange',
  Dec
>;
type InflationMax = ParamChange.Type<'minting', 'InflationMax', Dec>;
type InflationMin = ParamChange.Type<'minting', 'InflationMin', Dec>;
type GoalBonded = ParamChange.Type<'minting', 'GoalBonded', Dec>;
type BlocksPerYear = ParamChange.Type<'minting', 'BlocksPerYear', number>;

export type MintingParamChange =
  | MintDenom
  | InflationRateChange
  | InflationMax
  | InflationMin
  | GoalBonded
  | BlocksPerYear;

export namespace MintingParamChange {
  export type Data =
    | ParamChange.Data.Type<MintDenom>
    | ParamChange.Data.Type<InflationRateChange>
    | ParamChange.Data.Type<InflationMax>
    | ParamChange.Data.Type<InflationMin>
    | ParamChange.Data.Type<GoalBonded>
    | ParamChange.Data.Type<BlocksPerYear>;
}

export interface MintingParamChanges {
  minting?: {
    MintDenom?: Denom;
    InflationRateChange?: Dec;
    InflationMax?: Dec;
    InflationMin?: Dec;
    GoalBonded?: Dec;
    BlocksPerYear?: number;
  };
}

export namespace MintingParamChanges {
  export const ConversionTable = {
    minting: {
      MintDenom: [Convert.id, Convert.id],
      InflationRateChange: [Convert.toDec, Convert.toString],
      InflationMax: [Convert.toDec, Convert.toString],
      InflationMin: [Convert.toDec, Convert.toString],
      GoalBonded: [Convert.toDec, Convert.toString],
      BlocksPerYear: [Convert.toNumber, Convert.toFixed],
    },
  };
}
