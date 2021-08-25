import { MsgGrantAuthorization } from './MsgGrantAuthorization';
const examples = require('./MsgGrantAuthorization.data.json');

describe('MsgGrantAuthorization', () => {
  it('deserializes', () => {
    examples.forEach((data: MsgGrantAuthorization.Data) => {
      expect(MsgGrantAuthorization.fromData(data).toData()).toEqual(data);
    });
  });
});
