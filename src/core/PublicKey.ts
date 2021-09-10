import { JSONSerializable } from '../util/json';
import { LegacyAminoPubKey as LegacyAminoPubKey_pb } from '@terra-money/terra.proto/cosmos/crypto/multisig/keys';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { PubKey as PubKey_pb } from '@terra-money/terra.proto/cosmos/crypto/secp256k1/keys';
import { PubKey as ValConsPubKey_pb } from '@terra-money/terra.proto/cosmos/crypto/ed25519/keys';

export type PublicKey =
  | SimplePublicKey
  | LegacyAminoMultisigPublicKey
  | ValConsPublicKey;

export namespace PublicKey {
  export type Data =
    | SimplePublicKey.Data
    | LegacyAminoMultisigPublicKey.Data
    | ValConsPublicKey.Data;
  export type Proto = Any;

  export function fromData(data: PublicKey.Data): PublicKey {
    switch (data.type) {
      case 'tendermint/PubKeySecp256k1':
        return SimplePublicKey.fromData(data);
      case 'tendermint/PubKeyMultisigThreshold':
        return LegacyAminoMultisigPublicKey.fromData(data);
      case 'tendermint/PubKeyEd25519':
        return ValConsPublicKey.fromData(data);
    }
  }

  export function fromProto(pubkeyAny: PublicKey.Proto): PublicKey {
    const typeUrl = pubkeyAny.typeUrl;
    if (typeUrl === '/cosmos.crypto.secp256k1.PubKey') {
      return SimplePublicKey.unpackAny(pubkeyAny);
    } else if (typeUrl === '/cosmos.crypto.multisig.LegacyAminoPubKey') {
      return LegacyAminoMultisigPublicKey.unpackAny(pubkeyAny);
    } else if (typeUrl === '/cosmos.crypto.ed25519.PubKey') {
      return ValConsPublicKey.unpackAny(pubkeyAny);
    }

    throw new Error(`Pubkey type ${typeUrl} not recognized`);
  }
}

export class SimplePublicKey extends JSONSerializable<SimplePublicKey.Data> {
  constructor(public key: string) {
    super();
  }

  public static fromData(data: SimplePublicKey.Data): SimplePublicKey {
    return new SimplePublicKey(data.value);
  }

  public toData(): SimplePublicKey.Data {
    return {
      type: 'tendermint/PubKeySecp256k1',
      value: this.key,
    };
  }

  public static fromProto(pubkeyProto: SimplePublicKey.Proto): SimplePublicKey {
    return new SimplePublicKey(Buffer.from(pubkeyProto.key).toString('base64'));
  }

  public toProto(): SimplePublicKey.Proto {
    return PubKey_pb.fromPartial({
      key: Buffer.from(this.key, 'base64'),
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.crypto.secp256k1.PubKey',
      value: PubKey_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(pubkeyAny: Any): SimplePublicKey {
    return SimplePublicKey.fromProto(PubKey_pb.decode(pubkeyAny.value));
  }
}

export namespace SimplePublicKey {
  export interface Data {
    type: 'tendermint/PubKeySecp256k1';
    value: string;
  }

  export type Proto = PubKey_pb;
}

export class LegacyAminoMultisigPublicKey extends JSONSerializable<LegacyAminoMultisigPublicKey.Data> {
  constructor(public threshold: number, public pubkeys: SimplePublicKey[]) {
    super();
  }

  public static fromData(
    data: LegacyAminoMultisigPublicKey.Data
  ): LegacyAminoMultisigPublicKey {
    return new LegacyAminoMultisigPublicKey(
      parseInt(data.value.threshold),
      data.value.pubkeys.map(p => SimplePublicKey.fromData(p))
    );
  }

  public toData(): LegacyAminoMultisigPublicKey.Data {
    return {
      type: 'tendermint/PubKeyMultisigThreshold',
      value: {
        threshold: this.threshold.toFixed(),
        pubkeys: this.pubkeys.map(p => p.toData()),
      },
    };
  }

  public static fromProto(
    pubkeyProto: LegacyAminoMultisigPublicKey.Proto
  ): LegacyAminoMultisigPublicKey {
    return new LegacyAminoMultisigPublicKey(
      pubkeyProto.threshold,
      pubkeyProto.publicKeys.map(v => SimplePublicKey.unpackAny(v))
    );
  }

  public toProto(): LegacyAminoMultisigPublicKey.Proto {
    return LegacyAminoPubKey_pb.fromPartial({
      threshold: this.threshold,
      publicKeys: this.pubkeys.map(v => v.packAny()),
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.crypto.multisig.LegacyAminoPubKey',
      value: LegacyAminoPubKey_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(pubkeyAny: Any): LegacyAminoMultisigPublicKey {
    return LegacyAminoMultisigPublicKey.fromProto(
      LegacyAminoPubKey_pb.decode(pubkeyAny.value)
    );
  }
}

export namespace LegacyAminoMultisigPublicKey {
  export interface Data {
    type: 'tendermint/PubKeyMultisigThreshold';
    value: {
      threshold: string;
      pubkeys: SimplePublicKey.Data[];
    };
  }

  export type Proto = LegacyAminoPubKey_pb;
}

export class ValConsPublicKey extends JSONSerializable<ValConsPublicKey.Data> {
  constructor(public key: string) {
    super();
  }

  public static fromData(data: ValConsPublicKey.Data): ValConsPublicKey {
    return new ValConsPublicKey(data.value);
  }

  public toData(): ValConsPublicKey.Data {
    return {
      type: 'tendermint/PubKeyEd25519',
      value: this.key,
    };
  }

  public static fromProto(
    pubkeyProto: ValConsPublicKey.Proto
  ): ValConsPublicKey {
    return new ValConsPublicKey(
      Buffer.from(pubkeyProto.key).toString('base64')
    );
  }

  public toProto(): ValConsPublicKey.Proto {
    return PubKey_pb.fromPartial({
      key: Buffer.from(this.key, 'base64'),
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.crypto.ed25519.PubKey',
      value: ValConsPubKey_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(pubkeyAny: Any): ValConsPublicKey {
    return ValConsPublicKey.fromProto(ValConsPubKey_pb.decode(pubkeyAny.value));
  }
}

export namespace ValConsPublicKey {
  export interface Data {
    type: 'tendermint/PubKeyEd25519';
    value: string;
  }

  export type Proto = PubKey_pb;
}
