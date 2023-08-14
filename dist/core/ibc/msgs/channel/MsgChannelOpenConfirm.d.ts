import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { Height } from '../../core/client/Height';
import { MsgChannelOpenConfirm as MsgChannelOpenConfirm_pb } from '@terra-money/terra.proto/ibc/core/channel/v1/tx';
/**
 *  MsgChannelOpenConfirm defines a msg sent by a Relayer to Chain B to acknowledge the change of channel state to OPEN on Chain A.
 */
export declare class MsgChannelOpenConfirm extends JSONSerializable<any, MsgChannelOpenConfirm.Data, MsgChannelOpenConfirm.Proto> {
    port_id: string;
    channel_id: string;
    proof_ack: string;
    proof_height: Height | undefined;
    signer: AccAddress;
    /**
     * @param port_id identifier of the port to use
     * @param channel_id
     * @param proof_ack
     * @param proof_height
     * @param signer signer address
     */
    constructor(port_id: string, channel_id: string, proof_ack: string, proof_height: Height | undefined, signer: AccAddress);
    static fromAmino(_: any, isClassic?: boolean): MsgChannelOpenConfirm;
    toAmino(_?: boolean): any;
    static fromData(data: MsgChannelOpenConfirm.Data, _?: boolean): MsgChannelOpenConfirm;
    toData(_?: boolean): MsgChannelOpenConfirm.Data;
    static fromProto(proto: MsgChannelOpenConfirm.Proto, _?: boolean): MsgChannelOpenConfirm;
    toProto(_?: boolean): MsgChannelOpenConfirm.Proto;
    packAny(_?: boolean): Any;
    static unpackAny(msgAny: Any, _?: boolean): MsgChannelOpenConfirm;
}
export declare namespace MsgChannelOpenConfirm {
    interface Data {
        '@type': '/ibc.core.channel.v1.MsgChannelOpenConfirm';
        port_id: string;
        channel_id: string;
        proof_ack: string;
        proof_height?: Height.Data;
        signer: AccAddress;
    }
    type Proto = MsgChannelOpenConfirm_pb;
}
