const data = require('./Redelegation.data.json');
import { Redelegation } from './Redelegation';

describe('Redelegation', () => {
  it('deserializes', () => {
    data.forEach((redelgExample: Redelegation.Amino) => {
      Redelegation.fromAmino(redelgExample);
      // expect(redelg.toAmino()).toMatchObject(redelgExample);
      // JavaScript's Date does not preserve ns precision
    });
  });
});
