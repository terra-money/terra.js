import { JSONSerializable } from '../util/json';
import { LegacyAminoPubKey as LegacyAminoPubKey_pb } from '@terra-money/terra.proto/src/cosmos/crypto/multisig/keys_pb';
import { Any } from '@terra-money/terra.proto/src/google/protobuf/any_pb';
import { PubKey as PubKey_pb } from '@terra-money/terra.proto/src/cosmos/crypto/secp256k1/keys_pb';

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
    const typeUrl = pubkeyAny.getTypeUrl();
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
    return new SimplePublicKey(pubkeyProto.getKey_asB64());
  }

  public toProto(): SimplePublicKey.Proto {
    const pubkeyProto = new PubKey_pb();
    pubkeyProto.setKey(this.key);
    return pubkeyProto;
  }

  public packAny(): Any {
    const pubkeyAny = new Any();
    pubkeyAny.setTypeUrl('/cosmos.crypto.secp256k1.PubKey');
    pubkeyAny.setValue(this.toProto().serializeBinary());
    return pubkeyAny;
  }

  public static unpackAny(pubkeyAny: Any): SimplePublicKey {
    return SimplePublicKey.fromProto(
      PubKey_pb.deserializeBinary(pubkeyAny.getValue_asU8())
    );
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
      pubkeyProto.getThreshold(),
      pubkeyProto.getPublicKeysList().map(v => SimplePublicKey.unpackAny(v))
    );
  }

  public toProto(): LegacyAminoMultisigPublicKey.Proto {
    const pubkeyProto = new LegacyAminoPubKey_pb();
    pubkeyProto.setThreshold(this.threshold);
    pubkeyProto.setPublicKeysList(this.pubkeys.map(v => v.packAny() as any));
    return pubkeyProto;
  }

  public packAny(): Any {
    const pubkeyAny = new Any();
    pubkeyAny.setTypeUrl('/cosmos.crypto.multisig.LegacyAminoPubKey');
    pubkeyAny.setValue(this.toProto().serializeBinary());
    return pubkeyAny;
  }

  public static unpackAny(pubkeyAny: Any): LegacyAminoMultisigPublicKey {
    return LegacyAminoMultisigPublicKey.fromProto(
      LegacyAminoPubKey_pb.deserializeBinary(pubkeyAny.getValue_asU8())
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
    return new ValConsPublicKey(pubkeyProto.getKey_asB64());
  }

  public toProto(): ValConsPublicKey.Proto {
    const pubkeyProto = new PubKey_pb();
    pubkeyProto.setKey(this.key);
    return pubkeyProto;
  }

  public packAny(): Any {
    const pubkeyAny = new Any();
    pubkeyAny.setTypeUrl('/cosmos.crypto.ed25519.PubKey');
    pubkeyAny.setValue(this.toProto().serializeBinary());
    return pubkeyAny;
  }

  public static unpackAny(pubkeyAny: Any): ValConsPublicKey {
    return ValConsPublicKey.fromProto(
      PubKey_pb.deserializeBinary(pubkeyAny.getValue_asU8())
    );
  }
}

export namespace ValConsPublicKey {
  export interface Data {
    type: 'tendermint/PubKeyEd25519';
    value: string;
  }

  export type Proto = PubKey_pb;
}
