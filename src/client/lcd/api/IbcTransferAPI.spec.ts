import { IbcTransferAPI } from './IbcTransferAPI';
import { DenomTrace } from '../../../core/ibc/applications/transfer/v1/DenomTrace';
import { LCDClient } from '../LCDClient';

const terra = new LCDClient({
  chainID: 'pisco-1',
  URL: 'https://pisco-lcd.terra.dev/',
});
const ibctx = new IbcTransferAPI(terra);

describe('IbcTransferAPI', () => {
  it('denomTraces', async () => {
    const denomTraces = await ibctx.denomTraces().then(v => v[0]);
    denomTraces.forEach(function (denomTrace: DenomTrace.Data) {
      expect(denomTrace.path).toMatch('transfer/channel-');
      expect(denomTrace.base_denom).not.toBeUndefined();
    });
  });

  it('denomTrace', async () => {
    const denomTrace = await ibctx.denomTrace(
      '6DD0D40C3A5FE38336FC5EF017CC248E11C15E28C76F95C83A8FFE61E1566063'
    );
    expect(denomTrace.path).toEqual('transfer/channel-7');
    expect(denomTrace.base_denom).toEqual('ukuji');
  });

  it('params', async () => {
    const param = await ibctx.parameters();
    expect(param.send_enabled).toEqual(expect.any(Boolean));
    expect(param.receive_enabled).toEqual(expect.any(Boolean));
  });
});
