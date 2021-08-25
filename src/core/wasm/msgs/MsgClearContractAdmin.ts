import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';

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

  public static fromProto(data: MsgClearContractAdmin.Proto): MsgClearContractAdmin {
    const { admin, contract } = data
    return new MsgClearContractAdmin(admin, contract)
  }

  public toProto(): MsgClearContractAdmin.Proto {
    return {
      '@type': '/terra.wasm.v1beta1.MsgClearContractAdmin',
      admin: this.admin,
      contract: this.contract
    }
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

  export interface Proto {
    '@type': '/terra.wasm.v1beta1.MsgClearContractAdmin';
    admin: string;
    contract: string;
  }
}
