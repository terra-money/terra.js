import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/src/google/protobuf/any_pb';
import { MsgUpdateContractAdmin as MsgUpdateContractAdmin_pb } from '@terra-money/terra.proto/src/terra/wasm/v1beta1/tx_pb';

export class MsgUpdateContractAdmin extends JSONSerializable<MsgUpdateContractAdmin.Data> {
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

  public static fromData(
    data: MsgUpdateContractAdmin.Data
  ): MsgUpdateContractAdmin {
    const {
      value: { admin, new_admin, contract },
    } = data;
    return new MsgUpdateContractAdmin(admin, new_admin, contract);
  }

  public toData(): MsgUpdateContractAdmin.Data {
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
      proto.getAdmin(),
      proto.getNewAdmin(),
      proto.getContract()
    );
  }

  public toProto(): MsgUpdateContractAdmin.Proto {
    const { admin, new_admin, contract } = this;
    const proto = new MsgUpdateContractAdmin_pb();
    proto.setAdmin(admin);
    proto.setNewAdmin(new_admin);
    proto.setContract(contract);
    return proto;
  }

  public packAny(): Any {
    const msgAny = new Any();
    msgAny.setTypeUrl('/terra.wasm.v1beta1.MsgUpdateContractAdmin');
    msgAny.setValue(this.toProto().serializeBinary());
    return msgAny;
  }

  public static unpackAny(msgAny: Any): MsgUpdateContractAdmin {
    return MsgUpdateContractAdmin.fromProto(
      MsgUpdateContractAdmin_pb.deserializeBinary(msgAny.getValue_asU8())
    );
  }
}

export namespace MsgUpdateContractAdmin {
  export interface Data {
    type: 'wasm/MsgUpdateContractAdmin';
    value: {
      admin: AccAddress;
      new_admin: AccAddress;
      contract: AccAddress;
    };
  }

  export type Proto = MsgUpdateContractAdmin_pb;
}
