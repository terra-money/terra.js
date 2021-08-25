import { StdSignature } from './StdSignature';
import { JSONSerializable } from '../util/json';
import { StdFee } from './StdFee';
import { Msg } from './Msg';
import { TxBody, AuthInfo } from './ProtoTx';

/**
 * The StdTx data structure contains the signatures from [[StdSignMsg]] with the same
 * information, and can be broadcasted to the node to be included in a block.
 */
export class StdTx extends JSONSerializable<StdTx.Data> {
  /**
   * @param msg list of messages to include (not a typo)
   * @param fee transaction fee
   * @param signatures list of signatures
   * @param memo optional note
   */
  constructor(
    public msg: Msg[],
    public fee: StdFee,
    public signatures: StdSignature[],
    public memo: string = ''
  ) {
    super();
  }

  public static fromData(data: StdTx.Data): StdTx {
    const {
      value: { msg, fee, signatures, memo },
    } = data;
    return new StdTx(
      msg.map(m => Msg.fromData(m)),
      StdFee.fromData(fee),
      signatures.map(s => StdSignature.fromData(s)),
      memo
    );
  }

  public toData(): StdTx.Data {
    const { msg, fee, signatures, memo } = this;
    return {
      type: 'core/StdTx',
      value: {
        msg: msg.map(m => m.toData()),
        fee: fee.toData(),
        signatures: signatures.map(s => s.toData()),
        memo,
      },
    };
  }

  public static fromProto(proto: StdTx.Proto): StdTx {
    const {
      body: { messages, memo },
      auth_info: { fee, signer_infos },
      signatures,
    } = proto;
    return new StdTx(
      messages.map(m => Msg.fromProto(m)),
      StdFee.fromData({
        gas: fee.gas_limit,
        amount: fee.amount,
      }),
      signatures.map((sig, i) =>
        StdSignature.fromProto({
          pub_key: signer_infos[i].public_key,
          signature: sig,
        })
      ),
      memo
    );
  }
}

export namespace StdTx {
  export interface Data {
    type: 'core/StdTx';
    value: {
      msg: Msg.Data[];
      fee: StdFee.Data;
      signatures: StdSignature.Data[];
      memo: string;
    };
  }

  export interface Proto {
    body: TxBody.Proto;
    auth_info: AuthInfo.Proto;
    signatures: string[];
  }
}
