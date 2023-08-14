import { Coin } from './Coin';
import { JSONSerializable } from '../util/json';
import { Denom } from './Denom';
import { Numeric } from './numeric';
/**
 * Analagous to `sdk.Coins` and `sdk.DecCoins` from Cosmos-SDK, and represents a collection
 * of [[Coin]] objects.
 *
 */
export declare class Coins extends JSONSerializable<Coins.Amino, Coins.Data, Coins.Proto> implements Numeric<Coins>, Iterable<Coin.Data> {
    private _coins;
    [Symbol.iterator](): {
        next: () => {
            value: Coin;
            done: true;
        };
    };
    /**
     * Converts the Coins information to a comma-separated list.
     *
     * Eg: `15000ukrw,12000uluna`
     */
    toString(): string;
    /**
     * Converts a comma-separated list of coins to a Coins object
     *
     * Eg. `1500ukrw,12302uluna`
     *
     * @param str comma-separated list of coins
     */
    static fromString(str: string): Coins;
    /**
     * Gets the list of denominations
     */
    denoms(): Denom[];
    /**
     * Creates a new Coins object with all Decimal coins
     */
    toDecCoins(): Coins;
    /**
     * Creates a new Coins object with all Integer coins
     */
    toIntCoins(): Coins;
    /**
     * Creates a new Coins object with all Integer coins with ceiling the amount
     */
    toIntCeilCoins(): Coins;
    /**
     * @param arg coins to input
     */
    constructor(arg?: Coins.Input);
    /**
     * Gets the Coin for denomination if it exists in the collection.
     * @param denom denomination to lookup
     */
    get(denom: Denom): Coin | undefined;
    /**
     * Sets the Coin value for a denomination.
     * @param denom denomination to set
     * @param value value to set
     */
    set(denom: Denom, value: Numeric.Input | Coin): void;
    /**
     * Gets the individual elements of the collection.
     */
    toArray(): Coin[];
    /**
     * Adds a value from the elements of the collection. Coins of a similar denomination
     * will be clobbered into one value containing their sum.
     * @param other
     */
    add(other: Coin | Coins): Coins;
    /**
     * Subtracts a value from the elements of the collection.
     * @param other
     */
    sub(other: Coin | Coins): Coins;
    /**
     * Multiplies the elements of the collection by a value.
     * @param other
     */
    mul(other: Numeric.Input): Coins;
    /**
     * Divides the elements of the collection by a value.
     * @param other
     */
    div(other: Numeric.Input): Coins;
    /**
     * Modulos the elements of the collection with a value.
     * @param other
     */
    mod(other: Numeric.Input): Coins;
    /**
     * Map a value onto the elements of the Coin collection.
     * @param fn
     */
    map<T>(fn: (c: Coin) => T): T[];
    /**
     * Filters out the Coin objects that don't match the predicate
     * @param fn predicate
     */
    filter(fn: (c: Coin) => boolean): Coins;
    static fromAmino(data: Coins.Amino | null): Coins;
    toAmino(): Coins.Amino;
    static fromData(data: Coins.Data | null): Coins;
    toData(): Coins.Data;
    static fromProto(data: Coins.Proto | null): Coins;
    toProto(): Coins.Proto;
}
export declare namespace Coins {
    type Input = Coins.AminoDict | Coin[] | Coins | string;
    type Amino = Coin.Amino[];
    type Data = Coin.Data[];
    type Proto = Coin.Proto[];
    type AminoDict = {
        [denom: string]: Numeric.Input;
    };
    type ReprDict = {
        [denom: string]: Coin;
    };
}
