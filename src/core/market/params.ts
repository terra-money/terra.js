import { ParamChange } from '../params/ParamChange';
import { Convert } from '../../util/convert';
import { Dec } from '../numeric';

type PoolRecoveryPeriod = ParamChange.Type<
  'market',
  'poolrecoveryperiod',
  number
>;

type BasePool = ParamChange.Type<'market', 'basepool', Dec>;

type MinStabilitySpread = ParamChange.Type<'market', 'minstabilityspread', Dec>;

export type MarketParamChange =
  | PoolRecoveryPeriod
  | BasePool
  | MinStabilitySpread;

export namespace MarketParamChange {
  export type Data =
    | ParamChange.Data.Type<PoolRecoveryPeriod>
    | ParamChange.Data.Type<BasePool>
    | ParamChange.Data.Type<MinStabilitySpread>;
}

export interface MarketParamChanges {
  market?: {
    poolrecoveryperiod?: number;
    basepool?: Dec;
    minstabilityspread?: Dec;
  };
}

export namespace MarketParamChanges {
  export const ConversionTable = {
    market: {
      poolrecoveryperiod: [Convert.toNumber, Convert.toFixed],
      basepool: [Convert.toDec, Convert.toString],
      minstabilityspread: [Convert.toDec, Convert.toString],
    },
  };
}
