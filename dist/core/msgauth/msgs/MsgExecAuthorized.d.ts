import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../strings';
import { Msg } from '../../Msg';
export declare class MsgExecAuthorized extends JSONSerializable<MsgExecAuthorized.Data> {
    grantee: AccAddress;
    msgs: Msg[];
    /**
     * @param grantee authorization grantee
     * @param msgs list of messages to execute
     */
    constructor(grantee: AccAddress, msgs: Msg[]);
    static fromData(data: MsgExecAuthorized.Data): MsgExecAuthorized;
    toData(): MsgExecAuthorized.Data;
}
export declare namespace MsgExecAuthorized {
    interface Data {
        type: 'msgauth/MsgExecAuthorized';
        value: {
            grantee: AccAddress;
            msgs: Msg.Data[];
        };
    }
}
