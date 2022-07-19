import { JSONSerializable } from '../../../util/json';
import { Coins } from '../../Coins';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/legacy.proto/google/protobuf/any';
// there's no difference between two protos
// import { CommunityPoolSpendProposal as CommunityPoolSpendProposal_legacy_pb } from '@terra-money/legacy.proto/cosmos/distribution/v1beta1/distribution';
import { CommunityPoolSpendProposal as CommunityPoolSpendProposal_pb } from '@terra-money/terra.proto/cosmos/distribution/v1beta1/distribution';

/**
 * Proposal that disburses funds from the Distribution module's community pool to the
 * specified recipient if passed.
 */
export class CommunityPoolSpendProposal extends JSONSerializable<
  CommunityPoolSpendProposal.Amino,
  CommunityPoolSpendProposal.Data,
  CommunityPoolSpendProposal.Proto
> {
  public amount: Coins;
  /**
   * @param title proposal's title
   * @param description proposal's description
   * @param recipient recipient address
   * @param amount amount to give recipient
   */
  constructor(
    public title: string,
    public description: string,
    public recipient: AccAddress,
    amount: Coins.Input
  ) {
    super();
    this.amount = new Coins(amount);
  }

  public static fromAmino(
    data: CommunityPoolSpendProposal.Amino,
    _?: boolean
  ): CommunityPoolSpendProposal {
    _;
    const {
      value: { title, description, recipient, amount },
    } = data;
    return new CommunityPoolSpendProposal(
      title,
      description,
      recipient,
      Coins.fromAmino(amount)
    );
  }

  public toAmino(isClassic?: boolean): CommunityPoolSpendProposal.Amino {
    const { title, description, recipient, amount } = this;
    return {
      type: isClassic
        ? 'distribution/CommunityPoolSpendProposal'
        : 'cosmos-sdk/CommunityPoolSpendProposal',
      value: {
        title,
        description,
        recipient,
        amount: amount.toAmino(),
      },
    };
  }

  public static fromData(
    data: CommunityPoolSpendProposal.Data,
    _?: boolean
  ): CommunityPoolSpendProposal {
    _;
    const { title, description, recipient, amount } = data;
    return new CommunityPoolSpendProposal(
      title,
      description,
      recipient,
      Coins.fromData(amount)
    );
  }

  public toData(_?: boolean): CommunityPoolSpendProposal.Data {
    _;
    const { title, description, recipient, amount } = this;
    return {
      '@type': '/cosmos.distribution.v1beta1.CommunityPoolSpendProposal',
      title,
      description,
      recipient,
      amount: amount.toData(),
    };
  }

  public static fromProto(
    proto: CommunityPoolSpendProposal.Proto,
    _?: boolean
  ): CommunityPoolSpendProposal {
    _;
    return new CommunityPoolSpendProposal(
      proto.title,
      proto.description,
      proto.recipient,
      Coins.fromProto(proto.amount)
    );
  }

  public toProto(_?: boolean): CommunityPoolSpendProposal.Proto {
    _;
    const { title, description, recipient, amount } = this;
    return CommunityPoolSpendProposal_pb.fromPartial({
      amount: amount.toProto(),
      description,
      recipient,
      title,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.distribution.v1beta1.CommunityPoolSpendProposal',
      value: CommunityPoolSpendProposal_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): CommunityPoolSpendProposal {
    return CommunityPoolSpendProposal.fromProto(
      CommunityPoolSpendProposal_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace CommunityPoolSpendProposal {
  export interface Amino {
    type:
      | 'distribution/CommunityPoolSpendProposal'
      | 'cosmos-sdk/CommunityPoolSpendProposal';
    value: {
      title: string;
      description: string;
      recipient: AccAddress;
      amount: Coins.Amino;
    };
  }

  export interface Data {
    '@type': '/cosmos.distribution.v1beta1.CommunityPoolSpendProposal';
    title: string;
    description: string;
    recipient: AccAddress;
    amount: Coins.Data;
  }

  export type Proto = CommunityPoolSpendProposal_pb;
}
