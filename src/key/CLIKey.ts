import { Key, pubKeyFromPublicKey } from './Key';
import { bech32 } from 'bech32'
import { AccPubKey, AccAddress, ValAddress, ValPubKey } from '../core/bech32';
import { StdSignMsg } from '../core/StdSignMsg';
import { StdSignature } from '../core/StdSignature';
import { execSync } from 'child_process';
import { fileSync } from 'tmp';
import { writeFileSync } from 'fs';

interface CLIKeyParams {
  keyName: string;
  multisig?: string;
  cliPath?: string;
  home?: string;
}

/**
 * Key implementation that uses `terrad` to sign transactions. Keys should be registered
 * in `terrad`'s OS keyring.
 *
 * NOTE: This Key implementation overrides `createSignature()` and only provide a shim
 * for `sign()`.
 */
export class CLIKey extends Key {
  private _accAddress?: AccAddress;
  private _accPubKey?: AccPubKey;

  /**
   *
   * @param keyName name of the key for terrad
   * @param multisig (optional) address of multisig account on behalf of which transaction shall be signed
   * @param cliPath (optional) path of terrad
   * @param home (optional) home option for terrad
   */
  constructor(private params: CLIKeyParams) {
    super();
    params.cliPath = params.cliPath || 'terrad';
  }

  private generateCommand(args: string) {
    return `${this.params.cliPath} ${args} --output json ${
      this.params.home ? `--home ${this.params.home}` : ''
    }`;
  }

  private loadAccountDetails() {
    const details = JSON.parse(
      execSync(
        this.generateCommand(`keys show ${this.params.keyName}`)
      ).toString()
    );

    const publicKeyString = JSON.parse(details.pubkey).key
    const publicKey = Buffer.from(publicKeyString, 'base64')

    this._accAddress = details.address;
    this._accPubKey = bech32.encode('terrapub', Array.from(pubKeyFromPublicKey(publicKey)));
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
    return ValPubKey.fromValAddress(this.valAddress);
  }

  public async sign(): Promise<Buffer> {
    throw new Error(
      'CLIKey does not use sign() -- use createSignature() directly.'
    );
  }

  public async createSignature(tx: StdSignMsg): Promise<StdSignature> {
    const tmpobj = fileSync({ postfix: '.json' });
    writeFileSync(tmpobj.fd, tx.toStdTx().toJSON());

    const result = execSync(
      this.generateCommand(
        `tx sign ${tmpobj.name} --yes --signature-only --from ${this.params.keyName} --offline ` +
          `--chain-id ${tx.chain_id} --account-number ${tx.account_number} --sequence ${tx.sequence} ` +
          `${this.params.multisig ? `--multisig ${this.params.multisig}` : ''}`
      )
    ).toString();
    tmpobj.removeCallback();
    return StdSignature.fromData(JSON.parse(result));
  }
}
