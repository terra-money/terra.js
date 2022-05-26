import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Msg } from '../../Msg';
import { MsgExec as MsgExec_pb } from '@terra-money/terra.proto/cosmos/authz/v1beta1/tx';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';

export class MsgExecAuthorized extends JSONSerializable<
  MsgExecAuthorized.Amino,
  MsgExecAuthorized.Data,
  MsgExecAuthorized.Proto
> {
  /**
   * @param grantee authorization grantee
   * @param msgs list of messages to execute
   */
  constructor(public grantee: AccAddress, public msgs: Msg[]) {
    super();
  }

  public static fromAmino(
    data: MsgExecAuthorized.Amino,
    isClassic?: boolean
  ): MsgExecAuthorized {
    const {
      value: { grantee, msgs },
    } = data;
    return new MsgExecAuthorized(
      grantee,
      msgs.map(x => Msg.fromAmino(x, isClassic))
    );
  }

  public toAmino(isClassic?: boolean): MsgExecAuthorized.Amino {
    const { grantee, msgs } = this;
    return {
      type: isClassic ? 'msgauth/MsgExecAuthorized' : 'cosmos-sdk/MsgExec',
      value: {
        grantee,
        msgs: msgs.map(msg => {
          return msg.toAmino(isClassic);
        }),
      },
    };
  }

  public static fromData(
    proto: MsgExecAuthorized.Data,
    isClassic?: boolean
  ): MsgExecAuthorized {
    const { grantee, msgs } = proto;
    return new MsgExecAuthorized(
      grantee,
      msgs.map(x => Msg.fromData(x, isClassic))
    );
  }

  public toData(isClassic?: boolean): MsgExecAuthorized.Data {
    const { grantee, msgs } = this;
    return {
      '@type': '/cosmos.authz.v1beta1.MsgExec',
      grantee,
      msgs: msgs.map(msg => msg.toData(isClassic)),
    };
  }

  public static fromProto(
    proto: MsgExecAuthorized.Proto,
    isClassic?: boolean
  ): MsgExecAuthorized {
    return new MsgExecAuthorized(
      proto.grantee,
      proto.msgs.map(x => Msg.fromProto(x, isClassic))
    );
  }

  public toProto(isClassic?: boolean): MsgExecAuthorized.Proto {
    const { grantee, msgs } = this;
    return MsgExec_pb.fromPartial({
      grantee,
      msgs: msgs.map(m => m.packAny(isClassic)),
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.authz.v1beta1.MsgExec',
      value: MsgExec_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgExecAuthorized {
    return MsgExecAuthorized.fromProto(
      MsgExec_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgExecAuthorized {
  export interface Amino {
    type: 'msgauth/MsgExecAuthorized' | 'cosmos-sdk/MsgExec';
    value: {
      grantee: AccAddress;
      msgs: Msg.Amino[];
    };
  }

  export interface Data {
    '@type': '/cosmos.authz.v1beta1.MsgExec';
    grantee: AccAddress;
    msgs: Msg.Data[];
  }

  export type Proto = MsgExec_pb;
}
