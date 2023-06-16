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
   * @param sender the that actor that signed the messages
   * @param contract the address of the smart contract
   * @param code_id references the new WASM code
   * @param msg json encoded message to be passed to the contract on migration
   */
  constructor(
    public sender: AccAddress,
    public contract: AccAddress,
    public code_id: number,
    public msg: object | string // json object or string
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
    const { sender, contract, code_id, msg } = this;
    return {
      type: 'wasm/MsgMigrateContract',
      value: {
        sender,
        contract,
        code_id: code_id.toFixed(),
        msg: removeNull(msg),
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
    const { sender, contract, code_id, msg } = this;
    return MsgMigrateContract_pb.fromPartial({
      sender,
      contract,
      codeId: Long.fromNumber(code_id),
      msg: Buffer.from(JSON.stringify(msg), 'utf-8'),
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
    const { sender, contract, code_id, msg } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.MsgMigrateContract',
      sender,
      contract,
      code_id: code_id.toFixed(),
      msg: removeNull(msg),
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
