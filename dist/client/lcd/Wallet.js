"use strict";
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
exports.Wallet = void 0;
var signing_1 = require("@terra-money/terra.proto/cosmos/tx/signing/v1beta1/signing");
var Wallet = /** @class */ (function () {
    function Wallet(lcd, key) {
        this.lcd = lcd;
        this.key = key;
    }
    Wallet.prototype.accountNumberAndSequence = function () {
        return this.lcd.auth.accountInfo(this.key.accAddress).then(function (d) {
            return {
                account_number: d.getAccountNumber(),
                sequence: d.getSequenceNumber(),
            };
        });
    };
    Wallet.prototype.accountNumber = function () {
        return this.lcd.auth.accountInfo(this.key.accAddress).then(function (d) {
            return d.getAccountNumber();
        });
    };
    Wallet.prototype.sequence = function () {
        return this.lcd.auth.accountInfo(this.key.accAddress).then(function (d) {
            return d.getSequenceNumber();
        });
    };
    Wallet.prototype.createTx = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.lcd.tx.create([
                        {
                            address: this.key.accAddress,
                            sequenceNumber: options.sequence,
                            publicKey: this.key.publicKey,
                        },
                    ], options)];
            });
        });
    };
    Wallet.prototype.createAndSignTx = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var accountNumber, sequence, res, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        accountNumber = options.accountNumber;
                        sequence = options.sequence;
                        if (!(accountNumber === undefined || sequence === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.accountNumberAndSequence()];
                    case 1:
                        res = _a.sent();
                        if (accountNumber === undefined) {
                            accountNumber = res.account_number;
                        }
                        if (sequence === undefined) {
                            sequence = res.sequence;
                        }
                        _a.label = 2;
                    case 2:
                        options.sequence = sequence;
                        options.accountNumber = accountNumber;
                        return [4 /*yield*/, this.createTx(options)];
                    case 3:
                        tx = _a.sent();
                        return [2 /*return*/, this.key.signTx(tx, {
                                accountNumber: accountNumber,
                                sequence: sequence,
                                chainID: this.lcd.config.chainID,
                                signMode: options.signMode || signing_1.SignMode.SIGN_MODE_DIRECT,
                            }, this.lcd.config.isClassic)];
                }
            });
        });
    };
    return Wallet;
}());
exports.Wallet = Wallet;
//# sourceMappingURL=Wallet.js.map