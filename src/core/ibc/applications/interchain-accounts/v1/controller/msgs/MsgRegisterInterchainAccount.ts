import { JSONSerializable } from '../../../../../../../util/json';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgRegisterInterchainAccount as MsgRegisterInterchainAccount_pb } from '@terra-money/terra.proto/ibc/applications/interchain_accounts/controller/v1/tx';

/**
 * MsgRegisterInterchainAccount defines the payload for Msg/MsgRegisterInterchainAccount
 */
export class MsgRegisterInterchainAccount extends JSONSerializable<
  any,
  MsgRegisterInterchainAccount.Data,
  MsgRegisterInterchainAccount.Proto
> {
  /**
   * @param owner
   * @param connection_id
   * @param version
   */
  constructor(
    public owner: string,
    public connection_id: string,
    public version: string
  ) {
    super();
  }

  public static fromAmino() {
    throw new Error('Amino not supported');
  }

  public toAmino() {
    throw new Error('Amino not supported');
  }

  public static fromData(data: MsgRegisterInterchainAccount.Data) {
    const { owner, connection_id, version } = data;
    return new MsgRegisterInterchainAccount(owner, connection_id, version);
  }

  public toData(): MsgRegisterInterchainAccount.Data {
    const { owner, connection_id, version } = this;
    return {
      '@type':
        '/ibc.applications.interchain_accounts.controller.v1.MsgRegisterInterchainAccount',
      owner,
      connection_id,
      version,
    };
  }

  public static fromProto(proto: MsgRegisterInterchainAccount.Proto) {
    return new MsgRegisterInterchainAccount(
      proto.owner,
      proto.connectionId,
      proto.version
    );
  }

  public toProto(): MsgRegisterInterchainAccount.Proto {
    const { owner, connection_id, version } = this;
    return MsgRegisterInterchainAccount_pb.fromPartial({
      owner,
      connectionId: connection_id,
      version,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl:
        '/ibc.applications.interchain_accounts.controller.v1.MsgRegisterInterchainAccount',
      value: MsgRegisterInterchainAccount_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any) {
    return MsgRegisterInterchainAccount.fromProto(
      MsgRegisterInterchainAccount_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgRegisterInterchainAccount {
  export interface Data {
    '@type': '/ibc.applications.interchain_accounts.controller.v1.MsgRegisterInterchainAccount';
    owner: string;
    connection_id: string;
    version: string;
  }
  export type Proto = MsgRegisterInterchainAccount_pb;
}
