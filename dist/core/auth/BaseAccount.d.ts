import { PublicKey } from '../PublicKey';
import { JSONSerializable } from '../../util/json';
import { AccAddress } from '../bech32';
import { BaseAccount as BaseAccount_pb } from '@terra-money/terra.proto/cosmos/auth/v1beta1/auth';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
/**
 * Stores information about an account fetched from the blockchain.
 */
export declare class BaseAccount extends JSONSerializable<BaseAccount.Amino, BaseAccount.Data, BaseAccount.Proto> {
    address: AccAddress;
    public_key: PublicKey | null;
    account_number: number;
    sequence: number;
    /**
     * Creates a new Account object, holding information about a basic account.
     *
     * @param address account address
     * @param public_key account's public key information
     * @param account_number account number on the blockchain
     * @param sequence sequence number, or number of transactions that have been posted
     */
    constructor(address: AccAddress, public_key: PublicKey | null, account_number: number, sequence: number);
    getAccountNumber(): number;
    getSequenceNumber(): number;
    getPublicKey(): PublicKey | null;
    toAmino(isClassic?: boolean): BaseAccount.Amino;
    static fromAmino(data: BaseAccount.Amino, _?: boolean): BaseAccount;
    static fromData(data: BaseAccount.Data, _?: boolean): BaseAccount;
    toData(_?: boolean): BaseAccount.Data;
    toProto(_?: boolean): BaseAccount.Proto;
    static fromProto(baseAccountProto: BaseAccount.Proto, _?: boolean): BaseAccount;
    packAny(isClassic?: boolean): Any;
    static unpackAny(pubkeyAny: Any, isClassic?: boolean): BaseAccount;
}
export declare namespace BaseAccount {
    interface AminoValue {
        address: AccAddress;
        public_key: PublicKey.Amino | null;
        account_number: string;
        sequence: string;
    }
    interface Amino {
        type: 'core/Account' | 'cosmos-sdk/BaseAccount';
        value: AminoValue;
    }
    interface DataValue {
        address: AccAddress;
        pub_key: PublicKey.Data | null;
        account_number: string;
        sequence: string;
    }
    interface Data extends DataValue {
        '@type': '/cosmos.auth.v1beta1.BaseAccount';
    }
    type Proto = BaseAccount_pb;
}
