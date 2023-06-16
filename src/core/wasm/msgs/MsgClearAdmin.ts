import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgClearAdmin as MsgClearAdmin_pb } from '@terra-money/terra.proto/cosmwasm/wasm/v1/tx';

export class MsgClearAdmin extends JSONSerializable<
  MsgClearAdmin.Amino,
  MsgClearAdmin.Data,
  MsgClearAdmin.Proto
> {
  /**
   * @param sender the that actor that signed the messages
   * @param contract the address of the smart contract
   */
  constructor(public sender: AccAddress, public contract: AccAddress) {
    super();
  }

  public static fromAmino(data: MsgClearAdmin.Amino): MsgClearAdmin {
    const {
      value: { sender, contract },
    } = data;
    return new MsgClearAdmin(sender, contract);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public toAmino(): MsgClearAdmin.Amino {
    const { sender: admin, contract } = this;
    return {
      type: 'wasm/MsgClearAdmin',
      value: {
        sender: admin,
        contract,
      },
    };
  }

  public static fromProto(data: MsgClearAdmin.Proto): MsgClearAdmin {
    const { sender, contract } = data;
    return new MsgClearAdmin(sender, contract);
  }

  public toProto(): MsgClearAdmin.Proto {
    return MsgClearAdmin_pb.fromPartial({
      sender: this.sender,
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

  public static unpackAny(msgAny: Any): MsgClearAdmin {
    return MsgClearAdmin.fromProto(MsgClearAdmin_pb.decode(msgAny.value));
  }

  public static fromData(data: MsgClearAdmin.Data): MsgClearAdmin {
    const { sender, contract } = data;
    return new MsgClearAdmin(sender, contract);
  }

  public toData(): MsgClearAdmin.Data {
    return {
      '@type': '/cosmwasm.wasm.v1.MsgClearAdmin',
      sender: this.sender,
      contract: this.contract,
    };
  }
}

export namespace MsgClearAdmin {
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
