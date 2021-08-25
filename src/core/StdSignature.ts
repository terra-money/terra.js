import { PublicKey } from './PublicKey';
import { JSONSerializable } from '../util/json';

/**
 * A signature consists of a message signature with a public key to verify its validity.
 * You likely will not need to work with StdSignature objects directly as they are automatically created for you.
 */
export class StdSignature extends JSONSerializable<StdSignature.Data> {
  /**
   *
   * @param signature Message signature string (base64-encoded).
   * @param pub_key Public key
   */
  constructor(public signature: string, public pub_key: PublicKey) {
    super();
  }

  public static fromData(data: StdSignature.Data): StdSignature {
    const { signature, pub_key } = data;
    return new StdSignature(signature, PublicKey.fromData(pub_key));
  }

  public toData(): StdSignature.Data {
    const { signature, pub_key } = this;
    return {
      signature,
      pub_key: pub_key.toData(),
    };
  }

  public static fromProto(proto: StdSignature.Proto): StdSignature {
    const { signature, pub_key } = proto;
    return new StdSignature(signature, PublicKey.fromProto(pub_key));
  }
}

export namespace StdSignature {
  export interface Data {
    signature: string;
    pub_key: PublicKey.Data;
  }

  export interface Proto {
    signature: string;
    pub_key: PublicKey.Proto;
  }
}
