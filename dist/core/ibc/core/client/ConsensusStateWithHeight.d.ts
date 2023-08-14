import { ConsensusStateWithHeight as ConsensusStateWithHeight_pb } from '@terra-money/terra.proto/ibc/core/client/v1/client';
import { Height } from './Height';
import { JSONSerializable } from '../../../../util/json';
/**
 * ConsensusStateWithHeight defines a consensus state with an additional height field.
 */
export declare class ConsensusStateWithHeight extends JSONSerializable<ConsensusStateWithHeight.Amino, ConsensusStateWithHeight.Data, ConsensusStateWithHeight.Proto> {
    height: Height | undefined;
    consensus_state: any;
    /**
     * @param height consensus state height
     * @param consensus_state consensus state
     */
    constructor(height: Height | undefined, consensus_state: any);
    static fromAmino(data: ConsensusStateWithHeight.Amino): ConsensusStateWithHeight;
    toAmino(): ConsensusStateWithHeight.Amino;
    static fromData(data: ConsensusStateWithHeight.Data): ConsensusStateWithHeight;
    toData(): ConsensusStateWithHeight.Data;
    static fromProto(proto: ConsensusStateWithHeight.Proto): ConsensusStateWithHeight;
    toProto(): ConsensusStateWithHeight.Proto;
}
export declare namespace ConsensusStateWithHeight {
    interface Amino {
        height?: Height.Amino;
        consensus_state: any;
    }
    interface Data {
        height?: Height.Data;
        consensus_state: any;
    }
    type Proto = ConsensusStateWithHeight_pb;
}
