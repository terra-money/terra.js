import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgRevokeAllowance as MsgRevokeAllowance_pb } from '@terra-money/terra.proto/cosmos/feegrant/v1beta1/tx';

/**
 * MsgRevokeAllowance remove permission any existing Allowance from Granter to Grantee.
 */
export class MsgRevokeAllowance extends JSONSerializable<
  MsgRevokeAllowance.Amino,
  MsgRevokeAllowance.Data,
  MsgRevokeAllowance.Proto
> {
  /**
   *
   * @param granter granter's account address
   * @param grantee grantee's account address
   */
  constructor(public granter: AccAddress, public grantee: AccAddress) {
    super();
  }

  public static fromAmino(
    data: MsgRevokeAllowance.Amino,
    _?: boolean
  ): MsgRevokeAllowance {
    _;
    const {
      value: { granter, grantee },
    } = data;
    return new MsgRevokeAllowance(granter, grantee);
  }

  public toAmino(isClassic?: boolean): MsgRevokeAllowance.Amino {
    const { granter, grantee } = this;
    return {
      type: isClassic
        ? 'feegrant/MsgRevokeAllowance'
        : 'cosmos-sdk/MsgRevokeAllowance',
      value: {
        granter,
        grantee,
      },
    };
  }

  public static fromData(
    proto: MsgRevokeAllowance.Data,
    _?: boolean
  ): MsgRevokeAllowance {
    _;
    const { granter, grantee } = proto;
    return new MsgRevokeAllowance(granter, grantee);
  }

  public toData(_?: boolean): MsgRevokeAllowance.Data {
    _;
    const { granter, grantee } = this;
    return {
      '@type': '/cosmos.feegrant.v1beta1.MsgRevokeAllowance',
      granter,
      grantee,
    };
  }

  public static fromProto(
    proto: MsgRevokeAllowance.Proto,
    _?: boolean
  ): MsgRevokeAllowance {
    _;
    return new MsgRevokeAllowance(proto.granter, proto.grantee);
  }

  public toProto(_?: boolean): MsgRevokeAllowance.Proto {
    _;
    const { granter, grantee } = this;
    return MsgRevokeAllowance_pb.fromPartial({
      grantee,
      granter,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.feegrant.v1beta1.MsgRevokeAllowance',
      value: MsgRevokeAllowance_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgRevokeAllowance {
    return MsgRevokeAllowance.fromProto(
      MsgRevokeAllowance_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgRevokeAllowance {
  export interface Amino {
    type: 'feegrant/MsgRevokeAllowance' | 'cosmos-sdk/MsgRevokeAllowance';
    value: {
      granter: AccAddress;
      grantee: AccAddress;
    };
  }

  export interface Data {
    '@type': '/cosmos.feegrant.v1beta1.MsgRevokeAllowance';
    granter: AccAddress;
    grantee: AccAddress;
  }

  export type Proto = MsgRevokeAllowance_pb;
}
