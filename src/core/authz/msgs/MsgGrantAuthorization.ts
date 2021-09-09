import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { AuthorizationGrant } from '../authorizations';
import { MsgGrant as MsgGrant_pb } from '@terra-money/terra.proto/src/cosmos/authz/v1beta1/tx_pb';
import { Any } from '@terra-money/terra.proto/src/google/protobuf/any_pb';
import { Grant } from '@terra-money/terra.proto/src/cosmos/authz/v1beta1/authz_pb';

export class MsgGrantAuthorization extends JSONSerializable<MsgGrantAuthorization.Data> {
  /**
   * @param depositor depositor's account address
   * @param amount coins to fund the community pool
   */
  constructor(
    public granter: AccAddress,
    public grantee: AccAddress,
    public grant: AuthorizationGrant
  ) {
    super();
  }

  public static fromData(
    data: MsgGrantAuthorization.Data
  ): MsgGrantAuthorization {
    const {
      value: { granter, grantee, grant },
    } = data;
    return new MsgGrantAuthorization(
      granter,
      grantee,
      AuthorizationGrant.fromData(grant)
    );
  }

  public toData(): MsgGrantAuthorization.Data {
    const { granter, grantee, grant } = this;
    return {
      type: 'msgauth/MsgGrantAuthorization',
      value: {
        granter,
        grantee,
        grant: grant.toData(),
      },
    };
  }

  public static fromProto(
    data: MsgGrantAuthorization.Proto
  ): MsgGrantAuthorization {
    return new MsgGrantAuthorization(
      data.getGranter(),
      data.getGrantee(),
      AuthorizationGrant.fromProto(data.getGrant() as Grant)
    );
  }

  public toProto(): MsgGrantAuthorization.Proto {
    const { grant, granter, grantee } = this;
    const msgGrantAuthorizedProto = new MsgGrant_pb();
    msgGrantAuthorizedProto.setGrantee(grantee);
    msgGrantAuthorizedProto.setGranter(granter);
    msgGrantAuthorizedProto.setGrant(grant.toProto());
    return msgGrantAuthorizedProto;
  }

  public packAny(): Any {
    const msgAny = new Any();
    msgAny.setTypeUrl('/cosmos.authz.v1beta1.MsgGrant');
    msgAny.setValue(this.toProto().serializeBinary());
    return msgAny;
  }

  public static unpackAny(msgAny: Any): MsgGrantAuthorization {
    return MsgGrantAuthorization.fromProto(
      MsgGrant_pb.deserializeBinary(msgAny.getValue_asU8())
    );
  }
}

export namespace MsgGrantAuthorization {
  export interface Data {
    type: 'msgauth/MsgGrantAuthorization';
    value: {
      granter: AccAddress;
      grantee: AccAddress;
      grant: AuthorizationGrant.Data;
    };
  }

  export type Proto = MsgGrant_pb;
}
