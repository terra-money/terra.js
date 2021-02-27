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
exports.StdFee = void 0;
var json_1 = require("../util/json");
var Coins_1 = require("./Coins");
var numeric_1 = require("./numeric");
/**
 * A transaction must include a fee, otherwise it will be rejected.
 */
var StdFee = /** @class */ (function (_super) {
    __extends(StdFee, _super);
    /**
     * Creates a new StdFee object.
     * @param gas gas limit
     * @param amount amount to be paid to validator
     */
    function StdFee(gas, amount) {
        var _this = _super.call(this) || this;
        _this.gas = gas;
        _this.amount = new Coins_1.Coins(amount);
        return _this;
    }
    StdFee.fromData = function (data) {
        var gas = data.gas, amount = data.amount;
        return new StdFee(Number.parseInt(gas), Coins_1.Coins.fromData(amount));
    };
    StdFee.prototype.toData = function () {
        return {
            gas: new numeric_1.Int(this.gas).toString(),
            amount: this.amount.toData(),
        };
    };
    /**
     * Gets the mininimum gas prices implied by the fee. Minimum gas prices are `fee amount / gas`.
     */
    StdFee.prototype.gasPrices = function () {
        return this.amount.toDecCoins().div(this.gas);
    };
    return StdFee;
}(json_1.JSONSerializable));
exports.StdFee = StdFee;
//# sourceMappingURL=StdFee.js.map