import { JSONSerializable } from '../../../util/json';
import { Dec } from '../../numeric';

/**
 * A proposal for a direct and immediate change to the treasury's reward weight state,
 * which governs staking and validator returns. If passed, the new reward weight is put
 * into effect immediately, after clamping.
 */
export class RewardWeightUpdateProposal extends JSONSerializable<
  RewardWeightUpdateProposal.Data
> {
  /**
   *
   * @param title proposal's title
   * @param description proposal's description
   * @param reward_weight new proposed value for reward weight
   */
  constructor(
    public title: string,
    public description: string,
    public reward_weight: Dec
  ) {
    super();
  }

  public static fromData(
    data: RewardWeightUpdateProposal.Data
  ): RewardWeightUpdateProposal {
    const {
      value: { title, description, reward_weight },
    } = data;
    return new RewardWeightUpdateProposal(
      title,
      description,
      new Dec(reward_weight)
    );
  }

  public toData(): RewardWeightUpdateProposal.Data {
    const { title, description, reward_weight } = this;
    return {
      type: 'treasury/RewardWeightUpdateProposal',
      value: {
        title,
        description,
        reward_weight: reward_weight.toString(),
      },
    };
  }
}

export namespace RewardWeightUpdateProposal {
  export interface Data {
    type: 'treasury/RewardWeightUpdateProposal';
    value: {
      title: string;
      description: string;
      reward_weight: string;
    };
  }
}
