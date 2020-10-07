import { Denom } from '../Denom';
import { ParamChange } from '..';
import { Convert } from '../../util/convert';
import { Dec } from '../numeric';

type PoolRecoveryPeriod = ParamChange.Type<
  'market',
  'poolrecoveryperiod',
  number
>;

type BasePool = ParamChange.Type<'market', 'basepool', Dec>;

type MinSpread = ParamChange.Type<'market', 'minspread', Dec>;

export type MarketParamChange = PoolRecoveryPeriod | BasePool | MinSpread;

export namespace MarketParamChange {
  export type Data =
    | ParamChange.Data.Type<PoolRecoveryPeriod>
    | ParamChange.Data.Type<BasePool>
    | ParamChange.Data.Type<MinSpread>;
}

export interface MarketParamChanges {
  market?: {
    poolrecoveryperiod?: number;
    basepool?: Dec;
    minspread?: Dec;
  };
}

export namespace MarketParamChanges {
  export const ConversionTable = {
    market: {
      poolrecoveryperiod: [Convert.toNumber, Convert.toFixed],
      basepool: [Convert.toDec, Convert.toString],
      minspread: [Convert.toDec, Convert.toString],
    },
  };
}
