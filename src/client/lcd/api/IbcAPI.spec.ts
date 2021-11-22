import { APIRequester } from '../APIRequester';
import { IbcClientAPI } from './IbcAPI';

const c = new APIRequester('https://bombay-lcd.terra.dev/');
//const c = new APIRequester('http://localhost:1317/');
const ibc = new IbcClientAPI(c);

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
