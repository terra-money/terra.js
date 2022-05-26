import { Coins } from '../../Coins';
import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgDeposit as MsgDeposit_pb } from '@terra-money/terra.proto/cosmos/gov/v1beta1/tx';
import * as Long from 'long';

/**
 * Add a deposit for a proposal
 */
export class MsgDeposit extends JSONSerializable<
  MsgDeposit.Amino,
  MsgDeposit.Data,
  MsgDeposit.Proto
> {
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

  public static fromAmino(data: MsgDeposit.Amino, _?: boolean): MsgDeposit {
    _;
    const {
      value: { proposal_id, depositor, amount },
    } = data;
    return new MsgDeposit(
      Number.parseInt(proposal_id),
      depositor,
      Coins.fromAmino(amount)
    );
  }

  public toAmino(isClassic?: boolean): MsgDeposit.Amino {
    const { proposal_id, depositor, amount } = this;
    return {
      type: isClassic ? 'gov/MsgDeposit' : 'cosmos-sdk/MsgDeposit',
      value: {
        proposal_id: proposal_id.toString(),
        depositor,
        amount: amount.toAmino(),
      },
    };
  }

  public static fromData(data: MsgDeposit.Data, _?: boolean): MsgDeposit {
    _;
    const { proposal_id, depositor, amount } = data;
    return new MsgDeposit(
      Number.parseInt(proposal_id),
      depositor,
      Coins.fromData(amount)
    );
  }

  public toData(_?: boolean): MsgDeposit.Data {
    _;
    const { proposal_id, depositor, amount } = this;
    return {
      '@type': '/cosmos.gov.v1beta1.MsgDeposit',
      proposal_id: proposal_id.toString(),
      depositor,
      amount: amount.toData(),
    };
  }

  public static fromProto(proto: MsgDeposit.Proto, _?: boolean): MsgDeposit {
    _;
    return new MsgDeposit(
      proto.proposalId.toNumber(),
      proto.depositor,
      Coins.fromProto(proto.amount)
    );
  }

  public toProto(_?: boolean): MsgDeposit.Proto {
    _;
    const { proposal_id, depositor, amount } = this;
    return MsgDeposit_pb.fromPartial({
      amount: amount.toProto(),
      depositor,
      proposalId: Long.fromNumber(proposal_id),
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.gov.v1beta1.MsgDeposit',
      value: MsgDeposit_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgDeposit {
    return MsgDeposit.fromProto(MsgDeposit_pb.decode(msgAny.value), isClassic);
  }
}

export namespace MsgDeposit {
  export interface Amino {
    type: 'gov/MsgDeposit' | 'cosmos-sdk/MsgDeposit';
    value: {
      proposal_id: string;
      depositor: AccAddress;
      amount: Coins.Amino;
    };
  }

  export interface Data {
    '@type': '/cosmos.gov.v1beta1.MsgDeposit';
    proposal_id: string;
    depositor: AccAddress;
    amount: Coins.Data;
  }

  export type Proto = MsgDeposit_pb;
}
