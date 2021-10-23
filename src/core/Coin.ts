import { JSONSerializable } from '../util/json';
import { Denom } from './Denom';
import { Dec, Int, Numeric } from './numeric';
import { Coin as Coin_pb } from '@terra-money/terra.proto/cosmos/base/v1beta1/coin';

/**
 * Captures `sdk.Coin` and `sdk.DecCoin` from Cosmos SDK. A composite value that combines
 * a denomination with an amount value. Coins are immutable once created, and operations
 * that return Coin will return a new Coin. See [[Coins]] for a collection of Coin objects.
 */
export class Coin
  extends JSONSerializable<Coin.Amino, Coin.Data, Coin.Proto>
  implements Numeric<Coin>
{
  public readonly amount: Numeric.Output;

  /**
   * Creates a new coin. Depending on the type of amount, it will be converted to an
   * integer coin or decimal coin.
   *
   * @param denom denomination
   * @param amount coin's amount
   */
  constructor(public readonly denom: Denom, amount: Numeric.Input) {
    super();
    this.amount = Numeric.parse(amount);
  }

  /**
   * Checks whether the Coin is an Integer coin.
   */
  public isIntCoin(): boolean {
    // TODO: convert into typeguard
    return this.amount instanceof Int;
  }

  /**
   * Checks whether the Coin is a Decimal coin.
   */
  public isDecCoin(): boolean {
    return this.amount instanceof Dec;
  }

  /**
   * Turns the Coin into an Integer coin.
   */
  public toIntCoin(): Coin {
    return new Coin(this.denom, new Int(this.amount));
  }

  /**
   * Turns the Coin into an Integer coin with ceiling the amount.
   */
  public toIntCeilCoin(): Coin {
    return new Coin(this.denom, new Int(this.amount.ceil()));
  }

  /**
   * Turns the Coin into a Decimal coin.
   */
  public toDecCoin(): Coin {
    return new Coin(this.denom, new Dec(this.amount));
  }

  /**
   * Outputs `<amount><denom>`.
   *
   * Eg: `Coin('uluna', 1500) -> 1500uluna`
   */
  public toString(): string {
    const amount = this.amount.toFixed();
    if (this.isDecCoin() && amount.indexOf('.') === -1) {
      return `${amount}.0${this.denom}`;
    }
    return `${amount}${this.denom}`;
  }

  public static fromString(str: string): Coin {
    const m = str.match(/^(-?[0-9]+(\.[0-9]+)?)([0-9a-zA-Z/]+)$/);
    if (m === null) {
      throw new Error(`failed to parse to Coin: ${str}`);
    }
    const amount = m[1];
    const denom = m[3];
    return new Coin(denom, amount);
  }

  /**
   * Creates a new Coin adding to the current value.
   *
   * @param other
   */
  public add(other: Numeric.Input | Coin): Coin {
    let otherAmount;
    if (other instanceof Coin) {
      if (other.denom !== this.denom) {
        throw new Coin.ArithmeticError(
          `cannot add two Coins of different denoms: ${this.denom} and ${other.denom}`
        );
      }
      otherAmount = other.amount;
    } else {
      otherAmount = other;
    }

    otherAmount = Numeric.parse(otherAmount);
    return new Coin(this.denom, this.amount.add(otherAmount));
  }

  /**
   * Creates a new Coin subtracting from the current value.
   * @param other
   */
  public sub(other: Numeric.Input | Coin): Coin {
    let otherAmount;
    if (other instanceof Coin) {
      if (other.denom !== this.denom) {
        throw new Coin.ArithmeticError(
          `cannot subtract two Coins of different denoms: ${this.denom} and ${other.denom}`
        );
      }
      otherAmount = other.amount;
    } else {
      otherAmount = other;
    }

    otherAmount = Numeric.parse(otherAmount);
    return new Coin(this.denom, this.amount.sub(otherAmount));
  }

  /**
   * Multiplies the current value with an amount.
   * @param other
   */
  public mul(other: Numeric.Input): Coin {
    const otherAmount = Numeric.parse(other);
    return new Coin(this.denom, this.amount.mul(otherAmount));
  }

  /**
   * Divides the current value with an amount.
   * @param other
   */
  public div(other: Numeric.Input): Coin {
    const otherAmount = Numeric.parse(other);
    return new Coin(this.denom, this.amount.div(otherAmount));
  }

  /**
   * Modulo the current value with an amount.
   * @param other
   */
  public mod(other: Numeric.Input): Coin {
    const otherAmount = Numeric.parse(other);
    return new Coin(this.denom, this.amount.mod(otherAmount));
  }

  public static fromAmino(data: Coin.Amino): Coin {
    const { denom, amount } = data;
    return new Coin(denom, amount);
  }

  public toAmino(): Coin.Amino {
    const { denom, amount } = this;
    return {
      denom,
      amount: amount.toString(),
    };
  }

  public static fromData(data: Coin.Data): Coin {
    const { denom, amount } = data;
    return new Coin(denom, amount);
  }

  public toData(): Coin.Data {
    const { denom, amount } = this;
    return {
      denom,
      amount: amount.toString(),
    };
  }

  public static fromProto(proto: Coin.Proto): Coin {
    return new Coin(proto.denom, Numeric.parse(proto.amount));
  }

  public toProto(): Coin.Proto {
    return Coin_pb.fromPartial({
      denom: this.denom,
      amount: this.amount.toString(),
    });
  }
}

export namespace Coin {
  export interface Amino {
    denom: Denom;
    amount: string;
  }

  export interface Data {
    denom: Denom;
    amount: string;
  }

  export class ArithmeticError {
    constructor(public readonly message: string) {}
  }

  export type Proto = Coin_pb;
}
