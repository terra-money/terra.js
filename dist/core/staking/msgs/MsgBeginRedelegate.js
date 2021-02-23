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
exports.MsgBeginRedelegate = void 0;
var json_1 = require("../../../util/json");
var Coin_1 = require("../../Coin");
/**
 * A delegator can choose to redelegate their bonded Luna and transfer a delegation
 * amount from one validator to another. Unlike undelegating, redelegations do not incur
 * a 21-day unbonding period and happen immediately.
 */
var MsgBeginRedelegate = /** @class */ (function (_super) {
    __extends(MsgBeginRedelegate, _super);
    /**
     *
     * @param delegator_address delegator's account address
     * @param validator_src_address validator to undelegate from
     * @param validator_dst_address validator to delegate to
     * @param amount LUNA to be redelegated
     */
    function MsgBeginRedelegate(delegator_address, validator_src_address, validator_dst_address, amount) {
        var _this = _super.call(this) || this;
        _this.delegator_address = delegator_address;
        _this.validator_src_address = validator_src_address;
        _this.validator_dst_address = validator_dst_address;
        _this.amount = amount;
        return _this;
    }
    MsgBeginRedelegate.fromData = function (data) {
        var _a = data.value, delegator_address = _a.delegator_address, validator_src_address = _a.validator_src_address, validator_dst_address = _a.validator_dst_address, amount = _a.amount;
        return new MsgBeginRedelegate(delegator_address, validator_src_address, validator_dst_address, Coin_1.Coin.fromData(amount));
    };
    MsgBeginRedelegate.prototype.toData = function () {
        var _a = this, delegator_address = _a.delegator_address, validator_src_address = _a.validator_src_address, validator_dst_address = _a.validator_dst_address, amount = _a.amount;
        return {
            type: 'staking/MsgBeginRedelegate',
            value: {
                delegator_address: delegator_address,
                validator_src_address: validator_src_address,
                validator_dst_address: validator_dst_address,
                amount: amount.toData(),
            },
        };
    };
    return MsgBeginRedelegate;
}(json_1.JSONSerializable));
exports.MsgBeginRedelegate = MsgBeginRedelegate;
//# sourceMappingURL=MsgBeginRedelegate.js.map