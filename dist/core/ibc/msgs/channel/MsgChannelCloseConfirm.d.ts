import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { Height } from '../../core/client/Height';
import { MsgChannelCloseConfirm as MsgChannelCloseConfirm_pb } from '@terra-money/terra.proto/ibc/core/channel/v1/tx';
/**
 * MsgChannelCloseConfirm defines a msg sent by a Relayer to Chain B to acknowledge the change of channel state to CLOSED on Chain A.
 */
export declare class MsgChannelCloseConfirm extends JSONSerializable<any, MsgChannelCloseConfirm.Data, MsgChannelCloseConfirm.Proto> {
    port_id: string;
    channel_id: string;
    proof_init: string;
    proof_height: Height | undefined;
    signer: AccAddress;
    /**
     * @param port_id identifier of the port to use
     * @param channel_id
     * @param proof_init
     * @param proof_height
     * @param signer signer address
     */
    constructor(port_id: string, channel_id: string, proof_init: string, proof_height: Height | undefined, signer: AccAddress);
    static fromAmino(_: any, isClassic?: boolean): MsgChannelCloseConfirm;
    toAmino(_?: boolean): any;
    static fromData(data: MsgChannelCloseConfirm.Data, _?: boolean): MsgChannelCloseConfirm;
    toData(_?: boolean): MsgChannelCloseConfirm.Data;
    static fromProto(proto: MsgChannelCloseConfirm.Proto, _?: boolean): MsgChannelCloseConfirm;
    toProto(_?: boolean): MsgChannelCloseConfirm.Proto;
    packAny(_?: boolean): Any;
    static unpackAny(msgAny: Any, _?: boolean): MsgChannelCloseConfirm;
}
export declare namespace MsgChannelCloseConfirm {
    interface Data {
        '@type': '/ibc.core.channel.v1.MsgChannelCloseConfirm';
        port_id: string;
        channel_id: string;
        proof_init: string;
        proof_height?: Height.Data;
        signer: AccAddress;
    }
    type Proto = MsgChannelCloseConfirm_pb;
}
