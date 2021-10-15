import { ConsensusState as ConsensusState_pb } from '@terra-money/terra.proto/ibc/lightclients/tendermint/v1/tendermint';
import { MerkleRoot } from '../../core/commitment/MerkleRoot';
import { JSONSerializable } from '../../../../util/json';

/**
 * ConsensusState defines all the stored consensus states for a given client/
 */
export class ConsensusState extends JSONSerializable<
    ConsensusState.Amino,
    ConsensusState.Data,
    ConsensusState.Proto
> {
    /**
     * @param client_id client identifier
     * @param consensus_states consensus states and their heights associated with the client
     */
    constructor(
        public timestamp: Date | undefined,
        public root: MerkleRoot | undefined,
        public next_validators_hash: string
    ) {

        super();
    }

    public static fromAmino(_: any): ConsensusState {
        _;
        throw new Error('Amino not supported');
    }

    public toAmino(): any {
        throw new Error('Amino not supported');
    }


    public static fromData(
        data: ConsensusState.Data
    ): ConsensusState {
        const { timestamp, root, next_validators_hash } = data;
        return new ConsensusState(
            timestamp ? new Date(timestamp) : undefined,
            root ? MerkleRoot.fromData(root) : undefined,
            next_validators_hash
        );
    }

    public toData(): ConsensusState.Data {
        const { timestamp, root, next_validators_hash } = this;
        const res: ConsensusState.Data = {
            timestamp: timestamp ? timestamp.toISOString().replace(/\.000Z$/, 'Z') : undefined,
            root: root ? root.toData() : undefined,
            next_validators_hash
        };
        return res;
    }

    public static fromProto(
        proto: ConsensusState.Proto
    ): ConsensusState {
        return new ConsensusState(
            proto.timestamp as Date,
            proto.root ? MerkleRoot.fromProto(proto.root) : undefined,
            Buffer.from(proto.nextValidatorsHash).toString('base64')
        );
    }

    public toProto(): ConsensusState.Proto {
        const { timestamp, root, next_validators_hash } = this;
        return ConsensusState_pb.fromPartial({
            timestamp,
            root: root ? root.toProto() : undefined,
            nextValidatorsHash: Buffer.from(next_validators_hash, 'base64')
        });
    }
}

export namespace ConsensusState {
    export interface Amino {
        timestamp?: string;
        root?: MerkleRoot.Amino;
        next_validators_hash: string;
    }

    export interface Data {
        timestamp?: string;
        root?: MerkleRoot.Data;
        next_validators_hash: string;
    }

    export type Proto = ConsensusState_pb;
}
