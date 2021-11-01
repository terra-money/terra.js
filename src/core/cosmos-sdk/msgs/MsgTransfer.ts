import { Coin } from '../../Coin';
import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';

/**
 * A basic message for sending [[Coins]] between Terra accounts.
 */
export class MsgTransfer extends JSONSerializable<MsgTransfer.Data> {
  /**
   * value of the transaction
   */
  public token: Coin;

  /**
   * @param sender sender's address
   * @param receiver recipient's address
   * @param token value of the transaction
   * @param source_port: string,
   * @param source_channel: string,
   * @param timeout_height: string,
   */
  constructor(
    public sender: AccAddress,
    public receiver: AccAddress,
    token: Coin.Data,
    public source_port: string,
    public source_channel: string,
    public timeout_height: any
  ) {
    super();
    this.token = Coin.fromData(token);
  }

  public static fromData(data: MsgTransfer.Data): MsgTransfer {
    const {
      value: {
        sender,
        receiver,
        token,
        source_port,
        source_channel,
        timeout_height,
      },
    } = data;
    return new MsgTransfer(
      sender,
      receiver,
      token,
      source_port,
      source_channel,
      timeout_height
    );
  }

  public toData(): MsgTransfer.Data {
    const {
      sender,
      receiver,
      token,
      source_port,
      source_channel,
      timeout_height,
    } = this;
    return {
      type: 'cosmos-sdk/MsgTransfer',
      value: {
        source_port,
        source_channel,
        sender,
        receiver,
        token: token.toData(),
        timeout_height,
      },
    };
  }
}

export namespace MsgTransfer {
  export interface Data {
    type: 'cosmos-sdk/MsgTransfer';
    value: {
      source_port: string;
      source_channel: string;
      sender: AccAddress;
      receiver: AccAddress;
      token: Coin.Data;
      timeout_height: {
        revision_number: string;
        revision_height: string;
      };
    };
  }
}
