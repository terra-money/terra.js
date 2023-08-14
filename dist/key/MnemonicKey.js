"use strict";
// Adapted from https://github.com/terra-money/terra-js/blob/master/src/utils/keyUtils.ts
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MnemonicKey = exports.LUNA_COIN_TYPE = void 0;
var bip32 = __importStar(require("bip32"));
var bip39 = __importStar(require("bip39"));
var RawKey_1 = require("./RawKey");
exports.LUNA_COIN_TYPE = 330;
var DEFAULT_OPTIONS = {
    account: 0,
    index: 0,
    coinType: exports.LUNA_COIN_TYPE,
};
/**
 * Implements a BIP39 mnemonic wallet with standard key derivation from a word list. Note
 * that this implementation exposes the private key in memory, so it is not advised to use
 * for applications requiring high security.
 */
var MnemonicKey = /** @class */ (function (_super) {
    __extends(MnemonicKey, _super);
    /**
     * Creates a new signing key from a mnemonic phrase. If no mnemonic is provided, one
     * will be automatically generated.
     *
     * ### Providing a mnemonic
     *
     * ```ts
     * import { MnemonicKey } from 'terra.js';
     *
     * const mk = new MnemonicKey({ mnemonic: '...' });
     * console.log(mk.accAddress);
     * ```
     *
     * ### Generating a random mnemonic
     *
     * ```ts
     * const mk2 = new MnemonicKey();
     * console.log(mk2.mnemonic);
     * ```
     *
     * @param options
     */
    function MnemonicKey(options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        var _a = __assign(__assign({}, DEFAULT_OPTIONS), options), account = _a.account, index = _a.index, coinType = _a.coinType;
        var mnemonic = options.mnemonic;
        if (mnemonic === undefined) {
            mnemonic = bip39.generateMnemonic(256);
        }
        var seed = bip39.mnemonicToSeedSync(mnemonic);
        var masterKey = bip32.fromSeed(seed);
        var hdPathLuna = "m/44'/".concat(coinType, "'/").concat(account, "'/0/").concat(index);
        var terraHD = masterKey.derivePath(hdPathLuna);
        var privateKey = terraHD.privateKey;
        if (!privateKey) {
            throw new Error('Failed to derive key pair');
        }
        _this = _super.call(this, privateKey) || this;
        _this.mnemonic = mnemonic;
        return _this;
    }
    return MnemonicKey;
}(RawKey_1.RawKey));
exports.MnemonicKey = MnemonicKey;
//# sourceMappingURL=MnemonicKey.js.map