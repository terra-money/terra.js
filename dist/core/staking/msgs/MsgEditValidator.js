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
exports.MsgEditValidator = void 0;
var json_1 = require("../../../util/json");
var numeric_1 = require("../../numeric");
/**
 * A validator can edit its delegate information, such as moniker, website, commission
 * rate, etc.
 *
 * You must use special or sentinel values to inform that you want to leave the current
 * field untouched. For `Description`,` you should start with [[MsgEditValidator.DESC_DO_NOT_MODIFY]] and
 * change each field you wish to modify individually.
 */
var MsgEditValidator = /** @class */ (function (_super) {
    __extends(MsgEditValidator, _super);
    /**
     * @param Description new description to apply
     * @param address new address to apply
     * @param commission_rate new commission rates to apply
     * @param min_self_delegation new min self delegation
     */
    function MsgEditValidator(Description, address, commission_rate, min_self_delegation) {
        var _this = _super.call(this) || this;
        _this.Description = Description;
        _this.address = address;
        _this.commission_rate = commission_rate;
        _this.min_self_delegation = min_self_delegation;
        return _this;
    }
    MsgEditValidator.fromData = function (data) {
        var _a = data.value, Description = _a.Description, address = _a.address, commission_rate = _a.commission_rate, min_self_delegation = _a.min_self_delegation;
        return new MsgEditValidator(Description, address, commission_rate ? new numeric_1.Dec(commission_rate) : undefined, min_self_delegation ? new numeric_1.Int(min_self_delegation) : undefined);
    };
    MsgEditValidator.prototype.toData = function () {
        var _a = this, Description = _a.Description, address = _a.address, commission_rate = _a.commission_rate, min_self_delegation = _a.min_self_delegation;
        return {
            type: 'staking/MsgEditValidator',
            value: {
                Description: Description,
                address: address,
                commission_rate: commission_rate ? commission_rate.toString() : null,
                min_self_delegation: min_self_delegation
                    ? min_self_delegation.toString()
                    : null,
            },
        };
    };
    return MsgEditValidator;
}(json_1.JSONSerializable));
exports.MsgEditValidator = MsgEditValidator;
(function (MsgEditValidator) {
    MsgEditValidator.DESC_DO_NOT_MODIFY = {
        moniker: '[do-not-modify]',
        website: '[do-not-modify]',
        identity: '[do-not-modify]',
        details: '[do-not-modify]',
    };
})(MsgEditValidator = exports.MsgEditValidator || (exports.MsgEditValidator = {}));
exports.MsgEditValidator = MsgEditValidator;
//# sourceMappingURL=MsgEditValidator.js.map