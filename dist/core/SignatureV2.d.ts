import { PublicKey } from './PublicKey';
import { ModeInfo } from './Tx';
import { CompactBitArray } from './CompactBitArray';
import { SignMode as SignMode_pb } from '@terra-money/terra.proto/cosmos/tx/signing/v1beta1/signing';
export { SignMode } from '@terra-money/terra.proto/cosmos/tx/signing/v1beta1/signing';
export declare class SignatureV2 {
    public_key: PublicKey;
    data: SignatureV2.Descriptor;
    sequence: number;
    constructor(public_key: PublicKey, data: SignatureV2.Descriptor, sequence: number);
    static fromData(data: SignatureV2.Data): SignatureV2;
    toData(): SignatureV2.Data;
    static fromAmino(data: SignatureV2.Amino): SignatureV2;
}
export declare namespace SignatureV2 {
    const SignMode: typeof SignMode_pb;
    type SignMode = SignMode_pb;
    interface Amino {
        signature: string;
        pub_key: PublicKey.Amino;
    }
    interface Data {
        public_key: PublicKey.Data;
        data: Descriptor.Data;
        sequence: string;
    }
    class Descriptor {
        single?: Descriptor.Single;
        multi?: Descriptor.Multi;
        constructor(data: Descriptor.Single | Descriptor.Multi);
        static fromData(data: Descriptor.Data): Descriptor;
        toData(): Descriptor.Data;
        toModeInfoAndSignature(): [ModeInfo, Uint8Array];
    }
    namespace Descriptor {
        interface Data {
            single?: Descriptor.Single.Data;
            multi?: Descriptor.Multi.Data;
        }
        class Single {
            mode: SignMode;
            signature: string;
            constructor(mode: SignMode, signature: string);
            static fromData(data: Single.Data): Single;
            toData(): Single.Data;
        }
        namespace Single {
            interface Data {
                mode: string;
                signature: string;
            }
        }
        class Multi {
            bitarray: CompactBitArray;
            signatures: Descriptor[];
            constructor(bitarray: CompactBitArray, signatures: Descriptor[]);
            static fromData(data: Multi.Data): Multi;
            toData(): Multi.Data;
        }
        namespace Multi {
            interface Data {
                bitarray: CompactBitArray.Data;
                signatures: Descriptor.Data[];
            }
        }
    }
}
