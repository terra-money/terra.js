import { JSONSerializable } from '../../../util/json';
import { ValAddress } from '../../strings';

/**
 * A validator can be jailed by the blockchain if misbehavior is detected, such as
 * double-signing or having missed too many vote periods in the Oracle ballot.
 *
 * This is done to protect delegators' funds from getting slashed further, until the
 * validator's issues have been addressed. A jailed validator cannot participate in
 * block rewards, and must be manually unjailed by submitting this message.
 */
export class MsgUnjail extends JSONSerializable<MsgUnjail.Data> {
  /**
   * @param address validator's operator address
   */
  constructor(public address: ValAddress) {
    super();
  }

  public static fromData(data: MsgUnjail.Data): MsgUnjail {
    const {
      value: { address },
    } = data;
    return new MsgUnjail(address);
  }

  public toData(): MsgUnjail.Data {
    const { address } = this;
    return {
      type: 'cosmos/MsgUnjail',
      value: {
        address,
      },
    };
  }
}

export namespace MsgUnjail {
  export interface Data {
    type: 'cosmos/MsgUnjail';
    value: {
      address: ValAddress;
    };
  }
}
