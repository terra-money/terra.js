import { JSONSerializable } from '../../../util/json';
import { GenericAuthorization as GenericAuthorization_pb } from '@terra-money/terra.proto/cosmos/authz/v1beta1/authz';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
export declare class GenericAuthorization extends JSONSerializable<GenericAuthorization.Amino, GenericAuthorization.Data, GenericAuthorization.Proto> {
    msg: string;
    constructor(msg: string);
    static fromAmino(data: GenericAuthorization.Amino, _?: boolean): GenericAuthorization;
    toAmino(isClassic?: boolean): GenericAuthorization.Amino;
    static fromData(data: GenericAuthorization.Data, _?: boolean): GenericAuthorization;
    toData(_?: boolean): GenericAuthorization.Data;
    static fromProto(data: GenericAuthorization.Proto, _?: boolean): GenericAuthorization;
    toProto(_?: boolean): GenericAuthorization.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): GenericAuthorization;
}
export declare namespace GenericAuthorization {
    interface Amino {
        type: 'msgauth/GenericAuthorization' | 'cosmos-sdk/GenericAuthorization';
        value: {
            msg: string;
        };
    }
    interface Data {
        '@type': '/cosmos.authz.v1beta1.GenericAuthorization';
        msg: string;
    }
    type Proto = GenericAuthorization_pb;
}
