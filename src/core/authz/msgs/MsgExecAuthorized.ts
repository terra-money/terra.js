import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Msg } from '../../Msg';
import { MsgExec as MsgExec_pb } from '@terra-money/terra.proto/src/cosmos/authz/v1beta1/tx_pb';
import { Any } from '@terra-money/terra.proto/src/google/protobuf/any_pb';

export class MsgExecAuthorized extends JSONSerializable<MsgExecAuthorized.Data> {
  /**
   * @param grantee authorization grantee
   * @param msgs list of messages to execute
   */
  constructor(public grantee: AccAddress, public msgs: Msg[]) {
    super();
  }

  public static fromData(data: MsgExecAuthorized.Data): MsgExecAuthorized {
    const {
      value: { grantee, msgs },
    } = data;
    return new MsgExecAuthorized(
      grantee,
      msgs.map(x => Msg.fromData(x))
    );
  }

  public toData(): MsgExecAuthorized.Data {
    const { grantee, msgs } = this;
    return {
      type: 'msgauth/MsgExecAuthorized',
      value: {
        grantee,
        msgs: msgs.map(msg => msg.toData()),
      },
    };
  }

  public static fromProto(proto: MsgExecAuthorized.Proto): MsgExecAuthorized {
    return new MsgExecAuthorized(
      proto.getGrantee(),
      proto.getMsgsList().map(x => Msg.fromProto(x))
    );
  }

  public toProto(): MsgExecAuthorized.Proto {
    const { grantee, msgs } = this;
    const msgExecAuthorizedProto = new MsgExec_pb();
    msgExecAuthorizedProto.setGrantee(grantee);
    msgExecAuthorizedProto.setMsgsList(msgs.map(m => m.packAny()));
    return msgExecAuthorizedProto;
  }

  public packAny(): Any {
    const msgAny = new Any();
    msgAny.setTypeUrl('/cosmos.authz.v1beta1.MsgExec');
    msgAny.setValue(this.toProto().serializeBinary());
    return msgAny;
  }

  public static unpackAny(msgAny: Any): MsgExecAuthorized {
    return MsgExecAuthorized.fromProto(
      MsgExec_pb.deserializeBinary(msgAny.getValue_asU8())
    );
  }
}

export namespace MsgExecAuthorized {
  export interface Data {
    type: 'msgauth/MsgExecAuthorized';
    value: {
      grantee: AccAddress;
      msgs: Msg.Data[];
    };
  }

  export type Proto = MsgExec_pb;
}
