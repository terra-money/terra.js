import { JSONSerializable, removeNull } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgMigrateContract as MsgMigrateContract_pb } from '@terra-money/terra.proto/cosmwasm/wasm/v1/tx';
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
    public migrate_msg: object | string // json object or string
  ) {
    super();
  }

  public static fromAmino(data: MsgMigrateContract.Amino): MsgMigrateContract {
    const {
      value: { sender, contract, code_id, msg },
    } = data;
    return new MsgMigrateContract(
      sender,
      contract,
      Number.parseInt(code_id),
      msg
    );
  }

  public toAmino(): MsgMigrateContract.Amino {
    const { admin, contract, new_code_id, migrate_msg } = this;
    return {
      type: 'wasm/MsgMigrateContract',
      value: {
        sender: admin,
        contract,
        code_id: new_code_id.toFixed(),
        msg: removeNull(migrate_msg),
      },
    };
  }

  public static fromProto(proto: MsgMigrateContract.Proto): MsgMigrateContract {
    const p = proto as MsgMigrateContract_pb;
    return new MsgMigrateContract(
      p.sender,
      p.contract,
      p.codeId.toNumber(),
      JSON.parse(Buffer.from(p.msg).toString('utf-8'))
    );
  }

  public toProto(): MsgMigrateContract.Proto {
    const { admin, contract, new_code_id, migrate_msg } = this;
    return MsgMigrateContract_pb.fromPartial({
      sender: admin,
      contract,
      codeId: Long.fromNumber(new_code_id),
      msg: Buffer.from(JSON.stringify(migrate_msg), 'utf-8'),
    });
  }
  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.MsgMigrateContract',
      value: MsgMigrateContract_pb.encode(
        this.toProto() as MsgMigrateContract_pb
      ).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgMigrateContract {
    return MsgMigrateContract.fromProto(
      MsgMigrateContract_pb.decode(msgAny.value)
    );
  }

  public static fromData(data: MsgMigrateContract.Data): MsgMigrateContract {
    const { sender, contract, code_id, msg } = data;
    return new MsgMigrateContract(
      sender,
      contract,
      Number.parseInt(code_id),
      msg
    );
  }

  public toData(): MsgMigrateContract.Data {
    const { admin, contract, new_code_id, migrate_msg } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.MsgMigrateContract',
      sender: admin,
      contract,
      code_id: new_code_id.toFixed(),
      msg: removeNull(migrate_msg),
    };
  }
}

export namespace MsgMigrateContract {
  export interface Amino {
    type: 'wasm/MsgMigrateContract';
    value: {
      sender: AccAddress;
      contract: AccAddress;
      code_id: string;
      msg: object | string;
    };
  }

  export interface Data {
    '@type': '/cosmwasm.wasm.v1.MsgMigrateContract';
    sender: AccAddress;
    contract: AccAddress;
    code_id: string;
    msg: object | string;
  }

  export type Proto = MsgMigrateContract_pb;
}
