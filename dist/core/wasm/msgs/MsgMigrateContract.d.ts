import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../strings';
export declare class MsgMigrateContract extends JSONSerializable<MsgMigrateContract.Data> {
    owner: AccAddress;
    contract: AccAddress;
    new_code_id: number;
    migrate_msg: object;
    /**
     * @param owner contract owner
     * @param contract contract address to be migrated from
     * @param new_code_id reference to the new code on the blockchain
     * @param migrate_msg JSON message to configure the migrate state of the contract
     */
    constructor(owner: AccAddress, contract: AccAddress, new_code_id: number, migrate_msg: object);
    static fromData(data: MsgMigrateContract.Data): MsgMigrateContract;
    toData(): MsgMigrateContract.Data;
}
export declare namespace MsgMigrateContract {
    interface Data {
        type: 'wasm/MsgMigrateContract';
        value: {
            owner: AccAddress;
            contract: AccAddress;
            new_code_id: string;
            migrate_msg: string;
        };
    }
}
