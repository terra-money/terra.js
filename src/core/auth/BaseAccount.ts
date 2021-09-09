import { Coins } from '../Coins';
import { PublicKey } from '../PublicKey';
import { JSONSerializable } from '../../util/json';
import { AccAddress } from '../bech32';
import { BaseAccount as BaseAccount_pb } from '@terra-money/terra.proto/src/cosmos/auth/v1beta1/auth_pb';
import { Any } from '@terra-money/terra.proto/src/google/protobuf/any_pb';

/**
 * Stores information about an account fetched from the blockchain.
 */
export class BaseAccount extends JSONSerializable<BaseAccount.Data> {
  /**
   * Creates a new Account object, holding information about a basic account.
   *
   * @param address account address
   * @param coins account's balance
   * @param public_key account's public key information
   * @param account_number account number on the blockchain
   * @param sequence sequence number, or number of transactions that have been posted
   */
  constructor(
    public address: AccAddress,
    public coins: Coins,
    public public_key: PublicKey | null,
    public account_number: number,
    public sequence: number
  ) {
    super();
  }

  public toData(): BaseAccount.Data {
    const { address, coins, public_key, account_number, sequence } = this;
    return {
      type: 'core/Account',
      value: {
        address,
        coins: coins.toData(),
        public_key: public_key ? public_key.toData() : null,
        account_number: account_number.toFixed(),
        sequence: sequence.toFixed(),
      },
    };
  }

  public static fromData(data: BaseAccount.Data): BaseAccount {
    const {
      value: { address, coins, public_key, account_number, sequence },
    } = data;

    return new BaseAccount(
      address || '',
      Coins.fromData(coins),
      public_key ? PublicKey.fromData(public_key) : null,
      Number.parseInt(account_number) || 0,
      Number.parseInt(sequence) || 0
    );
  }

  public toProto(): BaseAccount.Proto {
    const { address, public_key, account_number, sequence } = this;
    const baseAccountProto: BaseAccount_pb = new BaseAccount_pb();

    baseAccountProto.setAddress(address);
    baseAccountProto.setPubKey(public_key?.toProto() as any);
    baseAccountProto.setAccountNumber(account_number);
    baseAccountProto.setSequence(sequence);

    return baseAccountProto;
  }

  public static fromProto(baseAccountProto: BaseAccount.Proto): BaseAccount {
    const pubkey = baseAccountProto.getPubKey();
    return new BaseAccount(
      baseAccountProto.getAddress(),
      new Coins(),
      pubkey ? PublicKey.fromProto(pubkey) : null,
      baseAccountProto.getAccountNumber(),
      baseAccountProto.getSequence()
    );
  }

  public packAny(): Any {
    const pubkeyAny = new Any();
    pubkeyAny.setTypeUrl('/cosmos.auth.v1beta1.BaseAccount');
    pubkeyAny.setValue(this.toProto().serializeBinary());
    return pubkeyAny;
  }

  public static unpackAny(pubkeyAny: Any): BaseAccount {
    return BaseAccount.fromProto(
      BaseAccount_pb.deserializeBinary(pubkeyAny.getValue_asU8())
    );
  }
}

export namespace BaseAccount {
  export interface Value {
    address: AccAddress;
    coins: Coins.Data;
    public_key: PublicKey.Data | null;
    account_number: string;
    sequence: string;
  }

  export interface Data {
    type: 'core/Account';
    value: Value;
  }

  export type Proto = BaseAccount_pb;
}
