import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgDonateAllVestingTokens as MsgDonateAllVestingTokens_pb } from '@terra-money/terra.proto/cosmos/vesting/v1beta1/tx';

/**
 * DonateAllVestingTokens defines a method that enables donating all vesting
 */
export class MsgDonateAllVestingTokens extends JSONSerializable<
  MsgDonateAllVestingTokens.Amino,
  MsgDonateAllVestingTokens.Data,
  MsgDonateAllVestingTokens.Proto
> {
  /**
   * @param from_address donor's address
   */
  constructor(public from_address: AccAddress) {
    super();
  }

  public static fromAmino(
    data: MsgDonateAllVestingTokens.Amino,
    isClassic?: boolean
  ): MsgDonateAllVestingTokens {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return new MsgDonateAllVestingTokens(data.value.from_address);
  }

  public toAmino(isClassic?: boolean): MsgDonateAllVestingTokens.Amino {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return {
      type: 'cosmos-sdk/MsgDonateAllVestingTokens',
      value: {
        from_address: this.from_address,
      },
    };
  }

  public static fromData(
    data: MsgDonateAllVestingTokens.Data,
    isClassic?: boolean
  ): MsgDonateAllVestingTokens {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return new MsgDonateAllVestingTokens(data.from_address);
  }

  public toData(isClassic?: boolean): MsgDonateAllVestingTokens.Data {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return {
      '@type': '/cosmos.vesting.v1beta1.MsgDonateAllVestingTokens',
      from_address: this.from_address,
    };
  }

  public static fromProto(
    proto: MsgDonateAllVestingTokens.Proto,
    isClassic?: boolean
  ): MsgDonateAllVestingTokens {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return new MsgDonateAllVestingTokens(proto.fromAddress);
  }

  public toProto(isClassic?: boolean): MsgDonateAllVestingTokens.Proto {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return MsgDonateAllVestingTokens_pb.fromPartial({
      fromAddress: this.from_address,
    });
  }

  public packAny(isClassic?: boolean): Any {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return Any.fromPartial({
      typeUrl: '/cosmos.vesting.v1beta1.MsgDonateAllVestingTokens',
      value: MsgDonateAllVestingTokens_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgDonateAllVestingTokens {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return MsgDonateAllVestingTokens.fromProto(
      MsgDonateAllVestingTokens_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgDonateAllVestingTokens {
  export interface Amino {
    type: 'cosmos-sdk/MsgDonateAllVestingTokens';
    value: {
      from_address: AccAddress;
    };
  }

  export interface Data {
    '@type': '/cosmos.vesting.v1beta1.MsgDonateAllVestingTokens';
    from_address: AccAddress;
  }

  export type Proto = MsgDonateAllVestingTokens_pb;
}
