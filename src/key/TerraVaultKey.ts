import { Key } from './Key';
import axios from 'axios';

export class TerraVaultKey extends Key {
  public vaultUrl: String;
  public address: String;
  public headers: Object;

  constructor(
    vaultUrl: String,
    address: String,
    token: String,
    publicKey: Buffer
  ) {
    super(publicKey);
    this.vaultUrl = vaultUrl;
    this.address = address;
    this.headers = {
      'X-Vault-Token': token,
    };
  }

  public static loadAccount(
    vaultUrl: String,
    address: String,
    token: String
  ): Promise<TerraVaultKey> {
    return this.requestPubKey(vaultUrl, address, token).then(pubKey => {
      return new TerraVaultKey(vaultUrl, address, token, pubKey);
    });
  }

  public static requestPubKey(
    vaultUrl: String,
    address: String,
    token: String
  ): Promise<Buffer> {
    return axios
      .get(vaultUrl + '/v1/terra/accounts/' + address, {
        headers: {
          'X-Vault-Token': token,
        },
      })
      .then(res => Buffer.from(res.data.data.publicKey, 'hex'));
  }

  public requestSign(payload: Buffer): Promise<Buffer> {
    return axios
      .post(
        this.vaultUrl + '/v1/terra/accounts/' + this.address + '/sign',
        {
          data: payload.toString('hex'),
        },
        {
          headers: this.headers,
        }
      )
      .then(res => Buffer.from(res.data.data.signed_transaction, 'hex'));
  }

  public async sign(payload: Buffer): Promise<Buffer> {
    const signature = await this.requestSign(payload);
    return signature;
  }
}
