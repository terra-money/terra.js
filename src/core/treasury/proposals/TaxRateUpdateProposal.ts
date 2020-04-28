import { JSONSerializable } from '../../../util/json';
import { Dec } from '../../numeric';

/**
 * A proposal for a direct and immediate change to the treasury's tax rate state, which
 * governs transaction fees. If passed, the new tax rate is put into effect immediately,
 * after clamping.
 */
export class TaxRateUpdateProposal extends JSONSerializable<
  TaxRateUpdateProposal.Data
> {
  /**
   * @param title proposal's title
   * @param description proposal's description
   * @param tax_rate new proposed value for tax rate.
   */
  constructor(
    public title: string,
    public description: string,
    public tax_rate: Dec
  ) {
    super();
  }

  public static fromData(
    data: TaxRateUpdateProposal.Data
  ): TaxRateUpdateProposal {
    const {
      value: { title, description, tax_rate },
    } = data;
    return new TaxRateUpdateProposal(title, description, new Dec(tax_rate));
  }

  public toData(): TaxRateUpdateProposal.Data {
    const { title, description, tax_rate } = this;
    return {
      type: 'treasury/TaxRateUpdateProposal',
      value: {
        title,
        description,
        tax_rate: tax_rate.toString(),
      },
    };
  }
}

export namespace TaxRateUpdateProposal {
  export interface Data {
    type: 'treasury/TaxRateUpdateProposal';
    value: {
      title: string;
      description: string;
      tax_rate: string;
    };
  }
}
