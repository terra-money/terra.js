import { Key } from './Key';
import { AccAddress, ValAddress } from '../core/bech32';
import { SignDoc } from '../core/SignDoc';
import { SignatureV2 } from '../core/SignatureV2';
import { SimplePublicKey } from '../core/PublicKey';

import Transport from '@ledgerhq/hw-transport';
import TransportNodeHid from '@ledgerhq/hw-transport-node-hid';
import TransportNodeHidNoEvents from '@ledgerhq/hw-transport-node-hid-noevents';
import TransportNodeHidSingleton from '@ledgerhq/hw-transport-node-hid-singleton';
import TransportWebUSB from '@ledgerhq/hw-transport-webusb';
import TerraApp from '@terra-money/ledger-terra-js';
//import { ERROR_CODE } from '@terra-money/ledger-terra-js';
const NoError = 0x9000;
import { LUNA_COIN_TYPE } from './MnemonicKey';
import { SignMode } from '../client/lcd/Wallet';

export enum LedgerTransportType {
  WEB_USB = 1,
  NODE,
  //NODE_HID_SINGLETON,
  //NODE_HID,
  //NODE_HID_NO_EVENTS,
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

  public async initialize() {
    await this.loadAccountDetails();
  }

  private async getTransport(
    transportType?: LedgerTransportType
  ): Promise<Transport> {
    if (transportType == undefined) {
      return this.getTransport(this.transport);
    }
    switch (transportType) {
      case LedgerTransportType.WEB_USB:
        return await TransportWebUSB.create();
      case LedgerTransportType.NODE:
        return await TransportNodeHidSingleton.create();
      /*
      case LedgerTransportType.NODE_HID:
        return await TransportNodeHid.create();
      case LedgerTransportType.NODE_HID_NO_EVENTS:
        return await TransportNodeHidNoEvents.create();
        */
      //case LedgerTransportType.NODE_HID_SINGLETON:
      //  return await TransportNodeHidSingleton.create();
      default:
        throw new Error('invalid transport type');
    }
  }

  /**
   * initialize ledger
   */
  private async getTerraApp(): Promise<TerraApp> {
    const app = new TerraApp(await this.getTransport());
    const res = await app.initialize();
    if (res != null && res.return_code != /*ERROR_CODE.*/ NoError) {
      let reason = null;
      if (res != null) reason = res.error_message;
      throw new Error(`Can't initialize LedgerKey ` + reason);
    }
    return app;
  }

  public async loadAccountDetails() {
    const app = await this.getTerraApp();
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
    //console.log(`accAddress: ${this._accAddress}`)
    //console.log(`publicKey: ${JSON.stringify(this.publicKey)}`)
  }

  public async sign(message: Buffer): Promise<Buffer> {
    if (!this.publicKey) {
      this.loadAccountDetails();
    }
    const app = await this.getTerraApp();
    const res = await app.sign(this.path, message);

    if (res.return_code != /*ERROR_CODE.*/ NoError) {
      throw new Error(`Can't sign a message. ${JSON.stringify(res)}`);
    }
    return Buffer.from(res.signature.data);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async createSignature(_tx: SignDoc): Promise<SignatureV2> {
    throw new Error('direct sign mode is not supported');
  }
}
