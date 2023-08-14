import { InterchainAccount as InterchainAccount_pb } from '@terra-money/terra.proto/ibc/applications/interchain_accounts/v1/account';
import { BaseAccount } from '../../../..';
import { JSONSerializable } from '../../../../util/json';
/**
 * An InterchainAccount is defined as a BaseAccount & the address of the account owner on the controller chain
 */
export declare class InterchainAccount extends JSONSerializable<InterchainAccount.Amino, InterchainAccount.Data, InterchainAccount.Proto> {
    base_account: BaseAccount | undefined;
    account_owner: string;
    /**
     * @param base_account
     * @param account_owner
     */
    constructor(base_account: BaseAccount | undefined, account_owner: string);
    static fromAmino(data: InterchainAccount.Amino): InterchainAccount;
    toAmino(): InterchainAccount.Amino;
    static fromData(data: InterchainAccount.Data): InterchainAccount;
    toData(): InterchainAccount.Data;
    static fromProto(proto: InterchainAccount.Proto): InterchainAccount;
    toProto(): InterchainAccount.Proto;
}
export declare namespace InterchainAccount {
    interface Amino {
        base_account?: BaseAccount.Amino;
        account_owner: string;
    }
    interface Data {
        base_account?: BaseAccount.Data;
        account_owner: string;
    }
    type Proto = InterchainAccount_pb;
}
