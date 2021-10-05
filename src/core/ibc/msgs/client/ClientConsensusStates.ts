import { ClientConsensusStates as ClientConsensusStates_pb } from '@terra-money/terra.proto/ibc/core/client/v1/client';
import { JSONSerializable } from '../../../../util/json';
import { ConsensusStateWithHeight } from './ConsensusStateWithHeight';

/**
 * ClientConsensusStates defines all the stored consensus states for a given client/
 */
export class ClientConsensusStates extends JSONSerializable<
  ClientConsensusStates.Amino,
  ClientConsensusStates.Data,
  ClientConsensusStates.Proto
> {
  /**
   * @param client_id client identifier
   * @param consensus_states consensus states and their heights associated with the client
   */
  constructor(
    public client_id: string,
    public consensus_states: ConsensusStateWithHeight[]
  ) {
    super();
  }

  public static fromAmino(
    data: ClientConsensusStates.Amino
  ): ClientConsensusStates {
    const { client_id, consensus_states } = data;
    return new ClientConsensusStates(
      client_id,
      consensus_states.map(state => ConsensusStateWithHeight.fromAmino(state))
    );
  }

  public toAmino(): ClientConsensusStates.Amino {
    const { client_id, consensus_states } = this;
    const res: ClientConsensusStates.Amino = {
      client_id: client_id,
      consensus_states: consensus_states.map(state => state.toAmino()),
    };
    return res;
  }

  public static fromData(
    data: ClientConsensusStates.Data
  ): ClientConsensusStates {
    const { client_id, consensus_states } = data;
    return new ClientConsensusStates(
      client_id,
      consensus_states.map(state => ConsensusStateWithHeight.fromData(state))
    );
  }

  public toData(): ClientConsensusStates.Data {
    const { client_id, consensus_states } = this;
    const res: ClientConsensusStates.Data = {
      client_id,
      consensus_states: consensus_states.map(state => state.toData()),
    };
    return res;
  }

  public static fromProto(
    proto: ClientConsensusStates.Proto
  ): ClientConsensusStates {
    return new ClientConsensusStates(
      proto.clientId,
      proto.consensusStates.map(state =>
        ConsensusStateWithHeight.fromProto(state)
      )
    );
  }

  public toProto(): ClientConsensusStates.Proto {
    const { client_id, consensus_states } = this;
    return ClientConsensusStates_pb.fromPartial({
      clientId: client_id,
      consensusStates: consensus_states.map(state => state.toProto()),
    });
  }
}

export namespace ClientConsensusStates {
  export interface Amino {
    client_id: string;
    consensus_states: ConsensusStateWithHeight.Amino[];
  }

  export interface Data {
    client_id: string;
    consensus_states: ConsensusStateWithHeight.Data[];
  }

  export type Proto = ClientConsensusStates_pb;
}
