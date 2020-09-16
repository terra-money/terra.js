import { Msg } from '../core/Msg';
import { LCDClientConfig } from '../client';

interface ResponseData {
  name: string;
  payload: object;
}

type SendDataType = 'connect' | 'post' | 'sign';

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
   * @returns {string}     name    'onConnect'
   * @returns {AccAddress} payload Terra account address
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
   * @return {string} name               'onSign'
   * @return {string} payload.public_key Hex encoded public key
   * @return {string} payload.signature  Base64 encoded signature
   * @return {number} payload.recid      Recovery id
   */
  sign(msgs: Msg[]): number {
    const id = this.generateId();

    this.send({
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
   * @return {string} name            'onPost'
   * @return {number} payload.code    Error code. null or undefined with successful tx
   * @return {string} payload.raw_log Raw log
   * @return {string} payload.txhash  Transaction hash
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
