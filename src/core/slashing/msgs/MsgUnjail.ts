import { JSONSerializable } from '../../../util/json';
import { ValAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgUnjail as MsgUnjail_pb } from '@terra-money/terra.proto/cosmos/slashing/v1beta1/tx';

/**
 * A validator can be jailed by the blockchain if misbehavior is detected, such as
 * double-signing or having missed too many vote periods in the Oracle ballot.
 *
 * This is done to protect delegators' funds from getting slashed further, until the
 * validator's issues have been addressed. A jailed validator cannot participate in
 * block rewards, and must be manually unjailed by submitting this message.
 */
export class MsgUnjail extends JSONSerializable<
  MsgUnjail.Amino,
  MsgUnjail.Data,
  MsgUnjail.Proto
> {
  /**
   * @param address validator's operator address
   */
  constructor(public address: ValAddress) {
    super();
  }

  public static fromAmino(data: MsgUnjail.Amino): MsgUnjail {
    const {
      value: { address },
    } = data;
    return new MsgUnjail(address);
  }

  public toAmino(): MsgUnjail.Amino {
    const { address } = this;
    return {
      type: 'slashing/MsgUnjail',
      value: {
        address,
      },
    };
  }

  public static fromData(proto: MsgUnjail.Data): MsgUnjail {
    const { address } = proto;
    return new MsgUnjail(address);
  }

  public toData(): MsgUnjail.Data {
    const { address } = this;
    return {
      '@type': '/cosmos.slashing.v1beta1.MsgUnjail',
      address,
    };
  }

  public static fromProto(proto: MsgUnjail.Proto): MsgUnjail {
    return new MsgUnjail(proto.validatorAddr);
  }

  public toProto(): MsgUnjail.Proto {
    const { address } = this;
    return MsgUnjail_pb.fromPartial({
      validatorAddr: address,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.slashing.v1beta1.MsgUnjail',
      value: MsgUnjail_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgUnjail {
    return MsgUnjail.fromProto(MsgUnjail_pb.decode(msgAny.value));
  }
}

export namespace MsgUnjail {
  export interface Amino {
    type: 'slashing/MsgUnjail';
    value: {
      address: ValAddress;
    };
  }

  export interface Data {
    '@type': '/cosmos.slashing.v1beta1.MsgUnjail';
    address: ValAddress;
  }

  export type Proto = MsgUnjail_pb;
}
