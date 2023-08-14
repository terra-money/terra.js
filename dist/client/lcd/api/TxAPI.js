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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TxAPI = exports.SimulateResponse = exports.isTxError = void 0;
var BaseAPI_1 = require("./BaseAPI");
var core_1 = require("../../../core");
var hash_1 = require("../../../util/hash");
var core_2 = require("../../../core");
function isTxError(x) {
    return (x.code !== undefined &&
        x.code !== 0 &&
        x.code !== '0');
}
exports.isTxError = isTxError;
var SimulateResponse = /** @class */ (function () {
    function SimulateResponse(gas_info, result) {
        this.gas_info = gas_info;
        this.result = result;
    }
    SimulateResponse.fromData = function (data) {
        return new SimulateResponse({
            gas_wanted: Number.parseInt(data.gas_info.gas_wanted),
            gas_used: Number.parseInt(data.gas_info.gas_used),
        }, data.result);
    };
    return SimulateResponse;
}());
exports.SimulateResponse = SimulateResponse;
var TxAPI = /** @class */ (function (_super) {
    __extends(TxAPI, _super);
    function TxAPI(lcd) {
        var _this = _super.call(this, lcd.apiRequester) || this;
        _this.lcd = lcd;
        return _this;
    }
    /**
     * Looks up a transaction on the blockchain, addressed by its hash
     * @param txHash transaction's hash
     */
    TxAPI.prototype.txInfo = function (txHash, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .getRaw("/cosmos/tx/v1beta1/txs/".concat(txHash), params)
                        .then(function (v) { return core_1.TxInfo.fromData(v.tx_response, _this.lcd.config.isClassic); })];
            });
        });
    };
    /**
     * Builds a [[StdSignMsg]] that is ready to be signed by a [[Key]]. The appropriate
     * account number and sequence will be fetched live from the blockchain and added to
     * the resultant [[StdSignMsg]]. If no fee is provided, fee will be automatically
     * estimated using the parameters, simulated using a "dummy fee" with sourceAddress's
     * nonzero denominations in its balance.
     *
     * @param sourceAddress account address of signer
     * @param options TX generation options
     */
    TxAPI.prototype.create = function (signers, options) {
        return __awaiter(this, void 0, void 0, function () {
            var fee, msgs, memo, timeoutHeight, signerDatas, _i, signers_1, signer, sequenceNumber, publicKey, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fee = options.fee;
                        msgs = options.msgs, memo = options.memo, timeoutHeight = options.timeoutHeight;
                        signerDatas = [];
                        _i = 0, signers_1 = signers;
                        _a.label = 1;
                    case 1:
                        if (!(_i < signers_1.length)) return [3 /*break*/, 5];
                        signer = signers_1[_i];
                        sequenceNumber = signer.sequenceNumber;
                        publicKey = signer.publicKey;
                        if (!(sequenceNumber === undefined || !publicKey)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.lcd.auth.accountInfo(signer.address)];
                    case 2:
                        account = _a.sent();
                        if (sequenceNumber === undefined) {
                            sequenceNumber = account.getSequenceNumber();
                        }
                        if (!publicKey) {
                            publicKey = account.getPublicKey();
                        }
                        _a.label = 3;
                    case 3:
                        signerDatas.push({
                            sequenceNumber: sequenceNumber,
                            publicKey: publicKey,
                        });
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5:
                        if (!(fee === undefined)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.lcd.tx.estimateFee(signerDatas, options)];
                    case 6:
                        fee = _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/, new core_1.Tx(new core_1.TxBody(msgs, memo || '', timeoutHeight || 0), new core_1.AuthInfo([], fee), [])];
                }
            });
        });
    };
    /**
     * Looks up transactions on the blockchain for the block height. If height is undefined,
     * gets the transactions for the latest block.
     * @param height block height
     */
    TxAPI.prototype.txInfosByHeight = function (height) {
        return __awaiter(this, void 0, void 0, function () {
            var blockInfo, txs, txhashes, txInfos, _i, txhashes_1, txhash, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.lcd.tendermint.blockInfo(height)];
                    case 1:
                        blockInfo = _c.sent();
                        txs = blockInfo.block.data.txs;
                        if (!!txs) return [3 /*break*/, 2];
                        return [2 /*return*/, []];
                    case 2:
                        txhashes = txs.map(function (txdata) { return (0, hash_1.hashToHex)(txdata); });
                        txInfos = [];
                        _i = 0, txhashes_1 = txhashes;
                        _c.label = 3;
                    case 3:
                        if (!(_i < txhashes_1.length)) return [3 /*break*/, 6];
                        txhash = txhashes_1[_i];
                        _b = (_a = txInfos).push;
                        return [4 /*yield*/, this.txInfo(txhash)];
                    case 4:
                        _b.apply(_a, [_c.sent()]);
                        _c.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/, txInfos];
                }
            });
        });
    };
    /**
     * Estimates the transaction's fee by simulating it within the node
     * @param sourceAddress address that will pay the bill
     * @param msgs standard messages
     * @param options options for fee estimation
     */
    TxAPI.prototype.estimateFee = function (signers, options) {
        return __awaiter(this, void 0, void 0, function () {
            var gasPrices, gasAdjustment, feeDenoms, gas, gasPricesCoins, gasPricesCoinsFiltered, txBody, authInfo, tx, feeAmount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        gasPrices = options.gasPrices || this.lcd.config.gasPrices;
                        gasAdjustment = options.gasAdjustment || this.lcd.config.gasAdjustment;
                        feeDenoms = options.feeDenoms || [
                            this.lcd.config.isClassic ? 'uusd' : 'uluna',
                        ];
                        gas = options.gas;
                        if (gasPrices) {
                            gasPricesCoins = new core_1.Coins(gasPrices);
                            if (feeDenoms) {
                                gasPricesCoinsFiltered = gasPricesCoins.filter(function (c) {
                                    return feeDenoms.includes(c.denom);
                                });
                                if (gasPricesCoinsFiltered.toArray().length > 0) {
                                    gasPricesCoins = gasPricesCoinsFiltered;
                                }
                            }
                        }
                        txBody = new core_1.TxBody(options.msgs, options.memo || '');
                        authInfo = new core_1.AuthInfo([], new core_1.Fee(0, new core_1.Coins()));
                        tx = new core_1.Tx(txBody, authInfo, []);
                        // fill empty signature
                        tx.appendEmptySignatures(signers);
                        if (!(!gas || gas === 'auto' || gas === '0')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.estimateGas(tx, { gasAdjustment: gasAdjustment })];
                    case 1:
                        gas = (_a.sent()).toString();
                        _a.label = 2;
                    case 2:
                        feeAmount = gasPricesCoins
                            ? gasPricesCoins.mul(gas).toIntCeilCoins()
                            : this.lcd.config.isClassic
                                ? '0uusd'
                                : '0uluna';
                        return [2 /*return*/, new core_1.Fee(Number.parseInt(gas), feeAmount, '', '')];
                }
            });
        });
    };
    TxAPI.prototype.estimateGas = function (tx, options) {
        return __awaiter(this, void 0, void 0, function () {
            var gasAdjustment, simTx, authInfo, simulateRes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        gasAdjustment = (options === null || options === void 0 ? void 0 : options.gasAdjustment) || this.lcd.config.gasAdjustment;
                        simTx = tx;
                        if (tx.signatures.length <= 0) {
                            if (!(options && options.signers && options.signers.length > 0)) {
                                throw Error('cannot append signature');
                            }
                            authInfo = new core_1.AuthInfo([], new core_1.Fee(0, new core_1.Coins()));
                            simTx = new core_1.Tx(tx.body, authInfo, []);
                            simTx.appendEmptySignatures(options.signers);
                        }
                        return [4 /*yield*/, this.c
                                .post("/cosmos/tx/v1beta1/simulate", {
                                tx_bytes: this.encode(simTx),
                            })
                                .then(function (d) { return SimulateResponse.fromData(d); })];
                    case 1:
                        simulateRes = _a.sent();
                        return [2 /*return*/, new core_1.Dec(gasAdjustment).mul(simulateRes.gas_info.gas_used).toNumber()];
                }
            });
        });
    };
    TxAPI.prototype.computeTax = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error('Tax was removed from network');
            });
        });
    };
    /**
     * Encode a transaction to base64-encoded protobuf
     * @param tx transaction to encode
     */
    TxAPI.prototype.encode = function (tx) {
        return Buffer.from(tx.toBytes(this.lcd.config.isClassic)).toString('base64');
    };
    /**
     * Decode a transaction from base64-encoded protobuf
     * @param tx transaction string to decode
     */
    TxAPI.prototype.decode = function (encodedTx) {
        return core_1.Tx.fromBuffer(Buffer.from(encodedTx, 'base64'), this.lcd.config.isClassic);
    };
    /**
     * Get the transaction's hash
     * @param tx transaction to hash
     */
    TxAPI.prototype.hash = function (tx) {
        return __awaiter(this, void 0, void 0, function () {
            var txBytes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.encode(tx)];
                    case 1:
                        txBytes = _a.sent();
                        return [2 /*return*/, (0, hash_1.hashToHex)(txBytes)];
                }
            });
        });
    };
    TxAPI.prototype._broadcast = function (tx, mode) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.c.post("/cosmos/tx/v1beta1/txs", {
                            tx_bytes: this.encode(tx),
                            mode: mode,
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Broadcast the transaction using "sync" mode, then wait for its inclusion in a block.
     *
     * This method polls txInfo using the txHash to confirm the transaction's execution.
     *
     * @param tx      transaction to broadcast
     * @param timeout time in milliseconds to wait for transaction to be included in a block. defaults to 30000
     */
    TxAPI.prototype.broadcast = function (tx, timeout) {
        if (timeout === void 0) { timeout = 30000; }
        return __awaiter(this, void 0, void 0, function () {
            var POLL_INTERVAL, txResponse, result, txInfo, i, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        POLL_INTERVAL = 500;
                        return [4 /*yield*/, this._broadcast(tx, 'BROADCAST_MODE_SYNC')];
                    case 1:
                        txResponse = (_a.sent()).tx_response;
                        if (txResponse.code != undefined && txResponse.code != 0) {
                            result = {
                                height: Number.parseInt(txResponse.height),
                                txhash: txResponse.txhash,
                                raw_log: txResponse.raw_log,
                                code: txResponse.code,
                                codespace: txResponse.codespace,
                                gas_used: 0,
                                gas_wanted: 0,
                                timestamp: '',
                                logs: [],
                            };
                            return [2 /*return*/, result];
                        }
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i <= timeout / POLL_INTERVAL)) return [3 /*break*/, 9];
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.txInfo(txResponse.txhash)];
                    case 4:
                        txInfo = _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        return [3 /*break*/, 6];
                    case 6:
                        if (txInfo) {
                            return [3 /*break*/, 9];
                        }
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, POLL_INTERVAL); })];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        i++;
                        return [3 /*break*/, 2];
                    case 9:
                        if (!txInfo) {
                            throw new Error("Transaction was not included in a block before timeout of ".concat(timeout, "ms"));
                        }
                        return [2 /*return*/, {
                                txhash: txInfo.txhash,
                                raw_log: txInfo.raw_log,
                                gas_wanted: txInfo.gas_wanted,
                                gas_used: txInfo.gas_used,
                                height: +txInfo.height,
                                logs: (txInfo.logs || []).map(function (l) { return core_2.TxLog.fromData(l); }),
                                code: txInfo.code,
                                codespace: txInfo.codespace,
                                timestamp: txInfo.timestamp,
                            }];
                }
            });
        });
    };
    /**
     * Broadcast the transaction using the "block" mode, waiting for its inclusion in the blockchain.
     * @param tx transaction to broadcast
     */
    TxAPI.prototype.broadcastBlock = function (tx) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._broadcast(tx, 'BROADCAST_MODE_BLOCK').then(function (_a) {
                        var d = _a.tx_response;
                        var blockResult = {
                            txhash: d.txhash,
                            raw_log: d.raw_log,
                            gas_wanted: Number.parseInt(d.gas_wanted),
                            gas_used: Number.parseInt(d.gas_used),
                            height: +d.height,
                            logs: d.logs.map(function (l) { return core_2.TxLog.fromData(l); }),
                            code: d.code,
                            codespace: d.codespace,
                            data: d.data,
                            info: d.info,
                            timestamp: d.timestamp,
                        };
                        return blockResult;
                    })];
            });
        });
    };
    /**
     * NOTE: This is not a synchronous function and is unconventionally named. This function
     * can be await as it returns a `Promise`.
     *
     * Broadcast the transaction using the "sync" mode, returning after CheckTx() is performed.
     * @param tx transaction to broadcast
     */
    TxAPI.prototype.broadcastSync = function (tx) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._broadcast(tx, 'BROADCAST_MODE_SYNC').then(function (_a) {
                        var d = _a.tx_response;
                        var blockResult = {
                            height: +d.height,
                            txhash: d.txhash,
                            raw_log: d.raw_log,
                        };
                        if (d.code) {
                            blockResult.code = d.code;
                        }
                        if (d.codespace) {
                            blockResult.codespace = d.codespace;
                        }
                        return blockResult;
                    })];
            });
        });
    };
    /**
     * Broadcast the transaction using the "async" mode, returns immediately (transaction might fail).
     * @param tx transaction to broadcast
     */
    TxAPI.prototype.broadcastAsync = function (tx) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._broadcast(tx, 'BROADCAST_MODE_ASYNC').then(function (_a) {
                        var d = _a.tx_response;
                        return ({
                            height: +d.height,
                            txhash: d.txhash,
                        });
                    })];
            });
        });
    };
    /**
     * Search for transactions based on event attributes.
     * @param options
     */
    TxAPI.prototype.search = function (options) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var params;
            var _this = this;
            return __generator(this, function (_b) {
                params = new URLSearchParams();
                // build search params
                (_a = options.events) === null || _a === void 0 ? void 0 : _a.forEach(function (v) {
                    return params.append('events', v.key === 'tx.height' ? "".concat(v.key, "=").concat(v.value) : "".concat(v.key, "='").concat(v.value, "'"));
                });
                delete options['events'];
                Object.entries(options).forEach(function (v) {
                    params.append(v[0], v[1]);
                });
                return [2 /*return*/, this.c
                        .getRaw("/cosmos/tx/v1beta1/txs", params)
                        .then(function (d) {
                        return {
                            txs: d.tx_responses.map(function (tx_response) {
                                return core_1.TxInfo.fromData(tx_response, _this.lcd.config.isClassic);
                            }),
                            pagination: d.pagination,
                        };
                    })];
            });
        });
    };
    return TxAPI;
}(BaseAPI_1.BaseAPI));
exports.TxAPI = TxAPI;
//# sourceMappingURL=TxAPI.js.map