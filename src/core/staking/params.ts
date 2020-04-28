import { Denom } from '../Denom';
import { ParamChange } from '../params/ParamChange';
import { Convert } from '../../util/convert';

type UnbondingTime = ParamChange.Type<'staking', 'UnbondingTime', number>;

type MaxValidators = ParamChange.Type<'staking', 'MaxValidators', number>;

type MaxEntries = ParamChange.Type<
  'staking',
  'KeyMaxEntries', // lol wtf
  number
>;

type BondDenom = ParamChange.Type<'staking', 'BondDenom', Denom>;

export type StakingParamChange =
  | UnbondingTime
  | MaxValidators
  | MaxEntries
  | BondDenom;

export namespace StakingParamChange {
  export type Data =
    | ParamChange.Data.Type<UnbondingTime>
    | ParamChange.Data.Type<MaxValidators>
    | ParamChange.Data.Type<MaxEntries>
    | ParamChange.Data.Type<BondDenom>;
}

export interface StakingParamChanges {
  staking?: {
    UnbondingTime?: number;
    MaxValidators?: number;
    KeyMaxEntries?: number;
    BondDenom?: Denom;
  };
}

export namespace StakingParamChanges {
  export const ConversionTable = {
    staking: {
      UnbondingTime: [Convert.toNumber, Convert.toFixed],
      MaxValidators: [Convert.toNumber, Convert.toNumber],
      KeyMaxEntries: [Convert.toNumber, Convert.toNumber],
      BondDenom: [Convert.id, Convert.id],
    },
  };
}
