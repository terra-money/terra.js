import {
  AccessType,
  accessTypeToJSON,
  AccessConfig as AccessConfig_pb,
} from '@terra-money/terra.proto/cosmwasm/wasm/v1/types';
import { AccAddress } from '../bech32';
import { JSONSerializable } from '../../util/json';
import { convertAccessTypeFromJSON } from './util';

export { AccessType };

/**
 *
 */
export class AccessConfig extends JSONSerializable<
  AccessConfig.Amino,
  AccessConfig.Data,
  AccessConfig.Proto
> {
  /**
   * @param permission access type
   * @param address
   */
  constructor(public permission: AccessType, public address: AccAddress) {
    super();
  }

  public static fromAmino(data: AccessConfig.Amino): AccessConfig {
    return new AccessConfig(
      convertAccessTypeFromJSON(data.permission),
      data.address
    );
  }

  public toAmino(): AccessConfig.Amino {
    const res: AccessConfig.Amino = {
      permission: accessTypeToJSON(this.permission),
      address: this.address,
    };
    return res;
  }

  public static fromData(data: AccessConfig.Data): AccessConfig {
    // FIXME: new core returns human-friendly string like 'Everybody'.
    // but convertAccessTypeFromJSON requires "ACCESS_TYPE_EVERYBODY"
    // TODO: find out why the strings arent't matching
    return new AccessConfig(
      convertAccessTypeFromJSON(data.permission),
      data.address
    );
  }

  public toData(): AccessConfig.Data {
    const res: AccessConfig.Data = {
      permission: accessTypeToJSON(this.permission),
      address: this.address,
    };
    return res;
  }

  public static fromProto(proto: AccessConfig.Proto): AccessConfig {
    return new AccessConfig(proto.permission, proto.address);
  }

  public toProto(): AccessConfig.Proto {
    return AccessConfig_pb.fromPartial({
      permission: this.permission,
      address: this.address,
    });
  }
}

export namespace AccessConfig {
  export interface Amino {
    permission: string;
    address: string;
  }

  export interface Data {
    permission: string;
    address: string;
  }

  export type Proto = AccessConfig_pb;
}
