import { bech32 } from 'bech32';
import {
  AccAddress,
  ValAddress,
  Tx,
  SignDoc,
  SignerInfo,
  ModeInfo,
  AuthInfo,
  PublicKey,
} from '../core';
import { SignatureV2 } from '../core/SignatureV2';
import { SignMode } from '@terra-money/terra.proto/cosmos/tx/signing/v1beta1/signing';

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

  /**
   * Terra account address. `terra-` prefixed.
   */
  public get accAddress(): AccAddress {
    if (!this.publicKey) {
      throw new Error('Could not compute accAddress: missing rawAddress');
    }

    return this.publicKey.address();
  }

  /**
   * Terra validator address. `terravaloper-` prefixed.
   */
  public get valAddress(): ValAddress {
    if (!this.publicKey) {
      throw new Error('Could not compute valAddress: missing rawAddress');
    }

    return bech32.encode(
      'terravaloper',
      bech32.toWords(this.publicKey.rawAddress())
    );
  }

  /**
   * Called to derive the relevant account and validator addresses and public keys from
   * the raw compressed public key in bytes.
   *
   * @param publicKey raw compressed bytes public key
   */
  constructor(public publicKey?: PublicKey) {}

  /**
   * Signs a [[StdSignMsg]] with the method supplied by the child class.
   * only used Amino sign
   *
   * @param tx sign-message of the transaction to sign
   * @param isClassic target network is isClassic or not?
   */
  public async createSignatureAmino(
    tx: SignDoc,
    isClassic?: boolean
  ): Promise<SignatureV2> {
    if (!this.publicKey) {
      throw new Error(
        'Signature could not be created: Key instance missing publicKey'
      );
    }

    return new SignatureV2(
      this.publicKey,
      new SignatureV2.Descriptor(
        new SignatureV2.Descriptor.Single(
          SignMode.SIGN_MODE_LEGACY_AMINO_JSON,
          (await this.sign(Buffer.from(tx.toAminoJSON(isClassic)))).toString(
            'base64'
          )
        )
      ),
      tx.sequence
    );
  }

  /**
   * Signs a [[SignDoc]] with the method supplied by the child class.
   *
   * @param tx sign-message of the transaction to sign
   * @param isClassic target network is isClassic or not?
   */
  public async createSignature(
    signDoc: SignDoc,
    isClassic?: boolean
  ): Promise<SignatureV2> {
    if (!this.publicKey) {
      throw new Error(
        'Signature could not be created: Key instance missing publicKey'
      );
    }

    // backup for restore
    const signerInfos = signDoc.auth_info.signer_infos;
    signDoc.auth_info.signer_infos = [
      new SignerInfo(
        this.publicKey,
        signDoc.sequence,
        new ModeInfo(new ModeInfo.Single(SignMode.SIGN_MODE_DIRECT))
      ),
    ];

    const sigBytes = (
      await this.sign(Buffer.from(signDoc.toBytes(isClassic)))
    ).toString('base64');

    // restore signDoc to origin
    signDoc.auth_info.signer_infos = signerInfos;

    return new SignatureV2(
      this.publicKey,
      new SignatureV2.Descriptor(
        new SignatureV2.Descriptor.Single(SignMode.SIGN_MODE_DIRECT, sigBytes)
      ),
      signDoc.sequence
    );
  }

  /**
   * Signs a [[Tx]] and adds the signature to a generated StdTx that is ready to be broadcasted.
   * @param tx
   */
  public async signTx(
    tx: Tx,
    options: SignOptions,
    isClassic?: boolean
  ): Promise<Tx> {
    const copyTx = new Tx(tx.body, new AuthInfo([], tx.auth_info.fee), []);
    const sign_doc = new SignDoc(
      options.chainID,
      options.accountNumber,
      options.sequence,
      copyTx.auth_info,
      copyTx.body
    );

    let signature: SignatureV2;
    if (options.signMode === SignMode.SIGN_MODE_LEGACY_AMINO_JSON) {
      signature = await this.createSignatureAmino(sign_doc, isClassic);
    } else {
      signature = await this.createSignature(sign_doc, isClassic);
    }

    const sigData = signature.data.single as SignatureV2.Descriptor.Single;
    copyTx.signatures.push(...tx.signatures, sigData.signature);
    copyTx.auth_info.signer_infos.push(
      ...tx.auth_info.signer_infos,
      new SignerInfo(
        signature.public_key,
        signature.sequence,
        new ModeInfo(new ModeInfo.Single(sigData.mode))
      )
    );

    return copyTx;
  }
}

export interface SignOptions {
  accountNumber: number;
  sequence: number;
  signMode: SignMode;
  chainID: string;
}
