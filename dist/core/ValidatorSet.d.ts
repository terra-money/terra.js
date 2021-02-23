import { ValConsAddress, ValConsPubKey } from './strings';
export interface ValidatorSet {
    block_height: string;
    validators: DelegateValidator[];
}
export interface DelegateValidator {
    address: ValConsAddress;
    pub_key: ValConsPubKey;
    proposer_priority: string;
    voting_power: string;
}
