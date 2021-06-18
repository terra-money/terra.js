import { ValConsAddress, ValConsPubKey } from './bech32';

export interface ValidatorSet {
  block_height: string;
  validators: DelegateValidator[];
}

export interface DelegateValidator {
  address: ValConsAddress;
  pub_key: ValConsPubKey.Data;
  proposer_priority: string;
  voting_power: string;
}
