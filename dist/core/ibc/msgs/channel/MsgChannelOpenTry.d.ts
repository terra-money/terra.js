import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { Channel } from '../../core/channel/Channel';
import { Height } from '../../core/client/Height';
import { MsgChannelOpenTry as MsgChannelOpenTry_pb } from '@terra-money/terra.proto/ibc/core/channel/v1/tx';
/**
 * MsgChannelOpenTry defines a msg sent by a Relayer to try to open a channel on Chain B
 */
export declare class MsgChannelOpenTry extends JSONSerializable<any, MsgChannelOpenTry.Data, MsgChannelOpenTry.Proto> {
    port_id: string;
    previous_channel_id: string;
    channel: Channel | undefined;
    counterparty_version: string;
    proof_init: string;
    proof_height: Height | undefined;
    signer: AccAddress;
    /**
     * @param port_id identifier of the port to use
     * @param previous_channel_id
     * @param channel channel info
     * @param counterparty_version
     * @param proof_init
     * @param proof_height
     * @param signer signer address
     */
    constructor(port_id: string, previous_channel_id: string, channel: Channel | undefined, counterparty_version: string, proof_init: string, proof_height: Height | undefined, signer: AccAddress);
    static fromAmino(_: any, isClassic?: boolean): MsgChannelOpenTry;
    toAmino(_?: boolean): any;
    static fromData(data: MsgChannelOpenTry.Data, _?: boolean): MsgChannelOpenTry;
    toData(_?: boolean): MsgChannelOpenTry.Data;
    static fromProto(proto: MsgChannelOpenTry.Proto, _?: boolean): MsgChannelOpenTry;
    toProto(_?: boolean): MsgChannelOpenTry.Proto;
    packAny(_?: boolean): Any;
    static unpackAny(msgAny: Any, _?: boolean): MsgChannelOpenTry;
}
export declare namespace MsgChannelOpenTry {
    interface Data {
        '@type': '/ibc.core.channel.v1.MsgChannelOpenTry';
        port_id: string;
        previous_channel_id: string;
        channel?: Channel.Data;
        counterparty_version: string;
        proof_init: string;
        proof_height?: Height.Data;
        signer: AccAddress;
    }
    type Proto = MsgChannelOpenTry_pb;
}
