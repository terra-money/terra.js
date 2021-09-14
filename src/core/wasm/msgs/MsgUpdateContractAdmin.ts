import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgUpdateContractAdmin as MsgUpdateContractAdmin_pb } from '@terra-money/terra.proto/terra/wasm/v1beta1/tx';

export class MsgUpdateContractAdmin extends JSONSerializable<
  MsgUpdateContractAdmin.Amino,
  MsgUpdateContractAdmin.Data,
  MsgUpdateContractAdmin.Proto
> {
  /**
   * @param admin contract admin
   * @param new_admin new admin
   * @param contract contract address
   */
  constructor(
    public admin: AccAddress,
    public new_admin: AccAddress,
    public contract: AccAddress
  ) {
    super();
  }

  public static fromAmino(
    data: MsgUpdateContractAdmin.Amino
  ): MsgUpdateContractAdmin {
    const {
      value: { admin, new_admin, contract },
    } = data;
    return new MsgUpdateContractAdmin(admin, new_admin, contract);
  }

  public toAmino(): MsgUpdateContractAdmin.Amino {
    const { admin, new_admin, contract } = this;
    return {
      type: 'wasm/MsgUpdateContractAdmin',
      value: {
        admin,
        new_admin,
        contract,
      },
    };
  }

  public static fromProto(
    proto: MsgUpdateContractAdmin.Proto
  ): MsgUpdateContractAdmin {
    return new MsgUpdateContractAdmin(
      proto.admin,
      proto.newAdmin,
      proto.contract
    );
  }

  public toProto(): MsgUpdateContractAdmin.Proto {
    const { admin, new_admin, contract } = this;
    return MsgUpdateContractAdmin_pb.fromPartial({
      admin,
      contract,
      newAdmin: new_admin,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/terra.wasm.v1beta1.MsgUpdateContractAdmin',
      value: MsgUpdateContractAdmin_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgUpdateContractAdmin {
    return MsgUpdateContractAdmin.fromProto(
      MsgUpdateContractAdmin_pb.decode(msgAny.value)
    );
  }

  public static fromData(
    data: MsgUpdateContractAdmin.Data
  ): MsgUpdateContractAdmin {
    const { admin, new_admin, contract } = data;
    return new MsgUpdateContractAdmin(admin, new_admin, contract);
  }

  public toData(): MsgUpdateContractAdmin.Data {
    const { admin, new_admin, contract } = this;
    return {
      '@type': '/terra.wasm.v1beta1.MsgUpdateContractAdmin',
      admin,
      new_admin,
      contract,
    };
  }
}

export namespace MsgUpdateContractAdmin {
  export interface Amino {
    type: 'wasm/MsgUpdateContractAdmin';
    value: {
      admin: AccAddress;
      new_admin: AccAddress;
      contract: AccAddress;
    };
  }

  export interface Data {
    '@type': '/terra.wasm.v1beta1.MsgUpdateContractAdmin';
    admin: AccAddress;
    new_admin: AccAddress;
    contract: AccAddress;
  }

  export type Proto = MsgUpdateContractAdmin_pb;
}
