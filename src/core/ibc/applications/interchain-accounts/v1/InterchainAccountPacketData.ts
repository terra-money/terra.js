import { InterchainAccountPacketData as InterchainAccountPacketData_pb } from '@terra-money/terra.proto/ibc/applications/interchain_accounts/v1/packet';
import { JSONSerializable } from '../../../../../util/json';

/**
 *  InterchainAccountPacketData defines the set of on-chain interchain accounts parameters.
 *  The following parameters may be used to disable the controller submodule.
 */
export class InterchainAccountPacketData extends JSONSerializable<
  any,
  InterchainAccountPacketData.Data,
  InterchainAccountPacketData.Proto
> {
  /**
   * @param type controller_enabled enables or disables the controller submodule
   * @param data base64 encoded string
   * @param memo
   */
  constructor(
    public type: number = 0,
    public data: string,
    public memo: string
  ) {
    super();
  }

  public static fromAmino() {
    throw new Error('Amino not supported');
  }

  public toAmino() {
    throw new Error('Amino not supported');
  }

  public static fromData(_data: InterchainAccountPacketData.Data) {
    const { type, data, memo } = _data;
    return new InterchainAccountPacketData(type, data, memo);
  }

  public toData(): InterchainAccountPacketData.Data {
    const { type, data, memo } = this;
    return {
      '@type':
        '/ibc.applications.interchain_accounts.v1.InterchainAccountPacketData',
      type,
      data,
      memo,
    };
  }

  public static fromProto(proto: InterchainAccountPacketData.Proto) {
    return new InterchainAccountPacketData(
      proto.type,
      Buffer.from(proto.data).toString('base64'),
      proto.memo
    );
  }

  public toProto(): InterchainAccountPacketData.Proto {
    const { type, data, memo } = this;
    return InterchainAccountPacketData_pb.fromPartial({
      type: type,
      data: Buffer.from(data, 'base64'),
      memo,
    });
  }
}

export namespace InterchainAccountPacketData {
  export interface Data {
    '@type': '/ibc.applications.interchain_accounts.v1.InterchainAccountPacketData';
    type: number;
    data: string;
    memo: string;
  }

  export type Proto = InterchainAccountPacketData_pb;
}
