import { Coins } from './Coins';
import { Coin } from './Coin';
import { Denom } from './Denom';

describe('Coins', () => {
  it('clobbers coins of similar denom', () => {
    const coins1 = new Coins([
      new Coin(Denom.KRW, 1000),
      new Coin(Denom.LUNA, 1000),
      new Coin(Denom.LUNA, 1000),
    ]);

    const coinKRW = coins1.get(Denom.KRW);
    const coinLUNA = coins1.get(Denom.LUNA);

    expect(coinKRW).toBeDefined();
    expect(coinLUNA).toBeDefined();

    if (coinKRW !== undefined && coinLUNA !== undefined) {
      expect(coinKRW.amount.toNumber()).toEqual(1000);
      expect(coinLUNA.amount.toNumber()).toEqual(2000);
    }
  });

  it("doesn't allow non-homogenous coin types", () => {
    expect(() => {
      new Coins({
        uluna: 1000,
        ukrw: 1.234,
      });
    }).toThrowError();
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

    // input #3: Coins.DataDict
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
});
