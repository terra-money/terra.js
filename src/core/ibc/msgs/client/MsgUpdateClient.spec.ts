import { MsgUpdateClient } from './MsgUpdateClient';

describe('MsgUpdateClient', () => {
  it('deserializes correctly', () => {
    const send = MsgUpdateClient.fromData({
      '@type': '/ibc.core.client.v1.MsgUpdateClient',
      value: {
        client_id: 'client-01',
        header: {
          signed_header: { header: '', commit: '' },
          validator_set: {
            validators: [
              {
                address: 'val1',
                pub_key: 'pk',
                voting_power: 1,
                proposer_priority: 1,
              },
            ],
            proposer: {
              address: 'val1',
              pub_key: 'pk',
              voting_power: 1,
              proposer_priority: 1,
            },
            total_voting_power: 1,
          },
          trusted_height: { revision_height: 1, revision_number: 2 },
          trusted_validators: {
            validators: [
              {
                address: 'val1',
                pub_key: 'pk',
                voting_power: 1,
                proposer_priority: 1,
              },
            ],
            proposer: {
              address: 'val1',
              pub_key: 'pk',
              voting_power: 1,
              proposer_priority: 1,
            },
            total_voting_power: 1,
          },
        },
        signer: 'terra1av6ssz7k4xpc5nsjj2884nugakpp874ae0krx7',
      },
    });

    expect(send).toMatchObject({
      client_id: 'client-01',
      header: {
        signed_header: { header: '', commit: '' },
        validator_set: {
          validators: [
            {
              address: 'val1',
              pub_key: 'pk',
              voting_power: 1,
              proposer_priority: 1,
            },
          ],
          proposer: {
            address: 'val1',
            pub_key: 'pk',
            voting_power: 1,
            proposer_priority: 1,
          },
          total_voting_power: 1,
        },
        trusted_height: { revision_height: 1, revision_number: 2 },
        trusted_validators: {
          validators: [
            {
              address: 'val1',
              pub_key: 'pk',
              voting_power: 1,
              proposer_priority: 1,
            },
          ],
          proposer: {
            address: 'val1',
            pub_key: 'pk',
            voting_power: 1,
            proposer_priority: 1,
          },
          total_voting_power: 1,
        },
      },
      signer: 'terra1av6ssz7k4xpc5nsjj2884nugakpp874ae0krx7',
    });

    expect(send.toData()).toMatchObject({});
  });
});
