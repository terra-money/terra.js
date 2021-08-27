import { JSONSerializable } from '../../../util/json';
import { BasicAllowance } from './BasicAllowance';
import { PeriodicAllowance } from './PeriodicAllowance';

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
    const { allowance, allowed_messages } = proto;
    return new AllowedMsgAllowance(
      allowance['@type'] === '/cosmos.feegrant.v1beta1.BasicAllowance'
        ? BasicAllowance.fromProto(allowance)
        : PeriodicAllowance.fromProto(allowance),
      allowed_messages
    );
  }

  public toProto(): AllowedMsgAllowance.Proto {
    const { allowance, allowed_messages } = this;
    return {
      '@type': '/cosmos.feegrant.v1beta1.AllowedMsgAllowance',
      allowance: allowance.toProto(),
      allowed_messages,
    };
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

  export interface Proto {
    '@type': '/cosmos.feegrant.v1beta1.AllowedMsgAllowance';
    allowance: BasicAllowance.Proto | PeriodicAllowance.Proto;
    allowed_messages: string[];
  }
}
