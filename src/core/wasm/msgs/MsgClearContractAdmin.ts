import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgClearContractAdmin as MsgClearContractAdmin_legacy_pb } from '@terra-money/legacy.proto/terra/wasm/v1beta1/tx';
import { MsgClearAdmin as MsgClearAdmin_pb } from '@terra-money/terra.proto/cosmwasm/wasm/v1/tx';

export class MsgClearContractAdmin extends JSONSerializable<
  MsgClearContractAdmin.Amino,
  MsgClearContractAdmin.Data,
  MsgClearContractAdmin.Proto
> {
  /**
   * @param admin contract admin
   * @param contract contract address
   */
  constructor(public admin: AccAddress, public contract: AccAddress) {
    super();
  }

  public static fromAmino(
    data: MsgClearContractAdmin.Amino,
    legacy?: boolean
  ): MsgClearContractAdmin {
    if (legacy) {
      const {
        value: { admin, contract },
      } = data as MsgClearContractAdmin.AminoV1;
      return new MsgClearContractAdmin(admin, contract);
    } else {
      const {
        value: { sender, contract },
      } = data as MsgClearContractAdmin.AminoV2;
      return new MsgClearContractAdmin(sender, contract);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public toAmino(legacy?: boolean): MsgClearContractAdmin.Amino {
    const { admin, contract } = this;
    if (legacy) {
      return {
        type: 'wasm/MsgClearContractAdmin',
        value: {
          admin,
          contract,
        },
      };
    } else {
      return {
        type: 'wasm/MsgClearAdmin',
        value: {
          sender: admin,
          contract,
        },
      };
    }
  }

  public static fromProto(
    data: MsgClearContractAdmin.Proto,
    legacy?: boolean
  ): MsgClearContractAdmin {
    if (legacy) {
      const { admin, contract } = data as MsgClearContractAdmin.DataV1;
      return new MsgClearContractAdmin(admin, contract);
    } else {
      const { sender, contract } = data as MsgClearContractAdmin.DataV2;
      return new MsgClearContractAdmin(sender, contract);
    }
  }

  public toProto(legacy?: boolean): MsgClearContractAdmin.Proto {
    if (legacy) {
      return MsgClearContractAdmin_legacy_pb.fromPartial({
        admin: this.admin,
        contract: this.contract,
      });
    } else {
      return MsgClearAdmin_pb.fromPartial({
        sender: this.admin,
        contract: this.contract,
      });
    }
  }

  public packAny(legacy?: boolean): Any {
    if (legacy) {
      return Any.fromPartial({
        typeUrl: '/terra.wasm.v1beta1.MsgClearContractAdmin',
        value: MsgClearContractAdmin_legacy_pb.encode(this.toProto(legacy) as MsgClearContractAdmin_legacy_pb).finish(),
      });
    } else {
      return Any.fromPartial({
        typeUrl: '/cosmwasm.wasm.v1.MsgClearAdmin',
        value: MsgClearAdmin_pb.encode(this.toProto(legacy) as MsgClearAdmin_pb).finish(),
      });
    }
  }

  public static unpackAny(msgAny: Any, legacy?: boolean): MsgClearContractAdmin {
    if (legacy) {
      return MsgClearContractAdmin.fromProto(
        MsgClearContractAdmin_legacy_pb.decode(msgAny.value), legacy
      );
    } else {
      return MsgClearContractAdmin.fromProto(
        MsgClearAdmin_pb.decode(msgAny.value), legacy
      );
    }
  }

  public static fromData(
    data: MsgClearContractAdmin.Data,
    legacy?: boolean
  ): MsgClearContractAdmin {
    if (legacy) {
      const { admin, contract } = data as MsgClearContractAdmin.DataV1;
      return new MsgClearContractAdmin(admin, contract);
    } else {
      const { sender, contract } = data as MsgClearContractAdmin.DataV2;
      return new MsgClearContractAdmin(sender, contract);
    }
  }

  public toData(legacy?: boolean): MsgClearContractAdmin.Data {
    if (legacy) {
      return {
        '@type': '/terra.wasm.v1beta1.MsgClearContractAdmin',
        admin: this.admin,
        contract: this.contract,
      };
    } else {
      return {
        '@type': '/cosmwasm.wasm.v1.MsgClearAdmin',
        sender: this.admin,
        contract: this.contract,
      };
    }
  }
}

export namespace MsgClearContractAdmin {
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
  export type Proto = MsgClearContractAdmin_legacy_pb | MsgClearAdmin_pb;
}
