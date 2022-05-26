import {
  PublicKey,
  SimplePublicKey,
  LegacyAminoMultisigPublicKey,
} from './PublicKey';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import {
  SignMode as SignMode_pb,
  signModeFromJSON,
  signModeToJSON,
} from '@terra-money/terra.proto/cosmos/tx/signing/v1beta1/signing';
import {
  Tx as Tx_pb,
  TxBody as TxBody_pb,
  SignerInfo as SignerInfo_pb,
  ModeInfo as ModeInfo_pb,
  AuthInfo as AuthInfo_pb,
  ModeInfo_Single as ModeInfoSingle_pb,
  ModeInfo_Multi as ModeInfoMulti_pb,
} from '@terra-money/terra.proto/cosmos/tx/v1beta1/tx';
import { CompactBitArray } from './CompactBitArray';
import { Msg } from './Msg';
import { Fee } from './Fee';
import * as Long from 'long';
import { SignatureV2 } from './SignatureV2';
import { SignerData } from '../client/lcd/api/TxAPI';

export class Tx {
  constructor(
    public body: TxBody,
    public auth_info: AuthInfo,
    public signatures: string[]
  ) {}

  public static fromAmino(data: Tx.Amino, isClassic?: boolean): Tx {
    const signatures = data.value.signatures.map(s => SignatureV2.fromAmino(s));

    return new Tx(
      new TxBody(
        data.value.msg.map(m => Msg.fromAmino(m, isClassic)),
        data.value.memo,
        Number.parseInt(data.value.timeout_height)
      ),
      new AuthInfo([], Fee.fromAmino(data.value.fee)),
      signatures.map(s => s.data.single?.signature || '')
    );
  }

  public static fromData(data: Tx.Data, isClassic?: boolean): Tx {
    return new Tx(
      TxBody.fromData(data.body, isClassic),
      AuthInfo.fromData(data.auth_info),
      data.signatures
    );
  }

  public toData(isClassic?: boolean): Tx.Data {
    return {
      body: this.body.toData(isClassic),
      auth_info: this.auth_info.toData(),
      signatures: this.signatures,
    };
  }

  public static unpackAny(anyProto: Any, isClassic?: boolean): Tx {
    return this.fromProto(Tx_pb.decode(anyProto.value), isClassic);
  }

  public static fromProto(proto: Tx.Proto, isClassic?: boolean): Tx {
    return new Tx(
      TxBody.fromProto(proto.body as TxBody_pb, isClassic),
      AuthInfo.fromProto(proto.authInfo as AuthInfo_pb),
      proto.signatures.map(sig => Buffer.from(sig).toString('base64'))
    );
  }

  public toProto(isClassic?: boolean): Tx.Proto {
    return Tx_pb.fromPartial({
      body: this.body.toProto(isClassic),
      authInfo: this.auth_info.toProto(),
      signatures: this.signatures.map(s => Buffer.from(s, 'base64')),
    });
  }

  public toBytes(isClassic?: boolean): Uint8Array {
    return Tx_pb.encode(this.toProto(isClassic)).finish();
  }

  public static fromBuffer(buf: Buffer, isClassic?: boolean): Tx {
    return Tx.fromProto(Tx_pb.decode(buf), isClassic);
  }

  public appendEmptySignatures(signers: SignerData[]) {
    signers.forEach(signer => {
      let signerInfo: SignerInfo;
      if (signer.publicKey) {
        if (signer.publicKey instanceof LegacyAminoMultisigPublicKey) {
          signerInfo = new SignerInfo(
            signer.publicKey,
            signer.sequenceNumber,
            new ModeInfo(
              new ModeInfo.Multi(
                CompactBitArray.fromBits(signer.publicKey.pubkeys.length),
                []
              )
            )
          );
        } else {
          signerInfo = new SignerInfo(
            signer.publicKey,
            signer.sequenceNumber,
            new ModeInfo(
              new ModeInfo.Single(ModeInfo.SignMode.SIGN_MODE_DIRECT)
            )
          );
        }
      } else {
        signerInfo = new SignerInfo(
          new SimplePublicKey(''),
          signer.sequenceNumber,
          new ModeInfo(new ModeInfo.Single(ModeInfo.SignMode.SIGN_MODE_DIRECT))
        );
      }

      this.auth_info.signer_infos.push(signerInfo);
      this.signatures.push('');
    });
  }

