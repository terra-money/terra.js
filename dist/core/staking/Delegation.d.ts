import { JSONSerializable } from '../../util/json';
import { Dec } from '../numeric';
import { AccAddress, ValAddress } from '../bech32';
import { Coin } from '../Coin';
import { DelegationResponse as DelegationResponse_pb } from '@terra-money/terra.proto/cosmos/staking/v1beta1/staking';
/**
 * Stores information about the status of a delegation between a delegator and validator, fetched from the blockchain.
 */
export declare class Delegation extends JSONSerializable<Delegation.Amino, Delegation.Data, Delegation.Proto> {
    delegator_address: AccAddress;
    validator_address: ValAddress;
    shares: Dec;
    balance: Coin;
    /**
     * @param delegator_address 	delegator's account address
     * @param validator_address 	validator's operator address
     * @param shares 	delegator's shares
     * @param balance balance of the delegation
     */
    constructor(delegator_address: AccAddress, validator_address: ValAddress, shares: Dec, balance: Coin);
    static fromAmino(data: Delegation.Amino): Delegation;
    toAmino(): Delegation.Amino;
    static fromData(data: Delegation.Data): Delegation;
    toData(): Delegation.Data;
    static fromProto(proto: Delegation.Proto): Delegation;
    toProto(): Delegation.Proto;
}
export declare namespace Delegation {
    interface Amino {
        delegation: {
            delegator_address: AccAddress;
            validator_address: ValAddress;
            shares: string;
        };
        balance: Coin.Amino;
    }
    interface Data {
        delegation: {
            delegator_address: AccAddress;
            validator_address: ValAddress;
            shares: string;
        };
        balance: Coin.Data;
    }
    type Proto = DelegationResponse_pb;
}
