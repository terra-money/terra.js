import { APIRequester } from '../APIRequester';
import { LCDClient } from '../LCDClient';
import { FeeGrantAPI } from './FeeGrantAPI';

const terra = new LCDClient({
  chainID: 'pisco-1',
  URL: 'https://pisco-lcd.terra.dev',
});
const feeGrant = new FeeGrantAPI(terra);

describe('FeeGrantAPI', () => {
  it('allowances', async () => {
    const res = await feeGrant.allowances(
      'terra1p204wtykwke52hcyt6vdh630725rdayczyzcvz'
    );

    expect(res.allowances[0]).toMatchObject({
      granter: expect.any(String),
      grantee: expect.any(String),
    });

    const allowanceData = res.allowances[0].allowance.toData();
    expect(allowanceData['@type']).toMatch(/cosmos.feegrant.v1beta1/g);

    expect(res.pagination).not.toBeUndefined();
  });

  describe('allowance', () => {
    it('allowance exist', async () => {
      const res = await feeGrant.allowance(
        'terra13ggppncs97f4cl90fvxqelflg0upedd0n7rnd3',
        'terra1p204wtykwke52hcyt6vdh630725rdayczyzcvz'
      );

      const allowanceData = res.toData();
      expect(allowanceData['@type']).toMatch(/cosmos.feegrant.v1beta1/g);
    });

    it('allowance not exist', async () => {
      expect(
        feeGrant.allowance(
          'terra1p204wtykwke52hcyt6vdh630725rdayczyzcvz',
          'terra13ggppncs97f4cl90fvxqelflg0upedd0n7rnd3'
        )
      ).rejects.toThrow();
    });
  });
});
