import { JSONSerializable } from '../../../util/json';

/**
 *  CancelSoftwareUpgradeProposal is a gov Content type for cancelling a software upgrade
 */
export class CancelSoftwareUpgradeProposal extends JSONSerializable<CancelSoftwareUpgradeProposal.Data> {
  /**
   *
   * @param title
   * @param description
   */
  constructor(public title: string, public description: string) {
    super();
  }

  public static fromData(
    data: CancelSoftwareUpgradeProposal.Data
  ): CancelSoftwareUpgradeProposal {
    const {
      value: { title, description },
    } = data;
    return new CancelSoftwareUpgradeProposal(title, description);
  }

  public toData(): CancelSoftwareUpgradeProposal.Data {
    const { title, description } = this;
    return {
      type: 'upgrade/CancelSoftwareUpgradeProposal',
      value: {
        title,
        description,
      },
    };
  }
}

export namespace CancelSoftwareUpgradeProposal {
  export interface Data {
    type: 'upgrade/CancelSoftwareUpgradeProposal';
    value: {
      title: string;
      description: string;
    };
  }
}
