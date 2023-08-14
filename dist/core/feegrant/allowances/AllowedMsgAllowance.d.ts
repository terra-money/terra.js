import { JSONSerializable } from '../../../util/json';
import { BasicAllowance } from './BasicAllowance';
import { PeriodicAllowance } from './PeriodicAllowance';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { AllowedMsgAllowance as AllowedMsgAllowance_pb } from '@terra-money/terra.proto/cosmos/feegrant/v1beta1/feegrant';
/**
 * AllowedMsgAllowance creates allowance only for specified message types.
 */
export declare class AllowedMsgAllowance extends JSONSerializable<AllowedMsgAllowance.Amino, AllowedMsgAllowance.Data, AllowedMsgAllowance.Proto> {
    allowance: BasicAllowance | PeriodicAllowance;
    allowed_messages: string[];
    /**
     * @param allowance any of basic and periodic fee allowance.
     * @param allowed_messages the messages for which the grantee has the access.
     */
    constructor(allowance: BasicAllowance | PeriodicAllowance, allowed_messages: string[]);
    static fromAmino(data: AllowedMsgAllowance.Amino, isClassic?: boolean): AllowedMsgAllowance;
    toAmino(isClassic?: boolean): AllowedMsgAllowance.Amino;
    static fromData(proto: AllowedMsgAllowance.Data, _?: boolean): AllowedMsgAllowance;
    toData(_?: boolean): AllowedMsgAllowance.Data;
    static fromProto(proto: AllowedMsgAllowance.Proto, isClassic?: boolean): AllowedMsgAllowance;
    toProto(isClassic?: boolean): AllowedMsgAllowance.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): AllowedMsgAllowance;
}
export declare namespace AllowedMsgAllowance {
    interface Amino {
        type: 'feegrant/AllowedMsgAllowance' | 'cosmos-sdk/AllowedMsgAllowance';
        value: {
            allowance: BasicAllowance.Amino | PeriodicAllowance.Amino;
            allowed_messages: string[];
        };
    }
    interface Data {
        '@type': '/cosmos.feegrant.v1beta1.AllowedMsgAllowance';
        allowance: BasicAllowance.Data | PeriodicAllowance.Data;
        allowed_messages: string[];
    }
    type Proto = AllowedMsgAllowance_pb;
}
