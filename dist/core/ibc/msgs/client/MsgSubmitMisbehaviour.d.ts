import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgSubmitMisbehaviour as MsgSubmitMisbehaviour_pb } from '@terra-money/terra.proto/ibc/core/client/v1/tx';
/**
 *  MsgSubmitMisbehaviour defines an sdk.Msg type that submits Evidence for light client misbehaviour.
 */
export declare class MsgSubmitMisbehaviour extends JSONSerializable<any, MsgSubmitMisbehaviour.Data, MsgSubmitMisbehaviour.Proto> {
    client_id: string;
    misbehaviour: any;
    signer: string;
    /**
     * @param client_id client unique identifier
     * @param misbehaviour misbehaviour used for freezing the light client
     * @param signer signer address
     */
    constructor(client_id: string, misbehaviour: any, signer: string);
    static fromAmino(_: any, isClassic?: boolean): MsgSubmitMisbehaviour;
    toAmino(_?: boolean): any;
    static fromData(data: MsgSubmitMisbehaviour.Data, _?: boolean): MsgSubmitMisbehaviour;
    toData(_?: boolean): MsgSubmitMisbehaviour.Data;
    static fromProto(proto: MsgSubmitMisbehaviour.Proto, _?: boolean): MsgSubmitMisbehaviour;
    toProto(_?: boolean): MsgSubmitMisbehaviour.Proto;
    packAny(_?: boolean): Any;
    static unpackAny(msgAny: Any, _?: boolean): MsgSubmitMisbehaviour;
}
export declare namespace MsgSubmitMisbehaviour {
    interface Data {
        '@type': '/ibc.core.client.v1.MsgSubmitMisbehaviour';
        client_id: string;
        misbehaviour: any;
        signer: AccAddress;
    }
    type Proto = MsgSubmitMisbehaviour_pb;
}
