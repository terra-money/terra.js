import Decimal from 'decimal.js';
import { Dec, dec } from './numeric';

function d(arg: Decimal.Value): Dec {
  // shortcut
  return new Dec(arg);
}

function dwp(arg1: Decimal.Value, arg2: number): Dec {
  return Dec.withPrec(arg1, arg2);
}

describe('Decimal', () => {
  it('tagged literal syntax', () => {
    const dec1 = dec`123.123456`;
    const dec2 = new Dec('123.123456');
    expect(dec1).toEqual(dec2);
  });

  describe('serialization / deserialization', () => {
    it('deserializes regular Dec input', () => {
      const examples = [
        '138875042105.980753034749566779',
        '8447.423744387144096286',
        '3913.113789811986907029',
        '0.500000000000000000',
        '0.006250000000000000',
        '-23.128250000000000023',
        '242.000000000000028422',
        '-242.000000000000020422',
      ];

      examples.forEach(example => {
        expect(new Dec(example).toString()).toEqual(example);
      });
    });

    it('serializes zero correctly', () => {
      const zero = dec`0`;
      expect(zero.toString()).toEqual('0.000000000000000000');
    });

    it('serializes to 18 digits of precision', () => {
      const examples = [
        ['0.5', '0.500000000000000000'],
        ['0.00625', '0.006250000000000000'],
        ['3913.11', '3913.110000000000000000'],
        ['-23.11', '-23.110000000000000000'],
        ['-3', '-3.000000000000000000'],
        ['-3.0000000000000000001', '-3.000000000000000000'], // doesn't go beyond 18 digits
      ];

      examples.forEach(([example, expected]) => {
        expect(new Dec(example).toString()).toEqual(expected);
      });
    });

    it('addition / subtraction resolution', () => {
      const zero = new Dec(0);
      const unit = new Dec('0.000000000000000001');
      expect(zero.add(unit).equals(unit)).toEqual(true);
      expect(zero.sub(unit).equals(unit.mul(-1))).toEqual(true);
    });

    it('cosmos arithmetic', () => {
      // Adapted from: https://github.com/cosmos/cosmos-sdk/blob/master/types/decimal_test.go
      const examples = [
        // d1, d2, mul, quo, add, sub
        [d(0), d(0), d(0), new Dec(NaN), d(0), d(0)],
        [d(1), d(0), d(0), new Dec(Infinity), d(1), d(1)],
        [d(0), d(1), d(0), d(0), d(1), d(-1)],
        [d(0), d(-1), d(-0), d(0), d(-1), d(1)], // TODO: fix discrepancy with negative zeros
        [d(3), d(7), d(21), dwp('428571428571428571', 18), d(10), d(-4)],
        [d(2), d(4), d(8), dwp(5, 1), d(6), d(-2)],
        [d(100), d(100), d(10000), d(1), d(200), d(0)],
        [dwp(15, 1), dwp(15, 1), dwp(225, 2), d(1), d(3), d(0)],
        [
          dwp(3333, 4),
          dwp(333, 4),
          dwp(1109889, 8),
          new Dec('10.009009009009009009'),
          dwp(3666, 4),
          dwp(3, 1),
        ],
      ];

      examples.forEach(ex => {
        const [d1, d2, mul, quo, add, sub] = ex;
        expect(d1.mul(d2)).toEqual(mul);
        expect(d1.div(d2).toString()).toEqual(quo.toString());
        expect(d1.add(d2)).toEqual(add);
        expect(d1.sub(d2)).toEqual(sub);
      });
    });

    it('keep away from decimal.js', () => {
      const decimal = new Decimal('500000');
      const dec = new Dec('500000');
      expect(decimal.toString()).toEqual('500000');
      expect(dec.toString()).toEqual('500000.000000000000000000');
    });
  });
});
