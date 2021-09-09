import { JSONSerializable, removeNull } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Coins } from '../../Coins';
import { Any } from '@terra-money/terra.proto/src/google/protobuf/any_pb';
import { MsgExecuteContract as MsgExecuteContract_pb } from '@terra-money/terra.proto/src/terra/wasm/v1beta1/tx_pb';

export class MsgExecuteContract extends JSONSerializable<MsgExecuteContract.Data> {
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

  public static fromData(data: MsgExecuteContract.Data): MsgExecuteContract {
    const {
      value: { sender, contract, execute_msg, coins },
    } = data;
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
      type: 'wasm/MsgExecuteContract',
      value: {
        sender,
        contract,
        execute_msg: removeNull(execute_msg),
        coins: coins.toData(),
      },
    };
  }

  public static fromProto(data: MsgExecuteContract.Proto): MsgExecuteContract {
    return new MsgExecuteContract(
      data.getSender(),
      data.getContract(),
      JSON.parse(atob(data.getExecuteMsg_asB64())),
      Coins.fromProto(data.getCoinsList())
    );
  }

  public toProto(): MsgExecuteContract.Proto {
    const { sender, contract, execute_msg, coins } = this;
    const msgExecuteContractProto = new MsgExecuteContract_pb();
    msgExecuteContractProto.setSender(sender);
    msgExecuteContractProto.setContract(contract);
    msgExecuteContractProto.setExecuteMsg(
      btoa(JSON.stringify(removeNull(execute_msg)))
    );
    msgExecuteContractProto.setCoinsList(coins.toProto());
    return msgExecuteContractProto;
  }

  public packAny(): Any {
    const msgAny = new Any();
    msgAny.setTypeUrl('/terra.wasm.v1beta1.MsgExecuteContract');
    msgAny.setValue(this.toProto().serializeBinary());
    return msgAny;
  }

  public static unpackAny(msgAny: Any): MsgExecuteContract {
    return MsgExecuteContract.fromProto(
      MsgExecuteContract_pb.deserializeBinary(msgAny.getValue_asU8())
    );
  }
}

export namespace MsgExecuteContract {
  export interface Data {
    type: 'wasm/MsgExecuteContract';
    value: {
      sender: AccAddress;
      contract: AccAddress;
      execute_msg: object;
      coins: Coins.Data;
    };
  }

  export type Proto = MsgExecuteContract_pb;
}
