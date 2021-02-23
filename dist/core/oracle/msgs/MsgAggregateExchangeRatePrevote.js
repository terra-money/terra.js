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
exports.MsgAggregateExchangeRatePrevote = void 0;
var json_1 = require("../../../util/json");
/**
 * Aggregate analog of MsgExchangeRatePrevote
 */
var MsgAggregateExchangeRatePrevote = /** @class */ (function (_super) {
    __extends(MsgAggregateExchangeRatePrevote, _super);
    /**
     * @param hash vote hash
     * @param feeder validator's feeder account address
     * @param validator validator's operator address
     */
    function MsgAggregateExchangeRatePrevote(hash, feeder, validator) {
        var _this = _super.call(this) || this;
        _this.hash = hash;
        _this.feeder = feeder;
        _this.validator = validator;
        return _this;
    }
    MsgAggregateExchangeRatePrevote.fromData = function (data) {
        var _a = data.value, hash = _a.hash, feeder = _a.feeder, validator = _a.validator;
        return new MsgAggregateExchangeRatePrevote(hash, feeder, validator);
    };
    MsgAggregateExchangeRatePrevote.prototype.toData = function () {
        var _a = this, hash = _a.hash, feeder = _a.feeder, validator = _a.validator;
        return {
            type: 'oracle/MsgAggregateExchangeRatePrevote',
            value: {
                hash: hash,
                feeder: feeder,
                validator: validator,
            },
        };
    };
    return MsgAggregateExchangeRatePrevote;
}(json_1.JSONSerializable));
exports.MsgAggregateExchangeRatePrevote = MsgAggregateExchangeRatePrevote;
//# sourceMappingURL=MsgAggregateExchangeRatePrevote.js.map