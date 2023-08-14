import { JSONSerializable } from '../../../util/json';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { SoftwareUpgradeProposal as SoftwareUpgradeProposal_pb } from '@terra-money/terra.proto/cosmos/upgrade/v1beta1/upgrade';
import { Plan } from '../Plan';
/**
 * Softwareupgradeproposal is a gov Content type for initiating a software upgrade.
 */
export declare class SoftwareUpgradeProposal extends JSONSerializable<SoftwareUpgradeProposal.Amino, SoftwareUpgradeProposal.Data, SoftwareUpgradeProposal.Proto> {
    title: string;
    description: string;
    plan?: Plan | undefined;
    /**
     *
     * @param title
     * @param description
     * @param plan
     */
    constructor(title: string, description: string, plan?: Plan | undefined);
    static fromAmino(data: SoftwareUpgradeProposal.Amino, _?: boolean): SoftwareUpgradeProposal;
    toAmino(isClassic?: boolean): SoftwareUpgradeProposal.Amino;
    static fromData(data: SoftwareUpgradeProposal.Data, _?: boolean): SoftwareUpgradeProposal;
    toData(_?: boolean): SoftwareUpgradeProposal.Data;
    static fromProto(proto: SoftwareUpgradeProposal.Proto, _?: boolean): SoftwareUpgradeProposal;
    toProto(_?: boolean): SoftwareUpgradeProposal.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): SoftwareUpgradeProposal;
}
export declare namespace SoftwareUpgradeProposal {
    interface Amino {
        type: 'upgrade/SoftwareUpgradeProposal' | 'cosmos-sdk/SoftwareUpgradeProposal';
        value: {
            title: string;
            description: string;
            plan?: Plan.Amino;
        };
    }
    interface Data {
        '@type': '/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal';
        title: string;
        description: string;
        plan?: Plan.Data;
    }
    type Proto = SoftwareUpgradeProposal_pb;
}
