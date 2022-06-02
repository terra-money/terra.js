import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgUpdateContractAdmin as MsgUpdateContractAdmin_legacy_pb } from '@terra-money/legacy.proto/terra/wasm/v1beta1/tx';
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
    data: MsgUpdateContractAdmin.Amino,
    isClassic?: boolean
  ): MsgUpdateContractAdmin {
    if (isClassic) {
      const {
        value: { admin, new_admin, contract },
      } = data as MsgUpdateContractAdmin.AminoV1;
      return new MsgUpdateContractAdmin(admin, new_admin, contract);
    } else {
      const {
        value: { sender, new_admin, contract },
      } = data as MsgUpdateContractAdmin.AminoV2;
      return new MsgUpdateContractAdmin(sender, new_admin, contract);
    }
  }

  public toAmino(isClassic?: boolean): MsgUpdateContractAdmin.Amino {
    const { admin, new_admin, contract } = this;
    if (isClassic) {
      return {
        type: 'wasm/MsgUpdateContractAdmin',
        value: {
          admin,
          new_admin,
          contract,
        },
      };
    } else {
      return {
        type: 'wasm/MsgUpdateAdmin',
        value: {
          sender: admin,
          new_admin,
          contract,
        },
      };
    }
  }

  public static fromProto(
    proto: MsgUpdateContractAdmin.Proto,
    isClassic?: boolean
  ): MsgUpdateContractAdmin {
    if (isClassic) {
      const p = proto as MsgUpdateContractAdmin_legacy_pb;
      return new MsgUpdateContractAdmin(p.admin, p.newAdmin, p.contract);
    } else {
      const p = proto as MsgUpdateAdmin_pb;
      return new MsgUpdateContractAdmin(p.sender, p.newAdmin, p.contract);
    }
  }

  public toProto(isClassic?: boolean): MsgUpdateContractAdmin.Proto {
    const { admin, new_admin, contract } = this;
    if (isClassic) {
      return MsgUpdateContractAdmin_legacy_pb.fromPartial({
        admin,
        contract,
        newAdmin: new_admin,
      });
    } else {
      return MsgUpdateAdmin_pb.fromPartial({
        sender: admin,
        contract,
        newAdmin: new_admin,
      });
    }
  }

  public packAny(isClassic?: boolean): Any {
    if (isClassic) {
      return Any.fromPartial({
        typeUrl: '/terra.wasm.v1beta1.MsgUpdateContractAdmin',
        value: MsgUpdateContractAdmin_legacy_pb.encode(
          this.toProto(isClassic) as MsgUpdateContractAdmin_legacy_pb
        ).finish(),
      });
    } else {
      return Any.fromPartial({
        typeUrl: '/cosmwasm.wasm.v1.MsgUpdateAdmin',
        value: MsgUpdateAdmin_pb.encode(
          this.toProto(isClassic) as MsgUpdateAdmin_pb
        ).finish(),
      });
    }
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgUpdateContractAdmin {
    if (isClassic) {
      return MsgUpdateContractAdmin.fromProto(
        MsgUpdateContractAdmin_legacy_pb.decode(msgAny.value),
        isClassic
      );
    } else {
      return MsgUpdateContractAdmin.fromProto(
        MsgUpdateAdmin_pb.decode(msgAny.value),
        isClassic
      );
    }
  }

  public static fromData(
    data: MsgUpdateContractAdmin.Data,
    isClassic?: boolean
  ): MsgUpdateContractAdmin {
    if (isClassic) {
      const { admin, new_admin, contract } =
        data as MsgUpdateContractAdmin.DataV1;
      return new MsgUpdateContractAdmin(admin, new_admin, contract);
    } else {
      const { sender, new_admin, contract } =
        data as MsgUpdateContractAdmin.DataV2;
      return new MsgUpdateContractAdmin(sender, new_admin, contract);
    }
  }

  public toData(isClassic?: boolean): MsgUpdateContractAdmin.Data {
    const { admin, new_admin, contract } = this;
    if (isClassic) {
      return {
        '@type': '/terra.wasm.v1beta1.MsgUpdateContractAdmin',
        admin,
        new_admin,
        contract,
      };
    } else {
      return {
        '@type': '/cosmwasm.wasm.v1.MsgUpdateAdmin',
        sender: admin,
        new_admin,
        contract,
      };
    }
  }
}

export namespace MsgUpdateContractAdmin {
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
  export type Proto = MsgUpdateContractAdmin_legacy_pb | MsgUpdateAdmin_pb;
}
