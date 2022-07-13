import { JSONSerializable } from '../../../../util/json';
import { Header as Header_pb } from '@terra-money/terra.proto/ibc/lightclients/tendermint/v1/tendermint';
import { Height } from '../../core/client/Height';
import { SignedHeader, ValidatorSet } from '../../msgs/client/tendermint/types';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';

/**
 * Header defines the Tendermint client consensus Header.
 * It encapsulates all the information necessary to update from a trusted
 * Tendermint ConsensusState. The inclusion of TrustedHeight and
 * TrustedValidators allows this update to process correctly, so long as the
 * ConsensusState for the TrustedHeight exists, this removes race conditions
 * among relayers The SignedHeader and ValidatorSet are the new untrusted update
 * fields for the client. The TrustedHeight is the height of a stored
 * ConsensusState on the client that will be used to verify the new untrusted
 * header. The Trusted ConsensusState must be within the unbonding period of
 * current time in order to correctly verify, and the TrustedValidators must
 * hash to TrustedConsensusState.NextValidatorsHash since that is the last
 * trusted validator set at the TrustedHeight.
 */
export class Header extends JSONSerializable<any, Header.Data, Header.Proto> {
  /**
   * @param signedHeader
   * @param validatorSet
   * @param trustedHeight
   * @param trustedValidators
   */
  constructor(
    public signedHeader?: SignedHeader,
    public validatorSet?: ValidatorSet,
    public trustedHeight?: Height,
    public trustedValidators?: ValidatorSet
  ) {
    super();
  }

  public static fromAmino(_: any): Header {
    _;
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(data: Header.Data): Header {
    const {
      signed_header: signedHeader,
      validator_set: validatorSet,
      trusted_height: trustedHeight,
      trusted_validators: trustedValidators,
    } = data;
    return new Header(
      signedHeader ? SignedHeader.fromData(signedHeader) : undefined,
      validatorSet ? ValidatorSet.fromData(validatorSet) : undefined,
      trustedHeight ? Height.fromData(trustedHeight) : undefined,
      trustedValidators ? ValidatorSet.fromData(trustedValidators) : undefined
    );
  }

  public toData(): Header.Data {
    const { signedHeader, validatorSet, trustedHeight, trustedValidators } =
      this;
    return {
      signed_header: signedHeader?.toData() || undefined,
      validator_set: validatorSet?.toData() || undefined,
      trusted_height: trustedHeight?.toData() || undefined,
      trusted_validators: trustedValidators?.toData() || undefined,
    };
  }

  public static fromProto(proto: Header.Proto): Header {
    const { signedHeader, validatorSet, trustedHeight, trustedValidators } =
      proto;
    return new Header(
      signedHeader ? SignedHeader.fromProto(signedHeader) : undefined,
      validatorSet ? ValidatorSet.fromProto(validatorSet) : undefined,
      trustedHeight ? Height.fromProto(trustedHeight) : undefined,
      trustedValidators ? ValidatorSet.fromProto(trustedValidators) : undefined
    );
  }

  public toProto(): Header.Proto {
    const { signedHeader, validatorSet, trustedHeight, trustedValidators } =
      this;
    return Header_pb.fromPartial({
      signedHeader: signedHeader?.toProto() || undefined,
      validatorSet: validatorSet?.toProto() || undefined,
      trustedHeight: trustedHeight?.toProto() || undefined,
      trustedValidators: trustedValidators?.toProto() || undefined,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: 'ibc.lightclients.tendermint.v1.Header',
      value: Header_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): Header {
    return Header.fromProto(Header_pb.decode(msgAny.value));
  }
}

export namespace Header {
  export interface Data {
    signed_header?: SignedHeader.Data;
    validator_set?: ValidatorSet.Data;
    trusted_height?: Height.Data;
    trusted_validators?: ValidatorSet.Data;
  }

  export type Proto = Header_pb;
}
