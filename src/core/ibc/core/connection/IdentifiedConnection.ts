import { IdentifiedConnection as IdentifiedConnection_pb } from '@terra-money/terra.proto/ibc/core/connection/v1/connection';
import { JSONSerializable } from '../../../../util/json';
import { Version } from './Version';
import {
  State,
  stateFromJSON,
  stateToJSON,
} from '@terra-money/terra.proto/ibc/core/connection/v1/connection';
import { Counterparty } from './Counterparty';
import Long from 'long';

export { State, stateFromJSON, stateToJSON };

/**
 * IdentifiedConnection defines a connection with additional connection identifier field
 */
export class IdentifiedConnection extends JSONSerializable<
  IdentifiedConnection.Amino,
  IdentifiedConnection.Data,
  IdentifiedConnection.Proto
> {
  /**
   * @param id connection identifier
   * @param client_id client associated with this connection.
   * @param versions IBC version which can be utilised to determine encodings or protocols for channels or packets utilising this connection
   * @param state current state of the connection end
   * @param counterparty counterparty chain associated with this connection
   * @param delay_period delay period associated with this connection
   */
  constructor(
    public id: string,
    public client_id: string,
    public versions: Version[],
    public state: State,
    public counterparty: Counterparty | undefined,
    public delay_period: number
  ) {
    super();
  }

  public static fromAmino(
    data: IdentifiedConnection.Amino
  ): IdentifiedConnection {
    const { id, client_id, versions, state, counterparty, delay_period } = data;
    return new IdentifiedConnection(
      id,
      client_id,
      versions.map(Version.fromAmino),
      stateFromJSON(state),
      counterparty ? Counterparty.fromAmino(counterparty) : undefined,
      Number.parseInt(delay_period)
    );
  }

  public toAmino(): IdentifiedConnection.Amino {
    const { id, client_id, versions, state, counterparty, delay_period } = this;
    const res: IdentifiedConnection.Amino = {
      id,
      client_id,
      versions: versions.map(version => version.toAmino()),
      state: stateToJSON(state),
      counterparty: counterparty?.toAmino(),
      delay_period: delay_period.toFixed(),
    };
    return res;
  }

  public static fromData(
    data: IdentifiedConnection.Data
  ): IdentifiedConnection {
    const { id, client_id, versions, state, counterparty, delay_period } = data;
    return new IdentifiedConnection(
      id,
      client_id,
      versions.map(Version.fromData),
      stateFromJSON(state),
      counterparty ? Counterparty.fromData(counterparty) : undefined,
      Number.parseInt(delay_period)
    );
  }

  public toData(): IdentifiedConnection.Data {
    const { id, client_id, versions, state, counterparty, delay_period } = this;
    const res: IdentifiedConnection.Amino = {
      id,
      client_id,
      versions: versions.map(version => version.toData()),
      state: stateToJSON(state),
      counterparty: counterparty?.toData(),
      delay_period: delay_period.toFixed(),
    };
    return res;
  }

  public static fromProto(
    proto: IdentifiedConnection.Proto
  ): IdentifiedConnection {
    return new IdentifiedConnection(
      proto.id,
      proto.clientId,
      proto.versions.map(Version.fromProto),
      proto.state,
      proto.counterparty
        ? Counterparty.fromProto(proto.counterparty)
        : undefined,
      proto.delayPeriod.toNumber()
    );
  }

  public toProto(): IdentifiedConnection.Proto {
    const { id, client_id, versions, state, counterparty, delay_period } = this;
    return IdentifiedConnection_pb.fromPartial({
      id,
      clientId: client_id,
      versions: versions.map(v => v.toProto()),
      state,
      counterparty: counterparty?.toProto(),
      delayPeriod: Long.fromNumber(delay_period),
    });
  }
}

export namespace IdentifiedConnection {
  export interface Amino {
    id: string;
    client_id: string;
    versions: Version.Amino[];
    state: string;
    counterparty?: Counterparty.Amino;
    delay_period: string;
  }

  export interface Data {
    id: string;
    client_id: string;
    versions: Version.Data[];
    state: string;
    counterparty?: Counterparty.Data;
    delay_period: string;
  }

  export type Proto = IdentifiedConnection_pb;
}
