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
   * @param contract contract address to be migrated from
   * @param new_code_id reference to the new code on the blockchain
   * @param migrate_msg JSON message to configure the migrate state of the contract
   */
  constructor(
    public title: string,
    public description: string,
    public contract: AccAddress,
    public new_code_id: number,
    public migrate_msg: object | string // json object or string
  ) {
    super();
  }

  public static fromAmino(
    data: MigrateContractProposal.Amino,
    isClassic?: boolean
  ): MigrateContractProposal {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const {
      value: { title, description, contract, code_id, msg },
    } = data as MigrateContractProposal.Amino;
    return new MigrateContractProposal(
      title,
      description,
      contract,
      Number.parseInt(code_id),
      msg
    );
  }

  public toAmino(isClassic?: boolean): MigrateContractProposal.Amino {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { title, description, contract, new_code_id, migrate_msg } = this;
    return {
      type: 'wasm/MigrateContractProposal',
      value: {
        title,
        description,
        contract,
        code_id: new_code_id.toFixed(),
        msg: removeNull(migrate_msg),
      },
    };
  }

  public static fromProto(
    proto: MigrateContractProposal.Proto,
    isClassic?: boolean
  ): MigrateContractProposal {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return new MigrateContractProposal(
      proto.title,
      proto.description,
      proto.contract,
      proto.codeId.toNumber(),
      JSON.parse(Buffer.from(proto.msg).toString('utf-8'))
    );
  }

  public toProto(isClassic?: boolean): MigrateContractProposal.Proto {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { title, description, contract, new_code_id, migrate_msg } = this;
    return MigrateContractProposal_pb.fromPartial({
      title,
      description,
      contract,
      codeId: Long.fromNumber(new_code_id),
      msg: Buffer.from(JSON.stringify(migrate_msg), 'utf-8'),
    });
  }
  public packAny(isClassic?: boolean): Any {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.MigrateContractProposal',
      value: MigrateContractProposal_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MigrateContractProposal {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return MigrateContractProposal.fromProto(
      MigrateContractProposal_pb.decode(msgAny.value),
      isClassic
    );
  }

  public static fromData(
    data: MigrateContractProposal.Data,
    isClassic?: boolean
  ): MigrateContractProposal {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { title, description, contract, code_id, msg } =
      data as MigrateContractProposal.Data;
    return new MigrateContractProposal(
      title,
      description,
      contract,
      Number.parseInt(code_id),
      msg
    );
  }

  public toData(isClassic?: boolean): MigrateContractProposal.Data {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { title, description, contract, new_code_id, migrate_msg } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.MigrateContractProposal',
      title,
      description,
      contract,
      code_id: new_code_id.toFixed(),
      msg: removeNull(migrate_msg),
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
