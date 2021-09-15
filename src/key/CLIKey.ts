import { Key } from './Key';
import { AccPubKey, AccAddress, ValAddress, ValPubKey } from '../core/bech32';
import { execSync } from 'child_process';
import { fileSync } from 'tmp';
import { writeFileSync } from 'fs';
import { SignDoc } from '../core/SignDoc';
import { SignatureV2 } from '../core/SignatureV2';

interface CLIKeyParams {
  keyName: string;
  multisig?: string;
  cliPath?: string;
  home?: string;
}

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
    return ValPubKey.fromValAddress(this.valAddress);
  }

  public async sign(): Promise<Buffer> {
    throw new Error(
      'CLIKey does not use sign() -- use createSignature() directly.'
    );
  }

  public async createSignature(tx: SignDoc): Promise<SignatureV2> {
    const tmpobj = fileSync({ postfix: '.json' });
    writeFileSync(tmpobj.fd, JSON.stringify(tx.toUnSignedTx().toData()));

    const result = execSync(
      this.generateCommand(
        `tx sign ${tmpobj.name} --yes --signature-only --from ${this.params.keyName} --offline ` +
          `--chain-id ${tx.chain_id} --account-number ${tx.account_number} --sequence ${tx.sequence} ` +
          `${
            this.params.multisig ? `--multisig ${this.params.multisig}` : ''
          } --sign-mode direct`
      )
    ).toString();
    tmpobj.removeCallback();
    return SignatureV2.fromData(JSON.parse(result)['signatures'][0]);
  }

  public async createSignatureAmino(tx: SignDoc): Promise<SignatureV2> {
    const tmpobj = fileSync({ postfix: '.json' });
    writeFileSync(tmpobj.fd, JSON.stringify(tx.toUnSignedTx().toData()));

    const result = execSync(
      this.generateCommand(
        `tx sign ${tmpobj.name} --yes --signature-only --from ${this.params.keyName} --offline ` +
          `--chain-id ${tx.chain_id} --account-number ${tx.account_number} --sequence ${tx.sequence} ` +
          `${
            this.params.multisig ? `--multisig ${this.params.multisig}` : ''
          } --sign-mode amino-json`
      )
    ).toString();
    tmpobj.removeCallback();
    return SignatureV2.fromData(JSON.parse(result)['signatures'][0]);
  }
}
