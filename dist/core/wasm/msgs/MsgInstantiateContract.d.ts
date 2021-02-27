import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../strings';
import { Coins } from '../../Coins';
export declare class MsgInstantiateContract extends JSONSerializable<MsgInstantiateContract.Data> {
    owner: AccAddress;
    code_id: number;
    init_msg: object;
    migratable: boolean;
    init_coins: Coins;
    /**
     * @param owner contract owner
     * @param code_id reference to the code on the blockchain
     * @param init_msg message to configure the initial state of the contract
     * @param init_coins initial amount of coins to be sent to the contract's address
     * @param migratable defines to be migratable or not
     */
    constructor(owner: AccAddress, code_id: number, init_msg: object, init_coins?: Coins.Input, migratable?: boolean);
    static fromData(data: MsgInstantiateContract.Data): MsgInstantiateContract;
    toData(): MsgInstantiateContract.Data;
}
export declare namespace MsgInstantiateContract {
    interface Data {
        type: 'wasm/MsgInstantiateContract';
        value: {
            owner: AccAddress;
            code_id: string;
            init_msg: string;
            init_coins: Coins.Data;
            migratable: boolean;
        };
    }
}
