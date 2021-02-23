import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../strings';
import { Int } from '../../numeric';
import { Authorization } from '../Authorization';
export declare class MsgGrantAuthorization extends JSONSerializable<MsgGrantAuthorization.Data> {
    granter: AccAddress;
    grantee: AccAddress;
    authorization: Authorization;
    period: Int;
    /**
     * @param depositor depositor's account address
     * @param amount coins to fund the community pool
     */
    constructor(granter: AccAddress, grantee: AccAddress, authorization: Authorization, period: Int);
    static fromData(data: MsgGrantAuthorization.Data): MsgGrantAuthorization;
    toData(): MsgGrantAuthorization.Data;
}
export declare namespace MsgGrantAuthorization {
    interface Data {
        type: 'msgauth/MsgGrantAuthorization';
        value: {
            granter: AccAddress;
            grantee: AccAddress;
            authorization: Authorization.Data;
            period: string;
        };
    }
}
