import { MsgSubmitMisbehaviour } from './MsgSubmitMisbehaviour';

describe('MsgSubmitMisbehaviour', () => {
  it('deserializes correctly', () => {
    const send = MsgSubmitMisbehaviour.fromData({
      '@type': '/ibc.core.client.v1.MsgSubmitMisbehaviour',
      client_id: 'client-01',
      misbehaviour: { client_type: '07-tendermint' },
      signer: 'terra1av6ssz7k4xpc5nsjj2884nugakpp874ae0krx7',
    });

    expect(send).toMatchObject({
      client_id: 'client-01',
      misbehaviour: { client_type: '07-tendermint' },
      signer: 'terra1av6ssz7k4xpc5nsjj2884nugakpp874ae0krx7',
    });

    expect(send.toData()).toMatchObject({});
  });
});
