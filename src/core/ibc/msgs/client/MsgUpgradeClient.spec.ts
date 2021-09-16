import { MsgUpgradeClient } from './MsgUpgradeClient';

describe('MsgUpgradeClient', () => {
  it('deserializes correctly', () => {
    const send = MsgUpgradeClient.fromData({
      '@type': '/ibc.core.client.v1.MsgUpgradeClient',
      value: {
        client_id: 'client-01',
        client_state: { chain_id: 'bombay-10' },
        consensus_state: {
          timestamp: 1,
          root: 'root_hash',
          next_validator_hash: 'next_valoper_hash',
        },
        proof_upgrade_client: 'eyJiYXNlNjQiOnRydWV9',
        proof_upgrade_consensus_state: 'eyJiYXNlNjQiOnRydWV9',
        signer: 'terra1av6ssz7k4xpc5nsjj2884nugakpp874ae0krx7',
      },
    });

    expect(send).toMatchObject({
      client_id: 'client-01',
      client_state: { chain_id: 'bombay-10' },
      consensus_state: {
        timestamp: 1,
        root: 'root_hash',
        next_validator_hash: 'next_valoper_hash',
      },
      proof_upgrade_client: 'eyJiYXNlNjQiOnRydWV9',
      proof_upgrade_consensus_state: 'eyJiYXNlNjQiOnRydWV9',
      signer: 'terra1av6ssz7k4xpc5nsjj2884nugakpp874ae0krx7',
    });

    expect(send.toData()).toMatchObject({});
  });
});
