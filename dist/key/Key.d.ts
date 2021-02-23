/// <reference types="node" />
import { StdSignature } from '../core';
import { StdTx } from '../core';
import { StdSignMsg } from '../core';
import { AccAddress, AccPubKey, ValAddress, ValPubKey } from '../core';
/**
 * Abstract key interface that provides transaction signing features and Bech32 address
 * and public key derivation from a public key. This allows you to create custom key
 * solutions, such as for various hardware wallets, by implementing signing and calling
 * `super` with the raw public key from within your subclass. See [[MnemonicKey]] for
 * an implementation of a basic mnemonic-based key.
 */
export declare abstract class Key {
    publicKey?: Buffer | undefined;
    /**
     * You will need to supply `sign`, which produces a signature for an arbitrary bytes payload
     * with the ECDSA curve secp256pk1.
     *
     * @param payload the data to be signed
     */
    abstract sign(payload: Buffer): Promise<Buffer>;
    rawAddress?: Buffer;
    rawPubKey?: Buffer;
    /**
     * Terra account address. `terra-` prefixed.
     */
    get accAddress(): AccAddress;
    /**
     * Terra validator address. `terravaloper-` prefixed.
     */
    get valAddress(): ValAddress;
    /**
     * Terra account public key. `terrapub-` prefixed.
     */
    get accPubKey(): AccPubKey;
    /**
     * Terra validator public key. `terravaloperpub-` prefixed.
     */
    get valPubKey(): ValPubKey;
    /**
     * Called to derive the relevant account and validator addresses and public keys from
     * the raw compressed public key in bytes.
     *
     * @param publicKey raw compressed bytes public key
     */
    constructor(publicKey?: Buffer | undefined);
    /**
     * Signs a [[StdSignMsg]] with the method supplied by the child class.
     *
     * @param tx sign-message of the transaction to sign
     */
    createSignature(tx: StdSignMsg): Promise<StdSignature>;
    /**
     * Signs a [[StdSignMsg]] and adds the signature to a generated StdTx that is ready to be broadcasted.
     * @param tx
     */
    signTx(tx: StdSignMsg): Promise<StdTx>;
}
