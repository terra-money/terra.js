import { JSONSerializable } from '../../../util/json';
import { AccAddress, ValAddress } from '../../bech32';
import { Any } from '@terra-money/legacy.proto/google/protobuf/any';
import { MsgAggregateExchangeRatePrevote as MsgAggregateExchangeRatePrevote_pb } from '@terra-money/legacy.proto/terra/oracle/v1beta1/tx';

/**
 * Aggregate analog of MsgExchangeRatePrevote
 */
export class MsgAggregateExchangeRatePrevote extends JSONSerializable<
  MsgAggregateExchangeRatePrevote.Amino,
  MsgAggregateExchangeRatePrevote.Data,
  MsgAggregateExchangeRatePrevote.Proto
> {
  /**
   * @param hash vote hash
   * @param feeder validator's feeder account address
   * @param validator validator's operator address
   */
  constructor(
    public hash: string,
    public feeder: AccAddress,
    public validator: ValAddress
  ) {
    super();
  }

  public static fromAmino(
    data: MsgAggregateExchangeRatePrevote.Amino,
    legacy?: boolean
  ): MsgAggregateExchangeRatePrevote {
    if (!legacy) {
      throw new Error('Not supported for the network')
    }

    const {
      value: { hash, feeder, validator },
    } = data;
    return new MsgAggregateExchangeRatePrevote(hash, feeder, validator);
  }

  public toAmino(legacy?: boolean): MsgAggregateExchangeRatePrevote.Amino {
    if (!legacy) {
      throw new Error('Not supported for the network')
    }

    const { hash, feeder, validator } = this;
    return {
      type: 'oracle/MsgAggregateExchangeRatePrevote',
      value: {
        hash,
        feeder,
        validator,
      },
    };
  }

  public static fromData(
    data: MsgAggregateExchangeRatePrevote.Data,
    legacy?: boolean
  ): MsgAggregateExchangeRatePrevote {
    if (!legacy) {
      throw new Error('Not supported for the network')
    }

    const { hash, feeder, validator } = data;
    return new MsgAggregateExchangeRatePrevote(hash, feeder, validator);
  }

  public toData(legacy?: boolean): MsgAggregateExchangeRatePrevote.Data {
    if (!legacy) {
      throw new Error('Not supported for the network')
    }

    const { hash, feeder, validator } = this;
    return {
      '@type': '/terra.oracle.v1beta1.MsgAggregateExchangeRatePrevote',
      hash,
      feeder,
      validator,
    };
  }

  public static fromProto(
    proto: MsgAggregateExchangeRatePrevote.Proto,
    legacy?: boolean
  ): MsgAggregateExchangeRatePrevote {
    if (!legacy) {
      throw new Error('Not supported for the network')
    }

    return new MsgAggregateExchangeRatePrevote(
      proto.hash,
      proto.feeder,
      proto.validator
    );
  }

  public toProto(legacy?: boolean): MsgAggregateExchangeRatePrevote.Proto {
    if (!legacy) {
      throw new Error('Not supported for the network')
    }

    const { hash, feeder, validator } = this;
    return MsgAggregateExchangeRatePrevote_pb.fromPartial({
      hash,
      feeder,
      validator,
    });
  }

  public packAny(legacy?: boolean): Any {
    if (!legacy) {
      throw new Error('Not supported for the network')
    }

    return Any.fromPartial({
      typeUrl: '/terra.oracle.v1beta1.MsgAggregateExchangeRatePrevote',
      value: MsgAggregateExchangeRatePrevote_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, legacy?: boolean): MsgAggregateExchangeRatePrevote {
    if (!legacy) {
      throw new Error('Not supported for the network')
    }

    return MsgAggregateExchangeRatePrevote.fromProto(
      MsgAggregateExchangeRatePrevote_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgAggregateExchangeRatePrevote {
  export interface Amino {
    type: 'oracle/MsgAggregateExchangeRatePrevote';
    value: {
      hash: string;
      feeder: AccAddress;
      validator: ValAddress;
    };
  }

  export interface Data {
    '@type': '/terra.oracle.v1beta1.MsgAggregateExchangeRatePrevote';
    hash: string;
    feeder: AccAddress;
    validator: ValAddress;
  }

  export type Proto = MsgAggregateExchangeRatePrevote_pb;
}
