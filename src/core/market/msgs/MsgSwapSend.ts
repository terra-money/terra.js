import { JSONSerializable } from '../../../util/json';
import { Coin } from '../../Coin';
import { Denom } from '../../Denom';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/legacy.proto/google/protobuf/any';
import { MsgSwapSend as MsgSwapSend_pb } from '@terra-money/legacy.proto/terra/market/v1beta1/tx';

/**
 * Executes a market swap send between 2 denominations at the exchange rate registered by the
 * Oracle module. The sender account will lose the amount of coins offered, and receiver will receive funds
 * in the requested denomination after a swap and send fee has been applied.
 */
export class MsgSwapSend extends JSONSerializable<
  MsgSwapSend.Amino,
  MsgSwapSend.Data,
  MsgSwapSend.Proto
> {
  /**
   * @param from_address sender's account address
   * @param to_address receiver's account address
   * @param offer_coin coin to be swapped (from)
   * @param ask_denom desired denomination (to)
   */
  constructor(
    public from_address: AccAddress,
    public to_address: AccAddress,
    public offer_coin: Coin,
    public ask_denom: Denom
  ) {
    super();
  }

  public static fromAmino(
    data: MsgSwapSend.Amino,
    isClassic?: boolean
  ): MsgSwapSend {
    if (!isClassic) {
      throw new Error('Not supported for the network');
    }
    const {
      value: { from_address, to_address, offer_coin, ask_denom },
    } = data;
    return new MsgSwapSend(
      from_address,
      to_address,
      Coin.fromAmino(offer_coin),
      ask_denom
    );
  }

  public toAmino(isClassic?: boolean): MsgSwapSend.Amino {
    if (!isClassic) {
      throw new Error('Not supported for the network');
    }
    const { from_address, to_address, offer_coin, ask_denom } = this;
    return {
      type: 'market/MsgSwapSend',
      value: {
        from_address,
        to_address,
        offer_coin: offer_coin.toAmino(),
        ask_denom,
      },
    };
  }

  public static fromProto(
    proto: MsgSwapSend.Proto,
    isClassic?: boolean
  ): MsgSwapSend {
    if (!isClassic) {
      throw new Error('Not supported for the network');
    }
    return new MsgSwapSend(
      proto.fromAddress,
      proto.toAddress,
      Coin.fromProto(proto.offerCoin as Coin.Proto),
      proto.askDenom
    );
  }

  public toProto(isClassic?: boolean): MsgSwapSend.Proto {
    if (!isClassic) {
      throw new Error('Not supported for the network');
    }
    const { from_address, to_address, offer_coin, ask_denom } = this;
    return MsgSwapSend_pb.fromPartial({
      askDenom: ask_denom,
      fromAddress: from_address,
      offerCoin: offer_coin.toProto(),
      toAddress: to_address,
    });
  }

  public packAny(isClassic?: boolean): Any {
    if (!isClassic) {
      throw new Error('Not supported for the network');
    }
    return Any.fromPartial({
      typeUrl: '/terra.market.v1beta1.MsgSwapSend',
      value: MsgSwapSend_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgSwapSend {
    if (!isClassic) {
      throw new Error('Not supported for the network');
    }
    return MsgSwapSend.fromProto(
      MsgSwapSend_pb.decode(msgAny.value),
      isClassic
    );
  }

  public static fromData(
    data: MsgSwapSend.Data,
    isClassic?: boolean
  ): MsgSwapSend {
    if (!isClassic) {
      throw new Error('Not supported for the network');
    }
    const { from_address, to_address, offer_coin, ask_denom } = data;
    return new MsgSwapSend(
      from_address,
      to_address,
      Coin.fromData(offer_coin),
      ask_denom
    );
  }

  public toData(isClassic?: boolean): MsgSwapSend.Data {
    if (!isClassic) {
      throw new Error('Not supported for the network');
    }
    const { from_address, to_address, offer_coin, ask_denom } = this;
    return {
      '@type': '/terra.market.v1beta1.MsgSwapSend',
      from_address,
      to_address,
      offer_coin: offer_coin.toData(),
      ask_denom,
    };
  }
}

export namespace MsgSwapSend {
  export interface Amino {
    type: 'market/MsgSwapSend';
    value: {
      from_address: AccAddress;
      to_address: AccAddress;
      offer_coin: Coin.Amino;
      ask_denom: Denom;
    };
  }

  export interface Data {
    '@type': '/terra.market.v1beta1.MsgSwapSend';
    from_address: AccAddress;
    to_address: AccAddress;
    offer_coin: Coin.Data;
    ask_denom: Denom;
  }

  export type Proto = MsgSwapSend_pb;
}
