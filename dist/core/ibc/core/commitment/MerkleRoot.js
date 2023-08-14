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
exports.MerkleRoot = void 0;
var commitment_1 = require("@terra-money/terra.proto/ibc/core/commitment/v1/commitment");
var json_1 = require("../../../../util/json");
// MerkleRoot defines a merkle root hash.
// In the Cosmos SDK, the AppHash of a block header becomes the root.
var MerkleRoot = /** @class */ (function (_super) {
    __extends(MerkleRoot, _super);
    /**
     * @param hash
     */
    function MerkleRoot(hash) {
        var _this = _super.call(this) || this;
        _this.hash = hash;
        return _this;
    }
    MerkleRoot.fromAmino = function (_) {
        _;
        throw new Error('Amino not supported');
    };
    MerkleRoot.prototype.toAmino = function () {
        throw new Error('Amino not supported');
    };
    MerkleRoot.fromData = function (data) {
        return new MerkleRoot(data.hash);
    };
    MerkleRoot.prototype.toData = function () {
        var res = {
            hash: this.hash
        };
        return res;
    };
    MerkleRoot.fromProto = function (proto) {
        return new MerkleRoot(Buffer.from(proto.hash).toString('base64'));
    };
    MerkleRoot.prototype.toProto = function () {
        return commitment_1.MerkleRoot.fromPartial({
            hash: Buffer.from(this.hash, 'base64')
        });
    };
    return MerkleRoot;
}(json_1.JSONSerializable));
exports.MerkleRoot = MerkleRoot;
//# sourceMappingURL=MerkleRoot.js.map