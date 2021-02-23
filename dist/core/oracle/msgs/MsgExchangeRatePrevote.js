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
exports.MsgExchangeRatePrevote = void 0;
var json_1 = require("../../../util/json");
/**
 * In order to prevent validators from copying each others' price votes, voting occurs
 * in 2 stages. Firstly, you must pre-commit to a price by submitting a
 * MsgExchangeRatePrevote containing a hash, and then reveal your price in the
 * subsequent vote period.
 *
 * The vote hash reported in the prevote must match the hash of the vote's data in order
 * for the vote to count. Otherwise, it is automatically a miss.
 */
var MsgExchangeRatePrevote = /** @class */ (function (_super) {
    __extends(MsgExchangeRatePrevote, _super);
    /**
     * @param hash vote hash
     * @param denom denom for reporting the exchange rate
     * @param feeder validator's feeder account address
     * @param validator validator's operator address
     */
    function MsgExchangeRatePrevote(hash, denom, feeder, validator) {
        var _this = _super.call(this) || this;
        _this.hash = hash;
        _this.denom = denom;
        _this.feeder = feeder;
        _this.validator = validator;
        return _this;
    }
    MsgExchangeRatePrevote.fromData = function (data) {
        var _a = data.value, hash = _a.hash, denom = _a.denom, feeder = _a.feeder, validator = _a.validator;
        return new MsgExchangeRatePrevote(hash, denom, feeder, validator);
    };
    MsgExchangeRatePrevote.prototype.toData = function () {
        var _a = this, hash = _a.hash, denom = _a.denom, feeder = _a.feeder, validator = _a.validator;
        return {
            type: 'oracle/MsgExchangeRatePrevote',
            value: {
                hash: hash,
                denom: denom,
                feeder: feeder,
                validator: validator,
            },
        };
    };
    return MsgExchangeRatePrevote;
}(json_1.JSONSerializable));
exports.MsgExchangeRatePrevote = MsgExchangeRatePrevote;
//# sourceMappingURL=MsgExchangeRatePrevote.js.map