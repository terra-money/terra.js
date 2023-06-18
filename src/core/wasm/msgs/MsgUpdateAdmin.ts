import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgUpdateContractAdmin as MsgUpdateAdminProtoV1 } from '@classic-terra/terra.proto/terra/wasm/v1beta1/tx';
import { MsgUpdateAdmin as MsgUpdateAdminProtoV2 } from '@terra-money/terra.proto/cosmwasm/wasm/v1/tx';

export class MsgUpdateAdmin extends JSONSerializable<
  MsgUpdateAdmin.Amino,
  MsgUpdateAdmin.Data,
  MsgUpdateAdmin.Proto
> {
  /**
   * @param sender the that actor that signed the messages
   * @param new_admin address to be set
   * @param contract the address of the smart contract
   */
  constructor(
    public sender: AccAddress,
    public new_admin: AccAddress,
    public contract: AccAddress
  ) {
    super();
  }

  public static fromAmino(d: MsgUpdateAdmin.Amino) {
    return 'sender' in d.value
      ? new MsgUpdateAdmin(d.value.sender, d.value.new_admin, d.value.contract)
      : new MsgUpdateAdmin(d.value.admin, d.value.new_admin, d.value.contract);
  }

  public toAmino(): MsgUpdateAdmin.Amino {
    const { sender, new_admin, contract } = this;
    return {
      type: 'wasm/MsgUpdateAdmin',
      value: {
        sender,
        new_admin,
        contract,
      },
    };
  }

  public static fromData(data: MsgUpdateAdmin.Data) {
    if (data['@type'] === '/cosmwasm.wasm.v1.MsgUpdateAdmin') {
      const { sender, new_admin, contract } = data;
      return new MsgUpdateAdmin(sender, new_admin, contract);
    }

    const { admin, new_admin, contract } = data;
    return new MsgUpdateAdmin(admin, new_admin, contract);
  }

  public toData(): MsgUpdateAdmin.DataV2 {
    const { sender, new_admin, contract } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.MsgUpdateAdmin',
      sender,
      new_admin,
      contract,
    };
  }

  public static fromProtoV1(p: MsgUpdateAdminProtoV1) {
    return new MsgUpdateAdmin(p.admin, p.newAdmin, p.contract);
  }

  public static fromProtoV2(p: MsgUpdateAdminProtoV2) {
    return new MsgUpdateAdmin(p.sender, p.newAdmin, p.contract);
  }

  public toProto() {
    const { sender, new_admin, contract } = this;
    return MsgUpdateAdminProtoV2.fromPartial({
      sender,
      contract,
      newAdmin: new_admin,
    });
  }

  public packAny() {
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.MsgUpdateAdmin',
      value: MsgUpdateAdminProtoV2.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any) {
    return msgAny.typeUrl === '/cosmwasm.wasm.v1.MsgUpdateAdmin'
      ? MsgUpdateAdmin.fromProtoV2(MsgUpdateAdminProtoV2.decode(msgAny.value))
      : MsgUpdateAdmin.fromProtoV1(MsgUpdateAdminProtoV1.decode(msgAny.value));
  }
}

export namespace MsgUpdateAdmin {
  export interface AminoV1 {
    type: 'wasm/MsgUpdateContractAdmin';
    value: {
      admin: AccAddress;
      new_admin: AccAddress;
      contract: AccAddress;
    };
  }

  export interface AminoV2 {
    type: 'wasm/MsgUpdateAdmin';
    value: {
      sender: AccAddress;
      new_admin: AccAddress;
      contract: AccAddress;
    };
  }

  export interface DataV1 {
    '@type': '/terra.wasm.v1beta1.MsgUpdateContractAdmin';
    admin: AccAddress;
    new_admin: AccAddress;
    contract: AccAddress;
  }

  export interface DataV2 {
    '@type': '/cosmwasm.wasm.v1.MsgUpdateAdmin';
    sender: AccAddress;
    new_admin: AccAddress;
    contract: AccAddress;
  }

  export type Amino = AminoV1 | AminoV2;
  export type Data = DataV1 | DataV2;
  export type Proto = MsgUpdateAdminProtoV1 | MsgUpdateAdminProtoV2;
}
