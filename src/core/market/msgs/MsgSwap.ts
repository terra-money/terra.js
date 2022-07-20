import { JSONSerializable } from '../../../util/json';
import { Coin } from '../../Coin';
import { Denom } from '../../Denom';
import { AccAddress } from '../../bech32';
import { MsgSwap as MsgSwap_pb } from '@terra-money/legacy.proto/terra/market/v1beta1/tx';
import { Any } from '@terra-money/legacy.proto/google/protobuf/any';

/**
 * Executes a market swap between 2 denominations at the exchange rate registered by the
 * Oracle module. The account will lose the amount of coins offered, and receive funds
 * in the requested denomination after a swap fee has been applied.
 */
export class MsgSwap extends JSONSerializable<
  MsgSwap.Amino,
  MsgSwap.Data,
  MsgSwap.Proto
> {
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

  public static fromAmino(data: MsgSwap.Amino, isClassic?: boolean): MsgSwap {
    if (!isClassic) {
      throw new Error('Not supported for the network');
    }
    const {
      value: { trader, offer_coin, ask_denom },
    } = data;
    return new MsgSwap(trader, Coin.fromAmino(offer_coin), ask_denom);
  }

  public toAmino(isClassic?: boolean): MsgSwap.Amino {
    if (!isClassic) {
      throw new Error('Not supported for the network');
    }
    const { trader, offer_coin, ask_denom } = this;
    return {
      type: 'market/MsgSwap',
      value: {
        trader,
        offer_coin: offer_coin.toAmino(),
        ask_denom,
      },
    };
  }

  public static fromProto(proto: MsgSwap.Proto, isClassic?: boolean): MsgSwap {
    if (!isClassic) {
      throw new Error('Not supported for the network');
    }
    return new MsgSwap(
      proto.trader,
      Coin.fromProto(proto.offerCoin as Coin.Proto),
      proto.askDenom
    );
  }

  public toProto(isClassic?: boolean): MsgSwap.Proto {
    if (!isClassic) {
      throw new Error('Not supported for the network');
    }
    const { trader, offer_coin, ask_denom } = this;
    return MsgSwap_pb.fromPartial({
      askDenom: ask_denom,
      offerCoin: offer_coin.toProto(),
      trader,
    });
  }

  public packAny(isClassic?: boolean): Any {
    if (!isClassic) {
      throw new Error('Not supported for the network');
    }
    return Any.fromPartial({
      typeUrl: '/terra.market.v1beta1.MsgSwap',
      value: MsgSwap_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgSwap {
    if (!isClassic) {
      throw new Error('Not supported for the network');
    }
    return MsgSwap.fromProto(MsgSwap_pb.decode(msgAny.value), isClassic);
  }

  public static fromData(data: MsgSwap.Data, isClassic?: boolean): MsgSwap {
    if (!isClassic) {
      throw new Error('Not supported for the network');
    }
    const { trader, offer_coin, ask_denom } = data;
    return new MsgSwap(trader, Coin.fromData(offer_coin), ask_denom);
  }

  public toData(isClassic?: boolean): MsgSwap.Data {
    if (!isClassic) {
      throw new Error('Not supported for the network');
    }
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
  export interface Amino {
    type: 'market/MsgSwap';
    value: {
      trader: AccAddress;
      offer_coin: Coin.Amino;
      ask_denom: Denom;
    };
  }

  export interface Data {
    '@type': '/terra.market.v1beta1.MsgSwap';
    trader: AccAddress;
    offer_coin: Coin.Data;
    ask_denom: Denom;
  }

  export type Proto = MsgSwap_pb;
}
