import { MsgExecAuthorized } from './MsgExecAuthorized';
const examples = require('./MsgExecAuthorized.data.json');

describe('MsgExecAuthorized', () => {
  it('deserializes', () => {
    examples.forEach((data: MsgExecAuthorized.Amino) => {
      expect(MsgExecAuthorized.fromAmino(data, true).toAmino(true)).toEqual(data);
    });
  });
});
