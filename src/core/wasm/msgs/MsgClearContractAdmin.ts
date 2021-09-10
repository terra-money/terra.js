import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgClearContractAdmin as MsgClearContractAdmin_pb } from '@terra-money/terra.proto/terra/wasm/v1beta1/tx';

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
    return new MsgClearContractAdmin(data.admin, data.contract);
  }

  public toProto(): MsgClearContractAdmin.Proto {
    return MsgClearContractAdmin_pb.fromPartial({
      admin: this.admin,
      contract: this.contract,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/terra.wasm.v1beta1.MsgClearContractAdmin',
      value: MsgClearContractAdmin_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgClearContractAdmin {
    return MsgClearContractAdmin.fromProto(
      MsgClearContractAdmin_pb.decode(msgAny.value)
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
