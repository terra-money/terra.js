import { Coins } from '../../Coins';
import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgDeposit as MsgDeposit_pb } from '@terra-money/terra.proto/cosmos/gov/v1beta1/tx';
import * as Long from 'long';

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
      proto.proposalId.toNumber(),
      proto.depositor,
      Coins.fromProto(proto.amount)
    );
  }

  public toProto(): MsgDeposit.Proto {
    const { proposal_id, depositor, amount } = this;
    return MsgDeposit_pb.fromPartial({
      amount: amount.toProto(),
      depositor,
      proposalId: Long.fromNumber(proposal_id),
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.gov.v1beta1.MsgDeposit',
      value: MsgDeposit_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgDeposit {
    return MsgDeposit.fromProto(MsgDeposit_pb.decode(msgAny.value));
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
