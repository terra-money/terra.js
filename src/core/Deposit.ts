import { Coins } from './Coins';
import { JSONSerializable } from '../util/json';
import { AccAddress } from './bech32';
import { Deposit as Deposit_pb } from '@terra-money/terra.proto/cosmos/gov/v1beta1/gov';
import * as Long from 'long';

/**
 * Stores deposit information for a proposal
 */
export class Deposit extends JSONSerializable<
  Deposit.Amino,
  Deposit.Data,
  Deposit.Proto
> {
  public amount: Coins;
  /**
   * @param proposal_id Id of porposal to deposit to
   * @param depositor depositor's account address
   * @param amount amount to deposit
   */
  constructor(
    public proposal_id: number,
    public depositor: AccAddress,
    amount: Coins.Input
  ) {
    super();
    this.amount = new Coins(amount);
  }

  public static fromAmino(data: Deposit.Amino): Deposit {
    const { proposal_id, depositor, amount } = data;
    return new Deposit(
      Number.parseInt(proposal_id),
      depositor,
      Coins.fromAmino(amount)
    );
  }

  public toAmino(): Deposit.Amino {
    const { proposal_id, depositor, amount } = this;
    return {
      proposal_id: proposal_id.toString(),
      depositor,
      amount: amount.toAmino(),
    };
  }

  public static fromData(data: Deposit.Data): Deposit {
    const { proposal_id, depositor, amount } = data;
    return new Deposit(
      Number.parseInt(proposal_id),
      depositor,
      Coins.fromData(amount)
    );
  }

  public toData(): Deposit.Data {
    const { proposal_id, depositor, amount } = this;
    return {
      proposal_id: proposal_id.toString(),
      depositor,
      amount: amount.toData(),
    };
  }

  public static fromProto(data: Deposit.Proto): Deposit {
    return new Deposit(
      data.proposalId.toNumber(),
      data.depositor,
      Coins.fromProto(data.amount)
    );
  }

  public toProto(): Deposit.Proto {
    const { proposal_id, depositor, amount } = this;
    return Deposit_pb.fromPartial({
      proposalId: Long.fromNumber(proposal_id),
      depositor: depositor,
      amount: amount.toProto(),
    });
  }
}

export namespace Deposit {
  export interface Amino {
    proposal_id: string;
    depositor: AccAddress;
    amount: Coins.Amino;
  }

  export interface Data {
    proposal_id: string;
    depositor: AccAddress;
    amount: Coins.Data;
  }

  export type Proto = Deposit_pb;
}
