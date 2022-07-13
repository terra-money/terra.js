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

  it('code_info', async () => {
    // only classic network has param query
    await expect(wasm.codeInfo(1)).resolves.toMatchObject({
      code_id: 1,
      creator: 'terra1zpglp37eg85mtwa54ymgj0nzqe37awhsv42yxj',
      code_hash:
        '325A94095F5D98B816AB5192C7771B43D9E45800846B5F2CC96B92E5F3492D45',
      instantiate_permission: {
        permission: 3,
        address: '',
      },
    });
  });

  /* access denied
  it('all_codes', async () => {
    // only classic network has param query
    const [codes, _] = await wasm.allCodes();
    codes.forEach(code => {
      expect(code.code_id).toBeDefined();
      expect(code.code_hash).toBeDefined();
      expect(code.creator).toBeDefined();
    });
  });
  */
});
