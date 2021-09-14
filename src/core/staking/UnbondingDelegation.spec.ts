const data = require('./UnbondingDelegation.data.json');
import { UnbondingDelegation } from './UnbondingDelegation';

describe('UnbondingDelegation', () => {
  it('deserializes', () => {
    data.forEach((udelgExample: UnbondingDelegation.Amino) => {
      UnbondingDelegation.fromAmino(udelgExample);
      // expect(udelg.toAmino()).toMatchObject(udelgExample);
      // JavaScript's Date does not preserve ns precision
    });
  });
});
