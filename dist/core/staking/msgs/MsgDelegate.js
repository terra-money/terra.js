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
exports.MsgDelegate = void 0;
var Coin_1 = require("../../Coin");
var json_1 = require("../../../util/json");
/**
 * A delegator can submit this message to send more Luna to be staked through a
 * validator delegate.
 */
var MsgDelegate = /** @class */ (function (_super) {
    __extends(MsgDelegate, _super);
    /**
     *
     * @param delegator_address delegator's account address
     * @param validator_address validator's operator address
     * @param amount amount of LUNA to be sent for delegation
     */
    function MsgDelegate(delegator_address, validator_address, amount) {
        var _this = _super.call(this) || this;
        _this.delegator_address = delegator_address;
        _this.validator_address = validator_address;
        _this.amount = amount;
        return _this;
    }
    MsgDelegate.fromData = function (data) {
        var _a = data.value, delegator_address = _a.delegator_address, validator_address = _a.validator_address, amount = _a.amount;
        return new MsgDelegate(delegator_address, validator_address, Coin_1.Coin.fromData(amount));
    };
    MsgDelegate.prototype.toData = function () {
        var _a = this, delegator_address = _a.delegator_address, validator_address = _a.validator_address, amount = _a.amount;
        return {
            type: 'staking/MsgDelegate',
            value: {
                delegator_address: delegator_address,
                validator_address: validator_address,
                amount: amount.toData(),
            },
        };
    };
    return MsgDelegate;
}(json_1.JSONSerializable));
exports.MsgDelegate = MsgDelegate;
//# sourceMappingURL=MsgDelegate.js.map