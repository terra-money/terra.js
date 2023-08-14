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
exports.MsgAggregateExchangeRateVote = exports.aggregateVoteHash = void 0;
var SHA256_1 = require("jscrypto/SHA256");
var json_1 = require("../../../util/json");
var MsgAggregateExchangeRatePrevote_1 = require("./MsgAggregateExchangeRatePrevote");
var Coins_1 = require("../../Coins");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var tx_1 = require("@classic-terra/terra.proto/terra/oracle/v1beta1/tx");
/**
 * Calculates the aggregate vote hash
 * @param exchangeRates exchange rates
 * @param salt salt
 * @param validator validator operator address
 */
function aggregateVoteHash(exchangeRates, salt, validator) {
    var payload = "".concat(salt, ":").concat(exchangeRates
        .toDecCoins()
        .toString(), ":").concat(validator);
    return SHA256_1.SHA256.hash(payload).toString().substring(0, 40);
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
    MsgAggregateExchangeRateVote.fromAmino = function (data, isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        var _a = data.value, exchange_rates = _a.exchange_rates, salt = _a.salt, feeder = _a.feeder, validator = _a.validator;
        var xrs = Coins_1.Coins.fromString(exchange_rates);
        return new MsgAggregateExchangeRateVote(xrs, salt, feeder, validator);
    };
    MsgAggregateExchangeRateVote.prototype.toAmino = function (isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
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
    MsgAggregateExchangeRateVote.fromData = function (proto, isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        var exchange_rates = proto.exchange_rates, salt = proto.salt, feeder = proto.feeder, validator = proto.validator;
        var xrs = Coins_1.Coins.fromString(exchange_rates);
        return new MsgAggregateExchangeRateVote(xrs, salt, feeder, validator);
    };
    MsgAggregateExchangeRateVote.prototype.toData = function (isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        var _a = this, exchange_rates = _a.exchange_rates, salt = _a.salt, feeder = _a.feeder, validator = _a.validator;
        return {
            '@type': '/terra.oracle.v1beta1.MsgAggregateExchangeRateVote',
            exchange_rates: exchange_rates.toDecCoins().toString(),
            salt: salt,
            feeder: feeder,
            validator: validator,
        };
    };
    MsgAggregateExchangeRateVote.fromProto = function (proto, isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        var xrs = Coins_1.Coins.fromString(proto.exchangeRates);
        return new MsgAggregateExchangeRateVote(xrs, proto.salt, proto.feeder, proto.validator);
    };
    MsgAggregateExchangeRateVote.prototype.toProto = function (isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        var _a = this, exchange_rates = _a.exchange_rates, salt = _a.salt, feeder = _a.feeder, validator = _a.validator;
        return tx_1.MsgAggregateExchangeRateVote.fromPartial({
            exchangeRates: exchange_rates.toString(),
            feeder: feeder,
            salt: salt,
            validator: validator,
        });
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
    MsgAggregateExchangeRateVote.prototype.packAny = function (isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        return any_1.Any.fromPartial({
            typeUrl: '/terra.oracle.v1beta1.MsgAggregateExchangeRateVote',
            value: tx_1.MsgAggregateExchangeRateVote.encode(this.toProto(isClassic)).finish(),
        });
    };
    MsgAggregateExchangeRateVote.unpackAny = function (msgAny, isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        return MsgAggregateExchangeRateVote.fromProto(tx_1.MsgAggregateExchangeRateVote.decode(msgAny.value), isClassic);
    };
    return MsgAggregateExchangeRateVote;
}(json_1.JSONSerializable));
exports.MsgAggregateExchangeRateVote = MsgAggregateExchangeRateVote;
//# sourceMappingURL=MsgAggregateExchangeRateVote.js.map