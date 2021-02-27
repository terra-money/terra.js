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
exports.MsgWithdrawDelegationReward = void 0;
var json_1 = require("../../../util/json");
/**
 * A delegator can withdraw currently outstanding rewards accrued from their delegation
 * toward a validator by submitting the following message.
 *
 * The rewards will be deposited to their Withdraw Address.
 */
var MsgWithdrawDelegationReward = /** @class */ (function (_super) {
    __extends(MsgWithdrawDelegationReward, _super);
    /**
     *
     * @param delegator_address delegator's account address
     * @param validator_address validator's operator address
     */
    function MsgWithdrawDelegationReward(delegator_address, validator_address) {
        var _this = _super.call(this) || this;
        _this.delegator_address = delegator_address;
        _this.validator_address = validator_address;
        return _this;
    }
    MsgWithdrawDelegationReward.fromData = function (data) {
        var _a = data.value, delegator_address = _a.delegator_address, validator_address = _a.validator_address;
        return new MsgWithdrawDelegationReward(delegator_address, validator_address);
    };
    MsgWithdrawDelegationReward.prototype.toData = function () {
        var _a = this, delegator_address = _a.delegator_address, validator_address = _a.validator_address;
        return {
            type: 'distribution/MsgWithdrawDelegationReward',
            value: {
                delegator_address: delegator_address,
                validator_address: validator_address,
            },
        };
    };
    return MsgWithdrawDelegationReward;
}(json_1.JSONSerializable));
exports.MsgWithdrawDelegationReward = MsgWithdrawDelegationReward;
//# sourceMappingURL=MsgWithdrawDelegationReward.js.map