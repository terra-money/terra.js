import { ValConsAddress } from './bech32';
import { ValConsPublicKey } from './PublicKey';

export interface ValidatorSet {
  block_height: string;
  validators: DelegateValidator[];
}

export interface DelegateValidator {
  address: ValConsAddress;
  pub_key: ValConsPublicKey.Data;
  proposer_priority: string;
  voting_power: string;
}
