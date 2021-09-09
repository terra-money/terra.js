import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Allowance } from '../allowances';
import { Any } from '@terra-money/terra.proto/src/google/protobuf/any_pb';
import { MsgGrantAllowance as MsgGrantAllowance_pb } from '@terra-money/terra.proto/src/cosmos/feegrant/v1beta1/tx_pb';

/**
 * MsgGrantAllowance adds permission for Grantee to spend up to Allowance
 * of fees from the account of Granter.
 */
export class MsgGrantAllowance extends JSONSerializable<MsgGrantAllowance.Data> {
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

  public static fromData(data: MsgGrantAllowance.Data): MsgGrantAllowance {
    const {
      value: { granter, grantee, allowance },
    } = data;
    return new MsgGrantAllowance(
      granter,
      grantee,
      Allowance.fromData(allowance)
    );
  }

  public toData(): MsgGrantAllowance.Data {
    const { granter, grantee, allowance } = this;
    return {
      type: 'feegrant/MsgGrantAllowance',
      value: {
        granter,
        grantee,
        allowance: allowance.toData(),
      },
    };
  }

  public static fromProto(proto: MsgGrantAllowance.Proto): MsgGrantAllowance {
    return new MsgGrantAllowance(
      proto.getGranter(),
      proto.getGrantee(),
      Allowance.fromProto(proto.getAllowance() as Any)
    );
  }

  public toProto(): MsgGrantAllowance.Proto {
    const { granter, grantee, allowance } = this;
    const proto = new MsgGrantAllowance_pb();
    proto.setGranter(granter);
    proto.setGrantee(grantee);
    proto.setAllowance(allowance.packAny() as any);
    return proto;
  }

  public packAny(): Any {
    const msgAny = new Any();
    msgAny.setTypeUrl('/cosmos.feegrant.v1beta1.MsgGrantAllowance');
    msgAny.setValue(this.toProto().serializeBinary());
    return msgAny;
  }

  public static unpackAny(msgAny: Any): MsgGrantAllowance {
    return MsgGrantAllowance.fromProto(
      MsgGrantAllowance_pb.deserializeBinary(msgAny.getValue_asU8())
    );
  }
}

export namespace MsgGrantAllowance {
  export interface Data {
    type: 'feegrant/MsgGrantAllowance';
    value: {
      granter: AccAddress;
      grantee: AccAddress;
      allowance: Allowance.Data;
    };
  }

  export type Proto = MsgGrantAllowance_pb;
}
