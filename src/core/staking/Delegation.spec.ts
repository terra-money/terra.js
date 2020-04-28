const delgsData = require('./Delegation.data.json');
import { Delegation } from './Delegation';

describe('Delegation', () => {
  it('deserializes', () => {
    delgsData.forEach((delgExample: Delegation.Data) => {
      const delg = Delegation.fromData(delgExample);
      expect(delg.toData()).toMatchObject(delgExample);
    });
  });
});
