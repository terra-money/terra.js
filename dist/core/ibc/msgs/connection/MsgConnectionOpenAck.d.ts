import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { Version } from '../../core/connection/Version';
import { MsgConnectionOpenAck as MsgConnectionOpenAck_pb } from '@terra-money/terra.proto/ibc/core/connection/v1/tx';
import { Height } from '../../core/client/Height';
/**
 * MsgConnectionOpenAck defines a msg sent by a Relayer to Chain A to
 * acknowledge the change of connection state to TRYOPEN on Chain B.
 */
export declare class MsgConnectionOpenAck extends JSONSerializable<any, MsgConnectionOpenAck.Data, MsgConnectionOpenAck.Proto> {
    connection_id: string;
    counterparty_connection_id: string;
    version: Version | undefined;
    client_state: any;
    proof_height: Height | undefined;
    proof_try: string;
    proof_client: string;
    proof_consensus: string;
    consensus_height: Height | undefined;
    signer: AccAddress;
    /**
     * @param connection_id
     * @param counterparty_connection_id
     * @param version
     * @param client_state
     * @param proof_height proof of the initialization the connection on Chain B: `UNITIALIZED -> TRYOPEN`
     * @param proof_try proof of client state included in message
     * @param proof_client proof of client consensus state
     * @param proof_consensus
     * @param consenesus_height
     * @param signer signer address
     */
    constructor(connection_id: string, counterparty_connection_id: string, version: Version | undefined, client_state: any, proof_height: Height | undefined, proof_try: string, proof_client: string, proof_consensus: string, consensus_height: Height | undefined, signer: AccAddress);
    static fromAmino(_: any, isClassic?: boolean): MsgConnectionOpenAck;
    toAmino(_?: boolean): any;
    static fromData(data: MsgConnectionOpenAck.Data, _?: boolean): MsgConnectionOpenAck;
    toData(_?: boolean): MsgConnectionOpenAck.Data;
    static fromProto(proto: MsgConnectionOpenAck.Proto, _?: boolean): MsgConnectionOpenAck;
    toProto(_?: boolean): MsgConnectionOpenAck.Proto;
    packAny(_?: boolean): Any;
    static unpackAny(msgAny: Any, _?: boolean): MsgConnectionOpenAck;
}
export declare namespace MsgConnectionOpenAck {
    interface Data {
        '@type': '/ibc.core.connection.v1.MsgConnectionOpenAck';
        connection_id: string;
        counterparty_connection_id: string;
        version?: Version.Data;
        client_state: Any;
        proof_height?: Height.Data;
        proof_try: string;
        proof_client: string;
        proof_consensus: string;
        consensus_height?: Height.Data;
        signer: AccAddress;
    }
    type Proto = MsgConnectionOpenAck_pb;
}
