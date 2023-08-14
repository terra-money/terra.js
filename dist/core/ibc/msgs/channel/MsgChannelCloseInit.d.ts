import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgChannelCloseInit as MsgChannelCloseInit_pb } from '@terra-money/terra.proto/ibc/core/channel/v1/tx';
/**
 * MsgChannelCloseInit defines a msg sent by a Relayer to Chain A to close a channel with Chain B.
 */
export declare class MsgChannelCloseInit extends JSONSerializable<any, MsgChannelCloseInit.Data, MsgChannelCloseInit.Proto> {
    port_id: string;
    channel_id: string;
    signer: AccAddress;
    /**
     * @param port_id identifier of the port to use
     * @param channel channel info
     * @param signer signer address
     */
    constructor(port_id: string, channel_id: string, signer: AccAddress);
    static fromAmino(_: any, isClassic?: boolean): MsgChannelCloseInit;
    toAmino(_?: boolean): any;
    static fromData(data: MsgChannelCloseInit.Data, _?: boolean): MsgChannelCloseInit;
    toData(_?: boolean): MsgChannelCloseInit.Data;
    static fromProto(proto: MsgChannelCloseInit.Proto, _?: boolean): MsgChannelCloseInit;
    toProto(_?: boolean): MsgChannelCloseInit.Proto;
    packAny(_?: boolean): Any;
    static unpackAny(msgAny: Any, _?: boolean): MsgChannelCloseInit;
}
export declare namespace MsgChannelCloseInit {
    interface Data {
        '@type': '/ibc.core.channel.v1.MsgChannelCloseInit';
        port_id: string;
        channel_id: string;
        signer: AccAddress;
    }
    type Proto = MsgChannelCloseInit_pb;
}
