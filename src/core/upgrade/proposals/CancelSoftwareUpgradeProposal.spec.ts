import { CancelSoftwareUpgradeProposal } from './CancelSoftwareUpgradeProposal';

describe('CancelSoftwareUpgradeProposal', () => {
  it('legacy deserializes', () => {
    const cancelSoftwareUpgradeProposal =
      CancelSoftwareUpgradeProposal.fromAmino({
        type: 'upgrade/CancelSoftwareUpgradeProposal',
        value: {
          title: `upgrade to col-5`,
          description: `example description`,
        },
      });

    expect(cancelSoftwareUpgradeProposal).toMatchObject({
      title: `upgrade to col-5`,
      description: `example description`,
    });
  });

  it('deserializes', () => {
    const cancelSoftwareUpgradeProposal =
      CancelSoftwareUpgradeProposal.fromAmino({
        type: 'cosmos-sdk/CancelSoftwareUpgradeProposal',
        value: {
          title: `upgrade to col-5`,
          description: `example description`,
        },
      });

    expect(cancelSoftwareUpgradeProposal).toMatchObject({
      title: `upgrade to col-5`,
      description: `example description`,
    });
  });
});
