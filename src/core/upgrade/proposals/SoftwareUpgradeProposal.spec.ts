import { SoftwareUpgradeProposal } from './SoftwareUpgradeProposal';

describe('SoftwareUpgradeProposal', () => {
  it('legacy deserializes', () => {
    const softwareUpgradeProposal = SoftwareUpgradeProposal.fromAmino({
      type: 'upgrade/SoftwareUpgradeProposal',
      value: {
        title: `spectest`,
        description: `example description`,
        plan: {
          name: `v0.5.2`,
          time: '2019-12-01T03:28:34.024363013Z',
          height: '5330001',
          info: 'testinfo',
          upgraded_client_state: 'deprecated',
        },
      },
    });

    expect(softwareUpgradeProposal).toMatchObject({
      title: `spectest`,
      description: `example description`,
      plan: {
        name: `v0.5.2`,
        time: new Date('2019-12-01T03:28:34.024363013Z'),
        height: '5330001',
        info: 'testinfo',
        upgraded_client_state: 'deprecated',
      },
    });
  });

  it('deserializes', () => {
    const softwareUpgradeProposal = SoftwareUpgradeProposal.fromAmino({
      type: 'cosmos-sdk/SoftwareUpgradeProposal',
      value: {
        title: `spectest`,
        description: `example description`,
        plan: {
          name: `v0.5.2`,
          time: '2019-12-01T03:28:34.024363013Z',
          height: '5330001',
          info: 'testinfo',
          upgraded_client_state: 'deprecated',
        },
      },
    });

    expect(softwareUpgradeProposal).toMatchObject({
      title: `spectest`,
      description: `example description`,
      plan: {
        name: `v0.5.2`,
        time: new Date('2019-12-01T03:28:34.024363013Z'),
        height: '5330001',
        info: 'testinfo',
        upgraded_client_state: 'deprecated',
      },
    });
  });
});
