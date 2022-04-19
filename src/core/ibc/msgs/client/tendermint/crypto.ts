import { Proof as Proof_pb } from '@terra-money/terra.proto/tendermint/crypto/proof';
import { PublicKey as PublicKey_pb } from '@terra-money/terra.proto/tendermint/crypto/keys';
import * as Long from 'long';
import { JSONSerializable } from '../../../../../util/json';

export class Proof extends JSONSerializable<any, Proof.Data, Proof.Proto> {
  /**
   * @param total
   * @param index
   * @param leafHash
   * @param aunts
   */
  constructor(
    public total: number,
    public index: number,
    public leafHash: string,
    public aunts: string[]
  ) {
    super();
  }

  public static fromAmino(_: any): Proof {
    _;
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(data: Proof.Data): Proof {
    const { total, index, leaf_hash: leafHash, aunts } = data;
    return new Proof(
      Number.parseInt(total),
      Number.parseInt(index),
      leafHash,
      aunts
    );
  }

  public toData(): Proof.Data {
    const { total, index, leafHash, aunts } = this;
    const res: Proof.Data = {
      total: total.toFixed(),
      index: index.toFixed(),
      leaf_hash: leafHash,
      aunts,
    };
    return res;
  }

  public static fromProto(proto: Proof.Proto): Proof {
    return new Proof(
      proto.total.toNumber(),
      proto.index.toNumber(),
      Buffer.from(proto.leafHash).toString('base64'),
      proto.aunts.map(aunt => Buffer.from(aunt).toString('base64'))
    );
  }

  public toProto(): Proof.Proto {
    const { total, index, leafHash, aunts } = this;
    return Proof_pb.fromPartial({
      total: Long.fromNumber(total),
      index: Long.fromNumber(index),
      leafHash: Buffer.from(leafHash, 'base64'),
      aunts: aunts.map(aunt => Buffer.from(aunt, 'base64')),
    });
  }
}

export namespace Proof {
  export interface Data {
    total: string;
    index: string;
    leaf_hash: string;
    aunts: string[];
  }

  export type Proto = Proof_pb;
}

/** PublicKey defines the keys available for use with Tendermint Validators */
export class PublicKey extends JSONSerializable<
  any,
  PublicKey.Data,
  PublicKey.Proto
> {
  /**
   * @param ed25519
   * @param secp256k1
   */
  constructor(public ed25519?: string, public secp256k1?: string) {
    super();
  }

  public static fromAmino(_: any): PublicKey {
    _;
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(data: PublicKey.Data): PublicKey {
    const { ed25519, secp256k1 } = data;
    return new PublicKey(ed25519, secp256k1);
  }

  public toData(): PublicKey.Data {
    const { ed25519, secp256k1 } = this;
    const res: PublicKey.Data = {
      ed25519,
      secp256k1,
    };
    return res;
  }

  public static fromProto(proto: PublicKey.Proto): PublicKey {
    const { ed25519, secp256k1 } = proto;
    return new PublicKey(
      ed25519 ? Buffer.from(ed25519).toString('base64') : undefined,
      secp256k1 ? Buffer.from(secp256k1).toString('base64') : undefined
    );
  }

  public toProto(): PublicKey.Proto {
    const { ed25519, secp256k1 } = this;
    return PublicKey_pb.fromPartial({
      ed25519: ed25519 ? Buffer.from(ed25519, 'base64') : undefined,
      secp256k1: secp256k1 ? Buffer.from(secp256k1, 'base64') : undefined,
    });
  }
}

export namespace PublicKey {
  export interface Data {
    ed25519?: string;
    secp256k1?: string;
  }

  export type Proto = PublicKey_pb;
}
