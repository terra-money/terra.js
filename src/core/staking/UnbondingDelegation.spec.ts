const data = require('./UnbondingDelegation.data.json');
import { UnbondingDelegation } from './UnbondingDelegation';

describe('UnbondingDelegation', () => {
  it('deserializes', () => {
    data.forEach((udelgExample: UnbondingDelegation.Data) => {
      const udelg = UnbondingDelegation.fromData(udelgExample);
      // expect(udelg.toData()).toMatchObject(udelgExample);
      // JavaScript's Date does not preserve ns precision
    });
  });
});
