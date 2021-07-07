import { APIRequester } from '../APIRequester';
import { WasmAPI } from './WasmAPI';

const c = new APIRequester('https://bombay-lcd.terra.dev/');
const wasm = new WasmAPI(c);

describe('WasmAPI', () => {
  it('parameters', async () => {
    await expect(wasm.parameters()).resolves.toMatchObject({
      max_contract_size: expect.any(Number),
      max_contract_gas: expect.any(Number),
      max_contract_msg_size: expect.any(Number),
    });
  });
});
