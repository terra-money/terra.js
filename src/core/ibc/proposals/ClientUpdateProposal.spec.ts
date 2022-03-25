import { ClientUpdateProposal } from './ClientUpdateProposal';

describe('ClientUpdateProposal', () => {
  const update: ClientUpdateProposal.Data = {
    '@type': '/ibc.core.client.v1.ClientUpdateProposal',
    title: 'Update expired ibc client',
    description: 'Proposal to update an IBC client which has expired.',
    subject_client_id: '07-tendermint-19',
    substitute_client_id: '07-tendermint-64',
  };

  it('parses IBC client upgrade proposal', () => {
    expect(ClientUpdateProposal.fromData(update)).toBeTruthy();
  });
});
