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
exports.MerklePrefix = void 0;
var commitment_1 = require("@terra-money/terra.proto/ibc/core/commitment/v1/commitment");
var json_1 = require("../../../../util/json");
/*
 * MerklePrefix is merkle path prefixed to the key.
 * The constructed key from the Path and the key will be append(Path.KeyPath,
 * append(Path.KeyPrefix, key...))
 */
var MerklePrefix = /** @class */ (function (_super) {
    __extends(MerklePrefix, _super);
    /**
     * @param key_prefix
     */
    function MerklePrefix(key_prefix) {
        var _this = _super.call(this) || this;
        _this.key_prefix = key_prefix;
        return _this;
    }
    MerklePrefix.fromAmino = function (data) {
        var key_prefix = data.key_prefix;
        return new MerklePrefix(key_prefix);
    };
    MerklePrefix.prototype.toAmino = function () {
        var key_prefix = this.key_prefix;
        var res = {
            key_prefix: key_prefix,
        };
        return res;
    };
    MerklePrefix.fromData = function (data) {
        var key_prefix = data.key_prefix;
        return new MerklePrefix(key_prefix);
    };
    MerklePrefix.prototype.toData = function () {
        var key_prefix = this.key_prefix;
        var res = {
            key_prefix: key_prefix,
        };
        return res;
    };
    MerklePrefix.fromProto = function (proto) {
        return new MerklePrefix(Buffer.from(proto.keyPrefix).toString('base64'));
    };
    MerklePrefix.prototype.toProto = function () {
        var key_prefix = this.key_prefix;
        return commitment_1.MerklePrefix.fromPartial({
            keyPrefix: Buffer.from(key_prefix, 'base64'),
        });
    };
    return MerklePrefix;
}(json_1.JSONSerializable));
exports.MerklePrefix = MerklePrefix;
//# sourceMappingURL=MerklePrefix.js.map