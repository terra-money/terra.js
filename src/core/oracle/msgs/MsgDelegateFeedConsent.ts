import { JSONSerializable } from '../../../util/json';
import { AccAddress, ValAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/src/google/protobuf/any_pb';
import { MsgDelegateFeedConsent as MsgDelegateFeedConsent_pb } from '@terra-money/terra.proto/src/terra/oracle/v1beta1/tx_pb';

/**
 * A **feeeder** is an account which is responsible for signing transactions with Oracle vote
 * and prevote messages on behalf of the validator. The blockchain will reject
 * [[MsgExchangeRateVote]] and [[MsgExchangeRatePrevote]] messages in transactions
 * signed by an
 * account different than the registered feeder.
 *
 * The following message registers a validator's feeder address.
 */
export class MsgDelegateFeedConsent extends JSONSerializable<MsgDelegateFeedConsent.Data> {
  /**
   * @param operator validator's operator address
   * @param delegate account address to set to feeder
   */
  constructor(public operator: ValAddress, public delegate: AccAddress) {
    super();
  }

  public static fromData(
    data: MsgDelegateFeedConsent.Data
  ): MsgDelegateFeedConsent {
    const {
      value: { operator, delegate },
    } = data;
    return new MsgDelegateFeedConsent(operator, delegate);
  }

  public toData(): MsgDelegateFeedConsent.Data {
    const { operator, delegate } = this;
    return {
      type: 'oracle/MsgDelegateFeedConsent',
      value: {
        operator,
        delegate,
      },
    };
  }

  public static fromProto(
    proto: MsgDelegateFeedConsent.Proto
  ): MsgDelegateFeedConsent {
    return new MsgDelegateFeedConsent(proto.getOperator(), proto.getDelegate());
  }

  public toProto(): MsgDelegateFeedConsent.Proto {
    const { operator, delegate } = this;
    const msgDelegateFeedConsentProto = new MsgDelegateFeedConsent_pb();
    msgDelegateFeedConsentProto.setOperator(operator);
    msgDelegateFeedConsentProto.setDelegate(delegate);
    return msgDelegateFeedConsentProto;
  }

  public packAny(): Any {
    const msgAny = new Any();
    msgAny.setTypeUrl('/terra.oracle.v1beta1.MsgDelegateFeedConsent');
    msgAny.setValue(this.toProto().serializeBinary());
    return msgAny;
  }

  public static unpackAny(msgAny: Any): MsgDelegateFeedConsent {
    return MsgDelegateFeedConsent.fromProto(
      MsgDelegateFeedConsent_pb.deserializeBinary(msgAny.getValue_asU8())
    );
  }
}

export namespace MsgDelegateFeedConsent {
  export interface Data {
    type: 'oracle/MsgDelegateFeedConsent';
    value: {
      operator: ValAddress;
      delegate: AccAddress;
    };
  }

  export type Proto = MsgDelegateFeedConsent_pb;
}
