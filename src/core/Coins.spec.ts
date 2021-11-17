import { Coins } from './Coins';
import { Coin } from './Coin';

describe('Coins', () => {
  it('clobbers coins of similar denom', () => {
    const coins1 = new Coins([
      new Coin('ukrw', 1000),
      new Coin('uluna', 1000),
      new Coin('uluna', 1000),
    ]);

    const coinKRW = coins1.get('ukrw');
    const coinLUNA = coins1.get('uluna');

    expect(coinKRW).toBeDefined();
    expect(coinLUNA).toBeDefined();

    if (coinKRW !== undefined && coinLUNA !== undefined) {
      expect(coinKRW.amount.toNumber()).toEqual(1000);
      expect(coinLUNA.amount.toNumber()).toEqual(2000);
    }
  });

  it('converts to deccoins if at least one id deccoin', () => {
    const c1 = new Coins({
      uluna: 1000,
      ukrw: 1.234,
    });

    const c2 = new Coins({
      uluna: 1000,
      ukrw: 1234,
    });

    expect(c1.toArray().every(c => c.isDecCoin())).toBe(true);
    expect(c2.toArray().every(c => c.isDecCoin())).toBe(false);
  });

  it('allows coins to be instantiated with a variety of inputs', () => {
    const ref = new Coins({
      ukrw: 1,
      uluna: 2,
    });

    // input #1: Coins
    const coins1 = new Coins(ref);

    // input #2: Coin[]
    const coins2 = new Coins([new Coin('ukrw', 1), new Coin('uluna', 2)]);

    // input #3: Coins.AminoDict
    const coins3 = new Coins({
      ukrw: 1,
      uluna: 2,
    });

    // input #4: string
    const coins4 = new Coins('2uluna,1ukrw');

    [coins1, coins2, coins3, coins4].forEach(cs => {
      expect(cs).toEqual(ref);
    });
  });

  it('fromString', () => {
    const int_coins_string = '5ukrw,12uluna';
    const dec_coins_string = '2.3ukrw,1.45uluna';
    const neg_dec_coins_string = '-1.0ukrw,2.5uluna';

    const int_coins = new Coins({
      ukrw: 5,
      uluna: '12',
    });
    const dec_coins = new Coins({
      ukrw: 2.3,
      uluna: '1.45',
    });

    const neg_dec_coins = new Coins({
      ukrw: '-1.0',
      uluna: 2.5,
    });

    const coins1 = Coins.fromString(int_coins_string);
    const coins2 = Coins.fromString(dec_coins_string);
    const coins3 = Coins.fromString(neg_dec_coins_string);

    expect(coins1).toEqual(int_coins);
    expect(coins2).toEqual(dec_coins);
    expect(coins3).toEqual(neg_dec_coins);
  });

  it('filters', () => {
    const gasPrices = new Coins({
      uluna: '0.15',
      usdr: '0.1018',
      uusd: '0.15',
      ukrw: '178.05',
      umnt: '431.6259',
      ueur: '0.125',
      ucny: '0.97',
      ujpy: '16.0',
      ugbp: '0.11',
      uinr: '11.0',
      ucad: '0.19',
      uchf: '0.13',
      uaud: '0.19',
      usgd: '0.2',
    });

    expect(gasPrices.filter(c => ['ukrw'].includes(c.denom))).toEqual(
      new Coins({ ukrw: '178.05' })
    );
  });

  it('is iterable', () => {
    const gasPrices = new Coins({
      uluna: '0.15',
      usdr: '0.1018',
      uusd: '0.15',
      ukrw: '178.05',
      umnt: '431.6259',
      ueur: '0.125',
      ucny: '0.97',
      ujpy: '16.0',
      ugbp: '0.11',
      uinr: '11.0',
      ucad: '0.19',
      uchf: '0.13',
      uaud: '0.19',
      usgd: '0.2',
    });

    // shouldn't fail or ts giving errors on type
    expect(Array.isArray(Array.from(gasPrices))).toBe(true);
  });
});
