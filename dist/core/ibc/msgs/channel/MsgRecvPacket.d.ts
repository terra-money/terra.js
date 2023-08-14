import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { Height } from '../../core/client/Height';
import { Packet } from '../../core/channel/Packet';
import { MsgRecvPacket as MsgRecvPacket_pb } from '@terra-money/terra.proto/ibc/core/channel/v1/tx';
/**
 * MsgRecvPacket receives incoming IBC packet
 */
export declare class MsgRecvPacket extends JSONSerializable<any, MsgRecvPacket.Data, MsgRecvPacket.Proto> {
    packet: Packet | undefined;
    proof_commitment: string;
    proof_height: Height | undefined;
    signer: AccAddress;
    /**
     * @param packet
     * @param proof_commitment
     * @param proof_height
     * @param signer signer address
     */
    constructor(packet: Packet | undefined, proof_commitment: string, proof_height: Height | undefined, signer: AccAddress);
    static fromAmino(_: any, isClassic?: boolean): MsgRecvPacket;
    toAmino(_?: boolean): any;
    static fromData(data: MsgRecvPacket.Data, _?: boolean): MsgRecvPacket;
    toData(_?: boolean): MsgRecvPacket.Data;
    static fromProto(proto: MsgRecvPacket.Proto, _?: boolean): MsgRecvPacket;
    toProto(_?: boolean): MsgRecvPacket.Proto;
    packAny(_?: boolean): Any;
    static unpackAny(msgAny: Any, _?: boolean): MsgRecvPacket;
}
export declare namespace MsgRecvPacket {
    interface Data {
        '@type': '/ibc.core.channel.v1.MsgRecvPacket';
        packet?: Packet.Data;
        proof_commitment: string;
        proof_height?: Height.Data;
        signer: AccAddress;
    }
    type Proto = MsgRecvPacket_pb;
}
