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
exports.MsgWithdrawValidatorCommission = void 0;
var json_1 = require("../../../util/json");
/**
 * A validator can withdraw their outstanding commission rewards accrued from all
 * delegations (not including its self-delegation) into their associated account's
 * withdraw address.
 */
var MsgWithdrawValidatorCommission = /** @class */ (function (_super) {
    __extends(MsgWithdrawValidatorCommission, _super);
    /**
     * @param validator_address validator's operator address
     */
    function MsgWithdrawValidatorCommission(validator_address) {
        var _this = _super.call(this) || this;
        _this.validator_address = validator_address;
        return _this;
    }
    MsgWithdrawValidatorCommission.fromData = function (data) {
        var validator_address = data.value.validator_address;
        return new MsgWithdrawValidatorCommission(validator_address);
    };
    MsgWithdrawValidatorCommission.prototype.toData = function () {
        var validator_address = this.validator_address;
        return {
            type: 'distribution/MsgWithdrawValidatorCommission',
            value: {
                validator_address: validator_address,
            },
        };
    };
    return MsgWithdrawValidatorCommission;
}(json_1.JSONSerializable));
exports.MsgWithdrawValidatorCommission = MsgWithdrawValidatorCommission;
//# sourceMappingURL=MsgWithdrawValidatorCommission.js.map