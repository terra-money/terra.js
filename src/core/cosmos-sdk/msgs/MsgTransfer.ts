import { Coin } from '../../Coin';
import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';

/**
 * MsgTransfer defines a msg to transfer fungible tokens (i.e Coins) between
 * ICS20 enabled chains
 */
export class MsgTransfer extends JSONSerializable<MsgTransfer.Data> {
  /**
   * Token to be transferred
   */
  public token: Coin;

  /**
   * @param sender sender's beck32 address
   * @param receiver recipient's beck32 address
   * @param {Coin.Data} token value of the transaction
   * @param source_port port on which the packet will be sent,
   * @param source_channel channel by which the packet will be sent,
   * @param {Object} timeout_height timeout height relative to the current block height
   * @param {string} timeout_height.revision_number timeout timestamp (in nanoseconds) relative to the current block timestamp
   * @param {string} timeout_height.revision_height
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
