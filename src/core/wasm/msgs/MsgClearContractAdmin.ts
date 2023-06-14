import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
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
    data: MsgClearContractAdmin.Amino
  ): MsgClearContractAdmin {
    const {
      value: { sender, contract },
    } = data;
    return new MsgClearContractAdmin(sender, contract);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public toAmino(): MsgClearContractAdmin.Amino {
    const { admin, contract } = this;
    return {
      type: 'wasm/MsgClearAdmin',
      value: {
        sender: admin,
        contract,
      },
    };
  }

  public static fromProto(
    data: MsgClearContractAdmin.Proto
  ): MsgClearContractAdmin {
    const { sender, contract } = data;
    return new MsgClearContractAdmin(sender, contract);
  }

  public toProto(): MsgClearContractAdmin.Proto {
    return MsgClearAdmin_pb.fromPartial({
      sender: this.admin,
      contract: this.contract,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.MsgClearAdmin',
      value: MsgClearAdmin_pb.encode(
        this.toProto() as MsgClearAdmin_pb
      ).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgClearContractAdmin {
    return MsgClearContractAdmin.fromProto(
      MsgClearAdmin_pb.decode(msgAny.value)
    );
  }

  public static fromData(
    data: MsgClearContractAdmin.Data
  ): MsgClearContractAdmin {
    const { sender, contract } = data;
    return new MsgClearContractAdmin(sender, contract);
  }

  public toData(): MsgClearContractAdmin.Data {
    return {
      '@type': '/cosmwasm.wasm.v1.MsgClearAdmin',
      sender: this.admin,
      contract: this.contract,
    };
  }
}

export namespace MsgClearContractAdmin {
  export interface Amino {
    type: 'wasm/MsgClearAdmin';
    value: {
      sender: AccAddress;
      contract: AccAddress;
    };
  }

  export interface Data {
    '@type': '/cosmwasm.wasm.v1.MsgClearAdmin';
    sender: string;
    contract: string;
  }

  export type Proto = MsgClearAdmin_pb;
}
