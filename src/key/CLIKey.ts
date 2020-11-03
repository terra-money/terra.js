import { Key } from './Key';
import * as bech32 from 'bech32';
import {
  StdSignMsg,
  StdSignature,
  AccPubKey,
  AccAddress,
  ValAddress,
  ValPubKey,
} from '../core';

import { promisify } from 'util';
import { exec as _exec } from 'child_process';

const exec = promisify(_exec);

export class CLIKey extends Key {
  private _accAddress?: AccAddress;
  private _accPubKey?: AccPubKey;

  /**
   * Terra account address. `terra-` prefixed.
   */
  public get accAddress(): AccAddress {
    return this._accAddress;
  }

  /**
   * Terra validator address. `terravaloper-` prefixed.
   */
  public get valAddress(): ValAddress {
    return this._accAddress;
  }

  /**
   * Terra account public key. `terrapub-` prefixed.
   */
  public get accPubKey(): AccPubKey {
    return this._accAddress;
  }

  /**
   * Terra validator public key. `terravaloperpub-` prefixed.
   */
  public get valPubKey(): ValPubKey {
    return this._accAddress;
  }

  constructor(public keyName: string) {
    super();
    this._postInit();
  }

  private async _postInit() {
    this._accAddress = (
      await exec(`terracli keys show ${this.keyName} -a`)
    ).stdout;
    this._accPubKey = (
      await exec(`terracli keys show ${this.keyName} -p`)
    ).stdout;
  }

  public async sign(payload: Buffer): Promise<Buffer> {
    throw new Error(
      'CLIKey does not use sign() -- use createSignature() directly.'
    );
  }

  public async createSignature(tx: StdSignMsg): Promise<StdSignature> {
    throw new Error();
  }
}
