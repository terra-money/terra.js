import { LCDClient } from '../LCDClient';
import { IbcInterchainAccountsAPI } from './IbcInterchainAccountsAPI';

const terra = new LCDClient({
  chainID: 'pisco-1',
  URL: 'https://pisco-lcd.terra.dev',
  isClassic: false,
});
const ibcICA = new IbcInterchainAccountsAPI(terra);

describe('IbcInterchainAccountsAPI', () => {
  /*
  it('ica controller paramaters', async () => {
    const res = await ibc.interchainAccountControllerParameters();
    expect(res).not.toBeNull();
    expect(res).not.toBeUndefined();
  });
  */
  it('ica host paramaters', async () => {
    const res = await ibcICA.hostParameters();
    expect(res).not.toBeNull();
    expect(res).not.toBeUndefined();
  });
});
