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

/**
 * Key implementation that uses `terracli` to sign transactions. Keys should be registered
 * in `terracli`'s OS keyring.
 *
 * NOTE: This Key implementation overrides `createSignature()` and only provide a shim
 * for `sign()`.
 */
export class CLIKey extends Key {
  private _accAddress?: AccAddress;
  private _accPubKey?: AccPubKey;

  /**
   *
   * @param keyName name of the key for terracli
   * @param multisig (optional) address of multisig account on behalf of which transaction shall be signed
   * @param cliPath (optional) path of terracli
   * @param home (optional) home option for terracli
   */
  constructor(
    public keyName: string,
    public multisig?: string,
    public cliPath: string = 'terracli',
    public home?: string
  ) {
    super();
  }

  private generateCommand(args: string) {
    return `${this.cliPath} ${args} -o json ${
      this.home ? `--home ${this.home}` : ''
    }`;
  }

  private loadAccountDetails() {
    const details = JSON.parse(
      execSync(this.generateCommand(`keys show ${this.keyName}`)).toString()
    );
    this._accAddress = details.address;
    this._accPubKey = details.pubkey;
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

  public async sign(): Promise<Buffer> {
    throw new Error(
      'CLIKey does not use sign() -- use createSignature() directly.'
    );
  }

  public async createSignature(tx: StdSignMsg): Promise<StdSignature> {
    const tmpobj = fileSync({ postfix: '.json' });
    writeFileSync(tmpobj.fd, tx.toStdTx().toJSON());
    let msString = ''; // multi-signature
    if (this.multisig) {
      msString = `--multisig ${this.multisig}`;
    }
    const result = execSync(
      this.generateCommand(
        `tx sign ${tmpobj.name} --yes --signature-only --from ${this.keyName} --offline --chain-id ${tx.chain_id} --account-number ${tx.account_number} --sequence ${tx.sequence} ${msString}`
      )
    ).toString();
    tmpobj.removeCallback();
    return StdSignature.fromData(JSON.parse(result));
  }
}
