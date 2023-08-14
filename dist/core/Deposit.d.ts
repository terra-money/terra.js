import { Coins } from './Coins';
import { JSONSerializable } from '../util/json';
import { AccAddress } from './bech32';
import { Deposit as Deposit_pb } from '@terra-money/terra.proto/cosmos/gov/v1beta1/gov';
/**
 * Stores deposit information for a proposal
 */
export declare class Deposit extends JSONSerializable<Deposit.Amino, Deposit.Data, Deposit.Proto> {
    proposal_id: number;
    depositor: AccAddress;
    amount: Coins;
    /**
     * @param proposal_id Id of porposal to deposit to
     * @param depositor depositor's account address
     * @param amount amount to deposit
     */
    constructor(proposal_id: number, depositor: AccAddress, amount: Coins.Input);
    static fromAmino(data: Deposit.Amino): Deposit;
    toAmino(): Deposit.Amino;
    static fromData(data: Deposit.Data): Deposit;
    toData(): Deposit.Data;
    static fromProto(data: Deposit.Proto): Deposit;
    toProto(): Deposit.Proto;
}
export declare namespace Deposit {
    interface Amino {
        proposal_id: string;
        depositor: AccAddress;
        amount: Coins.Amino;
    }
    interface Data {
        proposal_id: string;
        depositor: AccAddress;
        amount: Coins.Data;
    }
    type Proto = Deposit_pb;
}
