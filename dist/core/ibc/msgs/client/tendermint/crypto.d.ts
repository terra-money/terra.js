import { Proof as Proof_pb } from '@terra-money/terra.proto/tendermint/crypto/proof';
import { PublicKey as PublicKey_pb } from '@terra-money/terra.proto/tendermint/crypto/keys';
import { JSONSerializable } from '../../../../../util/json';
export declare class Proof extends JSONSerializable<any, Proof.Data, Proof.Proto> {
    total: number;
    index: number;
    leafHash: string;
    aunts: string[];
    /**
     * @param total
     * @param index
     * @param leafHash
     * @param aunts
     */
    constructor(total: number, index: number, leafHash: string, aunts: string[]);
    static fromAmino(_: any): Proof;
    toAmino(): any;
    static fromData(data: Proof.Data): Proof;
    toData(): Proof.Data;
    static fromProto(proto: Proof.Proto): Proof;
    toProto(): Proof.Proto;
}
export declare namespace Proof {
    interface Data {
        total: string;
        index: string;
        leaf_hash: string;
        aunts: string[];
    }
    type Proto = Proof_pb;
}
/** PublicKey defines the keys available for use with Tendermint Validators */
export declare class PublicKey extends JSONSerializable<any, PublicKey.Data, PublicKey.Proto> {
    ed25519?: string | undefined;
    secp256k1?: string | undefined;
    /**
     * @param ed25519
     * @param secp256k1
     */
    constructor(ed25519?: string | undefined, secp256k1?: string | undefined);
    static fromAmino(_: any): PublicKey;
    toAmino(): any;
    static fromData(data: PublicKey.Data): PublicKey;
    toData(): PublicKey.Data;
    static fromProto(proto: PublicKey.Proto): PublicKey;
    toProto(): PublicKey.Proto;
}
export declare namespace PublicKey {
    interface Data {
        ed25519?: string;
        secp256k1?: string;
    }
    type Proto = PublicKey_pb;
}
