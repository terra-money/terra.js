import { MsgGrantAuthorization } from './MsgGrantAuthorization';
import examples from './MsgGrantAuthorization.data.json';

describe('MsgGrantAuthorization', () => {
  it('deserializes', () => {
    examples.forEach((data: MsgGrantAuthorization.Amino) => {
      expect(MsgGrantAuthorization.fromAmino(data).toAmino()).toEqual(data);
    });
  });
});
