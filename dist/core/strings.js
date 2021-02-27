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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValConsPubKey = exports.ValPubKey = exports.AccPubKey = exports.ValConsAddress = exports.ValAddress = exports.AccAddress = void 0;
var bech32 = __importStar(require("bech32"));
function checkPrefixAndLength(prefix, data, length) {
    try {
        var vals = bech32.decode(data);
        return vals.prefix === prefix && data.length == length;
    }
    catch (e) {
        return false;
    }
}
var AccAddress;
(function (AccAddress) {
    /**
     * Checks if a string is a valid Terra account address.
     *
     * @param data string to check
     */
    function validate(data) {
        return checkPrefixAndLength('terra', data, 44);
    }
    AccAddress.validate = validate;
    /**
     * Converts a validator address into an account address
     *
     * @param address validator address
     */
    function fromValAddress(address) {
        var vals = bech32.decode(address);
        return bech32.encode('terra', vals.words);
    }
    AccAddress.fromValAddress = fromValAddress;
})(AccAddress = exports.AccAddress || (exports.AccAddress = {}));
var ValAddress;
(function (ValAddress) {
    /**
     * Checks if a string is a Terra validator address.
     *
     * @param data string to check
     */
    function validate(data) {
        return checkPrefixAndLength('terravaloper', data, 51);
    }
    ValAddress.validate = validate;
    /**
     * Converts a Terra account address to a validator address.
     * @param address account address to convert
     */
    function fromAccAddress(address) {
        var vals = bech32.decode(address);
        return bech32.encode('terravaloper', vals.words);
    }
    ValAddress.fromAccAddress = fromAccAddress;
})(ValAddress = exports.ValAddress || (exports.ValAddress = {}));
var ValConsAddress;
(function (ValConsAddress) {
    /**
     * Checks if a string is a Terra validator consensus address
     * @param data string to check
     */
    function validate(data) {
        return checkPrefixAndLength('terravalcons', data, 51);
    }
    ValConsAddress.validate = validate;
})(ValConsAddress = exports.ValConsAddress || (exports.ValConsAddress = {}));
var AccPubKey;
(function (AccPubKey) {
    /**
     * Checks if a string is a Terra validator consensus address
     * @param data string to check
     */
    function validate(data) {
        return checkPrefixAndLength('terrapub', data, 76);
    }
    AccPubKey.validate = validate;
    /**
     * Converts a Terra validator pubkey to an account pubkey.
     * @param address validator pubkey to convert
     */
    function fromValPubKey(pubkey) {
        var vals = bech32.decode(pubkey);
        return bech32.encode('terrapub', vals.words);
    }
    AccPubKey.fromValPubKey = fromValPubKey;
})(AccPubKey = exports.AccPubKey || (exports.AccPubKey = {}));
var ValPubKey;
(function (ValPubKey) {
    /**
     * Checks if a string is a Terra validator pubkey
     * @param data string to check
     */
    function validate(data) {
        return checkPrefixAndLength('terravaloperpub', data, 83);
    }
    ValPubKey.validate = validate;
    /**
     * Converts a Terra account pubkey to a validator pubkey.
     * @param pubkey account pubkey
     */
    function fromAccPubKey(pubkey) {
        var vals = bech32.decode(pubkey);
        return bech32.encode('terravaloperpub', vals.words);
    }
    ValPubKey.fromAccPubKey = fromAccPubKey;
})(ValPubKey = exports.ValPubKey || (exports.ValPubKey = {}));
var ValConsPubKey;
(function (ValConsPubKey) {
    /**
     * Checks if string is a valid Terra consensus (node) pubkey.
     * @param data string to check
     */
    function validate(data) {
        return checkPrefixAndLength('terravalconspub', data, 83);
    }
    ValConsPubKey.validate = validate;
})(ValConsPubKey = exports.ValConsPubKey || (exports.ValConsPubKey = {}));
//# sourceMappingURL=strings.js.map