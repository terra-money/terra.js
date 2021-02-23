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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgAggregateExchangeRateVote = exports.aggregateVoteHash = void 0;
var json_1 = require("../../../util/json");
var MsgAggregateExchangeRatePrevote_1 = require("./MsgAggregateExchangeRatePrevote");
var Coins_1 = require("../../Coins");
var sha256_1 = __importDefault(require("crypto-js/sha256"));
/**
 * Calculates the aggregate vote hash
 * @param exchangeRates exchange rates
 * @param salt salt
 * @param validator validator operator address
 */
function aggregateVoteHash(exchangeRates, salt, validator) {
    var payload = salt + ":" + exchangeRates
        .toDecCoins()
        .toString() + ":" + validator;
    return sha256_1.default(payload).toString().substring(0, 40);
}
exports.aggregateVoteHash = aggregateVoteHash;
/**
 * Aggregate analog of MsgExchangeRateVote: submits an oracle vote for multiple denominations
 * through a single message rather than multiple messages.
 */
var MsgAggregateExchangeRateVote = /** @class */ (function (_super) {
    __extends(MsgAggregateExchangeRateVote, _super);
    /**
     * @param exchange_rate exchange rates
     * @param salt salt
     * @param feeder feeder address
     * @param validator validator operator address
     */
    function MsgAggregateExchangeRateVote(exchange_rates, salt, feeder, validator) {
        var _this = _super.call(this) || this;
        _this.salt = salt;
        _this.feeder = feeder;
        _this.validator = validator;
        _this.exchange_rates = new Coins_1.Coins(exchange_rates).toDecCoins();
        return _this;
    }
    MsgAggregateExchangeRateVote.fromData = function (data) {
        var _a = data.value, exchange_rates = _a.exchange_rates, salt = _a.salt, feeder = _a.feeder, validator = _a.validator;
        var xrs = Coins_1.Coins.fromString(exchange_rates);
        return new MsgAggregateExchangeRateVote(xrs, salt, feeder, validator);
    };
    MsgAggregateExchangeRateVote.prototype.toData = function () {
        var _a = this, exchange_rates = _a.exchange_rates, salt = _a.salt, feeder = _a.feeder, validator = _a.validator;
        return {
            type: 'oracle/MsgAggregateExchangeRateVote',
            value: {
                exchange_rates: exchange_rates.toDecCoins().toString(),
                salt: salt,
                feeder: feeder,
                validator: validator,
            },
        };
    };
    /**
     * Gets the aggregate vote hash for the MsgAggregateExchangeRateVote, for the creation of
     *  the corresponding prevote message.
     */
    MsgAggregateExchangeRateVote.prototype.getAggregateVoteHash = function () {
        return aggregateVoteHash(this.exchange_rates, this.salt, this.validator);
    };
    /**
     * You can generate the corresponding aggregate prevote message.
     * This will return a [[MsgAggregateExchangeRatePrevote]] with the proper vote hash and values,
     * determined by the current attributes of the object.
     *
     * @returns the corresponding prevote message to send
     */
    MsgAggregateExchangeRateVote.prototype.getPrevote = function () {
        return new MsgAggregateExchangeRatePrevote_1.MsgAggregateExchangeRatePrevote(this.getAggregateVoteHash(), this.feeder, this.validator);
    };
    return MsgAggregateExchangeRateVote;
}(json_1.JSONSerializable));
exports.MsgAggregateExchangeRateVote = MsgAggregateExchangeRateVote;
//# sourceMappingURL=MsgAggregateExchangeRateVote.js.map