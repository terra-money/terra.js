import { Coins } from '../../Coins';
import { BasicAllowance } from './BasicAllowance';

const now = new Date();

describe('BasicAllowance', () => {

  it('amino type', () => {
    const ba = new BasicAllowance('1000uluna', now);
    const aminoV1 = ba.toAmino(true);
    const aminoV2 = ba.toAmino(false);
    expect(aminoV1.type).toEqual("feegrant/BasicAllowance");
    expect(aminoV2.type).toEqual("cosmos-sdk/BasicAllowance");
  });

  it('both set', () => {
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
    expect(ba.toData().expiration).toEqual(now.toISOString().replace(/\.000Z$/, 'Z'));
    expect(ba.toProto().spendLimit).toHaveLength(0);
    expect(ba.toProto().expiration).toEqual(now);
    expect(ba.toAmino().value.spend_limit).toBeUndefined();
    expect(ba.toAmino().value.expiration).toEqual(now.toISOString());
  });

  it('spend_limit has zero amount', () => {
    expect(() => new BasicAllowance('1uluna,-1uusd', undefined)).toThrowError();
    expect(() => new BasicAllowance('0ukrw', undefined)).toThrowError();
    expect(() => new BasicAllowance('-1204unok', undefined)).toThrowError();
  });

  it('allow both empty', () => {
    const ba = new BasicAllowance();
    expect(ba.spend_limit).toBeUndefined();
    expect(ba.expiration).toBeUndefined();
  });
});
