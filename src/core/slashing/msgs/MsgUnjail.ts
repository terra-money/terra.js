import { JSONSerializable } from '../../../util/json';
import { ValAddress } from '../../bech32';

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
      type: 'slashing/MsgUnjail',
      value: {
        address,
      },
    };
  }

  public static fromProto(proto: MsgUnjail.Proto): MsgUnjail {
    const { address } = proto;
    return new MsgUnjail(address);
  }

  public toProto(): MsgUnjail.Proto {
    const { address } = this;
    return {
      '@type': '/cosmos.slashing.v1beta1.MsgUnjail',
      address,
    };
  }
}

export namespace MsgUnjail {
  export interface Data {
    type: 'slashing/MsgUnjail';
    value: {
      address: ValAddress;
    };
  }

  export interface Proto {
    '@type': '/cosmos.slashing.v1beta1.MsgUnjail';
    address: ValAddress;
  }
}
