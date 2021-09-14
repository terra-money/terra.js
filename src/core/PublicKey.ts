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
  export type Amino =
    | SimplePublicKey.Amino
    | LegacyAminoMultisigPublicKey.Amino
    | ValConsPublicKey.Amino;
  export type Data =
    | SimplePublicKey.Data
    | LegacyAminoMultisigPublicKey.Data
    | ValConsPublicKey.Data;
  export type Proto = Any;

  export function fromAmino(data: PublicKey.Amino): PublicKey {
    switch (data.type) {
      case 'tendermint/PubKeySecp256k1':
        return SimplePublicKey.fromAmino(data);
      case 'tendermint/PubKeyMultisigThreshold':
        return LegacyAminoMultisigPublicKey.fromAmino(data);
      case 'tendermint/PubKeyEd25519':
        return ValConsPublicKey.fromAmino(data);
    }
  }

  export function fromData(data: PublicKey.Data): PublicKey {
    switch (data['@type']) {
      case '/cosmos.crypto.secp256k1.PubKey':
        return SimplePublicKey.fromData(data);
      case '/cosmos.crypto.multisig.LegacyAminoPubKey':
        return LegacyAminoMultisigPublicKey.fromData(data);
      case '/cosmos.crypto.ed25519.PubKey':
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

export class SimplePublicKey extends JSONSerializable<
  SimplePublicKey.Amino,
  SimplePublicKey.Data,
  SimplePublicKey.Proto
> {
  constructor(public key: string) {
    super();
  }

  public static fromAmino(data: SimplePublicKey.Amino): SimplePublicKey {
    return new SimplePublicKey(data.value);
  }

  public toAmino(): SimplePublicKey.Amino {
    return {
      type: 'tendermint/PubKeySecp256k1',
      value: this.key,
    };
  }

  public static fromData(data: SimplePublicKey.Data): SimplePublicKey {
    return new SimplePublicKey(data.key);
  }

  public toData(): SimplePublicKey.Data {
    return {
      '@type': '/cosmos.crypto.secp256k1.PubKey',
      key: this.key,
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
  export interface Amino {
    type: 'tendermint/PubKeySecp256k1';
    value: string;
  }

  export interface Data {
    '@type': '/cosmos.crypto.secp256k1.PubKey';
    key: string;
  }

  export type Proto = PubKey_pb;
}

export class LegacyAminoMultisigPublicKey extends JSONSerializable<
  LegacyAminoMultisigPublicKey.Amino,
  LegacyAminoMultisigPublicKey.Data,
  LegacyAminoMultisigPublicKey.Proto
> {
  constructor(public threshold: number, public pubkeys: SimplePublicKey[]) {
    super();
  }

  public static fromAmino(
    data: LegacyAminoMultisigPublicKey.Amino
  ): LegacyAminoMultisigPublicKey {
    return new LegacyAminoMultisigPublicKey(
      parseInt(data.value.threshold),
      data.value.pubkeys.map(p => SimplePublicKey.fromAmino(p))
    );
  }

  public toAmino(): LegacyAminoMultisigPublicKey.Amino {
    return {
      type: 'tendermint/PubKeyMultisigThreshold',
      value: {
        threshold: this.threshold.toFixed(),
        pubkeys: this.pubkeys.map(p => p.toAmino()),
      },
    };
  }

  public static fromData(
    data: LegacyAminoMultisigPublicKey.Data
  ): LegacyAminoMultisigPublicKey {
    return new LegacyAminoMultisigPublicKey(
      parseInt(data.threshold),
      data.pubkeys.map(v => SimplePublicKey.fromData(v))
    );
  }

  public toData(): LegacyAminoMultisigPublicKey.Data {
    return {
      '@type': '/cosmos.crypto.multisig.LegacyAminoPubKey',
      threshold: this.threshold.toFixed(),
      pubkeys: this.pubkeys.map(p => p.toData()),
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
  export interface Amino {
    type: 'tendermint/PubKeyMultisigThreshold';
    value: {
      threshold: string;
      pubkeys: SimplePublicKey.Amino[];
    };
  }

  export interface Data {
    '@type': '/cosmos.crypto.multisig.LegacyAminoPubKey';
    threshold: string;
    pubkeys: SimplePublicKey.Data[];
  }

  export type Proto = LegacyAminoPubKey_pb;
}

export class ValConsPublicKey extends JSONSerializable<
  ValConsPublicKey.Amino,
  ValConsPublicKey.Data,
  ValConsPublicKey.Proto
> {
  constructor(public key: string) {
    super();
  }

  public static fromAmino(data: ValConsPublicKey.Amino): ValConsPublicKey {
    return new ValConsPublicKey(data.value);
  }

  public toAmino(): ValConsPublicKey.Amino {
    return {
      type: 'tendermint/PubKeyEd25519',
      value: this.key,
    };
  }

  public static fromData(data: ValConsPublicKey.Data): ValConsPublicKey {
    return new ValConsPublicKey(data.key);
  }

  public toData(): ValConsPublicKey.Data {
    return {
      '@type': '/cosmos.crypto.ed25519.PubKey',
      key: this.key,
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
  export interface Amino {
    type: 'tendermint/PubKeyEd25519';
    value: string;
  }

  export interface Data {
    '@type': '/cosmos.crypto.ed25519.PubKey';
    key: string;
  }

  export type Proto = PubKey_pb;
}
