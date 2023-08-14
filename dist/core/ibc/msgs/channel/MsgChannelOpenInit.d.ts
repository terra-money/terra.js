import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { Channel } from '../../core/channel/Channel';
import { MsgChannelOpenInit as MsgChannelOpenInit_pb } from '@terra-money/terra.proto/ibc/core/channel/v1/tx';
/**
 * MsgChannelOpenInit defines an sdk.Msg to initialize a channel handshake. It is called by a relayer on Chain A.
 */
export declare class MsgChannelOpenInit extends JSONSerializable<any, MsgChannelOpenInit.Data, MsgChannelOpenInit.Proto> {
    port_id: string;
    channel: Channel | undefined;
    signer: AccAddress;
    /**
     * @param port_id identifier of the port to use
     * @param channel channel info
     * @param signer signer address
     */
    constructor(port_id: string, channel: Channel | undefined, signer: AccAddress);
    static fromAmino(_: any, isClassic?: boolean): MsgChannelOpenInit;
    toAmino(_?: boolean): any;
    static fromData(data: MsgChannelOpenInit.Data, _?: boolean): MsgChannelOpenInit;
    toData(_?: boolean): MsgChannelOpenInit.Data;
    static fromProto(proto: MsgChannelOpenInit.Proto, _?: boolean): MsgChannelOpenInit;
    toProto(_?: boolean): MsgChannelOpenInit.Proto;
    packAny(_?: boolean): Any;
    static unpackAny(msgAny: Any, _?: boolean): MsgChannelOpenInit;
}
export declare namespace MsgChannelOpenInit {
    interface Data {
        '@type': '/ibc.core.channel.v1.MsgChannelOpenInit';
        port_id: string;
        channel?: Channel.Data;
        signer: AccAddress;
    }
    type Proto = MsgChannelOpenInit_pb;
}
