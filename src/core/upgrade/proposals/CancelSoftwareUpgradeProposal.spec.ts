import { CancelSoftwareUpgradeProposal } from './CancelSoftwareUpgradeProposal';

describe('CancelSoftwareUpgradeProposal', () => {
  it('deserializes', () => {
    const cancelSoftwareUpgradeProposal =
      CancelSoftwareUpgradeProposal.fromData({
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
});
