import { JSONSerializable } from '../../../util/json';
import { ValAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/src/google/protobuf/any_pb';
import { MsgUnjail as MsgUnjail_pb } from '@terra-money/terra.proto/src/cosmos/slashing/v1beta1/tx_pb';

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
    return new MsgUnjail(proto.getValidatorAddr());
  }

  public toProto(): MsgUnjail.Proto {
    const { address } = this;
    const msgUnjailProto = new MsgUnjail_pb();
    msgUnjailProto.setValidatorAddr(address);
    return msgUnjailProto;
  }

  public packAny(): Any {
    const msgAny = new Any();
    msgAny.setTypeUrl('/cosmos.slashing.v1beta1.MsgUnjail');
    msgAny.setValue(this.toProto().serializeBinary());
    return msgAny;
  }

  public static unpackAny(msgAny: Any): MsgUnjail {
    return MsgUnjail.fromProto(
      MsgUnjail_pb.deserializeBinary(msgAny.getValue_asU8())
    );
  }
}

export namespace MsgUnjail {
  export interface Data {
    type: 'slashing/MsgUnjail';
    value: {
      address: ValAddress;
    };
  }

  export type Proto = MsgUnjail_pb;
}
