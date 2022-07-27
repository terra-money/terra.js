import { Period } from '../Period';
import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgCreatePeriodicVestingAccount as MsgCreatePeriodicVestingAccount_pb } from '@terra-money/terra.proto/cosmos/vesting/v1beta1/tx';
import Long from 'long';

/**
 * CreatePeriodicVestingAccount defines a method that enables creating a periodic vesting account.
 */
export class MsgCreatePeriodicVestingAccount extends JSONSerializable<
  MsgCreatePeriodicVestingAccount.Amino,
  MsgCreatePeriodicVestingAccount.Data,
  MsgCreatePeriodicVestingAccount.Proto
> {
  /**
   * @param from_address sender's address
   * @param to_address recipient's address
   */
  constructor(
    public from_address: AccAddress,
    public to_address: AccAddress,
    public start_time: number,
    public vesting_periods: Period[]
  ) {
    super();
  }

  public static fromAmino(
    data: MsgCreatePeriodicVestingAccount.Amino,
    isClassic?: boolean
  ): MsgCreatePeriodicVestingAccount {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const {
      value: { from_address, to_address, start_time, vesting_periods },
    } = data;
    return new MsgCreatePeriodicVestingAccount(
      from_address,
      to_address,
      Number.parseInt(start_time),
      vesting_periods.map(p => Period.fromAmino(p, isClassic))
    );
  }

  public toAmino(isClassic?: boolean): MsgCreatePeriodicVestingAccount.Amino {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { from_address, to_address, start_time, vesting_periods } = this;
    return {
      type: 'cosmos-sdk/MsgCreatePeriodicVestingAccount',
      value: {
        from_address,
        to_address,
        start_time: start_time.toFixed(),
        vesting_periods: vesting_periods.map(p => p.toAmino(isClassic)),
      },
    };
  }

  public static fromData(
    data: MsgCreatePeriodicVestingAccount.Data,
    isClassic?: boolean
  ): MsgCreatePeriodicVestingAccount {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { from_address, to_address, start_time, vesting_periods } = data;

    return new MsgCreatePeriodicVestingAccount(
      from_address,
      to_address,
      Number.parseInt(start_time),
      vesting_periods.map(p => Period.fromData(p, isClassic))
    );
  }

  public toData(isClassic?: boolean): MsgCreatePeriodicVestingAccount.Data {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { from_address, to_address, start_time, vesting_periods } = this;
    return {
      '@type': '/cosmos.vesting.v1beta1.MsgCreatePeriodicVestingAccount',
      from_address,
      to_address,
      start_time: start_time.toFixed(),
      vesting_periods: vesting_periods.map(p => p.toData(isClassic)),
    };
  }

  public static fromProto(
    proto: MsgCreatePeriodicVestingAccount.Proto,
    isClassic?: boolean
  ): MsgCreatePeriodicVestingAccount {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return new MsgCreatePeriodicVestingAccount(
      proto.fromAddress,
      proto.toAddress,
      proto.startTime.toNumber(),
      proto.vestingPeriods.map(p => Period.fromProto(p, isClassic))
    );
  }

  public toProto(isClassic?: boolean): MsgCreatePeriodicVestingAccount.Proto {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { from_address, to_address, start_time, vesting_periods } = this;
    return MsgCreatePeriodicVestingAccount_pb.fromPartial({
      fromAddress: from_address,
      toAddress: to_address,
      startTime: Long.fromNumber(start_time),
      vestingPeriods: vesting_periods.map(p => p.toProto(isClassic)),
    });
  }

  public packAny(isClassic?: boolean): Any {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return Any.fromPartial({
      typeUrl: '/cosmos.vesting.v1beta1.MsgCreatePeriodicVestingAccount',
      value: MsgCreatePeriodicVestingAccount_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgCreatePeriodicVestingAccount {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return MsgCreatePeriodicVestingAccount.fromProto(
      MsgCreatePeriodicVestingAccount_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgCreatePeriodicVestingAccount {
  export interface Amino {
    type: 'cosmos-sdk/MsgCreatePeriodicVestingAccount';
    value: {
      from_address: AccAddress;
      to_address: AccAddress;
      start_time: string;
      vesting_periods: Period.Amino[];
    };
  }

  export interface Data {
    '@type': '/cosmos.vesting.v1beta1.MsgCreatePeriodicVestingAccount';
    from_address: AccAddress;
    to_address: AccAddress;
    start_time: string;
    vesting_periods: Period.Data[];
  }

  export type Proto = MsgCreatePeriodicVestingAccount_pb;
}
