import { JSONSerializable } from '../../../util/json';
import { Coins } from '../../Coins';
import { Any } from '@terra-money/terra.proto/src/google/protobuf/any_pb';
import { BasicAllowance as BasicAllowance_pb } from '@terra-money/terra.proto/src/cosmos/feegrant/v1beta1/feegrant_pb';
import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';

/**
 * BasicAllowance implements Allowance with a one-time grant of tokens
 * that optionally expires. The grantee can use up to SpendLimit to cover fees.
 */
export class BasicAllowance extends JSONSerializable<BasicAllowance.Data> {
  public spend_limit: Coins;

  /**
   * @param spend_limit spend_limit allowed to be spent as fee
   * @param expiration allowance's expiration
   */
  constructor(spend_limit: Coins.Input, public expiration: Date) {
    super();

    this.spend_limit = new Coins(spend_limit);
  }

  public static fromData(data: BasicAllowance.Data): BasicAllowance {
    const {
      value: { spend_limit, expiration },
    } = data;

    return new BasicAllowance(
      Coins.fromData(spend_limit),
      new Date(expiration)
    );
  }

  public toData(): BasicAllowance.Data {
    const { spend_limit, expiration } = this;
    return {
      type: 'feegrant/BasicAllowance',
      value: {
        spend_limit: spend_limit.toData(),
        expiration: expiration.toISOString().replace(/\.000Z$/, 'Z'),
      },
    };
  }

  public static fromProto(proto: BasicAllowance.Proto): BasicAllowance {
    return new BasicAllowance(
      Coins.fromProto(proto.getSpendLimitList()),
      proto.getExpiration()?.toDate() as Date
    );
  }

  public toProto(): BasicAllowance.Proto {
    const { spend_limit, expiration } = this;
    const proto = new BasicAllowance_pb();
    proto.setSpendLimitList(spend_limit.toProto());
    proto.setExpiration(Timestamp.fromDate(expiration));
    return proto;
  }

  public packAny(): Any {
    const msgAny = new Any();
    msgAny.setTypeUrl('/cosmos.feegrant.v1beta1.BasicAllowance');
    msgAny.setValue(this.toProto().serializeBinary());
    return msgAny;
  }

  public static unpackAny(msgAny: Any): BasicAllowance {
    return BasicAllowance.fromProto(
      BasicAllowance_pb.deserializeBinary(msgAny.getValue_asU8())
    );
  }
}

export namespace BasicAllowance {
  export interface Data {
    type: 'feegrant/BasicAllowance';
    value: {
      spend_limit: Coins.Data;
      expiration: string;
    };
  }

  export type Proto = BasicAllowance_pb;
}
