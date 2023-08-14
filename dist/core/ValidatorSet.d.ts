import { ValConsAddress } from './bech32';
import { ValConsPublicKey } from './PublicKey';
export interface ValidatorSet {
    validators: DelegateValidator[];
}
export interface DelegateValidator {
    address: ValConsAddress;
    pub_key: ValConsPublicKey.Data;
    proposer_priority: string;
    voting_power: string;
}
