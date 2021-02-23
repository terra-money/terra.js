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
exports.AggregateExchangeRateVote = void 0;
var json_1 = require("../../util/json");
var Coin_1 = require("../Coin");
var Coins_1 = require("../Coins");
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
    AggregateExchangeRateVote.fromData = function (data) {
        var exchange_rate_tuples = data.exchange_rate_tuples, voter = data.voter;
        var xr_coins = new Coins_1.Coins(exchange_rate_tuples.map(function (t) { return new Coin_1.Coin(t.denom, t.exchange_rate); })).toDecCoins();
        return new AggregateExchangeRateVote(xr_coins, voter);
    };
    AggregateExchangeRateVote.prototype.toData = function () {
        var _a = this, exchange_rate_tuples = _a.exchange_rate_tuples, voter = _a.voter;
        return {
            exchange_rate_tuples: exchange_rate_tuples.map(function (c) { return ({
                denom: c.denom,
                exchange_rate: c.amount.toString(),
            }); }),
            voter: voter,
        };
    };
    return AggregateExchangeRateVote;
}(json_1.JSONSerializable));
exports.AggregateExchangeRateVote = AggregateExchangeRateVote;
//# sourceMappingURL=AggregateExchangeRateVote.js.map