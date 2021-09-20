import { JSONSerializable, removeNull } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgMigrateContract as MsgMigrateContract_pb } from '@terra-money/terra.proto/terra/wasm/v1beta1/tx';
import * as Long from 'long';

export class MsgMigrateContract extends JSONSerializable<
  MsgMigrateContract.Amino,
  MsgMigrateContract.Data,
  MsgMigrateContract.Proto
> {
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

  public static fromAmino(data: MsgMigrateContract.Amino): MsgMigrateContract {
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

  public toAmino(): MsgMigrateContract.Amino {
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

  public static fromProto(proto: MsgMigrateContract.Proto): MsgMigrateContract {
    return new MsgMigrateContract(
      proto.admin,
      proto.contract,
      proto.newCodeId.toNumber(),
      JSON.parse(Buffer.from(proto.migrateMsg).toString('utf-8'))
    );
  }

  public toProto(): MsgMigrateContract.Proto {
    const { admin, contract, new_code_id, migrate_msg } = this;
    return MsgMigrateContract_pb.fromPartial({
      admin,
      contract,
      newCodeId: Long.fromNumber(new_code_id),
      migrateMsg: Buffer.from(JSON.stringify(migrate_msg), 'utf-8'),
    });
  }
  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/terra.wasm.v1beta1.MsgMigrateContract',
      value: MsgMigrateContract_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgMigrateContract {
    return MsgMigrateContract.fromProto(
      MsgMigrateContract_pb.decode(msgAny.value)
    );
  }

  public static fromData(data: MsgMigrateContract.Data): MsgMigrateContract {
    const { admin, contract, new_code_id, migrate_msg } = data;
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
      '@type': '/terra.wasm.v1beta1.MsgMigrateContract',
      admin,
      contract,
      new_code_id: new_code_id.toFixed(),
      migrate_msg: removeNull(migrate_msg),
    };
  }
}

export namespace MsgMigrateContract {
  export interface Amino {
    type: 'wasm/MsgMigrateContract';
    value: {
      admin: AccAddress;
      contract: AccAddress;
      new_code_id: string;
      migrate_msg: object;
    };
  }

  export interface Data {
    '@type': '/terra.wasm.v1beta1.MsgMigrateContract';
    admin: AccAddress;
    contract: AccAddress;
    new_code_id: string;
    migrate_msg: object;
  }

  export type Proto = MsgMigrateContract_pb;
}
