import { JSONSerializable } from '../../util/json';
import { BaseVestingAccount } from './BaseVestingAccount';
import * as Long from 'long';
import { PublicKey } from '../PublicKey';

import { BaseVestingAccount as BaseVestingAccount_pb } from '@terra-money/terra.proto/cosmos/vesting/v1beta1/vesting';
import { ContinuousVestingAccount as ContinuousVestingAccount_pb } from '@terra-money/terra.proto/cosmos/vesting/v1beta1/vesting';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';

/**
 * ContinuousVestingAccount implements the VestingAccount interface. It
 * continuously vests by unlocking coins linearly with respect to time.
 */
export class ContinuousVestingAccount extends JSONSerializable<
  ContinuousVestingAccount.Amino,
  ContinuousVestingAccount.Data,
  ContinuousVestingAccount.Proto
> {
  /**
   *
   * @param base_vesting_account account information
   * @param start_time vesting start time
   */
  constructor(
    public base_vesting_account: BaseVestingAccount,
    public start_time: number
  ) {
    super();
  }

  public getAccountNumber(): number {
    return this.base_vesting_account.getAccountNumber();
  }

  public getSequenceNumber(): number {
    return this.base_vesting_account.getSequenceNumber();
  }

  public getPublicKey(): PublicKey | null {
    return this.base_vesting_account.base_account.public_key;
  }

  public toAmino(isClassic?: boolean): ContinuousVestingAccount.Amino {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { base_vesting_account, start_time } = this;
    return {
      type: 'cosmos-sdk/ContinuousVestingAccount',
      value: {
        base_vesting_account: base_vesting_account.toAmino().value,
        start_time: start_time.toFixed(),
      },
    };
  }

  public static fromAmino(
    data: ContinuousVestingAccount.Amino,
    isClassic?: boolean
  ): ContinuousVestingAccount {
    const base_vesting_account = BaseVestingAccount.fromAmino({
      type: 'cosmos-sdk/BaseVestingAccount',
      value: data.value.base_vesting_account,
    });
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return new ContinuousVestingAccount(
      base_vesting_account,
      Number.parseInt(data.value.start_time)
    );
  }

  public toData(isClassic?: boolean): ContinuousVestingAccount.Data {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { base_vesting_account, start_time } = this;
    return {
      '@type': '/cosmos.vesting.v1beta1.ContinuousVestingAccount',
      base_vesting_account: base_vesting_account.toData(),
      start_time: start_time.toFixed(),
    };
  }

  public static fromData(
    data: ContinuousVestingAccount.Data,
    isClassic?: boolean
  ): ContinuousVestingAccount {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const base_vesting_account = BaseVestingAccount.fromData({
      '@type': '/cosmos.vesting.v1beta1.BaseVestingAccount',
      ...data.base_vesting_account,
    });

    return new ContinuousVestingAccount(
      base_vesting_account,
      Number.parseInt(data.start_time)
    );
  }

  public toProto(isClassic?: boolean): ContinuousVestingAccount.Proto {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { base_vesting_account, start_time } = this;

    return ContinuousVestingAccount_pb.fromPartial({
      baseVestingAccount: base_vesting_account.toProto(),
      startTime: Long.fromNumber(start_time),
    });
  }

  public static fromProto(
    ContinuousVestingAccountProto: ContinuousVestingAccount.Proto,
    isClassic?: boolean
  ): ContinuousVestingAccount {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const baseVestingAccount = BaseVestingAccount.fromProto(
      ContinuousVestingAccountProto.baseVestingAccount as BaseVestingAccount_pb
    );

    return new ContinuousVestingAccount(
      baseVestingAccount,
      ContinuousVestingAccountProto.startTime.toNumber()
    );
  }

  public packAny(isClassic?: boolean): Any {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return Any.fromPartial({
      typeUrl: '/cosmos.vesting.v1beta1.ContinuousVestingAccount',
      value: ContinuousVestingAccount_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    pubkeyAny: Any,
    isClassic?: boolean
  ): ContinuousVestingAccount {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return ContinuousVestingAccount.fromProto(
      ContinuousVestingAccount_pb.decode(pubkeyAny.value),
      isClassic
    );
  }
}

export namespace ContinuousVestingAccount {
  export interface Amino {
    type: 'cosmos-sdk/ContinuousVestingAccount';
    value: {
      base_vesting_account: BaseVestingAccount.AminoValue;
      start_time: string;
    };
  }

  export interface Data {
    '@type': '/cosmos.vesting.v1beta1.ContinuousVestingAccount';
    base_vesting_account: BaseVestingAccount.DataValue;
    start_time: string;
  }

  export type Proto = ContinuousVestingAccount_pb;
}
