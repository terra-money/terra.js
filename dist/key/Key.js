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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Key = void 0;
var bech32_1 = require("bech32");
var core_1 = require("../core");
var SignatureV2_1 = require("../core/SignatureV2");
var signing_1 = require("@terra-money/terra.proto/cosmos/tx/signing/v1beta1/signing");
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
    }
    Object.defineProperty(Key.prototype, "accAddress", {
        /**
         * Terra account address. `terra-` prefixed.
         */
        get: function () {
            if (!this.publicKey) {
                throw new Error('Could not compute accAddress: missing rawAddress');
            }
            return this.publicKey.address();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Key.prototype, "valAddress", {
        /**
         * Terra validator address. `terravaloper-` prefixed.
         */
        get: function () {
            if (!this.publicKey) {
                throw new Error('Could not compute valAddress: missing rawAddress');
            }
            return bech32_1.bech32.encode('terravaloper', bech32_1.bech32.toWords(this.publicKey.rawAddress()));
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Signs a [[StdSignMsg]] with the method supplied by the child class.
     * only used Amino sign
     *
     * @param tx sign-message of the transaction to sign
     * @param isClassic target network is isClassic or not?
     */
    Key.prototype.createSignatureAmino = function (tx, isClassic) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f, _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        if (!this.publicKey) {
                            throw new Error('Signature could not be created: Key instance missing publicKey');
                        }
                        _a = SignatureV2_1.SignatureV2.bind;
                        _b = [void 0, this.publicKey];
                        _d = (_c = SignatureV2_1.SignatureV2.Descriptor).bind;
                        _f = (_e = SignatureV2_1.SignatureV2.Descriptor.Single).bind;
                        _g = [void 0, signing_1.SignMode.SIGN_MODE_LEGACY_AMINO_JSON];
                        return [4 /*yield*/, this.sign(Buffer.from(tx.toAminoJSON(isClassic)))];
                    case 1: return [2 /*return*/, new (_a.apply(SignatureV2_1.SignatureV2, _b.concat([new (_d.apply(_c, [void 0, new (_f.apply(_e, _g.concat([(_h.sent()).toString('base64')])))()]))(),
                            tx.sequence])))()];
                }
            });
        });
    };
    /**
     * Signs a [[SignDoc]] with the method supplied by the child class.
     *
     * @param tx sign-message of the transaction to sign
     * @param isClassic target network is isClassic or not?
     */
    Key.prototype.createSignature = function (signDoc, isClassic) {
        return __awaiter(this, void 0, void 0, function () {
            var signerInfos, sigBytes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.publicKey) {
                            throw new Error('Signature could not be created: Key instance missing publicKey');
                        }
                        signerInfos = signDoc.auth_info.signer_infos;
                        signDoc.auth_info.signer_infos = [
                            new core_1.SignerInfo(this.publicKey, signDoc.sequence, new core_1.ModeInfo(new core_1.ModeInfo.Single(signing_1.SignMode.SIGN_MODE_DIRECT))),
                        ];
                        return [4 /*yield*/, this.sign(Buffer.from(signDoc.toBytes(isClassic)))];
                    case 1:
                        sigBytes = (_a.sent()).toString('base64');
                        // restore signDoc to origin
                        signDoc.auth_info.signer_infos = signerInfos;
                        return [2 /*return*/, new SignatureV2_1.SignatureV2(this.publicKey, new SignatureV2_1.SignatureV2.Descriptor(new SignatureV2_1.SignatureV2.Descriptor.Single(signing_1.SignMode.SIGN_MODE_DIRECT, sigBytes)), signDoc.sequence)];
                }
            });
        });
    };
    /**
     * Signs a [[Tx]] and adds the signature to a generated StdTx that is ready to be broadcasted.
     * @param tx
     */
    Key.prototype.signTx = function (tx, options, isClassic) {
        return __awaiter(this, void 0, void 0, function () {
            var copyTx, sign_doc, signature, sigData;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        copyTx = new core_1.Tx(tx.body, new core_1.AuthInfo([], tx.auth_info.fee), []);
                        sign_doc = new core_1.SignDoc(options.chainID, options.accountNumber, options.sequence, copyTx.auth_info, copyTx.body);
                        if (!(options.signMode === signing_1.SignMode.SIGN_MODE_LEGACY_AMINO_JSON)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.createSignatureAmino(sign_doc, isClassic)];
                    case 1:
                        signature = _c.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.createSignature(sign_doc, isClassic)];
                    case 3:
                        signature = _c.sent();
                        _c.label = 4;
                    case 4:
                        sigData = signature.data.single;
                        (_a = copyTx.signatures).push.apply(_a, __spreadArray(__spreadArray([], tx.signatures, false), [sigData.signature], false));
                        (_b = copyTx.auth_info.signer_infos).push.apply(_b, __spreadArray(__spreadArray([], tx.auth_info.signer_infos, false), [new core_1.SignerInfo(signature.public_key, signature.sequence, new core_1.ModeInfo(new core_1.ModeInfo.Single(sigData.mode)))], false));
                        return [2 /*return*/, copyTx];
                }
            });
        });
    };
    return Key;
}());
exports.Key = Key;
//# sourceMappingURL=Key.js.map