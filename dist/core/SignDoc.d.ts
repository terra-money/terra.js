import { JSONSerializable } from '../util/json';
import { Fee } from './Fee';
import { Msg } from './Msg';
import { SignDoc as SignDoc_pb } from '@terra-money/terra.proto/cosmos/tx/v1beta1/tx';
import { TxBody, AuthInfo, Tx } from './Tx';
/**
 * A sign message is a data structure that is used to create a [[StdSignature]] to be later
 * appended to the list of signatures in an [[StdTx]]. Essentially, it contains all the
 * information needed to sign and build a transaction, and can be described as an
 * "unsigned transaction."
 */
export declare class SignDoc extends JSONSerializable<SignDoc.Amino, SignDoc.Data, SignDoc.Proto> {
    chain_id: string;
    account_number: number;
    sequence: number;
    auth_info: AuthInfo;
    tx_body: TxBody;
    /**
     *
     * @param chain_id ID of blockchain to submit transaction to
     * @param account_number account number on blockchain
     * @param sequence Sequence number (nonce), number of signed previous transactions by
     *    account included on the blockchain at time of broadcast.
     * @param fee transaction fee
     * @param msgs list of messages to include
     * @param memo optional note
     * @param timeout_height optional transaction timeout height, does not support amino
     * @param public_key Signer's public key, only used at direct sign mode
     */
    constructor(chain_id: string, account_number: number, sequence: number, auth_info: AuthInfo, tx_body: TxBody);
    toAmino(isClassic?: boolean): SignDoc.Amino;
    toData(isClassic?: boolean): SignDoc.Data;
    toProto(isClassic?: boolean): SignDoc.Proto;
    toUnSignedTx(): Tx;
    toBytes(isClassic?: boolean): Uint8Array;
}
export declare namespace SignDoc {
    interface Amino {
        chain_id: string;
        account_number: string;
        sequence: string;
        timeout_height?: string;
        fee: Fee.Amino;
        msgs: Msg.Amino[];
        memo: string;
    }
    interface Data {
        body_bytes: string;
        auth_info_bytes: string;
        chain_id: string;
        account_number: string;
    }
    type Proto = SignDoc_pb;
}
