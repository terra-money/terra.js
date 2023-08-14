import { JSONSerializable } from '../../../util/json';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { RemoveBurnTaxExemptionAddressProposal as RemoveBurnTaxExemptionAddressProposal_pb } from '@classic-terra/terra.proto/terra/treasury/v1beta1/gov';
/**
 * RemoveBurnTaxExemptionAddressProposal gov proposal content type to remove exemption address for burn tax
 */
export declare class RemoveBurnTaxExemptionAddressProposal extends JSONSerializable<RemoveBurnTaxExemptionAddressProposal.Amino, RemoveBurnTaxExemptionAddressProposal.Data, RemoveBurnTaxExemptionAddressProposal.Proto> {
    title: string;
    description: string;
    addresses: string[];
    /**
     * @param title a short summary
     * @param description a human readable text
     * @param addresses the address that are exempt
     */
    constructor(title: string, description: string, addresses: string[]);
    static fromAmino(data: RemoveBurnTaxExemptionAddressProposal.Amino, isClassic?: boolean): RemoveBurnTaxExemptionAddressProposal;
    toAmino(isClassic?: boolean): RemoveBurnTaxExemptionAddressProposal.Amino;
    static fromData(data: RemoveBurnTaxExemptionAddressProposal.Data, isClassic?: boolean): RemoveBurnTaxExemptionAddressProposal;
    toData(isClassic?: boolean): RemoveBurnTaxExemptionAddressProposal.Data;
    static fromProto(proto: RemoveBurnTaxExemptionAddressProposal.Proto, isClassic?: boolean): RemoveBurnTaxExemptionAddressProposal;
    toProto(isClassic?: boolean): RemoveBurnTaxExemptionAddressProposal.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): RemoveBurnTaxExemptionAddressProposal;
}
export declare namespace RemoveBurnTaxExemptionAddressProposal {
    interface Amino {
        type: 'treasury/RemoveBurnTaxExemptionAddressProposal';
        value: {
            title: string;
            description: string;
            addresses: string[];
        };
    }
    interface Data {
        '@type': '/terra.treasury.v1beta1.RemoveBurnTaxExemptionAddressProposal';
        title: string;
        description: string;
        addresses: string[];
    }
    type Proto = RemoveBurnTaxExemptionAddressProposal_pb;
}
