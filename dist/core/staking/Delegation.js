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
exports.Delegation = void 0;
var json_1 = require("../../util/json");
var numeric_1 = require("../numeric");
var Coin_1 = require("../Coin");
/**
 * Stores information about the status of a delegation between a delegator and validator, fetched from the blockchain.
 */
var Delegation = /** @class */ (function (_super) {
    __extends(Delegation, _super);
    /**
     * @param delegator_address 	delegator's account address
     * @param validator_address 	validator's operator address
     * @param shares 	delegator's shares
     * @param balance balance of the delegation
     */
    function Delegation(delegator_address, validator_address, shares, balance) {
        var _this = _super.call(this) || this;
        _this.delegator_address = delegator_address;
        _this.validator_address = validator_address;
        _this.shares = shares;
        _this.balance = balance;
        return _this;
    }
    Delegation.fromData = function (data) {
        var delegator_address = data.delegator_address, validator_address = data.validator_address, shares = data.shares, balance = data.balance;
        return new Delegation(delegator_address, validator_address, new numeric_1.Dec(shares), Coin_1.Coin.fromData(balance));
    };
    Delegation.prototype.toData = function () {
        var _a = this, delegator_address = _a.delegator_address, validator_address = _a.validator_address, shares = _a.shares, balance = _a.balance;
        return {
            delegator_address: delegator_address,
            validator_address: validator_address,
            shares: shares.toString(),
            balance: balance.toData(),
        };
    };
    return Delegation;
}(json_1.JSONSerializable));
exports.Delegation = Delegation;
//# sourceMappingURL=Delegation.js.map