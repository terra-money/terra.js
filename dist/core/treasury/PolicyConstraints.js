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
exports.PolicyConstraints = void 0;
var json_1 = require("../../util/json");
var Coin_1 = require("../Coin");
var numeric_1 = require("../numeric");
/**
 * This captures the Treasury module's `tax_policy` and `reward_policy` parameters, which
 * determine how the Tax Rate and Reward Weight values are allowed to change.
 */
var PolicyConstraints = /** @class */ (function (_super) {
    __extends(PolicyConstraints, _super);
    /**
     *
     * @param rate_min minimum value
     * @param rate_max maximum value
     * @param cap Tax Cap (only applicable for Tax Rate)
     * @param change_max max change %
     */
    function PolicyConstraints(rate_min, rate_max, cap, change_max) {
        var _this = _super.call(this) || this;
        _this.cap = cap;
        _this.rate_min = new numeric_1.Dec(rate_min);
        _this.rate_max = new numeric_1.Dec(rate_max);
        _this.change_max = new numeric_1.Dec(change_max);
        return _this;
    }
    PolicyConstraints.fromData = function (data) {
        var rate_min = data.rate_min, rate_max = data.rate_max, cap = data.cap, change_max = data.change_max;
        return new PolicyConstraints(rate_min, rate_max, Coin_1.Coin.fromData(cap), change_max);
    };
    PolicyConstraints.prototype.toData = function () {
        var _a = this, rate_min = _a.rate_min, rate_max = _a.rate_max, cap = _a.cap, change_max = _a.change_max;
        return {
            rate_min: rate_min.toString(),
            rate_max: rate_max.toString(),
            cap: cap.toData(),
            change_max: change_max.toString(),
        };
    };
    /**
     * You can simulate the result of the clamping algorithm, which subjects updates in
     * rate to the rules defined by the `PolicyConstraints`.
     *
     * @param prevRate previous rate
     * @param newRate next rate
     * @returns New rate, after clamping constraints have been applied
     */
    PolicyConstraints.prototype.clamp = function (prevRate, newRate) {
        var p = new numeric_1.Dec(prevRate); // prev
        var n = new numeric_1.Dec(newRate); // new
        if (n.lt(this.rate_min)) {
            n = this.rate_min;
        }
        else if (n.gt(this.rate_max)) {
            n = this.rate_max;
        }
        var delta = n.sub(p);
        if (n.gt(p)) {
            if (delta.gt(this.change_max)) {
                n = p.add(this.change_max);
            }
        }
        else {
            if (delta.abs().gt(this.change_max)) {
                n = p.sub(this.change_max);
            }
        }
        return n;
    };
    return PolicyConstraints;
}(json_1.JSONSerializable));
exports.PolicyConstraints = PolicyConstraints;
//# sourceMappingURL=PolicyConstraints.js.map