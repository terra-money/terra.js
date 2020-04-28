import { Denom } from '../..';
import { JSONSerializable } from '../../../util/json';
import { AccAddress, ValAddress } from '../..';

/**
 * In order to prevent validators from copying each others' price votes, voting occurs
 * in 2 stages. Firstly, you must pre-commit to a price by submitting a
 * MsgExchangeRatePrevote containing a hash, and then reveal your price in the
 * subsequent vote period.
 *
 * The vote hash reported in the prevote must match the hash of the vote's data in order
 * for the vote to count. Otherwise, it is automatically a miss.
 */
export class MsgExchangeRatePrevote extends JSONSerializable<
  MsgExchangeRatePrevote.Data
> {
  /**
   * @param hash vote hash
   * @param denom denom for reporting the exchange rate
   * @param feeder validator's feeder account address
   * @param validator validator's operator address
   */
  constructor(
    public hash: string,
    public denom: Denom,
    public feeder: AccAddress,
    public validator: ValAddress
  ) {
    super();
  }

  public static fromData(
    data: MsgExchangeRatePrevote.Data
  ): MsgExchangeRatePrevote {
    const {
      value: { hash, denom, feeder, validator },
    } = data;
    return new MsgExchangeRatePrevote(hash, denom, feeder, validator);
  }

  public toData(): MsgExchangeRatePrevote.Data {
    const { hash, denom, feeder, validator } = this;
    return {
      type: 'oracle/MsgExchangeRatePrevote',
      value: {
        hash,
        denom,
        feeder,
        validator,
      },
    };
  }
}

export namespace MsgExchangeRatePrevote {
  export interface Data {
    type: 'oracle/MsgExchangeRatePrevote';
    value: {
      hash: string;
      denom: Denom;
      feeder: AccAddress;
      validator: ValAddress;
    };
  }
}
