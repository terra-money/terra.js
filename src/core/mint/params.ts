import { Denom } from '../Denom';
import { ParamChange } from '../params/ParamChange';
import { Convert } from '../../util/convert';
import { Dec } from '../numeric';

type MintDenom = ParamChange.Type<'mint', 'MintDenom', Denom>;
type InflationRateChange = ParamChange.Type<'mint', 'InflationRateChange', Dec>;
type InflationMax = ParamChange.Type<'mint', 'InflationMax', Dec>;
type InflationMin = ParamChange.Type<'mint', 'InflationMin', Dec>;
type GoalBonded = ParamChange.Type<'mint', 'GoalBonded', Dec>;
type BlocksPerYear = ParamChange.Type<'mint', 'BlocksPerYear', number>;

export type MintParamChange =
  | MintDenom
  | InflationRateChange
  | InflationMax
  | InflationMin
  | GoalBonded
  | BlocksPerYear;

export namespace MintParamChange {
  export type Data =
    | ParamChange.Data.Type<MintDenom>
    | ParamChange.Data.Type<InflationRateChange>
    | ParamChange.Data.Type<InflationMax>
    | ParamChange.Data.Type<InflationMin>
    | ParamChange.Data.Type<GoalBonded>
    | ParamChange.Data.Type<BlocksPerYear>;
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

export namespace MintParamChanges {
  export const ConversionTable = {
    mint: {
      MintDenom: [Convert.id, Convert.id],
      InflationRateChange: [Convert.toDec, Convert.toString],
      InflationMax: [Convert.toDec, Convert.toString],
      InflationMin: [Convert.toDec, Convert.toString],
      GoalBonded: [Convert.toDec, Convert.toString],
      BlocksPerYear: [Convert.toNumber, Convert.toFixed],
    },
  };
}
