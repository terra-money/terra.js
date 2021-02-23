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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coins = void 0;
var Coin_1 = require("./Coin");
var json_1 = require("../util/json");
/**
 * Analagous to `sdk.Coins` and `sdk.DecCoins` from Cosmos-SDK, and represents a collection
 * of [[Coin]] objects.
 *
 */
var Coins = /** @class */ (function (_super) {
    __extends(Coins, _super);
    /**
     * @param arg coins to input
     */
    function Coins(arg) {
        if (arg === void 0) { arg = {}; }
        var _this = _super.call(this) || this;
        if (arg instanceof Coins) {
            _this._coins = __assign({}, arg._coins);
        }
        else if (typeof arg === 'string') {
            _this._coins = Coins.fromString(arg)._coins;
        }
        else {
            _this._coins = {};
            var coins_2;
            if (!Array.isArray(arg)) {
                coins_2 = [];
                Object.keys(arg).forEach(function (denom) {
                    return coins_2.push(new Coin_1.Coin(denom, arg[denom]));
                });
            }
            else {
                coins_2 = arg;
            }
            for (var _i = 0, coins_1 = coins_2; _i < coins_1.length; _i++) {
                var coin = coins_1[_i];
                var denom = coin.denom;
                var x = _this._coins[denom];
                if (x !== undefined) {
                    _this._coins[denom] = x.add(coin);
                }
                else {
                    _this._coins[denom] = coin;
                }
            }
            // convert all coins to Dec if one is Dec
            if (!_this.toArray().every(function (c) { return c.isIntCoin(); })) {
                for (var _a = 0, _b = Object.keys(_this._coins); _a < _b.length; _a++) {
                    var denom = _b[_a];
                    _this._coins[denom] = _this._coins[denom].toDecCoin();
                }
            }
        }
        return _this;
    }
    /**
     * Converts the Coins information to a comma-separated list.
     *
     * Eg: `15000ukrw,12000uluna`
     */
    Coins.prototype.toString = function () {
        return this.toArray()
            .map(function (c) { return c.toString(); })
            .join(',');
    };
    /**
     * Converts a comma-separated list of coins to a Coins object
     *
     * Eg. `1500ukrw,12302uluna`
     *
     * @param str comma-separated list of coins
     */
    Coins.fromString = function (str) {
        var coin_strings = str.split(/,\s*/);
        var coins = coin_strings.map(function (s) { return Coin_1.Coin.fromString(s); });
        return new Coins(coins);
    };
    /**
     * Gets the list of denominations
     */
    Coins.prototype.denoms = function () {
        return this.map(function (c) { return c.denom; });
    };
    /**
     * Creates a new Coins object with all Decimal coins
     */
    Coins.prototype.toDecCoins = function () {
        return new Coins(this.map(function (c) { return c.toDecCoin(); }));
    };
    /**
     * Creates a new Coins object with all Integer coins
     */
    Coins.prototype.toIntCoins = function () {
        return new Coins(this.map(function (c) { return c.toIntCoin(); }));
    };
    /**
     * Gets the Coin for denomination if it exists in the collection.
     * @param denom denomination to lookup
     */
    Coins.prototype.get = function (denom) {
        return this._coins[denom];
    };
    /**
     * Sets the Coin value for a denomination.
     * @param denom denomination to set
     * @param value value to set
     */
    Coins.prototype.set = function (denom, value) {
        var val;
        if (value instanceof Coin_1.Coin) {
            if (value.denom != denom) {
                throw new Error("Denoms must match when setting: " + denom + ", " + value.denom);
            }
            val = value;
        }
        else {
            val = new Coin_1.Coin(denom, value);
        }
        this._coins[denom] = val;
    };
    Coins.fromData = function (data) {
        return new Coins(data.map(Coin_1.Coin.fromData));
    };
    /**
     * Gets the individual elements of the collection.
     */
    Coins.prototype.toArray = function () {
        return Object.values(this._coins).sort(function (a, b) {
            return a.denom.localeCompare(b.denom);
        });
    };
    Coins.prototype.toData = function () {
        return this.toArray().map(function (c) { return c.toData(); });
    };
    /**
     * Adds a value from the elements of the collection. Coins of a similar denomination
     * will be clobbered into one value containing their sum.
     * @param other
     */
    Coins.prototype.add = function (other) {
        if (other instanceof Coin_1.Coin) {
            return new Coins(__spreadArrays([other], Object.values(this._coins)));
        }
        else {
            return new Coins(__spreadArrays(Object.values(other._coins), Object.values(this._coins)));
        }
    };
    /**
     * Subtracts a value from the elements of the collection.
     * @param other
     */
    Coins.prototype.sub = function (other) {
        return this.add(other.mul(-1));
    };
    /**
     * Multiplies the elements of the collection by a value.
     * @param other
     */
    Coins.prototype.mul = function (other) {
        return new Coins(this.map(function (c) { return c.mul(other); }));
    };
    /**
     * Divides the elements of the collection by a value.
     * @param other
     */
    Coins.prototype.div = function (other) {
        return new Coins(this.map(function (c) { return c.div(other); }));
    };
    /**
     * Modulos the elements of the collection with a value.
     * @param other
     */
    Coins.prototype.mod = function (other) {
        return new Coins(this.map(function (c) { return c.mod(other); }));
    };
    /**
     * Map a value onto the elements of the Coin collection.
     * @param fn
     */
    Coins.prototype.map = function (fn) {
        return this.toArray().map(fn);
    };
    /**
     * Filters out the Coin objects that don't match the predicate
     * @param fn predicate
     */
    Coins.prototype.filter = function (fn) {
        return new Coins(this.toArray().filter(fn));
    };
    return Coins;
}(json_1.JSONSerializable));
exports.Coins = Coins;
//# sourceMappingURL=Coins.js.map