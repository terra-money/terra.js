import { PublicKey } from './PublicKey';
import { Coins } from './Coins';
import { AccAddress } from './bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { SignMode as SignMode_pb } from '@terra-money/terra.proto/cosmos/tx/signing/v1beta1/signing';
import {
  Tx as Tx_pb,
  TxBody as TxBody_pb,
  SignerInfo as SignerInfo_pb,
  ModeInfo as ModeInfo_pb,
  AuthInfo as AuthInfo_pb,
  Fee as Fee_pb,
  SignDoc as SignDoc_pb,
  ModeInfo_Single as ModeInfoSingle_pb,
  ModeInfo_Multi as ModeInfoMulti_pb,
} from '@terra-money/terra.proto/cosmos/tx/v1beta1/tx';
import { CompactBitArray as CompactBitArray_pb } from '@terra-money/terra.proto/cosmos/crypto/multisig/v1beta1/multisig';
import { Msg } from './Msg';
import * as Long from 'long';
import { StdFee } from './StdFee';

export class Tx {
  constructor(
    public body: TxBody,
    public auth_info: AuthInfo,
    public signatures: string[]
  ) {}

  public static unpackAny(anyProto: Any): Tx {
    return this.fromProto(Tx_pb.decode(anyProto.value));
  }

  public static fromProto(proto: Tx.Proto): Tx {
    return new Tx(
      TxBody.fromProto(proto.body as TxBody_pb),
      AuthInfo.fromProto(proto.authInfo as AuthInfo_pb),
      proto.signatures.map(sig => Buffer.from(sig).toString('base64'))
    );
  }

  public toProto(): Tx.Proto {
    return Tx_pb.fromPartial({
      body: this.body.toProto(),
      authInfo: this.auth_info.toProto(),
      signatures: this.signatures.map(s => Buffer.from(s, 'base64')),
    });
  }

  public toBytes(): Uint8Array {
    return Tx_pb.encode(this.toProto()).finish();
  }
}

export namespace Tx {
  export type Proto = Tx_pb;
}

export class TxBody {
  constructor(
    public messages: Msg[],
    public memo: string,
    public timeout_height: number
  ) {}

  public static fromProto(proto: TxBody.Proto): TxBody {
    return new TxBody(
      proto.messages.map(m => Msg.fromProto(m)),
      proto.memo,
      proto.timeoutHeight.toNumber()
    );
  }

  public toProto(): TxBody.Proto {
    return TxBody_pb.fromPartial({
      memo: this.memo,
      messages: this.messages.map(m => m.packAny()),
      timeoutHeight: Long.fromNumber(this.timeout_height),
    });
  }

  public toBytes(): Uint8Array {
    return TxBody_pb.encode(this.toProto()).finish();
  }
}

export namespace TxBody {
  export type Proto = TxBody_pb;
}

export class AuthInfo {
  constructor(public signer_infos: SignerInfo[], public fee: Fee) {}

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
  export type Proto = AuthInfo_pb;
}

export class SignerInfo {
  constructor(
    public public_key: PublicKey,
    public sequence: number,
    public mode_info: ModeInfo
  ) {}

  public static fromProto(proto: SignerInfo.Proto): SignerInfo {
    return new SignerInfo(
      PublicKey.fromProto(proto.publicKey as Any),
      proto.sequence.toNumber(),
      ModeInfo.fromProto(proto.modeInfo as ModeInfo_pb)
    );
  }

  public toProto(): SignerInfo.Proto {
    const { public_key, sequence, mode_info } = this;
    return SignerInfo_pb.fromPartial({
      modeInfo: mode_info.toProto(),
      publicKey: public_key.packAny(),
      sequence: Long.fromNumber(sequence),
    });
  }
}

export namespace SignerInfo {
  export type Proto = SignerInfo_pb;
}

export class ModeInfo {
  constructor(
    public single_mode?: ModeInfo.Single,
    public multi_mode?: ModeInfo.Multi
  ) {}
  public static fromProto(proto: ModeInfo.Proto): ModeInfo {
    const singleMode = proto.single;
    const multiMode = proto.multi;

    return new ModeInfo(
      singleMode ? ModeInfo.Single.fromProto(singleMode) : undefined,
      multiMode ? ModeInfo.Multi.fromProto(multiMode) : undefined
    );
  }

  public toProto(): ModeInfo.Proto {
    return ModeInfo_pb.fromPartial({
      multi: this.multi_mode?.toProto(),
      single: this.single_mode?.toProto(),
    });
  }
}

export namespace ModeInfo {
  export type Proto = ModeInfo_pb;
  export const SignMode = SignMode_pb;
  export type SignMode = SignMode_pb;

  export class Single {
    constructor(public mode: SignMode) {}

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
    export type Proto = ModeInfoSingle_pb;
  }

  export class Multi {
    constructor(
      public bitarray: CompactBitArray,
      public modeInfos: ModeInfo[]
    ) {}

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
    export type Proto = ModeInfoMulti_pb;
  }
}

export class CompactBitArray {
  constructor(public extraBitsStored: number, public elems: string) {}

  public static fromProto(proto: CompactBitArray.Proto): CompactBitArray {
    return new CompactBitArray(
      proto.extraBitsStored,
      Buffer.from(proto.elems).toString('base64')
    );
  }

  public toProto(): CompactBitArray.Proto {
    return CompactBitArray_pb.fromPartial({
      elems: Buffer.from(this.elems, 'base64'),
      extraBitsStored: this.extraBitsStored,
    });
  }
}

export namespace CompactBitArray {
  export type Proto = CompactBitArray_pb;
}

export class Fee {
  /** Fee amount to be paid */
  public readonly amount: Coins;

  /**
   * Creates a new StdFee object.
   * @param gas gas limit
   * @param amount amount to be paid to validator
   */
  constructor(
    public readonly gas_limit: number,
    amount: Coins.Input,
    public payer: AccAddress,
    public granter: AccAddress
  ) {
    this.amount = new Coins(amount);
  }

  public static fromProto(proto: Fee.Proto): Fee {
    return new Fee(
      proto.gasLimit.toNumber(),
      Coins.fromProto(proto.amount),
      proto.payer,
      proto.granter
    );
  }

  public toProto(): Fee.Proto {
    const { amount, gas_limit, payer, granter } = this;
    return Fee_pb.fromPartial({
      amount: amount.toProto(),
      gasLimit: Long.fromNumber(gas_limit),
      granter,
      payer,
    });
  }

  public toStdFee(): StdFee {
    return new StdFee(this.gas_limit, this.amount);
  }
}
export namespace Fee {
  export type Proto = Fee_pb;
}

export class SignDoc {
  constructor(
    public body_bytes: Uint8Array,
    public auth_info_bytes: Uint8Array,
    public chain_id: string,
    public account_number: number
  ) {}

  public static fromProto(proto: SignDoc.Proto): SignDoc {
    return new SignDoc(
      proto.bodyBytes,
      proto.authInfoBytes,
      proto.chainId,
      proto.accountNumber.toNumber()
    );
  }

  public toProto(): SignDoc.Proto {
    return SignDoc_pb.fromPartial({
      accountNumber: Long.fromNumber(this.account_number),
      authInfoBytes: this.auth_info_bytes,
      bodyBytes: this.body_bytes,
      chainId: this.chain_id,
    });
  }

  public toBytes(): Uint8Array {
    return SignDoc_pb.encode(this.toProto()).finish();
  }
}

export namespace SignDoc {
  export type Proto = SignDoc_pb;
}
