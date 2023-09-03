import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgClearContractAdmin as MsgClearAdminProtoV1 } from '@classic-terra/terra.proto/terra/wasm/v1beta1/tx';
import { MsgClearAdmin as MsgClearAdminProtoV2 } from '@terra-money/terra.proto/cosmwasm/wasm/v1/tx';

export class MsgClearAdmin extends JSONSerializable<
  MsgClearAdmin.Amino,
  MsgClearAdmin.Data,
  MsgClearAdmin.Proto
> {
  /**
   * @param admin contract admin
   * @param contract contract address
   */
  constructor(public admin: AccAddress, public contract: AccAddress) {
    super();
  }

  public static fromAmino(data: MsgClearAdmin.Amino) {
    return data.type === 'wasm/MsgClearContractAdmin'
      ? new MsgClearAdmin(data.value.admin, data.value.contract)
      : new MsgClearAdmin(data.value.sender, data.value.contract);
  }

  public toAmino(): MsgClearAdmin.AminoV2 {
    const { admin, contract } = this;
    return {
      type: 'wasm/MsgClearAdmin',
      value: {
        sender: admin,
        contract,
      },
    };
  }

  public static fromData(data: MsgClearAdmin.Data) {
    return data['@type'] === '/terra.wasm.v1beta1.MsgClearContractAdmin'
      ? new MsgClearAdmin(data.admin, data.contract)
      : new MsgClearAdmin(data.sender, data.contract);
  }

  public toData(): MsgClearAdmin.DataV2 {
    return {
      '@type': '/cosmwasm.wasm.v1.MsgClearAdmin',
      sender: this.admin,
      contract: this.contract,
    };
  }

  public static fromProtoV1(data: MsgClearAdminProtoV1) {
    const { admin, contract } = data as MsgClearAdmin.DataV1;
    return new MsgClearAdmin(admin, contract);
  }

  public static fromProtoV2(data: MsgClearAdminProtoV2) {
    const { sender, contract } = data as MsgClearAdmin.DataV2;
    return new MsgClearAdmin(sender, contract);
  }

  public toProto() {
    return MsgClearAdminProtoV2.fromPartial({
      sender: this.admin,
      contract: this.contract,
    });
  }

  public packAny() {
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.MsgClearAdmin',
      value: MsgClearAdminProtoV2.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any) {
    return msgAny.typeUrl === '/cosmwasm.wasm.v1.MsgClearAdmin'
      ? MsgClearAdmin.fromProtoV2(MsgClearAdminProtoV2.decode(msgAny.value))
      : MsgClearAdmin.fromProtoV1(MsgClearAdminProtoV1.decode(msgAny.value));
  }
}

export namespace MsgClearAdmin {
  export interface AminoV1 {
    type: 'wasm/MsgClearContractAdmin';
    value: {
      admin: AccAddress;
      contract: AccAddress;
    };
  }

  export interface AminoV2 {
    type: 'wasm/MsgClearAdmin';
    value: {
      sender: AccAddress;
      contract: AccAddress;
    };
  }

  export interface DataV1 {
    '@type': '/terra.wasm.v1beta1.MsgClearContractAdmin';
    admin: string;
    contract: string;
  }

  export interface DataV2 {
    '@type': '/cosmwasm.wasm.v1.MsgClearAdmin';
    sender: string;
    contract: string;
  }

  export type Amino = AminoV1 | AminoV2;
  export type Data = DataV1 | DataV2;
  export type Proto = MsgClearAdminProtoV1 | MsgClearAdminProtoV2;
}
