import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../strings';
import { Msg } from '../../Msg';

export class MsgExecAuthorized extends JSONSerializable<
  MsgExecAuthorized.Data
> {
  /**
   * @param grantee authorization grantee
   * @param msgs list of messages to execute
   */
  constructor(public grantee: AccAddress, public msgs: Msg[]) {
    super();
  }

  public static fromData(data: MsgExecAuthorized.Data): MsgExecAuthorized {
    const {
      value: { grantee, msgs },
    } = data;
    return new MsgExecAuthorized(
      grantee,
      msgs.map(x => Msg.fromData(x))
    );
  }

  public toData(): MsgExecAuthorized.Data {
    const { grantee, msgs } = this;
    return {
      type: 'msgauth/MsgExecAuthorized',
      value: {
        grantee,
        msgs: msgs.map(msg => msg.toData()),
      },
    };
  }
}

export namespace MsgExecAuthorized {
  export interface Data {
    type: 'msgauth/MsgExecAuthorized';
    value: {
      grantee: AccAddress;
      msgs: Msg.Data[];
    };
  }
}
