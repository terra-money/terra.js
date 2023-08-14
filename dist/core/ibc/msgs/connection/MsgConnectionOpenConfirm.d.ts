import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgConnectionOpenConfirm as MsgConnectionOpenConfirm_pb } from '@terra-money/terra.proto/ibc/core/connection/v1/tx';
import { Height } from '../../core/client/Height';
/**
 * MsgConnectionOpenConfirm defines a msg sent by a Relayer to Chain B to
 * acknowledge the change of connection state to OPEN on Chain A.
 */
export declare class MsgConnectionOpenConfirm extends JSONSerializable<any, MsgConnectionOpenConfirm.Data, MsgConnectionOpenConfirm.Proto> {
    connection_id: string;
    proof_ack: string;
    proof_height: Height | undefined;
    signer: AccAddress;
    /**
     * @param connection_id
     * @param proof_ack proof for the change of the connection state on Chain A: `INIT -> OPEN`
     * @param proof_height
     * @param signer signer address
     */
    constructor(connection_id: string, proof_ack: string, proof_height: Height | undefined, signer: AccAddress);
    static fromAmino(_: any, isClassic?: boolean): MsgConnectionOpenConfirm;
    toAmino(_?: boolean): any;
    static fromData(data: MsgConnectionOpenConfirm.Data, _?: boolean): MsgConnectionOpenConfirm;
    toData(_?: boolean): MsgConnectionOpenConfirm.Data;
    static fromProto(proto: MsgConnectionOpenConfirm.Proto, _?: boolean): MsgConnectionOpenConfirm;
    toProto(_?: boolean): MsgConnectionOpenConfirm.Proto;
    packAny(_?: boolean): Any;
    static unpackAny(msgAny: Any, _?: boolean): MsgConnectionOpenConfirm;
}
export declare namespace MsgConnectionOpenConfirm {
    interface Data {
        '@type': '/ibc.core.connection.v1.MsgConnectionOpenConfirm';
        connection_id: string;
        proof_ack: string;
        proof_height?: Height.Data;
        signer: AccAddress;
    }
    type Proto = MsgConnectionOpenConfirm_pb;
}
