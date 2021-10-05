import { APIRequester } from '../APIRequester';
import { IbcTransferAPI } from './IbcTransferAPI';

const c = new APIRequester('https://bombay-lcd.terra.dev/');
const ibctx = new IbcTransferAPI(c);

describe('IbcTransferAPI', () => {
  /*
    describe('denomTrace', () => {
    });
    */

  it('params', async () => {
    const param = await ibctx.parameters();
    expect(param.send_enabled).toEqual(expect.any(Boolean));
    expect(param.receive_enabled).toEqual(expect.any(Boolean));
  });
});
