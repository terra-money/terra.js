import { JSONSerializable, removeNull } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MigrateContractProposal as MigrateContractProposal_pb } from '@terra-money/terra.proto/cosmwasm/wasm/v1/proposal';
import * as Long from 'long';

/** MigrateContractProposal gov proposal content type to migrate a contract. */
export class MigrateContractProposal extends JSONSerializable<
  MigrateContractProposal.Amino,
  MigrateContractProposal.Data,
  MigrateContractProposal.Proto
> {
  /**
   * @param title a short summary
   * @param description a human readable text
   * @param contract the address of the smart contract
   * @param code_id references the new WASM code
   * @param msg json encoded message to be passed to the contract on migration
   */
  constructor(
    public title: string,
    public description: string,
    public contract: AccAddress,
    public code_id: number,
    public msg: object | string // json object or string
  ) {
    super();
  }

  public static fromAmino(data: MigrateContractProposal.Amino) {
    const {
      value: { title, description, contract, code_id, msg },
    } = data;
    return new MigrateContractProposal(
      title,
      description,
      contract,
      Number.parseInt(code_id),
      msg
    );
  }

  public toAmino(): MigrateContractProposal.Amino {
    const { title, description, contract, code_id, msg } = this;
    return {
      type: 'wasm/MigrateContractProposal',
      value: {
        title,
        description,
        contract,
        code_id: code_id.toFixed(),
        msg: removeNull(msg),
      },
    };
  }

  public static fromProto(proto: MigrateContractProposal.Proto) {
    return new MigrateContractProposal(
      proto.title,
      proto.description,
      proto.contract,
      proto.codeId.toNumber(),
      JSON.parse(Buffer.from(proto.msg).toString('utf-8'))
    );
  }

  public toProto(): MigrateContractProposal.Proto {
    const { title, description, contract, code_id, msg } = this;
    return MigrateContractProposal_pb.fromPartial({
      title,
      description,
      contract,
      codeId: Long.fromNumber(code_id),
      msg: Buffer.from(JSON.stringify(msg), 'utf-8'),
    });
  }

  public packAny() {
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.MigrateContractProposal',
      value: MigrateContractProposal_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any) {
    return MigrateContractProposal.fromProto(
      MigrateContractProposal_pb.decode(msgAny.value)
    );
  }

  public static fromData(data: MigrateContractProposal.Data) {
    const { title, description, contract, code_id, msg } = data;
    return new MigrateContractProposal(
      title,
      description,
      contract,
      Number.parseInt(code_id),
      msg
    );
  }

  public toData(): MigrateContractProposal.Data {
    const { title, description, contract, code_id, msg } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.MigrateContractProposal',
      title,
      description,
      contract,
      code_id: code_id.toFixed(),
      msg: removeNull(msg),
    };
  }
}

export namespace MigrateContractProposal {
  export interface Amino {
    type: 'wasm/MigrateContractProposal';
    value: {
      title: string;
      description: string;
      contract: AccAddress;
      code_id: string;
      msg: object | string;
    };
  }

  export interface Data {
    '@type': '/cosmwasm.wasm.v1.MigrateContractProposal';
    title: string;
    description: string;
    contract: AccAddress;
    code_id: string;
    msg: object | string;
  }

  export type Proto = MigrateContractProposal_pb;
}
