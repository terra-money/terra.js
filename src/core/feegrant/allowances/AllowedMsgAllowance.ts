import { JSONSerializable } from '../../../util/json';
import { BasicAllowance } from './BasicAllowance';
import { PeriodicAllowance } from './PeriodicAllowance';
import { Any } from '@terra-money/terra.proto/src/google/protobuf/any_pb';
import { AllowedMsgAllowance as AllowedMsgAllowance_pb } from '@terra-money/terra.proto/src/cosmos/feegrant/v1beta1/feegrant_pb';
import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';
import { Allowance } from '.';

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
    const allowance = proto.getAllowance() as Any;
    return new AllowedMsgAllowance(
      allowance?.getTypeUrl() === '/cosmos.feegrant.v1beta1.BasicAllowance'
        ? BasicAllowance.unpackAny(allowance)
        : PeriodicAllowance.unpackAny(allowance),
      proto.getAllowedMessagesList()
    );
  }

  public toProto(): AllowedMsgAllowance.Proto {
    const { allowance, allowed_messages } = this;
    const proto = new AllowedMsgAllowance_pb();
    proto.setAllowance(allowance.packAny() as any);
    proto.setAllowedMessagesList(allowed_messages);
    return proto;
  }

  public packAny(): Any {
    const msgAny = new Any();
    msgAny.setTypeUrl('/cosmos.feegrant.v1beta1.AllowedMsgAllowance');
    msgAny.setValue(this.toProto().serializeBinary());
    return msgAny;
  }

  public static unpackAny(msgAny: Any): AllowedMsgAllowance {
    return AllowedMsgAllowance.fromProto(
      AllowedMsgAllowance_pb.deserializeBinary(msgAny.getValue_asU8())
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
