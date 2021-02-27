"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var readable_stream_1 = require("readable-stream");
var noop = function () {
    return undefined;
};
var PostMessageStream = /** @class */ (function (_super) {
    __extends(PostMessageStream, _super);
    function PostMessageStream(_a) {
        var name = _a.name, target = _a.target, targetWindow = _a.targetWindow;
        var _this = _super.call(this, { objectMode: true }) || this;
        _this._name = name;
        _this._target = target;
        _this._targetWindow = targetWindow || window;
        _this._origin = targetWindow ? '*' : location.origin;
        // initialization flags
        _this._init = false;
        _this._haveSyn = false;
        _this._onMessage = _this._onMessage.bind(_this);
        window.addEventListener('message', _this._onMessage, false);
        // send syncorization message
        _this._write('SYN', null, noop);
        _this.cork();
        return _this;
    }
    PostMessageStream.prototype._destroy = function () {
        // console.log('PostMessageStream: destroy');
        window.removeEventListener('message', this._onMessage, false);
    };
    PostMessageStream.prototype._onMessage = function (event) {
        var msg = event.data;
        // validate message
        if (this._origin !== '*' && event.origin !== this._origin)
            return;
        if (event.source !== this._targetWindow)
            return;
        if (typeof msg !== 'object')
            return;
        if (msg.target !== this._name)
            return;
        if (!msg.data)
            return;
        if (!this._init) {
            if (msg.data === 'SYN') {
                this._haveSyn = true;
                this._write('ACK', null, noop);
            }
            else if (msg.data === 'ACK') {
                this._init = true;
                if (!this._haveSyn) {
                    this._write('ACK', null, noop);
                }
                this.uncork();
            }
        }
        else {
            // forward message
            try {
                this.push(msg.data);
            }
            catch (err) {
                this.emit('error', err);
            }
        }
    };
    PostMessageStream.prototype._read = function () {
        return undefined;
    };
    PostMessageStream.prototype._write = function (data, _encoding, cb) {
        var message = {
            target: this._target,
            data: data,
        };
        this._targetWindow.postMessage(message, this._origin);
        cb(null);
    };
    return PostMessageStream;
}(readable_stream_1.Duplex));
exports.default = PostMessageStream;
//# sourceMappingURL=PostMessageStream.js.map