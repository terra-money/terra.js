import { Counterparty as Counterparty_pb } from '@terra-money/terra.proto/ibc/core/connection/v1/connection';
import { JSONSerializable } from '../../../../util/json';
import { MerklePrefix } from './MerklePrefix';

/** Counterparty defines a channel end counterparty */
export class Counterparty extends JSONSerializable<
  Counterparty.Amino,
  Counterparty.Data,
  Counterparty.Proto
> {
  /**
   * @param client_id identifies the client on the counterparty chain associated with a given connection.
   * @param connection_id identifies the connection end on the counterparty chain associated with a given connection.
   * @param prefix commitment merkle prefix of the counterparty chain.
   */
  constructor(
    public client_id: string,
    public connection_id: string,
    public prefix: MerklePrefix
  ) {
    super();
  }

  public static fromAmino(data: Counterparty.Amino): Counterparty {
    const { client_id, connection_id, prefix } = data;
    return new Counterparty(
      client_id,
      connection_id,
      MerklePrefix.fromAmino(prefix)
    );
  }

  public toAmino(): Counterparty.Amino {
    const { client_id, connection_id, prefix } = this;
    const res: Counterparty.Amino = {
      client_id,
      connection_id,
      prefix,
    };
    return res;
  }

  public static fromData(data: Counterparty.Data): Counterparty {
    const { client_id, connection_id, prefix } = data;
    return new Counterparty(
      client_id,
      connection_id,
      MerklePrefix.fromData(prefix)
    );
  }

  public toData(): Counterparty.Data {
    const { client_id, connection_id, prefix } = this;
    const res: Counterparty.Data = {
      client_id,
      connection_id,
      prefix,
    };
    return res;
  }

  public static fromProto(proto: Counterparty.Proto): Counterparty {
    return new Counterparty(
      proto.clientId,
      proto.connectionId,
      MerklePrefix.fromProto(proto.prefix)
    );
  }

  public toProto(): Counterparty.Proto {
    const { client_id, connection_id, prefix } = this;
    return Counterparty_pb.fromPartial({
      clientId: client_id,
      connectionId: connection_id,
      prefix: prefix.toProto(),
    });
  }
}

export namespace Counterparty {
  export interface Amino {
    client_id: string;
    connection_id: string;
    prefix: MerklePrefix.Amino;
  }

  export interface Data {
    client_id: string;
    connection_id: string;
    prefix: MerklePrefix.Data;
  }

  export type Proto = Counterparty_pb;
}
