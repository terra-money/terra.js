import { JSONSerializable } from '../../../util/json';
import { AccAddress, ValAddress } from '../../bech32';

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
}

export namespace MsgDelegateFeedConsent {
  export interface Data {
    type: 'oracle/MsgDelegateFeedConsent';
    value: {
      operator: ValAddress;
      delegate: AccAddress;
    };
  }
}
