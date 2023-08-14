import { LCDClient } from './LCDClient';
import { Coin } from '../../core/Coin';
import { Validator } from '../../core/staking/Validator';
interface ValidatorWithVotingPower {
    validatorInfo: Validator;
    votingPower: number;
    proposerPriority: number;
}
export declare class LCDUtils {
    lcd: LCDClient;
    constructor(lcd: LCDClient);
    /**
     * Calculates the tax that would be applied for the Coin if sent.
     * Tax = min(taxCap, taxRate * amount)
     * @param coin
     */
    calculateTax(coin: Coin): Promise<Coin>;
    /**
     * Gets current validators and merges their voting power from the validator set query.
     */
    validatorsWithVotingPower(): Promise<{
        [validatorAddress: string]: ValidatorWithVotingPower;
    }>;
}
export {};
