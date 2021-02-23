import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../strings';
import { Coins } from '../../Coins';
export declare class MsgExecuteContract extends JSONSerializable<MsgExecuteContract.Data> {
    sender: AccAddress;
    contract: AccAddress;
    execute_msg: object;
    coins: Coins;
    /**
     * @param sender contract user
     * @param contract contract address
     * @param msg HandleMsg to pass as arguments for contract invocation
     * @param coins coins to be sent to contract
     */
    constructor(sender: AccAddress, contract: AccAddress, execute_msg: object, coins?: Coins.Input);
    static fromData(data: MsgExecuteContract.Data): MsgExecuteContract;
    toData(): MsgExecuteContract.Data;
}
export declare namespace MsgExecuteContract {
    interface Data {
        type: 'wasm/MsgExecuteContract';
        value: {
            sender: AccAddress;
            contract: AccAddress;
            execute_msg: string;
            coins: Coins.Data;
        };
    }
}
