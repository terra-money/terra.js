import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { Height } from '../../core/client/Height';
import { MsgChannelOpenAck as MsgChannelOpenAck_pb } from '@terra-money/terra.proto/ibc/core/channel/v1/tx';
/**
 * MsgChannelOpenAck defines a msg sent by a Relayer to Chain A to acknowledge the change of channel state to TRYOPEN on Chain B.
 */
export declare class MsgChannelOpenAck extends JSONSerializable<any, MsgChannelOpenAck.Data, MsgChannelOpenAck.Proto> {
    port_id: string;
    channel_id: string;
    counterparty_channel_id: string;
    counterparty_version: string;
    proof_try: string;
    proof_height: Height | undefined;
    signer: AccAddress;
    /**
     * @param port_id identifier of the port to use
     * @param channel_id
     * @param counterparty_channel_id
     * @param counterparty_version
     * @param proof_try
     * @param proof_height
     * @param signer signer address
     */
    constructor(port_id: string, channel_id: string, counterparty_channel_id: string, counterparty_version: string, proof_try: string, proof_height: Height | undefined, signer: AccAddress);
    static fromAmino(_: any, isClassic?: boolean): MsgChannelOpenAck;
    toAmino(_?: boolean): any;
    static fromData(data: MsgChannelOpenAck.Data, _?: boolean): MsgChannelOpenAck;
    toData(_?: boolean): MsgChannelOpenAck.Data;
    static fromProto(proto: MsgChannelOpenAck.Proto, _?: boolean): MsgChannelOpenAck;
    toProto(_?: boolean): MsgChannelOpenAck.Proto;
    packAny(_?: boolean): Any;
    static unpackAny(msgAny: Any, _?: boolean): MsgChannelOpenAck;
}
export declare namespace MsgChannelOpenAck {
    interface Data {
        '@type': '/ibc.core.channel.v1.MsgChannelOpenAck';
        port_id: string;
        channel_id: string;
        counterparty_channel_id: string;
        counterparty_version: string;
        proof_try: string;
        proof_height?: Height.Data;
        signer: AccAddress;
    }
    type Proto = MsgChannelOpenAck_pb;
}
