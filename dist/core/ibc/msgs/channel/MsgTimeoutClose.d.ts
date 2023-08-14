import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { Height } from '../../core/client/Height';
import { Packet } from '../../core/channel/Packet';
import { MsgTimeoutOnClose as MsgTimeoutOnClose_pb } from '@terra-money/terra.proto/ibc/core/channel/v1/tx';
/**
 * MsgTimeoutOnClose timed-out packet upon counterparty channel closure.
 */
export declare class MsgTimeoutOnClose extends JSONSerializable<any, MsgTimeoutOnClose.Data, MsgTimeoutOnClose.Proto> {
    packet: Packet | undefined;
    proof_unreceived: string;
    proof_close: string;
    proof_height: Height | undefined;
    next_sequence_recv: number;
    signer: AccAddress;
    /**
     * @param packet
     * @param proof_unreceived
     * @param proof_height
     * @param proof_close
     * @param next_seuqnce_recv
     * @param signer signer address
     */
    constructor(packet: Packet | undefined, proof_unreceived: string, proof_close: string, proof_height: Height | undefined, next_sequence_recv: number, signer: AccAddress);
    static fromAmino(_: any, isClassic?: boolean): MsgTimeoutOnClose;
    toAmino(_?: boolean): any;
    static fromData(data: MsgTimeoutOnClose.Data, _?: boolean): MsgTimeoutOnClose;
    toData(_?: boolean): MsgTimeoutOnClose.Data;
    static fromProto(proto: MsgTimeoutOnClose.Proto, _?: boolean): MsgTimeoutOnClose;
    toProto(_?: boolean): MsgTimeoutOnClose.Proto;
    packAny(_?: boolean): Any;
    static unpackAny(msgAny: Any, _?: boolean): MsgTimeoutOnClose;
}
export declare namespace MsgTimeoutOnClose {
    interface Data {
        '@type': '/ibc.core.channel.v1.MsgTimeoutOnClose';
        packet?: Packet.Data;
        proof_unreceived: string;
        proof_close: string;
        proof_height?: Height.Data;
        next_sequence_recv: string;
        signer: AccAddress;
    }
    type Proto = MsgTimeoutOnClose_pb;
}
