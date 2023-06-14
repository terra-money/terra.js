import { JSONSerializable, removeNull } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Coins } from '../../Coins';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgExecuteContract as MsgExecuteContract_pb } from '@terra-money/terra.proto/cosmwasm/wasm/v1/tx';

export class MsgExecuteContract extends JSONSerializable<
  MsgExecuteContract.Amino,
  MsgExecuteContract.Data,
  MsgExecuteContract.Proto
> {
  public coins: Coins;

  /**
   * @param sender contract user
   * @param contract contract address
   * @param execute_msg HandleMsg to pass as arguments for contract invocation
   * @param coins coins to be sent to contract
   */
  constructor(
    public sender: AccAddress,
    public contract: AccAddress,
    public execute_msg: object | string,
    coins: Coins.Input = {}
  ) {
    super();
    this.coins = new Coins(coins);
  }

  public static fromAmino(data: MsgExecuteContract.Amino): MsgExecuteContract {
    const {
      value: { sender, contract, msg, funds },
    } = data;
    return new MsgExecuteContract(
      sender,
      contract,
      msg,
      Coins.fromAmino(funds)
    );
  }

  public toAmino(): MsgExecuteContract.Amino {
    const { sender, contract, execute_msg, coins } = this;
    return {
      type: 'wasm/MsgExecuteContract',
      value: {
        sender,
        contract,
        msg: removeNull(execute_msg),
        funds: coins.toAmino(),
      },
    };
  }

  public static fromProto(proto: MsgExecuteContract.Proto): MsgExecuteContract {
    const p = proto as MsgExecuteContract_pb;
    return new MsgExecuteContract(
      p.sender,
      p.contract,
      JSON.parse(Buffer.from(p.msg).toString('utf-8')),
      Coins.fromProto(p.funds)
    );
  }

  public toProto(): MsgExecuteContract.Proto {
    const { sender, contract, execute_msg, coins } = this;
    return MsgExecuteContract_pb.fromPartial({
      funds: coins.toProto(),
      contract,
      sender,
      msg: Buffer.from(JSON.stringify(removeNull(execute_msg)), 'utf-8'),
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
      value: MsgExecuteContract_pb.encode(
        this.toProto() as MsgExecuteContract_pb
      ).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgExecuteContract {
    return MsgExecuteContract.fromProto(
      MsgExecuteContract_pb.decode(msgAny.value)
    );
  }

  public static fromData(data: MsgExecuteContract.Data): MsgExecuteContract {
    const { sender, contract, msg, funds } = data;
    return new MsgExecuteContract(sender, contract, msg, Coins.fromData(funds));
  }

  public toData(): MsgExecuteContract.Data {
    const { sender, contract, execute_msg, coins } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.MsgExecuteContract',
      sender,
      contract,
      msg: execute_msg,
      funds: coins.toData(),
    };
  }
}

export namespace MsgExecuteContract {
  export interface Amino {
    type: 'wasm/MsgExecuteContract';
    value: {
      sender: AccAddress;
      contract: AccAddress;
      msg: object | string;
      funds: Coins.Amino;
    };
  }

  export interface Data {
    '@type': '/cosmwasm.wasm.v1.MsgExecuteContract';
    sender: AccAddress;
    contract: AccAddress;
    msg: object | string;
    funds: Coins.Data;
  }

  export type Proto = MsgExecuteContract_pb;
}
