import { MsgRevokeAuthorization } from './MsgRevokeAuthorization';
const examples = require('./MsgRevokeAuthorization.data.json');

describe('MsgRevokeAuthorization', () => {
  it('deserializes', () => {
    examples.forEach(data => {
      expect(MsgRevokeAuthorization.fromData(data).toData()).toEqual(data);
    });
  });
});
