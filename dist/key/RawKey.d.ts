/// <reference types="node" />
import { Key } from './Key';
/**
 * An implementation of the Key interfaces that uses a raw private key.
 */
export declare class RawKey extends Key {
    /**
     * Raw private key, in bytes.
     */
    privateKey: Buffer;
    constructor(privateKey: Buffer);
    ecdsaSign(payload: Buffer): {
        signature: Uint8Array;
        recid: number;
    };
    sign(payload: Buffer): Promise<Buffer>;
}
