import { StdSignature } from './StdSignature';
import { JSONSerializable } from '../util/json';
import { StdFee } from './StdFee';
import { Msg } from './Msg';
/**
 * The StdTx data structure contains the signatures from [[StdSignMsg]] with the same
 * information, and can be broadcasted to the node to be included in a block.
 */
export declare class StdTx extends JSONSerializable<StdTx.Data> {
    msg: Msg[];
    fee: StdFee;
    signatures: StdSignature[];
    memo: string;
    /**
     * @param msg list of messages to include (not a typo)
     * @param fee transaction fee
     * @param signatures list of signatures
     * @param memo optional note
     */
    constructor(msg: Msg[], fee: StdFee, signatures: StdSignature[], memo?: string);
    static fromData(data: StdTx.Data): StdTx;
    toData(): StdTx.Data;
}
export declare namespace StdTx {
    interface Data {
        type: 'core/StdTx';
        value: {
            msg: Msg.Data[];
            fee: StdFee.Data;
            signatures: StdSignature.Data[];
            memo: string;
        };
    }
}