  public clearSignatures() {
    this.auth_info.signer_infos = [];
    this.signatures = [];
  }

  public appendSignatures(signatures: SignatureV2[]) {
    for (const signature of signatures) {
      const [modeInfo, sigBytes] = signature.data.toModeInfoAndSignature();

      this.signatures.push(Buffer.from(sigBytes).toString('base64'));
      this.auth_info.signer_infos.push(
        new SignerInfo(signature.public_key, signature.sequence, modeInfo)
      );
    }
  }
}

export namespace Tx {
  export interface Amino {
    type: 'core/StdTx' | 'cosmos-sdk/StdTx';
    value: {
      msg: Msg.Amino[];
      fee: Fee.Amino;
      signatures: SignatureV2.Amino[];
      memo: string;
      timeout_height: string;
    };
  }

  export interface Data {
    body: TxBody.Data;
    auth_info: AuthInfo.Data;
    signatures: string[];
  }
  export type Proto = Tx_pb;
}

export class TxBody {
  constructor(
    public messages: Msg[],
    public memo?: string,
    public timeout_height?: number
  ) {}

  public static fromData(data: TxBody.Data, isClassic?: boolean): TxBody {
    return new TxBody(
      data.messages.map(m => Msg.fromData(m, isClassic)),
      data.memo,
      Number.parseInt(data.timeout_height)
    );
  }

  public toData(isClassic?: boolean): TxBody.Data {
    return {
      memo: this.memo ?? '',
      messages: this.messages.map(m => m.toData(isClassic)),
      timeout_height: (this.timeout_height ?? 0).toFixed(),
    };
  }

  public static fromProto(proto: TxBody.Proto, isClassic?: boolean): TxBody {
    return new TxBody(
      proto.messages.map(m => Msg.fromProto(m, isClassic)),
      proto.memo,
      proto.timeoutHeight.toNumber()
    );
  }

  public toProto(isClassic?: boolean): TxBody.Proto {
    return TxBody_pb.fromPartial({
      memo: this.memo,
      messages: this.messages.map(m => m.packAny(isClassic)),
      timeoutHeight: Long.fromNumber(this.timeout_height ?? 0),
    });
  }

  public toBytes(isClassic?: boolean): Uint8Array {
    return TxBody_pb.encode(this.toProto(isClassic)).finish();
  }
}

export namespace TxBody {
  export interface Data {
    messages: Msg.Data[];
    memo: string;
    timeout_height: string;
  }
  export type Proto = TxBody_pb;
}

export class AuthInfo {
  constructor(public signer_infos: SignerInfo[], public fee: Fee) {}

  public static fromData(data: AuthInfo.Data): AuthInfo {
    return new AuthInfo(
      data.signer_infos.map(s => SignerInfo.fromData(s)),
      Fee.fromData(data.fee as Fee.Data)
    );
  }

  public toData(): AuthInfo.Data {
    return {
      fee: this.fee.toData(),
      signer_infos: this.signer_infos.map(info => info.toData()),
    };
  }

  public static fromProto(proto: AuthInfo.Proto): AuthInfo {
    return new AuthInfo(
      proto.signerInfos.map(s => SignerInfo.fromProto(s)),
      Fee.fromProto(proto.fee as Fee.Proto)
    );
  }

  public toProto(): AuthInfo.Proto {
    return AuthInfo_pb.fromPartial({
      fee: this.fee.toProto(),
      signerInfos: this.signer_infos.map(info => info.toProto()),
    });
  }

  public toBytes(): Uint8Array {
    return AuthInfo_pb.encode(this.toProto()).finish();
  }
}

export namespace AuthInfo {
  export interface Data {
    signer_infos: SignerInfo.Data[];
    fee: Fee.Data;
  }
  export type Proto = AuthInfo_pb;
}

export class SignerInfo {
  constructor(
    public public_key: PublicKey,
    public sequence: number,
    public mode_info: ModeInfo
  ) {}

  public static fromData(data: SignerInfo.Data): SignerInfo {
    return new SignerInfo(
      PublicKey.fromData(data.public_key ?? new SimplePublicKey('').toData()),
      Number.parseInt(data.sequence),
      ModeInfo.fromData(data.mode_info)
    );
  }

  public toData(): SignerInfo.Data {
    const { public_key, sequence, mode_info } = this;
    return {
      mode_info: mode_info.toData(),
      public_key: public_key?.toData() || null,
      sequence: sequence.toFixed(),
    };
  }

