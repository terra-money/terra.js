import { PublicKey } from './PublicKey';
import { JSONSerializable } from '../util/json';
/**
 * A signature consists of a message signature with a public key to verify its validity.
 * You likely will not need to work with StdSignature objects directly as they are automatically created for you.
 */
export declare class StdSignature extends JSONSerializable<StdSignature.Data> {
    signature: string;
    pub_key: PublicKey;
    /**
     *
     * @param signature Message signature string (base64-encoded).
     * @param pub_key Public key
     */
    constructor(signature: string, pub_key: PublicKey);
    static fromData(data: StdSignature.Data): StdSignature;
    toData(): StdSignature.Data;
}
export declare namespace StdSignature {
    interface Data {
        signature: string;
        pub_key: PublicKey.Data;
    }
}
