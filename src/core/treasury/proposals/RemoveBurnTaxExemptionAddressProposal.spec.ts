import { RemoveBurnTaxExemptionAddressProposal } from './RemoveBurnTaxExemptionAddressProposal';

describe('RemoveBurnTaxExemptionAddressProposal', () => {
  it('legacy deserializes', () => {
    const removeBurnTaxExemptionAddressProposal =
      RemoveBurnTaxExemptionAddressProposal.fromAmino(
        {
          type: 'treasury/RemoveBurnTaxExemptionAddressProposal',
          value: {
            title: `upgrade to col-5`,
            description: `example description`,
            addresses: ['terra1hsk6jryyqjfhp5dhc55tc9jtckygx0eph6dd02'],
          },
        },
        true
      );

    expect(removeBurnTaxExemptionAddressProposal).toMatchObject({
      title: `upgrade to col-5`,
      description: `example description`,
      addresses: ['terra1hsk6jryyqjfhp5dhc55tc9jtckygx0eph6dd02'],
    });
  });

  it('deserializes', () => {
    const removeBurnTaxExemptionAddressProposal =
      RemoveBurnTaxExemptionAddressProposal.fromData(
        {
          '@type':
            '/terra.treasury.v1beta1.RemoveBurnTaxExemptionAddressProposal',
          title: `upgrade to col-5`,
          description: `example description`,
          addresses: ['terra1hsk6jryyqjfhp5dhc55tc9jtckygx0eph6dd02'],
        },
        true
      );

    expect(removeBurnTaxExemptionAddressProposal).toMatchObject({
      title: `upgrade to col-5`,
      description: `example description`,
      addresses: ['terra1hsk6jryyqjfhp5dhc55tc9jtckygx0eph6dd02'],
    });
  });
});
