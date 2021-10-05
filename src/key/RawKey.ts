import { SHA256, Word32Array } from 'jscrypto';
import * as secp256k1 from 'secp256k1';
import { Key } from './Key';
import { SimplePublicKey } from '../core/PublicKey';

/**
 * An implementation of the Key interfaces that uses a raw private key.
 */
export class RawKey extends Key {
  /**
   * Raw private key, in bytes.
   */
  public privateKey: Buffer;

  constructor(privateKey: Buffer) {
    const publicKey = secp256k1.publicKeyCreate(
      new Uint8Array(privateKey),
      true
    );
    super(new SimplePublicKey(Buffer.from(publicKey).toString('base64')));
    this.privateKey = privateKey;
  }

  public ecdsaSign(payload: Buffer): { signature: Uint8Array; recid: number } {
    const hash = Buffer.from(
      SHA256.hash(new Word32Array(payload)).toString(),
      'hex'
    );
    return secp256k1.ecdsaSign(
      Uint8Array.from(hash),
      Uint8Array.from(this.privateKey)
    );
  }

  public async sign(payload: Buffer): Promise<Buffer> {
    const { signature } = this.ecdsaSign(payload);
    return Buffer.from(signature);
  }
}
