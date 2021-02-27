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
exports.StdSignature = void 0;
var PublicKey_1 = require("./PublicKey");
var json_1 = require("../util/json");
/**
 * A signature consists of a message signature with a public key to verify its validity.
 * You likely will not need to work with StdSignature objects directly as they are automatically created for you.
 */
var StdSignature = /** @class */ (function (_super) {
    __extends(StdSignature, _super);
    /**
     *
     * @param signature Message signature string (base64-encoded).
     * @param pub_key Public key
     */
    function StdSignature(signature, pub_key) {
        var _this = _super.call(this) || this;
        _this.signature = signature;
        _this.pub_key = pub_key;
        return _this;
    }
    StdSignature.fromData = function (data) {
        var signature = data.signature, pub_key = data.pub_key;
        return new StdSignature(signature, PublicKey_1.PublicKey.fromData(pub_key));
    };
    StdSignature.prototype.toData = function () {
        var _a = this, signature = _a.signature, pub_key = _a.pub_key;
        return {
            signature: signature,
            pub_key: pub_key.toData(),
        };
    };
    return StdSignature;
}(json_1.JSONSerializable));
exports.StdSignature = StdSignature;
//# sourceMappingURL=StdSignature.js.map