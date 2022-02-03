import { Coins } from '../../Coins';
import { BasicAllowance } from './BasicAllowance';

describe('BasicAllowance', () => {
  it('both set', () => {
    const now = new Date();
    const ba = new BasicAllowance('1000uluna', now);

    expect(ba.toData().spend_limit).toEqual(new Coins('1000uluna').toData());
    expect(ba.toData().expiration).toEqual(now.toISOString());
    expect(ba.toProto().spendLimit).toEqual(new Coins('1000uluna').toProto());
    expect(ba.toProto().expiration).toEqual(now);
    expect(ba.toAmino().value.spend_limit).toEqual(
      new Coins('1000uluna').toAmino()
    );
    expect(ba.toAmino().value.expiration).toEqual(now.toISOString());
  });

  it('spend_limit only', () => {
    const ba = new BasicAllowance('1000uluna', undefined);

    expect(ba.toData().spend_limit).toEqual(new Coins('1000uluna').toData());
    expect(ba.toData().expiration).toBeUndefined();
    expect(ba.toProto().spendLimit).toEqual(new Coins('1000uluna').toProto());
    expect(ba.toProto().expiration).toBeUndefined();
    expect(ba.toAmino().value.spend_limit).toEqual(
      new Coins('1000uluna').toAmino()
    );
    expect(ba.toAmino().value.expiration).toBeUndefined();
  });

  it('expiration only', () => {
    const now = new Date();
    const ba = new BasicAllowance(undefined, now);

    expect(ba.toData().spend_limit).toEqual(undefined);
    expect(ba.toData().expiration).toEqual(now.toISOString());
    expect(ba.toProto().spendLimit).toHaveLength(0);
    expect(ba.toProto().expiration).toEqual(now);
    expect(ba.toAmino().value.spend_limit).toBeUndefined();
    expect(ba.toAmino().value.expiration).toEqual(now.toISOString());
  });

  it('both empty', () => {
    expect(() => {
      new BasicAllowance('0uluna,0uusd', undefined);
    }).toThrowError(); // zero coins
    expect(() => {
      new BasicAllowance(undefined, undefined);
    }).toThrowError();
  });
});
