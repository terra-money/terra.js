import { StdFee } from './StdFee';
import { Msg } from './Msg';
import { JSONSerializable } from '../util/json';
import { Tx as Tx_pb } from '@terra-money/terra.proto/cosmos/tx/v1beta1/tx';
import * as Long from 'long';

/**
 * A sign message is a data structure that is used to create a [[StdSignature]] to be later
 * appended to the list of signatures in an [[StdTx]]. Essentially, it contains all the
 * information needed to sign and build a transaction, and can be described as an
 * "unsigned transaction."
 */
export class StdSignMsg extends JSONSerializable<StdSignMsg.Data> {
  /**
   *
   * @param chain_id ID of blockchain to submit transaction to
   * @param account_number account number on blockchain
   * @param sequence Sequence number (nonce), number of signed previous transactions by
   *    account included on the blockchain at time of broadcast.
   * @param fee transaction fee
   * @param msgs list of messages to include
   * @param memo optional note
   */
  constructor(
    public chain_id: string,
    public account_number: number,
    public sequence: number,
    public fee: StdFee,
    public msgs: Msg[],
    public memo: string = ''
  ) {
    super();
  }

  public toData(): StdSignMsg.Data {
    const { chain_id, account_number, sequence, fee, msgs, memo } = this;
    return {
      chain_id,
      account_number: account_number.toString(),
      sequence: sequence.toString(),
      fee: fee.toData(),
      msgs: msgs.map(m => {
        if ('toData' in m) {
          return m.toData();
        }

        throw new Error(
          `amino is not supported for "${m.packAny().typeUrl}" Msg`
        );
      }),
      memo,
    };
  }

  public static fromData(data: StdSignMsg.Data): StdSignMsg {
    const { chain_id, account_number, sequence, fee, msgs, memo } = data;
    return new StdSignMsg(
      chain_id,
      Number.parseInt(account_number) || 0,
      Number.parseInt(sequence) || 0,
      StdFee.fromData(fee),
      msgs.map(m => Msg.fromData(m)),
      memo
    );
  }

  public toTxProto(): Tx_pb {
    return Tx_pb.fromPartial({
      body: {
        memo: this.memo,
        messages: this.msgs.map(m => m.packAny()),
      },
      authInfo: {
        signerInfos: [],
        fee: {
          amount: this.fee.amount.toProto(),
          gasLimit: Long.fromNumber(this.fee.gas),
          granter: '',
          payer: '',
        },
      },
    });
  }
}

export namespace StdSignMsg {
  export interface Data {
    chain_id: string;
    account_number: string;
    sequence: string;
    fee: StdFee.Data;
    msgs: Msg.Data[];
    memo: string;
  }
}
