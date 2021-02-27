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
exports.TxAPI = exports.isTxError = exports.Broadcast = void 0;
var BaseAPI_1 = require("./BaseAPI");
var core_1 = require("../../../core");
var hash_1 = require("../../../util/hash");
var core_2 = require("../../../core");
/** Transaction broadcasting modes  */
var Broadcast;
(function (Broadcast) {
    /** Wait until the transaction has been included in the block */
    Broadcast["BLOCK"] = "block";
    /** Return after DeliverTx() */
    Broadcast["SYNC"] = "sync";
    /** Return after CheckTx() */
    Broadcast["ASYNC"] = "async";
})(Broadcast = exports.Broadcast || (exports.Broadcast = {}));
function isTxError(x) {
    return x.code !== undefined;
}
exports.isTxError = isTxError;
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
    TxAPI.prototype.txInfo = function (txHash) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c.getRaw("/txs/" + txHash).then(core_1.TxInfo.fromData)];
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
    TxAPI.prototype.create = function (sourceAddress, options) {
        return __awaiter(this, void 0, void 0, function () {
            var fee, memo, msgs, estimateFeeOptions, feeDenoms, balanceOne, stdTx, accountNumber, sequence, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fee = options.fee, memo = options.memo;
                        msgs = options.msgs;
                        memo = memo || '';
                        estimateFeeOptions = {
                            gasPrices: options.gasPrices || this.lcd.config.gasPrices,
                            gasAdjustment: options.gasAdjustment || this.lcd.config.gasAdjustment,
                            feeDenoms: options.feeDenoms,
                        };
                        feeDenoms = options.feeDenoms || [];
                        balanceOne = feeDenoms.map(function (denom) { return new core_1.Coin(denom, 1); });
                        if (!(fee === undefined)) return [3 /*break*/, 2];
                        stdTx = new core_1.StdTx(msgs, new core_1.StdFee(0, balanceOne), [], memo);
                        return [4 /*yield*/, this.lcd.tx.estimateFee(stdTx, estimateFeeOptions)];
                    case 1:
                        fee = _a.sent();
                        _a.label = 2;
                    case 2:
                        accountNumber = options.account_number;
                        sequence = options.sequence;
                        if (!(!accountNumber || !sequence)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.lcd.auth.accountInfo(sourceAddress)];
                    case 3:
                        account = _a.sent();
                        if (!accountNumber) {
                            accountNumber = account.account_number;
                        }
                        if (!sequence) {
                            sequence = account.sequence;
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/, new core_1.StdSignMsg(this.lcd.config.chainID, accountNumber, sequence, fee, msgs, memo)];
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
            var blockInfo, txs, txhashes;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.lcd.tendermint.blockInfo(height)];
                    case 1:
                        blockInfo = _a.sent();
                        txs = blockInfo.block.data.txs;
                        if (!txs) {
                            return [2 /*return*/, []];
                        }
                        else {
                            txhashes = txs.map(function (txdata) { return hash_1.hashAmino(txdata); });
                            return [2 /*return*/, Promise.all(txhashes.map(function (txhash) { return _this.txInfo(txhash); }))];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Estimates the transaction's fee by simulating it within the node
     * @param tx transaction for which to estimate fee
     * @param options options for fee estimation
     */
    TxAPI.prototype.estimateFee = function (tx, options) {
        return __awaiter(this, void 0, void 0, function () {
            var gasPrices, gasAdjustment, feeDenoms, txValue, gasPricesCoins, data;
            return __generator(this, function (_a) {
                gasPrices = (options === null || options === void 0 ? void 0 : options.gasPrices) || this.lcd.config.gasPrices;
                gasAdjustment = (options === null || options === void 0 ? void 0 : options.gasAdjustment) || this.lcd.config.gasAdjustment;
                feeDenoms = options === null || options === void 0 ? void 0 : options.feeDenoms;
                txValue = __assign({}, (tx instanceof core_1.StdSignMsg
                    ? tx.toStdTx().toData().value
                    : tx.toData().value));
                txValue.fee.gas = '0';
                if (gasPrices) {
                    gasPricesCoins = new core_1.Coins(gasPrices);
                    if (feeDenoms) {
                        gasPricesCoins = gasPricesCoins.filter(function (c) {
                            return feeDenoms.includes(c.denom);
                        });
                    }
                }
                data = {
                    tx: txValue,
                    gas_prices: gasPricesCoins && gasPricesCoins.toData(),
                    gas_adjustment: gasAdjustment && gasAdjustment.toString(),
                };
                return [2 /*return*/, this.c
                        .post("/txs/estimate_fee", data)
                        .then(function (_a) {
                        var d = _a.result;
                        return new core_1.StdFee(Number.parseInt(d.gas), core_1.Coins.fromData(d.fees));
                    })];
            });
        });
    };
    /**
     * Encode a transaction to Amino-encoding
     * @param tx transaction to encode
     */
    TxAPI.prototype.encode = function (tx) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .postRaw("/txs/encode", tx.toData())
                        .then(function (d) { return d.tx; })];
            });
        });
    };
    /**
     * Get the transaction's hash
     * @param tx transaction to hash
     */
    TxAPI.prototype.hash = function (tx) {
        return __awaiter(this, void 0, void 0, function () {
            var amino;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.encode(tx)];
                    case 1:
                        amino = _a.sent();
                        return [2 /*return*/, hash_1.hashAmino(amino)];
                }
            });
        });
    };
    TxAPI.prototype._broadcast = function (tx, mode) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                data = {
                    tx: tx.toData().value,
                    mode: mode,
                };
                return [2 /*return*/, this.c.postRaw("/txs", data)];
            });
        });
    };
    /**
     * Broadcast the transaction using the "block" mode, waiting for its inclusion in the blockchain.
     * @param tx tranasaction to broadcast
     */
    TxAPI.prototype.broadcast = function (tx) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._broadcast(tx, Broadcast.BLOCK).then(function (d) {
                        var blockResult = {
                            height: Number.parseInt(d.height),
                            txhash: d.txhash,
                            raw_log: d.raw_log,
                            gas_wanted: Number.parseInt(d.gas_wanted),
                            gas_used: Number.parseInt(d.gas_used),
                        };
                        if (d.logs) {
                            blockResult.logs = d.logs.map(function (l) { return core_2.TxLog.fromData(l); });
                        }
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
     * NOTE: This is not a synchronous function and is unconventionally named. This function
     * can be await as it returns a `Promise`.
     *
     * Broadcast the transaction using the "sync" mode, returning after DeliverTx() is performed.
     * @param tx transaction to broadcast
     */
    TxAPI.prototype.broadcastSync = function (tx) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._broadcast(tx, Broadcast.SYNC).then(function (d) {
                        var blockResult = {
                            height: Number.parseInt(d.height),
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
     * Broadcast the transaction using the "async" mode, returning after CheckTx() is performed.
     * @param tx transaction to broadcast
     */
    TxAPI.prototype.broadcastAsync = function (tx) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._broadcast(tx, Broadcast.ASYNC).then(function (d) { return ({
                        height: Number.parseInt(d.height),
                        txhash: d.txhash,
                    }); })];
            });
        });
    };
    /**
     * Search for transactions based on event attributes.
     * @param options
     */
    TxAPI.prototype.search = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c.getRaw("/txs", options).then(function (d) { return ({
                        total_count: Number.parseInt(d.total_count),
                        count: Number.parseInt(d.count),
                        page_number: Number.parseInt(d.page_number),
                        page_total: Number.parseInt(d.page_total),
                        limit: Number.parseInt(d.limit),
                        txs: d.txs.map(function (txdata) { return core_1.TxInfo.fromData(txdata); }),
                    }); })];
            });
        });
    };
    return TxAPI;
}(BaseAPI_1.BaseAPI));
exports.TxAPI = TxAPI;
//# sourceMappingURL=TxAPI.js.map