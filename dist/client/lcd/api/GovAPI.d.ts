import { BaseAPI } from './BaseAPI';
import { Proposal, AccAddress, Int } from '../../../core';
import { DepositParams, VotingParams, TallyParams } from '../../../core/gov/params';
export interface GovParams {
    /**
     * Current deposit parameters
     */
    deposit_params: DepositParams;
    /**
     * current voting parameters
     */
    voting_params: VotingParams;
    /**
     * current tally paramaters
     */
    tally_params: TallyParams;
}
export declare namespace GovParams {
    interface Data {
        deposit_params: DepositParams.Data;
        voting_params: VotingParams.Data;
        tally_params: TallyParams.Data;
    }
}
export interface Tally {
    yes: Int;
    no: Int;
    abstain: Int;
    no_with_veto: Int;
}
export declare namespace Tally {
    interface Data {
        yes: string;
        no: string;
        abstain: string;
        no_with_veto: string;
    }
}
export declare class GovAPI extends BaseAPI {
    /**
     * Gets all proposals.
     */
    proposals(): Promise<Proposal[]>;
    /**
     * Get a specific proposal by its ID
     * @param proposalId proposal's ID
     */
    proposal(proposalId: number): Promise<Proposal>;
    /**
     * Get the proposal's proposer
     * @param proposalId proposal's ID
     */
    proposer(proposalId: number): Promise<AccAddress>;
    /**
     * Get the deposits for a proposal
     * @param proposalId proposal's ID
     */
    deposits(proposalId: number): Promise<any>;
    /**
     * Get the current votes for a proposal
     * @param proposalId proposal's ID
     */
    votes(proposalId: number): Promise<any>;
    /**
     * Gets the current tally for a proposal.
     * @param proposalId proposal's ID
     */
    tally(proposalId: number): Promise<Tally>;
    /** Gets the Gov module's deposit parameters */
    depositParameters(): Promise<DepositParams>;
    /** Gets the Gov module's voting parameters */
    votingParameters(): Promise<VotingParams>;
    /** Gets teh Gov module's tally parameters */
    tallyParameters(): Promise<TallyParams>;
    /** Gets the Gov module's current parameters  */
    parameters(): Promise<GovParams>;
}
