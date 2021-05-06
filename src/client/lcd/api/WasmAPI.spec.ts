import { APIRequester } from '../APIRequester';
import { WasmAPI } from './WasmAPI';
import { EventParams } from '../../../core';

const c = new APIRequester('http://3.34.120.243:1317/');
const wasm = new WasmAPI(c);

describe('WasmAPI', () => {
  it('parameters', async () => {
    await expect(wasm.parameters()).resolves.toMatchObject({
      max_contract_size: expect.any(Number),
      max_contract_gas: expect.any(Number),
      max_contract_msg_size: expect.any(Number),
      max_contract_data_size: expect.any(Number),
      event_params: expect.any(EventParams),
    });
  });
});
