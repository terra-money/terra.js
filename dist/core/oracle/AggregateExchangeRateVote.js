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
exports.ExchangeRateTuple = exports.AggregateExchangeRateVote = void 0;
var json_1 = require("../../util/json");
var oracle_1 = require("@classic-terra/terra.proto/terra/oracle/v1beta1/oracle");
var numeric_1 = require("../numeric");
/**
 * Stores information about data about Oracle aggregate vote fetched from the blockchain.
 */
var AggregateExchangeRateVote = /** @class */ (function (_super) {
    __extends(AggregateExchangeRateVote, _super);
    /**
     * @param exchange_rate_tuples exchange rates for LUNA
     * @param voter validator
     */
    function AggregateExchangeRateVote(exchange_rate_tuples, voter) {
        var _this = _super.call(this) || this;
        _this.exchange_rate_tuples = exchange_rate_tuples;
        _this.voter = voter;
        return _this;
    }
    AggregateExchangeRateVote.fromAmino = function (data) {
        var exchange_rate_tuples = data.exchange_rate_tuples, voter = data.voter;
        return new AggregateExchangeRateVote(exchange_rate_tuples.map(function (t) { return ExchangeRateTuple.fromAmino(t); }), voter);
    };
    AggregateExchangeRateVote.prototype.toAmino = function () {
        var _a = this, exchange_rate_tuples = _a.exchange_rate_tuples, voter = _a.voter;
        return {
            exchange_rate_tuples: exchange_rate_tuples.map(function (e) { return e.toAmino(); }),
            voter: voter,
        };
    };
    AggregateExchangeRateVote.fromData = function (data) {
        var exchange_rate_tuples = data.exchange_rate_tuples, voter = data.voter;
        return new AggregateExchangeRateVote(exchange_rate_tuples.map(function (t) { return ExchangeRateTuple.fromData(t); }), voter);
    };
    AggregateExchangeRateVote.prototype.toData = function () {
        var _a = this, exchange_rate_tuples = _a.exchange_rate_tuples, voter = _a.voter;
        return {
            exchange_rate_tuples: exchange_rate_tuples.map(function (e) { return e.toData(); }),
            voter: voter,
        };
    };
    AggregateExchangeRateVote.fromProto = function (data) {
        return new AggregateExchangeRateVote(data.exchangeRateTuples.map(function (t) { return ExchangeRateTuple.fromProto(t); }), data.voter);
    };
    AggregateExchangeRateVote.prototype.toProto = function () {
        var _a = this, exchange_rate_tuples = _a.exchange_rate_tuples, voter = _a.voter;
        return oracle_1.AggregateExchangeRateVote.fromPartial({
            exchangeRateTuples: exchange_rate_tuples.map(function (t) { return t.toProto(); }),
            voter: voter,
        });
    };
    return AggregateExchangeRateVote;
}(json_1.JSONSerializable));
exports.AggregateExchangeRateVote = AggregateExchangeRateVote;
var ExchangeRateTuple = /** @class */ (function (_super) {
    __extends(ExchangeRateTuple, _super);
    function ExchangeRateTuple(denom, exchange_rate) {
        var _this = _super.call(this) || this;
        _this.denom = denom;
        _this.exchange_rate = new numeric_1.Dec(exchange_rate);
        return _this;
    }
    ExchangeRateTuple.fromAmino = function (data) {
        var denom = data.denom, exchange_rate = data.exchange_rate;
        return new ExchangeRateTuple(denom, exchange_rate);
    };
    ExchangeRateTuple.prototype.toAmino = function () {
        var _a = this, denom = _a.denom, exchange_rate = _a.exchange_rate;
        return {
            denom: denom,
            exchange_rate: exchange_rate.toString(),
        };
    };
    ExchangeRateTuple.fromData = function (data) {
        var denom = data.denom, exchange_rate = data.exchange_rate;
        return new ExchangeRateTuple(denom, exchange_rate);
    };
    ExchangeRateTuple.prototype.toData = function () {
        var _a = this, denom = _a.denom, exchange_rate = _a.exchange_rate;
        return {
            denom: denom,
            exchange_rate: exchange_rate.toString(),
        };
    };
    ExchangeRateTuple.fromProto = function (proto) {
        return new ExchangeRateTuple(proto.denom, proto.exchangeRate);
    };
    ExchangeRateTuple.prototype.toProto = function () {
        var _a = this, denom = _a.denom, exchange_rate = _a.exchange_rate;
        return oracle_1.ExchangeRateTuple.fromPartial({
            denom: denom,
            exchangeRate: exchange_rate.toString(),
        });
    };
    return ExchangeRateTuple;
}(json_1.JSONSerializable));
exports.ExchangeRateTuple = ExchangeRateTuple;
//# sourceMappingURL=AggregateExchangeRateVote.js.map