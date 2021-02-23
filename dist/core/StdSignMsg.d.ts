import { StdFee } from './StdFee';
import { Msg } from './Msg';
import { JSONSerializable } from '../util/json';
import { StdTx } from './StdTx';
/**
 * A sign message is a data structure that is used to create a [[StdSignature]] to be later
 * appended to the list of signatures in an [[StdTx]]. Essentially, it contains all the
 * information needed to sign and build a transaction, and can be described as an
 * "unsigned transaction."
 */
export declare class StdSignMsg extends JSONSerializable<StdSignMsg.Data> {
    chain_id: string;
    account_number: number;
    sequence: number;
    fee: StdFee;
    msgs: Msg[];
    memo: string;
    /**
     *
     * @param chain_id ID of blockchain to submit transaction to
     * @param account_number account number on blockchain
     * @param sequence Sequence number (nonce), number of signed previous transactions by
     *    account included on the blockchain at time of broadcast.
     * @param fee transaction fee
     * @param msgs list of messages to include
     * @param memo optional note
     */
    constructor(chain_id: string, account_number: number, sequence: number, fee: StdFee, msgs: Msg[], memo?: string);
    toData(): StdSignMsg.Data;
    static fromData(data: StdSignMsg.Data): StdSignMsg;
    /**
     * You get the [[StdTx]] value from a `StdSignMsg` (without the signature).
     */
    toStdTx(): StdTx;
}
export declare namespace StdSignMsg {
    interface Data {
        chain_id: string;
        account_number: string;
        sequence: string;
        fee: StdFee.Data;
        msgs: Msg.Data[];
        memo: string;
    }
}
