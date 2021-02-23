import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../strings';
import { Coins } from '../../Coins';
export declare class MsgFundCommunityPool extends JSONSerializable<MsgFundCommunityPool.Data> {
    depositor: AccAddress;
    amount: Coins;
    /**
     * @param depositor depositor's account address
     * @param amount coins to fund the community pool
     */
    constructor(depositor: AccAddress, amount: Coins.Input);
    static fromData(data: MsgFundCommunityPool.Data): MsgFundCommunityPool;
    toData(): MsgFundCommunityPool.Data;
}
export declare namespace MsgFundCommunityPool {
    interface Data {
        type: 'distribution/MsgFundCommunityPool';
        value: {
            depositor: AccAddress;
            amount: Coins.Data;
        };
    }
}
