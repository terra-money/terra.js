import { JSONSerializable, removeNull } from '../../../util/json';
import { AccAddress } from '../../bech32';
export class MsgMigrateContract extends JSONSerializable<MsgMigrateContract.Data> {
  /**
   * @param admin contract admin
   * @param contract contract address to be migrated from
   * @param new_code_id reference to the new code on the blockchain
   * @param migrate_msg JSON message to configure the migrate state of the contract
   */
  constructor(
    public admin: AccAddress,
    public contract: AccAddress,
    public new_code_id: number,
    public migrate_msg: object // json object
  ) {
    super();
  }

  public static fromData(data: MsgMigrateContract.Data): MsgMigrateContract {
    const {
      value: { admin, contract, new_code_id, migrate_msg },
    } = data;
    return new MsgMigrateContract(
      admin,
      contract,
      Number.parseInt(new_code_id),
      migrate_msg
    );
  }

  public toData(): MsgMigrateContract.Data {
    const { admin, contract, new_code_id, migrate_msg } = this;
    return {
      type: 'wasm/MsgMigrateContract',
      value: {
        admin,
        contract,
        new_code_id: new_code_id.toFixed(),
        migrate_msg: removeNull(migrate_msg),
      },
    };
  }

  public static fromProto(data: MsgMigrateContract.Proto): MsgMigrateContract {
    const { admin, contract, new_code_id, migrate_msg } = data;
    return new MsgMigrateContract(
      admin,
      contract,
      Number.parseInt(new_code_id),
      migrate_msg
    );
  }

  public toProto(): MsgMigrateContract.Proto {
    const { admin, contract, new_code_id, migrate_msg } = this;
    return {
      '@type': '/terra.wasm.v1beta1.MsgMigrateContract',
      admin,
      contract,
      new_code_id: new_code_id.toFixed(),
      migrate_msg: removeNull(migrate_msg),
    };
  }
}

export namespace MsgMigrateContract {
  export interface Data {
    type: 'wasm/MsgMigrateContract';
    value: {
      admin: AccAddress;
      contract: AccAddress;
      new_code_id: string;
      migrate_msg: object;
    };
  }

  export interface Proto {
    '@type': '/terra.wasm.v1beta1.MsgMigrateContract';
    admin: AccAddress;
    contract: AccAddress;
    new_code_id: string;
    migrate_msg: object;
  }
}
