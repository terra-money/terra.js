import { Coins } from '../Coins';
import { Period as Period_pb } from '@terra-money/terra.proto/cosmos/vesting/v1beta1/vesting';

import { JSONSerializable } from '../../util/json';
import * as Long from 'long';
/**
 * Period defines a length of time and amount of coins that will vest.
 */
export class Period extends JSONSerializable<
  Period.Amino,
  Period.Data,
  Period.Proto
> {
  public amount: Coins;

  /**
   * @param length
   * @param amount
   */
  constructor(public length: number, amount: Coins.Input) {
    super();
    this.amount = new Coins(amount);
  }

  public static fromAmino(data: Period.Amino) {
    const { length, amount } = data;
    return new Period(Number.parseInt(length), Coins.fromAmino(amount));
  }

  public toAmino(): Period.Amino {
    const { length, amount } = this;

    const res: Period.Amino = {
      length: length.toFixed(),
      amount: amount.toAmino(),
    };
    return res;
  }

  public static fromData(data: Period.Data) {
    const { length, amount } = data;
    return new Period(Number.parseInt(length), Coins.fromData(amount));
  }

  public toData(): Period.Data {
    const { length, amount } = this;

    const res: Period.Amino = {
      length: length.toFixed(),
      amount: amount.toData(),
    };
    return res;
  }

  public static fromProto(proto: Period.Proto) {
    return new Period(proto.length.toNumber(), Coins.fromProto(proto.amount));
  }

  public toProto(): Period.Proto {
    const { length, amount } = this;
    return Period_pb.fromPartial({
      length: Long.fromNumber(length),
      amount: amount.toProto(),
    });
  }
}

export namespace Period {
  export interface Amino {
    length: string;
    amount: Coins.Amino;
  }

  export interface Data {
    length: string;
    amount: Coins.Data;
  }

  export type Proto = Period_pb;
}
