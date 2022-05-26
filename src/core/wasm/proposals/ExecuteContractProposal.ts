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
  public coins: Coins;

  /**
   * @param title a short summary
   * @param description a human readable text
   * @param run_as contract user
   * @param contract contract address
   * @param execute_msg HandleMsg to pass as arguments for contract invocation
   * @param coins coins to be sent to contract
   */
  constructor(
    public title: string,
    public description: string,
    public run_as: AccAddress,
    public contract: AccAddress,
    public execute_msg: object | string,
    coins: Coins.Input = {}
  ) {
    super();
    this.coins = new Coins(coins);
  }

  public static fromAmino(
    data: ExecuteContractProposal.Amino,
    isClassic?: boolean
  ): ExecuteContractProposal {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const {
      value: { title, description, run_as, contract, msg, funds },
    } = data as ExecuteContractProposal.Amino;
    return new ExecuteContractProposal(
      title,
      description,
      run_as,
      contract,
      msg,
      Coins.fromAmino(funds)
    );
  }

  public toAmino(isClassic?: boolean): ExecuteContractProposal.Amino {
    const { title, description, run_as, contract, execute_msg, coins } = this;
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return {
      type: 'wasm/ExecuteContractProposal',
      value: {
        title,
        description,
        run_as,
        contract,
        msg: removeNull(execute_msg),
        funds: coins.toAmino(),
      },
    };
  }

  public static fromProto(
    proto: ExecuteContractProposal.Proto,
    isClassic?: boolean
  ): ExecuteContractProposal {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return new ExecuteContractProposal(
      proto.title,
      proto.description,
      proto.runAs,
      proto.contract,
      JSON.parse(Buffer.from(proto.msg).toString('utf-8')),
      Coins.fromProto(proto.funds)
    );
  }

  public toProto(isClassic?: boolean): ExecuteContractProposal.Proto {
    const { title, description, run_as, contract, execute_msg, coins } = this;
    if (isClassic) {
      throw new Error('Not supported for the network');
    } else {
      return ExecuteContractProposal_pb.fromPartial({
        title,
        description,
        funds: coins.toProto(),
        contract,
        runAs: run_as,
        msg: Buffer.from(JSON.stringify(removeNull(execute_msg)), 'utf-8'),
      });
    }
  }

  public packAny(isClassic?: boolean): Any {
    if (isClassic) {
      throw new Error('Not supported for the network');
    } else {
      return Any.fromPartial({
        typeUrl: '/cosmwasm.wasm.v1.ExecuteContractProposal',
        value: ExecuteContractProposal_pb.encode(
          this.toProto(isClassic)
        ).finish(),
      });
    }
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): ExecuteContractProposal {
    return ExecuteContractProposal.fromProto(
      ExecuteContractProposal_pb.decode(msgAny.value),
      isClassic
    );
  }

  public static fromData(
    data: ExecuteContractProposal.Data,
    isClassic?: boolean
  ): ExecuteContractProposal {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { title, description, run_as, contract, msg, funds } =
      data as ExecuteContractProposal.Data;
    return new ExecuteContractProposal(
      title,
      description,
      run_as,
      contract,
      msg,
      Coins.fromData(funds)
    );
  }

  public toData(isClassic?: boolean): ExecuteContractProposal.Data {
    const { title, description, run_as, contract, execute_msg, coins } = this;
    if (isClassic) {
      throw new Error('Not supported for the network');
    } else {
      return {
        '@type': '/cosmwasm.wasm.v1.ExecuteContractProposal',
        title,
        description,
        run_as,
        contract,
        msg: execute_msg,
        funds: coins.toData(),
      };
    }
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
