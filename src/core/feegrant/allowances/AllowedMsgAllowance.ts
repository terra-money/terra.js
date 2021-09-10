import { JSONSerializable } from '../../../util/json';
import { BasicAllowance } from './BasicAllowance';
import { PeriodicAllowance } from './PeriodicAllowance';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { AllowedMsgAllowance as AllowedMsgAllowance_pb } from '@terra-money/terra.proto/cosmos/feegrant/v1beta1/feegrant';

/**
 * AllowedMsgAllowance creates allowance only for specified message types.
 */
export class AllowedMsgAllowance extends JSONSerializable<AllowedMsgAllowance.Data> {
  /**
   * @param allowance any of basic and periodic fee allowance.
   * @param allowed_messages the messages for which the grantee has the access.
   */
  constructor(
    public allowance: BasicAllowance | PeriodicAllowance,
    public allowed_messages: string[]
  ) {
    super();
  }

  public static fromData(data: AllowedMsgAllowance.Data): AllowedMsgAllowance {
    const {
      value: { allowance, allowed_messages },
    } = data;

    return new AllowedMsgAllowance(
      allowance.type === 'feegrant/BasicAllowance'
        ? BasicAllowance.fromData(allowance)
        : PeriodicAllowance.fromData(allowance),
      allowed_messages
    );
  }

  public toData(): AllowedMsgAllowance.Data {
    const { allowance, allowed_messages } = this;
    return {
      type: 'feegrant/AllowedMsgAllowance',
      value: {
        allowance: allowance.toData(),
        allowed_messages,
      },
    };
  }

  public static fromProto(
    proto: AllowedMsgAllowance.Proto
  ): AllowedMsgAllowance {
    const allowance = proto.allowance as Any;
    return new AllowedMsgAllowance(
      allowance?.typeUrl === '/cosmos.feegrant.v1beta1.BasicAllowance'
        ? BasicAllowance.unpackAny(allowance)
        : PeriodicAllowance.unpackAny(allowance),
      proto.allowedMessages
    );
  }

  public toProto(): AllowedMsgAllowance.Proto {
    const { allowance, allowed_messages } = this;
    return AllowedMsgAllowance_pb.fromPartial({
      allowance: allowance.packAny(),
      allowedMessages: allowed_messages,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.feegrant.v1beta1.AllowedMsgAllowance',
      value: AllowedMsgAllowance_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): AllowedMsgAllowance {
    return AllowedMsgAllowance.fromProto(
      AllowedMsgAllowance_pb.decode(msgAny.value)
    );
  }
}

export namespace AllowedMsgAllowance {
  export interface Data {
    type: 'feegrant/AllowedMsgAllowance';
    value: {
      allowance: BasicAllowance.Data | PeriodicAllowance.Data;
      allowed_messages: string[];
    };
  }

  export type Proto = AllowedMsgAllowance_pb;
}
