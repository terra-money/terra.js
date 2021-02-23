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
exports.MsgDelegateFeedConsent = void 0;
var json_1 = require("../../../util/json");
/**
 * A **feeeder** is an account which is responsible for signing transactions with Oracle vote
 * and prevote messages on behalf of the validator. The blockchain will reject
 * [[MsgExchangeRateVote]] and [[MsgExchangeRatePrevote]] messages in transactions
 * signed by an
 * account different than the registered feeder.
 *
 * The following message registers a validator's feeder address.
 */
var MsgDelegateFeedConsent = /** @class */ (function (_super) {
    __extends(MsgDelegateFeedConsent, _super);
    /**
     * @param operator validator's operator address
     * @param delegate account address to set to feeder
     */
    function MsgDelegateFeedConsent(operator, delegate) {
        var _this = _super.call(this) || this;
        _this.operator = operator;
        _this.delegate = delegate;
        return _this;
    }
    MsgDelegateFeedConsent.fromData = function (data) {
        var _a = data.value, operator = _a.operator, delegate = _a.delegate;
        return new MsgDelegateFeedConsent(operator, delegate);
    };
    MsgDelegateFeedConsent.prototype.toData = function () {
        var _a = this, operator = _a.operator, delegate = _a.delegate;
        return {
            type: 'oracle/MsgDelegateFeedConsent',
            value: {
                operator: operator,
                delegate: delegate,
            },
        };
    };
    return MsgDelegateFeedConsent;
}(json_1.JSONSerializable));
exports.MsgDelegateFeedConsent = MsgDelegateFeedConsent;
//# sourceMappingURL=MsgDelegateFeedConsent.js.map