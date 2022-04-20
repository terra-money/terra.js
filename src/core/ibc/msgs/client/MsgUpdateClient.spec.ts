import { MsgUpdateClient } from './MsgUpdateClient';
const MsgUpdateClientProto = require('./MsgUpdateClient.data.json');

describe('MsgUpdateClient', () => {
  it('conversion from data to proto', () => {
    MsgUpdateClientProto.body.messages.forEach((msg: any) => {
      if (msg['@type'] == '/ibc.core.client.v1.MsgUpdateClient') {
        const d = MsgUpdateClient.fromData(msg);
        const p2 = d.toProto();
        const p1 = MsgUpdateClient.fromProto(d.toProto()).toProto();
        expect(p1).toEqual(p2);
      }
    });
  });
});
