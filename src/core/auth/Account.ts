import { Coins } from '../Coins';
import { PublicKey } from '../PublicKey';
import { JSONSerializable } from '../../util/json';
import { AccAddress } from '../bech32';

/**
 * Stores information about an account fetched from the blockchain.
 */
export class Account extends JSONSerializable<Account.Data> {
  /**
   * Creates a new Account object, holding information about a basic account.
   *
   * @param address account address
   * @param public_key account's public key information
   * @param account_number account number on the blockchain
   * @param sequence sequence number, or number of transactions that have been posted
   */
  constructor(
    public address: AccAddress,
    public public_key: PublicKey | null,
    public account_number: number,
    public sequence: number
  ) {
    super();
  }

  public toData(): Account.Data {
    const { address, public_key, account_number, sequence } = this;
    return {
      type: 'core/Account',
      value: {
        address,
        public_key: public_key ? public_key.toData() : null,
        account_number: account_number.toFixed(),
        sequence: sequence.toFixed(),
      },
    };
  }

  public static fromData(data: Account.Data): Account {
    const {
      value: { address, public_key, account_number, sequence },
    } = data;

    return new Account(
      address || '',
      public_key ? PublicKey.fromData(public_key) : null,
      Number.parseInt(account_number) || 0,
      Number.parseInt(sequence) || 0
    );
  }
}

export namespace Account {
  export interface Value {
    address: AccAddress;
    public_key: PublicKey.Data | null;
    account_number: string;
    sequence: string;
  }

  export interface Data {
    type: 'core/Account';
    value: Value;
  }
}