  public static fromProto(proto: SignerInfo.Proto): SignerInfo {
    return new SignerInfo(
      PublicKey.fromProto(proto.publicKey ?? new SimplePublicKey('').packAny()),
      proto.sequence.toNumber(),
      ModeInfo.fromProto(proto.modeInfo as ModeInfo_pb)
    );
  }

  public toProto(): SignerInfo.Proto {
    const { public_key, sequence, mode_info } = this;
    return SignerInfo_pb.fromPartial({
      modeInfo: mode_info.toProto(),
      publicKey: public_key?.packAny(),
      sequence: Long.fromNumber(sequence),
    });
  }
}

export namespace SignerInfo {
  export interface Data {
    public_key: PublicKey.Data | null;
    mode_info: ModeInfo.Data;
    sequence: string;
  }

  export type Proto = SignerInfo_pb;
}

export class ModeInfo {
  public single?: ModeInfo.Single;
  public multi?: ModeInfo.Multi;
  constructor(mode_info: ModeInfo.Single | ModeInfo.Multi) {
    if (mode_info instanceof ModeInfo.Single) {
      this.single = mode_info;
    } else {
      this.multi = mode_info;
    }
  }

  public static fromData(data: ModeInfo.Data): ModeInfo {
    if (data.single) {
      return new ModeInfo(ModeInfo.Single.fromData(data.single));
    }

    if (data.multi) {
      return new ModeInfo(ModeInfo.Multi.fromData(data.multi));
    }

    throw new Error('must be one of single or multi');
  }

  public toData(): ModeInfo.Data {
    return {
      single: this.single?.toData(),
      multi: this.multi?.toData(),
    };
  }

  public static fromProto(proto: ModeInfo.Proto): ModeInfo {
    const singleMode = proto.single;
    const multiMode = proto.multi;

    return new ModeInfo(
      singleMode
        ? ModeInfo.Single.fromProto(singleMode)
        : ModeInfo.Multi.fromProto(multiMode as ModeInfoMulti_pb)
    );
  }

  public toProto(): ModeInfo.Proto {
    return ModeInfo_pb.fromPartial({
      multi: this.multi?.toProto(),
      single: this.single?.toProto(),
    });
  }
}

export namespace ModeInfo {
  export interface Data {
    single?: Single.Data;
    multi?: Multi.Data;
  }
  export type Proto = ModeInfo_pb;
  export const SignMode = SignMode_pb;
  export type SignMode = SignMode_pb;

  export class Single {
    constructor(public mode: SignMode) {}

    public static fromData(data: Single.Data): Single {
      return new Single(signModeFromJSON(data.mode));
    }

    public toData(): Single.Data {
      return {
        mode: signModeToJSON(this.mode),
      };
    }

    public static fromProto(proto: Single.Proto): Single {
      return new Single(proto.mode);
    }

    public toProto(): Single.Proto {
      return ModeInfoSingle_pb.fromPartial({
        mode: this.mode,
      });
    }
  }

  export namespace Single {
    export interface Data {
      mode: string;
    }

    export type Proto = ModeInfoSingle_pb;
  }

  export class Multi {
    constructor(
      public bitarray: CompactBitArray,
      public modeInfos: ModeInfo[]
    ) {}

    public static fromData(proto: Multi.Data): Multi {
      return new Multi(
        CompactBitArray.fromData(proto.bitarray as CompactBitArray.Data),
        proto.mode_infos.map(m => ModeInfo.fromData(m))
      );
    }

    public toData(): Multi.Data {
      return {
        bitarray: this.bitarray.toData(),
        mode_infos: this.modeInfos.map(m => m.toData()),
      };
    }

    public static fromProto(proto: Multi.Proto): Multi {
      return new Multi(
        CompactBitArray.fromProto(proto.bitarray as CompactBitArray.Proto),
        proto.modeInfos.map(m => ModeInfo.fromProto(m))
      );
    }

    public toProto(): Multi.Proto {
      return ModeInfoMulti_pb.fromPartial({
        bitarray: this.bitarray.toProto(),
        modeInfos: this.modeInfos.map(m => m.toProto()),
      });
    }
  }

  export namespace Multi {
    export interface Data {
      bitarray: CompactBitArray.Data;
      mode_infos: ModeInfo.Data[];
    }
    export type Proto = ModeInfoMulti_pb;
  }
}
