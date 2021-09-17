import { ConsensusStateWithHeight as ConsensusStateWithHeight_pb } from '@terra-money/terra.proto/ibc/core/client/v1/client';
import { Height } from './Height';
import { JSONSerializable } from '../../../../util/json';

/**
 * ConsensusStateWithHeight defines a consensus state with an additional height field.
 */
export class ConsensusStateWithHeight extends JSONSerializable<
  ConsensusStateWithHeight.Amino,
  ConsensusStateWithHeight.Data,
  ConsensusStateWithHeight.Proto
> {
  public height: Height;
  public consensus_state: any;

  /**
   * @param height consensus state height
   * @param consensus_state consensus state
   */
  constructor(height: Height, consensus_state: any) {
    super();
    this.height = height;
    this.consensus_state = consensus_state;
  }

  public static fromAmino(
    data: ConsensusStateWithHeight.Amino
  ): ConsensusStateWithHeight {
    const { height, consensus_state } = data;
    return new ConsensusStateWithHeight(
      Height.fromAmino(height),
      consensus_state
    );
  }

  public toAmino(): ConsensusStateWithHeight.Amino {
    const { height, consensus_state } = this;
    const res: ConsensusStateWithHeight.Amino = {
      height: height.toAmino(),
      consensus_state: consensus_state,
    };
    return res;
  }

  public static fromData(
    data: ConsensusStateWithHeight.Data
  ): ConsensusStateWithHeight {
    const { height, consensus_state } = data;
    return new ConsensusStateWithHeight(
      Height.fromData(height),
      consensus_state
    );
  }

  public toData(): ConsensusStateWithHeight.Data {
    const { height, consensus_state } = this;
    const res: ConsensusStateWithHeight.Data = {
      height: height.toData(),
      consensus_state,
    };
    return res;
  }

  public static fromProto(
    proto: ConsensusStateWithHeight.Proto
  ): ConsensusStateWithHeight {
    return new ConsensusStateWithHeight(
      proto.height ? Height.fromProto(proto.height) : new Height(0, 0), // FIXME: is this okay with new object?
      proto.consensusState
    );
  }

  public toProto(): ConsensusStateWithHeight.Proto {
    const { height, consensus_state } = this;
    return ConsensusStateWithHeight_pb.fromPartial({
      height: height.toProto(),
      consensusState: consensus_state,
    });
  }
}

export namespace ConsensusStateWithHeight {
  export interface Amino {
    height: Height.Amino;
    consensus_state: any;
  }

  export interface Data {
    height: Height.Data;
    consensus_state: any;
  }

  export type Proto = ConsensusStateWithHeight_pb;
}
