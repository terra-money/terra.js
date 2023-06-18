import { Metadata as Metadata_pb } from '@terra-money/terra.proto/ibc/applications/interchain_accounts/v1/metadata';
import { JSONSerializable } from '../../../../../util/json';

/**
 * Metadata defines a set of protocol specific data encoded into the ICS27 channel version bytestring
 * See ICS004: https://github.com/cosmos/ibc/tree/master/spec/core/ics-004-channel-and-packet-semantics#Versioning
 */
export class Metadata extends JSONSerializable<
  any,
  Metadata.Data,
  Metadata.Proto
> {
  /**
   * @param version defines the ICS27 protocol version
   * @param controller_connection_id is the connection identifier associated with the controller chain
   * @param host_connection_id is the connection identifier associated with the host chain
   * @param address defines the interchain account address to be fulfilled upon the OnChanOpenTry handshake step ( NOTE: the address field is empty on the OnChanOpenInit handshake step)
   * @param encoding defines the supported codec format
   * @param tx_type defines the type of transactions the interchain account can execute
   */
  constructor(
    public version: string,
    public controller_connection_id: string,
    public host_connection_id: string,
    public address: string,
    public encoding: string,
    public tx_type: string
  ) {
    super();
  }

  public static fromAmino() {
    throw new Error('Amino not supported');
  }

  public toAmino() {
    throw new Error('Amino not supported');
  }

  public static fromData(data: Metadata.Data): Metadata {
    const {
      version,
      controller_connection_id,
      host_connection_id,
      address,
      encoding,
      tx_type,
    } = data;
    return new Metadata(
      version,
      controller_connection_id,
      host_connection_id,
      address,
      encoding,
      tx_type
    );
  }

  public toData(): Metadata.Data {
    const {
      version,
      controller_connection_id,
      host_connection_id,
      address,
      encoding,
      tx_type,
    } = this;
    return {
      '@type': '/ibc.applications.interchain_accounts.v1.Metadata',
      version,
      controller_connection_id,
      host_connection_id,
      address,
      encoding,
      tx_type,
    };
  }

  public static fromProto(proto: Metadata.Proto): Metadata {
    return new Metadata(
      proto.version,
      proto.controllerConnectionId,
      proto.hostConnectionId,
      proto.address,
      proto.encoding,
      proto.txType
    );
  }

  public toProto(): Metadata.Proto {
    const {
      version,
      controller_connection_id,
      host_connection_id,
      address,
      encoding,
      tx_type,
    } = this;
    return Metadata_pb.fromPartial({
      version: version,
      controllerConnectionId: controller_connection_id,
      hostConnectionId: host_connection_id,
      address: address,
      encoding: encoding,
      txType: tx_type,
    });
  }
}

export namespace Metadata {
  export interface Data {
    '@type': '/ibc.applications.interchain_accounts.v1.Metadata';
    version: string;
    controller_connection_id: string;
    host_connection_id: string;
    address: string;
    encoding: string;
    tx_type: string;
  }

  export type Proto = Metadata_pb;
}
