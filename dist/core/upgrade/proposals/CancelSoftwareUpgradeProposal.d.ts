import { JSONSerializable } from '../../../util/json';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { CancelSoftwareUpgradeProposal as CancelSoftwareUpgradeProposal_pb } from '@terra-money/terra.proto/cosmos/upgrade/v1beta1/upgrade';
/**
 *  CancelSoftwareUpgradeProposal is a gov Content type for cancelling a software upgrade
 */
export declare class CancelSoftwareUpgradeProposal extends JSONSerializable<CancelSoftwareUpgradeProposal.Amino, CancelSoftwareUpgradeProposal.Data, CancelSoftwareUpgradeProposal.Proto> {
    title: string;
    description: string;
    /**
     *
     * @param title
     * @param description
     */
    constructor(title: string, description: string);
    static fromAmino(data: CancelSoftwareUpgradeProposal.Amino, _?: boolean): CancelSoftwareUpgradeProposal;
    toAmino(isClassic?: boolean): CancelSoftwareUpgradeProposal.Amino;
    static fromData(data: CancelSoftwareUpgradeProposal.Data, _?: boolean): CancelSoftwareUpgradeProposal;
    toData(_?: boolean): CancelSoftwareUpgradeProposal.Data;
    static fromProto(proto: CancelSoftwareUpgradeProposal.Proto, _?: boolean): CancelSoftwareUpgradeProposal;
    toProto(_?: boolean): CancelSoftwareUpgradeProposal.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): CancelSoftwareUpgradeProposal;
}
export declare namespace CancelSoftwareUpgradeProposal {
    interface Amino {
        type: 'upgrade/CancelSoftwareUpgradeProposal' | 'cosmos-sdk/CancelSoftwareUpgradeProposal';
        value: {
            title: string;
            description: string;
        };
    }
    interface Data {
        '@type': '/cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal';
        title: string;
        description: string;
    }
    type Proto = CancelSoftwareUpgradeProposal_pb;
}
