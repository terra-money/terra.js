import { LCDClient } from '../LCDClient';
import { WasmAPI, CodeParams } from './WasmAPI';

const terra = new LCDClient({
  chainID: 'pisco-1',
  URL: 'https://pisco-lcd.terra.dev',
});
const wasm = new WasmAPI(terra);

describe('WasmAPI', () => {
  it('code_info', async () => {
    await expect(wasm.codeInfo(1)).resolves.toMatchObject({
      code_id: expect.any(Number),
      creator: expect.any(String),
      code_hash: expect.any(String),
      instantiate_permission: {
        permission: expect.any(Number),
        address: expect.any(String),
      },
    });
  });

  it('code_params', async () => {
    await expect(wasm.codeParams()).resolves.toMatchObject({
      code_upload_access: {
        permission: expect.any(String),
        address: expect.any(String),
        addresses: expect.any(Array),
      },
      instantiate_default_permission: expect.any(String),
    });
  });

  /* access denied
  it('all_codes', async () => {
    const [codes, _] = await wasm.allCodes();
    codes.forEach(code => {
      expect(code.code_id).toBeDefined();
      expect(code.code_hash).toBeDefined();
      expect(code.creator).toBeDefined();
    });
  });
  */
});
