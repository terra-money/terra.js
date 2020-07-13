import { MsgExecAuthorized } from './MsgExecAuthorized';
const examples = require('./MsgExecAuthorized.data.json');

describe('MsgExecAuthorized', () => {
  it('deserializes', () => {
    examples.forEach(data => {
      expect(MsgExecAuthorized.fromData(data).toData()).toEqual(data);
    });
  });
});
