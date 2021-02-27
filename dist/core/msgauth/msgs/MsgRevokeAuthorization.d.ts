import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../strings';
export declare class MsgRevokeAuthorization extends JSONSerializable<MsgRevokeAuthorization.Data> {
    granter: AccAddress;
    grantee: AccAddress;
    authorization_msg_type: string;
    /**
     * @param granter authorization granter
     * @param grantee authorization grantee
     * @param authorization_msg_type type of message to revoke
     */
    constructor(granter: AccAddress, grantee: AccAddress, authorization_msg_type: string);
    static fromData(data: MsgRevokeAuthorization.Data): MsgRevokeAuthorization;
    toData(): MsgRevokeAuthorization.Data;
}
export declare namespace MsgRevokeAuthorization {
    interface Data {
        type: 'msgauth/MsgRevokeAuthorization';
        value: {
            granter: AccAddress;
            grantee: AccAddress;
            authorization_msg_type: string;
        };
    }
}
