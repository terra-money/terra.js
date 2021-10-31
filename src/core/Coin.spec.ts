import { Coin } from './Coin';
import { Dec, Int } from './numeric';

describe('Coin', () => {
  it('different types for amount', () => {
    const ref = new Coin('uluna', 1000);
    const coins = [new Coin('uluna', 1000.0), new Coin('uluna', '1000')];
    coins.forEach(coin => expect(coin).toEqual(ref));
  });

  it('deserializes Coin value', () => {
    const coin = Coin.fromData({
      denom: 'uluna',
      amount: '1000',
    });

    expect(coin.denom).toEqual('uluna');
    expect(coin.amount.toNumber()).toEqual(1000);
  });

  it('serializes', () => {
    const coinData: Coin.Data = {
      denom: 'uluna',
      amount: '1000',
    };

    const coin = Coin.fromData(coinData);
    expect(coin.amount).toBeInstanceOf(Int);
    expect(coin.toData()).toEqual(coinData);

    const decCoinData = {
      denom: 'uluna',
      amount: '1000.000000000000000000',
    };
    const decCoin = Coin.fromData(decCoinData);
    expect(decCoin.amount).toBeInstanceOf(Dec);
    expect(decCoin.toData()).toEqual(decCoinData);
  });

  it('arithmetic', () => {
    const zero = new Coin('uluna', 0);
    const coin = new Coin('uluna', 1000);
    const coin2 = new Coin('uluna', 2000);
    const coin3 = new Coin('ukrw', 2000);

    // addition
    const sum = coin.add(coin2);
    const decSum = coin.add(0.1);
    expect(coin.add(zero).amount).toEqual(coin.amount);
    expect(sum.amount.toNumber()).toEqual(3000);
    expect(sum.denom).toEqual('uluna');
    expect(coin.add(1500)).toEqual(new Coin('uluna', 2500));
    expect(decSum.isDecCoin()).toBe(true);
    expect(decSum.isIntCoin()).toBe(false);
    expect(decSum.amount.toNumber()).toEqual(1000.1);
    expect(() => coin.add(coin3)).toThrowError(Coin.ArithmeticError);

    // subtraction
    const diff = coin2.sub(coin);
    expect(diff.denom).toEqual('uluna');
    expect(diff.amount.toNumber()).toEqual(1000);
    expect(() => coin2.sub(coin3)).toThrow(Coin.ArithmeticError);

    // multiplication
    const product = coin.mul(3.1233);
    expect(product.denom).toEqual('uluna');
    expect(product.amount.toNumber()).toEqual(3123.3);

    // division
    const quotient = coin.div(5);
    expect(quotient.denom).toEqual('uluna');
    expect(quotient.amount.toNumber()).toEqual(200);

    // modulo
    const rem = coin.mod(43);
    expect(rem.denom).toEqual('uluna');
    expect(rem.amount.toNumber()).toEqual(coin.amount.toNumber() % 43);
  });

  it('equality', () => {
    const coin1 = new Coin('uluna', 1000);
    const coin2 = new Coin('uluna', 1000);
    const coin3 = new Coin('uluna', 1001);
    expect(coin1).toEqual(coin2);
    expect(coin1).not.toEqual(coin3);
  });

  it('toString', () => {
    const coin1 = new Coin('uluna', 123456);
    const coin2 = new Coin('uluna', 123456.789);
    expect(coin1.toString()).toEqual('123456uluna');
    expect(coin1.toDecCoin().toString()).toEqual('123456.0uluna');
    expect(coin2.toString()).toEqual('123456.789uluna');
  });

  describe('fromString', () => {
    it('parse IntCoin', () => {
      const coin1 = new Coin('uluna', 1001);
      const coin2 = Coin.fromString('1001uluna');
      expect(coin1).toEqual(coin2);

      const coin3 = new Coin('uluna', -1);
      const coin4 = Coin.fromString('-1uluna');
      expect(coin3).toEqual(coin4);
    });

    it('parse DecCoin', () => {
      const coin1 = new Coin('uluna', 1001.5);
      const coin2 = Coin.fromString('1001.500000000000000000uluna');
      expect(coin1).toEqual(coin2);

      const coin3 = new Coin('uluna', '-1.0');
      const coin4 = Coin.fromString('-1.000000000000000000uluna');
      expect(coin3).toEqual(coin4);
    });
  });
});
