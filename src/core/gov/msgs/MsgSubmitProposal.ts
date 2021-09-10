import { Coins } from '../../Coins';
import { Proposal } from '../Proposal';
import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgSubmitProposal as MsgSubmitProposal_pb } from '@terra-money/terra.proto/cosmos/gov/v1beta1/tx';

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
      Proposal.Content.fromProto(proto.content as any),
      Coins.fromProto(proto.initialDeposit),
      proto.proposer
    );
  }

  public toProto(): MsgSubmitProposal.Proto {
    const { content, initial_deposit, proposer } = this;
    return MsgSubmitProposal_pb.fromPartial({
      content: content.packAny(),
      initialDeposit: initial_deposit.toProto(),
      proposer,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.gov.v1beta1.MsgSubmitProposal',
      value: MsgSubmitProposal_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgSubmitProposal {
    return MsgSubmitProposal.fromProto(
      MsgSubmitProposal_pb.decode(msgAny.value)
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
