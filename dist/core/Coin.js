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
exports.Coin = void 0;
var json_1 = require("../util/json");
var numeric_1 = require("./numeric");
/**
 * Captures `sdk.Coin` and `sdk.DecCoin` from Cosmos SDK. A composite value that combines
 * a denomination with an amount value. Coins are immutable once created, and operations
 * that return Coin will return a new Coin. See [[Coins]] for a collection of Coin objects.
 */
var Coin = /** @class */ (function (_super) {
    __extends(Coin, _super);
    /**
     * Creates a new coin. Depending on the type of amount, it will be converted to an
     * integer coin or decimal coin.
     *
     * @param denom denomination
     * @param amount coin's amount
     */
    function Coin(denom, amount) {
        var _this = _super.call(this) || this;
        _this.denom = denom;
        _this.amount = numeric_1.Numeric.parse(amount);
        return _this;
    }
    Coin.fromData = function (data) {
        var denom = data.denom, amount = data.amount;
        return new Coin(denom, amount);
    };
    /**
     * Checks whether the Coin is an Integer coin.
     */
    Coin.prototype.isIntCoin = function () {
        // TODO: convert into typeguard
        return this.amount instanceof numeric_1.Int;
    };
    /**
     * Checks whether the Coin is a Decimal coin.
     */
    Coin.prototype.isDecCoin = function () {
        return this.amount instanceof numeric_1.Dec;
    };
    /**
     * Turns the Coin into an Integer coin.
     */
    Coin.prototype.toIntCoin = function () {
        return new Coin(this.denom, new numeric_1.Int(this.amount));
    };
    /**
     * Turns the Coin into a Decimal coin.
     */
    Coin.prototype.toDecCoin = function () {
        return new Coin(this.denom, new numeric_1.Dec(this.amount));
    };
    Coin.prototype.toData = function () {
        var _a = this, denom = _a.denom, amount = _a.amount;
        return {
            denom: denom,
            amount: amount.toString(),
        };
    };
    /**
     * Outputs `<amount><denom>`.
     *
     * Eg: `Coin('uluna', 1500) -> 1500uluna`
     */
    Coin.prototype.toString = function () {
        var amount = this.amount.toFixed();
        if (this.isDecCoin() && amount.indexOf('.') === -1) {
            return amount + ".0" + this.denom;
        }
        return "" + amount + this.denom;
    };
    Coin.fromString = function (str) {
        var m = str.match(/^(-?[0-9]+(\.[0-9]+)?)([a-zA-Z]+)$/);
        if (m === null) {
            throw new Error("failed to parse to Coin: " + str);
        }
        var amount = m[1];
        var denom = m[3];
        return new Coin(denom, amount);
    };
    /**
     * Creates a new Coin adding to the current value.
     *
     * @param other
     */
    Coin.prototype.add = function (other) {
        var otherAmount;
        if (other instanceof Coin) {
            if (other.denom !== this.denom) {
                throw new Coin.ArithmeticError("cannot add two Coins of different denoms: " + this.denom + " and " + other.denom);
            }
            otherAmount = other.amount;
        }
        else {
            otherAmount = other;
        }
        otherAmount = numeric_1.Numeric.parse(otherAmount);
        return new Coin(this.denom, this.amount.add(otherAmount));
    };
    /**
     * Creates a new Coin subtracting from the current value.
     * @param other
     */
    Coin.prototype.sub = function (other) {
        var otherAmount;
        if (other instanceof Coin) {
            if (other.denom !== this.denom) {
                throw new Coin.ArithmeticError("cannot subtract two Coins of different denoms: " + this.denom + " and " + other.denom);
            }
            otherAmount = other.amount;
        }
        else {
            otherAmount = other;
        }
        otherAmount = numeric_1.Numeric.parse(otherAmount);
        return new Coin(this.denom, this.amount.sub(otherAmount));
    };
    /**
     * Multiplies the current value with an amount.
     * @param other
     */
    Coin.prototype.mul = function (other) {
        var otherAmount = numeric_1.Numeric.parse(other);
        return new Coin(this.denom, this.amount.mul(otherAmount));
    };
    /**
     * Divides the current value with an amount.
     * @param other
     */
    Coin.prototype.div = function (other) {
        var otherAmount = numeric_1.Numeric.parse(other);
        return new Coin(this.denom, this.amount.div(otherAmount));
    };
    /**
     * Modulo the current value with an amount.
     * @param other
     */
    Coin.prototype.mod = function (other) {
        var otherAmount = numeric_1.Numeric.parse(other);
        return new Coin(this.denom, this.amount.mod(otherAmount));
    };
    return Coin;
}(json_1.JSONSerializable));
exports.Coin = Coin;
(function (Coin) {
    var ArithmeticError = /** @class */ (function () {
        function ArithmeticError(message) {
            this.message = message;
        }
        return ArithmeticError;
    }());
    Coin.ArithmeticError = ArithmeticError;
})(Coin = exports.Coin || (exports.Coin = {}));
exports.Coin = Coin;
//# sourceMappingURL=Coin.js.map