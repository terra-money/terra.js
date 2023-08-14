/// <reference types="node" />
import { AccAddress, ValAddress, Tx, SignDoc, PublicKey } from '../core';
import { SignatureV2 } from '../core/SignatureV2';
import { SignMode } from '@terra-money/terra.proto/cosmos/tx/signing/v1beta1/signing';
/**
 * Abstract key interface that provides transaction signing features and Bech32 address
 * and public key derivation from a public key. This allows you to create custom key
 * solutions, such as for various hardware wallets, by implementing signing and calling
 * `super` with the raw public key from within your subclass. See [[MnemonicKey]] for
 * an implementation of a basic mnemonic-based key.
 */
export declare abstract class Key {
    publicKey?: PublicKey | undefined;
    /**
     * You will need to supply `sign`, which produces a signature for an arbitrary bytes payload
     * with the ECDSA curve secp256pk1.
     *
     * @param payload the data to be signed
     */
    abstract sign(payload: Buffer): Promise<Buffer>;
    /**
     * Terra account address. `terra-` prefixed.
     */
    get accAddress(): AccAddress;
    /**
     * Terra validator address. `terravaloper-` prefixed.
     */
    get valAddress(): ValAddress;
    /**
     * Called to derive the relevant account and validator addresses and public keys from
     * the raw compressed public key in bytes.
     *
     * @param publicKey raw compressed bytes public key
     */
    constructor(publicKey?: PublicKey | undefined);
    /**
     * Signs a [[StdSignMsg]] with the method supplied by the child class.
     * only used Amino sign
     *
     * @param tx sign-message of the transaction to sign
     * @param isClassic target network is isClassic or not?
     */
    createSignatureAmino(tx: SignDoc, isClassic?: boolean): Promise<SignatureV2>;
    /**
     * Signs a [[SignDoc]] with the method supplied by the child class.
     *
     * @param tx sign-message of the transaction to sign
     * @param isClassic target network is isClassic or not?
     */
    createSignature(signDoc: SignDoc, isClassic?: boolean): Promise<SignatureV2>;
    /**
     * Signs a [[Tx]] and adds the signature to a generated StdTx that is ready to be broadcasted.
     * @param tx
     */
    signTx(tx: Tx, options: SignOptions, isClassic?: boolean): Promise<Tx>;
}
export interface SignOptions {
    accountNumber: number;
    sequence: number;
    signMode: SignMode;
    chainID: string;
}
