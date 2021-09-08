import { Coins } from '../Coins';
import { Int } from '../numeric';
import { JSONSerializable } from '../../util/json';
import { CommunityPoolSpendProposal } from '../distribution/proposals';
import { ParameterChangeProposal } from '../params/proposals';
import { TextProposal } from './proposals';

/**
 * Stores information pertaining to a submitted proposal, such as its status and time of
 * the voting period
 */
export class Proposal extends JSONSerializable<Proposal.Data> {
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
  constructor(
    public id: number,
    public content: Proposal.Content,
    public proposal_status: Proposal.Status,
    public final_tally_result: Proposal.FinalTallyResult | undefined,
    public submit_time: Date,
    public deposit_end_time: Date,
    public total_deposit: Coins,
    public voting_start_time: Date,
    public voting_end_time: Date
  ) {
    super();
  }

  public static fromData(data: Proposal.Data): Proposal {
    const {
      id,
      content,
      proposal_status,
      final_tally_result,
      submit_time,
      deposit_end_time,
      total_deposit,
      voting_start_time,
      voting_end_time,
    } = data;

    let ftr:
      | {
          yes: Int;
          no: Int;
          abstain: Int;
          no_with_veto: Int;
        }
      | undefined;

    if (final_tally_result) {
      ftr = {
        yes: new Int(final_tally_result.yes),
        no: new Int(final_tally_result.no),
        abstain: new Int(final_tally_result.abstain),
        no_with_veto: new Int(final_tally_result.no_with_veto),
      };
    }

    return new Proposal(
      Number.parseInt(id),
      Proposal.Content.fromData(content),
      Proposal.StatusMapping[proposal_status],
      ftr,
      new Date(submit_time),
      new Date(deposit_end_time),
      Coins.fromData(total_deposit),
      new Date(voting_start_time),
      new Date(voting_end_time)
    );
  }

  public toData(): Proposal.Data {
    const { proposal_status, final_tally_result } = this;

    let ftr:
      | {
          yes: string;
          no: string;
          abstain: string;
          no_with_veto: string;
        }
      | undefined;

    if (final_tally_result) {
      ftr = {
        yes: final_tally_result.yes.toString(),
        no: final_tally_result.no.toString(),
        abstain: final_tally_result.abstain.toString(),
        no_with_veto: final_tally_result.no_with_veto.toString(),
      };
    }

    return {
      id: this.id.toFixed(),
      content: this.content.toData(),
      proposal_status: Object.keys(Proposal.StatusMapping).indexOf(
        proposal_status
      ),
      final_tally_result: ftr,
      submit_time: this.submit_time.toISOString(),
      deposit_end_time: this.deposit_end_time.toISOString(),
      total_deposit: this.total_deposit.toData(),
      voting_start_time: this.voting_start_time.toISOString(),
      voting_end_time: this.voting_end_time.toISOString(),
    };
  }
}

export namespace Proposal {
  export interface FinalTallyResult {
    yes: Int;
    abstain: Int;
    no: Int;
    no_with_veto: Int;
  }

  export type Content =
    | TextProposal
    | CommunityPoolSpendProposal
    | ParameterChangeProposal;

  export namespace Content {
    export type Data =
      | TextProposal.Data
      | CommunityPoolSpendProposal.Data
      | ParameterChangeProposal.Data;

    export function fromData(data: Proposal.Content.Data): Proposal.Content {
      switch (data.type) {
        case 'gov/TextProposal':
          return TextProposal.fromData(data);
        case 'distribution/CommunityPoolSpendProposal':
          return CommunityPoolSpendProposal.fromData(data);
        case 'params/ParameterChangeProposal':
          return ParameterChangeProposal.fromData(data);
        // case 'upgrade/SoftwareUpgradeProposal':
        // case 'upgrade/CancelSoftwareUpgradeProposal':
      }
    }
  }

  export enum Status {
    NIL = '',
    DEPOSIT_PERIOD = 'DepositPeriod',
    VOTING_PERIOD = 'VotingPeriod',
    PASSED = 'Passed',
    REJECTED = 'Rejected',
    FAILED = 'Failed',
  }

  export const StatusMapping: { [key: number]: Status } = {
    0: Status.NIL,
    1: Status.DEPOSIT_PERIOD,
    2: Status.VOTING_PERIOD,
    3: Status.PASSED,
    4: Status.REJECTED,
    5: Status.FAILED,
  };

  export interface Data {
    content: Content.Data;
    id: string;
    proposal_status: number;
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
