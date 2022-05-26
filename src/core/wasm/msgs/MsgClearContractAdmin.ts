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
    isClassic?: boolean
  ): MsgClearContractAdmin {
    if (isClassic) {
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
  public toAmino(isClassic?: boolean): MsgClearContractAdmin.Amino {
    const { admin, contract } = this;
    if (isClassic) {
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
    isClassic?: boolean
  ): MsgClearContractAdmin {
    if (isClassic) {
      const { admin, contract } = data as MsgClearContractAdmin.DataV1;
      return new MsgClearContractAdmin(admin, contract);
    } else {
      const { sender, contract } = data as MsgClearContractAdmin.DataV2;
      return new MsgClearContractAdmin(sender, contract);
    }
  }

  public toProto(isClassic?: boolean): MsgClearContractAdmin.Proto {
    if (isClassic) {
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

  public packAny(isClassic?: boolean): Any {
    if (isClassic) {
      return Any.fromPartial({
        typeUrl: '/terra.wasm.v1beta1.MsgClearContractAdmin',
        value: MsgClearContractAdmin_legacy_pb.encode(
          this.toProto(isClassic) as MsgClearContractAdmin_legacy_pb
        ).finish(),
      });
    } else {
      return Any.fromPartial({
        typeUrl: '/cosmwasm.wasm.v1.MsgClearAdmin',
        value: MsgClearAdmin_pb.encode(
          this.toProto(isClassic) as MsgClearAdmin_pb
        ).finish(),
      });
    }
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgClearContractAdmin {
    if (isClassic) {
      return MsgClearContractAdmin.fromProto(
        MsgClearContractAdmin_legacy_pb.decode(msgAny.value),
        isClassic
      );
    } else {
      return MsgClearContractAdmin.fromProto(
        MsgClearAdmin_pb.decode(msgAny.value),
        isClassic
      );
    }
  }

  public static fromData(
    data: MsgClearContractAdmin.Data,
    isClassic?: boolean
  ): MsgClearContractAdmin {
    if (isClassic) {
      const { admin, contract } = data as MsgClearContractAdmin.DataV1;
      return new MsgClearContractAdmin(admin, contract);
    } else {
      const { sender, contract } = data as MsgClearContractAdmin.DataV2;
      return new MsgClearContractAdmin(sender, contract);
    }
  }

  public toData(isClassic?: boolean): MsgClearContractAdmin.Data {
    if (isClassic) {
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
