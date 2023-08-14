import { JSONSerializable } from '../../../util/json';
import { Coins } from '../../Coins';
import { SendAuthorization as SendAuthorization_pb } from '@terra-money/terra.proto/cosmos/bank/v1beta1/authz';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
export declare class SendAuthorization extends JSONSerializable<SendAuthorization.Amino, SendAuthorization.Data, SendAuthorization.Proto> {
    spend_limit: Coins;
    constructor(spend_limit: Coins.Input);
    static fromAmino(data: SendAuthorization.Amino, _?: boolean): SendAuthorization;
    toAmino(isClassic?: boolean): SendAuthorization.Amino;
    static fromData(data: SendAuthorization.Data, _?: boolean): SendAuthorization;
    toData(_?: boolean): SendAuthorization.Data;
    static fromProto(proto: SendAuthorization.Proto, _?: boolean): SendAuthorization;
    toProto(_?: boolean): SendAuthorization.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): SendAuthorization;
}
export declare namespace SendAuthorization {
    interface Amino {
        type: 'msgauth/SendAuthorization' | 'cosmos-sdk/SendAuthorization';
        value: {
            spend_limit: Coins.Amino;
        };
    }
    interface Data {
        '@type': '/cosmos.bank.v1beta1.SendAuthorization';
        spend_limit: Coins.Data;
    }
    type Proto = SendAuthorization_pb;
}
