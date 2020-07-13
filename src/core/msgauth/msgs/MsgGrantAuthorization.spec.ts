import { MsgGrantAuthorization } from './MsgGrantAuthorization';
const examples = require('./MsgGrantAuthorization.data.json');

describe('MsgGrantAuthorization', () => {
  it('deserializes', () => {
    examples.forEach(data => {
      expect(MsgGrantAuthorization.fromData(data).toData()).toEqual(data);
    });
  });
});
