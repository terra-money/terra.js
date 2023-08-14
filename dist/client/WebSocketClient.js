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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketClient = void 0;
var events_1 = require("events");
var ws_1 = __importDefault(require("ws"));
var hash_1 = require("../util/hash");
var escapeSingleQuotes = function (str) { return str.replace(/'/g, "\\'"); };
function makeQueryParams(query) {
    var queryBuilder = [];
    for (var _i = 0, _a = Object.keys(query); _i < _a.length; _i++) {
        var key = _a[_i];
        var queryItem = void 0;
        var value = query[key];
        // if value is scalar
        if (!Array.isArray(value)) {
            switch (typeof value) {
                case 'number':
                    queryItem = "".concat(key, "=").concat(value);
                    break;
                case 'string':
                    queryItem = "".concat(key, "='").concat(escapeSingleQuotes(value), "'");
                    break;
                default:
                    // Date
                    queryItem = "".concat(key, "=").concat(value.toISOString());
            }
        }
        else {
            switch (value[0]) {
                case '>':
                case '<':
                case '<=':
                case '>=':
                    if (typeof value[1] !== 'number') {
                        queryItem = "".concat(key).concat(value[0]).concat(value[1].toISOString());
                    }
                    else {
                        queryItem = "".concat(key).concat(value[0]).concat(value[1]);
                    }
                    break;
                case 'CONTAINS':
                    queryItem = "".concat(key, " CONTAINS '").concat(escapeSingleQuotes(value[1]), "'");
                    break;
                case 'EXISTS':
                    queryItem = "".concat(key, " EXISTS");
                    break;
            }
        }
        queryBuilder.push(queryItem);
    }
    return queryBuilder.join(' AND ');
}
/**
 * An object repesenting a connection to a Terra node's WebSocket RPC endpoint.
 * This allows for subscribing to Tendermint events through WebSocket.
 *
 * ### Events
 * **error** emitted when error raises
 * **connect** emitted after connection establishment
 * **reconnect** emitted upon every attempt of reconnection
 * **destroyed** emitted when socket has been destroyed
 *
 * ### Example
 *
 * ```ts
 * import { WebSocketClient } from '@terra-money/terra.js';
 *
 * const wsclient = new WebSocketClient("ws://localhost:26657/websocket");
 *
 * wsclient.subscribe('NewBlock', {}, (data) => {
 *    console.log(data.value);
 *
 *    // close after receiving one block.
 *    wsclient.destroy();
 * })
 *
 * wsclient.subscribe(
 * 'Tx',
 *  {
 *    'message.action': 'send',
 *    'message.sender': ['CONTAINS', 'terra1...'],
 *  },
 *  (data) => {
 *    console.log(data.value);
 *
 *   // close after receiving one send Tx
 *   wsclient.destroy();
 * });
 *
 * wsclient.start();
 * ```
 */
var WebSocketClient = /** @class */ (function (_super) {
    __extends(WebSocketClient, _super);
    /**
     * WebSocketClient constructor
     * @param URL The WebSocket endpoint URL on the Tendermint RPC server.
     *            Ex: ws://localhost:26657/websocket
     * @param reconnectCount 0 for not to attempt reconnect, -1 for infinite, > 0 for number of times to attempt
     * @param reconnectInterval retry interval in milliseconds
     */
    function WebSocketClient(URL, reconnectCount, reconnectInterval) {
        if (reconnectCount === void 0) { reconnectCount = 0; }
        if (reconnectInterval === void 0) { reconnectInterval = 1000; }
        var _this = _super.call(this) || this;
        _this.URL = URL;
        _this.reconnectCount = reconnectCount;
        _this.reconnectInterval = reconnectInterval;
        _this._reconnectCount = _this.reconnectCount;
        _this.isConnected = false;
        _this.shouldAttemptReconnect = !!_this.reconnectInterval;
        return _this;
    }
    /**
     * Destroys class as well as socket
     */
    WebSocketClient.prototype.destroy = function () {
        this.shouldAttemptReconnect = false;
        this.reconnectTimeoutId && clearTimeout(this.reconnectTimeoutId);
        this.socket && this.socket.close();
    };
    WebSocketClient.prototype.start = function () {
        this.socket = new ws_1.default(this.URL);
        this.socket.onopen = this.onOpen.bind(this);
        this.socket.onmessage = this.onMessage.bind(this);
        this.socket.onclose = this.onClose.bind(this);
        this.socket.onerror = function () { return undefined; };
    };
    WebSocketClient.prototype.onOpen = function () {
        this.isConnected = true;
        this.emit('connect');
        // reset reconnectCount after connection establishment
        this._reconnectCount = this.reconnectCount;
        this.socket.send(JSON.stringify({
            jsonrpc: '2.0',
            method: 'subscribe',
            params: [this.queryParams],
            id: 1,
        }));
    };
    WebSocketClient.prototype.onMessage = function (message) {
        try {
            var parsedData = JSON.parse(message.data.toString());
            if (this.callback &&
                parsedData.result &&
                parsedData.result.query === this.queryParams) {
                // this.emit('message', parsedData.result.data);
                this.callback(parsedData.result.data);
            }
        }
        catch (err) {
            this.emit('error', err);
        }
    };
    WebSocketClient.prototype.onClose = function () {
        var _this = this;
        this.isConnected = false;
        if (this.shouldAttemptReconnect &&
            (this._reconnectCount > 0 || this._reconnectCount === -1)) {
            if (this._reconnectCount !== -1) {
                this._reconnectCount--;
            }
            this.reconnectTimeoutId && clearTimeout(this.reconnectTimeoutId);
            this.reconnectTimeoutId = setTimeout(function () {
                _this.emit('reconnect');
                _this.start();
            }, this.reconnectInterval);
        }
        else {
            this.emit('destroyed');
        }
    };
    WebSocketClient.prototype.subscribe = function (event, query, callback) {
        this.queryParams = makeQueryParams(__assign({ 'tm.event': event }, query));
        this.callback = callback;
    };
    WebSocketClient.prototype.subscribeTx = function (query, callback) {
        var newCallback = function (d) {
            d.value.TxResult.txhash = (0, hash_1.hashToHex)(d.value.TxResult.tx);
            return callback(d);
        };
        this.subscribe('Tx', query, newCallback);
    };
    return WebSocketClient;
}(events_1.EventEmitter));
exports.WebSocketClient = WebSocketClient;
//# sourceMappingURL=WebSocketClient.js.map