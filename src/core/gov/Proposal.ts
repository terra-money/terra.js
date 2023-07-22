import { Coins } from '../Coins';
import { Int } from '../numeric';
import { JSONSerializable } from '../../util/json';
import { CommunityPoolSpendProposal } from '../distribution/proposals';
import { ParameterChangeProposal } from '../params/proposals';
import { ClientUpdateProposal } from '../ibc/proposals';
import { TextProposal } from './proposals';
import {
  SoftwareUpgradeProposal,
  CancelSoftwareUpgradeProposal,
} from '../upgrade/proposals';
import {
  ClearAdminProposal,
  ExecuteContractProposal,
  InstantiateContractProposal,
  MigrateContractProposal,
  PinCodesProposal,
  StoreCodeProposal,
  SudoContractProposal,
  UnpinCodesProposal,
  UpdateAdminProposal,
  UpdateInstantiateConfigProposal,
} from '../wasm/proposals';
import {
  AddBurnTaxExemptionAddressProposal,
  RemoveBurnTaxExemptionAddressProposal,
} from '../treasury/proposals';
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

  public toAmino(isClassic?: boolean): Proposal.Amino {
    const { status, final_tally_result } = this;

    return {
      id: this.id.toFixed(),
      content: this.content.toAmino(isClassic),
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
    | ParameterChangeProposal
    | SoftwareUpgradeProposal
    | CancelSoftwareUpgradeProposal
    | ClientUpdateProposal
    | ClearAdminProposal
    | ExecuteContractProposal
    | InstantiateContractProposal
    | MigrateContractProposal
    | PinCodesProposal
    | StoreCodeProposal
    | SudoContractProposal
    | UnpinCodesProposal
    | UpdateAdminProposal
    | UpdateInstantiateConfigProposal
    | AddBurnTaxExemptionAddressProposal
    | RemoveBurnTaxExemptionAddressProposal;

  export namespace Content {
    export type Amino =
      | TextProposal.Amino
      | CommunityPoolSpendProposal.Amino
      | ParameterChangeProposal.Amino
      | SoftwareUpgradeProposal.Amino
      | CancelSoftwareUpgradeProposal.Amino
      | ClientUpdateProposal.Amino
      | ClearAdminProposal.Amino
      | ExecuteContractProposal.Amino
      | InstantiateContractProposal.Amino
      | MigrateContractProposal.Amino
      | PinCodesProposal.Amino
      | StoreCodeProposal.Amino
      | SudoContractProposal.Amino
      | UnpinCodesProposal.Amino
      | UpdateAdminProposal.Amino
      | UpdateInstantiateConfigProposal.Amino
      | AddBurnTaxExemptionAddressProposal.Amino
      | RemoveBurnTaxExemptionAddressProposal.Amino;

    export type Data =
      | TextProposal.Data
      | CommunityPoolSpendProposal.Data
      | ParameterChangeProposal.Data
      | SoftwareUpgradeProposal.Data
      | CancelSoftwareUpgradeProposal.Data
      | ClientUpdateProposal.Data
      | ClearAdminProposal.Data
      | ExecuteContractProposal.Data
      | InstantiateContractProposal.Data
      | MigrateContractProposal.Data
      | PinCodesProposal.Data
      | StoreCodeProposal.Data
      | SudoContractProposal.Data
      | UnpinCodesProposal.Data
      | UpdateAdminProposal.Data
      | UpdateInstantiateConfigProposal.Data
      | AddBurnTaxExemptionAddressProposal.Data
      | RemoveBurnTaxExemptionAddressProposal.Data;

    export type Proto =
      | TextProposal.Proto
      | CommunityPoolSpendProposal.Proto
      | ParameterChangeProposal.Proto
      | SoftwareUpgradeProposal.Proto
      | CancelSoftwareUpgradeProposal.Proto
      | ClientUpdateProposal.Proto
      | ClearAdminProposal.Proto
      | ExecuteContractProposal.Proto
      | InstantiateContractProposal.Proto
      | MigrateContractProposal.Proto
      | PinCodesProposal.Proto
      | StoreCodeProposal.Proto
      | SudoContractProposal.Proto
      | UnpinCodesProposal.Proto
      | UpdateAdminProposal.Proto
      | UpdateInstantiateConfigProposal.Proto
      | AddBurnTaxExemptionAddressProposal.Proto
      | RemoveBurnTaxExemptionAddressProposal.Proto;

    export function fromAmino(amino: Proposal.Content.Amino): Proposal.Content {
      switch (amino.type) {
        case 'gov/TextProposal':
        case 'cosmos-sdk/TextProposal':
          return TextProposal.fromAmino(amino);
        case 'distribution/CommunityPoolSpendProposal':
        case 'cosmos-sdk/CommunityPoolSpendProposal':
          return CommunityPoolSpendProposal.fromAmino(amino);
        case 'params/ParameterChangeProposal':
        case 'cosmos-sdk/ParameterChangeProposal':
          return ParameterChangeProposal.fromAmino(amino);
        case 'upgrade/SoftwareUpgradeProposal':
        case 'cosmos-sdk/SoftwareUpgradeProposal':
          return SoftwareUpgradeProposal.fromAmino(amino);
        case 'upgrade/CancelSoftwareUpgradeProposal':
        case 'cosmos-sdk/CancelSoftwareUpgradeProposal':
          return CancelSoftwareUpgradeProposal.fromAmino(amino);
        case 'ibc/ClientUpdateProposal':
          return ClientUpdateProposal.fromAmino(amino);
        case 'wasm/ClearAdminProposal':
          return ClearAdminProposal.fromAmino(amino);
        case 'wasm/ExecuteContractProposal':
          return ExecuteContractProposal.fromAmino(amino);
        case 'wasm/InstantiateContractProposal':
          return InstantiateContractProposal.fromAmino(amino);
        case 'wasm/MigrateContractProposal':
          return MigrateContractProposal.fromAmino(amino);
        case 'wasm/PinCodesProposal':
          return PinCodesProposal.fromAmino(amino);
        case 'wasm/StoreCodeProposal':
          return StoreCodeProposal.fromAmino(amino);
        case 'wasm/SudoContractProposal':
          return SudoContractProposal.fromAmino(amino);
        case 'wasm/UnpinCodesProposal':
          return UnpinCodesProposal.fromAmino(amino);
        case 'wasm/UpdateAdminProposal':
          return UpdateAdminProposal.fromAmino(amino);
        case 'wasm/UpdateInstantiateConfigProposal':
          return UpdateInstantiateConfigProposal.fromAmino(amino);
        // Classic only
        case 'treasury/AddBurnTaxExemptionAddressProposal':
          return AddBurnTaxExemptionAddressProposal.fromAmino(amino);
        case 'treasury/RemoveBurnTaxExemptionAddressProposal':
          return RemoveBurnTaxExemptionAddressProposal.fromAmino(amino);
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
        case '/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal':
          return SoftwareUpgradeProposal.fromData(data);
        case '/cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal':
          return CancelSoftwareUpgradeProposal.fromData(data);
        case '/ibc.core.client.v1.ClientUpdateProposal':
          return ClientUpdateProposal.fromData(data);
        case '/cosmwasm.wasm.v1.ClearAdminProposal':
          return ClearAdminProposal.fromData(data);
        case '/cosmwasm.wasm.v1.ExecuteContractProposal':
          return ExecuteContractProposal.fromData(data);
        case '/cosmwasm.wasm.v1.InstantiateContractProposal':
          return InstantiateContractProposal.fromData(data);
        case '/cosmwasm.wasm.v1.MigrateContractProposal':
          return MigrateContractProposal.fromData(data);
        case '/cosmwasm.wasm.v1.PinCodesProposal':
          return PinCodesProposal.fromData(data);
        case '/cosmwasm.wasm.v1.StoreCodeProposal':
          return StoreCodeProposal.fromData(data);
        case '/cosmwasm.wasm.v1.SudoContractProposal':
          return SudoContractProposal.fromData(data);
        case '/cosmwasm.wasm.v1.UnpinCodesProposal':
          return UnpinCodesProposal.fromData(data);
        case '/cosmwasm.wasm.v1.UpdateAdminProposal':
          return UpdateAdminProposal.fromData(data);
        case '/cosmwasm.wasm.v1.UpdateInstantiateConfigProposal':
          return UpdateInstantiateConfigProposal.fromData(data);
        case '/terra.treasury.v1beta1.AddBurnTaxExemptionAddressProposal':
          return AddBurnTaxExemptionAddressProposal.fromData(data);
        case '/terra.treasury.v1beta1.RemoveBurnTaxExemptionAddressProposal':
          return RemoveBurnTaxExemptionAddressProposal.fromData(data);
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
        case '/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal':
          return SoftwareUpgradeProposal.unpackAny(anyProto);
        case '/cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal':
          return CancelSoftwareUpgradeProposal.unpackAny(anyProto);
        case '/ibc.core.client.v1.ClientUpdateProposal':
          return ClientUpdateProposal.unpackAny(anyProto);
        case '/cosmwasm.wasm.v1.ClearAdminProposal':
          return ClearAdminProposal.unpackAny(anyProto);
        case '/cosmwasm.wasm.v1.ExecuteContractProposal':
          return ExecuteContractProposal.unpackAny(anyProto);
        case '/cosmwasm.wasm.v1.InstantiateContractProposal':
          return InstantiateContractProposal.unpackAny(anyProto);
        case '/cosmwasm.wasm.v1.MigrateContractProposal':
          return MigrateContractProposal.unpackAny(anyProto);
        case '/cosmwasm.wasm.v1.PinCodesProposal':
          return PinCodesProposal.unpackAny(anyProto);
        case '/cosmwasm.wasm.v1.StoreCodeProposal':
          return StoreCodeProposal.unpackAny(anyProto);
        case '/cosmwasm.wasm.v1.SudoContractProposal':
          return SudoContractProposal.unpackAny(anyProto);
        case '/cosmwasm.wasm.v1.UnpinCodesProposal':
          return UnpinCodesProposal.unpackAny(anyProto);
        case '/cosmwasm.wasm.v1.UpdateAdminProposal':
          return UpdateAdminProposal.unpackAny(anyProto);
        case '/cosmwasm.wasm.v1.UpdateInstantiateConfigProposal':
          return UpdateInstantiateConfigProposal.unpackAny(anyProto);
        case '/terra.treasury.v1beta1.AddBurnTaxExemptionAddressProposal':
          return AddBurnTaxExemptionAddressProposal.unpackAny(anyProto);
        case '/terra.treasury.v1beta1.RemoveBurnTaxExemptionAddressProposal':
          return RemoveBurnTaxExemptionAddressProposal.unpackAny(anyProto);
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
