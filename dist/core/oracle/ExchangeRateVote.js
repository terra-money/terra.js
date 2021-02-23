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
exports.ExchangeRateVote = void 0;
var json_1 = require("../../util/json");
var numeric_1 = require("../numeric");
/**
 * The following objects capture information from the Oracle API. To submit exchange
 * rate votes or prevotes, you'll need to create a transaction with [[MsgExchangeRateVote]]
 * or [[MsgExchangeRatePrevote]] and broadcast it.
 *
 *
 */
/**
 * Stores information about data about Oracle votes fetched from the blockchain.
 */
var ExchangeRateVote = /** @class */ (function (_super) {
    __extends(ExchangeRateVote, _super);
    /**
     *
     * @param exchange_rate Exchange rate reported.
     * @param denom Denomination against LUNA reported.
     * @param voter Voting validator's operator address.
     */
    function ExchangeRateVote(exchange_rate, denom, voter) {
        var _this = _super.call(this) || this;
        _this.exchange_rate = exchange_rate;
        _this.denom = denom;
        _this.voter = voter;
        return _this;
    }
    ExchangeRateVote.fromData = function (data) {
        var exchange_rate = data.exchange_rate, denom = data.denom, voter = data.voter;
        return new ExchangeRateVote(new numeric_1.Dec(exchange_rate), denom, voter);
    };
    ExchangeRateVote.prototype.toData = function () {
        var _a = this, exchange_rate = _a.exchange_rate, denom = _a.denom, voter = _a.voter;
        return {
            exchange_rate: exchange_rate.toString(),
            denom: denom,
            voter: voter,
        };
    };
    return ExchangeRateVote;
}(json_1.JSONSerializable));
exports.ExchangeRateVote = ExchangeRateVote;
//# sourceMappingURL=ExchangeRateVote.js.map