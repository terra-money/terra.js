import { MerkleRoot as MerkleRoot_pb } from '@terra-money/terra.proto/ibc/core/commitment/v1/commitment';
import { JSONSerializable } from '../../../../util/json';
export declare class MerkleRoot extends JSONSerializable<MerkleRoot.Amino, MerkleRoot.Data, MerkleRoot.Proto> {
    hash: string;
    /**
     * @param hash
     */
    constructor(hash: string);
    static fromAmino(_: any): MerkleRoot;
    toAmino(): any;
    static fromData(data: MerkleRoot.Data): MerkleRoot;
    toData(): MerkleRoot.Data;
    static fromProto(proto: MerkleRoot.Proto): MerkleRoot;
    toProto(): MerkleRoot.Proto;
}
export declare namespace MerkleRoot {
    interface Amino {
        hash: string;
    }
    interface Data {
        hash: string;
    }
    type Proto = MerkleRoot_pb;
}
