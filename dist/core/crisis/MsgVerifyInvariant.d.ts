import { JSONSerializable } from '../../util/json';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgVerifyInvariant as MsgVerifyInvariant_pb } from '@terra-money/terra.proto/cosmos/crisis/v1beta1/tx';
import { AccAddress } from '../bech32';
/**
 * MsgVerifyInvariant represents a message to verify a particular invariance.
 */
export declare class MsgVerifyInvariant extends JSONSerializable<MsgVerifyInvariant.Amino, MsgVerifyInvariant.Data, MsgVerifyInvariant.Proto> {
    sender: AccAddress;
    invariantModuleName: string;
    invariantRoute: string;
    /**
     * @param sender sender's address
     * @param invariantModuleName module name to verify invariant
     * @param invariantRoute route to verify
     */
    constructor(sender: AccAddress, invariantModuleName: string, invariantRoute: string);
    static fromAmino(data: MsgVerifyInvariant.Amino, _?: boolean): MsgVerifyInvariant;
    toAmino(_?: boolean): MsgVerifyInvariant.Amino;
    static fromData(data: MsgVerifyInvariant.Data, _?: boolean): MsgVerifyInvariant;
    toData(_?: boolean): MsgVerifyInvariant.Data;
    static fromProto(proto: MsgVerifyInvariant.Proto, _?: boolean): MsgVerifyInvariant;
    toProto(_?: boolean): MsgVerifyInvariant.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): MsgVerifyInvariant;
}
export declare namespace MsgVerifyInvariant {
    interface Amino {
        type: 'crisis/MsgVerifyInvariant' | 'cosmos-sdk/MsgVerifyInvariant';
        value: {
            sender: AccAddress;
            invariantModuleName: string;
            invariantRoute: string;
        };
    }
    interface Data {
        '@type': '/cosmos.crisis.v1beta1.MsgVerifyInvariant';
        sender: AccAddress;
        invariantModuleName: string;
        invariantRoute: string;
    }
    type Proto = MsgVerifyInvariant_pb;
}
