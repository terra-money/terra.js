import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { Height } from '../../core/client/Height';
import { Packet } from '../../core/channel/Packet';
import { MsgTimeout as MsgTimeout_pb } from '@terra-money/terra.proto/ibc/core/channel/v1/tx';
/**
 * MsgTimeout receives timed-out packet
 */
export declare class MsgTimeout extends JSONSerializable<any, MsgTimeout.Data, MsgTimeout.Proto> {
    packet: Packet | undefined;
    proof_unreceived: string;
    proof_height: Height | undefined;
    next_sequence_recv: number;
    signer: AccAddress;
    /**
     * @param packet
     * @param proof_unreceived
     * @param proof_height
     * @param next_seuqnce_recv
     * @param signer signer address
     */
    constructor(packet: Packet | undefined, proof_unreceived: string, proof_height: Height | undefined, next_sequence_recv: number, signer: AccAddress);
    static fromAmino(_: any, isClassic?: boolean): MsgTimeout;
    toAmino(_?: boolean): any;
    static fromData(data: MsgTimeout.Data, _?: boolean): MsgTimeout;
    toData(_?: boolean): MsgTimeout.Data;
    static fromProto(proto: MsgTimeout.Proto, _?: boolean): MsgTimeout;
    toProto(_?: boolean): MsgTimeout.Proto;
    packAny(_?: boolean): Any;
    static unpackAny(msgAny: Any, _?: boolean): MsgTimeout;
}
export declare namespace MsgTimeout {
    interface Data {
        '@type': '/ibc.core.channel.v1.MsgTimeout';
        packet?: Packet.Data;
        proof_unreceived: string;
        proof_height?: Height.Data;
        next_sequence_recv: string;
        signer: AccAddress;
    }
    type Proto = MsgTimeout_pb;
}
