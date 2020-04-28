import { JSONSerializable } from '../../../util/json';
import { Coin } from '../../Coin';
import { Int } from '../../numeric';
import { AccAddress, ValAddress, ValConsPubKey } from '../../strings';
import { Validator } from '../Validator';

/**
 * For new validators, this message registers a validator address to be a delegate on
 * the blockchain.
 */
export class MsgCreateValidator extends JSONSerializable<
  MsgCreateValidator.Data
> {
  /**
   *
   * @param description validator's delegate information
   * @param commission validator's commission policy
   * @param min_self_delegation minimum self delegation
   * @param delegator_address validator's account address
   * @param validator_address validator's operator address
   * @param pubkey validator's consensus public key
   * @param value amount to use for self-delegation
   */
  constructor(
    public description: Validator.Description,
    public commission: Validator.CommissionRates,
    public min_self_delegation: Int,
    public delegator_address: AccAddress,
    public validator_address: ValAddress,
    public pubkey: ValConsPubKey,
    public value: Coin
  ) {
    super();
  }

  public static fromData(data: MsgCreateValidator.Data): MsgCreateValidator {
    const {
      value: {
        description,
        commission,
        min_self_delegation,
        delegator_address,
        validator_address,
        pubkey,
        value,
      },
    } = data;
    return new MsgCreateValidator(
      description,
      Validator.CommissionRates.fromData(commission),
      new Int(min_self_delegation),
      delegator_address,
      validator_address,
      pubkey,
      Coin.fromData(value)
    );
  }

  public toData(): MsgCreateValidator.Data {
    const {
      description,
      commission,
      min_self_delegation,
      delegator_address,
      validator_address,
      pubkey,
      value,
    } = this;
    return {
      type: 'staking/MsgCreateValidator',
      value: {
        description,
        commission: commission.toData(),
        min_self_delegation: min_self_delegation.toString(),
        delegator_address,
        validator_address,
        pubkey,
        value: value.toData(),
      },
    };
  }
}

export namespace MsgCreateValidator {
  export interface Data {
    type: 'staking/MsgCreateValidator';
    value: {
      description: Validator.Description;
      commission: Validator.CommissionRates.Data;
      min_self_delegation: string;
      delegator_address: AccAddress;
      validator_address: ValAddress;
      pubkey: ValConsPubKey;
      value: Coin.Data;
    };
  }
}
