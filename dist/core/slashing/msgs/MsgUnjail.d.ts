import { JSONSerializable } from '../../../util/json';
import { ValAddress } from '../../strings';
/**
 * A validator can be jailed by the blockchain if misbehavior is detected, such as
 * double-signing or having missed too many vote periods in the Oracle ballot.
 *
 * This is done to protect delegators' funds from getting slashed further, until the
 * validator's issues have been addressed. A jailed validator cannot participate in
 * block rewards, and must be manually unjailed by submitting this message.
 */
export declare class MsgUnjail extends JSONSerializable<MsgUnjail.Data> {
    address: ValAddress;
    /**
     * @param address validator's operator address
     */
    constructor(address: ValAddress);
    static fromData(data: MsgUnjail.Data): MsgUnjail;
    toData(): MsgUnjail.Data;
}
export declare namespace MsgUnjail {
    interface Data {
        type: 'slashing/MsgUnjail';
        value: {
            address: ValAddress;
        };
    }
}
