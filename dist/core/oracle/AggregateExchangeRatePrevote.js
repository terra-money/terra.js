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
exports.AggregateExchangeRatePrevote = void 0;
var json_1 = require("../../util/json");
var oracle_1 = require("@classic-terra/terra.proto/terra/oracle/v1beta1/oracle");
var Long = __importStar(require("long"));
/**
 * Stores information about data about Oracle aggregate prevotes fetched from the blockchain.
 */
var AggregateExchangeRatePrevote = /** @class */ (function (_super) {
    __extends(AggregateExchangeRatePrevote, _super);
    /**
     * @param hash aggregate vote hash
     * @param voter validator
     * @param submit_block block during which aggregate prevote was submitted
     */
    function AggregateExchangeRatePrevote(hash, voter, submit_block) {
        var _this = _super.call(this) || this;
        _this.hash = hash;
        _this.voter = voter;
        _this.submit_block = submit_block;
        return _this;
    }
    AggregateExchangeRatePrevote.fromAmino = function (data) {
        var hash = data.hash, voter = data.voter, submit_block = data.submit_block;
        return new AggregateExchangeRatePrevote(hash, voter, Number.parseInt(submit_block));
    };
    AggregateExchangeRatePrevote.prototype.toAmino = function () {
        var _a = this, hash = _a.hash, voter = _a.voter, submit_block = _a.submit_block;
        return {
            hash: hash,
            voter: voter,
            submit_block: submit_block.toFixed(),
        };
    };
    AggregateExchangeRatePrevote.fromData = function (data) {
        var hash = data.hash, voter = data.voter, submit_block = data.submit_block;
        return new AggregateExchangeRatePrevote(hash, voter, Number.parseInt(submit_block));
    };
    AggregateExchangeRatePrevote.prototype.toData = function () {
        var _a = this, hash = _a.hash, voter = _a.voter, submit_block = _a.submit_block;
        return {
            hash: hash,
            voter: voter,
            submit_block: submit_block.toFixed(),
        };
    };
    AggregateExchangeRatePrevote.fromProto = function (data) {
        return new AggregateExchangeRatePrevote(data.hash, data.voter, data.submitBlock.toNumber());
    };
    AggregateExchangeRatePrevote.prototype.toProto = function () {
        var _a = this, hash = _a.hash, voter = _a.voter, submit_block = _a.submit_block;
        return oracle_1.AggregateExchangeRatePrevote.fromPartial({
            hash: hash,
            submitBlock: Long.fromNumber(submit_block),
            voter: voter,
        });
    };
    return AggregateExchangeRatePrevote;
}(json_1.JSONSerializable));
exports.AggregateExchangeRatePrevote = AggregateExchangeRatePrevote;
//# sourceMappingURL=AggregateExchangeRatePrevote.js.map