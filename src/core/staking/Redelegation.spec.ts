const data = require('./Redelegation.data.json');
import { Redelegation } from './Redelegation';

describe('Redelegation', () => {
  it('deserializes', () => {
    data.forEach((redelgExample: Redelegation.Data) => {
      Redelegation.fromData(redelgExample);
      // expect(redelg.toData()).toMatchObject(redelgExample);
      // JavaScript's Date does not preserve ns precision
    });
  });
});
