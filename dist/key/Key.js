"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.Key = void 0;
var bech32 = __importStar(require("bech32"));
var HEX = __importStar(require("crypto-js/enc-hex"));
var ripemd160_1 = __importDefault(require("crypto-js/ripemd160"));
var sha256_1 = __importDefault(require("crypto-js/sha256"));
var core_1 = require("../core");
var core_2 = require("../core");
var BECH32_PUBKEY_DATA_PREFIX = 'eb5ae98721';
/**
 * Gets a raw address from a compressed bytes public key.
 *
 * @param publicKey raw public key
 */
function addressFromPublicKey(publicKey) {
    if (typeof publicKey !== 'object' || !(publicKey instanceof Buffer)) {
        throw new TypeError('parameter must be Buffer that contains public key');
    }
    var message = HEX.parse(publicKey.toString('hex'));
    var hash = ripemd160_1.default(sha256_1.default(message)).toString();
    var address = Buffer.from(hash, 'hex');
    return Buffer.from(bech32.toWords(address));
}
/**
 * Gets a bech32-words pubkey from a compressed bytes public key.
 *
 * @param publicKey raw public key
 */
function pubKeyFromPublicKey(publicKey) {
    var buffer = Buffer.from(BECH32_PUBKEY_DATA_PREFIX, 'hex');
    var combined = Buffer.concat([buffer, publicKey]);
    return Buffer.from(bech32.toWords(combined));
}
/**
 * Abstract key interface that provides transaction signing features and Bech32 address
 * and public key derivation from a public key. This allows you to create custom key
 * solutions, such as for various hardware wallets, by implementing signing and calling
 * `super` with the raw public key from within your subclass. See [[MnemonicKey]] for
 * an implementation of a basic mnemonic-based key.
 */
var Key = /** @class */ (function () {
    /**
     * Called to derive the relevant account and validator addresses and public keys from
     * the raw compressed public key in bytes.
     *
     * @param publicKey raw compressed bytes public key
     */
    function Key(publicKey) {
        this.publicKey = publicKey;
        if (publicKey) {
            this.rawAddress = addressFromPublicKey(publicKey);
            this.rawPubKey = pubKeyFromPublicKey(publicKey);
        }
    }
    Object.defineProperty(Key.prototype, "accAddress", {
        /**
         * Terra account address. `terra-` prefixed.
         */
        get: function () {
            if (!this.rawAddress) {
                throw new Error('Could not compute accAddress: missing rawAddress');
            }
            return bech32.encode('terra', Array.from(this.rawAddress));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Key.prototype, "valAddress", {
        /**
         * Terra validator address. `terravaloper-` prefixed.
         */
        get: function () {
            if (!this.rawAddress) {
                throw new Error('Could not compute valAddress: missing rawAddress');
            }
            return bech32.encode('terravaloper', Array.from(this.rawAddress));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Key.prototype, "accPubKey", {
        /**
         * Terra account public key. `terrapub-` prefixed.
         */
        get: function () {
            if (!this.rawPubKey) {
                throw new Error('Could not compute accPubKey: missing rawPubKey');
            }
            return bech32.encode('terrapub', Array.from(this.rawPubKey));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Key.prototype, "valPubKey", {
        /**
         * Terra validator public key. `terravaloperpub-` prefixed.
         */
        get: function () {
            if (!this.rawPubKey) {
                throw new Error('Could not compute valPubKey: missing rawPubKey');
            }
            return bech32.encode('terravaloperpub', Array.from(this.rawPubKey));
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Signs a [[StdSignMsg]] with the method supplied by the child class.
     *
     * @param tx sign-message of the transaction to sign
     */
    Key.prototype.createSignature = function (tx) {
        return __awaiter(this, void 0, void 0, function () {
            var sigBuffer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sign(Buffer.from(tx.toJSON()))];
                    case 1:
                        sigBuffer = _a.sent();
                        if (!this.publicKey) {
                            throw new Error('Signature could not be created: Key instance missing publicKey');
                        }
                        return [2 /*return*/, core_1.StdSignature.fromData({
                                signature: sigBuffer.toString('base64'),
                                pub_key: {
                                    type: 'tendermint/PubKeySecp256k1',
                                    value: this.publicKey.toString('base64'),
                                },
                            })];
                }
            });
        });
    };
    /**
     * Signs a [[StdSignMsg]] and adds the signature to a generated StdTx that is ready to be broadcasted.
     * @param tx
     */
    Key.prototype.signTx = function (tx) {
        return __awaiter(this, void 0, void 0, function () {
            var sig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createSignature(tx)];
                    case 1:
                        sig = _a.sent();
                        return [2 /*return*/, new core_2.StdTx(tx.msgs, tx.fee, [sig], tx.memo)];
                }
            });
        });
    };
    return Key;
}());
exports.Key = Key;
//# sourceMappingURL=Key.js.map