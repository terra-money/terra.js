import { APIRequester } from '../APIRequester';
import { IbcTransferAPI } from './IbcTransferAPI';
import { DenomTrace } from '../../../core/ibc-transfer/DenomTrace';

const c = new APIRequester('https://bombay-lcd.terra.dev/');
const ibctx = new IbcTransferAPI(c);

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
      'B8AF5D92165F35AB31F3FC7C7B444B9D240760FA5D406C49D24862BD0284E395'
    );
    expect(denomTrace.path).toEqual('transfer/channel-4');
    expect(denomTrace.base_denom).toEqual('uluna');
  });

  it('params', async () => {
    const param = await ibctx.parameters();
    expect(param.send_enabled).toEqual(expect.any(Boolean));
    expect(param.receive_enabled).toEqual(expect.any(Boolean));
  });
});
