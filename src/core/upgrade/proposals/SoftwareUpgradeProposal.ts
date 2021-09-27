import { JSONSerializable } from '../../../util/json';
import { Plan } from '../Plan';

/**
 * Softwareupgradeproposal is a gov Content type for initiating a software upgrade.
 */
export class SoftwareUpgradeProposal extends JSONSerializable<SoftwareUpgradeProposal.Data> {
  /**
   *
   * @param title
   * @param description
   * @param plan
   */
  constructor(
    public title: string,
    public description: string,
    public plan?: Plan
  ) {
    super();
  }

  public static fromData(
    data: SoftwareUpgradeProposal.Data
  ): SoftwareUpgradeProposal {
    const {
      value: { title, description, plan },
    } = data;
    return new SoftwareUpgradeProposal(
      title,
      description,
      plan ? Plan.fromData(plan) : undefined
    );
  }

  public toData(): SoftwareUpgradeProposal.Data {
    const { title, description, plan } = this;
    return {
      type: 'upgrade/SoftwareUpgradeProposal',
      value: {
        title,
        description,
        plan: plan ? plan.toData() : undefined,
      },
    };
  }
}

export namespace SoftwareUpgradeProposal {
  export interface Data {
    type: 'upgrade/SoftwareUpgradeProposal';
    value: {
      title: string;
      description: string;
      plan?: Plan.Data;
    };
  }
}
