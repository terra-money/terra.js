import { JSONSerializable } from '../../../util/json';
import { AccAddress, ValAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgDelegateFeedConsent as MsgDelegateFeedConsent_pb } from '@terra-money/legacy.proto/terra/oracle/v1beta1/tx';

/**
 * A **feeeder** is an account which is responsible for signing transactions with Oracle vote
 * and prevote messages on behalf of the validator. The blockchain will reject
 * [[MsgExchangeRateVote]] and [[MsgExchangeRatePrevote]] messages in transactions
 * signed by an
 * account different than the registered feeder.
 *
 * The following message registers a validator's feeder address.
 */
export class MsgDelegateFeedConsent extends JSONSerializable<
  MsgDelegateFeedConsent.Amino,
  MsgDelegateFeedConsent.Data,
  MsgDelegateFeedConsent.Proto
> {
  /**
   * @param operator validator's operator address
   * @param delegate account address to set to feeder
   */
  constructor(public operator: ValAddress, public delegate: AccAddress) {
    super();
  }

  public static fromAmino(
    data: MsgDelegateFeedConsent.Amino,
    isClassic?: boolean
  ): MsgDelegateFeedConsent {
    if (!isClassic) {
      throw new Error('Not supported for the network');
    }

    const {
      value: { operator, delegate },
    } = data;
    return new MsgDelegateFeedConsent(operator, delegate);
  }

  public toAmino(isClassic?: boolean): MsgDelegateFeedConsent.Amino {
    if (!isClassic) {
      throw new Error('Not supported for the network');
    }

    const { operator, delegate } = this;
    return {
      type: 'oracle/MsgDelegateFeedConsent',
      value: {
        operator,
        delegate,
      },
    };
  }

  public static fromData(
    data: MsgDelegateFeedConsent.Data,
    isClassic?: boolean
  ): MsgDelegateFeedConsent {
    if (!isClassic) {
      throw new Error('Not supported for the network');
    }

    const { operator, delegate } = data;
    return new MsgDelegateFeedConsent(operator, delegate);
  }

  public toData(isClassic?: boolean): MsgDelegateFeedConsent.Data {
    if (!isClassic) {
      throw new Error('Not supported for the network');
    }
    const { operator, delegate } = this;
    return {
      '@type': '/terra.oracle.v1beta1.MsgDelegateFeedConsent',
      operator,
      delegate,
    };
  }

  public static fromProto(
    proto: MsgDelegateFeedConsent.Proto,
    isClassic?: boolean
  ): MsgDelegateFeedConsent {
    if (!isClassic) {
      throw new Error('Not supported for the network');
    }

    return new MsgDelegateFeedConsent(proto.operator, proto.delegate);
  }

  public toProto(isClassic?: boolean): MsgDelegateFeedConsent.Proto {
    if (!isClassic) {
      throw new Error('Not supported for the network');
    }

    const { operator, delegate } = this;
    return MsgDelegateFeedConsent_pb.fromPartial({
      delegate,
      operator,
    });
  }

  public packAny(isClassic?: boolean): Any {
    if (!isClassic) {
      throw new Error('Not supported for the network');
    }
    return Any.fromPartial({
      typeUrl: '/terra.oracle.v1beta1.MsgDelegateFeedConsent',
      value: MsgDelegateFeedConsent_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgDelegateFeedConsent {
    if (!isClassic) {
      throw new Error('Not supported for the network');
    }
    return MsgDelegateFeedConsent.fromProto(
      MsgDelegateFeedConsent_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgDelegateFeedConsent {
  export interface Amino {
    type: 'oracle/MsgDelegateFeedConsent';
    value: {
      operator: ValAddress;
      delegate: AccAddress;
    };
  }

  export interface Data {
    '@type': '/terra.oracle.v1beta1.MsgDelegateFeedConsent';
    operator: ValAddress;
    delegate: AccAddress;
  }

  export type Proto = MsgDelegateFeedConsent_pb;
}
