import { Msg } from '../core/Msg';
import { LCDClientConfig } from '../client';

interface ResponseData {
  name: string;
  payload: object;
}

type SendDataType = 'connect' | 'post' | 'sign';

interface SignOptions {
  lcdClientConfig?: LCDClientConfig;
  account_number?: number;
  sequence?: number;
}

interface SendData {
  id: number | string;
  type: SendDataType;
  [key: string]: any;
}

// Singleton class for communicating between page and extension
export class Extension {
  static instance: Extension;
  private inpageStream: any;

  constructor() {
    if (Extension.instance) {
      return Extension.instance;
    }

    Extension.instance = this;

    const LocalMessageDuplexStream = require('post-message-stream');

    this.inpageStream = new LocalMessageDuplexStream({
      name: 'station:inpage',
      target: 'station:content',
    });
  }

  private generateId(): number {
    return Date.now();
  }

  // low level function for sending message to extension.
  // Do not use this function unless you know what you are doing.
  send(data: SendData): void {
    this.inpageStream.write(data);
  }

  on(name: string, callback: (payload: any) => void): void {
    this.inpageStream.on('data', (data: ResponseData) => {
      data.name === name && callback(data.payload);
    });
  }

  /**
   * Request to Station Extension for connecting a wallet
   *
   * @returns {string}     name      'onConnect'
   * @returns {AccAddress} payload   Terra account address
   */
  connect(): number {
    const id = this.generateId();

    this.send({
      id,
      type: 'connect',
    });

    return id;
  }

  /**
   * Request to Station Extension for signing tx
   *
   * @param msgs transaction messages to be signed
   * @param account_number account number (optional)
   * @param sequence sequence (optional)
   *
   * @return {string}  name               'onSign'
   * @return {object}  payload
   * @return {number}  payload.id         identifier
   * @return {string}  payload.origin     origin address
   * @return {Msg[]}   payload.msgs       requested msgs
   * @return {boolean} payload.success
   * @return {string}  payload.result.public_key Base64 encoded public key
   * @return {string}  payload.result.signature  Base64 encoded signature
   * @return {number}  payload.result.recid      Recovery id
   * @return {StdSignMsg.Data} payload.result.stdSignMsgData
   *
   * @example of broadcasting
   *
   * const { signature, public_key, recid, stdSignMsg } = payload.result;
   *
   * const sig = StdSignature.fromData({
   *   signature,
   *   pub_key: {
   *    type: 'tendermint/PubKeySecp256k1',
   *    value: public_key,
   *  },
   * });
   *
   * const stdSignMsg = StdSignMsg.fromData(payload.result.stdSignMsgData);
   * terra.tx.broadcast(new StdTx(stdSignMsg.msgs, stdSignMsg.fee, [sig], stdSignMsg.memo));
   */
  sign(msgs: Msg[], options?: SignOptions): number {
    const id = this.generateId();

    this.send({
      ...options,
      id,
      type: 'sign',
      msgs: msgs.map(msg => msg.toJSON()),
    });

    return id;
  }

  /**
   * Request to Station Extension for sign and post to LCD server
   *
   * @param msgs transaction messages to be signed
   * @param lcdClientConfig LCDClientConfig (optional)
   *
   * @return {string}  name                   'onPost'
   * @return {object}  payload
   * @return {number}  payload.id             identifier
   * @return {string}  payload.origin         origin address
   * @return {Msg[]}   payload.msgs           requested msgs
   * @return {LCDClientConfig} payload.lcdClientConfig
   *                                          requested lcdClientConfig
   * @return {boolean} payload.success
   * @return {number|undefined} payload.result.code
   *                                          error code. undefined with successful tx
   * @return {string}  payload.result.raw_log raw log
   * @return {string}  payload.result.txhash  transaction hash
   */
  post(msgs: Msg[], lcdClientConfig?: LCDClientConfig): number {
    const id = this.generateId();

    this.send({
      id,
      type: 'post',
      msgs: msgs.map(msg => msg.toJSON()),
      lcdClientConfig,
    });

    return id;
  }
}
