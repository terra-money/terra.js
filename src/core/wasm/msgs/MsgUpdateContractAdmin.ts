import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgUpdateAdmin as MsgUpdateAdmin_pb } from '@terra-money/terra.proto/cosmwasm/wasm/v1/tx';

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
      value: { sender, new_admin, contract },
    } = data;
    return new MsgUpdateContractAdmin(sender, new_admin, contract);
  }

  public toAmino(): MsgUpdateContractAdmin.Amino {
    const { admin, new_admin, contract } = this;
    return {
      type: 'wasm/MsgUpdateAdmin',
      value: {
        sender: admin,
        new_admin,
        contract,
      },
    };
  }

  public static fromProto(
    proto: MsgUpdateContractAdmin.Proto
  ): MsgUpdateContractAdmin {
    const p = proto as MsgUpdateAdmin_pb;
    return new MsgUpdateContractAdmin(p.sender, p.newAdmin, p.contract);
  }

  public toProto(): MsgUpdateContractAdmin.Proto {
    const { admin, new_admin, contract } = this;
    return MsgUpdateAdmin_pb.fromPartial({
      sender: admin,
      contract,
      newAdmin: new_admin,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.MsgUpdateAdmin',
      value: MsgUpdateAdmin_pb.encode(
        this.toProto() as MsgUpdateAdmin_pb
      ).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgUpdateContractAdmin {
    return MsgUpdateContractAdmin.fromProto(
      MsgUpdateAdmin_pb.decode(msgAny.value)
    );
  }

  public static fromData(
    data: MsgUpdateContractAdmin.Data
  ): MsgUpdateContractAdmin {
    const { sender, new_admin, contract } = data;
    return new MsgUpdateContractAdmin(sender, new_admin, contract);
  }

  public toData(): MsgUpdateContractAdmin.Data {
    const { admin, new_admin, contract } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.MsgUpdateAdmin',
      sender: admin,
      new_admin,
      contract,
    };
  }
}

export namespace MsgUpdateContractAdmin {
  export interface Amino {
    type: 'wasm/MsgUpdateAdmin';
    value: {
      sender: AccAddress;
      new_admin: AccAddress;
      contract: AccAddress;
    };
  }

  export interface Data {
    '@type': '/cosmwasm.wasm.v1.MsgUpdateAdmin';
    sender: AccAddress;
    new_admin: AccAddress;
    contract: AccAddress;
  }

  export type Proto = MsgUpdateAdmin_pb;
}
