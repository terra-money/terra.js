import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgUpdateAdmin as MsgUpdateAdmin_pb } from '@terra-money/terra.proto/cosmwasm/wasm/v1/tx';

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

  public static fromAmino(data: MsgUpdateAdmin.Amino) {
    const {
      value: { sender, new_admin, contract },
    } = data;
    return new MsgUpdateAdmin(sender, new_admin, contract);
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

  public static fromProto(proto: MsgUpdateAdmin.Proto) {
    const p = proto as MsgUpdateAdmin_pb;
    return new MsgUpdateAdmin(p.sender, p.newAdmin, p.contract);
  }

  public toProto(): MsgUpdateAdmin.Proto {
    const { sender, new_admin, contract } = this;
    return MsgUpdateAdmin_pb.fromPartial({
      sender,
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

  public static unpackAny(msgAny: Any) {
    return MsgUpdateAdmin.fromProto(MsgUpdateAdmin_pb.decode(msgAny.value));
  }

  public static fromData(data: MsgUpdateAdmin.Data) {
    const { sender, new_admin, contract } = data;
    return new MsgUpdateAdmin(sender, new_admin, contract);
  }

  public toData(): MsgUpdateAdmin.Data {
    const { sender, new_admin, contract } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.MsgUpdateAdmin',
      sender,
      new_admin,
      contract,
    };
  }
}

export namespace MsgUpdateAdmin {
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
