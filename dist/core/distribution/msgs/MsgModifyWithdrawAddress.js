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
exports.MsgModifyWithdrawAddress = void 0;
var json_1 = require("../../../util/json");
/**
 * A validator can withdraw their outstanding commission rewards accrued from all
 * delegations (not including its self-delegation) into their associated account's
 * withdraw address.
 */
var MsgModifyWithdrawAddress = /** @class */ (function (_super) {
    __extends(MsgModifyWithdrawAddress, _super);
    /**
     * @param delegator_address delegator's account address
     * @param withdraw_address desired new withdraw address
     */
    function MsgModifyWithdrawAddress(delegator_address, withdraw_address) {
        var _this = _super.call(this) || this;
        _this.delegator_address = delegator_address;
        _this.withdraw_address = withdraw_address;
        return _this;
    }
    MsgModifyWithdrawAddress.fromData = function (data) {
        var _a = data.value, delegator_address = _a.delegator_address, withdraw_address = _a.withdraw_address;
        return new MsgModifyWithdrawAddress(delegator_address, withdraw_address);
    };
    MsgModifyWithdrawAddress.prototype.toData = function () {
        var _a = this, delegator_address = _a.delegator_address, withdraw_address = _a.withdraw_address;
        return {
            type: 'distribution/MsgModifyWithdrawAddress',
            value: {
                delegator_address: delegator_address,
                withdraw_address: withdraw_address,
            },
        };
    };
    return MsgModifyWithdrawAddress;
}(json_1.JSONSerializable));
exports.MsgModifyWithdrawAddress = MsgModifyWithdrawAddress;
//# sourceMappingURL=MsgModifyWithdrawAddress.js.map