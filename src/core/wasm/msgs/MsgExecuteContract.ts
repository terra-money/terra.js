import { JSONSerializable, removeNull } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Coins } from '../../Coins';
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
}
