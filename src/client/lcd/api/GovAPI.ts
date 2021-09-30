import { BaseAPI } from './BaseAPI';
import {
  Proposal,
  AccAddress,
  Coins,
  Dec,
  Int,
  Deposit,
  Vote,
} from '../../../core';
import { APIParams } from '../APIRequester';

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

export namespace GovParams {
  export interface Data {
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

export namespace DepositParams {
  export interface Data {
    min_deposit: Coins.Data;
    max_deposit_period: string;
  }
}

export interface VotingParams {
  /** Amount of time (in seconds) a proposal can take to get votes once voting has begun. */
  voting_period: number;
}

export namespace VotingParams {
  export interface Data {
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

export namespace TallyParams {
  export interface Data {
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

export namespace Tally {
  export interface Data {
    yes: string;
    no: string;
    abstain: string;
    no_with_veto: string;
  }
}

export class GovAPI extends BaseAPI {
  /**
   * Gets all proposals.
   */
  public async proposals(params: APIParams = {}): Promise<Proposal[]> {
    return this.c
      .get<Proposal.Data[]>(`/gov/proposals`, params)
      .then(d => d.result.map(Proposal.fromData));
  }

  /**
   * Get a specific proposal by its ID
   * @param proposalId proposal's ID
   */
  public async proposal(
    proposalId: number,
    params: APIParams = {}
  ): Promise<Proposal> {
    return this.c
      .get<Proposal.Data>(`/gov/proposals/${proposalId}`, params)
      .then(d => Proposal.fromData(d.result));
  }

  /**
   * Get the proposal's proposer
   * @param proposalId proposal's ID
   */
  public async proposer(
    proposalId: number,
    params: APIParams = {}
  ): Promise<AccAddress> {
    return this.c
      .get<{ proposer: AccAddress }>(
        `/gov/proposals/${proposalId}/proposer`,
        params
      )
      .then(d => d.result.proposer);
  }

  /**
   * Get the deposits for a proposal
   * @param proposalId proposal's ID
   */
  public async deposits(
    proposalId: number,
    params: APIParams = {}
  ): Promise<Deposit[]> {
    return this.c
      .get<Deposit.Data[]>(`/gov/proposals/${proposalId}/deposits`, params)
      .then(d => d.result.map(Deposit.fromData));
  }

  /**
   * Get the current votes for a proposal
   * @param proposalId proposal's ID
   */
  public async votes(
    proposalId: number,
    params: APIParams = {}
  ): Promise<Vote[]> {
    return this.c
      .get<Vote.Data[]>(`/gov/proposals/${proposalId}/votes`, params)
      .then(d => d.result.map(Vote.fromData));
  }

  /**
   * Gets the current tally for a proposal.
   * @param proposalId proposal's ID
   */
  public async tally(
    proposalId: number,
    params: APIParams = {}
  ): Promise<Tally> {
    return this.c
      .get<Tally.Data>(`/gov/proposals/${proposalId}/tally`, params)
      .then(({ result: d }) => ({
        yes: new Int(d.yes),
        no: new Int(d.no),
        no_with_veto: new Int(d.no_with_veto),
        abstain: new Int(d.abstain),
      }));
  }

  /** Gets the Gov module's deposit parameters */
  public async depositParameters(
    params: APIParams = {}
  ): Promise<DepositParams> {
    return this.c
      .get<DepositParams.Data>(`/gov/parameters/deposit`, params)
      .then(({ result: d }) => ({
        max_deposit_period: Number.parseInt(d.max_deposit_period),
        min_deposit: Coins.fromData(d.min_deposit),
      }));
  }

  /** Gets the Gov module's voting parameters */
  public async votingParameters(params: APIParams = {}): Promise<VotingParams> {
    return this.c
      .get<VotingParams.Data>(`/gov/parameters/voting`, params)
      .then(({ result: d }) => ({
        voting_period: Number.parseInt(d.voting_period),
      }));
  }

  /** Gets teh Gov module's tally parameters */
  public async tallyParameters(params: APIParams = {}): Promise<TallyParams> {
    return this.c
      .get<TallyParams.Data>(`/gov/parameters/tallying`, params)
      .then(({ result: d }) => ({
        quorum: new Dec(d.quorum),
        veto_threshold: new Dec(d.veto_threshold),
        threshold: new Dec(d.threshold),
      }));
  }

  /** Gets the Gov module's current parameters  */
  public async parameters(params: APIParams = {}): Promise<GovParams> {
    const [deposit_params, voting_params, tally_params] = await Promise.all([
      this.depositParameters(params),
      this.votingParameters(params),
      this.tallyParameters(params),
    ]);
    return {
      deposit_params,
      voting_params,
      tally_params,
    };
  }
}
