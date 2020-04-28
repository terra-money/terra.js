import { BaseAPI } from './BaseAPI';
import { Proposal, AccAddress, Coins, Dec, Int } from '../../../core';
import {
  DepositParams,
  VotingParams,
  TallyParams,
} from '../../../core/gov/params';

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
  public async proposals(): Promise<Proposal[]> {
    return this.c
      .get<Proposal.Data[]>(`/gov/proposals`)
      .then(d => d.result.map(Proposal.fromData));
  }

  /**
   * Get a specific proposal by its ID
   * @param proposalId proposal's ID
   */
  public async proposal(proposalId: number): Promise<Proposal> {
    return this.c
      .get<Proposal.Data>(`/gov/proposals/${proposalId}`)
      .then(d => Proposal.fromData(d.result));
  }

  /**
   * Get the proposal's proposer
   * @param proposalId proposal's ID
   */
  public async proposer(proposalId: number): Promise<AccAddress> {
    return this.c
      .get<{ proposer: AccAddress }>(`/gov/proposals/${proposalId}/proposer`)
      .then(d => d.result.proposer);
  }

  /**
   * Get the deposits for a proposal
   * @param proposalId proposal's ID
   */
  public async deposits(proposalId: number): Promise<any> {
    return this.c
      .get(`/gov/proposals/${proposalId}/deposits`)
      .then(d => d.result);
  }

  /**
   * Get the current votes for a proposal
   * @param proposalId proposal's ID
   */
  public async votes(proposalId: number): Promise<any> {
    return this.c
      .get(`/gov/proposals/${proposalId}/deposits`)
      .then(d => d.result);
  }

  /**
   * Gets the current tally for a proposal.
   * @param proposalId proposal's ID
   */
  public async tally(proposalId: number): Promise<Tally> {
    return this.c
      .get<Tally.Data>(`/gov/proposals/${proposalId}/tally`)
      .then(d => d.result)
      .then(d => ({
        yes: new Int(d.yes),
        no: new Int(d.no),
        no_with_veto: new Int(d.no_with_veto),
        abstain: new Int(d.abstain),
      }));
  }

  /** Gets the Gov module's deposit parameters */
  public async depositParameters(): Promise<DepositParams> {
    return this.c
      .get<DepositParams.Data>(`/gov/parameters/deposit`)
      .then(d => d.result)
      .then(d => ({
        max_deposit_period: Number.parseInt(d.max_deposit_period),
        min_deposit: Coins.fromData(d.min_deposit),
      }));
  }

  /** Gets the Gov module's voting parameters */
  public async votingParameters(): Promise<VotingParams> {
    return this.c
      .get<VotingParams.Data>(`/gov/parameters/voting`)
      .then(d => d.result)
      .then(d => ({ voting_period: Number.parseInt(d.voting_period) }));
  }

  /** Gets teh Gov module's tally parameters */
  public async tallyParameters(): Promise<TallyParams> {
    return this.c
      .get<TallyParams.Data>(`/gov/parameters/tallying`)
      .then(d => d.result)
      .then(d => ({
        quorum: new Dec(d.quorum),
        veto: new Dec(d.veto),
        threshold: new Dec(d.threshold),
      }));
  }

  /** Gets the Gov module's current parameters  */
  public async parameters(): Promise<GovParams> {
    const [deposit_params, voting_params, tally_params] = await Promise.all([
      this.depositParameters(),
      this.votingParameters(),
      this.tallyParameters(),
    ]);
    return {
      deposit_params,
      voting_params,
      tally_params,
    };
  }
}
