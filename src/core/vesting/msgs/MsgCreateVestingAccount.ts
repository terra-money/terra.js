import { Coins } from '../../Coins';
import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgCreateVestingAccount as MsgCreateVestingAccount_pb } from '@terra-money/terra.proto/cosmos/vesting/v1beta1/tx';
import Long from 'long';

/**
 * MsgCreateVestingAccount defines a message that enables creating a vesting account.
 */
export class MsgCreateVestingAccount extends JSONSerializable<
  MsgCreateVestingAccount.Amino,
  MsgCreateVestingAccount.Data,
  MsgCreateVestingAccount.Proto
> {
  public amount: Coins;

  /**
   * @param from_address sender's address
   * @param to_address recipient's address
   * @param amount value of the transaction
   */
  constructor(
    public from_address: AccAddress,
    public to_address: AccAddress,
    amount: Coins.Input,
    public end_time: number,
    public delayed: boolean
  ) {
    super();
    this.amount = new Coins(amount);
  }

  public static fromAmino(
    data: MsgCreateVestingAccount.Amino,
    isClassic?: boolean
  ): MsgCreateVestingAccount {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const {
      value: { from_address, to_address, amount, end_time, delayed },
    } = data;
    return new MsgCreateVestingAccount(
      from_address,
      to_address,
      Coins.fromAmino(amount),
      Number.parseInt(end_time),
      delayed
    );
  }

  public toAmino(isClassic?: boolean): MsgCreateVestingAccount.Amino {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { from_address, to_address, amount, end_time, delayed } = this;
    return {
      type: 'cosmos-sdk/MsgCreateVestingAccount',
      value: {
        from_address,
        to_address,
        amount: amount.toAmino(),
        end_time: end_time.toFixed(),
        delayed,
      },
    };
  }

  public static fromData(
    data: MsgCreateVestingAccount.Data,
    isClassic?: boolean
  ): MsgCreateVestingAccount {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { from_address, to_address, amount, end_time, delayed } = data;

    return new MsgCreateVestingAccount(
      from_address,
      to_address,
      Coins.fromData(amount),
      Number.parseInt(end_time),
      delayed
    );
  }

  public toData(isClassic?: boolean): MsgCreateVestingAccount.Data {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { from_address, to_address, amount, end_time, delayed } = this;
    return {
      '@type': '/cosmos.vesting.v1beta1.MsgCreateVestingAccount',
      from_address,
      to_address,
      amount: amount.toData(),
      end_time: end_time.toFixed(),
      delayed,
    };
  }

  public static fromProto(
    proto: MsgCreateVestingAccount.Proto,
    isClassic?: boolean
  ): MsgCreateVestingAccount {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return new MsgCreateVestingAccount(
      proto.fromAddress,
      proto.toAddress,
      Coins.fromProto(proto.amount),
      proto.endTime.toNumber(),
      proto.delayed
    );
  }

  public toProto(isClassic?: boolean): MsgCreateVestingAccount.Proto {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { from_address, to_address, amount, end_time, delayed } = this;
    return MsgCreateVestingAccount_pb.fromPartial({
      fromAddress: from_address,
      toAddress: to_address,
      amount: amount.toProto(),
      endTime: Long.fromNumber(end_time),
      delayed,
    });
  }

  public packAny(isClassic?: boolean): Any {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return Any.fromPartial({
      typeUrl: '/cosmos.vesting.v1beta1.MsgCreateVestingAccount',
      value: MsgCreateVestingAccount_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgCreateVestingAccount {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return MsgCreateVestingAccount.fromProto(
      MsgCreateVestingAccount_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgCreateVestingAccount {
  export interface Amino {
    type: 'cosmos-sdk/MsgCreateVestingAccount';
    value: {
      from_address: AccAddress;
      to_address: AccAddress;
      amount: Coins.Amino;
      end_time: string;
      delayed: boolean;
    };
  }

  export interface Data {
    '@type': '/cosmos.vesting.v1beta1.MsgCreateVestingAccount';
    from_address: AccAddress;
    to_address: AccAddress;
    amount: Coins.Data;
    end_time: string;
    delayed: boolean;
  }

  export type Proto = MsgCreateVestingAccount_pb;
}
