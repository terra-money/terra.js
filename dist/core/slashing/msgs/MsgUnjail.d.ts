import { JSONSerializable } from '../../../util/json';
import { ValAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgUnjail as MsgUnjail_pb } from '@terra-money/terra.proto/cosmos/slashing/v1beta1/tx';
/**
 * A validator can be jailed by the blockchain if misbehavior is detected, such as
 * double-signing or having missed too many vote periods in the Oracle ballot.
 *
 * This is done to protect delegators' funds from getting slashed further, until the
 * validator's issues have been addressed. A jailed validator cannot participate in
 * block rewards, and must be manually unjailed by submitting this message.
 */
export declare class MsgUnjail extends JSONSerializable<MsgUnjail.Amino, MsgUnjail.Data, MsgUnjail.Proto> {
    address: ValAddress;
    /**
     * @param address validator's operator address
     */
    constructor(address: ValAddress);
    static fromAmino(data: MsgUnjail.Amino, _?: boolean): MsgUnjail;
    toAmino(isClassic?: boolean): MsgUnjail.Amino;
    static fromData(proto: MsgUnjail.Data, _?: boolean): MsgUnjail;
    toData(_?: boolean): MsgUnjail.Data;
    static fromProto(proto: MsgUnjail.Proto, _?: boolean): MsgUnjail;
    toProto(_?: boolean): MsgUnjail.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): MsgUnjail;
}
export declare namespace MsgUnjail {
    interface Amino {
        type: 'slashing/MsgUnjail' | 'cosmos-sdk/MsgUnjail';
        value: {
            address: ValAddress;
        };
    }
    interface Data {
        '@type': '/cosmos.slashing.v1beta1.MsgUnjail';
        address: ValAddress;
    }
    type Proto = MsgUnjail_pb;
}
