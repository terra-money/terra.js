import { JSONSerializable } from '../../../util/json';
import { AccAddress, ValAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgAggregateExchangeRatePrevote as MsgAggregateExchangeRatePrevote_pb } from '@terra-money/terra.proto/terra/oracle/v1beta1/tx';
import * as Long from 'long';

/**
 * Aggregate analog of MsgExchangeRatePrevote
 */
export class MsgAggregateExchangeRatePrevote extends JSONSerializable<MsgAggregateExchangeRatePrevote.Data> {
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

  public static fromData(
    data: MsgAggregateExchangeRatePrevote.Data
  ): MsgAggregateExchangeRatePrevote {
    const {
      value: { hash, feeder, validator },
    } = data;
    return new MsgAggregateExchangeRatePrevote(hash, feeder, validator);
  }

  public toData(): MsgAggregateExchangeRatePrevote.Data {
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

  public static fromProto(
    proto: MsgAggregateExchangeRatePrevote.Proto
  ): MsgAggregateExchangeRatePrevote {
    return new MsgAggregateExchangeRatePrevote(
      proto.hash,
      proto.feeder,
      proto.validator
    );
  }

  public toProto(): MsgAggregateExchangeRatePrevote.Proto {
    const { hash, feeder, validator } = this;
    return MsgAggregateExchangeRatePrevote_pb.fromPartial({
      hash,
      feeder,
      validator,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/terra.oracle.v1beta1.MsgAggregateExchangeRatePrevote',
      value: MsgAggregateExchangeRatePrevote_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgAggregateExchangeRatePrevote {
    return MsgAggregateExchangeRatePrevote.fromProto(
      MsgAggregateExchangeRatePrevote_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgAggregateExchangeRatePrevote {
  export interface Data {
    type: 'oracle/MsgAggregateExchangeRatePrevote';
    value: {
      hash: string;
      feeder: AccAddress;
      validator: ValAddress;
    };
  }

  export type Proto = MsgAggregateExchangeRatePrevote_pb;
}
