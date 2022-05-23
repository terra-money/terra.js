import { Metadata as Metadata_pb } from '@terra-money/terra.proto/ibc/applications/fee/v1/metadata';
import { JSONSerializable } from '../../../../util/json';

/**
 * Metadata defines the ICS29 channel specific metadata encoded into the channel version bytestring
 * See ICS004: https://github.com/cosmos/ibc/tree/master/spec/core/ics-004-channel-and-packet-semantics#Versioning
 */
export class Metadata extends JSONSerializable<
    Metadata.Amino,
    Metadata.Data,
    Metadata.Proto
> {
    /** 
     * @param fee_version fee_version defines the ICS29 fee version
     * @param app_version app_version defines the underlying application version, which may or may not be a JSON encoded bytestring
     */
    constructor(
        public fee_version: string,
        public app_version: string,
    ) {
        super();
    }

    public static fromAmino(data: Metadata.Amino): Metadata {
        const { fee_version, app_version } = data;
        return new Metadata(fee_version, app_version);
    }

    public toAmino(): Metadata.Amino {
        const { fee_version, app_version } = this;
        const res: Metadata.Amino = {
            fee_version,
            app_version,
        };
        return res;
    }

    public static fromData(data: Metadata.Data): Metadata {
        const { fee_version, app_version } = data;
        return new Metadata(
            fee_version,
            app_version,
        );
    }

    public toData(): Metadata.Data {
        const { fee_version, app_version } = this;
        const res: Metadata.Data = {
            fee_version,
            app_version,
        };
        return res;
    }

    public static fromProto(proto: Metadata.Proto): Metadata {
        return new Metadata(
            proto.feeVersion,
            proto.appVersion,
        );
    }

    public toProto(): Metadata.Proto {
        const { fee_version, app_version } = this;
        return Metadata_pb.fromPartial({
            feeVersion: fee_version,
            appVersion: app_version,
        });
    }
}

export namespace Metadata {
    export interface Amino {
        fee_version: string;
        app_version: string;
    }

    export interface Data {
        fee_version: string;
        app_version: string;
    }

    export type Proto = Metadata_pb;
}
