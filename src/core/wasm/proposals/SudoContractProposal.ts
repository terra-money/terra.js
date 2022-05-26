import { JSONSerializable, removeNull } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { SudoContractProposal as SudoContractProposal_pb } from '@terra-money/terra.proto/cosmwasm/wasm/v1/proposal';

export class SudoContractProposal extends JSONSerializable<
  SudoContractProposal.Amino,
  SudoContractProposal.Data,
  SudoContractProposal.Proto
> {
  /**
   * @param title a short summary
   * @param description a human readable text
   * @param contract contract address to be migrated from
   * @param msg JSON message to configure the migrate state of the contract
   */
  constructor(
    public title: string,
    public description: string,
    public contract: AccAddress,
    public msg: object | string // json object or string
  ) {
    super();
  }

  public static fromAmino(
    data: SudoContractProposal.Amino,
    isClassic?: boolean
  ): SudoContractProposal {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const {
      value: { title, description, contract, msg },
    } = data as SudoContractProposal.Amino;
    return new SudoContractProposal(title, description, contract, msg);
  }

  public toAmino(isClassic?: boolean): SudoContractProposal.Amino {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { title, description, contract, msg } = this;
    return {
      type: 'wasm/SudoContractProposal',
      value: {
        title,
        description,
        contract,
        msg: removeNull(msg),
      },
    };
  }

  public static fromProto(
    proto: SudoContractProposal.Proto,
    isClassic?: boolean
  ): SudoContractProposal {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return new SudoContractProposal(
      proto.title,
      proto.description,
      proto.contract,
      JSON.parse(Buffer.from(proto.msg).toString('utf-8'))
    );
  }

  public toProto(isClassic?: boolean): SudoContractProposal.Proto {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { title, description, contract, msg } = this;
    return SudoContractProposal_pb.fromPartial({
      title,
      description,
      contract,
      msg: Buffer.from(JSON.stringify(msg), 'utf-8'),
    });
  }
  public packAny(isClassic?: boolean): Any {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.SudoContractProposal',
      value: SudoContractProposal_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): SudoContractProposal {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return SudoContractProposal.fromProto(
      SudoContractProposal_pb.decode(msgAny.value),
      isClassic
    );
  }

  public static fromData(
    data: SudoContractProposal.Data,
    isClassic?: boolean
  ): SudoContractProposal {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { title, description, contract, msg } =
      data as SudoContractProposal.Data;
    return new SudoContractProposal(title, description, contract, msg);
  }

  public toData(isClassic?: boolean): SudoContractProposal.Data {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { title, description, contract, msg } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.SudoContractProposal',
      title,
      description,
      contract,
      msg: removeNull(msg),
    };
  }
}

export namespace SudoContractProposal {
  export interface Amino {
    type: 'wasm/SudoContractProposal';
    value: {
      title: string;
      description: string;
      contract: AccAddress;
      msg: object | string;
    };
  }

  export interface Data {
    '@type': '/cosmwasm.wasm.v1.SudoContractProposal';
    title: string;
    description: string;
    contract: AccAddress;
    msg: object | string;
  }

  export type Proto = SudoContractProposal_pb;
}
