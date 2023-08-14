/// <reference types="node" />
import { PublicKey } from './PublicKey';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { SignMode as SignMode_pb } from '@terra-money/terra.proto/cosmos/tx/signing/v1beta1/signing';
import { Tx as Tx_pb, TxBody as TxBody_pb, SignerInfo as SignerInfo_pb, ModeInfo as ModeInfo_pb, AuthInfo as AuthInfo_pb, ModeInfo_Single as ModeInfoSingle_pb, ModeInfo_Multi as ModeInfoMulti_pb } from '@terra-money/terra.proto/cosmos/tx/v1beta1/tx';
import { CompactBitArray } from './CompactBitArray';
import { Msg } from './Msg';
import { Fee } from './Fee';
import { SignatureV2 } from './SignatureV2';
import { SignerData } from '../client/lcd/api/TxAPI';
export declare class Tx {
    body: TxBody;
    auth_info: AuthInfo;
    signatures: string[];
    constructor(body: TxBody, auth_info: AuthInfo, signatures: string[]);
    static fromAmino(data: Tx.Amino, isClassic?: boolean): Tx;
    static fromData(data: Tx.Data, isClassic?: boolean): Tx;
    toData(isClassic?: boolean): Tx.Data;
    static unpackAny(anyProto: Any, isClassic?: boolean): Tx;
    static fromProto(proto: Tx.Proto, isClassic?: boolean): Tx;
    toProto(isClassic?: boolean): Tx.Proto;
    toBytes(isClassic?: boolean): Uint8Array;
    static fromBuffer(buf: Buffer, isClassic?: boolean): Tx;
    appendEmptySignatures(signers: SignerData[]): void;
    clearSignatures(): void;
    appendSignatures(signatures: SignatureV2[]): void;
}
export declare namespace Tx {
    interface Amino {
        type: 'core/StdTx' | 'cosmos-sdk/StdTx';
        value: {
            msg: Msg.Amino[];
            fee: Fee.Amino;
            signatures: SignatureV2.Amino[];
            memo: string;
            timeout_height: string;
        };
    }
    interface Data {
        body: TxBody.Data;
        auth_info: AuthInfo.Data;
        signatures: string[];
    }
    type Proto = Tx_pb;
}
export declare class TxBody {
    messages: Msg[];
    memo?: string | undefined;
    timeout_height?: number | undefined;
    constructor(messages: Msg[], memo?: string | undefined, timeout_height?: number | undefined);
    static fromData(data: TxBody.Data, isClassic?: boolean): TxBody;
    toData(isClassic?: boolean): TxBody.Data;
    static fromProto(proto: TxBody.Proto, isClassic?: boolean): TxBody;
    toProto(isClassic?: boolean): TxBody.Proto;
    toBytes(isClassic?: boolean): Uint8Array;
}
export declare namespace TxBody {
    interface Data {
        messages: Msg.Data[];
        memo: string;
        timeout_height: string;
    }
    type Proto = TxBody_pb;
}
export declare class AuthInfo {
    signer_infos: SignerInfo[];
    fee: Fee;
    constructor(signer_infos: SignerInfo[], fee: Fee);
    static fromData(data: AuthInfo.Data): AuthInfo;
    toData(): AuthInfo.Data;
    static fromProto(proto: AuthInfo.Proto): AuthInfo;
    toProto(): AuthInfo.Proto;
    toBytes(): Uint8Array;
}
export declare namespace AuthInfo {
    interface Data {
        signer_infos: SignerInfo.Data[];
        fee: Fee.Data;
    }
    type Proto = AuthInfo_pb;
}
export declare class SignerInfo {
    public_key: PublicKey;
    sequence: number;
    mode_info: ModeInfo;
    constructor(public_key: PublicKey, sequence: number, mode_info: ModeInfo);
    static fromData(data: SignerInfo.Data): SignerInfo;
    toData(): SignerInfo.Data;
    static fromProto(proto: SignerInfo.Proto): SignerInfo;
    toProto(): SignerInfo.Proto;
}
export declare namespace SignerInfo {
    interface Data {
        public_key: PublicKey.Data | null;
        mode_info: ModeInfo.Data;
        sequence: string;
    }
    type Proto = SignerInfo_pb;
}
export declare class ModeInfo {
    single?: ModeInfo.Single;
    multi?: ModeInfo.Multi;
    constructor(mode_info: ModeInfo.Single | ModeInfo.Multi);
    static fromData(data: ModeInfo.Data): ModeInfo;
    toData(): ModeInfo.Data;
    static fromProto(proto: ModeInfo.Proto): ModeInfo;
    toProto(): ModeInfo.Proto;
}
export declare namespace ModeInfo {
    interface Data {
        single?: Single.Data;
        multi?: Multi.Data;
    }
    type Proto = ModeInfo_pb;
    const SignMode: typeof SignMode_pb;
    type SignMode = SignMode_pb;
    class Single {
        mode: SignMode;
        constructor(mode: SignMode);
        static fromData(data: Single.Data): Single;
        toData(): Single.Data;
        static fromProto(proto: Single.Proto): Single;
        toProto(): Single.Proto;
    }
    namespace Single {
        interface Data {
            mode: string;
        }
        type Proto = ModeInfoSingle_pb;
    }
    class Multi {
        bitarray: CompactBitArray;
        modeInfos: ModeInfo[];
        constructor(bitarray: CompactBitArray, modeInfos: ModeInfo[]);
        static fromData(proto: Multi.Data): Multi;
        toData(): Multi.Data;
        static fromProto(proto: Multi.Proto): Multi;
        toProto(): Multi.Proto;
    }
    namespace Multi {
        interface Data {
            bitarray: CompactBitArray.Data;
            mode_infos: ModeInfo.Data[];
        }
        type Proto = ModeInfoMulti_pb;
    }
}
