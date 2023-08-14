import { Metadata as Metadata_pb } from '@terra-money/terra.proto/ibc/applications/fee/v1/metadata';
import { JSONSerializable } from '../../../../util/json';
/**
 * Metadata defines the ICS29 channel specific metadata encoded into the channel version bytestring
 * See ICS004: https://github.com/cosmos/ibc/tree/master/spec/core/ics-004-channel-and-packet-semantics#Versioning
 */
export declare class Metadata extends JSONSerializable<Metadata.Amino, Metadata.Data, Metadata.Proto> {
    fee_version: string;
    app_version: string;
    /**
     * @param fee_version fee_version defines the ICS29 fee version
     * @param app_version app_version defines the underlying application version, which may or may not be a JSON encoded bytestring
     */
    constructor(fee_version: string, app_version: string);
    static fromAmino(data: Metadata.Amino): Metadata;
    toAmino(): Metadata.Amino;
    static fromData(data: Metadata.Data): Metadata;
    toData(): Metadata.Data;
    static fromProto(proto: Metadata.Proto): Metadata;
    toProto(): Metadata.Proto;
}
export declare namespace Metadata {
    interface Amino {
        fee_version: string;
        app_version: string;
    }
    interface Data {
        fee_version: string;
        app_version: string;
    }
    type Proto = Metadata_pb;
}
