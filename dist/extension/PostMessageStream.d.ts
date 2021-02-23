import { Duplex } from 'readable-stream';
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
    private _target;
    private _name;
    private _targetWindow;
    private _origin;
    private _init;
    private _haveSyn;
    constructor({ name, target, targetWindow }: Options);
    _destroy(): void;
    _onMessage(event: {
        source: Window;
        origin: string;
        data: Message;
    }): void;
    _read(): undefined;
    _write(data: any, _encoding: null | string, cb: (error?: Error | null) => void): void;
}
export {};
