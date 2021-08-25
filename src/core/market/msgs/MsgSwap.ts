import { JSONSerializable } from '../../../util/json';
import { Coin } from '../../Coin';
import { Denom } from '../../Denom';
import { AccAddress } from '../../bech32';

/**
 * Executes a market swap between 2 denominations at the exchange rate registered by the
 * Oracle module. The account will lose the amount of coins offered, and receive funds
 * in the requested denomination after a swap fee has been applied.
 */
export class MsgSwap extends JSONSerializable<MsgSwap.Data> {
  /**
   * @param trader trader's account address
   * @param offer_coin coin to be swapped (from)
   * @param ask_denom desired denomination (to)
   */
  constructor(
    public trader: AccAddress,
    public offer_coin: Coin,
    public ask_denom: Denom
  ) {
    super();
  }

  public static fromData(data: MsgSwap.Data): MsgSwap {
    const {
      value: { trader, offer_coin, ask_denom },
    } = data;
    return new MsgSwap(trader, Coin.fromData(offer_coin), ask_denom);
  }

  public toData(): MsgSwap.Data {
    const { trader, offer_coin, ask_denom } = this;
    return {
      type: 'market/MsgSwap',
      value: {
        trader,
        offer_coin: offer_coin.toData(),
        ask_denom,
      },
    };
  }

  public static fromProto(data: MsgSwap.Proto): MsgSwap {
    const { trader, offer_coin, ask_denom } = data;
    return new MsgSwap(trader, Coin.fromData(offer_coin), ask_denom);
  }

  public toProto(): MsgSwap.Proto {
    const { trader, offer_coin, ask_denom } = this;
    return {
      '@type': '/terra.market.v1beta1.MsgSwap',
      trader,
      offer_coin: offer_coin.toData(),
      ask_denom,
    };
  }
}

export namespace MsgSwap {
  export interface Data {
    type: 'market/MsgSwap';
    value: {
      trader: AccAddress;
      offer_coin: Coin.Data;
      ask_denom: Denom;
    };
  }

  export interface Proto {
    '@type': '/terra.market.v1beta1.MsgSwap';
    trader: AccAddress;
    offer_coin: Coin.Data;
    ask_denom: Denom;
  }
}
