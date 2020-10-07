import { Int, int } from './numeric';

describe('Int', () => {
  it('tagged literal syntax', () => {
    const int1 = int`1234`;
    const int2 = new Int(1234);
    expect(int1).toEqual(int2);
  });

  it('converts into integer value', () => {
    const i = new Int('100');
    const i2 = new Int('100.293');
    const i3 = new Int(100.123);
    expect(i).toEqual(i2);
    expect(i).toEqual(i3);
    expect(i3.toString()).toEqual('100');
  });

  it('accomodates large values', () => {
    const i = new Int('9999999999999999999');
    const i2 = i.mul(10).add(5);
    expect(i2.toString()).toEqual(i.toString() + '5');
  });

  it('arithmetic', () => {
    const i = new Int('5');
    const i2 = new Int('3');
    expect(i.plus(i2).toNumber()).toEqual(8);
    expect(i.div(i2).toNumber()).toEqual(1); // truncates 1.66666 toward 1, not 2
  });
});
