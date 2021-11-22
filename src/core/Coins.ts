import { Coin } from './Coin';
import { JSONSerializable } from '../util/json';
import { Denom } from './Denom';
import { Numeric } from './numeric';

/**
 * Analagous to `sdk.Coins` and `sdk.DecCoins` from Cosmos-SDK, and represents a collection
 * of [[Coin]] objects.
 *
 */
export class Coins
  extends JSONSerializable<Coins.Amino, Coins.Data, Coins.Proto>
  implements Numeric<Coins>, Iterable<Coin.Data>
{
  private _coins: Coins.ReprDict;

  // implement iterator interface for interop
  [Symbol.iterator]() {
    let index = -1;
    const data = this.toArray();

    return {
      next: () => ({
        value: data[++index],
        done: (index === data.length) as true,
      }),
    };
  }

  /**
   * Converts the Coins information to a comma-separated list.
   *
   * Eg: `15000ukrw,12000uluna`
   */
  public toString(): string {
    return this.toArray()
      .map(c => c.toString())
      .join(',');
  }

  /**
   * Converts a comma-separated list of coins to a Coins object
   *
   * Eg. `1500ukrw,12302uluna`
   *
   * @param str comma-separated list of coins
   */
  public static fromString(str: string): Coins {
    const coin_strings = str.split(/,\s*/);
    const coins = coin_strings.map(s => Coin.fromString(s));
    return new Coins(coins);
  }

  /**
   * Gets the list of denominations
   */
  public denoms(): Denom[] {
    return this.map(c => c.denom);
  }

  /**
   * Creates a new Coins object with all Decimal coins
   */
  public toDecCoins(): Coins {
    return new Coins(this.map(c => c.toDecCoin()));
  }

  /**
   * Creates a new Coins object with all Integer coins
   */
  public toIntCoins(): Coins {
    return new Coins(this.map(c => c.toIntCoin()));
  }

  /**
   * Creates a new Coins object with all Integer coins with ceiling the amount
   */
  public toIntCeilCoins(): Coins {
    return new Coins(this.map(c => c.toIntCeilCoin()));
  }

  /**
   * @param arg coins to input
   */
  constructor(arg: Coins.Input = {}) {
    super();
    if (arg instanceof Coins) {
      this._coins = { ...arg._coins };
    } else if (typeof arg === 'string') {
      this._coins = Coins.fromString(arg)._coins;
    } else {
      this._coins = {};
      let coins: Coin[];
      if (!Array.isArray(arg)) {
        coins = [];
        Object.keys(arg).forEach(denom =>
          coins.push(new Coin(denom, arg[denom]))
        );
      } else {
        coins = arg;
      }

      for (const coin of coins) {
        const { denom } = coin;
        const x = this._coins[denom];
        if (x !== undefined) {
          this._coins[denom] = x.add(coin);
        } else {
          this._coins[denom] = coin;
        }
      }

      // convert all coins to Dec if one is Dec
      if (!this.toArray().every(c => c.isIntCoin())) {
        for (const denom of Object.keys(this._coins)) {
          this._coins[denom] = this._coins[denom].toDecCoin();
        }
      }
    }
  }

  /**
   * Gets the Coin for denomination if it exists in the collection.
   * @param denom denomination to lookup
   */
  public get(denom: Denom): Coin | undefined {
    return this._coins[denom];
  }

  /**
   * Sets the Coin value for a denomination.
   * @param denom denomination to set
   * @param value value to set
   */
  public set(denom: Denom, value: Numeric.Input | Coin): void {
    let val;
    if (value instanceof Coin) {
      if (value.denom != denom) {
        throw new Error(
          `Denoms must match when setting: ${denom}, ${value.denom}`
        );
      }
      val = value;
    } else {
      val = new Coin(denom, value);
    }
    this._coins[denom] = val;
  }

  /**
   * Gets the individual elements of the collection.
   */
  public toArray(): Coin[] {
    return Object.values(this._coins).sort((a, b) =>
      a.denom.localeCompare(b.denom)
    );
  }

  /**
   * Adds a value from the elements of the collection. Coins of a similar denomination
   * will be clobbered into one value containing their sum.
   * @param other
   */
  public add(other: Coin | Coins): Coins {
    if (other instanceof Coin) {
      return new Coins([other, ...Object.values(this._coins)]);
    } else {
      return new Coins([
        ...Object.values(other._coins),
        ...Object.values(this._coins),
      ]);
    }
  }

  /**
   * Subtracts a value from the elements of the collection.
   * @param other
   */
  public sub(other: Coin | Coins): Coins {
    return this.add(other.mul(-1));
  }

  /**
   * Multiplies the elements of the collection by a value.
   * @param other
   */
  public mul(other: Numeric.Input): Coins {
    return new Coins(this.map(c => c.mul(other)));
  }

  /**
   * Divides the elements of the collection by a value.
   * @param other
   */
  public div(other: Numeric.Input): Coins {
    return new Coins(this.map(c => c.div(other)));
  }

  /**
   * Modulos the elements of the collection with a value.
   * @param other
   */
  public mod(other: Numeric.Input): Coins {
    return new Coins(this.map(c => c.mod(other)));
  }

  /**
   * Map a value onto the elements of the Coin collection.
   * @param fn
   */
  public map<T>(fn: (c: Coin) => T): T[] {
    return this.toArray().map(fn);
  }

  /**
   * Filters out the Coin objects that don't match the predicate
   * @param fn predicate
   */
  public filter(fn: (c: Coin) => boolean): Coins {
    return new Coins(this.toArray().filter(fn));
  }

  public static fromAmino(data: Coins.Amino | null): Coins {
    return new Coins((data ?? []).map(Coin.fromAmino));
  }

  public toAmino(): Coins.Amino {
    return this.toArray().map(c => c.toAmino());
  }

  public static fromData(data: Coins.Data | null): Coins {
    return new Coins((data ?? []).map(Coin.fromData));
  }

  public toData(): Coins.Data {
    return this.toArray().map(c => c.toData());
  }

  public static fromProto(data: Coins.Proto | null): Coins {
    return new Coins((data ?? []).map(Coin.fromProto));
  }

  public toProto(): Coins.Proto {
    return this.toArray().map(c => c.toProto());
  }
}

export namespace Coins {
  export type Input = Coins.AminoDict | Coin[] | Coins | string;
  export type Amino = Coin.Amino[];
  export type Data = Coin.Data[];
  export type Proto = Coin.Proto[];
  export type AminoDict = {
    [denom: string]: Numeric.Input;
  };
  export type ReprDict = {
    [denom: string]: Coin;
  };
}
