import { Coins } from '../../Coins';
import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/src/google/protobuf/any_pb';
import { MsgDeposit as MsgDeposit_pb } from '@terra-money/terra.proto/src/cosmos/gov/v1beta1/tx_pb';

/**
 * Add a deposit for a proposal
 */
export class MsgDeposit extends JSONSerializable<MsgDeposit.Data> {
  public amount: Coins;
  /**
   * @param proposal_id Id of porposal to deposit to
   * @param depositor depositor's account address
   * @param amount amount to deposit
   */
  constructor(
    public proposal_id: number,
    public depositor: AccAddress,
    amount: Coins.Input
  ) {
    super();
    this.amount = new Coins(amount);
  }

  public static fromData(data: MsgDeposit.Data): MsgDeposit {
    const {
      value: { proposal_id, depositor, amount },
    } = data;
    return new MsgDeposit(
      Number.parseInt(proposal_id),
      depositor,
      Coins.fromData(amount)
    );
  }

  public toData(): MsgDeposit.Data {
    const { proposal_id, depositor, amount } = this;
    return {
      type: 'gov/MsgDeposit',
      value: {
        proposal_id: proposal_id.toString(),
        depositor,
        amount: amount.toData(),
      },
    };
  }

  public static fromProto(proto: MsgDeposit.Proto): MsgDeposit {
    return new MsgDeposit(
      proto.getProposalId(),
      proto.getDepositor(),
      Coins.fromProto(proto.getAmountList())
    );
  }

  public toProto(): MsgDeposit.Proto {
    const { proposal_id, depositor, amount } = this;
    const msgDepositProto = new MsgDeposit_pb();
    msgDepositProto.setProposalId(proposal_id);
    msgDepositProto.setDepositor(depositor);
    msgDepositProto.setAmountList(amount.toProto());
    return msgDepositProto;
  }

  public packAny(): Any {
    const msgAny = new Any();
    msgAny.setTypeUrl('/cosmos.gov.v1beta1.MsgDeposit');
    msgAny.setValue(this.toProto().serializeBinary());
    return msgAny;
  }

  public static unpackAny(msgAny: Any): MsgDeposit {
    return MsgDeposit.fromProto(
      MsgDeposit_pb.deserializeBinary(msgAny.getValue_asU8())
    );
  }
}

export namespace MsgDeposit {
  export interface Data {
    type: 'gov/MsgDeposit';
    value: {
      proposal_id: string;
      depositor: AccAddress;
      amount: Coins.Data;
    };
  }

  export type Proto = MsgDeposit_pb;
}
