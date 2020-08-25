const LocalMessageDuplexStream = require('post-message-stream');

interface Data {
  name: string;
  payload: object;
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

    this.inpageStream = new LocalMessageDuplexStream({
      name: 'station:inpage',
      target: 'station:content',
    });
  }

  send(data: object): void {
    this.inpageStream.write(data);
  }

  on(name: string, callback: (payload: any) => void): void {
    this.inpageStream.on('data', (data: Data) => {
      data.name === name && callback(data.payload);
    });
  }
}
