import { Coins } from '../../Coins';
import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgDeposit as MsgDeposit_pb } from '@terra-money/terra.proto/cosmos/gov/v1beta1/tx';
/**
 * Add a deposit for a proposal
 */
export declare class MsgDeposit extends JSONSerializable<MsgDeposit.Amino, MsgDeposit.Data, MsgDeposit.Proto> {
    proposal_id: number;
    depositor: AccAddress;
    amount: Coins;
    /**
     * @param proposal_id Id of porposal to deposit to
     * @param depositor depositor's account address
     * @param amount amount to deposit
     */
    constructor(proposal_id: number, depositor: AccAddress, amount: Coins.Input);
    static fromAmino(data: MsgDeposit.Amino, _?: boolean): MsgDeposit;
    toAmino(isClassic?: boolean): MsgDeposit.Amino;
    static fromData(data: MsgDeposit.Data, _?: boolean): MsgDeposit;
    toData(_?: boolean): MsgDeposit.Data;
    static fromProto(proto: MsgDeposit.Proto, _?: boolean): MsgDeposit;
    toProto(_?: boolean): MsgDeposit.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): MsgDeposit;
}
export declare namespace MsgDeposit {
    interface Amino {
        type: 'gov/MsgDeposit' | 'cosmos-sdk/MsgDeposit';
        value: {
            proposal_id: string;
            depositor: AccAddress;
            amount: Coins.Amino;
        };
    }
    interface Data {
        '@type': '/cosmos.gov.v1beta1.MsgDeposit';
        proposal_id: string;
        depositor: AccAddress;
        amount: Coins.Data;
    }
    type Proto = MsgDeposit_pb;
}
