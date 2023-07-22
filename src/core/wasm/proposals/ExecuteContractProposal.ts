import { JSONSerializable, removeNull } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Coins } from '../../Coins';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { ExecuteContractProposal as ExecuteContractProposal_pb } from '@terra-money/terra.proto/cosmwasm/wasm/v1/proposal';

/**
 * ExecuteContractProposal gov proposal content type to call execute on a
 * contract.
 */
export class ExecuteContractProposal extends JSONSerializable<
  ExecuteContractProposal.Amino,
  ExecuteContractProposal.Data,
  ExecuteContractProposal.Proto
> {
  public funds: Coins;

  /**
   * @param title a short summary
   * @param description a human readable text
   * @param run_as the address that is passed to the contract's environment as sender
   * @param contract the address of the smart contract
   * @param msg json encoded message to be passed to the contract as execute
   * @param funds coins that are transferred to the contract on instantiatio
   */
  constructor(
    public title: string,
    public description: string,
    public run_as: AccAddress,
    public contract: AccAddress,
    public msg: object | string,
    funds: Coins.Input = {}
  ) {
    super();
    this.funds = new Coins(funds);
  }

  public static fromAmino(data: ExecuteContractProposal.Amino) {
    const {
      value: { title, description, run_as, contract, msg, funds },
    } = data;
    return new ExecuteContractProposal(
      title,
      description,
      run_as,
      contract,
      msg,
      Coins.fromAmino(funds)
    );
  }

  public toAmino(): ExecuteContractProposal.Amino {
    const { title, description, run_as, contract, msg, funds } = this;

    return {
      type: 'wasm/ExecuteContractProposal',
      value: {
        title,
        description,
        run_as,
        contract,
        msg: removeNull(msg),
        funds: funds.toAmino(),
      },
    };
  }

  public static fromProto(proto: ExecuteContractProposal.Proto) {
    return new ExecuteContractProposal(
      proto.title,
      proto.description,
      proto.runAs,
      proto.contract,
      JSON.parse(Buffer.from(proto.msg).toString('utf-8')),
      Coins.fromProto(proto.funds)
    );
  }

  public toProto(): ExecuteContractProposal.Proto {
    const { title, description, run_as, contract, msg, funds } = this;
    return ExecuteContractProposal_pb.fromPartial({
      title,
      description,
      contract,
      runAs: run_as,
      msg: Buffer.from(JSON.stringify(removeNull(msg)), 'utf-8'),
      funds: funds.toProto(),
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.ExecuteContractProposal',
      value: ExecuteContractProposal_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any) {
    return ExecuteContractProposal.fromProto(
      ExecuteContractProposal_pb.decode(msgAny.value)
    );
  }

  public static fromData(data: ExecuteContractProposal.Data) {
    const { title, description, run_as, contract, msg, funds } = data;
    return new ExecuteContractProposal(
      title,
      description,
      run_as,
      contract,
      msg,
      Coins.fromData(funds)
    );
  }

  public toData(): ExecuteContractProposal.Data {
    const { title, description, run_as, contract, msg, funds } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.ExecuteContractProposal',
      title,
      description,
      run_as,
      contract,
      msg,
      funds: funds.toData(),
    };
  }
}

export namespace ExecuteContractProposal {
  export interface Amino {
    type: 'wasm/ExecuteContractProposal';
    value: {
      title: string;
      description: string;
      run_as: AccAddress;
      contract: AccAddress;
      msg: object | string;
      funds: Coins.Amino;
    };
  }

  export interface Data {
    '@type': '/cosmwasm.wasm.v1.ExecuteContractProposal';
    title: string;
    description: string;
    run_as: AccAddress;
    contract: AccAddress;
    msg: object | string;
    funds: Coins.Data;
  }

  export type Proto = ExecuteContractProposal_pb;
}
