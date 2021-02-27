import { JSONSerializable } from '../../util/json';
import { Dec, Int } from '../numeric';
import { ValAddress, ValConsPubKey } from '../strings';
/**
 * Stores information fetched from the blockchain about the current status of a validator.
 * As an end user, you will not have to create an instance of this class, one will be
 * generated for you to store information about a validator polled from the API functions
 * in [[StakingAPI]].
 */
export declare class Validator extends JSONSerializable<Validator.Data> {
    operator_address: ValAddress;
    consensus_pubkey: ValConsPubKey;
    jailed: boolean;
    status: number;
    tokens: Int;
    delegator_shares: Dec;
    description: Validator.Description;
    unbonding_height: number;
    unbonding_time: Date;
    commission: Validator.Commission;
    min_self_delegation: Int;
    /**
     *
     * @param operator_address validator's operator address
     * @param consensus_pubkey validator's consensus public key
     * @param jailed whether the current validator is jailed
     * @param status unbonded `0`, unbonding `1`, bonded `2`
     * @param tokens total Luna from all delegations (including self)
     * @param delegator_shares total shares of all delegators
     * @param description validator's delegate description
     * @param unbonding_height if unbonding, height at which this validator began unbonding
     * @param unbonding_time if unbonding, min time for the validator to complete unbonding
     * @param commission validator commission
     * @param min_self_delegation minimum self delegation
     */
    constructor(operator_address: ValAddress, consensus_pubkey: ValConsPubKey, jailed: boolean, status: number, tokens: Int, delegator_shares: Dec, description: Validator.Description, unbonding_height: number, unbonding_time: Date, commission: Validator.Commission, min_self_delegation: Int);
    toData(): Validator.Data;
    static fromData(data: Validator.Data): Validator;
}
export declare namespace Validator {
    interface Data {
        operator_address: ValAddress;
        consensus_pubkey: ValConsPubKey;
        jailed: boolean;
        status: number;
        tokens: string;
        delegator_shares: string;
        description: Description;
        unbonding_height: string;
        unbonding_time: string;
        commission: Commission.Data;
        min_self_delegation: string;
    }
    interface Description {
        /** Identifying name, e.g. "Hashed */
        moniker: string;
        /** identity from keybase.io */
        identity: string;
        /** validator's website */
        website: string;
        /** longer description */
        details: string;
    }
    class CommissionRates extends JSONSerializable<CommissionRates.Data> {
        rate: Dec;
        max_rate: Dec;
        max_change_rate: Dec;
        /**
         * @param rate current commission rate
         * @param max_rate max commission rate
         * @param max_change_rate max percentage commission can change in 24hrs
         */
        constructor(rate: Dec, max_rate: Dec, max_change_rate: Dec);
        static fromData(data: CommissionRates.Data): CommissionRates;
        toData(): Validator.CommissionRates.Data;
    }
    namespace CommissionRates {
        interface Data {
            rate: string;
            max_rate: string;
            max_change_rate: string;
        }
    }
    class Commission extends JSONSerializable<Commission.Data> {
        commission_rates: CommissionRates;
        update_time: Date;
        /**
         * @param commission_rates commission rates
         * @param update_time time at which commission was last updated
         */
        constructor(commission_rates: CommissionRates, update_time: Date);
        toData(): Commission.Data;
        static fromData(data: Commission.Data): Commission;
    }
    namespace Commission {
        interface Data {
            commission_rates: CommissionRates.Data;
            update_time: string;
        }
    }
}
