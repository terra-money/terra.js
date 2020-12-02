import { Duplex } from 'readable-stream';

const noop = () => {
  return undefined;
};

interface Options {
  name: string;
  target: string;
  targetWindow?: Window;
}

interface Message {
  target: string;
  data: any;
}

export default class PostMessageStream extends Duplex {
  private _target: string;
  private _name: string;
  private _targetWindow: Window;
  private _origin: string;
  private _init: boolean;
  private _haveSyn: boolean;

  constructor({ name, target, targetWindow }: Options) {
    super({ objectMode: true });

    this._name = name;
    this._target = target;
    this._targetWindow = targetWindow || window;
    this._origin = targetWindow ? '*' : location.origin;

    // initialization flags
    this._init = false;
    this._haveSyn = false;
    this._onMessage = this._onMessage.bind(this);

    window.addEventListener('message', this._onMessage as any, false);
    // send syncorization message
    this._write('SYN', null, noop);
    this.cork();
  }

  _destroy() {
    // console.log('PostMessageStream: destroy');
    window.removeEventListener('message', this._onMessage as any, false);
  }

  _onMessage(event: { source: Window; origin: string; data: Message }) {
    const msg = event.data as Message;

    // validate message
    if (this._origin !== '*' && event.origin !== this._origin) return;
    if (event.source !== this._targetWindow) return;
    if (typeof msg !== 'object') return;
    if (msg.target !== this._name) return;
    if (!msg.data) return;

    if (!this._init) {
      if (msg.data === 'SYN') {
        this._haveSyn = true;
        this._write('ACK', null, noop);
      } else if (msg.data === 'ACK') {
        this._init = true;
        if (!this._haveSyn) {
          this._write('ACK', null, noop);
        }
        this.uncork();
      }
    } else {
      // forward message
      try {
        this.push(msg.data);
      } catch (err) {
        this.emit('error', err);
      }
    }
  }

  _read() {
    return undefined;
  }

  _write(
    data: any,
    _encoding: null | string,
    cb: (error?: Error | null) => void
  ) {
    const message = {
      target: this._target,
      data: data,
    };
    this._targetWindow.postMessage(message, this._origin);
    cb(null);
  }
}
