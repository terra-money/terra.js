import { MsgRevokeAuthorization } from './MsgRevokeAuthorization';
const examples = require('./MsgRevokeAuthorization.data.json');

describe('MsgRevokeAuthorization', () => {
  it('deserializes', () => {
    examples.forEach((data: MsgRevokeAuthorization.Amino) => {
      expect(MsgRevokeAuthorization.fromAmino(data, true).toAmino(true)).toEqual(data);
    });
  });
});
