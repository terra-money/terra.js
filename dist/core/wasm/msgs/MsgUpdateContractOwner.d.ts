import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../strings';
export declare class MsgUpdateContractOwner extends JSONSerializable<MsgUpdateContractOwner.Data> {
    owner: AccAddress;
    new_owner: AccAddress;
    contract: AccAddress;
    /**
     * @param owner contract owner
     * @param new_owner new owner
     * @param contract contract address
     */
    constructor(owner: AccAddress, new_owner: AccAddress, contract: AccAddress);
    static fromData(data: MsgUpdateContractOwner.Data): MsgUpdateContractOwner;
    toData(): MsgUpdateContractOwner.Data;
}
export declare namespace MsgUpdateContractOwner {
    interface Data {
        type: 'wasm/MsgUpdateContractOwner';
        value: {
            owner: AccAddress;
            new_owner: AccAddress;
            contract: AccAddress;
        };
    }
}
