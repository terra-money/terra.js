import { JSONSerializable } from '../../util/json';
import { Coins } from '../Coins';
export declare class AuthorizationGrant extends JSONSerializable<AuthorizationGrant.Data> {
    authorization: Authorization;
    expiration: Date;
    constructor(authorization: Authorization, expiration: Date);
    static fromData(data: AuthorizationGrant.Data): AuthorizationGrant;
    toData(): AuthorizationGrant.Data;
}
export declare namespace AuthorizationGrant {
    interface Data {
        authorization: Authorization.Data;
        expiration: string;
    }
}
export declare type Authorization = SendAuthorization | GenericAuthorization;
export declare namespace Authorization {
    type Data = SendAuthorization.Data | GenericAuthorization.Data;
    function fromData(data: Authorization.Data): Authorization;
}
export declare class SendAuthorization extends JSONSerializable<SendAuthorization.Data> {
    spend_limit: Coins;
    constructor(spend_limit: Coins.Input);
    static fromData(data: SendAuthorization.Data): SendAuthorization;
    toData(): SendAuthorization.Data;
}
export declare class GenericAuthorization extends JSONSerializable<GenericAuthorization.Data> {
    grant_msg_type: string;
    constructor(grant_msg_type: string);
    static fromData(data: GenericAuthorization.Data): GenericAuthorization;
    toData(): GenericAuthorization.Data;
}
export declare namespace SendAuthorization {
    interface Data {
        type: 'msgauth/SendAuthorization';
        value: {
            spend_limit: Coins.Data;
        };
    }
}
export declare namespace GenericAuthorization {
    interface Data {
        type: 'msgauth/GenericAuthorization';
        value: {
            grant_msg_type: string;
        };
    }
}
