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
export declare class Header extends JSONSerializable<any, Header.Data, Header.Proto> {
    signedHeader?: SignedHeader | undefined;
    validatorSet?: ValidatorSet | undefined;
    trustedHeight?: Height | undefined;
    trustedValidators?: ValidatorSet | undefined;
    /**
     * @param signedHeader
     * @param validatorSet
     * @param trustedHeight
     * @param trustedValidators
     */
    constructor(signedHeader?: SignedHeader | undefined, validatorSet?: ValidatorSet | undefined, trustedHeight?: Height | undefined, trustedValidators?: ValidatorSet | undefined);
    static fromAmino(_: any): Header;
    toAmino(): any;
    static fromData(data: Header.Data): Header;
    toData(): Header.Data;
    static fromProto(proto: Header.Proto): Header;
    toProto(): Header.Proto;
    packAny(): Any;
    static unpackAny(msgAny: Any): Header;
}
export declare namespace Header {
    interface Data {
        signed_header?: SignedHeader.Data;
        validator_set?: ValidatorSet.Data;
        trusted_height?: Height.Data;
        trusted_validators?: ValidatorSet.Data;
    }
    type Proto = Header_pb;
}
