import { bech32 } from 'bech32';
import { Hex } from 'jscrypto/Hex';
import { RIPEMD160 } from 'jscrypto/RIPEMD160';
import { SHA256 } from 'jscrypto/SHA256';
import { StdSignature } from '../core/StdSignature';
import { StdTx } from '../core/StdTx';
import { StdSignMsg } from '../core/StdSignMsg';
import { AccAddress, AccPubKey, ValAddress, ValPubKey } from '../core/bech32';

const BECH32_PUBKEY_DATA_PREFIX = 'eb5ae98721';

/**
 * Gets a raw address from a compressed bytes public key.
 *
 * @param publicKey raw public key
 */
export function addressFromPublicKey(publicKey: Buffer): Buffer {
  if (typeof publicKey !== 'object' || !(publicKey instanceof Buffer)) {
    throw new TypeError('parameter must be Buffer that contains public key');
  }

  const message = Hex.parse(publicKey.toString('hex'));
  const hash = RIPEMD160.hash(SHA256.hash(message)).toString();
  const address = Buffer.from(hash, 'hex');
  return Buffer.from(bech32.toWords(address));
}

/**
 * Gets a bech32-words pubkey from a compressed bytes public key.
 *
 * @param publicKey raw public key
 */
export function pubKeyFromPublicKey(publicKey: Buffer): Buffer {
  const buffer = Buffer.from(BECH32_PUBKEY_DATA_PREFIX, 'hex');
  const combined = Buffer.concat([buffer, publicKey]);
  return Buffer.from(bech32.toWords(combined));
}

/**
 * Abstract key interface that provides transaction signing features and Bech32 address
 * and public key derivation from a public key. This allows you to create custom key
 * solutions, such as for various hardware wallets, by implementing signing and calling
 * `super` with the raw public key from within your subclass. See [[MnemonicKey]] for
 * an implementation of a basic mnemonic-based key.
 */
export abstract class Key {
  /**
   * You will need to supply `sign`, which produces a signature for an arbitrary bytes payload
   * with the ECDSA curve secp256pk1.
   *
   * @param payload the data to be signed
   */
  public abstract sign(payload: Buffer): Promise<Buffer>;

  public rawAddress?: Buffer;
  public rawPubKey?: Buffer;

  /**
   * Terra account address. `terra-` prefixed.
   */
  public get accAddress(): AccAddress {
    if (!this.rawAddress) {
      throw new Error('Could not compute accAddress: missing rawAddress');
    }
    return bech32.encode('terra', Array.from(this.rawAddress));
  }

  /**
   * Terra validator address. `terravaloper-` prefixed.
   */
  public get valAddress(): ValAddress {
    if (!this.rawAddress) {
      throw new Error('Could not compute valAddress: missing rawAddress');
    }
    return bech32.encode('terravaloper', Array.from(this.rawAddress));
  }

  /**
   * Terra account public key. `terrapub-` prefixed.
   */
  public get accPubKey(): AccPubKey {
    if (!this.rawPubKey) {
      throw new Error('Could not compute accPubKey: missing rawPubKey');
    }
    return bech32.encode('terrapub', Array.from(this.rawPubKey));
  }

  /**
   * Terra validator public key. `terravaloperpub-` prefixed.
   */
  public get valPubKey(): ValPubKey {
    if (!this.rawPubKey) {
      throw new Error('Could not compute valPubKey: missing rawPubKey');
    }
    return bech32.encode('terravaloperpub', Array.from(this.rawPubKey));
  }

  /**
   * Called to derive the relevant account and validator addresses and public keys from
   * the raw compressed public key in bytes.
   *
   * @param publicKey raw compressed bytes public key
   */
  constructor(public publicKey?: Buffer) {
    if (publicKey) {
      this.rawAddress = addressFromPublicKey(publicKey);
      this.rawPubKey = pubKeyFromPublicKey(publicKey);
    }
  }

  /**
   * Signs a [[StdSignMsg]] with the method supplied by the child class.
   *
   * @param tx sign-message of the transaction to sign
   */
  public async createSignature(tx: StdSignMsg): Promise<StdSignature> {
    const sigBuffer = await this.sign(Buffer.from(tx.toJSON()));

    if (!this.publicKey) {
      throw new Error(
        'Signature could not be created: Key instance missing publicKey'
      );
    }

    return StdSignature.fromData({
      signature: sigBuffer.toString('base64'),
      pub_key: {
        type: 'tendermint/PubKeySecp256k1',
        value: this.publicKey.toString('base64'),
      },
    });
  }

  /**
   * Signs a [[StdSignMsg]] and adds the signature to a generated StdTx that is ready to be broadcasted.
   * @param tx
   */
  public async signTx(tx: StdSignMsg): Promise<StdTx> {
    const sig = await this.createSignature(tx);
    return new StdTx(tx.msgs, tx.fee, [sig], tx.memo);
  }
}
