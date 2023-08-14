import { JSONSerializable } from '../../../../../util/json';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgPayPacketFee as MsgPayPacketFee_pb } from '@terra-money/terra.proto/ibc/applications/fee/v1/tx';
import { Fee } from '../Fee';
/**
 * MsgPayPacketFee defines the request type for the PayPacketFee rpc
 * This Msg can be used to pay for a packet at the next sequence send & should be combined with the Msg that will be paid for
 */
export declare class MsgPayPacketFee extends JSONSerializable<any, MsgPayPacketFee.Data, MsgPayPacketFee.Proto> {
    fee: Fee | undefined;
    source_port_id: string;
    source_channel_id: string;
    signer: string;
    relayers: string[];
    /**
     * @param fee encapsulates the recv, ack and timeout fees associated with an IBC packet
     * @param source_port_id the source port unique identifier
     * @param source_channel_id the source channel unique identifer
     * @param signer account address to refund fee if necessary
     * @param relayers optional list of relayers permitted to the receive packet fees
     */
    constructor(fee: Fee | undefined, source_port_id: string, source_channel_id: string, signer: string, relayers: string[]);
    static fromAmino(_: any, isClassic?: boolean): MsgPayPacketFee;
    toAmino(isClassic?: boolean): any;
    static fromData(data: MsgPayPacketFee.Data, isClassic?: boolean): MsgPayPacketFee;
    toData(isClassic?: boolean): MsgPayPacketFee.Data;
    static fromProto(proto: MsgPayPacketFee.Proto, isClassic?: boolean): MsgPayPacketFee;
    toProto(isClassic?: boolean): MsgPayPacketFee.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): MsgPayPacketFee;
}
export declare namespace MsgPayPacketFee {
    interface Data {
        '@type': '/ibc.applications.fee.v1.MsgPayPacketFee';
        fee?: Fee.Data;
        source_port_id: string;
        source_channel_id: string;
        signer: string;
        relayers: string[];
    }
    type Proto = MsgPayPacketFee_pb;
}
