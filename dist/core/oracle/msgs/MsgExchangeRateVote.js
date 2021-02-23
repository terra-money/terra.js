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
exports.MsgExchangeRateVote = exports.voteHash = void 0;
var json_1 = require("../../../util/json");
var numeric_1 = require("../../numeric");
var MsgExchangeRatePrevote_1 = require("./MsgExchangeRatePrevote");
var sha256_1 = __importDefault(require("crypto-js/sha256"));
/**
 * Calculates the vote hash
 * @param exchangeRate exchange rate
 * @param denom denomination
 * @param salt salt
 * @param validator validator operator address
 */
function voteHash(exchangeRate, denom, salt, validator) {
    var payload = salt + ":" + exchangeRate + ":" + denom + ":" + validator;
    return sha256_1.default(payload).toString().substring(0, 40);
}
exports.voteHash = voteHash;
/**
 * Every validator in the validating set (top 100 in total bonded Luna) is required to
 * submit a vote for the current exchange rate of LUNA for every active denomination
 * once per vote period.
 *
 * Votes are registered through submitting a [[MsgExchangeRateVote]] message, which must
 * correspond to a [[MsgExchangeRatePrevote]] submitted in the previous vote period.
 */
var MsgExchangeRateVote = /** @class */ (function (_super) {
    __extends(MsgExchangeRateVote, _super);
    /**
     * @param exchange_rate exchange rate
     * @param denom denomination
     * @param salt salt
     * @param feeder feeder address
     * @param validator validator operator address
     */
    function MsgExchangeRateVote(exchange_rate, denom, salt, feeder, validator) {
        var _this = _super.call(this) || this;
        _this.denom = denom;
        _this.salt = salt;
        _this.feeder = feeder;
        _this.validator = validator;
        _this.exchange_rate = new numeric_1.Dec(exchange_rate);
        return _this;
    }
    MsgExchangeRateVote.fromData = function (data) {
        var _a = data.value, exchange_rate = _a.exchange_rate, salt = _a.salt, denom = _a.denom, feeder = _a.feeder, validator = _a.validator;
        return new MsgExchangeRateVote(exchange_rate, denom, salt, feeder, validator);
    };
    MsgExchangeRateVote.prototype.toData = function () {
        var _a = this, exchange_rate = _a.exchange_rate, salt = _a.salt, denom = _a.denom, feeder = _a.feeder, validator = _a.validator;
        return {
            type: 'oracle/MsgExchangeRateVote',
            value: {
                exchange_rate: exchange_rate.toString(),
                denom: denom,
                salt: salt,
                feeder: feeder,
                validator: validator,
            },
        };
    };
    /**
     * Gets the vote hash for the MsgExchangeRateVote, for the creation of the corresponding
     * prevote message.
     */
    MsgExchangeRateVote.prototype.getVoteHash = function () {
        return voteHash(this.exchange_rate.toString(), this.denom, this.salt, this.validator);
    };
    /**
     * You can generate the corresponding prevote message through the prevote property.
     * This will return a [[MsgExchangeRatePrevote]] with the proper vote hash and values,
     * determined by the current attributes of the object.
     *
     * @returns the corresponding prevote message to send
     */
    MsgExchangeRateVote.prototype.getPrevote = function () {
        return new MsgExchangeRatePrevote_1.MsgExchangeRatePrevote(this.getVoteHash(), this.denom, this.feeder, this.validator);
    };
    return MsgExchangeRateVote;
}(json_1.JSONSerializable));
exports.MsgExchangeRateVote = MsgExchangeRateVote;
//# sourceMappingURL=MsgExchangeRateVote.js.map