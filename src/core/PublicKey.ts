import { JSONSerializable } from '../util/json';

export class PublicKey extends JSONSerializable<PublicKey.Data> {
  constructor(
    public readonly type: PublicKey.Data['type'],
    public readonly value: PublicKey.Data['value']
  ) {
    super();
  }

  public static fromData(data: PublicKey.Data): PublicKey {
    const { type, value } = data;
    return new PublicKey(type, value);
  }

  public toData(): PublicKey.Data {
    const { type, value } = this;
    if (type === 'tendermint/PubKeySecp256k1' && typeof value === 'string') {
      return {
        type,
        value,
      };
    } else if (
      type === 'tendermint/PubKeyMultisigThreshold' &&
      typeof value !== 'string'
    ) {
      return {
        type,
        value,
      };
    }
    throw new TypeError('invalid public key: type and value do not match');
  }

  public static fromProto(proto: PublicKey.Proto): PublicKey {
    switch (proto['@type']) {
      case '/cosmos.crypto.secp256k1.PubKey':
        return new PublicKey('tendermint/PubKeySecp256k1', proto['key']);
      case '/cosmos.crypto.multisig.LegacyAminoPubKey':
        return new PublicKey('tendermint/PubKeySecp256k1', {
          threshold: proto.threshold,
          pubkeys: proto.pubkeys.map(
            v => PublicKey.fromProto(v).toData() as SimplePublicKey.Data
          ),
        });
      default:
        return new PublicKey(proto['@type'], JSON.stringify(proto));
    }
  }

  public toProto(): PublicKey.Proto {
    const { type, value } = this;
    if (type === 'tendermint/PubKeySecp256k1' && typeof value === 'string') {
      return {
        '@type': '/cosmos.crypto.secp256k1.PubKey',
        key: value,
      };
    } else if (
      type === 'tendermint/PubKeyMultisigThreshold' &&
      typeof value !== 'string'
    ) {
      return {
        '@type': '/cosmos.crypto.multisig.LegacyAminoPubKey',
        threshold: value.threshold,
        pubkeys: value.pubkeys.map(
          v => PublicKey.fromData(v).toProto() as SimplePublicKey.Proto
        ),
      };
    }
    throw new TypeError('invalid public key: type and value do not match');
  }
}

export namespace PublicKey {
  export type Data = SimplePublicKey.Data | LegacyAminoMultisigPublicKey.Data;
  export type Proto =
    | SimplePublicKey.Proto
    | LegacyAminoMultisigPublicKey.Proto;
}

export namespace SimplePublicKey {
  export interface Data {
    type: 'tendermint/PubKeySecp256k1';
    value: string;
  }

  export interface Proto {
    '@type': '/cosmos.crypto.secp256k1.PubKey';
    key: string;
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

  export interface Proto {
    '@type': '/cosmos.crypto.multisig.LegacyAminoPubKey';
    threshold: string;
    pubkeys: SimplePublicKey.Proto[];
  }
}
