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
exports.PublicKey = exports.Proof = void 0;
var proof_1 = require("@terra-money/terra.proto/tendermint/crypto/proof");
var keys_1 = require("@terra-money/terra.proto/tendermint/crypto/keys");
var Long = __importStar(require("long"));
var json_1 = require("../../../../../util/json");
var Proof = /** @class */ (function (_super) {
    __extends(Proof, _super);
    /**
     * @param total
     * @param index
     * @param leafHash
     * @param aunts
     */
    function Proof(total, index, leafHash, aunts) {
        var _this = _super.call(this) || this;
        _this.total = total;
        _this.index = index;
        _this.leafHash = leafHash;
        _this.aunts = aunts;
        return _this;
    }
    Proof.fromAmino = function (_) {
        _;
        throw new Error('Amino not supported');
    };
    Proof.prototype.toAmino = function () {
        throw new Error('Amino not supported');
    };
    Proof.fromData = function (data) {
        var total = data.total, index = data.index, leafHash = data.leaf_hash, aunts = data.aunts;
        return new Proof(Number.parseInt(total), Number.parseInt(index), leafHash, aunts);
    };
    Proof.prototype.toData = function () {
        var _a = this, total = _a.total, index = _a.index, leafHash = _a.leafHash, aunts = _a.aunts;
        var res = {
            total: total.toFixed(),
            index: index.toFixed(),
            leaf_hash: leafHash,
            aunts: aunts,
        };
        return res;
    };
    Proof.fromProto = function (proto) {
        return new Proof(proto.total.toNumber(), proto.index.toNumber(), Buffer.from(proto.leafHash).toString('base64'), proto.aunts.map(function (aunt) { return Buffer.from(aunt).toString('base64'); }));
    };
    Proof.prototype.toProto = function () {
        var _a = this, total = _a.total, index = _a.index, leafHash = _a.leafHash, aunts = _a.aunts;
        return proof_1.Proof.fromPartial({
            total: Long.fromNumber(total),
            index: Long.fromNumber(index),
            leafHash: Buffer.from(leafHash, 'base64'),
            aunts: aunts.map(function (aunt) { return Buffer.from(aunt, 'base64'); }),
        });
    };
    return Proof;
}(json_1.JSONSerializable));
exports.Proof = Proof;
/** PublicKey defines the keys available for use with Tendermint Validators */
var PublicKey = /** @class */ (function (_super) {
    __extends(PublicKey, _super);
    /**
     * @param ed25519
     * @param secp256k1
     */
    function PublicKey(ed25519, secp256k1) {
        var _this = _super.call(this) || this;
        _this.ed25519 = ed25519;
        _this.secp256k1 = secp256k1;
        return _this;
    }
    PublicKey.fromAmino = function (_) {
        _;
        throw new Error('Amino not supported');
    };
    PublicKey.prototype.toAmino = function () {
        throw new Error('Amino not supported');
    };
    PublicKey.fromData = function (data) {
        var ed25519 = data.ed25519, secp256k1 = data.secp256k1;
        return new PublicKey(ed25519, secp256k1);
    };
    PublicKey.prototype.toData = function () {
        var _a = this, ed25519 = _a.ed25519, secp256k1 = _a.secp256k1;
        var res = {
            ed25519: ed25519,
            secp256k1: secp256k1,
        };
        return res;
    };
    PublicKey.fromProto = function (proto) {
        var ed25519 = proto.ed25519, secp256k1 = proto.secp256k1;
        return new PublicKey(ed25519 ? Buffer.from(ed25519).toString('base64') : undefined, secp256k1 ? Buffer.from(secp256k1).toString('base64') : undefined);
    };
    PublicKey.prototype.toProto = function () {
        var _a = this, ed25519 = _a.ed25519, secp256k1 = _a.secp256k1;
        return keys_1.PublicKey.fromPartial({
            ed25519: ed25519 ? Buffer.from(ed25519, 'base64') : undefined,
            secp256k1: secp256k1 ? Buffer.from(secp256k1, 'base64') : undefined,
        });
    };
    return PublicKey;
}(json_1.JSONSerializable));
exports.PublicKey = PublicKey;
//# sourceMappingURL=crypto.js.map