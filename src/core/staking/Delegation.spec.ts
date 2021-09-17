const delgsAmino = require('./Delegation.data.json');
import { Delegation } from './Delegation';

describe('Delegation', () => {
  it('deserializes', () => {
    delgsAmino.forEach((delgExample: Delegation.Amino) => {
      const delg = Delegation.fromAmino(delgExample);
      expect(delg.toAmino()).toMatchObject(delgExample);
    });
  });
});
