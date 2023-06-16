import { JSONSerializable, removeNull } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Coins } from '../../Coins';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { InstantiateContractProposal as InstantiateContractProposal_pb } from '@terra-money/terra.proto/cosmwasm/wasm/v1/proposal';
import * as Long from 'long';

/**
 * InstantiateContractProposal gov proposal content type to instantiate a
 * contract.
 */
export class InstantiateContractProposal extends JSONSerializable<
  InstantiateContractProposal.Amino,
  InstantiateContractProposal.Data,
  InstantiateContractProposal.Proto
> {
  public funds: Coins;

  /**
   * @param title a short summary
   * @param description a human readable text
   * @param run_as is a run_as address
   * @param admin is an optional contract admin address who can migrate the contract, put empty string to disable migration
   * @param code_id is the reference to the stored WASM code
   * @param msg json encoded message to be passed to the contract on instantiation
   * @param funds are transferred to the contract on execution
   * @param label label is optional metadata to be stored with a constract instance.
   */
  constructor(
    public title: string,
    public description: string,
    public run_as: AccAddress,
    public admin: AccAddress | undefined,
    public code_id: number,
    public msg: object | string,
    funds: Coins.Input = {},
    public label: string | undefined
  ) {
    super();
    this.funds = new Coins(funds);
  }

  public static fromAmino(data: InstantiateContractProposal.Amino) {
    const {
      value: { title, description, run_as, admin, code_id, msg, funds, label },
    } = data;
    return new InstantiateContractProposal(
      title,
      description,
      run_as,
      admin,
      Number.parseInt(code_id),
      msg,
      Coins.fromAmino(funds),
      label
    );
  }

  public toAmino(): InstantiateContractProposal.Amino {
    const { title, description, run_as, admin, code_id, msg, funds, label } =
      this;
    return {
      type: 'wasm/InstantiateContractProposal',
      value: {
        title,
        description,
        run_as,
        admin,
        code_id: code_id.toFixed(),
        label,
        msg: removeNull(msg),
        funds: funds.toAmino(),
      },
    };
  }

  public static fromProto(proto: InstantiateContractProposal.Proto) {
    return new InstantiateContractProposal(
      proto.title,
      proto.description,
      proto.runAs,
      proto.admin,
      proto.codeId.toNumber(),
      JSON.parse(Buffer.from(proto.msg).toString('utf-8')),
      Coins.fromProto(proto.funds),
      proto.label
    );
  }

  public toProto(): InstantiateContractProposal.Proto {
    const { title, description, run_as, admin, code_id, msg, funds, label } =
      this;
    return InstantiateContractProposal_pb.fromPartial({
      title,
      description,
      runAs: run_as,
      admin,
      codeId: Long.fromNumber(code_id),
      funds: funds.toProto(),
      msg: Buffer.from(JSON.stringify(msg), 'utf-8'),
      label,
    });
  }

  public packAny() {
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.InstantiateContractProposal',
      value: InstantiateContractProposal_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any) {
    return InstantiateContractProposal.fromProto(
      InstantiateContractProposal_pb.decode(msgAny.value)
    );
  }

  public static fromData(data: InstantiateContractProposal.Data) {
    const { title, description, run_as, admin, code_id, label, msg, funds } =
      data;
    return new InstantiateContractProposal(
      title,
      description,
      run_as,
      admin,
      Number.parseInt(code_id),
      msg,
      Coins.fromData(funds),
      label
    );
  }

  public toData(): InstantiateContractProposal.Data {
    const { title, description, run_as, admin, code_id, label, msg, funds } =
      this;
    return {
      '@type': '/cosmwasm.wasm.v1.InstantiateContractProposal',
      title,
      description,
      run_as,
      admin,
      code_id: code_id.toFixed(),
      label,
      msg: removeNull(msg),
      funds: funds.toData(),
    };
  }
}

export namespace InstantiateContractProposal {
  export interface Amino {
    type: 'wasm/InstantiateContractProposal';
    value: {
      title: string;
      description: string;
      run_as: AccAddress;
      admin?: AccAddress;
      code_id: string;
      label?: string;
      msg: object | string;
      funds: Coins.Amino;
    };
  }

  export interface Data {
    '@type': '/cosmwasm.wasm.v1.InstantiateContractProposal';
    title: string;
    description: string;
    run_as: AccAddress;
    admin?: AccAddress;
    code_id: string;
    label?: string;
    msg: object | string;
    funds: Coins.Data;
  }

  export type Proto = InstantiateContractProposal_pb;
}
