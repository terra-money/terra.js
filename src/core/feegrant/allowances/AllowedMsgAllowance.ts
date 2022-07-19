import { JSONSerializable } from '../../../util/json';
import { BasicAllowance } from './BasicAllowance';
import { PeriodicAllowance } from './PeriodicAllowance';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { AllowedMsgAllowance as AllowedMsgAllowance_pb } from '@terra-money/terra.proto/cosmos/feegrant/v1beta1/feegrant';

/**
 * AllowedMsgAllowance creates allowance only for specified message types.
 */
export class AllowedMsgAllowance extends JSONSerializable<
  AllowedMsgAllowance.Amino,
  AllowedMsgAllowance.Data,
  AllowedMsgAllowance.Proto
> {
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

  public static fromAmino(
    data: AllowedMsgAllowance.Amino,
    isClassic?: boolean
  ): AllowedMsgAllowance {
    const {
      value: { allowance, allowed_messages },
    } = data;

    return new AllowedMsgAllowance(
      allowance.type === 'feegrant/BasicAllowance' ||
      allowance.type === 'cosmos-sdk/BasicAllowance'
        ? BasicAllowance.fromAmino(allowance as BasicAllowance.Amino, isClassic)
        : PeriodicAllowance.fromAmino(
            allowance as PeriodicAllowance.Amino,
            isClassic
          ),
      allowed_messages
    );
  }

  public toAmino(isClassic?: boolean): AllowedMsgAllowance.Amino {
    const { allowance, allowed_messages } = this;
    return {
      type: isClassic
        ? 'feegrant/AllowedMsgAllowance'
        : 'cosmos-sdk/AllowedMsgAllowance',
      value: {
        allowance: allowance.toAmino(isClassic),
        allowed_messages,
      },
    };
  }

  public static fromData(
    proto: AllowedMsgAllowance.Data,
    _?: boolean
  ): AllowedMsgAllowance {
    _;
    const { allowance, allowed_messages } = proto;
    return new AllowedMsgAllowance(
      allowance['@type'] === '/cosmos.feegrant.v1beta1.BasicAllowance'
        ? BasicAllowance.fromData(allowance)
        : PeriodicAllowance.fromData(allowance),
      allowed_messages
    );
  }

  public toData(_?: boolean): AllowedMsgAllowance.Data {
    _;
    const { allowance, allowed_messages } = this;
    return {
      '@type': '/cosmos.feegrant.v1beta1.AllowedMsgAllowance',
      allowance: allowance.toData(),
      allowed_messages,
    };
  }

  public static fromProto(
    proto: AllowedMsgAllowance.Proto,
    isClassic?: boolean
  ): AllowedMsgAllowance {
    const allowance = proto.allowance as Any;
    return new AllowedMsgAllowance(
      allowance?.typeUrl === '/cosmos.feegrant.v1beta1.BasicAllowance'
        ? BasicAllowance.unpackAny(allowance, isClassic)
        : PeriodicAllowance.unpackAny(allowance, isClassic),
      proto.allowedMessages
    );
  }

  public toProto(isClassic?: boolean): AllowedMsgAllowance.Proto {
    const { allowance, allowed_messages } = this;
    return AllowedMsgAllowance_pb.fromPartial({
      allowance: allowance.packAny(isClassic),
      allowedMessages: allowed_messages,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.feegrant.v1beta1.AllowedMsgAllowance',
      value: AllowedMsgAllowance_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): AllowedMsgAllowance {
    return AllowedMsgAllowance.fromProto(
      AllowedMsgAllowance_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace AllowedMsgAllowance {
  export interface Amino {
    type: 'feegrant/AllowedMsgAllowance' | 'cosmos-sdk/AllowedMsgAllowance';
    value: {
      allowance: BasicAllowance.Amino | PeriodicAllowance.Amino;
      allowed_messages: string[];
    };
  }

  export interface Data {
    '@type': '/cosmos.feegrant.v1beta1.AllowedMsgAllowance';
    allowance: BasicAllowance.Data | PeriodicAllowance.Data;
    allowed_messages: string[];
  }

  export type Proto = AllowedMsgAllowance_pb;
}
