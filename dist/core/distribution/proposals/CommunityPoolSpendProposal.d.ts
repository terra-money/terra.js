import { JSONSerializable } from '../../../util/json';
import { Coins } from '../../Coins';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { CommunityPoolSpendProposal as CommunityPoolSpendProposal_pb } from '@terra-money/terra.proto/cosmos/distribution/v1beta1/distribution';
/**
 * Proposal that disburses funds from the Distribution module's community pool to the
 * specified recipient if passed.
 */
export declare class CommunityPoolSpendProposal extends JSONSerializable<CommunityPoolSpendProposal.Amino, CommunityPoolSpendProposal.Data, CommunityPoolSpendProposal.Proto> {
    title: string;
    description: string;
    recipient: AccAddress;
    amount: Coins;
    /**
     * @param title proposal's title
     * @param description proposal's description
     * @param recipient recipient address
     * @param amount amount to give recipient
     */
    constructor(title: string, description: string, recipient: AccAddress, amount: Coins.Input);
    static fromAmino(data: CommunityPoolSpendProposal.Amino, _?: boolean): CommunityPoolSpendProposal;
    toAmino(isClassic?: boolean): CommunityPoolSpendProposal.Amino;
    static fromData(data: CommunityPoolSpendProposal.Data, _?: boolean): CommunityPoolSpendProposal;
    toData(_?: boolean): CommunityPoolSpendProposal.Data;
    static fromProto(proto: CommunityPoolSpendProposal.Proto, _?: boolean): CommunityPoolSpendProposal;
    toProto(_?: boolean): CommunityPoolSpendProposal.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): CommunityPoolSpendProposal;
}
export declare namespace CommunityPoolSpendProposal {
    interface Amino {
        type: 'distribution/CommunityPoolSpendProposal' | 'cosmos-sdk/CommunityPoolSpendProposal';
        value: {
            title: string;
            description: string;
            recipient: AccAddress;
            amount: Coins.Amino;
        };
    }
    interface Data {
        '@type': '/cosmos.distribution.v1beta1.CommunityPoolSpendProposal';
        title: string;
        description: string;
        recipient: AccAddress;
        amount: Coins.Data;
    }
    type Proto = CommunityPoolSpendProposal_pb;
}
