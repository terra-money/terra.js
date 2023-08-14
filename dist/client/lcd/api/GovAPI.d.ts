import { BaseAPI } from './BaseAPI';
import { Proposal, AccAddress, Coins, Dec, Int, Deposit, Vote, Tx } from '../../../core';
import { APIParams, Pagination, PaginationOptions } from '../APIRequester';
import { LCDClient } from '../LCDClient';
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
export interface DepositParams {
    /** Minimum deposit to enter voting. */
    min_deposit: Coins;
    /** Amount of time (in seconds) a proposal can take to acquire the necessary deposits to enter voting stage, after being submitted. */
    max_deposit_period: number;
}
export declare namespace DepositParams {
    interface Data {
        min_deposit: Coins.Data;
        max_deposit_period: string;
    }
}
export interface VotingParams {
    /** Amount of time (in seconds) a proposal can take to get votes once voting has begun. */
    voting_period: number;
}
export declare namespace VotingParams {
    interface Data {
        voting_period: string;
    }
}
export interface TallyParams {
    /** Ratio of total staked tokens that need to have participated in the vote. */
    quorum: Dec;
    /** Ratio of participating tokens that have voted in favor of the proposal. */
    threshold: Dec;
    /** Ratio of participating votes with `NoWithVeto` (after excluding `Abstain` votes) to veto the proposal. */
    veto_threshold: Dec;
}
export declare namespace TallyParams {
    interface Data {
        quorum: string;
        threshold: string;
        veto_threshold: string;
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
    lcd: LCDClient;
    constructor(lcd: LCDClient);
    /**
     * Gets all proposals.
     */
    proposals(params?: Partial<PaginationOptions & APIParams>): Promise<[Proposal[], Pagination]>;
    /**
     * Get a specific proposal by its ID
     * @param proposalId proposal's ID
     */
    proposal(proposalId: number, params?: APIParams): Promise<Proposal>;
    /**
     * Get the proposal's proposer
     * @param proposalId proposal's ID
     */
    proposer(proposalId: number): Promise<AccAddress>;
    /**
     * Get the proposal's initial deposit
     * @param proposalId proposal's ID
     */
    initialDeposit(proposalId: number): Promise<Coins>;
    /**
     * Get the deposits for a proposal
     * @param proposalId proposal's ID
     */
    deposits(proposalId: number, _params?: Partial<PaginationOptions & APIParams>): Promise<[Deposit[], Pagination]>;
    searchProposalCreationTx(proposalId: number): Promise<Tx.Data>;
    /**
     * Get the current votes for a proposal
     * @param proposalId proposal's ID
     */
    votes(proposalId: number, _params?: Partial<PaginationOptions & APIParams>): Promise<[Vote[], Pagination]>;
    /**
     * Gets the current tally for a proposal.
     * @param proposalId proposal's ID
     */
    tally(proposalId: number, params?: APIParams): Promise<Tally>;
    /** Gets the Gov module's deposit parameters */
    depositParameters(params?: APIParams): Promise<DepositParams>;
    /** Gets the Gov module's voting parameters */
    votingParameters(params?: APIParams): Promise<VotingParams>;
    /** Gets teh Gov module's tally parameters */
    tallyParameters(params?: APIParams): Promise<TallyParams>;
    /** Gets the Gov module's current parameters  */
    parameters(params?: APIParams): Promise<GovParams>;
}
