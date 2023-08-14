import { FungibleTokenPacketData as FungibleTokenPacketData_pb } from '@terra-money/terra.proto/ibc/applications/transfer/v2/packet';
import { JSONSerializable } from '../../../../../util/json';
/**
 *  FungibleTokenPacketData defines a struct for the packet payload
 * See FungibleTokenPacketData spec:
 * https://github.com/cosmos/ibc/tree/master/spec/app/ics-020-fungible-token-transfer#data-structures
 */
export declare class FungibleTokenPacketData extends JSONSerializable<FungibleTokenPacketData.Amino, FungibleTokenPacketData.Data, FungibleTokenPacketData.Proto> {
    denom: string;
    amount: string;
    sender: string;
    receiver: string;
    /**
     * @param denom the token denomination to be transferred
     * @param amount the token amount to be transferred
     * @param sender the sender address
     * @param receiver the recipient address on the destination chain
     */
    constructor(denom: string, amount: string, sender: string, receiver: string);
    static fromAmino(data: FungibleTokenPacketData.Amino): FungibleTokenPacketData;
    toAmino(): FungibleTokenPacketData.Amino;
    static fromData(data: FungibleTokenPacketData.Data): FungibleTokenPacketData;
    toData(): FungibleTokenPacketData.Data;
    static fromProto(proto: FungibleTokenPacketData.Proto): FungibleTokenPacketData;
    toProto(): FungibleTokenPacketData.Proto;
}
export declare namespace FungibleTokenPacketData {
    interface Amino {
        denom: string;
        amount: string;
        sender: string;
        receiver: string;
    }
    interface Data {
        denom: string;
        amount: string;
        sender: string;
        receiver: string;
    }
    type Proto = FungibleTokenPacketData_pb;
}
