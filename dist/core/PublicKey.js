"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicKey = void 0;
var json_1 = require("../util/json");
var PublicKey = /** @class */ (function (_super) {
    __extends(PublicKey, _super);
    function PublicKey(type, value) {
        var _this = _super.call(this) || this;
        _this.type = type;
        _this.value = value;
        return _this;
    }
    PublicKey.fromData = function (data) {
        var type = data.type, value = data.value;
        return new PublicKey(type, value);
    };
    PublicKey.prototype.toData = function () {
        var _a = this, type = _a.type, value = _a.value;
        if (type === 'tendermint/PubKeySecp256k1' && typeof value === 'string') {
            return {
                type: type,
                value: value,
            };
        }
        else if (type === 'tendermint/PubKeyMultisigThreshold' &&
            typeof value !== 'string') {
            return {
                type: type,
                value: value,
            };
        }
        throw new TypeError('invalid public key: type and value do not match');
    };
    return PublicKey;
}(json_1.JSONSerializable));
exports.PublicKey = PublicKey;
//# sourceMappingURL=PublicKey.js.map