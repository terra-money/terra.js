import { JSONSerializable } from '../../util/json';
import { ParamChange as ParamChange_pb } from '@terra-money/terra.proto/cosmos/params/v1beta1/params';
export declare class ParamChanges extends JSONSerializable<ParamChanges.Amino, ParamChanges.Data, ParamChanges.Proto> {
    paramChanges: ParamChange[];
    constructor(paramChanges: ParamChange[]);
    static fromAmino(proto: ParamChanges.Amino | null): ParamChanges;
    toAmino(): ParamChanges.Amino;
    static fromData(proto: ParamChanges.Data | null): ParamChanges;
    toData(): ParamChanges.Data;
    static fromProto(proto: ParamChanges.Proto | null): ParamChanges;
    toProto(): ParamChanges.Proto;
}
export declare namespace ParamChanges {
    type Amino = ParamChange.Amino[];
    type Data = ParamChange.Data[];
    type Proto = ParamChange.Proto[];
}
export declare class ParamChange extends JSONSerializable<ParamChange.Amino, ParamChange.Data, ParamChange.Proto> {
    subspace: string;
    key: string;
    value: string;
    constructor(subspace: string, key: string, value: string);
    static fromAmino(data: ParamChange.Amino): ParamChange;
    toAmino(): ParamChange.Amino;
    static fromData(data: ParamChange.Data): ParamChange;
    toData(): ParamChange.Data;
    static fromProto(proto: ParamChange.Proto): ParamChange;
    toProto(): ParamChange.Proto;
}
export declare namespace ParamChange {
    interface Amino {
        subspace: string;
        key: string;
        value: string;
    }
    interface Data {
        subspace: string;
        key: string;
        value: string;
    }
    type Proto = ParamChange_pb;
}
