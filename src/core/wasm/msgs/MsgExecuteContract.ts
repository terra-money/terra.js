import { JSONSerializable, removeNull } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Coins } from '../../Coins';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgExecuteContract as MsgExecuteContract_pb } from '@terra-money/terra.proto/terra/wasm/v1beta1/tx';

export class MsgExecuteContract extends JSONSerializable<
  MsgExecuteContract.Amino,
  MsgExecuteContract.Data,
  MsgExecuteContract.Proto
> {
  public coins: Coins;

  /**
   * @param sender contract user
   * @param contract contract address
   * @param msg HandleMsg to pass as arguments for contract invocation
   * @param coins coins to be sent to contract
   */
  constructor(
    public sender: AccAddress,
    public contract: AccAddress,
    public execute_msg: object,
    coins: Coins.Input = {}
  ) {
    super();
    this.coins = new Coins(coins);
  }

  public static fromAmino(data: MsgExecuteContract.Amino): MsgExecuteContract {
    const {
      value: { sender, contract, execute_msg, coins },
    } = data;
    return new MsgExecuteContract(
      sender,
      contract,
      execute_msg,
      Coins.fromAmino(coins)
    );
  }

  public toAmino(): MsgExecuteContract.Amino {
    const { sender, contract, execute_msg, coins } = this;

    return {
      type: 'wasm/MsgExecuteContract',
      value: {
        sender,
        contract,
        execute_msg: removeNull(execute_msg),
        coins: coins.toAmino(),
      },
    };
  }

  public static fromProto(data: MsgExecuteContract.Proto): MsgExecuteContract {
    return new MsgExecuteContract(
      data.sender,
      data.contract,
      JSON.parse(Buffer.from(data.executeMsg).toString('utf-8')),
      Coins.fromProto(data.coins)
    );
  }

  public toProto(): MsgExecuteContract.Proto {
    const { sender, contract, execute_msg, coins } = this;
    return MsgExecuteContract_pb.fromPartial({
      coins: coins.toProto(),
      contract,
      sender,
      executeMsg: Buffer.from(JSON.stringify(removeNull(execute_msg)), 'utf-8'),
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/terra.wasm.v1beta1.MsgExecuteContract',
      value: MsgExecuteContract_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgExecuteContract {
    return MsgExecuteContract.fromProto(
      MsgExecuteContract_pb.decode(msgAny.value)
    );
  }

  public static fromData(data: MsgExecuteContract.Data): MsgExecuteContract {
    const { sender, contract, execute_msg, coins } = data;
    return new MsgExecuteContract(
      sender,
      contract,
      execute_msg,
      Coins.fromData(coins)
    );
  }

  public toData(): MsgExecuteContract.Data {
    const { sender, contract, execute_msg, coins } = this;
    return {
      '@type': '/terra.wasm.v1beta1.MsgExecuteContract',
      sender,
      contract,
      execute_msg,
      coins: coins.toData(),
    };
  }
}

export namespace MsgExecuteContract {
  export interface Amino {
    type: 'wasm/MsgExecuteContract';
    value: {
      sender: AccAddress;
      contract: AccAddress;
      execute_msg: object;
      coins: Coins.Amino;
    };
  }

  export interface Data {
    '@type': '/terra.wasm.v1beta1.MsgExecuteContract';
    sender: AccAddress;
    contract: AccAddress;
    execute_msg: object;
    coins: Coins.Data;
  }

  export type Proto = MsgExecuteContract_pb;
}
