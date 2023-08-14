import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgCreateClient as MsgCreateClient_pb } from '@terra-money/terra.proto/ibc/core/client/v1/tx';
/**
 * MsgCreateClient defines a message to create an IBC client
 */
export declare class MsgCreateClient extends JSONSerializable<any, MsgCreateClient.Data, MsgCreateClient.Proto> {
    client_state?: any;
    consensus_state?: any;
    signer: AccAddress;
    /**
     * @param client_state light client state
     * @param consensus_state consensus state associated with the client that corresponds to a given
     * @param signer signer address
     */
    constructor(client_state: any, consensus_state: any, signer: any);
    static fromAmino(_: any, isClassic?: boolean): MsgCreateClient;
    toAmino(_?: boolean): any;
    static fromData(data: MsgCreateClient.Data, _?: boolean): MsgCreateClient;
    toData(_?: boolean): MsgCreateClient.Data;
    static fromProto(proto: MsgCreateClient.Proto, _?: boolean): MsgCreateClient;
    toProto(_?: boolean): MsgCreateClient.Proto;
    packAny(_?: boolean): Any;
    static unpackAny(msgAny: Any, _?: boolean): MsgCreateClient;
}
export declare namespace MsgCreateClient {
    interface Data {
        '@type': '/ibc.core.client.v1.MsgCreateClient';
        client_state?: any;
        consensus_state?: any;
        signer: AccAddress;
    }
    type Proto = MsgCreateClient_pb;
}
