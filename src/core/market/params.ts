import { ParamChange } from '../params/ParamChange';
import { Convert } from '../../util/convert';
import { Dec } from '../numeric';

type PoolRecoveryPeriod = ParamChange.Type<
  'market',
  'PoolRecoveryPeriod',
  number
>;

type BasePool = ParamChange.Type<'market', 'BasePool', Dec>;

type MinStabilitySpread = ParamChange.Type<'market', 'MinStabilitySpread', Dec>;

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
    PoolRecoveryPeriod?: number;
    BasePool?: Dec;
    MinStabilitySpread?: Dec;
  };
}
