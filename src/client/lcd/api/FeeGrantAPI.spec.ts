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
      'terra17lmam6zguazs5q5u6z5mmx76uj63gldnse2pdp'
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
        'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
        'terra17lmam6zguazs5q5u6z5mmx76uj63gldnse2pdp'
      );

      const allowanceData = res.toData();
      expect(allowanceData['@type']).toMatch(/cosmos.feegrant.v1beta1/g);
    });

    it('allowance not exist', async () => {
      expect(
        feeGrant.allowance(
          'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
          'terra13ggppncs97f4cl90fvxqelflg0upedd0n7rnd3'
        )
      ).rejects.toThrow();
    });
  });

  it('allowancesByGranter', async () => {
    const res = await feeGrant.allowancesByGranter(
      'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v'
    );
    expect(res.allowances[0]).toMatchObject({
      granter: expect.any(String),
      grantee: expect.any(String),
    });
    const allowanceData = res.allowances[0].allowance.toData();
    expect(allowanceData['@type']).toMatch(/cosmos.feegrant.v1beta1/g);
    expect(res.pagination).not.toBeUndefined();
  });
});
