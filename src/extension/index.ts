import { Msg } from '../core/Msg';
import { LCDClientConfig } from '../client';

interface ResponseData {
  name: string;
  payload: object;
}

type SendDataType = 'connect' | 'post';

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

  connect(): number {
    const id = Date.now();

    this.send({
      id,
      type: 'connect',
    });

    return id;
  }

  post(msgs: Msg[], lcdClientConfig?: LCDClientConfig): number {
    const id = Date.now();

    this.send({
      id,
      type: 'post',
      msgs: msgs.map(msg => msg.toJSON()),
      lcdClientConfig,
    });

    return id;
  }
}
