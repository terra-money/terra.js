import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/src/google/protobuf/any_pb';
import { MsgClearContractAdmin as MsgClearContractAdmin_pb } from '@terra-money/terra.proto/src/terra/wasm/v1beta1/tx_pb';

export class MsgClearContractAdmin extends JSONSerializable<MsgClearContractAdmin.Data> {
  /**
   * @param admin contract admin
   * @param new_admin new admin
   * @param contract contract address
   */
  constructor(public admin: AccAddress, public contract: AccAddress) {
    super();
  }

  public static fromData(
    data: MsgClearContractAdmin.Data
  ): MsgClearContractAdmin {
    const {
      value: { admin, contract },
    } = data;
    return new MsgClearContractAdmin(admin, contract);
  }

  public toData(): MsgClearContractAdmin.Data {
    const { admin, contract } = this;
    return {
      type: 'wasm/MsgClearContractAdmin',
      value: {
        admin,
        contract,
      },
    };
  }

  public static fromProto(
    data: MsgClearContractAdmin.Proto
  ): MsgClearContractAdmin {
    return new MsgClearContractAdmin(data.getAdmin(), data.getContract());
  }

  public toProto(): MsgClearContractAdmin.Proto {
    const msgClearContractAdminProto = new MsgClearContractAdmin_pb();
    msgClearContractAdminProto.setAdmin(this.admin);
    msgClearContractAdminProto.setContract(this.contract);
    return msgClearContractAdminProto;
  }

  public packAny(): Any {
    const msgAny = new Any();
    msgAny.setTypeUrl('/terra.wasm.v1beta1.MsgClearContractAdmin');
    msgAny.setValue(this.toProto().serializeBinary());
    return msgAny;
  }

  public static unpackAny(msgAny: Any): MsgClearContractAdmin {
    return MsgClearContractAdmin.fromProto(
      MsgClearContractAdmin_pb.deserializeBinary(msgAny.getValue_asU8())
    );
  }
}

export namespace MsgClearContractAdmin {
  export interface Data {
    type: 'wasm/MsgClearContractAdmin';
    value: {
      admin: AccAddress;
      contract: AccAddress;
    };
  }

  export type Proto = MsgClearContractAdmin_pb;
}
