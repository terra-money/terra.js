import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Msg } from '../../Msg';
import { MsgExec as MsgExec_pb } from '@terra-money/terra.proto/cosmos/authz/v1beta1/tx';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';

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
        msgs: msgs.map(msg => {
          if ('toData' in msg) {
            return msg.toData();
          }

          throw new Error(
            `amino is not supported for "${msg.packAny().typeUrl}" Msg`
          );
        }),
      },
    };
  }

  public static fromProto(proto: MsgExecAuthorized.Proto): MsgExecAuthorized {
    return new MsgExecAuthorized(
      proto.grantee,
      proto.msgs.map(x => Msg.fromProto(x))
    );
  }

  public toProto(): MsgExecAuthorized.Proto {
    const { grantee, msgs } = this;
    return MsgExec_pb.fromPartial({
      grantee,
      msgs: msgs.map(m => m.packAny()),
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.authz.v1beta1.MsgExec',
      value: MsgExec_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgExecAuthorized {
    return MsgExecAuthorized.fromProto(MsgExec_pb.decode(msgAny.value));
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
