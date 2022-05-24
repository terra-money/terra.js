import { LCDClient } from '../LCDClient';
import { IbcAPI } from './IbcAPI';

const terra = new LCDClient({
  chainID: 'pisco-1',
  URL: 'https://pisco-lcd.terra.dev',
});
const ibc = new IbcAPI(terra);

describe('IbcClientAPI', () => {
  it('params', async () => {
    const param = await ibc.parameters();
    expect(param.allowed_clients).not.toBeNull();
    expect(param.allowed_clients).not.toBeUndefined();
  });

  it('client_states', async () => {
    const res = await ibc.client_states();
    expect(res).not.toBeNull();
    expect(res).not.toBeUndefined();
  });

  // it('client_state', async () => {
  //   const res = await ibc.client_state('07-tendermint-0');
  //   expect(res).not.toBeNull();
  //   expect(res).not.toBeUndefined();
  // });

  // it('client_status', async () => {
  //   const res = await ibc.client_status('07-tendermint-0');
  //   expect(res).not.toBeNull();
  //   expect(res).not.toBeUndefined();
  // });

  // it('consensus_states', async () => {
  //   const res = await ibc.consensus_states('07-tendermint-0');
  //   expect(res).not.toBeNull();
  //   expect(res).not.toBeUndefined();
  // });
});
