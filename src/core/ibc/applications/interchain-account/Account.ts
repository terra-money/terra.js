import { InterchainAccount as InterchainAccount_pb } from '@terra-money/terra.proto/ibc/applications/interchain_accounts/v1/account';
import { BaseAccount } from '../../../..';
import { JSONSerializable } from '../../../../util/json';

/**
 * An InterchainAccount is defined as a BaseAccount & the address of the account owner on the controller chain
 */
export class InterchainAccount extends JSONSerializable<
    InterchainAccount.Amino,
    InterchainAccount.Data,
    InterchainAccount.Proto
> {
    /** 
     * @param base_account 
     * @param account_owner 
     */
    constructor(
        public base_account: BaseAccount | undefined,
        public account_owner: string,
    ) {
        super();
    }

    public static fromAmino(data: InterchainAccount.Amino): InterchainAccount {
        const { base_account, account_owner } = data;
        return new InterchainAccount(
            base_account ? BaseAccount.fromAmino(base_account) : undefined,
            account_owner
        );
    }

    public toAmino(): InterchainAccount.Amino {
        const { base_account, account_owner } = this;
        const res: InterchainAccount.Amino = {
            base_account: base_account?.toAmino(),
            account_owner,
        };
        return res;
    }

    public static fromData(data: InterchainAccount.Data): InterchainAccount {
        const { base_account, account_owner } = data;
        return new InterchainAccount(
            base_account ? BaseAccount.fromData(base_account) : undefined,
            account_owner,
        );
    }

    public toData(): InterchainAccount.Data {
        const { base_account, account_owner } = this;
        const res: InterchainAccount.Data = {
            base_account: base_account?.toData(),
            account_owner,
        };
        return res;
    }

    public static fromProto(proto: InterchainAccount.Proto): InterchainAccount {
        return new InterchainAccount(
            proto.baseAccount ? BaseAccount.fromProto(proto.baseAccount) : undefined,
            proto.accountOwner,
        );
    }

    public toProto(): InterchainAccount.Proto {
        const { base_account, account_owner } = this;
        return InterchainAccount_pb.fromPartial({
            baseAccount: base_account?.toProto(),
            accountOwner: account_owner,
        });
    }
}

export namespace InterchainAccount {
    export interface Amino {
        base_account?: BaseAccount.Amino;
        account_owner: string;
    }

    export interface Data {
        base_account?: BaseAccount.Data;
        account_owner: string;
    }

    export type Proto = InterchainAccount_pb;
}
