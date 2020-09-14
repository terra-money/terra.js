import { Dec } from '../../../core';
import { APIRequester } from '../APIRequester';
import { MintingAPI } from './MintingAPI';

const c = new APIRequester('https://tequila-lcd.terra.dev/');
const api = new MintingAPI(c);

describe('MintingAPI', () => {
  it('inflation', async () => {
    await expect(api.inflation()).resolves.toBeInstanceOf(Dec);
  });

  it('annual provisions', async () => {
    await expect(api.annualProvisions()).resolves.toBeInstanceOf(Dec);
  });
});
