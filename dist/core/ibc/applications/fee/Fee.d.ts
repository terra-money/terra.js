import { Fee as Fee_pb } from '@terra-money/terra.proto/ibc/applications/fee/v1/fee';
import { Coins } from '../../../Coins';
import { JSONSerializable } from '../../../../util/json';
/**
 *  Fee defines the ICS29 receive, acknowledgement and timeout fees
 */
export declare class Fee extends JSONSerializable<Fee.Amino, Fee.Data, Fee.Proto> {
    /** the packet receive fee */
    recv_fee: Coins;
    /** the packet acknowledgement fee */
    ack_fee: Coins;
    /** the packet timeout fee */
    timeout_fee: Coins;
    /**
     * @param recv_fee the packet receive fee
     * @param ack_fee the packet acknowledgement fee
     * @param timeout_fee the packet timeout fee
     */
    constructor(recv_fee: Coins.Input, ack_fee: Coins.Input, timeout_fee: Coins.Input);
    static fromAmino(data: Fee.Amino): Fee;
    toAmino(): Fee.Amino;
    static fromData(data: Fee.Data): Fee;
    toData(): Fee.Data;
    static fromProto(proto: Fee.Proto): Fee;
    toProto(): Fee.Proto;
}
export declare namespace Fee {
    interface Amino {
        recv_fee: Coins.Amino;
        ack_fee: Coins.Amino;
        timeout_fee: Coins.Amino;
    }
    interface Data {
        recv_fee: Coins.Data;
        ack_fee: Coins.Data;
        timeout_fee: Coins.Data;
    }
    type Proto = Fee_pb;
}
