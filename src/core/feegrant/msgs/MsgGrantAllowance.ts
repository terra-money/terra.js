import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Allowance } from '../allowances';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgGrantAllowance as MsgGrantAllowance_pb } from '@terra-money/terra.proto/cosmos/feegrant/v1beta1/tx';

/**
 * MsgGrantAllowance adds permission for Grantee to spend up to Allowance
 * of fees from the account of Granter.
 */
export class MsgGrantAllowance extends JSONSerializable<
  MsgGrantAllowance.Amino,
  MsgGrantAllowance.Data,
  MsgGrantAllowance.Proto
> {
  /**
   *
   * @param granter granter's account address
   * @param grantee grantee's account address
   * @param allowance allowance willing to grant
   */
  constructor(
    public granter: AccAddress,
    public grantee: AccAddress,
    public allowance: Allowance
  ) {
    super();
  }

  public static fromAmino(
    data: MsgGrantAllowance.Amino,
    isClassic?: boolean
  ): MsgGrantAllowance {
    const {
      value: { granter, grantee, allowance },
    } = data;
    return new MsgGrantAllowance(
      granter,
      grantee,
      Allowance.fromAmino(allowance, isClassic)
    );
  }

  public toAmino(isClassic?: boolean): MsgGrantAllowance.Amino {
    const { granter, grantee, allowance } = this;
    return {
      type: isClassic
        ? 'feegrant/MsgGrantAllowance'
        : 'cosmos-sdk/MsgGrantAllowance',
      value: {
        granter,
        grantee,
        allowance: allowance.toAmino(isClassic),
      },
    };
  }

  public static fromData(
    data: MsgGrantAllowance.Data,
    isClassic?: boolean
  ): MsgGrantAllowance {
    const { granter, grantee, allowance } = data;
    return new MsgGrantAllowance(
      granter,
      grantee,
      Allowance.fromData(allowance, isClassic)
    );
  }

  public toData(isClassic?: boolean): MsgGrantAllowance.Data {
    const { granter, grantee, allowance } = this;
    return {
      '@type': '/cosmos.feegrant.v1beta1.MsgGrantAllowance',
      granter,
      grantee,
      allowance: allowance.toData(isClassic),
    };
  }

  public static fromProto(
    proto: MsgGrantAllowance.Proto,
    isClassic?: boolean
  ): MsgGrantAllowance {
    return new MsgGrantAllowance(
      proto.granter,
      proto.grantee,
      Allowance.fromProto(proto.allowance as Any, isClassic)
    );
  }

  public toProto(isClassic?: boolean): MsgGrantAllowance.Proto {
    const { granter, grantee, allowance } = this;
    return MsgGrantAllowance_pb.fromPartial({
      allowance: allowance.packAny(isClassic),
      grantee,
      granter,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.feegrant.v1beta1.MsgGrantAllowance',
      value: MsgGrantAllowance_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgGrantAllowance {
    return MsgGrantAllowance.fromProto(
      MsgGrantAllowance_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgGrantAllowance {
  export interface Amino {
    type: 'feegrant/MsgGrantAllowance' | 'cosmos-sdk/MsgGrantAllowance';
    value: {
      granter: AccAddress;
      grantee: AccAddress;
      allowance: Allowance.Amino;
    };
  }

  export interface Data {
    '@type': '/cosmos.feegrant.v1beta1.MsgGrantAllowance';
    granter: AccAddress;
    grantee: AccAddress;
    allowance: Allowance.Data;
  }

  export type Proto = MsgGrantAllowance_pb;
}
