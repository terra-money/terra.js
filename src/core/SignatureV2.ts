import { PublicKey } from './PublicKey';
import { CompactBitArray } from './Tx';
import {
  SignMode,
  signModeFromJSON,
} from '@terra-money/terra.proto/cosmos/tx/signing/v1beta1/signing';

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
      parseInt(data.sequence)
    );
  }
}

export namespace SignatureV2 {
  export interface Data {
    public_key: PublicKey.Data;
    data: Descriptor.Data;
    sequence: string;
  }

  export class Descriptor {
    constructor(
      public single?: Descriptor.Single,
      public multi?: Descriptor.Multi
    ) {}

    public static fromData(data: Descriptor.Data): Descriptor {
      if (data.single) {
        return new Descriptor(Descriptor.Single.fromData(data.single));
      }

      if (data.multi) {
        return new Descriptor(undefined, Descriptor.Multi.fromData(data.multi));
      }

      throw new Error('must be one of single or multi');
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
