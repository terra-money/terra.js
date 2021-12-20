import { MsgRevokeAuthorization } from './MsgRevokeAuthorization';
import examples from './MsgRevokeAuthorization.data.json';

describe('MsgRevokeAuthorization', () => {
  it('deserializes', () => {
    examples.forEach((data: MsgRevokeAuthorization.Amino) => {
      expect(MsgRevokeAuthorization.fromAmino(data).toAmino()).toEqual(data);
    });
  });
});
