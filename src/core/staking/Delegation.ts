import { JSONSerializable } from '../../util/json';
import { Dec } from '../numeric';
import { AccAddress, ValAddress } from '../bech32';
import { Coin } from '../Coin';
import {
  DelegationResponse as DelegationResponse_pb,
  Delegation as Delegation_pb,
} from '@terra-money/terra.proto/src/cosmos/staking/v1beta1/staking_pb';

/**
 * Stores information about the status of a delegation between a delegator and validator, fetched from the blockchain.
 */
export class Delegation extends JSONSerializable<Delegation.Data> {
  /**
   * @param delegator_address 	delegator's account address
   * @param validator_address 	validator's operator address
   * @param shares 	delegator's shares
   * @param balance balance of the delegation
   */
  constructor(
    public delegator_address: AccAddress,
    public validator_address: ValAddress,
    public shares: Dec,
    public balance: Coin
  ) {
    super();
  }

  public static fromData(data: Delegation.Data): Delegation {
    const {
      delegation: { delegator_address, validator_address, shares },
      balance,
    } = data;
    return new Delegation(
      delegator_address,
      validator_address,
      new Dec(shares),
      Coin.fromData(balance)
    );
  }

  public toData(): Delegation.Data {
    const { delegator_address, validator_address, shares, balance } = this;

    return {
      delegation: {
        delegator_address,
        validator_address,
        shares: shares.toString(),
      },
      balance: balance.toData(),
    };
  }

  public static fromProto(proto: Delegation.Proto): Delegation {
    const delegationProto = proto.getDelegation() as Delegation_pb;
    return new Delegation(
      delegationProto.getDelegatorAddress(),
      delegationProto.getValidatorAddress(),
      new Dec(delegationProto.getShares()),
      Coin.fromProto(proto.getBalance() as Coin.Proto)
    );
  }

  public toProto(): Delegation.Proto {
    const { delegator_address, validator_address, shares, balance } = this;
    const delegationProto = new Delegation_pb();
    delegationProto.setDelegatorAddress(delegator_address);
    delegationProto.setValidatorAddress(validator_address);
    delegationProto.setShares(shares.toString());

    const delegationResponseProto = new DelegationResponse_pb();
    delegationResponseProto.setDelegation(delegationProto);
    delegationResponseProto.setBalance(balance.toProto());
    return delegationResponseProto;
  }
}

export namespace Delegation {
  export interface Data {
    delegation: {
      delegator_address: AccAddress;
      validator_address: ValAddress;
      shares: string;
    };
    balance: Coin.Data;
  }

  export type Proto = DelegationResponse_pb;
}
