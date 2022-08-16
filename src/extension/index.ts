import { CreateTxOptions } from '../client';
import PostMessageStream from './PostMessageStream';

export interface ExtensionOptions extends CreateTxOptions {
  waitForConfirmation?: boolean; // default false
  purgeQueue?: boolean; // default true
  sequence?: number;
  accountNumber?: number;
  isClassic?: boolean; // default false. set to true when you intract with terra Classic
}

interface ResponseData {
  name: string;
  payload: object;
}

type SendDataType = 'connect' | 'post' | 'sign' | 'info';

interface SendData {
  [key: string]: any;
}

interface SignBytesOption {
  bytes: Buffer;
  purgeQueue?: boolean; // default true
}

declare global {
  interface Window {
    // add you custom properties and methods
    isTerraExtensionAvailable: boolean;
  }
}

/**
 * Extension class is for communicating between page and extension
 */
export class Extension {
  private inpageStream!: PostMessageStream;

  constructor(identifier = 'station') {
    this.inpageStream = new PostMessageStream({
      name: `${identifier}:inpage`,
      target: `${identifier}:content`,
    });
  }

  destroy() {
    this.inpageStream && this.inpageStream.destroy();
  }

  private generateId(): number {
    return Date.now();
  }

  /**
   * Indicates the Station Extension is installed and availble (requires extension v1.1 or later)
   */
  get isAvailable(): boolean {
    return !!window.isTerraExtensionAvailable;
  }

  /**
   * low level function for sending message to extension.
   * Do not use this function unless you know what you are doing.
   */
  send(type: SendDataType, data?: SendData): number {
    const id = this.generateId();

    this.inpageStream.write({
      ...data,
      id,
      type,
    });

    return id;
  }

  /**
   * Listen to events from the Extension.
   * You will receive an event after calling connect, sign, or post.
   * payload structures are described on each function in @return section.
   *
   * @param name name of event (optional)
   * @param callback will be called when `name` or any event emits
   */
  on(name: string, callback: (payload: any) => void): void;
  on(callback: (payload: any) => void): void;
  on(...args: any[]): void {
    this.inpageStream.on('data', (data: ResponseData) => {
      if (typeof args[0] === 'string') {
        data.name === args[0] && args[1](data.payload, data.name);
      } else {
        args[0](data.payload, data.name);
      }
    });
  }

  /**
   * Listen to an event from the Extension once.
   * You will receive an event after calling each type of messages.
   * payload structures are described on each function in @return section.
   *
   * @param name name of event (optional)
   * @param callback will be called when `name` or any event emits
   */
  once(name: string, callback: (payload: any) => void): void;
  once(callback: (payload: any) => void): void;
  once(...args: any[]): void {
    this.inpageStream.once('data', (data: ResponseData) => {
      if (typeof args[0] === 'string') {
        data.name === args[0] && args[1](data.payload, data.name);
      } else {
        args[0](data.payload, data.name);
      }
    });
  }

  /**
   * Send a request
   *
   * @param {SendDataType} type
   * @param {SendData} data
   */
  async request(type: SendDataType, data?: SendData): Promise<ResponseData> {
    this.send(type, data);

    return new Promise(resolve => {
      this.inpageStream.once('data', resolve);
    });
  }

  /**
   * Request to Station Extension for connecting a wallet
   *
   * @return {string}     name      'onConnect'
   * @return {AccAddress} payload   Terra account address
   */
  connect(): number {
    return this.send('connect');
  }

  /**
   * Request for Station Extension information
   *
   * @return {object}  payload.network
   * @return {string}  payload.network.name    Name of the network
   * @return {string}  payload.network.chainId Chain ID
   * @return {string}  payload.network.lcd     LCD address
   * @return {string}  payload.network.fcd     FCD address
   * @return {string}  payload.network.ws      Websocket address
   */
  info(): number {
    return this.send('info');
  }

  /**
   * Request for signing tx
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
   */
  sign(options: ExtensionOptions): number {
    return this.send('sign', {
      ...options,
      msgs: options.msgs.map(msg => msg.toJSON(options.isClassic)),
      fee: options.fee?.toJSON(),
      memo: options.memo,
      gasPrices: options.gasPrices?.toString(),
      gasAdjustment: options.gasAdjustment?.toString(),
      account_number: options.accountNumber,
      sequence: options.sequence,
      waitForConfirmation: options.waitForConfirmation,
      purgeQueue: options.purgeQueue,
    });
  }

  /**
   * Request for signing bytes
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
   */
  signBytes(options: SignBytesOption): number {
    return this.send('sign', {
      bytes: options.bytes.toString('base64'),
      purgeQueue: options.purgeQueue,
    });
  }

  /**
   * Request for sign and post to LCD server
   *
   * @return {string}  name                   'onPost'
   * @return {object}  payload
   * @return {number}  payload.id             identifier
   * @return {string}  payload.origin         origin address
   * @return {Msg[]}   payload.msgs           requested msgs
   * @return {boolean} payload.success
   * @return {number|undefined} payload.result.code
   *                                          error code. undefined with successful tx
   * @return {string}  payload.result.raw_log raw log
   * @return {string}  payload.result.txhash  transaction hash
   */
  post(options: ExtensionOptions): number {
    return this.send('post', {
      msgs: options.msgs.map(msg => msg.toJSON(options.isClassic)),
      fee: options.fee?.toJSON(),
      memo: options.memo,
      gasPrices: options.gasPrices?.toString(),
      gasAdjustment: options.gasAdjustment?.toString(),
      account_number: options.accountNumber,
      sequence: options.sequence,
      waitForConfirmation: options.waitForConfirmation,
      purgeQueue: options.purgeQueue,
    });
  }
}
