import { Version as Version_pb } from '@terra-money/terra.proto/ibc/core/connection/v1/connection';
import { JSONSerializable } from '../../../../util/json';
export declare class Version extends JSONSerializable<Version.Amino, Version.Data, Version.Proto> {
    identifier: string;
    features: string[];
    /**
     * @param identifier unique version identifier
     * @param features list of features compatible with the specified identifier
     */
    constructor(identifier: string, features: string[]);
    static fromAmino(data: Version.Amino): Version;
    toAmino(): Version.Amino;
    static fromData(data: Version.Data): Version;
    toData(): Version.Data;
    static fromProto(proto: Version.Proto): Version;
    toProto(): Version.Proto;
}
export declare namespace Version {
    interface Amino {
        identifier: string;
        features: string[];
    }
    interface Data {
        identifier: string;
        features: string[];
    }
    type Proto = Version_pb;
}
