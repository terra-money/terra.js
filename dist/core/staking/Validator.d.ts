import { JSONSerializable } from '../../util/json';
import { Dec, Int } from '../numeric';
import { ValAddress } from '../bech32';
import { ValConsPublicKey } from '../PublicKey';
import { Validator as Validator_pb, Description as Description_pb, Commission as Commission_pb, CommissionRates as CommissionRates_pb, BondStatus } from '@terra-money/terra.proto/cosmos/staking/v1beta1/staking';
/**
 * Stores information fetched from the blockchain about the current status of a validator.
 * As an end user, you will not have to create an instance of this class, one will be
 * generated for you to store information about a validator polled from the API functions
 * in [[StakingAPI]].
 */
export declare class Validator extends JSONSerializable<Validator.Amino, Validator.Data, Validator.Proto> {
    operator_address: ValAddress;
    consensus_pubkey: ValConsPublicKey;
    jailed: boolean;
    status: BondStatus;
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
    constructor(operator_address: ValAddress, consensus_pubkey: ValConsPublicKey, jailed: boolean, status: BondStatus, tokens: Int, delegator_shares: Dec, description: Validator.Description, unbonding_height: number, unbonding_time: Date, commission: Validator.Commission, min_self_delegation: Int);
    toAmino(): Validator.Amino;
    static fromAmino(data: Validator.Amino): Validator;
    toData(): Validator.Data;
    static fromData(data: Validator.Data): Validator;
    toProto(): Validator.Proto;
    static fromProto(data: Validator.Proto): Validator;
}
export declare namespace Validator {
    const Status: typeof BondStatus;
    type Status = BondStatus;
    interface Amino {
        operator_address: ValAddress;
        consensus_pubkey: ValConsPublicKey.Amino;
        jailed: boolean;
        status: BondStatus;
        tokens: string;
        delegator_shares: string;
        description: Description.Amino;
        unbonding_height: string;
        unbonding_time: string;
        commission: Commission.Amino;
        min_self_delegation: string;
    }
    interface Data {
        operator_address: ValAddress;
        consensus_pubkey: ValConsPublicKey.Data;
        jailed: boolean;
        status: BondStatus;
        tokens: string;
        delegator_shares: string;
        description: Description.Data;
        unbonding_height: string;
        unbonding_time: string;
        commission: Commission.Data;
        min_self_delegation: string;
    }
    type Proto = Validator_pb;
    class Description extends JSONSerializable<Description.Amino, Description.Data, Description.Proto> {
        moniker: string;
        identity: string;
        website: string;
        details: string;
        security_contact: string;
        /**
         * @param moniker Identifying name, e.g. "Hashed"
         * @param identity time at which commission was last updated
         * @param website validator's website
         * @param details long description
         * @param security_contact validator's contact
         */
        constructor(moniker: string, identity: string, website: string, details: string, security_contact: string);
        toAmino(): Description.Amino;
        static fromAmino(data: Description.Amino): Description;
        toData(): Description.Data;
        static fromData(data: Description.Data): Description;
        toProto(): Description.Proto;
        static fromProto(proto: Description.Proto): Description;
    }
    namespace Description {
        interface Amino {
            moniker: string;
            identity: string;
            website: string;
            details: string;
            security_contact: string;
        }
        interface Data {
            moniker: string;
            identity: string;
            website: string;
            details: string;
            security_contact: string;
        }
        type Proto = Description_pb;
    }
    class CommissionRates extends JSONSerializable<CommissionRates.Amino, CommissionRates.Data, CommissionRates.Proto> {
        rate: Dec;
        max_rate: Dec;
        max_change_rate: Dec;
        /**
         * @param rate current commission rate
         * @param max_rate max commission rate
         * @param max_change_rate max percentage commission can change in 24hrs
         */
        constructor(rate: Dec, max_rate: Dec, max_change_rate: Dec);
        static fromAmino(data: CommissionRates.Amino): CommissionRates;
        toAmino(): Validator.CommissionRates.Amino;
        static fromData(data: CommissionRates.Data): CommissionRates;
        toData(): Validator.CommissionRates.Data;
        static fromProto(proto: CommissionRates.Proto): CommissionRates;
        toProto(): Validator.CommissionRates.Proto;
    }
    namespace CommissionRates {
        interface Amino {
            rate: string;
            max_rate: string;
            max_change_rate: string;
        }
        interface Data {
            rate: string;
            max_rate: string;
            max_change_rate: string;
        }
        type Proto = CommissionRates_pb;
    }
    class Commission extends JSONSerializable<Commission.Amino, Commission.Data, Commission.Proto> {
        commission_rates: CommissionRates;
        update_time: Date;
        /**
         * @param commission_rates commission rates
         * @param update_time time at which commission was last updated
         */
        constructor(commission_rates: CommissionRates, update_time: Date);
        toAmino(): Commission.Amino;
        static fromAmino(data: Commission.Amino): Commission;
        toData(): Commission.Data;
        static fromData(data: Commission.Data): Commission;
        toProto(): Commission.Proto;
        static fromProto(proto: Commission.Proto): Commission;
    }
    namespace Commission {
        interface Amino {
            commission_rates: CommissionRates.Amino;
            update_time: string;
        }
        interface Data {
            commission_rates: CommissionRates.Data;
            update_time: string;
        }
        type Proto = Commission_pb;
    }
}
