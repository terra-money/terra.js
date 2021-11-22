import { Version as Version_pb } from '@terra-money/terra.proto/ibc/core/connection/v1/connection';
import { JSONSerializable } from '../../../../util/json';

/*
 * Version defines the versioning scheme used to negotiate the IBC verison in the connection handshake.
 */
export class Version extends JSONSerializable<
  Version.Amino,
  Version.Data,
  Version.Proto
> {
  /**
   * @param identifier unique version identifier
   * @param features list of features compatible with the specified identifier
   */
  constructor(public identifier: string, public features: string[]) {
    super();
  }

  public static fromAmino(data: Version.Amino): Version {
    const { identifier, features } = data;
    return new Version(identifier, features);
  }

  public toAmino(): Version.Amino {
    const { identifier, features } = this;
    const res: Version.Amino = {
      identifier,
      features,
    };
    return res;
  }

  public static fromData(data: Version.Data): Version {
    const { identifier, features } = data;
    return new Version(identifier, features);
  }

  public toData(): Version.Data {
    const { identifier, features } = this;
    const res: Version.Data = {
      identifier,
      features,
    };
    return res;
  }

  public static fromProto(proto: Version.Proto): Version {
    return new Version(proto.identifier, proto.features);
  }

  public toProto(): Version.Proto {
    const { identifier, features } = this;
    return Version_pb.fromPartial({ identifier, features });
  }
}

export namespace Version {
  export interface Amino {
    identifier: string;
    features: string[];
  }

  export interface Data {
    identifier: string;
    features: string[];
  }

  export type Proto = Version_pb;
}
