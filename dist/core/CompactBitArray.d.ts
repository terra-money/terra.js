/// <reference types="node" />
import { CompactBitArray as CompactBitArray_pb } from '@terra-money/terra.proto/cosmos/crypto/multisig/v1beta1/multisig';
export declare class CompactBitArray {
    extra_bits_stored: number;
    elems: Buffer;
    constructor(extra_bits_stored: number, elems: Buffer);
    static fromBits(bits: number): CompactBitArray;
    count(): number;
    getIndex(i: number): boolean;
    setIndex(i: number, v: boolean): boolean;
    numTrueBitsBefore(index: number): number;
    static fromData(data: CompactBitArray.Data): CompactBitArray;
    toData(): CompactBitArray.Data;
    static fromProto(proto: CompactBitArray.Proto): CompactBitArray;
    toProto(): CompactBitArray.Proto;
}
export declare namespace CompactBitArray {
    interface Data {
        extra_bits_stored: number;
        elems: string;
    }
    type Proto = CompactBitArray_pb;
}
