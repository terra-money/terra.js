import { Height } from '../../../core/ibc/core/client/Height';
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
    const res = await ibc.clientStates();
    expect(res).not.toBeNull();
    expect(res).not.toBeUndefined();
  });

  it('client_state', async () => {
    const res = await ibc.clientState('07-tendermint-0');
    expect(res).not.toBeNull();
    expect(res).not.toBeUndefined();
  });

  it('client_status', async () => {
    const res = await ibc.clientStatus('07-tendermint-0');
    expect(res).not.toBeNull();
    expect(res).not.toBeUndefined();
  });

  it('consensus_states', async () => {
    const res = await ibc.consensusStates('07-tendermint-0');
    expect(res).not.toBeNull();
    expect(res).not.toBeUndefined();
  });

  it('ica host paramaters', async () => {
    const res = await ibc.interchainAccountHostParameters();
    expect(res).not.toBeNull();
    expect(res).not.toBeUndefined();
  });

  /*
  it('ica controller paramaters', async () => {
    const res = await ibc.interchainAccountControllerParameters();
    expect(res).not.toBeNull();
    expect(res).not.toBeUndefined();
  });
  */

  it('channels', async () => {
    const [res, _] = await ibc.channels();
    expect(res).not.toBeNull();
    expect(res).not.toBeUndefined();
    expect(res.length).toBeGreaterThan(0);
  });

  it('channels for a connection', async () => {
    const [res, height, _] = await ibc.connectionChannels('connection-3');
    expect(res).not.toBeNull();
    expect(res).not.toBeUndefined();
    expect(height).not.toBeNull();
    expect(height).toBeInstanceOf(Height);
    expect(res.length).toBeGreaterThan(0);
  });

  it('port', async () => {
    const res = await ibc.port('channel-0', 'transfer');
    expect(res).not.toBeNull();
    expect(res).not.toBeUndefined();
    expect(res).toHaveProperty('channel');
    expect(res).toHaveProperty('proof');
    expect(res).toHaveProperty('proof_height');
  });

  it('connections', async () => {
    const [res, _] = await ibc.connections();
    expect(res).not.toBeNull();
    expect(res).not.toBeUndefined();
    expect(res.length).toBeGreaterThan(0);
  });

  it('a connection', async () => {
    const res = await ibc.connection('connection-0');
    expect(res).not.toBeNull();
    expect(res).not.toBeUndefined();
  });
});
