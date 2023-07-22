import { JSONSerializable } from '../../util/json';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgVerifyInvariant as MsgVerifyInvariant_pb } from '@terra-money/terra.proto/cosmos/crisis/v1beta1/tx';
import { AccAddress } from '../bech32';

/**
 * MsgVerifyInvariant represents a message to verify a particular invariance.
 */
export class MsgVerifyInvariant extends JSONSerializable<
  MsgVerifyInvariant.Amino,
  MsgVerifyInvariant.Data,
  MsgVerifyInvariant.Proto
> {
  /**
   * @param sender sender's address
   * @param invariantModuleName module name to verify invariant
   * @param invariantRoute route to verify
   */
  constructor(
    public sender: AccAddress,
    public invariantModuleName: string,
    public invariantRoute: string
  ) {
    super();
  }

  public static fromAmino(data: MsgVerifyInvariant.Amino) {
    const {
      value: { sender, invariantModuleName, invariantRoute },
    } = data;
    return new MsgVerifyInvariant(sender, invariantModuleName, invariantRoute);
  }

  public toAmino(): MsgVerifyInvariant.Amino {
    throw new Error('MsgVerifyInvarant is not allowed to send');
  }

  public static fromData(data: MsgVerifyInvariant.Data) {
    const { sender, invariantModuleName, invariantRoute } = data;
    return new MsgVerifyInvariant(sender, invariantModuleName, invariantRoute);
  }

  public toData(): MsgVerifyInvariant.Data {
    const { sender, invariantModuleName, invariantRoute } = this;
    return {
      '@type': '/cosmos.crisis.v1beta1.MsgVerifyInvariant',
      sender,
      invariantModuleName,
      invariantRoute,
    };
  }

  public static fromProto(proto: MsgVerifyInvariant.Proto) {
    return new MsgVerifyInvariant(
      proto.sender,
      proto.invariantModuleName,
      proto.invariantRoute
    );
  }

  public toProto(): MsgVerifyInvariant.Proto {
    throw new Error('MsgVerifyInvarant is not allowed to send');
  }

  public packAny() {
    return Any.fromPartial({
      typeUrl: '/cosmos.crisis.v1beta1.MsgVerifyInvariant',
      value: MsgVerifyInvariant_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any) {
    return MsgVerifyInvariant.fromProto(
      MsgVerifyInvariant_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgVerifyInvariant {
  export interface Amino {
    type: 'crisis/MsgVerifyInvariant' | 'cosmos-sdk/MsgVerifyInvariant';
    value: {
      sender: AccAddress;
      invariantModuleName: string;
      invariantRoute: string;
    };
  }

  export interface Data {
    '@type': '/cosmos.crisis.v1beta1.MsgVerifyInvariant';
    sender: AccAddress;
    invariantModuleName: string;
    invariantRoute: string;
  }

  export type Proto = MsgVerifyInvariant_pb;
}
