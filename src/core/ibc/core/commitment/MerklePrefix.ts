import { MerklePrefix as MerklePrefix_pb } from '@terra-money/terra.proto/ibc/core/commitment/v1/commitment';
import { JSONSerializable } from '../../../../util/json';

/*
 * MerklePrefix is merkle path prefixed to the key.
 * The constructed key from the Path and the key will be append(Path.KeyPath,
 * append(Path.KeyPrefix, key...))
 */
export class MerklePrefix extends JSONSerializable<
  MerklePrefix.Amino,
  MerklePrefix.Data,
  MerklePrefix.Proto
> {
  /**
   * @param key_prefix
   */
  constructor(public key_prefix: string) {
    super();
  }

  public static fromAmino(data: MerklePrefix.Amino): MerklePrefix {
    const { key_prefix } = data;
    return new MerklePrefix(key_prefix);
  }

  public toAmino(): MerklePrefix.Amino {
    const { key_prefix } = this;
    const res: MerklePrefix.Amino = {
      key_prefix,
    };
    return res;
  }

  public static fromData(data: MerklePrefix.Data): MerklePrefix {
    const { key_prefix } = data;
    return new MerklePrefix(key_prefix);
  }

  public toData(): MerklePrefix.Data {
    const { key_prefix } = this;
    const res: MerklePrefix.Data = {
      key_prefix,
    };
    return res;
  }

  public static fromProto(proto: MerklePrefix.Proto): MerklePrefix {
    return new MerklePrefix(Buffer.from(proto.keyPrefix).toString('base64'));
  }

  public toProto(): MerklePrefix.Proto {
    const { key_prefix } = this;
    return MerklePrefix_pb.fromPartial({
      keyPrefix: Buffer.from(key_prefix, 'base64'),
    });
  }
}

export namespace MerklePrefix {
  export interface Amino {
    key_prefix: string;
  }

  export interface Data {
    key_prefix: string;
  }

  export type Proto = MerklePrefix_pb;
}
