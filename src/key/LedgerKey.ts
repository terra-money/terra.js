import { Key } from './Key';
import { AccAddress, ValAddress } from '../core/bech32';
import { SignDoc } from '../core/SignDoc';
import { SignatureV2 } from '../core/SignatureV2';
import { SimplePublicKey } from '../core/PublicKey';

import Transport from '@ledgerhq/hw-transport';
import TerraApp, { PublicKeyResponse } from '@terra-money/ledger-terra-js';
import { ERROR_CODE } from '@terra-money/ledger-terra-js';
import { LUNA_COIN_TYPE } from './MnemonicKey';
import { SignMode } from '../client/lcd/Wallet';

interface LedgerKeyParams {
  openTimeout?: number;
  listenTimeout?: number;
}

/**
 * Key implementation that uses Ledger to sign transactions. Keys should be registered
 * in Ledger device
 *
 * NOTE: This Key implementation overrides `createSignature()` and only provide a shim
 * for `sign()`.
 */
export class LedgerKey extends Key {
  private _transport: Transport;
  private app: TerraApp;
  private _accAddress?: AccAddress;
  private path: number[] = [44, LUNA_COIN_TYPE, 0, 0, 0];

  /**
   *
   * @param transport transporter for LedgerKey
   */
  constructor(private transport: Transport) {
    super();
    this._transport = transport;
    this.app = new TerraApp(transport);
    this.initialize()
      .then(() => {
        console.log('initialized');
      })
      .catch(reason => {
        console.log(reason);
      });
    /*
    this.app.initialize().then(res => {
      if (res == null || res.return_code != ERROR_CODE.NoError) {
        let reason = null;
        if (res != null) reason = res.error_message
        throw new Error(
          `Can't initialize LedgerKey ` + reason
        );
      }
    }).catch(reason => {
      console.log(reason);
    });
    */
  }

  /**
   * initialize ledger
   */
  private async initialize() {
    const res = await this.app.initialize();
    console.log('initialized!');
    console.log(res);
    /*
    if (res == null || res.return_code != ERROR_CODE.NoError) {
      let reason = null;
      if (res != null) reason = res.error_message
      throw new Error(
        `Can't initialize LedgerKey ` + reason
      );
    }
    */
  }

  private async loadAccountDetails() {
    /*
    const res = await this.app.initialize()
    if (res == null || res.return_code != ERROR_CODE.NoError) {
      let reason = null;
      if (res != null) reason = res.error_message
      throw new Error(
        `Can't initialize LedgerKey ` + reason
      );
    }
    */
    const res = await this.app.getAddressAndPubKey(this.path, 'terra');
    if (res == null || res.return_code != 0) {
      let reason = null;
      if (res != null) reason = res.error_message;
      throw new Error(`Can't get address and public key. ` + reason);
    }
    this._accAddress = res.bech32_address;
    this.publicKey = new SimplePublicKey(
      Buffer.from(res.compressed_pk.data).toString('base64')
    );
  }

  /**
   * Terra account address. `terra-` prefixed.
   */
  public get accAddress(): AccAddress {
    if (!this._accAddress) {
      this.loadAccountDetails();
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this._accAddress!;
  }

  /**
   * Terra validator address. `terravaloper-` prefixed.
   */
  public get valAddress(): ValAddress {
    if (!this._accAddress) {
      this.loadAccountDetails();
      this._accAddress = this.accAddress;
    }
    return ValAddress.fromAccAddress(this._accAddress);
  }

  public async sign(message: Buffer): Promise<Buffer> {
    if (!this.publicKey) {
      this.loadAccountDetails();
    }
    const res = await this.app.sign(this.path, message);
    if (res.return_code != ERROR_CODE.NoError) {
      throw new Error(`Can't sign a message. return_cdode:${res.return_code}`);
    }
    return Buffer.from(res.signature.data);
  }

  public async createSignature(tx: SignDoc): Promise<SignatureV2> {
    const txStr = JSON.stringify(tx.toUnSignedTx().toData());
    const signature = await this.sign(Buffer.from(txStr));

    return new SignatureV2(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.publicKey!,
      new SignatureV2.Descriptor(
        new SignatureV2.Descriptor.Single(
          SignMode.SIGN_MODE_DIRECT,
          signature.toString('base64')
        )
      ),
      tx.sequence
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async createSignatureAmino(_tx: SignDoc): Promise<SignatureV2> {
    throw new Error('amino sign mode is not supported');
  }
}
