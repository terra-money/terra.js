import { ParamChange } from '../params/ParamChange';
import { PolicyConstraints } from './PolicyConstraints';
import { Convert } from '../../util/convert';
import { Dec } from '../numeric';

export type TaxPolicy = ParamChange.Type<
  'treasury',
  'taxpolicy',
  PolicyConstraints
>;
export type RewardPolicy = ParamChange.Type<
  'treasury',
  'rewardpolicy',
  PolicyConstraints
>;
export type SeigniorageBurdenTarget = ParamChange.Type<
  'treasury',
  'seigniorageburdentarget',
  Dec
>;
export type MiningIncrement = ParamChange.Type<
  'treasury',
  'miningincrement',
  Dec
>;
export type WindowShort = ParamChange.Type<'treasury', 'windowshort', number>;
export type WindowLong = ParamChange.Type<'treasury', 'windowlong', number>;
export type WindowProbation = ParamChange.Type<
  'treasury',
  'windowprobation',
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
    taxpolicy?: PolicyConstraints;
    rewardpolicy?: PolicyConstraints;
    seigniorageburdentarget?: Dec;
    miningincrement?: Dec;
    windowshort?: number;
    windowlong?: number;
    windowprobation?: number;
  };
}

export namespace TreasuryParamChanges {
  export const ConversionTable = {
    treasury: {
      taxpolicy: [PolicyConstraints.fromData, Convert.toData],
      rewardpolicy: [PolicyConstraints.fromData, Convert.toData],
      seigniorageburdentarget: [Convert.toDec, Convert.toString],
      miningincrement: [Convert.toDec, Convert.toString],
      windowshort: [Convert.toNumber, Convert.toFixed],
      windowlong: [Convert.toNumber, Convert.toFixed],
      windowprobation: [Convert.toNumber, Convert.toFixed],
    },
  };
}
