import Decimal from 'decimal.js';

export const DEC_PRECISION = 18;

export interface Numeric<T> {
  add(other: any): T;

  sub(other: any): T;

  mul(other: any): T;

  div(other: any): T;

  mod(other: any): T;
}

export namespace Numeric {
  export type Input = Decimal.Value;
  export type Output = Int | Dec;

  export function parse(value: Input): Output {
    if (value instanceof Dec) {
      return value;
    } else if (typeof value === 'string') {
      if (value.includes('.')) {
        return new Dec(value);
      } else {
        return new Int(value);
      }
    } else {
      const _value = new Decimal(value);
      if (_value.isInteger()) {
        return new Int(_value);
      } else {
        return new Dec(_value.toString());
      }
    }
  }
}

/**
 * Represents decimal values serialized with 18 digits of precision. This implementation
 * is based on the `decimal.js` library, and returns Dec values for only [[Dec.add]],
 * [[Dec.sub]], [[Dec.mul]], [[Dec.div]], and [[Dec.mod]]. For other methods inherited
 * from `Decimal`, you will need to convert back to `Dec` to remain compatible for
 * submitting information that requires `Dec` format back to the blockchain.
 *
 * Example:
 *
 * ```ts
 * const dec = new Dec(1.5);
 *
 * const decimal = dec.sqrt();
 * const dec2 = new Dec(decimal);
 */

export class Dec extends Decimal implements Numeric<Dec> {
  constructor(arg?: Numeric.Input) {
    super((arg ?? 0).toString());
  }

  public toString(): string {
    return this.toFixed(DEC_PRECISION);
  }

  public static withPrec(value: Decimal.Value, prec: number): Dec {
    return new Dec(new Dec(value).div(Math.pow(10, prec)));
  }

  // type conversion
  public toInt(): Int {
    return new Int(this);
  }

  // arithmetic

  public add(other: Numeric.Input): Dec {
    const val = new Dec(Numeric.parse(other));
    return new Dec(super.add(val));
  }

  public sub(other: Numeric.Input): Dec {
    const val = new Dec(Numeric.parse(other));
    return new Dec(super.sub(val));
  }

  public mul(other: Numeric.Input): Dec {
    const val = new Dec(Numeric.parse(other));
    return new Dec(super.mul(val));
  }

  public div(other: Numeric.Input): Dec {
    const val = new Dec(Numeric.parse(other));
    return new Dec(super.div(val));
  }

  public mod(other: Numeric.Input): Dec {
    const val = new Dec(Numeric.parse(other));
    return new Dec(super.mod(val));
  }
}

const _Int = Decimal.clone();

/**
 * Represents Integer values. Used mainly to store integer values of [[Coin]] and [[Coins]].
 *
 * Note: Do not use to work with values greater than 9999999999999999999. This
 * implementation is based on the `decimal.js` library, and returns Int values for only
 * [[Int.add]], [[Int.sub]], [[Int.mul]], [[Int.div]], and [[Int.mod]]. For other
 * methods inherited from `Decimal`, you will need to convert back to `Int` to remain
 * compatible for submitting information that requires `Int` format back to the
 * blockchain.
 *
 * Example:
 *
 * ```ts
 * const int = new Int(1.5);
 *
 * const decimal = int.pow(3);
 * const int2 = new Int(decimal);
 */
export class Int extends _Int implements Numeric<Numeric.Output> {
  constructor(arg?: Numeric.Input) {
    const _arg = new Decimal((arg ?? 0).toString());
    super(_arg.divToInt(1));
  }

  public toString(): string {
    return this.toFixed();
  }

  // type conversion
  public toDec(): Dec {
    return new Dec(this);
  }

  // artihmetic

  public add(other: Numeric.Input): Numeric.Output {
    const val = Numeric.parse(other);
    if (val instanceof Dec) {
      return new Dec(this).add(val);
    } else {
      return new Int(this.plus(val));
    }
  }

  public sub(other: Numeric.Input): Numeric.Output {
    const val = Numeric.parse(other);
    if (val instanceof Dec) {
      return new Dec(this).sub(val);
    } else {
      return new Int(this.minus(val));
    }
  }

  public mul(other: Numeric.Input): Numeric.Output {
    const val = Numeric.parse(other);
    if (val instanceof Dec) {
      return new Dec(this).mul(val);
    } else {
      return new Int(this.times(val));
    }
  }

  public div(other: Numeric.Input): Numeric.Output {
    const val = Numeric.parse(other);
    if (val instanceof Dec) {
      return new Dec(this).div(val);
    } else {
      return new Int(super.div(val));
    }
  }

  public mod(other: Numeric.Input): Numeric.Output {
    const val = Numeric.parse(other);
    if (val instanceof Dec) {
      return new Dec(this).mod(val);
    } else {
      return new Int(super.mod(val));
    }
  }
}

/**
 * Template tagged literal for creating new Dec objects out of literal string.
 * This does not support literal string interpolation  with `${}`.
 *
 * Usage is:
 *
 * ```ts
 * import { dec } from "@terra-money/terra.js";
 *
 * const dec1 = dec`234.12312`;
 * const dec2 = new Dec("234.12312");
 *
 * dec1.equals(dec2);
 * ```
 * @param strings
 */
export function dec(strings: TemplateStringsArray): Dec {
  return new Dec(strings[0]);
}

/**
 * Template tagged literal for creating new Int objects out of literal string.
 * This does not support literal string interpolation  with `${}`.
 *
 * Usage is:
 *
 * ```ts
 * import { int } from "@terra-money/terra.js";
 *
 * const int1 = int`234`;
 * const int2 = new Int("234");
 *
 * int1.equals(int2);
 * ```
 * @param strings
 */

export function int(strings: TemplateStringsArray): Int {
  return new Int(strings[0]);
}
