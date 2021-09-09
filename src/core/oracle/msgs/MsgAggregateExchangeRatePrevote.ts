import { JSONSerializable } from '../../../util/json';
import { AccAddress, ValAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/src/google/protobuf/any_pb';
import { MsgAggregateExchangeRatePrevote as MsgAggregateExchangeRatePrevote_pb } from '@terra-money/terra.proto/src/terra/oracle/v1beta1/tx_pb';

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
      proto.getHash(),
      proto.getFeeder(),
      proto.getValidator()
    );
  }

  public toProto(): MsgAggregateExchangeRatePrevote.Proto {
    const { hash, feeder, validator } = this;
    const proto = new MsgAggregateExchangeRatePrevote_pb();
    proto.setHash(hash);
    proto.setFeeder(feeder);
    proto.setValidator(validator);
    return proto;
  }

  public packAny(): Any {
    const msgAny = new Any();
    msgAny.setTypeUrl('/terra.oracle.v1beta1.MsgAggregateExchangeRatePrevote');
    msgAny.setValue(this.toProto().serializeBinary());
    return msgAny;
  }

  public static unpackAny(msgAny: Any): MsgAggregateExchangeRatePrevote {
    return MsgAggregateExchangeRatePrevote.fromProto(
      MsgAggregateExchangeRatePrevote_pb.deserializeBinary(
        msgAny.getValue_asU8()
      )
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
