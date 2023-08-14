import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { Height } from '../../core/client/Height';
import { Packet } from '../../core/channel/Packet';
import { MsgAcknowledgement as MsgAcknowledgement_pb } from '@terra-money/terra.proto/ibc/core/channel/v1/tx';
/**
 * MsgAcknowledgement receives incoming IBC acknowledgement
 */
export declare class MsgAcknowledgement extends JSONSerializable<any, MsgAcknowledgement.Data, MsgAcknowledgement.Proto> {
    packet: Packet | undefined;
    acknowledgement: string;
    proof_acked: string;
    proof_height: Height | undefined;
    signer: AccAddress;
    /**
     * @param packet
     * @param acknowledgement
     * @param proof_acked
     * @param proof_height
     * @param signer signer address
     */
    constructor(packet: Packet | undefined, acknowledgement: string, proof_acked: string, proof_height: Height | undefined, signer: AccAddress);
    static fromAmino(_: any, isClassic?: boolean): MsgAcknowledgement;
    toAmino(_?: boolean): any;
    static fromData(data: MsgAcknowledgement.Data, _?: boolean): MsgAcknowledgement;
    toData(_?: boolean): MsgAcknowledgement.Data;
    static fromProto(proto: MsgAcknowledgement.Proto, _?: boolean): MsgAcknowledgement;
    toProto(_?: boolean): MsgAcknowledgement.Proto;
    packAny(_?: boolean): Any;
    static unpackAny(msgAny: Any, _?: boolean): MsgAcknowledgement;
}
export declare namespace MsgAcknowledgement {
    interface Data {
        '@type': '/ibc.core.channel.v1.MsgAcknowledgement';
        packet?: Packet.Data;
        acknowledgement: string;
        proof_acked: string;
        proof_height?: Height.Data;
        signer: AccAddress;
    }
    type Proto = MsgAcknowledgement_pb;
}
