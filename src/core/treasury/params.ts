import { ParamChange } from '../params/ParamChange';
import { PolicyConstraints } from './PolicyConstraints';
import { Convert } from '../../util/convert';
import { Dec } from '../numeric';

export type TaxPolicy = ParamChange.Type<
  'treasury',
  'TaxPolicy',
  PolicyConstraints
>;
export type RewardPolicy = ParamChange.Type<
  'treasury',
  'RewardPolicy',
  PolicyConstraints
>;
export type SeigniorageBurdenTarget = ParamChange.Type<
  'treasury',
  'SeigniorageBurdenTarget',
  Dec
>;
export type MiningIncrement = ParamChange.Type<
  'treasury',
  'MiningIncrement',
  Dec
>;
export type WindowShort = ParamChange.Type<'treasury', 'WindowShort', number>;
export type WindowLong = ParamChange.Type<'treasury', 'WindowLong', number>;
export type WindowProbation = ParamChange.Type<
  'treasury',
  'WindowProbation',
  number
>;

export type TreasuryParamChange =
  | TaxPolicy
  | RewardPolicy
  | SeigniorageBurdenTarget
  | MiningIncrement
  | WindowShort
  | WindowLong
  | WindowProbation;

export namespace TreasuryParamChange {
  export type Data =
    | ParamChange.Data.Type<TaxPolicy>
    | ParamChange.Data.Type<RewardPolicy>
    | ParamChange.Data.Type<SeigniorageBurdenTarget>
    | ParamChange.Data.Type<MiningIncrement>
    | ParamChange.Data.Type<WindowShort>
    | ParamChange.Data.Type<WindowLong>
    | ParamChange.Data.Type<WindowProbation>;
}

export interface TreasuryParamChanges {
  treasury?: {
    TaxPolicy?: PolicyConstraints;
    RewardPolicy?: PolicyConstraints;
    SeigniorageBurdenTarget?: Dec;
    MiningIncrement?: Dec;
    WindowShort?: number;
    WindowLong?: number;
    WindowProbation?: number;
  };
}
