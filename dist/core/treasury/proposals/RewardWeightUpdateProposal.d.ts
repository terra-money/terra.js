import { JSONSerializable } from '../../../util/json';
import { Dec } from '../../numeric';
/**
 * A proposal for a direct and immediate change to the treasury's reward weight state,
 * which governs staking and validator returns. If passed, the new reward weight is put
 * into effect immediately, after clamping.
 */
export declare class RewardWeightUpdateProposal extends JSONSerializable<RewardWeightUpdateProposal.Data> {
    title: string;
    description: string;
    reward_weight: Dec;
    /**
     *
     * @param title proposal's title
     * @param description proposal's description
     * @param reward_weight new proposed value for reward weight
     */
    constructor(title: string, description: string, reward_weight: Dec);
    static fromData(data: RewardWeightUpdateProposal.Data): RewardWeightUpdateProposal;
    toData(): RewardWeightUpdateProposal.Data;
}
export declare namespace RewardWeightUpdateProposal {
    interface Data {
        type: 'treasury/RewardWeightUpdateProposal';
        value: {
            title: string;
            description: string;
            reward_weight: string;
        };
    }
}
