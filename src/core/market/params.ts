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

export interface TaxRate {
  denom: Denom;
  tax_rate: Dec;
}

export namespace TaxRate {
  export interface Data {
    denom: Denom;
    tax_rate: string;
  }
}

type IlliquidTobinTaxList = ParamChange.Type<
  'market',
  'illiquidtobintaxlist',
  TaxRate[]
>;

export type MarketParamChange =
  | PoolRecoveryPeriod
  | BasePool
  | MinSpread
  | IlliquidTobinTaxList;

export namespace MarketParamChange {
  export type Data =
    | ParamChange.Data.Type<PoolRecoveryPeriod>
    | ParamChange.Data.Type<BasePool>
    | ParamChange.Data.Type<MinSpread>
    | ParamChange.Data.Type<IlliquidTobinTaxList>;
}

export interface MarketParamChanges {
  market?: {
    poolrecoveryperiod?: number;
    basepool?: Dec;
    minspread?: Dec;
    illiquidtobintaxlist?: TaxRate[];
  };
}

export namespace MarketParamChanges {
  export const ConversionTable = {
    market: {
      poolrecoveryperiod: [Convert.toNumber, Convert.toFixed],
      basepool: [Convert.toDec, Convert.toString],
      minspread: [Convert.toDec, Convert.toString],
      illiquidtobintaxlist: [
        Convert.toTaxRateArray,
        Convert.serializeTaxRateArray,
      ],
    },
  };
}
