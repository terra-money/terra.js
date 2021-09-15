import { Coins } from '../Coins';
import { Int } from '../numeric';
import { JSONSerializable } from '../../util/json';
import { CommunityPoolSpendProposal } from '../distribution/proposals';
import { ParameterChangeProposal } from '../params/proposals';
import { TextProposal } from './proposals';
import {
  Proposal as Proposal_pb,
  ProposalStatus,
  TallyResult,
  proposalStatusFromJSON,
  proposalStatusToJSON,
} from '@terra-money/terra.proto/cosmos/gov/v1beta1/gov';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import * as Long from 'long';

/**
 * Stores information pertaining to a submitted proposal, such as its status and time of
 * the voting period
 */
export class Proposal extends JSONSerializable<
  Proposal.Amino,
  Proposal.Data,
  Proposal.Proto
> {
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
  constructor(
    public id: number,
    public content: Proposal.Content,
    public status: ProposalStatus,
    public final_tally_result: Proposal.FinalTallyResult,
    public submit_time: Date,
    public deposit_end_time: Date,
    public total_deposit: Coins,
    public voting_start_time: Date,
    public voting_end_time: Date
  ) {
    super();
  }

  public static fromAmino(data: Proposal.Amino): Proposal {
    const {
      id,
      content,
      status,
      final_tally_result,
      submit_time,
      deposit_end_time,
      total_deposit,
      voting_start_time,
      voting_end_time,
    } = data;

    return new Proposal(
      Number.parseInt(id),
      Proposal.Content.fromAmino(content),
      status,
      {
        yes: new Int(final_tally_result.yes || 0),
        no: new Int(final_tally_result.no || 0),
        abstain: new Int(final_tally_result.abstain || 0),
        no_with_veto: new Int(final_tally_result.no_with_veto || 0),
      },
      new Date(submit_time),
      new Date(deposit_end_time),
      Coins.fromAmino(total_deposit),
      new Date(voting_start_time),
      new Date(voting_end_time)
    );
  }

  public toAmino(): Proposal.Amino {
    const { status, final_tally_result } = this;

    return {
      id: this.id.toFixed(),
      content: this.content.toAmino(),
      status: status,
      final_tally_result: {
        yes: final_tally_result.yes.toFixed(),
        no: final_tally_result.no.toFixed(),
        abstain: final_tally_result.abstain.toFixed(),
        no_with_veto: final_tally_result.no_with_veto.toFixed(),
      },
      submit_time: this.submit_time.toISOString(),
      deposit_end_time: this.deposit_end_time.toISOString(),
      total_deposit: this.total_deposit.toAmino(),
      voting_start_time: this.voting_start_time.toISOString(),
      voting_end_time: this.voting_end_time.toISOString(),
    };
  }

  public static fromData(data: Proposal.Data): Proposal {
    const {
      proposal_id,
      content,
      status,
      final_tally_result,
      submit_time,
      deposit_end_time,
      total_deposit,
      voting_start_time,
      voting_end_time,
    } = data;

    return new Proposal(
      Number.parseInt(proposal_id),
      Proposal.Content.fromData(content),
      proposalStatusFromJSON(status),
      {
        yes: new Int(final_tally_result?.yes || 0),
        no: new Int(final_tally_result?.no || 0),
        abstain: new Int(final_tally_result?.abstain || 0),
        no_with_veto: new Int(final_tally_result?.no_with_veto || 0),
      },
      new Date(submit_time),
      new Date(deposit_end_time),
      Coins.fromData(total_deposit),
      new Date(voting_start_time),
      new Date(voting_end_time)
    );
  }

  public toData(): Proposal.Data {
    const { status, final_tally_result } = this;

    return {
      proposal_id: this.id.toFixed(),
      content: this.content.toData(),
      status: proposalStatusToJSON(status),
      final_tally_result: {
        yes: final_tally_result.yes.toString(),
        no: final_tally_result.no.toString(),
        abstain: final_tally_result.abstain.toString(),
        no_with_veto: final_tally_result.no_with_veto.toString(),
      },
      submit_time: this.submit_time.toISOString(),
      deposit_end_time: this.deposit_end_time.toISOString(),
      total_deposit: this.total_deposit.toData(),
      voting_start_time: this.voting_start_time.toISOString(),
      voting_end_time: this.voting_end_time.toISOString(),
    };
  }

  public static fromProto(data: Proposal.Proto): Proposal {
    const id = data.proposalId;
    const content = data.content;
    const status = data.status;
    const final_tally_result = data.finalTallyResult;
    const submit_time = data.submitTime;
    const deposit_end_time = data.depositEndTime;
    const total_deposit = data.totalDeposit;
    const voting_start_time = data.votingStartTime;
    const voting_end_time = data.votingEndTime;

    return new Proposal(
      id.toNumber(),
      Proposal.Content.fromProto(content as Any),
      status,
      {
        yes: new Int(final_tally_result?.yes || 0),
        no: new Int(final_tally_result?.no || 0),
        abstain: new Int(final_tally_result?.abstain || 0),
        no_with_veto: new Int(final_tally_result?.noWithVeto || 0),
      },
      submit_time as Date,
      deposit_end_time as Date,
      Coins.fromProto(total_deposit),
      voting_start_time as Date,
      voting_end_time as Date
    );
  }

  public toProto(): Proposal.Proto {
    const { status, final_tally_result } = this;

    let ftr: TallyResult | undefined;
    if (final_tally_result) {
      ftr = TallyResult.fromPartial({
        yes: final_tally_result.yes.toString(),
        no: final_tally_result.no.toString(),
        abstain: final_tally_result.abstain.toString(),
        noWithVeto: final_tally_result.no_with_veto.toString(),
      });
    }

    return Proposal_pb.fromPartial({
      proposalId: Long.fromNumber(this.id),
      content: this.content.packAny(),
      status,
      finalTallyResult: ftr,
      submitTime: this.submit_time,
      depositEndTime: this.deposit_end_time,
      totalDeposit: this.total_deposit.toProto(),
      votingEndTime: this.voting_end_time,
      votingStartTime: this.voting_start_time,
    });
  }
}

