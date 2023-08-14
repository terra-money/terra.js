import { JSONSerializable } from '../../../util/json';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { AddBurnTaxExemptionAddressProposal as AddBurnTaxExemptionAddressProposal_pb } from '@classic-terra/terra.proto/terra/treasury/v1beta1/gov';
/**
 * AddBurnTaxExemptionAddressProposal gov proposal content type to submit exemption address for burn tax
 */
export declare class AddBurnTaxExemptionAddressProposal extends JSONSerializable<AddBurnTaxExemptionAddressProposal.Amino, AddBurnTaxExemptionAddressProposal.Data, AddBurnTaxExemptionAddressProposal.Proto> {
    title: string;
    description: string;
    addresses: string[];
    /**
     * @param title a short summary
     * @param description a human readable text
     * @param addresses the address that are exempt
     */
    constructor(title: string, description: string, addresses: string[]);
    static fromAmino(data: AddBurnTaxExemptionAddressProposal.Amino, isClassic?: boolean): AddBurnTaxExemptionAddressProposal;
    toAmino(isClassic?: boolean): AddBurnTaxExemptionAddressProposal.Amino;
    static fromData(data: AddBurnTaxExemptionAddressProposal.Data, isClassic?: boolean): AddBurnTaxExemptionAddressProposal;
    toData(isClassic?: boolean): AddBurnTaxExemptionAddressProposal.Data;
    static fromProto(proto: AddBurnTaxExemptionAddressProposal.Proto, isClassic?: boolean): AddBurnTaxExemptionAddressProposal;
    toProto(isClassic?: boolean): AddBurnTaxExemptionAddressProposal.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): AddBurnTaxExemptionAddressProposal;
}
export declare namespace AddBurnTaxExemptionAddressProposal {
    interface Amino {
        type: 'treasury/AddBurnTaxExemptionAddressProposal';
        value: {
            title: string;
            description: string;
            addresses: string[];
        };
    }
    interface Data {
        '@type': '/terra.treasury.v1beta1.AddBurnTaxExemptionAddressProposal';
        title: string;
        description: string;
        addresses: string[];
    }
    type Proto = AddBurnTaxExemptionAddressProposal_pb;
}
