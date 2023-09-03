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
   * @param contract the address of the smart contract
   * @param msg json encoded message to be passed to the contract as sudo
   */
  constructor(
    public title: string,
    public description: string,
    public contract: AccAddress,
    public msg: object | string // json object or string
  ) {
    super();
  }

  public static fromAmino(data: SudoContractProposal.Amino) {
    const {
      value: { title, description, contract, msg },
    } = data;
    return new SudoContractProposal(title, description, contract, msg);
  }

  public toAmino(): SudoContractProposal.Amino {
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

  public static fromProto(proto: SudoContractProposal.Proto) {
    return new SudoContractProposal(
      proto.title,
      proto.description,
      proto.contract,
      JSON.parse(Buffer.from(proto.msg).toString('utf-8'))
    );
  }

  public toProto(): SudoContractProposal.Proto {
    const { title, description, contract, msg } = this;
    return SudoContractProposal_pb.fromPartial({
      title,
      description,
      contract,
      msg: Buffer.from(JSON.stringify(msg), 'utf-8'),
    });
  }

  public packAny() {
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.SudoContractProposal',
      value: SudoContractProposal_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any) {
    return SudoContractProposal.fromProto(
      SudoContractProposal_pb.decode(msgAny.value)
    );
  }

  public static fromData(data: SudoContractProposal.Data) {
    const { title, description, contract, msg } = data;
    return new SudoContractProposal(title, description, contract, msg);
  }

  public toData(): SudoContractProposal.Data {
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
