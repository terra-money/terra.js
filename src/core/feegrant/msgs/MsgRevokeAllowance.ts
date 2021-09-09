import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/src/google/protobuf/any_pb';
import { MsgRevokeAllowance as MsgRevokeAllowance_pb } from '@terra-money/terra.proto/src/cosmos/feegrant/v1beta1/tx_pb';

/**
 * MsgRevokeAllowance remove permission any existing Allowance from Granter to Grantee.
 */
export class MsgRevokeAllowance extends JSONSerializable<MsgRevokeAllowance.Data> {
  /**
   *
   * @param granter granter's account address
   * @param grantee grantee's account address
   */
  constructor(public granter: AccAddress, public grantee: AccAddress) {
    super();
  }

  public static fromData(data: MsgRevokeAllowance.Data): MsgRevokeAllowance {
    const {
      value: { granter, grantee },
    } = data;
    return new MsgRevokeAllowance(granter, grantee);
  }

  public toData(): MsgRevokeAllowance.Data {
    const { granter, grantee } = this;
    return {
      type: 'feegrant/MsgRevokeAllowance',
      value: {
        granter,
        grantee,
      },
    };
  }

  public static fromProto(proto: MsgRevokeAllowance.Proto): MsgRevokeAllowance {
    return new MsgRevokeAllowance(proto.getGranter(), proto.getGrantee());
  }

  public toProto(): MsgRevokeAllowance.Proto {
    const { granter, grantee } = this;
    const proto = new MsgRevokeAllowance_pb();
    proto.setGrantee(grantee);
    proto.setGranter(granter);
    return proto;
  }

  public packAny(): Any {
    const msgAny = new Any();
    msgAny.setTypeUrl('/cosmos.feegrant.v1beta1.MsgRevokeAllowance');
    msgAny.setValue(this.toProto().serializeBinary());
    return msgAny;
  }

  public static unpackAny(msgAny: Any): MsgRevokeAllowance {
    return MsgRevokeAllowance.fromProto(
      MsgRevokeAllowance_pb.deserializeBinary(msgAny.getValue_asU8())
    );
  }
}

export namespace MsgRevokeAllowance {
  export interface Data {
    type: 'feegrant/MsgRevokeAllowance';
    value: {
      granter: AccAddress;
      grantee: AccAddress;
    };
  }

  export type Proto = MsgRevokeAllowance_pb;
}
