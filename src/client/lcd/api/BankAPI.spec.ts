import { APIRequester } from '../APIRequester';
import { BankAPI } from './BankAPI';

const c = new APIRequester('https://bombay-lcd.terra.dev/');
const bank = new BankAPI(c);

describe('BankAPI', () => {
  describe('balance', () => {
    it('account exists', async () => {
      await bank.balance('terra1ax7xtll5v6u6vdnymxa4k4648w80zhkggl0u24');
    });

    it('invalid account', async () => {
      await expect(bank.balance('1234')).rejects.toThrow();
    });
  });

  it('total supply', async () => {
    const totalSupply = await bank.total();
    expect(totalSupply[0].toArray().length).toBeGreaterThan(0);
  });
});
