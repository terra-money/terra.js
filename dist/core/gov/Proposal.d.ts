import { Coins } from '../Coins';
import { Int } from '../numeric';
import { JSONSerializable } from '../../util/json';
import { CommunityPoolSpendProposal } from '../distribution/proposals';
import { ParameterChangeProposal } from '../params/proposals';
import { ClientUpdateProposal } from '../ibc/proposals';
import { TextProposal } from './proposals';
import { SoftwareUpgradeProposal, CancelSoftwareUpgradeProposal } from '../upgrade/proposals';
import { ClearAdminProposal, ExecuteContractProposal, InstantiateContractProposal, MigrateContractProposal, PinCodesProposal, StoreCodeProposal, SudoContractProposal, UnpinCodesProposal, UpdateAdminProposal, UpdateInstantiateConfigProposal } from '../wasm/proposals';
import { AddBurnTaxExemptionAddressProposal, RemoveBurnTaxExemptionAddressProposal } from '../treasury/proposals';
import { Proposal as Proposal_pb, ProposalStatus } from '@terra-money/terra.proto/cosmos/gov/v1beta1/gov';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
/**
 * Stores information pertaining to a submitted proposal, such as its status and time of
 * the voting period
 */
export declare class Proposal extends JSONSerializable<Proposal.Amino, Proposal.Data, Proposal.Proto> {
    id: number;
    content: Proposal.Content;
    status: ProposalStatus;
    final_tally_result: Proposal.FinalTallyResult;
    submit_time: Date;
    deposit_end_time: Date;
    total_deposit: Coins;
    voting_start_time: Date;
    voting_end_time: Date;
    /**
     *
     * @param id proposal's ID
     * @param content content of the proposal
     * @param status proposal's status
     * @param final_tally_result tally result
     * @param submit_time time proposal was submitted and deposit period started
     * @param deposit_end_time time deposit period will end
     * @param total_deposit amount of coins deposited by all users
     * @param voting_start_time time voting period will start
     * @param voting_end_time time voting period will end
     */
    constructor(id: number, content: Proposal.Content, status: ProposalStatus, final_tally_result: Proposal.FinalTallyResult, submit_time: Date, deposit_end_time: Date, total_deposit: Coins, voting_start_time: Date, voting_end_time: Date);
    static fromAmino(data: Proposal.Amino, isClassic?: boolean): Proposal;
    toAmino(isClassic?: boolean): Proposal.Amino;
    static fromData(data: Proposal.Data, isClassic?: boolean): Proposal;
    toData(isClassic?: boolean): Proposal.Data;
    static fromProto(data: Proposal.Proto, isClassic?: boolean): Proposal;
    toProto(isClassic?: boolean): Proposal.Proto;
}
export declare namespace Proposal {
    const Status: typeof ProposalStatus;
    type Status = ProposalStatus;
    interface FinalTallyResult {
        yes: Int;
        abstain: Int;
        no: Int;
        no_with_veto: Int;
    }
    type Content = TextProposal | CommunityPoolSpendProposal | ParameterChangeProposal | SoftwareUpgradeProposal | CancelSoftwareUpgradeProposal | ClientUpdateProposal | ClearAdminProposal | ExecuteContractProposal | InstantiateContractProposal | MigrateContractProposal | PinCodesProposal | StoreCodeProposal | SudoContractProposal | UnpinCodesProposal | UpdateAdminProposal | UpdateInstantiateConfigProposal | AddBurnTaxExemptionAddressProposal | RemoveBurnTaxExemptionAddressProposal;
    namespace Content {
        type Amino = TextProposal.Amino | CommunityPoolSpendProposal.Amino | ParameterChangeProposal.Amino | SoftwareUpgradeProposal.Amino | CancelSoftwareUpgradeProposal.Amino | ClientUpdateProposal.Amino | ClearAdminProposal.Amino | ExecuteContractProposal.Amino | InstantiateContractProposal.Amino | MigrateContractProposal.Amino | PinCodesProposal.Amino | StoreCodeProposal.Amino | SudoContractProposal.Amino | UnpinCodesProposal.Amino | UpdateAdminProposal.Amino | UpdateInstantiateConfigProposal.Amino | AddBurnTaxExemptionAddressProposal.Amino | RemoveBurnTaxExemptionAddressProposal.Amino;
        type Data = TextProposal.Data | CommunityPoolSpendProposal.Data | ParameterChangeProposal.Data | SoftwareUpgradeProposal.Data | CancelSoftwareUpgradeProposal.Data | ClientUpdateProposal.Data | ClearAdminProposal.Data | ExecuteContractProposal.Data | InstantiateContractProposal.Data | MigrateContractProposal.Data | PinCodesProposal.Data | StoreCodeProposal.Data | SudoContractProposal.Data | UnpinCodesProposal.Data | UpdateAdminProposal.Data | UpdateInstantiateConfigProposal.Data | AddBurnTaxExemptionAddressProposal.Data | RemoveBurnTaxExemptionAddressProposal.Data;
        type Proto = TextProposal.Proto | CommunityPoolSpendProposal.Proto | ParameterChangeProposal.Proto | SoftwareUpgradeProposal.Proto | CancelSoftwareUpgradeProposal.Proto | ClientUpdateProposal.Proto | ClearAdminProposal.Proto | ExecuteContractProposal.Proto | InstantiateContractProposal.Proto | MigrateContractProposal.Proto | PinCodesProposal.Proto | StoreCodeProposal.Proto | SudoContractProposal.Proto | UnpinCodesProposal.Proto | UpdateAdminProposal.Proto | UpdateInstantiateConfigProposal.Proto | AddBurnTaxExemptionAddressProposal.Proto | RemoveBurnTaxExemptionAddressProposal.Proto;
        function fromAmino(amino: Proposal.Content.Amino, isClassic?: boolean): Proposal.Content;
        function fromData(data: Proposal.Content.Data, isClassic?: boolean): Proposal.Content;
        function fromProto(anyProto: Any, isClassic?: boolean): Proposal.Content;
    }
    interface Amino {
        content: Content.Amino;
        id: string;
        status: number;
        final_tally_result: {
            yes: string;
            abstain: string;
            no: string;
            no_with_veto: string;
        };
        submit_time: string;
        deposit_end_time: string;
        total_deposit: Coins.Amino;
        voting_start_time: string;
        voting_end_time: string;
    }
    interface Data {
        content: Content.Data;
        proposal_id: string;
        status: string;
        final_tally_result: {
            yes: string;
            abstain: string;
            no: string;
            no_with_veto: string;
        };
        submit_time: string;
        deposit_end_time: string;
        total_deposit: Coins.Data;
        voting_start_time: string;
        voting_end_time: string;
    }
    type Proto = Proposal_pb;
}
