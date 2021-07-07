import { ParamChange } from '../params/ParamChange';
import { Convert } from '../../util/convert';
import { Dec } from '../numeric';

type PoolRecoveryPeriod = ParamChange.Type<
  'market',
  'PoolRecoveryPeriod',
  number
>;

type MintBasePool = ParamChange.Type<'market', 'MintBasePool', Dec>;
type BurnBasePool = ParamChange.Type<'market', 'BurnBasePool', Dec>;

type MinStabilitySpread = ParamChange.Type<'market', 'MinStabilitySpread', Dec>;

export type MarketParamChange =
  | PoolRecoveryPeriod
  | MintBasePool
  | BurnBasePool
  | MinStabilitySpread;

export namespace MarketParamChange {
  export type Data =
    | ParamChange.Data.Type<PoolRecoveryPeriod>
    | ParamChange.Data.Type<MintBasePool>
    | ParamChange.Data.Type<BurnBasePool>
    | ParamChange.Data.Type<MinStabilitySpread>;
}

export interface MarketParamChanges {
  market?: {
    PoolRecoveryPeriod?: number;
    MintBasePool?: Dec;
    BurnBasePool?: Dec;
    MinStabilitySpread?: Dec;
  };
}

export namespace MarketParamChanges {
  export const ConversionTable = {
    market: {
      PoolRecoveryPeriod: [Convert.toNumber, Convert.toFixed],
      MintBasePool: [Convert.toDec, Convert.toString],
      BurnBasePool: [Convert.toDec, Convert.toString],
      MinStabilitySpread: [Convert.toDec, Convert.toString],
    },
  };
}
