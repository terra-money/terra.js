import { JSONSerializable } from '../../../util/json';
import { Coins } from '../../Coins';
import { AccAddress } from '../../bech32';

/**
 * Proposal that disburses funds from the Distribution module's community pool to the
 * specified recipient if passed.
 */
export class CommunityPoolSpendProposal extends JSONSerializable<CommunityPoolSpendProposal.Data> {
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

  public static fromData(
    data: CommunityPoolSpendProposal.Data
  ): CommunityPoolSpendProposal {
    const {
      value: { title, description, recipient, amount },
    } = data;
    return new CommunityPoolSpendProposal(
      title,
      description,
      recipient,
      Coins.fromData(amount)
    );
  }

  public toData(): CommunityPoolSpendProposal.Data {
    const { title, description, recipient, amount } = this;
    return {
      type: 'distribution/CommunityPoolSpendProposal',
      value: {
        title,
        description,
        recipient,
        amount: amount.toData(),
      },
    };
  }

  public static fromProto(
    proto: CommunityPoolSpendProposal.Proto
  ): CommunityPoolSpendProposal {
    const { title, description, recipient, amount } = proto;
    return new CommunityPoolSpendProposal(
      title,
      description,
      recipient,
      Coins.fromData(amount)
    );
  }

  public toProto(): CommunityPoolSpendProposal.Proto {
    const { title, description, recipient, amount } = this;
    return {
      '@type': '/cosmos.distribution.v1beta1.CommunityPoolSpendProposal',
      title,
      description,
      recipient,
      amount: amount.toData(),
    };
  }
}

export namespace CommunityPoolSpendProposal {
  export interface Data {
    type: 'distribution/CommunityPoolSpendProposal';
    value: {
      title: string;
      description: string;
      recipient: AccAddress;
      amount: Coins.Data;
    };
  }

  export interface Proto {
    '@type': '/cosmos.distribution.v1beta1.CommunityPoolSpendProposal';
    title: string;
    description: string;
    recipient: AccAddress;
    amount: Coins.Data;
  }
}
