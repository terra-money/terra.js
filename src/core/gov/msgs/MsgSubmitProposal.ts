import { Coins } from '../../Coins';
import { Proposal } from '../Proposal';
import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/src/google/protobuf/any_pb';
import { MsgSubmitProposal as MsgSubmitProposal_pb } from '@terra-money/terra.proto/src/cosmos/gov/v1beta1/tx_pb';

/**
 * Submit a proposal alongside an initial deposit.
 */
export class MsgSubmitProposal extends JSONSerializable<MsgSubmitProposal.Data> {
  public initial_deposit: Coins;

  /**
   * @param content proposal content to submit
   * @param initial_deposit deposit provided
   * @param proposer proposer's account address
   */
  constructor(
    public content: Proposal.Content,
    initial_deposit: Coins.Input,
    public proposer: AccAddress
  ) {
    super();
    this.initial_deposit = new Coins(initial_deposit);
  }

  public static fromData(data: MsgSubmitProposal.Data): MsgSubmitProposal {
    const {
      value: { content, initial_deposit, proposer },
    } = data;
    return new MsgSubmitProposal(
      Proposal.Content.fromData(content),
      Coins.fromData(initial_deposit),
      proposer
    );
  }

  public toData(): MsgSubmitProposal.Data {
    const { content, initial_deposit, proposer } = this;
    return {
      type: 'gov/MsgSubmitProposal',
      value: {
        content: content.toData(),
        initial_deposit: initial_deposit.toData(),
        proposer,
      },
    };
  }

  public static fromProto(proto: MsgSubmitProposal.Proto): MsgSubmitProposal {
    return new MsgSubmitProposal(
      Proposal.Content.fromProto(proto.getContent() as any),
      Coins.fromProto(proto.getInitialDepositList()),
      proto.getProposer()
    );
  }

  public toProto(): MsgSubmitProposal.Proto {
    const { content, initial_deposit, proposer } = this;
    const msgSubmitProposalProto = new MsgSubmitProposal_pb();
    msgSubmitProposalProto.setContent(content.packAny() as any);
    msgSubmitProposalProto.setInitialDepositList(initial_deposit.toProto());
    msgSubmitProposalProto.setProposer(proposer);
    return msgSubmitProposalProto;
  }

  public packAny(): Any {
    const msgAny = new Any();
    msgAny.setTypeUrl('/cosmos.gov.v1beta1.MsgSubmitProposal');
    msgAny.setValue(this.toProto().serializeBinary());
    return msgAny;
  }

  public static unpackAny(msgAny: Any): MsgSubmitProposal {
    return MsgSubmitProposal.fromProto(
      MsgSubmitProposal_pb.deserializeBinary(msgAny.getValue_asU8())
    );
  }
}

export namespace MsgSubmitProposal {
  export interface Data {
    type: 'gov/MsgSubmitProposal';
    value: {
      content: Proposal.Content.Data;
      initial_deposit: Coins.Data;
      proposer: AccAddress;
    };
  }

  export type Proto = MsgSubmitProposal_pb;
}