export namespace Proposal {
  export const Status = ProposalStatus;
  export type Status = ProposalStatus;

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
    export type Amino =
      | TextProposal.Amino
      | CommunityPoolSpendProposal.Amino
      | ParameterChangeProposal.Amino;

    export type Data =
      | TextProposal.Data
      | CommunityPoolSpendProposal.Data
      | ParameterChangeProposal.Data;

    export type Proto =
      | TextProposal.Proto
      | CommunityPoolSpendProposal.Proto
      | ParameterChangeProposal.Proto;

    export function fromAmino(amino: Proposal.Content.Amino): Proposal.Content {
      switch (amino.type) {
        case 'gov/TextProposal':
          return TextProposal.fromAmino(amino);
        case 'distribution/CommunityPoolSpendProposal':
          return CommunityPoolSpendProposal.fromAmino(amino);
        case 'params/ParameterChangeProposal':
          return ParameterChangeProposal.fromAmino(amino);
        // case 'upgrade/SoftwareUpgradeProposal':
        // case 'upgrade/CancelSoftwareUpgradeProposal':
      }
    }

    export function fromData(data: Proposal.Content.Data): Proposal.Content {
      switch (data['@type']) {
        case '/cosmos.gov.v1beta1.TextProposal':
          return TextProposal.fromData(data);
        case '/cosmos.distribution.v1beta1.CommunityPoolSpendProposal':
          return CommunityPoolSpendProposal.fromData(data);
        case '/cosmos.params.v1beta1.ParameterChangeProposal':
          return ParameterChangeProposal.fromData(data);

        // case 'upgrade/SoftwareUpgradeProposal':
        // case 'upgrade/CancelSoftwareUpgradeProposal':
      }
    }

    export function fromProto(anyProto: Any): Proposal.Content {
      const typeUrl = anyProto.typeUrl;
      switch (typeUrl) {
        case '/cosmos.gov.v1beta1.TextProposal':
          return TextProposal.unpackAny(anyProto);
        case '/cosmos.distribution.v1beta1.CommunityPoolSpendProposal':
          return CommunityPoolSpendProposal.unpackAny(anyProto);
        case '/cosmos.params.v1beta1.ParameterChangeProposal':
          return ParameterChangeProposal.unpackAny(anyProto);

        // case 'upgrade/SoftwareUpgradeProposal':
        // case 'upgrade/CancelSoftwareUpgradeProposal':
      }

      throw `Proposal content ${typeUrl} not recognized`;
    }
  }

  export interface Amino {
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

  export interface Data {
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

  export type Proto = Proposal_pb;
}
