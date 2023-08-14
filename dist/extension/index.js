"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Extension = void 0;
var PostMessageStream_1 = __importDefault(require("./PostMessageStream"));
/**
 * Extension class is for communicating between page and extension
 */
var Extension = /** @class */ (function () {
    function Extension(identifier) {
        if (identifier === void 0) { identifier = 'station'; }
        this.inpageStream = new PostMessageStream_1.default({
            name: "".concat(identifier, ":inpage"),
            target: "".concat(identifier, ":content"),
        });
    }
    Extension.prototype.destroy = function () {
        this.inpageStream && this.inpageStream.destroy();
    };
    Extension.prototype.generateId = function () {
        return Date.now();
    };
    Object.defineProperty(Extension.prototype, "isAvailable", {
        /**
         * Indicates the Station Extension is installed and availble (requires extension v1.1 or later)
         */
        get: function () {
            return !!window.isTerraExtensionAvailable;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * low level function for sending message to extension.
     * Do not use this function unless you know what you are doing.
     */
    Extension.prototype.send = function (type, data) {
        var id = this.generateId();
        this.inpageStream.write(__assign(__assign({}, data), { id: id, type: type }));
        return id;
    };
    Extension.prototype.on = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.inpageStream.on('data', function (data) {
            if (typeof args[0] === 'string') {
                data.name === args[0] && args[1](data.payload, data.name);
            }
            else {
                args[0](data.payload, data.name);
            }
        });
    };
    Extension.prototype.once = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.inpageStream.once('data', function (data) {
            if (typeof args[0] === 'string') {
                data.name === args[0] && args[1](data.payload, data.name);
            }
            else {
                args[0](data.payload, data.name);
            }
        });
    };
    /**
     * Send a request
     *
     * @param {SendDataType} type
     * @param {SendData} data
     */
    Extension.prototype.request = function (type, data) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.send(type, data);
                return [2 /*return*/, new Promise(function (resolve) {
                        _this.inpageStream.once('data', resolve);
                    })];
            });
        });
    };
    /**
     * Request to Station Extension for connecting a wallet
     *
     * @return {string}     name      'onConnect'
     * @return {AccAddress} payload   Terra account address
     */
    Extension.prototype.connect = function () {
        return this.send('connect');
    };
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
    Extension.prototype.info = function () {
        return this.send('info');
    };
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
    Extension.prototype.sign = function (options) {
        var _a, _b, _c;
        return this.send('sign', __assign(__assign({}, options), { msgs: options.msgs.map(function (msg) { return msg.toJSON(options.isClassic); }), fee: (_a = options.fee) === null || _a === void 0 ? void 0 : _a.toJSON(), memo: options.memo, gasPrices: (_b = options.gasPrices) === null || _b === void 0 ? void 0 : _b.toString(), gasAdjustment: (_c = options.gasAdjustment) === null || _c === void 0 ? void 0 : _c.toString(), account_number: options.accountNumber, sequence: options.sequence, waitForConfirmation: options.waitForConfirmation, purgeQueue: options.purgeQueue }));
    };
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
    Extension.prototype.signBytes = function (options) {
        return this.send('sign', {
            bytes: options.bytes.toString('base64'),
            purgeQueue: options.purgeQueue,
        });
    };
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
    Extension.prototype.post = function (options) {
        var _a, _b, _c;
        return this.send('post', {
            msgs: options.msgs.map(function (msg) { return msg.toJSON(options.isClassic); }),
            fee: (_a = options.fee) === null || _a === void 0 ? void 0 : _a.toJSON(),
            memo: options.memo,
            gasPrices: (_b = options.gasPrices) === null || _b === void 0 ? void 0 : _b.toString(),
            gasAdjustment: (_c = options.gasAdjustment) === null || _c === void 0 ? void 0 : _c.toString(),
            account_number: options.accountNumber,
            sequence: options.sequence,
            waitForConfirmation: options.waitForConfirmation,
            purgeQueue: options.purgeQueue,
        });
    };
    return Extension;
}());
exports.Extension = Extension;
//# sourceMappingURL=index.js.map