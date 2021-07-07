import { JSONSerializable } from '../../../util/json';
import { AccAddress, ValAddress } from '../../bech32';

/**
 * Aggregate analog of MsgExchangeRatePrevote
 */
export class MsgAggregateExchangeRatePrevote extends JSONSerializable<MsgAggregateExchangeRatePrevote.Data> {
  /**
   * @param hash vote hash
   * @param feeder validator's feeder account address
   * @param validator validator's operator address
   */
  constructor(
    public hash: string,
    public feeder: AccAddress,
    public validator: ValAddress
  ) {
    super();
  }

  public static fromData(
    data: MsgAggregateExchangeRatePrevote.Data
  ): MsgAggregateExchangeRatePrevote {
    const {
      value: { hash, feeder, validator },
    } = data;
    return new MsgAggregateExchangeRatePrevote(hash, feeder, validator);
  }

  public toData(): MsgAggregateExchangeRatePrevote.Data {
    const { hash, feeder, validator } = this;
    return {
      type: 'oracle/MsgAggregateExchangeRatePrevote',
      value: {
        hash,
        feeder,
        validator,
      },
    };
  }
}

export namespace MsgAggregateExchangeRatePrevote {
  export interface Data {
    type: 'oracle/MsgAggregateExchangeRatePrevote';
    value: {
      hash: string;
      feeder: AccAddress;
      validator: ValAddress;
    };
  }
}
