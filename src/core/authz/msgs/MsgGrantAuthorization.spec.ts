import { MsgGrantAuthorization } from './MsgGrantAuthorization';
const examples = require('./MsgGrantAuthorization.data.json');

describe('MsgGrantAuthorization', () => {
  it('deserializes', () => {
    examples.forEach((data: MsgGrantAuthorization.Amino) => {
      expect(MsgGrantAuthorization.fromAmino(data).toAmino()).toEqual(data);
    });
  });
});
