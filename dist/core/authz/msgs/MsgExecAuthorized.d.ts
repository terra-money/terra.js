import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Msg } from '../../Msg';
import { MsgExec as MsgExec_pb } from '@terra-money/terra.proto/cosmos/authz/v1beta1/tx';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
export declare class MsgExecAuthorized extends JSONSerializable<MsgExecAuthorized.Amino, MsgExecAuthorized.Data, MsgExecAuthorized.Proto> {
    grantee: AccAddress;
    msgs: Msg[];
    /**
     * @param grantee authorization grantee
     * @param msgs list of messages to execute
     */
    constructor(grantee: AccAddress, msgs: Msg[]);
    static fromAmino(data: MsgExecAuthorized.Amino, isClassic?: boolean): MsgExecAuthorized;
    toAmino(isClassic?: boolean): MsgExecAuthorized.Amino;
    static fromData(proto: MsgExecAuthorized.Data, isClassic?: boolean): MsgExecAuthorized;
    toData(isClassic?: boolean): MsgExecAuthorized.Data;
    static fromProto(proto: MsgExecAuthorized.Proto, isClassic?: boolean): MsgExecAuthorized;
    toProto(isClassic?: boolean): MsgExecAuthorized.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): MsgExecAuthorized;
}
export declare namespace MsgExecAuthorized {
    interface Amino {
        type: 'msgauth/MsgExecAuthorized' | 'cosmos-sdk/MsgExec';
        value: {
            grantee: AccAddress;
            msgs: Msg.Amino[];
        };
    }
    interface Data {
        '@type': '/cosmos.authz.v1beta1.MsgExec';
        grantee: AccAddress;
        msgs: Msg.Data[];
    }
    type Proto = MsgExec_pb;
}
