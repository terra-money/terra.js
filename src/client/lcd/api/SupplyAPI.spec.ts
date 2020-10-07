import { APIRequester } from '../APIRequester';
import { SupplyAPI } from './SupplyAPI';
import { Coins } from '../../../core';

const c = new APIRequester('https://lcd.terra.dev/');
const supply = new SupplyAPI(c);

describe('SupplyAPI', () => {
  it('total', async () => {
    const totalSupply = await supply.total();
    expect(totalSupply).toEqual(expect.any(Coins));
  });
});
