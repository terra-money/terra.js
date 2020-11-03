import { Key } from './Key';
import {
  StdSignMsg,
  StdSignature,
  AccPubKey,
  AccAddress,
  ValAddress,
  ValPubKey,
} from '../core';

import { execSync } from 'child_process';
import { fileSync } from 'tmp';
import { writeFileSync } from 'fs';

export class CLIKey extends Key {
  private _accAddress?: AccAddress;
  private _accPubKey?: AccPubKey;

  private loadAccountDetails() {
    const details = execSync(`terracli keys show ${this.keyName}`).toString();
    this._accAddress = details.match(/terra[a-z0-9]{39}/)![0];
    this._accPubKey = details.match(/terrapub[a-z0-9]{68}/)![0];
  }

  /**
   * Terra account address. `terra-` prefixed.
   */
  public get accAddress(): AccAddress {
    if (!this._accAddress) {
      this.loadAccountDetails();
      return this.accAddress;
    }
    return this._accAddress;
  }

  /**
   * Terra validator address. `terravaloper-` prefixed.
   */
  public get valAddress(): ValAddress {
    if (!this._accAddress) {
      this.loadAccountDetails();
      return this.valAddress;
    }
    return ValAddress.fromAccAddress(this._accAddress);
  }

  /**
   * Terra account public key. `terrapub-` prefixed.
   */
  public get accPubKey(): AccPubKey {
    if (!this._accPubKey) {
      this.loadAccountDetails();
      return this.accPubKey;
    }
    return this._accPubKey;
  }

  /**
   * Terra validator public key. `terravaloperpub-` prefixed.
   */
  public get valPubKey(): ValPubKey {
    if (!this._accPubKey) {
      this.loadAccountDetails();
      return this.valPubKey;
    }
    return ValPubKey.fromAccPubKey(this._accPubKey);
  }

  constructor(public keyName: string) {
    super();
  }

  // @ts-ignore
  public async sign(payload: Buffer): Promise<Buffer> {
    throw new Error(
      'CLIKey does not use sign() -- use createSignature() directly.'
    );
  }

  // @ts-ignore
  public async createSignature(tx: StdSignMsg): Promise<StdSignature> {
    const tmpobj = fileSync({ postfix: '.json' });
    writeFileSync(tmpobj.fd, tx.toStdTx().toJSON());
    const result = execSync(
      `terracli tx sign ${tmpobj.name} --signature-only --from ${this.keyName} --offline --chain-id ${tx.chain_id} --account-number ${tx.account_number} --sequence ${tx.sequence}`
    ).toString();
    return StdSignature.fromData(JSON.parse(result));
  }
}
