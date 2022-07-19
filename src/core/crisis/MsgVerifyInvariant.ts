import { JSONSerializable } from '../../util/json';
import { Any } from '@terra-money/legacy.proto/google/protobuf/any';
//import { MsgVerifyInvariant as MsgVerifyInvariant_pb } from '@terra-money/legacy.proto/cosmos/crisis/v1beta1/tx';
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

  public static fromAmino(
    data: MsgVerifyInvariant.Amino,
    _?: boolean
  ): MsgVerifyInvariant {
    _;
    const {
      value: { sender, invariantModuleName, invariantRoute },
    } = data;
    return new MsgVerifyInvariant(sender, invariantModuleName, invariantRoute);
  }

  public toAmino(_?: boolean): MsgVerifyInvariant.Amino {
    _;
    throw new Error('MsgVerifyInvarant is not allowed to send');
  }

  public static fromData(
    data: MsgVerifyInvariant.Data,
    _?: boolean
  ): MsgVerifyInvariant {
    _;
    const { sender, invariantModuleName, invariantRoute } = data;
    return new MsgVerifyInvariant(sender, invariantModuleName, invariantRoute);
  }

  public toData(_?: boolean): MsgVerifyInvariant.Data {
    _;
    const { sender, invariantModuleName, invariantRoute } = this;
    return {
      '@type': '/cosmos.crisis.v1beta1.MsgVerifyInvariant',
      sender,
      invariantModuleName,
      invariantRoute,
    };
  }

  public static fromProto(
    proto: MsgVerifyInvariant.Proto,
    _?: boolean
  ): MsgVerifyInvariant {
    _;
    return new MsgVerifyInvariant(
      proto.sender,
      proto.invariantModuleName,
      proto.invariantRoute
    );
  }

  public toProto(_?: boolean): MsgVerifyInvariant.Proto {
    _;
    throw new Error('MsgVerifyInvarant is not allowed to send');
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.crisis.v1beta1.MsgVerifyInvariant',
      value: MsgVerifyInvariant_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgVerifyInvariant {
    return MsgVerifyInvariant.fromProto(
      MsgVerifyInvariant_pb.decode(msgAny.value),
      isClassic
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
