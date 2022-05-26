import { LCDClient } from '../LCDClient';
import { WasmAPI } from './WasmAPI';

const terra = new LCDClient({
  chainID: 'pisco-1',
  URL: 'https://pisco-lcd.terra.dev',
});
const wasm = new WasmAPI(terra);

describe('WasmAPI', () => {
  it('parameters', async () => {
    if (terra.config.isClassic) {
      // only classic network has param query
      await expect(wasm.parameters()).resolves.toMatchObject({
        max_contract_size: expect.any(Number),
        max_contract_gas: expect.any(Number),
        max_contract_msg_size: expect.any(Number),
      });
    }
  });
});
