import { MsgExecAuthorized } from './MsgExecAuthorized';
import examples from './MsgExecAuthorized.data.json';

describe('MsgExecAuthorized', () => {
  it('deserializes', () => {
    examples.forEach((data: MsgExecAuthorized.Amino) => {
      expect(MsgExecAuthorized.fromAmino(data).toAmino()).toEqual(data);
    });
  });
});
