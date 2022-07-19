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
    isClassic?: boolean
  ): MsgAggregateExchangeRatePrevote {
    if (!isClassic) {
      throw new Error('Not supported for the network');
    }

    const {
      value: { hash, feeder, validator },
    } = data;
    return new MsgAggregateExchangeRatePrevote(hash, feeder, validator);
  }

  public toAmino(isClassic?: boolean): MsgAggregateExchangeRatePrevote.Amino {
    if (!isClassic) {
      throw new Error('Not supported for the network');
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
    isClassic?: boolean
  ): MsgAggregateExchangeRatePrevote {
    if (!isClassic) {
      throw new Error('Not supported for the network');
    }

    const { hash, feeder, validator } = data;
    return new MsgAggregateExchangeRatePrevote(hash, feeder, validator);
  }

  public toData(isClassic?: boolean): MsgAggregateExchangeRatePrevote.Data {
    if (!isClassic) {
      throw new Error('Not supported for the network');
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
    isClassic?: boolean
  ): MsgAggregateExchangeRatePrevote {
    if (!isClassic) {
      throw new Error('Not supported for the network');
    }

    return new MsgAggregateExchangeRatePrevote(
      proto.hash,
      proto.feeder,
      proto.validator
    );
  }

  public toProto(isClassic?: boolean): MsgAggregateExchangeRatePrevote.Proto {
    if (!isClassic) {
      throw new Error('Not supported for the network');
    }

    const { hash, feeder, validator } = this;
    return MsgAggregateExchangeRatePrevote_pb.fromPartial({
      hash,
      feeder,
      validator,
    });
  }

  public packAny(isClassic?: boolean): Any {
    if (!isClassic) {
      throw new Error('Not supported for the network');
    }

    return Any.fromPartial({
      typeUrl: '/terra.oracle.v1beta1.MsgAggregateExchangeRatePrevote',
      value: MsgAggregateExchangeRatePrevote_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgAggregateExchangeRatePrevote {
    if (!isClassic) {
      throw new Error('Not supported for the network');
    }

    return MsgAggregateExchangeRatePrevote.fromProto(
      MsgAggregateExchangeRatePrevote_pb.decode(msgAny.value),
      isClassic
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
