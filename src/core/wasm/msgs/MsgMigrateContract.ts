import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../strings';
import { b64ToDict, dictToB64 } from '../../../util/contract';
export class MsgMigrateContract extends JSONSerializable<MsgMigrateContract.Data> {
  /**
   * @param owner contract owner
   * @param contract contract address to be migrated from
   * @param new_code_id reference to the new code on the blockchain
   * @param migrate_msg JSON message to configure the migrate state of the contract
   */
  constructor(
    public owner: AccAddress,
    public contract: AccAddress,
    public new_code_id: number,
    public migrate_msg: object // json object
  ) {
    super();
  }

  public static fromData(data: MsgMigrateContract.Data): MsgMigrateContract {
    const {
      value: { owner, contract, new_code_id, migrate_msg },
    } = data;
    return new MsgMigrateContract(
      owner,
      contract,
      Number.parseInt(new_code_id),
      b64ToDict(migrate_msg)
    );
  }

  public toData(): MsgMigrateContract.Data {
    const { owner, contract, new_code_id, migrate_msg } = this;
    return {
      type: 'wasm/MsgMigrateContract',
      value: {
        owner,
        contract,
        new_code_id: new_code_id.toFixed(),
        migrate_msg: dictToB64(migrate_msg),
      },
    };
  }
}

export namespace MsgMigrateContract {
  export interface Data {
    type: 'wasm/MsgMigrateContract';
    value: {
      owner: AccAddress;
      contract: AccAddress;
      new_code_id: string;
      migrate_msg: string;
    };
  }
}
