import { Coins } from './Coins';
import { CommunityPoolSpendProposal } from './distribution/proposals';
import { TextProposal } from './gov/proposals';
import { TaxRateUpdateProposal, RewardWeightUpdateProposal } from './treasury/proposals';
import { JSONSerializable } from '../util/json';
import { Int } from './numeric';
import { ParameterChangeProposal } from './params/proposals';
/**
 * Stores information pertaining to a submitted proposal, such as its status and time of
 * the voting period
 */
export declare class Proposal extends JSONSerializable<Proposal.Data> {
    id: number;
    content: Proposal.Content;
    proposal_status: Proposal.Status;
    final_tally_result: Proposal.FinalTallyResult | undefined;
    submit_time: Date;
    deposit_end_time: Date;
    total_deposit: Coins;
    voting_start_time: Date;
    voting_end_time: Date;
    /**
     *
     * @param id proposal's ID
     * @param content content of the proposal
     * @param proposal_status proposal's status
     * @param final_tally_result tally result
     * @param submit_time time proposal was submitted and deposit period started
     * @param deposit_end_time time deposit period will end
     * @param total_deposit amount of coins deposited by all users
     * @param voting_start_time time voting period will start
     * @param voting_end_time time voting period will end
     */
    constructor(id: number, content: Proposal.Content, proposal_status: Proposal.Status, final_tally_result: Proposal.FinalTallyResult | undefined, submit_time: Date, deposit_end_time: Date, total_deposit: Coins, voting_start_time: Date, voting_end_time: Date);
    static fromData(data: Proposal.Data): Proposal;
    toData(): Proposal.Data;
}
export declare namespace Proposal {
    interface FinalTallyResult {
        yes: Int;
        abstain: Int;
        no: Int;
        no_with_veto: Int;
    }
    type Content = TextProposal | CommunityPoolSpendProposal | TaxRateUpdateProposal | RewardWeightUpdateProposal | ParameterChangeProposal;
    namespace Content {
        type Data = TextProposal.Data | CommunityPoolSpendProposal.Data | TaxRateUpdateProposal.Data | RewardWeightUpdateProposal.Data | ParameterChangeProposal.Data;
        function fromData(data: Proposal.Content.Data): Proposal.Content;
    }
    enum Status {
        NIL = "",
        DEPOSIT_PERIOD = "DepositPeriod",
        VOTING_PERIOD = "VotingPeriod",
        PASSED = "Passed",
        REJECTED = "Rejected",
        FAILED = "Failed"
    }
    interface Data {
        content: Content.Data;
        id: string;
        proposal_status: Status;
        final_tally_result?: {
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
}
