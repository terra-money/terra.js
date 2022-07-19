import { JSONSerializable } from '../../../util/json';
import { Coins } from '../../Coins';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { BasicAllowance as BasicAllowance_pb } from '@terra-money/terra.proto/cosmos/feegrant/v1beta1/feegrant';

/**
 * BasicAllowance implements Allowance with a one-time grant of tokens
 * that optionally expires. The grantee can use up to SpendLimit to cover fees.
 */
export class BasicAllowance extends JSONSerializable<
  BasicAllowance.Amino,
  BasicAllowance.Data,
  BasicAllowance.Proto
> {
  public spend_limit?: Coins;

  /**
   * @param spend_limit spend_limit allowed to be spent as fee
   * @param expiration allowance's expiration
   */
  constructor(spend_limit?: Coins.Input, public expiration?: Date) {
    super();
    let hasNotPositive = false;
    if (spend_limit) {
      this.spend_limit = new Coins(spend_limit);
      this.spend_limit.map(c => {
        // isPositive() from decimal.js returns true when the amount is 0.
        // but Coins.IsAllPositive() from cosmos-sdk will return false in same case.
        // so we use lessThanorEquenTo(0) instead of isPositive() == false
        if (c.amount.lessThanOrEqualTo(0)) {
          hasNotPositive = true;
        }
      });
    }
    if (spend_limit && hasNotPositive) {
      throw Error('spend_limit must be positive');
    }
  }

  public static fromAmino(
    data: BasicAllowance.Amino,
    _?: boolean
  ): BasicAllowance {
    _;
    const {
      value: { spend_limit, expiration },
    } = data;

    return new BasicAllowance(
      spend_limit ? Coins.fromAmino(spend_limit) : undefined,
      expiration ? new Date(expiration) : undefined
    );

    new BasicAllowance('');
  }

  public toAmino(isClassic?: boolean): BasicAllowance.Amino {
    const { spend_limit, expiration } = this;
    return {
      type: isClassic ? 'feegrant/BasicAllowance' : 'cosmos-sdk/BasicAllowance',
      value: {
        spend_limit: spend_limit?.toAmino() || undefined,
        expiration:
          expiration?.toISOString().replace(/\.000Z$/, 'Z') || undefined,
      },
    };
  }

  public static fromData(
    proto: BasicAllowance.Data,
    _?: boolean
  ): BasicAllowance {
    _;
    const { spend_limit, expiration } = proto;
    return new BasicAllowance(
      spend_limit ? Coins.fromData(spend_limit) : undefined,
      expiration ? new Date(expiration) : undefined
    );
  }

  public toData(_?: boolean): BasicAllowance.Data {
    _;
    const { spend_limit, expiration } = this;
    return {
      '@type': '/cosmos.feegrant.v1beta1.BasicAllowance',
      spend_limit: spend_limit?.toData() || undefined,
      expiration:
        expiration?.toISOString().replace(/\.000Z$/, 'Z') || undefined,
    };
  }

  public static fromProto(
    proto: BasicAllowance.Proto,
    _?: boolean
  ): BasicAllowance {
    _;
    return new BasicAllowance(
      Coins.fromProto(proto.spendLimit),
      proto.expiration ? (proto.expiration as Date) : undefined
    );
  }

  public toProto(_?: boolean): BasicAllowance.Proto {
    _;
    const { spend_limit, expiration } = this;
    return BasicAllowance_pb.fromPartial({
      expiration,
      spendLimit: spend_limit?.toProto() || undefined,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.feegrant.v1beta1.BasicAllowance',
      value: BasicAllowance_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): BasicAllowance {
    return BasicAllowance.fromProto(
      BasicAllowance_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace BasicAllowance {
  export interface Amino {
    type: 'feegrant/BasicAllowance' | 'cosmos-sdk/BasicAllowance';
    value: {
      spend_limit?: Coins.Amino;
      expiration?: string;
    };
  }

  export interface Data {
    '@type': '/cosmos.feegrant.v1beta1.BasicAllowance';
    spend_limit?: Coins.Data;
    expiration?: string;
  }

  export type Proto = BasicAllowance_pb;
}
