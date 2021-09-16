import { MsgCreateClient } from './MsgCreateClient';

describe('MsgCreateClient', () => {
  it('deserializes correctly', () => {
    const send = MsgCreateClient.fromData({
      '@type': '/ibc.core.client.v1.MsgCreateClient',
      value: {
        client_state: { chain_id: 'bombay-10' },
        consensus_state: {
          timestamp: 1,
          root: 'root_hash',
          next_validator_hash: 'next_valoper_hash',
        },
        signer: 'terra1av6ssz7k4xpc5nsjj2884nugakpp874ae0krx7',
      },
    });

    expect(send).toMatchObject({
      client_state: { chain_id: 'bombay-10' },
      consensus_state: {
        timestamp: 1,
        root: 'root_hash',
        next_validator_hash: 'next_valoper_hash',
      },
      signer: 'terra1av6ssz7k4xpc5nsjj2884nugakpp874ae0krx7',
    });

    expect(send.toData()).toMatchObject({});
  });
});
