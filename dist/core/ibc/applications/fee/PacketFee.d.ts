import { PacketFee as PacketFee_pb } from '@terra-money/terra.proto/ibc/applications/fee/v1/fee';
import { JSONSerializable } from '../../../../util/json';
import { Fee } from './Fee';
import { AccAddress } from '../../../..';
/**
 *  PacketFee contains ICS29 relayer fees, refund address and optional list of permitted relayers
 */
export declare class PacketFee extends JSONSerializable<PacketFee.Amino, PacketFee.Data, PacketFee.Proto> {
    fee: Fee | undefined;
    refund_address: AccAddress;
    relayers: string[];
    /**
     * @param fee fee encapsulates the recv, ack and timeout fees associated with an IBC packet
     * @param refund_address the refund address for unspent fees
     * @param relayers  optional list of relayers permitted to receive fees
     */
    constructor(fee: Fee | undefined, refund_address: AccAddress, relayers?: string[]);
    static fromAmino(data: PacketFee.Amino): PacketFee;
    toAmino(): PacketFee.Amino;
    static fromData(data: PacketFee.Data): PacketFee;
    toData(): PacketFee.Data;
    static fromProto(proto: PacketFee.Proto): PacketFee;
    toProto(): PacketFee.Proto;
}
export declare namespace PacketFee {
    interface Amino {
        fee: Fee.Amino | undefined;
        refund_address: AccAddress;
        relayers: string[];
    }
    interface Data {
        fee: Fee.Data | undefined;
        refund_address: AccAddress;
        relayers: string[];
    }
    type Proto = PacketFee_pb;
}
