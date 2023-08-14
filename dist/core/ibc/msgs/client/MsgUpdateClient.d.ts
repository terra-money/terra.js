import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgUpdateClient as MsgUpdateClient_pb } from '@terra-money/terra.proto/ibc/core/client/v1/tx';
import { Header } from '../../lightclient/tendermint/Header';
/**
 * MsgUpdateClient defines an sdk.Msg to update a IBC client state using the given header
 */
export declare class MsgUpdateClient extends JSONSerializable<any, MsgUpdateClient.Data, MsgUpdateClient.Proto> {
    client_id: string;
    header: Header | undefined;
    signer: string;
    /**
     * @param client_id client unique identifier
     * @param header header to update the light client
     * @param signer signer address
     */
    constructor(client_id: string, header: Header | undefined, signer: string);
    static fromAmino(_: any, isClassic?: boolean): MsgUpdateClient;
    toAmino(): any;
    static fromData(data: MsgUpdateClient.Data, _?: boolean): MsgUpdateClient;
    toData(_?: boolean): MsgUpdateClient.Data;
    static fromProto(proto: MsgUpdateClient.Proto, _?: boolean): MsgUpdateClient;
    toProto(_?: boolean): MsgUpdateClient.Proto;
    packAny(_?: boolean): Any;
    static unpackAny(msgAny: Any, _?: boolean): MsgUpdateClient;
}
export declare namespace MsgUpdateClient {
    interface Data {
        '@type': '/ibc.core.client.v1.MsgUpdateClient';
        client_id: string;
        header?: Header.Data;
        signer: AccAddress;
    }
    type Proto = MsgUpdateClient_pb;
}
