import { AddBurnTaxExemptionAddressProposal } from './AddBurnTaxExemptionAddressProposal';

describe('AddBurnTaxExemptionAddressProposal', () => {
  it('legacy deserializes', () => {
    const addBurnTaxExemptionAddressProposal =
      AddBurnTaxExemptionAddressProposal.fromAmino(
        {
          type: 'treasury/AddBurnTaxExemptionAddressProposal',
          value: {
            title: `upgrade to col-5`,
            description: `example description`,
            addresses: ['terra1hsk6jryyqjfhp5dhc55tc9jtckygx0eph6dd02'],
          },
        },
        true
      );

    expect(addBurnTaxExemptionAddressProposal).toMatchObject({
      title: `upgrade to col-5`,
      description: `example description`,
      addresses: ['terra1hsk6jryyqjfhp5dhc55tc9jtckygx0eph6dd02'],
    });
  });

  it('deserializes', () => {
    const addBurnTaxExemptionAddressProposal =
      AddBurnTaxExemptionAddressProposal.fromData(
        {
          '@type': '/terra.treasury.v1beta1.AddBurnTaxExemptionAddressProposal',
          title: `upgrade to col-5`,
          description: `example description`,
          addresses: ['terra1hsk6jryyqjfhp5dhc55tc9jtckygx0eph6dd02'],
        },
        true
      );

    expect(addBurnTaxExemptionAddressProposal).toMatchObject({
      title: `upgrade to col-5`,
      description: `example description`,
      addresses: ['terra1hsk6jryyqjfhp5dhc55tc9jtckygx0eph6dd02'],
    });
  });
});
