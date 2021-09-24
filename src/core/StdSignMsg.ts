import { StdFee } from './StdFee';
import { Msg } from './Msg';
import { JSONSerializable } from '../util/json';
import { StdTx } from './StdTx';

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
    public memo: string = '',
    public timeout_height: number = 0
  ) {
    super();
  }

  public toData(): StdSignMsg.Data {
    const {
      chain_id,
      account_number,
      sequence,
      fee,
      msgs,
      memo,
      timeout_height,
    } = this;
    return {
      chain_id,
      account_number: account_number.toString(),
      sequence: sequence.toString(),
      fee: fee.toData(),
      msgs: msgs.map(m => m.toData()),
      memo,
      timeout_height:
        timeout_height !== 0 ? timeout_height.toFixed() : undefined,
    };
  }

  public static fromData(data: StdSignMsg.Data): StdSignMsg {
    const {
      chain_id,
      account_number,
      sequence,
      fee,
      msgs,
      memo,
      timeout_height,
    } = data;
    return new StdSignMsg(
      chain_id,
      Number.parseInt(account_number) || 0,
      Number.parseInt(sequence) || 0,
      StdFee.fromData(fee),
      msgs.map(m => Msg.fromData(m)),
      memo,
      Number.parseInt(timeout_height ?? '0')
    );
  }

  /**
   * You get the [[StdTx]] value from a `StdSignMsg` (without the signature).
   */
  public toStdTx(): StdTx {
    const { fee, msgs, memo, timeout_height } = this;
    return new StdTx(msgs, fee, [], memo, timeout_height);
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
    timeout_height?: string;
  }
}
