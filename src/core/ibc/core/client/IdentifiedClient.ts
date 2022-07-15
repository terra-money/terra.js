import { IdentifiedClientState as IdentifiedClientState_pb } from '@terra-money/terra.proto/ibc/core/client/v1/client';
import { JSONSerializable } from '../../../../util/json';

/**
 * IdentifiedClientState defines a client state with an additional client identifier field
 */
export class IdentifiedClientState extends JSONSerializable<
  IdentifiedClientState.Amino,
  IdentifiedClientState.Data,
  IdentifiedClientState.Proto
> {
  /**
   * @param client_id client identifier
   * @param client_state client state
   */
  constructor(public client_id: string, public client_state: any) {
    super();
  }

  public static fromAmino(
    data: IdentifiedClientState.Amino
  ): IdentifiedClientState {
    const { client_id, client_state } = data;
    return new IdentifiedClientState(client_id, client_state);
  }

  public toAmino(): IdentifiedClientState.Amino {
    const { client_id, client_state } = this;
    const res: IdentifiedClientState.Amino = {
      client_id: client_id,
      client_state: client_state,
    };
    return res;
  }

  public static fromData(
    data: IdentifiedClientState.Data
  ): IdentifiedClientState {
    const { client_id, client_state } = data;
    return new IdentifiedClientState(client_id, client_state);
  }

  public toData(): IdentifiedClientState.Data {
    const { client_id, client_state } = this;
    const res: IdentifiedClientState.Data = {
      client_id,
      client_state,
    };
    return res;
  }

  public static fromProto(
    proto: IdentifiedClientState.Proto
  ): IdentifiedClientState {
    return new IdentifiedClientState(proto.clientId, proto.clientState);
  }

  public toProto(): IdentifiedClientState.Proto {
    const { client_id, client_state } = this;
    return IdentifiedClientState_pb.fromPartial({
      clientId: client_id,
      clientState: client_state,
    });
  }
}

export namespace IdentifiedClientState {
  export interface Amino {
    client_id: string;
    client_state: any;
  }

  export interface Data {
    client_id: string;
    client_state: any;
  }

  export type Proto = IdentifiedClientState_pb;
}
