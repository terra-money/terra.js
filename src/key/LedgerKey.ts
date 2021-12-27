import { Key } from './Key';
import { AccAddress, ValAddress } from '../core/bech32';
import { SimplePublicKey } from '../core/PublicKey';

import Transport from '@ledgerhq/hw-transport';
import TransportNodeHid from '@ledgerhq/hw-transport-node-hid';
import TransportNodeHidNoEvents from '@ledgerhq/hw-transport-node-hid-noevents';
import TransportNodeHidSingleton from '@ledgerhq/hw-transport-node-hid-singleton';
import TransportWebHid from '@ledgerhq/hw-transport-webhid';
import TransportWebUSB from '@ledgerhq/hw-transport-webusb';
import TerraApp from '@terra-money/ledger-terra-js';
//import { ERROR_CODE } from '@terra-money/ledger-terra-js';
const NoError = 0x9000;
import { LUNA_COIN_TYPE } from './MnemonicKey';
import { signatureImport } from 'secp256k1';
import { bech32 } from 'bech32';
import { SignatureV2, SignDoc } from '..';

export enum LedgerTransportType {
  WEB_USB = 1,
  WEB_HID,
  NODE_HID,
  NODE_HID_NO_EVENTS,
  NODE_HID_SINGLETON,
}

/**
 * Key implementation that uses Ledger to sign transactions. Keys should be registered
 * in Ledger device
 *
 * NOTE: This Key implementation overrides `createSignature()` and only provide a shim
 * for `sign()`.
 */
export class LedgerKey extends Key {
  //private app: TerraApp;
  private _accAddress?: AccAddress;
  //private app: TerraApp;
  private path: number[] = [44, LUNA_COIN_TYPE, 0, 0, 0];
  static transport?: LedgerTransportType;

  /**
   *
   * @param transport transporter for LedgerKey
   */
  constructor(public transport: LedgerTransportType) {
    super();
    //this.app = new TerraApp(this.transport)
    //this.app.initialize().then((res) => { console.log(res) });
  }

  /**
   * Terra account address. `terra-` prefixed.
   */
  public get accAddress(): AccAddress {
    if (!this.publicKey) {
      throw new Error('Ledger is unintialized. Initialize it first.');
    }

    return this.publicKey.address();
  }

  /**
   * Terra validator address. `terravaloper-` prefixed.
   */
  public get valAddress(): ValAddress {
    if (!this.publicKey) {
      throw new Error('Ledger is unintialized. Initialize it first.');
    }

    return bech32.encode('terravaloper', this.publicKey.rawAddress());
  }

  /**
   * initialize LedgerKey.
   * it loads accAddress and pubkicKey from connedted Ledger
   */
  public async initialize() {
    await this.loadAccountDetails();
  }

  /**
   * get transport by type.
   * @param transportType LedgerTransportType
   * @returns
   */
  private async getTransport(
    transportType?: LedgerTransportType
  ): Promise<Transport> {
    if (transportType == undefined) {
      return this.getTransport(this.transport);
    }
    switch (transportType) {
      case LedgerTransportType.WEB_USB:
        return await TransportWebUSB.create();
      case LedgerTransportType.WEB_HID:
        return await TransportWebHid.create();
      case LedgerTransportType.NODE_HID:
        return await TransportNodeHid.create();
      case LedgerTransportType.NODE_HID_NO_EVENTS:
        return await TransportNodeHidNoEvents.create();
      case LedgerTransportType.NODE_HID_SINGLETON:
        return await TransportNodeHidSingleton.create();
      default:
        throw new Error('invalid transport type');
    }
  }

  /**
   * get terra app with transport
   */
  private async getTerraApp(transport: Transport): Promise<TerraApp> {
    const app = new TerraApp(transport);
    const res = await app.initialize();
    if (res != null && res.return_code != /*ERROR_CODE.*/ NoError) {
      let reason = null;
      if (res != null) reason = res.error_message;
      throw new Error(`Can't initialize LedgerKey ` + reason);
    }
    return app;
  }

  /**
   * get Address and Pubkey from Ledger
   */
  public async loadAccountDetails(): Promise<LedgerKey> {
    const transport = await this.getTransport();
    try {
      const app = await this.getTerraApp(transport);
      const res = await app.getAddressAndPubKey(this.path, 'terra');
      if (res.return_code != NoError) {
        throw new Error(
          `Can't get address and public key. ${JSON.stringify(res)}`
        );
      }

      this._accAddress = res.bech32_address;
      this.publicKey = new SimplePublicKey(
        Buffer.from(res.compressed_pk.data).toString('base64')
      );
    } finally {
      transport.close();
    }
    //console.log(`accAddress: ${this._accAddress}`)
    //console.log(`publicKey: ${JSON.stringify(this.publicKey)}`)
    return this;
  }

  public async sign(message: Buffer): Promise<Buffer> {
    if (!this.publicKey) {
      this.loadAccountDetails();
    }
    const transport = await this.getTransport();
    try {
      const app = await this.getTerraApp(transport);
      const res = await app.sign(this.path, message);

      if (res.return_code != /*ERROR_CODE.*/ NoError) {
        throw new Error(`Can't sign a message. ${JSON.stringify(res)}`);
      }
      return Buffer.from(signatureImport(Buffer.from(res.signature as any)));
    } finally {
      transport.close();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async createSignature(_tx: SignDoc): Promise<SignatureV2> {
    throw new Error('direct sign mode is not supported');
  }
}
