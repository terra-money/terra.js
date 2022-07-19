import { JSONSerializable } from '../../../util/json';
import { Dec, Int } from '../../numeric';
import { ValAddress } from '../../bech32';
import { Validator } from '../Validator';
// import { Any } from '@terra-money/legacy.proto/google/protobuf/any';
// import { MsgEditValidator as MsgEditValidator_pb } from '@terra-money/legacy.proto/cosmos/staking/v1beta1/tx';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgEditValidator as MsgEditValidator_pb } from '@terra-money/terra.proto/cosmos/staking/v1beta1/tx';

/**
 * A validator can edit its delegate information, such as moniker, website, commission
 * rate, etc.
 *
 * You must use special or sentinel values to inform that you want to leave the current
 * field untouched. For `Description`,` you should start with [[MsgEditValidator.DESC_DO_NOT_MODIFY]] and
 * change each field you wish to modify individually.
 */
export class MsgEditValidator extends JSONSerializable<
  MsgEditValidator.Amino,
  MsgEditValidator.Data,
  MsgEditValidator.Proto
> {
  /**
   * @param Description new description to apply
   * @param address new address to apply
   * @param commission_rate new commission rates to apply
   * @param min_self_delegation new min self delegation
   */
  constructor(
    public description: Validator.Description,
    public validator_address: ValAddress,
    public commission_rate?: Dec,
    public min_self_delegation?: Int
  ) {
    super();
  }

  public static fromAmino(
    data: MsgEditValidator.Amino,
    _?: boolean
  ): MsgEditValidator {
    _;
    const {
      value: {
        description,
        validator_address,
        commission_rate,
        min_self_delegation,
      },
    } = data;
    return new MsgEditValidator(
      Validator.Description.fromAmino(description),
      validator_address,
      commission_rate ? new Dec(commission_rate) : undefined,
      min_self_delegation ? new Int(min_self_delegation) : undefined
    );
  }

  public toAmino(isClassic?: boolean): MsgEditValidator.Amino {
    const {
      description,
      validator_address,
      commission_rate,
      min_self_delegation,
    } = this;
    return {
      type: isClassic
        ? 'staking/MsgEditValidator'
        : 'cosmos-sdk/MsgEditValidator',
      value: {
        description,
        validator_address,
        commission_rate: commission_rate
          ? commission_rate.toString()
          : undefined,
        min_self_delegation: min_self_delegation
          ? min_self_delegation.toString()
          : undefined,
      },
    };
  }

  public static fromProto(
    data: MsgEditValidator.Proto,
    _?: boolean
  ): MsgEditValidator {
    _;
    return new MsgEditValidator(
      Validator.Description.fromProto(
        data.description as Validator.Description.Proto
      ),
      data.validatorAddress,
      data.commissionRate !== '' ? new Dec(data.commissionRate) : undefined,
      data.minSelfDelegation !== ''
        ? new Int(data.minSelfDelegation)
        : undefined
    );
  }

  public toProto(_?: boolean): MsgEditValidator.Proto {
    _;
    const {
      description,
      validator_address,
      commission_rate,
      min_self_delegation,
    } = this;
    return MsgEditValidator_pb.fromPartial({
      description: description.toProto(),
      commissionRate: commission_rate?.toString() || '',
      minSelfDelegation: min_self_delegation?.toString() || '',
      validatorAddress: validator_address,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.staking.v1beta1.MsgEditValidator',
      value: MsgEditValidator_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgEditValidator {
    return MsgEditValidator.fromProto(
      MsgEditValidator_pb.decode(msgAny.value),
      isClassic
    );
  }

  public static fromData(
    data: MsgEditValidator.Data,
    _?: boolean
  ): MsgEditValidator {
    _;
    const {
      description,
      validator_address,
      commission_rate,
      min_self_delegation,
    } = data;
    return new MsgEditValidator(
      Validator.Description.fromData(description),
      validator_address,
      commission_rate ? new Dec(commission_rate) : undefined,
      min_self_delegation ? new Int(min_self_delegation) : undefined
    );
  }

  public toData(_?: boolean): MsgEditValidator.Data {
    _;
    const {
      description,
      validator_address,
      commission_rate,
      min_self_delegation,
    } = this;
    return {
      '@type': '/cosmos.staking.v1beta1.MsgEditValidator',
      description,
      validator_address,
      commission_rate: commission_rate ? commission_rate.toString() : undefined,
      min_self_delegation: min_self_delegation
        ? min_self_delegation.toString()
        : undefined,
    };
  }
}

export namespace MsgEditValidator {
  export const DESC_DO_NOT_MODIFY: Validator.Description.Amino = {
    moniker: '[do-not-modify]',
    website: '[do-not-modify]',
    identity: '[do-not-modify]',
    details: '[do-not-modify]',
    security_contact: '[do-not-modify]',
  };

  export interface Amino {
    type: 'staking/MsgEditValidator' | 'cosmos-sdk/MsgEditValidator';
    value: {
      description: Validator.Description.Amino;
      validator_address: ValAddress;
      commission_rate?: string;
      min_self_delegation?: string;
    };
  }

  export interface Data {
    '@type': '/cosmos.staking.v1beta1.MsgEditValidator';
    description: Validator.Description.Data;
    validator_address: ValAddress;
    commission_rate?: string;
    min_self_delegation?: string;
  }

  export type Proto = MsgEditValidator_pb;
}
