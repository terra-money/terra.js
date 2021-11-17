import { PublicKey } from './PublicKey';
import { ModeInfo } from './Tx';
import { CompactBitArray } from './CompactBitArray';
import {
  SignMode as SignMode_pb,
  signModeFromJSON,
} from '@terra-money/terra.proto/cosmos/tx/signing/v1beta1/signing';
import { MultiSignature } from '@terra-money/terra.proto/cosmos/crypto/multisig/v1beta1/multisig';

export class SignatureV2 {
  constructor(
    public public_key: PublicKey,
    public data: SignatureV2.Descriptor,
    public sequence: number
  ) {}

  public static fromData(data: SignatureV2.Data): SignatureV2 {
    return new SignatureV2(
      PublicKey.fromData(data.public_key),
      SignatureV2.Descriptor.fromData(data.data),
      Number.parseInt(data.sequence)
    );
  }

  public static fromAmino(data: SignatureV2.Amino): SignatureV2 {
    return new SignatureV2(
      PublicKey.fromAmino(data.pub_key),
      new SignatureV2.Descriptor(
        new SignatureV2.Descriptor.Single(
          SignatureV2.SignMode.SIGN_MODE_LEGACY_AMINO_JSON,
          data.signature
        )
      ),
      0
    );
  }
}

export namespace SignatureV2 {
  export const SignMode = SignMode_pb;
  export type SignMode = SignMode_pb;

  export interface Amino {
    signature: string;
    pub_key: PublicKey.Amino;
  }

  export interface Data {
    public_key: PublicKey.Data;
    data: Descriptor.Data;
    sequence: string;
  }

  export class Descriptor {
    public single?: Descriptor.Single;
    public multi?: Descriptor.Multi;
    constructor(data: Descriptor.Single | Descriptor.Multi) {
      data instanceof Descriptor.Single
        ? (this.single = data)
        : (this.multi = data);
    }

    public static fromData(data: Descriptor.Data): Descriptor {
      if (data.single) {
        return new Descriptor(Descriptor.Single.fromData(data.single));
      }

      if (data.multi) {
        return new Descriptor(Descriptor.Multi.fromData(data.multi));
      }

      throw new Error('must be one of single or multi');
    }

    public toModeInfoAndSignature(): [ModeInfo, Uint8Array] {
      if (this.single) {
        const sigData = this.single;
        return [
          new ModeInfo(new ModeInfo.Single(sigData.mode)),
          Buffer.from(sigData.signature, 'base64'),
        ];
      }

      if (this.multi) {
        const sigData = this.multi;
        const modeInfos: ModeInfo[] = [];
        const signatures: Uint8Array[] = [];
        for (const signature of sigData.signatures) {
          const [modeInfo, sigBytes] = signature.toModeInfoAndSignature();
          modeInfos.push(modeInfo);
          signatures.push(sigBytes);
        }

        const multisigBytes = MultiSignature.encode(
          MultiSignature.fromPartial({
            signatures: signatures,
          })
        ).finish();

        return [
          new ModeInfo(new ModeInfo.Multi(sigData.bitarray, modeInfos)),
          multisigBytes,
        ];
      }

      throw new Error('invalid signature descriptor');
    }
  }

  export namespace Descriptor {
    export interface Data {
      single?: Descriptor.Single.Data;
      multi?: Descriptor.Multi.Data;
    }

    export class Single {
      constructor(public mode: SignMode, public signature: string) {}

      public static fromData(data: Single.Data): Single {
        return new Single(signModeFromJSON(data.mode), data.signature);
      }
    }

    export namespace Single {
      export interface Data {
        mode: string;
        signature: string;
      }
    }

    export class Multi {
      constructor(
        public bitarray: CompactBitArray,
        public signatures: Descriptor[]
      ) {}

      public static fromData(data: Multi.Data): Multi {
        return new Multi(
          CompactBitArray.fromData(data.bitarray),
          data.signatures.map(v => Descriptor.fromData(v))
        );
      }
    }

    export namespace Multi {
      export interface Data {
        bitarray: CompactBitArray.Data;
        signatures: Descriptor.Data[];
      }
    }
  }
}
