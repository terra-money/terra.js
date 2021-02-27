import { JSONSerializable } from '../util/json';
import { Denom } from './Denom';
import { Numeric } from './numeric';
/**
 * Captures `sdk.Coin` and `sdk.DecCoin` from Cosmos SDK. A composite value that combines
 * a denomination with an amount value. Coins are immutable once created, and operations
 * that return Coin will return a new Coin. See [[Coins]] for a collection of Coin objects.
 */
export declare class Coin extends JSONSerializable<Coin.Data> implements Numeric<Coin> {
    readonly denom: Denom;
    readonly amount: Numeric.Output;
    /**
     * Creates a new coin. Depending on the type of amount, it will be converted to an
     * integer coin or decimal coin.
     *
     * @param denom denomination
     * @param amount coin's amount
     */
    constructor(denom: Denom, amount: Numeric.Input);
    static fromData(data: Coin.Data): Coin;
    /**
     * Checks whether the Coin is an Integer coin.
     */
    isIntCoin(): boolean;
    /**
     * Checks whether the Coin is a Decimal coin.
     */
    isDecCoin(): boolean;
    /**
     * Turns the Coin into an Integer coin.
     */
    toIntCoin(): Coin;
    /**
     * Turns the Coin into a Decimal coin.
     */
    toDecCoin(): Coin;
    toData(): Coin.Data;
    /**
     * Outputs `<amount><denom>`.
     *
     * Eg: `Coin('uluna', 1500) -> 1500uluna`
     */
    toString(): string;
    static fromString(str: string): Coin;
    /**
     * Creates a new Coin adding to the current value.
     *
     * @param other
     */
    add(other: Numeric.Input | Coin): Coin;
    /**
     * Creates a new Coin subtracting from the current value.
     * @param other
     */
    sub(other: Numeric.Input | Coin): Coin;
    /**
     * Multiplies the current value with an amount.
     * @param other
     */
    mul(other: Numeric.Input): Coin;
    /**
     * Divides the current value with an amount.
     * @param other
     */
    div(other: Numeric.Input): Coin;
    /**
     * Modulo the current value with an amount.
     * @param other
     */
    mod(other: Numeric.Input): Coin;
}
export declare namespace Coin {
    interface Data {
        denom: Denom;
        amount: string;
    }
    class ArithmeticError {
        readonly message: string;
        constructor(message: string);
    }
}
