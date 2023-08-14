import { MerklePrefix as MerklePrefix_pb } from '@terra-money/terra.proto/ibc/core/commitment/v1/commitment';
import { JSONSerializable } from '../../../../util/json';
export declare class MerklePrefix extends JSONSerializable<MerklePrefix.Amino, MerklePrefix.Data, MerklePrefix.Proto> {
    key_prefix: string;
    /**
     * @param key_prefix
     */
    constructor(key_prefix: string);
    static fromAmino(data: MerklePrefix.Amino): MerklePrefix;
    toAmino(): MerklePrefix.Amino;
    static fromData(data: MerklePrefix.Data): MerklePrefix;
    toData(): MerklePrefix.Data;
    static fromProto(proto: MerklePrefix.Proto): MerklePrefix;
    toProto(): MerklePrefix.Proto;
}
export declare namespace MerklePrefix {
    interface Amino {
        key_prefix: string;
    }
    interface Data {
        key_prefix: string;
    }
    type Proto = MerklePrefix_pb;
}
